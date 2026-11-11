#!/usr/bin/env python3
"""Course224 Days 05–07: reproducible source-backed Power BI PROJECT packages.

Power BI Desktop, not Python, is needed to convert validated PBIP to working PBIX.
"""
from __future__ import annotations
import base64, csv, hashlib, html, io, json, shutil, zipfile, zlib
from collections import defaultdict
from decimal import Decimal
from pathlib import Path
from datetime import date
import generate_week3_day7 as d7
import generate_week2_day5 as d5
import generate_week2_day6 as d6

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'week3/day7/downloads'
WORK=ROOT/'tools/_stage3_work'
SCHEMA='https://developer.microsoft.com/json-schemas/'
MODEL_REF=SCHEMA+'fabric/item/semanticModel/definitionProperties/1.0.0/schema.json'
REPORT_REF=SCHEMA+'fabric/item/report/definitionProperties/2.0.0/schema.json'

def write_json(path,obj):
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def zip_dir(source,output):
    output.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(output,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
        for f in sorted(source.rglob('*')):
            if f.is_file():z.write(f,f.relative_to(source))
    assert zipfile.ZipFile(output).testzip() is None,output

def write_reference_project(folder,records,measures,page_text,model_name='Nova'):
    """Create inspectable PBIP + BIM + PBIR from a single, complete data lineage."""
    folder.mkdir(parents=True,exist_ok=True)
    sem=folder/f'{model_name}.SemanticModel'
    rpt=folder/f'{model_name}.Report'
    tables=[]
    kinds={'dateTime':'type date','string':'type text','double':'type number','int64':'Int64.Type'}
    for name,(headers,rows,types) in records.items():
        output=io.StringIO()
        writer=csv.writer(output);writer.writerow(headers);writer.writerows(rows)
        compressor=zlib.compressobj(6,zlib.DEFLATED,-15)
        data=output.getvalue().encode('utf-8')
        payload=base64.b64encode(compressor.compress(data)+compressor.flush()).decode('ascii')
        typed=', '.join('{'+json.dumps(h)+', '+kinds[t]+'}' for h,t in zip(headers,types))
        query=[
            'let',
            '    Source = Csv.Document(Binary.Decompress(Binary.FromText("'+payload+'", BinaryEncoding.Base64), Compression.Deflate), [Delimiter=",", Columns='+str(len(headers))+', Encoding=65001, QuoteStyle=QuoteStyle.Csv]),',
            '    Headers = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),',
            '    Typed = Table.TransformColumnTypes(Headers, {'+typed+'}, "en-US")',
            'in','    Typed'
        ]
        cols=[]
        for h,t in zip(headers,types):
            col={'name':h,'dataType':t,'sourceColumn':h,'summarizeBy':'none' if name.startswith('Dim') or t in ('string','dateTime') else 'sum'}
            if t=='dateTime':
                col['formatString']='yyyy-MM-dd'
                col['annotations']=[{'name':'UnderlyingDateTimeDataType','value':'Date'}]
            if name=='DimDate' and h=='Date':col['isKey']=True
            if name=='DimDate' and h=='Month':col['sortByColumn']='Month Number'
            cols.append(col)
        tab={'name':name,'columns':cols,'partitions':[{'name':name,'mode':'import','source':{'type':'m','expression':query}}]}
        ms=measures.get(name,[])
        if ms:tab['measures']=[{'name':m['name'],'expression':m['expression'],'formatString':m.get('formatString','#,##0')} for m in ms]
        if name=='DimDate':tab['dataCategory']='Time'
        tables.append(tab)
    rel=[]
    keys=[
        ('FactSales','Order Date','DimDate','Date'),('FactSales','Product ID','DimProduct','Product ID'),
        ('FactSales','Customer ID','DimCustomer','Customer Code'),('FactSales','Branch ID','DimBranch','Branch ID'),
    ]
    for fact,fkey,dim,dkey in keys:
        if fact in records and dim in records:
            rel.append({'name':fact+'_'+dim,'fromTable':fact,'fromColumn':fkey,'toTable':dim,'toColumn':dkey,
                        'crossFilteringBehavior':'oneDirection',**({'joinOnDateBehavior':'datePartOnly'} if dim=='DimDate' else {})})
    model={'name':model_name,'compatibilityLevel':1567,'model':{'culture':'en-US','defaultPowerBIDataSourceVersion':'powerBI_V3','sourceQueryCulture':'en-US','tables':tables,'relationships':rel,'annotations':[{'name':'PBI_QueryOrder','value':json.dumps(list(records))}]}}
    write_json(sem/'model.bim',model)
    write_json(sem/'definition.pbism',{'$schema':MODEL_REF,'version':'4.2','settings':{'qnaEnabled':True}})
    write_json(rpt/'definition.pbir',{'$schema':REPORT_REF,'version':'4.0','datasetReference':{'byPath':{'path':'../'+model_name+'.SemanticModel'}}})
    version=d7.RPT+'versionMetadata/1.0.0/schema.json'
    write_json(rpt/'definition/version.json',{'$schema':version,'version':'2.0.0'})
    write_json(rpt/'definition/report.json',{'$schema':d7.RPT+'report/3.3.0/schema.json','themeCollection':{}})
    write_json(rpt/'definition/pages/pages.json',{'$schema':d7.RPT+'pagesMetadata/1.1.0/schema.json','pageOrder':['start'],'activePageName':'start'})
    pg=rpt/'definition/pages/start'
    write_json(pg/'page.json',{'$schema':d7.RPT+'page/2.1.0/schema.json','name':'start','displayName':'START HERE','displayOption':'FitToPage','width':1280,'height':720})
    d7.add_visual(pg,d7.textbox(page_text,36,32,1210,610,17),36,32,1210,610,0)
    write_json(folder/(model_name+'.pbip'),{'$schema':SCHEMA+'fabric/pbip/pbipProperties/1.0.0/schema.json',
                                         'version':'1.0','artifacts':[{'report':{'path':model_name+'.Report'}}],
                                         'settings':{'enableAutoRecovery':True}})
    (folder/'README.txt').write_text('Open Nova.pbip in current Power BI Desktop, Refresh, validate source counts and relationships, then Save As PBIX. This source project was statically validated only.\n',encoding='utf-8')
    return model

def shared_records(full,include_calculated=False):
    records={}
    for n in ['DimProduct','DimCustomer','DimBranch','DimDate']:
        h,rs=full[n]
        records[n]=(h,rs,d7.TYPES[n])
    h,rows=full['FactSales']
    base=[r for r in rows if r[-1]=='Day04 original']
    assert len(base)==160000
    wanted=12 if include_calculated else 9
    records['FactSales']=(h[:wanted],[r[:wanted] for r in base],d7.TYPES['FactSales'][:wanted])
    return records

def basic_measures(stage):
    base=[
        ('Total Revenue','SUM(FactSales[Revenue])','#,##0.00'),
        ('Transactions','COUNTROWS(FactSales)','#,##0'),
        ('Customers','DISTINCTCOUNT(FactSales[Customer ID])','#,##0'),
        ('Total Quantity','SUM(FactSales[Quantity])','#,##0'),
        ('Average Transaction Value','DIVIDE([Total Revenue], [Transactions])','#,##0.00'),
        ('Average Revenue per Customer','DIVIDE([Total Revenue], [Customers])','#,##0.00'),
    ]
    if stage>=6:
        base.append(('Total Discount Amount','SUM(FactSales[Discount Amount])','#,##0.00'))
        base.extend([
            ('Discounted Revenue','CALCULATE([Total Revenue], FactSales[Discount Status] = "Discounted")','#,##0.00'),
            ('Full Price Revenue','CALCULATE([Total Revenue], FactSales[Discount Status] = "Full Price")','#,##0.00'),
            ('Retail Revenue','CALCULATE([Total Revenue], DimBranch[Channel] = "Retail")','#,##0.00'),
            ('Revenue All Categories','CALCULATE([Total Revenue], REMOVEFILTERS(DimProduct[Category]))','#,##0.00'),
            ('Category Contribution %','DIVIDE([Total Revenue], [Revenue All Categories])','0.0%'),
        ])
    return {'FactSales':[{'name':n,'expression':e,'formatString':f} for n,e,f in base]}

def produce_domain_guides(full):
    web=ROOT/'week3/day7/web'
    folder=WORK/'domain_guides';folder.mkdir(parents=True,exist_ok=True)
    for role in d7.ROLES:
        name=role['name']
        chosen=d7.MEAS[role['table']]
        snippets='\n\n'.join(x['name']+' =\n'+x['expression'] for x in chosen)
        (folder/(name+'_DAX.dax')).write_text(snippets+'\n',encoding='utf-8')
        lines=''.join('<section class="card"><h3>'+html.escape(x['name'])+'</h3><pre>'+html.escape(x['name']+' =\n'+x['expression'])+'</pre></section>' for x in chosen)
        body=f'''<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nova - {html.escape(role["ar"])}</title>
<style>body{{font:16px/1.8 Arial,sans-serif;background:#f6faf9;color:#13233b;margin:0}}main{{max-width:980px;margin:auto;padding:32px}}h1{{color:#099999}}.card{{background:white;border:1px solid #e1e8e8;padding:20px;margin:16px 0;border-radius:14px}}pre{{direction:ltr;text-align:left;white-space:pre-wrap;overflow-wrap:anywhere;padding:16px;background:#edf6f5;border-radius:8px}}a{{color:#077b7b}}</style></head>
<body><main><a href="../../../dashboard.html">X Academy · Course224</a><h1>{html.escape(role["ar"])}</h1><p>سيناريو اختياري لأي متدرب. لا يرتبط بمسمى وظيفي أو اسم شخص.</p>
<div class="card"><h2>السؤال</h2><p>{html.escape(role["question"])}</p><p>استخدم Year Month وYear من DimDate. قارن 2026 مقابل 2025 الاصطناعية الموثقة، ولا تفترض وجود بيانات خارج الفترة.</p></div>
<div class="card"><h2>التطبيق</h2><p>ابنِ أربع KPI Cards وLine Chart شهري وBar Chart وMatrix وSlicers؛ تحقق من الأرقام قبل التنسيق.</p><p>Fact/Domain: {role["table"]}. Measure: [{role["base"]}].</p></div>
<h2>DAX Measures</h2>{lines}</main></body></html>'''
        url=web/(name+'_SCENARIO.html');url.parent.mkdir(parents=True,exist_ok=True);url.write_text(body,encoding='utf-8')
        shutil.copy2(url,folder/url.name)
    return folder

def day7_project(full):
    folder=WORK/'day7_project'
    # Keep all generated scenario facts and 2025 synthetic comparison data.
    records={n:(h,rows,d7.TYPES[n]) for n,(h,rows) in full.items()}
    for n in records:
        if n=='FactSales':assert len(records[n][1])==320000
    measures={n:ms for n,ms in d7.MEAS.items()}
    model=write_reference_project(folder,records,measures,[
        'NOVA · COURSE224 · DAY 07 / DOMAIN SCENARIOS',
        'Choose a question, not a person. Sales / Operations / Finance / Workforce are transferable example domains.',
        'The original Jan–Apr 2026 source contains 160,000 rows. An additional 160,000 synthetic 2025 rows were generated ONLY for comparison.',
        'Year = 2026; use Month = March or April for PM and YoY.',
        'Use the attached domain-specific DAX guide to build KPI cards, trend, bar and matrix.',
        'Do not sum Workforce headcount across snapshots. Check Date table and filter direction.',
        'Save as PBIX only after validating the PBIP in Power BI Desktop.'
    ])
    # Add scenario-specific model relationships.
    rel=model['model']['relationships']
    for fact,datecol in [('FactOperations','Order Date'),('FactFinance','Posting Date'),('FactWorkforce','Snapshot Date')]:
        rel.append({'name':fact+'_DimDate','fromTable':fact,'fromColumn':datecol,'toTable':'DimDate','toColumn':'Date',
                    'crossFilteringBehavior':'oneDirection','joinOnDateBehavior':'datePartOnly'})
        rel.append({'name':fact+'_DimBranch','fromTable':fact,'fromColumn':'Branch ID','toTable':'DimBranch','toColumn':'Branch ID',
                    'crossFilteringBehavior':'oneDirection'})
    rel.append({'name':'FactWorkforce_DimDepartment','fromTable':'FactWorkforce','fromColumn':'Department ID','toTable':'DimDepartment','toColumn':'Department ID','crossFilteringBehavior':'oneDirection'})
    assert len(rel)==11
    write_json(folder/'Nova.SemanticModel/model.bim',model)
    return folder

def produce_expectations(full):
    rows=full['FactSales'][1]; h=full['FactSales'][0]
    for r in rows:assert r[h.index('Discount Status')] in ('Discounted','Full Price')
    groups=defaultdict(lambda:[0,Decimal('0')])
    for r in rows:
        ym=r[1][:7];groups[ym][0]+=1;groups[ym][1]+=Decimal(str(r[h.index('Revenue')]))
    target=ROOT/'datasets/STAGE3_EXPECTED_RESULTS.csv'
    with target.open('w',newline='',encoding='utf-8') as f:
        w=csv.writer(f);w.writerow(['Year Month','Transaction Count','Net Revenue JOD','Source Label'])
        for ym in sorted(groups):
            w.writerow([ym,groups[ym][0],f'{groups[ym][1]:.2f}','Original Day04' if ym.startswith('2026-') else 'Synthetic 2025 comparison'])
    return groups

def main():
    if WORK.exists():shutil.rmtree(WORK)
    WORK.mkdir(parents=True)
    d7.WORK=WORK/'day7_sources'
    d7.WORK.mkdir(parents=True,exist_ok=True)
    original=d7.build_data()
    d7.build_measures()
    full=d7.DATA
    source2026=full['FactSales'][1]
    assert len(source2026)==320000
    assert sum(r[-1]=='Day04 original' for r in source2026)==160000
    assert sum(r[-1]=='Synthetic 2025 comparison' for r in source2026)==160000
    # Raw source hash matches the Stage2 Day04 Excel binary exactly.
    with zipfile.ZipFile(ROOT/'week2/day4/downloads/Day04_MODEL_THE_BUSINESS.zip') as z:
        assert hashlib.sha256(original).hexdigest()==hashlib.sha256(z.read('04_MODEL_LAB/Nova_Day04_Model_Lab.xlsx')).hexdigest()
    month_totals=produce_expectations(full)
    expected_stage2={(r['Scope'],r['Metric']):r['Value'] for r in csv.DictReader((ROOT/'datasets/EXPECTED_RESULTS.csv').open(encoding='utf-8'))}
    assert f'{sum((month_totals[f"2026-{m:02d}"][1] for m in range(1,5)), Decimal("0")):.2f}'==expected_stage2[('Jan-Apr','Net Revenue')]
    for d in (5,6):
        records=shared_records(full,include_calculated=(d==6))
        assert len(records['FactSales'][1])==160000
        loc=WORK/f'day{d}_project'
        write_reference_project(loc,records,basic_measures(d),[
          f'NOVA · DAY {d:02d} / VERIFIED STAGE2 SALES MODEL',
          '160,000 source-identical Jan-Apr 2026 transactions; no artificial downsizing.',
          'DimDate includes 2025–2026; no historical sales have been invented in this model.',
          'Day 05: add Power Query columns and core measures, then build a Sales Overview.',
          'Day 06: use standardized Discounted vs Full Price and CALCULATE/REMOVEFILTERS.',
          'Test all four 1:* relationships and filters in Power BI Desktop before saving PBIX.'
        ])
        path=ROOT/f'week2/day{d}/downloads/Nova_Day{d:02d}_Start_PBIP.zip'
        zip_dir(loc,path)
    d5.build();d6.build()
    guides=produce_domain_guides(full)
    source=day7_project(full)
    stage7zip=OUT/'Nova_Day07_START_PBIP.zip'
    zip_dir(source,stage7zip)
    learner=WORK/'day7_bundle';learner.mkdir()
    (learner/'00_START_HERE.txt').write_text('DAY07 / UNIVERSAL DOMAIN LAB: Choose one business question; open 01_Nova_Day07_START_PBIP.zip and the matching scenario guide. The 2025 comparison rows are synthetic and labelled. No learner-name-specific pages are required. Validate in Power BI Desktop before producing PBIX.\n',encoding='utf-8')
    shutil.copy2(stage7zip,learner/'01_Nova_Day07_START_PBIP.zip')
    shutil.copytree(guides,learner/'02_DOMAIN_GUIDES')
    shutil.copy2(ROOT/'datasets/STAGE3_EXPECTED_RESULTS.csv',learner/'03_EXPECTED_RESULTS.csv')
    zip_dir(learner,OUT/'Day07_UNIVERSAL_SCENARIOS.zip')
    summary={
        'day05_fact_rows':160000,'day06_fact_rows':160000,'day07_fact_rows':320000,
        'day07_original_day4_rows':160000,'day07_synthetic_2025_rows':160000,
        'source_stage2_jan_apr_revenue':expected_stage2[('Jan-Apr','Net Revenue')],
        'domain_examples':[r['name'] for r in d7.ROLES],
        'pbix_desktop_verified':False,
        'outputs':[str(p.relative_to(ROOT)) for p in [
          ROOT/'week2/day5/downloads/Day05_CALCULATE_VISUALIZE.zip',
          ROOT/'week2/day6/downloads/Day06_CONTEXT_AND_CALCULATE.zip',
          OUT/'Day07_UNIVERSAL_SCENARIOS.zip',stage7zip]]
    }
    write_json(ROOT/'datasets/STAGE3_BUILD_SUMMARY.json',summary)
    print('STAGE3 BUILD PASS',json.dumps(summary,ensure_ascii=False))
    shutil.rmtree(WORK)

if __name__=='__main__':main()
