#!/usr/bin/env python3
"""Prepare the Day 8 PBIR training starter from the existing Day 7 FINAL_REFERENCE.

The model and all completed visual pages are copied unchanged.
Only the launch page and project name are updated for Day 8.
"""
from __future__ import annotations

import io
import json
import zipfile
from pathlib import Path
from tempfile import TemporaryDirectory

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "week3/day7/downloads/Day07_TRAINER_REFERENCES.zip"
TARGET = ROOT / "week3/day8/downloads/Nova_Day08_Executive_360_PBIR.zip"
PREFIX = "02_PROJECTS/FINAL_REFERENCE/"

def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))

def write_json(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def replace_textbox_content(path: Path, lines: list[str], size: str = "17pt") -> None:
    data = read_json(path)
    text_runs = []
    for line in lines:
        text_runs.append({
            "textRuns": [{
                "value": line,
                "textStyle": {"fontFamily": "Segoe UI", "fontSize": size, "color": "#13233B"}
            }]
        })
    data["visual"]["objects"]["general"][0]["properties"]["paragraphs"] = text_runs
    write_json(path, data)

def main() -> None:
    assert SOURCE.is_file(), f"Missing reference pack: {SOURCE}"
    with TemporaryDirectory(prefix="nova_day08_") as tmp:
        project = Path(tmp) / "Nova_Day08_Executive_360"
        project.mkdir()
        with zipfile.ZipFile(SOURCE) as zin:
            bad = zin.testzip()
            assert bad is None, f"Corrupted source ZIP member: {bad}"
            names = [n for n in zin.namelist() if n.startswith(PREFIX) and not n.endswith("/")]
            assert any(n.endswith("definition.pbir") for n in names), "PBIR source not found"
            for name in names:
                rel = Path(name.removeprefix(PREFIX))
                assert ".." not in rel.parts, f"Unsafe source path: {name}"
                out = project / rel
                out.parent.mkdir(parents=True, exist_ok=True)
                out.write_bytes(zin.read(name))

        report = project / "Nova.Report"
        model = project / "Nova.SemanticModel"
        assert (report / "definition.pbir").is_file()
        assert (model / "definition.pbism").is_file()
        pages = report / "definition/pages"
        metadata = read_json(pages / "pages.json")
        assert all((pages / n / "page.json").is_file() for n in ("mahmoud", "somaya", "hisham", "enas"))
        assert set(["mahmoud", "somaya", "hisham", "enas"]).issubset(set(metadata["pageOrder"]))

        for name in ("mahmoud", "somaya", "hisham", "enas"):
            page = pages / name / "visuals"
            visuals = list(page.glob("*/visual.json"))
            types = [read_json(p).get("visual", {}).get("visualType") for p in visuals]
            for required in ("card", "lineChart", "barChart", "pivotTable", "slicer"):
                assert required in types, f"{name}: required visual is missing: {required}"

        start = pages / "start"
        start_metadata = read_json(start / "page.json")
        start_metadata["displayName"] = "00 DAY 8 | REPORT HUB"
        write_json(start / "page.json", start_metadata)

        replace_textbox_content(
            start / "visuals/v0000/visual.json",
            ["DAY 8 | EXECUTIVE REPORT", "X Academy / Nova Business 360 / Four completed dashboards"],
            "21pt"
        )
        replace_textbox_content(
            start / "visuals/v0001/visual.json",
            [
                "FOUR COMPLETED DASHBOARDS — Sales, Operations, Finance, Workforce.",
                "01  Open each named page. Validate 2026 data, cards and the trend.",
                "02  Improve visual hierarchy: title, KPI priority, whitespace and chart choice.",
                "03  Test Edit interactions: slicer versus filter, highlight or no interaction.",
                "04  Build a Drillthrough details page for one business entity.",
                "05  Create a Report Page Tooltip for one important trend or bar.",
                "06  Add Page Navigation buttons across the four dashboards.",
                "07  Create a Reset Filters bookmark and configure a reset button.",
                "08  Save as Nova_Day08_Executive_360.pbix after checking in Desktop.",
                "Important: Same Day 7 model. Training data cover Jan–Apr 2025 and 2026.",
                "Workforce is snapshot-based. Never sum headcount across months.",
                "PBIR is a project format: retain Report and SemanticModel together.",
            ],
        )

        for pbip in project.glob("*.pbip"):
            pbip.rename(project / "Nova_Day08_Executive_360.pbip")
        assert (project / "Nova_Day08_Executive_360.pbip").is_file()

        readme = project / "START_HERE_DAY08.txt"
        readme.write_text(
            "DAY 8 - X Academy / Power BI\n"
            "Open Nova_Day08_Executive_360.pbip or Nova.Report/definition.pbir\n"
            "Keep Nova.Report and Nova.SemanticModel in their current relative folders.\n"
            "All four role dashboards from the Day 7 trainer FINAL_REFERENCE are included.\n"
            "Their designs and measurements are reference versions, not the learners' locally modified PBIX files.\n"
            "Start with page 00 DAY 8 | REPORT HUB.\n"
            "Check refresh, relationships, measures, date table and correct totals in Power BI Desktop.\n"
            "Neither this automation nor static JSON inspection can verify Desktop execution.\n",
            encoding="utf-8"
        )

        TARGET.parent.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(TARGET, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zout:
            for item in sorted(project.rglob("*")):
                if item.is_file():
                    zout.write(item, arcname=str(item.relative_to(project)))
        with zipfile.ZipFile(TARGET) as check:
            assert check.testzip() is None, "Output ZIP CRC failed"
            inside = set(check.namelist())
            assert "Nova.Report/definition.pbir" in inside
            assert "Nova.SemanticModel/definition.pbism" in inside
            assert "Nova_Day08_Executive_360.pbip" in inside
        print(f"Prepared {TARGET}, bytes={TARGET.stat().st_size} (ZIP integrity and structural checks OK)")

if __name__ == "__main__":
    main()
