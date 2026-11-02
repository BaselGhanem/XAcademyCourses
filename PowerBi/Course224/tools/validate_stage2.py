#!/usr/bin/env python3
"""Validate actual ZIP/XLSX output, including all 160,000 Day04 transactions."""
import csv,io,runpy,zipfile,json,hashlib
from datetime import datetime,date
from decimal import Decimal
from pathlib import Path
from openpyxl import load_workbook
ROOT=Path(__file__).resolve().parents[1]
runpy.run_path(str(ROOT/'tools/validate_week1.py'),run_name='__main__')
p=[ROOT/'week1/day1/downloads/Day01_CONNECT_EVERYTHING.zip',
ROOT/'week1/day2/downloads/Day02_CLEAN_DATA.zip',
ROOT/'week1/day3/downloads/Day03_STOP_COPYING_FILES_LEARNER.zip',
ROOT/'week2/day4/downloads/Day04_MODEL_THE_BUSINESS.zip']
def read(z,suffix):
    k=[n for n in z.namelist() if n.endswith(suffix)]
    assert len(k)==1,(suffix,k)
    return list(csv.DictReader(io.StringIO(z.read(k[0]).decode('utf-8-sig'))))
def xl(z,suffix):
    k=[n for n in z.namelist() if n.endswith(suffix)]
    assert len(k)==1,(suffix,k)
    return load_workbook(io.BytesIO(z.read(k[0])),read_only=True,data_only=True)
with zipfile.ZipFile(p[0]) as a,zipfile.ZipFile(p[1]) as b,zipfile.ZipFile(p[2]) as c,zipfile.ZipFile(p[3]) as d:
    for z in (a,b,c,d):
        assert z.testzip() is None
        assert '00_UNIVERSAL_LEARNER_GUIDE.txt' in z.namelist()
    s=read(a,'02_Nova_Sales_Transactions.csv')
    months=[read(c,f'Nova_Sales_2026-{m:02d}_{name}.csv') for m,name in [(1,'January'),(2,'February'),(3,'March'),(4,'April')]]
    assert s==months[0]+months[1]+months[2]
    assert all(len(q)==40000 for q in months)
    src={r['Transaction ID']:r for q in months for r in q}
    assert len(src)==160000
    wb=xl(d,'Nova_Day04_Model_Lab.xlsx')
    assert set(wb.sheetnames)=={'FactSales','DimDate','DimProduct','DimCustomer','DimBranch'}
    assert [wb[s].max_row for s in ['FactSales','DimProduct','DimCustomer','DimBranch','DimDate']]==[160001,241,8001,101,731]
    calendar=[r[0] for r in wb['DimDate'].iter_rows(min_row=2,values_only=True)]
    assert calendar[0].date()==date(2025,1,1) and calendar[-1].date()==date(2026,12,31)
    assert all((calendar[i+1]-calendar[i]).days==1 for i in range(729))
    assert all(isinstance(x,datetime) for x in calendar)
    n=0;model_revenue=Decimal('0')
    for r in wb['FactSales'].iter_rows(min_row=2,values_only=True):
        tid,dt,customer,prod,branch,qty,price,disc,rev=r
        source=src.pop(tid)
        assert isinstance(dt,datetime) and dt.date()==date.fromisoformat(source['Date'])
        assert (customer,prod,branch)==(source['Customer ID'],source['Product ID'],source['Branch ID'])
        assert int(qty)==int(source['Quantity'])
        assert abs(float(price)-float(source['Unit Price']))<1e-8
        assert abs(float(disc)-float(source['Discount %']))<1e-8
        assert abs(float(rev)-float(source['Revenue']))<1e-8
        model_revenue+=Decimal(str(rev));n+=1
    assert n==160000 and not src
    wb.close()
    for mon in ['Jan','Feb','Mar','Apr']:
        w=xl(d,f'Sales_{mon}.xlsx')
        assert w['Sales'].max_row==40001
        w.close()
    w=xl(d,'Sales_May.xlsx');assert w['Sales'].max_row==40001;w.close()
    daily=read(b,'01_Nova_Branch_Daily_Performance_Dirty_LARGE.csv')
    cust=read(b,'02_Nova_Customer_Master_Dirty_LARGE.csv')
    assert len(daily)==50100 and len(cust)==8008
    assert sum(r['Date']=='invalid-date' for r in daily)>=289
reference={(x['Scope'],x['Metric']):x['Value'] for x in csv.DictReader((ROOT/'datasets/EXPECTED_RESULTS.csv').open(encoding='utf-8'))}
assert reference[('Day04','FactSales Rows')]=='160000'
assert reference[('Jan-Apr','Net Revenue')]==f'{model_revenue:.2f}'
manifest=json.loads((ROOT/'datasets/STAGE2_BUILD_MANIFEST.json').read_text())
for idx,path in enumerate(p,1):
    with zipfile.ZipFile(path) as z:
        for name,expected in manifest['packages'][str(idx)]['files'].items():
            assert hashlib.sha256(z.read(name)).hexdigest()==expected
print('STAGE2 DATA QA PASSED: All four ZIPs, 160K source-identical rows, typed dates, no duplicate IDs, May 200K.')
