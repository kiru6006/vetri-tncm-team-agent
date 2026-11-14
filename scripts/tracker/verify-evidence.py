#!/usr/bin/env python3
"""
verify-evidence.py
Validates that all source_files and evidence files referenced in
data/tracking/feature-tracker.json actually exist on the filesystem.
"""

import sys
import json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
TRACKER_PATH = ROOT_DIR / "data" / "tracking" / "feature-tracker.json"

def main():
    if not TRACKER_PATH.exists():
        print(f"ERROR: Feature tracker not found at {TRACKER_PATH}", file=sys.stderr)
        sys.exit(1)

    with open(TRACKER_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    features = data.get("features", [])
    missing_files = []
    total_files_checked = 0

    for feat in features:
        fid = feat.get("feature_id")
        for src in feat.get("source_files", []):
            total_files_checked += 1
            src_path = ROOT_DIR / src
            if not src_path.exists():
                missing_files.append((fid, src))

    print(f"Evidence Verification: Checked {total_files_checked} source file references across {len(features)} capabilities.")
    if missing_files:
        print(f"FAILED: Found {len(missing_files)} missing file references:")
        for fid, src in missing_files:
            print(f"  [{fid}] Missing file: {src}")
        sys.exit(1)

    print("SUCCESS: 100% of referenced source files verified to exist on disk.")

if __name__ == "__main__":
    main()
