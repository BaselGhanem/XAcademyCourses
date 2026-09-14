import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {
  getFirestore, collection, getDocs, getDoc, doc, setDoc, addDoc, updateDoc, deleteDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';
import { DEFAULT_COURSES, DEFAULT_COHORTS } from './default-data.js';

const fb = initializeApp(firebaseConfig);
const auth = getAuth(fb);
const db = getFirestore(fb);
const root = document.getElementById('admin-app');

const A = {
  user: null,
  tab: 'dashboard',
  courses: [],
  cohorts: [],
  regs: [],
  visits: [],
  events: [],
  audit: [],
  courseId: '',
  cohortId: '',
  search: '',
  filter: 'all',
  loading: true,
  newCourse: false
};

const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const esc = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[char]));
const loc = (value, lang = 'ar') => typeof value === 'string' ? value : (value?.[lang] || value?.ar || value?.en || '');
const val = (id) => document.getElementById(id)?.value ?? '';
const lines = (text) => text.split('\n').map((x) => x.trim()).filter(Boolean);

function visibilityLabel(value) {
  return {
    open: 'مفتوحة للتسجيل',
    information: 'معلومات فقط',
    closed: 'مغلقة',
    hidden: 'مخفية'
  }[value] || value;
}

function runStatusLabel(value) {
  return {
    open: 'التسجيل مفتوح',
    full: 'المقاعد مكتملة',
    closed: 'مغلق'
  }[value] || value;
}

async function log(action, details = {}) {
  try {
    await addDoc(collection(db, 'auditLogs'), {
      action,
      details,
      user: A.user?.email || '',
      createdAt: new Date().toISOString(),
      createdAtServer: serverTimestamp()
    });
  } catch {}
}

async function ensureDefaultsOnce() {
  const settingsRef = doc(db, 'siteSettings', 'system');
  const settingsSnap = await getDoc(settingsRef);
  if (settingsSnap.exists() && Number(settingsSnap.data()?.defaultsSeedVersion || 0) >= 2) return;

  const [courseSnap, cohortSnap] = await Promise.all([
    getDocs(collection(db, 'courses')),
    getDocs(collection(db, 'cohorts'))
  ]);

  const courseIds = new Set(courseSnap.docs.map((item) => item.id));
  const cohortIds = new Set(cohortSnap.docs.map((item) => item.id));

  for (const course of DEFAULT_COURSES) {
    if (!courseIds.has(course.id)) {
      await setDoc(doc(db, 'courses', course.id), course);
    }
  }

  for (const cohort of DEFAULT_COHORTS) {
    if (!cohortIds.has(cohort.id)) {
      await setDoc(doc(db, 'cohorts', cohort.id), cohort);
    }
  }

  await setDoc(settingsRef, {
    defaultsSeeded: true,
    defaultsSeedVersion: 2,
    defaultsSeededAt: new Date().toISOString()
  }, { merge: true });

  await log('defaults_seeded_once');
}

function login() {
  root.innerHTML = `
    <main class="login">
      <section class="login-brand">
        <div><span class="x">X</span><b>X Academy</b></div>
        <div>
          <span>CONTROL ROOM</span>
          <h1>إدارة واضحة.<br>بدون تعقيد.</h1>
          <p>الدورات، المواعيد، التسجيلات، الدفع والزيارات في مكان واحد.</p>
        </div>
      </section>
      <section class="login-form">
        <form id="login">
          <h2>لوحة الإدارة</h2>
          <p>استخدم حساب Firebase Admin الحالي.</p>
          <label>البريد الإلكتروني<input id="email" type="email" required autocomplete="email"></label>
          <label style="margin-top:12px">كلمة المرور<input id="password" type="password" required autocomplete="current-password"></label>
          <div class="error" id="login-error"></div>
          <button class="btn">دخول</button>
        </form>
      </section>
    </main>
  `;

  document.getElementById('login').onsubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, val('email'), val('password'));
    } catch {
      document.getElementById('login-error').textContent = 'بيانات الدخول غير صحيحة أو الحساب غير مخول.';
    }
  };
}

async function load() {
  A.loading = true;
  render();

  try {
    await ensureDefaultsOnce();

    const [courseSnap, cohortSnap, regSnap, visitSnap, eventSnap, auditSnap] = await Promise.all([
      getDocs(collection(db, 'courses')),
      getDocs(collection(db, 'cohorts')),
      getDocs(collection(db, 'registrations')),
      getDocs(collection(db, 'visitors')),
      getDocs(collection(db, 'visitorEvents')),
      getDocs(collection(db, 'auditLogs'))
    ]);

    A.courses = courseSnap.docs
      .map((item) => ({ id: item.id, ...item.data() }))
      .sort((a, b) => (a.order || 99) - (b.order || 99));
    A.cohorts = cohortSnap.docs.map((item) => ({ id: item.id, ...item.data() }));
    A.regs = regSnap.docs
      .map((item) => ({ id: item.id, ...item.data() }))
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
    A.visits = visitSnap.docs
      .map((item) => ({ id: item.id, ...item.data() }))
      .sort((a, b) => String(b.timestamp || '').localeCompare(String(a.timestamp || '')));
    A.events = eventSnap.docs.map((item) => ({ id: item.id, ...item.data() }));
    A.audit = auditSnap.docs
      .map((item) => ({ id: item.id, ...item.data() }))
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));

    if (!A.courseId || !A.courses.some((course) => course.id === A.courseId)) {
      A.courseId = A.courses[0]?.id || '';
    }

    const courseRuns = A.cohorts.filter((item) => item.courseId === A.courseId);
    if (!A.cohortId || !courseRuns.some((run) => run.id === A.cohortId)) {
      A.cohortId = courseRuns[0]?.id || '';
    }
  } catch (error) {
    console.error(error);
  }

  A.loading = false;
  render();
}

