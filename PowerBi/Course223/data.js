// Course223 — Days 1–5 preserved as taught. Day 6 hybrid ready; Days 7–10 planned.
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
    "date": null,
    "weekday": null,
    "ready": true,
    "phase": "HYBRID",
    "teachingStatus": "prepared",
    "title": "Weighted Performance + Interactive Report",
    "titleAr": "نحسب الاداء الموزون ونبني صفحة ثالثة تفاعلية",
    "hook": "لما يختلف وزن كل Objective، هل المتوسط العادي يعطي المدير نتيجة عادلة؟ اليوم رح نحسب النتيجة الصح ونحطها في صفحة يقدر يستخدمها بسهولة",
    "mission": "نستخدم SUMX وDIVIDE لحساب اداء الاهداف الموزون، وREMOVEFILTERS للمساهمة، ثم نبني صفحة Weighted Performance مع بطاقات ومقارنات ونضيف اول Navigation باستخدام Buttons وBookmarks",
    "topics": [
      "SUMX",
      "DIVIDE",
      "Weighted Score",
      "REMOVEFILTERS",
      "Contribution %",
      "Cards / Matrix / Bar",
      "Page Navigation",
      "Buttons",
      "Bookmarks Basics"
    ],
    "build": [
      "نكمل على نفس PBIX بعد اليوم الخامس ونحفظ نسخة Save As",
      "نختار موظفا وربع سنة واحدا، ونحسب متوسط KPIs لكل Objective مكتمل",
      "نطبق وزن كل Objective مرة واحدة بواسطة SUMX وDIVIDE",
      "نقارن عدد تقييمات القسم باجمالي الاقسام بواسطة REMOVEFILTERS ونظهر Contribution %",
      "نبني صفحة ثالثة Weighted Performance فيها 3 KPI Cards وBar Chart وMatrix وSlicer",
      "نضيف Buttons للتنقل بين الصفحات وBookmark بسيطا لإظهار واخفاء لوحة الفلاتر",
      "نختبر الفلاتر والنتائج ونحفظ الملف"
    ],
    "challenge": "اختاري موظفا وربع سنة واحدا وتحققي من اختلاف KPI Average وWeighted Score. بعد ذلك اختاري قسما وجربي مساهمته واخفاء الفلاتر بدون ان يتغير الاختيار",
    "deliverable": "صفحة ثالثة Weighted Performance مكتملة كبنية عملية: مؤشرات، تحليل اقسام، مصفوفة، تنقل اساسي واختبار صحة الارقام",
    "resources": [
      {
        "name": "ملف Power BI الاصلي — نهاية اليوم الخامس",
        "type": "PBIX",
        "url": "week1/day6/data/HR_Performance_Intelligence_Day05_Backup.pbix",
        "note": "نسخة استرجاع محفوظة كما رفعها المدرب، اشتغلي على نسخة Save As",
        "stage": "backup",
        "audience": "learner"
      },
      {
        "name": "مخطط الصفحة الثالثة — Visual Blueprint",
        "type": "WEB",
        "url": "week1/day6/web/Day06_Weighted_Blueprint.html",
        "note": "تصور بصري للصفحة التي سنبنيها داخل Power BI",
        "stage": "blueprint",
        "audience": "learner"
      }
    ],
    "requiredFiles": [
      {
        "name": "HR_Performance_Intelligence_Day05_Backup.pbix",
        "type": "PBIX",
        "note": "ملف المشروع الحالي"
      }
    ],
    "learningScenes": [
      [
        "DAY 05",
        "CONTINUE"
      ],
      [
        "KPIs",
        "OBJECTIVES"
      ],
      [
        "SUMX",
        "DIVIDE"
      ],
      [
        "REMOVEFILTERS",
        "CONTRIBUTION"
      ],
      [
        "WEIGHTED",
        "PAGE 03"
      ],
      [
        "BUTTONS",
        "BOOKMARKS"
      ],
      [
        "SAVE",
        "CHECK"
      ]
    ],
    "learningSections": [
      {
        "name": "نبدأ من نفس الملف",
        "title": "ما بدنا نبدأ من الصفر",
        "lead": "بنفتح ملف مشروعك الحالي، وبنبني على الصفحتين والمقاييس اللي صاروا عندنا",
        "steps": [
          {
            "title": "استرجعي المشروع",
            "copy": "افتحي النسخة اللي اشتغلتي عليها بعد اليوم الخامس، او ملف الاسترجاع اذا احتجتيه"
          },
          {
            "title": "Save As",
            "copy": "احفظي نسخة جديدة للعمل على اليوم السادس مع بقاء النسخة الاصلية"
          },
          {
            "title": "حددي السياق",
            "copy": "اختاري موظفا واحدا وQuarter واحدا قبل مقارنة التقييمات"
          }
        ],
        "callout": "رح نشتغل على الجداول الموجودة بدون اضافة بيانات جديدة",
        "files": "backup"
      },
      {
        "name": "Weighted Performance",
        "title": "من متوسط KPIs الى وزن الاهداف",
        "lead": "كل KPI له درجة، وكل Objective له Weight، لذلك النتيجة النهائية مش مجرد متوسط كل الصفوف",
        "steps": [
          {
            "title": "Objective Score",
            "copy": "احسبي متوسط درجات KPIs التابعة للهدف ضمن مصدر تقييم واحد وربع واحد، مع فحص اكتمال المؤشرات",
            "code": "Manager Objective Score (Complete) =\nVAR ExpectedKPIs =\n    CALCULATE(COUNTROWS(KPIs))\nVAR ReceivedKPIs =\n    CALCULATE(\n        DISTINCTCOUNT('EvaluationScores_2026_H1'[KPIID]),\n        'EvaluationScores_2026_H1'[AssessmentSource] = \"Manager\",\n        NOT(ISBLANK('EvaluationScores_2026_H1'[KPIScore]))\n    )\nRETURN\n    IF(\n        ExpectedKPIs > 0 &&\n        ReceivedKPIs = ExpectedKPIs &&\n        HASONEVALUE('Calendar'[QuarterLabel]),\n        [Manager KPI Average],\n        BLANK()\n    )",
            "explain": [
              "ExpectedKPIs بيحسب عدد المؤشرات المطلوبة للهدف، وReceivedKPIs بيحسب ما وصل من تقييم المدير",
              "اذا في مؤشر ناقص او ما اخترنا Quarter واحد، النتيجة بتظل BLANK مش صفر",
              "بنستخدم Manager KPI Average من اليوم الخامس ضمن الهدف المختار"
            ]
          },
          {
            "title": "SUMX",
            "copy": "مرّي على اهداف الموظف واجمعي مساهمة كل هدف مرة واحدة بدل تكرار الوزن على كل KPI",
            "code": "Manager Employee Weighted (Complete) =\nVAR OneEmployee = HASONEVALUE(Employees[EmployeeID])\nVAR OneQuarter = HASONEVALUE('Calendar'[QuarterLabel])\nVAR RequiredObjectives =\n    CALCULATETABLE(\n        VALUES(Objectives[ObjectiveID]),\n        Objectives[PlanYear] = 2026\n    )\nVAR ExpectedObjectives = COUNTROWS(RequiredObjectives)\nVAR CompleteObjectives =\n    COUNTROWS(\n        FILTER(\n            RequiredObjectives,\n            NOT(ISBLANK([Manager Objective Score (Complete)]))\n        )\n    )\nVAR TotalWeight =\n    CALCULATE(\n        SUM(Objectives[ObjectiveWeightPct]),\n        Objectives[PlanYear] = 2026\n    )\nVAR WeightedResult =\n    SUMX(\n        RequiredObjectives,\n        [Manager Objective Score (Complete)] *\n        DIVIDE(CALCULATE(MAX(Objectives[ObjectiveWeightPct])), 100)\n    )\nRETURN\n    IF(\n        OneEmployee &&\n        OneQuarter &&\n        ExpectedObjectives > 0 &&\n        CompleteObjectives = ExpectedObjectives &&\n        TotalWeight = 100,\n        WeightedResult,\n        BLANK()\n    )",
            "explain": [
              "RequiredObjectives بتحدد اهداف الموظف في سنة 2026 وتتأكد من اكتمالها",
              "SUMX بتمر على كل Objective، وDIVIDE بتحول الوزن من 0–100 الى نسبة",
              "النتيجة تظهر فقط عند اكتمال كل الاهداف ومجموع الاوزان 100"
            ]
          },
          {
            "title": "DIVIDE",
            "copy": "حوّلي ObjectiveWeightPct الى نسبة بقسمتها على 100، وتحققي ان مجموع الاوزان يساوي 100"
          },
          {
            "title": "تعاملي مع النقص",
            "copy": "اذا تقييم مطلوب ناقص، خلي النتيجة الكاملة فارغة بدل اعتبار الرقم الناقص صفرا",
            "code": "Manager Weighted Score (Complete) =\nIF(\n    HASONEVALUE('Calendar'[QuarterLabel]),\n    AVERAGEX(\n        VALUES(Employees[EmployeeID]),\n        [Manager Employee Weighted (Complete)]\n    ),\n    BLANK()\n)",
            "explain": [
              "AVERAGEX بتحسب متوسط درجات الموظفين المكتملة، مش مجموع درجاتهم",
              "المقياس يتطلب Quarter واحد وما بيحسب الموظف ناقص التقييم كصفر"
            ]
          }
        ],
        "callout": "رح نبدأ بمدير الموظف Manager وبربع واحد، ونقارن النتيجة بمتوسط KPI العادي"
      },
      {
        "name": "Contribution %",
        "title": "كم بيساهم القسم في مجموع التقييمات؟",
        "lead": "بدنا نقارن عدد تقييمات قسم معين باجمالي الاقسام مع الاحتفاظ بالفترة المختارة",
        "steps": [
          {
            "title": "المقياس الحالي",
            "copy": "استخدمي Assessment Count الذي انشأناه في اليوم الخامس"
          },
          {
            "title": "REMOVEFILTERS",
            "copy": "اعملي قياسا مرجعيا يتجاهل فلتر اسم القسم فقط، بدون تجاهل الفلاتر الزمنية",
            "code": "Assessment Count All Department Names =\nCALCULATE(\n    [Assessment Count],\n    REMOVEFILTERS(Departments[DepartmentName])\n)",
            "explain": [
              "CALCULATE بتعيد حساب Assessment Count بعد ازالة فلتر اسم القسم فقط",
              "REMOVEFILTERS هون ما بتزيل فلتر Quarter، فالمقارنة بتظل لنفس الفترة"
            ]
          },
          {
            "title": "DIVIDE",
            "copy": "اقسمي عدد تقييمات القسم على المجموع المرجعي، واختاري تنسيق Percentage",
            "code": "Department Contribution % =\nDIVIDE(\n    [Assessment Count],\n    [Assessment Count All Department Names]\n)",
            "explain": [
              "DIVIDE بتقسم تقييمات القسم على مجموع التقييمات المرجعي",
              "هاي نسبة مساهمة عدد السجلات، مش نسبة الاداء الموزون؛ نسقي النتيجة Percentage"
            ]
          }
        ],
        "callout": "قارني الاقسام داخل نفس الفترة، وافحصي ليش بتتغير النسبة لما يتغير الفلتر"
      },
      {
        "name": "Page 03",
        "title": "نبني صفحة Weighted Performance",
        "lead": "نحول Measures الى واجهة ادارية واضحة بدل الاكتفاء بالكود",
        "steps": [
          {
            "title": "خريطة التصميم",
            "copy": "افتحي Visual Blueprint وشوفي توزيع العنوان والبطاقات والرسومات"
          },
          {
            "title": "Cards",
            "copy": "ضعي Manager Weighted Score وManager KPI Average وDepartment Contribution %"
          },
          {
            "title": "Bar Chart + Matrix",
            "copy": "قارنة الاداء بين الاقسام، واعرضي الموظف والهدف والوزن بطريقة قابلة للقراءة"
          },
          {
            "title": "Filter",
            "copy": "استخدمي Quarter واحدا، واختبري قسم او موظف بدون خلط Self وManager"
          }
        ],
        "callout": "تأكدي ان الرسوم تعرض BLANK بشكل صحيح وان مجموع النسب مش بالضرورة درجة أداء",
        "files": "blueprint"
      },
      {
        "name": "Navigation & Bookmarks",
        "title": "نخلي التنقل اسهل من اول يوم",
        "lead": "المدير لازم يقدر يروح للصفحات الثلاث بدون ما يدور على التبويبات",
        "steps": [
          {
            "title": "Buttons",
            "copy": "اضيفي ثلاثة ازرار Page Navigation لصفحات Overview وDepartments وWeighted Performance"
          },
          {
            "title": "Selection Pane",
            "copy": "اعملي مجموعة فلاتر واضحة على الصفحة الثالثة"
          },
          {
            "title": "Bookmark بسيط",
            "copy": "انشئي Bookmark للاظهار واخر للاخفاء، وخلي Data مغلق وDisplay مفعل حتى ما تنمسح اختيارات المستخدم"
          }
        ],
        "callout": "باقي انواع التفاعلات رح نطورها في الجلسات القادمة"
      },
      {
        "name": "Final Check",
        "title": "اختبري واحفظي",
        "lead": "الصفحة الاحترافية لازم تعطي ارقاما صحيحة وتشتغل من اي زر",
        "steps": [
          {
            "title": "اختبار النتائج",
            "copy": "قارنة Weighted Score بمثال موظف واحد، واختبري Contribution % عند تغيير القسم",
            "code": "Manager Complete Employees =\nIF(\n    HASONEVALUE('Calendar'[QuarterLabel]),\n    COUNTROWS(\n        FILTER(\n            VALUES(Employees[EmployeeID]),\n            NOT(ISBLANK([Manager Employee Weighted (Complete)]))\n        )\n    ),\n    BLANK()\n)",
            "explain": [
              "بنعد فقط الموظفين اللي عندهم نتيجة موزونة مكتملة",
              "مقياس فحص اضافي للتأكد من ان القيم الناقصة ما تعاملنا معها كصفر"
            ]
          },
          {
            "title": "اختبار التفاعل",
            "copy": "تنقلي بين الصفحات، اظهري لوحة الفلاتر ثم اخفيها وتاكدي ان الاختيارات ما تغيرت"
          },
          {
            "title": "حفظ المشروع",
            "copy": "احفظي ملف PBIX الجديد وخلي نسختك الاصلية منفصلة"
          }
        ],
        "callout": "النجاح اليوم: صفحة ثالثة قابلة للاستخدام ونتائج يمكن تفسيرها"
      }
    ]
  },
  {
    "id": 7,
    "date": null,
    "weekday": null,
    "ready": false,
    "phase": "EXPLORE",
    "teachingStatus": "planned",
    "title": "Drillthrough, Drill Down & Employee Story",
    "titleAr": "ننتقل من نتائج الاقسام لتفاصيل الموظفين",
    "hook": "لما يلاقي المدير قسما نتيجته منخفضة، بده يعرف السبب والموظف والمؤشرات اللي تحتاج متابعة بدون ما يرجع لملفات Excel",
    "mission": "نصمم Employee Detail كصفحة رابعة ونتعلم Drillthrough وDrill Down ونراجع التقييمات غير المكتملة وConditional Formatting",
    "topics": [
      "Drillthrough",
      "Drill Down / Hierarchy",
      "Employee Detail",
      "Conditional Formatting",
      "Top N",
      "Blank vs Zero",
      "Manager vs Self"
    ],
    "build": [
      "نكمل على ملف اليوم السادس ونراجع الصفحة الموزونة",
      "نبني Employee Detail كصفحة رابعة باستخدام بيانات الموظف والاهداف والمؤشرات",
      "نطبق Drillthrough من الاقسام الى تفاصيل الموظف مع Back Button",
      "نضيف Drill Down في تسلسل Directorate → Department أو Objective → KPI حسب الحقول",
      "نستخدم Conditional Formatting لتمييز الحالات مع فحص Missing KPIs",
      "نراجع Sidebar وازرار الرجوع ونحفظ نسخة العمل"
    ],
    "challenge": "انتقلي من قسم محدد الى موظف ثم اشرحي سبب اختلاف متوسطه ومؤشراته",
    "deliverable": "صفحة رابعة Employee Detail مرتبطة بـDrillthrough وتدرج تفاصيل حقيقي",
    "resources": []
  },
  {
    "id": 8,
    "date": null,
    "weekday": null,
    "ready": false,
    "phase": "INSIGHT",
    "teachingStatus": "planned",
    "title": "Report Page Tooltips, Field Parameters & Dynamic Titles",
    "titleAr": "نصنع تحليلا يتغير حسب سؤال المدير",
    "hook": "بدل ما نعمل عشر رسومات شبه بعض، بنخلي الرسم الواحد يغير منظور العرض، ونعطي المستخدم تفاصيل اضافية بمجرد المرور عليه",
    "mission": "نبني صفحة خامسة Analysis Explorer ونستخدم Tooltips وField Parameters وDynamic Titles مع ترتيب بصري متقن",
    "topics": [
      "Report Page Tooltips",
      "Field Parameters",
      "Dynamic Titles",
      "SWITCH / SELECTEDVALUE as needed",
      "Advanced Matrix",
      "Top N",
      "Visual Hierarchy",
      "Design QA"
    ],
    "build": [
      "ننظم عناصر الصفحة الخامسة Analysis Explorer",
      "نعمل Tooltip Page مخصصة لتفاصيل الهدف او القسم",
      "ننشىء Field Parameter للتبديل بين Directorate وDepartment وEmployee بحسب الحقول المتاحة",
      "نربط عنوانا ديناميكيا بالاختيار مع فحص Single/Multiple selection",
      "نضبط Visual hierarchy وTop N وConditional Formatting",
      "نتحقق من مطابقة الارقام بين Tooltips والرسوم الرئيسية"
    ],
    "challenge": "بدلي منظور الرسم واختبري Tooltip على قسم ثم موظف مع التحقق من السياق",
    "deliverable": "صفحة خامسة Explorer بميزات Tooltips وField Parameters وعناوين ديناميكية",
    "resources": []
  },
  {
    "id": 9,
    "date": null,
    "weekday": null,
    "ready": false,
    "phase": "UX",
    "teachingStatus": "planned",
    "title": "Premium Sidebar, Bookmarks & Executive UX",
    "titleAr": "نحول التقرير الى تجربة ادارية متكاملة",
    "hook": "تقرير الست صفحات رح يصير اسهل بالاستخدام لما التنقل والفلاتر والمحتوى يتصرفوا بشكل متناسق",
    "mission": "نكمل صفحة Executive Insights السادسة ونوحد Sidebar وBookmarks وButtons وSync Slicers عبر صفحات التقرير",
    "topics": [
      "Advanced Bookmarks",
      "Buttons",
      "Selection Pane",
      "Sidebar Navigation",
      "Sync Slicers",
      "Page Navigation",
      "Theme",
      "Visual Hierarchy",
      "Mobile Layout"
    ],
    "build": [
      "نبني صفحة سادسة Executive Insights بملخص القرارات",
      "نضيف Sidebar موحدا للصفحات الست",
      "نطور Bookmarks وSelection Pane مع Show/Hide Panel من غير مسح الفلاتر",
      "نضبط Sync Slicers على الصفحات المناسبة وBack Buttons",
      "نستعرض تجربة الموبايل ومساحات العناصر وتناسق الالوان والخطوط",
      "نختبر انتقال المستخدم بين الصفحات الست"
    ],
    "challenge": "نفذي رحلة مدير من الملخص الى القسم الى الموظف ثم العودة من غير فقدان سياق مهم",
    "deliverable": "ست صفحات مترابطة بملاحة Premium وفلاتر متناسقة",
    "resources": []
  },
  {
    "id": 10,
    "date": null,
    "weekday": null,
    "ready": false,
    "phase": "DESIGN",
    "teachingStatus": "planned",
    "title": "HTML/SVG Visual Design + Final Six-Page QA",
    "titleAr": "اللمسات السينمائية والاختبار النهائي للمشروع",
    "hook": "الخطوة الاخيرة مش بس نجمل الرسوم، بدنا نحافظ على معنى البيانات ونختبر كل تفاعل",
    "mission": "نستخدم HTML Content وSVG بشكل محسوب مع AI Design Prompt ونتحقق من الارقام والفلاتر والاداء في كل الصفحات",
    "topics": [
      "HTML Content",
      "SVG",
      "AI Prompt Design",
      "DAX HTML Measures",
      "Safe Motion",
      "Responsive Canvas",
      "Native Visual QA",
      "Navigation QA",
      "Final Demo"
    ],
    "build": [
      "نشوف Before/After لعنصر Native ونسخة HTML Content",
      "نبني مكونا بصريا Premium من المقاييس الموجودة بدون ارقام ثابتة",
      "نضيف SVG او HTML صغيرا مع حركة آمنة عند الحاجة",
      "نقارن قيم HTML مع Native عبر عدة Slicers ونتحقق من BLANK وZero",
      "نراجع Drillthrough وTooltips وField Parameters وBookmarks عبر الصفحات الست",
      "نحفظ نسخة التسليم النهائية وتعرض مريم استنتاجات ادارية من التقرير"
    ],
    "challenge": "قارني نفس Measure في Native وHTML عند تغيير الفلاتر ثم قدمي النتيجة التنفيذية",
    "deliverable": "PBIX نهائي بست صفحات مع تجربة Premium وحسابات قابلة للتدقيق",
    "resources": []
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
  const allowed = day.id === 1
    ? new Set([ "WEB", "ZIP", "CSV", "PDF", "IMAGE" ])
    : day.id === 6
      ? new Set([ "PBIX", "WEB" ])
      : null;
  if (allowed && day.id === 6) {
    return (day.resources || []).filter(r => r.audience === "learner"
      && ((r.type === "PBIX" && r.url === "week1/day6/data/HR_Performance_Intelligence_Day05_Backup.pbix")
        || (r.type === "WEB" && r.url === "week1/day6/web/Day06_Weighted_Blueprint.html")));
  }
  return (day.resources || []).filter(resource => resource.audience !== `trainer`
    && (day.id === 1 || (resource.audience === `learner`
    && (/\.csv(?:[?#]|$)/i.test(resource.url || ``)
    || ((day.id === 4 || day.id === 5) && /\.zip(?:[?#]|$)/i.test(resource.url || ``)
      && (day.id !== 5 || resource.url === `week1/day4/data/Day04_Project_Starter.zip`))
    || (day.id === 5 && resource.type === `WEB` && resource.url === `week1/day5/web/Score_Lab.html`)
    || (day.id === 5 && resource.type === `PBIX` && resource.stage === `backup` && resource.url === `week1/day5/data/HR_Performance_Intelligence_Day04_Backup.pbix`)))));
}
