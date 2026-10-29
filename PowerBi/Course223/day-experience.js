function initCourseDayJourney(day, courseHome) {
  const escape = value => String(value ?? ``).replace(/[&<>"']/g, c => ({[`&`]:`&amp;`,[`<`]:`&lt;`,[`>`]:`&gt;`,[`"`]:`&quot;`,[`'`]:`&#39;`}[c]));
  const number = String(day.id).padStart(2, `0`);
  const resources = day.ready ? getLearnerResources(day) : (day.requiredFiles || []);
  const fileList = resources.length ? resources.map(file => {
    const copy = `<span class="mj-resource-icon">${escape(file.type)}</span><span><b>${escape(file.name)}</b><small>${escape(file.note || ``)}</small></span>`;
    return day.ready && file.url ? `<a class="mj-resource" href="${escape(file.url)}" ${file.type === `PBIX` ? `download="HR_Performance_Intelligence_Day04_Backup.pbix"` : `target="_blank" rel="noopener"`}>${copy}</a>` : `<div class="mj-resource">${copy}<small>قيد التجهيز</small></div>`;
  }).join(``) : `<p class="mj-copy">ملفات التطبيق بتظهر هون لما تجهز</p>`;
  const steps = day.build || [];
  const middle = Math.ceil(steps.length / 2);
  const renderSteps = (list, offset) => list.map((text, i) => `<article class="mj-block"><span class="mj-num">${String(offset+i+1).padStart(2,`0`)}</span><p class="mj-copy">${escape(text)}</p></article>`).join(``);
  const chapter = (label, name, title, body, next) => ({label, name, title, body, next, scene:day.title, tag:`DAY ${number} / ${day.phase}`});
  let chapters = [
    chapter(`01 / SEE THE GOAL`, `نشوف الفكرة`, escape(day.titleAr), `<p class="mj-lead">${escape(day.hook)}</p><div class="mj-callout">${escape(day.mission)}</div><p class="mj-note">${escape(dayScheduleLabel(day))}${COURSE_CONFIG.sessionHours ? ` • ${COURSE_CONFIG.sessionHours} ساعة` : ``}</p>${day.ready ? `` : `<p class="mj-note">هاي خطة اليوم، ملفات التطبيق لسا قيد التجهيز</p>`}<details><summary>${day.ready ? `ملفات اليوم` : `ملفات التطبيق المطلوبة`}</summary><div id="mj-resources">${fileList}</div></details>`, `يلا نشوف اول خطوة`),
    chapter(`02 / GET STARTED`, `نبلش التطبيق`, `نبلش خطوة<br>بخطوة`, renderSteps(steps.slice(0,middle),0), `نكمل ونشوف النتيجة`),
    chapter(`03 / BUILD & CHECK`, `نبني ونتاكد`, `نطبق،<br>ونتاكد من النتيجة`, `${renderSteps(steps.slice(middle),middle)}<div class="mj-callout">${escape(day.deliverable)}</div><details><summary>المهارات اللي بنمر عليها</summary><p class="mj-copy" dir="ltr">${(day.topics||[]).map(escape).join(` · `)}</p></details>`, `هلا دور التطبيق المستقل`),
    chapter(`04 / YOUR TURN`, `نجرب ونحفظ`, `هلا دورك،<br>نجرب بشكل مستقل`, `<p class="mj-lead">${escape(day.challenge)}</p><div class="mj-callout">المطلوب بالنهاية: ${escape(day.deliverable)}</div><div class="mj-complete" ${day.ready ? `` : `hidden`}><h3 id="mj-complete-title">انهيت التطبيق العملي؟</h3><button type="button" id="mj-complete">نسجل اتمام اليوم ${day.id}</button></div><footer class="mj-footer"><a href="${escape(courseHome)}">مركز الدورة</a>${day.id<10 ? `<a href="day.html?id=${day.id+1}">خطة اليوم ${day.id+1} ←</a>` : `<span dir="ltr">X ACADEMY</span>`}</footer>`, ``)
  ];
  if (day.learningSections?.length) {
    const scenes = day.learningScenes || [[`CSV`, `POWER QUERY`], [`RAW`, `CLEAN`], [`JUL + AUG`, `APPEND`], [`EmployeeID`, `MERGE`], [`FOLDER`, `REFRESH`], [`YOUR TURN`, `VALIDATE`]];
    chapters = day.learningSections.map((section, index) => {
      const files = section.files ? resources.filter(file => section.files === `day5-files` && day.id === 5 ? (file.type === `PBIX` || file.type === `ZIP`) : file.stage === section.files).map(file => `<a class="mj-resource" href="${escape(file.url)}" ${file.type === `WEB` ? `target="_blank" rel="noopener"` : `download`}><span class="mj-resource-icon">${escape(file.type || `FILE`)}</span><span><b>${escape(file.name)}</b><small>${escape(file.note)}</small></span></a>`).join(``) : ``;
      const items = (section.steps || []).map((step, i) => `<article class="mj-block"><span class="mj-num">${String(i + 1).padStart(2, `0`)}</span><h3>${escape(step.title)}</h3><p class="mj-copy" dir="auto">${escape(step.copy)}</p>${day.id === 5 && step.code ? `<div class="mj-dax-code"><div class="mj-dax-code-head"><span>DAX · NEW MEASURE</span><button type="button" class="mj-copy-code">نسخ DAX</button></div><pre dir="ltr"><code>${escape(step.code)}</code></pre></div>` : ``}</article>`).join(``);
      const final = index === day.learningSections.length - 1;
      const scene = scenes[index] || [`POWER QUERY`, `APPLY`];
      return {...chapter(`${String(index + 1).padStart(2, `0`)} / ${day.phase === `MODEL` ? `DATA MODEL` : day.phase === `MEASURE` ? `DAX LAB` : `POWER QUERY`}`, section.name, escape(section.title), `<p class="mj-lead">${escape(section.lead)}</p>${files ? `<details ${day.id === 5 && section.files === `day5-files` ? `open` : ``}><summary>${section.files === `practice` ? `ملفات التمرين المستقل` : section.files === `lab` ? `مختبر إضافي اختياري` : day.id === 6 ? `ملفات التطبيق الجديدة` : `ملفات اليوم الخامس — روابط التنزيل`}</summary>${files}</details>` : ``}${items}<div class="mj-callout">${escape(section.callout)}</div>${final ? `<div class="mj-complete"><h3 id="mj-complete-title">انهيت التطبيق العملي؟</h3><button type="button" id="mj-complete">نسجل اتمام اليوم ${day.id}</button></div><footer class="mj-footer"><a href="${escape(courseHome)}">مركز الدورة</a><a href="day.html?id=${day.id + 1}">خطة اليوم ${day.id + 1} ←</a></footer>` : ``}`, final ? `` : `نكمل للخطوة التالية`), art:`<div class="mj-flow"><span>${escape(scene[0])}</span><i>↓</i><span>${escape(scene[1])}</span></div>`};
    });
  }
  document.title = `اليوم ${day.id} | ${day.titleAr} | X Academy`;
  initMariamJourney(day, courseHome, chapters);
  if (day.id === 4 || day.id === 5) document.body.classList.add(`mj-has-preamble`);
  // Day 05 actual taught content; weighted performance lab remains optional prep for Day 07.
  if (day.id === 5) {
    const stylesheet = document.createElement(`link`);
    stylesheet.rel = `stylesheet`;
    stylesheet.href = `week1/day5/web/day05-hero.css?v=20261026-files-r1`;
    document.head.append(stylesheet);
    const banner = document.createElement(`section`);
    banner.className = `mj-day5-hero`;
    banner.setAttribute(`aria-labelledby`, `mj-day5-title`);
    banner.innerHTML = `<div class="mj-day5-heading"><div><span>DAY 05 · ACTUAL LESSON RECAP</span><h2 id="mj-day5-title">كبرنا التقرير<br>وصرنا نتحكم بالنتائج</h2><p>Change Source · صفحة ثانية · 5 Slicers · Edit Interactions · Measures لمدير وSelf</p></div><a href="week1/day5/web/Score_Lab.html" target="_blank" rel="noopener">مختبر اختياري للدرس القادم ↗</a></div><div class="mj-day5-pipeline"><div><small>01</small><strong>CHANGE SOURCE</strong><span>تعديل المسار</span></div><b>←</b><div><small>02</small><strong>PAGE + SLICERS</strong><span>صفحة وفلاتر</span></div><b>←</b><div><small>03</small><strong>INTERACTIONS</strong><span>التحكم بالتأثير</span></div><b>←</b><div><small>04</small><strong>MANAGER / SELF</strong><span>مقاييس منفصلة</span></div></div>`;
    document.querySelector(`.mj-layout`).before(banner);
    // The original binary PBIX is stored with the course files on GitHub.
    const backup = getLearnerResources(day).find(file => file.stage === `backup` && file.type === `PBIX`);
    if (backup) {
      const panel = document.createElement(`section`);
      panel.className = `mj-day5-backup`;
      panel.setAttribute(`aria-labelledby`, `mj-day5-backup-title`);
      panel.innerHTML = `<div class="mj-backup-mark" aria-hidden="true">PBIX</div><div class="mj-backup-body"><span class="mj-backup-kicker">START HERE · PROJECT RECOVERY</span><h2 id="mj-day5-backup-title">ملفات اليوم الخامس — نقطة انطلاق المشروع</h2><p>كملي على نفس ملف Power BI اللي اشتغلنا عليه. اذا الملف مش عندك، نزلي النسخة الاحتياطية المحفوظة ضمن ملفات الدورة على GitHub. احتفظي بنسختك باسم HR_Performance_Intelligence.pbix</p><span class="mj-backup-meta">Power BI Project · 485 KB · نسخة نهاية اليوم الرابع</span></div><div class="mj-backup-actions"><a class="mj-backup-download" href="${escape(backup.url)}" download="HR_Performance_Intelligence_Day04_Backup.pbix"><span>تنزيل ملف Power BI الاحتياطي</span><span aria-hidden="true">↗</span></a><a class="mj-backup-source" href="week1/day4/data/Day04_Project_Starter.zip" download="Day04_Project_Starter.zip"><span>تحميل ملفات البيانات — 8 CSV</span><span aria-hidden="true">↓</span></a></div>`;
      banner.before(panel);
    }
    document.querySelectorAll(`.mj-copy-code`).forEach(button => button.addEventListener(`click`, async () => {
      const code = button.closest(`.mj-dax-code`)?.querySelector(`code`)?.textContent || ``;
      if (!code) return;
      try { await navigator.clipboard.writeText(code); button.textContent = `تم النسخ ✓`; }
      catch { button.textContent = `حددي النص لنسخه`; }
    }));
  }
  if (day.id === 6) {
    document.body.classList.add(`mj-has-preamble`);
    const css = document.createElement(`link`);
    css.rel = `stylesheet`;
    css.href = `week1/day6/web/day06-hero.css?v=20261029`;
    document.head.append(css);
    const section = document.createElement(`section`);
    section.className = `mj-day6-hero`;
    section.innerHTML = `<div class="mj6-content"><span class="mj6-kicker">DAY 06 · DATA EXPANSION</span><h2>بيانات اكثر.<br><em>قرارات ادق.</em></h2><p>رح نوسع نفس مشروع Power BI بمصدرين جديدين ونحافظ على النتائج اللي بنيناها.</p><div class="mj6-tags"><span>POWER QUERY</span><span>APPEND</span><span>MODEL INTEGRITY</span></div></div><div class="mj6-pipeline" aria-hidden="true"><div><strong>2025</strong><small>HISTORICAL</small></div><b>+</b><div><strong>2026</strong><small>CURRENT</small></div><b>→</b><div class="mj6-result"><strong>POWER BI</strong><small>ONE PROJECT</small></div></div>`;
    document.querySelector(`.mj-layout`).before(section);
  }
  // Day 04: the user-selected data model graphic is the full-width lesson introduction.
  if (day.id === 4) {
    const diagram = 'week1/day4/media/Day04_Data_Model_Relationships.webp';
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'week1/day4/media/model-image.css?v=20261022';
    document.head.append(style);
    const section = document.createElement('section');
    section.className = 'mj-model-hero';
    section.setAttribute('aria-labelledby', 'mj-model-title');
    section.innerHTML = `<div class="mj-model-head"><div><span class="mj-model-kicker">DAY 04 · DATA MODEL</span><h2 id="mj-model-title">خريطة العلاقات اللي رح نبنيها اليوم</h2><p>هاي صورة الجداول الثمانية والعلاقات بينها. اضغطي على الصورة لتكبيرها.</p></div><span class="mj-model-chip">7 RELATIONSHIPS</span></div><button class="mj-model-preview" type="button" aria-label="تكبير مخطط علاقات البيانات"><img src="${diagram}" width="1672" height="941" fetchpriority="high" alt="خريطة علاقات الجداول: Directorates وDepartments وEmployees وObjectives وKPIs وStrategicPriorities وCalendar وEvaluationScores_2026_H1"><span class="mj-model-zoom-label">تكبير الصورة ↗</span></button><dialog class="mj-model-dialog" aria-label="مخطط العلاقات بالحجم الكامل"><div class="mj-model-dialog-head"><strong>Data Model Relationships</strong><div><button class="mj-model-actual" type="button" aria-pressed="false">عرض 100%</button><button class="mj-model-close" type="button">إغلاق ×</button></div></div><div class="mj-model-dialog-view"><img src="${diagram}" width="1672" height="941" alt="مخطط العلاقات بالحجم الكامل"></div></dialog>`;
    document.querySelector('.mj-layout').before(section);
    const dialog = section.querySelector('dialog');
    section.querySelector('.mj-model-preview').addEventListener('click', () => dialog.showModal());
    section.querySelector('.mj-model-close').addEventListener('click', () => dialog.close());
    section.querySelector('.mj-model-actual').addEventListener('click', event => {
      const zoomed = dialog.classList.toggle('is-zoomed');
      event.currentTarget.textContent = zoomed ? 'ملاءمة الشاشة' : 'عرض 100%';
      event.currentTarget.setAttribute('aria-pressed', String(zoomed));
    });
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  }
  if (day.learningSections?.length) {
    document.querySelector(`.mj-glass-top span:last-child`).textContent = number;
    document.querySelector(`.mj-loader`)?.setAttribute(`aria-label`, `بنجهز اليوم ${day.id}`);
  }
}

