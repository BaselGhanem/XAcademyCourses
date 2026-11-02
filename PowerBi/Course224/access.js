// Course224 publication controls. These settings do NOT secure files on public GitHub.
const ACCESS_CONFIG = {
  agenda: "OFF", // Preserve the prior public agenda setting until release.
  publishedDays: [1,2,3,4,5,6,7,8,9,10],
  days: {
    "Day 1": "AUTO", "Day 2": "AUTO", "Day 3": "AUTO",
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
function isDayAutomaticallyOpen(dayId) { return ACCESS_CONFIG.publishedDays.includes(Number(dayId)); }
function isDayOpen(dayId) {
  const override=getDayOverride(dayId);
  if(override==="ON")return true;
  if(override==="OFF")return false;
  return isDayAutomaticallyOpen(dayId);
}