function nav() {
  const items = [
    ['dashboard', 'Overview'],
    ['courses', 'الدورات والمواعيد'],
    ['registrations', 'التسجيلات'],
    ['visitors', 'الزيارات'],
    ['audit', 'سجل التغييرات']
  ];

  return `
    <aside class="side">
      <div class="side-brand"><span class="x">X</span><b>X Academy</b></div>
      <nav>
        ${items.map(([key, label]) => `<button data-tab="${key}" class="${A.tab === key ? 'active' : ''}">${label}</button>`).join('')}
        <a href="./" target="_blank">تجربة المتدرب</a>
      </nav>
      <div class="side-footer">
        <small>${esc(A.user?.email)}</small>
        <button class="btn ghost" id="logout">خروج</button>
      </div>
    </aside>
  `;
}

function header(title, subtitle = '', actions = '') {
  return `
    <header class="main-head">
      <div>
        <span>X ACADEMY ADMIN</span>
        <h1>${title}</h1>
        ${subtitle ? `<p class="head-sub">${subtitle}</p>` : ''}
      </div>
      <div class="head-actions">${actions}</div>
    </header>
  `;
}

function dashboard() {
  const unique = new Set(A.visits.map((visit) => visit.visitorId || visit.sessionId)).size;
  const pending = A.regs.filter((reg) => reg.paymentStatus === 'waiting-payment').length;
  const paid = A.regs.filter((reg) => reg.paymentStatus === 'paid').length;
  const counts = {
    page_view: A.events.filter((event) => event.event === 'page_view').length,
    course_selected: A.events.filter((event) => event.event === 'course_selected').length,
    journey_started: A.events.filter((event) => event.event === 'journey_started').length,
    registration_completed: A.events.filter((event) => event.event === 'registration_completed').length
  };
  const max = Math.max(1, ...Object.values(counts));

  return `
    ${header('Overview', 'صورة سريعة عن التسجيلات والزيارات والدورات الحالية.')}
    <section class="stats">
      <div class="stat"><small>التسجيلات</small><b>${A.regs.length}</b></div>
      <div class="stat"><small>بانتظار الدفع</small><b>${pending}</b></div>
      <div class="stat"><small>مدفوع / مؤكد</small><b>${paid}</b></div>
      <div class="stat"><small>Unique Visitors</small><b>${unique}</b></div>
    </section>
    <div class="analytics-grid">
      <section class="panel">
        <div class="panel-head"><h3>Conversion Funnel</h3></div>
        <div class="funnel">
          ${Object.entries(counts).map(([key, value]) => `
            <div class="funnel-row">
              <span>${key.replaceAll('_', ' ')}</span>
              <div class="bar"><i style="width:${(value / max) * 100}%"></i></div>
              <b>${value}</b>
            </div>
          `).join('')}
        </div>
      </section>
      <section class="panel">
        <div class="panel-head"><h3>الدورات</h3></div>
        ${A.courses.map((course) => {
          const runs = A.cohorts.filter((run) => run.courseId === course.id);
          return `<p><b>${esc(loc(course.title))}</b><br><small>${visibilityLabel(course.visibility || 'open')} · ${runs.length} موعد</small></p>`;
        }).join('') || '<div class="empty">لا توجد دورات.</div>'}
      </section>
    </div>
  `;
}

