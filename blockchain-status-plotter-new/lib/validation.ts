import { z } from 'zod';

export const ExperimentSchema = z.object({
  cid: z.string().min(1).max(128),
  dataHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  metricsHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  difficulty: z.number().int().min(1).max(1e9),
  initialRV: z.number().int().min(0),
});

export const ChallengeSchema = z.object({
  experimentId: z.number().int().min(0),
  computedMetricsHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  stake: z.string().regex(/^0\.0[0-9]+$/), // At least 0.01
});

export function validateExperiment(data: unknown) {
  return ExperimentSchema.safeParse(data);
}

export function validateChallenge(data: unknown) {
  return ChallengeSchema.safeParse(data);
}
