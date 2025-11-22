#!/usr/bin/env python3
"""
Generate synthetic HPLC traces for Filecoin upload.
Outputs complete JSON files ready for Synapse SDK upload.

Usage:
    python3 GenerateTracesForUpload.py --out data/traces --n-traces 10
"""

import argparse
import json
import math
from dataclasses import dataclass, asdict
from pathlib import Path

import numpy as np


# ---------- Peak model ----------

@dataclass
class Peak:
    rt: float       # retention time (min)
    height: float   # peak height (a.u.)
    width: float    # FWHM (min)
    tailing: float = 0.0  # tailing factor (0 = Gaussian)


def gaussian_peak(t, center, width, height):
    """Simple Gaussian peak, width given as FWHM."""
    sigma = width / 2.355  # FWHM -> sigma
    return height * np.exp(-0.5 * ((t - center) / sigma) ** 2)


def tailing_peak(t, center, width, height, tailing=0.0):
    """
    Gaussian with exponential tail on the right.
    
    tailing = 0  -> pure Gaussian
    tailing > 0  -> right-hand tail
    """
    base = gaussian_peak(t, center, width, height)
    if tailing <= 0:
        return base
    
    tau = width * tailing
    tail_factor = np.where(t >= center, np.exp(-(t - center) / tau), 1.0)
    return base * tail_factor


# ---------- Trace generation ----------

def generate_chromatogram(
    peaks,
    t_min=0.0,
    t_max=10.0,
    n_points=2000,
    noise_level=0.0,
    baseline_offset=0.0,
    baseline_slope=0.0,
    seed=None,
):
    """
    Build y(t) = sum(peaks) + baseline + noise.
    """
    t = np.linspace(t_min, t_max, n_points)
    y = np.zeros_like(t)
    
    # sum all peaks
    for p in peaks:
        y += tailing_peak(t, p.rt, p.width, p.height, p.tailing)
    
    # baseline: offset + slope * t
    y += baseline_offset + baseline_slope * t
    
    # noise
    if noise_level > 0:
        rng = np.random.default_rng(seed)
        y += rng.normal(0.0, noise_level, size=t.size)
    
    return t, y


def random_peaks(
    rng,
    n_peaks,
    t_min,
    t_max,
    height_range=(0.3, 1.0),
    width_range=(0.05, 0.25),
    tailing_range=(0.0, 1.0),
):
    """
    Generate n_peaks random Peak objects in [t_min, t_max].
    """
    rts = np.sort(rng.uniform(t_min + 0.3, t_max - 0.3, size=n_peaks))
    peaks = []
    for rt in rts:
        height = rng.uniform(*height_range)
        width = rng.uniform(*width_range)
        tailing = rng.uniform(*tailing_range)
        peaks.append(
            Peak(
                rt=float(rt),
                height=float(height),
                width=float(width),
                tailing=float(tailing),
            )
        )
    return peaks


