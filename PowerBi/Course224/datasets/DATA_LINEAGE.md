# Day01–Day04 Verified Source Lineage

| Source | Consumer | Expected relation |
|---|---|---|
| `generate_week1_data.py` fixed monthly seeds | Day01 Jan-Mar CSV | 120,000 unique business transactions |
| Same Jan-Mar generator and masters | Day03 monthly CSV Folder | Byte/order-equivalent transactional rows |
| April generated from same schema | Day03 held-out CSV | After move and refresh: 160,000 total |
| Same full Jan-Apr source function | Day04 FactSales worksheet | 160,000 identical transaction IDs, dates, dimensions, money |
| 2025–2026 date generator | Day04 DimDate | 730 actual Excel Date cells, not text |
| Same full five 40K monthly sources | Day04 Folder review | 160,000 Jan-Apr; 200,000 after May |
| Independent dirty records | Day02 CSV | 50,000 intended branch-days + 100 duplicates |
| Independent weekly KPIs / workforce / budget | Day01 sources | Different grains; never blindly aggregate together |

**Validation:** `python tools/generate_stage2.py` followed by `python tools/validate_stage2.py`. Manifest records SHA-256 for every archive member. A source-level pass does not replace Desktop verification.
