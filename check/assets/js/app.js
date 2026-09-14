import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig, brand } from './firebase-config.js';
import { DEFAULT_COURSES, DEFAULT_COHORTS, ARAB_COUNTRIES } from './default-data.js';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const app = document.getElementById('app');
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const T = {
  ar: {
    start: 'ابدأ الرحلة',
    choose: 'اختر دورتك',
    chooseSub: 'إذا وصلت لهنا، غالبًا أنت عارف شو بدك. اختر المسار ونبدأ مباشرة.',
    open: 'التسجيل مفتوح',
    info: 'قريبًا',
    full: 'المقاعد مكتملة',
    closed: 'التسجيل مغلق',
    upcoming: 'قريبًا',
    next: 'التالي',
    back: 'السابق',
    restart: 'ابدأ الرحلة من جديد',
    heroTitle: 'مهارات عملية تحرّك شغلك للأمام.',
    heroText: 'تعلّم المهارة، طبّقها على بيانات حقيقية، واستخدمها فعليًا في شغلك.',
    overview: 'عن الدورة',
    outcomes: 'ماذا ستتمكن من فعله؟',
    curriculum: 'المنهاج',
    schedule: 'المواعيد',
    certificate: 'الشهادة',
    name: 'شو اسمك؟',
    mobile: 'رقم الموبايل',
    title: 'ما هو مسماك الوظيفي؟',
    email: 'بريدك الإلكتروني',
    review: 'راجع تسجيلك',
    price: 'رسوم الدورة',
    payment: 'الدفع',
    namePh: 'اكتب الاسم',
    titlePh: 'اكتب المسمى الوظيفي',
    emailPh: 'name@example.com',
    phonePh: 'اكتب رقم الموبايل',
    submit: 'إرسال طلب التسجيل',
    paymentStatus: 'بانتظار التأكيد',
    success: 'تم استلام تسجيلك',
    successText: 'سنتواصل معك قريبًا لتأكيد المقعد وإرسال التفاصيل التالية.',
    whatsapp: 'تواصل معنا على WhatsApp',
    registerClosed: 'التسجيل غير متاح حاليًا',
    registerClosedText: 'يمكنك التعرّف على الدورة الآن، وعند فتح التسجيل ستظهر لك الخطوة التالية مباشرة.',
    certMissing: 'شهادة معتمدة تصدر بعد إتمام الدورة واجتياز الامتحان.',
    awarded: 'تُمنح بعد إتمام الدورة واجتياز الامتحان.',
    sessions: 'جلسات',
    hours: 'ساعة تدريب',
    fee: 'رسوم البرنامج',
    offer: 'عرض خاص',
    until: 'حتى',
    paymentText: 'بعد إرسال طلب التسجيل سنتواصل معك عبر واتساب لتأكيد توفر المقعد واستكمال الدفع.',
    paymentBoxTitle: 'الخطوة التالية',
    paymentBoxText: 'سنرسل لك التفاصيل اللازمة لإكمال التسجيل.',
    countrySearch: 'ابحث عن الدولة',
    required: 'هذا الحقل مطلوب.',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح.',
    invalidPhone: 'يرجى إدخال رقم صحيح.',
    waitingList: 'قائمة الانتظار',
    waitingText: 'المقاعد الحالية مكتملة. اترك بياناتك وسنتواصل معك عند توفر مقعد.',
    waitingSuccess: 'تمت إضافتك إلى قائمة الانتظار.',
    course: 'الدورة',
    cohort: 'موعد الدورة',
    status: 'الحالة',
    phone: 'الموبايل',
    jobTitle: 'المسمى الوظيفي',
    loading: 'جاري التحضير',
    bestFor: 'مناسبة لك إذا',
    level: 'المستوى',
    curriculumSub: 'محاور واضحة ومباشرة تقودك من الأساس إلى التطبيق.',
    scheduleSub: 'مواعيد الجلسات القادمة',
    cardHint: 'سجّل وابدأ رحلتك',
    courseStatePrefix: ''
  },
  en: {
    start: 'Start the journey',
    choose: 'Choose your course',
    chooseSub: 'You probably already know what you came for. Pick the course and go straight in.',
    open: 'Registration open',
    info: 'Coming soon',
    full: 'Full',
    closed: 'Registration closed',
    upcoming: 'Coming soon',
    next: 'Next',
    back: 'Back',
    restart: 'Start over',
    heroTitle: 'Build practical skills that move your work forward.',
    heroText: 'Learn the skill, apply it to real data, and use it meaningfully at work.',
    overview: 'Course overview',
    outcomes: 'What will you be able to do?',
    curriculum: 'Curriculum',
    schedule: 'Schedule',
    certificate: 'Certificate',
    name: 'What’s your name?',
    mobile: 'Your mobile number',
    title: 'What’s your job title?',
    email: 'Your email',
    review: 'Review your registration',
    price: 'Course fee',
    payment: 'Payment',
    namePh: 'Enter your name',
    titlePh: 'Enter your job title',
    emailPh: 'name@example.com',
    phonePh: 'Enter your mobile number',
    submit: 'Submit registration',
    paymentStatus: 'Pending confirmation',
    success: 'Registration received',
    successText: 'We’ll contact you shortly to confirm your seat and share the next details.',
    whatsapp: 'Contact us on WhatsApp',
    registerClosed: 'Registration is not open right now',
    registerClosedText: 'You can explore the course now. Registration will appear here when a new schedule opens.',
    certMissing: 'An accredited certificate is issued after course completion and passing the exam.',
    awarded: 'Awarded after course completion and passing the exam.',
    sessions: 'sessions',
    hours: 'training hours',
    fee: 'Program fee',
    offer: 'Special offer',
    until: 'until',
    paymentText: 'After you submit your registration, we will contact you on WhatsApp to confirm seat availability and complete payment.',
    paymentBoxTitle: 'What happens next',
    paymentBoxText: 'We’ll share the details you need to complete registration.',
    countrySearch: 'Search country',
    required: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
    invalidPhone: 'Please enter a valid number.',
    waitingList: 'Waiting list',
    waitingText: 'This schedule is currently full. Leave your details and we’ll contact you when a seat becomes available.',
    waitingSuccess: 'You’re on the waiting list.',
    course: 'Course',
    cohort: 'Schedule',
    status: 'Status',
    phone: 'Mobile',
    jobTitle: 'Job title',
    loading: 'Preparing',
    bestFor: 'Best for you if',
    level: 'Level',
    curriculumSub: 'A clear structure that takes you from the foundation to applied use.',
    scheduleSub: 'Upcoming session dates',
    cardHint: 'Register and begin the journey',
    courseStatePrefix: ''
  }
};

