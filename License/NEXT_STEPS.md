# Next Steps for Licensing

This file tracks concrete actions to get our licensing into a clean, reviewable state.

## 1. Decide on High-Level Strategy

- [ ] Confirm whether we want:
  - [ ] **A. Fully proprietary** pipeline (all rights reserved), or
  - [ ] **B. Source-available MolRep-Commercial** for the pipeline, or
  - [ ] **C. Hybrid**: OSS core (MIT/Apache) + proprietary or MolRep-Commercial pipeline.
- [ ] Decide long-term vision:
  - [ ] Academic / research project
  - [ ] Startup/product kernel
  - [ ] Library others embed internally

## 2. Repo Structure & File Layout

Proposed (can be adjusted):

```text
ETHGlobalBuenosAires/
  License/
    THOUGHTS.md
    NEXT_STEPS.md
    README.md   <- human-facing explanation of licensing
  core/         <- potential MIT/Apache utilities (optional)
  pipeline/     <- HPLC ingestion logic (protected)
  ...
```

Tasks:

- [ ] Finalize which directories are **open-source** vs **protected**.
- [ ] Add `LICENSE` files at appropriate levels:
  - [ ] `LICENSE` or `LICENSE-OSS` in `core/` (MIT/Apache-2.0 if we go hybrid).
  - [ ] `LICENSE-commercial` or `LICENSE-MolRep-Commercial` at repo root or `pipeline/`.

## 3. Draft Concrete License Texts

- [ ] Clean up and finalize **MolRep-Commercial** text (v1.0):
  - [ ] Make sure it clearly states: source-available, no redistribution, internal/non-production use by default, approval for production.
  - [ ] Add a short preamble for non-lawyers.
- [ ] If we use OSS for any part:
  - [ ] Choose between **MIT** or **Apache-2.0**.
  - [ ] Add SPDX headers to relevant source files.

## 4. README & Communication

- [ ] In the main project `README.md`, add a **Licensing** section that clearly explains:
  - [ ] Which parts are open-source vs source-available.
  - [ ] That the ingestion pipeline is not open-source and may not be freely copied/hosted.
  - [ ] How to contact us for commercial/production use discussions.

## 5. Double-Check Hackathon Rules

- [ ] When ETHGlobal Buenos Aires 2025 event page is live, scan for any **additional IP/license conditions** beyond https://ethglobal.com/rules.
- [ ] If any conflict with MolRep-Commercial emerges, adjust:
  - [ ] Either open-source a smaller subset for the hackathon,
  - [ ] Or treat this build as a private demo and show it without publishing all code.

## 6. After the Hackathon

- [ ] Revisit licensing in light of:
  - [ ] Community interest / potential collaborators.
  - [ ] Any commercial opportunities.
  - [ ] Desire to publish papers or open scientific methods.
- [ ] Possibly introduce a clearer **dual-license** setup (e.g. OS core + commercial license for advanced modules).
