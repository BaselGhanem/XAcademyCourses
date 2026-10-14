// Course223 — Mariam private training. Day 01 materials ready; remaining days proposed.
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
    id: 2,
    date: `2026-10-18`,
    weekday: `الأحد`,
    ready: true,
    phase: `CLEAN`,
    title: `Trust Your Workforce Data`,
    titleAr: `ليش الرقم غلط؟ ننظف البيانات`,
    hook: `اختلاف اسم الفئة المهنية وتكرار السجل والتاريخ غير الصحيح قد يعطي ارقاما مضللة`,
    mission: `بناء خطوات تنظيف قابلة للتحديث مع التمييز بين الخطا والبيانات المفقودة فعلا`,
    topics: [
      `Power Query`,
      `Data Types`,
      `Trim / Clean`,
      `Replace Values`,
      `Nulls / Errors`,
      `Duplicates`,
      `Applied Steps`
    ],
    build: [
      `نربط Workforce_10000_Dirty.csv من Text/CSV ونختار Transform Data، الملف فيه 10120 صف و10000 موظف فريد`,
      `نطبق Trim وClean على FacilityName وCadre، ونوحد Nursng الى Nursing وMedical Staff الى Medical`,
      `نحول SnapshotDate الى Date وFTE الى Decimal، ونعوض الاخطاء بـ null بدون حذف الموظفين، والقسم المفقود Unassigned`,
      `نتاكد ان الملف شهر واحد والنسخ المكررة متطابقة، ثم Remove Duplicates على EmployeeID؛ النتيجة 10000 صف`,
      `Close & Apply، نبني بطاقة عدد فريد ورسم افقي وفلتر؛ North يساوي 2750 وNursing يساوي 4936`,
      `نراجع Applied Steps ونحفظ Day02_Cleaning.pbix، وبعدها نجرب ملف التمرين المستقل`
    ],
    challenge: `نجرب ملف مستقل فيه 1010 صف، نوحد المسميات ونراجع التكرار ونوصل 1000 صف، ونشرح سبب خطوتين`,
    deliverable: `جدول نظيف وسجل واضح للاخطاء وخطوات معالجتها`,
    resources: [
      {name:`Day02_Complete.zip`,type:`ZIP`,url:`week1/day2/downloads/Day02_Complete.zip`,note:`البيانات والتمرين والدليل ومرجع التحقق`},
      {name:`Workforce_10000_Dirty.csv`,type:`CSV`,url:`week1/day2/data/Workforce_10000_Dirty.csv`,note:`التطبيق: 10120 صف قبل التنظيف، 10000 موظف فريد`},
      {name:`Day02_Guide.html`,type:`Guide`,url:`week1/day2/web/Day02_Guide.html`,note:`التنظيف خطوة بخطوة`},
      {name:`Practice_1000_Dirty.csv`,type:`CSV`,url:`week1/day2/data/Practice_1000_Dirty.csv`,note:`ملف مستقل للتمرين: 1010 صف قبل التنظيف`},
      {name:`Day02_Challenge.html`,type:`Challenge`,url:`week1/day2/web/Day02_Challenge.html`,note:`تمرين مع قائمة متابعة`},
      {name:`Day02_Reference.html`,type:`Guide`,url:`week1/day2/web/Day02_Reference.html`,note:`ارقام التحقق وروابط ملفات النتيجة، نفتحها بعد المحاولة`},
      {name:`Day02_Dictionary.html`,type:`Guide`,url:`week1/day2/web/Day02_Dictionary.html`,note:`الحقول وقواعد التعامل مع القيم الناقصة`}
    ],
    requiredFiles: [
      {
        name: `Workforce_Monthly_Dirty.csv`,
        type: `CSV`,
        note: `نسخة تدريبية تحتوي اخطاء متعمدة`
      },
      {
        name: `Day02_Cleaning_Checklist`,
        type: `Guide`,
        note: `قواعد التنظيف وارقام التحقق`
      }
    ]
  },
  {
    id: 3,
    date: `2026-10-20`,
    weekday: `الثلاثاء`,
    ready: false,
    phase: `AUTOMATE`,
    title: `Refresh Instead of Copying`,
    titleAr: `تجميع التقارير الشهرية تلقائيا`,
    hook: `كل شهر يصل ملف جديد وتبدأ عملية النسخ والدمج من جديد`,
    mission: `تجميع الملفات الشهرية وربطها بالقوائم المرجعية لتحديث التقرير دون تكرار العمل`,
    topics: [
      `Folder Connector`,
      `Combine Files`,
      `Append`,
      `Merge`,
      `Expand`,
      `Reference / Duplicate`,
      `Refresh`
    ],
    build: [
      `تجميع ملفات الاشهر من مجلد واحد`,
      `الاحتفاظ باسم الملف المصدر`,
      `فحص ثبات الحقول بين الملفات`,
      `دمج وصف المنشاة والفئة المهنية`,
      `فحص عدد الصفوف بعد الدمج`,
      `اضافة شهر جديد واثبات عمل التحديث`
    ],
    challenge: `اضيفي ملف شهر جديد وحدثي التقرير دون نسخ صفوف او تعديل خطوات التحويل`,
    deliverable: `عملية تجميع شهرية قابلة للتحديث مع فحص للبيانات الجديدة`,
    resources: [

    ],
    requiredFiles: [
      {
        name: `Monthly_Workforce_Files`,
        type: `CSV`,
        note: `ملفات متوافقة الاشهر ومفاتيح موحدة`
      },
      {
        name: `Facility_and_Cadre_Masters.xlsx`,
        type: `Excel`,
        note: `القوائم المرجعية`
      },
      {
        name: `New_Month_Refresh_Proof`,
        type: `CSV`,
        note: `شهر اضافي لاختبار التحديث`
      }
    ]
  },
  {
    id: 4,
    date: `2026-10-22`,
    weekday: `الخميس`,
    ready: false,
    phase: `MODEL`,
    title: `Model Workforce Correctly`,
    titleAr: `بناء نموذج بيانات صحيح`,
    hook: `دمج كل الجداول في جدول واحد قد يكرر الخطة او عدد الموظفين`,
    mission: `فصل اللقطات الشهرية وخطة الاحتياج عن الجداول الوصفية وبناء علاقات صحيحة`,
    topics: [
      `Fact / Dimension`,
      `Grain`,
      `Keys`,
      `One-to-Many`,
      `Single Filter Direction`,
      `Star Schema`,
      `Date Table`
    ],
    build: [
      `تحديد مستوى التفاصيل لكل جدول`,
      `فحص المعرفات الفريدة في الجداول الوصفية`,
      `بناء جدول تاريخ يغطي فترة البيانات`,
      `ربط بيانات القوى العاملة والخطة بالابعاد المشتركة`,
      `تجنب العلاقة المباشرة بين جدولي الوقائع`,
      `اختبار فلاتر المنشاة والقسم والفئة والشهر`
    ],
    challenge: `اثبتي ان الفلاتر تصل للجدول الصحيح دون مضاعفة عدد الموظفين او قيمة الخطة`,
    deliverable: `نموذج نجمي واضح مع قاموس للمفاتيح ومستوى التفاصيل`,
    resources: [

    ],
    requiredFiles: [
      {
        name: `Workforce_Model.xlsx`,
        type: `Excel`,
        note: `اللقطات والخطة والابعاد المشتركة`
      },
      {
        name: `Day04_Model_Checklist`,
        type: `Guide`,
        note: `فحص المفاتيح والعلاقات والفلاتر`
      }
    ]
  },
  {
    id: 5,
    date: `2026-10-25`,
    weekday: `الأحد`,
    ready: false,
    phase: `MEASURE`,
    title: `Measure Staffing and Coverage`,
    titleAr: `حساب العدد والتغطية والعجز`,
    hook: `عدد الموظفين وحده لا يوضح حجم التغطية مقارنة بالاحتياج`,
    mission: `كتابة مقاييس اساسية للموظفين ومكافئ الدوام الكامل والاحتياج ونسبة التغطية`,
    topics: [
      `Measure / Column`,
      `DISTINCTCOUNT`,
      `SUM`,
      `COUNTROWS`,
      `DIVIDE`,
      `FTE`,
      `KPI Cards`,
      `Matrix`
    ],
    build: [
      `استخدام شهر واحد في التطبيق الاول`,
      `حساب عدد الموظفين الفريد ومجموع مكافئ الدوام الكامل`,
      `حساب الاحتياج من جدول الخطة لنفس الشهر والابعاد`,
      `حساب العجز بوحدات متطابقة`,
      `حساب التغطية من اجمالي الفعلي مقسوما على اجمالي المخطط`,
      `بناء البطاقات ومصفوفة مقارنة المنشات`
    ],
    challenge: `نقارن منشاتين ونراجع العدد والتغطية يدويا، ثم نشرح الفرق بين عدد الموظفين ومكافئ الدوام الكامل`,
    deliverable: `صفحة مؤشرات موثقة التعريف وصحيحة الحساب لشهر واحد`,
    resources: [

    ],
    requiredFiles: [
      {
        name: `Day05_Measures_and_Checks`,
        type: `Guide`,
        note: `تعريفات المقاييس ونتائج مرجعية`
      },
      {
        name: `Day04_Checkpoint`,
        type: `PBIX`,
        note: `نسخة متابعة من النموذج بعد تجهيزها والتحقق منها`
      }
    ]
  },
  {
    id: 6,
    date: `2026-10-27`,
    weekday: `الثلاثاء`,
    ready: false,
    phase: `CONTEXT`,
    title: `Read the Latest Snapshot`,
    titleAr: `فهم الفلاتر واللقطات الشهرية`,
    hook: `جمع موظفي يناير وفبراير يعطي حجما مضللا للقوى العاملة عند عرض فترة متعددة الاشهر`,
    mission: `التحكم بسياق الفلاتر وعرض لقطة شهرية مشتركة واضحة عند اختيار عدة اشهر`,
    topics: [
      `Filter Context`,
      `CALCULATE`,
      `REMOVEFILTERS`,
      `Latest Snapshot`,
      `Contribution %`,
      `Edit Interactions`
    ],
    build: [
      `مراقبة تغير القياس مع الفلاتر`,
      `تحديد اخر شهر مشترك مكتمل ضمن الفترة المختارة`,
      `حساب الموظفين والخطة لذلك الشهر نفسه`,
      `عرض تاريخ اللقطة المستخدمة بجانب المؤشرات`,
      `قياس مساهمة الفئات ضمن الفلاتر المطلوبة`,
      `اختبار تفاعل الرسوم مع البطاقات`
    ],
    challenge: `نختار ثلاثة اشهر واثبتي ان البطاقة تعرض لقطة واحدة، بينما الاتجاه يعرض كل شهر مستقلا`,
    deliverable: `مقاييس للقطة الشهرية تمنع جمع الارصدة عبر الزمن وتوضح تاريخها`,
    resources: [

    ],
    requiredFiles: [
      {
        name: `Day06_Snapshot_Context_Lab`,
        type: `Guide`,
        note: `سيناريوهات الفلاتر والفترات الناقصة`
      },
      {
        name: `Day05_Checkpoint`,
        type: `PBIX`,
        note: `نسخة متابعة بعد تجهيزها والتحقق منها`
      }
    ]
  },
  {
    id: 7,
    date: `2026-10-29`,
    weekday: `الخميس`,
    ready: false,
    phase: `COMPARE`,
    title: `Compare Workforce Over Time`,
    titleAr: `مقارنة التغير الشهري والسنوي`,
    hook: `ارتفاع العدد لا يوضح وحده اين حدث التغير او هل تحسنت التغطية`,
    mission: `بناء مقارنات شهرية وسنوية عادلة على نفس تعريفات المؤشرات`,
    topics: [
      `Date Table`,
      `Previous Month`,
      `Previous Year`,
      `MoM / YoY`,
      `Percentage Points`,
      `Missing Periods`,
      `Sorting`
    ],
    build: [
      `مقارنة اللقطة الحالية بالشهر السابق المطابق`,
      `مقارنة نفس الشهر بالسنة السابقة`,
      `حساب تغير العدد وتغير التغطية`,
      `تمييز النسبة المئوية عن النقاط المئوية`,
      `ترك المقارنة غير متاحة عند غياب الفترة المرجعية`,
      `بناء اتجاه شهري ومصفوفة للفئات والمنشات`
    ],
    challenge: `نشرح تغير التغطية في منشاة باستخدام الفترة الصحيحة، دون جمع اعداد الموظفين منذ بداية السنة`,
    deliverable: `صفحة اتجاهات ومقارنات مع تاريخ واضح وقواعد للفترات المفقودة`,
    resources: [

    ],
    requiredFiles: [
      {
        name: `Workforce_Comparison_History`,
        type: `CSV`,
        note: `تاريخ تدريبي يغطي فترات المقارنة`
      },
      {
        name: `Day07_Time_Comparison_Guide`,
        type: `Guide`,
        note: `صيغ المقارنة وفحوص النتائج`
      }
    ]
  },
  {
    id: 8,
    date: `2026-11-01`,
    weekday: `الأحد`,
    ready: false,
    phase: `DESIGN`,
    title: `Build the Department Dashboard`,
    titleAr: `تصميم داشبورد للقسم`,
    hook: `كثرة الرسوم قد تخفي المنشات والفئات التي تحتاج متابعة`,
    mission: `تنظيم التقرير في ملخص اداري وصفحة تفاصيل تساعد مستخدم القسم على الوصول للسؤال المطلوب`,
    topics: [
      `Visual Hierarchy`,
      `Chart Selection`,
      `Conditional Formatting`,
      `Drillthrough`,
      `Tooltips`,
      `Bookmarks / Buttons`,
      `Edit Interactions`
    ],
    build: [
      `تحديد ترتيب الاسئلة والمؤشرات`,
      `بناء ملخص اداري واضح`,
      `تصميم صفحة تفاصيل المنشاة`,
      `اضافة الانتقال للتفاصيل والتلميحات`,
      `استخدام تنسيق شرطي مرتبط بتعريف المؤشر`,
      `اختبار الفلاتر والتنقل ووضوح النص`
    ],
    challenge: `ننتقل من منشاة تحتاج متابعة الى تفاصيل فئاتها دون اعادة اختيار الفلاتر`,
    deliverable: `تقرير للقسم بملخص اداري وتفاصيل قابلة للاستكشاف`,
    resources: [

    ],
    requiredFiles: [
      {
        name: `Day08_Report_Blueprint`,
        type: `Guide`,
        note: `مخطط الصفحات وقواعد التنسيق`
      },
      {
        name: `Day07_Checkpoint`,
        type: `PBIX`,
        note: `نسخة متابعة بعد تجهيزها والتحقق منها`
      }
    ]
  },
  {
    id: 9,
    date: `2026-11-03`,
    weekday: `الثلاثاء`,
    ready: false,
    phase: `FOLLOW UP`,
    title: `Track Work and Explain Findings`,
    titleAr: `متابعة الاعمال وشرح النتائج`,
    hook: `متابعة التقارير والطلبات جزء من التطبيق، الى جانب قراءة مؤشرات القوى العاملة`,
    mission: `اضافة صفحة لمتابعة طلبات العمل ثم تحويل النتائج الى استنتاجات مدعومة بارقام`,
    topics: [
      `Request Grain`,
      `Status / Due Date`,
      `Overdue Open Requests`,
      `Cycle Time`,
      `On-Time %`,
      `Operational Slicers`,
      `Storytelling`
    ],
    build: [
      `ربط سجل الطلبات بالابعاد المناسبة`,
      `تمييز الطلبات المفتوحة والمنجزة والملغاة`,
      `حساب المتاخر المفتوح حسب تاريخ مرجعي واضح`,
      `حساب مدة انجاز الطلبات المكتملة فقط`,
      `مقارنة الالتزام باستخدام نفس تعريف المهلة`,
      `كتابة ثلاثة استنتاجات واجراء متابعة مرتبط بها`
    ],
    challenge: `نحدد طلبات المتابعة ذات الاولوية ونفسر نتيجة واحدة في القوى العاملة دون افتراض سبب لم تثبته البيانات`,
    deliverable: `صفحة متابعة اعمال مع استنتاجات وارقام واجراءات مقترحة`,
    resources: [

    ],
    requiredFiles: [
      {
        name: `Department_Followup_Requests.xlsx`,
        type: `Excel`,
        note: `سجل طلبات وتقارير افتراضي مع المواعيد والحالات`
      },
      {
        name: `Day09_Insights_and_Actions`,
        type: `Guide`,
        note: `قالب الاستنتاج والدليل واجراء المتابعة`
      }
    ]
  },
  {
    id: 10,
    date: `2026-11-05`,
    weekday: `الخميس`,
    ready: false,
    phase: `DELIVER`,
    title: `Refresh Validate and Handover`,
    titleAr: `مشروع نهائي وتحديث وتسليم`,
    hook: `قيمة التقرير تظهر عندما يصل شهر جديد ونقدر نحدثه ونتحقق منه بشكل مستقل`,
    mission: `تنفيذ دورة العمل كاملة وتقديم داشبورد تفاعلي مع تعليمات تحديث وتشغيل`,
    topics: [
      `Refresh`,
      `Data Validation`,
      `Reconciliation`,
      `Model Check`,
      `Power BI Service Overview`,
      `Workspace / Sharing`,
      `Scheduled Refresh`,
      `RLS Overview`,
      `Handover`
    ],
    build: [
      `اضافة بيانات شهر جديد وتحديث التقرير`,
      `مراجعة الصفوف والمفاتيح والتواريخ`,
      `مطابقة مؤشرات مختارة مع ملفات المصدر`,
      `اختبار الفلاتر والتنقل والمقارنات`,
      `شرح متطلبات النشر والتحديث وفق بيئة العمل المتاحة`,
      `عرض النتائج وتسليم قائمة تشغيل وتحديث`
    ],
    challenge: `نفذي التحديث من البداية للنهاية، ثم نقدم ثلاثة استنتاجات موثقة واجراء متابعة واحدا`,
    deliverable: `المشروع النهائي مع تقرير تحقق ودليل تشغيل مختصر`,
    resources: [

    ],
    requiredFiles: [
      {
        name: `Final_New_Month_Pack`,
        type: `ZIP`,
        note: `ملفات شهر جديد لاختبار المشروع النهائي`
      },
      {
        name: `Final_Validation_and_Handover`,
        type: `Guide`,
        note: `قائمة التحقق والتسليم`
      }
    ]
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
