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
    "titleAr": "بناء قاعدة مشروع اداء الموظفين",
    "hook": "One employee has several objectives. Each objective has several KPIs. Each KPI can be evaluated more than once. How do we connect the files without multiplying scores or weights?",
    "mission": "Build the reusable data model for the same HR Performance Intelligence report we will develop through Day 10. Connect employee, objective, KPI and assessment data correctly.",
    "topics": [
      "Source grain",
      "Primary & foreign keys",
      "Fact vs dimension",
      "Snowflake / Star schema",
      "One-to-many relationships",
      "Single filter direction",
      "Calendar dimension",
      "Power Query Reference"
    ],
    "build": [
      "Unzip the project starter and import the eight CSV tables with Transform Data.",
      "Set IDs to Text, percentages and scores to numeric types, and assessment dates to Date.",
      "Identify one unique primary key for each lookup table and confirm what one row represents.",
      "Connect Directorates → Departments → Employees → Objectives → KPIs → EvaluationScores, plus StrategicPriorities → Objectives.",
      "Connect Calendar[Date] to EvaluationScores_2026_H1[AssessmentDate], set all relationships to single direction.",
      "Use a referenced Objectives query to audit total objective weights by employee and year.",
      "Build a small validation matrix and check that Directorate, Department, Quarter and AssessmentSource filter the assessments."
    ],
    "challenge": "In your own Power BI report, build a Matrix of assessments by department, add filters for directorate, quarter and assessment source, and explain one example where repeating a weight would create a wrong result.",
    "deliverable": "Save HR_Performance_Intelligence.pbix with seven validated one-to-many relationships and a working model-validation report page.",
    "resources": [
      {
        "name": "Day04_Project_Starter.zip",
        "type": "ZIP",
        "url": "week1/day4/data/Day04_Project_Starter.zip",
        "note": "Download once · unzip to access eight linked CSV files",
        "stage": "starter",
        "audience": "learner"
      }
    ],
    "learningScenes": [
      [
        "THE CASE",
        "ONE PROJECT"
      ],
      [
        "SOURCE",
        "GRAIN"
      ],
      [
        "KEYS",
        "TYPES"
      ],
      [
        "ONE",
        "MANY"
      ],
      [
        "DATES",
        "FILTERS"
      ],
      [
        "100%",
        "WEIGHT AUDIT"
      ],
      [
        "TEST",
        "SAVE"
      ]
    ],
    "learningSections": [
      {
        "name": "Start the project",
        "title": "One project. Seven sessions.",
        "lead": "The employee performance dashboard starts here and grows every session through Day 10. Today we create the foundation, not a disposable practice report.",
        "files": "starter",
        "steps": [
          {
            "title": "Download and extract",
            "copy": "Download the Day04 Project Starter ZIP and extract it. Keep the two folders together in a stable location."
          },
          {
            "title": "Create the Power BI file",
            "copy": "Open Power BI Desktop, create a blank report and save it as HR_Performance_Intelligence.pbix."
          },
          {
            "title": "Start with a question",
            "copy": "Why can one employee have four objectives, each with three KPIs, yet only one employee record?"
          }
        ],
        "callout": "We will keep building this same PBIX over the remaining days."
      },
      {
        "name": "Learn the business grain",
        "title": "What does one row mean?",
        "lead": "Before making relationships, identify the level of detail in each table.",
        "steps": [
          {
            "title": "Employee",
            "copy": "One row identifies one employee, not one objective or one assessment."
          },
          {
            "title": "Objective",
            "copy": "One row defines one employee objective for one year. ObjectiveWeightPct belongs here."
          },
          {
            "title": "KPI",
            "copy": "One row defines one KPI under one objective. KPIs do not carry individual weights."
          },
          {
            "title": "Assessment",
            "copy": "One row is a KPI assessment for a specific round and assessment source: Self, Manager or Upward."
          }
        ],
        "callout": "Never copy ObjectiveWeightPct to every KPI score row and then sum it."
      },
      {
        "name": "Import and inspect",
        "title": "Eight CSVs. Clear data types.",
        "lead": "Connect every source as a separate Power Query table, then correct its data types.",
        "steps": [
          {
            "title": "Import the eight tables",
            "copy": "Home → Get Data → Text/CSV → Transform Data. Import Directorates, Departments, Employees, StrategicPriorities, Objectives, KPIs, Calendar and EvaluationScores_2026_H1."
          },
          {
            "title": "Keep business keys as text",
            "copy": "Set *ID columns to Text. For example, EMP0001 is an identifier, not a numeric measure."
          },
          {
            "title": "Check dates and numbers",
            "copy": "Make ObjectiveWeightPct and KPIScore numeric, and Calendar[Date] and AssessmentDate actual Date types."
          },
          {
            "title": "Load the model",
            "copy": "Choose Close & Apply; confirm each table has its own field list."
          }
        ],
        "callout": "A correct data model starts with trustworthy keys and data types."
      },
      {
        "name": "Create relationships",
        "title": "The many-to-one logic",
        "lead": "Build a controlled filter path from organizational hierarchy to individual assessments.",
        "steps": [
          {
            "title": "Organization",
            "copy": "Directorates[DirectorateID] → Departments[DirectorateID] → Employees[DepartmentID]. Configure one-to-many and Single direction."
          },
          {
            "title": "Performance hierarchy",
            "copy": "Employees[EmployeeID] → Objectives[EmployeeID] → KPIs[ObjectiveID] → EvaluationScores_2026_H1[KPIID]."
          },
          {
            "title": "Strategic link",
            "copy": "Connect StrategicPriorities[StrategicPriorityID] to Objectives[StrategicPriorityID]."
          },
          {
            "title": "Check each line",
            "copy": "Every relationship should be Active, one-to-many and single-direction. If Power BI suggests many-to-many, investigate the keys first."
          }
        ],
        "callout": "Our starting schema has normalized dimensions in a snowflake chain, feeding one assessment fact. We will learn where a true star schema differs."
      },
      {
        "name": "Give the model time",
        "title": "Calendar + filter direction",
        "lead": "A date table makes the model ready for trend analysis later in the course.",
        "steps": [
          {
            "title": "Create the date relationship",
            "copy": "Connect Calendar[Date] (one) to EvaluationScores_2026_H1[AssessmentDate] (many)."
          },
          {
            "title": "Mark the date table",
            "copy": "With Calendar selected: Table tools → Mark as date table → choose Date."
          },
          {
            "title": "Avoid an ambiguous employee role",
            "copy": "EvaluatorID identifies the assessor, while EmployeeID on Objectives identifies the objective owner. Keep these roles separate for now."
          },
          {
            "title": "Test filtering",
            "copy": "Try Calendar[QuarterLabel] and AssessmentSource separately and observe which assessment records remain."
          }
        ],
        "callout": "Assessment date and objective due date are different business events."
      },
      {
        "name": "Solve a hidden problem",
        "title": "The weight multiplication trap",
        "lead": "A manager notices a weight total that looks three times too high. Investigate the reason at the correct grain.",
        "steps": [
          {
            "title": "Preserve the original",
            "copy": "In Power Query, right-click Objectives and create a referenced query called Objective_Weight_Audit."
          },
          {
            "title": "Audit the weights",
            "copy": "Group by EmployeeID and PlanYear. Sum ObjectiveWeightPct into TotalObjectiveWeight."
          },
          {
            "title": "Explain the trap",
            "copy": "Every Objective has multiple KPIs. Repeating its weight per KPI would incorrectly inflate the total."
          },
          {
            "title": "Keep your model tidy",
            "copy": "Use the audit as a temporary validation query. Disable its load when the check is complete."
          }
        ],
        "callout": "Objective weights are applied once per objective; actual weighted performance calculations start on Day 5."
      },
      {
        "name": "Your model test",
        "title": "Verify. Save. Continue.",
        "lead": "Use report visuals to prove the relationships work before creating any DAX measure.",
        "steps": [
          {
            "title": "Build a matrix",
            "copy": "Matrix rows: DirectorateName and DepartmentName. Values: Count of AssessmentID."
          },
          {
            "title": "Add slicers",
            "copy": "Create slicers for AssessmentSource and Calendar[QuarterLabel]. Check that counts change correctly."
          },
          {
            "title": "Independent challenge",
            "copy": "Explain why Upward has a different record volume from Self; do not average the assessment sources together."
          },
          {
            "title": "Keep your finished work",
            "copy": "Save HR_Performance_Intelligence.pbix. Keep all source CSV files in their current location; the same report continues on Day 5."
          }
        ],
        "callout": "Final checkpoint: connected model, correct keys, stable file paths and one saved PBIX."
      }
    ],
    "teachingStatus": "prepared"
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
  return (day.resources || []).filter(resource => resource.audience !== `trainer` && (day.id === 1 || (resource.audience === `learner` && (/\.csv(?:[?#]|$)/i.test(resource.url || ``) || (day.id === 4 && /\.zip(?:[?#]|$)/i.test(resource.url || ``))))));
}
