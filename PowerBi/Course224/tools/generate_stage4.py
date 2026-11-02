#!/usr/bin/env python3
"""Regenerate generic Day08–10 Power BI project labs and a source-aware Capstone.

Projects are PBIP (static source); they are not Desktop-validated PBIX files.
"""
from __future__ import annotations
import csv, hashlib, io, json, shutil, zipfile
from pathlib import Path
from tempfile import TemporaryDirectory
ROOT=Path(__file__).resolve().parents[1]
START=ROOT/'week3/day7/downloads/Nova_Day07_START_PBIP.zip'
OUTPUTS={
    8:ROOT/'week3/day8/downloads/Nova_Day08_Executive_360_PBIR.zip',
    9:ROOT/'week3/day9/downloads/Day09_INTERACTIVITY_LAB.zip',
   10:ROOT/'week3/day10/downloads/Day10_CAPSTONE.zip'
}
PROJECT_NAME='Nova'
PAGE_ROOT=Path('Nova.Report/definition/pages')
STEPS={
8:('DESIGN','Report Experience',[
  'DAY 08 — REPORT DESIGN / X ACADEMY',
  'Use the same 9-table Day07 domain-neutral model, including 160K original Jan–Apr 2026 sales.',
  'Choose one validated domain question. Audit two visuals: Keep / Change / Remove.',
  'Build clear KPI hierarchy, align whitespace, make a useful report-page tooltip.',
  'Create a Drillthrough detail page and explain how to return to the overview.',
  'Add Page Navigation and test filters under the same user selection.',
  'Charts and tooltips are YOUR work: this starter does not pretend they exist.',
  'Validate numbers and report behaviour in Desktop; Save As PBIX only after checks.'
]),
9:('CONTROL','Advanced Interactivity',[
  'DAY 09 — ADVANCED INTERACTIVITY / X ACADEMY',
  'Continue from the validated Day08 model (same Day07 full-grain data).',
  'Audit Visual / Page / Report filters; do not filter unrelated facts blindly.',
  'Sync a DimDate slicer on two pages; document exactly which pages it affects.',
  'Build a Show/Hide filter panel with Bookmarks: Display ON, Data OFF.',
  'Create a Field Parameter using columns confirmed in your selected domain.',
  'Add an accurate Dynamic Title; test single and multiple selections.',
  'Test all interactions with filters preserved and log results in the QA sheet.',
  'Interactive buttons/parameters are classroom tasks, not pre-built promises.'
]),
10:('CAPSTONE','From Data to Decision',[
  'DAY 10 — CAPSTONE / X ACADEMY',
  'Complete one continuous business case, any chosen professional domain.',
  'Required: 1 business decision, correct model, 4 KPIs, trend and 2 diagnostic visuals.',
  'Required: DAX validated with expected source outcomes, working drillthrough or tooltip.',
  'Required: 2 usable slicers, one controlled interaction and documented data limitations.',
  'Evidence: PBIX after Desktop QA, screenshots, numerical checks and insight/action.',
  'Optional extension: one AI-assisted HTML/SVG visual. Must match a native visual.',
  'Visual motion is decorative; static-first display and accessibility are required.',
  'Scoring rubric is inside the training pack. The model is source-checked, not Desktop-verified.'
])}
def write_json(path,obj):
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def add_page(project,day):
    label,title,lines=STEPS[day]
    pages=project/PAGE_ROOT
    meta=json.loads((pages/'pages.json').read_text(encoding='utf-8'))
    name='stage'+str(day)
    assert name not in meta['pageOrder']
    meta['pageOrder'].append(name)
    meta['activePageName']=name
    write_json(pages/'pages.json',meta)
    loc=pages/name
    write_json(loc/'page.json',{
      '$schema':'https://developer.microsoft.com/json-schemas/fabric/item/report/definition/page/2.1.0/schema.json',
      'name':name,'displayName':f'{day:02d} {title.upper()}',
      'displayOption':'FitToPage','width':1280,'height':720
    })
    visual={
      '$schema':'https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.9.0/schema.json',
      'name':'v0000','position':{'x':34,'y':30,'width':1210,'height':650,'z':0,'tabOrder':0},
      'visual':{'visualType':'textbox','objects':{'general':[{'properties':{'paragraphs':[
        {'textRuns':[{'value':line,'textStyle':{'fontFamily':'Segoe UI','fontSize':'18pt','color':'#13233B'}}]} for line in lines
      ]}}]}}
    }
    write_json(loc/'visuals/v0000/visual.json',visual)
    (project/'README.txt').write_text(
      f'COURSE224 — DAY {day:02d} {label}\n'
      'Unzip the whole project. Open Nova.pbip using current Power BI Desktop.\n'
      'The model is a copy of the validated Stage3 Day07 PBIP source. No new data source was invented.\n'
      'The instructional page is a STARTING POINT, not a finished report.\n'
      'Keep Report and SemanticModel folders together. Refresh and test measures/relationships.\n'
      'Power BI Desktop Save As PBIX is required for a final runnable learner handoff.\n',
      encoding='utf-8')
