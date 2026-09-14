import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig, brand } from './firebase-config.js';
import { DEFAULT_COURSES, DEFAULT_COHORTS, ARAB_COUNTRIES } from './default-data.js';

const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);
const app = document.getElementById(`app`);
const prefersReducedMotion = matchMedia(`(prefers-reduced-motion: reduce)`).matches;
const T = {
  ar: {
    start: `ابدأ الرحلة`, choose: `اختر دورتك`, chooseSub: `إذا وصلت لهنا، غالبًا أنت عارف شو بدك. اختر المسار ونبدأ مباشرة.`,
    open: `التسجيل مفتوح`, info: `للمعرفة فقط`, full: `المقاعد مكتملة`, closed: `التسجيل مغلق`, upcoming: `قريبًا`,
    next: `التالي`, back: `السابق`, restart: `ابدأ الرحلة من جديد`,
    heroTitle: `مهارات عملية تحرّك شغلك للأمام.`, heroText: `تعلم المهارة، طبقها على بيانات حقيقية، واستخدمها فعليًا في شغلك.`,
    overview: `عن الدورة`, outcomes: `ماذا ستتمكن من فعله؟`, curriculum: `المنهاج`, schedule: `المواعيد`, certificate: `الشهادة`,
    name: `شو اسمك؟`, mobile: `رقم الموبايل`, title: `ما هو مسماك الوظيفي؟`, email: `بريدك الإلكتروني`, review: `راجع تسجيلك`, price: `الاستثمار`, payment: `الدفع`,
    namePh: `الاسم الكامل`, titlePh: `مثال: Sales Analyst`, emailPh: `name@example.com`, phonePh: `رقم الموبايل`,
    submit: `إرسال طلب التسجيل`, paymentStatus: `بانتظار تأكيد الدفع`, success: `تم استلام تسجيلك`, successText: `سنتواصل معك لتأكيد المقعد والتحقق من الدفع يدويًا.`,
    whatsapp: `تواصل معنا على WhatsApp`, registerClosed: `التسجيل غير متاح حاليًا`, registerClosedText: `تقدر تتعرف على الدورة الآن، وعندما نفتح مجموعة جديدة ستظهر هنا مباشرة.`,
    certMissing: `صورة الشهادة تُدار من لوحة التحكم. عند إضافتها ستظهر هنا تلقائيًا.`, awarded: `تُمنح بعد إتمام الدورة واجتياز الامتحان.`,
    sessions: `جلسات`, hours: `ساعة تدريب`, fee: `رسوم البرنامج`, offer: `عرض خاص`, until: `حتى`, included: `دفعة واحدة حسب معلومات الدورة الحالية.`,
    paymentText: `لا تحتاج لرفع أي إثبات. بعد إرسال الطلب، الإدارة تتحقق من الدفع يدويًا وتؤكد المقعد.`,
    countrySearch: `ابحث عن الدولة`, required: `هذا الحقل مطلوب.`, invalidEmail: `اكتب بريدًا إلكترونيًا صحيحًا.`, invalidPhone: `اكتب رقم موبايل صحيحًا.`,
    waitingList: `قائمة الانتظار`, waitingText: `المقاعد الحالية مكتملة. أرسل بياناتك وسنتواصل معك عند توفر مقعد.`, waitingSuccess: `تمت إضافتك إلى قائمة الانتظار.`,
    course: `الدورة`, cohort: `المجموعة`, status: `الحالة`, phone: `الموبايل`, jobTitle: `المسمى الوظيفي`, investment: `السعر`,
    loading: `جاري التحضير`
  },
  en: {
    start: `Start the journey`, choose: `Choose your course`, chooseSub: `You probably already know what you came for. Pick the course and go straight in.`,
    open: `Registration open`, info: `Information only`, full: `Full`, closed: `Registration closed`, upcoming: `Coming soon`,
    next: `Next`, back: `Back`, restart: `Start over`,
    heroTitle: `Build practical skills that move your work forward.`, heroText: `Learn the skill, apply it to real data, and use it meaningfully at work.`,
    overview: `Course overview`, outcomes: `What will you be able to do?`, curriculum: `Curriculum`, schedule: `Schedule`, certificate: `Certificate`,
    name: `What’s your name?`, mobile: `Your mobile number`, title: `What’s your job title?`, email: `Your email`, review: `Review your registration`, price: `Investment`, payment: `Payment`,
    namePh: `Full name`, titlePh: `e.g. Sales Analyst`, emailPh: `name@example.com`, phonePh: `Mobile number`,
    submit: `Submit registration`, paymentStatus: `Waiting payment confirmation`, success: `Registration received`, successText: `We’ll contact you to confirm your seat and manually verify payment.`,
    whatsapp: `Contact us on WhatsApp`, registerClosed: `Registration isn’t open right now`, registerClosedText: `You can explore the course now. A new cohort will appear here as soon as registration opens.`,
    certMissing: `The certificate image is managed from Admin. Once added, it will appear here automatically.`, awarded: `Awarded after course completion and passing the exam.`,
    sessions: `sessions`, hours: `training hours`, fee: `Course fee`, offer: `Special offer`, until: `until`, included: `One payment based on the current course information.`,
    paymentText: `No proof upload is needed. After you submit, the admin verifies payment manually and confirms your seat.`,
    countrySearch: `Search country`, required: `This field is required.`, invalidEmail: `Enter a valid email.`, invalidPhone: `Enter a valid mobile number.`,
    waitingList: `Waiting list`, waitingText: `This cohort is currently full. Leave your details and we’ll contact you when a seat becomes available.`, waitingSuccess: `You’re on the waiting list.`,
    course: `Course`, cohort: `Cohort`, status: `Status`, phone: `Mobile`, jobTitle: `Job title`, investment: `Price`, loading: `Preparing`
  }
};

