import os
import json
import hashlib

REPO_ROOT = "/Users/apple/projects/vetri-tncm-aios"
AUDIT_DIR = os.path.join(REPO_ROOT, "docs", "audit")
DATA_DIR = os.path.join(AUDIT_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

with open(os.path.join(REPO_ROOT, "data", "tracking", "feature-tracker.json")) as f:
    tracker = json.load(f)

categories = tracker.get("categories", [])
features = tracker.get("features", [])
defects = tracker.get("defects", [])

print(f"Loaded {len(categories)} categories, {len(features)} features, {len(defects)} defects.")
