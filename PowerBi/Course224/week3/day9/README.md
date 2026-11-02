# Day 09 — Master the Dashboard

**Course:** Power BI Specialist — Nova Business Performance 360  
**Session:** 120 minutes  
**Audience:** Mahmoud (Sales), Somaya (Operations), Hisham (Finance), Enas (Workforce)  
**Language:** Jordanian Arabic + technical English  

## Contents

| File | Purpose |
| --- | --- |
| `DAY09_STUDENT_MISSIONS.md` | All-trainee requirements and role-specific Sales / Operations / Finance / Workforce missions |
| `DAY09_CHECKLIST.md` | Final QA checklist and mini assessment |
| `Nova_Day09_Theme.json` | Valid basic Power BI report theme |
| `DAY09_SITE_COPY.md` | Ready-to-paste updated day-nine portal content and resource labels |
| `assets/Day09_Plan_Poster.svg` | Day 9 premium portrait overview image |

## Required course file

Use the **actual Day 7/8 Nova Business 360 PBIX** with the existing four trainee pages. **The original PBIX is available at `downloads/Nova_Day09_Executive_360.pbix`; the first iteration of this pack did not contain a PBIX**, because the working model and actual field names are not available in the supplied files. Do not recreate or invent models. Make a separate copy: `Nova_Business_360_Day09_START.pbix` and, after the workshop, save `Nova_Business_360_Day09_COMPLETED.pbix`.

## Use

2. Load the actual Day 7/8 `.pbix` in Power BI Desktop.
3. Work through the shared example first, then each learner finishes their own page.
4. Import `Nova_Day09_Theme.json` via **View > Themes > Browse for themes** if the existing report design does not already have a coherent theme.
5. Test bookmarks using the actual report, not the simulator's demo values.

## Website integration

Day 9 is configured in `data.js` as **Master the Dashboard**. Day 9 student materials are published to GitHub. The online poster is an SVG counterpart; the original PNG and full ZIP are available in the conversation. To integrate, upload the files into `week3/day9/` and update `data.js` with the text in `DAY09_SITE_COPY.md` while keeping the site's current route/access setup.

## Important Power BI technical notes

- Power Query filters affect data being loaded/processed, unlike the three report filter scopes. Test filtering on a temporary query copy or remove the added Applied Step after demonstration.
- Hiding a Slicer by Bookmark does **not** clear its filter. Turn **Data off**, **Display on** for UI bookmarks. Use **Selected visuals** for the panel/buttons. If changing view, do not accidentally capture other report data/visibility states.
- Native Bookmarks do not automatically resize/reflow visuals. Our teaching layout uses a floating overlay filter panel to free the visible report canvas.
- If one report page has different fact tables, a report-level filter must be based on a genuinely shared, properly related dimension, or it may not affect all pages as expected.
- Do not blindly use red/green rules for Finance variance: favorable or unfavorable depends on whether the metric reflects cost, revenue, etc.
- Workforce headcount across snapshots is often non-additive across time. Do not sum daily headcount to estimate employees.
- Field Parameter caption columns may use composite grouping. The included dynamic title DAX uses `SUMMARIZE` over caption and parameter field columns rather than naive `SELECTEDVALUE`.

## Sources

Microsoft Learn:
- https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter
- https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks
- https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-field-parameters
- https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions
- https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers
- https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-format-visual-titles