"""Independent audit of persisted source, clean output, review and scoring references."""
from pathlib import Path
from collections import Counter,defaultdict
from datetime import datetime
import csv,json,statistics,math
D=Path(__file__).resolve().parents[1]
def read(p):
 with p.open(encoding='utf-8-sig',newline='') as f:return list(csv.DictReader(f))
def normalize(s):return ''.join(c for c in s.replace('\xa0',' ') if ord(c)>=32).strip()
for name,expected in json.loads((D/'reference/validation.json').read_text()).items():
 raw=read(D/'data'/f'{name}_Dirty.csv');assert len(raw)>=10000
 unique=list({tuple(r.items()):r for r in raw}.values())
 counts=Counter(normalize(r['RecordKey']) for r in unique)
 good=[];bad=[];batches={}
 for src in unique:
  r={k:normalize(v) for k,v in src.items()};why=[]
  if counts[r['RecordKey']]>1:why.append('ConflictingKey')
  if not r['EmployeeID']:why.append('MissingEmployeeID')
  if why:bad.append({**r,'ReviewReason':'|'.join(why)});continue
  r['Department']={'HR':'Human Resources','Human Resorces':'Human Resources','IT':'Information Technology','Finanace':'Finance','':'Unassigned'}.get(r['Department'],r['Department'])
  r['EvaluationType']={'Self Assessment':'Self','Manger':'Manager','Manager Evaluation':'Manager','Upward Feedback':'Upward'}.get(r['EvaluationType'],r['EvaluationType'])
  r['Status']={'Done':'Completed','complete':'Completed','PENDING':'Pending','In progress':'Pending'}.get(r['Status'],r['Status'])
  try:n=float(r['Score'].removesuffix(' pts'))
  except ValueError:n=None
  r['Score']=n if n is not None and math.isfinite(n) and 0<=n<=100 and r['Status']=='Completed' else None
  date=''
  for fmt in ['%Y-%m-%d','%Y/%m/%d','%d/%m/%Y']:
   try:date=datetime.strptime(r['EvaluationDate'],fmt).strftime('%Y-%m-%d');break
   except ValueError:pass
  r['EvaluationDate']=date
  if r['BatchLabel']:batches[r['BatchID']]=r['BatchLabel']
  else:r['BatchLabel']=batches[r['BatchID']]
  good.append(r)
 output=read(D/'reference'/f'{name}_Expected.csv');review=read(D/'reference'/f'{name}_Review.csv')
 assert len(output)==len(good)>=10000
 for a,b in zip(good,output):
  for k,v in a.items():
   if k in ('Score','ObjectiveWeight','ExpectedKPIs'):assert (None if b[k]=='' else float(b[k]))==(None if v is None else float(v)),(name,k)
   else:assert str(v)==b[k],(name,k,v,b[k])
 assert review==bad
 numeric=[]
 for r in raw:
  try:numeric.append(float(r['Score']))
  except ValueError:pass
 objectives=defaultdict(list)
 for r in good:objectives[tuple(r[k] for k in ['EmployeeID','EvaluatorID','Period','EvaluationType','ObjectiveID'])].append(r)
 complete={k:rs for k,rs in objectives.items() if len(rs)==int(rs[0]['ExpectedKPIs']) and len({r['KPIID'] for r in rs})==int(rs[0]['ExpectedKPIs']) and all(r['Score'] is not None and r['Status']=='Completed' for r in rs) and len({r['ObjectiveWeight'] for r in rs})==1}
 calc=dict(raw_rows=len(raw),exact_duplicate_copies=len(raw)-len(unique),quarantine_rows=len(bad),quarantine_keys=len({r['RecordKey'] for r in bad}),accepted_rows=len(good),distinct_employees=len({r['EmployeeID'] for r in good}),raw_naive_numeric_count=len(numeric),raw_naive_score_sum=sum(numeric),raw_naive_mean=statistics.mean(numeric),valid_score_count=sum(r['Score'] is not None for r in good),missing_or_invalid_scores=sum(r['Score'] is None for r in good),valid_zero_scores=sum(r['Score']==0 for r in good),invalid_or_missing_dates=sum(not r['EvaluationDate'] for r in good),unassigned_departments=sum(r['Department']=='Unassigned' for r in good),score_sum=sum(r['Score'] or 0 for r in good),by_evaluation_type=dict(Counter(r['EvaluationType'] for r in good)),by_status=dict(Counter(r['Status'] for r in good)),complete_objectives=len(complete),incomplete_objectives=len(objectives)-len(complete),objective_score_sums_by_type={t:round(sum(statistics.mean(r['Score'] for r in rs) for k,rs in complete.items() if k[3]==t),6) for t in ['Self','Manager','Upward']},quarantine_reasons=dict(Counter(r['ReviewReason'] for r in bad)))
 evaluations=defaultdict(dict)
 for k,rs in complete.items():evaluations[k[:-1]][k[-1]]=(statistics.mean(r['Score'] for r in rs),float(rs[0]['ObjectiveWeight']))
 final=defaultdict(list)
 for k,os in evaluations.items():
  if set(os)=={'O1','O2','O3','O4','O5'} and sum(w for s,w in os.values())==100:final[k[3]].append(sum(s*w/100 for s,w in os.values()))
 calc['complete_evaluations_by_type']={t:{'count':len(final[t]),'weighted_score_sum':round(sum(final[t]),6),'weighted_score_mean':round(statistics.mean(final[t]),6) if final[t] else None} for t in ['Self','Manager','Upward']}
 for k,v in calc.items():
  if isinstance(v,float):assert math.isclose(v,expected[k],abs_tol=1e-9),(name,k)
  else:assert v==expected[k],(name,k,v,expected[k])
 assert len(raw)==len(raw)-len(unique)+len(bad)+len(good)
 assert len({r['RecordKey'] for r in good})==len(good)
 assert not {r['RecordKey'] for r in good}&{r['RecordKey'] for r in bad}
 print(f'PASS {name}: {len(raw):,} raw -> {len(good):,} clean + {len(bad):,} review; every row and reference metric reconciled')
