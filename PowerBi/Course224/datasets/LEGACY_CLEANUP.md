# Course224 — Stage4 Legacy File Audit (2026-11-02)

Baseline recovery branch: `backup/course224-before-stage4-2026-11-02`.

## Replaced
- Old Day07 four-person landing page and gallery are replaced by generic domain navigation with four validated scenario pages.
- Day08 source now builds from the Stage3 Day07 9-table PBIP, not named-person `FINAL_REFERENCE`.
- Day09 old PBIX is no longer linked as a valid course starter; the new Day09 PBIP uses the same nine-table model.
- Day10 DAX examples have generic domain filenames, and all current learner pages point to those generic filenames.
- Day10 has a mandatory 100-point Capstone; AI Visual is optional.

## Safe removal candidates
- 4 person-named Day07 learner HTML pages (replaced by `*_SCENARIO.html`).
- 4 person-named Day10 DAX example filenames (new generic copies exist).
- Old Day07 `FOUR_DASHBOARDS.zip`, `Nova_Day07_START.pbix`, `Day07_TRAINER_REFERENCES.zip`.
- Old Day09 `Nova_Day09_Executive_360.pbix`, `DAY09_SITE_COPY.md`.
- Old Day08 source builder `tools/build_week3_day8.py` references former-cohort trainer `FINAL_REFERENCE`.
- Old top-level `Day08_09_10_Original_Designs_GitHub_Ready.zip` is a historic design source, not a new course learner resource.

These historical files remain recoverable from Git history and the backup branch. **Removal decisions apply to the Course224 working tree only**, not Course223.

## Retained pending further validation
- Old concept images, Day07 source icons and reference screenshots: some may be referenced in older still-accessible pages; leave them rather than break deep links without a full asset-to-asset audit.
- Day08 PDF references: retained because they may be useful as offline learning references.
- Trainer materials: retained until content and access security are separately reviewed.

## Release gates
Static ZIP integrity, local-resource existence, JavaScript syntax and Capstone sum can be passed by GitHub Actions. `Nova.pbip` open/refresh/DAX compile, relationship runtime, Drillthrough, Bookmarks, HTML Content and PBIX Save As **remain NOT TESTED in Desktop**. Mark the course as source-ready, not Desktop-certified.

## Real browser verification
- Chromium 141 (Playwright) on Ubuntu 24.04 passed the learner-journey smoke test on 2026-11-02.
- Verified login, domain preference, dashboard navigation, Day08–10 package HEAD responses, four-domain mission selector, AI Prompt Builder and generic Day07 navigation.
- No uncaught JS errors were observed in the tested routes.
- Native cards now use keyboard-focusable anchors, not mouse-only click handlers.
- Responsive visual inspection on small devices and runtime Power BI Desktop tests remain outstanding.
