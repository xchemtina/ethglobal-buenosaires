#!/usr/bin/env python3
"""
Extract xy trace data from JSON to CSV or numpy arrays.

Usage:
    # To CSV
    python3 extract_xy.py trace-001.json --out trace-001.csv
    
    # To numpy arrays
    python3 extract_xy.py trace-001.json --format numpy
"""

import argparse
import json
from pathlib import Path


def extract_to_csv(json_path, csv_path):
    """Extract xy data from JSON to CSV."""
    with open(json_path) as f:
        data = json.load(f)
    
    with open(csv_path, 'w') as f:
        f.write("time,signal\n")
        for point in data['points']:
            f.write(f"{point['time']},{point['signal']}\n")
    
    print(f"✅ Extracted {len(data['points'])} points to {csv_path}")


def extract_to_numpy(json_path):
    """Extract xy data from JSON to numpy arrays."""
    import numpy as np
    
    with open(json_path) as f:
        data = json.load(f)
    
    t = np.array([p['time'] for p in data['points']])
    y = np.array([p['signal'] for p in data['points']])
    
    print(f"✅ Loaded {len(t)} points into numpy arrays")
    print(f"   Time range: {t.min():.3f} - {t.max():.3f} min")
    print(f"   Signal range: {y.min():.3f} - {y.max():.3f} a.u.")
    
    return t, y


def extract_to_lists(json_path):
    """Extract xy data from JSON to Python lists."""
    with open(json_path) as f:
        data = json.load(f)
    
    t = [p['time'] for p in data['points']]
    y = [p['signal'] for p in data['points']]
    
    print(f"✅ Loaded {len(t)} points into Python lists")
    return t, y


def main():
    parser = argparse.ArgumentParser(
        description="Extract xy trace data from JSON."
    )
    parser.add_argument(
        "json_file",
        help="Input JSON file (e.g., trace-001.json)"
    )
    parser.add_argument(
        "--out",
        help="Output CSV file (if using CSV format)"
    )
    parser.add_argument(
        "--format",
        choices=["csv", "numpy", "list"],
        default="csv",
        help="Output format (default: csv)"
    )
    
    args = parser.parse_args()
    
    if args.format == "csv":
        if not args.out:
            # Auto-generate output name
            args.out = Path(args.json_file).stem + ".csv"
        extract_to_csv(args.json_file, args.out)
    
    elif args.format == "numpy":
        t, y = extract_to_numpy(args.json_file)
        print("\n💡 Arrays available as: t, y")
        print("   Use in your code: from extract_xy import extract_to_numpy")
    
    elif args.format == "list":
        t, y = extract_to_lists(args.json_file)
        print("\n💡 Lists available as: t, y")


if __name__ == "__main__":
    main()
