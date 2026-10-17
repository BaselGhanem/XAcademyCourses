// Course223 — Day 1 preserved; Day 2 prepared; Days 3–10 planned.
const COURSE_CONFIG = {
  id: `course223_mariam`,
  title: `Power BI | X Academy`,
  subtitle: `Learn. Analyse. Lead.`,
  academy: `X Academy`,
  trainer: `Basel Ghanem`,
  trainerTitle: `Power BI & Excel Trainer`,
  learner: `مريم`,
  totalDays: 10,
  totalHours: 20,
  sessionHours: 2,
  portalPassword: `PowerBI`,
  storage: {
    student: `course223_mariam_student_name`,
    completed: `course223_mariam_completed_days`
  },
  powerBiDownloadUrl: `https://www.microsoft.com/en-us/power-platform/products/power-bi/downloads`,
  liveUrl: ``,
  dashboardPreviewUrl: ``,
  instructorImage: `https://raw.githubusercontent.com/BaselGhanem/Portfolio/refs/heads/main/BaselGhanem.jpg`,
  contact: {
    email: `Xacademy2@outlook.com`,
    phone: `+962 78 45 87 87`,
    location: `عمان - الاردن`
  }
};

const DAYS = [
  {
    id: 1,
    date: `2026-10-15`,
    weekday: `الخميس`,
    ready: true,
    phase: `CONNECT`,
    title: `Meet Your Workforce Data`,
    titleAr: `اول تقرير، خطوة بخطوة`,
    hook: `توزيع القوى العاملة موجود في ملفات متفرقة، لكن الوصول الى عدد الموظفين وتوزيعهم يحتاج عملا يدويا`,
    mission: `نشوف فائدة Power BI بالتجربة، ونربط Excel ونبني اول تقرير تفاعلي بسيط`,
    topics: [`Power BI Desktop`, `Excel`, `Get Data`, `Card`, `Bar Chart`, `Slicer`],
    build: [
      `نجرب تقرير تفاعلي ونشوف كيف الفلتر بغير النتيجة`,
      `نربط ملف Excel المجهز ونحمل الجدول`,
      `نبني بطاقة عدد ورسم افقي وفلتر منشاة`,
      `نجرب تغيير حقل الرسم ونحفظ اول تقرير`
    ],
    challenge: `نغير Cadre بالرسم الى FacilityName، نجرب فلتر منشاة ونمسحه، ونحفظ التقرير`,
    deliverable: `اول تقرير بسيط فيه بطاقة عدد ورسم افقي وفلتر شغال`,
    visualGuide: { image: ``, title: `رحلة اليوم الاول`, note: `بطاقة ورسم افقي وفلتر من 10000 موظف` },
    resources: [
      {name:`Sales_Web_5000.html`,type:`WEB`,url:`week1/day1/web/Sales_Web_5000.html`,note:`مبيعات: 5000 صف في جدول Web ثابت`},
      {name:`Sales_Practice_5000.xlsx`,type:`Excel`,url:`week1/day1/data/Sales_Practice_5000.xlsx`,note:`نفس بيانات Web بملف Excel مستقل`},
      {name:`Service_Requests_1000.pdf`,type:`PDF`,url:`week1/day1/data/Service_Requests_1000.pdf`,note:`1000 طلب خدمة في جداول نصية`},
      {name:`Training_Attendance_5000.csv`,type:`CSV`,url:`week1/day1/data/Training_Attendance_5000.csv`,note:`5000 سجل حضور دورات، مثال اضافي`},

      { name: `Day01_Complete.zip`, type: `ZIP`, url: `week1/day1/downloads/Day01_Complete.zip`, note: `كل المراجع الاضافية؛ ملف Excel بكفي للتطبيق اليوم` },
      { name: `Workforce_Starting_Snapshot.xlsx`, type: `Excel`, url: `week1/day1/data/Workforce_Starting_Snapshot.xlsx`, note: `ملف التطبيق الاساسي: 10000 موظفا في لقطة واحدة` },
      { name: `Day01_Guide.html`, type: `Guide`, url: `week1/day1/web/Day01_Guide.html`, note: `مرجع موسع اختياري؛ المطلوب اليوم موضح بالصفحة` },
      { name: `Day01_Challenge.html`, type: `Challenge`, url: `week1/day1/web/Day01_Challenge.html`, note: `تمرين اضافي اختياري للتوسع بعد التطبيق البسيط` },
      { name: `Day01_Dictionary.html`, type: `Guide`, url: `week1/day1/web/Day01_Dictionary.html`, note: `قاموس الحقول وتعريف مستوى التفاصيل` },
      { name: `Day01_Reference.html`, type: `Guide`, url: `week1/day1/web/Day01_Reference.html`, note: `نتائج التحقق ومخطط التقرير` },
      { name: `Facility_Master.csv`, type: `CSV`, url: `week1/day1/data/Facility_Master.csv`, note: `عرض ربط CSV دون علاقات اليوم` },
      { name: `Facility_Demo.txt`, type: `TXT`, url: `week1/day1/data/Facility_Demo.txt`, note: `عرض المصدر النصي بفاصل Tab` },
      { name: `Facility_Demo.pdf`, type: `PDF`, url: `week1/day1/data/Facility_Demo.pdf`, note: `جدول منشات نصي لاستكشاف PDF` },
      { name: `Facility_Directory.html`, type: `WEB`, url: `week1/day1/web/Facility_Directory.html`, note: `صفحة جدول ثابت لعرض موصل Web` },
      { name: `Workforce_Starting_Snapshot.csv`, type: `CSV`, url: `week1/day1/data/Workforce_Starting_Snapshot.csv`, note: `بديل لملف Excel بنفس الموظفين، لا يجمع معه` }
    ],
    requiredFiles: [
      {
        name: `Workforce_Starting_Snapshot.xlsx`,
        type: `Excel`,
        note: `لقطة واحدة ببيانات موظفين افتراضية ومعرفات مجهولة`
      },
      {
        name: `Facility_Master.csv`,
        type: `CSV`,
        note: `قائمة المنشات التدريبية`
      },
      {
        name: `Day01_Source_Demos`,
        type: `Guide`,
        note: `مصادر نصية وPDF وصفحة Web صغيرة للعرض الموجه`
      },
      {
        name: `Day01_Data_Dictionary_and_Challenge`,
        type: `Guide`,
        note: `شرح الحقول واسئلة القسم ومهمة التطبيق`
      }
    ]
  },
  {
    "id": 2,
    "date": "2026-10-18",
    "weekday": "الأحد",
    "ready": true,
    "phase": "CLEAN",
    "title": "Power Query — Cleaning Performance Evaluation Data",
    "titleAr": "تنظيف بيانات تقييم اداء الموظفين",
    "hook": "وصل ملف تقييمات فيه 30450 صف، لكن التكرار والدرجات الناقصة واختلاف المسميات بيعطوا صورة مضللة",
    "mission": "نبني خطوات تنظيف قابلة للتحديث، نحافظ على KPIs الصحيحة ونفصل الحالات التي تحتاج مراجعة بدون خلط اتجاهات التقييم",
    "topics": [
      "Power Query",
      "Data Profiling",
      "Trim / Clean / NBSP",
      "Replace Values",
      "Data Types / Locale",
      "Null vs Zero",
      "Remove / Replace Errors",
      "Fill / Split Columns",
      "Conditional Columns",
      "True Duplicates",
      "Applied Steps"
    ],
    "build": [
      "نزلي ملف التطبيق CSV وافتحيه من Get Data ثم Text/CSV واختاري Transform Data",
      "استكشفي الاعمدة والقيم الناقصة والتكرار باستخدام Data Profiling",
      "نظفي المسافات ووحدي اسماء الاقسام وانواع التقييم وحالاته",
      "راجعي انواع البيانات والدرجات والتواريخ، وميزي بين الدرجة الصفرية والدرجة الناقصة",
      "طبقي Split وFill وConditional Columns في المكان المناسب، وراجعي خطوات التنظيف",
      "اختاري Close & Apply واعرضي البيانات في جدول وبطاقات وفلاتر، ثم احفظي التقرير"
    ],
    "challenge": "افتحي ملف التمرين CSV وطبقي مهارات التنظيف على البيانات الجديدة، سجلي الخطوات التي نفذتيها واي حالة تحتاج مراجعة، ثم احفظي ملف Power BI",
    "deliverable": "ملف Power BI محفوظ، فيه بيانات التطبيق بعد التنظيف وخطوات واضحة يمكن مراجعتها",
    "resources": [
      {
        "name": "ملف التطبيق — تقييم اداء الموظفين",
        "type": "CSV",
        "url": "week1/day2/data/Performance_KPI_30000_Dirty.csv",
        "note": "CSV · 30,450 صف من بيانات تدريبية افتراضية",
        "audience": "learner"
      },
      {
        "name": "ملف التمرين المستقل",
        "type": "CSV",
        "url": "week1/day2/data/Performance_Challenge_12000_Dirty.csv",
        "note": "CSV · 12,180 صف للتطبيق المستقل",
        "audience": "learner"
      }
    ],
    "requiredFiles": [],
    "teachingStatus": "prepared"
  },
  {
    "id": 3,
    "date": "2026-10-20",
    "weekday": "الثلاثاء",
    "ready": false,
    "phase": "AUTOMATE",
    "title": "Merge, Append, Folder Connector & Refresh",
    "titleAr": "دمج الملفات وتحديثها بدون نسخ ولصق",
    "hook": "كل فترة تصل ملفات تقييم جديدة، والنسخ اليدوي يعيد نفس الاخطاء",
    "mission": "نبني عملية تجميع وربط قابلة للتحديث مع مراجعة عدد الصفوف والمفاتيح",
    "topics": [
      "Merge / Join Types",
      "Append",
      "Folder Connector",
      "Combine Files",
      "Reference / Duplicate",
      "Refresh",
      "Schema Checks"
    ],
    "build": [
      "نراجع اي تنظيف لم يطبق فعليا في اليوم الثاني",
      "نفرق بين اضافة صفوف Append واضافة اعمدة Merge",
      "نجمع ملفات تقييم متوافقة من مجلد ونحتفظ باسم المصدر",
      "نربط قاموس الاقسام والاهداف ونفحص فريدية المفتاح قبل التوسيع",
      "نراجع عدد الصفوف قبل وبعد الربط لمنع تضاعف السجلات",
      "نضيف ملف فترة جديدة ونثبت ان Refresh يعمل"
    ],
    "challenge": "اضيفي ملفا جديدا وحدثي التقرير ثم اثبتي عدم تضاعف صفوف KPI",
    "deliverable": "عملية استيراد وتجميع وربط قابلة للتحديث",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 3",
        "type": "Plan",
        "note": "مخططة ولم تجهز، كل Dataset جديد سيكون 10000 صف على الاقل"
      }
    ],
    "teachingStatus": "planned"
  },
  {
    "id": 4,
    "date": "2026-10-22",
    "weekday": "الخميس",
    "ready": false,
    "phase": "MODEL",
    "title": "Data Modeling, Relationships & Star Schema",
    "titleAr": "نموذج بيانات صحيح وعلاقات واضحة",
    "hook": "جدول كبير بدون مستوى صف واضح قد يضاعف الاوزان ويخلط الموظف بالمقيم",
    "mission": "نصمم Fact EvaluationKPI مع ابعاد الموظفين والاهداف والتاريخ واتجاه التقييم",
    "topics": [
      "Fact / Dimension",
      "Grain / Keys",
      "Star Schema",
      "One-to-Many",
      "Single Direction",
      "Date Table",
      "Role-playing Dimensions"
    ],
    "build": [
      "نحدد مستوى كل جدول ومفتاحه",
      "نفصل جداول الوصف عن سجل KPI ونضع الوزن على مستوى الهدف المناسب",
      "نبني Date Table ونميز تاريخ التقييم عن Period",
      "نبني علاقات One-to-Many باتجاه واحد ونفحص المفاتيح اليتيمة",
      "نوضح دور الموظف المقيم ودور المقيم خاصة في Upward",
      "نختبر الفلاتر ونتجنب many-to-many غير المقصودة"
    ],
    "challenge": "اختبري فلاتر القسم والهدف والاتجاه دون تضاعف السجلات",
    "deliverable": "Star Schema موثق ومفاتيح وعلاقات قابلة للفحص",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 4",
        "type": "Plan",
        "note": "مخططة ولم تجهز، كل Dataset جديد سيكون 10000 صف على الاقل"
      }
    ],
    "teachingStatus": "planned"
  },
  {
    "id": 5,
    "date": "2026-10-25",
    "weekday": "الأحد",
    "ready": false,
    "phase": "MEASURE",
    "title": "DAX Fundamentals & Weighted Performance Calculation",
    "titleAr": "اساسيات DAX وحساب التقييم الموزون",
    "hook": "متوسط كل KPIs معا لا يطبق اوزان الاهداف وقد يخلط اتجاهات التقييم",
    "mission": "نتعلم Measures ونحسب متوسط KPI لكل هدف ثم مساهمته بالوزن مع منع اعتماد النتائج الناقصة",
    "topics": [
      "Measures vs Columns",
      "SUM / COUNTROWS",
      "DISTINCTCOUNT",
      "AVERAGE",
      "DIVIDE",
      "Iterators: AVERAGEX / SUMX",
      "BLANK / Completeness",
      "Weighted Objectives"
    ],
    "build": [
      "نكتب مقاييس عدد السجلات والموظفين والدرجات المتاحة",
      "نقارن Measure بCalculated Column",
      "نحسب الهدف لموظف ومقيم وفترة واتجاه محدد",
      "نتحقق من اكتمال KPIs ونتعامل مع BLANK دون تحويله لصفر",
      "نطبق وزن الهدف مرة واحدة ونحسب نتيجة التقييم المكتمل",
      "نطابق مثالا يدويا ونعرض النتائج منفصلة لكل اتجاه"
    ],
    "challenge": "احسبي مثال هدف بدرجتي 60 و80 ووزن 30 ثم فسري غياب درجة",
    "deliverable": "Measures اساسية ونتيجة موزونة مشروطة بالاكتمال",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 5",
        "type": "Plan",
        "note": "مخططة ولم تجهز، كل Dataset جديد سيكون 10000 صف على الاقل"
      }
    ],
    "teachingStatus": "planned"
  },
  {
    "id": 6,
    "date": "2026-10-27",
    "weekday": "الثلاثاء",
    "ready": false,
    "phase": "CONTEXT",
    "title": "Advanced DAX, CALCULATE & Filter Context",
    "titleAr": "نفهم سياق الفلاتر ونكتب DAX اقوى",
    "hook": "القياس يتغير حسب الفلاتر والتجميع ويحتاج تفسيرا واضحا",
    "mission": "نفهم CALCULATE والسياق ونبني مقارنات ومقاييس تحافظ على تعريف التقييم",
    "topics": [
      "Filter Context",
      "CALCULATE",
      "FILTER",
      "REMOVEFILTERS",
      "ALLSELECTED Overview",
      "Variables",
      "Iterators",
      "Totals Validation"
    ],
    "build": [
      "نتتبع قياسا داخل Card وMatrix وفلاتر مختلفة",
      "نستخدم VAR وCALCULATE لتغيير السياق بشكل مقصود",
      "نقارن النتيجة بمتوسط القسم مع تحديد الفلاتر التي تزال",
      "نبني نسبة اكتمال ضمن نفس الفترة والاتجاه",
      "نراجع Total ومنع متوسط متوسطات غير متكافئة",
      "نختبر سيناريوهات Missing وMulti-select"
    ],
    "challenge": "فسري لماذا تغير القياس مع Slicer وحددي الفلتر الذي اثر عليه",
    "deliverable": "مقاييس بسياق واضح مع فحوص للتجميع والنتائج",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 6",
        "type": "Plan",
        "note": "مخططة ولم تجهز، كل Dataset جديد سيكون 10000 صف على الاقل"
      }
    ],
    "teachingStatus": "planned"
  },
  {
    "id": 7,
    "date": "2026-10-29",
    "weekday": "الخميس",
    "ready": false,
    "phase": "COMPARE",
    "title": "Date Intelligence, Comparisons & Advanced Analysis",
    "titleAr": "مقارنات زمنية وتحليل اعمق",
    "hook": "مقارنة فترتين باتجاهات او نسب اكتمال مختلفة قد تضلل القرار",
    "mission": "نبني مقارنات عادلة للفترات مع جدول تاريخ وتوضيح التغطية",
    "topics": [
      "Date Intelligence",
      "Date Table",
      "Previous Period",
      "DATEADD / SAMEPERIODLASTYEAR",
      "MoM / YoY",
      "Percentage Points",
      "Missing Periods",
      "Ranking / Top N"
    ],
    "build": [
      "نراجع جدول التاريخ وعلاقته وتغطية الفترات",
      "نطبق مقارنة زمنية على تاريخ مناسب وبفترات قابلة للمقارنة",
      "نقارن نتائج كل اتجاه بشكل مستقل",
      "نميز تغير النسبة عن النقاط المئوية",
      "نمنع المقارنة عند غياب الفترة المرجعية ونوضح الاكتمال",
      "نستكشف الاقسام والاهداف التي تحتاج متابعة دون اختراع اسباب"
    ],
    "challenge": "قدمي مقارنة بين فترتين مع تفسير اثر التغطية والفترة الناقصة",
    "deliverable": "صفحة مقارنات زمنية مع تعريفات وفحوص واضحة",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 7",
        "type": "Plan",
        "note": "مخططة ولم تجهز، كل Dataset جديد سيكون 10000 صف على الاقل"
      }
    ],
    "teachingStatus": "planned"
  },
  {
    "id": 8,
    "date": "2026-11-01",
    "weekday": "الأحد",
    "ready": false,
    "phase": "DESIGN",
    "title": "Professional Dashboard Design & Interactions",
    "titleAr": "داشبورد واضح وتفاعل عملي",
    "hook": "كثرة الرسوم لا تضمن ان القارئ يصل للاجابة بسرعة",
    "mission": "نصمم ملخصا اداريا وتفاصيل قابلة للاستكشاف باستخدام هوية واضحة",
    "topics": [
      "Visual Hierarchy",
      "Chart Selection",
      "Conditional Formatting",
      "Drillthrough",
      "Report Page Tooltips",
      "Bookmarks / Buttons",
      "Edit Interactions",
      "Mobile Layout"
    ],
    "build": [
      "نحدد اسئلة المستخدم وترتيب البطاقات",
      "نبني ملخصا يفصل الاتجاهات والاكتمال عن نتائج الاداء",
      "نضيف Drillthrough لتفاصيل موظف او قسم مناسب للصلاحيات",
      "نبني Tooltip وBookmark وازرار مع اختبار تفاعلها",
      "نراجع الالوان والوضوح وMobile Layout",
      "نختبر رحلة القارئ من السؤال الى التفاصيل"
    ],
    "challenge": "انتقلي من قسم الى تفاصيله ثم عودي مع الحفاظ على الفلاتر المقصودة",
    "deliverable": "تقرير تفاعلي منظم على Desktop وMobile",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 8",
        "type": "Plan",
        "note": "مخططة ولم تجهز، كل Dataset جديد سيكون 10000 صف على الاقل"
      }
    ],
    "teachingStatus": "planned"
  },
  {
    "id": 9,
    "date": "2026-11-03",
    "weekday": "الثلاثاء",
    "ready": false,
    "phase": "PUBLISH",
    "title": "Power BI Service, Refresh, Security, RLS & Performance",
    "titleAr": "النشر والتحديث والصلاحيات والاداء",
    "hook": "تقرير Desktop لا يصبح حلا تشغيليا قبل وضوح النشر والتحديث والوصول",
    "mission": "نفهم دورة النشر والادارة ونطبق حسب الحساب والصلاحيات المتاحة",
    "topics": [
      "Power BI Service",
      "Workspaces / Apps",
      "Publishing / Sharing",
      "Semantic Model",
      "Scheduled Refresh / Gateway",
      "Credentials",
      "RLS / View As",
      "Performance Analyzer"
    ],
    "build": [
      "نوضح متطلبات الحساب والترخيص وسياسة المؤسسة قبل النشر",
      "ننشر مثالا افتراضيا فقط اذا توفرت البيئة المناسبة",
      "نراجع Refresh وCredentials وGateway لمصدر محلي",
      "نبني Role ونختبر View As في Desktop ثم نفهم عضوية Service",
      "نوضح ان اخفاء الصفحة لا يمثل حماية بيانات",
      "نستخدم Performance Analyzer ونراجع اخطاء التحديث ونبني قائمة تشغيل"
    ],
    "challenge": "اختبري دور قسم مختلف وقدمي خطة تحديث وصلاحيات قابلة للتنفيذ",
    "deliverable": "تجربة نشر عند توفر الحساب ودليل تحديث وRLS واختبار اداء",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 9",
        "type": "Plan",
        "note": "مخططة ولم تجهز، كل Dataset جديد سيكون 10000 صف على الاقل"
      }
    ],
    "teachingStatus": "planned"
  },
  {
    "id": 10,
    "date": "2026-11-05",
    "weekday": "الخميس",
    "ready": false,
    "phase": "DELIVER",
    "title": "Final End-to-End Project, Validation & Presentation",
    "titleAr": "مشروع كامل باستقلالية وتحقق وعرض",
    "hook": "القيمة تظهر عندما تستلمين ملفا جديدا وتنفذين العمل دون مساعدة خطوة بخطوة",
    "mission": "تنفيذ Get Data ثم Query ثم Model ثم DAX ثم Report ثم Validation وعرض النتائج",
    "topics": [
      "End-to-End Project",
      "Refresh / Reconciliation",
      "Model Checks",
      "Measure Validation",
      "UX / Security Checks",
      "Presentation",
      "Handover"
    ],
    "build": [
      "استيراد بيانات تقييم افتراضية جديدة وتنظيفها",
      "تحديث النموذج والعلاقات والتحقق من المفاتيح",
      "حساب الاهداف والاوزان والاكتمال لكل اتجاه بشكل مستقل",
      "بناء او اكمال الملخص والتفاصيل والتفاعل",
      "مطابقة ارقام مختارة وفحص الصلاحيات والتحديث",
      "عرض النتائج وحدودها وتسليم دليل تشغيل وخطة تعمق لاحقة"
    ],
    "challenge": "نفذي التحديث وقدمي 3 استنتاجات مدعومة وفحصا رقميا وخطوة متابعة",
    "deliverable": "مشروع Power BI متكامل وتقرير تحقق ودليل تشغيل مختصر",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 10",
        "type": "Plan",
        "note": "مخططة ولم تجهز، كل Dataset جديد سيكون 10000 صف على الاقل"
      }
    ],
    "teachingStatus": "planned"
  }
];

