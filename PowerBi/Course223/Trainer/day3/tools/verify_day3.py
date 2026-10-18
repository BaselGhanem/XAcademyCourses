"""Independent CSV / SQLite verification. Does not import the JavaScript builder."""
import csv
import json
import sqlite3
import unicodedata
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DATA = ROOT / 'week1/day3/data'
REFERENCE = ROOT / 'Trainer/day3/reference/validation.json'
expected = json.loads(REFERENCE.read_text())

def read(name):
    with (DATA/name).open(encoding='utf-8-sig', newline='') as handle:
        return list(csv.DictReader(handle))

def tidy(value):
    return ''.join(c for c in value.replace('\u00a0', ' ') if unicodedata.category(c) != 'Cc').strip()

def normalize(raw):
    result = {key: tidy(value) for key, value in raw.items()}
    result['Department'] = {'HR': 'Human Resources'}.get(result['Department'], result['Department'])
    for column in ['EvaluationType', 'Status']:
        result[column] = result[column].capitalize()
    score = result['Score'].removesuffix('pts').strip()
    result['Score'] = int(score) if score else None
    result['ObjectiveWeight'] = int(result['ObjectiveWeight'])
    result['EvaluationDate'] = datetime.strptime(result['EvaluationDate'], '%d/%m/%Y').date().isoformat()
    return result

def metrics(rows):
    values = [row['Score'] for row in rows if row['Score'] is not None]
    return {'rows': len(rows), 'employees': len({row['EmployeeID'] for row in rows}),
            'scoreCount': len(values), 'missingScores': len(rows)-len(values),
            'zeroScores': values.count(0), 'scoreSum': sum(values),
            'pending': sum(row['Status']=='Pending' for row in rows),
            'byType': dict(Counter(row['EvaluationType'] for row in rows))}

master = read('Employees.csv')
assert len(master) >= 10000
master = [{key: tidy(value) for key, value in row.items()} for row in master]
for row in master:
    if row['Department']=='HR': row['Department']='Human Resources'
lookup = {row['EmployeeID']: row for row in master}
assert len(master) == len(lookup) == 10000
assert set(lookup) >= {'E00001','E00390','E03001','E03395'}
assert all(f'E{number:05}' not in lookup for number in [*range(391,401),*range(3396,3401)])
clean = {}
for filename, reference in expected['files'].items():
    if filename == 'Employees.csv': continue
    raw = read(filename)
    assert len(raw) >= 10000
    assert len(raw) == reference['rawRows']
    normalized = [normalize(row) for row in raw]
    unique = {tuple(row.items()): row for row in normalized}
    rows = list(unique.values())
    assert len(raw)-len(rows) == reference['removedDuplicates'] == 120
    assert metrics(rows) == {key: reference[key] for key in metrics(rows)}
    assert len({row['RecordID'] for row in rows}) == len(rows)
    assert len({(row['EmployeeID'],row['Period'],row['EvaluationType'],row['EvaluatorID'],row['ObjectiveID'],row['KPIID']) for row in rows}) == len(rows)
    for row in rows:
        assert row['Score'] is None or 0 <= row['Score'] <= 100
        assert (row['Score'] is None) == (row['Status'] == 'Pending')
        assert row['Department'] in {'Human Resources','Finance','Operations','Quality'}
        assert row['EvaluationDate'][:7] == row['Period']
        assert row['ObjectiveWeight'] == {'OBJ01':30,'OBJ02':25,'OBJ03':20,'OBJ04':15,'OBJ05':10}[row['ObjectiveID']]
    evaluations = defaultdict(lambda: defaultdict(set))
    for row in rows:
        evaluations[(row['EmployeeID'],row['Period'],row['EvaluationType'],row['EvaluatorID'])][row['ObjectiveID']].add(row['KPIID'])
    assert all(len(objectives)==5 and all(len(kpis)==2 for kpis in objectives.values()) for objectives in evaluations.values())
    clean[filename] = rows

groups = {'Application_BeforeRefresh':['Evaluations_Jul.csv','Evaluations_Aug.csv'],
          'Application_AfterRefresh':['Evaluations_Jul.csv','Evaluations_Aug.csv','Evaluations_Sep.csv'],
          'Practice_BeforeRefresh':['Practice_Apr.csv'],
          'Practice_AfterRefresh':['Practice_Apr.csv','Practice_May.csv']}
db=sqlite3.connect(':memory:')
db.execute('CREATE TABLE employees (EmployeeID TEXT, Department TEXT)')
db.executemany('INSERT INTO employees VALUES (?,?)', [(row['EmployeeID'],row['Department']) for row in master])
db.execute('CREATE TABLE evaluations (EmployeeID TEXT, Department TEXT)')
for name, files in groups.items():
    rows = [row for filename in files for row in clean[filename]]
    reference = expected['stages'][name]
    assert metrics(rows) == {key: reference[key] for key in metrics(rows)}
    db.execute('DELETE FROM evaluations')
    db.executemany('INSERT INTO evaluations VALUES (?,?)', [(row['EmployeeID'],row['Department']) for row in rows])
    joined, unmatched = db.execute('SELECT COUNT(*), SUM(e.EmployeeID IS NULL) FROM evaluations f LEFT JOIN employees e ON f.EmployeeID=e.EmployeeID').fetchone()
    assert joined == len(rows) == reference['rows']
    assert unmatched == reference['unmatchedRows']
    assert joined-unmatched == reference['matchedRows']
    mismatch = db.execute('SELECT COUNT(*) FROM evaluations f JOIN employees e ON f.EmployeeID=e.EmployeeID WHERE f.Department<>e.Department').fetchone()[0]
    assert mismatch == reference['departmentMismatches'] == 0
    absent = sorted({row['EmployeeID'] for row in rows if row['EmployeeID'] not in lookup})
    assert absent == reference['unmatchedEmployeeIDs']
    if name == 'Application_BeforeRefresh':
        db.execute("INSERT INTO employees SELECT * FROM employees WHERE EmployeeID='E00001'")
        multiplied = db.execute('SELECT COUNT(*) FROM evaluations f LEFT JOIN employees e ON f.EmployeeID=e.EmployeeID').fetchone()[0]
        assert multiplied == expected['duplicateMasterExperiment']['after'] == 24060
        db.execute("DELETE FROM employees WHERE rowid=(SELECT MAX(rowid) FROM employees WHERE EmployeeID='E00001')")

print(json.dumps({'result':'PASS','sourceCSVs':6,'minimumRows':min(len(read(name)) for name in expected['files']),
                  'independentChecks':['full row normalization','grain and keys','null vs zero','KPI and objective weights','CSV counts','SQLite joins','refresh deltas','duplicate-key expansion']},ensure_ascii=False))
