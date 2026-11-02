# Day 09 — Acceptance Checklist

- [ ] Model uses the same Day07 nine tables and 11 intended relationships
- [ ] Filters use real fields, correct grain and correct scope
- [ ] Synced DimDate slicer affects only intended report pages
- [ ] Bookmarks: Display ON, Data OFF, Selected visuals
- [ ] Hiding a slicer does not misrepresent active filter selections
- [ ] Field Parameter changes a real dimension, not just a text label
- [ ] Dynamic title covers single, multi and cleared selections
- [ ] Edits to visual interactions are intentional and documented
- [ ] Values equal native measures under identical filters
- [ ] Interface readable and keyboard focus accessible
- [ ] Tested in Power BI Desktop and saved separately as PBIX

Exit: 1. Filter before load? Power Query. 2. Top 5 one chart? Visual scope. 3. Hidden slicer still filters? Expected. 4. Show/Hide resets data? Set Bookmark Data OFF. 5. Can headcount be summed across snapshots? No.
