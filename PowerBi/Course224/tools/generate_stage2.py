#!/usr/bin/env python3
"""Rebuild the existing four Nova ZIP resources from one deterministic source."""
import csv, hashlib, json, zipfile
from collections import defaultdict
from decimal import Decimal
from pathlib import Path
import generate_week1_data as w1
import generate_week2_day4 as w4
ROOT=Path(__file__).resolve().parents[1]
DS=ROOT/'datasets'
PACKS={
  1:ROOT/'week1/day1/downloads/Day01_CONNECT_EVERYTHING.zip',
  2:ROOT/'week1/day2/downloads/Day02_CLEAN_DATA.zip',
  3:ROOT/'week1/day3/downloads/Day03_STOP_COPYING_FILES_LEARNER.zip',
  4:ROOT/'week2/day4/downloads/Day04_MODEL_THE_BUSINESS.zip'
}
INTRO="""X ACADEMY / NOVA BUSINESS CASE / COURSE224
Open to any discipline. Business functions are illustrative scenarios, not student identities.
Source data are synthetic. Visual mockup values are not authoritative.
See datasets/BUSINESS_RULES.md and EXPECTED_RESULTS.csv for agreed definitions.
"""
GUIDES={
  1:"DAY01: Connect CSV/TXT/XLSX/PDF/Web. Jan-Mar Sales contains 120,000 transactions. Weekly web KPIs and monthly transactions are separate sources and not automatically reconcilable.",
  2:"DAY02: Clean 50,100 dirty branch records (50,000 logical +100 exact duplicates), 8,008 customer rows (8,000 +8 duplicates). Missing is not zero, invalid-date must not be guessed.",
  3:"DAY03: Jan-Mar EXACTLY matches Day01. Jan-Mar has 120,000 records; adding April via Folder Refresh yields 160,000, with no fact multiplication on Merge.",
  4:"DAY04: Full Jan-Apr Sales = 160,000 transactions; folder Jan-Apr =160,000, after May =200,000. Four 1:* relationships; calendar 730 real Excel dates from 2025-01-01 to 2026-12-31."
}
def insert_guide(d,zip_path):
    tmp=zip_path.with_suffix('.rebuilt')
    with zipfile.ZipFile(zip_path) as src,zipfile.ZipFile(tmp,'w',zipfile.ZIP_DEFLATED) as dst:
        for entry in src.infolist():
            if entry.filename not in ['00_COURSE_DATA_CONTRACT.txt','00_UNIVERSAL_LEARNER_GUIDE.txt']:
                dst.writestr(entry,src.read(entry))
        dst.writestr('00_COURSE_DATA_CONTRACT.txt',INTRO)
        dst.writestr('00_UNIVERSAL_LEARNER_GUIDE.txt',GUIDES[d]+'\n')
    tmp.replace(zip_path)