def calculate_metrics(y, peaks):
    """Calculate basic metrics for the chromatogram."""
    # Peak count
    peak_count = len(peaks)
    
    # Baseline noise (std of low-signal regions)
    sorted_y = np.sort(y)
    baseline_noise = float(np.std(sorted_y[:len(sorted_y)//10]))  # bottom 10%
    
    # Total area (simple trapezoid)
    total_area = float(np.trapz(y))
    
    # Peak purity (mock for now - would need real peak detection)
    peak_purity = f"{98.0 + np.random.uniform(-2, 2):.1f}%"
    
    # Retention shift (mock)
    retention_shift = f"{np.random.uniform(-0.1, 0.1):+.2f}m"
    
    # Area percent (mock - would need integration)
    area_percent = f"{99.0 + np.random.uniform(-1, 1):.1f}%"
    
    return {
        "peakCount": peak_count,
        "baselineNoise": round(baseline_noise, 4),
        "totalArea": round(total_area, 2),
        "peakPurity": peak_purity,
        "retentionShift": retention_shift,
        "areaPercent": area_percent,
        "status": "PASS" if baseline_noise < 0.03 else "REVIEW"
    }


def generate_experiment_json(
    rng,
    experiment_id,
    t_min=0.0,
    t_max=8.0,
    n_points=2000,
):
    """
    Generate complete JSON structure for upload to Filecoin.
    """
    # Pick scenario
    scenario = rng.choice(["clean", "noisy", "overlap", "tailing", "baseline_drift"])
    
    n_peaks = {
        "clean": int(rng.integers(3, 6)),
        "noisy": int(rng.integers(3, 6)),
        "overlap": int(rng.integers(4, 7)),
        "tailing": int(rng.integers(3, 6)),
        "baseline_drift": int(rng.integers(3, 6)),
    }[scenario]
    
    peaks = random_peaks(rng, n_peaks, t_min, t_max)
    
    # Overlap scenario
    if scenario == "overlap" and len(peaks) >= 2:
        idx = int(rng.integers(0, len(peaks) - 1))
        delta = float(rng.uniform(0.02, 0.06))
        peaks[idx + 1].rt = peaks[idx].rt + delta
    
    # Tailing scenario
    if scenario == "tailing":
        for p in peaks:
            p.tailing = float(rng.uniform(0.5, 1.5))
    
    noise_level = {
        "clean": 0.005,
        "noisy": 0.025,
        "overlap": 0.01,
        "tailing": 0.01,
        "baseline_drift": 0.01,
    }[scenario]
    
    baseline_offset = 0.02 if scenario != "baseline_drift" else 0.05
    baseline_slope = 0.0 if scenario != "baseline_drift" else float(
        rng.uniform(0.001, 0.005)
    )
    
    # Generate chromatogram
    t, y = generate_chromatogram(
        peaks,
        t_min=t_min,
        t_max=t_max,
        n_points=n_points,
        noise_level=noise_level,
        baseline_offset=baseline_offset,
        baseline_slope=baseline_slope,
        seed=int(rng.integers(0, 1_000_000_000)),
    )
    
    # Calculate metrics
    metrics = calculate_metrics(y, peaks)
    
    # Build complete JSON structure
    experiment = {
        "sampleId": f"HPLC-{experiment_id:04d}",
        "experimentType": "HPLC",
        "method": "Reverse Phase C18",
        "compounds": ["caffeine", "theobromine", "unknown"],  # Mock
        "solvent": "acetonitrile/water 70:30",
        "scenario": scenario,
        "instrument": "Agilent 1260 Infinity II",  # Mock
        "labLocation": "DeSci Lab Alpha",
        "points": [
            {"time": float(ti), "signal": float(yi)}
            for ti, yi in zip(t, y)
        ],
        "metrics": metrics,
        "peaks": [asdict(p) for p in peaks],
        "metadata": {
            "t_min": t_min,
            "t_max": t_max,
            "n_points": n_points,
            "noise_level": noise_level,
            "baseline_offset": baseline_offset,
            "baseline_slope": baseline_slope,
        }
    }
    
    return experiment


def write_json(path, data):
    """Write JSON with proper formatting."""
    path = Path(path)
    with path.open("w") as f:
        json.dump(data, f, indent=2)
    print(f"  ✓ Written: {path.name}")


def generate_dataset(
    out_dir,
    n_traces=10,
    seed=42,
    t_min=0.0,
    t_max=8.0,
    n_points=2000,
):
    """
    Generate multiple HPLC traces as JSON files.
    """
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    
    rng = np.random.default_rng(seed)
    index = []
    
    print(f"\n🧪 Generating {n_traces} HPLC traces...")
    print(f"📁 Output directory: {out_dir}\n")
    
    for i in range(n_traces):
        experiment_id = i + 1
        experiment = generate_experiment_json(
            rng,
            experiment_id,
            t_min=t_min,
            t_max=t_max,
            n_points=n_points,
        )
        
        json_path = out_dir / f"trace-{experiment_id:03d}.json"
        write_json(json_path, experiment)
        
        index.append({
            "sampleId": experiment["sampleId"],
            "file": json_path.name,
            "scenario": experiment["scenario"],
            "peakCount": experiment["metrics"]["peakCount"]
        })
    
    # Write index
    index_path = out_dir / "index.json"
    write_json(index_path, {"traces": index, "total": n_traces})
    
    print(f"\n✅ Generated {n_traces} traces successfully!")
    print(f"📋 Index file: {index_path}")
    print(f"\n💡 Next step: Run upload script")
    print(f"   node scripts/upload-experiments.mjs")


# ---------- CLI ----------

def main():
    parser = argparse.ArgumentParser(
        description="Generate synthetic HPLC traces for Filecoin upload."
    )
    parser.add_argument(
        "--out",
        type=str,
        default="data/traces",
        help="Output directory for generated traces.",
    )
    parser.add_argument(
        "--n-traces",
        type=int,
        default=10,
        help="Number of traces to generate (default: 10).",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=42,
        help="Random seed for reproducibility.",
    )
    parser.add_argument(
        "--t-min",
        type=float,
        default=0.0,
        help="Start time (min).",
    )
    parser.add_argument(
        "--t-max",
        type=float,
        default=8.0,
        help="End time (min).",
    )
    parser.add_argument(
        "--n-points",
        type=int,
        default=2000,
        help="Number of data points per trace.",
    )
    
    args = parser.parse_args()
    
    generate_dataset(
        out_dir=args.out,
        n_traces=args.n_traces,
        seed=args.seed,
        t_min=args.t_min,
        t_max=args.t_max,
        n_points=args.n_points,
    )


if __name__ == "__main__":
    main()