const state = {
  lang: localStorage.getItem('xa_lang') || 'ar',
  view: 'home',
  course: null,
  cohort: null,
  step: 0,
  courses: DEFAULT_COURSES,
  cohorts: DEFAULT_COHORTS,
  submitting: false,
  error: '',
  countryOpen: false,
  form: JSON.parse(localStorage.getItem('xa_registration_draft') || '{}'),
  country: ARAB_COUNTRIES.find((c) => c.code === (localStorage.getItem('xa_country_code') || '+962')) || ARAB_COUNTRIES[6],
  visitorId: getOrCreateId('xa_visitor_id', 'local'),
  sessionId: getOrCreateId('xa_session_id', 'session'),
  returning: Boolean(localStorage.getItem('xa_seen_before')),
  submittedStatus: ''
};
localStorage.setItem('xa_seen_before', '1');

function getOrCreateId(key, scope) {
  const store = scope === 'session' ? sessionStorage : localStorage;
  let value = store.getItem(key);
  if (!value) {
    value = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    store.setItem(key, value);
  }
  return value;
}

function txt(key) {
  return T[state.lang][key] || key;
}

function localized(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[state.lang] || value.ar || value.en || '';
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('xa_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-en', lang === 'en');
  render();
}

function statusLabel(status) {
  if (status === 'open') return txt('open');
  if (status === 'information') return txt('info');
  if (status === 'full') return txt('full');
  if (status === 'closed') return txt('closed');
  return txt('upcoming');
}

