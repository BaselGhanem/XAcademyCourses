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
summary=json.loads((ROOT/'datasets/STAGE3_BUILD_SUMMARY.json').read_text())
assert summary['pbix_desktop_verified'] is False
assert len(summary['domain_examples'])==4
for s in ['MAHMOUD','SOMAYA','HISHAM','ENAS']:
    assert s not in ' '.join(summary['domain_examples'])
print('STAGE3 SOURCE & PBIP QA PASSED — 160K/160K/320K source-aligned; no mismatched legacy PBIX distributed.')
