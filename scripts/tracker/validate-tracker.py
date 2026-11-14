#!/usr/bin/env python3
"""
validate-tracker.py
Validates data/tracking/feature-tracker.json against data/tracking/tracker-schema.json
and performs semantic integrity checks.
"""

import sys
import json
import re
from pathlib import Path
from datetime import datetime

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
TRACKER_PATH = ROOT_DIR / "data" / "tracking" / "feature-tracker.json"
SCHEMA_PATH = ROOT_DIR / "data" / "tracking" / "tracker-schema.json"

def validate_schema(data, schema):
    errors = []
    
    # Check top-level required fields
    for req in schema.get("required", []):
        if req not in data:
            errors.append(f"Missing required top-level key: {req}")
            
    if errors:
        return errors

    # Validate metadata
    meta_schema = schema.get("properties", {}).get("metadata", {})
    for req in meta_schema.get("required", []):
        if req not in data.get("metadata", {}):
            errors.append(f"Missing required metadata key: {req}")

    # Validate categories
    cat_ids = set()
    for idx, cat in enumerate(data.get("categories", [])):
        if "category_id" not in cat or not re.match(r"^GOV-[0-9]{2}$", cat["category_id"]):
            errors.append(f"Invalid category_id at index {idx}: {cat.get('category_id')}")
        else:
            cat_ids.add(cat["category_id"])

    # Validate defects
    defect_ids = set()
    for idx, df in enumerate(data.get("defects", [])):
        did = df.get("defect_id")
        if not did or not re.match(r"^DEF-[A-Z0-9]+-[0-9]{2}$", did):
            errors.append(f"Invalid defect_id at defect index {idx}: {did}")
        else:
            defect_ids.add(did)

    # Validate features against $defs/capability
    cap_schema = schema.get("$defs", {}).get("capability", {})
    cap_reqs = cap_schema.get("required", [])
    valid_enums = {
        "priority": ["P0", "P1", "P2", "P3"],
        "implementation_status": ["NOT_STARTED", "IN_PROGRESS", "IMPLEMENTED", "DEPRECATED"],
        "verification_status": ["UNVERIFIED", "PARTIAL", "VERIFIED", "FAILED", "BLOCKED"],
        "ui_result": ["PASS", "FAIL", "PARTIAL", "NOT_APPLICABLE", "UNTESTED"],
        "functional_result": ["PASS", "FAIL", "PARTIAL", "NOT_APPLICABLE", "UNTESTED"],
        "data_result": ["PASS", "FAIL", "PARTIAL", "NOT_APPLICABLE", "UNTESTED"],
        "integration_result": ["PASS", "FAIL", "PARTIAL", "NOT_APPLICABLE", "UNTESTED"],
        "security_result": ["PASS", "FAIL", "PARTIAL", "NOT_APPLICABLE", "UNTESTED"],
        "deployment_result": ["PASS", "FAIL", "PARTIAL", "NOT_APPLICABLE", "UNTESTED"]
    }

    seen_features = set()
    features = data.get("features", [])
    for idx, feat in enumerate(features):
        fid = feat.get("feature_id")
        if not fid:
            errors.append(f"Feature at index {idx} missing feature_id")
            continue
            
        if not re.match(r"^GOV-[0-9]{2}-[0-9]{3}$", fid):
            errors.append(f"Feature {fid} has invalid feature_id format (expected GOV-XX-YYY)")
            
        if fid in seen_features:
            errors.append(f"Duplicate feature_id detected: {fid}")
        seen_features.add(fid)

        # Check required fields
        for req in cap_reqs:
            if req not in feat:
                errors.append(f"Feature {fid} missing required field: {req}")

        # Check category match
        cid = feat.get("category_id")
        if cid not in cat_ids:
            errors.append(f"Feature {fid} references unknown category_id: {cid}")

        # Check enums
        for field, allowed in valid_enums.items():
            val = feat.get(field)
            if val is not None and val not in allowed:
                errors.append(f"Feature {fid} has invalid value for {field}: {val} (expected {allowed})")

        # Check defect references
        for d in feat.get("defect_ids", []):
            if d not in defect_ids:
                errors.append(f"Feature {fid} references unknown defect_id: {d}")

    # Metadata count validation
    meta = data.get("metadata", {})
    if meta.get("total_capabilities") != len(features):
        errors.append(f"Metadata total_capabilities ({meta.get('total_capabilities')}) does not match features count ({len(features)})")

    return errors

def main():
    if not SCHEMA_PATH.exists():
        print(f"ERROR: Schema not found at {SCHEMA_PATH}", file=sys.stderr)
        sys.exit(1)
        
    if not TRACKER_PATH.exists():
        print(f"ERROR: Feature tracker not found at {TRACKER_PATH}", file=sys.stderr)
        sys.exit(1)

    try:
        with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
            schema = json.load(f)
        with open(TRACKER_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"ERROR loading JSON: {e}", file=sys.stderr)
        sys.exit(1)

    errors = validate_schema(data, schema)
    if errors:
        print(f"FAILED: Found {len(errors)} validation errors:")
        for err in errors[:25]:
            print(f"  - {err}")
        if len(errors) > 25:
            print(f"  ... and {len(errors) - 25} more errors")
        sys.exit(1)

    print(f"SUCCESS: {TRACKER_PATH.name} is valid against schema.")
    print(f"Total verified categories: {len(data.get('categories', []))}")
    print(f"Total verified capabilities: {len(data.get('features', []))}")
    print(f"Total defects logged: {len(data.get('defects', []))}")

if __name__ == "__main__":
    main()
