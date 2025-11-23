/**
 * Validation utilities for PoX dashboard
 * Ensures data integrity and prevents injection attacks
 */

import { z } from 'zod';

// --- CID Validation ---
// Filecoin piece CIDs: bafkzcib... (longer than regular CIDs)
// Regular CIDs: bafk... (CIDv1) or Qm... (CIDv0)
const PIECE_CID_REGEX = /^bafkzcib[a-z2-7]{100,}$/i; // Filecoin piece CIDs (commp)
const CID_V1_REGEX = /^bafk[a-z2-7]{49,}$/i;
const CID_V0_REGEX = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/;

export const cidSchema = z.string().refine(
  (val) => PIECE_CID_REGEX.test(val) || CID_V1_REGEX.test(val) || CID_V0_REGEX.test(val),
  { message: 'Invalid CID format. Expected CIDv0 (Qm...), CIDv1 (bafk...), or Filecoin piece CID (bafkzcib...)' }
);

export function isValidCID(cid: string): boolean {
  return cidSchema.safeParse(cid).success;
}

// --- Hash Validation ---
// Ethereum hashes: 0x followed by 64 hex characters
export const hashSchema = z.string().regex(
  /^0x[a-fA-F0-9]{64}$/,
  'Invalid hash format. Expected 0x followed by 64 hex characters'
);

export function isValidHash(hash: string): boolean {
  return hashSchema.safeParse(hash).success;
}

// --- Address Validation ---
// Ethereum address: 0x followed by 40 hex characters
export const addressSchema = z.string().regex(
  /^0x[a-fA-F0-9]{40}$/,
  'Invalid address format. Expected 0x followed by 40 hex characters'
);

export function isValidAddress(address: string): boolean {
  return addressSchema.safeParse(address).success;
}

// --- Experiment ID Validation ---
export const experimentIdSchema = z.number().int().nonnegative();

export function isValidExperimentId(id: number): boolean {
  return experimentIdSchema.safeParse(id).success;
}

// --- Difficulty Score Validation ---
// Based on PoX scoring system: 7-70 (HPLC: 7-14, Air: 15-24, NMR: 25-70)
export const difficultySchema = z.number().min(0).max(100);

export function isValidDifficulty(difficulty: number): boolean {
  return difficultySchema.safeParse(difficulty).success;
}

// --- Timestamp Validation ---
// Unix timestamp in seconds (not milliseconds)
const GENESIS_TIMESTAMP = 1609459200; // 2021-01-01 (reasonable min for blockchain)
const MAX_FUTURE_TIMESTAMP = Math.floor(Date.now() / 1000) + 86400; // 1 day future tolerance

export const timestampSchema = z.number().int()
  .min(GENESIS_TIMESTAMP, 'Timestamp too far in the past')
  .max(MAX_FUTURE_TIMESTAMP, 'Timestamp too far in the future');

export function isValidTimestamp(timestamp: number): boolean {
  return timestampSchema.safeParse(timestamp).success;
}

// --- API Request Validation ---
export const challengeRequestSchema = z.object({
  experimentId: experimentIdSchema,
  computedMetricsHash: hashSchema,
});

export type ChallengeRequest = z.infer<typeof challengeRequestSchema>;

// --- Experiment Data Validation ---
export const onChainExperimentSchema = z.object({
  id: experimentIdSchema,
  submitter: addressSchema,
  cid: cidSchema,
  dataHash: hashSchema,
  metricsHash: hashSchema,
  difficulty: difficultySchema,
  initialRV: z.number(),
  submittedAt: timestampSchema,
  blockExplorer: z.string().url().optional(),
});

export type ValidatedExperiment = z.infer<typeof onChainExperimentSchema>;

// --- Sanitization ---
/**
 * Sanitize user input to prevent XSS
 * Removes script tags, event handlers, and dangerous HTML
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')
    .trim();
}

/**
 * Validate and sanitize CID before using in downloads
 */
export function validateAndSanitizeCID(cid: unknown): string {
  if (typeof cid !== 'string') {
    throw new Error('CID must be a string');
  }
  
  const sanitized = sanitizeInput(cid);
  
  if (!isValidCID(sanitized)) {
    throw new Error(`Invalid CID format: ${sanitized}`);
  }
  
  return sanitized;
}

/**
 * Validate hash before using in challenges or comparisons
 */
export function validateHash(hash: unknown): string {
  if (typeof hash !== 'string') {
    throw new Error('Hash must be a string');
  }
  
  const sanitized = sanitizeInput(hash);
  
  if (!isValidHash(sanitized)) {
    throw new Error(`Invalid hash format: ${sanitized}`);
  }
  
  return sanitized;
}

/**
 * Validate experiment data from blockchain
 * Throws if invalid, returns typed data if valid
 */
export function validateExperimentData(data: unknown): ValidatedExperiment {
  try {
    return onChainExperimentSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
      throw new Error(`Invalid experiment data: ${issues}`);
    }
    throw error;
  }
}

// --- Rate Limiting Helpers ---
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Simple in-memory rate limiter
 * @param key - Identifier (IP, user, etc.)
 * @param limit - Max requests per window
 * @param windowMs - Time window in milliseconds
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

/**
 * Clear rate limit for a key (useful for testing)
 */
export function clearRateLimit(key: string): void {
  rateLimitStore.delete(key);
}
