// packages/filecoin-client/src/index.ts

import {
  Synapse,
  RPC_URLS,
  TOKENS,
  TIME_CONSTANTS,
} from "@filoz/synapse-sdk";
import { ethers } from "ethers";
import { PoXComputed } from "@pox/experiments/src/types"; // adjust import path to your workspace

// For Node; on modern Node you can omit these imports and use global TextEncoder/Decoder.
import { TextEncoder, TextDecoder } from "node:util";

export type FilecoinNetwork = "calibration" | "mainnet";

export interface SynapseConfig {
  privateKey: string;
  network?: FilecoinNetwork;
}

export async function createSynapseClient({
  privateKey,
  network = "calibration",
}: SynapseConfig): Promise<Synapse> {
  const rpcURL = RPC_URLS[network].http;

  const synapse = await Synapse.create({
    privateKey,
    rpcURL,
  });

  return synapse;
}

/**
 * Upload PoX experiment JSON to Filecoin Warm Storage via Synapse.
 * Returns pieceCid and size.
 */
export async function uploadExperiment(
  synapse: Synapse,
  pox: PoXComputed
): Promise<{ pieceCid: string; size: number }> {
  const encoder = new TextEncoder();

  const payload = JSON.stringify(
    {
      experiment: pox.experiment,
      analysis: pox.analysis,
      difficulty: pox.difficulty,
      rvInitial: pox.rvInitial,
      hashes: {
        dataHash: pox.dataHash,
        metricsHash: pox.metricsHash,
      },
    },
    null,
    2
  );

  const data = encoder.encode(payload);

  // NOTE: Synapse requires a minimum size (~127 bytes); our JSON easily exceeds this.  [oai_citation:1‡Filecoin Onchain Cloud Documentation](https://docs.filecoin.cloud/getting-started/)
  const { pieceCid, size } = await synapse.storage.upload(data);

  return { pieceCid, size };
}

/**
 * Fetch experiment JSON by pieceCid and parse.
 */
export async function fetchExperimentByCid(
  synapse: Synapse,
  pieceCid: string
): Promise<any> {
  const raw = await synapse.storage.download(pieceCid);
  const decoder = new TextDecoder();
  const json = decoder.decode(raw);
  return JSON.parse(json);
}

/**
 * Helper: get an Ethers provider for the same network as Synapse (Filecoin EVM / FVM).
 */
export function getFilecoinProvider(
  network: FilecoinNetwork = "calibration"
): ethers.JsonRpcProvider {
  const rpcURL = RPC_URLS[network].http;
  return new ethers.JsonRpcProvider(rpcURL);
}
