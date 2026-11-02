# Course224 — Implementation plan (four stages)

Baseline recovery branch: `backup/course224-before-generalization-2026-11-02`.

## 1. Foundation and learner website — COMPLETED
- [x] General-domain wording on course portal; no mandatory named learners.
- [x] Self-paced mode hides previous 2026 class dates and obsolete live meeting link.
- [x] Optional professional interest; same lessons for every background.
- [x] Progress namespaced for Course224 and separate for each learner name on this browser.
- [x] Publication status independent of videos; archival recordings hidden.
- [x] Existing ZIP/PBIX paths kept intact until content replacement.
- [x] README and migration QA boundaries documented.

## 2. Dataset and Days 01–04 — COMPLETED (DATA & PACKAGE QA)
- [x] Shared reproducible dataset with fixed seed and documented fact grains.
- [x] Data dictionary, source lineage, business rules, expected results.
- [x] Regenerate and publish the 4 existing ZIP packs after CI QA.
- [x] Validate 160K Day03→Day04 transaction rows, source-level keys, real Excel dates, money, May files, and ZIP checksums.
- [ ] Validate relationships and visuals inside Power BI Desktop as part of final QA.

## 3. DAX and Days 05–07 — COMPLETED (SOURCE & PBIP STATIC QA)
- [x] Correct discount calculations/status and DAX names across Day05/Day06.
- [x] Rebuild source-aligned Day05 and Day06 PBIP starters, each with full 160K transaction model.
- [ ] Open, refresh and Save As PBIX inside Power BI Desktop; requires Windows Desktop QA.
- [x] Replace Day07 named-person portal pages and generated pack with four domain scenario guides.
- [x] Audit and retire obsolete person-named files and old Day07/Day09 student starters; retain recoverability in Git history.
- [x] Generate independent source-based PM, YoY and YTD numeric controls for sample period and run cross-year source checks.
- [ ] Validate DAX outputs against those controls inside Power BI Desktop.

## 4. Report UX, Days 08–10 — COMPLETED (SOURCE / SITE QA); DESKTOP RELEASE GATE OPEN
- [x] Rebuild Day08–Day10 from the same exact Stage3 semantic model; trim scope overlap.
- [x] Update teal-first site CSS and remove named trainees from active Concept Studio and Day08/Day10 challenge pages.
- [ ] Visually inspect browser pages on desktop and mobile and verify image rendering.
- [x] Introduce mandatory 100-point Capstone; document Native-vs-AI numerical parity as an optional Desktop test.
- [x] Audit major active dependencies and retire disconnected old student-specific files; record retained assets in LEGACY_CLEANUP.md.
- [x] Validate ZIP contents, site resource links, JS syntax, shared PBIP semantic model and capstone rubric in CI.
- [ ] Run real browser interaction tests and open/refresh/validate PBIP/PBIX in Power BI Desktop.
- [ ] Replace old recordings with approved new media and enable public agenda at launch; do not silently reuse old videos.

**Release gate:** The four source-based stages are implemented, but `Power BI Desktop` and real-browser UX testing have NOT been completed. The portal's client-side password is not secure authorization. Treat the course as **source-ready / runtime-pending**, not fully certified.
