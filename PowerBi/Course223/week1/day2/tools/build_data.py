from pathlib import Path
import csv,json,random,collections,statistics,hashlib,zipfile
D=Path(__file__).resolve().parents[1]; R=D.parents[1]
fields=['SourceRowID','RecordKey','EmployeeID','EvaluatorID','Period','ObjectiveID','KPIID','ExpectedKPIs','ObjectiveWeight','Score','Department','EvaluationType','Status','EvaluationDate','EmployeeLabel','BatchID','BatchLabel']
def writecsv(p,rows):
 with p.open('w',newline='',encoding='utf-8-sig') as f:
  w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(rows)
def norm(v):return ''.join(c for c in str(v).replace('\xa0',' ') if ord(c)>=32).strip()
def clean(raw):
 # Independent of generation seed: only observable source fields and documented rules.
 exact=[];seen=set()
 for r in raw:
  k=tuple(r[c] for c in fields)
  if k not in seen:exact.append(r);seen.add(k)
 counts=collections.Counter(r['RecordKey'] for r in exact)
 accepted=[];review=[];lastbatch={}
 for src in exact:
  r={k:norm(v) for k,v in src.items()};reasons=[]
  if counts[r['RecordKey']]>1: reasons.append('ConflictingKey')
  if not r['EmployeeID']:reasons.append('MissingEmployeeID')
  if reasons: review.append({**r,'ReviewReason':'|'.join(reasons)});continue
  r['Department']={'HR':'Human Resources','Human Resorces':'Human Resources','IT':'Information Technology','Finanace':'Finance'}.get(r['Department'],r['Department']) or 'Unassigned'
  r['EvaluationType']={'Self Assessment':'Self','Manager Evaluation':'Manager','Manger':'Manager','Upward Feedback':'Upward'}.get(r['EvaluationType'],r['EvaluationType'])
  r['Status']={'complete':'Completed','Done':'Completed','PENDING':'Pending','In progress':'Pending'}.get(r['Status'],r['Status'])
  sc=r['Score'].replace(' pts','');r['Score']=float(sc) if sc not in ('','NULL','N/A') and sc.replace('.','',1).replace('-','',1).isdigit() else None
  if r['Score'] is not None and not 0<=r['Score']<=100:r['Score']=None
  if r['Status']=='Pending':r['Score']=None
  from datetime import datetime
  try:
   fmt='%Y-%m-%d' if '-' in r['EvaluationDate'] else ('%Y/%m/%d' if len(r['EvaluationDate'].split('/')[0])==4 else '%d/%m/%Y')
   r['EvaluationDate']=datetime.strptime(r['EvaluationDate'],fmt).strftime('%Y-%m-%d')
  except ValueError:r['EvaluationDate']=''
  r['ExpectedKPIs']=int(r['ExpectedKPIs']);r['ObjectiveWeight']=float(r['ObjectiveWeight'])
  if r['BatchLabel']:lastbatch[r['BatchID']]=r['BatchLabel']
  else:r['BatchLabel']=lastbatch.get(r['BatchID'],'')
  accepted.append(r)
 return accepted,review,len(raw)-len(exact)
def metrics(raw,accepted,review,dups):
 groups=collections.defaultdict(list)
 for r in accepted:groups[(r['EmployeeID'],r['EvaluatorID'],r['Period'],r['EvaluationType'],r['ObjectiveID'])].append(r)
 complete=[]
 for k,rs in groups.items():
  ok=len(rs)==rs[0]['ExpectedKPIs'] and len({r['KPIID'] for r in rs})==rs[0]['ExpectedKPIs'] and all(r['Score'] is not None and r['Status']=='Completed' for r in rs) and len({r['ObjectiveWeight'] for r in rs})==1
  if ok:complete.append((k,statistics.mean(r['Score'] for r in rs),rs[0]['ObjectiveWeight']))
 naive=[]
 for r in raw:
  try:naive.append(float(r['Score']))
  except ValueError:pass
 return dict(raw_rows=len(raw),exact_duplicate_copies=dups,quarantine_rows=len(review),quarantine_keys=len({r['RecordKey'] for r in review}),accepted_rows=len(accepted),distinct_employees=len({r['EmployeeID'] for r in accepted}),raw_naive_numeric_count=len(naive),raw_naive_score_sum=sum(naive),raw_naive_mean=sum(naive)/len(naive),valid_score_count=sum(r['Score'] is not None for r in accepted),missing_or_invalid_scores=sum(r['Score'] is None for r in accepted),valid_zero_scores=sum(r['Score']==0 for r in accepted),invalid_or_missing_dates=sum(not r['EvaluationDate'] for r in accepted),unassigned_departments=sum(r['Department']=='Unassigned' for r in accepted),score_sum=sum(r['Score'] or 0 for r in accepted),by_evaluation_type=dict(collections.Counter(r['EvaluationType'] for r in accepted)),by_status=dict(collections.Counter(r['Status'] for r in accepted)),complete_objectives=len(complete),incomplete_objectives=len(groups)-len(complete),objective_score_sums_by_type={t:round(sum(s for k,s,w in complete if k[3]==t),6) for t in ['Self','Manager','Upward']},quarantine_reasons=dict(collections.Counter(r['ReviewReason'] for r in review)))