function courseList() {
  return `
    <div class="list course-list-admin">
      <button class="add-list-item" id="new-course">+ دورة جديدة</button>
      ${A.courses.map((course) => {
        const runs = A.cohorts.filter((run) => run.courseId === course.id);
        return `
          <button data-course-edit="${course.id}" class="${course.id === A.courseId ? 'active' : ''}">
            <b>${esc(loc(course.title))}</b>
            <small>${visibilityLabel(course.visibility || 'open')} · ${runs.length} موعد</small>
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function newCourseForm() {
  return `
    <section class="panel create-panel">
      <div class="panel-head">
        <div>
          <h3>إنشاء دورة جديدة</h3>
          <p class="helper">أنشئ تعريف الدورة أولًا. بعد الحفظ ستظهر لك داخل نفس الصفحة منطقة المواعيد والسعر.</p>
        </div>
        <button class="btn ghost" id="cancel-new-course">إلغاء</button>
      </div>
      <div class="form-grid">
        <label>
          رابط الدورة / ID
          <input id="new-id" dir="ltr" placeholder="advanced-excel">
          <small class="field-help">حروف إنجليزية وأرقام وشرطة فقط. لا يمكن تغييره لاحقًا.</small>
        </label>
        <label>
          حالة الظهور
          <select id="new-visibility">
            <option value="information">معلومات فقط</option>
            <option value="open">مفتوحة للتسجيل</option>
            <option value="closed">مغلقة</option>
            <option value="hidden">مخفية</option>
          </select>
          <small class="field-help">ابدأ بـ “معلومات فقط” إذا لم تحدد موعدًا بعد.</small>
        </label>
        <label>
          اسم الدورة بالعربي
          <input id="new-title-ar" placeholder="مثال: Excel الاحترافي">
        </label>
        <label>
          اسم الدورة بالإنجليزي
          <input id="new-title-en" dir="ltr" placeholder="Advanced Excel">
        </label>
        <div class="full form-actions"><button class="btn" id="create-course">إنشاء الدورة وفتحها للتعديل</button></div>
      </div>
    </section>
  `;
}

function parseModules(text) {
  return text.split('\n').map((line) => line.trim()).filter(Boolean).map((line, index) => {
    const [title, ...rest] = line.split('|');
    return {
      n: String(index + 1).padStart(2, '0'),
      title: title.trim(),
      detail: rest.join('|').trim()
    };
  });
}

function courseEditorForm(course) {
  const outcomesAr = (course.outcomes?.ar || []).join('\n');
  const outcomesEn = (course.outcomes?.en || []).join('\n');
  const modulesAr = (course.modules?.ar || []).map((item) => `${item.title} | ${item.detail}`).join('\n');
  const modulesEn = (course.modules?.en || []).map((item) => `${item.title} | ${item.detail}`).join('\n');

  return `
    <section class="panel course-form-panel">
      <div class="panel-head sticky-panel-head">
        <div>
          <h3>معلومات الدورة</h3>
          <p class="helper">هذه المعلومات تصف الدورة نفسها، ولا تتغير كل مرة تطرح فيها الدورة.</p>
        </div>
        <button class="btn" id="save-course">حفظ معلومات الدورة</button>
      </div>

      <div class="form-grid">
        <label>
          رابط الدورة / ID
          <input value="${esc(course.id)}" disabled dir="ltr">
          <small class="field-help">معرف داخلي ثابت للدورة.</small>
        </label>
        <label>
          حالة ظهور الدورة
          <select id="c-visibility">
            <option value="open" ${course.visibility === 'open' ? 'selected' : ''}>مفتوحة للتسجيل</option>
            <option value="information" ${course.visibility === 'information' ? 'selected' : ''}>معلومات فقط</option>
            <option value="closed" ${course.visibility === 'closed' ? 'selected' : ''}>مغلقة</option>
            <option value="hidden" ${course.visibility === 'hidden' ? 'selected' : ''}>مخفية تمامًا</option>
          </select>
          <small class="field-help">“معلومات فقط” تُظهر الدورة بدون تسجيل. “مخفية” لا تظهر للزائر.</small>
        </label>

        <div class="section-title">الاسم والرسالة</div>
        <label>اسم الدورة بالعربي<input id="c-title-ar" value="${esc(course.title?.ar)}"></label>
        <label>Course name in English<input id="c-title-en" value="${esc(course.title?.en)}" dir="ltr"></label>
        <label class="full">
          رابط شعار الدورة
          <input id="c-logo" value="${esc(course.logo || '')}" dir="ltr" placeholder="https://... أو ./assets/img/...">
          <small class="field-help">اختياري. إذا تركته فارغًا سيستخدم الموقع رمزًا افتراضيًا أنيقًا.</small>
        </label>
        <label class="full">
          العبارة المختصرة بالعربي
          <textarea id="c-promise-ar">${esc(course.promise?.ar)}</textarea>
          <small class="field-help">جملة واحدة مختصرة تظهر في بطاقة الدورة.</small>
        </label>
        <label class="full">Short promise in English<textarea id="c-promise-en" dir="ltr">${esc(course.promise?.en)}</textarea></label>
        <label class="full">
          مقدمة الدورة بالعربي
          <textarea id="c-intro-ar">${esc(course.intro?.ar)}</textarea>
          <small class="field-help">النص الرئيسي في أول خطوة بعد اختيار الدورة.</small>
        </label>
        <label class="full">Course intro in English<textarea id="c-intro-en" dir="ltr">${esc(course.intro?.en)}</textarea></label>

        <div class="section-title">لمن الدورة؟</div>
        <label class="full">مناسبة لك إذا<textarea id="c-fit-ar">${esc(course.fit?.ar)}</textarea></label>
        <label class="full">Best for you if<textarea id="c-fit-en" dir="ltr">${esc(course.fit?.en)}</textarea></label>
        <label>المستوى<input id="c-level-ar" value="${esc(course.level?.ar)}"></label>
        <label>Level<input id="c-level-en" value="${esc(course.level?.en)}" dir="ltr"></label>

        <div class="section-title">ماذا سيتعلم المتدرب؟</div>
        <label>
          النتائج بالعربي
          <textarea id="c-out-ar">${esc(outcomesAr)}</textarea>
          <small class="field-help">اكتب كل نتيجة في سطر مستقل.</small>
        </label>
        <label>
          Outcomes in English
          <textarea id="c-out-en" dir="ltr">${esc(outcomesEn)}</textarea>
          <small class="field-help">One outcome per line.</small>
        </label>

        <div class="section-title">المنهاج</div>
        <label>
          المنهاج بالعربي
          <textarea id="c-mod-ar">${esc(modulesAr)}</textarea>
          <small class="field-help">كل سطر بالشكل: اسم المحور | وصف قصير</small>
        </label>
        <label>
          Curriculum in English
          <textarea id="c-mod-en" dir="ltr">${esc(modulesEn)}</textarea>
          <small class="field-help">One line: Module title | Short description</small>
        </label>

        <div class="section-title">الشهادة</div>
        <label class="full">
          رابط صورة الشهادة
          <input id="c-cert-img" value="${esc(course.certificate?.imageUrl)}" dir="ltr" placeholder="https://...">
          <small class="field-help">اتركه فارغًا إذا لم ترفع صورة الشهادة بعد؛ الموقع لن يعرض رسالة إدارية للمتدرب.</small>
        </label>
        <label>عنوان الشهادة بالعربي<input id="c-cert-title-ar" value="${esc(course.certificate?.title?.ar)}"></label>
        <label>Certificate title<input id="c-cert-title-en" value="${esc(course.certificate?.title?.en)}" dir="ltr"></label>
        <label>ملاحظة الشهادة<input id="c-cert-note-ar" value="${esc(course.certificate?.note?.ar)}"></label>
        <label>Certificate note<input id="c-cert-note-en" value="${esc(course.certificate?.note?.en)}" dir="ltr"></label>
      </div>
    </section>
  `;
}

function courseRuns(courseId) {
  return A.cohorts.filter((run) => run.courseId === courseId);
}

function runSelector(course) {
  const runs = courseRuns(course.id);
  return `
    <section class="panel run-panel">
      <div class="panel-head">
        <div>
          <h3>مواعيد الدورة والسعر</h3>
          <p class="helper">كل “موعد” هو طرح فعلي لنفس الدورة بتاريخ وسعر وعرض وسعة مختلفة.</p>
        </div>
        <button class="btn" id="new-run">+ إضافة موعد للدورة</button>
      </div>

      ${runs.length ? `
        <div class="run-tabs">
          ${runs.map((run) => `
            <button data-run-edit="${run.id}" class="${run.id === A.cohortId ? 'active' : ''}">
              <b>${esc(loc(run.name) || 'موعد بدون اسم')}</b>
              <small>${runStatusLabel(run.status)} · ${run.sessions?.length || 0} جلسة · ${esc(run.price)} ${esc(run.currency || 'JOD')}</small>
            </button>
          `).join('')}
        </div>
        ${runEditor(runs.find((run) => run.id === A.cohortId) || runs[0])}
      ` : `
        <div class="empty-card">
          <b>لا يوجد موعد لهذه الدورة بعد.</b>
          <p>إذا كانت الدورة للعرض فقط، لا تحتاج لإضافة شيء. عندما تقرر طرحها للتسجيل اضغط “إضافة موعد للدورة”.</p>
        </div>
      `}
    </section>
  `;
}

function runEditor(run) {
  if (!run) return '';
  return `
    <div class="run-editor">
      <div class="run-editor-head">
        <div>
          <h4>تفاصيل الموعد الحالي</h4>
          <p>هنا تعدّل السعر، العرض، السعة، أيام الدورة وساعاتها.</p>
        </div>
        <button class="btn" id="save-run">حفظ الموعد</button>
      </div>

      <div class="form-grid">
        <label>
          اسم الموعد بالعربي
          <input id="h-name-ar" value="${esc(run.name?.ar)}" placeholder="مثال: مجموعة أكتوبر 2026">
          <small class="field-help">اسم داخلي/وصفي لتمييز هذا الطرح عن غيره.</small>
        </label>
        <label>Schedule name in English<input id="h-name-en" value="${esc(run.name?.en)}" dir="ltr" placeholder="October 2026 Schedule"></label>
        <label>
          حالة التسجيل لهذا الموعد
          <select id="h-status">
            <option value="open" ${run.status === 'open' ? 'selected' : ''}>التسجيل مفتوح</option>
            <option value="full" ${run.status === 'full' ? 'selected' : ''}>المقاعد مكتملة</option>
            <option value="closed" ${run.status === 'closed' ? 'selected' : ''}>مغلق</option>
          </select>
        </label>
        <label>
          السعر
          <div class="split-input"><input id="h-price" type="number" min="0" step="0.01" value="${esc(run.price)}"><input id="h-currency" value="${esc(run.currency || 'JOD')}" dir="ltr"></div>
          <small class="field-help">مثال: 100 و JOD.</small>
        </label>
        <label>
          عدد المقاعد
          <input id="h-capacity" type="number" min="1" value="${esc(run.capacity || 20)}">
        </label>
        <label>
          المقاعد المتبقية
          <input id="h-seats" type="number" min="0" value="${esc(run.seatsRemaining ?? '')}" placeholder="اختياري">
          <small class="field-help">اتركه فارغًا إذا لا تريد إظهار/إدارة رقم يدوي.</small>
        </label>

        <div class="section-title">العرض</div>
        <label>
          هل يوجد عرض؟
          <select id="h-offer-enabled">
            <option value="false" ${!run.offer?.enabled ? 'selected' : ''}>لا</option>
            <option value="true" ${run.offer?.enabled ? 'selected' : ''}>نعم</option>
          </select>
        </label>
        <label>سعر العرض<input id="h-offer-price" type="number" min="0" step="0.01" value="${esc(run.offer?.price ?? '')}"></label>
        <label>اسم العرض بالعربي<input id="h-offer-ar" value="${esc(run.offer?.title?.ar)}" placeholder="عرض التسجيل المبكر"></label>
        <label>Offer title<input id="h-offer-en" value="${esc(run.offer?.title?.en)}" dir="ltr"></label>
        <label>تاريخ انتهاء العرض<input id="h-offer-end" type="date" value="${esc(run.offer?.endsAt)}"></label>

        <div class="section-title">رسالة الدفع</div>
        <label>
          رسالة الدفع بالعربي
          <textarea id="h-pay-ar">${esc(run.paymentInstructions?.ar)}</textarea>
          <small class="field-help">هذه الجملة فقط هي التي تظهر للمتدرب في خطوة الدفع.</small>
        </label>
        <label>Payment message in English<textarea id="h-pay-en" dir="ltr">${esc(run.paymentInstructions?.en)}</textarea></label>

        <div class="section-title">المواعيد والجلسات</div>
        <div class="full schedule-explainer">
          <b>كيف تعدّل المواعيد؟</b>
          <p>إما تعدّل الجلسات الموجودة مباشرة بالأسفل، أو تولّد جدولًا كاملًا من تاريخ البداية والأيام والساعات.</p>
        </div>
        <div class="full schedule-builder">
          <h4>توليد جدول المواعيد تلقائيًا</h4>
          <div class="form-grid compact-grid">
            <label>تاريخ أول جلسة<input id="g-date" type="date"></label>
            <label>عدد الجلسات<input id="g-count" type="number" min="1" max="60" value="${run.sessions?.length || 10}"></label>
            <label>من الساعة<input id="g-start" type="time" value="19:00"></label>
            <label>إلى الساعة<input id="g-end" type="time" value="21:00"></label>
          </div>
          <div class="weekdays">
            ${days.map((day, index) => `<button type="button" data-day="${index}" class="${[0,1,3].includes(index) ? 'active' : ''}">${day}</button>`).join('')}
          </div>
          <button class="btn ghost" id="generate">إنشاء / استبدال الجدول</button>
        </div>

        <div class="full sessions-head">
          <div><b>الجلسات الحالية</b><small>كل صف قابل للتعديل مباشرة.</small></div>
          <button class="btn ghost" id="add-session">+ جلسة يدويًا</button>
        </div>
        <div class="full session-list" id="sessions">${sessionRows(run.sessions || [])}</div>

        <div class="full destructive-zone">
          <button class="btn danger" id="delete-run">حذف هذا الموعد فقط</button>
        </div>
      </div>
    </div>
  `;
}

function sessionRows(sessions) {
  if (!sessions.length) {
    return '<div class="empty-card compact-empty">لا توجد جلسات بعد. استخدم مولّد الجدول أو أضف جلسة يدويًا.</div>';
  }

  return sessions.map((session, index) => `
    <div class="session-row" data-session="${index}">
      <b>${index + 1}</b>
      <label><small>اليوم</small><input data-k="day" value="${esc(session.day)}"></label>
      <label><small>التاريخ</small><input data-k="date" value="${esc(session.date)}" placeholder="DD-MM-YYYY"></label>
      <label><small>الوقت</small><input data-k="time" value="${esc(session.time)}"></label>
      <button class="btn danger mini" data-remove-session="${index}" type="button">×</button>
    </div>
  `).join('');
}

function courseEditor() {
  const course = A.courses.find((item) => item.id === A.courseId);
  return `
    ${header('الدورات والمواعيد', 'اختر دورة، عدّل محتواها، ثم أدر مواعيدها وأسعارها من نفس الصفحة.', '<button class="btn" id="new-course-top">+ دورة جديدة</button>')}
    ${A.newCourse ? newCourseForm() : ''}
    <div class="editor-layout">
      ${courseList()}
      <div class="course-workspace">
        ${course ? `${courseEditorForm(course)}${runSelector(course)}<section class="panel destructive-panel"><button class="btn danger" id="delete-course">حذف الدورة نهائيًا</button><p>يحذف تعريف الدورة. مواعيدها تُحذف بشكل منفصل.</p></section>` : '<div class="empty">اختر دورة أو أنشئ دورة جديدة.</div>'}
      </div>
    </div>
  `;
}

async function createCourse() {
  const id = val('new-id').trim().toLowerCase();
  const titleAr = val('new-title-ar').trim();
  const titleEn = val('new-title-en').trim();
  const visibility = val('new-visibility');

  if (!/^[a-z0-9-]+$/.test(id)) {
    alert('رابط الدورة يجب أن يحتوي حروف إنجليزية وأرقام وشرطة فقط.');
    return;
  }
  if (!titleAr || !titleEn) {
    alert('اكتب اسم الدورة بالعربي والإنجليزي.');
    return;
  }
  if (A.courses.some((course) => course.id === id)) {
    alert('يوجد دورة بنفس الـ ID. اختر ID مختلف.');
    return;
  }

  const data = {
    id,
    order: A.courses.length + 1,
    visibility,
    title: { ar: titleAr, en: titleEn },
    shortTitle: { ar: titleAr, en: titleEn },
    logo: '',
    promise: { ar: '', en: '' },
    intro: { ar: '', en: '' },
    fit: { ar: '', en: '' },
    level: { ar: '', en: '' },
    outcomes: { ar: [], en: [] },
    modules: { ar: [], en: [] },
    certificate: {
      enabled: true,
      imageUrl: '',
      title: { ar: 'شهادة معتمدة بعد اجتياز الدورة', en: 'Accredited certificate after course completion' },
      note: { ar: 'تُمنح بعد إتمام الدورة واجتياز الامتحان.', en: 'Awarded after course completion and passing the exam.' }
    }
  };

  await setDoc(doc(db, 'courses', id), data);
  await log('course_created', { courseId: id });
  A.courseId = id;
  A.cohortId = '';
  A.newCourse = false;
  await load();
}

async function saveCourse() {
  const course = A.courses.find((item) => item.id === A.courseId);
  if (!course) return;

  const data = {
    ...course,
    visibility: val('c-visibility'),
    title: { ar: val('c-title-ar'), en: val('c-title-en') },
    shortTitle: { ar: val('c-title-ar'), en: val('c-title-en') },
    logo: val('c-logo'),
    promise: { ar: val('c-promise-ar'), en: val('c-promise-en') },
    intro: { ar: val('c-intro-ar'), en: val('c-intro-en') },
    fit: { ar: val('c-fit-ar'), en: val('c-fit-en') },
    level: { ar: val('c-level-ar'), en: val('c-level-en') },
    outcomes: { ar: lines(val('c-out-ar')), en: lines(val('c-out-en')) },
    modules: { ar: parseModules(val('c-mod-ar')), en: parseModules(val('c-mod-en')) },
    certificate: {
      enabled: true,
      imageUrl: val('c-cert-img'),
      title: { ar: val('c-cert-title-ar'), en: val('c-cert-title-en') },
      note: { ar: val('c-cert-note-ar'), en: val('c-cert-note-en') }
    }
  };

  await setDoc(doc(db, 'courses', course.id), data, { merge: true });
  await log('course_updated', { courseId: course.id });
  await load();
}

async function createRun() {
  if (!A.courseId) return;
  const id = `${A.courseId}-${Date.now()}`;
  const run = {
    id,
    courseId: A.courseId,
    name: { ar: 'موعد جديد', en: 'New Schedule' },
    status: 'closed',
    price: 100,
    currency: 'JOD',
    capacity: 20,
    seatsRemaining: null,
    offer: { enabled: false, title: { ar: '', en: '' }, price: null, endsAt: '' },
    paymentInstructions: {
      ar: 'بعد إرسال طلب التسجيل سنتواصل معك عبر واتساب لتأكيد توفر المقعد واستكمال الدفع.',
      en: 'After you submit your registration, we will contact you on WhatsApp to confirm seat availability and complete payment.'
    },
    sessions: []
  };

  await setDoc(doc(db, 'cohorts', id), run);
  await log('schedule_created', { cohortId: id, courseId: A.courseId });
  A.cohortId = id;
  await load();
}

function readSessions() {
  return [...document.querySelectorAll('[data-session]')].map((row) => ({
    day: row.querySelector('[data-k="day"]')?.value || '',
    date: row.querySelector('[data-k="date"]')?.value || '',
    time: row.querySelector('[data-k="time"]')?.value || ''
  }));
}

async function saveRun() {
  const run = A.cohorts.find((item) => item.id === A.cohortId);
  if (!run) return;

  const data = {
    ...run,
    courseId: A.courseId,
    status: val('h-status'),
    name: { ar: val('h-name-ar'), en: val('h-name-en') },
    price: Number(val('h-price') || 0),
    currency: val('h-currency') || 'JOD',
    capacity: Number(val('h-capacity') || 0),
    seatsRemaining: val('h-seats') === '' ? null : Number(val('h-seats')),
    offer: {
      enabled: val('h-offer-enabled') === 'true',
      price: val('h-offer-price') === '' ? null : Number(val('h-offer-price')),
      title: { ar: val('h-offer-ar'), en: val('h-offer-en') },
      endsAt: val('h-offer-end')
    },
    paymentInstructions: { ar: val('h-pay-ar'), en: val('h-pay-en') },
    sessions: readSessions()
  };

  await setDoc(doc(db, 'cohorts', run.id), data, { merge: true });
  await log('schedule_updated', { cohortId: run.id, courseId: A.courseId });
  await load();
}

function registrations() {
  const list = A.regs.filter((reg) => (
    (A.filter === 'all' || reg.registrationStatus === A.filter) &&
    `${reg.name || ''} ${reg.email || ''} ${reg.phone || ''}`.toLowerCase().includes(A.search.toLowerCase())
  ));

  return `
    ${header('التسجيلات', 'تابع التسجيل والدفع وعدّل الحالة.', '<button class="btn ghost" id="export">Export Excel</button>')}
    <section class="panel">
      <div class="panel-head">
        <div class="filters">
          <input id="search" placeholder="بحث بالاسم أو الهاتف أو البريد" value="${esc(A.search)}">
          <select id="reg-filter">
            <option value="all" ${A.filter === 'all' ? 'selected' : ''}>الكل</option>
            <option value="new" ${A.filter === 'new' ? 'selected' : ''}>New</option>
            <option value="waiting-list" ${A.filter === 'waiting-list' ? 'selected' : ''}>Waiting List</option>
            <option value="confirmed" ${A.filter === 'confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="completed" ${A.filter === 'completed' ? 'selected' : ''}>Completed</option>
            <option value="cancelled" ${A.filter === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>التاريخ</th><th>المتدرب</th><th>الدورة</th><th>الحالة</th><th>الدفع</th><th>إجراء</th></tr></thead>
          <tbody>
            ${list.map((reg) => `
              <tr>
                <td>${esc((reg.createdAt || '').slice(0, 10))}</td>
                <td><b>${esc(reg.name)}</b><small>${esc(reg.title)} · ${esc(reg.email)}</small><small dir="ltr">${esc(reg.phone)}</small></td>
                <td>${esc(loc(A.courses.find((course) => course.id === (reg.courseId || reg.course))?.title) || reg.courseId || reg.course)}</td>
                <td>
                  <select data-reg-status="${reg.id}">
                    <option ${reg.registrationStatus === 'new' ? 'selected' : ''} value="new">New</option>
                    <option ${reg.registrationStatus === 'waiting-list' ? 'selected' : ''} value="waiting-list">Waiting List</option>
                    <option ${reg.registrationStatus === 'confirmed' ? 'selected' : ''} value="confirmed">Confirmed</option>
                    <option ${reg.registrationStatus === 'completed' ? 'selected' : ''} value="completed">Completed</option>
                    <option ${reg.registrationStatus === 'cancelled' ? 'selected' : ''} value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td><span class="chip ${reg.paymentStatus === 'paid' ? 'teal' : ''}">${esc(reg.paymentStatus || 'waiting-payment')}</span></td>
                <td><button class="btn ghost" data-paid="${reg.id}">Mark Paid</button></td>
              </tr>
            `).join('') || '<tr><td colspan="6" class="empty">لا توجد نتائج.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function visitors() {
  return `
    ${header('تفاصيل الزيارات', 'آخر الزيارات والأجهزة ومصادر الوصول.')}
    <section class="panel">
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>التاريخ</th><th>الصفحة</th><th>الجهاز</th><th>المصدر</th><th>Visitor / Session</th></tr></thead>
          <tbody>
            ${A.visits.slice(0, 500).map((visit) => `
              <tr>
                <td>${esc(visit.timestamp || '')}</td>
                <td>${esc(visit.page || visit.url || '/')}</td>
                <td><b>${esc(visit.device || visit.platform || '-')}</b><small>${esc(visit.screen || visit.viewport || '')}</small></td>
                <td>${esc(visit.utmSource || visit.referrer || 'Direct')}</td>
                <td><small dir="ltr">${esc(String(visit.visitorId || '').slice(0, 16))}</small><small dir="ltr">${esc(String(visit.sessionId || '').slice(0, 16))}</small></td>
              </tr>
            `).join('') || '<tr><td colspan="5" class="empty">لا توجد زيارات.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function audit() {
  return `
    ${header('سجل التغييرات', 'يسجل تعديلات الإدارة المهمة: الدورات، المواعيد، الدفع والحالات.')}
    <section class="panel">
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>الوقت</th><th>المستخدم</th><th>الإجراء</th><th>التفاصيل</th></tr></thead>
          <tbody>
            ${A.audit.slice(0, 500).map((item) => `
              <tr>
                <td>${esc(item.createdAt || '')}</td>
                <td>${esc(item.user || '')}</td>
                <td>${esc(item.action || '')}</td>
                <td><small>${esc(JSON.stringify(item.details || {}))}</small></td>
              </tr>
            `).join('') || '<tr><td colspan="4" class="empty">لا يوجد سجل حتى الآن.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function render() {
  if (!A.user) return login();
  if (A.loading) {
    root.innerHTML = '<div class="empty" style="padding:20vh 0">جاري تحميل لوحة التحكم…</div>';
    return;
  }

  const body = A.tab === 'dashboard'
    ? dashboard()
    : A.tab === 'courses'
      ? courseEditor()
      : A.tab === 'registrations'
        ? registrations()
        : A.tab === 'visitors'
          ? visitors()
          : audit();

  root.innerHTML = `<div class="admin">${nav()}<main class="main">${body}</main></div>`;
  bind();
}

function selectCourse(courseId) {
  A.courseId = courseId;
  const runs = courseRuns(courseId);
  A.cohortId = runs[0]?.id || '';
  A.newCourse = false;
  render();
}

function bind() {
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.onclick = () => {
      A.tab = button.dataset.tab;
      A.newCourse = false;
      render();
    };
  });

  document.getElementById('logout')?.addEventListener('click', () => signOut(auth));

  document.querySelectorAll('[data-course-edit]').forEach((button) => {
    button.onclick = () => selectCourse(button.dataset.courseEdit);
  });

  document.querySelectorAll('[data-run-edit]').forEach((button) => {
    button.onclick = () => {
      A.cohortId = button.dataset.runEdit;
      render();
    };
  });

  const openNewCourse = () => {
    A.newCourse = true;
    render();
    requestAnimationFrame(() => document.getElementById('new-id')?.focus());
  };
  document.getElementById('new-course')?.addEventListener('click', openNewCourse);
  document.getElementById('new-course-top')?.addEventListener('click', openNewCourse);
  document.getElementById('cancel-new-course')?.addEventListener('click', () => { A.newCourse = false; render(); });
  document.getElementById('create-course')?.addEventListener('click', createCourse);

  document.getElementById('save-course')?.addEventListener('click', saveCourse);
  document.getElementById('new-run')?.addEventListener('click', createRun);
  document.getElementById('save-run')?.addEventListener('click', saveRun);

  document.getElementById('delete-course')?.addEventListener('click', async () => {
    const course = A.courses.find((item) => item.id === A.courseId);
    if (!course) return;
    if (!confirm(`حذف دورة “${loc(course.title)}” نهائيًا؟ يمكنك استخدام “مخفية” بدل الحذف إذا أردت الاحتفاظ بها.`)) return;
    await deleteDoc(doc(db, 'courses', A.courseId));
    await log('course_deleted', { courseId: A.courseId });
    A.courseId = '';
    A.cohortId = '';
    await load();
  });

  document.getElementById('delete-run')?.addEventListener('click', async () => {
    if (!A.cohortId || !confirm('حذف هذا الموعد فقط؟ لن يتم حذف الدورة نفسها.')) return;
    await deleteDoc(doc(db, 'cohorts', A.cohortId));
    await log('schedule_deleted', { cohortId: A.cohortId, courseId: A.courseId });
    A.cohortId = '';
    await load();
  });

  document.querySelectorAll('[data-day]').forEach((button) => {
    button.onclick = () => button.classList.toggle('active');
  });

  document.getElementById('generate')?.addEventListener('click', generateSchedule);
  document.getElementById('add-session')?.addEventListener('click', addManualSession);

  document.querySelectorAll('[data-remove-session]').forEach((button) => {
    button.onclick = () => {
      button.closest('[data-session]')?.remove();
      renumberSessionRows();
      if (!document.querySelector('[data-session]')) {
        document.getElementById('sessions').innerHTML = sessionRows([]);
      }
    };
  });

  document.getElementById('search')?.addEventListener('input', (event) => {
    A.search = event.target.value;
    render();
  });

  document.getElementById('reg-filter')?.addEventListener('change', (event) => {
    A.filter = event.target.value;
    render();
  });

  document.querySelectorAll('[data-paid]').forEach((button) => {
    button.onclick = async () => {
      await updateDoc(doc(db, 'registrations', button.dataset.paid), {
        paymentStatus: 'paid',
        registrationStatus: 'confirmed',
        paymentVerifiedAt: new Date().toISOString(),
        paymentVerifiedBy: A.user.email
      });
      await log('payment_marked_paid', { registrationId: button.dataset.paid });
      await load();
    };
  });

  document.querySelectorAll('[data-reg-status]').forEach((select) => {
    select.onchange = async () => {
      await updateDoc(doc(db, 'registrations', select.dataset.regStatus), {
        registrationStatus: select.value,
        statusUpdatedAt: new Date().toISOString()
      });
      await log('registration_status_changed', {
        registrationId: select.dataset.regStatus,
        status: select.value
      });
      await load();
    };
  });

  document.getElementById('export')?.addEventListener('click', exportExcel);
}

function addManualSession() {
  const sessions = readSessions();
  sessions.push({ day: '', date: '', time: '' });
  document.getElementById('sessions').innerHTML = sessionRows(sessions);
  bindSessionButtonsOnly();
}

function bindSessionButtonsOnly() {
  document.querySelectorAll('[data-remove-session]').forEach((button) => {
    button.onclick = () => {
      button.closest('[data-session]')?.remove();
      renumberSessionRows();
      if (!document.querySelector('[data-session]')) {
        document.getElementById('sessions').innerHTML = sessionRows([]);
      }
    };
  });
}

function renumberSessionRows() {
  [...document.querySelectorAll('[data-session]')].forEach((row, index) => {
    row.dataset.session = index;
    const number = row.querySelector(':scope > b');
    if (number) number.textContent = index + 1;
  });
}

function generateSchedule() {
  const start = val('g-date');
  if (!start) {
    alert('اختر تاريخ أول جلسة.');
    return;
  }

  const count = Math.max(1, Math.min(60, Number(val('g-count')) || 1));
  const chosenDays = [...document.querySelectorAll('[data-day].active')].map((item) => Number(item.dataset.day));
  if (!chosenDays.length) {
    alert('اختر أيام التدريب.');
    return;
  }

  const startTime = val('g-start');
  const endTime = val('g-end');
  const formatTime = (value) => {
    const [hour, minute] = value.split(':').map(Number);
    return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'مساءً' : 'صباحًا'}`;
  };
  const time = `${formatTime(startTime)} - ${formatTime(endTime)}`;
  const date = new Date(`${start}T12:00:00`);
  const sessions = [];
  let guard = 0;

  while (sessions.length < count && guard < 730) {
    if (chosenDays.includes(date.getDay())) {
      sessions.push({
        day: days[date.getDay()],
        date: `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`,
        time
      });
    }
    date.setDate(date.getDate() + 1);
    guard += 1;
  }

  document.getElementById('sessions').innerHTML = sessionRows(sessions);
  bindSessionButtonsOnly();
}

function exportExcel() {
  const rows = A.regs.map((reg) => ({
    Date: reg.createdAt || '',
    Name: reg.name || '',
    Phone: reg.phone || '',
    Email: reg.email || '',
    Title: reg.title || '',
    Course: loc(A.courses.find((course) => course.id === (reg.courseId || reg.course))?.title) || reg.courseId || reg.course || '',
    Schedule: loc(A.cohorts.find((run) => run.id === reg.cohortId)?.name) || reg.cohortId || '',
    Status: reg.registrationStatus || '',
    Payment: reg.paymentStatus || ''
  }));

  if (window.XLSX) {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    XLSX.writeFile(workbook, `x-academy-registrations-${new Date().toISOString().slice(0, 10)}.xlsx`);
    return;
  }

  const headers = Object.keys(rows[0] || { Date: '' });
  const csv = [headers, ...rows.map((row) => headers.map((headerName) => row[headerName] || ''))]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
    .join('\n');
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8' }));
  anchor.download = 'x-academy-registrations.csv';
  anchor.click();
  URL.revokeObjectURL(anchor.href);
}

onAuthStateChanged(auth, (user) => {
  A.user = user;
  if (user) load();
  else render();
});
