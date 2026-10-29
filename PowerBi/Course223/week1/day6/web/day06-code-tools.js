/* Day 06 code blocks: shared copy + teacher focus-mode code viewer. */
(() => {
  "use strict";
  const copyText = async text => {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); return true; } catch (_) {}
    }
    const area = document.createElement("textarea");
    area.value = text; area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
    document.body.append(area); area.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_) {}
    area.remove(); return ok;
  };
  document.addEventListener("click", async event => {
    const button = event.target.closest(".mj-copy-code, .xa-copy-code");
    if (!button) return;
    const card = button.closest(".mj-dax-code, .xa-code-card");
    const code = card?.querySelector("pre code")?.textContent;
    if (!code) return;
    const label = button.textContent;
    const success = await copyText(code);
    button.textContent = success ? "تم نسخ الكود ✓" : "حددي الكود لنسخه";
    button.setAttribute("aria-live", "polite");
    window.setTimeout(() => { if (button.isConnected) button.textContent = label; }, 2200);
  });
  if (!document.body.dataset.checklist?.startsWith("Day06_Hybrid")) return;
  const focus = document.getElementById("focus-app");
  if (!focus) return;
  const sourceSteps = [...document.querySelectorAll("body > main > section[data-phase]")].filter(section => section.querySelector("[data-check]"));
  const anchor = focus.querySelector("#cf-step-help");
  if (!anchor) return;
  const slot = document.createElement("div");
  slot.className = "xa-focus-code";
  slot.setAttribute("aria-label", "الكود المرتبط بخطوة الشرح الحالية");
  anchor.before(slot);
  function renderCodes() {
    const number = /STEP\s+(\d+)/.exec(focus.querySelector("#cf-number")?.textContent || "");
    const i = number ? Number(number[1]) - 1 : -1;
    const section = sourceSteps[i];
    const cards = section ? [...section.querySelectorAll(".xa-code-card")] : [];
    slot.replaceChildren(...cards.map(card => card.cloneNode(true)));
    slot.hidden = cards.length === 0;
  }
  focus.addEventListener("focus:stepchange", renderCodes);
  renderCodes();
})();