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
    start: 'استكشف الدورات',
    choose: 'اختر دورتك',
    chooseSub: 'اختر المسار الأقرب لشغلك. الفرق بسيط: Excel للعمل اليومي والتحليل السريع، وPower BI لربط البيانات وبناء تقارير تفاعلية.',
    open: 'التسجيل مفتوح',
    info: 'قريبًا',
    full: 'المقاعد مكتملة',
    closed: 'التسجيل مغلق',
    upcoming: 'قريبًا',
    next: 'التالي',
    back: 'السابق',
    restart: 'ابدأ الرحلة من جديد',
    heroTitle: 'استثمر في مهارة تفتح لك فرص أكبر.',
    heroText: 'تجربة تدريب عملية ومباشرة تساعدك تتعلم بوضوح، تطبق بنفسك، وتطلع بمهارة تستخدمها فعليًا.',
    heroMicro1: 'تطبيق عملي',
    heroMicro2: 'شرح مباشر',
    heroMicro3: 'مهارات قابلة للاستخدام',
    heroImageAlt: 'مساحة تعلم عملية تشجع على التطور المهني',
    heroImageNote: 'تعلّم. طبّق. استخدمها فعليًا.',
    overview: 'عن الدورة',
    outcomes: 'ماذا ستتمكن من فعله؟',
    curriculum: 'المنهاج',
    schedule: 'المواعيد',
    certificate: 'الشهادة',
    certificateSub: 'شهادة حضور دولية تعكس المشاركة وإتمام البرنامج التدريبي.',
    outcomesSub: 'هذه هي القيمة العملية التي ستخرج بها بعد التطبيق داخل الدورة.',
    curriculumStage: 'كيف تسير الدورة؟',
    curriculumStageSub: 'محاور واضحة ومباشرة، مرتبة من الأساس إلى التطبيق العملي.',
    certificateIssuer: 'تصدر الشهادة من',
    certificateRecognitions: 'أبرز الأختام والاعتمادات الظاهرة على الشهادة',
    certificateBenefit: 'قيمة الشهادة',
    certificateBenefitText: 'إضافة قوية لملفك المهني، وتوثيق أن التدريب تم ضمن إطار دولي موضح على الشهادة نفسها.',
    trainingStyleTitle: 'أسلوب التدريب',
    trainingStyleText: 'شرح واضح، تطبيق مباشر، وربط دائم بين المهارة وبين استخدامها الحقيقي في العمل.',
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
    successText: 'رح يتواصل معك مسؤول التسجيل في X Academy لمتابعة تسجيلك.',
    whatsapp: 'تواصل معنا على WhatsApp',
    registerClosed: 'التسجيل غير متاح حاليًا',
    registerClosedText: 'يمكنك التعرّف على الدورة الآن، وعند فتح التسجيل ستظهر لك الخطوة التالية مباشرة.',
    certMissing: 'شهادة إتمام من X Academy بعد إتمام متطلبات الدورة.',
    awarded: 'تُمنح بعد إتمام متطلبات الدورة.',
    sessions: 'جلسات',
    hours: 'ساعة تدريب',
    fee: 'رسوم البرنامج',
    offer: 'عرض خاص',
    until: 'حتى',
    paymentText: 'بعد إرسال طلب التسجيل، رح يتواصل معك مسؤول التسجيل في X Academy لمتابعة تسجيلك.',
    paymentBoxTitle: 'الخطوة التالية',
    paymentBoxText: 'رح يتواصل معك مسؤول التسجيل في X Academy لمتابعة تسجيلك.',
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
    program: 'ماذا ستتعلم وتطبق؟',
    scheduleInvestment: 'المواعيد والرسوم',
    registerDetails: 'بيانات التسجيل',
    registerSub: 'كل المعلومات أمامك الآن. اترك بياناتك لتأكيد طلب التسجيل.',
    trainerLabel: 'المدرب',
    trainerName: 'Basel Ghanem',
    trainerRole: 'Senior Sales Analyst • Excel • Power BI • Data Analytics',
    learningStyle: 'تطبيق عملي على سيناريوهات عمل حقيقية',
    certificateSimple: 'شهادة حضور دولية من LPCIS باعتمادات متعددة',
    privacy: 'تُستخدم بياناتك فقط للتواصل بخصوص التسجيل وتأكيد المقعد.',
    scheduleSub: 'مواعيد الجلسات القادمة',
    startDate: 'تاريخ البداية',
    endDate: 'تاريخ النهاية',
    trainingDays: 'أيام التدريب',
    heroStat1Value: '4000+',
    heroStat1Label: 'متدرب دربهم Basel',
    heroStat2Value: 'Excel & Power BI',
    heroStat2Label: 'مسارات عملية مرتبطة بالعمل',
    heroStat3Value: 'Dar Al-Dawaa',
    heroStat3Label: 'خبرة عملية في التحليل واتخاذ القرار',
    trainerHeadline: 'Basel Ghanem',
    trainerMicroBio: 'Senior Sales Analyst في Dar Al-Dawaa، ومدرب ومستشار في X Academy بخبرة عملية في Excel وPower BI وتحليل البيانات.',
    cardHint: 'اعرف إن كانت الدورة مناسبة لك',
    courseStatePrefix: ''
  },
  en: {
    start: 'Explore courses',
    choose: 'Choose your course',
    chooseSub: 'Choose the path closest to your work: Excel for day-to-day analysis and workflow, or Power BI for connected data and interactive reporting.',
    open: 'Registration open',
    info: 'Coming soon',
    full: 'Full',
    closed: 'Registration closed',
    upcoming: 'Coming soon',
    next: 'Next',
    back: 'Back',
    restart: 'Start over',
    heroTitle: 'Invest in a skill that opens bigger opportunities.',
    heroText: 'A practical, direct learning experience designed to help you understand clearly, practice hands-on, and leave with a skill you can actually use.',
    heroMicro1: 'Hands-on practice',
    heroMicro2: 'Clear instruction',
    heroMicro3: 'Skills you can use',
    heroImageAlt: 'A practical learning workspace that encourages professional growth',
    heroImageNote: 'Learn it. Apply it. Use it.',
    overview: 'Course overview',
    outcomes: 'What will you be able to do?',
    curriculum: 'Curriculum',
    schedule: 'Schedule',
    certificate: 'Certificate',
    certificateSub: 'An international attendance certificate that reflects participation and program completion.',
    outcomesSub: 'These are the practical gains you should expect after applying the course content.',
    curriculumStage: 'How does the course flow?',
    curriculumStageSub: 'Clear learning blocks arranged from foundation to practical application.',
    certificateIssuer: 'Issued by',
    certificateRecognitions: 'Key seals and recognitions shown on the certificate',
    certificateBenefit: 'Certificate value',
    certificateBenefitText: 'A strong addition to your professional profile, documenting that the training was delivered within an international framework shown on the certificate itself.',
    trainingStyleTitle: 'Training style',
    trainingStyleText: 'Clear explanation, direct hands-on practice, and a constant link between the skill and its real use at work.',
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
    successText: 'An X Academy registration officer will contact you to continue your registration.',
    whatsapp: 'Contact us on WhatsApp',
    registerClosed: 'Registration is not open right now',
    registerClosedText: 'You can explore the course now. Registration will appear here when a new schedule opens.',
    certMissing: 'A completion certificate from X Academy is issued after meeting the course requirements.',
    awarded: 'Awarded after meeting the course requirements.',
    sessions: 'sessions',
    hours: 'training hours',
    fee: 'Program fee',
    offer: 'Special offer',
    until: 'until',
    paymentText: 'After you submit your request, an X Academy registration officer will contact you to continue your registration.',
    paymentBoxTitle: 'What happens next',
    paymentBoxText: 'An X Academy registration officer will contact you to continue your registration.',
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
    program: 'What will you learn and apply?',
    scheduleInvestment: 'Schedule & fee',
    registerDetails: 'Registration details',
    registerSub: 'You have the key information now. Leave your details to request your seat.',
    trainerLabel: 'Trainer',
    trainerName: 'Basel Ghanem',
    trainerRole: 'Senior Sales Analyst • Excel • Power BI • Data Analytics',
    learningStyle: 'Hands-on learning with real work scenarios',
    certificateSimple: 'International LPCIS certificate with multiple recognitions',
    privacy: 'Your details are used only to contact you about registration and seat confirmation.',
    scheduleSub: 'Upcoming session dates',
    startDate: 'Start date',
    endDate: 'End date',
    trainingDays: 'Training days',
    heroStat1Value: '4000+',
    heroStat1Label: 'professionals trained by Basel',
    heroStat2Value: 'Excel & Power BI',
    heroStat2Label: 'practical tracks built around work',
    heroStat3Value: 'Dar Al-Dawaa',
    heroStat3Label: 'hands-on analytical experience',
    trainerHeadline: 'Basel Ghanem',
    trainerMicroBio: 'Senior Sales Analyst at Dar Al-Dawaa and a trainer/consultant at X Academy with practical experience in Excel, Power BI, and data analytics.',
    cardHint: 'See if this course fits your work',
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


function formatScheduleDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(state.lang === 'ar' ? 'ar-JO-u-nu-latn' : 'en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  }).format(date);
}

function scheduleDayName(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(state.lang === 'ar' ? 'ar-JO' : 'en-GB', { weekday: 'long' }).format(date);
}

function scheduleTimeSummary(sessions) {
  const times = [...new Set((sessions || []).map((session) => String(session.time || '').trim()).filter(Boolean))];
  if (times.length !== 1) return '';
  const raw = times[0];
  const parts = raw.split(/\s+-\s+/);
  if (parts.length !== 2) return state.lang === 'ar' ? `من الساعة ${raw}` : `at ${raw}`;
  const start = parts[0].trim();
  const end = parts[1].trim();
  return state.lang === 'ar' ? `من الساعة ${start} إلى ${end}` : `from ${start} to ${end}`;
}

function scheduleNarrative(run) {
  const sessions = datedSessions(run);
  if (!sessions.length) return '';
  const first = sessions[0];
  const last = sessions[sessions.length - 1];
  const uniqueDays = [];
  sessions.forEach((session) => {
    const day = scheduleDayName(session.parsedDate);
    if (day && !uniqueDays.includes(day)) uniqueDays.push(day);
  });
  const joinDays = (days) => {
    if (days.length <= 1) return days[0] || '';
    if (state.lang === 'ar') return days.length === 2 ? `${days[0]} و${days[1]}` : `${days.slice(0, -1).join('، ')} و${days.at(-1)}`;
    return days.length === 2 ? `${days[0]} and ${days[1]}` : `${days.slice(0, -1).join(', ')}, and ${days.at(-1)}`;
  };
  const time = scheduleTimeSummary(sessions);
  if (state.lang === 'ar') {
    return `تبدأ يوم ${scheduleDayName(first.parsedDate)} ${formatScheduleDate(first.parsedDate)} وتنتهي يوم ${scheduleDayName(last.parsedDate)} ${formatScheduleDate(last.parsedDate)}، أيام ${joinDays(uniqueDays)}${time ? `، ${time}` : ''}.`;
  }
  return `Starts ${scheduleDayName(first.parsedDate)}, ${formatScheduleDate(first.parsedDate)} and ends ${scheduleDayName(last.parsedDate)}, ${formatScheduleDate(last.parsedDate)}. Sessions are on ${joinDays(uniqueDays)}${time ? `, ${time}` : ''}.`;
}

function scheduleMeta(run) {
  const sessions = datedSessions(run);
  if (!sessions.length) return { start: '', end: '', days: '', time: '' };
  const first = sessions[0];
  const last = sessions[sessions.length - 1];
  const uniqueDays = [];
  sessions.forEach((session) => {
    const day = scheduleDayName(session.parsedDate);
    if (day && !uniqueDays.includes(day)) uniqueDays.push(day);
  });
  const joinDays = (days) => {
    if (days.length <= 1) return days[0] || '';
    if (state.lang === 'ar') return days.length === 2 ? `${days[0]} و${days[1]}` : `${days.slice(0, -1).join('، ')} و${days.at(-1)}`;
    return days.length === 2 ? `${days[0]} and ${days[1]}` : `${days.slice(0, -1).join(', ')}, and ${days.at(-1)}`;
  };
  return {
    start: formatScheduleDate(first.parsedDate),
    end: formatScheduleDate(last.parsedDate),
    days: joinDays(uniqueDays),
    time: scheduleTimeSummary(sessions)
  };
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

function certificateInfo(course = {}) {
  const raw = course.certificate || {};
  const title = localized(raw.title) && !/X Academy/i.test(localized(raw.title)) ? localized(raw.title) : 'International Attendance Certificate';
  const note = localized(raw.note) || txt('certificateSub');
  const issuer = localized(raw.issuer) || (state.lang === 'ar' ? 'تصدر من Liverpool College For International Studies (LPCIS).' : 'Issued by Liverpool College For International Studies (LPCIS).');
  const imageUrl = raw.imageUrl || './assets/img/lpcis-certificate.png';
  const recognitions = raw.recognitions?.[state.lang] || raw.recognitions?.ar || [
    state.lang === 'ar' ? 'Liverpool College For International Studies (LPCIS)' : 'Liverpool College For International Studies (LPCIS)',
    'CPD Approved Provider',
    'QCET-UK',
    'HCB UK',
    'ISO',
    state.lang === 'ar' ? 'وأختام اعتماد ومراجع دولية إضافية ظاهرة على الشهادة' : 'Additional international seals and references shown on the certificate'
  ];
  return {
    enabled: raw.enabled !== false,
    title,
    note,
    issuer,
    imageUrl,
    recognitions
  };
}

function trainingPoints() {
  return state.lang === 'ar'
    ? ['تطبيق عملي داخل الجلسة', 'أمثلة مرتبطة بالعمل', 'انتقال واضح من الأساس إلى التطبيق']
    : ['Hands-on practice inside the session', 'Examples tied to real work', 'A clear progression from foundation to application'];
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
    <main class="hero home-hero">
      <section class="home-copy">
        <span class="eyebrow">X ACADEMY · LEARN. ANALYSE. LEAD.</span>
        <h1>${txt('heroTitle')}</h1>
        <p>${txt('heroText')}</p>
        <div class="home-actions">
          <button class="primary home-cta" data-action="start" type="button">
            <span>${txt('start')}</span>
            <span class="cta-arrow" aria-hidden="true">${state.lang === 'ar' ? '←' : '→'}</span>
          </button>
        </div>
        <div class="home-micro" aria-label="${state.lang === 'ar' ? 'مميزات التجربة' : 'Experience benefits'}">
          <span>${txt('heroMicro1')}</span>
          <span>${txt('heroMicro2')}</span>
          <span>${txt('heroMicro3')}</span>
        </div>
      </section>

      <figure class="home-visual">
        <img src="./assets/img/hero-workspace.webp" alt="${txt('heroImageAlt')}">
        <figcaption>
          <span>${txt('heroImageNote')}</span>
        </figcaption>
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
        <span class="course-logo"><img src="${logo}" alt="${escapeHtml(localized(course.title))}"></span>
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
  const steps = ['overview'];
  const outcomes = course.outcomes?.[state.lang] || course.outcomes?.ar || [];
  const modules = course.modules?.[state.lang] || course.modules?.ar || [];
  const cert = certificateInfo(course);

  if (outcomes.length) steps.push('outcomes');
  if (modules.length) steps.push('curriculum');

  const registrationAvailable = course.visibility === 'open' && state.cohort && isPublicRun(state.cohort);
  if (registrationAvailable) steps.push('schedule');
  if (cert.enabled) steps.push('certificate');

  if (!registrationAvailable) return [...steps, 'availability'];

  steps.push('register');
  if (isFull()) return [...steps, 'waiting'];
  return [...steps, 'review', 'confirmation'];
}

function feeMarkup(cohort, compact = false) {
  const offerOn = offerIsActive(cohort);
  const amount = offerOn ? cohort?.offer?.price : cohort?.price;
  return `
    <div class="fee-card ${compact ? 'compact' : ''}">
      <div>
        <span>${txt('fee')}</span>
        <strong>${amount ?? '—'} <small>${cohort?.currency || 'JOD'}</small></strong>
      </div>
      ${offerOn ? `<div class="fee-offer"><b>${localized(cohort.offer.title) || txt('offer')}</b><span>${cohort.price} ${cohort.currency || 'JOD'}</span>${cohort.offer.endsAt ? `<small>${txt('until')} ${cohort.offer.endsAt}</small>` : ''}</div>` : ''}
    </div>
  `;
}

function stageContent(key) {
  const course = state.course;
  const cohort = state.cohort;

  if (key === 'overview') {
    return `
      <h2>${localized(course.title)}</h2>
      <p class="lead">${localized(course.intro)}</p>
      <div class="overview-grid">
        <div class="overview-copy">
          <div class="item">
            <strong>01</strong>
            <div><b>${txt('bestFor')}</b><p>${localized(course.fit)}</p></div>
          </div>
          <div class="item">
            <strong>02</strong>
            <div><b>${txt('level')}</b><p>${localized(course.level)}</p></div>
          </div>
        </div>
        <aside class="trust-panel" aria-label="${state.lang === 'ar' ? 'معلومات الثقة' : 'Trust information'}">
          <span>${txt('trainerLabel')}</span>
          <b>${txt('trainerName')}</b>
          <p>${txt('trainerRole')}</p>
          <div class="trust-divider"></div>
          <small>${txt('learningStyle')}</small>
          <small>${txt('certificateSimple')}</small>
          <small>${state.lang === 'ar' ? 'خبرة عملية + تدريب احترافي + تطبيق مرتبط بالشغل.' : 'Hands-on business experience, professional training, and work-focused application.'}</small>
        </aside>
      </div>
    `;
  }

  if (key === 'outcomes') {
    const outcomes = course.outcomes?.[state.lang] || course.outcomes?.ar || [];
    return `
      <h2>${txt('outcomes')}</h2>
      <p class="lead">${txt('outcomesSub')}</p>
      <div class="split-layout">
        <div class="program-block">
          <div class="simple-list outcome-list">
            ${outcomes.map((item, index) => `<div class="simple-row"><b>${String(index + 1).padStart(2, '0')}</b><p>${item}</p></div>`).join('')}
          </div>
        </div>
        <aside class="spotlight-panel">
          <span class="panel-kicker">${txt('trainingStyleTitle')}</span>
          <b>${txt('learningStyle')}</b>
          <p>${txt('trainingStyleText')}</p>
          <div class="mini-points">
            ${trainingPoints().map((item) => `<span>${item}</span>`).join('')}
          </div>
        </aside>
      </div>
    `;
  }

  if (key === 'curriculum') {
    const modules = course.modules?.[state.lang] || course.modules?.ar || [];
    return `
      <h2>${txt('curriculumStage')}</h2>
      <p class="lead">${txt('curriculumStageSub')}</p>
      <div class="split-layout curriculum-layout">
        <div class="program-block">
          <span class="section-kicker">${txt('curriculum')}</span>
          <div class="simple-list curriculum-list">
            ${modules.map((module) => `<div class="simple-row"><b>${module.n} · ${module.title}</b><p>${module.detail}</p></div>`).join('')}
          </div>
        </div>
        <aside class="spotlight-panel spotlight-panel-soft">
          <span class="panel-kicker">${localized(course.shortTitle)}</span>
          <b>${localized(course.intro)}</b>
          <p>${txt('curriculumSub')}</p>
        </aside>
      </div>
    `;
  }

  if (key === 'schedule') {
    const meta = scheduleMeta(cohort);
    return `
      <h2>${txt('scheduleInvestment')}</h2>
      ${cohort ? `
        <div class="schedule-summary">
          <div class="schedule-copy">
            <p class="lead">${localized(cohort.name)} · ${cohort.sessions?.length || 0} ${txt('sessions')}${durationHours() != null ? ` · ${durationHours()} ${txt('hours')}` : ''}</p>
            <p class="schedule-narrative"><b>${state.lang === 'ar' ? 'الخلاصة:' : 'Summary:'}</b> ${scheduleNarrative(cohort)}</p>
          </div>
          ${feeMarkup(cohort, true)}
        </div>
        <div class="schedule-facts">
          <div class="schedule-fact"><small>${txt('startDate')}</small><b>${meta.start || '—'}</b></div>
          <div class="schedule-fact"><small>${txt('endDate')}</small><b>${meta.end || '—'}</b></div>
          <div class="schedule-fact"><small>${txt('trainingDays')}</small><b>${meta.days || '—'}</b></div>
        </div>
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
    const cert = certificateInfo(course);
    return `
      <h2>${txt('certificate')}</h2>
      <p class="lead">${cert.note}</p>
      <div class="certificate certificate-premium">
        <div class="certificate-copy">
          <div class="certificate-meta">
            <span class="section-kicker">${txt('certificateIssuer')}</span>
            <b>${cert.title}</b>
            <p>${cert.issuer}</p>
          </div>
          <div class="certificate-box">
            <span class="panel-kicker">${txt('certificateRecognitions')}</span>
            <div class="recognition-list">
              ${cert.recognitions.map((item) => `<span class="recognition-chip">${item}</span>`).join('')}
            </div>
          </div>
          <div class="certificate-note">
            <b>${txt('certificateBenefit')}</b>
            <p>${txt('certificateBenefitText')}</p>
          </div>
        </div>
        <div class="certificate-visual">
          <img src="${cert.imageUrl}" alt="${cert.title}">
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

  if (key === 'register') {
    return `
      <h2>${txt('registerDetails')}</h2>
      <p class="lead">${txt('registerSub')}</p>
      <div class="registration-form" id="registration-form">
        <label class="form-field">
          <span>${state.lang === 'ar' ? 'الاسم' : 'Name'}</span>
          <input id="reg-name" type="text" autocomplete="name" value="${escapeHtml(state.form.name || '')}" placeholder="${txt('namePh')}">
        </label>
        <label class="form-field">
          <span>${txt('email')}</span>
          <input id="reg-email" type="email" autocomplete="email" value="${escapeHtml(state.form.email || '')}" placeholder="${txt('emailPh')}" dir="ltr">
        </label>
        <div class="form-field phone-form-field">
          <span>${txt('mobile')}</span>
          <div class="phone-row compact-phone">
            <div class="country-box">
              <button class="country-btn" id="country-btn" type="button" aria-expanded="${state.countryOpen}" aria-haspopup="listbox">
                ${flagImage(state.country)}
                <b>${state.country.code}</b>
                <span class="country-name">${state.lang === 'ar' ? state.country.ar : state.country.en}</span>
              </button>
              ${state.countryOpen ? countryPicker() : ''}
            </div>
            <input id="reg-mobile" class="phone-input" inputmode="tel" autocomplete="tel-national" value="${escapeHtml(state.form.mobile || '')}" placeholder="${txt('phonePh')}" dir="ltr">
          </div>
        </div>
        <label class="form-field">
          <span>${txt('jobTitle')}</span>
          <input id="reg-title" type="text" autocomplete="organization-title" value="${escapeHtml(state.form.title || '')}" placeholder="${txt('titlePh')}">
        </label>
        <p class="privacy-note">${txt('privacy')}</p>
        <div class="error" id="field-error" role="alert" aria-live="polite"></div>
      </div>
    `;
  }

  if (key === 'review') {
    return `
      <h2>${txt('review')}</h2>
      <div class="review-layout">
        <div class="review-grid">
          <div class="review-cell"><small>${txt('course')}</small><b>${localized(course.title)}</b></div>
          <div class="review-cell"><small>${txt('cohort')}</small><b>${localized(cohort?.name)}</b></div>
          <div class="review-cell"><small>${state.lang === 'ar' ? 'الاسم' : 'Name'}</small><b>${escapeHtml(state.form.name || '')}</b></div>
          <div class="review-cell"><small>${txt('phone')}</small><b dir="ltr">${state.country.code} ${escapeHtml(state.form.mobile || '')}</b></div>
          <div class="review-cell"><small>${txt('jobTitle')}</small><b>${escapeHtml(state.form.title || '')}</b></div>
          <div class="review-cell"><small>Email</small><b>${escapeHtml(state.form.email || '')}</b></div>
        </div>
        <div class="review-side">
          ${feeMarkup(cohort)}
          <div class="next-note"><b>${txt('paymentBoxTitle')}</b><p>${publicPaymentMessage(cohort)}</p></div>
        </div>
      </div>
      ${state.error ? `<div class="error" role="alert">${state.error}</div>` : ''}
    `;
  }

  if (key === 'waiting') {
    return state.submittedStatus === 'waiting-list'
      ? `<div class="success"><div class="success-check">✓</div><h2>${txt('waitingSuccess')}</h2><p>${txt('waitingText')}</p><a class="whatsapp" href="${brand.whatsapp}" target="_blank" rel="noreferrer">${txt('whatsapp')}</a></div>`
      : `<h2>${txt('waitingList')}</h2><p class="lead">${txt('waitingText')}</p>${state.error ? `<div class="error" role="alert">${state.error}</div>` : ''}`;
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
  const nextText = key === 'review' ? txt('submit') : key === 'waiting' ? txt('waitingList') : txt('next');

  return shell(`
    <main class="journey">
      <section class="journey-card">
        <div class="journey-head">
          <span class="eyebrow">${localized(state.course.shortTitle)}</span>
          <span class="progress-copy">${String(state.step + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}</span>
        </div>
        <div class="progress-line"><i style="width:${percent}%"></i></div>
        <div class="stage" data-step="${key}">
          <div class="stage-inner" tabindex="-1">${stageContent(key)}</div>
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


function fitElementInside(element, container) {
  if (!element || !container) return;

  element.style.setProperty('--fit-scale', '1');

  // The element is absolutely positioned, so its natural dimensions can be
  // measured without affecting the stage layout or creating an internal scroll area.
  const style = getComputedStyle(element);
  const top = parseFloat(style.top) || 0;
  const naturalW = Math.max(1, element.scrollWidth);
  const naturalH = Math.max(1, element.scrollHeight);

  const availableW = Math.max(1, container.clientWidth);
  const availableH = Math.max(1, container.clientHeight - top - 8);

  const scaleW = availableW / naturalW;
  const scaleH = availableH / naturalH;
  const scale = Math.max(0.02, Math.min(1, scaleW, scaleH) * 0.975);

  element.style.setProperty('--fit-scale', scale.toFixed(4));
}

function fitCurrentScreen() {
  const stage = document.querySelector('.stage');
  const stageInner = stage?.querySelector('.stage-inner');
  if (stage && stageInner) fitElementInside(stageInner, stage);

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transformOrigin = 'top center';
    hero.style.transform = 'scale(1)';
    const screen = hero.closest('.screen');
    const topbar = screen?.querySelector('.topbar');
    const availableH = Math.max(1, window.innerHeight - (topbar?.offsetHeight || 0));
    const availableW = Math.max(1, window.innerWidth);
    const neededH = Math.max(1, hero.scrollHeight);
    const neededW = Math.max(1, hero.scrollWidth);
    const scale = Math.max(0.02, Math.min(1, availableH / neededH, availableW / neededW) * 0.985);
    hero.style.transform = `scale(${scale})`;
  }
}

let fitResizeFrame = 0;
window.addEventListener('resize', () => {
  cancelAnimationFrame(fitResizeFrame);
  fitResizeFrame = requestAnimationFrame(fitCurrentScreen);
});
window.visualViewport?.addEventListener('resize', () => {
  cancelAnimationFrame(fitResizeFrame);
  fitResizeFrame = requestAnimationFrame(fitCurrentScreen);
});
window.addEventListener('load', () => requestAnimationFrame(fitCurrentScreen));
document.fonts?.ready.then(() => requestAnimationFrame(fitCurrentScreen));

function renderMain() {
  const main = document.getElementById('main') || app;
  main.innerHTML = state.view === 'home' ? homeView() : state.view === 'courses' ? coursesView() : journeyView();
  bind();
  requestAnimationFrame(() => requestAnimationFrame(() => { fitCurrentScreen(); setTimeout(fitCurrentScreen, 80); setTimeout(fitCurrentScreen, 220); }));
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

  document.getElementById('reg-mobile')?.addEventListener('input', (event) => {
    const numbersOnly = event.target.value.replace(/\D/g, '').slice(0, 12);
    event.target.value = numbersOnly;
    state.form.mobile = numbersOnly;
    saveDraft();
  });

  [['reg-name', 'name'], ['reg-email', 'email'], ['reg-title', 'title']].forEach(([id, key]) => {
    document.getElementById(id)?.addEventListener('input', (event) => {
      state.form[key] = event.target.value;
      saveDraft();
    });
  });

  document.querySelectorAll('.whatsapp').forEach((link) => {
    link.addEventListener('click', () => track('whatsapp_click'));
  });
}

async function nextStep() {
  const steps = buildSteps();
  const key = steps[state.step];
  state.error = '';

  if (key === 'register') {
    const name = document.getElementById('reg-name')?.value.trim() || '';
    const email = document.getElementById('reg-email')?.value.trim() || '';
    const title = document.getElementById('reg-title')?.value.trim() || '';
    const mobile = document.getElementById('reg-mobile')?.value.replace(/\D/g, '') || '';

    if (!name || !email || !title || !mobile) {
      showFieldError(txt('required'));
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showFieldError(txt('invalidEmail'));
      return;
    }
    if (mobile.length < 7 || mobile.length > 12) {
      showFieldError(txt('invalidPhone'));
      return;
    }

    state.form = { ...state.form, name, email, title, mobile, countryCode: state.country.code };
    saveDraft();
  }

  if (key === 'review') {
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
    renderMain();
  });

  logVisit();
  track('page_view');
}

init();
