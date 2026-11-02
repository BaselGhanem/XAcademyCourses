# Day 09 · Your Dashboard, Your Control

> اليوم ما رح نعيد بناء الـDashboard من الصفر. رح نخلي تقرير Day 7/8 الحالي اسهل، اذكى، وأقل زحمة. اشتغل على نسختك من Nova Business 360.

## المتطلبات المشتركة (كل الطلاب)

**Core / لازم يتنفذ**

1. طبق Visual-level filter على رسم واحد واشرح ليش باقي الرسومات مش متاثرة.
2. طبق Page-level filter ثم اختبر كل Visuals في نفس الصفحة.
3. على صفحة BASEL DEMO جرب Report-level filter باستعمال Dimension مشتركة بين الصفحات اللي بدك تتاثر، وتأكد عمليا من النتيجة ثم ازله اذا بخرب تحديات الصفحات الشخصية.
4. قارن Filter pane مقابل Slicer؛ اترك Slicers المهمة للمستخدم فقط.
5. استخدم Edit Interactions حتى واحد من الرسومات يبقى ثابت رغم تغير Slicer محدد، ووضح السبب.
6. Sync Slicer واحد بين صفحتين تربطهما نفس الـDimension، اذا موديلك يدعم ذلك.
7. انشئ Panel فلاتر قابل للاخفاء والاظهار باستخدام Selection + 2 Bookmarks + 2 Buttons. احفظ اختيارات المستخدم بإطفاء **Data** داخل Bookmark.
8. انشئ Field Parameter يبدل Dimension في رسم واحد بين قيمتين على الاقل.
9. اجعل عنوان الرسم Dynamic حسب Field Parameter أو Slicer المتاح.
10. اختبر كل الاجراءات ثم احفظ PBIX جديد بدون تغيير نسخة البداية.

**Bonus / للمتقدمين فقط**

- Top N على رسم مناسب وبـMeasure صحيحة.
- Relative date اذا عمود التاريخ مناسب والمعلومات الزمنية مفهومة.
- Conditional formatting مبني على معنى Business metric مش بس الاشارة + / -.
- اشرح ماذا يفعل التقرير عند اختيار قيمة واحدة او عدة قيم من الـField Parameter.

## محمود — SALES

**الفكرة:** اذا المدير سأل "المبيعات نزلت؟ طيب بأي منطقة وبأي منتج؟" يقدر ينتقل من منظور للتاني من نفس الرسم.

- Field parameter: Region / Product / Customer حسب أسماء الـDimensions المتاحة.
- Visual filter: Top 5 Products **by Total Revenue**، على الرسم فقط.
- Page filter: تاريخ / Region محددة مع التأكد من معنى الفلترة.
- Dynamic title: Performance by Region/Product/Customer.
- اختبار: لما تختار منطقة، شو الرسومات اللي لازم تتغير؟ وهل في سبب يخلي Benchmark ثابت؟

**Business sentence:** "اهم تغير بالمبيعات صار في ... وبدي افحص ..."

## سمية — OPERATIONS

**الفكرة:** نعرض ضغط الاوردرات والالتزام بدون ما نخلط بين اجمالي الطلبات والطلبات المتأخرة.

- Field parameter: Branch / Status / Issue Type اذا الحقول موجودة وصالحة للتحليل.
- Visual filter: فلتر Completed Orders لرسم واحد فقط، مش لكل الصفحة اذا الهدف مقارنة الحالات.
- Edit interactions: خلّي KPI مرجعي ثابت اذا كان مقصود تمثيل إجمالي مستقل.
- Bookmark panel: Date / Branch / Status Slicers عند توفرها.
- اختبار: لما الفلتر يكون Completed فقط، هل Cancelled Rate بعدها اله معنى؟ اشرح.

**Business sentence:** "المشكلة التشغيلية الابرز موجودة في ... بسبب ..."

## هشام — FINANCE

**الفكرة:** اشرح Actual vs Budget بشكل اداري مش مجرد لون احمر واخضر.

- Field parameter: Branch / Account / Cost Category حسب الحقول الموجودة.
- Page filter: Period / Business Unit اذا مناسبة للموديل.
- Visual filter: اكبر Variances على رسم محدد مع توضيح نوع الـVariance.
- Conditional formatting: فرّق بين Cost Variance وRevenue Variance؛ القيمة الموجبة مش دائما جيدة.
- اختبار: هل هاد الرسم يعرض Variance Amount أو Variance %؟ وليش؟

**Business sentence:** "اكبر انحراف عن الميزانية في ... وأوصي نراجع ..."

## ايناس — WORKFORCE

**الفكرة:** المدير لازم يشوف Gap وVacancies حسب القسم بدون تكرار الرسومات.

- Field parameter: Department / Grade / Employment Category اذا موجودة.
- Visual filter: اعلى الاقسام من حيث Vacancies او Gap.
- Page filter: قسم / تاريخ Snapshot مناسب اذا البيانات Snapshot.
- Dynamic title: Workforce Gap by Department/Grade.
- اختبار: لو Headcount عندنا Snapshot شهري، هل بنقدر نجمع 12 Snapshot لنقول عدد الموظفين بالسنة؟ (لا، إلا اذا المقصود عدد أيام-موظف، مش Headcount.)

**Business sentence:** "اكبر فجوة بين المطلوب والمتاح في ... والسبب اللي لازم ندرسه هو ..."

## checkpoints

- **40 دقيقة:** تمييز Scopes + Advanced filters، مع شرح شفهي واحد لكل شخص.
- **55 دقيقة:** Edit Interactions + Sync ناجحين (او توضيح صريح لعدم دعم موديل المتدرب للـSync).
- **85 دقيقة:** Show/Hide Bookmark يعمل، وفلاتر المستخدم ما بتتصفّر.
- **105 دقيقة:** Field Parameter + Dynamic Title شغالين.
- **120 دقيقة:** كل واحد يذكر Insight واحد ويبرهن على التفاعل.

## تسليم بسيط

1. ملف PBIX باسمك + Day09.
2. صورة قبل/بعد الـFilter Panel.
3. جملة واحدة: أهم insight بالـDashboard.