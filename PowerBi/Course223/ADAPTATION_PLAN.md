# Course223 — خطة التعلم المعتمدة

10 جلسات × ساعتين = 20 ساعة، الاحد والثلاثاء والخميس 19:00–21:00 بتوقيت عمان

## حالة التدريس

- اليوم الاول: تم تدريسه فعليا في 15 اكتوبر 2026، المحتوى والتسجيل والملفات محفوظة دون تعديل
- المنجز فعليا: Get Data من مصادر متعددة، Extract & Load، Filters وSlicers وDropdown وHorizontal وClear Filter، Card، Rename for Visual Values، Count وDistinct Count من Visual، استعراض Table View
- لم يدرس في اليوم الاول: DAX Measures او Power Query Transform بالتفصيل
- اليوم الثاني: مجهز لجلسة 18 اكتوبر 2026، لم يدرس بعد
- الايام 3–10: مخططة فقط، لا تعني جاهزية مواد او تسجيلات
- علامة اتمام المتدربة وChecklist المدرب تقدم محلي، وليستا سجلا تلقائيا لما درس فعليا

## سياق التطبيق

مريم تستلم تقييمات الموظفين وتحللها، ولا تدخلها بنفسها، جميع البيانات افتراضية
Self: الموظف يقيم نفسه، Manager: المدير يقيم الموظف، Upward: الموظف يقيم مديره
كل KPI له Score دون وزن فردي، كل Objective له Weight، متوسط درجات KPI المكتملة يعطي Objective Score ثم تطبق مساهمة الوزن، لا تجمع اتجاهات التقييم الثلاثة

سياسة التدريب للناقص: لا نعوض بصفر ولا نعيد توزيع الاوزان ولا نعتمد نتيجة نهائية ناقصة، يتطلب الهدف كل KPIs المتوقعة، ويتطلب التقييم الكامل كل الاهداف ومجموع اوزان 100، السياسة التدريبية لا تستبدل سياسة المؤسسة

## الخطة العامة

| اليوم | التاريخ | المهارات | الحالة |
|---|---|---|---|
|1|15-10-2026|Data Sources & Report Basics|تم تدريسه، لا يعاد تحريره|
|2|18-10-2026|Power Query، Profiling، Text، Types، Nulls، Errors، Fill، Split، Conditional، Duplicates، Applied Steps|مجهز ولم يدرس|
|3|20-10-2026|Merge، Append، Folder Connector، Refresh، Schema Checks|مخطط|
|4|22-10-2026|Fact/Dimension، Star Schema، Relationships، Date Table، Grain/Keys|مخطط|
|5|25-10-2026|DAX Fundamentals، Measures/Columns، SUM، DISTINCTCOUNT، DIVIDE، Iterators، Weighted Objectives|مخطط|
|6|27-10-2026|CALCULATE، Filter Context، FILTER، REMOVEFILTERS، Variables، Totals|مخطط|
|7|29-10-2026|Date Intelligence، Previous Period، MoM/YoY، Missing Periods، Ranking|مخطط|
|8|01-11-2026|Dashboard Design، Drillthrough، Tooltips، Bookmarks، Interactions، Mobile|مخطط|
|9|03-11-2026|Service، Publishing، Refresh/Gateway، Security، RLS، Performance|مخطط|
|10|05-11-2026|End-to-End Project، Validation، Presentation، Handover|مخطط|

## حدود التغطية

الهدف تنفيذ دورة العمل كاملة باستقلالية مع ممارسة قوية، وليس احتراف كل ميزة متقدمة خلال 20 ساعة
الاساسيات تطبيق عملي، عزل التعارضات وتحويل التواريخ متعدد الصيغ في اليوم الثاني عرض موجه بمساعدة المدرب، Merge الموسع في اليوم الثالث، DAX في اليوم الخامس
النشر الفعلي في Service مشروط بالحساب والترخيص والصلاحيات المتاحة، RLS يختبر في Desktop، ولا تستخدم بيانات موظفين حقيقية
التعمق اللاحق: M المتقدم، DAX المعقد وتحسين النماذج الكبيرة وادارة Service المتقدمة

## اليوم الثاني

- التطبيق 30,450 صف خام، التحدي المستقل 12,180 صف خام
- لا نحذف صفوفا لمجرد تكرار EmployeeID او KPIID
- النسخ المطابقة تزال اولا، النسخ المتعارضة بكل نسخها والهوية الناقصة تذهب الى Review
- صفر الدرجة صالح، الغياب والخطا وPending لا يصبح صفرا
- التاريخ الفاسد يحول الى null مع مراجعة، ولا يحذف السجل
- المرجع الكامل: week1/day2/web/Day02_Reference.html
- الدليل التفاعلي: Trainer/Day02_Performance.html
- كل Dataset جديد بعد اليوم الاول لا يقل عن 10,000 صف فعلي، ملفات اليوم الاول مستثناة من التعديل حفاظا على اليوم المكتمل

## بعد كل جلسة

نسجل Feedback المدرب: ما تم تدريسه فعليا، وما جهز ولم يدرس، وما يحتاج مراجعة، ثم نحدث اليوم التالي ونوزع الوقت دون فقد المحاور، لا نستنتج التنفيذ من مرور التاريخ او جاهزية الصفحة
