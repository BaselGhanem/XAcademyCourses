// Course223 — Day 1–3 preserved; Day 4 project foundation prepared; Days 5–10 planned.
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
    "date": "2026-10-25",
    "weekday": "الأحد",
    "ready": true,
    "phase": "MEASURE",
    "title": "DAX Fundamentals — Manager Performance & Executive Overview",
    "titleAr": "من البيانات لأول Dashboard احترافي",
    "hook": "كيف بنحول درجات مؤشرات KPI ووزن كل Objective لنتيجة دقيقة ونبني منها اول Dashboard؟",
    "mission": "نكتب Measures، ونحسب نتيجة Manager حسب الأهداف والأوزان، ونبني أول صفحة Performance Overview تتفاعل مع الأقسام والفترات",
    "topics": [
      "COUNTROWS",
      "DISTINCTCOUNT",
      "AVERAGE",
      "CALCULATE",
      "SUMX",
      "DIVIDE",
      "Weighted Performance",
      "Executive Overview"
    ],
    "build": [
      "افتحي نفس مشروع اليوم الرابع من جهازك، أو استرجعي نسخة PBIX الاحتياطية اذا احتجتي",
      "احسبي متوسط KPIs ووزن Objective على الورق",
      "اكتبي Measures لعدد التقييمات والموظفين",
      "احسبي متوسط Manager باستخدام AVERAGE وCALCULATE",
      "ابني النتيجة الموزونة مع التحقق من اكتمال التقييم",
      "جهزي Performance Overview ببطاقات ورسم وفلاتر",
      "اعملي Visual بنفسك واختبري الفلاتر واحفظي نفس PBIX"
    ],
    "challenge": "ابني Clustered Bar Chart يعرض Manager KPI Average حسب DepartmentName، وجربي اختيار مديرية وربع مختلف",
    "deliverable": "صفحة Performance Overview تتفاعل مع الفلاتر، وفيها Measures لحساب نتائج Manager الموزونة بعد التحقق من الاكتمال",
    "resources": [
      {
        "name": "ملف المشروع من اليوم الرابع — نسخة احتياطية",
        "type": "PBIX",
        "url": "https://drive.google.com/file/d/1muj3R4SHlKplnOGoOElSuPfk-uShvBFT/view?usp=drivesdk",
        "note": "نسخة احتياطية من نهاية اليوم الرابع، للتنزيل اذا ضاع المشروع من جهازك",
        "audience": "learner",
        "stage": "backup"
      },
      {
        "name": "مختبر الأوزان التفاعلي",
        "type": "WEB",
        "url": "week1/day5/web/Score_Lab.html",
        "note": "غيري علامات KPIs وشوفي أثر الوزن والدرجات الناقصة",
        "audience": "learner",
        "stage": "lab"
      }
    ],
    "requiredFiles": [],
    "teachingStatus": "prepared",
    "learningScenes": [
      [
        "MODEL",
        "MEASURE"
      ],
      [
        "KPI SCORES",
        "WEIGHTED"
      ],
      [
        "MEASURES",
        "COUNT"
      ],
      [
        "MANAGER",
        "AVERAGE"
      ],
      [
        "OBJECTIVES",
        "SUMX"
      ],
      [
        "MISSING",
        "VALIDATE"
      ],
      [
        "VISUAL",
        "DASHBOARD"
      ],
      [
        "YOUR TURN",
        "SAVE"
      ]
    ],
    "learningSections": [
      {
        "name": "نبدأ",
        "title": "من النموذج للنتيجة",
        "lead": "اليوم رح نكمل على نفس ملف Power BI اللي حفظناه بعد ما ضبطنا العلاقات. رح نحول البيانات لحسابات واضحة ونبني صفحة Performance Overview.",
        "steps": [
          {
            "title": "افتحي المشروع",
            "copy": "افتحي HR_Performance_Intelligence.pbix من جهازك. اذا ضاع، افتحي النسخة الاحتياطية من أول الصفحة على Google Drive، نزلي ملف PBIX وافتحيه في Power BI Desktop."
          },
          {
            "title": "حددي نطاق العمل",
            "copy": "اختاري Calendar[QuarterLabel] = 2026-Q2. رح نركز على تقييم Manager فقط بالبداية."
          },
          {
            "title": "تذكري المسار",
            "copy": "Employees → Objectives → KPIs → EvaluationScores. الوزن في Objectives، وعلامات KPIs في EvaluationScores_2026_H1."
          }
        ],
        "callout": "كل Objective له وزن خاص. بنحسب العلامة من KPIs، وبعدين بنطبق الوزن مرة واحدة فقط."
      },
      {
        "name": "نفهم الحسبة",
        "title": "اول نحسبها على الورق",
        "lead": "قبل كتابة DAX، رح نتأكد ان معادلة التقييم الموزون واضحة.",
        "files": "lab",
        "steps": [
          {
            "title": "متوسط علامات الهدف",
            "copy": "اذا كان KPI الاول 60 والثاني 80، متوسط الهدف = 70."
          },
          {
            "title": "مساهمة الهدف",
            "copy": "اذا وزن الهدف 30%، مساهمته = 70 × 30 / 100 = 21 نقطة."
          },
          {
            "title": "مختبر تفاعلي",
            "copy": "افتحي مختبر الأوزان، وغيري علامات KPIs وشوفي كيف متوسط الهدف يختلف عن مساهمته في النتيجة النهائية."
          }
        ],
        "callout": "ما بنعطي كل KPI وزن مستقل. المتوسط للـKPIs، والوزن للـObjective."
      },
      {
        "name": "اول Measures",
        "title": "من الأرقام للـMeasures",
        "lead": "الـMeasure بتعيد الحساب بحسب اختيار القسم والفترة، ومش مجرد رقم ثابت مع كل صف.",
        "steps": [
          {
            "title": "عدد السجلات",
            "copy": "Modeling → New measure. اكتبي Assessment Count باستخدام COUNTROWS، وضيفيها إلى Card.",
            "code": "Assessment Count =\nCOUNTROWS('EvaluationScores_2026_H1')"
          },
          {
            "title": "عدد الموظفين",
            "copy": "اعملي Employee Count باستخدام DISTINCTCOUNT على Employees[EmployeeID]، وضيفيها إلى Card.",
            "code": "Employee Count =\nDISTINCTCOUNT(Employees[EmployeeID])"
          },
          {
            "title": "جربي الفلتر",
            "copy": "غيري Directorate وDepartment. لازم البطاقات تتفاعل مع نطاق البيانات."
          }
        ],
        "callout": "عدد الموظفين في جدول Employees مش هو نفسه عدد الموظفين اللي عندهم تقييم مكتمل."
      },
      {
        "name": "Manager",
        "title": "نحسب تقييم المدير فقط",
        "lead": "مصادر التقييم Self وManager وUpward مختلفة، واليوم بنركز على Manager.",
        "steps": [
          {
            "title": "متوسط العلامات",
            "copy": "جربي AVERAGE على KPIScore، وفكري شو بصير لو خلطنا مصادر التقييم الثلاثة."
          },
          {
            "title": "نخصص الحساب",
            "copy": "استخدمي CALCULATE لعزل Manager، وبعدها ضيفي Manager KPI Average إلى Card.",
            "code": "Manager KPI Average =\nCALCULATE(\n    AVERAGE('EvaluationScores_2026_H1'[KPIScore]),\n    'EvaluationScores_2026_H1'[AssessmentSource] = \"Manager\"\n)"
          },
          {
            "title": "على مستوى القسم",
            "copy": "اعملي Matrix مع DepartmentName في Rows وManager KPI Average في Values."
          }
        ],
        "callout": "متوسط KPI Score من Manager مختلف عن النتيجة الموزونة النهائية لكل موظف."
      },
      {
        "name": "الأوزان",
        "title": "نحسب نتيجة الموظف الموزونة",
        "lead": "نحسب درجة كل Objective من متوسط KPIs التابعة له، ثم نضربها بوزن الهدف.",
        "steps": [
          {
            "title": "درجة الهدف",
            "copy": "نحدد KPIs المطلوبة للهدف ونحسب متوسط درجات Manager لهذا الهدف في الربع المختار."
          },
          {
            "title": "الوزن مرة واحدة",
            "copy": "نتعلم كيف SUMX تمشي على Objectives، وكيف DIVIDE تحول الوزن من 30 إلى 0.30 قبل الضرب."
          },
          {
            "title": "النتيجة النهائية",
            "copy": "نجمع مساهمات Objectives المكتملة، ونجرب النتيجة على موظف واحد قبل عرض القسم."
          }
        ],
        "callout": "إذا تقييم KPI مطلوب مش موجود، ما بنعتبره صفر ولا بنعرض نتيجة نهائية كأنها مكتملة."
      },
      {
        "name": "نختبر",
        "title": "شو لو في تقييم ناقص؟",
        "lead": "قبل اعتماد الأرقام، لازم نتأكد إذا كل KPI مطلوب إله تقييم.",
        "steps": [
          {
            "title": "راجعي الموظف",
            "copy": "اختاري موظفا وجربي مقارنة Manager KPI Average بالنتيجة الموزونة."
          },
          {
            "title": "BLANK مش Zero",
            "copy": "التقييم غير الموجود يخلّي النتيجة النهائية غير مكتملة. الدرجة الصفرية لو موجودة فعلا هي حالة مختلفة."
          },
          {
            "title": "ثبتي الفترة",
            "copy": "خلي اختيار الربع واحد حتى ما نخلط تقييمين لنفس KPI."
          }
        ],
        "callout": "دقة الحساب شرط قبل ما نحطه على Dashboard."
      },
      {
        "name": "أول Dashboard",
        "title": "نبني Performance Overview",
        "lead": "نجهز صفحة تنفيذية مرتبة، فيها أهم المؤشرات ورسمة واحدة وفلاتر سهلة.",
        "steps": [
          {
            "title": "أربع بطاقات",
            "copy": "ضيفي Employee Count، وManager Assessment Count، وManager KPI Average، وManager Weighted Score (Complete)."
          },
          {
            "title": "رسم الأقسام",
            "copy": "اعملي Bar Chart باستخدام DepartmentName وManager KPI Average."
          },
          {
            "title": "الفلاتر",
            "copy": "ضيفي DirectorateName وDepartmentName وCalendar[QuarterLabel]. وخلي 2026-Q2 محدد."
          },
          {
            "title": "التنسيق",
            "copy": "سمي الصفحة Performance Overview، ورتبي البطاقات أعلى التقرير مع ألوان هادئة ومسافات واضحة."
          }
        ],
        "callout": "النتيجة الموزونة على مستوى القسم هي متوسط نتائج الموظفين المكتملة، مش مجموع درجاتهم."
      },
      {
        "name": "دورك",
        "title": "هلا اعملي Visual لحالك",
        "lead": "جربي تعملي Visual باستخدام Measure تعلمناها، من غير ما يعيد المدرب كل خطوة.",
        "steps": [
          {
            "title": "ابني الرسم",
            "copy": "اختاري Clustered Bar Chart. ضعي DepartmentName على Y-axis وManager KPI Average على X-axis."
          },
          {
            "title": "اختبريه",
            "copy": "اختاري مديرية أو قسم مختلف، وجربي Quarter ثانية، وراقبي تغير الأرقام."
          },
          {
            "title": "احفظي شغلك",
            "copy": "Save على نفس HR_Performance_Intelligence.pbix. بنرجع له باليوم السادس مع Filter Context وCALCULATE."
          }
        ],
        "callout": "هدف اليوم: أول Dashboard شغالة وحساباتها واضحة."
      }
    ]
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
      "ننشر التقرير عند توفر الحساب والصلاحيات المناسبة",
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
      "استيراد بيانات تقييم جديدة وتنظيفها",
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
  return (day.resources || []).filter(resource => resource.audience !== `trainer` && (day.id === 1 || (resource.audience === `learner` && (/\.csv(?:[?#]|$)/i.test(resource.url || ``) || (day.id === 4 && /\.zip(?:[?#]|$)/i.test(resource.url || ``)) || (day.id === 5 && resource.type === `WEB` && resource.url === `week1/day5/web/Score_Lab.html`) || (day.id === 5 && resource.type === `PBIX` && resource.stage === `backup` && resource.url === `https://drive.google.com/file/d/1muj3R4SHlKplnOGoOElSuPfk-uShvBFT/view?usp=drivesdk`)))));
}
