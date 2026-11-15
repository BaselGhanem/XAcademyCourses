// Course224 publication controls. These settings do NOT secure files on public GitHub.
const ACCESS_CONFIG = {
  agenda: "ON", // Publish the course agenda and introduction.
  publishedDays: [1],
  // AUTO: approve the prior day's recording to unlock its next day.
  // Old, unapproved archived videos do not unlock subsequent lessons.
  days: {
    "Day 1": "ON", "Day 2": "AUTO", "Day 3": "AUTO",
    "Day 4": "AUTO", "Day 5": "AUTO", "Day 6": "AUTO",
    "Day 7": "AUTO", "Day 8": "AUTO", "Day 9": "AUTO", "Day 10": "AUTO"
  }
};
function normalizeAccessMode(value) {
  const mode = String(value || "AUTO").trim().toUpperCase();
  return ["AUTO", "ON", "OFF"].includes(mode) ? mode : "AUTO";
}
function isAgendaEnabled() { return String(ACCESS_CONFIG.agenda || "ON").trim().toUpperCase() !== "OFF"; }
function getDayOverride(dayId) { return normalizeAccessMode(ACCESS_CONFIG.days[`Day ${Number(dayId)}`]); }
function isDayAutomaticallyOpen(dayId) {
  const day = Number(dayId);
  if (!Number.isInteger(day) || day < 1 || day > 10) return false;
  if (ACCESS_CONFIG.publishedDays.includes(day)) return true;

  // Only an approved, nonempty recording of the preceding session unlocks a lesson.
  const priorDay = day - 1;
  return typeof isApprovedDayVideo === "function"
    && typeof hasDayVideo === "function"
    && isApprovedDayVideo(priorDay)
    && hasDayVideo(priorDay);
}
function isDayOpen(dayId) {
  const override=getDayOverride(dayId);
  if(override==="ON")return true;
  if(override==="OFF")return false;
  return isDayAutomaticallyOpen(dayId);
}
