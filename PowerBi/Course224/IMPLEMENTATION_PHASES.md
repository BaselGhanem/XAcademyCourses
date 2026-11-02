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

## 2. Dataset and Days 01–04 — PENDING
- [ ] Shared reproducible dataset with fixed seed and documented fact grains.
- [ ] Data dictionary, source lineage, business rules, expected results.
- [ ] Rebuild source packs (Connect, Clean, Folder Refresh, Model).
- [ ] Validate row counts, date types, duplicates, joins and relationships.

## 3. DAX and Days 05–07 — PENDING
- [ ] Correct all discount definitions and measure names across lessons.
- [ ] Rebuild and Desktop-test Day 05 and 06 PBIX from a shared model.
- [ ] Refactor day 7 personalized guides, names and visuals into generic scenario packs.
- [ ] Verify previous month/year, growth and YTD numeric results.

## 4. Report UX, Days 08–10 and final release — PENDING
- [ ] Rebuild day 8–10 assignments against new scenario model, trim overlap.
- [ ] Unify chart design, branding, images and concept library.
- [ ] Keep native-versus-AI numerical parity tests and add assessed capstone.
- [ ] Scan old resources and remove only fully unused artifacts.
- [ ] Validate all browser routes, file links and PBIX/PBIP behavior.
- [ ] Replace videos with approved new recordings; publish agenda only when ready.

**Scope note:** The present code still references old exercise files and some old learner names inside their content. The site foundation is migrated; those training files are explicitly scheduled for stages 2–4. The static course code is not secure authorization.
