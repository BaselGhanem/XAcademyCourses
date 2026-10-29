# Course223 — الخطة المتكيفة مع سير التدريب الفعلي

**المرجع المعتمد بعد تحديث الخطة بتاريخ 29 اكتوبر 2026**
10 جلسات × ساعتين = 20 ساعة — مريم — Power BI

## المبدأ الحاكم

الخطة قابلة للتعديل بعد كل جلسة. **ما يتم تدريسه فعليا هو المرجع**، وليس ما جهزناه مسبقا. نميز دائما بين:
- **تم التطبيق:** مهارات أكد المدرب تدريسها بالفعل
- **مخطط:** موضوعات مؤجلة أو معاد توزيعها، ولا تعتبر مكتملة
- **جاهز للتدريس:** ملفات وخطوات تحقق جاهزة، وهذا لا يعني أنه تم تدريسها
- **التمارين الاختيارية:** ليست جزءا من سجل ما تم تدريسه إلا اذا أكد المدرب تطبيقها

لا ننسب لمريم مهارات لم يذكرها المدرب، ولا نخترع أسماء الخمسة Slicers أو صفحة التقرير الجديدة. معيارنا النهائي **تقرير Power BI احترافي من ست صفحات** مع تجربة Navigation/Bookmarks/Tooltips وHTML/SVG حسب الوقت المتاح، لكن دقة الحسابات لها اولوية على المؤثرات.

## ما تم تدريسه فعليا

| اليوم | التاريخ | الحالة | المخرجات المؤكدة |
|---|---|---|---|
| 1 | 15-10-2026 | تم | مصادر متعددة، Extract/Load، Cards، Filters وSlicers، Count/Distinct من الواجهة دون DAX |
| 2 | 18-10-2026 | تم | Power Query تنظيف البيانات وConditional Column وColumn from Examples |
| 3 | 20-10-2026 | تم | Append وMerge وFolder Connector وRefresh وفحوص النتائج |
| 4 | 22-10-2026 | تم | بناء نموذج العلاقات والتحقق منه، مع PBIX مرجعي محفوظ في GitHub |
| 5 | **26-10-2026 (اثنين، موعد التنفيذ الفعلي)** | **تم حسب ملخص المدرب** | Change Source، صفحة ثانية، Assessment Count، Employee Count، **5 Slicers**، Edit Interactions، Manager KPI Average، Self KPI Average |
| 6 | يحدد لاحقا | **جاهز للتدريس — لم ينفذ بعد** | SUMX وDIVIDE والتقييم الموزون وREMOVEFILTERS وContribution وصفحة ثالثة مع Navigation وBookmark اساسي |
| 7 | يحدد لاحقا | مخطط | Drillthrough وDrill Down وصفحة Employee Detail الرابعة |
| 8 | يحدد لاحقا | مخطط | Report Page Tooltips وField Parameters وDynamic Titles وصفحة Analysis Explorer الخامسة |
| 9 | يحدد لاحقا | مخطط | Sidebar متكامل وAdvanced Bookmarks وSync Slicers وصفحة Executive Insights السادسة |
| 10 | يحدد لاحقا | مخطط | HTML Content وSVG وتصميم AI وQA وتسليم الست صفحات |

**توقيت اليوم الخامس:** كان تاريخ الجلسة في الخطة السابقة 25 اكتوبر (الاحد)، وبلغ المدرب عن التطبيق الفعلي يوم 26 اكتوبر. لا نغير تواريخ الجلسات 6–10 تلقائيا.

## سجل الجلسة الخامسة: ما تم وما لم يتم

التطبيقات المؤكدة:
1. Change Source للمسارات القائمة — لا نفترض نوع المصدر او اسم المسار
2. إضافة **الصفحة الثانية** داخل PBIX الحالي — لا نفترض أنهما صفحات مكتملة التصميم
3. `Assessment Count = COUNTROWS('EvaluationScores_2026_H1')`
4. `Employee Count = DISTINCTCOUNT(Employees[EmployeeID])`
5. إضافة **5 Slicers** دون توثيق أسماء الحقول المختارة
6. استخدام **Edit Interactions**
7. `Manager KPI Average = CALCULATE(AVERAGE('EvaluationScores_2026_H1'[KPIScore]), 'EvaluationScores_2026_H1'[AssessmentSource] = "Manager")`
8. `Self KPI Average = CALCULATE(AVERAGE('EvaluationScores_2026_H1'[KPIScore]), 'EvaluationScores_2026_H1'[AssessmentSource] = "Self")`

