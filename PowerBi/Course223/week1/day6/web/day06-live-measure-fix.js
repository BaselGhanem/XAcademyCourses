/* Course223 Day06 / fixes exact measure name in original uploaded PBIX */
(() => {
  "use strict";
  const incorrect = "[Manager KPI Average]";
  const correct = "[Manager Score]";
  if (typeof getDay === "function") {
    const day = getDay(6);
    if (day?.learningSections) {
      for (const section of day.learningSections) {
        for (const step of section.steps || []) {
          if (typeof step.code === "string") step.code = step.code.replaceAll(incorrect, correct);
          if (Array.isArray(step.explain)) step.explain = step.explain.map(s => s.replaceAll("Manager KPI Average", "Manager Score"));
          if (typeof step.copy === "string") step.copy = step.copy.replaceAll("Manager KPI Average", "Manager Score");
        }
      }
    }
  }
  const fixMarkup = () => {
    for (const el of document.querySelectorAll(".xa-code-card pre code")) {
      if (el.textContent.includes(incorrect)) el.textContent = el.textContent.replaceAll(incorrect, correct);
    }
    for (const el of document.querySelectorAll(".xa-code-how p")) {
      if (el.textContent.includes("Manager KPI Average")) el.textContent = el.textContent.replaceAll("Manager KPI Average", "Manager Score");
    }
  };
  fixMarkup();
  const focus = document.getElementById("focus-app");
  focus?.addEventListener("focus:stepchange", fixMarkup);
})();