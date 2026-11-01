# Day 07 — One-file data refresh

Source PBIX: `week1/day7/data/HR_Performance_Intelligence_Day06.pbix` (user-uploaded and preserved byte-for-byte; Git blob 117a40c0ecd4d4f0b70e97e5f4c406dedc34ce0a).

Student gets only 3 required downloads: source PBIX, one additional CSV, optional Nova CSV for independent challenge. Trainer sees all checks in `Trainer/Day07_Trainer.html`.

## Steps in Power BI Desktop

1. Open latest Day06 PBIX and Save As Day07_Working.pbix. DO NOT overwrite uploaded original.
2. Power Query: Get Data > Text/CSV > `Day07_Additional_Assessments_2025_2026.csv`. Set types: AssessmentID/KPIID/AssessmentRound/AssessmentSource as Text, AssessmentDate as Date, KPIScore as Decimal. Name staging query `Day07_Additional_Assessments` and disable its independent load.
3. In original query `EvaluationScores_2026_H1` choose Append Queries, append `Day07_Additional_Assessments`. Do not append repeatedly or create a second active fact table.
4. Extend existing Calendar to include 2025-01-01..2026-12-31; retain Calendar[Date], QuarterLabel, relationship to AssessmentDate and sort mapping. Verify all 8 quarters and one-to-many relationship, and that the Date table is valid.
5. Cards: original `Manager Employee Weighted (Complete)` requires one employee and one quarter; `Manager Objective Score (Complete)` further needs context of a single Objective and completed KPIs. Loading data cannot remove these intended requirements. For executive summary card use the existing `Manager Weighted Score (Complete)` aggregated across employees WITH a single quarter (2026 case), or `Manager KPI Average` for all-quarter/general comparisons. Preserve original employee/objective measures and do not replace valid BLANKs with zero.
6. Apply Quick Measures using `Manager KPI Average` and Calendar[Date] for YoY and QoQ, preserve Manager assessment source context, then Field Parameters; do not use weighted performance YoY until 2025 weights are validated against 2026.

## Data QA

The one appended file contains 30,069 records in 6 quarters (2025 Q1-Q4 and 2026 Q3-Q4); it does not repeat 2026 Q1-Q2. See trainer-only `Trainer/Day07_Data_QA.json` for verified counts and Manager KPI averages. The 2025 data is aligned to the 2026 training KPI dimension to support a single model. The 2025 Q3/Q4 and 2026 Q3/Q4 are SYNTHETIC training extensions, not actual historical or future results. Never present the simulated data as genuine Ministry outcomes.

The PBIX itself is NOT modified on GitHub, because the binary DataModel requires supported Power BI Desktop editing to change Power Query/DAX and verify refresh; a ZIP package edit would not establish a working semantic model.

## Integration update — 2026-11-01

The standalone Comparison Studio page was merged into the canonical learner URL `day.html?id=7` through `data.js` learningSections plus the Day 07 hero injected by `day-experience.js`. Skill instructions: Data Update + Card Context; Quick Measures QoQ/YoY; KPI Cards; Line/Combo; Field Parameters; Layout Studio; Scroller. No instructor-only timers or answer keys in learner view.

Nova has been upgraded to a 24,000-row XLSX workbook with 24 category-specific medical products, 12 sales representatives, 32 synthetic customers, no Revenue column. Student challenge now uses Quantity, Target, and Distinct Customers (no Revenue measure dependency).
