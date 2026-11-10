// Course224 publication controls. These settings do NOT secure files on public GitHub.
const ACCESS_CONFIG = {
  agenda: "ON", // Publish the course agenda and introduction.
  publishedDays: [1],
  days: {
    "Day 1": "ON", "Day 2": "OFF", "Day 3": "OFF",
    "Day 4": "OFF", "Day 5": "OFF", "Day 6": "OFF",
    "Day 7": "OFF", "Day 8": "OFF", "Day 9": "OFF", "Day 10": "OFF"
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
