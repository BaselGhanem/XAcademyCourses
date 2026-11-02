# DAY 10 — Nova HTML Visual Reference Pack

## STATUS / HOW TO USE
These DAX measures are **source-checked** against the actual Day 9 PBIX report visual definitions and have static-first CSS. They have **not been executed inside Power BI Desktop** by this environment. The instructor must run the final Power BI smoke test before presenting them as verified working measures.

This is the student's recovery pack, not a replacement for the AI Prompt Engineering challenge. Keep the original PBIX unchanged; use a local **Save As** copy.

## Confirmed original visual field bindings
- **Sales / Mahmoud** — \`FactSales[Total Revenue]\`, \`DimProduct[Category]\`
- **Operations / Somaya** — \`FactOperations[On Time %]\`, \`FactOperations[Completed Orders]\`
- **Finance / Hisham** — \`FactFinance[Budget Achievement %]\` (100% benchmark).
- **Workforce / Enas** — \`FactWorkforce[Staffing Gap]\`, \`DimDepartment[Department]\`

Measure shorthand \`[Total Revenue]\` etc. is valid within a DAX measure. Field names were extracted from report definition JSON; the complete semantic model's DAX definitions have not been independently executed in this environment.

## Basic → Premium workflow
1. In Power BI Desktop, Save As \`Nova_Day10_Visual_Lab.pbix\`.
2. Show the relevant existing **native Card/Bar** with its real measures and slicers.
3. Create the referenced measure below with **Modeling > New measure**.
4. Place **HTML Content** visual alongside native comparison. Add measure to its values.
5. Check that the **static data geometry** is present before evaluating the optional CSS glow/shimmer.
6. Compare values using identical Date/Region/Department filters; check largest category, smallest, BLANK, 0, negative, and selected month.
7. Optional motion is limited to *decorative overlays*. The underlying bar/ring/marker always stays visible.

## Training viewport sizes
- Sales: 620×340 (or 474×271 using **Top 5**, not Top 8).
- Operations: at least 400×240.
- Finance: at least 480×250.
- Workforce: at least 620×340.
Those are recommended teaching sizes, **not guarantees** across versions of HTML Content. Test the host's padding and scale.

## Semantic pitfalls
- **Sales:** categories with BLANK revenue are omitted. Genuine zeros remain. Bar lengths use numeric values, not FORMAT.
- **Operations:** expects [On Time %] to return 0..1 fractional rate; verify with native Card. The visual clamps stroke geometry to 0..1 but shows raw formatted rate so an out-of-range error is discoverable. The green/yellow/red thresholds are illustrative design choices, **not company rules**.
- **Finance:** a 100% budget attainment benchmark is used; the axis expands for overperformance. If the measure is negative, the bar is drawn as zero but the formatted negative value remains visible—discuss as an edge case.
- **Workforce:** positive and negative gaps are deliberately labelled by **sign**, not “vacancy vs surplus,” until the definition of [Staffing Gap] is verified. The existing measure should encode monthly snapshot logic; do not SUM employee counts over months.

## No false Power BI interaction guarantees
HTML hover is decorative. It does not imply native Power BI cross-filtering. Do not assume JavaScript support, DOM permissions or cross-highlight parity. Native buttons can be used for page navigation.

## Source / Files
- \`01_MAHMOUD_SALES_BAR.dax\`
- \`02_SOMAYA_OPERATIONS_RING.dax\`
- \`03_HISHAM_FINANCE_BULLET.dax\`
- \`04_ENAS_WORKFORCE_DIVERGING.dax\`

## Instructor smoke-test checklist (required)
- [ ] Paste each complete measure into Power BI Desktop (no DAX errors).
- [ ] Confirm each renders within **HTML Content regular** visual.
- [ ] Compare all displayed values with a native card/table in the same filter context.
- [ ] Confirm first and highest Sales category bar is full length; max 1,000,000 vs 900,000 yields 100% vs 90%.
- [ ] Change Year/Month slicers; verify no stale values.
- [ ] Set BLANK / 0 / negative filters where present; verify expected treatment.
- [ ] View at smallest dimensions; check clipping, overflow, font size and filter transitions.
- [ ] Toggle reduced-motion or disable CSS animations and verify data stays visible.
