from __future__ import annotations
import csv, io, re, zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DAY1 = ROOT / 'week1/day1/downloads/Day01_CONNECT_EVERYTHING.zip'
DAY2 = ROOT / 'week1/day2/downloads/Day02_CLEAN_DATA.zip'
DAY3 = ROOT / 'week1/day3/downloads/Day03_STOP_COPYING_FILES_LEARNER.zip'

def fail(msg):
    raise AssertionError(msg)

def member(z, suffix):
    matches=[n for n in z.namelist() if n.endswith(suffix)]
    if len(matches)!=1:
        fail(f'Expected exactly one {suffix}, found {matches}')
    return matches[0]

def csv_rows(z, suffix):
    raw=z.read(member(z,suffix)).decode('utf-8-sig')
    return list(csv.DictReader(io.StringIO(raw)))

def text_of_all(z):
    chunks=[]
    for n in z.namelist():
        if n.endswith('/'):
            continue
        data=z.read(n)
        # XLSX is itself a ZIP; inspect XML strings too.
        if n.lower().endswith('.xlsx'):
            try:
                with zipfile.ZipFile(io.BytesIO(data)) as x:
                    for xn in x.namelist():
                        if xn.endswith('.xml'):
                            chunks.append(x.read(xn).decode('utf-8','ignore'))
            except Exception:
                pass
        else:
            chunks.append(data.decode('utf-8','ignore'))
    return '\n'.join(chunks)

def normalize_date(v):
    v=v.strip()
    for pattern in [r'^(\d{4})-(\d{2})-(\d{2})$',r'^(\d{2})/(\d{2})/(\d{4})$',r'^(\d{2})-(\d{2})-(\d{4})$']:
        m=re.match(pattern,v)
        if not m:
            continue
        if pattern.startswith('^(\\d{4})'):
            y,mn,d=m.groups()
        elif '/' in pattern:
            d,mn,y=m.groups()
        else:
            mn,d,y=m.groups()
        return f'{y}-{mn}-{d}'
    return None

