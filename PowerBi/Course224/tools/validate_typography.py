#!/usr/bin/env python3
"""Prevent U+2014 em dashes and HTML em-dash entities in Course224 source text."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXTENSIONS = {
    ".html", ".htm", ".js", ".css", ".svg", ".md", ".json",
    ".txt", ".csv", ".dax", ".py", ".xml", ".yml", ".yaml",
    ".m", ".tmdl", ".pbip", ".pbir", ".pbism",
}
# Assemble a named HTML entity in two parts so this test does not flag itself.
PATTERN = re.compile(
    re.escape(chr(0x2014))
    + "|"
    + r"&mda" + r"sh;"
    + "|"
    + r"&#0*8212;"
    + "|"
    + r"&#x0*2014;",
    flags=re.IGNORECASE,
)


def main() -> None:
    errors = []
    checked = 0
    for file in sorted(ROOT.rglob("*")):
        if not file.is_file() or file.suffix.lower() not in EXTENSIONS:
            continue
        if "__pycache__" in file.parts:
            continue
        checked += 1
        content = file.read_text(encoding="utf-8")
        for match in PATTERN.finditer(content):
            line = content.count("\n", 0, match.start()) + 1
            errors.append(f"{file.relative_to(ROOT)}:{line}: {match.group()!r}")

    print(f"Course224 hyphen audit: checked {checked} text files; found {len(errors)} prohibited forms")
    for issue in errors[:60]:
        print(issue)
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