const state = {
  lang: localStorage.getItem(`xa_lang`) || `ar`, view: `home`, course: null, cohort: null, step: 0,
  courses: DEFAULT_COURSES, cohorts: DEFAULT_COHORTS, submitting: false, error: ``, countryOpen: false,
  form: JSON.parse(localStorage.getItem(`xa_registration_draft`) || `{}`),
  country: ARAB_COUNTRIES.find(c => c.code === (localStorage.getItem(`xa_country_code`) || `+962`)) || ARAB_COUNTRIES[6],
  visitorId: getOrCreateId(`xa_visitor_id`, `local`), sessionId: getOrCreateId(`xa_session_id`, `session`), returning: Boolean(localStorage.getItem(`xa_seen_before`)), submittedStatus: ``
};
localStorage.setItem(`xa_seen_before`, `1`);

function getOrCreateId(key, scope) {
  const store = scope === `session` ? sessionStorage : localStorage;
  let value = store.getItem(key);
  if (!value) { value = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`; store.setItem(key, value); }
  return value;
}
function txt(key) { return T[state.lang][key] || key; }
function localized(value) { if (value == null) return ``; if (typeof value === `string`) return value; return value[state.lang] || value.ar || value.en || ``; }
function setLanguage(lang) { state.lang = lang; localStorage.setItem(`xa_lang`, lang); document.documentElement.lang = lang; document.documentElement.dir = lang === `ar` ? `rtl` : `ltr`; render(); }
function statusLabel(status) { return txt(status === `open` ? `open` : status === `information` ? `info` : status === `full` ? `full` : status === `closed` ? `closed` : `upcoming`); }
function courseDisplayStatus(course){if(course.visibility!==`open`)return course.visibility;const cohort=activeCohort(course.id);return cohort?.status||`upcoming`;}
function activeCohort(courseId) { return state.cohorts.find(c => c.courseId === courseId && [`open`,`full`].includes(c.status)) || state.cohorts.find(c => c.courseId === courseId) || null; }
function visibleCourses() { return state.courses.filter(c => c.visibility !== `hidden`).sort((a,b)=>(a.order||99)-(b.order||99)); }
function isOpen() { return state.course?.visibility === `open` && state.cohort?.status === `open`; }
function isFull() { return state.cohort?.status === `full`; }
function durationHours() { const count = state.cohort?.sessions?.length || 0; return count * 2; }
function saveDraft() { localStorage.setItem(`xa_registration_draft`, JSON.stringify(state.form)); }

async function loadRemoteData() {
  try {
    const [cSnap, hSnap] = await Promise.all([getDocs(collection(db, `courses`)), getDocs(collection(db, `cohorts`))]);
    if (!cSnap.empty) state.courses = cSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    if (!hSnap.empty) state.cohorts = hSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) { console.warn(`Using built-in fallback data.`, error); }
}

function trackingBase() {
  const q = new URLSearchParams(location.search);
  return { visitorId: state.visitorId, sessionId: state.sessionId, page: location.pathname, language: state.lang, courseId: state.course?.id || ``, cohortId: state.cohort?.id || ``, utmSource: q.get(`utm_source`) || ``, utmMedium: q.get(`utm_medium`) || ``, utmCampaign: q.get(`utm_campaign`) || `` };
}
async function track(event, extra = {}) { try { await addDoc(collection(db, `visitorEvents`), { event, timestamp: new Date().toISOString(), ...trackingBase(), ...extra }); } catch {} }
async function logVisit() {
  if (sessionStorage.getItem(`xa_visit_logged`)) return;
  const device = /Mobi|Android|iPhone/i.test(navigator.userAgent) ? `Mobile` : /iPad|Tablet/i.test(navigator.userAgent) ? `Tablet` : `Desktop`;
  try {
    await addDoc(collection(db, `visitors`), { timestamp: new Date().toISOString(), ...trackingBase(), returningVisitor: state.returning, url: location.href, referrer: document.referrer || `Direct`, language: navigator.language || ``, device, platform: navigator.platform || ``, userAgent: navigator.userAgent || ``, screen: `${screen.width}×${screen.height}`, viewport: `${innerWidth}×${innerHeight}` });
    sessionStorage.setItem(`xa_visit_logged`, `1`);
  } catch {}
}

function startLoader() {
  const final = `LEARN. ANALYSE. LEAD.`;
  const glyphs = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+-?/`;
  app.innerHTML = `<div class="loader" id="loader"><div class="scramble" aria-label="${final}"><span aria-hidden="true" id="scramble"></span></div></div><div id="main"></div>`;
  const el = document.getElementById(`scramble`);
  if (prefersReducedMotion) { el.textContent = final; return setTimeout(finishLoader, 120); }
  const start = performance.now(), per = 38, settle = 55;
  function frame(now) {
    const elapsed = now - start;
    let out = ``;
    for (let i=0;i<final.length;i++) {
      const deadline = 260 + i * settle;
      if (final[i] === ` ` || final[i] === `.`) out += final[i];
      else if (elapsed >= deadline) out += final[i];
      else out += glyphs[Math.floor((elapsed/per + i*7) % glyphs.length)];
    }
    el.textContent = out;
    if (elapsed < 260 + final.length*settle + 120) requestAnimationFrame(frame); else finishLoader();
  }
  requestAnimationFrame(frame);
}
function finishLoader() { const loader = document.getElementById(`loader`); if (!loader) return; loader.classList.add(`out`); setTimeout(() => loader.remove(), 480); renderMain(); }

let secretClicks = 0, secretTimer;
function shell(content) {
  const dirClass = state.lang === `en` ? `screen en` : `screen`;
  return `<div class="${dirClass}"><header class="topbar"><button class="brand" id="brand"><span class="mark">X</span><b>X Academy</b></button><div class="top-actions"><button class="lang" id="lang">${state.lang === `ar` ? `EN` : `AR`}</button></div></header>${content}</div>`;
}
function homeView() {
  return shell(`<main class="hero"><section class="hero-copy"><span class="eyebrow">LEARN. ANALYSE. LEAD.</span><h1>${txt(`heroTitle`)}</h1><p>${txt(`heroText`)}</p><button class="primary" data-action="start">${txt(`start`)}</button></section><figure class="hero-media"><img src="./assets/img/hero-workspace.webp" alt=""></figure></main>`);
}
function coursesView() {
  const list = visibleCourses();
  return shell(`<main class="journey"><section class="journey-card"><div class="journey-head"><span class="eyebrow">X ACADEMY</span><span class="progress-copy">01</span></div><div class="progress-line"><i style="width:10%"></i></div><div class="stage"><div class="stage-inner"><h2>${txt(`choose`)}</h2><p class="lead">${txt(`chooseSub`)}</p><div class="course-list">${list.map(c => `<button class="course-option" data-course="${c.id}"><b>${localized(c.title)}</b><span>${statusLabel(courseDisplayStatus(c))}</span></button>`).join(``) || `<p>${txt(`registerClosed`)}</p>`}</div></div></div><div class="navrow"><button class="secondary" data-action="home">${txt(`back`)}</button></div></section></main>`);
}
function buildSteps() {
  const core = [`overview`,`outcomes`,`curriculum`,`schedule`,`certificate`];
  if (state.course?.visibility === `information` || state.course?.visibility === `closed` || !state.cohort || ![`open`,`full`].includes(state.cohort.status)) return [...core, `availability`];
  const form = [`name`,`mobile`,`title`,`email`,`review`];
  if (isFull()) return [...core, ...form, `waiting`];
  return [...core, ...form, `price`,`payment`,`confirmation`];
}
function stageContent(key) {
  const c = state.course, h = state.cohort;
  if (key === `overview`) return `<h2>${localized(c.title)}</h2><p class="lead">${localized(c.intro)}</p><div class="stack"><div class="item"><strong>01</strong><div><b>${state.lang===`ar`?`مناسبة لك إذا`:`Best for you if`}</b><p>${localized(c.fit)}</p></div></div><div class="item"><strong>02</strong><div><b>${state.lang===`ar`?`المستوى`:`Level`}</b><p>${localized(c.level)}</p></div></div></div>`;
  if (key === `outcomes`) return `<h2>${txt(`outcomes`)}</h2><div class="stack">${(c.outcomes?.[state.lang] || c.outcomes?.ar || []).map((x,i)=>`<div class="item"><strong>${String(i+1).padStart(2,`0`)}</strong><div><b>${x}</b></div></div>`).join(``)}</div>`;
  if (key === `curriculum`) return `<h2>${txt(`curriculum`)}</h2><div class="stack">${(c.modules?.[state.lang] || c.modules?.ar || []).map(m=>`<div class="item"><strong>${m.n}</strong><div><b>${m.title}</b><p>${m.detail}</p></div></div>`).join(``)}</div>`;
  if (key === `schedule`) return `<h2>${txt(`schedule`)}</h2>${h ? `<p class="lead">${localized(h.name)} · ${h.sessions?.length || 0} ${txt(`sessions`)} · ${durationHours()} ${txt(`hours`)}</p><div class="sessions">${(h.sessions||[]).map((s,i)=>`<div class="session"><b>${String(i+1).padStart(2,`0`)} · ${s.day||``}</b><small>${s.date||``} · ${s.time||``}</small></div>`).join(``)}</div>` : `<p class="lead">${txt(`registerClosedText`)}</p>`}`;
  if (key === `certificate`) { const cert = c.certificate || {}; return `<h2>${txt(`certificate`)}</h2><div class="certificate"><div><p class="lead">${localized(cert.title)}</p><p>${localized(cert.note) || txt(`awarded`)}</p></div><div class="certificate-visual">${cert.imageUrl ? `<img src="${cert.imageUrl}" alt="${localized(cert.title)}">` : `<div class="certificate-empty">${txt(`certMissing`)}</div>`}</div></div>`; }
  if (key === `availability`) return `<h2>${txt(`registerClosed`)}</h2><p class="lead">${txt(`registerClosedText`)}</p><a class="whatsapp" href="${brand.whatsapp}" target="_blank">${txt(`whatsapp`)}</a>`;
  if ([`name`,`title`,`email`].includes(key)) { const type = key===`email`?`email`:`text`; const value = state.form[key] || ``; return `<h2>${txt(key)}</h2><div class="field-wrap"><input autofocus class="field" id="single-field" type="${type}" autocomplete="${key===`name`?`name`:key===`email`?`email`:`organization-title`}" value="${escapeHtml(value)}" placeholder="${txt(`${key}Ph`)}"><div class="error" id="field-error"></div></div>`; }
  if (key === `mobile`) return `<h2>${txt(`mobile`)}</h2><div class="field-wrap" style="position:relative"><div class="phone-row"><button class="country-btn" id="country-btn"><span>${state.country.flag}</span><b>${state.country.code}</b><span>${state.lang===`ar`?state.country.ar:state.country.en}</span></button><input autofocus class="field" id="phone-field" inputmode="tel" autocomplete="tel-national" value="${escapeHtml(state.form.mobile||``)}" placeholder="${txt(`phonePh`)}"></div><div class="error" id="field-error"></div>${state.countryOpen?countryPicker():``}</div>`;
  if (key === `review`) return `<h2>${txt(`review`)}</h2><div class="review-grid"><div class="review-cell"><small>${txt(`course`)}</small><b>${localized(c.title)}</b></div><div class="review-cell"><small>${txt(`cohort`)}</small><b>${localized(h?.name)}</b></div><div class="review-cell"><small>${state.lang===`ar`?`الاسم`:`Name`}</small><b>${escapeHtml(state.form.name||``)}</b></div><div class="review-cell"><small>${txt(`phone`)}</small><b dir="ltr">${state.country.code} ${escapeHtml(state.form.mobile||``)}</b></div><div class="review-cell"><small>${txt(`jobTitle`)}</small><b>${escapeHtml(state.form.title||``)}</b></div><div class="review-cell"><small>Email</small><b>${escapeHtml(state.form.email||``)}</b></div></div>`;
  if (key === `price`) { const offerOn = h?.offer?.enabled && Number(h.offer.price)>0; const amount = offerOn ? h.offer.price : h?.price; return `<h2>${txt(`price`)}</h2><div class="price-panel"><small>${txt(`fee`)}</small><div><span class="price-big">${amount ?? `—`} <em>${h?.currency||`JOD`}</em></span>${offerOn?`<span class="old-price">${h.price} ${h.currency||`JOD`}</span>`:``}</div><p class="lead">${txt(`included`)}</p>${offerOn?`<div class="campaign-offer"><span>LIMITED OFFER</span><b>${localized(h.offer.title) || txt(`offer`)}</b><strong>${h.offer.price} <em>${h.currency||`JOD`}</em></strong>${h.offer.endsAt?`<p>${txt(`until`)} ${h.offer.endsAt}</p>`:``}</div>`:``}</div>`; }
  if (key === `payment`) return `<h2>${txt(`payment`)}</h2><p class="lead">${localized(h?.paymentInstructions) || txt(`paymentText`)}</p><div class="offer"><b>${txt(`paymentStatus`)}</b><p>${txt(`paymentText`)}</p></div>${state.error?`<div class="error">${state.error}</div>`:``}`;
  if (key === `waiting`) return state.submittedStatus===`waiting-list`?`<div class="success"><div class="success-check">✓</div><h2>${txt(`waitingSuccess`)}</h2><p>${txt(`waitingText`)}</p><br><a class="whatsapp" href="${brand.whatsapp}" target="_blank">${txt(`whatsapp`)}</a></div>`:`<h2>${txt(`waitingList`)}</h2><p class="lead">${txt(`waitingText`)}</p>${state.error?`<div class="error">${state.error}</div>`:``}`;
  if (key === `confirmation`) return `<div class="success"><div class="success-check">✓</div><h2>${txt(`success`)}</h2><p>${txt(`successText`)}</p><span class="status-chip">${txt(`paymentStatus`)}</span><br><a class="whatsapp" href="${brand.whatsapp}" target="_blank">${txt(`whatsapp`)}</a></div>`;
  return ``;
}
function countryPicker() { return `<div class="country-pop" id="country-pop"><input id="country-search" placeholder="${txt(`countrySearch`)}">${ARAB_COUNTRIES.map(c=>`<button data-country="${c.code}">${c.flag} ${state.lang===`ar`?c.ar:c.en} · ${c.code}</button>`).join(``)}</div>`; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
function journeyView() {
  const steps = buildSteps(), key = steps[state.step] || steps[0], percent = ((state.step+1)/steps.length)*100;
  const isFinal = key === `confirmation` || key === `availability` || (key===`waiting` && state.submittedStatus===`waiting-list`);
  const nextText = key === `payment` ? txt(`submit`) : key === `waiting` ? txt(`waitingList`) : txt(`next`);
  return shell(`<main class="journey"><section class="journey-card"><div class="journey-head"><span class="eyebrow">${localized(state.course.shortTitle)}</span><span class="progress-copy">${String(state.step+1).padStart(2,`0`)} / ${String(steps.length).padStart(2,`0`)}</span></div><div class="progress-line"><i style="width:${percent}%"></i></div><div class="stage"><div class="stage-inner">${stageContent(key)}</div></div><div class="navrow">${state.step>0 && key!==`confirmation`?`<button class="secondary" data-action="back">${txt(`back`)}</button>`:``}${isFinal?`<button class="primary" data-action="restart">${txt(`restart`)}</button>`:`<button class="primary" data-action="next" ${state.submitting?`disabled`:``}>${state.submitting?txt(`loading`):nextText}</button>`}</div></section></main>`);
}
function renderMain() { const main = document.getElementById(`main`) || app; main.innerHTML = state.view === `home` ? homeView() : state.view === `courses` ? coursesView() : journeyView(); bind(); }
function render() { renderMain(); }
function bind() {
  document.getElementById(`lang`)?.addEventListener(`click`,()=>setLanguage(state.lang===`ar`?`en`:`ar`));
  document.getElementById(`brand`)?.addEventListener(`click`,()=>{ clearTimeout(secretTimer); secretClicks++; if(secretClicks>=5){location.href=`./admin.html`;return;} secretTimer=setTimeout(()=>secretClicks=0,2200); });
  document.querySelector(`[data-action="start"]`)?.addEventListener(`click`,()=>{state.view=`courses`;track(`journey_started`);render();});
  document.querySelector(`[data-action="home"]`)?.addEventListener(`click`,()=>{state.view=`home`;render();});
  document.querySelectorAll(`[data-course]`).forEach(btn=>btn.addEventListener(`click`,()=>{ state.course=state.courses.find(c=>c.id===btn.dataset.course); state.cohort=activeCohort(state.course.id); state.step=0; state.submittedStatus=``; state.view=`journey`; localStorage.setItem(`xa_last_course`,state.course.id); track(`course_selected`,{courseId:state.course.id}); render(); }));
  document.querySelector(`[data-action="back"]`)?.addEventListener(`click`,()=>{ if(state.step>0){state.step--;render();} });
  document.querySelector(`[data-action="restart"]`)?.addEventListener(`click`,()=>{state.view=`courses`;state.step=0;state.course=null;state.cohort=null;state.form={};state.submittedStatus=``;localStorage.removeItem(`xa_registration_draft`);render();});
  document.querySelector(`[data-action="next"]`)?.addEventListener(`click`, nextStep);
  document.getElementById(`country-btn`)?.addEventListener(`click`,()=>{state.countryOpen=!state.countryOpen;render();});
  document.querySelectorAll(`[data-country]`).forEach(btn=>btn.addEventListener(`click`,()=>{state.country=ARAB_COUNTRIES.find(c=>c.code===btn.dataset.country)||state.country;state.countryOpen=false;localStorage.setItem(`xa_country_code`,state.country.code);render();}));
  document.getElementById(`country-search`)?.addEventListener(`input`,e=>{const q=e.target.value.toLowerCase();document.querySelectorAll(`[data-country]`).forEach(b=>{b.hidden=!b.textContent.toLowerCase().includes(q);});});
  document.querySelectorAll(`.whatsapp`).forEach(a=>a.addEventListener(`click`,()=>track(`whatsapp_click`)));
}
async function nextStep() {
  const steps = buildSteps(), key = steps[state.step]; state.error=``;
  if ([`name`,`title`,`email`].includes(key)) {
    const el=document.getElementById(`single-field`), value=el?.value.trim()||``;
    if(!value){showFieldError(txt(`required`));return;} if(key===`email`&&!/^\S+@\S+\.\S+$/.test(value)){showFieldError(txt(`invalidEmail`));return;} state.form[key]=value;saveDraft();
  }
  if(key===`mobile`){const value=document.getElementById(`phone-field`)?.value.replace(/[^0-9]/g,``)||``;if(value.length<6){showFieldError(txt(`invalidPhone`));return;}state.form.mobile=value;state.form.countryCode=state.country.code;saveDraft();}
  if(key===`payment`){await submitRegistration(`new`);return;}
  if(key===`waiting`){await submitRegistration(`waiting-list`);return;}
  if(state.step<steps.length-1){state.step++;track(`step_view`,{stepKey:steps[state.step]});render();}
}
function showFieldError(message){const el=document.getElementById(`field-error`);if(el)el.textContent=message;}
async function submitRegistration(status){if(state.submitting)return;state.submitting=true;render();try{await addDoc(collection(db,`registrations`),{name:state.form.name||``,phone:`${state.country.code}${state.form.mobile||``}`,countryCode:state.country.code,email:state.form.email||``,title:state.form.title||``,course:state.course.id,courseId:state.course.id,cohortId:state.cohort?.id||``,registrationStatus:status,paymentStatus:status===`waiting-list`?`not-required`:`waiting-payment`,createdAt:new Date().toISOString(),createdAtServer:serverTimestamp(),visitorId:state.visitorId,sessionId:state.sessionId,...trackingBase()});await track(status===`waiting-list`?`waiting_list_joined`:`registration_completed`);localStorage.removeItem(`xa_registration_draft`);state.form={};state.submittedStatus=status;state.step=buildSteps().length-1;state.submitting=false;render();}catch(e){state.submitting=false;state.error=state.lang===`ar`?`تعذر إرسال الطلب الآن. تحقق من الاتصال وحاول مرة ثانية.`:`Couldn’t submit right now. Check your connection and try again.`;render();}}

async function init(){document.documentElement.lang=state.lang;document.documentElement.dir=state.lang===`ar`?`rtl`:`ltr`;startLoader();const remote=loadRemoteData();await Promise.race([remote,new Promise(r=>setTimeout(r,900))]);const applyDirect=()=>{const qp=new URLSearchParams(location.search),directId=qp.get(`course`);if(directId){const direct=state.courses.find(c=>c.id===directId&&c.visibility!==`hidden`);if(direct){state.course=direct;state.cohort=activeCohort(direct.id);state.step=0;state.view=`journey`;}}};applyDirect();remote.then(()=>{applyDirect();if(!document.getElementById(`loader`))renderMain();});logVisit();track(`page_view`);}
init();
