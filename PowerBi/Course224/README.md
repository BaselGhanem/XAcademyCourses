# Course224 — Power BI Specialist | X Academy

**Course224 is the editable course**, cloned from the historical Course223. Do not create Course225. Phases 1–2 generalize the portal and source datasets. Original PBIX references and advanced lessons migrate in Phases 3–4.

## Learner portal
- `index.html`: overview with cross-domain examples; `agenda` is still OFF until approved publication.
- `login.html`: name, optional professional interest and the existing organizational course code.
- `dashboard.html`: self-paced course hub and next incomplete available lesson.
- `day.html`: lesson resources, progress, guided practice and challenge.
- `progress.js`: learner-name-scoped browser progress, independent of Course223.
- `access.js`: publication flags, independent of old video embeds.
- `data.js`: syllabus and original resource paths. Core Day01–Day10 learner packages have been rebuilt and source-validated; PBIP/PBIX runtime approval remains pending.
- `videos.js`: original embeds retained as source inventory; hidden via `showLegacyRecordings: false`.
- `styles.css`: responsive styles.

## Intended learning model
All learners study the same Power BI core skills. Sales, operations, finance and workforce are **example business questions**, not mandatory job roles. The method transfers to other professions when relevant, verified data is available. The learner's optional interest affects no access control.

The historic 2026 schedule is retained inside old lesson metadata for traceability but is not displayed in self-paced mode. The historical live meeting link is cleared.

## Technical security
The site is static and public. `portalPassword` inside JavaScript is **not authentication**; access flags cannot protect public GitHub file URLs. Progress in localStorage is per browser and per entered learner name, not cloud-synced. Private learner data and trainer answer keys should be hosted behind real server-side authorization if needed.

## Next stages
See [IMPLEMENTATION_PHASES.md](IMPLEMENTATION_PHASES.md) for the exact four-stage scope and acceptance criteria. Do not represent current PBIX or training ZIP files as fully re-validated until their relevant phase and Desktop QA are completed.

Brand: #099999 · Learn. Analyse. Lead.

## Phase 2 result (2026-11-02)
GitHub Actions rebuilt and verified **all 4 ZIP packages**, including exact row-level comparison of 160,000 Jan–Apr Day04 FactSales records to Day03. Folder Review is 160,000 before May and 200,000 after; DimDate is 730 typed Excel dates for 2025–2026. Jan–Apr net Revenue equals **12,534,018.65 JOD**, derived from the same transaction source. See `datasets/EXPECTED_RESULTS.csv` and `datasets/STAGE2_BUILD_MANIFEST.json`. The older Day04 40K infographic is hidden until it can be redesigned. Power BI Desktop execution tests remain outstanding and do not follow from source QA.

## Phase 3 result (2026-11-02)
- Rebuilt Days 05–07 ZIPs with source-linked PBIP projects (5 tables for Days 05/06; 9 tables for Day07). The original legacy PBIX are NOT shipped in the new student ZIPs because they predate the 160K model.
- The Day05/06 models include **160,000 original Jan–Apr 2026 transactions**; Day07 adds **160,000 clearly labelled synthetic Jan–Apr 2025 comparison transactions**. No 2025 sales were present in the Day04 source.
- Discount Status is strictly `Discounted` / `Full Price`; Discount Amount = Gross Sales − Revenue, and customer/quantity measure names are standardized.
- The Day07 portal links domain scenarios instead of names of the four former learners. Former personal resources have been audited; obsolete learner-specific files are removed from the active tree while Git history remains the recovery source.
- Source ZIP + PBIP static checks passed in GitHub Actions; **PBIP has not yet been opened and saved as PBIX in Power BI Desktop**. This remains a mandatory release blocker. Microsoft's desktop file conversion is not a programmatic operation.

## Phase 4 result (2026-11-02)
- Days 08, 09 and 10 now use a **byte-identical nine-table semantic model** cloned from the Stage3 Day07 PBIP, with one stage-specific instructional page. No fabricated completed Bookmarks, Tooltips or Drillthrough are claimed.
- Day 08: Report Design Lab, one Tooltip, one Drillthrough and navigation. Day 09: Sync Slicers, Bookmark filter panel, Field Parameter and Dynamic Title. Day 10: mandatory **100-point Capstone**; AI-assisted visual is optional.
- Concept Studio, domain missions, AI Prompt Builder and the primary course UI no longer depend on named trainees. The site uses teal-first styling and improved keyboard focus and reduced-motion support.
- See `datasets/LEGACY_CLEANUP.md` for removals and deliberately retained assets.
- The verified source ZIPs and site links are covered by Stage4 GitHub Actions, but **no Power BI Desktop acceptance has been performed**. See `week3/day10/CAPSTONE_QA_CHECKLIST.md` before enrolling learners in a production course.

## Actual Chromium browser QA (2026-11-02)
GitHub Actions [Chromium learner smoke run](https://github.com/BaselGhanem/XAcademyCourses/actions/runs/41453916196) **PASSED**. Verified wrong-code handling, learner login, interest display, dashboard day links, Day08–10 ZIP HTTP availability, Domain Mission switching, optional AI Prompt Builder, and Day07 scenario navigation. The run reported **0 uncaught JavaScript page errors**. Native day cards were changed from mouse-only `article` click handlers to keyboard-accessible `<a>` elements during this validation. The test used Chromium at 1280×800; it does not certify every responsive viewport or Power BI Desktop behaviour.

**Release status:** source ZIPs, site links and Chromium smoke checks passed. **Power BI Desktop PBIP → PBIX opening, refresh, DAX execution and report interactivity remain NOT TESTED.** See `week3/day10/CAPSTONE_QA_CHECKLIST.md`.

## Concept Studio follow-up (2026-11-03)

The missing Day08–Day10 Concept Studio learning path has been restored: **Day08: 5 topics** (visual hierarchy/selection, tooltip, drillthrough, navigation); **Day09: 5 topics** (slicer sync, bookmark state, selection pane, field parameters, dynamic titles); **Day10: 6 topics** (decision framing, source validation, capstone evidence, AI prompt scope, Native/HTML parity, accessibility). Every new concept has a full explanation, source-aligned example, common mistake, warning and an in-page visual. All concept cards now support keyboard Enter/Space. The Chromium smoke test opens and closes every new concept. These are documented **learning concepts**, not Desktop-tested Power BI runtime artifacts.
