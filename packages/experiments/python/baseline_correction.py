#!/usr/bin/env python3
"""
PoX Baseline Correction Module
Based on MOCCA2 algorithms: https://bayer-group.github.io/MOCCA/

Implements three baseline correction methods:
- AsLS (Asymmetric Least Squares)
- arPLS (Asymmetrically Reweighted Penalized Least Squares)
- FlatFit (Fast and stable, recommended for PoX)
"""

import numpy as np
from scipy import sparse
from scipy.sparse.linalg import spsolve
from typing import Tuple, Literal

BaselineMethod = Literal["asls", "arpls", "flatfit"]


def estimate_baseline(
    signal: np.ndarray,
    method: BaselineMethod = "flatfit",
    lam: float = 1e6,
    p: float = 0.01,
    max_iter: int = 10
) -> np.ndarray:
    """
    Estimate baseline for chromatographic data.
    
    Parameters
    ----------
    signal : np.ndarray
        1D array of signal intensities
    method : str
        Baseline correction method: 'asls', 'arpls', or 'flatfit'
    lam : float
        Smoothness parameter (higher = smoother baseline)
    p : float
        Asymmetry parameter (0 < p < 1, smaller = more asymmetric)
    max_iter : int
        Maximum iterations for iterative methods
        
    Returns
    -------
    np.ndarray
        Estimated baseline
        
    References
    ----------
    AsLS: Eilers & Boelens (2005) https://doi.org/10.1366/000370205774783520
    arPLS: Baek et al. (2015) https://doi.org/10.1039/C4AN01061B
    FlatFit: MOCCA2 implementation (Bayer)
    """
    
    if method == "asls":
        return _baseline_asls(signal, lam, p, max_iter)
    elif method == "arpls":
        return _baseline_arpls(signal, lam, max_iter)
    elif method == "flatfit":
        return _baseline_flatfit(signal, lam)
    else:
        raise ValueError(f"Unknown method: {method}. Use 'asls', 'arpls', or 'flatfit'")


def _baseline_asls(
    y: np.ndarray,
    lam: float = 1e6,
    p: float = 0.01,
    max_iter: int = 10
) -> np.ndarray:
    """
    Asymmetric Least Squares (AsLS) baseline correction.
    
    Fast but can underestimate baseline in some regions.
    """
    n = len(y)
    D = sparse.diags([1, -2, 1], [0, -1, -2], shape=(n, n-2))
    D = lam * D.dot(D.transpose())
    
    w = np.ones(n)
    for _ in range(max_iter):
        W = sparse.spdiags(w, 0, n, n)
        Z = W + D
        z = spsolve(Z, w * y)
        w = p * (y > z) + (1 - p) * (y < z)
    
    return z


def _baseline_arpls(
    y: np.ndarray,
    lam: float = 1e6,
    max_iter: int = 10,
    ratio: float = 0.01
) -> np.ndarray:
    """
    Asymmetrically Reweighted Penalized Least Squares (arPLS).
    
    More robust than AsLS, handles negative peaks better.
    """
    n = len(y)
    D = sparse.diags([1, -2, 1], [0, -1, -2], shape=(n, n-2))
    H = lam * D.dot(D.transpose())
    
    w = np.ones(n)
    for i in range(max_iter):
        W = sparse.spdiags(w, 0, n, n)
        Z = W + H
        z = spsolve(Z, w * y)
        
        # Calculate negative deviations
        d = y - z
        dn = d[d < 0]
        
        if len(dn) == 0:
            break
            
        # Adaptive weighting
        m = np.mean(dn)
        s = np.std(dn)
        
        w_new = 1 / (1 + np.exp(2 * (d - (2*s - m)) / s))
        
        # Check convergence
        if np.linalg.norm(w - w_new) / np.linalg.norm(w) < ratio:
            break
            
        w = w_new
    
    return z


def _baseline_flatfit(
    y: np.ndarray,
    lam: float = 1e5
) -> np.ndarray:
    """
    FlatFit baseline correction.
    
    Fast, stable, handles negative peaks well.
    Recommended for PoX by MOCCA2.
    
    Uses penalized least squares with automatic weight adjustment.
    """
    n = len(y)
    
    # Second derivative matrix
    D = sparse.diags([1, -2, 1], [0, -1, -2], shape=(n, n-2))
    D = D.dot(D.transpose())
    
    # Robust weight estimation
    # Use median-based approach for outlier resistance
    median = np.median(y)
    mad = np.median(np.abs(y - median))  # Median Absolute Deviation
    
    # Points close to minimum are likely baseline
    threshold = median - 2 * mad
    w = np.where(y < threshold + mad, 1.0, 0.01)  # Low weight for peaks
    
    # Solve penalized least squares
    W = sparse.spdiags(w, 0, n, n)
    Z = W + lam * D
    z = spsolve(Z, w * y)
    
    return z


