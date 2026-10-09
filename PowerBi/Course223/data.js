const COURSE_CONFIG = {
  title: 'Power BI Specialist',
  subtitle: 'From Data to Decision',
  academy: 'X Academy',
  trainer: 'Basel Ghanem',
  trainerTitle: 'Senior Sales Analyst • Power BI & Excel Trainer',
  totalDays: 10,
  totalHours: 20,
  sessionHours: 2,
  portalPassword: 'PowerBI',
  powerBiDownloadUrl: 'https://www.microsoft.com/en-us/power-platform/products/power-bi/downloads',
  liveUrl: 'https://teams.microsoft.com/meet/384079113607436?p=lgLLd5ReKE51ncdmN8',
  dashboardPreviewUrl: 'https://app.powerbi.com/view?r=eyJrIjoiMWUwODU5MjEtMjQ2OS00OTM0LWJmNWMtY2Q0MjY5ZDg1NGVmIiwidCI6IjhiNjAyNDRiLTFiZGQtNDk4YS04ODY3LTljNzJhNGQ5NzFhMCIsImMiOjl9',
  instructorImage: 'https://raw.githubusercontent.com/BaselGhanem/Portfolio/refs/heads/main/BaselGhanem.jpg',
  contact: {
    email: 'Xacademy2@outlook.com',
    phone: '+962 78 45 87 87',
    location: 'عمّان - الأردن'
  }
};

