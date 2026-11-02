# DAY 10 · YOUR VISUAL, YOUR STYLE

> اليوم مش اختبار نسخ كود. الهدف تشرح للـAI شو بدك، وتفحص النتيجة، وتعرف تصلحها.

## Core (everyone)
1. افتح نسخة Save As من \`Nova_Day09_Executive_360.pbix\`.
2. اعرض الـNative Visual الأصلي بجانب نسخة HTML Content.
3. افتح [AI Visual Design Lab](ai-visual-design-lab.html)، وحدد السؤال، أسماء الـMeasures، Dimensions، Chart Type، وأبعاد الرسم.
4. اختار Effect واحدة مناسبة، وخلّي نسخة Static fallback متاحة.
5. انسخ الـPrompt للـAI، واطلب منه **DAX Measure كاملة**. راجع أسماء الحقول قبل أي Paste.
6. اختبر الأرقام مع الـNative Visual ونفس الفلاتر. إذا تعطل استخدم **Visual Rescue Mode** أو ملفات المراجع.
7. احكي لنا: What changed visually? What stayed numerically the same? Why this chart?

## Personal missions

### Mahmoud — Sales
- **Question:** أي Category أعلى بالإيراد؟
- **Verified binding:** \`[Total Revenue]\` + \`DimProduct[Category]\`
- **Suggested chart:** Sorted Horizontal Bar, Top 5 for 474×271 px
- **Design option:** Static-first Bar + Decorative Shine
- **Pass criteria:** biggest value longest bar, correct order, correct revenue format, slicer-safe

### Somaya — Operations
- **Question:** شو نسبة الطلبات المكتملة في الوقت؟
- **Verified binding:** \`[On Time %]\` + \`[Completed Orders]\`
- **Suggested chart:** Progress Ring
- **Design option:** Soft Pulse on non-data ornament
- **Pass criteria:** real percent value, visible ring without animation, denominator logic from existing measure, slicer-safe
- **Watch-out:** Do not assume [On Time %] is in 0–100 rather than 0–1. Verify.

### Hisham — Finance
- **Question:** هل وصلنا 100% من تحقيق الموازنة؟
- **Verified binding:** \`[Budget Achievement %]\`
- **Suggested chart:** Bullet Chart, 100% benchmark
- **Design option:** Glass look with static target marker
- **Pass criteria:** actual value, 100% target always visible, over-target scale handled, blanks correctly shown

### Enas — Workforce
- **Question:** أي Department عنده أكبر فجوة بالتوظيف؟
- **Verified binding:** \`[Staffing Gap]\` + \`DimDepartment[Department]\`
- **Suggested chart:** Diverging Bar
- **Design option:** Slide Reveal for title ONLY, never actual bars
- **Pass criteria:** sign and zero baseline correct, department labels readable, snapshot meaning preserved

## Checkpoints in the 30-minute lab
- **Minute 10:** AI Prompt generated and real model fields copied.
- **Minute 20:** DAX measure pasted; values compared to native visual.
- **Minute 30:** effect chosen, QA done, one finding stated.

If you're blocked at Minute 10 or 20, open the [reference DAX pack](examples/README.md) and continue with design and QA. It's better to leave with a correct static visual than a broken animated one.

## Final rubric (100)
- Data + Filter Context 35
- Legibility + chart choice 25
- Prompt specificity 20
- Design + motion restraint 10
- QA + debug 10
