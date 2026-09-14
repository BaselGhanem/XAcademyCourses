export const DEFAULT_COURSES = [
  {
    id: `excel`,
    order: 1,
    visibility: `open`,
    title: { ar: `Excel الاحترافي`, en: `Advanced Excel` },
    shortTitle: { ar: `Excel`, en: `Excel` },
    promise: {
      ar: `حوّل الجداول إلى قرارات، وأتمت المهام المتكررة بثقة.`,
      en: `Turn spreadsheets into decisions and automate repetitive work with confidence.`
    },
    intro: {
      ar: `مسار عملي يبدأ بتنظيم البيانات، ثم المعادلات والتحليل، وينتهي ببناء Dashboard قابل للتحديث.`,
      en: `A practical path from structured data and formulas to analysis and a refreshable dashboard.`
    },
    fit: {
      ar: `مناسبة إذا كان شغلك اليومي داخل Excel وتريد تنظيم البيانات، تقليل العمل اليدوي، والتحليل بشكل أسرع.`,
      en: `Best if your daily work lives in Excel and you want cleaner data, less manual work, and faster analysis.`
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
        { n: `02`, title: `المعادلات التي تعمل`, detail: `IF وXLOOKUP والمنطق المتقدم` },
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
      title: { ar: `شهادة إتمام + شهادة مهارات Excel`, en: `Completion Certificate + Excel Skills Certificate` },
      note: { ar: `تُمنح بعد إتمام الدورة واجتياز الامتحان.`, en: `Awarded after completing the course and passing the exam.` }
    }
  },
  {
    id: `powerbi`,
    order: 2,
    visibility: `open`,
    title: { ar: `Power BI Specialist`, en: `Power BI Specialist` },
    shortTitle: { ar: `Power BI`, en: `Power BI` },
    promise: {
      ar: `ابنِ نموذج بيانات واضحاً وتقارير تفاعلية تقود القرار.`,
      en: `Build a clear data model and interactive reports that guide decisions.`
    },
    intro: {
      ar: `مسار تطبيقي ينقلك من البيانات الخام إلى نموذج مترابط ثم Measures وتقرير تفاعلي جاهز للمشاركة.`,
      en: `A practical path from raw data to a connected model, measures, and a shareable interactive report.`
    },
    fit: {
      ar: `مناسبة إذا كان هدفك ربط مصادر متعددة وبناء Dashboards تفاعلية وتقارير قابلة للمشاركة.`,
      en: `Best if you want to connect multiple sources and build interactive, shareable dashboards.`
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
      title: { ar: `شهادة إتمام + شهادة مهارات Power BI`, en: `Completion Certificate + Power BI Skills Certificate` },
      note: { ar: `تُمنح بعد إتمام الدورة واجتياز الامتحان.`, en: `Awarded after completing the course and passing the exam.` }
    }
  }
];

export const DEFAULT_COHORTS = [
  {
    id: `excel-default`, courseId: `excel`, name: { ar: `المجموعة القادمة`, en: `Next Cohort` }, status: `open`,
    price: 100, currency: `JOD`, capacity: 20, seatsRemaining: null,
    offer: { enabled: false, title: { ar: ``, en: `` }, price: null, endsAt: `` },
    paymentInstructions: {
      ar: `بعد إرسال طلب التسجيل سنتواصل معك عبر واتساب لتأكيد توفر المقعد وإتمام الدفع. تأكيد الدفع يتم يدويًا من الإدارة.`,
      en: `After you submit your registration, we will contact you on WhatsApp to confirm seat availability and complete payment. Payment is verified manually by the admin.`
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
    id: `powerbi-default`, courseId: `powerbi`, name: { ar: `المجموعة القادمة`, en: `Next Cohort` }, status: `open`,
    price: 100, currency: `JOD`, capacity: 20, seatsRemaining: null,
    offer: { enabled: false, title: { ar: ``, en: `` }, price: null, endsAt: `` },
    paymentInstructions: {
      ar: `بعد إرسال طلب التسجيل سنتواصل معك عبر واتساب لتأكيد توفر المقعد وإتمام الدفع. تأكيد الدفع يتم يدويًا من الإدارة.`,
      en: `After you submit your registration, we will contact you on WhatsApp to confirm seat availability and complete payment. Payment is verified manually by the admin.`
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
  [`🇩🇿`,`Algeria`,`الجزائر`,`+213`],[`🇧🇭`,`Bahrain`,`البحرين`,`+973`],[`🇰🇲`,`Comoros`,`جزر القمر`,`+269`],
  [`🇩🇯`,`Djibouti`,`جيبوتي`,`+253`],[`🇪🇬`,`Egypt`,`مصر`,`+20`],[`🇮🇶`,`Iraq`,`العراق`,`+964`],
  [`🇯🇴`,`Jordan`,`الأردن`,`+962`],[`🇰🇼`,`Kuwait`,`الكويت`,`+965`],[`🇱🇧`,`Lebanon`,`لبنان`,`+961`],
  [`🇱🇾`,`Libya`,`ليبيا`,`+218`],[`🇲🇷`,`Mauritania`,`موريتانيا`,`+222`],[`🇲🇦`,`Morocco`,`المغرب`,`+212`],
  [`🇴🇲`,`Oman`,`عُمان`,`+968`],[`🇵🇸`,`Palestine`,`فلسطين`,`+970`],[`🇶🇦`,`Qatar`,`قطر`,`+974`],
  [`🇸🇦`,`Saudi Arabia`,`السعودية`,`+966`],[`🇸🇴`,`Somalia`,`الصومال`,`+252`],[`🇸🇩`,`Sudan`,`السودان`,`+249`],
  [`🇸🇾`,`Syria`,`سوريا`,`+963`],[`🇹🇳`,`Tunisia`,`تونس`,`+216`],[`🇦🇪`,`United Arab Emirates`,`الإمارات`,`+971`],
  [`🇾🇪`,`Yemen`,`اليمن`,`+967`]
].map(([flag,en,ar,code]) => ({ flag, en, ar, code }));
