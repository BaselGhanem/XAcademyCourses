# Course224 Final Manual Power BI Desktop QA

| Test | Expected | Status |
|---|---|---|
| Open stage PBIP on supported Power BI Desktop | Report and model load | NOT TESTED |
| Refresh embedded tables | No errors | NOT TESTED |
| Model View | 9 tables and 11 correct relationships | NOT TESTED |
| Sales row count | 320,000 = 160K 2026 +160K synthetic 2025 | NOT TESTED |
| Jan–Apr 2026 Total Revenue | 12,534,018.65 JOD | NOT TESTED |
| April 2026 vs April 2025 | 3,147,901.82 vs 3,196,699.86 JOD | NOT TESTED |
| Workforce | Last snapshot, not SUM across months | NOT TESTED |
| Day08 Tooltips / Drillthrough / Nav | Accurate filter transfer | NOT TESTED |
| Day09 Sync / Bookmarks / Field Parameters | Preserve correct selections | NOT TESTED |
| Optional HTML Content | Native parity, static fallback, no clipping | NOT TESTED |
| Save As PBIX and reopen | Model/report function | NOT TESTED |

A GitHub Actions pass is **not** a substitute for these Desktop tests. Sign off only after real user verification.
