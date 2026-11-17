(function course224TrainerApp(){
  `use strict`;
  const plans={
    1:{
      phase:`CONNECT`,
      intro:`نبدأ بقصة Nova، ثم نصل مصادر متعددة ونبني أول تقرير تفاعلي يجيب عن سؤال عمل. المهم فهم مصدر البيانات ومستواها، وليس مجرد رسم Chart.`,
      question:`أي Region أو Branch يحتاج انتباه الإدارة أولاً؟`,
      case:`NOVA · DATA TO REPORT`,
      steps:[
        {time:`00–10`,title:`افتتاح القضية التجارية`,say:`عرّف شركة Nova والتحدي: البيانات موزعة بين مبيعات وموظفين وموازنة ومصادر Web. المطلوب قرار إداري واضح.`,show:`افتح Nova Company Profile، واستعرض Business Performance 360 والبيانات المتاحة.`,practice:`اطلب من المتدربين صياغة سؤال تحليلي واحد قبل فتح أي Chart.`,check:`كل متدرب يحدد سؤالاً قابلاً للإجابة، مثل Revenue by Region.`},
        {time:`10–25`,title:`التثبيت وجولة Power BI`,say:`اشرح دورة العمل: Get Data ثم Transform ثم Model ثم Report، والفرق بين Report وData وModel Views.`,show:`افتح Power BI Desktop وورّهم الواجهة والـRibbon واللوحات الأساسية.`,practice:`يفتح كل متدرب ملف PBIX جديداً ويتنقل بين الواجهات.`,check:`يستطيع المتدرب تحديد مكان Get Data وTransform Data وReport View.`},
        {time:`25–45`,title:`ربط مصادر الملفات`,say:`فرّق بين المصدر والجدول المحمّل. لا تفترض أن جميع الملفات لها نفس الأعمدة أو نفس مستوى التفاصيل.`,show:`Get Data من Excel وCSV وTXT من Day01 Source Pack، مع معاينة Headers وأنواع البيانات.`,practice:`يربط المتدرب المصادر ويفحص أسماء الجداول والحقول قبل Load.`,check:`لا أعمدة مفقودة بسبب Header غير صحيح، وأنواع الحقول المهمة واضحة.`},
        {time:`45–70`,title:`Web وPDF ومفهوم ETL`,say:`اشرح Extract → Transform → Load على مصادر حقيقية، وأن بيانات Web Targets ليست بالضرورة على مستوى صف مبيعات.`,show:`افتح Budget PDF وNova Branch Performance من Web Connector، ثم Transform Data.`,practice:`يحدد المتدرب اختلاف مستوى التفاصيل بين مصدر المبيعات وأهداف Web الأسبوعية.`,check:`يشرح المتدرب لماذا لا نجمع جداول مختلفة الـGrain دون تحقق.`},
        {time:`70–95`,title:`أول لوحة وتحكم تفاعلي`,say:`ابدأ بالمؤشر، ثم المقارنة، ثم أداة الفلترة؛ لا تجعل تنسيق الشكل يسبق صحة الرقم.`,show:`أنشئ Total Revenue Card وRevenue by Region Bar Chart وChannel Slicer من بيانات المبيعات المناسبة.`,practice:`يعيد المتدرب بناء الثلاثة Visuals ويختبر تغيرها مع Slicer.`,check:`الـCard والـBar متسقان، والـSlicer يؤثر على Visuals المطلوبة.`},
        {time:`95–120`,title:`اختبار القرار وحفظ الناتج`,say:`اسأل: ما المنطقة التي تستحق المتابعة؟ وما الدليل؟ وضّح أن الـInsight أهم من ألوان الرسم.`,show:`اختبر Filters وInteractions، وراجع أسماء الصفحات والحقول، ثم Save As.`,practice:`يحفظ Nova_Business_Performance_360 باسمه ويذكر Insight واحداً مدعوماً برقم.`,check:`ملف PBIX محفوظ؛ السؤال الإداري واضح؛ وجميع الـVisuals تتفاعل كما ينبغي.`}
      ],
      output:`نسخة أولى من Nova Business Performance 360 تضم Revenue Card وRegion Bar وChannel Slicer، مع اتصال فعلي بالمصادر وفهم لمسار ETL.`,
      criteria:`التحقق: الاتصال بالمصادر، تمييز اختلاف الـGrain، تفاعل الفلاتر، وحفظ ملف PBIX.`,
      challenge:`لا تكتفِ بعرض Revenue: حدد Region أو Branch يحتاج متابعة، واشرح لماذا باستخدام الرسم والفلتر.`,
      resources:[
        {title:`Nova Company Profile`,type:`WEB`,url:`../week1/day1/web/Nova_Company_Profile.html`},
        {title:`Day 01 Source Pack`,type:`ZIP`,url:`../week1/day1/downloads/Day01_CONNECT_EVERYTHING.zip`},
        {title:`Branch Performance Web`,type:`WEB`,url:`../week1/day1/web/Branch_Performance.html`}
      ]
    },
    2:{
      phase:`CLEAN`,
      intro:`نحوّل Nova Branch Daily Performance من مصدر غير موثوق إلى Power Query pipeline قابلة لإعادة التشغيل، مع الحفاظ على المعنى الصحيح للقيم الناقصة والتواريخ والأخطاء.`,
      question:`كيف نضمن أن رقم Revenue صحيح قبل عرضه على الإدارة؟`,
      case:`NOVA · POWER QUERY`,
      steps:[
        {time:`00–10`,title:`مراجعة وتحديد Grain`,say:`راجع ETL من اليوم الأول ثم أكد أن السجل المنطقي هو Branch ID + Date، وليس Branch وحده.`,show:`افتح ملف Nova Branch Daily Performance غير المنظف، وعرّف مفاتيح الصف.`,practice:`يكتب المتدرب تعريف Grain ويحدد الأعمدة التي يجب تدقيقها.`,check:`يفهم الجميع لماذا يمكن للفرع نفسه الظهور في أكثر من تاريخ.`},
        {time:`10–30`,title:`فحص الأنواع والتواريخ`,say:`Data Type ليس مجرد تنسيق؛ اختلاف Locale قد يغيّر معنى اليوم والشهر. لا تحول التاريخ المعطوب إلى تاريخ افتراضي صامت.`,show:`Power Query Editor، Column Profile، Change Type with Locale، ومراجعة الصفوف التي تنتج Errors.`,practice:`يعالج المتدرب التواريخ الصحيحة ويضع الحالات غير الصالحة في قائمة استثناءات.`,check:`تم توثيق القيم المعطوبة ولم تُستبدل بتاريخ مخترع.`},
        {time:`30–50`,title:`تنظيف النصوص والتصنيفات`,say:`Trim يزيل المسافات الزائدة من الأطراف، وClean يعالج المحارف غير القابلة للطباعة. وحّد Region وChannel حسب قاموس واضح.`,show:`Transform → Format → Trim / Clean ثم Replace Values لتوحيد التسميات.`,practice:`يطبق المتدرب التنظيف على حقول التصنيف وأسماء المديرين.`,check:`Region وChannel لا يحتويان اختلافات غير مبررة للمسمى نفسه.`},
        {time:`50–75`,title:`Nulls وErrors بقرار تحليلي`,say:`Revenue أو Cost أو Headcount المفقود ليس صفراً تلقائياً؛ اتخذ قرار معالجة موثقاً حسب القاعدة التجارية.`,show:`افحص Nulls وErrors في الأعمدة الرقمية وشرح Replace Errors مقابل Remove Errors.`,practice:`يصنف المتدرب القيم الناقصة إلى قابلة للتصحيح وحالات تحتاج مراجعة.`,check:`لا توجد معالجة صامتة تغيّر الأرقام، والاستثناءات قابلة للتفسير.`},
        {time:`75–100`,title:`Duplicates وApplied Steps`,say:`فرّق بين صف مكرر فعلياً وبين سجلين صالحين للفرع في تاريخين مختلفين. ترتيب الخطوات يؤثر على النتيجة.`,show:`حالات Duplicate، Remove Duplicates بعد تحديد Grain، ثم Applied Steps وRefresh Preview.`,practice:`يزيل المتدرب التكرار الحقيقي ويعيد تشغيل الخطوات دون تدخل يدوي.`,check:`Grain سليم، عدد الصفوف مفهوم، ولا توجد خطوة تنشئ أخطاء جديدة.`},
        {time:`100–120`,title:`تحدي Customer Master المستقل`,say:`انتقل من التوجيه المباشر إلى الاستقلال: نفس مبادئ التنظيف لكن بدون وصفة خطوة بخطوة.`,show:`افتح Customer Master والـCleaning Checklist وحدد نقطة التسليم.`,practice:`ينظّف المتدرب Customer Master بنفسه، ويراجع الـKeys والقيم الناقصة.`,check:`الجدولان نظيفان ويقبلان Refresh، مع سجل واضح للاستثناءات.`}
      ],
      output:`Nova Branch Daily Performance وCustomer Master بنسختين نظيفتين، بخطوات Applied Steps مفهومة وقابلة للـRefresh.`,
      criteria:`التحقق: Branch ID + Date Grain، أنواع بيانات صحيحة، تصنيفات موحّدة، إزالة التكرار الحقيقي فقط، وعدم تحويل Nulls إلى صفر بلا مبرر.`,
      challenge:`نظّف Customer Master باستخدام قائمة التدقيق فقط؛ قدم ما تغير، وما بقي استثناءً، ولماذا.`,
      resources:[
        {title:`Day 02 Cleaning Lab`,type:`ZIP`,url:`../week1/day2/downloads/Day02_CLEAN_DATA.zip`},
        {title:`Expected Cleaning Results`,type:`CSV`,url:`../datasets/EXPECTED_RESULTS.csv`}
      ]
    },
    3:{
      phase:`AUTOMATE`,
      intro:`نستخدم ملفات Sales الشهرية من Nova لبناء Pipeline واحدة. ثم نضيف Masters ونجرب وصول ملف April عبر Refresh فقط، دون Copy/Paste أو تعديل الاستعلام يدوياً.`,
      question:`هل نستطيع إضافة شهر مبيعات جديد دون إعادة البناء؟`,
      case:`NOVA · FOLDER PIPELINE`,
      steps:[
        {time:`00–10`,title:`تحديد مشكلة العمل والـBaseline`,say:`كل شهر يصل ملف Sales جديد. الحل ليس دمجاً يدوياً جديداً بل استعلام Folder يعتمد على بنية موحدة.`,show:`اعرض ملفات January وFebruary وMarch وهدف الوصول إلى April.`,practice:`يشرح المتدرب لماذا تعتمد الاستمرارية على شكل الملفات ومفاتيحها.`,check:`Baseline واضح: Jan–Mar = 120,000 معاملة في ملفات التدريب.`},
        {time:`10–35`,title:`Folder Connector وCombine`,say:`اجمع الملفات لاستخراج الصفوف، واحتفظ باسم الملف المصدر لتتبع المعاملات.`,show:`Get Data → Folder → Combine & Transform Data وربط مجلد Monthly_Sales.`,practice:`يبني المتدرب استعلام Combine لـJanuary–March ويراجع تحويل نموذج الملف.`,check:`النتيجة 120,000 صف، واسم الملف المصدر موجود، ولا يوجد Header مكرر كبيانات.`},
        {time:`35–55`,title:`Append مقابل Merge وإدارة Queries`,say:`Append يزيد الصفوف، بينما Merge يضيف حقولاً عبر Keys. اشرح Reference مقابل Duplicate، وEnable Load للاستعلام النهائي.`,show:`لوحة Queries وQuery Dependencies واستعلامات التحضير الناتجة من Combine.`,practice:`يميّز المتدرب نوع العملية المناسب للمبيعات الشهرية أو للجداول المرجعية.`,check:`يفهم لماذا لا نحمّل كل استعلام تحضيري إلى الـModel.`},
        {time:`55–80`,title:`Merge مع Master Tables`,say:`كل Merge يحتاج مفتاحاً سليماً وMaster غير مكرر على المفتاح؛ تكرار المفتاح في Master قد يضاعف الصفوف.`,show:`Merge مع Branch Master ثم Customer Master ثم Product Master، مع Expand للحقول المطلوبة.`,practice:`ينفذ المتدرب الـMerges بالتتابع ويختار الأعمدة الضرورية فقط.`,check:`عدد الصفوف لا يتضخم بعد أي Merge، والمفاتيح غير المطابقة ظاهرة للمراجعة.`},
        {time:`80–100`,title:`تدقيق الجودة وتحضير التحميل`,say:`قارن الأعداد والإيراد بالمراجع المعتمدة، ثم حمّل Analytical Query النهائية فقط.`,show:`Count Rows، الأعمدة المضافة، Missing Keys، Enable Load وClose & Apply.`,practice:`يتحقق المتدرب من ثبات 120,000 صف ومن سلامة التوسيع والتحميل.`,check:`لا تضاعف للمعاملات، والأعمدة الجديدة صحيحة، واستعلامات Staging غير محمّلة بلا حاجة.`},
        {time:`100–120`,title:`اختبار April وRefresh`,say:`نجاح الأتمتة ليس أن April يظهر بعد خطوات جديدة، بل أنه يظهر دون تعديل الاستعلام.`,show:`أضف ملف April إلى نفس المجلد ثم نفّذ Refresh وقارن الأعداد.`,practice:`يكرر المتدرب الاختبار بنفسه ويتحقق من بيانات April الجديدة.`,check:`Jan–Apr = 160,000 صف، دون Copy/Paste أو خطوات يدوية أو تغيير مفاتيح.`}
      ],
      output:`Power Query Folder pipeline تجمع المبيعات الشهرية وتضيف بيانات Branch وCustomer وProduct، وتستوعب April من خلال Refresh فقط.`,
      criteria:`التحقق: 120,000 معاملة قبل April ثم 160,000 بعدها، دون تضاعف في الـMerge، مع بقاء Source File Name.`,
      challenge:`أعد العملية من مجلد المصدر حتى الجدول النهائي، ثم برهن دخول April بالـRefresh وحده.`,
      resources:[
        {title:`Day 03 Automation Pack`,type:`ZIP`,url:`../week1/day3/downloads/Day03_STOP_COPYING_FILES_LEARNER.zip`},
        {title:`Data Lineage`,type:`MD`,url:`../datasets/DATA_LINEAGE.md`},
        {title:`Expected Results`,type:`CSV`,url:`../datasets/EXPECTED_RESULTS.csv`}
      ]
    }
  };
  const ready=new Set([1,2,3]);
  const sourceDays=typeof DAYS!==`undefined`?DAYS:[];
  const view=document.body.dataset.view;
  const id=Number(new URLSearchParams(location.search).get(`id`)||`1`);
  const titleMap=new Map(sourceDays.map(day=>[day.id,day]));
  const escapeHtml=value=>String(value).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`);
  function getSaved(key,fallback){
    try{const saved=localStorage.getItem(key);return saved===null?fallback:JSON.parse(saved)}catch{return fallback}
  }
  function setSaved(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
  function createNav(){
    const parent=document.getElementById(`xp-days`);
    if(!parent)return;
    sourceDays.forEach(day=>{
      const linked=ready.has(day.id);
      const a=document.createElement(linked?`a`:`div`);
      a.className=`xp-day-link${view===`day`&&day.id===id?` is-active`:``}${linked?``:` is-planned`}`;
      if(linked)a.href=`day.html?id=${day.id}`;
      if(view===`day`&&day.id===id)a.setAttribute(`aria-current`,`page`);
      a.innerHTML=`<span class="xp-day-numeral">${String(day.id).padStart(2,`0`)}</span><span class="xp-day-text"><strong>${escapeHtml(day.titleAr)}</strong><small>${linked?`خطة المدرب جاهزة`:`قيد التجهيز`}</small></span>`;
      parent.append(a);
    });
    const toggle=document.getElementById(`xp-toggle`);
    const back=document.getElementById(`xp-backdrop`);
    const close=()=>{document.body.classList.remove(`xp-open`);toggle?.setAttribute(`aria-expanded`,`false`);if(back)back.hidden=true};
    toggle?.addEventListener(`click`,()=>{const open=document.body.classList.toggle(`xp-open`);toggle.setAttribute(`aria-expanded`,String(open));if(back)back.hidden=!open});
    back?.addEventListener(`click`,close);
    document.addEventListener(`keydown`,event=>{if(event.key===`Escape`)close()});
  }
  function renderOverview(){
    const cards=document.getElementById(`xp-daycards`);
    if(cards){
      sourceDays.forEach(day=>{
        const linked=ready.has(day.id);
        const el=document.createElement(linked?`a`:`article`);
        el.className=`xp-daycard${linked?``:` is-planned`}${day.id===3?` is-featured`:``}`;
        if(linked)el.href=`day.html?id=${day.id}`;
        const date=day.date?new Date(`${day.date}T12:00:00`).toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`}).toUpperCase():`—`;
        el.innerHTML=`<div class="xp-daycard-head"><span class="xp-card-num">DAY ${String(day.id).padStart(2,`0`)}</span><span class="xp-card-date">${escapeHtml(date)}</span></div><h3>${escapeHtml(day.titleAr)}</h3><div class="xp-daycard-foot"><span>${linked?`خطة المدرب · 120 دقيقة`:`قيد التجهيز`}</span><span>${linked?`↖`:`—`}</span></div>`;
        cards.append(el);
      });
    }
    document.querySelectorAll(`[data-prep]`).forEach(box=>{
      const key=`xa224_preflight_${box.dataset.prep}`;
      box.checked=getSaved(key,false);
      box.addEventListener(`change`,()=>setSaved(key,box.checked));
    });
  }
  function renderDay(){
    const plan=plans[id];
    const day=titleMap.get(id);
    if(!plan||!day){location.replace(`index.html`);return;}
    document.title=`Day ${String(id).padStart(2,`0`)} | Trainer Studio · Course224`;
    const assign=(selector,value)=>{const element=document.querySelector(selector);if(element)element.textContent=value};
    assign(`#xp-crumb-day`,`DAY ${String(id).padStart(2,`0`)}`);
    assign(`#session-phase`,`DAY ${String(id).padStart(2,`0`)} · ${plan.phase}`);
    assign(`#session-title`,day.titleAr);
    assign(`#session-intro`,plan.intro);
    assign(`#session-case`,plan.case);
    assign(`#session-question`,plan.question);
    assign(`#session-output`,plan.output);
    assign(`#session-criteria`,plan.criteria);
    assign(`#session-challenge`,plan.challenge);
    const stepsRoot=document.getElementById(`trainer-steps`);
    const key=`xa224_steps_day${id}`;
    const completed=new Set(getSaved(key,[]));
    function updateProgress(){
      assign(`#progress-label`,`${completed.size} / ${plan.steps.length}`);
      document.getElementById(`progress-bar`).style.width=`${completed.size/plan.steps.length*100}%`;
    }
    plan.steps.forEach((step,index)=>{
      const number=index+1;
      const article=document.createElement(`article`);
      article.className=`trainer-step${completed.has(number)?` is-done`:``}`;
      const fields=[
        [`شو أحكي؟`,step.say,``],
        [`شو أعرض؟`,step.show,``],
        [`تطبيق المتدرب`,step.practice,``],
        [`نقطة تحقق`,step.check,` check`]
      ];
      article.innerHTML=`<div class="step-head"><div class="step-head-main"><span class="step-number">${String(number).padStart(2,`0`)}</span><div><h3>${escapeHtml(step.title)}</h3><small>${escapeHtml(step.time)} MIN</small></div></div><label class="step-complete"><input type="checkbox" aria-label="إنجاز المرحلة ${number}"${completed.has(number)?` checked`:``}>تم الإنجاز</label></div><div class="step-fields">${fields.map(([label,value,extra])=>`<div class="step-field${extra}"><b>${escapeHtml(label)}</b><p>${escapeHtml(value)}</p></div>`).join(``)}</div>`;
      const checkbox=article.querySelector(`input`);
      checkbox.addEventListener(`change`,()=>{
        if(checkbox.checked)completed.add(number);else completed.delete(number);
        article.classList.toggle(`is-done`,checkbox.checked);
        setSaved(key,[...completed]);
        updateProgress();
      });
      stepsRoot.append(article);
    });
    updateProgress();
    const links=document.getElementById(`session-links`);
    plan.resources.forEach(resource=>{
      const a=document.createElement(`a`);
      a.href=resource.url;a.target=`_blank`;a.rel=`noopener`;
      a.innerHTML=`<span class="resource-icon">${escapeHtml(resource.type)}</span><span><strong>${escapeHtml(resource.title)}</strong><small>OPEN RESOURCE ↖</small></span>`;
      links.append(a);
    });
    const note=document.getElementById(`trainer-notes`);
    const noteKey=`xa224_trainer_notes_day${id}`;
    note.value=getSaved(noteKey,``);
    note.addEventListener(`input`,()=>setSaved(noteKey,note.value));
    const prev=document.getElementById(`day-prev`);
    const next=document.getElementById(`day-next`);
    if(id>1){prev.href=`day.html?id=${id-1}`;prev.textContent=`السابق · DAY ${String(id-1).padStart(2,`0`)}`;}
    else{prev.classList.add(`disabled`);prev.removeAttribute(`href`);prev.textContent=`لا يوجد يوم سابق`;}
    if(id<3){next.href=`day.html?id=${id+1}`;next.textContent=`التالي · DAY ${String(id+1).padStart(2,`0`)}`;}
    else{next.classList.add(`disabled`);next.removeAttribute(`href`);next.textContent=`اليوم الرابع لاحقاً`;}
  }
  createNav();
  if(view===`overview`)renderOverview();
  if(view===`day`)renderDay();
})();