**لم يتم تأكيد تدريسه:** SUMX وDIVIDE والنتائج الموزونة، فحوص اكتمال التقييم، Bookmarks وReport Page Tooltips وHTML/SVG. مرجع `Trainer/Day05_Measures.dax` ومختبر الأوزان تم تجهيزهما مسبقا؛ لا يعتبران دليلا على تدريسهما. بعد تعديل الخطة بتاريخ 29 اكتوبر، اصبح الحساب الموزون جزءا من اليوم السادس الجاهز للتدريس.

**نقطة استرجاع مهمة:** `week1/day5/data/HR_Performance_Intelligence_Day04_Backup.pbix` نسخة ما بعد اليوم الرابع **ولا تحتوي على تعديلات اليوم الخامس**؛ استكمال المشروع من ملف مريم الحالي على جهازها.

## الخطة الجديدة — قرار المدرب بتاريخ 29 اكتوبر 2026

**الاختيارات المعتمدة:** Hybrid · SUMX + DIVIDE · REMOVEFILTERS + Contribution % · Bookmarks/Buttons/Sidebar · Drillthrough/Drill Down · Report Page Tooltips · Field Parameters/Dynamic Titles · البيانات الموجودة فقط · المخرج صفحة جديدة · عمق Balanced · الايام 7–10 تصميم Premium.

**ملاحظة الجدولة:** تواريخ الايام 6–10 القديمة لم تعد مواعيد مؤكدة بعد تغيير التوزيع؛ نحدثها عند تحديدها مع المدرب. حالة `ready:true` لليوم السادس تعني المواد جاهزة وليست شهادة بأنه نُفذ. كل الايام 7–10 `ready:false` الى حين تحضيرها.

### Day 06 — Hybrid / Weighted Performance + Interactive Page (120 دقيقة)

| الفترة داخل ساعتين | النشاط | مخرج التطبيق |
|---|---|---|
| 00–08 | افتح PBIX الاصلي من نهاية الخامس + Save As، اختر موظفا وQuarter واحدا | نقطة استرجاع آمنة |
| 08–38 | SUMX وDIVIDE + Objective Score وComplete Manager Weighted Score | حساب موزون لا يكرر وزن Objective ولا يحول Missing الى 0 |
| 38–55 | REMOVEFILTERS وContribution % لعدد Assessment حسب Department | مقياس حصة القسم من التقييمات في فترة معينة |
| 55–90 | الصفحة الثالثة Weighted Performance: 3 Cards + Bar + Matrix + Slicers | صفحة تحليل منجزة بنيويا |
| 90–105 | Buttons وPage Navigation وSidebar اولي | تنقل بين صفحات Overview وDepartments وWeighted Performance |
| 105–113 | Bookmark Show/Hide filters اساسي | ظهور/اخفاء لوحة فلاتر مع Data OFF |
| 113–120 | تحقق، حفظ، وتمرين مستقل | نسخة PBIX عمل جديدة |

**ملاحظة تعليمية:** Weighted Score هنا للـManager، ولا يخلط Self وUpward. KPI Average = متوسط مؤشرات داخل هدف، ثم SUMX عبر Objectives المتوافقة مع موظف واحد وربع واحد، مع اكتمال KPIs وObjectiveWeightPct/100. متوسط القسم = AVERAGEX لنتائج الموظفين المكتملة، وليس جمع درجاتهم. Contribution % هنا **نسبة عدد سجلات التقييم**، وليس نسبة الوزن او النتيجة الموزونة. مرجع `Trainer/Day06_DAX_Reference.dax` للمدرب فقط، ولا نعطي مفتاح اجابة لمريم.