def pack_dir(folder,path):
    path.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
        for f in sorted(folder.rglob('*')):
            if f.is_file(): z.write(f,f.relative_to(folder))
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None
def source_signature(project):
    p=project/'Nova.SemanticModel/model.bim'
    obj=json.loads(p.read_text(encoding='utf-8'))
    tables={t['name']:t for t in obj['model']['tables']}
    # Reused model must preserve BOTH data partitions and DAX; compare full model checksum.
    sha=hashlib.sha256(p.read_bytes()).hexdigest()
    assert set(tables)=={'FactSales','DimDate','DimBranch','DimProduct','DimCustomer','DimDepartment',
                         'FactOperations','FactFinance','FactWorkforce'}
    assert len(obj['model']['relationships'])==11
    return sha
def make_capstone_pack(folder,out):
    from pathlib import Path
    # Universal deliverables: no learner names, no assumed specialty.
    guide=ROOT/'week3/day10/CAPSTONE_GUIDE.md'
    rubric=ROOT/'week3/day10/CAPSTONE_RUBRIC.csv'
    qa=ROOT/'week3/day10/CAPSTONE_QA_CHECKLIST.md'
    assert all(p.is_file() for p in (guide,rubric,qa))
    stage=folder.parent/'capstone_delivery'
    stage.mkdir()
    shutil.copy2(out,stage/'01_CAPSTONE_START_PBIP.zip')
    for p in (guide,rubric,qa): shutil.copy2(p,stage/p.name)
    shutil.copy2(ROOT/'datasets/STAGE3_TIME_VALIDATION.csv',stage/'SOURCE_TIME_REFERENCE.csv')
    link=stage/'02_DOMAIN_EXAMPLES.txt'
    link.write_text('Optional example domains: Performance/Sales, Operations, Finance, Workforce.\n'
                    'Browse Course224/week3/day7/web/*_SCENARIO.html and choose one question; every learner may propose another field-backed question.\n'
                    'AI Visual Design Lab is an optional extension, not mandatory to pass.\n',encoding='utf-8')
    pack_dir(stage,OUTPUTS[10])
def main():
    assert START.is_file(),START
    manifest={'source':str(START.relative_to(ROOT)),'source_sha256':hashlib.sha256(START.read_bytes()).hexdigest(),
              'days':{},'desktop_tested':False,'date':'2026-11-02'}
    with TemporaryDirectory(prefix='course224_stage4_') as t:
        work=Path(t)
        for day in (8,9,10):
            project=work/f'stage{day}'
            project.mkdir()
            with zipfile.ZipFile(START) as z:
                assert z.testzip() is None
                for member in z.infolist():
                    if member.is_dir():continue
                    rel=Path(member.filename)
                    assert '..' not in rel.parts and not rel.is_absolute()
                    output=project/rel;output.parent.mkdir(parents=True,exist_ok=True)
                    output.write_bytes(z.read(member))
            original=source_signature(project)
            add_page(project,day)
            assert source_signature(project)==original
            if day==10:
                starter=ROOT/'week3/day10/downloads/Nova_Day10_CAPSTONE_START_PBIP.zip'
                pack_dir(project,starter)
                make_capstone_pack(project,starter)
                output=starter
            else:
                output=OUTPUTS[day]
                if day==9:
                    # Day09 package includes checklist/theme without changing actual semantic model.
                    shutil.copy2(ROOT/'week3/day9/DAY09_STUDENT_MISSIONS.md',project/'DAY09_STUDENT_MISSIONS.md')
                    shutil.copy2(ROOT/'week3/day9/DAY09_CHECKLIST.md',project/'DAY09_CHECKLIST.md')
                    shutil.copy2(ROOT/'week3/day9/Nova_Day09_Theme.json',project/'Nova_Day09_Theme.json')
                if day==8:
                    shutil.copy2(ROOT/'week3/day8/REPORT_DESIGN_LAB.md',project/'REPORT_DESIGN_LAB.md')
                pack_dir(project,output)
            manifest['days'][str(day)]={'file':str(output.relative_to(ROOT)),
                                         'model_sha256':original,'archive_sha256':hashlib.sha256(output.read_bytes()).hexdigest()}
    assert len({x['model_sha256'] for x in manifest['days'].values()})==1
    write_json(ROOT/'datasets/STAGE4_BUILD_MANIFEST.json',manifest)
    print('STAGE4 BUILD PASSED',json.dumps(manifest,ensure_ascii=False))
if __name__=='__main__':main()
