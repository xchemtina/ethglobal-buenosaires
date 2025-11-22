#!/usr/bin/env python3
"""
Generate synthetic HPLC traces for integration testing.

Usage:
    python3 GenerateTraces.py --out data/gentraces --n-traces 50 --seed 42
"""

import argparse
import json
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
    Gaussian with a crude exponential tail on the right.

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
    n_points=4000,
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
    height_range=(0.2, 1.0),
    width_range=(0.05, 0.25),
    tailing_range=(0.0, 1.0),
):
    """
    Generate n_peaks random Peak objects in [t_min, t_max].
    """
    rts = np.sort(rng.uniform(t_min + 0.2, t_max - 0.2, size=n_peaks))
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


def generate_trace_with_metadata(
    rng,
    trace_id,
    t_min=0.0,
    t_max=8.0,
    n_points=2000,
):
    """
    Generate one synthetic HPLC trace plus metadata.

    Scenarios:
        - clean
        - noisy
        - overlap
        - tailing
        - baseline_drift
    """
    scenario = rng.choice(["clean", "noisy", "overlap", "tailing", "baseline_drift"])

    n_peaks = {
        "clean": int(rng.integers(3, 7)),
        "noisy": int(rng.integers(3, 7)),
        "overlap": int(rng.integers(4, 8)),
        "tailing": int(rng.integers(3, 7)),
        "baseline_drift": int(rng.integers(3, 7)),
    }[scenario]

    peaks = random_peaks(rng, n_peaks, t_min, t_max)

    # Make some overlap in the "overlap" scenario
    if scenario == "overlap" and len(peaks) >= 2:
        idx = int(rng.integers(0, len(peaks) - 1))
        delta = float(rng.uniform(0.02, 0.06))  # partially resolved
        peaks[idx + 1].rt = peaks[idx].rt + delta

    # “Tailing” scenario: crank up tailing
    if scenario == "tailing":
        for p in peaks:
            p.tailing = float(rng.uniform(0.5, 1.5))

    noise_level = {
        "clean": 0.005,
        "noisy": 0.02,
        "overlap": 0.01,
        "tailing": 0.01,
        "baseline_drift": 0.01,
    }[scenario]

    baseline_offset = 0.02 if scenario != "baseline_drift" else 0.05
    baseline_slope = 0.0 if scenario != "baseline_drift" else float(
        rng.uniform(0.001, 0.005)
    )

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

    meta = {
        "trace_id": trace_id,
        "scenario": scenario,
        "t_min": t_min,
        "t_max": t_max,
        "n_points": n_points,
        "noise_level": noise_level,
        "baseline_offset": baseline_offset,
        "baseline_slope": baseline_slope,
        "peaks": [asdict(p) for p in peaks],
    }

    return t, y, meta


# ---------- I/O helpers ----------

def write_trace_csv(path, t, y):
    path = Path(path)
    with path.open("w") as f:
        f.write("time,signal\n")
        for ti, yi in zip(t, y):
            f.write(f"{ti:.6f},{yi:.6f}\n")


def write_json(path, data):
    path = Path(path)
    with path.open("w") as f:
        json.dump(data, f, indent=2)


def generate_dataset(
    out_dir,
    n_traces=20,
    seed=1234,
    t_min=0.0,
    t_max=8.0,
    n_points=2000,
):
    """
    Programmatic entry point: write a folder full of traces.
    """
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    rng = np.random.default_rng(seed)
    index = []

    for i in range(n_traces):
        trace_id = f"trace_{i:04d}"
        t, y, meta = generate_trace_with_metadata(
            rng,
            trace_id,
            t_min=t_min,
            t_max=t_max,
            n_points=n_points,
        )

        csv_path = out_dir / f"{trace_id}.csv"
        json_path = out_dir / f"{trace_id}.json"

        write_trace_csv(csv_path, t, y)
        write_json(json_path, meta)

        index.append(
            {
                "trace_id": trace_id,
                "csv": csv_path.name,
                "meta": json_path.name,
            }
        )

    write_json(out_dir / "index.json", {"traces": index})


# ---------- CLI ----------

def main():
    parser = argparse.ArgumentParser(
        description="Generate synthetic HPLC traces (CSV + JSON) for testing."
    )
    parser.add_argument(
        "--out",
        type=str,
        required=True,
        help="Output directory for generated traces.",
    )
    parser.add_argument(
        "--n-traces",
        type=int,
        default=20,
        help="Number of traces to generate.",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=1234,
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
