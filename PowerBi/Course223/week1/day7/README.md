# Day 07 / Source Notes

The student's latest Day06 PBIX is kept unchanged. Do not substitute the older Day05 backup.

Data files share original EvaluationScores_2026_H1 CSV schema. Imported historical 2025 KPI IDs are deliberately aligned to the 2026 training KPI dimension for consistent comparison. The original 2025 H1 is unmodified in Day06.

The 2025 H2 and 2026 H2 are synthetic generated quarters, **not actual ministry data**. All new KPI rows originate from the archived 2025 H1 template, with date/quarter and score transformations, preserving the original pattern of missing Manager observations. Do not convert missing assessment to zero.

Append three added evaluation CSVs into the existing EvaluationScores_2026_H1 query on a new Save As copy. Ensure the Calendar covers both years. Evaluate card context separately: loading rows does not fix Employee weighted result without a selected employee/quarter.

Nova sales has 24,000 synthetic rows, exactly 3,000 per quarter; prepare a separate practice PBIX with a date table before training.
