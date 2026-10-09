// ============================================================
// ACCESS CONTROL — هذا هو الملف الوحيد الذي تحتاج تعدله للتحكم بالفتح
// ============================================================
//
// AGENDA:
// "ON"  = صفحة index.html تظهر بشكل طبيعي وفيها أجندة الدورة.
// "OFF" = أي شخص يدخل index.html يتحول مباشرة إلى login.html.
//
// DAYS:
// "AUTO" = النظام يقرر تلقائياً حسب الفيديوهات:
//          Day 1 مفتوح دائماً.
//          عندما ترفع فيديو Day 1 ينفتح Day 2.
//          عندما ترفع فيديو Day 2 ينفتح Day 3... وهكذا.
// "ON"   = افتح هذا اليوم إجبارياً حتى لو AUTO يعتبره مقفلاً.
// "OFF"  = اقفل هذا اليوم إجبارياً حتى لو فيه فيديو أو AUTO يريد فتحه.
//
// ملاحظة مهمة:
// ON / OFF اليدوي له الأولوية دائماً على AUTO.
// إذا أردت ترجع اليوم للوضع الطبيعي فقط اكتب "AUTO".
//
// مثال سريع:
// "Day 4": "ON"  => Day 4 مفتوح بالقوة.
// "Day 4": "OFF" => Day 4 مقفل بالقوة.
// "Day 4": "AUTO" => يتبع تسلسل الفيديوهات تلقائياً.
// ============================================================

const ACCESS_CONFIG = {
  agenda: "OFF", // غيّرها إلى "OFF" إذا أردت index.html يحول مباشرة إلى login.html.

  days: {
    "Day 1": "AUTO",  // AUTO / ON / OFF
    "Day 2": "AUTO",  // AUTO / ON / OFF
    "Day 3": "AUTO",  // AUTO / ON / OFF
    "Day 4": "AUTO",  // AUTO / ON / OFF
    "Day 5": "AUTO",  // AUTO / ON / OFF
    "Day 6": "AUTO",  // AUTO / ON / OFF
    "Day 7": "AUTO",  // AUTO / ON / OFF
    "Day 8": "AUTO",  // AUTO / ON / OFF
    "Day 9": "AUTO",  // AUTO / ON / OFF
    "Day 10": "AUTO"  // AUTO / ON / OFF
  }
};

function normalizeAccessMode(value) {
  const mode = String(value || "AUTO").trim().toUpperCase();
  return ["AUTO", "ON", "OFF"].includes(mode) ? mode : "AUTO";
}

function isAgendaEnabled() {
  return String(ACCESS_CONFIG.agenda || "ON").trim().toUpperCase() !== "OFF";
}

function getDayOverride(dayId) {
  return normalizeAccessMode(ACCESS_CONFIG.days[`Day ${Number(dayId)}`]);
}

function isDayAutomaticallyOpen(dayId) {
  const id = Number(dayId);

  // Day 1 هو نقطة البداية ومفتوح دائماً في وضع AUTO.
  if (id === 1) return true;

  // كل يوم لاحق ينفتح تلقائياً فقط عندما يكون فيديو اليوم السابق موجوداً.
  // مثال: فيديو Day 1 موجود => Day 2 مفتوح.
  return typeof hasDayVideo === "function" && hasDayVideo(id - 1);
}

function isDayOpen(dayId) {
  const override = getDayOverride(dayId);

  // التحكم اليدوي له الأولوية على أي شيء آخر.
  if (override === "ON") return true;
  if (override === "OFF") return false;

  return isDayAutomaticallyOpen(dayId);
}