function parseSessionDate(value) {
  const text = String(value || '').trim();
  let day, month, year;
  let match = text.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (match) { day = Number(match[1]); month = Number(match[2]); year = Number(match[3]); }
  else {
    match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    year = Number(match[1]); month = Number(match[2]); day = Number(match[3]);
  }
  const date = new Date(year, month - 1, day, 23, 59, 59, 999);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

function todayStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function datedSessions(run) {
  return (run?.sessions || [])
    .map((session) => ({ ...session, parsedDate: parseSessionDate(session.date) }))
    .filter((session) => session.parsedDate)
    .sort((a, b) => a.parsedDate - b.parsedDate);
}

function effectiveRunStatus(run) {
  if (!run || !['open', 'full'].includes(run.status)) return run?.status || 'closed';
  if (Number(run.seatsRemaining) === 0 && run.seatsRemaining !== null && run.seatsRemaining !== '') return 'full';
  return run.status;
}

function isPublicRun(run) {
  const sessions = datedSessions(run);
  return Boolean(
    run &&
    ['open', 'full'].includes(effectiveRunStatus(run)) &&
    sessions.length &&
    sessions[0].parsedDate >= todayStart()
  );
}

function activeCohort(courseId) {
  const candidates = state.cohorts
    .filter((run) => run.courseId === courseId && isPublicRun(run))
    .sort((a, b) => datedSessions(a)[0].parsedDate - datedSessions(b)[0].parsedDate);
  return candidates[0] || null;
}

function visibleCourses() {
  return state.courses
    .filter((c) => c.visibility !== 'hidden')
    .sort((a, b) => (a.order || 99) - (b.order || 99));
}

function courseDisplayStatus(course) {
  if (course.visibility === 'information') return 'information';
  if (course.visibility === 'closed') return 'closed';
  if (course.visibility !== 'open') return course.visibility;
  const cohort = activeCohort(course.id);
  return cohort ? effectiveRunStatus(cohort) : 'upcoming';
}

function isOpen() {
  return state.course?.visibility === 'open' && effectiveRunStatus(state.cohort) === 'open' && isPublicRun(state.cohort);
}

function isFull() {
  return state.course?.visibility === 'open' && effectiveRunStatus(state.cohort) === 'full' && isPublicRun(state.cohort);
}

function sessionHours(session) {
  const raw = String(session?.time || '');
  const parts = raw.split(/\s+-\s+/);
  if (parts.length !== 2) return null;
  const endHasPm = /مساء|pm/i.test(parts[1]);
  const endHasAm = /صباح|am/i.test(parts[1]);
  const toMinutes = (part, inferPm = false, inferAm = false) => {
    const match = part.match(/(\d{1,2}):(\d{2})/);
    if (!match) return null;
    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const pm = /مساء|pm/i.test(part) || (!/صباح|am/i.test(part) && inferPm);
    const am = /صباح|am/i.test(part) || (!/مساء|pm/i.test(part) && inferAm);
    if (pm && hour < 12) hour += 12;
    if (am && hour === 12) hour = 0;
    return hour * 60 + minute;
  };
  const start = toMinutes(parts[0], endHasPm, endHasAm);
  const end = toMinutes(parts[1]);
  if (start == null || end == null || end <= start) return null;
  return (end - start) / 60;
}

function durationHours() {
  const values = (state.cohort?.sessions || []).map(sessionHours);
  if (!values.length || values.some((value) => value == null)) return null;
  return values.reduce((sum, value) => sum + value, 0);
}

function offerIsActive(cohort) {
  if (!cohort?.offer?.enabled || !(Number(cohort.offer.price) >= 0)) return false;
  if (!cohort.offer.endsAt) return true;
  const end = parseSessionDate(cohort.offer.endsAt) || new Date(`${cohort.offer.endsAt}T23:59:59`);
  return !Number.isNaN(end?.getTime?.()) && end >= todayStart();
}

function publicPaymentMessage(cohort) {
  const configured = localized(cohort?.paymentInstructions).trim();
  if (!configured) return txt('paymentText');
  if (/يدوي|manual|admin|الإدارة\s*(تتحقق|تؤكد)/i.test(configured)) return txt('paymentText');
  return configured;
}

function saveDraft() {
  localStorage.setItem('xa_registration_draft', JSON.stringify(state.form));
}

async function loadRemoteData() {
  try {
    const [courseSnap, cohortSnap, settingsSnap] = await Promise.all([
      getDocs(collection(db, 'courses')),
      getDocs(collection(db, 'cohorts')),
      getDoc(doc(db, 'siteSettings', 'system'))
    ]);

    const remoteCourses = courseSnap.docs.map((item) => ({ id: item.id, ...item.data() }));
    const remoteCohorts = cohortSnap.docs.map((item) => ({ id: item.id, ...item.data() }));
    const defaultsSeeded = settingsSnap.exists() && Number(settingsSnap.data()?.defaultsSeedVersion || 0) >= 2;

    if (defaultsSeeded) {
      state.courses = remoteCourses;
      state.cohorts = remoteCohorts;
    } else {
      if (remoteCourses.length) {
        const byId = new Map(DEFAULT_COURSES.map((course) => [course.id, course]));
        remoteCourses.forEach((course) => byId.set(course.id, course));
        state.courses = [...byId.values()];
      }
      if (remoteCohorts.length) {
        const byId = new Map(DEFAULT_COHORTS.map((cohort) => [cohort.id, cohort]));
        remoteCohorts.forEach((cohort) => byId.set(cohort.id, cohort));
        state.cohorts = [...byId.values()];
      }
    }
  } catch (error) {
    console.warn('Using built-in fallback data.', error);
  }
}

function trackingBase() {
  const params = new URLSearchParams(location.search);
  return {
    visitorId: state.visitorId,
    sessionId: state.sessionId,
    page: location.pathname,
    language: state.lang,
    courseId: state.course?.id || '',
    cohortId: state.cohort?.id || '',
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || ''
  };
}

async function track(event, extra = {}) {
  try {
    await addDoc(collection(db, 'visitorEvents'), {
      event,
      timestamp: new Date().toISOString(),
      ...trackingBase(),
      ...extra
    });
  } catch {}
}

async function logVisit() {
  if (sessionStorage.getItem('xa_visit_logged')) return;
  const device = /Mobi|Android|iPhone/i.test(navigator.userAgent)
    ? 'Mobile'
    : /iPad|Tablet/i.test(navigator.userAgent)
      ? 'Tablet'
      : 'Desktop';

  try {
    await addDoc(collection(db, 'visitors'), {
      timestamp: new Date().toISOString(),
      ...trackingBase(),
      returningVisitor: state.returning,
      url: location.href,
      referrer: document.referrer || 'Direct',
      language: navigator.language || '',
      device,
      platform: navigator.platform || '',
      userAgent: navigator.userAgent || '',
      screen: `${screen.width}×${screen.height}`,
      viewport: `${innerWidth}×${innerHeight}`
    });
    sessionStorage.setItem('xa_visit_logged', '1');
  } catch {}
}

function startLoader() {
  const finalText = 'LEARN. ANALYSE. LEAD.';
  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+-?/';
  app.innerHTML = `
    <div class="loader" id="loader">
      <div class="scramble" aria-label="${finalText}">
        <span aria-hidden="true" id="scramble"></span>
      </div>
    </div>
    <div id="main"></div>
  `;

  const scrambleEl = document.getElementById('scramble');
  if (prefersReducedMotion) {
    scrambleEl.textContent = finalText;
    setTimeout(finishLoader, 100);
    return;
  }

  const started = performance.now();
  const frameSpeed = 38;
  const settleDelay = 55;

  function frame(now) {
    const elapsed = now - started;
    let output = '';

    for (let i = 0; i < finalText.length; i += 1) {
      const char = finalText[i];
      const deadline = 250 + (i * settleDelay);
      if (char === ' ' || char === '.') {
        output += char;
      } else if (elapsed >= deadline) {
        output += char;
      } else {
        output += glyphs[Math.floor((elapsed / frameSpeed + i * 7) % glyphs.length)];
      }
    }

    scrambleEl.textContent = output;
    if (elapsed < 250 + finalText.length * settleDelay + 260) {
      requestAnimationFrame(frame);
    } else {
      scrambleEl.textContent = finalText;
      setTimeout(finishLoader, 160);
    }
  }

  requestAnimationFrame(frame);
}

function finishLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.classList.add('out');
  setTimeout(() => loader.remove(), 420);
  renderMain();
}