def generate(n,name,seed):
 random.seed(seed);raw=[]
 for i in range(n):
  emp=i//30+1;within=i%30;typ=['Self','Manager','Upward'][within//10];obj=within%10//2+1;kpi=within%2+1
  score=(i*17+seed)%101
  r=dict(zip(fields,[f'S{seed}-{i+1:06}',f'R{seed}-{i+1:06}',f'E{seed}-{emp:04}',f'EV{seed}-{emp:04}' if typ=='Self' else f'V{seed}-{emp%40:03}', '2026-Q3',f'O{obj}',f'K{obj}{kpi}', '2',str([30,25,20,15,10][obj-1]),str(score),['Human Resources','Finance','Information Technology','Operations'][emp%4],typ,'Completed','2026-09-30',f'Employee {emp:04}|G{emp%5+1}',f'B{i//300:03}',f'Import {i//300:03}']))
  a=i%101
  if a==1:r['Department']='\xa0 '+r['Department']+' \t'
  if a==2:r['Department']={'Human Resources':'HR','Finance':'Finanace','Information Technology':'IT','Operations':' Operations '}.get(r['Department'])
  if a==3:r['Department']='Human Resorces'
  if a==4:r['EvaluationType']={'Self':'Self Assessment','Manager':'Manger','Upward':'Upward Feedback'}[typ]
  if a==5:r['Status']='Done'
  if a==6:r['Status']='PENDING';r['Score']=''
  if a==7:r['Score']='NULL'
  if a==8:r['Score']=' '
  if a==9:r['Score']='N/A'
  if a==10:r['Score']='125'
  if a==11:r['Score']='-5'
  if a==12:r['Score']+=' pts'
  if a==13:r['Score']='\xa0 '+r['Score']+' '
  if a==14:r['EvaluationDate']='30/09/2026'
  if a==15:r['EvaluationDate']='2026/09/30'
  if a==16:r['EvaluationDate']='31/02/2026'
  if a==17:r['EvaluationDate']='unknown'
  if a==18:r['EmployeeID']=''
  if a==19:r['Department']=''
  if a==20:r['Status']='In progress';r['Score']='0'
  if a==21:r['Score']='0'
  if a==22:r['Score']='abc'
  if i%300!=0 and i%7==0:r['BatchLabel']=''
  raw.append(r)
 # Exact copies and conflicting versions; unresolved conflicts must be reviewed, never guessed.
 raw.extend(dict(raw[i]) for i in range(0,n,100))
 for i in range(50,n,200):
  r=dict(raw[i]);r['SourceRowID']+='-V2';r['Score']='99' if r['Score']!='99' else '98';raw.append(r)
 writecsv(D/'data'/f'{name}_Dirty.csv',raw)
 accepted,review,dups=clean(raw)
 writecsv(D/'reference'/f'{name}_Expected.csv',[{k:('' if v is None else v) for k,v in r.items()} for r in accepted])
 with (D/'reference'/f'{name}_Review.csv').open('w',newline='',encoding='utf-8-sig') as f:
  w=csv.DictWriter(f,fieldnames=fields+['ReviewReason']);w.writeheader();w.writerows(review)
 # Verify reading real bytes, not only in-memory totals.
 with (D/'data'/f'{name}_Dirty.csv').open(encoding='utf-8-sig',newline='') as f:actual=list(csv.DictReader(f))
 a,q,d=clean(actual);assert a==accepted and q==review and d==dups;assert len(actual)>=10000 and len(a)>=10000
 return metrics(actual,a,q,d)
validation={name:generate(n,name,seed) for n,name,seed in [(30000,'Performance_KPI_30000',223),(12000,'Performance_Challenge_12000',224)]}
existing=D/'reference/validation.json'
if existing.exists():
 published=json.loads(existing.read_text())
 for name,metrics_ in validation.items():
  for k,v in metrics_.items():assert published[name][k]==v,(name,k)
else:raise RuntimeError('Published validation.json is required for weighted reference checks')
print('Generated datasets; run verify_data.py and refresh weighted reference metrics before publishing changes.')
