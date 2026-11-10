const COURSE_CONFIG = {
  title: 'Power BI Specialist',
  subtitle: 'From Data to Decision',
  academy: 'X Academy',
  trainer: 'Basel Ghanem',
  trainerTitle: 'Senior Sales Analyst • Power BI & Excel Trainer',
  totalDays: 10,
  totalHours: 20,
  sessionHours: 2,
  courseId: 'Course224',
  deliveryMode: 'scheduled',
  showLegacyRecordings: false,
  portalPassword: 'PowerBI',
  powerBiDownloadUrl: 'https://www.microsoft.com/en-us/power-platform/products/power-bi/downloads',
  liveUrl: '',
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
    date: '2026-11-10',
    weekday: 'الثلاثاء',
    phase: 'CONNECT',
    title: 'Connect Everything',
    titleAr: 'وصّل كل شيء',
    hook: 'أول يوم لك مع Nova: Sales، Workforce، Budget، Web وPDF... البيانات موجودة، لكن القصة موزعة في كل مكان.',
    mission: 'تعرّف على Nova أولاً، ثم ثبّت Power BI Desktop ووصل Excel وCSV وTXT وPDF وWeb لتبدأ أول نسخة من Business Performance 360.',
    topics: ['Nova Company Case', 'Power BI Desktop Installation', 'Get Data', 'Excel / CSV / Text', 'Web Connector', 'PDF Connector', 'ETL Concept', 'Report / Data / Model Views', 'Card & Bar Chart', 'Slicer & Filters'],
    build: ['Open Nova Company Profile and understand the management challenge', 'Install & launch Power BI Desktop', 'Connect Nova Excel, CSV, TXT, PDF and Web sources', 'Understand Extract → Transform → Load', 'Tour the interface only after using it', 'Build Total Revenue Card', 'Build Revenue by Region; inspect weekly Web Targets separately (different data grain)', 'Add Channel Slicer and test interactions', 'Save Nova_Business_Performance_360_[Name].pbix'],
    challenge: 'الإدارة لا تريد Chart جميل فقط. ابدأ بالسؤال: أي Region أو Branch يحتاج انتباه أولاً؟',
    deliverable: 'أول نسخة من Nova Business Performance 360 + فهم واضح لـETL وواجهات Power BI الأساسية.',
    visualGuide: { image: 'concepts/assets/day1-etl-poster.png', title: 'Day 1 — Learner Visual Guide', note: 'رحلة الاتصال بالمصادر وETL وبناء أول تقرير' },
    resources: [
      { name: 'Meet Nova — Company Profile', type: 'WEB', url: 'week1/day1/web/Nova_Company_Profile.html', note: 'ابدأ من هنا: الشركة، الشعار، المنتجات، نموذج العمل والتحدي الإداري.' },
      { name: 'Day 01 — Nova Source Pack', type: 'ZIP', url: 'week1/day1/downloads/Day01_CONNECT_EVERYTHING.zip', note: 'Nova Product Master + Excel ETL Reference + 120K Sales CSV + Workforce TXT + Budget PDF + Challenge' },
      { name: 'Nova Branch Performance — Web Source', type: 'WEB', url: 'week1/day1/web/Branch_Performance.html', note: '4,000 صف تجمع Sales + Finance + Workforce indicators. استخدم الرابط مباشرة في Get Data > Web.' },
      { name: 'Nova Data Dictionary', type: 'Guide', url: 'datasets/DATA_DICTIONARY.csv', note: 'تعريف الجداول والمفاتيح والـGrain' },
      { name: 'Nova Business Rules', type: 'Guide', url: 'datasets/BUSINESS_RULES.md', note: 'قواعد البيانات ومتى لا يجوز مقارنة مصادر بأحجام زمنية مختلفة' },
    ]
  },
  {
    id: 2,
    date: '2026-11-12',
    weekday: 'الخميس',
    phase: 'CLEAN',
    title: 'Clean Data Like an Analyst',
    titleAr: 'نظّف البيانات كمحلل',
    hook: 'Nova عندها ملف Branch Daily Performance كبير يبدو مفيداً... لكنه مليان تواريخ مختلطة، Regions غير موحدة، Revenue ناقص، Headcount فيه أخطاء وRows مكررة.',
    mission: 'حوّل ملف Nova Branch Daily Performance غير الموثوق إلى Power Query pipeline نظيفة مع Grain واضح: Branch + Date.',
    topics: ['Power Query Editor', 'Data Types', 'Trim & Clean', 'Replace Values', 'Standardize Categories', 'Nulls', 'Duplicates', 'Errors', 'Applied Steps'],
    build: ['Confirm the intended grain: Branch ID + Date', 'Inspect Nova dirty data before touching it', 'Audit invalid-date; convert valid dates with explicit locale; document exceptions', 'Trim & clean manager and category fields', 'Standardize Region and Channel labels', 'Audit missing Revenue, Cost and Headcount; never silently fill unknown values with zero', 'Remove only true duplicate rows', 'Review Applied Steps and Refresh'],
    challenge: 'بعد تنظيف Branch Performance، نظّف Nova Customer Master باستخدام الـCleaning Checklist فقط، بدون recipe خطوة بخطوة.',
    deliverable: 'Nova Branch Daily Performance + Customer Master نظيفان، Grain واضح، وقابلان للـRefresh.',
    visualGuide: { image: 'concepts/assets/day2-learner-overview.svg', title: 'Day 2 — Learner Visual Guide', note: 'Power Query: تنظيف القيم والأنواع والأخطاء والتحقق' },
    resources: [
      { name: 'Day 02 — Nova Cleaning Lab', type: 'ZIP', url: 'week1/day2/downloads/Day02_CLEAN_DATA.zip', note: '50K logical Branch-Day rows + intentional bad duplicates + 8K Dirty Customers + Nova Cleaning Checklist' },
      { name: 'Cleaning Expected Results', type: 'Guide', url: 'datasets/EXPECTED_RESULTS.csv', note: 'إحصاءات موثقة للصفوف المتكررة والقيم غير الصالحة' },
    ]
  },
  {
    id: 3,
    date: '2026-11-15',
    weekday: 'الأحد',
    phase: 'AUTOMATE',
    title: 'Stop Copying Files',
    titleAr: 'وقف Copy / Paste الشهري',
    hook: 'Nova تستلم ملف Sales جديد كل شهر. January، February، March... وApril بالطريق. هل سنعيد نفس الشغل كل شهر؟',
    mission: 'حوّل نفس Jan–Mar الذي استخدمناه في Day 1 من ملف consolidated إلى Folder pipeline شهرية، ثم Merge مع Masters وأثبت أن April يدخل بالـRefresh فقط.',
    topics: ['Folder Connector', 'Combine Files', 'Append Thinking', 'Merge Queries', 'Expand Columns', 'Reference vs Duplicate', 'Enable Load', 'Query Dependencies', 'Refresh'],
    build: ['Connect to Nova Monthly_Sales folder', 'Combine January–March', 'Keep Source File Name', 'Merge Nova Branch Master', 'Merge Customer Master', 'Merge Product Master', 'Validate Merge does not multiply rows', 'Load only the final analytical query', 'Drop April file and Refresh (160,000 rows)'],
    challenge: 'ابنِ العملية كاملة من Folder إلى Dataset موحد. النجاح الحقيقي: إضافة April بدون Copy/Paste أو تعديل يدوي.',
    deliverable: 'Nova monthly Sales pipeline قابلة للـRefresh وجاهزة للأشهر القادمة، مع Masters موحدة.',
    visualGuide: { image: 'concepts/assets/day3-learner-overview.svg', title: 'Day 3 — Learner Visual Guide', note: 'Folder Connector وCombine وAppend وMerge وRefresh' },
    resources: [
      { name: 'Day 03 — Nova Automation Pack', type: 'ZIP', url: 'week1/day3/downloads/Day03_STOP_COPYING_FILES_LEARNER.zip', note: 'نفس 120K Rows من Day 1، الآن Jan–Mar × 40K + April refresh proof + Branch/Customer/Product Masters' },
      { name: 'Data Lineage', type: 'Guide', url: 'datasets/DATA_LINEAGE.md', note: 'تطابق معاملات Jan–Mar ثم April' },
      { name: 'Expected Results', type: 'Guide', url: 'datasets/EXPECTED_RESULTS.csv', note: 'أعداد الصفوف والقيم المرجعية قبل Refresh وبعده' },
    ]
  },
  {
    id: 4,
    date: '2026-11-17',
    weekday: 'الثلاثاء',
    phase: 'MODEL',
    title: 'Model the Business',
    titleAr: 'ابنِ نموذج البيانات',
    hook: 'البيانات صارت نظيفة وتتحدث تلقائياً… لكن الجداول ما زالت تحتاج Model واضح حتى تتكلم مع بعضها بدون أرقام مضللة.',
    mission: 'ثبّت Merge وAppend وFolder باستخدام Excel، ثم حوّل Nova Sales إلى Star Schema واضح: FactSales في الوسط وDimensions حوله.',
    topics: ['Merge vs Append Review', 'Excel Files from Folder', 'Fact vs Dimension', 'Grain', 'Relationships', 'Primary & Foreign Keys', 'One-to-Many', 'Filter Direction', 'Star Schema'],
    build: ['Review Merge = Add Columns', 'Review Append = Add Rows', 'Combine full Jan–Apr Excel source (160,000 rows), then refresh May (200,000)', 'Load all 160,000 FactSales transactions + DimProduct + DimCustomer + DimBranch + DimDate', 'Define the grain of each table', 'Check unique keys in dimensions', 'Run Auto Detect and inspect what Power BI found', 'Manually connect DimCustomer[Customer Code] → FactSales[Customer ID]', 'Manually connect DimDate[Date] → FactSales[Order Date]', 'Confirm 1:* cardinality and single filter direction', 'Arrange the model as a Star Schema', 'Verify the full 160K model revenue and test filters from all dimensions'],
    challenge: 'شغّل Auto Detect أولا وراجع ما اكتشفه Power BI بدل قبول كل شيء مباشرة. بعد ذلك أنشئ العلاقات الناقصة يدويا، خصوصا Customer Code ↔ Customer ID وDate ↔ Order Date، ثم اثبت أن كل Dimension تفلتر FactSales بشكل صحيح.',
    deliverable: 'Nova Star Schema يحتوي على كامل 160,000 معاملة Jan–Apr مع 4 Dimensions ومفاتيح صالحة، جاهز للـDAX.',
    visualGuide: null, // Legacy image depicts outdated 40K model; a new 160K image follows in Phase 4.
    resources: [
      { name: 'Day 04 — Model the Business Lab', type: 'ZIP', url: 'week2/day4/downloads/Day04_MODEL_THE_BUSINESS.zip', note: 'Merge وAppend بعينات تعليمية، وFolder كامل Jan–Apr (160K)، وMay إلى 200K، وModel Lab كامل وDimDate بتاريخ Excel فعلي' },
      { name: 'Day 04 — Process Flow', type: 'FLOW', url: 'concepts/assets/day4-process-flow.svg', note: 'Review → Fact/Dimensions → Relationships → Star Schema → Test Filters → Ready for DAX' },
      { name: 'Day 04 — Concept Studio', type: 'WEB', url: 'concepts/index.html', note: 'Fact vs Dimension + Relationships + Star Schema' },
      { name: 'Model Expected Results', type: 'Guide', url: 'datasets/EXPECTED_RESULTS.csv', note: '160K FactSales و730 تاريخًا وإيراد 12,534,018.65 دينار' },
      { name: 'Source Lineage', type: 'Guide', url: 'datasets/DATA_LINEAGE.md', note: 'العينات التدريبية مقابل المعاملات الكاملة' },
    ]
  },
  {
    id: 5,
    date: '2026-11-19',
    weekday: 'الخميس',
    phase: 'MEASURE',
    title: 'Calculate & Visualize',
    titleAr: 'احسب وابنِ أول Report',
    hook: 'الـModel صار جاهز. اليوم سنحوّل الصفوف إلى KPIs، والـKPIs إلى أول Sales Overview حقيقي.',
    mission: 'أضف 3 Calculated Columns بسيطة داخل Power Query، ثم ابنِ Measures أساسية واستخدمها في KPIs وVisuals وSlicers.',
    topics: ['Power Query Custom Column', 'Gross Sales', 'Discount Amount', 'if...then...else', 'Measure vs Column', 'SUM', 'COUNTROWS', 'DISTINCTCOUNT', 'DIVIDE', 'KPI Cards', 'Line & Bar Charts', 'Slicers', 'Report Formatting'],
    build: ['Open the Day 05 PBIP project, Refresh the full 160K model, then create the row-level Power Query columns', 'Power Query: Gross Sales = Quantity × Unit Price', 'Power Query: Discount Amount = Gross Sales - Revenue', 'Power Query: Discount Status using if...then...else', 'Close & Apply', 'Create Total Revenue', 'Create Total Quantity', 'Create Transactions with COUNTROWS', 'Create Customers with DISTINCTCOUNT', 'Create Average Transaction Value with DIVIDE', 'Build 4 KPI Cards', 'Build Revenue Trend by Month and sort Month correctly', 'Build Revenue by Category', 'Build Top 10 Branches by Revenue', 'Build Discount Analysis', 'Add Month / Branch / Category Slicers', 'Format and align the report', 'Test filters and observe Measures changing'],
    challenge: 'ابنِ Sales Overview يحتوي 4 KPIs وTrend وCategory وBranch وDiscount Analysis و3 Slicers على الأقل، ثم اشرح لماذا نفس الـMeasures تغيرت بدون تعديل الـDAX.',
    deliverable: 'أول Nova Sales Overview فعلي: Power Query calculations + DAX Measures + KPIs + Charts + Slicers، جاهز لـFilter Context في Day 6.',
    visualGuide: { image: 'concepts/assets/day5-learner-overview.svg', title: 'Day 5 — Learner Visual Guide', note: 'Power Query Custom Column وDAX Measures وبناء التقرير' },
    resources: [
      { name: 'Day 05 — Calculate & Visualize Pack (PBIP)', type: 'ZIP', url: 'week2/day5/downloads/Day05_CALCULATE_VISUALIZE.zip', note: 'يتضمن مشروع PBIP بمبيعات Jan–Apr الكاملة (160K)، وتمارين Power Query وDAX والتقرير والتحدي؛ احفظ PBIX بعد التحقق داخل Desktop' },
      { name: 'Day 05 — Concept Studio', type: 'WEB', url: 'concepts/index.html', note: 'Power Query Custom Column + Measure vs Column + Basic DAX Aggregations + DIVIDE' }
    ]
  },
  {
    id: 6,
    date: '2026-11-22',
    weekday: 'الأحد',
    phase: 'THINK',
    title: 'Context Changes Everything',
    titleAr: 'افهم السياق وسيطر على DAX',
    hook: 'بالأمس تغيرت نفس الـMeasure مع كل Slicer وVisual. اليوم سنفهم لماذا، ثم نتحكم بهذا السلوك بدل أن نكتفي بملاحظته.',
    mission: 'افهم Filter Context، واستخدم CALCULATE لإضافة Filter وREMOVEFILTERS لإزالة Filter محدد، ثم ابن Context Lab وتحكم بتفاعل الـVisuals.',
    topics: ['Day 5 Review', 'Filter Context', 'CALCULATE', 'REMOVEFILTERS', 'Category Contribution %', 'Cross Filtering', 'Edit Interactions'],
    build: ['Open the completed Day 5 PBIX reference', 'Prove that [Total Revenue] changes with Month / Region / Category without editing DAX', 'Define Filter Context as Measure + current filters = result', 'Create Discounted Revenue with CALCULATE', 'Create Full Price Revenue with CALCULATE', 'Create Retail Revenue using DimBranch[Channel]', 'Create Revenue All Categories with REMOVEFILTERS', 'Create Category Contribution % with DIVIDE', 'Build a Context Lab page with Cards + Region + Category Matrix + Trend', 'Use Month / Region / Category slicers', 'Test cross-filtering by clicking charts', 'Use Edit interactions and intentionally set one interaction to None', 'Explain the final result using Filter Context'],
    challenge: 'ابن Context Analysis من الملف المرجعي: Measures المطلوبة + 4 Cards + Category Contribution + Revenue by Region + 3 Slicers، ثم غير Interaction واحدة عمدا واشرح لماذا تغيرت كل نتيجة.',
    deliverable: 'Context Lab عملي يثبت فهم Filter Context وCALCULATE وREMOVEFILTERS وVisual Interactions، جاهز للانتقال إلى Time Intelligence في Day 7.',
    visualGuide: null, // Legacy Day06 poster reflects older discount semantics; replace in Phase4.
        resources: [
      { name: 'Day 06 — Context & CALCULATE Pack (PBIP)', type: 'ZIP', url: 'week2/day6/downloads/Day06_CONTEXT_AND_CALCULATE.zip', note: 'مشروع PBIP من نفس 160K مع Gross Sales وDiscount Amount وDiscount Status الموحدين، ثم Labs وCALCULATE وReport Blueprint' },
      { name: 'Day 06 — Process Flow', type: 'FLOW', url: 'concepts/assets/day6-process-flow.svg', note: 'Review → Filter Context → CALCULATE → REMOVEFILTERS → Contribution → Interactions → Context Lab' },
      { name: 'Day 06 — Concept Studio', type: 'WEB', url: 'concepts/index.html', note: 'Filter Context + CALCULATE + REMOVEFILTERS & Contribution + Visual Interactions' }
    ]
  },
  {
    id: 7,
    date: `2026-11-24`,
    weekday: `الثلاثاء`,
    phase: `APPLY`,
    title: `Four Domains, Four Decisions`,
    titleAr: `أربعة مجالات وأربع قرارات`,
    hook: `طبق مهارات التحليل على اسئلة من المبيعات والعمليات والمالية والموارد البشرية.`,
    mission: `تعلّم مقارنة الأداء عبر الزمن باستخدام Measure صحيحة وDate Table. اختر حالة أعمال مناسبة لك من أربعة أمثلة قابلة للتعميم على تخصصات أخرى.`,
    topics: [`Calendar Table`, `Filter Context over Dates`, `Previous Month`, `MoM Growth %`, `Previous Year`, `YoY Growth %`, `YTD`, `Non-additive Snapshot Metrics`, `KPI Cards`, `Line / Bar / Matrix`, `Source-based Validation`],
    build: [`Open Nova_Day07_START_PBIP.zip and open Nova.pbip in Power BI Desktop`, `Refresh and validate 160K original Jan–Apr 2026 sales plus 160K synthetic 2025 comparison records`, `Mark DimDate[Date] as the date table`, `Choose a domain scenario without selecting a named learner`, `Build 4 KPI Cards`, `Compare Previous Month and Previous Year within chosen period`, `Compute MoM, YoY and YTD where meaningful`, `Avoid summing Workforce snapshots across months`, `Build a trend, a bar chart and a matrix`, `Test Year / Year Month / domain filters`, `Validate one current and one comparison figure against Stage3 Expected Results`, `Save as PBIX from Power BI Desktop only after validation`],
    challenge: `اختر سؤال أعمال في الأداء أو العمليات أو المالية أو الموارد البشرية. قدّم مقارنة زمنية صحيحة، ثم استنتاجًا وإجراءً مقترحًا. مصدر بيانات 2025 اصطناعي لغرض المقارنة.`,
    deliverable: `تقرير تحليلي حسب السؤال المختار، مع PM / YoY / YTD عند ملاءمتها، وتحقق رقمي موثق. لا تُجمع لقطات Headcount عبر الزمن.`,
    visualGuide: null, // Old illustration depicts four named trainees and is retired.
    resources: [
      { name: `Day 07 — Universal Scenario Pack`, type: `ZIP`, url: `week3/day7/downloads/Day07_UNIVERSAL_SCENARIOS.zip`, note: `أربع حالات أعمال عامة، مشروع PBIP، وأمثلة DAX ونتائج متوقعة` },
      { name: `Day 07 — PBIP Start Project`, type: `ZIP`, url: `week3/day7/downloads/Nova_Day07_START_PBIP.zip`, note: `مبيعات Day04 الأصلية بالكامل + بيانات 2025 الاصطناعية للمقارنة، مع Operations وFinance وWorkforce` },
      { name: `Performance & Sales`, type: `WEB`, url: `week3/day7/web/PERFORMANCE_SCENARIO.html`, note: `إيراد ونمو وفئات وعملاء` },
      { name: `Operations`, type: `WEB`, url: `week3/day7/web/OPERATIONS_SCENARIO.html`, note: `الطلبات والالتزام والدورة التشغيلية` },
      { name: `Finance`, type: `WEB`, url: `week3/day7/web/FINANCE_SCENARIO.html`, note: `الميزانية والربحية وفروقات الأداء` },
      { name: `Workforce`, type: `WEB`, url: `week3/day7/web/WORKFORCE_SCENARIO.html`, note: `Headcount وStaffing Gap كقيم Snapshot غير قابلة للجمع عبر الأشهر` },
      { name: `Source-based Time Comparisons`, type: `Guide`, url: `datasets/STAGE3_TIME_VALIDATION.csv`, note: `قيم PM وYoY وYTD المحسوبة من المصدر لمقارنتها بDAX` }
    ]

  },
  {
    id: 8,
    date: '2026-11-26',
    weekday: 'الخميس',
    phase: 'DESIGN',
    title: 'Build a Report People Want to Use',
    titleAr: 'ابنِ Report الناس فعلاً تريد استخدامه',
    hook: '20 Visual في صفحة واحدة لا تعني Dashboard قوي.',
    mission: 'حوّل تقريرك إلى تجربة إدارية واضحة باستخدام KPI Hierarchy وTooltip وDrillthrough وNavigation.',
    topics: ['Visual Hierarchy', 'Chart Choice', 'White Space', 'Report Page Tooltip', 'Drillthrough', 'Page Navigation', 'Accessibility', 'Native Values QA'],
    build: ['Open the Day08 PBIP built from the same Day07 semantic model', 'Audit two visuals: Keep / Change / Remove', 'Arrange 4 KPIs, trend and diagnostic visuals', 'Build a Report Page Tooltip', 'Create Drillthrough details with a Back button', 'Add Page Navigation', 'Test filter transfer and native values in Desktop', 'Present one documented before/after'],
    challenge: 'حسّن رسمين بلا تغيير الأرقام، واشرح كيف ساعد التصميم على اتخاذ قرار، مهما كان تخصصك.',
    deliverable: 'Executive-ready report page plus a tested Tooltip, Drillthrough and evidence of value.',
    visualGuide: null,
    resources: [
      { name: 'Day08 Universal PBIP Starter', type: 'ZIP', url: 'week3/day8/downloads/Nova_Day08_Executive_360_PBIR.zip', note: 'مشروع البداية مع نفس نموذج Day07؛ Tooltips وDrillthrough تُبنى أثناء الجلسة' },
      { name: 'Report Design Lab', type: 'Guide', url: 'week3/day8/REPORT_DESIGN_LAB.md', note: 'خطة 120 دقيقة ونتائج قابلة للاختبار' },
      { name: 'Visual Selection Cards', type: 'PDF', url: 'week3/day8/downloads/08_Visual_Selection_Cards.pdf', note: 'مرجع لاختيار نوع الرسم، وليس نتائج شركة فعلية' },
      { name: 'Every Visual Earns Its Place', type: 'Challenge', url: 'week3/day8/web/Day08_Every_Visual_Earns_Its_Place.html', note: 'تحدي عام يناسب كل المجالات' }
    ]
  },
  {
    id: 9,
    date: '2026-11-29',
    weekday: 'الأحد',
    phase: 'CONTROL',
    title: 'Master the Dashboard',
    titleAr: 'تحكم بالتقرير',
    hook: 'شو قيمة الـDashboard اذا المستخدم كل مرة بضيع بين الفلاتر والرسومات؟',
    mission: 'أضف تحكمًا متقدمًا في الفلاتر والتفاعل دون إعادة بناء النموذج أو إخفاء اختيارات المستخدم.',
    topics: ['Visual / Page / Report Filters', 'Sync Slicers', 'Selection Pane', 'Bookmarks', 'Field Parameters', 'Dynamic Titles', 'Interactions QA'],
    build: ['Open Day09 PBIP from the verified Day07 source model', 'Compare Visual/Page/Report filter scopes', 'Sync DimDate slicer on two pages', 'Build Show/Hide filter panel with Display ON and Data OFF', 'Build Field Parameter from real fields', 'Create Dynamic Title for single and multi-select', 'Verify preserved slicer choices', 'Save As PBIX after Power BI Desktop testing'],
    challenge: 'أنتج لوحة واضحة الفلاتر يمكن تغيير منظورها دون تضليل المستخدم، ثم أثبت نتيجة واحدة رقميًا.',
    deliverable: 'Filter Panel + Sync Slicers + Field Parameter + Dynamic Title مع اختبارات واضحة.',
    visualGuide: { image: 'week3/day9/assets/Day09_Plan_Poster.svg', title: 'Day 09 — Interactivity', note: 'Filter Scopes وBookmarks وField Parameters' },
    resources: [
      { name: 'Day09 Universal Interactivity PBIP', type: 'ZIP', url: 'week3/day9/downloads/Day09_INTERACTIVITY_LAB.zip', note: 'نفس النموذج الموحد مع صفحة تعليمات؛ التفاعلات ليست مهيأة مسبقًا' },
      { name: 'Universal Student Missions', type: 'Guide', url: 'week3/day9/DAY09_STUDENT_MISSIONS.md', note: 'تمارين عامة تعتمد حقول النموذج الفعلية' },
      { name: 'Acceptance Checklist', type: 'Guide', url: 'week3/day9/DAY09_CHECKLIST.md', note: 'اختبارات التزامن والـBookmarks والفلاتر' },
      { name: 'Nova Theme', type: 'Guide', url: 'week3/day9/Nova_Day09_Theme.json', note: 'Report Theme بلون X Academy' }
    ]
  },
  {
    id: 10,
    date: '2026-12-01',
    weekday: 'الثلاثاء',
    phase: 'CREATE',
    title: 'Capstone — From Data to Decision',
    titleAr: 'المشروع النهائي: من البيانات إلى القرار',
    hook: 'النتيجة ليست عدد الرسومات، بل تقرير صحيح يدعم قرارًا إداريًا يمكن الدفاع عنه.',
    mission: 'ابنِ تقرير Power BI متكاملًا حسب سؤال أعمال تختاره، مع إثبات الحسابات والتفاعلات. AI Visual خيار إضافي.',
    topics: ['Business Question', 'Data Grain', 'Model Integrity', 'DAX Verification', 'Executive Report UX', 'Interaction QA', '100-point Rubric', 'Optional AI Visual', 'Final Presentation'],
    build: ['Open the Day10 Capstone PBIP starter', 'Define one business decision and its data limitations', 'Validate semantic model and 4 Measures', 'Create 4 KPI cards, trend and 2 diagnostic visuals', 'Add 2 slicers and one Tooltip or Drillthrough', 'Compare filtered metrics with source reference', 'Write one finding, one proposed action and one limitation', 'Save and reopen PBIX in Desktop', 'Optional AI HTML visual with native parity'],
    challenge: 'سلّم تقريرًا قابلًا للتقييم من 100 نقطة يثبت صحة البيانات والحسابات ويخدم قرارًا؛ أي تخصص مقبول مع بيانات موثقة.',
    deliverable: 'PBIX بعد اختبار Desktop مع Capstone Rubric، Screenshots، Data QA، وDecision Summary.',
    visualGuide: { image: 'week3/day10/assets/Day10_Studio_Roadmap.svg', title: 'Optional Day10 AI Extension', note: 'مسار تصميم AI اختياري بعد المشروع الأساسي' },
    resources: [
      { name: 'Day10 Capstone Pack', type: 'ZIP', url: 'week3/day10/downloads/Day10_CAPSTONE.zip', note: 'PBIP ونموذج موحّد وRubric من 100 نقطة واختبارات QA' },
      { name: 'Capstone Guide', type: 'Guide', url: 'week3/day10/CAPSTONE_GUIDE.md', note: 'متطلبات المشروع وتوزيع الـ120 دقيقة' },
      { name: 'Capstone Rubric', type: 'Guide', url: 'week3/day10/CAPSTONE_RUBRIC.csv', note: 'ستة معايير مجموعها 100 نقطة' },
      { name: 'Manual Desktop QA', type: 'Guide', url: 'week3/day10/CAPSTONE_QA_CHECKLIST.md', note: 'راجع التقرير وتحقق من التفاعل ودقة النتائج في Power BI Desktop' },
      { name: 'AI Visual Design Lab — Optional', type: 'WEB', url: 'week3/day10/ai-visual-design-lab.html', note: 'Prompt Builder ومعاينة تعليمية، وليس مولّد DAX فعلي' },
      { name: 'Domain Visual Missions — Optional', type: 'WEB', url: 'week3/day10/student-missions.html', note: 'تحديات عامة دون أسماء متدربين' },
      { name: 'Reference DAX — Optional', type: 'Guide', url: 'week3/day10/examples/README.md', note: 'أمثلة يجب اختبارها داخل Power BI Desktop' }
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
