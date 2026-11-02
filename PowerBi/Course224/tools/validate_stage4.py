#!/usr/bin/env python3
"""Validate all Stage4 packages and the shared 9-table semantic model, no Desktop claims."""
import json,zipfile,hashlib,io,csv,re,subprocess
from pathlib import Path
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
REPO=ROOT.parents[1]
manifest=json.loads((ROOT/'datasets/STAGE4_BUILD_MANIFEST.json').read_text(encoding='utf-8'))
assert len(manifest['days'])==3 and manifest['desktop_tested'] is False
models=[]
for day,info in manifest['days'].items():
    archive=ROOT/info['file']
    assert archive.is_file()
    assert hashlib.sha256(archive.read_bytes()).hexdigest()==info['archive_sha256']
    with zipfile.ZipFile(archive) as z:
        assert z.testzip() is None
        model=json.loads(z.read('Nova.SemanticModel/model.bim'))
        names={t['name'] for t in model['model']['tables']}
        assert names=={'FactSales','DimDate','DimBranch','DimProduct','DimCustomer',
                       'DimDepartment','FactOperations','FactFinance','FactWorkforce'}
        assert len(model['model']['relationships'])==11
        assert hashlib.sha256(z.read('Nova.SemanticModel/model.bim')).hexdigest()==info['model_sha256']
        meta=json.loads(z.read('Nova.Report/definition/pages/pages.json'))
        assert 'stage'+day in meta['pageOrder']
        assert meta['activePageName']=='stage'+day
        assert 'Nova.pbip' in z.namelist()
        assert not any(n.lower().endswith('.pbix') for n in z.namelist())
        pages=[n for n in z.namelist() if n.endswith('/page.json')]
        assert len(pages)>=2
        models.append(info['model_sha256'])
assert len(set(models))==1,'Day8-10 semantic model must be byte-identical'
cap=ROOT/'week3/day10/downloads/Day10_CAPSTONE.zip'
with zipfile.ZipFile(cap) as z:
    assert z.testzip() is None
    assert {'01_CAPSTONE_START_PBIP.zip','CAPSTONE_GUIDE.md','CAPSTONE_RUBRIC.csv',
            'CAPSTONE_QA_CHECKLIST.md','SOURCE_TIME_REFERENCE.csv'}.issubset(set(z.namelist()))
rubric=list(csv.DictReader((ROOT/'week3/day10/CAPSTONE_RUBRIC.csv').open(encoding='utf-8')))
assert sum(int(row['Points']) for row in rubric)==100
assert len(rubric)==6

# Site resource integrity, including archives and native links, without network access.
site=(ROOT/'data.js').read_text(encoding='utf-8')
refs=re.findall(r'url:\s*[\x27\x60\x22]([^\x27\x60\x22]+)[\x27\x60\x22]',site)
assert len(refs)>=40
broken=[u for u in refs if not u.startswith(('https:','http:')) and not (ROOT/u).is_file()]
assert not broken,broken
for source in ['data.js','access.js','progress.js','videos.js']:
    subprocess.run(['node','--check',str(ROOT/source)],check=True)
for day in (8,9,10):
    block=site[site.index('id: '+str(day)+','):site.index('id: '+str(day+1)+',') if day<10 else len(site)]
    assert not any(n in block for n in ('MAHMOUD','SOMAYA','HISHAM','ENAS'))
assert all((ROOT/'week3/day7/web'/n).is_file() for n in [
 'PERFORMANCE_SCENARIO.html','OPERATIONS_SCENARIO.html','FINANCE_SCENARIO.html','WORKFORCE_SCENARIO.html'])
for file in ['week3/day10/student-missions.html','week3/day10/ai-visual-design-lab.html','week3/day8/web/Day08_Every_Visual_Earns_Its_Place.html','week3/day9/DAY09_STUDENT_MISSIONS.md','week3/day10/STUDENT_MISSIONS.md','concepts/index.html']:
    txt=(ROOT/file).read_text(encoding='utf-8')
    for name in ('محمود','سمية','هشام','إيناس','ايناس'):
        assert name not in txt,(file,name)
print('STAGE4 QA PASSED: models identical, 100-point capstone, site refs, JavaScript, generic domain resources.')
