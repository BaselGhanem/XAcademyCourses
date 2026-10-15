# Day 02 — Power Query: Cleaning Performance Evaluation Data

Prepared, not yet taught. Session: 18 October 2026, 19:00–21:00 Asia/Amman.

Main: 30,450 raw rows -> 300 exact duplicate copies + 595 review rows + 29,555 accepted rows.
Challenge: 12,180 raw rows -> 120 exact duplicate copies + 238 review rows + 11,822 accepted rows.

All people and evaluations are synthetic. EmployeeID and KPIID repeats are legitimate at this grain. Do not deduplicate by either alone. Keep Self, Manager and Upward separate. Missing scores are not zero. See the Dictionary and Reference for the precise incomplete-objective policy.

The ZIP contains current data, expected clean/review outputs, guides, validation, the trainer guide and reproducible tools. No Workforce/FTE dataset is included. Day 1 is unchanged.
