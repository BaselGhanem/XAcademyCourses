#!/usr/bin/env python3
"""Install exact approved Day 8–10 WebP infographics from the submitted ZIP.

Never create proxy graphics. Never switch data.js to unverified/missing resources.
"""
from __future__ import annotations

import hashlib
import re
import zipfile
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
ARCHIVE=ROOT/"Day08_09_10_Original_Designs_GitHub_Ready.zip"
DATA=ROOT/"data.js"
EXPECTED={
    8:("165606","d00323a8751604d6fe34"),
    9:("168872","8e286b2709ad35876c37"),
    10:("176464","5f33ad1ffc5cf42472c8"),
}

def main():
    if not ARCHIVE.is_file():
        raise FileNotFoundError(f"Upload the ORIGINAL image ZIP to the repository root first: {ARCHIVE.name}")
    with zipfile.ZipFile(ARCHIVE) as z:
        if z.testzip():
            raise ValueError("Archive checksum failed.")
        expected_names={f"concepts/assets/day{day}-learner-overview.webp" for day in EXPECTED}
        if set(z.namelist()) != expected_names:
            raise ValueError(f"Unexpected ZIP contents: {z.namelist()!r}")
        for day,(expected_size,digest_prefix) in EXPECTED.items():
            path=f"concepts/assets/day{day}-learner-overview.webp"
            blob=z.read(path)
            if len(blob)!=int(expected_size):
                raise ValueError(f"Size mismatch: {path}")
            if not hashlib.sha256(blob).hexdigest().startswith(digest_prefix):
                raise ValueError(f"Approved image hash mismatch: {path}")
            if blob[:4]!=b"RIFF" or blob[8:12]!=b"WEBP":
                raise ValueError(f"Not a valid WebP header: {path}")
            dest=ROOT/path
            dest.parent.mkdir(parents=True,exist_ok=True)
            dest.write_bytes(blob)
            print(f"Exact approved image installed: {dest.relative_to(ROOT)}")
    data=DATA.read_text(encoding="utf-8")
    for day in EXPECTED:
        old=f"concepts/assets/day{day}-learner-overview.svg"
        new=f"concepts/assets/day{day}-learner-overview.webp"
        if old not in data and new not in data:
            raise ValueError(f"Missing day {day} visualGuide in data.js")
        data=data.replace(old,new)
    DATA.write_text(data,encoding="utf-8")
    assert all((ROOT/f"concepts/assets/day{day}-learner-overview.webp").is_file() for day in EXPECTED)
    assert all(f"concepts/assets/day{day}-learner-overview.webp" in data for day in EXPECTED)
    print("All three original artworks linked to the correct course days.")

if __name__=="__main__":
    main()
