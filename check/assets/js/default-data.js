export const DEFAULT_COURSES = [
  {
    id: `excel`,
    order: 1,
    visibility: `open`,
    title: { ar: `Excel الاحترافي`, en: `Advanced Excel` },
    shortTitle: { ar: `Excel`, en: `Excel` },
    logo: `./assets/img/excel-mark.svg`,
    promise: {
      ar: `حوّل الجداول إلى قرارات، وأتمت المهام المتكررة بثقة.`,
      en: `Turn spreadsheets into decisions and automate repetitive work with confidence.`
    },
    intro: {
      ar: `مسار عملي يبدأ بتنظيم البيانات، ثم المعادلات والتحليل، وينتهي ببناء Dashboard قابل للتحديث.`,
      en: `A practical path from structured data and formulas to analysis and a refreshable dashboard.`
    },
    fit: {
      ar: `إذا كان شغلك اليومي داخل Excel وتريد تنظيم البيانات، تقليل العمل اليدوي، والتحليل بشكل أسرع.`,
      en: `If your daily work lives in Excel and you want cleaner data, less manual work, and faster analysis.`
    },
    level: {
      ar: `يبدأ بشكل مناسب للمبتدئ ويتدرج إلى تطبيق مهني.`,
      en: `Starts accessibly and progresses into professional application.`
    },
    outcomes: {
      ar: [
        `أتمتة المهام المتكررة وتوفير وقت العمل`,
        `تحليل آلاف الصفوف واستخراج المؤشرات الأهم`,
        `بناء Dashboard قابل للتحديث يدعم القرار`
      ],
      en: [
        `Automate repetitive work and save time`,
        `Analyze thousands of rows and surface the metrics that matter`,
        `Build a refreshable dashboard that supports decisions`
      ]
    },
    modules: {
      ar: [
        { n: `01`, title: `أساس متين`, detail: `تنظيف البيانات والجداول الذكية` },
        { n: `02`, title: `المعادلات التي تعمل`, detail: `IF و XLOOKUP والمنطق المتقدم` },
        { n: `03`, title: `تحليل سريع`, detail: `Pivot Tables ومؤشرات الأداء` },
        { n: `04`, title: `لوحة قيادة`, detail: `Dashboard تنفيذي قابل للتحديث` }
      ],
      en: [
        { n: `01`, title: `Strong Foundation`, detail: `Data cleaning and smart tables` },
        { n: `02`, title: `Formulas That Work`, detail: `IF, XLOOKUP and advanced logic` },
        { n: `03`, title: `Fast Analysis`, detail: `PivotTables and performance indicators` },
        { n: `04`, title: `Dashboard`, detail: `A refreshable executive dashboard` }
      ]
    },
    certificate: {
      enabled: true,
      imageUrl: ``,
      title: { ar: `شهادة معتمدة بعد اجتياز الدورة`, en: `Accredited certificate after course completion` },
      note: { ar: `تُمنح بعد إتمام الدورة واجتياز الامتحان.`, en: `Awarded after course completion and passing the exam.` }
    }
  },
  {
    id: `powerbi`,
    order: 2,
    visibility: `open`,
    title: { ar: `Power BI Specialist`, en: `Power BI Specialist` },
    shortTitle: { ar: `Power BI`, en: `Power BI` },
    logo: `./assets/img/powerbi-mark.svg`,
    promise: {
      ar: `ابنِ نموذج بيانات واضحًا وتقارير تفاعلية تقود القرار.`,
      en: `Build a clear data model and interactive reports that guide decisions.`
    },
    intro: {
      ar: `مسار تطبيقي ينقلك من البيانات الخام إلى نموذج مترابط ثم Measures وتقرير تفاعلي جاهز للمشاركة.`,
      en: `A practical path from raw data to a connected model, measures, and a shareable interactive report.`
    },
    fit: {
      ar: `إذا كان هدفك ربط مصادر متعددة وبناء Dashboards تفاعلية وتقارير قابلة للمشاركة.`,
      en: `If you want to connect multiple sources and build interactive, shareable dashboards.`
    },
    level: {
      ar: `مناسب لمن يريد دخول Power BI من أساس واضح ثم التدرج إلى التطبيق المهني.`,
      en: `Designed to take you from a clear foundation into professional application.`
    },
    outcomes: {
      ar: [
        `تنظيف وربط مصادر متعددة عبر Power Query`,
        `بناء حسابات تجيب عن أسئلة العمل باستخدام DAX`,
        `إنتاج تقارير تفاعلية واضحة وقابلة للمشاركة`
      ],
      en: [
        `Clean and combine multiple sources with Power Query`,
        `Build calculations that answer business questions with DAX`,
        `Create clear interactive reports that are ready to share`
      ]
    },
    modules: {
      ar: [
        { n: `01`, title: `Power Query`, detail: `استيراد وتنظيف ودمج البيانات` },
        { n: `02`, title: `Data Modeling`, detail: `نموذج نجمي وعلاقات سليمة` },
        { n: `03`, title: `DAX بوضوح`, detail: `Measures تجيب عن أسئلة العمل` },
        { n: `04`, title: `Storytelling`, detail: `تقارير تفاعلية قابلة للنشر` }
      ],
      en: [
        { n: `01`, title: `Power Query`, detail: `Import, clean and combine data` },
        { n: `02`, title: `Data Modeling`, detail: `Star schema and reliable relationships` },
        { n: `03`, title: `Clear DAX`, detail: `Measures that answer business questions` },
        { n: `04`, title: `Storytelling`, detail: `Interactive reports ready to publish` }
      ]
    },
    certificate: {
      enabled: true,
      imageUrl: ``,
      title: { ar: `شهادة معتمدة بعد اجتياز الدورة`, en: `Accredited certificate after course completion` },
      note: { ar: `تُمنح بعد إتمام الدورة واجتياز الامتحان.`, en: `Awarded after course completion and passing the exam.` }
    }
  }
];

