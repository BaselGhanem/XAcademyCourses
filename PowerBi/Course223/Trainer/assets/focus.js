/* The original document remains the printable, accessible fallback and source of truth. */
(() => {
  const source = document.querySelector(`body > main`);
  const sections = [...source.querySelectorAll(`:scope > section`)];
  const tasks = sections.filter(section => section.querySelector(`[data-check]`)).map(section => {
    const heading = section.querySelector(`h2`);
    const text = heading.textContent;
    const slot = text.match(/(\d{2}:\d{2})[–-](\d{2}:\d{2})/);
    const minute = value => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
    const after = label => [...section.querySelectorAll(`h3`)].find(h => h.textContent.includes(label))?.nextElementSibling?.textContent || ``;
    return {
      section, input: section.querySelector(`[data-check]`),
      title: text.split(` — `).slice(1).join(` — `) || text,
      slot: slot ? `${slot[1]}–${slot[2]}` : ``,
      minutes: slot ? minute(slot[2]) - minute(slot[1]) : 0,
      say: after(`احكي`), screen: after(`اعرض`), practice: after(`تطبيق`),
      check: section.querySelector(`.note`)?.textContent.replace(/^سؤال التحقق والاجابة:\s*/, ``) || ``,
      group: section.dataset.phase || `الخطوات`,
      detail: section.querySelector(`.trainer-detail`)
    };
  });
  if (!tasks.length) return;
  const key = `xa223_focus_${document.body.dataset.checklist}_v1`;
  let state = {};
  try { state = JSON.parse(localStorage.getItem(key) || `{}`) || {}; } catch {}
  if (!state || typeof state !== `object` || Array.isArray(state)) state = {};
  if (!state.timers || typeof state.timers !== `object`) state.timers = {};
  let index = Number.isInteger(state.index) && state.index >= 0 && state.index < tasks.length ? state.index : Math.max(0, tasks.findIndex(task => !task.input.checked));
  let feedback = document.getElementById(`feedback`);
  const app = document.createElement(`div`);
  app.id = `focus-app`;
  app.innerHTML = `
    <div class="cf-ambient" aria-hidden="true"><div class="cf-orbit"><i></i></div></div>
    <div class="cf-header">
      <a class="cf-brand" href="index.html"><img src="assets/X_Academy_Intersection.svg" alt=""><span><strong>X ACADEMY</strong><small>TRAINER STUDIO</small></span></a>
      <div class="cf-actions">
        <button class="cf-btn" type="button" id="cf-plan">خطة الجلسة</button>
        <button class="cf-btn" type="button" id="cf-resources">المراجع</button>
        <button class="cf-btn" type="button" id="cf-notes">ملاحظاتي</button>
        <button class="cf-btn" type="button" id="cf-motion" aria-pressed="false">الحركة</button>
      </div>
    </div>
    <div class="cf-shell">
      <div class="cf-overview"><div><span class="cf-eyebrow" dir="ltr">ONE STEP. FULL FOCUS.</span><h1 id="cf-day-title"></h1><p id="cf-summary"></p></div><div class="cf-progress"><strong id="cf-total"></strong><div>خطوات مكتملة</div><div class="cf-progress-track" role="progressbar" aria-label="تقدم الجلسة" aria-valuemin="0"><i></i></div></div></div>
      <nav class="cf-stage-list" aria-label="مراحل الجلسة"></nav>
      <div class="cf-layout">
        <section class="cf-card" aria-labelledby="cf-title">
          <div class="cf-card-top"><span id="cf-slot"></span><span class="cf-step-count" id="cf-number"></span></div>
          <div id="cf-step-content">
            <h2 id="cf-title" tabindex="-1"></h2>
            <div class="cf-say"><span class="cf-label">احكي لمريم</span><p class="cf-speech" id="cf-speech"></p></div>
            <div class="cf-instruction-grid"><div><span class="cf-label">على الشاشة</span><p id="cf-screen" dir="auto"></p></div><div><span class="cf-label">خلي مريم تجرب</span><p id="cf-practice"></p></div></div>
            <div class="cf-check"><b aria-hidden="true">✓</b><span id="cf-check"></span></div>
            <button class="cf-btn" type="button" id="cf-step-help" hidden style="margin-top:15px">خطوات الشاشة بالتفصيل</button>
          </div>
          <div class="cf-footer"><label class="cf-done"><input type="checkbox" id="cf-done"> خلصت هاي الخطوة</label><div class="cf-actions"><button class="cf-btn" id="cf-prev" type="button">السابق</button><button class="cf-btn" id="cf-next" type="button" aria-label="الخطوة التالية بدون شطب">التالي</button><button class="cf-btn primary" id="cf-complete" type="button">خلصت، التالي</button></div></div>
        </section>
        <aside class="cf-aside" aria-label="وقت المهمة">
          <div class="cf-timer"><span class="cf-label">وقت هاي الخطوة</span><output class="cf-clock" id="cf-clock" aria-live="off"></output><button class="cf-btn" type="button" id="cf-timer">ابدا المؤقت</button><button class="cf-reset" type="button" id="cf-reset-time">اعادة الوقت</button><p class="cf-timer-tip" id="cf-timer-tip"></p></div>
          <div class="cf-upnext"><span class="cf-label">بعدها مباشرة</span><strong id="cf-upnext"></strong></div>
          <p class="cf-shortcuts">← التالي &nbsp; → السابق<br>المؤقت ما بنقلك تلقائيا</p>
        </aside>
      </div>
      <span class="cf-status" id="cf-storage" role="status"></span>
    </div>
    <dialog class="cf-dialog" id="cf-dialog" aria-labelledby="cf-dialog-title"><div class="cf-dialog-head"><h2 id="cf-dialog-title"></h2><button class="cf-btn" id="cf-close" type="button">اغلاق ×</button></div><div class="cf-dialog-body"></div></dialog>`;
  document.body.append(app);
  const el = id => app.querySelector(`#cf-${id}`);
  const groups = [...new Set(tasks.map(task => task.group))];
  el(`day-title`).textContent = document.body.dataset.focusTitle || document.title.split(` | `)[0];
  el(`summary`).textContent = document.body.dataset.focusSummary || `120 دقيقة · دليل المدرب · كل التفاصيل عند الحاجة`;
  const progress = app.querySelector(`[role=progressbar]`);
  progress.setAttribute(`aria-valuemax`, String(tasks.length));
  function persist() {
    state.index = index;
    try { localStorage.setItem(key, JSON.stringify(state)); el(`storage`).textContent = ``; }
    catch { el(`storage`).textContent = `التخزين غير متاح، التقدم محفوظ لهذه الزيارة فقط`; }
  }
  function timerState() {
    const id = tasks[index].input.dataset.check;
    if (!state.timers[id] || !Number.isFinite(state.timers[id].seconds)) state.timers[id] = {seconds: tasks[index].minutes * 60, deadline: null};
    return state.timers[id];
  }
  function remaining(timer) { return timer.deadline ? Math.max(0, Math.ceil((timer.deadline - Date.now()) / 1000)) : timer.seconds; }
  function renderClock() {
    const timer = timerState(), seconds = remaining(timer);
    el(`clock`).textContent = `${String(Math.floor(seconds / 60)).padStart(2, `0`)}:${String(seconds % 60).padStart(2, `0`)}`;
    const expired = seconds <= 0;
    if (expired && timer.deadline) { timer.deadline = null; timer.seconds = 0; persist(); }
    app.querySelector(`.cf-timer`).classList.toggle(`cf-expired`, expired);
    el(`timer`).textContent = timer.deadline ? `ايقاف مؤقت` : expired ? `انتهى الوقت` : seconds < tasks[index].minutes * 60 ? `كمل المؤقت` : `ابدا المؤقت`;
    el(`timer`).disabled = expired;
    el(`timer-tip`).textContent = expired ? `كمل براحتك او انتقل للخطوة التالية` : `${tasks[index].minutes} دقائق · التوقيت بيدك`;
  }
  function pauseTimer() { const timer = timerState(); timer.seconds = remaining(timer); timer.deadline = null; }
  function renderProgress() {
    const done = tasks.filter(task => task.input.checked).length;
    el(`total`).textContent = `${done} / ${tasks.length}`;
    progress.setAttribute(`aria-valuenow`, String(done));
    progress.firstElementChild.style.width = `${done / tasks.length * 100}%`;
    el(`done`).checked = tasks[index].input.checked;
    el(`complete`).textContent = index === tasks.length - 1 ? `خلصت الجلسة ✓` : `خلصت، التالي`;
    const nav = app.querySelector(`.cf-stage-list`);
    nav.replaceChildren();
    groups.forEach((group, groupIndex) => {
      const button = document.createElement(`button`);
      button.type = `button`; button.className = `cf-stage`;
      button.setAttribute(`aria-current`, String(group === tasks[index].group));
      button.classList.toggle(`cf-complete`, tasks.filter(task => task.group === group).every(task => task.input.checked));
      const number = document.createElement(`em`); number.textContent = String(groupIndex + 1).padStart(2, `0`);
      const label = document.createElement(`span`); label.textContent = group;
      button.append(number, label);
      button.onclick = () => go(tasks.findIndex(task => task.group === group));
      nav.append(button);
    });
  }
  function render() {
    const task = tasks[index];
    el(`slot`).textContent = `${task.slot} · ${task.minutes} دقيقة`;
    el(`number`).textContent = `STEP ${String(index + 1).padStart(2, `0`)} / ${String(tasks.length).padStart(2, `0`)}`;
    el(`title`).textContent = task.title;
    for (const [id, value] of [[`speech`, task.say], [`screen`, task.screen], [`practice`, task.practice], [`check`, task.check]]) el(id).textContent = value;
    el(`step-help`).hidden = !task.detail;
    el(`upnext`).textContent = tasks[index + 1]?.title || `حفظ الملف وتوثيق ما تم فعليا`;
    el(`prev`).disabled = index === 0;
    el(`next`).disabled = index === tasks.length - 1;
    renderProgress(); renderClock();
    const content = el(`step-content`);
    content.classList.remove(`cf-enter`);
    void content.offsetWidth;
    content.classList.add(`cf-enter`);
    persist();
  }
  function go(next) {
    if (next < 0 || next >= tasks.length || next === index) return;
    pauseTimer(); index = next; render(); el(`title`).focus({preventScroll:true});
  }
  function mark(checked) {
    tasks[index].input.checked = checked;
    tasks[index].input.dispatchEvent(new Event(`change`, {bubbles:true}));
    renderProgress();
    if (document.getElementById(`storage-status`)?.textContent) el(`storage`).textContent = document.getElementById(`storage-status`).textContent;
  }
  el(`prev`).onclick = () => go(index - 1);
  el(`next`).onclick = () => go(index + 1);
  el(`done`).onchange = () => mark(el(`done`).checked);
  el(`complete`).onclick = () => {
    mark(true);
    if (index < tasks.length - 1) go(index + 1);
    else { pauseTimer(); persist(); renderClock(); el(`storage`).textContent = tasks.every(task => task.input.checked) ? `خلصت كل الخطوات ✓ سجل ملاحظاتك عن الجلسة` : `هاي الخطوة مكتملة، راجع الخطوات غير المشطوبة من خطة الجلسة`; }
  };
  el(`timer`).onclick = () => { const timer = timerState(); if (timer.deadline) pauseTimer(); else timer.deadline = Date.now() + timer.seconds * 1000; persist(); renderClock(); };
  el(`reset-time`).onclick = () => { state.timers[tasks[index].input.dataset.check] = {seconds:tasks[index].minutes * 60, deadline:null}; persist(); renderClock(); };
  const dialog = el(`dialog`), dialogBody = app.querySelector(`.cf-dialog-body`);
  function open(title) { el(`dialog-title`).textContent = title; dialogBody.replaceChildren(); dialog.showModal(); }
  el(`close`).onclick = () => dialog.close();
  el(`step-help`).onclick = () => {
    const detail = tasks[index].detail;
    if (!detail) return;
    open(tasks[index].title);
    const copy = detail.cloneNode(true);
    copy.className = ``;
    dialogBody.append(copy);
  };
  dialog.onclick = event => { if (event.target !== dialog) return; const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); };
  el(`plan`).onclick = () => {
    open(`خطة الجلسة · ${tasks.reduce((sum, task) => sum + task.minutes, 0)} دقيقة`);
    const list = document.createElement(`div`); list.className = `cf-task-list`;
    tasks.forEach((task, taskIndex) => {
      const button = document.createElement(`button`); button.type = `button`; button.className = `cf-btn cf-task-link`;
      button.setAttribute(`aria-current`, String(index === taskIndex));
      const title = document.createElement(`span`); title.textContent = `${task.input.checked ? `✓ ` : ``}${task.title}`;
      const time = document.createElement(`small`); time.textContent = task.slot;
      button.append(title, time); button.onclick = () => { dialog.close(); go(taskIndex); }; list.append(button);
    });
    dialogBody.append(list);
    const reset = document.createElement(`button`); reset.type = `button`; reset.className = `cf-btn`; reset.style.marginTop = `20px`; reset.textContent = `اعادة ضبط المهام`;
    reset.onclick = () => { document.getElementById(`resetChecklist`).click(); renderProgress(); dialog.close(); };
    dialogBody.append(reset);
  };
  el(`resources`).onclick = () => {
    open(`المراجع وخطة التاخر`);
    sections.filter(section => !section.querySelector(`[data-check], textarea`)).forEach(section => {
      const copy = section.cloneNode(true);
      copy.removeAttribute(`id`);
      copy.querySelectorAll(`[id]`).forEach(node => node.removeAttribute(`id`));
      dialogBody.append(copy);
    });
  };
  el(`notes`).onclick = () => {
    open(`ملاحظاتي بعد الجلسة`);
    const label = document.createElement(`label`); label.textContent = `ما تم فعليا / ما يحتاج مراجعة / تعديل الجلسة القادمة`; label.htmlFor = `cf-feedback`;
    const input = document.createElement(`textarea`); input.id = `cf-feedback`; input.value = feedback?.value || ``;
    input.oninput = () => { if (feedback) { feedback.value = input.value; feedback.dispatchEvent(new Event(`input`, {bubbles:true})); } };
    const note = document.createElement(`p`); note.className = `cf-note`; note.textContent = `حفظ تلقائي على هذا المتصفح، شطب المهام لا يغير حالة التدريس الرسمية`;
    dialogBody.append(label, input, note);
  };
  function motion() { app.classList.toggle(`cf-motion-off`, !!state.motionOff); el(`motion`).textContent = state.motionOff ? `تشغيل الحركة` : `ايقاف الحركة`; el(`motion`).setAttribute(`aria-pressed`, String(!state.motionOff)); }
  el(`motion`).onclick = () => { state.motionOff = !state.motionOff; persist(); motion(); };
  document.addEventListener(`keydown`, event => {
    if (dialog.open || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)) return;
    if (event.key === `ArrowLeft`) { event.preventDefault(); go(index + 1); }
    if (event.key === `ArrowRight`) { event.preventDefault(); go(index - 1); }
  });
  window.addEventListener(`pagehide`, persist);
  render(); motion();
  source.hidden = true;
  document.body.classList.add(`coach-focus`);
  setInterval(renderClock, 1000);
})();