let secretClicks = 0;
let secretTimer;

function shell(content) {
  const dirClass = state.lang === 'en' ? 'screen en' : 'screen';
  return `
    <div class="${dirClass}">
      <header class="topbar">
        <button class="brand" id="brand" type="button">
          <span class="brand-mark">X</span>
          <span class="brand-copy">
            <b>X Academy</b>
            <small>Learn. Analyse. Lead.</small>
          </span>
        </button>
        <div class="top-actions">
          <button class="lang" id="lang" type="button">${state.lang === 'ar' ? 'EN' : 'AR'}</button>
        </div>
      </header>
      ${content}
    </div>
  `;
}

function homeView() {
  return shell(`
    <main class="hero">
      <section class="hero-copy">
        <span class="eyebrow">LEARN. ANALYSE. LEAD.</span>
        <h1>${txt('heroTitle')}</h1>
        <p>${txt('heroText')}</p>
        <button class="primary" data-action="start" type="button">${txt('start')}</button>
      </section>
      <figure class="hero-media">
        <img src="./assets/img/hero-workspace.webp" alt="">
      </figure>
    </main>
  `);
}

function courseCard(course) {
  const currentStatus = statusLabel(courseDisplayStatus(course));
  const logo = course.logo || (course.id === 'excel' ? './assets/img/excel-mark.svg' : course.id === 'powerbi' ? './assets/img/powerbi-mark.svg' : './assets/img/course-default-mark.svg');
  return `
    <button class="course-card" data-course="${course.id}" type="button">
      <div class="course-card-head">
        <span class="course-logo"><img src="${logo}" alt=""></span>
        <span class="course-state">${currentStatus}</span>
      </div>
      <div>
        <h3 class="course-card-title">${localized(course.title)}</h3>
        <div class="course-card-sub">${localized(course.promise) || txt('cardHint')}</div>
      </div>
    </button>
  `;
}

