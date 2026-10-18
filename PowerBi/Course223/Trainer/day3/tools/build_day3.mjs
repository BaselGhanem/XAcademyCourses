const fs = await import(`node:fs/promises`);
const path = await import(`node:path`);
const {fileURLToPath} = await import(`node:url`);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), `../../..`);
const dataDir = path.join(root, `week1/day3/data`);
const referenceDir = path.join(root, `Trainer/day3/reference`);
await fs.mkdir(dataDir, {recursive:true});
await fs.mkdir(referenceDir, {recursive:true});
const columns = [`RecordID`,`EmployeeID`,`Department`,`EvaluationType`,`Period`,`EvaluationDate`,`EvaluatorID`,`ObjectiveID`,`ObjectiveWeight`,`KPIID`,`Score`,`Status`];
const departments = [`Human Resources`,`Finance`,`Operations`,`Quality`];
const weights = [30,25,20,15,10];
const types = [`Self`,`Manager`,`Upward`];
const id = number => `E${String(number).padStart(5,`0`)}`;
const department = number => departments[(number-1)%departments.length];
const quote = value => /[",\r\n]/.test(String(value ?? ``)) ? `"${String(value ?? ``).replaceAll(`"`,`""`)}"` : String(value ?? ``);
async function csv(file, headers, rows) {
  await fs.writeFile(file, `\uFEFF${headers.join(`,`)}\r\n${rows.map(row=>headers.map(column=>quote(row[column])).join(`,`)).join(`\r\n`)}\r\n`);
}
const text = value => String(value ?? ``).replaceAll(`\u00A0`,` `).replace(/[\x00-\x1F\x7F]/g,``).trim();
const proper = value => { const t=text(value).toLowerCase(); return t.charAt(0).toUpperCase()+t.slice(1); };
function clean(row) {
  const result=Object.fromEntries(columns.map(column=>[column,text(row[column])]));
  result.Department = result.Department === `HR` ? `Human Resources` : result.Department;
  result.EvaluationType = proper(result.EvaluationType);
  result.Status = proper(result.Status);
  result.Score = result.Score === `` ? null : Number(result.Score.replace(`pts`,``).trim());
  result.ObjectiveWeight = Number(result.ObjectiveWeight);
  const [d,m,y]=result.EvaluationDate.split(`/`);
  result.EvaluationDate=`${y}-${m}-${d}`;
  return result;
}
function stats(rows) {
  const scores=rows.filter(row=>row.Score !== null).map(row=>row.Score);
  return {rows:rows.length,employees:new Set(rows.map(row=>row.EmployeeID)).size,scoreCount:scores.length,missingScores:rows.length-scores.length,zeroScores:scores.filter(value=>value===0).length,scoreSum:scores.reduce((a,b)=>a+b,0),pending:rows.filter(row=>row.Status===`Pending`).length,byType:Object.fromEntries(types.map(type=>[type,rows.filter(row=>row.EvaluationType===type).length]))};
}
const descriptors = [
  {name:`Evaluations_Jul.csv`,period:`2026-07`,first:1,seed:7},
  {name:`Evaluations_Aug.csv`,period:`2026-08`,first:1,seed:8},
  {name:`Evaluations_Sep.csv`,period:`2026-09`,first:1,seed:9},
  {name:`Practice_Apr.csv`,period:`2026-04`,first:3001,seed:24},
  {name:`Practice_May.csv`,period:`2026-05`,first:3001,seed:25}
];
const cleaned = new Map();
const summary = {provenance:`Deterministic synthetic training data. No real employee records.`,grain:`One KPI for one evaluated employee, period, evaluation direction, evaluator and objective.`,files:{}};
for (const source of descriptors) {
  const base=[]; let sequence=0;
  const [year,month]=source.period.split(`-`);
  for(let employee=source.first;employee<source.first+400;employee++) {
    for(let typeIndex=0;typeIndex<types.length;typeIndex++) {
      for(let objective=1;objective<=5;objective++) {
        for(let kpi=1;kpi<=2;kpi++) {
          sequence++;
          const missing=sequence%101===0;
          const numericScore=sequence%127===0 ? 0 : (employee*13+objective*11+kpi*7+typeIndex*17+source.seed*19)%101;
          const row={RecordID:`${year}${month}-${String(sequence).padStart(5,`0`)}`,EmployeeID:id(employee),Department:department(employee),EvaluationType:types[typeIndex],Period:source.period,EvaluationDate:`${String(1+employee%28).padStart(2,`0`)}/${month}/${year}`,EvaluatorID:typeIndex===0?id(employee):id(typeIndex===1?8001+employee%500:5001+employee%1000),ObjectiveID:`OBJ${String(objective).padStart(2,`0`)}`,ObjectiveWeight:String(weights[objective-1]),KPIID:`KPI${objective}${kpi}`,Score:missing?``:String(numericScore),Status:missing?`Pending`:`Completed`};
          if(sequence%29===0)row.EmployeeID=` ${row.EmployeeID} `;
          if(sequence%37===0)row.Department=`\u00A0${row.Department}\u00A0`;
          if(sequence%41===0)row.EvaluationType=row.EvaluationType.toLowerCase();
          if(sequence%43===0 && !missing)row.Score=` ${row.Score} `;
          if(sequence%53===0)row.Status=row.Status.toLowerCase();
          if(sequence%67===0 && row.Department===`Human Resources`)row.Department=`HR`;
          if(sequence%97===0 && !missing)row.Score=`${row.Score.trim()} pts`;
          if(sequence%73===0)row.Status=`\t${row.Status}\t`;
          base.push(row);
        }
      }
    }
  }
  const raw=[...base,...base.filter((_,index)=>(index+1)%100===0).map(row=>({...row}))];
  const unique=[...new Map(raw.map(row=>{const normalized=clean(row);return [JSON.stringify(normalized),normalized];})).values()];
  if(raw.length!==12120 || unique.length!==12000)throw new Error(`Unexpected size for ${source.name}`);
  cleaned.set(source.name,unique);
  summary.files[source.name]={rawRows:raw.length,removedDuplicates:raw.length-unique.length,...stats(unique)};
  await csv(path.join(dataDir,source.name),columns,raw);
}
const excluded=new Set([...Array.from({length:10},(_,index)=>391+index),...Array.from({length:5},(_,index)=>3396+index)]);
const masterIds=Array.from({length:10015},(_,index)=>index+1).filter(number=>!excluded.has(number));
const master=masterIds.map(number=>({EmployeeID:id(number),EmployeeName:`Employee ${String(number).padStart(5,`0`)}`,Department:department(number),Location:[`Central Office`,`East Site`,`West Site`,`North Site`][number%4],JobFamily:(number<=400||number>=3001&&number<=3400)?`Team Lead`:[`Analyst`,`Coordinator`,`Specialist`][number%3]}));
const dirtyMaster=master.map((row,index)=>({...row,EmployeeID:index%47===0?` ${row.EmployeeID} `:row.EmployeeID,Department:index%59===0?`\u00A0${row.Department}\u00A0`:row.Department===`Human Resources`&&index%61===0?`HR`:row.Department}));
await csv(path.join(dataDir,`Employees.csv`),Object.keys(master[0]),dirtyMaster);
const byEmployee=new Map(master.map(row=>[row.EmployeeID,row]));
summary.files[`Employees.csv`]={rawRows:master.length,rows:master.length,distinctEmployeeIDs:byEmployee.size};
function combined(names) { return names.flatMap(name=>cleaned.get(name).map(row=>({...row,[`Source.Name`]:name}))); }
function joined(rows) { return rows.map(row=>{const match=byEmployee.get(row.EmployeeID);return {...row,EmployeeName:match?.EmployeeName??null,EmployeeDepartment:match?.Department??null,Location:match?.Location??null};}); }
summary.stages={};
for(const [stage,names] of Object.entries({Application_BeforeRefresh:[`Evaluations_Jul.csv`,`Evaluations_Aug.csv`],Application_AfterRefresh:[`Evaluations_Jul.csv`,`Evaluations_Aug.csv`,`Evaluations_Sep.csv`],Practice_BeforeRefresh:[`Practice_Apr.csv`],Practice_AfterRefresh:[`Practice_Apr.csv`,`Practice_May.csv`]})) {
  const rows=joined(combined(names));
  const unmatched=rows.filter(row=>row.EmployeeName===null);
  summary.stages[stage]={files:names.length,rawRows:names.reduce((sum,name)=>sum+summary.files[name].rawRows,0),...stats(rows),matchedRows:rows.length-unmatched.length,unmatchedRows:unmatched.length,unmatchedEmployeeIDs:[...new Set(unmatched.map(row=>row.EmployeeID))],departmentMismatches:rows.filter(row=>row.EmployeeName!==null&&row.Department!==row.EmployeeDepartment).length};
}
summary.duplicateMasterExperiment={key:`E00001`,before:24000,after:24060,extraRows:60,explanation:`Adding one copy of E00001 to the lookup duplicates 30 KPI rows per period across two periods.`};
await fs.writeFile(path.join(referenceDir,`validation.json`),JSON.stringify(summary,null,2)+`\n`);
console.log(JSON.stringify({files:summary.files,stages:summary.stages,duplicateMasterExperiment:summary.duplicateMasterExperiment},null,2));
