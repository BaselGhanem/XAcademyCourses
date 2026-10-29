# Power BI — Mariam — Course223

دورة خاصة: 10 جلسات / 20 ساعة، التطبيق من اليوم الثاني على Employee Performance Management ببيانات افتراضية

- Day 1 تم تدريسه في 15 اكتوبر 2026، لا تعديل على محتواه او تسجيله
- Day 2 مجهز ولم يدرس بعد، موعده 18 اكتوبر 2026
- Days 3–10 خطط فقط، موادها لم تجهز

## صفحات العمل

- index.html: الجدول والخطة العامة
- dashboard.html: مركز المتدربة وتقدم التطبيق المحلي
- day.html?id=2: تجربة اليوم الثاني بنفس نظام التنقل الحالي
- Trainer/index.html: مساحة المدرب
- Trainer/Day02_Performance.html: Timeline 120 دقيقة وChecklist وملاحظات محفوظة محليا
- week1/day2/web/Day02_Guide.html: الشرح
- week1/day2/web/Day02_Challenge.html: التمرين المستقل
- week1/day2/web/Day02_Dictionary.html: قاموس البيانات
- week1/day2/web/Day02_Reference.html: الارقام وسياسة الاعتماد
- ADAPTATION_PLAN.md: سجل التدريس والخطة وقواعد التقييم

## التحقق

من مجلد week1/day2 شغل `python tools/verify_data.py`
لا يحتاج حزم خارجية، يقرأ CSV الفعلي ويعيد التنظيف ويقارن Clean وReview والارقام في validation.json
ملف fnCleanPerformance.pq مرجع للمدرب، لم يثبت تنفيذه داخل Power BI Desktop حتى تختبره المتدربة او المدرب

## البيانات والدخول

التطبيق 30,450 صف خام والتحدي 12,180 صف خام، المرجع لا يجمع اتجاهات التقييم في نتيجة واحدة
access.js وvideos.js وlogin.html بقيت دون تغيير، تقدم التطبيق لا يعني انه تم تدريسه فعليا
النسخ القديمة من بيانات اليوم الثاني استبدلت بالحزمة الجديدة، ملفات اليوم الاول بقيت كما هي

## تجهيز اليوم السادس (29 اكتوبر 2026)

- جاهز للتدريس، ولم يؤكد التنفيذ بعد
- EvaluationScores_2025_H1.csv: 10,023 صفا، نفس Schema 2026 ومتوافق مع KPIs التاريخية
- ObjectiveProgressSnapshots.csv: 14,400 صفا، مفاتيح Objectives صحيحة وتواريخ شهرية
- Trainer/Day06_Expansion.html: دليل خطوات المدرب 120 دقيقة مع Focus Mode وChecklist
- Trainer/Day06_Reference.html: نتائج تحقق مفصلة غير ظاهرة لمريم
- استعمل Append Queries as New مع staging Connection only كي لا تتغير Measures 2026 الحالية
- نسخة PBIX المنقحة لنهاية اليوم الخامس محفوظة بمكتبة المستخدم الخاصة، ولم تنشر في مستودع GitHub العام

## Course223 — تغيير خطة 29 اكتوبر 2026

- Days 1–5 remain preserved as the actually taught record; Day 06 is prepared, not taught.
- Day 06 is now a hybrid weighted-DAX + interactive report lesson using the original Day05 PBIX only: SUMX / DIVIDE / REMOVEFILTERS / Contribution, third report page and basic Buttons/Bookmarks.
- Drillthrough / Drill Down → Day07; Report Page Tooltips + Field Parameters + Dynamic Titles → Day08; full Sidebar/Bookmarks/Sync Slicers → Day09; HTML Content/SVG/AI Design/QA → Day10.
- The previously published Day06 CSVs stay in the repo but are not learner resources or required datasets for Day06.
- Trainer-only references: Trainer/Day06_Expansion.html, Trainer/Day06_Reference.html, Trainer/Day06_DAX_Reference.dax.
- Student preview: week1/day6/web/Day06_Weighted_Blueprint.html.
- Day05 original PBIX is untouched in week1/day6/data/.
- The previous source-expansion Day06 plan is archived as superseded in ADAPTATION_PLAN.md.
