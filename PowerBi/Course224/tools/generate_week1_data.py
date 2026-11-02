from __future__ import annotations
import csv, html, random, shutil, tempfile, zipfile
from datetime import date, timedelta
from pathlib import Path
import xml.etree.ElementTree as ET

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

ROOT = Path(__file__).resolve().parents[1]
DAY1 = ROOT / 'week1' / 'day1'
DAY2 = ROOT / 'week1' / 'day2'
DAY3 = ROOT / 'week1' / 'day3'
DAY1_DOWNLOADS = DAY1 / 'downloads'
DAY1_WEB = DAY1 / 'web'
DAY2_DOWNLOADS = DAY2 / 'downloads'
DAY3_DOWNLOADS = DAY3 / 'downloads'
random.seed(260919)

REGIONS = ['Amman', 'North', 'South', 'Zarqa', 'Central']
CHANNELS = ['Retail', 'Corporate', 'Online', 'Partner']
CITIES = ['Amman', 'Irbid', 'Zarqa', 'Aqaba', 'Salt', 'Jerash', 'Madaba', 'Karak', 'Mafraq', "Ma'an"]
FIRST = ['Ahmad','Mohammad','Omar','Yazan','Laith','Ali','Khaled','Samer','Rami','Dana','Lina','Rana','Maya','Noor','Hala']
LAST = ['Haddad','Khalil','Nasser','Saleh','Awad','Hamdan','Tawalbeh','Khatib','Masri','Zoubi','Shami','Qasem']
COMPANY = 'Nova Distribution Group'
DEPARTMENTS = ['Sales', 'Operations', 'Finance', 'People & Culture', 'Supply Chain']
REGION_BY_CITY = {'Amman':'Amman','Irbid':'North','Jerash':'North','Mafraq':'North','Zarqa':'Zarqa','Aqaba':'South',"Ma'an":'South','Karak':'South','Salt':'Central','Madaba':'Central'}
POSITIONS = {
    'Sales': ['Sales Representative', 'Key Account Executive', 'Sales Coordinator', 'Branch Sales Lead'],
    'Operations': ['Branch Supervisor', 'Operations Officer', 'Service Coordinator'],
    'Finance': ['Accountant', 'Finance Analyst', 'Cash Controller'],
    'People & Culture': ['HR Officer', 'Workforce Planner', 'Talent Coordinator'],
    'Supply Chain': ['Warehouse Officer', 'Inventory Planner', 'Logistics Coordinator'],
}

