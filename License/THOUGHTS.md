# Licensing Thoughts for ETHGlobal Buenos Aires 2025

## Current Intent

- Project: scientific data ingestion pipeline (starting with HPLC demo).
- Main concern: **we don’t want everyone to copy / commercialize the pipeline**.
- We still want to:
  - Participate in ETHGlobal as a hackathon project.
  - Potentially share some code or ideas.

## Observations

- ETHGlobal’s global rules (https://ethglobal.com/rules):
  - You and your team **own your IP**.
  - They **do not require** using an open-source license (MIT, Apache-2.0, GPL, etc.).
  - They **do not forbid** proprietary or source-available licenses.
- Our custom `LicenseRef-MolRep-Commercial` is **source-available, non-open-source**, closer to:
  - PolyForm Internal Use / business-source licenses.
  - With approval-gated production use.

## Tension / Tradeoff

- Full OSS (MIT/Apache-2.0):
  - Pros: maximal adoption, no ambiguity for users.
  - Cons: explicitly allows copying, forking, and commercial reuse.
- Custom / source-available (MolRep-Commercial):
  - Pros: keeps control over production + redistribution; aligned with our protection goal.
  - Cons: less familiar to external devs and judges; not strictly “open source”.

## Provisional Direction

- Likely pattern:
  1. **Keep core ingestion pipeline under a protective license** (MolRep-Commercial or proprietary).
  2. Optionally **open-source small, generic components** (e.g. utility libs) under MIT/Apache.
  3. Be explicit in README that:
     - The main pipeline is *source-available, not open-source*.
     - Any open-source submodules are clearly labeled and licensed separately.

## Open Questions

- How much of the repo should be OSS vs source-available?
- Do we want a future-funded/commercial path (paid licenses for production use)?
- Do we foresee 3rd parties running this as a SaaS or embedding the pipeline?

## Working Principle

> Default to **protection for the pipeline**, and selectively open-source only what we are happy to see freely cloned and reused.
