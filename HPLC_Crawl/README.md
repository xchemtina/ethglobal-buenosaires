# HPLC_Crawl — Real Chromatogram Data Harvester

Web scraper for collecting authentic High-Performance Liquid Chromatography (HPLC) chromatograms from Restek's public library.

## Purpose

This tool bridges simulated experiments with real-world analytical chemistry data by:
- Harvesting actual LC chromatograms from industry-standard library
- Extracting method parameters (column, mobile phase, flow rate, etc.)
- Downloading chromatogram images for analysis/training
- Building dataset for validating PoX difficulty calibration

## Architecture

### Two-Phase Crawl Strategy

**Phase A: URL Discovery**
- Uses Playwright (headless Firefox) for JavaScript rendering
- Iteratively clicks pagination controls ("next", "load more")
- Collects all `/chromatogram-detail/LC_*` URLs
- Saves complete URL list to `restek_LC_urls.json`

**Phase B: Detail Scraping**
- Iterates through discovered URLs with `requests` + `BeautifulSoup`
- Extracts metadata from definition lists (`<dl>`, `<dt>`, `<dd>`)
- Downloads chromatogram images (filtered by filename/alt text heuristics)
- Organizes output by chromatogram ID

### Why Playwright + BeautifulSoup?

**Playwright** handles infinite scroll / lazy-loaded listings where pagination requires JS execution.  
**BeautifulSoup** is sufficient for static detail pages once URLs are known — faster and simpler than browser automation.

This hybrid approach optimizes for both robustness (dynamic discovery) and efficiency (batch scraping).

## Output Structure

```
restek_LC_traces/
├── LC_00123/
│   ├── metadata.json       # Title, method params (column, mobile phase, etc.)
│   ├── chrom_0.png         # Chromatogram image(s)
│   └── chrom_1.png
├── LC_00456/
│   └── ...
└── ...

restek_LC_urls.json         # Cached URL list (enables resumption)
```

### Metadata Schema

```json
{
  "id": "LC_00123",
  "url": "https://www.restek.com/chromatogram-detail/LC_00123",
  "title": "Separation of Flavonoids on Ultra C18 Column",
  "fields": {
    "Column": "Ultra C18, 250 × 4.6 mm, 5 μm",
    "Mobile Phase": "Acetonitrile:Water (60:40)",
    "Flow Rate": "1.0 mL/min",
    "Temperature": "30 °C",
    "Detection": "UV @ 254 nm",
    "Sample": "10 μL injection"
  }
}
```

## Usage

### Initial Run (Full Crawl)
```bash
python crawl_restek_lc.py
```
- Discovers all URLs via browser automation (~5-10 min)
- Scrapes each detail page with 1.5s delay (polite crawling)
- Total runtime depends on library size (expect 30-60 min for hundreds of entries)

### Incremental Run (Resume)
If `restek_LC_urls.json` exists, skips Phase A and proceeds directly to scraping. This enables:
- Resuming after interruption
- Re-scraping if metadata extraction logic changes
- Adding new entries without re-discovering old URLs

### Rate Limiting
Hardcoded `time.sleep(1.5)` between requests to avoid overwhelming Restek's servers. Adjust if running against local mirror or with permission.

## Dependencies

```bash
pip install requests beautifulsoup4 playwright
playwright install firefox
```

**Why Firefox?** Playwright's Firefox driver has better headless stability for pagination detection than Chromium in testing.

## Design Decisions

### Heuristic Image Filtering
```python
if any(k in src_low or k in alt for k in ("chrom", "trace", "chromatogram")):
    # Download this image
```
Trades precision for recall — better to download extra images than miss chromatograms. Post-processing can filter false positives.

### Pagination Resilience
Multiple locator strategies (`button[name=~"next"]`, `link[name=~"load more"]`) handle site redesigns without brittle CSS selectors.

### No Assumptions on Naming
Original script design assumed sequential IDs (`LC_00000` to `LC_99999`). This version makes **zero assumptions** about naming conventions — discovers whatever exists.

## Integration with PoX System

### Calibration Use Case
Real chromatograms enable:
1. **Benchmarking simulation realism** — compare synthetic vs. real peak distributions
2. **Difficulty validation** — verify scoring formula against known "hard" separations
3. **Fraud detection testing** — seed challenge protocol with real data + adversarial perturbations

### Training Pipeline
Images can be processed via:
- OCR for digitizing printed chromatograms
- Peak detection algorithms (OpenCV, signal processing)
- ML models for automated method classification

### Metadata as Ground Truth
Method parameters enable:
- Correlating peak patterns with experimental conditions
- Building knowledge graph of separation techniques
- Validating user-submitted experiments against known protocols

## Limitations & Future Work

### Current Limitations
- **Single source**: Only Restek library (other vendors: Waters, Agilent, ThermoFisher)
- **Image-only data**: No raw numerical traces (vendor-specific formats)
- **Static snapshot**: No tracking of library updates over time
- **Heuristic metadata**: Definition list parsing may miss non-standard layouts

### Potential Extensions
- Multi-vendor aggregation (Shimadzu, PerkinElmer catalogs)
- Raw data extraction (if APIs exist or via reverse-engineering vendor software)
- Temporal tracking (daily/weekly scrapes → diff detection)
- OCR pipeline for digitizing image traces into CSV/JSON
- Deduplication across vendors (same method, different instruments)

## Legal & Ethical Notes

Restek's chromatogram library is publicly accessible without authentication. However:
- **Respect robots.txt** (if present)
- **Rate limit aggressively** (1.5s delays are minimum courtesy)
- **Attribute source** when using data in publications/applications
- **Commercial use**: Contact Restek for licensing if applicable

This tool is intended for **research, education, and open science** purposes aligned with Restek's apparent intent in making data publicly available.

## Why This Matters

Scientific instrument vendors publish chromatograms as **application notes** — demonstrations of column performance under specific conditions. These are:
- Peer-reviewed by practitioners (implicit validation)
- Instrument-agnostic (focus on chemistry, not proprietary tech)
- Diverse (hundreds of compound classes, matrices, techniques)

Aggregating this distributed knowledge creates a **commons for analytical chemistry** — the chemical equivalent of ImageNet for ML. PoX leverages this to ground decentralized science in real lab work, not just simulations.
