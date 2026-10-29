// Course223 — Days 1–4 preserved. Day 5 actual taught content (Oct 26). Days 6–10 revised plan, not ready.
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
        note: `لقطة واحدة لبيانات الموظفين`
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
        "note": "CSV · 30,450 صف للتطبيق",
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
  "ready": true,
  "phase": "AUTOMATE",
  "title": "Power Query — Append, Merge, Folder & Refresh",
  "titleAr": "من ملفات تقييم متفرقة الى تحديث تلقائي",
  "hook": "كل فترة بيوصلك ملف تقييم جديد، بدنا ننظفه ونجمعه مع الفترات السابقة ونضيف معلومات الموظفين بدون نسخ ولصق كل مرة",
  "mission": "نراجع التنظيف، نجمع الصفوف باستخدام Append، نربط بيانات الموظفين باستخدام Merge، ونبني مصدر Folder يتحدث عند اضافة ملف جديد",
  "topics": [
    "Cleaning Review",
    "Append Queries as New",
    "Merge / Left Outer",
    "Left Anti",
    "Key Uniqueness",
    "Folder / Combine Files",
    "Transform Sample File",
    "Source.Name",
    "Refresh",
    "Reference / Duplicate"
  ],
  "build": [
    "جهزي المجلدات ونزلي ملفات التطبيق ودليل الموظفين، وخلي ملف التحديث خارج Sources بالبداية",
    "نظفي المسافات والمسميات والدرجات والتواريخ، واحذفي النسخ المتطابقة بالكامل",
    "اجمعي يوليو واغسطس باستخدام Append Queries as New وراجعي الاعمدة والصفوف",
    "نظفي مفتاح دليل الموظفين واربطي EmployeeID باستخدام Left Outer، ثم افحصي الصفوف غير المتطابقة",
    "اجمعي المصادر من Folder وطبقي التنظيف داخل Transform Sample File، واحتفظي باسم الملف",
    "اربطي الناتج بدليل الموظفين، ثم انقلي سبتمبر الى Sources واعملي Refresh واحفظي التقرير"
  ],
  "challenge": "استخدمي Practice_Apr وPractice_May مع نفس دليل الموظفين، ابداي بابريل فقط داخل مجلد المصادر، ثم اضيفي مايو وقت التحديث وتاكدي من وصول صفوفه بدون فقد او تضاعف",
  "deliverable": "ملف Power BI محفوظ، فيه Fact_Evaluations قابل للتحديث وخطوات تنظيف واضحة وربط موظفين مع الاحتفاظ بالسجلات التي تحتاج مراجعة",
  "resources": [
    {
      "name": "التطبيق 1 — تقييمات يوليو",
      "type": "CSV",
      "url": "week1/day3/data/Evaluations_Jul.csv",
      "note": "12,120 صف · ضعيه في Day03/Sources",
      "audience": "learner",
      "stage": "application"
    },
    {
      "name": "التطبيق 2 — تقييمات اغسطس",
      "type": "CSV",
      "url": "week1/day3/data/Evaluations_Aug.csv",
      "note": "12,120 صف · ضعيه في Day03/Sources",
      "audience": "learner",
      "stage": "application"
    },
    {
      "name": "دليل الموظفين",
      "type": "CSV",
      "url": "week1/day3/data/Employees.csv",
      "note": "10,000 صف · ضعيه في Day03/Reference",
      "audience": "learner",
      "stage": "application"
    },
    {
      "name": "ملف التحديث — تقييمات سبتمبر",
      "type": "CSV",
      "url": "week1/day3/data/Evaluations_Sep.csv",
      "note": "12,120 صف · خليه في Day03/Refresh_Later لحد خطوة التحديث",
      "audience": "learner",
      "stage": "application"
    },
    {
      "name": "التمرين المستقل 1 — ابريل",
      "type": "CSV",
      "url": "week1/day3/data/Practice_Apr.csv",
      "note": "12,120 صف · ضعيه في Day03/Practice/Sources",
      "audience": "learner",
      "stage": "practice"
    },
    {
      "name": "التمرين المستقل 2 — مايو",
      "type": "CSV",
      "url": "week1/day3/data/Practice_May.csv",
      "note": "12,120 صف · خليه في Day03/Practice/Refresh_Later لحد التحديث",
      "audience": "learner",
      "stage": "practice"
    }
  ],
  "requiredFiles": [],
  "teachingStatus": "prepared",
  "learningSections": [
    {
      "name": "نجهز الملفات",
      "title": "ملفات مرتبة، بداية اسهل",
      "lead": "اليوم بنكمل على مهارات التنظيف، وبنحول ملفات التقييم الى مسار بنقدر نحدثه كل فترة",
      "steps": [
        {
          "title": "جهزي مجلداتك",
          "copy": "اعملي مجلد Day03، وداخله Sources وReference وRefresh_Later"
        },
        {
          "title": "وزعي الملفات",
          "copy": "يوليو واغسطس داخل Sources، ودليل الموظفين داخل Reference، وسبتمبر داخل Refresh_Later لحد ما نوصل للتحديث"
        }
      ],
      "callout": "Sources بالبداية فيه يوليو واغسطس فقط، دليل الموظفين وملف سبتمبر يضلوا برا هذا المجلد",
      "files": "application"
    },
    {
      "name": "نراجع التنظيف",
      "title": "نثبت مهارات التنظيف",
      "lead": "افتحي Evaluations_Jul.csv من Get Data ثم Text/CSV واختاري Transform Data",
      "steps": [
        {
          "title": "ابدئي بالنصوص",
          "copy": "اذا انضاف Changed Type تلقائيا قبل التنظيف احذفي هاي الخطوة، خلي الاعمدة Text، وراجعي Column Quality وColumn Profile على كامل البيانات"
        },
        {
          "title": "نظفي ووحدي القيم",
          "copy": "استبدلي المسافة بين [ ] بمسافة عادية، ثم Clean وTrim، وحدي EvaluationType وStatus باستخدام Capitalize Each Word، واستبدلي HR بـHuman Resources في Department"
        },
        {
          "title": "راجعي الانواع والنسخ",
          "copy": "في Score استبدلي pts بفراغ واعملي Trim، ثم خلي Score وObjectiveWeight ارقام صحيحة، وحولي EvaluationDate الى Date باستخدام English (United Kingdom)، وخلي Period نص"
        },
        {
          "title": "احذفي النسخ المطابقة فقط",
          "copy": "حددي كل الاعمدة واستخدمي Remove Duplicates، ما تحذفي تكرار EmployeeID، واحتفظي بالدرجات الفارغة والصفر الصحيح"
        },
        {
          "title": "طبقي الخطوات على اغسطس",
          "copy": "سمي الاستعلام Jul_Clean، اعملي Duplicate وسمي النسخة Aug_Clean، ومن ترس Source اختاري Evaluations_Aug.csv"
        }
      ],
      "callout": "كل صف يمثل KPI واحد لموظف خلال فترة واتجاه تقييم محددين، تكرار الموظف طبيعي"
    },
    {
      "name": "Append",
      "title": "نجمع الصفوف تحت بعض",
      "lead": "يوليو واغسطس بنفس البنية، نحتاج جدول واحد يحتوي الفترتين",
      "steps": [
        {
          "title": "قارني اسماء الاعمدة",
          "copy": "تاكدي ان اسماء الاعمدة وانواعها متوافقة، Append يعتمد على الاسم وليس ترتيب العمود"
        },
        {
          "title": "اعملي استعلام جديد",
          "copy": "Home → Append Queries as New، اختاري Jul_Clean وAug_Clean وسمي الناتج Append_JulAug"
        },
        {
          "title": "تاكدي من اكتمال التجميع",
          "copy": "راجعي الفترتين والاعمدة، وقارني عدد الناتج بمجموع صفوف الاستعلامين بعد التنظيف"
        }
      ],
      "callout": "وجود اتجاهات التقييم بجدول واحد لا يعني حساب متوسط يجمع Self وManager وUpward"
    },
    {
      "name": "Merge",
      "title": "نضيف معلومات الموظف جنب التقييم",
      "lead": "التقييم فيه EmployeeID، ودليل الموظفين فيه الاسم والقسم والموقع، بنربطهم باستخدام نفس المفتاح",
      "steps": [
        {
          "title": "جهزي Employees",
          "copy": "استوردي Employees.csv ونظفي EmployeeID وDepartment بنفس القواعد، وراجعي ان مفتاح الموظف فريد ونوعه Text"
        },
        {
          "title": "اربطي الجدولين",
          "copy": "Home → Merge Queries as New، اختاري Append_JulAug ثم Employees وحددي EmployeeID بالاثنين، واختاري Left Outer"
        },
        {
          "title": "وسعي الاعمدة المطلوبة",
          "copy": "اختاري EmployeeName وDepartment وLocation من الجدول المرجعي، خلي Prefix مفعلا ثم سمي الاعمدة EmployeeName وEmployeeDepartment وLocation"
        },
        {
          "title": "راجعي اللي ما ارتبط",
          "copy": "قارني عدد الصفوف قبل التوسيع وبعده، وافحصي الاسم الفارغ، ولعرض السجلات غير المتطابقة فقط جربي Left Anti في استعلام مراجعة"
        }
      ],
      "callout": "الصف غير المتطابق يضل موجود للمراجعة، وزيادة عدد الصفوف بعد Expand تحتاج فحص المفتاح المرجعي"
    },
    {
      "name": "Folder وRefresh",
      "title": "تنظيف مرة، وتحديث كل فترة",
      "lead": "بنستبدل اختيار كل ملف يدويا بمصدر Folder، ونطبق قواعد التنظيف على كل ملف",
      "steps": [
        {
          "title": "اربطي Sources",
          "copy": "Get Data → Folder، اختاري Day03/Sources ثم Transform Data، راجعي قائمة الملفات وفلتر CSV قبل Combine Files"
        },
        {
          "title": "عدلي ملف العينة",
          "copy": "اختاري Transform Sample File وطبقي نفس قواعد التنظيف السابقة، بما فيها ازالة النسخ المتطابقة داخل كل ملف، وراجعي اي Changed Type تلقائي يسبق التنظيف"
        },
        {
          "title": "جهزي الجدول النهائي",
          "copy": "سمي الناتج Evaluations_Folder واحتفظي بـSource.Name، اربطيه مع Employees بنفس Left Outer وسمي الناتج Fact_Evaluations، وعطلي Enable Load لاستعلامات التطبيق الوسيطة"
        },
        {
          "title": "ضيفي سبتمبر وحدثي",
          "copy": "انقلي Evaluations_Sep.csv من Refresh_Later الى Sources، ثم حدثي المصدر والتقرير، وتاكدي من ظهور الملف والفترة الجديدة وتطبيق التنظيف عليها"
        }
      ],
      "callout": "Append_JulAug وEvaluations_Folder بديلان لتجميع نفس البيانات، ما بنعمل Append بينهم"
    },
    {
      "name": "تطبيق مستقل",
      "title": "هلا دورك تقودي المسار",
      "lead": "طبقي نفس الفكرة على ملفي التمرين، مع نفس دليل الموظفين",
      "steps": [
        {
          "title": "جهزي مصدر التمرين",
          "copy": "اعملي Day03/Practice/Sources وDay03/Practice/Refresh_Later، ابريل داخل Sources ومايو خارجه بالبداية"
        },
        {
          "title": "اعيدي استخدام قواعدك",
          "copy": "اعملي Duplicate لاستعلام المجلد وغيري Source لمجلد التمرين، راجعي التنظيف واربطيه مع Employees، ثم انقلي مايو واعملي Refresh"
        },
        {
          "title": "راجعي واحفظي",
          "copy": "تاكدي ان الفترة الجديدة وصلت وان الربط ما ضاعف الصفوف، واحفظي الملف واشرحي الفرق بين Append وMerge وفائدة Folder"
        }
      ],
      "callout": "احفظي ملفك باسم Day03_Performance.pbix، وخلي ملاحظاتك عن اي حالة تحتاج مراجعة",
      "files": "practice"
    }
  ]
},
  {
    "id": 4,
    "date": "2026-10-22",
    "weekday": "الخميس",
    "ready": true,
    "phase": "MODEL",
    "title": "HR Performance Intelligence — Data Model Foundation",
    "titleAr": "اليوم الرابع | نبني نموذج بيانات مشروع الاداء",
    "hook": "تخيلي موظف عنده 4 اهداف، وكل هدف تحته 3 مؤشرات KPI، وكل مؤشر اله اكثر من تقييم. كيف نربط كل هاي الملفات بدون ما نكرر الدرجات او نضاعف الاوزان؟",
    "mission": "اليوم رح نبدأ مشروع HR Performance Intelligence اللي رح نطوره لغاية اليوم العاشر. رح نربط الموظفين والاهداف ومؤشرات الاداء والتقييمات بطريقة صحيحة، ونجهز قاعدة قوية للحسابات والتقارير القادمة.",
    "topics": [
      "Data Model",
      "Fact & Dimension",
      "Grain / Primary Key",
      "One-to-Many Relationships",
      "Filter Direction",
      "Calendar Table",
      "Reference & Group By",
      "Model Validation"
    ],
    "build": [
      "نزلي ملف المشروع المضغوط وفكيه، ثم استوردي ملفات CSV الثمانية داخل Power BI باستخدام Transform Data",
      "حددي معنى كل صف في كل جدول، وتأكدي من نوع المفاتيح والتواريخ والارقام",
      "ابني العلاقات بين Directorates وDepartments وEmployees وObjectives وKPIs والتقييمات",
      "اربطي StrategicPriorities بالاهداف، ثم Calendar بتاريخ التقييم",
      "راجعي Cardinality واتجاه الفلاتر حتى ما تتكرر النتائج بشكل غير صحيح",
      "رح نحل مشكلة مفاجئة في مجموع اوزان الاهداف باستخدام Reference وGroup By",
      "اعملي Matrix وSlicers واختبري العلاقات، ثم احفظي مشروع Power BI اللي رح نكمله في الجلسات القادمة"
    ],
    "challenge": "اعملي Matrix يعرض عدد سجلات التقييم حسب Directorate وDepartment. اضيفي Slicers لـ AssessmentSource وQuarterLabel، وفسري كيف ممكن تكرار وزن الهدف مع كل KPI يعطي نتيجة غلط.",
    "deliverable": "ملف HR_Performance_Intelligence.pbix يحتوي نموذج بيانات مترابط، و7 علاقات صحيحة، وصفحة بسيطة للتحقق من الفلاتر.",
    "resources": [
      {
        "name": "Day04_Project_Starter.zip",
        "type": "ZIP",
        "url": "week1/day4/data/Day04_Project_Starter.zip",
        "note": "تحميل واحد يحتوي 8 ملفات CSV مترابطة لبداية المشروع",
        "stage": "starter",
        "audience": "learner"
      }
    ],
    "learningScenes": [
      [
        "المشروع",
        "البداية"
      ],
      [
        "البيانات",
        "التفاصيل"
      ],
      [
        "المفاتيح",
        "الانواع"
      ],
      [
        "العلاقات",
        "الترابط"
      ],
      [
        "التاريخ",
        "الفلاتر"
      ],
      [
        "الاوزان",
        "التحقق"
      ],
      [
        "التجربة",
        "الحفظ"
      ]
    ],
    "learningSections": [
      {
        "name": "نبدأ المشروع",
        "title": "مشروع واحد من اليوم الرابع للعاشر",
        "lead": "اليوم رح نبدأ فعليا ببناء Dashboard لتحليل اداء الموظفين. كل جزء بنعمله رح نستخدمه في الجلسات الجاي، وما رح نعيد المشروع من البداية.",
        "files": "starter",
        "steps": [
          {
            "title": "نزلي ملف اليوم",
            "copy": "نزلي Day04_Project_Starter.zip وفكي الضغط. رح تلاقي ملفات CSV مترابطة داخل مجلدين. خلي المجلدات في مكان ثابت على جهازك."
          },
          {
            "title": "افتحي مشروع Power BI",
            "copy": "افتحي Power BI Desktop، واعملي تقرير جديد واحفظيه من البداية باسم HR_Performance_Intelligence.pbix."
          },
          {
            "title": "فكري معنا",
            "copy": "كيف ممكن يكون الموظف موجود مرة واحدة في Employees، لكن يظهر في اكثر من Objective، وكل Objective له عدة KPIs؟"
          }
        ],
        "callout": "احتفظي بنفس ملف PBIX؛ رح نكمل عليه في الايام 5–10."
      },
      {
        "name": "نفهم البيانات",
        "title": "كل صف شو بيمثل؟",
        "lead": "قبل ما نربط الجداول، لازم نعرف مستوى التفاصيل (Grain) لكل جدول. هاي الخطوة بتحمينا من تكرار النتائج.",
        "steps": [
          {
            "title": "Employees",
            "copy": "كل صف يمثل موظف واحد، وله EmployeeID يميزه عن باقي الموظفين."
          },
          {
            "title": "Objectives",
            "copy": "كل صف يمثل هدف واحد لموظف في سنة محددة. وزن الهدف ObjectiveWeightPct موجود هون، مش في جدول التقييمات."
          },
          {
            "title": "KPIs",
            "copy": "كل صف يمثل مؤشر اداء تابع لهدف محدد. ممكن يكون للهدف اكثر من KPI، وما في وزن مستقل لكل KPI."
          },
          {
            "title": "EvaluationScores",
            "copy": "كل صف يمثل درجة تقييم KPI في فترة معينة ومن مصدر تقييم محدد: Self او Manager او Upward. لازم نظل نفصل هاي المصادر."
          }
        ],
        "callout": "اذا جمعنا وزن الهدف بعد تكراره مع كل KPI، رح نحصل على مجموع اوزان غير صحيح."
      },
      {
        "name": "نستورد الملفات",
        "title": "ثمانية ملفات، ونوع بيانات صحيح",
        "lead": "رح نستورد ملفات المشروع كجداول منفصلة داخل Power Query، ونراجع انواع الاعمدة قبل بناء العلاقات.",
        "steps": [
          {
            "title": "استوردي ملفات CSV",
            "copy": "من Home → Get Data → Text/CSV اختاري كل ملف ثم Transform Data. كرري العملية لجداول Directorates وDepartments وEmployees وStrategicPriorities وObjectives وKPIs وCalendar وEvaluationScores_2026_H1."
          },
          {
            "title": "المفاتيح لازم تكون Text",
            "copy": "راجعي اعمدة ID وخلي نوعها Text. مثلا EMP0001 هو رقم تعريفي للموظف، مش رقم مطلوب منا نجمعه."
          },
          {
            "title": "صححي التواريخ والدرجات",
            "copy": "خلي Calendar[Date] وAssessmentDate من نوع Date. وراجعي ObjectiveWeightPct وKPIScore حتى يكونوا ارقام مش نصوص."
          },
          {
            "title": "حملي الجداول",
            "copy": "اضغطي Close & Apply، وتأكدي ان الجداول الثمانية ظهرت في قائمة Data داخل Power BI."
          }
        ],
        "callout": "نوع البيانات الصحيح والمفتاح الواضح هما بداية نموذج موثوق."
      },
      {
        "name": "نبني العلاقات",
        "title": "كيف بنربط One مع Many؟",
        "lead": "بدنا نعمل مسار واضح يخلي فلتر الادارة او القسم يوصل لسجلات تقييم الموظفين بدون ازدواجية.",
        "steps": [
          {
            "title": "تسلسل الادارات والموظفين",
            "copy": "في Model View اربطي Directorates[DirectorateID] مع Departments[DirectorateID]، وبعدها Departments[DepartmentID] مع Employees[DepartmentID]."
          },
          {
            "title": "تسلسل الاهداف والتقييمات",
            "copy": "اربطي Employees[EmployeeID] مع Objectives[EmployeeID]، وبعدها Objectives[ObjectiveID] مع KPIs[ObjectiveID]، ثم KPIs[KPIID] مع EvaluationScores_2026_H1[KPIID]."
          },
          {
            "title": "الاولويات الاستراتيجية",
            "copy": "اربطي StrategicPriorities[StrategicPriorityID] مع Objectives[StrategicPriorityID]."
          },
          {
            "title": "راجعي خصائص العلاقات",
            "copy": "افتحي كل علاقة وتأكدي ان Cardinality هي One-to-Many (1:*)، وان Cross-filter direction هي Single، والعلاقة Active. اذا ظهر Many-to-Many، راجعي المفاتيح قبل الموافقة."
          }
        ],
        "callout": "النموذج الحالي فيه سلسلة جداول وصفية مترابطة (Snowflake). المهم نفهم ليش العلاقات صحيحة قبل ما نحولها لاحقا الى تصميم اكثر تنظيما."
      },
      {
        "name": "نضيف التاريخ",
        "title": "Calendar بربط كل فترة مع تقييماتها",
        "lead": "وجود جدول تاريخ مستقل رح يساعدنا في تحليل تطور الاداء شهريا وربع سنويا في الجلسات القادمة.",
        "steps": [
          {
            "title": "اربطي تاريخ التقييم",
            "copy": "اربطي Calendar[Date] من جهة One مع EvaluationScores_2026_H1[AssessmentDate] من جهة Many."
          },
          {
            "title": "حددي جدول التاريخ",
            "copy": "اختاري Calendar، ثم Table tools → Mark as date table، وحددي عمود Date."
          },
          {
            "title": "انتبهي لدور الموظف والمقيم",
            "copy": "EmployeeID يمثل صاحب الهدف، بينما EvaluatorID يمثل الشخص الذي اجرى التقييم. لا تعملي علاقة اضافية ممكن تسبب مسار فلترة ملتبس."
          },
          {
            "title": "جربي الفلاتر",
            "copy": "اعملي Slicer من Calendar[QuarterLabel]، وجربي فلتر AssessmentSource من جدول التقييمات. راقبي كيف يتغير عدد السجلات."
          }
        ],
        "callout": "تاريخ التقييم AssessmentDate مختلف عن تاريخ استحقاق الهدف DueDate؛ كل واحد اله معنى مختلف."
      },
      {
        "name": "نكتشف مشكلة",
        "title": "ليش مجموع الاوزان طلع غلط؟",
        "lead": "تخيلي مدير لاحظ ان مجموع اوزان اهداف بعض الموظفين صار اعلى بكثير من المتوقع. بدنا نكتشف السبب من شكل البيانات.",
        "steps": [
          {
            "title": "اعملي Reference",
            "copy": "افتحي Power Query، واضغطي بزر الفأرة اليمين على Objectives ثم Reference. سمي الاستعلام الجديد Objective_Weight_Audit."
          },
          {
            "title": "اجمعي الاوزان بالمستوى الصحيح",
            "copy": "في الاستعلام الجديد استخدمي Group By حسب EmployeeID وPlanYear، واجمعي ObjectiveWeightPct في عمود اسمه TotalObjectiveWeight."
          },
          {
            "title": "قارني مع KPIs",
            "copy": "لاحظي ان كل Objective ممكن يظهر تحته عدة KPIs. لو كررنا الوزن مع كل KPI وجمعناه، رح تتضاعف قيمة الوزن بشكل غير صحيح."
          },
          {
            "title": "خلي النموذج مرتب",
            "copy": "استعملي الاستعلام للتأكد من النتيجة، وبعدها عطلي Enable Load لاستعلام التدقيق اذا ما بدك يظهر كجدول مستقل في التقرير."
          }
        ],
        "callout": "الاوزان تخص Objectives فقط. حساب النتيجة الموزونة باستخدام DAX رح يكون في اليوم الخامس."
      },
      {
        "name": "التطبيق المستقل",
        "title": "اختبري العلاقات واحفظي مشروعك",
        "lead": "هسا دورك تتأكدي ان النموذج بشتغل فعلا، مش بس انه خطوط العلاقات ظاهرة في Model View.",
        "steps": [
          {
            "title": "اعملي Matrix",
            "copy": "اعملي Matrix وحطي DirectorateName ثم DepartmentName في Rows، واختاري Count of AssessmentID في Values من دون كتابة DAX Measure جديد."
          },
          {
            "title": "اضيفي Slicers",
            "copy": "اعملي Slicer لـ AssessmentSource، والثاني لـ Calendar[QuarterLabel]. جربي اختيارات مختلفة وتابعي تغير عدد التقييمات."
          },
          {
            "title": "جاوبي على السؤال",
            "copy": "ليش ممكن يختلف عدد سجلات Upward عن Self؟ وليش ما بصير ناخد متوسط المصادر الثلاثة مع بعض بدون قاعدة واضحة؟"
          },
          {
            "title": "احفظي النتيجة",
            "copy": "احفظي HR_Performance_Intelligence.pbix، ولا تغيري مكان ملفات CSV بعد الربط. رح نبدأ عليه مباشرة في اليوم الخامس."
          }
        ],
        "callout": "الهدف النهائي اليوم: نموذج صحيح، مفاتيح وعلاقات واضحة، فلاتر شغالة، وملف PBIX محفوظ."
      }
    ],
    "teachingStatus": "prepared"
  },
  {
    "id": 5,
    "date": "2026-10-26",
    "weekday": "الإثنين",
    "ready": true,
    "phase": "MEASURE",
    "title": "DAX Essentials, Change Source & Report Interactions",
    "titleAr": "جلسة التطبيق — تغيير المصدر وMeasures وتفاعل الفلاتر",
    "hook": "اليوم وسعنا تقريرنا العملي: غيرنا مصدر الملفات، أضفنا صفحة ثانية وخمسة فلاتر، وكتبنا Measures تفصل تقييم Manager عن Self",
    "mission": "مراجعة التطبيق الفعلي للجلسة الخامسة: تغيير المصدر، صفحة جديدة، Count وDistinct Count، خمسة Slicers، Edit Interactions ومتوسطات Manager وSelf",
    "topics": [
      "Change Source",
      "New Report Page",
      "COUNTROWS",
      "DISTINCTCOUNT",
      "5 Slicers",
      "Edit Interactions",
      "CALCULATE",
      "AVERAGE",
      "Manager vs Self"
    ],
    "build": [
      "تغيير مصدر الملفات للمسار الصحيح ومراجعة أن البيانات اتصلت بشكل طبيعي",
      "إنشاء صفحة ثانية داخل نفس تقرير Power BI",
      "كتابة Assessment Count باستخدام COUNTROWS وEmployee Count باستخدام DISTINCTCOUNT",
      "إضافة خمسة Slicers للتحكم بعرض التقرير",
      "استخدام Edit Interactions لتحديد أثر كل فلتر على الرسومات",
      "إنشاء Manager KPI Average وSelf KPI Average باستخدام CALCULATE وAVERAGE",
      "حفظ نفس مشروع Power BI حتى نكمل عليه في اليوم السادس"
    ],
    "challenge": "ارجعي للصفحة الثانية، اختبري فلاترها وتأثيراتها، وقارني نتيجتي Manager وSelf بدون دمجهما في Measure واحدة",
    "deliverable": "مشروع Power BI محدث بمصدر صحيح، صفحتين، خمسة Slicers، تفاعلات مضبوطة وأربع Measures تم تطبيقها",
    "resources": [
      {
        "name": "ملف المشروع من اليوم الرابع — نسخة احتياطية",
        "type": "PBIX",
        "url": "week1/day5/data/HR_Performance_Intelligence_Day04_Backup.pbix",
        "note": "ملف PBIX محفوظ مع ملفات الدورة على GitHub، للرجوع إلى نقطة نهاية اليوم الرابع",
        "audience": "learner",
        "stage": "backup"
      },
      {
        "name": "ملفات بيانات المشروع — 8 ملفات CSV",
        "type": "ZIP",
        "url": "week1/day4/data/Day04_Project_Starter.zip",
        "note": "ملفات CSV الأصلية التي اعتمدناها من اليوم الرابع، تستخدم إذا احتجنا Change Source أو استرجاع البيانات",
        "stage": "source",
        "audience": "learner"
      },
      {
        "name": "مختبر الأوزان — إثراء اختياري",
        "type": "WEB",
        "url": "week1/day5/web/Score_Lab.html",
        "note": "نشاط استكشافي تحضيرا للحساب الموزون في جلسة لاحقة، وليس من تطبيق اليوم الخامس",
        "audience": "learner",
        "stage": "lab"
      }
    ],
    "requiredFiles": [
      {
        "name": "ملف المشروع من اليوم الرابع — نسخة احتياطية",
        "type": "PBIX",
        "url": "week1/day5/data/HR_Performance_Intelligence_Day04_Backup.pbix",
        "note": "ملف PBIX محفوظ مع ملفات الدورة على GitHub، للرجوع إلى نقطة نهاية اليوم الرابع"
      },
      {
        "name": "ملفات بيانات المشروع — 8 ملفات CSV",
        "type": "ZIP",
        "url": "week1/day4/data/Day04_Project_Starter.zip",
        "note": "ملفات CSV الأصلية التي اعتمدناها من اليوم الرابع، تستخدم إذا احتجنا Change Source أو استرجاع البيانات"
      }
    ],
    "teachingStatus": "taught",
    "learningScenes": [
      [
        "FILE PATH",
        "CHANGE SOURCE"
      ],
      [
        "PAGE 01",
        "PAGE 02"
      ],
      [
        "ROWS",
        "EMPLOYEES"
      ],
      [
        "SLICERS",
        "FILTERS"
      ],
      [
        "EDIT",
        "INTERACTIONS"
      ],
      [
        "MANAGER",
        "SELF"
      ],
      [
        "REVIEW",
        "CONTINUE"
      ]
    ],
    "learningSections": [
      {
        "name": "تغيير المصدر",
        "title": "ربطنا التقرير بالمصدر الصحيح",
        "lead": "راجعنا كيف نغير مسار الملفات الموجودة بدل ما نعيد بناء كل الاستعلامات. الخطوة هاي بتفيد لما ينتقل المشروع من جهاز لجهاز.",
        "steps": [
          {
            "title": "Change Source",
            "copy": "من إعدادات مصدر البيانات أو Source Step داخل Power Query غيري مسار الملف للمكان الجديد، ثم تأكدي أن الاستعلام رجع يقرأ البيانات."
          },
          {
            "title": "Refresh والتحقق",
            "copy": "اعملي Refresh وراجعي ظهور البيانات بدون أخطاء. تغيير المسار ما لازم يغير معنى الجداول أو علاقاتها."
          },
          {
            "title": "نسخة المشروع",
            "copy": "اذا ضاع ملف PBIX اللي بنينا عليه في اليوم الرابع، فيه نسخة احتياطية في بداية الصفحة. الملف الحالي بعد الجلسة يحتفظ بتعديلاتك الجديدة."
          }
        ],
        "callout": "Change Source بيغير مكان المصدر، مش هو نفسه إضافة جدول جديد.",
        "files": "day5-files"
      },
      {
        "name": "الصفحة الثانية",
        "title": "عملنا صفحة ثانية في التقرير",
        "lead": "وسعنا المشروع بصفحة جديدة بدل حشر كل الرسومات والفلاتر بصفحة واحدة.",
        "steps": [
          {
            "title": "New Page",
            "copy": "من تبويبات التقرير أضفنا صفحة ثانية. كل صفحة ممكن يكون إلها Visuals وفلاتر وتفاعلات مختلفة."
          },
          {
            "title": "تنظيم الصفحات",
            "copy": "راجعي الصفحتين الموجودات واحفظي أسماء واضحة تعبر عن غرض كل صفحة، من غير ما نعيد بناء اللي عملناه."
          }
        ],
        "callout": "إضافة صفحة جديدة مختلفة عن إنشاء ملف PBIX جديد."
      },
      {
        "name": "أول Measures",
        "title": "عدد التقييمات وعدد الموظفين",
        "lead": "كتبنا مقاييس DAX بسيطة تتغير مع سياق الفلاتر والرسومات.",
        "steps": [
          {
            "title": "Assessment Count",
            "copy": "يحسب عدد سجلات تقييم KPIs الموجودة في جدول EvaluationScores_2026_H1.",
            "code": "Assessment Count =\nCOUNTROWS('EvaluationScores_2026_H1')"
          },
          {
            "title": "Employee Count",
            "copy": "يحسب عدد EmployeeID المختلف في جدول Employees، وهو مش بالضرورة عدد الموظفين أصحاب التقييم المكتمل.",
            "code": "Employee Count =\nDISTINCTCOUNT(Employees[EmployeeID])"
          },
          {
            "title": "راجعي الفرق",
            "copy": "اسألي حالك: ليش ممكن يكون عدد سجلات التقييم أكبر بكثير من عدد الموظفين؟"
          }
        ],
        "callout": "COUNTROWS يحسب الصفوف، أما DISTINCTCOUNT فيحسب القيم الفريدة في العمود المحدد."
      },
      {
        "name": "خمسة Slicers",
        "title": "تحكم أكبر بعرض التقرير",
        "lead": "أضفنا خمسة Slicers داخل التقرير، وبنقدر نختار منها القيم اللي بدنا نحللها.",
        "steps": [
          {
            "title": "خمسة فلاتر",
            "copy": "راجعي الفلاتر الخمسة اللي أضفناها فعليا. اختاري قيمة من أحدها ولاحظي تغير النتائج في نفس الصفحة."
          },
          {
            "title": "تجربة مشتركة",
            "copy": "جربي اختيار أكثر من Slicer وتأكدي إنك عارفة أي بيانات عم تشوفي حاليا."
          }
        ],
        "callout": "عدد الفلاتر المؤكد في الجلسة خمسة. أسماء حقولها تعتمد على النسخة اللي عملناها داخل Power BI."
      },
      {
        "name": "Edit Interactions",
        "title": "مش كل فلتر لازم يأثر على كل رسم",
        "lead": "استخدمنا Edit Interactions عشان نتحكم بشكل مقصود بتفاعل الرسومات والفلاتر.",
        "steps": [
          {
            "title": "اختيار Visual",
            "copy": "اختاري Slicer أو Visual، ثم Edit Interactions، وحددي إذا الرسمة الثانية تتفلتر أو يبقى تأثيرها معطل حسب هدف الصفحة."
          },
          {
            "title": "اختبار بعد التعديل",
            "copy": "جربي اختيار قيمة وشوفي أي Visual تغير وأي Visual بقي ثابت. بعدين ارجعي للعرض الطبيعي."
          }
        ],
        "callout": "تعديل التفاعل يخص سلوك العناصر داخل التقرير، مش تغيير البيانات الأصلية."
      },
      {
        "name": "Manager وSelf",
        "title": "فصلنا مصادر التقييم باستخدام DAX",
        "lead": "تعلمنا نستخدم CALCULATE وAVERAGE لنحسب متوسط العلامات من Manager وحده ومن Self وحده.",
        "steps": [
          {
            "title": "Manager KPI Average",
            "copy": "متوسط درجات KPI المسجلة بتقييم المدير فقط.",
            "code": "Manager KPI Average =\nCALCULATE(\n    AVERAGE('EvaluationScores_2026_H1'[KPIScore]),\n    'EvaluationScores_2026_H1'[AssessmentSource] = \"Manager\"\n)"
          },
          {
            "title": "Self KPI Average",
            "copy": "متوسط درجات KPI المسجلة بتقييم الموظف لنفسه فقط.",
            "code": "Self KPI Average =\nCALCULATE(\n    AVERAGE('EvaluationScores_2026_H1'[KPIScore]),\n    'EvaluationScores_2026_H1'[AssessmentSource] = \"Self\"\n)"
          },
          {
            "title": "قارني النتائج",
            "copy": "استخدمي Measures على Card أو رسم مناسب، وجربي الفلاتر. هاي متوسطات KPI وليست النتيجة النهائية الموزونة."
          }
        ],
        "callout": "ما بنخلط Self وManager وUpward في متوسط واحد. كل مصدر إله تعريف مستقل."
      },
      {
        "name": "الخطوة الجاية",
        "title": "شو أصبح معنا وشو لسه قدامنا؟",
        "lead": "صار عنا نموذج مربوط وتقرير من صفحتين، ومقاييس للعدد والمتوسط، وفلاتر وتفاعلات. هاي قاعدة رح نبني عليها باقي المشروع.",
        "steps": [
          {
            "title": "مراجعة منجزات الجلسة",
            "copy": "افتحي المشروع وراجعي الصفحتين، والـMeasures الأربعة، والخمسة Slicers، وEdit Interactions."
          },
          {
            "title": "احفظي مشروعك",
            "copy": "اعملي Save لملفك الحالي. نسخة اليوم الرابع الموجودة هون للاسترجاع عند الحاجة، وما فيها تعديلات اليوم الخامس."
          },
          {
            "title": "مستوى متقدم لاحقا",
            "copy": "النتيجة الموزونة للأهداف باستخدام SUMX وDIVIDE، والتقييمات غير المكتملة، والـBookmarks وTooltips رح نشتغل عليهم بجلسات قادمة."
          }
        ],
        "callout": "هدفنا بنهاية التدريب مشروع من ست صفحات، مبني خطوة خطوة على اللي أنجزناه فعلا، بدون قفز على مهارات ما تدربنا عليها.",
        "files": "lab"
      }
    ],
    "actualDate": "2026-10-26"
  },
  {
    "id": 6,
    "date": "2026-10-27",
    "weekday": "الثلاثاء",
    "ready": true,
    "phase": "EXPAND",
    "title": "Data Expansion & Model Integrity",
    "titleAr": "نوسع بيانات المشروع ونحافظ على دقة النتائج",
    "hook": "صار عنا تقييمات فترة سابقة وتقدم الاهداف عبر الشهور، كيف نضيف الملفات الجديدة بدون ما نخرب صفحاتنا الحالية؟",
    "mission": "نوسع نفس مشروع Power BI بمصدرين CSV، ونعمل Append ونتحقق من العلاقات والمقاييس ونجهز صفحة جديدة",
    "topics": [
      "Get Data",
      "Append Queries as New",
      "Power Query",
      "Data Modeling",
      "Relationships",
      "Refresh",
      "Filter Context",
      "Report Visuals"
    ],
    "build": [
      "افتحي مشروع اليوم الخامس وخذي نسخة عمل جديدة",
      "استوردي ملف تقييمات 2025 وتاكدي من تطابق اعمدته مع 2026",
      "اعملي Append Queries as New لجدول مستقل",
      "استوردي ملف تقدم الاهداف واربطينه بالاهداف والتقويم",
      "راجعي صحة المفاتيح وRefresh",
      "اختبري المقاييس القديمة وابدئي الصفحة الثالثة"
    ],
    "challenge": "اختبري نتيجتي Manager وSelf مع اختيار قسم، ثم تاكدي ان الصفحات القديمة ما تغيرت بعد التحديث",
    "deliverable": "مصادر جديدة مترابطة وبيانات مهيأة للتحليل مع الحفاظ على المشروع الموجود",
    "resources": [
      {
        "name": "نسخة المشروع بعد اليوم الخامس — ملف استرجاع",
        "type": "PBIX",
        "url": "week1/day6/data/HR_Performance_Intelligence_Day05_Backup.pbix",
        "note": "النسخة الاصلية من نهاية اليوم الخامس، استخدميها عند الحاجة لاسترجاع مشروع Power BI",
        "audience": "learner",
        "stage": "backup"
      },
      {
        "name": "EvaluationScores_2025_H1.csv",
        "type": "CSV",
        "url": "week1/day6/data/EvaluationScores_2025_H1.csv",
        "note": "التقييمات التاريخية لمقارنة الفترات",
        "audience": "learner",
        "stage": "expansion"
      },
      {
        "name": "ObjectiveProgressSnapshots.csv",
        "type": "CSV",
        "url": "week1/day6/data/ObjectiveProgressSnapshots.csv",
        "note": "تقدم الاهداف في تواريخ متابعة مختلفة",
        "audience": "learner",
        "stage": "expansion"
      }
    ],
    "requiredFiles": [
      {
        "name": "EvaluationScores_2025_H1.csv",
        "type": "CSV",
        "note": "ملف التقييمات التاريخية"
      },
      {
        "name": "ObjectiveProgressSnapshots.csv",
        "type": "CSV",
        "note": "ملف متابعة تقدم الاهداف"
      }
    ],
    "teachingStatus": "prepared",
    "learningScenes": [
      [
        "PROJECT",
        "CONTINUE"
      ],
      [
        "2025",
        "2026"
      ],
      [
        "APPEND",
        "AS NEW"
      ],
      [
        "OBJECTIVES",
        "SNAPSHOTS"
      ],
      [
        "KEYS",
        "RELATIONS"
      ],
      [
        "FILTER",
        "CONTEXT"
      ],
      [
        "PAGE 03",
        "SAVE"
      ]
    ],
    "learningSections": [
      {
        "name": "نكمل مشروعنا",
        "title": "نفس التقرير، بيانات اكثر",
        "lead": "رح نكمل من ملف اليوم الخامس، مش من تقرير جديد",
        "files": "backup",
        "steps": [
          {
            "title": "افتحي المشروع",
            "copy": "افتحي HR_Performance_Intelligence.pbix وتاكدي من وجود Overview وDepartments والمقاييس اللي انشأناها"
          },
          {
            "title": "احفظي نسخة",
            "copy": "اعملي Save As لنسخة عمل جديدة قبل اضافة الملفات"
          }
        ],
        "callout": "المشروع القديم هو نقطة البداية ولازم يظل شغال"
      },
      {
        "name": "ملفات التطبيق",
        "title": "ملفين جديدين، سؤالين مختلفين",
        "lead": "نزلي ملفي CSV الجديدين من هون وخليهم مع ملفات مشروعك بمجلد ثابت",
        "steps": [
          {
            "title": "EvaluationScores_2025_H1.csv",
            "copy": "استوردي تقييمات 2025 باستخدام Get Data ثم Transform Data"
          },
          {
            "title": "ObjectiveProgressSnapshots.csv",
            "copy": "استعرضي متابعة الاهداف من حيث ObjectiveID وSnapshotDate وProgressPct"
          }
        ],
        "callout": "KPIScore علامة تقييم، بينما ProgressPct تقدم الهدف؛ كل واحد له معنى مختلف",
        "files": "expansion"
      },
      {
        "name": "تجميع الفترات",
        "title": "Append بدون هدم البيانات الحالية",
        "lead": "قبل الجمع، قارني Schema الملفات وتاكدي من النوع الصحيح",
        "steps": [
          {
            "title": "راجعي الاعمدة",
            "copy": "التقييمات التاريخية تتبع نفس اعمدة تقييمات 2026: مفاتيح Text وتاريخ Date ودرجة Decimal Number"
          },
          {
            "title": "Append Queries as New",
            "copy": "اختاري جدولي EvaluationScores_2026_H1 وEvaluationScores_2025_H1، وسمي الناتج EvaluationScores_All_Staging"
          },
          {
            "title": "حافظي على المقاييس القديمة",
            "copy": "خلي Staging استعلام Connection only حاليا، ولا تغيري اسم جدول 2026 المرتبط بالصفحات"
          }
        ],
        "callout": "Append يضيف صفوف تحت بعض. Merge يضيف اعمدة من جدول مرتبط"
      },
      {
        "name": "سجل تقدم الاهداف",
        "title": "التقدم عبر الزمن",
        "lead": "كل هدف ممكن يظهر في اكثر من شهر، وهذا جزء من تصميم بيانات المتابعة",
        "steps": [
          {
            "title": "انواع البيانات",
            "copy": "خلي SnapshotDate تاريخ، وProgressPct رقم، وObjectiveID وEmployeeID نص"
          },
          {
            "title": "العلاقة الاولى",
            "copy": "اربطي Objectives[ObjectiveID] كـOne مع ObjectiveProgressSnapshots[ObjectiveID] كـMany باتجاه Single"
          },
          {
            "title": "العلاقة الثانية",
            "copy": "اربطي Calendar[Date] كـOne مع ObjectiveProgressSnapshots[SnapshotDate] كـMany باتجاه Single"
          }
        ],
        "callout": "تكرار ObjectiveID بتواريخ مختلفة متوقع، وما بنحسب SUM لنسب التقدم"
      },
      {
        "name": "تطبيق جديد",
        "title": "كيف نفحص السجلات بدون تغيير المصدر؟",
        "lead": "رح نحل سؤال عملي على بيانات المتابعة قبل ما نكمل التقرير",
        "steps": [
          {
            "title": "افهمي الصف الواحد",
            "copy": "اختاري هدفا واحدا، وشوفي كيف تظهر له تواريخ متابعة مختلفة"
          },
          {
            "title": "حافظي على بياناتك",
            "copy": "اعملي فحص منفصل لاخر تاريخ متابعة لكل هدف، وخلي جدول المصدر الاصلي بدون تغيير"
          }
        ],
        "callout": "قبل حذف اي صف، اسألي شو مستوى التفاصيل اللي يمثله"
      },
      {
        "name": "فحوص التقرير",
        "title": "هل ظلت نتائجنا صحيحة؟",
        "lead": "نراجع سلوك المقاييس والتفاعلات بعد توسعة البيانات",
        "steps": [
          {
            "title": "اختبري Filter Context",
            "copy": "جربي Slicers على Assessment Count وEmployee Count ومتوسطي Manager وSelf"
          },
          {
            "title": "تذكري Edit Interactions",
            "copy": "اختبري عنصر يتاثر بالفلتر وعنصر بقي كما حددتيه في الجلسة السابقة"
          },
          {
            "title": "اعملي Refresh",
            "copy": "تاكدي ان الاستعلامات الجديدة حملت وان الصفحتين القديمتين ما زالوا شغالين"
          }
        ],
        "callout": "CALCULATE اللي تعلمناه بالخامس يكفي للتطبيق، واليوم نهتم بفهم اثر الفلاتر"
      },
      {
        "name": "الصفحة الثالثة",
        "title": "نجهز مساحة لتحليل التقدم",
        "lead": "رح نعطي Progress مساحة مستقلة في التقرير",
        "steps": [
          {
            "title": "اضيفي صفحة جديدة",
            "copy": "سميها Objective Progress، واستخدمي Visual مناسب لعرض متوسط ProgressPct حسب الشهر"
          },
          {
            "title": "احفظي نسخة",
            "copy": "راجعي الصفحات الثلاث واحفظي PBIX الحالي"
          }
        ],
        "callout": "الحساب الموزون للاهداف رح يكون في جلسة مستقلة"
      }
    ]
  },
  {
    "id": 7,
    "date": "2026-10-29",
    "weekday": "الخميس",
    "ready": false,
    "phase": "WEIGHT",
    "title": "Weighted Evaluation & Completion-Safe DAX",
    "titleAr": "من متوسطات KPIs إلى التقييم الموزون الصحيح",
    "hook": "Manager KPI Average وSelf KPI Average مفيدان، لكن كيف نحسب نتيجة الموظف حسب أوزان أهدافه؟",
    "mission": "نبني Objective Score والنتيجة الموزونة لكل مصدر تقييم على حدة، مع التحقق من نقص KPIs وصحة إجماليات الأقسام",
    "topics": [
      "Objective Score",
      "SUMX",
      "DIVIDE",
      "VAR",
      "Completion Checks",
      "Manager vs Self",
      "Weighted Score",
      "Measures Validation"
    ],
    "build": [
      "نراجع Manager وSelf Measures من اليوم الخامس",
      "نحسب متوسط KPI داخل كل Objective مع اختيار مصدر التقييم والفترة",
      "نطبق وزن Objective مرة واحدة باستخدام SUMX وDIVIDE",
      "نتحقق من كل KPIs المطلوبة ومن مجموع الأوزان دون تحويل الناقص لصفر",
      "نحسب متوسط نتائج الموظفين المكتملة للقسم بدل جمع الدرجات",
      "نضيف مؤشرات أداء موزونة إلى صفحات التقرير ونطابق موظفا واحدا يدويا"
    ],
    "challenge": "تحققي من موظف مكتمل وآخر ناقص، واشرحي اختلاف KPI Average عن Weighted Score",
    "deliverable": "مقاييس Manager وSelf موزونة ومدققة، مع إضافة صفحات تحليل الأداء",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 7",
        "type": "Plan",
        "note": "الخطة محدثة حسب ما تم تطبيقه فعلا، وملفات هذا اليوم لم تجهز للنشر بعد"
      }
    ],
    "teachingStatus": "planned"
  },
  {
    "id": 8,
    "date": "2026-11-01",
    "weekday": "الأحد",
    "ready": false,
    "phase": "COMPARE",
    "title": "Period Comparison, Department Analysis & Drillthrough",
    "titleAr": "مقارنات الفترات وتحليل الأقسام وتفاصيل الموظفين",
    "hook": "مين تحسن بين الفترات؟ وهل المقارنة عادلة لو تغيرت تغطية التقييم؟",
    "mission": "نبني تحليل الأقسام ومقارنة الفترات المتاحة، ونستخدم Conditional Formatting وDrillthrough للتفاصيل من غير استنتاجات غير مدعومة",
    "topics": [
      "Period Comparison",
      "Calendar",
      "Completion Coverage",
      "Department Analysis",
      "Conditional Formatting",
      "Top N",
      "Drillthrough"
    ],
    "build": [
      "نحدد الفترات القابلة للمقارنة من الملفات المتاحة، ونتجنب اختراع اتجاه شهري لتقييمات ربع سنوية",
      "نضيف صفحة Performance Comparison ونراجع اختلاف درجات Manager وSelf",
      "نوسع صفحة Department Analysis بمقاييس الأداء الموزون",
      "نستخدم Conditional Formatting وTop N لإبراز الفروقات المهمة",
      "نصمم صفحة Employee Detail ونربطها بـDrillthrough",
      "نراجع تفاعل خمسة Slicers مع جميع الصفحات المرتبطة"
    ],
    "challenge": "انتقلي من قسم إلى موظف محدد، وقدمي مقارنة مدعومة بأرقام وفترة واضحة",
    "deliverable": "صفحات تحليل الفترات والأقسام والموظفين تتفاعل مع التقييمات الصحيحة",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 8",
        "type": "Plan",
        "note": "الخطة محدثة حسب ما تم تطبيقه فعلا، وملفات هذا اليوم لم تجهز للنشر بعد"
      }
    ],
    "teachingStatus": "planned"
  },
  {
    "id": 9,
    "date": "2026-11-03",
    "weekday": "الثلاثاء",
    "ready": false,
    "phase": "DESIGN",
    "title": "Premium Power BI UX & Navigation",
    "titleAr": "الملاحة والـTooltips وBookmarks والتجربة التفاعلية",
    "hook": "التقرير القوي مش بس أرقام: كيف نخليه مفهوم وسهل التنقل من دون زحمة؟",
    "mission": "نحول الصفحات إلى تجربة متماسكة باستخدام Sidebar Navigation وBookmarks وReport Page Tooltips وField Parameters وأساسيات HTML/SVG",
    "topics": [
      "Bookmarks",
      "Selection Pane",
      "Sidebar Navigation",
      "Buttons",
      "Report Page Tooltips",
      "Field Parameters",
      "Sync Slicers",
      "HTML/SVG Introduction"
    ],
    "build": [
      "نراجع Edit Interactions من اليوم الخامس وننسق تفاعل العناصر بشكل متعمد",
      "نبني Sidebar Navigation باستخدام Buttons وBookmarks وSelection Pane",
      "نضيف Tooltips تعرض تفاصيل مفيدة من غير فتح صفحة جديدة",
      "نجرب Field Parameters للتبديل بين أبعاد أو مقاييس مناسبة",
      "نضبط Sync Slicers والانتقال بين الصفحات وتفاصيل Drillthrough",
      "نجهز مكونات تصميم HTML/SVG بسيطة تناسب المشروع النهائي"
    ],
    "challenge": "نفذي رحلة من الملخص إلى التفاصيل وارجعي باستخدام الملاحة مع الحفاظ على الفلاتر المقصودة",
    "deliverable": "تنقل احترافي وتفاعلات متقدمة على الصفحات الست أو المتاح منها",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 9",
        "type": "Plan",
        "note": "الخطة محدثة حسب ما تم تطبيقه فعلا، وملفات هذا اليوم لم تجهز للنشر بعد"
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
    "title": "Final Six-Page Executive Dashboard & QA",
    "titleAr": "ننجز داشبورد الست صفحات ونراجع المشروع بالكامل",
    "hook": "آخر خطوة: التقرير يشتغل بأرقام صحيحة، وتجربة واضحة، وشكل بصري يستحق العرض",
    "mission": "إنهاء ست صفحات احترافية وتطبيق HTML/SVG للتحسين البصري، والتحقق من Measures والبيانات والملاحة وتسليم الملف",
    "topics": [
      "Six-Page Review",
      "HTML/SVG Design",
      "Model Validation",
      "Measure QA",
      "Visual Interactions",
      "Navigation QA",
      "Final Demo"
    ],
    "build": [
      "نراجع اكتمال صفحات Overview وManager vs Self وDepartment وWeighted Performance وPeriod & Progress وEmployee Detail",
      "نضيف لمسات HTML/SVG انتقائية دون تعريض الأرقام أو الأداء للخطر",
      "نتأكد من فصل مصادر التقييم ومن صحة الأوزان وحالات النقص",
      "نراجع Filters وSlicers وTooltips وBookmarks وDrillthrough",
      "نختبر التصفح وحفظ المشروع وفتح الملف عند نقل مصدر البيانات",
      "تقدم مريم عرضا نهائيا للمشروع مع ثلاث ملاحظات مبنية على البيانات"
    ],
    "challenge": "قدمي المشروع من الصفحة الرئيسية حتى تفاصيل موظف، واشرحي دقة النتيجة وأثر أي تقييم ناقص",
    "deliverable": "ملف PBIX نهائي بست صفحات متكاملة مع اختبار جودة ودليل استخدام مختصر",
    "resources": [],
    "requiredFiles": [
      {
        "name": "مواد اليوم 10",
        "type": "Plan",
        "note": "الخطة محدثة حسب ما تم تطبيقه فعلا، وملفات هذا اليوم لم تجهز للنشر بعد"
      }
    ],
    "teachingStatus": "planned"
  },

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
  return (day.resources || []).filter(resource => resource.audience !== `trainer` && (day.id === 1 || (resource.audience === `learner` && (/\.csv(?:[?#]|$)/i.test(resource.url || ``) || ((day.id === 4 || day.id === 5) && /\.zip(?:[?#]|$)/i.test(resource.url || ``) && (day.id !== 5 || resource.url === `week1/day4/data/Day04_Project_Starter.zip`)) || (day.id === 5 && resource.type === `WEB` && resource.url === `week1/day5/web/Score_Lab.html`) || (resource.type === `PBIX` && resource.stage === `backup` && ((day.id === 5 && resource.url === `week1/day5/data/HR_Performance_Intelligence_Day04_Backup.pbix`) || (day.id === 6 && resource.url === `week1/day6/data/HR_Performance_Intelligence_Day05_Backup.pbix`)))))));
}
