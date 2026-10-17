function initCourseDayJourney(day, courseHome) {
  const escape = value => String(value ?? ``).replace(/[&<>"']/g, c => ({[`&`]:`&amp;`,[`<`]:`&lt;`,[`>`]:`&gt;`,[`"`]:`&quot;`,[`'`]:`&#39;`}[c]));
  const number = String(day.id).padStart(2, `0`);
  const resources = day.ready ? getLearnerResources(day) : (day.requiredFiles || []);
  const fileList = resources.length ? resources.map(file => {
    const copy = `<span class="mj-resource-icon">${escape(file.type)}</span><span><b>${escape(file.name)}</b><small>${escape(file.note || ``)}</small></span>`;
    return day.ready && file.url ? `<a class="mj-resource" href="${escape(file.url)}" target="_blank" rel="noopener">${copy}</a>` : `<div class="mj-resource">${copy}<small>قيد التجهيز</small></div>`;
  }).join(``) : `<p class="mj-copy">ملفات التطبيق بتظهر هون لما تجهز</p>`;
  const steps = day.build || [];
  const middle = Math.ceil(steps.length / 2);
  const renderSteps = (list, offset) => list.map((text, i) => `<article class="mj-block"><span class="mj-num">${String(offset+i+1).padStart(2,`0`)}</span><p class="mj-copy">${escape(text)}</p></article>`).join(``);
  const chapter = (label, name, title, body, next) => ({label, name, title, body, next, scene:day.title, tag:`DAY ${number} / ${day.phase}`});
  const chapters = [
    chapter(`01 / SEE THE GOAL`, `نشوف الفكرة`, escape(day.titleAr), `<p class="mj-lead">${escape(day.hook)}</p><div class="mj-callout">${escape(day.mission)}</div><p class="mj-note">${escape(dayScheduleLabel(day))}${COURSE_CONFIG.sessionHours ? ` • ${COURSE_CONFIG.sessionHours} ساعة` : ``}</p>${day.ready ? `` : `<p class="mj-note">هاي خطة اليوم، ملفات التطبيق لسا قيد التجهيز</p>`}<details><summary>${day.ready ? `ملفات اليوم` : `ملفات التطبيق المطلوبة`}</summary><div id="mj-resources">${fileList}</div></details>`, `يلا نشوف اول خطوة`),
    chapter(`02 / GET STARTED`, `نبلش التطبيق`, `نبلش خطوة<br>بخطوة`, renderSteps(steps.slice(0,middle),0), `نكمل ونشوف النتيجة`),
    chapter(`03 / BUILD & CHECK`, `نبني ونتاكد`, `نطبق،<br>ونتاكد من النتيجة`, `${renderSteps(steps.slice(middle),middle)}<div class="mj-callout">${escape(day.deliverable)}</div><details><summary>المهارات اللي بنمر عليها</summary><p class="mj-copy" dir="ltr">${(day.topics||[]).map(escape).join(` · `)}</p></details>`, `هلا دور التطبيق المستقل`),
    chapter(`04 / YOUR TURN`, `نجرب ونحفظ`, `هلا دورك،<br>نجرب بشكل مستقل`, `<p class="mj-lead">${escape(day.challenge)}</p><div class="mj-callout">المطلوب بالنهاية: ${escape(day.deliverable)}</div><div class="mj-complete" ${day.ready ? `` : `hidden`}><h3 id="mj-complete-title">انهيت التطبيق العملي؟</h3><button type="button" id="mj-complete">نسجل اتمام اليوم ${day.id}</button></div><footer class="mj-footer"><a href="${escape(courseHome)}">مركز الدورة</a>${day.id<10 ? `<a href="day.html?id=${day.id+1}">خطة اليوم ${day.id+1} ←</a>` : `<span dir="ltr">X ACADEMY</span>`}</footer>`, ``)
  ];
  document.title = `اليوم ${day.id} | ${day.titleAr} | X Academy`;
  initMariamJourney(day, courseHome, chapters);
}