def xlsx_rows(path: Path):
    if not path.exists():
        return []
    try:
        with zipfile.ZipFile(path) as z:
            shared = []
            if 'xl/sharedStrings.xml' in z.namelist():
                root = ET.fromstring(z.read('xl/sharedStrings.xml'))
                ns = {'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                for si in root.findall('m:si', ns):
                    shared.append(''.join(t.text or '' for t in si.findall('.//m:t', ns)))
            wb = ET.fromstring(z.read('xl/workbook.xml'))
            ns = {'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
            first = wb.find('m:sheets/m:sheet', ns)
            rel_id = first.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
            rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
            target = next(rel.attrib['Target'] for rel in rels if rel.attrib.get('Id') == rel_id).lstrip('/')
            if not target.startswith('xl/'):
                target = 'xl/' + target
            ws = ET.fromstring(z.read(target))
            ns2 = {'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            rows = []
            for row in ws.findall('.//m:sheetData/m:row', ns2):
                vals = []
                for c in row.findall('m:c', ns2):
                    t = c.attrib.get('t')
                    v = c.find('m:v', ns2)
                    val = '' if v is None else (v.text or '')
                    if t == 's' and val.isdigit():
                        val = shared[int(val)]
                    elif t == 'inlineStr':
                        val = ''.join(x.text or '' for x in c.findall('.//m:t', ns2))
                    vals.append(val)
                rows.append(vals)
            return rows
    except Exception:
        return []

def find_ids(path: Path, hints, fallback_prefix, n):
    rows = xlsx_rows(path)
    if rows:
        header = [str(x).strip().lower() for x in rows[0]]
        idx = None
        for h in hints:
            for i, name in enumerate(header):
                if h in name:
                    idx = i
                    break
            if idx is not None:
                break
        if idx is None:
            idx = 0
        vals = [str(r[idx]).strip() for r in rows[1:] if len(r) > idx and str(r[idx]).strip()]
        if vals:
            return vals
    return [f'{fallback_prefix}{i:04d}' for i in range(1, n + 1)]

def unzip_pack(zip_path: Path, temp: Path):
    with zipfile.ZipFile(zip_path) as z:
        z.extractall(temp)
    dirs = [p for p in temp.iterdir() if p.is_dir()]
    return dirs[0] if len(dirs) == 1 else temp

def rezip_pack(src_root: Path, zip_path: Path):
    tmp = zip_path.with_suffix('.new.zip')
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for p in sorted(src_root.rglob('*')):
            if p.is_file():
                z.write(p, f'{src_root.name}/{p.relative_to(src_root)}')
    tmp.replace(zip_path)

def write_csv(path, header, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(rows)

def make_simple_xlsx(path: Path, sheets):
    """Create small Nova-native reference/challenge workbooks."""
    path.parent.mkdir(parents=True, exist_ok=True)
    wb = Workbook()
    default = wb.active
    wb.remove(default)
    header_fill = PatternFill('solid', fgColor='13233B')
    accent_fill = PatternFill('solid', fgColor='DFF3F1')
    for title, rows in sheets:
        ws = wb.create_sheet(title[:31])
        for r_idx, row in enumerate(rows, 1):
            for c_idx, value in enumerate(row, 1):
                cell = ws.cell(r_idx, c_idx, value)
                cell.alignment = Alignment(vertical='top', wrap_text=True)
                if r_idx == 1:
                    cell.font = Font(bold=True, color='FFFFFF')
                    cell.fill = header_fill
                elif r_idx == 2:
                    cell.fill = accent_fill
            ws.row_dimensions[r_idx].height = 24
        for col in ws.columns:
            letter = col[0].column_letter
            max_len = max(len(str(c.value or '')) for c in col)
            ws.column_dimensions[letter].width = min(max(max_len + 3, 14), 52)
        ws.freeze_panes = 'A2'
        ws.auto_filter.ref = ws.dimensions
    wb.save(path)

def make_day1_excel_files(root: Path):
    make_simple_xlsx(root / '05_Nova_ETL_Reference.xlsx', [
        ('ETL Reference', [
            ['Stage','Meaning','Nova example','What Power BI does'],
            ['Extract','Connect to the source','Sales CSV, Workforce TXT, Budget PDF, Web table','Reads data from the source'],
            ['Transform','Clean and shape','Fix types, names, nulls, duplicates','Power Query records repeatable steps'],
            ['Load','Make data available for analysis','Load trusted tables to the model','Creates tables used by visuals and measures']
        ]),
        ('Source Map', [
            ['Source','Format','Business area','Day 1 purpose'],
            ['Nova Product Master','CSV','Products','Structured master data'],
            ['Nova Sales Transactions','CSV','Sales','Large transaction fact'],
            ['Nova Workforce Snapshot','TXT','Workforce','Text-file connector'],
            ['Nova Budget & Targets','PDF','Finance','PDF connector'],
            ['Nova Branch Performance','WEB','Management','Web connector']
        ])
    ])
    make_simple_xlsx(root / '06_Nova_Day_01_Challenge.xlsx', [
        ('Challenge', [
            ['Mission','Requirement','Done when'],
            ['First management view','Build Total Revenue, Revenue vs Target by Region and a Channel slicer','The page answers where attention may be needed without claiming root cause'],
            ['Data check','Confirm source names and row counts before building visuals','No unexpected empty table or wrong data type'],
            ['Save','Save the report as Nova_Business_Performance_360_[Name].pbix','PBIX is ready to continue next session']
        ])
    ])

def make_day2_excel_files(root: Path):
    make_simple_xlsx(root / '03_Nova_Cleaning_Checklist.xlsx', [
        ('Cleaning Checklist', [
            ['Check','Question','Power Query action'],
            ['Grain','Is Branch ID + Date unique after bad duplicates are removed?','Remove only true duplicate rows'],
            ['Dates','Are all dates valid and typed as Date?','Fix/replace invalid values intentionally'],
            ['Categories','Do Region and Channel use one canonical spelling?','Trim, Clean, standardize case/values'],
            ['Numbers','Are Revenue, Cost and Headcount numeric?','Set types and investigate errors/nulls'],
            ['Names','Are manager/customer names free of extra spaces?','Trim and Clean'],
            ['Audit','Can the same steps run again on Refresh?','Review Applied Steps']
        ])
    ])

def make_day3_excel_files(root: Path):
    make_simple_xlsx(root / '05_Nova_Automation_Challenge.xlsx', [
        ('Automation Challenge', [
            ['Step','Mission','Proof'],
            ['1','Connect to Monthly_Sales as Folder','Jan-Mar combine without opening files individually'],
            ['2','Keep Source File Name','Each transaction can be traced to its month file'],
            ['3','Merge Branch, Customer and Product masters','Descriptive fields expand correctly with no orphan keys'],
            ['4','Add April only after pipeline is complete','Refresh adds April rows without editing Power Query steps']
        ])
    ])

def rename_once(root: Path, old_name: str, new_name: str):
    old = root / old_name
    new = root / new_name
    if old.exists() and not new.exists():
        old.replace(new)
    return new if new.exists() else old

def remove_if_exists(root: Path, *names: str):
    for name in names:
        p = root / name
        if p.is_dir():
            shutil.rmtree(p)
        elif p.exists():
            p.unlink()

def product_catalog_rows():
    """Single Nova product universe used by the profile, Product Master and all Sales facts."""
    specs = {
        'Food & Beverage': {
            'brands': ['Nova Fresh','Harvest Lane','Daily Sip'],
            'items': [('Sparkling Water',['330ml','500ml','1L']),('Still Water',['500ml','1.5L']),('Orange Juice',['250ml','1L']),('Apple Juice',['250ml','1L']),('Ground Coffee',['250g','500g']),('Black Tea',['25 bags','100 bags']),('Granola Bar',['40g','6 pack']),('Mixed Nuts',['150g','300g'])],
            'price': (0.65,8.50), 'margin': (0.18,0.34)
        },
        'Personal Care': {
            'brands': ['Nova Care','Pureline','Nura Care'],
            'items': [('Shampoo',['250ml','400ml']),('Conditioner',['250ml','400ml']),('Body Wash',['250ml','500ml']),('Hand Wash',['250ml','500ml']),('Toothpaste',['75ml','120ml']),('Deodorant',['50ml','150ml']),('Hand Cream',['75ml','150ml']),('Facial Cleanser',['150ml','250ml'])],
            'price': (1.40,12.00), 'margin': (0.22,0.40)
        },
        'Home Care': {
            'brands': ['Nova Home','BrightNest','HomePro'],
            'items': [('Laundry Detergent',['1kg','3kg']),('Dishwashing Liquid',['500ml','1L']),('Surface Cleaner',['500ml','750ml']),('Glass Cleaner',['500ml','750ml']),('Floor Cleaner',['1L','2L']),('Kitchen Degreaser',['500ml','750ml']),('Fabric Softener',['1L','2L']),('Cleaning Wipes',['40 wipes','80 wipes'])],
            'price': (1.20,16.00), 'margin': (0.20,0.38)
        },
        'Health & Wellness': {
            'brands': ['NovaWell','Vitalis','WellSpring'],
            'items': [('Vitamin C',['30 tablets','60 tablets']),('Multivitamin',['30 tablets','60 tablets']),('Electrolyte Drink',['330ml','500ml']),('Protein Bar',['45g','12 pack']),('Herbal Tea',['20 bags','40 bags']),('Hand Sanitizer',['100ml','500ml']),('Sleep Mask',['single','2 pack']),('Resistance Band',['light','medium','heavy'])],
            'price': (1.00,22.00), 'margin': (0.24,0.42)
        },
        'Office & Tech': {
            'brands': ['Nova Office','WorkGrid','TechNest'],
            'items': [('Wireless Mouse',['standard','silent']),('USB-C Cable',['1m','2m']),('Notebook',['A5','A4']),('Ballpoint Pens',['5 pack','10 pack']),('Desk Organizer',['small','large']),('Laptop Stand',['fixed','adjustable']),('Power Bank',['10000mAh','20000mAh']),('USB Hub',['4 port','7 port'])],
            'price': (1.00,45.00), 'margin': (0.18,0.36)
        },
        'Seasonal': {
            'brands': ['Nova Select','Festiva','Outdoor+'],
            'items': [('Insulated Bottle',['500ml','750ml']),('Travel Mug',['350ml','500ml']),('Picnic Blanket',['standard','XL']),('LED String Lights',['5m','10m']),('Gift Bag Set',['small','large']),('Cooling Bag',['12L','24L']),('Umbrella',['compact','golf']),('Storage Box',['20L','40L'])],
            'price': (1.50,38.00), 'margin': (0.20,0.40)
        }
    }
    suppliers = ['Apex Trading Co.','Levant Consumer Goods','Cedar Supply Partners','Horizon Imports','Prime Distribution Supply','Mena Wholesale Group']
    local = random.Random(260919)
    rows = []
    pid = 1
    for category, spec in specs.items():
        combos = [(brand, name, variant) for name, variants in spec['items'] for variant in variants for brand in spec['brands']]
        local.shuffle(combos)
        for brand, name, variant in combos[:40]:
            list_price = round(local.uniform(*spec['price']), 2)
            margin = local.uniform(*spec['margin'])
            unit_cost = round(list_price * (1 - margin), 2)
            rows.append({
                'product_id': f'P{pid:04d}',
                'sku': f'NOVA-{pid:04d}',
                'product_name': f'{brand} {name} {variant}',
                'category': category,
                'subcategory': name,
                'brand': brand,
                'variant': variant,
                'unit_cost': unit_cost,
                'list_price': list_price,
                'supplier': local.choice(suppliers),
                'portfolio_role': local.choice(['Core','Core','Core','Growth','Seasonal']),
                'status': 'Active'
            })
            pid += 1
    return rows

def write_product_master_csv(path: Path, catalog):
    header = ['Product ID','SKU','Product Name','Category','Subcategory','Brand','Pack / Variant','Unit Cost','List Price','Supplier','Portfolio Role','Status']
    rows = [[p['product_id'],p['sku'],p['product_name'],p['category'],p['subcategory'],p['brand'],p['variant'],p['unit_cost'],p['list_price'],p['supplier'],p['portfolio_role'],p['status']] for p in catalog]
    write_csv(path, header, rows)

def branch_catalog_rows():
    branches = []
    for b in range(1, 101):
        city = CITIES[(b - 1) % len(CITIES)]
        region = REGION_BY_CITY[city]
        channel = CHANNELS[(b - 1) % len(CHANNELS)]
        opened = date(2018,1,1) + timedelta(days=((b * 37) % 2500))
        manager = f'{FIRST[(b*3) % len(FIRST)]} {LAST[(b*5) % len(LAST)]}'
        branches.append({
            'branch_id': f'B{b:03d}',
            'branch_name': f'Nova {city} {b:03d}',
            'city': city,
            'region': region,
            'channel': channel,
            'open_date': opened.isoformat(),
            'manager': manager,
            'status': 'Active'
        })
    return branches

def branch_master_rows(branches=None):
    branches = branches or branch_catalog_rows()
    for b in branches:
        yield [b['branch_id'],b['branch_name'],b['city'],b['region'],b['channel'],b['open_date'],b['manager'],b['status']]

def customer_catalog_rows(count=8000):
    local = random.Random(260922)
    segments = ['SMB','Enterprise','Retail','Key Account']
    types = ['Retail Customer','Corporate Account','Reseller','Institutional']
    rows = []
    for i in range(1, count + 1):
        city = local.choice(CITIES)
        rows.append({
            'customer_id': f'C{i:05d}',
            'customer_name': f'{local.choice(FIRST)} {local.choice(LAST)} Trading {i:04d}',
            'city': city,
            'region': REGION_BY_CITY[city],
            'segment': local.choice(segments),
            'customer_type': local.choice(types),
            'account_manager': f'{local.choice(FIRST)} {local.choice(LAST)}',
            'status': local.choices(['Active','Inactive'],weights=[94,6],k=1)[0]
        })
    return rows

def write_customer_master_csv(path: Path, customers):
    write_csv(path,
        ['Customer ID','Customer Name','City','Region','Segment','Customer Type','Account Manager','Status'],
        [[c['customer_id'],c['customer_name'],c['city'],c['region'],c['segment'],c['customer_type'],c['account_manager'],c['status']] for c in customers])

def workforce_rows(count=2400, branches=None):
    branches = branches or branch_catalog_rows()
    local = random.Random(260923)
    for i in range(1, count + 1):
        branch = local.choice(branches)
        dept = local.choices(DEPARTMENTS, weights=[34,25,10,8,23], k=1)[0]
        position = local.choice(POSITIONS[dept])
        emp_type = local.choices(['Full Time','Part Time','Contract'], weights=[82,8,10], k=1)[0]
        status = local.choices(['Active','Leave','Secondment'], weights=[94,5,1], k=1)[0]
        hire = date(2017,1,1) + timedelta(days=local.randrange(3400))
        fte = 1.0 if emp_type != 'Part Time' else 0.5
        monthly_cost = round(local.uniform(520,2300),2)
        yield [f'E{i:05d}', f'{local.choice(FIRST)} {local.choice(LAST)}', branch['branch_id'], dept, position, emp_type, status, hire.isoformat(), fte, monthly_cost]

def monthly_sales_rows(count, month, catalog, customers, branches):
    """Deterministic monthly facts. Day 1 Jan-Mar and Day 3 Jan-Mar are byte-for-byte the same business rows."""
    local = random.Random(261000 + month)
    start = date(2026, month, 1)
    nextm = date(2026 + (month == 12), (month % 12) + 1, 1)
    span = (nextm - start).days
    for i in range(count):
        dt = start + timedelta(days=local.randrange(span))
        product = local.choice(catalog)
        customer = local.choice(customers)
        branch = local.choice(branches)
        qty = local.randint(1, 12)
        price = round(product['list_price'] * local.uniform(0.97, 1.03), 2)
        disc = local.choice([0,0,0,0.05,0.05,0.10,0.15])
        revenue = round(qty * price * (1 - disc), 2)
        yield [
            f'N{month:02d}-{i+1:07d}', dt.isoformat(), customer['customer_id'], product['product_id'],
            f'SR{local.randint(1,180):03d}', branch['branch_id'], branch['region'], branch['channel'],
            qty, price, disc, revenue
        ]

def consolidated_sales_rows(months, count_per_month, catalog, customers, branches):
    for month in months:
        yield from monthly_sales_rows(count_per_month, month, catalog, customers, branches)

def branch_records():
    records = []
    branches = branch_catalog_rows()
    local = random.Random(261100)
    week_starts = [date(2026,1,5) + timedelta(days=7*i) for i in range(40)]
    for branch in branches:
        planned_hc = local.randint(18,45)
        for week in week_starts:
            target = round(local.uniform(55000,165000),2)
            revenue = round(target * local.uniform(.78,1.18),2)
            budget_cost = round(target * local.uniform(.18,.29),2)
            operating_cost = round(budget_cost * local.uniform(.88,1.16),2)
            actual_hc = max(10, planned_hc-local.randint(0,5))
            vacancies = planned_hc-actual_hc
            service = round(min(99.8,max(72,local.gauss(90.5,5.2))),1)
            rating = round(min(5,max(3.2,local.gauss(4.45,.28))),1)
            tx = local.randint(350,2400)
            ret = round(local.uniform(.3,5.8),2)
            records.append([
                branch['branch_id'],branch['branch_name'],branch['region'],branch['channel'],week.isoformat(),
                revenue,target,operating_cost,budget_cost,planned_hc,actual_hc,vacancies,service,rating,tx,ret
            ])
    return records

def company_profile_html():
    products = [
        ('Food & Beverage','Nova Fresh water & juice, Harvest Lane coffee & snacks, Daily Sip beverages.'),
        ('Personal Care','Nova Care, Pureline and Nura Care shampoo, body wash, toothpaste and hygiene lines.'),
        ('Home Care','Nova Home, BrightNest and HomePro detergents, cleaners and household essentials.'),
        ('Health & Wellness','NovaWell, Vitalis and WellSpring vitamins, hydration, wellness and self-care products.'),
        ('Office & Tech','Nova Office, WorkGrid and TechNest notebooks, cables, accessories and desk products.'),
        ('Seasonal','Nova Select, Festiva and Outdoor+ travel, gifting and rotating seasonal ranges.')
    ]
    cards = ''.join(f'<article class="product"><span>{i+1:02d}</span><h3>{html.escape(n)}</h3><p>{html.escape(d)}</p></article>' for i,(n,d) in enumerate(products))
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nova Distribution Group | Company Profile</title>
<style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Almarai:wght@400;700&display=swap');:root{{--ink:#102033;--muted:#667085;--line:#e7ebf0;--bg:#f5f7fa;--purple:#695cff;--teal:#099999}}*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,Arial,sans-serif}}.wrap{{max-width:1180px;margin:auto;padding:32px 22px 64px}}.hero{{background:linear-gradient(135deg,#101d33,#18284a 57%,#264d5a);color:white;border-radius:28px;padding:44px;position:relative;overflow:hidden;box-shadow:0 22px 70px rgba(16,32,51,.15)}}.hero:after{{content:'';position:absolute;width:360px;height:360px;border-radius:50%;background:linear-gradient(135deg,rgba(105,92,255,.55),rgba(9,153,153,.18));right:-95px;top:-135px}}.brand{{display:flex;align-items:center;gap:14px;position:relative;z-index:2}}.logo{{width:58px;height:58px;border-radius:18px;background:white;display:grid;place-items:center}}.logo svg{{width:42px;height:42px}}.brand strong{{font-size:20px}}.brand small{{display:block;color:#b9c4d6;margin-top:3px}}.hero h1{{font-size:clamp(42px,7vw,82px);line-height:.95;margin:72px 0 18px;max-width:800px;letter-spacing:-3px;position:relative;z-index:2}}.hero p{{max-width:700px;color:#d8deea;font-size:18px;line-height:1.7;position:relative;z-index:2}}.badge{{display:inline-flex;margin-top:26px;padding:10px 14px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.08);border-radius:999px;font-size:13px;position:relative;z-index:2}}.stats{{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin:20px 0}}.stat,.section{{background:white;border:1px solid var(--line);border-radius:18px;padding:22px}}.stat b{{font-size:28px;display:block}}.stat span,.lead,.product p{{color:var(--muted)}}.section{{border-radius:24px;padding:30px;margin-top:18px}}.kicker{{font-size:12px;font-weight:800;letter-spacing:1.6px;color:var(--teal);text-transform:uppercase}}h2{{font-size:30px;margin:8px 0}}.lead{{line-height:1.7;max-width:850px}}.grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:22px}}.product{{border:1px solid var(--line);border-radius:18px;padding:20px;min-height:150px}}.product span{{font-size:12px;font-weight:800;color:var(--purple)}}.product h3{{margin:22px 0 8px;font-size:17px}}.product p{{font-size:13px;line-height:1.6;margin:0}}.flow{{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:20px}}.step{{padding:18px;border-radius:16px;background:#f7f9fb;border:1px solid var(--line);font-weight:700}}.step small{{display:block;color:var(--muted);font-weight:400;margin-top:6px}}.challenge{{background:#101d33;color:white;border:0}}.challenge .kicker{{color:#74dfd7}}.challenge .lead{{color:#cbd4e1}}.questions{{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:22px}}.q{{padding:18px;border-radius:16px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12)}}.role{{display:flex;justify-content:space-between;align-items:center;gap:18px;margin-top:22px;padding-top:20px;border-top:1px solid rgba(255,255,255,.14)}}.role a{{color:#101d33;background:white;text-decoration:none;padding:13px 18px;border-radius:12px;font-weight:800}}.ar{{font-family:Almarai,Arial,sans-serif;direction:rtl;text-align:right;color:#98a2b3;font-size:13px;margin-top:8px}}@media(max-width:800px){{.hero{{padding:28px}}.hero h1{{margin-top:55px;letter-spacing:-1.5px}}.stats{{grid-template-columns:repeat(2,1fr)}}.grid{{grid-template-columns:1fr}}.flow{{grid-template-columns:1fr 1fr}}.questions{{grid-template-columns:1fr}}.role{{align-items:flex-start;flex-direction:column}}}}</style></head><body><main class="wrap">
<section class="hero"><div class="brand"><div class="logo"><svg viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#695cff"/><stop offset="1" stop-color="#099999"/></linearGradient></defs><path d="M11 49V15h9l24 23V15h9v34h-8L20 26v23z" fill="url(#g)"/><path d="M47 6l2.8 6.2L56 15l-6.2 2.8L47 24l-2.8-6.2L38 15l6.2-2.8z" fill="#f2c811"/></svg></div><div><strong>Nova Distribution Group</strong><small>Company Profile • Training Case</small></div></div><h1>Move products.<br>Empower people.<br>Grow responsibly.</h1><p>Nova is a regional distribution and retail group serving customers through branches, field teams, digital channels and corporate accounts. Leadership wants one trusted view across Sales, Finance and Workforce.</p><div class="badge">Synthetic company created for the X Academy Power BI Specialist case</div></section>
<section class="stats"><div class="stat"><b>100</b><span>Branches</span></div><div class="stat"><b>8,000+</b><span>Customers</span></div><div class="stat"><b>2,400</b><span>Employees</span></div><div class="stat"><b>5</b><span>Regions</span></div><div class="stat"><b>4</b><span>Sales Channels</span></div></section>
<section class="section"><div class="kicker">01 • Who we are</div><h2>A business with many moving parts</h2><p class="lead">Each Nova branch has revenue targets, operating budgets, staffing plans and service expectations. Good performance is not only about selling more; management needs the full picture.</p><p class="ar">نوفا شركة افتراضية سنستخدمها كقصة واحدة خلال الدورة. كل البيانات والمواقف مصممة للتدريب فقط.</p></section>
<section class="section"><div class="kicker">02 • Product portfolio</div><h2>What Nova moves</h2><p class="lead">A broad portfolio keeps the case relevant to different business backgrounds rather than one specific industry.</p><div class="grid">{cards}</div></section>
<section class="section"><div class="kicker">03 • Operating model</div><h2>How the business works</h2><div class="flow"><div class="step">Suppliers<small>Products enter Nova's network.</small></div><div class="step">Distribution & Supply<small>Stock moves to regions and branches.</small></div><div class="step">Branches & Sales Teams<small>Teams serve retail and corporate demand.</small></div><div class="step">Customers<small>Sales, service and returns create the performance picture.</small></div></div></section>
<section class="section challenge"><div class="kicker">04 • The management challenge</div><h2>Management has data everywhere.</h2><p class="lead">Sales files, workforce snapshots, targets, budgets, customer masters and branch data are stored in different formats. Your team must build a reliable Power BI view that connects the story.</p><div class="questions"><div class="q"><b>Sales</b><br>Which branches are growing, and which are missing target?</div><div class="q"><b>Finance</b><br>Where are operating costs running above budget?</div><div class="q"><b>Workforce</b><br>Do staffing gaps appear where performance is weak?</div><div class="q"><b>Management</b><br>Where should leadership focus first, and why?</div></div><div class="role"><div><b>Your role: Nova Analytics Team</b><br><span style="color:#cbd4e1">Day 1 starts by connecting the evidence. No conclusions yet.</span></div><a href="Branch_Performance.html">Open Branch Data →</a></div></section>
</main></body></html>'''

def make_company_profile(path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(company_profile_html(), encoding='utf-8')

def make_branch_html(path: Path):
    records = branch_records()
    head = ['Branch ID','Branch Name','Region','Channel','Week Start','Revenue','Target Revenue','Operating Cost','Budget Cost','Planned Headcount','Actual Headcount','Vacant Positions','Service Level %','Customer Rating','Transactions','Return Rate %']
    parts = ['<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nova Branch Performance | Web Data Source</title>',
             '<style>body{font-family:Arial,sans-serif;margin:32px;background:#f7f9fa;color:#162126}h1{margin-bottom:4px}.meta{color:#60727a;margin-bottom:20px}.brand{font-size:12px;font-weight:700;color:#695cff;text-transform:uppercase;letter-spacing:1.2px}table{border-collapse:collapse;width:100%;background:#fff;font-size:12px}th,td{border:1px solid #d9e1e5;padding:7px 9px;text-align:left;white-space:nowrap}th{position:sticky;top:0;background:#13233b;color:#fff}tr:nth-child(even){background:#f5f9f9}</style></head><body>',
             f'<div class="brand">{COMPANY}</div><h1>Branch Performance</h1><div class="meta">Power BI Web Connector source | 4,000 rows = 100 branches × 40 weeks | Sales + Finance + Workforce indicators | Synthetic training data</div><table id="nova-branch-performance"><thead><tr>']
    parts.extend(f'<th>{html.escape(h)}</th>' for h in head)
    parts.append('</tr></thead><tbody>')
    for r in records:
        parts.append('<tr>' + ''.join(f'<td>{html.escape(str(v))}</td>' for v in r) + '</tr>')
    parts.append('</tbody></table></body></html>')
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(''.join(parts), encoding='utf-8')
    return len(records)

def make_budget_pdf(path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(path), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=16*mm, bottomMargin=16*mm)
    styles = getSampleStyleSheet()
    story = [Paragraph('Nova Distribution Group', styles['Title']), Paragraph('2026 Regional Budget & Performance Targets', styles['Heading2']), Spacer(1,5*mm)]
    data = [['Region','Revenue Target','Operating Budget','Planned Headcount']]
    targets = {'Amman':(22500000,5200000,620),'North':(14800000,3500000,470),'South':(10900000,2700000,390),'Zarqa':(12600000,3000000,410),'Central':(11700000,2850000,510)}
    for region, vals in targets.items():
        data.append([region, f'JOD {vals[0]:,.0f}', f'JOD {vals[1]:,.0f}', f'{vals[2]:,}'])
    table = Table(data, colWidths=[38*mm,45*mm,45*mm,42*mm])
    table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#13233B')),('TEXTCOLOR',(0,0),(-1,0),colors.white),('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('GRID',(0,0),(-1,-1),.5,colors.HexColor('#D7DEE8')),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#F5F7FA')]),('ALIGN',(1,1),(-1,-1),'RIGHT'),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('BOTTOMPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),8)]))
    story.extend([table, Spacer(1,7*mm), Paragraph('Management note', styles['Heading3']), Paragraph('Targets are approved for the 2026 operating plan. Review branch performance together with staffing capacity, service quality and sales-channel mix before recommending action.', styles['BodyText']), Spacer(1,4*mm), Paragraph('Synthetic training document - X Academy Power BI Specialist case.', styles['Italic'])])
    doc.build(story)

def update_day1():
    zp = DAY1_DOWNLOADS / 'Day01_CONNECT_EVERYTHING.zip'
    with tempfile.TemporaryDirectory() as td:
        root = unzip_pack(zp, Path(td))
        remove_if_exists(
            root,
            '01_Product_Master.xlsx','01_Nova_Product_Master.xlsx','01_Nova_Product_Master.csv',
            '02_Sales_Transactions.csv','02_Nova_Sales_Transactions.csv',
            '03_Sales_Reps.txt','03_Nova_Workforce_Snapshot.txt',
            '04_Regional_Targets.pdf','04_Nova_Budget_and_Targets.pdf',
            '05_ETL_Reference.xlsx','05_Nova_ETL_Reference.xlsx',
            '06_Day_01_Challenge.xlsx','06_Nova_Day_01_Challenge.xlsx',
            '00_DATASET_SCALE.txt'
        )
        catalog = product_catalog_rows()
        customers = customer_catalog_rows()
        branches = branch_catalog_rows()
        write_product_master_csv(root / '01_Nova_Product_Master.csv', catalog)
        header = ['Transaction ID','Date','Customer ID','Product ID','Sales Rep ID','Branch ID','Region','Channel','Quantity','Unit Price','Discount %','Revenue']
        write_csv(
            root / '02_Nova_Sales_Transactions.csv',
            header,
            consolidated_sales_rows([1,2,3], 40000, catalog, customers, branches)
        )
        write_csv(root / '03_Nova_Workforce_Snapshot.txt',
                  ['Employee ID','Employee Name','Branch ID','Department','Position','Employment Type','Status','Hire Date','FTE','Monthly Cost'],
                  workforce_rows(2400, branches))
        make_budget_pdf(root / '04_Nova_Budget_and_Targets.pdf')
        make_day1_excel_files(root)
        make_branch_html(root / 'web' / 'Branch_Performance.html')
        make_company_profile(root / 'web' / 'Nova_Company_Profile.html')
        (root / '00_START_HERE.txt').write_text(
            'NOVA DISTRIBUTION GROUP - DAY 01\n\n'
            'You are joining the Nova Analytics Team. Management wants one trusted view across Sales, Finance and Workforce.\n\n'
            'Connect these sources in Power BI:\n'
            '1) 01_Nova_Product_Master.csv - Nova product catalog (240 products)\n'
            '2) 02_Nova_Sales_Transactions.csv - 120,000 rows = January + February + March 2026\n'
            '3) 03_Nova_Workforce_Snapshot.txt - workforce snapshot\n'
            '4) 04_Nova_Budget_and_Targets.pdf - finance/target document\n'
            '5) 05_Nova_ETL_Reference.xlsx - Excel source / ETL reference\n'
            '6) Web source - Branch_Performance.html (use the live GitHub Pages URL during class)\n\n'
            'Important continuity note: the 120,000 Sales rows are the SAME Jan-Mar rows you will automate as three monthly files on Day 3.\n'
            'Day 1 goal: connect the evidence and build the first report view; do not solve the whole company yet.\n',
            encoding='utf-8')
        (root / '00_DATASET_SCALE.txt').write_text(
            'DAY 01 SCALE\n'
            '- Sales Transactions: 120,000 rows (Jan-Mar 2026, 40,000 each month)\n'
            '- Workforce Snapshot: 2,400 employees\n'
            '- Web Branch Performance: 4,000 rows (100 branches x 40 weeks)\n'
            '- Company: 100 branches, 5 regions, 4 channels\n',
            encoding='utf-8')
        rezip_pack(root, zp)
    make_company_profile(DAY1_WEB / 'Nova_Company_Profile.html')
    make_branch_html(DAY1_WEB / 'Branch_Performance.html')

def dirty_branch_performance():
    """Logical grain = one Branch ID + one Date. 100 branches x 500 dates = 50,000 valid-grain rows before injected duplicates."""
    branches = branch_catalog_rows()
    local = random.Random(261200)
    start = date(2025,1,1)
    header = ['Record ID','Date','Branch ID','Branch Name','Region','Channel','Revenue','Target Revenue','Operating Cost','Budget Cost','Planned Headcount','Actual Headcount','Vacant Positions','Manager']
    rows = []
    record_no = 1
    for branch in branches:
        planned_hc = local.randint(18,45)
        for day_offset in range(500):
            dt = start + timedelta(days=day_offset)
            target = round(local.uniform(1800,5600),2)
            revenue = round(target * local.uniform(.72,1.22),2)
            budget = round(target * local.uniform(.18,.29),2)
            cost = round(budget * local.uniform(.86,1.18),2)
            actual = max(10, planned_hc-local.randint(0,5))
            vacant = planned_hc-actual

            # Dirtiness changes representation, not business meaning.
            date_value = local.choice([dt.isoformat(),dt.strftime('%d/%m/%Y'),dt.strftime('%m-%d-%Y')])
            region = local.choice([branch['region'],branch['region'].lower(),branch['region'].upper(),f" {branch['region']} "])
            channel = local.choice([branch['channel'],branch['channel'].lower(),branch['channel'].upper(),f" {branch['channel']} "])
            branch_name = local.choice([branch['branch_name'],f" {branch['branch_name']} "])
            manager = f"  {branch['manager']}  "

            if record_no % 173 == 0: date_value = 'invalid-date'
            if record_no % 211 == 0: revenue = ''
            if record_no % 257 == 0: actual = 'N/A'
            if record_no % 389 == 0: cost = ''

            row = [f'NBD{record_no:07d}',date_value,branch['branch_id'],branch_name,region,channel,revenue,target,cost,budget,planned_hc,actual,vacant,manager]
            rows.append(row)
            # Intentional bad duplicate; duplicates are errors, not a second business record.
            if record_no % 499 == 0:
                rows.append(row[:])
            record_no += 1
    return header, rows

def dirty_customers(customers=None):
    customers = customers or customer_catalog_rows()
    rows = []
    for i, c in enumerate(customers, 1):
        name = c['customer_name']
        city = c['city']
        region = c['region']
        segment = c['segment']
        status = c['status']
        if i % 7 == 0: name = f' {name} '
        if i % 9 == 0: city = city.upper()
        if i % 11 == 0: region = region.lower()
        if i % 13 == 0: segment = f' {segment.lower()} '
        if i % 17 == 0: status = status.upper()
        email = f'customer{i}@example.com' if i % 31 else ''
        row = [c['customer_id'],name,city,region,segment,c['customer_type'],email,status]
        rows.append(row)
        if i % 997 == 0: rows.append(row[:])
    return ['Customer ID','Customer Name','City','Region','Segment','Customer Type','Email','Status'], rows

def update_day2():
    zp = DAY2_DOWNLOADS / 'Day02_CLEAN_DATA.zip'
    with tempfile.TemporaryDirectory() as td:
        root = unzip_pack(zp, Path(td))
        remove_if_exists(
            root,
            '02_Dirty_Sales_Data.xlsx','02_Customer_Master_Dirty.xlsx',
            '02_Dirty_Sales_Data_LARGE.csv','02_Customer_Master_Dirty_LARGE.csv',
            '01_Nova_Branch_Performance_Dirty_LARGE.csv','02_Nova_Customer_Master_Dirty_LARGE.csv',
            '03_Day_02_Cleaning_Checklist.xlsx','03_Nova_Cleaning_Checklist.xlsx',
            '00_USE_THE_LARGE_FILES.txt'
        )
        h, r = dirty_branch_performance()
        write_csv(root / '01_Nova_Branch_Daily_Performance_Dirty_LARGE.csv', h, r)
        h, r = dirty_customers(customer_catalog_rows())
        write_csv(root / '02_Nova_Customer_Master_Dirty_LARGE.csv', h, r)
        make_day2_excel_files(root)
        (root / '00_START_HERE.txt').write_text(
            'NOVA DISTRIBUTION GROUP - DAY 02\n\n'
            'Yesterday you connected Nova data. Today management tells you the Branch Daily Performance file is not trustworthy.\n'
            'Its intended grain is ONE row per Branch ID + Date. The clean business universe contains 100 branches x 500 dates = 50,000 logical records.\n'
            'Extra repeated rows are intentional bad duplicates to remove; they are not legitimate business events.\n\n'
            'Main lab: 01_Nova_Branch_Daily_Performance_Dirty_LARGE.csv (~50,000 logical rows + intentional duplicates)\n'
            'Challenge: 02_Nova_Customer_Master_Dirty_LARGE.csv (~8,000 customers)\n'
            'Use the checklist only after you inspect the data yourself.\n',
            encoding='utf-8')
        rezip_pack(root, zp)

def update_day3():
    zp = DAY3_DOWNLOADS / 'Day03_STOP_COPYING_FILES_LEARNER.zip'
    with tempfile.TemporaryDirectory() as td:
        root = unzip_pack(zp, Path(td))
        remove_if_exists(
            root,
            '02_Nova_Branch_Master.csv',
            '03_Customer_Master.xlsx','03_Nova_Customer_Master.xlsx','03_Nova_Customer_Master.csv',
            '03_Product_Master.xlsx','04_Nova_Product_Master.xlsx','04_Nova_Product_Master.csv',
            '04_Day_03_Automation_Challenge.xlsx','05_Nova_Automation_Challenge.xlsx',
            '00_AUTOMATION_SCALE.txt'
        )
        catalog = product_catalog_rows()
        customers = customer_catalog_rows()
        branches = branch_catalog_rows()

        header = ['Transaction ID','Date','Customer ID','Product ID','Sales Rep ID','Branch ID','Region','Channel','Quantity','Unit Price','Discount %','Revenue']
        folder = root / 'Monthly_Sales'
        folder.mkdir(parents=True, exist_ok=True)
        for p in folder.glob('*.csv'): p.unlink()
        mapping = {1:'Nova_Sales_2026-01_January.csv',2:'Nova_Sales_2026-02_February.csv',3:'Nova_Sales_2026-03_March.csv'}
        for month, fn in mapping.items():
            write_csv(folder / fn, header, monthly_sales_rows(40000, month, catalog, customers, branches))

        new = root / 'NEW_MONTH_TO_DROP_AFTER_BUILD'
        new.mkdir(parents=True, exist_ok=True)
        for p in new.glob('*.csv'): p.unlink()
        write_csv(new / 'Nova_Sales_2026-04_April.csv', header, monthly_sales_rows(40000, 4, catalog, customers, branches))

        write_csv(root / '02_Nova_Branch_Master.csv',
                  ['Branch ID','Branch Name','City','Region','Channel','Open Date','Branch Manager','Status'],
                  branch_master_rows(branches))
        write_customer_master_csv(root / '03_Nova_Customer_Master.csv', customers)
        write_product_master_csv(root / '04_Nova_Product_Master.csv', catalog)
        make_day3_excel_files(root)

        (root / '00_START_HERE.txt').write_text(
            'NOVA DISTRIBUTION GROUP - DAY 03\n\n'
            'The Day 1 consolidated Sales file contained January-March 2026. Today you receive those EXACT SAME 120,000 business rows as three monthly source files.\n'
            'Nova receives one new Sales CSV every month, so the process cannot depend on Copy/Paste.\n\n'
            '1) Connect to Monthly_Sales as a Folder.\n'
            '2) Combine January-March.\n'
            '3) Keep Source File Name.\n'
            '4) Merge Branch, Customer and Nova Product masters.\n'
            '5) Move April into Monthly_Sales only after the pipeline works, then Refresh.\n\n'
            'Data integrity: Branch ID determines Region and Channel consistently in both facts and Branch Master. Product and Customer IDs all come from the supplied masters.\n'
            'Budget and Workforce remain separate business facts for the semantic model later; do not force them into Sales transactions.\n',
            encoding='utf-8')
        (root / '00_AUTOMATION_SCALE.txt').write_text(
            'Monthly_Sales: Jan-Mar = 3 x 40,000 = 120,000 rows, identical to Day 1 consolidated Sales.\n'
            'April: 40,000 new rows held separately for the refresh proof.\n'
            'Branches: 100 | Customers: 8,000 | Products: 240.\n',
            encoding='utf-8')
        rezip_pack(root, zp)

def main():
    update_day1()
    update_day2()
    update_day3()
    print('Generated Nova Week 1 training case successfully.')  # QA trigger

if __name__ == '__main__':
    main()
