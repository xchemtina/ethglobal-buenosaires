# THOUGHTS — HPLC_Crawl

## On Scraping as Archaeological Practice

Web scraping is often framed as technical infrastructure — extract data, move on. But here it functions as **digital archaeology**: recovering institutional knowledge embedded in vendor application notes, reconstructing the tacit expertise of separation scientists.

Restek (and Waters, Agilent, etc.) publish chromatograms not just as marketing but as **public goods** — proof that certain columns work for certain compounds. These become:
- Training data for junior chromatographers
- Troubleshooting references when methods fail
- Prior art for method development

The crawler makes this **searchable and composable** rather than siloed in PDF catalogs.

## Hybrid Automation: Why Two Tools?

The Playwright → BeautifulSoup pipeline reflects a **pragmatic stratification of web complexity**:

### Playwright (Phase A)
- **Problem**: Infinite scroll + JavaScript-rendered pagination
- **Solution**: Full browser automation with DOM queries
- **Cost**: Slow (~10 sec per page load), resource-intensive
- **Benefit**: Handles arbitrary frontend frameworks

### BeautifulSoup (Phase B)
- **Problem**: Static HTML detail pages with predictable structure
- **Solution**: Regex + CSS selectors on raw HTML
- **Cost**: Brittle to layout changes
- **Benefit**: 100x faster, simpler debugging

This is **not premature optimization** — it's acknowledging that not all web content requires the same tools. Using Playwright for everything would take hours; using BeautifulSoup alone would fail on lazy-loaded listings.

The pattern generalizes: **Discover via browser, harvest via HTTP client**.

## Heuristics as Evolutionary Fitness

The image filtering logic:
```python
if any(k in src_low or k in alt for k in ("chrom", "trace", "chromatogram")):
```

This is **deliberately coarse-grained**. A tighter filter (e.g., requiring specific file paths or alt text patterns) would:
- Miss chromatograms with unconventional naming
- Break when Restek redesigns their CMS
- Require manual tuning per vendor

The current heuristic **overfits to the semantic intent** (is this likely a chromatogram?) rather than the markup structure (does it match this CSS selector?). False positives are cheap (extra disk space); false negatives are expensive (missing data).

This reflects a **robustness-first design**: better to filter downstream than miss at source.

## On Politeness & the Tragedy of the Web

The `time.sleep(1.5)` delay is not just ethical posturing — it's **game-theoretic self-interest**:
- Aggressive scraping → rate limiting or IP bans → crawler fails
- Polite scraping → sustained access → crawler succeeds

But more fundamentally: **Restek's willingness to keep data public depends on not abusing that openness**. If every researcher hammers their servers, they'll lock it behind auth. The commons collapses.