const DAYS = [
  {
    id: 1,
    date: '2026-09-20',
    weekday: 'الأحد',
    phase: 'CONNECT',
    title: 'Connect Everything',
    titleAr: 'وصّل كل شيء',
    hook: 'أول يوم لك مع Nova: Sales، Workforce، Budget، Web وPDF... البيانات موجودة، لكن القصة موزعة في كل مكان.',
    mission: 'تعرّف على Nova أولاً، ثم ثبّت Power BI Desktop ووصل Excel وCSV وTXT وPDF وWeb لتبدأ أول نسخة من Business Performance 360.',
    topics: ['Nova Company Case', 'Power BI Desktop Installation', 'Get Data', 'Excel / CSV / Text', 'Web Connector', 'PDF Connector', 'ETL Concept', 'Report / Data / Model Views', 'Card & Bar Chart', 'Slicer & Filters'],
    build: ['Open Nova Company Profile and understand the management challenge', 'Install & launch Power BI Desktop', 'Connect Nova Excel, CSV, TXT, PDF and Web sources', 'Understand Extract → Transform → Load', 'Tour the interface only after using it', 'Build Total Revenue Card', 'Build Revenue vs Target by Region', 'Add Channel Slicer and test interactions', 'Save Nova_Business_Performance_360_[Name].pbix'],
    challenge: 'الإدارة لا تريد Chart جميل فقط. ابدأ بالسؤال: أي Region أو Branch يحتاج انتباه أولاً؟',
    deliverable: 'أول نسخة من Nova Business Performance 360 + فهم واضح لـETL وواجهات Power BI الأساسية.',
    visualGuide: { image: 'concepts/assets/day1-etl-poster.png', title: 'Day 1 — Learner Visual Guide', note: 'رحلة الاتصال بالمصادر وETL وبناء أول تقرير' },
    resources: [
      { name: 'Meet Nova — Company Profile', type: 'WEB', url: 'week1/day1/web/Nova_Company_Profile.html', note: 'ابدأ من هنا: الشركة، الشعار، المنتجات، نموذج العمل والتحدي الإداري.' },
      { name: 'Day 01 — Nova Source Pack', type: 'ZIP', url: 'week1/day1/downloads/Day01_CONNECT_EVERYTHING.zip', note: 'Nova Product Master + Excel ETL Reference + 120K Sales CSV + Workforce TXT + Budget PDF + Challenge' },
      { name: 'Nova Branch Performance — Web Source', type: 'WEB', url: 'week1/day1/web/Branch_Performance.html', note: '4,000 صف تجمع Sales + Finance + Workforce indicators. استخدم الرابط مباشرة في Get Data > Web.' }
    ]
  },
  {
    id: 2,
    date: '2026-09-22',
    weekday: 'الثلاثاء',
    phase: 'CLEAN',
    title: 'Clean Data Like an Analyst',
    titleAr: 'نظّف البيانات كمحلل',
    hook: 'Nova عندها ملف Branch Daily Performance كبير يبدو مفيداً... لكنه مليان تواريخ مختلطة، Regions غير موحدة، Revenue ناقص، Headcount فيه أخطاء وRows مكررة.',
    mission: 'حوّل ملف Nova Branch Daily Performance غير الموثوق إلى Power Query pipeline نظيفة مع Grain واضح: Branch + Date.',
    topics: ['Power Query Editor', 'Data Types', 'Trim & Clean', 'Replace Values', 'Standardize Categories', 'Nulls', 'Duplicates', 'Errors', 'Applied Steps'],
    build: ['Confirm the intended grain: Branch ID + Date', 'Inspect Nova dirty data before touching it', 'Fix date and numeric data types', 'Trim & clean manager and category fields', 'Standardize Region and Channel labels', 'Handle missing Revenue / Cost / Headcount intentionally', 'Remove only true duplicate rows', 'Review Applied Steps and Refresh'],
    challenge: 'بعد تنظيف Branch Performance، نظّف Nova Customer Master باستخدام الـCleaning Checklist فقط، بدون recipe خطوة بخطوة.',
    deliverable: 'Nova Branch Daily Performance + Customer Master نظيفان، Grain واضح، وقابلان للـRefresh.',
    visualGuide: { image: 'concepts/assets/day2-learner-overview.svg', title: 'Day 2 — Learner Visual Guide', note: 'Power Query: تنظيف القيم والأنواع والأخطاء والتحقق' },
    resources: [
      { name: 'Day 02 — Nova Cleaning Lab', type: 'ZIP', url: 'week1/day2/downloads/Day02_CLEAN_DATA.zip', note: '50K logical Branch-Day rows + intentional bad duplicates + 8K Dirty Customers + Nova Cleaning Checklist' }
    ]
  },
  {
    id: 3,
    date: '2026-09-23',
    weekday: 'الأربعاء',
    phase: 'AUTOMATE',
    title: 'Stop Copying Files',
    titleAr: 'وقف Copy / Paste الشهري',
    hook: 'Nova تستلم ملف Sales جديد كل شهر. January، February، March... وApril بالطريق. هل سنعيد نفس الشغل كل شهر؟',
    mission: 'حوّل نفس Jan–Mar الذي استخدمناه في Day 1 من ملف consolidated إلى Folder pipeline شهرية، ثم Merge مع Masters وأثبت أن April يدخل بالـRefresh فقط.',
    topics: ['Folder Connector', 'Combine Files', 'Append Thinking', 'Merge Queries', 'Expand Columns', 'Reference vs Duplicate', 'Enable Load', 'Query Dependencies', 'Refresh'],
    build: ['Connect to Nova Monthly_Sales folder', 'Combine January–March', 'Keep Source File Name', 'Merge Nova Branch Master', 'Merge Customer Master', 'Merge Product Master', 'Load only the final analytical query', 'Drop April file and Refresh'],
    challenge: 'ابنِ العملية كاملة من Folder إلى Dataset موحد. النجاح الحقيقي: إضافة April بدون Copy/Paste أو تعديل يدوي.',
    deliverable: 'Nova monthly Sales pipeline قابلة للـRefresh وجاهزة للأشهر القادمة، مع Masters موحدة.',
    visualGuide: { image: 'concepts/assets/day3-learner-overview.svg', title: 'Day 3 — Learner Visual Guide', note: 'Folder Connector وCombine وAppend وMerge وRefresh' },
    resources: [
      { name: 'Day 03 — Nova Automation Pack', type: 'ZIP', url: 'week1/day3/downloads/Day03_STOP_COPYING_FILES_LEARNER.zip', note: 'نفس 120K Rows من Day 1، الآن Jan–Mar × 40K + April refresh proof + Branch/Customer/Product Masters' }
    ]
  },
  {
    id: 4,
    date: '2026-09-27',
    weekday: 'الأحد',
    phase: 'MODEL',
    title: 'Model the Business',
    titleAr: 'ابنِ نموذج البيانات',
    hook: 'البيانات صارت نظيفة وتتحدث تلقائياً… لكن الجداول ما زالت تحتاج Model واضح حتى تتكلم مع بعضها بدون أرقام مضللة.',
    mission: 'ثبّت Merge وAppend وFolder باستخدام Excel، ثم حوّل Nova Sales إلى Star Schema واضح: FactSales في الوسط وDimensions حوله.',
    topics: ['Merge vs Append Review', 'Excel Files from Folder', 'Fact vs Dimension', 'Grain', 'Relationships', 'Primary & Foreign Keys', 'One-to-Many', 'Filter Direction', 'Star Schema'],
    build: ['Review Merge = Add Columns', 'Review Append = Add Rows', 'Combine monthly Excel files from Folder and refresh May', 'Load FactSales + DimProduct + DimCustomer + DimBranch + DimDate', 'Define the grain of each table', 'Check unique keys in dimensions', 'Run Auto Detect and inspect what Power BI found', 'Manually connect DimCustomer[Customer Code] → FactSales[Customer ID]', 'Manually connect DimDate[Date] → FactSales[Order Date]', 'Confirm 1:* cardinality and single filter direction', 'Arrange the model as a Star Schema', 'Test slicers and confirm filters reach FactSales'],
    challenge: 'شغّل Auto Detect أولا وراجع ما اكتشفه Power BI بدل قبول كل شيء مباشرة. بعد ذلك أنشئ العلاقات الناقصة يدويا، خصوصا Customer Code ↔ Customer ID وDate ↔ Order Date، ثم اثبت أن كل Dimension تفلتر FactSales بشكل صحيح.',
    deliverable: 'Nova Star Schema نظيف من FactSales + 4 Dimensions، جاهز لبناء Measures في Day 5.',
    visualGuide: {
      image: 'concepts/assets/day4-learner-overview.webp',
      title: 'Day 4 — Learner Visual Guide',
      note: 'ملخص بصري للمتدرب يربط مراجعة Merge وAppend وFolder مع Fact vs Dimension والعلاقات وStar Schema واختبار النموذج.'
    },
    resources: [
      { name: 'Day 04 — Model the Business Lab', type: 'ZIP', url: 'week2/day4/downloads/Day04_MODEL_THE_BUSINESS.zip', note: 'Excel review for Merge / Append / Folder + May refresh proof + Nova Model Lab + relationship checklist' },
      { name: 'Day 04 — Learner Visual Guide', type: 'IMAGE', url: 'concepts/assets/day4-learner-overview.webp', note: 'الصورة المختصرة التي تلخص رحلة Day 4 للمتدرب من المراجعة حتى Star Schema.' },
      { name: 'Day 04 — Process Flow', type: 'FLOW', url: 'concepts/assets/day4-process-flow.svg', note: 'Review → Fact/Dimensions → Relationships → Star Schema → Test Filters → Ready for DAX' },
      { name: 'Day 04 — Concept Studio', type: 'WEB', url: 'concepts/index.html', note: 'Fact vs Dimension + Relationships + Star Schema' }
    ]
  },
  {
    id: 5,
    date: '2026-09-29',
    weekday: 'الثلاثاء',
    phase: 'MEASURE',
    title: 'Calculate & Visualize',
    titleAr: 'احسب وابنِ أول Report',
    hook: 'الـModel صار جاهز. اليوم سنحوّل الصفوف إلى KPIs، والـKPIs إلى أول Sales Overview حقيقي.',
    mission: 'أضف 3 Calculated Columns بسيطة داخل Power Query، ثم ابنِ Measures أساسية واستخدمها في KPIs وVisuals وSlicers.',
    topics: ['Power Query Custom Column', 'Gross Sales', 'Discount Amount', 'if...then...else', 'Measure vs Column', 'SUM', 'COUNTROWS', 'DISTINCTCOUNT', 'DIVIDE', 'KPI Cards', 'Line & Bar Charts', 'Slicers', 'Report Formatting'],
    build: ['Continue from Day 4 PBIX — no new dataset', 'Power Query: Gross Sales = Quantity × Unit Price', 'Power Query: Discount Amount = Gross Sales - Revenue', 'Power Query: Discount Status using if...then...else', 'Close & Apply', 'Create Total Revenue', 'Create Total Quantity', 'Create Transactions with COUNTROWS', 'Create Customers with DISTINCTCOUNT', 'Create Average Transaction Value with DIVIDE', 'Build 4 KPI Cards', 'Build Revenue Trend by Month and sort Month correctly', 'Build Revenue by Category', 'Build Top 10 Branches by Revenue', 'Build Discount Analysis', 'Add Month / Branch / Category Slicers', 'Format and align the report', 'Test filters and observe Measures changing'],
    challenge: 'ابنِ Sales Overview يحتوي 4 KPIs وTrend وCategory وBranch وDiscount Analysis و3 Slicers على الأقل، ثم اشرح لماذا نفس الـMeasures تغيرت بدون تعديل الـDAX.',
    deliverable: 'أول Nova Sales Overview فعلي: Power Query calculations + DAX Measures + KPIs + Charts + Slicers، جاهز لـFilter Context في Day 6.',
    visualGuide: { image: 'concepts/assets/day5-learner-overview.svg', title: 'Day 5 — Learner Visual Guide', note: 'Power Query Custom Column وDAX Measures وبناء التقرير' },
    resources: [
      { name: 'Day 05 — Calculate & Visualize Pack', type: 'ZIP', url: 'week2/day5/downloads/Day05_CALCULATE_VISUALIZE.zip', note: 'يتضمن Nova_Day05_Start.pbix كبداية موحدة من نهاية Day 4، ثم Power Query Lab + DAX Lab + Report Blueprint + Analyst Challenge' },
      { name: 'Day 05 — Concept Studio', type: 'WEB', url: 'concepts/index.html', note: 'Power Query Custom Column + Measure vs Column + Basic DAX Aggregations + DIVIDE' }
    ]
  },
  {
    id: 6,
    date: '2026-09-30',
    weekday: 'الأربعاء',
    phase: 'THINK',
    title: 'Context Changes Everything',
    titleAr: 'افهم السياق وسيطر على DAX',
    hook: 'بالأمس تغيرت نفس الـMeasure مع كل Slicer وVisual. اليوم سنفهم لماذا، ثم نتحكم بهذا السلوك بدل أن نكتفي بملاحظته.',
    mission: 'افهم Filter Context، واستخدم CALCULATE لإضافة Filter وREMOVEFILTERS لإزالة Filter محدد، ثم ابن Context Lab وتحكم بتفاعل الـVisuals.',
    topics: ['Day 5 Review', 'Filter Context', 'CALCULATE', 'REMOVEFILTERS', 'Category Contribution %', 'Cross Filtering', 'Edit Interactions'],
    build: ['Open the completed Day 5 PBIX reference', 'Prove that [Total Revenue] changes with Month / Region / Category without editing DAX', 'Define Filter Context as Measure + current filters = result', 'Create Discounted Revenue with CALCULATE', 'Create Full Price Revenue with CALCULATE', 'Create Retail Revenue using DimBranch[Channel]', 'Create Revenue All Categories with REMOVEFILTERS', 'Create Category Contribution % with DIVIDE', 'Build a Context Lab page with Cards + Region + Category Matrix + Trend', 'Use Month / Region / Category slicers', 'Test cross-filtering by clicking charts', 'Use Edit interactions and intentionally set one interaction to None', 'Explain the final result using Filter Context'],
    challenge: 'ابن Context Analysis من الملف المرجعي: Measures المطلوبة + 4 Cards + Category Contribution + Revenue by Region + 3 Slicers، ثم غير Interaction واحدة عمدا واشرح لماذا تغيرت كل نتيجة.',
    deliverable: 'Context Lab عملي يثبت فهم Filter Context وCALCULATE وREMOVEFILTERS وVisual Interactions، جاهز للانتقال إلى Time Intelligence في Day 7.',
    visualGuide: {
      image: 'concepts/assets/day6-learner-overview.webp',
      title: 'Day 6 — Learner Visual Guide',
      note: 'ملخص بصري لرحلة Day 6 من مراجعة Day 5 إلى Filter Context وCALCULATE وREMOVEFILTERS وContribution ثم Visual Interactions.'
    },
    resources: [
      { name: 'Day 06 — Context & CALCULATE Pack', type: 'ZIP', url: 'week2/day6/downloads/Day06_CONTEXT_AND_CALCULATE.zip', note: 'Completed Day 5 PBIX reference + Filter Context Lab + CALCULATE Measures + Context Report Blueprint + Analyst Challenge' },
      { name: 'Day 06 — Learner Visual Guide', type: 'IMAGE', url: 'concepts/assets/day6-learner-overview.webp', note: 'الصورة المختصرة التي تلخص رحلة Day 6 كاملة للمتدرب.' },
      { name: 'Day 06 — Process Flow', type: 'FLOW', url: 'concepts/assets/day6-process-flow.svg', note: 'Review → Filter Context → CALCULATE → REMOVEFILTERS → Contribution → Interactions → Context Lab' },
      { name: 'Day 06 — Concept Studio', type: 'WEB', url: 'concepts/index.html', note: 'Filter Context + CALCULATE + REMOVEFILTERS & Contribution + Visual Interactions' }
    ]
  },
  {
    id: 7,
    date: `2026-10-04`,
    weekday: `الأحد`,
    phase: `APPLY`,
    title: `Four Dashboards, Four Decisions`,
    titleAr: `أربع لوحات وأربع قرارات`,
    hook: `محمود للمبيعات، سمية للعمليات، هشام للمالية، وإيناس للموارد والتخطيط. نفس المهارات، وأسئلة تناسب عمل كل متدرب.`,
    mission: `ابدأ بمثال مشترك للمقارنة الشهرية، ثم ابن لوحة خاصة بدورك باستخدام البيانات والصيغ والتعليمات الجاهزة.`,
    topics: [`Date Table`, `Previous Month`, `MoM Growth %`, `Previous Year`, `YoY Growth %`, `YTD`, `KPI Cards`, `Line / Bar / Matrix`, `Slicers`, `Visual vs Page Filters`, `Conditional Formatting`, `Sorting`],
    build: [`Open Nova_Day07_START.pbix and Refresh`, `Use BASEL DEMO to compare March and April`, `Open your named page and learner guide`, `Build 4 KPI Cards`, `Apply time comparison measures`, `Build Actual vs Previous Year or Planned trend for your role`, `Build sorted Bar Chart and comparison Matrix`, `Add Year / Year Month / role-specific Slicers`, `Test page filters and visual filters`, `Apply conditional formatting`, `Validate one result with the trainer during class`, `Explain one finding and save your PBIX`],
    challenge: `كل متدرب يقدم استنتاجا واحدا وإجراء مرتبطا بدوره. نقاط تحقق بعد 15 و30 و45 دقيقة، ومساعدة مباشرة من المدرب عند التعطل.`,
    deliverable: `أربع لوحات: Sales / Operations / Finance / Workforce، مع مقارنة زمنية وفلاتر وأرقام قابلة للتحقق.`,
    visualGuide: { image: `concepts/assets/day7-learner-overview.webp`, title: `Day 7 — Learner Visual Guide`, note: `الأدوار الأربعة والمقارنة الزمنية وبناء اللوحة ونقاط التحقق.` },
    resources: [
      { name: `Day 07 — DAX Foundations`, type: `WEB`, url: `week3/day7/web/DAX_FOUNDATIONS.html`, note: `شرح الدوال الجديدة خطوة بخطوة مع أمثلة مبسطة وزر نسخ لكل صيغة` },
      { name: `Day 07 — START`, type: `PBIX`, url: `week3/day7/downloads/Nova_Day07_START.pbix`, note: `ملف البداية المباشر للمتدربين — البيانات مدمجة` },
      { name: `Mahmoud — Sales`, type: `WEB`, url: `week3/day7/web/MAHMOUD_SALES.html`, note: `إيراد ومقارنة ونمو وفئات وعملاء.` },
      { name: `Somaya — Operations`, type: `WEB`, url: `week3/day7/web/SOMAYA_OPERATIONS.html`, note: `طلبات وإنجاز والتزام بالمهلة ودورة التشغيل.` },
      { name: `Hisham — Finance`, type: `WEB`, url: `week3/day7/web/HISHAM_FINANCE.html`, note: `إيراد وتكلفة وربح وموازنة.` },
      { name: `Enas — Workforce`, type: `WEB`, url: `week3/day7/web/ENAS_WORKFORCE.html`, note: `آخر لقطة شهرية للموظفين والعجز وتغطية الموارد.` }
    ]
  },
  {
    id: 8,
    date: '2026-10-06',
    weekday: 'الثلاثاء',
    phase: 'DESIGN',
    title: 'Build a Report People Want to Use',
    titleAr: 'ابنِ Report الناس فعلاً تريد استخدامه',
    hook: '20 Visual في صفحة واحدة لا تعني Dashboard قوي.',
    mission: 'حوّل Analyst Report إلى Management Experience واضح وسريع.',
    topics: ['Visual Hierarchy', 'Chart Selection', 'Grid & Whitespace', 'Conditional Formatting', 'Drill Down', 'Drill Through', 'Tooltips', 'Bookmarks & Buttons'],
    build: ['Executive Layout', 'KPI Hierarchy', 'Navigation', 'Drill-through', 'Tooltip Pages'],
    challenge: 'نفس 5 Business Questions، لكن لكل متدرب حرية التصميم. كل Visual يجب أن يدافع عن وجوده.',
    deliverable: 'Executive-ready Report بتجربة استخدام متماسكة.',
    visualGuide: { image: 'concepts/assets/day8-learner-overview.svg', title: 'Day 8 — Learner Visual Guide', note: 'توحيد اللوحات وتحسين التصميم وEdit Interactions وDrillthrough وTooltips وBookmarks' },
    resources: [
      { name: 'Day 08 — Unified Executive PBIR Starter', type: 'ZIP', url: 'week3/day8/downloads/Nova_Day08_Executive_360_PBIR.zip', note: 'مشروع PBIR مع الصفحات الأربع المكتملة ونموذج البيانات الأصلي وصفحة انطلاق اليوم الثامن' },
      { name: '08 — Visual Selection Cards', type: 'PDF', url: 'week3/day8/downloads/08_Visual_Selection_Cards.pdf', note: '5 صفحات: اختيار 8 أنواع من الرسومات وأمثلة من لوحات محمود وسمية وهشام وإيناس' },
      { name: 'Day 08 — Every Visual Earns Its Place', type: 'Challenge', url: 'week3/day8/web/Day08_Every_Visual_Earns_Its_Place.html', note: 'تحدي 10–15 دقيقة: Audit وImprove وInteractions وInsight مع PDF للطباعة' }
    ]
  },
  {
    id: 9,
    date: '2026-10-07',
    weekday: 'الأربعاء',
    phase: 'EXPLAIN',
    title: 'From Dashboard to Decision',
    titleAr: 'من Dashboard إلى قرار',
    hook: 'Sales انخفضت 8%. الـCard الأحمر لا يشرح السبب.',
    mission: 'تتبّع الأداء من What إلى Why ثم حوّل التحليل إلى Management Story.',
    topics: ['Executive Overview', 'Sales Performance', 'Product Performance', 'Customer / Team Performance', 'Drivers', 'Navigation', 'Storytelling'],
    build: ['What happened?', 'Where?', 'What?', 'Who?', 'Why?'],
    challenge: '10-Minute Management Meeting: 3 Findings + 1 Recommended Action.',
    deliverable: 'Report يوجّه المستخدم من الرقم إلى السبب ثم إلى الإجراء.',
    visualGuide: { image: 'concepts/assets/day9-learner-overview.svg', title: 'Day 9 — Learner Visual Guide', note: 'What / Where / Who / Why وStorytelling وثلاثة Insights وتوصية' },
    resources: [
      { name: '09_Management_Case.pbix', type: 'PBIX', url: '', note: 'Management Case' },
      { name: '09_Insight_Template.pdf', type: 'PDF', url: '', note: '3 Findings + 1 Action' },
      { name: 'Day 09 — Management Meeting', type: 'Challenge', url: '', note: 'Storytelling Challenge' }
    ]
  },
  {
    id: 10,
    date: '2026-10-11',
    weekday: 'الأحد',
    phase: 'DECIDE',
    title: 'The Boardroom',
    titleAr: 'الاختبار الحقيقي: The Boardroom',
    hook: 'وصلت بيانات جديدة. الإدارة تريد أن تعرف ماذا تغيّر، لماذا، وأين يجب أن تتدخل.',
    mission: 'نفّذ العملية كاملة من Refresh إلى Insight ثم قدّم قراراً قابلاً للدفاع عنه.',
    topics: ['Refresh & Validation', 'Model Check', 'KPI Review', 'Target / Budget', 'PY & Growth', 'Executive Story', 'Power BI Service', 'Publish', 'Workspaces', 'Refresh Concept', 'RLS Overview'],
    build: ['Final Refresh', 'Executive Dashboard', 'Root Cause Analysis', 'Boardroom Story'],
    challenge: 'Final Mission: What happened? Why? Where should management focus? What action do you recommend?',
    deliverable: 'Nova Business Performance 360 — مشروع نهائي متكامل وقابل للعرض على الإدارة.',
    visualGuide: { image: 'concepts/assets/day10-learner-overview.svg', title: 'Day 10 — Learner Visual Guide', note: 'Refresh وValidation وExecutive View وRoot Cause والعرض النهائي' },
    resources: [
      { name: '10_Boardroom_Final_Case.zip', type: 'ZIP', url: '', note: 'البيانات الجديدة + Brief' },
      { name: '10_Final_Submission_Checklist.pdf', type: 'PDF', url: '', note: 'قائمة التحقق النهائية' },
      { name: 'Nova_Business_Performance_360_FINAL.pbix', type: 'PBIX', url: '', note: 'Trainer Reveal — يضاف بعد التحدي' }
    ]
  }
];

function getDay(id) {
  return DAYS.find(day => day.id === Number(id)) || null;
}

function formatDateAr(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat('ar-JO', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function dayRuntimeStatus(day, now = new Date()) {
  const target = new Date(`${day.date}T00:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (target.getTime() === today.getTime()) return 'today';
  if (target < today) return 'past';
  return 'upcoming';
}