function coursesView() {
  const list = visibleCourses();
  return shell(`
    <main class="journey">
      <section class="journey-card">
        <div class="journey-head">
          <span class="eyebrow">X ACADEMY</span>
          <span class="progress-copy">01</span>
        </div>
        <div class="progress-line"><i style="width:10%"></i></div>
        <div class="stage">
          <div class="stage-inner">
            <h2>${txt('choose')}</h2>
            <p class="lead">${txt('chooseSub')}</p>
            <div class="course-grid">
              ${list.map((course) => courseCard(course)).join('') || `<p>${txt('registerClosed')}</p>`}
            </div>
          </div>
        </div>
        <div class="navrow">
          <button class="secondary" data-action="home" type="button">${txt('back')}</button>
        </div>
      </section>
    </main>
  `);
}

function buildSteps() {
  const course = state.course || {};
  const contentSteps = ['overview'];
  const outcomes = course.outcomes?.[state.lang] || course.outcomes?.ar || [];
  const modules = course.modules?.[state.lang] || course.modules?.ar || [];
  if (outcomes.length) contentSteps.push('outcomes');
  if (modules.length) contentSteps.push('curriculum');

  const registrationAvailable = course.visibility === 'open' && state.cohort && isPublicRun(state.cohort);
  if (registrationAvailable) contentSteps.push('schedule');
  if (course.certificate?.enabled !== false) contentSteps.push('certificate');
  if (!registrationAvailable) return [...contentSteps, 'availability'];

  const formSteps = ['name', 'mobile', 'title', 'email', 'review'];
  if (isFull()) return [...contentSteps, ...formSteps, 'waiting'];
  return [...contentSteps, ...formSteps, 'price', 'payment', 'confirmation'];
}