export const DEFAULT_COHORTS = [
  {
    id: `excel-default`,
    courseId: `excel`,
    name: { ar: `الموعد القادم`, en: `Next Schedule` },
    status: `open`,
    price: 100,
    currency: `JOD`,
    capacity: 20,
    seatsRemaining: null,
    offer: { enabled: false, title: { ar: ``, en: `` }, price: null, endsAt: `` },
    paymentInstructions: {
      ar: `بعد إرسال طلب التسجيل سنتواصل معك عبر واتساب لتأكيد توفر المقعد واستكمال الدفع.`,
      en: `After you submit your registration, we will contact you on WhatsApp to confirm seat availability and complete payment.`
    },
    sessions: [
      { day: `الأحد`, date: `30-08-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الإثنين`, date: `31-08-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الأربعاء`, date: `02-09-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الأحد`, date: `06-09-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الإثنين`, date: `07-09-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الأربعاء`, date: `09-09-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الأحد`, date: `13-09-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الإثنين`, date: `14-09-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الأربعاء`, date: `16-09-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الأحد`, date: `20-09-2026`, time: `7:00 - 9:00 مساءً` }
    ]
  },
  {
    id: `powerbi-default`,
    courseId: `powerbi`,
    name: { ar: `الموعد القادم`, en: `Next Schedule` },
    status: `open`,
    price: 100,
    currency: `JOD`,
    capacity: 20,
    seatsRemaining: null,
    offer: { enabled: false, title: { ar: ``, en: `` }, price: null, endsAt: `` },
    paymentInstructions: {
      ar: `بعد إرسال طلب التسجيل سنتواصل معك عبر واتساب لتأكيد توفر المقعد واستكمال الدفع.`,
      en: `After you submit your registration, we will contact you on WhatsApp to confirm seat availability and complete payment.`
    },
    sessions: [
      { day: `الثلاثاء`, date: `16-06-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الخميس`, date: `18-06-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الثلاثاء`, date: `23-06-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الخميس`, date: `25-06-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الثلاثاء`, date: `30-06-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الخميس`, date: `02-07-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الثلاثاء`, date: `07-07-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الخميس`, date: `09-07-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الثلاثاء`, date: `14-07-2026`, time: `7:00 - 9:00 مساءً` },
      { day: `الخميس`, date: `16-07-2026`, time: `7:00 - 9:00 مساءً` }
    ]
  }
];

export const ARAB_COUNTRIES = [
  [`dz`,`Algeria`,`الجزائر`,`+213`],
  [`bh`,`Bahrain`,`البحرين`,`+973`],
  [`km`,`Comoros`,`جزر القمر`,`+269`],
  [`dj`,`Djibouti`,`جيبوتي`,`+253`],
  [`eg`,`Egypt`,`مصر`,`+20`],
  [`iq`,`Iraq`,`العراق`,`+964`],
  [`jo`,`Jordan`,`الأردن`,`+962`],
  [`kw`,`Kuwait`,`الكويت`,`+965`],
  [`lb`,`Lebanon`,`لبنان`,`+961`],
  [`ly`,`Libya`,`ليبيا`,`+218`],
  [`mr`,`Mauritania`,`موريتانيا`,`+222`],
  [`ma`,`Morocco`,`المغرب`,`+212`],
  [`om`,`Oman`,`عُمان`,`+968`],
  [`ps`,`Palestine`,`فلسطين`,`+970`],
  [`qa`,`Qatar`,`قطر`,`+974`],
  [`sa`,`Saudi Arabia`,`السعودية`,`+966`],
  [`so`,`Somalia`,`الصومال`,`+252`],
  [`sd`,`Sudan`,`السودان`,`+249`],
  [`sy`,`Syria`,`سوريا`,`+963`],
  [`tn`,`Tunisia`,`تونس`,`+216`],
  [`ae`,`United Arab Emirates`,`الإمارات`,`+971`],
  [`ye`,`Yemen`,`اليمن`,`+967`]
].map(([flagCode, en, ar, code]) => ({
  flagCode,
  en,
  ar,
  code,
  flagUrl: `https://flagcdn.com/w40/${flagCode}.png`
}));
