# Nova Data Contract - General-audience Course224

Synthetic training company, not specific trainees or professions.

- **Transaction grain:** unique `Transaction ID`. Each month Jan–May 2026 has 40,000 sales. Jan-Mar Day01 is exactly Day03 Jan-Mar. Day04 FactSales is the FULL Jan-Apr 160,000 transactions. May is held out: Folder count becomes 200,000 on refresh.
- **Master keys:** 240 unique Product IDs, 8,000 unique Customer IDs, and 100 unique Branch IDs. Branch ID determines the authoritative branch Region and Channel. Product `List Price` is not guaranteed to match transaction `Unit Price`.
- **Star model:** DimDate[Date]→FactSales[Order Date], DimProduct[Product ID]→FactSales[Product ID], DimCustomer[Customer Code]→FactSales[Customer ID], DimBranch[Branch ID]→FactSales[Branch ID]. All 1:* and single direction Dimension to Fact.
- **Date semantics:** 730 contiguous typed Excel dates cover 2025–2026. Sales exist Jan-Apr 2026 before adding May. No Sales in 2025 does **not** establish zero historical performance.
- **Money:** Revenue = rounded(Quantity × Unit Price × (1−Discount %), 2) in JOD, net after discount. Gross Sales = Quantity × Unit Price; Discount Amount = Gross Sales − Revenue; Discount Status: `Discounted` when rate > 0, else `Full Price`. Cents may differ from unrounded discount formula.
- **Day02:** dirty branch records have Branch ID + Date intended grain, with mixed date formats, 100 exact duplicates and deliberately unknown/invalid fields. Blank Revenue is unknown, not zero; `invalid-date` must not be invented.
- **Different facts:** weekly Branch Performance web KPI and regional Budget PDF do not automatically reconcile with transaction Sales. Align granularity/time/business definitions first. Workforce Headcount snapshots are non-additive over time.
- **Sampling:** Day04 Merge and Append REVIEW tasks are intentional subsets, separate from full Folder Review and FactSales.

See `DATA_DICTIONARY.csv`, `DATA_LINEAGE.md`, and generated `EXPECTED_RESULTS.csv`. Power BI Desktop visual/filter QA is required in addition to dataset tests.
