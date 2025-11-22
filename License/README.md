# License Notes for ETHGlobal Buenos Aires Project

This folder documents how we are thinking about licensing for the ETHGlobal Buenos Aires 2025 project.

> **Status:** Work-in-progress design of our licensing approach. Not an official license by itself.

## Goals

- Build a scientific data ingestion pipeline (initially focused on HPLC) for ETHGlobal.
- **Avoid** a situation where anyone can freely copy or commercialize the full pipeline.
- Still be able to:
  - Show and demo the code at ETHGlobal.
  - Potentially share parts of the code with the community.

## Likely Licensing Approach (High-Level)

Nothing here is final, but current thinking is:

1. **Protected pipeline**
   - The main ingestion pipeline (e.g. `pipeline/`) will **not** be under a permissive open-source license like MIT/Apache.
   - It will either be:
     - proprietary (all rights reserved), or
     - licensed under a **source-available, non-open-source license** (e.g. `LicenseRef-MolRep-Commercial`).
   - That license will:
     - allow reading and internal experimentation,
     - forbid redistribution and general commercial/production use without explicit approval.

2. **Optional open-source core**
   - If we split out generic, reusable components (math, data structures, utilities), those may be placed under:
     - **MIT** or **Apache-2.0**, to encourage broader reuse.
   - Such code would live in a separate directory (e.g. `core/`) and have its own `LICENSE` file.

3. **Clarity for users and judges**
   - The main project README (at repo root) will have a clear **Licensing** section, explaining:
     - Which parts are truly open-source.
     - Which parts are source-available / proprietary.
     - That the full HPLC pipeline is **not** freely cloneable as an open-source component.

## Relationship to ETHGlobal Rules

- ETHGlobal’s global rules (https://ethglobal.com/rules) state that teams **own their IP**.
- They do **not** force us to use any particular open-source license.
- Our approach should therefore be compatible, as long as we:
  - Respect licenses of third-party libraries we use.
  - Are transparent about our own licensing.

## Files in This Folder

- [`THOUGHTS.md`](./THOUGHTS.md) – reasoning, tradeoffs, and background.
- [`NEXT_STEPS.md`](./NEXT_STEPS.md) – concrete checklist of actions to finalize licensing.
- `README.md` (this file) – overview for anyone browsing the repo.

Once we settle on the exact model, the **actual license text** (e.g. `LICENSE-MolRep-Commercial`) will live at the repository root or in the relevant subdirectory.
