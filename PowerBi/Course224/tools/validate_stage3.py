#!/usr/bin/env python3
"""Validate regenerated Stage3 packs and their source-linked semantic model metadata."""
import csv,io,json,zipfile
from pathlib import Path
from decimal import Decimal
from openpyxl import load_workbook
ROOT=Path(__file__).resolve().parents[1]
paths=[
ROOT/'week2/day5/downloads/Day05_CALCULATE_VISUALIZE.zip',
ROOT/'week2/day6/downloads/Day06_CONTEXT_AND_CALCULATE.zip',
ROOT/'week3/day7/downloads/Day07_UNIVERSAL_SCENARIOS.zip'
]
for path in paths:
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None,path
        names=z.namelist()
        assert any(n.endswith('.xlsx') for n in names) or path.name.startswith('Day07'),path
        assert not any(n.endswith('.pbix') for n in names), 'Legacy PBIX cannot be labeled source-compatible'
        pbips=[n for n in names if n.lower().endswith('_start_pbip.zip')]
        assert len(pbips)==1, (path,pbips)
        with zipfile.ZipFile(io.BytesIO(z.read(pbips[0]))) as project:
            assert project.testzip() is None
            assert 'Nova.pbip' in project.namelist()
            model=json.loads(project.read('Nova.SemanticModel/model.bim'))
            tables={t['name']:t for t in model['model']['tables']}
            assert len(model['model']['relationships'])==(11 if 'day7' in path.as_posix() else 4)
            assert len(tables)==(9 if 'day7' in path.as_posix() else 5)
            def decode_table(tab):
                exp=' '.join(tables[tab]['partitions'][0]['source']['expression'])
                assert 'Binary.Decompress' in exp
                # Rows are embedded in M query: check data after extraction via simple CSV parse.
                import re,base64,zlib
                match=re.search(r'Binary.FromText\("([A-Za-z0-9+/=]+)"',exp)
                assert match,tab
                return list(csv.reader(io.StringIO(zlib.decompress(base64.b64decode(match[1]),-15).decode('utf-8'))))
            rows=decode_table('FactSales')
            assert len(rows)==(320001 if 'day7' in path.as_posix() else 160001),(path,len(rows))
            dims={d:len(decode_table(d))-1 for d in ('DimProduct','DimCustomer','DimBranch','DimDate')}
            assert dims=={'DimProduct':240,'DimCustomer':8000,'DimBranch':100,'DimDate':730},dims
            names=[m['name'] for t in tables.values() for m in t.get('measures',[])]
            assert len(names)==len(set(names))
            for meas in tables['FactSales'].get('measures',[]):
                assert 'Discounted Price' not in meas['expression']
            if path.name.startswith('Day06'):
                formula={m['name']:m['expression'] for m in tables['FactSales'].get('measures',[])}
                assert 'FactSales[Discount Status] = "Discounted"' in formula['Discounted Revenue']
                assert 'REMOVEFILTERS(DimProduct[Category])' in formula['Revenue All Categories']
                assert '[Gross Sales]' in ', '.join(z.namelist()) or 'Gross Sales' in rows[0]
            if path.name.startswith('Day07'):
                assert len({r[0] for r in rows[1:]})==320000
                before=[r for r in rows[1:] if r[1].startswith('2026-')]
                synthetic=[r for r in rows[1:] if r[1].startswith('2025-')]
                assert len(before)==len(synthetic)==160000
                stage2={(r['Scope'],r['Metric']):r['Value'] for r in csv.DictReader((ROOT/'datasets/EXPECTED_RESULTS.csv').open(encoding='utf-8'))}
                rev_col=rows[0].index('Revenue')
                rev=sum((Decimal(r[rev_col]) for r in before),Decimal('0'))
                assert f'{rev:.2f}'==stage2[('Jan-Apr','Net Revenue')]
        if path.name.startswith('Day06'):
            f=[n for n in z.namelist() if n.endswith('02_Filter_Context_Lab.xlsx')][0]
            wb=load_workbook(io.BytesIO(z.read(f)),read_only=True,data_only=True)
            vals=' '.join(str(v) for row in wb['Day5 Reference'].values for v in row if v is not None)
            assert 'Gross Sales' in vals and 'Discounted Price' not in vals
            wb.close()
# Independent month-based controls for the native DAX PM / PY / YTD exercises.
# These are source-calculated expectations, NOT claims of DAX Desktop execution.
with (ROOT/'datasets/STAGE3_EXPECTED_RESULTS.csv').open(encoding='utf-8',newline='') as fh:
    detail={r['Year Month']:Decimal(r['Net Revenue JOD']) for r in csv.DictReader(fh)}
time_controls=[]
for month in range(1,5):
    ym=f'2026-{month:02d}'
    py=f'2025-{month:02d}'
    pm=f'2026-{month-1:02d}' if month>1 else '2025-12'
    current=detail[ym]
    prior=detail[py]
    previous=detail.get(pm)
    ytd=sum((detail[f"2026-{m:02d}"] for m in range(1,month+1)),Decimal('0'))
    py_ytd=sum((detail[f"2025-{m:02d}"] for m in range(1,month+1)),Decimal('0'))
    yoy=(current/prior-1) if prior else None
    mom=(current/previous-1) if previous else None
    ytd_growth=(ytd/py_ytd-1) if py_ytd else None
    time_controls.append((ym,f'{current:.2f}',f'{previous:.2f}' if previous is not None else '',
                          f'{prior:.2f}',f'{ytd:.2f}',f'{py_ytd:.2f}',
                          f'{mom:.8f}' if mom is not None else '',
                          f'{yoy:.8f}' if yoy is not None else '',
                          f'{ytd_growth:.8f}' if ytd_growth is not None else ''))
assert len(time_controls)==4
assert time_controls[0][2]==''  # no 2025-12 records; never manufacture a PM result
assert time_controls[3][4]=='12534018.65'
with (ROOT/'datasets/STAGE3_TIME_VALIDATION.csv').open('w',encoding='utf-8',newline='') as fh:
    writer=csv.writer(fh)
    writer.writerow(['Year Month','Net Revenue JOD','PM Revenue JOD','PY Revenue JOD','YTD Revenue JOD','PY YTD Revenue JOD','MoM Growth decimal','YoY Growth decimal','YTD Growth decimal'])
    writer.writerows(time_controls)

summary=json.loads((ROOT/'datasets/STAGE3_BUILD_SUMMARY.json').read_text())
assert summary['pbix_desktop_verified'] is False
assert len(summary['domain_examples'])==4
for s in ['MAHMOUD','SOMAYA','HISHAM','ENAS']:
    assert s not in ' '.join(summary['domain_examples'])
print('STAGE3 SOURCE & PBIP QA PASSED - 160K/160K/320K source-aligned; no mismatched legacy PBIX distributed.')
