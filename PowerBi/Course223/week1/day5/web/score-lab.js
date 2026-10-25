(()=>{
  const defaults=[[60,80],[85,95],[75,85]];
  const weights=[30,40,30];
  const get=id=>document.getElementById(id);
  const missing=get(`missing`);
  const fmt=n=>Number(n).toFixed(1);
  const render=()=>{
    let final=0;
    weights.forEach((weight,i)=>{
      const scores=[0,1].map(j=>Number(get(`k-${i}-${j}`).value));
      scores.forEach((score,j)=>{get(`v-${i}-${j}`).textContent=String(score)});
      const unavailable=missing.checked&&i===2;
      const average=(scores[0]+scores[1])/2;
      const contribution=average*weight/100;
      final+=contribution;
      get(`avg-${i}`).textContent=unavailable?`—`:fmt(average);
      get(`result-${i}`).textContent=unavailable?`—`:fmt(contribution);
      get(`formula-${i}`).textContent=unavailable?`Incomplete KPI assessment`:`${fmt(average)} × ${weight}% = ${fmt(contribution)}`;
      get(`bar-${i}`).style.width=unavailable?`0%`:`${Math.min(100,Math.max(0,average))}%`;
      document.querySelectorAll(`.objective`)[i].classList.toggle(`incomplete`,unavailable);
    });
    const incomplete=missing.checked;
    get(`last-kpi`).classList.toggle(`absent`,incomplete);
    get(`k-2-1`).disabled=incomplete;
    get(`total`).textContent=incomplete?`—`:fmt(final);
    get(`score-unit`).textContent=incomplete?`غير مكتمل`:`/ 100`;
    get(`status`).classList.toggle(`alert`,incomplete);
    get(`status`).lastChild.textContent=incomplete?` تقييم ناقص`:` تقييم مكتمل`;
    get(`ring`).style.setProperty(`--score`,incomplete?0:Math.max(0,Math.min(100,final)));
    get(`insight`).textContent=incomplete
      ?`في KPI ما اله تقييم، لذلك ما بنعتمد نتيجة نهائية للموظف. غياب الدرجة مش صفر، ولا بنعيد توزيع وزن الهدف بدون قاعدة معتمدة`
      :`كل هدف اله وزن مختلف. متوسط KPIs × وزن الهدف، وبعدها بنجمع مساهمات كل الاهداف المكتملة`;
    get(`insight`).classList.toggle(`alert`,incomplete);
  };
  document.querySelectorAll(`input[type="range"]`).forEach(el=>el.addEventListener(`input`,render));
  missing.addEventListener(`change`,render);
  get(`reset`).addEventListener(`click`,()=>{
    defaults.forEach((scores,i)=>scores.forEach((score,j)=>{get(`k-${i}-${j}`).value=String(score)}));
    missing.checked=false;
    render();
  });
  render();
})();