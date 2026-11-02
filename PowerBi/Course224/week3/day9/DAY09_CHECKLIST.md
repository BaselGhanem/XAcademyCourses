# Day 09 — Final QA & Exit Ticket

## Check in the actual PBIX

- [ ] لم تتغير الأرقام بشكل غير مقصود بعد تجربة Power Query filter
- [ ] أعرف الفرق بين PQ filtering وVisual/Page/Report filtering
- [ ] Visual filter يؤثر فقط على Visual المطلوب
- [ ] Page filter يؤثر على الصفحة الصحيحة
- [ ] Report filter اختبرته على صفحات فيها مسار علاقة صحيح
- [ ] Advanced/Top N/Relative date مستخدمين صح حسب نوع الحقل وهدف التقرير
- [ ] Edit interactions سلوكه واضح للمستخدم
- [ ] Sync slicer يحافظ على الاختيار عبر الصفحات المقصودة
- [ ] Show/Hide panel شغال من الزرين
- [ ] Bookmarks: Display ON / Data OFF / Selected visuals / Current page OFF
- [ ] إخفاء Slicer لا يزيل تأثيره على النتائج
- [ ] Field Parameter يبدل الDimension الحقيقي وليس مجرد عنوان
- [ ] Dynamic title يعكس الاختيار المختار
- [ ] أي لون أداء يعكس معنى الـKPI الحقيقي
- [ ] لا توجد رسومات متداخلة أو أزرار غير قابلة للنقر
- [ ] تم حفظ نسخة Day09 كاملة، ونسخة Day07/08 الأصلية محفوظة

## Exit Ticket — أربع اسئلة

**Q1**: بدي اخفي Test rows عن الـModel وقت التحميل — Power Query ولا Page Filter؟  
**A**: Power Query filter اذا هذا تغيير مقصود ودائم في معالجة البيانات

**Q2**: بدي رسم واحد Top 5، وباقي الرسومات كاملة — اي Scope؟  
**A**: Visual-level Top N filter مع Measure مناسبة

**Q3**: اخفيت الـSlicer بـBookmark بس لسه البيانات متفلترة — Bug؟  
**A**: لا، سلوك متوقع. الـSlicer المخفي بيستمر بتصفية التقرير

**Q4**: كبست Show/Hide والـSlicer رجع Default — شو أول شيء بتفحص؟  
**A**: `Data` داخل Bookmark لازم OFF، ثم `Update` للـBookmarks والـSelected visuals

## Reflection

"اليوم تعلمت كيف اخلي المستخدم ______________________________ بدل ما ______________________________"