function stageContent(key) {
  const course = state.course;
  const cohort = state.cohort;

  if (key === 'overview') {
    return `
      <h2>${localized(course.title)}</h2>
      <p class="lead">${localized(course.intro)}</p>
      <div class="stack">
        <div class="item">
          <strong>01</strong>
          <div>
            <b>${txt('bestFor')}</b>
            <p>${localized(course.fit)}</p>
          </div>
        </div>
        <div class="item">
          <strong>02</strong>
          <div>
            <b>${txt('level')}</b>
            <p>${localized(course.level)}</p>
          </div>
        </div>
      </div>
    `;
  }

  if (key === 'outcomes') {
    const list = course.outcomes?.[state.lang] || course.outcomes?.ar || [];
    return `
      <h2>${txt('outcomes')}</h2>
      <div class="simple-list">
        ${list.map((item, index) => `
          <div class="simple-row">
            <b>${String(index + 1).padStart(2, '0')} · ${item}</b>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (key === 'curriculum') {
    const modules = course.modules?.[state.lang] || course.modules?.ar || [];
    return `
      <h2>${txt('curriculum')}</h2>
      <p class="lead">${txt('curriculumSub')}</p>
      <div class="simple-list">
        ${modules.map((module) => `
          <div class="simple-row">
            <b>${module.n} · ${module.title}</b>
            <p>${module.detail}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (key === 'schedule') {
    return `
      <h2>${txt('schedule')}</h2>
      ${cohort ? `
        <p class="lead">${localized(cohort.name)} · ${cohort.sessions?.length || 0} ${txt('sessions')}${durationHours() != null ? ` · ${durationHours()} ${txt('hours')}` : ''}</p>
        <div class="sessions">
          ${(cohort.sessions || []).map((session, index) => `
            <div class="session">
              <b>${String(index + 1).padStart(2, '0')} · ${session.day || ''}</b>
              <small>${session.date || ''} · ${session.time || ''}</small>
            </div>
          `).join('')}
        </div>
      ` : `<p class="lead">${txt('registerClosedText')}</p>`}
    `;
  }

  if (key === 'certificate') {
    const certificate = course.certificate || {};
    return `
      <h2>${txt('certificate')}</h2>
      <div class="certificate">
        <div class="certificate-copy">
          <p class="lead">${localized(certificate.title) || txt('certificate')}</p>
          <p>${localized(certificate.note) || txt('awarded')}</p>
        </div>
        <div class="certificate-visual">
          ${certificate.imageUrl
            ? `<img src="${certificate.imageUrl}" alt="${localized(certificate.title) || txt('certificate')}">`
            : `
              <div class="certificate-placeholder">
                <small>X ACADEMY</small>
                <b>${state.lang === 'ar' ? 'شهادة معتمدة' : 'Accredited Certificate'}</b>
                <p>${txt('certMissing')}</p>
              </div>
            `}
        </div>
      </div>
    `;
  }

  if (key === 'availability') {
    const comingSoon = course.visibility === 'information' || (course.visibility === 'open' && !state.cohort);
    const title = comingSoon ? txt('upcoming') : txt('registerClosed');
    return `
      <div class="success">
        <h2>${title}</h2>
        <p>${txt('registerClosedText')}</p>
        <a class="whatsapp" href="${brand.whatsapp}" target="_blank" rel="noreferrer">${txt('whatsapp')}</a>
      </div>
    `;
  }

  if (['name', 'title', 'email'].includes(key)) {
    const type = key === 'email' ? 'email' : 'text';
    const value = state.form[key] || '';
    const autocomplete = key === 'name' ? 'name' : key === 'email' ? 'email' : 'organization-title';
    return `
      <h2>${txt(key)}</h2>
      <div class="field-wrap">
        <input id="single-field" class="field" type="${type}" autocomplete="${autocomplete}" value="${escapeHtml(value)}" placeholder="${txt(`${key}Ph`)}" autofocus>
        <div class="error" id="field-error"></div>
      </div>
    `;
  }

  if (key === 'mobile') {
    return `
      <h2>${txt('mobile')}</h2>
      <div class="field-wrap">
        <div class="phone-row">
          <div class="country-box">
            <button class="country-btn" id="country-btn" type="button">
              ${flagImage(state.country)}
              <b>${state.country.code}</b>
              <span class="country-name">${state.lang === 'ar' ? state.country.ar : state.country.en}</span>
            </button>
            ${state.countryOpen ? countryPicker() : ''}
          </div>
          <div>
            <input id="phone-field" class="field phone-field" inputmode="tel" autocomplete="tel-national" value="${escapeHtml(state.form.mobile || '')}" placeholder="${txt('phonePh')}" dir="ltr" autofocus>
            <div class="error" id="field-error"></div>
          </div>
        </div>
      </div>
    `;
  }

  if (key === 'review') {
    return `
      <h2>${txt('review')}</h2>
      <div class="review-grid">
        <div class="review-cell"><small>${txt('course')}</small><b>${localized(course.title)}</b></div>
        <div class="review-cell"><small>${txt('cohort')}</small><b>${localized(cohort?.name)}</b></div>
        <div class="review-cell"><small>${state.lang === 'ar' ? 'الاسم' : 'Name'}</small><b>${escapeHtml(state.form.name || '')}</b></div>
        <div class="review-cell"><small>${txt('phone')}</small><b dir="ltr">${state.country.code} ${escapeHtml(state.form.mobile || '')}</b></div>
        <div class="review-cell"><small>${txt('jobTitle')}</small><b>${escapeHtml(state.form.title || '')}</b></div>
        <div class="review-cell"><small>Email</small><b>${escapeHtml(state.form.email || '')}</b></div>
      </div>
    `;
  }

  if (key === 'price') {
    const offerOn = offerIsActive(cohort);
    const amount = offerOn ? cohort.offer.price : cohort?.price;
    return `
      <h2>${txt('price')}</h2>
      <div class="price-panel">
        <div class="price-label">${txt('fee')}</div>
        <div class="price-figure">
          <span class="price-amount">${amount ?? '—'}</span>
          <span class="price-currency">${cohort?.currency || 'JOD'}</span>
          ${offerOn ? `<span class="old-price">${cohort.price} ${cohort.currency || 'JOD'}</span>` : ''}
        </div>
        ${offerOn ? `
          <div class="campaign-offer">
            <span>Limited Offer</span>
            <b>${localized(cohort.offer.title) || txt('offer')}</b>
            <strong>${cohort.offer.price}<em>${cohort.currency || 'JOD'}</em></strong>
            ${cohort.offer.endsAt ? `<p>${txt('until')} ${cohort.offer.endsAt}</p>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  if (key === 'payment') {
    const paymentMessage = publicPaymentMessage(cohort);
    return `
      <h2>${txt('payment')}</h2>
      <p class="lead">${paymentMessage}</p>
      <div class="offer-box">
        <b>${txt('paymentBoxTitle')}</b>
        <p>${txt('paymentBoxText')}</p>
      </div>
      ${state.error ? `<div class="error">${state.error}</div>` : ''}
    `;
  }

  if (key === 'waiting') {
    return state.submittedStatus === 'waiting-list'
      ? `
        <div class="success">
          <div class="success-check">✓</div>
          <h2>${txt('waitingSuccess')}</h2>
          <p>${txt('waitingText')}</p>
          <a class="whatsapp" href="${brand.whatsapp}" target="_blank" rel="noreferrer">${txt('whatsapp')}</a>
        </div>
      `
      : `
        <h2>${txt('waitingList')}</h2>
        <p class="lead">${txt('waitingText')}</p>
        ${state.error ? `<div class="error">${state.error}</div>` : ''}
      `;
  }

  if (key === 'confirmation') {
    return `
      <div class="success">
        <div class="success-check">✓</div>
        <h2>${txt('success')}</h2>
        <p>${txt('successText')}</p>
        <span class="status-chip">${txt('paymentStatus')}</span>
        <a class="whatsapp" href="${brand.whatsapp}" target="_blank" rel="noreferrer">${txt('whatsapp')}</a>
      </div>
    `;
  }

  return '';
}

function flagImage(country) {
  return `<img class="flag-chip" src="${country.flagUrl}" alt="">`;
}

function countryPicker() {
  return `
    <div class="country-pop" id="country-pop">
      <input id="country-search" placeholder="${txt('countrySearch')}">
      ${ARAB_COUNTRIES.map((country) => `
        <button class="country-option" data-country="${country.code}" type="button">
          ${flagImage(country)}
          <code>${country.code}</code>
          <span>${state.lang === 'ar' ? country.ar : country.en}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

function journeyView() {
  const steps = buildSteps();
  const key = steps[state.step] || steps[0];
  const percent = ((state.step + 1) / steps.length) * 100;
  const isFinal = key === 'confirmation' || key === 'availability' || (key === 'waiting' && state.submittedStatus === 'waiting-list');
  const nextText = key === 'payment' ? txt('submit') : key === 'waiting' ? txt('waitingList') : txt('next');

  return shell(`
    <main class="journey">
      <section class="journey-card">
        <div class="journey-head">
          <span class="eyebrow">${localized(state.course.shortTitle)}</span>
          <span class="progress-copy">${String(state.step + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}</span>
        </div>
        <div class="progress-line"><i style="width:${percent}%"></i></div>
        <div class="stage">
          <div class="stage-inner">${stageContent(key)}</div>
        </div>
        <div class="navrow">
          ${state.step > 0 && key !== 'confirmation' ? `<button class="secondary" data-action="back" type="button">${txt('back')}</button>` : ''}
          ${isFinal
            ? `<button class="primary" data-action="restart" type="button">${txt('restart')}</button>`
            : `<button class="primary" data-action="next" type="button" ${state.submitting ? 'disabled' : ''}>${state.submitting ? txt('loading') : nextText}</button>`}
        </div>
      </section>
    </main>
  `);
}

function renderMain() {
  const main = document.getElementById('main') || app;
  main.innerHTML = state.view === 'home' ? homeView() : state.view === 'courses' ? coursesView() : journeyView();
  bind();
}

function render() {
  renderMain();
}

function bind() {
  document.getElementById('lang')?.addEventListener('click', () => setLanguage(state.lang === 'ar' ? 'en' : 'ar'));

  document.getElementById('brand')?.addEventListener('click', () => {
    clearTimeout(secretTimer);
    secretClicks += 1;
    if (secretClicks >= 5) {
      location.href = './admin.html';
      return;
    }
    secretTimer = setTimeout(() => { secretClicks = 0; }, 2200);
  });

  document.querySelector('[data-action="start"]')?.addEventListener('click', () => {
    state.view = 'courses';
    track('journey_started');
    render();
  });

  document.querySelector('[data-action="home"]')?.addEventListener('click', () => {
    state.view = 'home';
    render();
  });

  document.querySelectorAll('[data-course]').forEach((button) => {
    button.addEventListener('click', () => {
      state.course = state.courses.find((course) => course.id === button.dataset.course);
      state.cohort = activeCohort(state.course.id);
      state.step = 0;
      state.submittedStatus = '';
      state.view = 'journey';
      state.countryOpen = false;
      localStorage.setItem('xa_last_course', state.course.id);
      track('course_selected', { courseId: state.course.id });
      render();
    });
  });

  document.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    if (state.step > 0) {
      state.step -= 1;
      state.countryOpen = false;
      render();
    }
  });

  document.querySelector('[data-action="restart"]')?.addEventListener('click', () => {
    state.view = 'courses';
    state.step = 0;
    state.course = null;
    state.cohort = null;
    state.form = {};
    state.error = '';
    state.countryOpen = false;
    state.submittedStatus = '';
    localStorage.removeItem('xa_registration_draft');
    render();
  });

  document.querySelector('[data-action="next"]')?.addEventListener('click', nextStep);

  document.getElementById('country-btn')?.addEventListener('click', () => {
    state.countryOpen = !state.countryOpen;
    render();
  });

  document.querySelectorAll('[data-country]').forEach((button) => {
    button.addEventListener('click', () => {
      state.country = ARAB_COUNTRIES.find((country) => country.code === button.dataset.country) || state.country;
      state.countryOpen = false;
      localStorage.setItem('xa_country_code', state.country.code);
      render();
    });
  });

  document.getElementById('country-search')?.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll('[data-country]').forEach((button) => {
      button.hidden = !button.textContent.toLowerCase().includes(query);
    });
  });

  document.getElementById('phone-field')?.addEventListener('input', (event) => {
    const numbersOnly = event.target.value.replace(/\D/g, '').slice(0, 8);
    event.target.value = numbersOnly;
  });

  document.querySelectorAll('.whatsapp').forEach((link) => {
    link.addEventListener('click', () => track('whatsapp_click'));
  });
}

async function nextStep() {
  const steps = buildSteps();
  const key = steps[state.step];
  state.error = '';

  if (['name', 'title', 'email'].includes(key)) {
    const field = document.getElementById('single-field');
    const value = field?.value.trim() || '';

    if (!value) {
      showFieldError(txt('required'));
      return;
    }

    if (key === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      showFieldError(txt('invalidEmail'));
      return;
    }

    state.form[key] = value;
    saveDraft();
  }

  if (key === 'mobile') {
    const field = document.getElementById('phone-field');
    const value = field?.value.replace(/\D/g, '') || '';

    if (!(value.length === 7 || value.length === 8)) {
      showFieldError(txt('invalidPhone'));
      return;
    }

    state.form.mobile = value;
    state.form.countryCode = state.country.code;
    saveDraft();
  }

  if (key === 'payment') {
    await submitRegistration('new');
    return;
  }

  if (key === 'waiting') {
    await submitRegistration('waiting-list');
    return;
  }

  if (state.step < steps.length - 1) {
    state.step += 1;
    state.countryOpen = false;
    track('step_view', { stepKey: steps[state.step] });
    render();
  }
}

function showFieldError(message) {
  const errorEl = document.getElementById('field-error');
  if (errorEl) errorEl.textContent = message;
}

async function submitRegistration(status) {
  if (state.submitting) return;
  state.submitting = true;
  render();

  try {
    if (state.cohort?.id) {
      const [latestCourseSnap, latestRunSnap] = await Promise.all([
        getDoc(doc(db, 'courses', state.course.id)),
        getDoc(doc(db, 'cohorts', state.cohort.id))
      ]);
      if (!latestCourseSnap.exists() || latestCourseSnap.data()?.visibility !== 'open') throw new Error('registration-closed');
      if (!latestRunSnap.exists()) throw new Error('cohort-unavailable');
      const latestRun = { id: latestRunSnap.id, ...latestRunSnap.data() };
      const latestStatus = effectiveRunStatus(latestRun);
      const expectedStatus = status === 'waiting-list' ? 'full' : 'open';
      if (latestStatus !== expectedStatus || !isPublicRun(latestRun)) {
        state.cohort = latestRun;
        throw new Error('registration-closed');
      }
    }

    await addDoc(collection(db, 'registrations'), {
      name: state.form.name || '',
      phone: `${state.country.code}${state.form.mobile || ''}`,
      countryCode: state.country.code,
      email: state.form.email || '',
      title: state.form.title || '',
      course: state.course.id,
      courseId: state.course.id,
      cohortId: state.cohort?.id || '',
      registrationStatus: status,
      paymentStatus: status === 'waiting-list' ? 'not-required' : 'waiting-payment',
      createdAt: new Date().toISOString(),
      createdAtServer: serverTimestamp(),
      visitorId: state.visitorId,
      sessionId: state.sessionId,
      ...trackingBase()
    });

    await track(status === 'waiting-list' ? 'waiting_list_joined' : 'registration_completed');
    localStorage.removeItem('xa_registration_draft');
    state.form = {};
    state.submittedStatus = status;
    state.step = buildSteps().length - 1;
    state.submitting = false;
    render();
  } catch (error) {
    state.submitting = false;
    if (error?.message === 'registration-closed' || error?.message === 'cohort-unavailable') {
      state.error = state.lang === 'ar'
        ? 'التسجيل على هذا الموعد لم يعد متاحًا. ارجع للبداية لاختيار الحالة المحدثة.'
        : 'Registration for this schedule is no longer available. Return to the start to see the updated status.';
    } else {
      state.error = state.lang === 'ar'
        ? 'تعذر إرسال الطلب الآن. تحقق من الاتصال وحاول مرة أخرى.'
        : 'Could not submit right now. Check your connection and try again.';
    }
    render();
  }
}

async function init() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-en', state.lang === 'en');
  startLoader();

  const remote = loadRemoteData();
  await Promise.race([remote, new Promise((resolve) => setTimeout(resolve, 900))]);

  const applyDirectCourse = () => {
    const params = new URLSearchParams(location.search);
    const directId = params.get('course');
    if (!directId) return;
    const directCourse = state.courses.find((course) => course.id === directId && course.visibility !== 'hidden');
    if (directCourse) {
      state.course = directCourse;
      state.cohort = activeCohort(directCourse.id);
      state.step = 0;
      state.view = 'journey';
    }
  };

  applyDirectCourse();
  remote.then(() => {
    applyDirectCourse();
    if (!document.getElementById('loader')) renderMain();
  });

  logVisit();
  track('page_view');
}

init();