def correct_baseline(
    times: np.ndarray,
    signals: np.ndarray,
    method: BaselineMethod = "flatfit",
    **kwargs
) -> Tuple[np.ndarray, np.ndarray]:
    """
    Correct baseline and return corrected signal + baseline estimate.
    
    Parameters
    ----------
    times : np.ndarray
        Time points
    signals : np.ndarray
        Signal intensities
    method : str
        Baseline method
    **kwargs
        Additional parameters for baseline estimation
        
    Returns
    -------
    corrected_signals : np.ndarray
        Baseline-corrected signals
    baseline : np.ndarray
        Estimated baseline
    """
    baseline = estimate_baseline(signals, method=method, **kwargs)
    corrected = signals - baseline
    
    # Ensure no negative values after correction
    corrected = np.maximum(corrected, 0)
    
    return corrected, baseline


def analyze_baseline_quality(
    signals: np.ndarray,
    baseline: np.ndarray
) -> dict:
    """
    Analyze quality of baseline correction.
    
    Returns metrics useful for fraud detection:
    - baseline_rmse: Root mean square of baseline
    - baseline_range: Range of baseline values
    - negative_fraction: Fraction of signal below baseline
    """
    residuals = signals - baseline
    
    return {
        "baseline_rmse": float(np.sqrt(np.mean(baseline**2))),
        "baseline_range": float(np.max(baseline) - np.min(baseline)),
        "baseline_mean": float(np.mean(baseline)),
        "baseline_std": float(np.std(baseline)),
        "negative_fraction": float(np.sum(residuals < 0) / len(residuals)),
        "residual_rmse": float(np.sqrt(np.mean(residuals**2)))
    }


if __name__ == "__main__":
    import sys
    import json
    import time
    
    # CLI mode for API integration (if method argument provided)
    if len(sys.argv) > 1:
        method = sys.argv[1]
        
        # Read JSON from stdin
        input_data = json.load(sys.stdin)
        times = np.array(input_data['times'])
        signals = np.array(input_data['signals'])
        
        # Run correction with timing
        start_time = time.time()
        corrected, baseline = correct_baseline(times, signals, method=method)
        elapsed_ms = (time.time() - start_time) * 1000
        
        # Analyze quality
        quality = analyze_baseline_quality(signals, baseline)
        
        # Convert numpy arrays to lists for JSON serialization
        output = {
            'times': times.tolist(),
            'baseline': baseline.tolist(),
            'corrected': corrected.tolist(),
            'quality': quality,
            'method': method,
            'processing_time_ms': float(elapsed_ms)
        }
        
        # Output JSON to stdout
        print(json.dumps(output))
        sys.exit(0)
    
    # Test mode - generate test plot
    import matplotlib.pyplot as plt
    
    # Generate synthetic HPLC trace with baseline drift
    np.random.seed(42)
    n_points = 1000
    times = np.linspace(0, 10, n_points)
    
    # True baseline (polynomial drift)
    true_baseline = 0.1 + 0.05 * times + 0.01 * times**2
    
    # Add some peaks (Gaussian)
    signal = true_baseline.copy()
    peaks = [
        (3.0, 2.0, 0.3),  # (center, height, width)
        (5.5, 3.5, 0.2),
        (7.0, 1.5, 0.4)
    ]
    
    for center, height, width in peaks:
        signal += height * np.exp(-0.5 * ((times - center) / width)**2)
    
    # Add noise
    signal += np.random.normal(0, 0.05, n_points)
    
    # Test all three methods
    baseline_asls = estimate_baseline(signal, method="asls")
    baseline_arpls = estimate_baseline(signal, method="arpls")
    baseline_flatfit = estimate_baseline(signal, method="flatfit")
    
    # Plot comparison
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8))
    
    # Plot 1: All baselines
    ax1.plot(times, signal, 'k-', label='Signal', alpha=0.5)
    ax1.plot(times, true_baseline, 'b--', label='True Baseline', linewidth=2)
    ax1.plot(times, baseline_asls, 'r-', label='AsLS', alpha=0.7)
    ax1.plot(times, baseline_arpls, 'g-', label='arPLS', alpha=0.7)
    ax1.plot(times, baseline_flatfit, 'm-', label='FlatFit', linewidth=2)
    ax1.set_xlabel('Time (min)')
    ax1.set_ylabel('Intensity')
    ax1.set_title('Baseline Correction Methods Comparison')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Plot 2: Corrected signals
    corrected_flatfit, _ = correct_baseline(times, signal, method="flatfit")
    ax2.plot(times, corrected_flatfit, 'k-', label='FlatFit Corrected')
    ax2.axhline(y=0, color='r', linestyle='--', alpha=0.5)
    ax2.set_xlabel('Time (min)')
    ax2.set_ylabel('Intensity')
    ax2.set_title('Baseline-Corrected Chromatogram')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('baseline_correction_test.png', dpi=150)
    print("✓ Test plot saved as baseline_correction_test.png")
    
    # Print quality metrics
    quality = analyze_baseline_quality(signal, baseline_flatfit)
    print("\nBaseline Quality Metrics (FlatFit):")
    for key, value in quality.items():
        print(f"  {key}: {value:.6f}")
