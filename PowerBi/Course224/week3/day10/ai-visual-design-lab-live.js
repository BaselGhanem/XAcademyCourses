(function enhanceVisualLab(){
  "use strict";
  const $ = id => document.getElementById(id);
  if (!$("previewStage") || !$("step0")) return;
  const config = [
    [
      {title:"شو بدك تعرف من البيانات؟",sub:"اختار مثال من مجالك أو اكتب السؤال الإداري بطريقتك",ids:["business"],extra:"roles"},
      {title:"على أي بيانات رح يعتمد الرسم؟",sub:"استخدم أسماء الـMeasures والحقول الموجودة فعليا داخل الـModel",ids:["measures","dimension"]},
      {title:"كيف بدك تقرأ النتائج؟",sub:"حدد الفترة والوحدة وإذا في مقارنة مع هدف أو موازنة",ids:["period","unit","compare"]}
    ],
    [
      {title:"شو أنسب Visual لسؤالك؟",sub:"نوع الرسم، عدد العناصر، وطريقة ترتيبها",ids:["chart","topN","sort"]},
      {title:"قديش المساحة المتاحة عندك؟",sub:"استخدم المقاسات الفعلية داخل Power BI أو اختار حجم مقترح",ids:["width","height","sizePreset"]},
      {title:"شو التفاصيل اللي بدك تظهر؟",sub:"كل تبديل رح ينعكس على المعاينة قبل ما تنسخ الـPrompt",ids:["responsive","chartNotes"]}
    ],
    [
      {title:"شو الهوية البصرية المناسبة؟",sub:"لون، خلفية، وخط واضح يناسب جمهورك",ids:["bg","font","primaryColor","secondaryColor"]},
      {title:"كيف تحب تكون المسافات والحواف؟",sub:"غيّر القيم وراقب الفرق على الـLive Preview",ids:["radius","padding"]},
      {title:"اختار تأثير بصري واحد",sub:"التأثيرات للزينة فقط، ولازم ما تأثر على البيانات أو الأرقام",ids:[],extra:"effects"},
      {title:"كيف بدك الحركة والتفاعل؟",sub:"جرب تمرر الماوس فوق المعاينة حتى تشوف الـHover",ids:["intensity","speed","hover","loop","designNotes"]}
    ],
    [
      {title:"وين رح تستخدم الـVisual؟",sub:"حدد إصدار الـHTML Visual وطريقة تسليم الكود",ids:["target","output","language"]},
      {title:"شو قواعد سلامة البيانات؟",sub:"عالج القيم الفارغة، حدد سقف الفئات، وفعل وضع الأمان",ids:["maxRows","edgeCases","safeMode"],extra:"safety"},
      {title:"هل عندك ملاحظات أو مرجع؟",sub:"المرجع اختياري، وبيظل محلي على جهازك",ids:["technicalNotes","referenceInput"],extra:"technical"}
    ]
  ];
  const sections = Array.from({length:4},(_,i)=>$("step"+i));
  const scenes = [];
  const originalNext = $("nextStep"), originalPrev = $("prevStep");
  const progressBar=document.createElement("div");
  progressBar.className="typeform-progress";
  progressBar.innerHTML='<span class="typeform-track"><i></i></span><span class="en">0%</span>';
  document.querySelector("#studio .studio")?.classList.add("typeform-active");
  const flat=config.flat();
  let selectedChapter=0, selectedQuestion=0;

  function addField(group,id){
    const el=$(id);
    if(!el)return;
    let item=el.closest(".field");
    if(!item && el.closest(".inline-toggles"))item=el.closest(".inline-toggles");
    if(!item || group.contains(item))return;
    group.appendChild(item);
  }
  config.forEach((steps,chapter)=>{
    const panel=sections[chapter];
    const container=document.createElement("div");
    container.className="typeform-scenes";
    const top=document.createElement("div");
    top.className="typeform-overview";
    top.innerHTML='<span>POWER BI · VISUAL STUDIO</span><span class="en" id="typeformLocal'+chapter+'"></span>';
    panel.append(top,container);
    scenes[chapter]=[];
    steps.forEach((step,index)=>{
      const page=document.createElement("article");
      page.className="typeform-question";
      page.hidden=index!==0;
      page.setAttribute("aria-label",step.title);
      page.innerHTML='<div class="typeform-brow"><span class="typeform-num en">'+String(index+1).padStart(2,"0")+'</span><span> / '+String(steps.length).padStart(2,"0")+'</span></div><h4></h4><p class="typeform-sub"></p>';
      page.querySelector("h4").textContent=step.title;
      page.querySelector(".typeform-sub").textContent=step.sub;
      const fieldset=document.createElement("div");
      fieldset.className="typeform-fields";
      step.ids.forEach(id=>addField(fieldset,id));
      if(step.extra==="roles"){
        const roles=$("rolePresets");
        if(roles){
          const samples=document.createElement("details");
          samples.className="typeform-help";
          samples.innerHTML="<summary>اختار مثال جاهز من مجالك <span>↗</span></summary>";
          const previous=roles.previousElementSibling;
          if(previous&&previous.classList.contains("note"))samples.appendChild(previous);
          const label=roles.previousElementSibling;
          if(label&&label.classList.contains("group-label"))label.remove();
          samples.appendChild(roles);
          fieldset.prepend(samples);
        }
      }
      if(step.extra==="effects"){
        const grid=$("effectsGrid");
        if(grid)fieldset.appendChild(grid);
      }
      if(step.extra==="safety"){
        const ribbon=panel.querySelector(".safety-ribbon");
        if(ribbon){
          const details=document.createElement("details");
          details.className="typeform-help";details.innerHTML="<summary>ليش نبدأ بنسخة Static؟</summary>";
          details.appendChild(ribbon);fieldset.appendChild(details);
        }
      }
      if(step.extra==="technical"){
        const note=Array.from(panel.querySelectorAll(".note")).find(x=>x.closest(".field"));
        if(note)fieldetAppend(fieldset,note.closest(".field"));
      }
      page.appendChild(fieldset);
      container.appendChild(page);
      scenes[chapter].push(page);
    });
  });
  function fieldetAppend(parent,child){if(child && !parent.contains(child))parent.appendChild(child);}
  // Move interaction toggles that live outside .field containers into the active question.
  const interactionGroup=$("loop")?.closest(".inline-toggles");
  if(interactionGroup){
    const target=scenes[2][3].querySelector(".typeform-fields");
    target.appendChild(interactionGroup);
  }
  // Compact auxiliary group labels are no longer shown outside their individual questions.
  const introLabel=$("rolePresets")?.closest("details")?.querySelector(".group-label");
  if(introLabel)introLabel.remove();
  sections.forEach((panel,chapter)=>{
    panel.insertBefore(chapter===0?progressBar:progressBar.cloneNode(true),panel.firstChild);
  });
  // Only use the first progress ID; each chapter also has its own CSS track, kept in sync.
  function screen(chapter,question,focus){
    selectedChapter=Math.max(0,Math.min(3,chapter));
    selectedQuestion=Math.max(0,Math.min(config[selectedChapter].length-1,question));
    scenes.forEach((group,c)=>group.forEach((item,i)=>{item.hidden=!(c===selectedChapter&&i===selectedQuestion);}));
    const local=0;
    const index=config.slice(0,selectedChapter).reduce((n,x)=>n+x.length,0)+selectedQuestion+1;
    const pct=Math.round(index/flat.length*100);
    sections.forEach((panel,c)=>{
      panel.querySelectorAll(".typeform-track i").forEach(bar=>{bar.style.width=pct+"%";});
      panel.querySelectorAll(".typeform-progress .en").forEach(node=>{node.textContent=pct+"%";});
      const counter=$("typeformLocal"+c);if(counter)counter.textContent=String(selectedQuestion+1).padStart(2,"0")+" / "+String(config[selectedChapter].length).padStart(2,"0");
    });
    $("stepCounter").textContent="السؤال "+index+" من "+flat.length;
    originalPrev.disabled=index===1;
    originalNext.textContent=index===flat.length?"اعرض الـPrompt ↙":"التالي ←";
    Array.from(document.querySelectorAll("[data-step]")).forEach((tab,c)=>{
      tab.classList.toggle("typeform-done",c<selectedChapter);
      tab.setAttribute("aria-label","المرحلة "+(c+1)+" من 4");
    });
    if(focus){
      const panel=sections[selectedChapter];
      const top=panel.getBoundingClientRect().top;
      if(top < 80 || top > window.innerHeight-110)panel.scrollIntoView({behavior:"smooth",block:"start"});
    }
  }
  function switchChapter(chapter,question){
    if(chapter<0||chapter>3)return;
    $("tab"+chapter).click();
    screen(chapter,question,true);
  }
  function go(delta){
    let c=selectedChapter,q=selectedQuestion+delta;
    if(q>=config[c].length){if(c===3){$("promptResult").scrollIntoView({behavior:"smooth"});return;} c++;q=0;}
    if(q<0){if(c===0)return;c--;q=config[c].length-1;}
    if(c!==selectedChapter)switchChapter(c,q);else screen(c,q,true);
  }
  originalNext.addEventListener("click",e=>{e.stopImmediatePropagation();go(1);},true);
  originalPrev.addEventListener("click",e=>{e.stopImmediatePropagation();go(-1);},true);
  document.querySelectorAll("[data-step]").forEach(tab=>tab.addEventListener("click",()=>screen(Number(tab.dataset.step),0,false)));
  sections.forEach(s=>s.addEventListener("keydown",e=>{
    if(e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||e.altKey)return;
    if(e.target.matches("textarea,select,button,summary,input[type=color],input[type=checkbox],input[type=file]"))return;
    if(e.target.matches("input")){e.preventDefault();go(1);}
  }));
  window.day10LiveReset=()=>screen(0,0,false);
  screen(0,0,false);

  const stage=$("previewStage");
  const chartHost=$("chartSvg");
  let meta=$("livePreviewMeta");
  if(!meta){meta=document.createElement("div");meta.id="livePreviewMeta";meta.className="live-preview-meta";chartHost.after(meta);}

  const plotLegend=document.createElement("div");
  plotLegend.className="live-plot-legend";
  plotLegend.hidden=true;
  chartHost.after(plotLegend);
  const hoverTip=document.createElement("div");
  hoverTip.className="live-hover-tooltip";
  hoverTip.setAttribute("role","tooltip");
  stage.appendChild(hoverTip);
  chartHost.addEventListener("pointermove",ev=>{
    if(gv("hover")!=="HTML tooltip with contextual value"||!gv("tooltip")){hoverTip.classList.remove("visible");return;}
    const shape=ev.target.closest?.(".live-shape, .chart-line");
    if(!shape){hoverTip.classList.remove("visible");return;}
    const value=shape.querySelector("title")?.textContent||"Illustrative data point";
    hoverTip.textContent=value;
    const rect=stage.getBoundingClientRect();
    hoverTip.style.left=Math.max(40,Math.min(rect.width-40,ev.clientX-rect.left))+"px";
    hoverTip.style.top=Math.max(45,ev.clientY-rect.top)+"px";
    hoverTip.classList.add("visible");
  });
  chartHost.addEventListener("pointerleave",()=>hoverTip.classList.remove("visible"));
  const detail=document.createElement("details");
  detail.className="live-preview-config";
  detail.innerHTML='<summary>إعدادات المعاينة الحالية <span class="en" id="liveTouched">LIVE</span></summary><div id="liveConfigRows"></div>';
  $("validationAlert").before(detail);
  const contextual=document.createElement("div");
  contextual.className="live-preview-context";contextual.id="livePreviewContext";
  $("previewSize").parentElement.after(contextual);

  const gv=id=>{const e=$(id);return e?(e.type==="checkbox"?e.checked:e.value):"";};
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,Number(x)||0));
  const wording=(id)=>{let el=$(id);if(!el)return "";return el.tagName==="SELECT"?el.selectedOptions[0]?.textContent||"":String(gv(id));};
  const allKeys=["business","measures","dimension","period","unit","compare","chart","topN","sort","width","height","responsive","labels","legend","axes","chartNotes","bg","font","primaryColor","secondaryColor","radius","padding","intensity","speed","hover","loop","tooltip","reduced","designNotes","target","output","language","maxRows","edgeCases","safeMode","technicalNotes"];
  let changed="";
  function valueFormat(n){
    const unit=gv("unit");
    if(unit.includes("Percentage"))return Math.round(n)+"%";
    if(unit.includes("JOD"))return Math.round(n).toLocaleString("en-US")+" JD";
    if(unit.includes("Compact"))return (n/1000).toFixed(1)+"K";
    return Math.round(n).toLocaleString("en-US");
  }
  function render(){
    const chart=gv("chart"),n=clamp(gv("topN"),1,100),limit=clamp(gv("maxRows"),1,300);
    const max=Math.min(n,limit,20),w=clamp(gv("width"),150,3840),h=clamp(gv("height"),100,2160);
    const benchmark=String(gv("compare")||"").trim(), measures=String(gv("measures")||"").trim();
    const dimension=String(gv("dimension")||"").trim(),axes=gv("axes"),labels=gv("labels"),legend=gv("legend"),tooltip=gv("tooltip");
    const period=String(gv("period")),sort=String(gv("sort")),bg=String(gv("bg"));
    const effect=document.querySelector('.fx-option[aria-pressed="true"]');
    const code=effect?.dataset.effect||"0";
    const reduced=gv("reduced")&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intensity=gv("intensity");
    const motionOn=intensity!=="Off"&&!reduced;
    const looping=gv("loop");
    const ratio=w/h;
    const sceneText=String(gv("business")||"").trim();
    const rtl=gv("language")!=="English LTR";
    const accent=gv("primaryColor"),gold=gv("secondaryColor");
    stage.classList.toggle("live-light",bg==="Light pearl");
    stage.classList.toggle("live-responsive",!!gv("responsive"));
    stage.style.setProperty("--accent",accent);stage.style.setProperty("--accent2",gold);
    stage.style.setProperty("--motion",(clamp(gv("speed"),.3,30)/(intensity==="Expressive"?.7:intensity==="Subtle"?1.4:1))+"s");
    stage.style.setProperty("--live-iterations",looping?"infinite":"1");
    stage.style.setProperty("--live-strength",intensity==="Expressive"?"1.18":intensity==="Subtle"?"0.85":"1");
    stage.style.setProperty("--live-font",gv("font").startsWith("Inter")?"Inter,Arial,sans-serif":gv("font").startsWith("Segoe")?"'Segoe UI',Arial,sans-serif":"Almarai,'Segoe UI',sans-serif");
    stage.style.padding=clamp(gv("padding"),0,90)+"px";
    stage.style.borderRadius=clamp(gv("radius"),0,70)+"px";
    stage.style.setProperty("background",bg==="Transparent"?"repeating-conic-gradient(#ffffff06 0% 25%,transparent 0% 50%) 0 0 / 18px 18px, #10212a":bg==="Light pearl"?"#edf7f7":bg==="Glass translucent"?"linear-gradient(135deg,#17616c77,#ffffff0c)":"#101e2a","important");
    stage.style.color=bg==="Light pearl"?"#183744":"#effafa";
    stage.style.fontFamily="var(--live-font)";
    stage.style.width=(ratio<.8?Math.max(63,Math.round(100*ratio/.8)):100)+"%";
    stage.style.minHeight=ratio<.8?"300px":"250px";
    stage.style.maxWidth="calc(100% - 34px)";
    stage.style.height="auto";
    stage.style.marginInline="auto";
    stage.style.animationPlayState=motionOn?"running":"paused";
    stage.style.animationIterationCount=looping?"infinite":"1";
    stage.dataset.motion=motionOn?"on":"off";
    stage.dataset.loop=looping?"yes":"no";
    stage.dataset.hover=gv("hover").includes("lift")?"lift":gv("hover").includes("tooltip")?"tooltip":gv("hover")==="No hover interaction"?"none":"highlight";
    stage.classList.toggle("qa-mode",$("previewQAToggle").getAttribute("aria-pressed")==="true");
    const title=$("previewTitle");
    title.textContent=(sceneText||"Nova · Business Performance").slice(0,140);
    title.dir=rtl?"rtl":"ltr";
    $("previewChartType").textContent=chart.toUpperCase();
    $("previewSize").textContent=w+" × "+h+" px";
    $("previewMode").textContent=wording("bg");
    $("previewEffect").textContent=effect?.querySelector("b")?.textContent||"Neon Pulse";
    let arr=Array.from({length:max},(_,i)=>({value:Math.max(4,93-i*4.2+((i*11)%13)),label:String(i+1).padStart(2,"0")}));
    if(sort==="Ascending by primary measure")arr.reverse();
    if(sort==="Chronological by date"||sort==="No enforced sorting")arr=arr.map((v,i)=>({...v,value:Math.max(5,35+((i*33+14)%65))}));
    const deflabel=(i)=>{
      if(period.startsWith("Daily"))return "D"+(i+1);
      if(period.startsWith("Month"))return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i%12];
      if(period.startsWith("Year"))return String(2021+i);
      return "Item "+String(i+1).padStart(2,"0");
    };
    const line=(x1,y1,x2,y2,color="#51717c",dash="")=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1" ${dash?`stroke-dasharray="${dash}"`:""}/>`;
    const rect=(x,y,rw,rh,fill="var(--accent)",rad=4)=>`<rect class="live-shape" x="${x}" y="${y}" width="${Math.max(0,rw)}" height="${Math.max(0,rh)}" rx="${rad}" fill="${fill}" />`;
    const txt=(x,y,t,size=10,anchor="start",fill="var(--live-text,#a9c9d1)")=>`<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" fill="${fill}">${esc(t)}</text>`;
    const marks=(x,y,value)=>tooltip?`<title>${esc(valueFormat(value))} · Sample data</title>`:"";
    const isQA=$("previewQAToggle").getAttribute("aria-pressed")==="true";
    let out="",height=160;
    if(isQA){
      height=160;
      [100,90,0].forEach((p,i)=>{
        const y=24+i*47;
        out+=txt(8,y+13,["MAX","SECOND","ZERO"][i],10);
        out+=rect(73,y,246,24,"var(--live-track,#25515b)",6);
        if(p)out+=rect(73,y,p*2.46,24,"var(--accent)",6);
        if(labels)out+=txt(332,y+16,p+"%",10,"end");
      });
      $("previewChartType").textContent="BAR SCALE CHECK";
    }else if(["Horizontal Bar Chart","Lollipop Chart","Diverging Bar Chart"].includes(chart)){
      const rowH=max>8?30:38;
      height=26+max*rowH;
      if(axes)for(let j=0;j<5;j++)out+=line(73+j*59,8,73+j*59,height-4,"var(--live-grid,#44616b)",j===0?"":"2 5");
      arr.forEach((v,i)=>{
        const y=12+i*rowH;
        out+=txt(3,y+17,deflabel(i),9);
        const barW=v.value*2.44;
        if(chart==="Diverging Bar Chart"){
          if(axes&&i===0)out+=line(195,3,195,height-7,"var(--accent2)");
          const neg=i%2===0;
          out+=rect(neg?195-barW*.54:195,y,barW*.54,18,neg?"var(--accent2)":"var(--accent)",5);
        }else if(chart==="Lollipop Chart"){
          out+=line(73,y+10,73+barW,y+10,"var(--accent)");
          out+=`<circle class="live-shape" cx="${73+barW}" cy="${y+10}" r="7" fill="var(--accent2)">${marks(0,0,v.value)}</circle>`;
        }else{
          out+=rect(73,y,244,19,"var(--live-track,#244a55)",5);
          out+=`<rect class="live-shape" x="73" y="${y}" width="${barW}" height="19" rx="5" fill="var(--accent)">${marks(0,0,v.value)}</rect>`;
        }
        if(labels)out+=txt(335,y+15,valueFormat(v.value),9,"end");
      });
    }else if(["Line Chart","Area Chart","Column Chart","Scatter Plot","Waterfall","Timeline","Funnel","Bullet Chart","Heatmap","Matrix","Waffle Chart","Treemap"].includes(chart)){
      const M=Math.min(20,Math.max(1,arr.length));
      height=175;
      const axisY=142;
      if(axes)for(let k=0;k<4;k++)out+=line(24,12+k*42,336,12+k*42,"var(--live-grid,#44616b)","3 5");
      if(chart==="Line Chart"||chart==="Area Chart"){
        const points=arr.map((d,i)=>[24+(M===1?140:i*305/(M-1)),axisY-d.value*1.22]);
        const path=points.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
        if(chart==="Area Chart")out+=`<path d="${path} L ${points[points.length-1][0]} ${axisY} L 24 ${axisY} Z" fill="var(--accent)" opacity=".18"/>`;
        out+=`<path d="${path}" stroke="var(--accent)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none" class="chart-line"/>`;
        points.forEach((p,i)=>{out+=`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="var(--accent2)"><title>${esc(valueFormat(arr[i].value))}</title></circle>`;if(labels&&M<11)out+=txt(p[0],p[1]-9,valueFormat(arr[i].value),8,"middle");});
      }else if(chart==="Column Chart"||chart==="Waterfall"){
        const width=295/M;let running=0;
        arr.forEach((item,i)=>{const val=chart==="Waterfall"?(i===0?item.value:((i%2)?-1:1)*item.value/2):item.value;running+=val;const bh=chart==="Waterfall"?Math.abs(val)*.6:item.value*1.1;const y=chart==="Waterfall"?Math.max(11,axisY-Math.abs(running)*.66):axisY-bh;out+=`<rect class="live-shape" x="${28+i*width}" y="${y}" width="${Math.max(3,width-4)}" height="${Math.max(2,bh)}" rx="3" fill="${chart==="Waterfall"&&val<0?"var(--accent2)":"var(--accent)"}"><title>${esc(valueFormat(item.value))}</title></rect>`;if(labels&&M<=9)out+=txt(28+i*width+width/2,y-5,valueFormat(item.value),8,"middle");});
      }else if(chart==="Scatter Plot"){
        arr.forEach((v,i)=>out+=`<circle class="live-shape" cx="${22+(i*57)%310}" cy="${axisY-v.value*1.2}" r="${4+(i%4)}" fill="${i%3?"var(--accent)":"var(--accent2)"}" opacity=".85"><title>${esc(valueFormat(v.value))}</title></circle>`);
      }else if(chart==="Timeline"){
        out+=line(22,77,327,77,"var(--accent)",4);
        arr.forEach((v,i)=>{const x=22+(M===1?150:i*305/(M-1));out+=`<circle cx="${x}" cy="77" r="8" fill="var(--accent2)"/>`;if(labels&&M<=9)out+=txt(x,101,deflabel(i),9,"middle");});
      }else if(chart==="Funnel"){
        arr.slice(0,Math.min(M,8)).forEach((v,i)=>{const width=290-i*30;const x=175-width/2,y=10+i*18;out+=rect(x,y,width,14, i%2?"var(--accent2)":"var(--accent)",3);if(labels)out+=txt(175,y+10,deflabel(i),9,"middle","#eaf9fb");});
      }else if(chart==="Bullet Chart"){
        out+=rect(24,64,306,43,"var(--live-track,#25515b)",6);out+=rect(24,75,245,22,"var(--accent)",3);
        if(benchmark)out+=line(279,58,279,112,"var(--accent2)");
        if(labels)out+=txt(24,126,valueFormat(arr[0]?.value||70),12);
      }else if(chart==="Heatmap"||chart==="Matrix"){
        const cells=Math.min(M*4,60),cols=Math.min(10,Math.max(3,M));
        for(let k=0;k<cells;k++){const cw=308/cols;out+=rect(20+(k%cols)*cw,12+Math.floor(k/cols)*25,cw-4,20,k%3?"var(--accent)":"var(--accent2)",3);};
      }else if(chart==="Waffle Chart"){
        const cells=Math.min(100,M*10);
        for(let k=0;k<100;k++)out+=rect(20+(k%20)*15.5,10+Math.floor(k/20)*29,12,21,k<cells?"var(--accent)":"var(--live-track,#24515a)",2);
      }else if(chart==="Treemap"){
        const cols=Math.min(M,8);const rows=Math.ceil(M/4);
        height=Math.max(132,rows*70);
        arr.slice(0,8).forEach((v,i)=>{const x=14+(i%4)*80,y=10+Math.floor(i/4)*66;out+=rect(x,y,76,61,i%3?"var(--accent)":"var(--accent2)",6);if(labels)out+=txt(x+8,y+35,deflabel(i),9,"start","#ffffff");});
      }
      if(axes&&["Line Chart","Area Chart","Column Chart","Scatter Plot","Waterfall"].includes(chart)){
        out+=line(23,142,338,142,"var(--live-grid,#44616b)");
        if(M<=10)arr.forEach((_,i)=>{out+=txt(24+(M===1?140:i*305/(M-1)),162,deflabel(i),8,"middle");});
      }
    }else if(["Donut Chart","Progress Ring","Gauge","KPI Card"].includes(chart)){
      height=170;
      if(chart==="KPI Card"){
        out+=txt(18,87,valueFormat(gv("unit").includes("Percentage")?78:842500),43,"start","currentColor");
        if(benchmark)out+=txt(18,116,"↑ 12.8% · "+benchmark.slice(0,19),12,"start","var(--accent2)");
        out+=`<path class="chart-line" d="M240 137 L260 104 L280 120 L310 58 L329 36" stroke="var(--accent)" stroke-width="3" fill="none"/>`;
      }else if(chart==="Gauge"){
        out+=`<path d="M70 139 A104 104 0 0 1 280 139" stroke="var(--live-track,#25515b)" stroke-width="23" fill="none"/><path d="M70 139 A104 104 0 0 1 243 62" stroke="var(--accent)" stroke-width="23" fill="none"/>`;
        if(labels)out+=txt(175,127,"78%",30,"middle","currentColor");
      }else{
        const cx=175,cy=87,r=54,stroke=23,circ=2*Math.PI*r;
        out+=`<circle cx="${cx}" cy="${cy}" r="${r}" stroke="var(--live-track,#25515b)" stroke-width="${stroke}" fill="none"/>`;
        const count=chart==="Progress Ring"?1:Math.min(8,M||3);
        let pos=0,total=arr.slice(0,count).reduce((t,d)=>t+d.value,0)||1;
        arr.slice(0,count).forEach((d,i)=>{
          const frac=chart==="Progress Ring"?.78:(d.value/total);
          out+=`<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${i%2?"var(--accent2)":"var(--accent)"}" stroke-width="${stroke}" stroke-dasharray="${frac*circ} ${circ}" stroke-dashoffset="${-pos*circ}" transform="rotate(-90 ${cx} ${cy})" fill="none"><title>${esc(valueFormat(d.value))}</title></circle>`;
          pos+=frac;
        });
        if(labels)out+=txt(cx,94,chart==="Progress Ring"?"78%":String(count)+" groups",22,"middle","currentColor");
      }
    }else{
      height=160;
      out+=rect(42,35,220,30,"var(--accent)",7);
      if(labels)out+=txt(152,88,"Illustrative visual",15,"middle");
    }
    const svg=`<svg class="live-drawn-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="معاينة توضيحية لـ ${esc(chart)} باستخدام بيانات تجريبية" viewBox="0 0 350 ${Math.max(160,height)}" style="height:${Math.max(160,height)}px;max-height:none;width:100%;overflow:visible" preserveAspectRatio="xMidYMid meet">${out}</svg>`;
    chartHost.innerHTML=svg;
    chartHost.style.maxHeight=(ratio<.8?230:Math.min(280,Math.max(175,h*.57)))+"px";
    chartHost.style.overflowY=height>(ratio<.8?230:Math.min(280,Math.max(175,h*.57)))?"auto":"hidden";
    chartHost.style.overflowX="hidden";
    const oldQa=$("qaRows");if(oldQa)oldQa.hidden=true;
    plotLegend.hidden=!legend;
    if(legend){
      plotLegend.replaceChildren();
      const values=[["var(--accent)","Main series"],["var(--accent2)",benchmark?"Benchmark":"Accent"]];
      values.forEach(([color,name])=>{
        const el=document.createElement("span"),dot=document.createElement("i");
        dot.style.background=color;
        el.appendChild(dot);
        el.appendChild(document.createTextNode(name));
        plotLegend.appendChild(el);
      });
    }

    // Respect the line chart axes/legend/labels and expose all non-visual specifications as live metadata.
    meta.replaceChildren();
    const chips=[];
    if(measures)chips.push(measures.split(/[,;\n]+/)[0].trim().slice(0,42));
    if(dimension)chips.push(dimension.slice(0,37));
    chips.push(wording("period"));
    chips.push(wording("unit"));
    if(benchmark)chips.push("VS "+benchmark.slice(0,35));
    if(legend)chips.push("● Main  ● Compare");
    if(!gv("responsive"))chips.push("Fixed width");
    chips.slice(0,5).forEach(t=>{const span=document.createElement("span");span.textContent=t;meta.appendChild(span);});
    const touched=$("liveTouched");
    if(touched)touched.textContent=changed?("● "+changed):"● LIVE";
    const mappings=[
      ["chart",chart],["topN","Top "+n+(n>limit?" · max "+limit:"")],["sort",wording("sort")],
      ["labels","Labels "+(labels?"ON":"OFF")],["axes","Axes "+(axes?"ON":"OFF")],
      ["hover",wording("hover")],["tooltip","Tooltip "+(tooltip?"ON":"OFF")],
      ["intensity","Motion "+wording("intensity")],["speed",gv("speed")+"s · "+(looping?"loop":"once")],
      ["safeMode","Static-first "+(gv("safeMode")?"ON":"OFF")],
      ["edgeCases",wording("edgeCases")],
      ["target",wording("target")],["output",wording("output")],["language",wording("language")],
      ["chartNotes",String(gv("chartNotes")||"").trim()],
      ["designNotes",String(gv("designNotes")||"").trim()],
      ["technicalNotes",String(gv("technicalNotes")||"").trim()],
      ["reduced",gv("reduced")?"Reduced motion respected":"Reduced motion unchecked"],
      ["referenceInput",$("referenceName")?.textContent||""]
    ];
    const rows=$("liveConfigRows");
    rows.replaceChildren();
    mappings.forEach(([key,value])=>{
      if(!value)return;
      const item=document.createElement("div");item.className="live-config-row";
      const label=document.createElement("span");label.textContent=$(key)?.closest(".field")?.querySelector("label")?.textContent?.trim()||key;
      const val=document.createElement("strong");val.textContent=String(value).slice(0,125);
      item.append(label,val);rows.appendChild(item);
    });
    contextual.replaceChildren();
    const brief=[
      `${max} / ${n} categories illustrated`,
      `Canvas ${ratio.toFixed(2)}:1`,
      motionOn?`Motion · ${looping?"Loop":"Once"}`:"Static",
      benchmark?"Benchmark on":"No benchmark"
    ];

    if(gv("chartNotes"))brief.push("Chart instructions ✓");
    if(gv("designNotes"))brief.push("Design notes ✓");
    if(gv("technicalNotes"))brief.push("Technical notes ✓");
    if($("referenceName")?.textContent)brief.push("Visual reference ✓");
    brief.forEach(s=>{const span=document.createElement("span");span.textContent=s;contextual.appendChild(span);});
  }
  function previewChange(e){
    if(e?.target){
      changed=e.target.closest(".field")?.querySelector("label")?.textContent?.trim()||e.target.closest(".fx-option")?.querySelector("b")?.textContent||e.target.id||"Updated";
    }
    requestAnimationFrame(render);
  }
  document.querySelectorAll("[data-prompt]").forEach(el=>{
    el.addEventListener("input",previewChange);
    el.addEventListener("change",previewChange);
  });
  $("sizePreset")?.addEventListener("change",previewChange);
  $("rolePresets")?.addEventListener("click",e=>{if(e.target.closest("button")){previewChange(e);const d=$("rolePresets").closest("details");if(d)d.open=false;}});
  $("effectsGrid")?.addEventListener("click",previewChange);
  $("previewQAToggle")?.addEventListener("click",previewChange);
  $("resetButton")?.addEventListener("click",()=>{changed="Reset";requestAnimationFrame(render);});
  $("referenceInput")?.addEventListener("change",()=>setTimeout(render,50));
  $("removeReference")?.addEventListener("click",()=>setTimeout(render,50));
  $("referenceDrop")?.addEventListener("drop",()=>setTimeout(render,100));
  const mq=window.matchMedia?.("(prefers-reduced-motion: reduce)");
  mq?.addEventListener?.("change",render);
  window.addEventListener("resize",()=>requestAnimationFrame(render),{passive:true});
  render();
})();