def write_references():
    DS.mkdir(parents=True,exist_ok=True)
    cols=[
      ('FactSales','Transaction ID','Text','Transaction ID','Unique business transaction identifier'),
      ('FactSales','Order Date','Date','Transaction ID','Typed date of sale'),
      ('FactSales','Customer ID','Text','Transaction ID','References DimCustomer[Customer Code]'),
      ('FactSales','Product ID','Text','Transaction ID','References DimProduct[Product ID]'),
      ('FactSales','Branch ID','Text','Transaction ID','References DimBranch[Branch ID]'),
      ('FactSales','Quantity','Integer','Transaction ID','Units per transaction'),
      ('FactSales','Unit Price','Decimal JOD','Transaction ID','Actual transaction unit price'),
      ('FactSales','Discount %','Decimal fraction','Transaction ID','0.10 means 10 percent'),
      ('FactSales','Revenue','Decimal JOD','Transaction ID','Net revenue AFTER discount and rounding'),
      ('DimProduct','Product ID','Text','Product ID','Unique product, 240 rows'),
      ('DimCustomer','Customer Code','Text','Customer Code','Unique customer, 8000 rows'),
      ('DimBranch','Branch ID','Text','Branch ID','Unique branch, 100 rows'),
      ('DimBranch','Region','Text','Branch ID','Authoritative branch sales region'),
      ('DimBranch','Channel','Text','Branch ID','Authoritative branch sales channel'),
      ('DimDate','Date','Date','Date','730 contiguous typed dates, calendar 2025–2026'),
      ('Branch Daily Dirty','Date','Mixed text','Branch ID + Date','Contains invalid-date and three date formats'),
      ('Branch Daily Dirty','Revenue','Decimal or null','Branch ID + Date','Null does not mean zero'),
      ('Web Branch Performance','Week Start','Date','Branch ID + Week Start','Independent weekly KPIs, not summed FactSales'),
      ('Workforce Snapshot','Employee ID','Text','Employee ID','Headcount is not additive across time'),
      ('Budget PDF','Region','Text','Region + Period','Aggregate budget, not transaction-grain facts'),
    ]
    with (DS/'DATA_DICTIONARY.csv').open('w',newline='',encoding='utf-8') as h:
        csv.writer(h).writerows([('Table','Column','Type','Grain','Definition')]+cols)
    totals=defaultdict(lambda:[0,Decimal('0')])
    prod=w1.product_catalog_rows();customers=w1.customer_catalog_rows();branches=w1.branch_catalog_rows()
    for month in range(1,6):
        for row in w1.monthly_sales_rows(40000,month,prod,customers,branches):
            totals[month][0]+=1
            totals[month][1]+=Decimal(str(row[11]))
    rows=[('Scope','Metric','Value','Unit'),('Day01','Sales Jan-Mar Rows','120000','rows'),('Day02','Raw Branch Rows','50100','rows'),('Day02','Unique Logical Branch Rows','50000','rows'),('Day02','Exact Duplicates','100','rows'),('Day02','Customer Raw Rows','8008','rows'),('Day02','Customer Exact Duplicates','8','rows'),('Day02','Invalid Date Source Records','289','rows'),('Day02','Revenue Null Source Records','236','rows'),('Day02','Actual Headcount N/A Source Records','194','rows'),('Day02','Cost Null Source Records','128','rows'),('Day04','FactSales Rows','160000','rows'),('Day04','Folder After May','200000','rows'),('Day04','DimDate Rows','730','dates'),('Master','Products','240','rows'),('Master','Customers','8000','rows'),('Master','Branches','100','rows')]
    for m in totals:
        rows.extend([(f'2026-{m:02d}','Transactions',str(totals[m][0]),'rows'),(f'2026-{m:02d}','Net Revenue',f'{totals[m][1]:.2f}','JOD')])
    for label,months in [('Jan-Mar',[1,2,3]),('Jan-Apr',[1,2,3,4]),('Jan-May',[1,2,3,4,5])]:
        rows.append((label,'Net Revenue',f'{sum((totals[m][1] for m in months),Decimal("0")):.2f}','JOD'))
    with (DS/'EXPECTED_RESULTS.csv').open('w',newline='',encoding='utf-8') as h:csv.writer(h).writerows(rows)
def make_manifest():
    result={'course':'Course224','version':'stage2','packages':{}}
    for day,path in PACKS.items():
        with zipfile.ZipFile(path) as z:
            assert z.testzip() is None
            result['packages'][str(day)]={'path':str(path.relative_to(ROOT)),'files':{n:hashlib.sha256(z.read(n)).hexdigest() for n in sorted(z.namelist()) if not n.endswith('/')}}
    (DS/'STAGE2_BUILD_MANIFEST.json').write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
def main():
    w1.main()
    w4.build()
    for day,path in PACKS.items():insert_guide(day,path)
    write_references()
    make_manifest()
    print('Stage2 build complete: four ZIPs; 160k Day04 transaction facts; typed 730-day DimDate')
if __name__=='__main__':main()
