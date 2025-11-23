# PoX Subgraph

Indexes experiment events from PoXRegistry on Filecoin Calibration.

## Build

```bash
npm install
npx graph codegen && npx graph build
```

## Deploy

```bash
npx graph auth --studio <KEY>
npx graph deploy --studio pox
```

See contract addresses in main README.