with zipfile.ZipFile(DAY1) as z1, zipfile.ZipFile(DAY2) as z2, zipfile.ZipFile(DAY3) as z3:
    # Required Nova-native files.
    expected1=[
        '01_Nova_Product_Master.csv','02_Nova_Sales_Transactions.csv','03_Nova_Workforce_Snapshot.txt',
        '04_Nova_Budget_and_Targets.pdf','05_Nova_ETL_Reference.xlsx','06_Nova_Day_01_Challenge.xlsx'
    ]
    for f in expected1:
        member(z1,f)

    expected3=[
        '02_Nova_Branch_Master.csv','03_Nova_Customer_Master.csv','04_Nova_Product_Master.csv',
        '05_Nova_Automation_Challenge.xlsx','Nova_Sales_2026-01_January.csv',
        'Nova_Sales_2026-02_February.csv','Nova_Sales_2026-03_March.csv','Nova_Sales_2026-04_April.csv'
    ]
    for f in expected3:
        member(z3,f)

    # 1) Day 1 sales must equal Day 3 Jan-Mar exactly, in the same business rows/order.
    d1=csv_rows(z1,'02_Nova_Sales_Transactions.csv')
    jan=csv_rows(z3,'Nova_Sales_2026-01_January.csv')
    feb=csv_rows(z3,'Nova_Sales_2026-02_February.csv')
    mar=csv_rows(z3,'Nova_Sales_2026-03_March.csv')
    apr=csv_rows(z3,'Nova_Sales_2026-04_April.csv')
    if [len(jan),len(feb),len(mar),len(apr)] != [40000,40000,40000,40000]:
        fail(f'Monthly row counts wrong: {[len(jan),len(feb),len(mar),len(apr)]}')
    if len(d1)!=120000:
        fail(f'Day 1 sales should be 120000, got {len(d1)}')
    if d1 != jan+feb+mar:
        fail('Day 1 consolidated sales are not identical to Day 3 Jan-Mar rows')

    # 2) Branch ID is the single source of truth for Region and Channel.
    branches=csv_rows(z3,'02_Nova_Branch_Master.csv')
    branch_map={r['Branch ID']:(r['Region'],r['Channel']) for r in branches}
    if len(branch_map)!=100:
        fail(f'Branch master should contain 100 unique branches, got {len(branch_map)}')
    for row in d1+apr:
        expected=branch_map.get(row['Branch ID'])
        if expected is None:
            fail(f"Orphan Branch ID {row['Branch ID']}")
        if (row['Region'],row['Channel']) != expected:
            fail(f"Branch mapping mismatch for {row['Branch ID']}: fact={(row['Region'],row['Channel'])} master={expected}")

    # 3) Product/Customer keys are real master keys, not invented facts.
    products=csv_rows(z3,'04_Nova_Product_Master.csv')
    customers=csv_rows(z3,'03_Nova_Customer_Master.csv')
    product_ids={r['Product ID'] for r in products}
    customer_ids={r['Customer ID'] for r in customers}
    if len(product_ids)!=240:
        fail(f'Expected 240 products, got {len(product_ids)}')
    if len(customer_ids)!=8000:
        fail(f'Expected 8000 customers, got {len(customer_ids)}')
    for row in d1+apr:
        if row['Product ID'] not in product_ids:
            fail(f"Orphan Product ID {row['Product ID']}")
        if row['Customer ID'] not in customer_ids:
            fail(f"Orphan Customer ID {row['Customer ID']}")

    # 4) Day 2 has a valid intended Branch + Date grain.
    dirty=csv_rows(z2,'01_Nova_Branch_Daily_Performance_Dirty_LARGE.csv')
    if len(dirty) <= 50000:
        fail(f'Day 2 should contain 50K logical rows plus bad duplicates; got {len(dirty)}')
    # Remove exact duplicate rows first; exactly 50,000 logical source records should remain.
    fieldnames=list(dirty[0].keys())
    unique=[]
    seen=set()
    for r in dirty:
        key=tuple(r[k] for k in fieldnames)
        if key not in seen:
            seen.add(key); unique.append(r)
    if len(unique)!=50000:
        fail(f'After removing exact bad duplicates, Day 2 should have 50000 rows; got {len(unique)}')

    logical_keys=set()
    for r in unique:
        normalized=normalize_date(r['Date'])
        if normalized is None:
            continue  # invalid-date rows are intentional cleaning errors.
        key=(r['Branch ID'],normalized)
        if key in logical_keys:
            fail(f'Unintended duplicate Branch+Date grain: {key}')
        logical_keys.add(key)
        expected=branch_map.get(r['Branch ID'])
        if expected is None:
            fail(f"Day 2 orphan Branch ID {r['Branch ID']}")
        region=r['Region'].strip().title()
        channel=r['Channel'].strip().title()
        if (region,channel) != expected:
            fail(f"Day 2 representation changed business meaning for {r['Branch ID']}: {(region,channel)} vs {expected}")

    # 5) No Orange telecom leftovers in Week 1 materials.
    forbidden=['orange jordan','fiber 800','5g home','mobile plan','sim card','telecom package']
    all_text='\n'.join([text_of_all(z1),text_of_all(z2),text_of_all(z3)]).lower()
    for term in forbidden:
        if term in all_text:
            fail(f'Legacy telecom term found in Week 1 files: {term}')

index=(ROOT/'index.html').read_text(encoding='utf-8')
data=(ROOT/'data.js').read_text(encoding='utf-8')
if 'Commercial Performance 360' in index or 'COMMERCIAL PERFORMANCE 360' in index:
    fail('Landing page still contains Commercial Performance 360')
if 'Nova Business Performance 360' not in index:
    fail('Landing page does not show Nova Business Performance 360')
if 'Branch Daily Performance' not in data:
    fail('Day 2 story does not reflect daily-grain dataset')

print('WEEK 1 QA PASSED')
print('Day 1 = Day 3 Jan-Mar: 120,000 exact rows')
print('Branch mapping: 100 branches consistent')
print('Keys: 240 products, 8,000 customers, no orphans')
print(f'Day 2: {len(dirty)} raw rows -> 50,000 logical rows after exact duplicate removal')
print('Legacy telecom scan: clean')
