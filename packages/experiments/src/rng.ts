// packages/experiments/src/rng.ts

// Simple LCG RNG with integer seed; deterministic across runs.
export function makeRng(seedStr: string) {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  let state = seed || 1;

  return function random(): number {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}