This is the **tragedy of the digital commons** in microcosm. The solution isn't just individual restraint but **coordination mechanisms**:
- Cached URL lists (avoid re-discovery)
- Shared mirrors (one person scrapes, many read)
- Vendor APIs (if they existed — they don't)

The crawler embodies this: `restek_LC_urls.json` enables **communal scraping** where one initial run benefits all subsequent users.

## Metadata as Implicit Ontology

The `fields` dictionary in metadata.json is **unstructured by design**:
```json
{
  "Column": "Ultra C18, 250 × 4.6 mm, 5 μm",
  "Mobile Phase": "Acetonitrile:Water (60:40)",
  ...
}
```

Why not parse this into a rigid schema (column_length: 250, column_diameter: 4.6, etc.)?

Because **the variability is the data**:
- Some entries use "Mobile Phase A/B", others use "Eluent"
- Some specify gradient programs, others use isocratic
- Some list "Detection" as "UV @ 254 nm", others as "DAD 200-400 nm"

Imposing a schema **prematurely** would either:
1. Lose information (force everything into predefined slots)
2. Become brittle (explosion of special cases)

The current approach preserves **semantic fidelity** while deferring normalization. A later ETL step can:
- Extract numeric values via regex
- Map synonyms to canonical terms
- Build relational schema from accumulated examples

This is **progressive typing** for data — start loose, tighten as patterns emerge.

## Integration Points: Real Data Meets PoX

### Simulation Calibration
Synthetic chromatograms (from `simulate.ts`) currently use arbitrary Gaussian peaks. Real data reveals:
- Peaks are **asymmetric** (tailing, fronting)
- Baselines **drift** (temperature, column aging)
- Noise is **frequency-dependent** (pump pulsation, detector shot noise)

Comparing simulated difficulty scores against real chromatograms tests whether the formula (`α·nPeaks + β·noise + γ·ln(nPoints)`) actually tracks perceived complexity.

### Challenge Protocol Testing
If PoX has fraud proofs, they need adversarial test cases:
- Slightly perturb a real chromatogram → does analysis still match?
- Inject synthetic peaks → can fraud detection catch it?
- Replay old experiments → does hash deduplication work?

Real data provides **ground truth** for these edge cases.

### User-Submitted Validation
When a scientist submits HPLC data to PoX, how do we know it's plausible?

Options:
1. **Oracle validation** (trusted lab re-runs experiment)
2. **Crowd validation** (other scientists review)
3. **Automated sanity checks** (does it look like real HPLC?)

The crawled dataset enables (3): train anomaly detector on real chromatograms → flag submissions that deviate from distribution.

## Why Restek First?

Among HPLC vendors, Restek has:
- **Largest public library** (thousands of chromatograms vs. hundreds elsewhere)
- **Best structure** (consistent metadata format)
- **No paywall** (Waters/Agilent require registration)

This makes it the **minimum viable data source**. Once the pipeline works here, adapting to other vendors is incremental.

But also: Restek is a **mid-tier vendor** — not the most prestigious (that's Waters) but widely used in academia and industry. Their data reflects **practical chromatography**, not just showcase applications.

## Open Questions

### 1. Raw Data Availability
Vendor websites show **rendered images**, not raw numerical data. This is because:
- Proprietary file formats (`.D` for Agilent, `.raw` for Waters)
- CDS (Chromatography Data System) lock-in
- IP concerns (method parameters are trade secrets)

Could we:
- Reverse-engineer vendor file formats? (legal gray area)
- OCR + digitize chromatograms? (error-prone but feasible)
- Partner with vendors for API access? (requires business relationships)

### 2. Temporal Evolution
Chromatogram libraries change over time:
- New entries added (product launches)
- Old entries removed (discontinued columns)
- Methods updated (better separations)

Should we:
- Track deltas via daily scrapes? (high storage cost)
- Version the entire dataset? (snapshot quarterly?)
- Archive deleted entries? (for reproducibility)

### 3. Multi-Vendor Normalization
Each vendor uses different terminology:
- Restek: "Sample" field
- Agilent: "Injection Volume"
- Waters: "Inj. Vol."

Building a unified schema requires:
- Manual mapping (tedious, fragile)
- LLM-based extraction (expensive, probabilistic)
- Ontology alignment (academic research project)

Which level of effort is justified?

### 4. Legal Gray Zones
Restek publishes chromatograms publicly, but:
- Copyright may still apply (database rights in EU)
- Terms of service may prohibit scraping (often unenforceable)
- Aggregation may constitute derivative work (unclear)

The safest approach:
- **Republish only metadata** (facts, not copyrightable)
- **Link to original images** (fair use citation)
- **Contact Restek proactively** (ask for blessing)

## Philosophical Convergence: Data as Public Infrastructure

This crawler embodies a **DeSci primitive**: converting proprietary-adjacent knowledge into commons-accessible knowledge.

The data **already exists** (Restek publishes it). The crawler doesn't create value — it **unlocks latent value** by making scattered information aggregable, searchable, analyzable.

This is the **opposite of extractive data practices** (scrape, monetize, lock behind API). Instead:
1. Respect source (rate limits, attribution)
2. Enhance access (structured metadata vs. PDFs)
3. Enable derivatives (calibration, training, validation)
4. Share openly (no paywalls on derived datasets)

The PoX system depends on this ethos: **scientific work as consensus mechanism** only works if data flows freely.

## Next Steps

1. **Multi-vendor expansion** (Agilent, Waters, Shimadzu)
2. **OCR pipeline** (image → CSV for raw traces)
3. **Metadata normalization** (unified schema across vendors)
4. **Longitudinal tracking** (detect library updates)
5. **Anomaly detection training** (real vs. synthetic chromatograms)

But also: **Contact vendors directly**. Restek may prefer to provide structured exports rather than have everyone scrape. Building **cooperative relationships** beats adversarial scraping.

The goal isn't to bypass vendors — it's to make their public data **maximally useful for open science**.