**المصادر:** لا نضيف CSV يوم 6. نستخدم `week1/day6/data/HR_Performance_Intelligence_Day05_Backup.pbix` الاصلي كما رفعه المدرب، بنسخة Save As للعمل. ملفا `EvaluationScores_2025_H1.csv` و`ObjectiveProgressSnapshots.csv` يظلان محفوظين في GitHub، لكنهما لم يعودا ضمن ملفات اليوم السادس المطلوبة ولا تظهر روابطهما في صفحة مريم. مخطط الصفحة الثالثة مستقل في `week1/day6/web/Day06_Weighted_Blueprint.html`.

**اذا تجاوز الوقت:** لا تختصر صحة DAX او فحص Missing KPI من اجل شكل التقرير. الاولويات وزن صحيح → الصفحة الثالثة → Buttons → Bookmark؛ تنقل تفاصيل Bookmarks المتقدمة لليوم التاسع.

### Day 07 — Drillthrough / Drill Down / Employee Detail (120 دقيقة)

ننشئ صفحة رابعة **Employee Detail** مع Drillthrough من الاقسام لملف موظف واحد وBack Button، وDrill Down في Hierarchy مناسبة، وConditional Formatting وTop N حيث يناسب. نثبت ان الفلاتر لم تغير معنى Measures والـBLANK.

### Day 08 — Tooltips / Field Parameters / Dynamic Titles (120 دقيقة)

ننشئ صفحة خامسة **Analysis Explorer**، وReport Page Tooltip تعرض تفاصيل مفيدة عند Hover، ثم Field Parameters تسمح بتغيير منظور الرسم وفق حقول النموذج، وDynamic Title باستخدام SWITCH/SELECTEDVALUE عند الحاجة. نختبر الفلاتر والفرق بين حالة اختيار واحد وعدة اختيارات.

### Day 09 — Premium Navigation & UX (120 دقيقة)

ننشئ الصفحة السادسة **Executive Insights**، ونوحد Sidebar مع Buttons وPage Navigation وAdvanced Bookmarks (Selection Pane وData OFF وDisplay ON وSelected visuals)، وSync Slicers على الصفحات المناسبة. نركز على hierarchy وspacing وmobile layout وTheme وهوية X Academy. لا نعيد بناء المقاييس الصحيحة من الصفر.

### Day 10 — HTML/SVG & Final QA (120 دقيقة)

نستخدم **HTML Content وSVG وAI Prompt Design** لتطوير عنصر بصري مع Static Fallback دون التضحية بصحة الارقام. نراجع كل صفحات PBIX الست، ونقارن Visual اصليا مع HTML عند تغيير الفلاتر، ونتحقق من Bookmarks وDrillthrough وTooltips وField Parameters وRefresh. نحفظ نسخة تسليم وتعرض مريم نتائجها.

## الصفحات الست النهائية المستهدفة

1. **Overview** — الموجودة منذ الجلسة الخامسة، تحسن تدريجيا
2. **Departments** — الموجودة منذ الجلسة الخامسة، تحسن تدريجيا
3. **Weighted Performance** — جلسة 6، درجة الاداء والمساهمة والتحقق
4. **Employee Detail** — جلسة 7، Drillthrough وDrill Down
5. **Analysis Explorer** — جلسة 8، Tooltips وField Parameters وDynamic Titles
6. **Executive Insights** — جلسة 9، صفحة ادارية وSidebar
**جلسة 10 ليست صفحة سابعة**، بل التشطيب وHTML/SVG والاختبار النهائي

هدفنا ست صفحات فعلية، لا نفترض اكتمال الصفحتين الحاليتين، ولا ننشئ PBIX بديل قبل التدريب.

**المهارات المؤجلة عن اليوم السادس:** Drillthrough/Drill Down لليوم 7، Report Page Tooltips وField Parameters وDynamic Titles لليوم 8، Sidebar وBookmarks المتقدم وSync Slicers لليوم 9، HTML/SVG لليوم 10. Time Intelligence وتوسعة مصادر 2025/Snapshots ليست ضمن الساعتين القادمتين؛ سنعيد تقييمها بعد تجربة تصميم الصفحات، دون الادعاء انها انجزت.

## منهجية البيانات والتقييم

