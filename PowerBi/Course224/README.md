# Course224 — Power BI Specialist | X Academy

**Course224 is the editable course**, cloned from the historical Course223. Do not create Course225. Phase 1 makes the student portal domain-neutral; source files and existing lessons are migrated in phases 2–4.

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