function getDay(id) {
  return DAYS.find(day => day.id === Number(id)) || null;
}

function formatDateAr(dateString) {
  if (!dateString) return `الموعد لم يحدد بعد`;
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return `الموعد لم يحدد بعد`;
  return new Intl.DateTimeFormat(`ar-JO`, { day: `numeric`, month: `long`, year: `numeric` }).format(date);
}

function dayRuntimeStatus(day, now = new Date()) {
  if (!day.ready) return `planned`;
  if (!day.date) return `upcoming`;
  const target = new Date(`${day.date}T00:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (target.getTime() === today.getTime()) return `today`;
  if (target < today) return `past`;
  return `upcoming`;
}

function dayScheduleLabel(day) {
  return day.weekday && day.date ? `${day.weekday} • ${formatDateAr(day.date)}` : formatDateAr(day.date);
}

function getCompletedDays() {
  try {
    const saved = JSON.parse(localStorage.getItem(COURSE_CONFIG.storage.completed) || `[]`);
    return Array.isArray(saved) ? [...new Set(saved)].filter(id => DAYS.some(day => day.id === id && day.ready)) : [];
  } catch {
    return [];
  }
}



// Learner surfaces use this allowlist; instructor guides and answers belong in Trainer.
function getLearnerResources(day) {
  return (day.resources || []).filter(resource => resource.audience !== `trainer` && (day.id === 1 || /\.csv(?:[?#]|$)/i.test(resource.url || ``)));
}