مريم تحلل تقييمات القوى العاملة. `Self` تقييم ذاتي، `Manager` تقييم المدير، و`Upward` تقييم المدير من الموظف؛ نفصلها دائما. كل KPI له Score دون وزن فردي. كل Objective له Weight؛ الدرجة = متوسط درجات KPIs المكتملة ثم مجموع مساهمات الأهداف الموزونة. التقييم غير المكتمل يظل غير مكتمل ما لم تتوفر قاعدة مؤسسية صريحة.

**قاعدة مستمرة:** لا يظهر للمتدربة أي مفتاح إجابة أو نتيجة تدقيق أو تفاصيل مدرب أو خطة مفاجأة. يقدم الموقع محتوى ما تم تدريسه فعليا ومهام الجلسات القادمة بشكل عام، وتبقى مواد التدريب المستقبلية `ready:false` حتى تجهيزها واختبارها.

---

## اليوم الثاني

- التطبيق 30,450 صف خام، التحدي المستقل 12,180 صف خام
- لا نحذف صفوفا لمجرد تكرار EmployeeID او KPIID
- النسخ المطابقة تزال اولا، النسخ المتعارضة بكل نسخها والهوية الناقصة تذهب الى Review
- صفر الدرجة صالح، الغياب والخطا و Pending لا يصبح صفرا
- التاريخ الفاسد يحول الى null مع مراجعة، ولا يحذف السجل
- المرجع الكامل: Trainer/day2/Day02_Reference.html
- الدليل التفاعلي: Trainer/Day02_Performance.html
- كل Dataset جديد بعد اليوم الاول لا يقل عن 10,000 صف فعلي، ملفات اليوم الاول مستثناة من التعديل حفاظا على اليوم المكتمل

## بعد كل جلسة

نسجل Feedback المدرب: ما تم تدريسه فعليا، وما جهز ولم يدرس، وما يحتاج مراجعة، ثم نحدث اليوم التالي ونوزع الوقت دون فقد المحاور، لا نستنتج التنفيذ من مرور التاريخ او جاهزية الصفحة


## قاعدة فصل محتوى المدرب والمتدرب — 17 اكتوبر 2026

- في كل تصميم للمتدربين، لا تعرض ملاحظات المدرب او الاجابات او مفاتيح الحل او الخطط الزمنية الداخلية او ادوات التحقق او حزم المدرب
- صفحة اليوم الثاني تعرض ملف التطبيق CSV وملف التمرين CSV فقط، مع تعليمات تعلم مختصرة
- كل المراجع وقاموس الحقول والشرح التفصيلي والتعليمات والاجابات ضمن مساحة Trainer، وروابطها مرتبة زمنيا في دليل المدرب
- هذه قاعدة عمل مستمرة للمواد الجديدة، مع الحفاظ على محتوى اليوم الاول المكتمل وتسجيله

## اليوم الثالث

- التنظيف 15 دقيقة، Append 20، Merge 25، Folder 30، Refresh 10، تطبيق مستقل ومراجعة 20
- خمسة ملفات تقييم وتمرن، كل منها 12,120 صف خام و 12,000 بعد التنظيف، ودليل Employees من 10,000 صف
- التطبيق يبدأ بيوليو واغسطس:24,000 صف، وبعد اضافةسبتمبر 36,000 صف
- التمرين مستقل:ابريل 12,000 صف، وبعد اضافةمايو 24,000 صف
- اجابات المدرب وقاموس الحقول وادوات التحقق تحت Trainer/day3 فقط
- Power Query مستمر خلال المسار، لا نساوي جاهزية اليوم بتدريسه او اتقانه


## ارشيف القرار السابق — غير معتمد بعد 29 اكتوبر 2026

الخطة السابقة كانت تضع EvaluationScores_2025_H1 وObjectiveProgressSnapshots في اليوم السادس مع Append وReference/Group By. هذان الملفان انشئا ونشرا على GitHub لكن قرار المدرب الجديد اعتمد استخدام PBIX الحالي فقط. لا تعرضهما كملفات مطلوبة لليوم السادس ولا تنسب تعليم مهاراتهما للجلسة السادسة. يحتفظ المستودع بهما لاستخدام محتمل في مسار لاحق بعد قرار جديد.
