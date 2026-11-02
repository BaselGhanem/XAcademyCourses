# Course224 — Power BI Specialist | X Academy

**Course224 is the editable course**, cloned from the historical Course223. Do not create Course225. Phases 1–2 generalize the portal and source datasets. Original PBIX references and advanced lessons migrate in Phases 3–4.

## Learner portal
- `index.html`: overview with cross-domain examples; `agenda` is still OFF until approved publication.
- `login.html`: name, optional professional interest and the existing organizational course code.
- `dashboard.html`: self-paced course hub and next incomplete available lesson.
- `day.html`: lesson resources, progress, guided practice and challenge.
- `progress.js`: learner-name-scoped browser progress, independent of Course223.
- `access.js`: publication flags, independent of old video embeds.
- `data.js`: syllabus and original resource paths. The current binary exercises remain **legacy until rebuilt**.
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
