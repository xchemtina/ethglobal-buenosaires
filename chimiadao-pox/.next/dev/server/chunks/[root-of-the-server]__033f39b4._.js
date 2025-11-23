module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/llm-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * LLM Service for PoX Dashboard
 * Integrates OpenAI API with domain-specific context
 */ __turbopack_context__.s([
    "getModelName",
    ()=>getModelName,
    "isLLMConfigured",
    ()=>isLLMConfigured,
    "queryLLM",
    ()=>queryLLM,
    "streamToString",
    ()=>streamToString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$9$2e$1_zod$40$3$2e$25$2e$76$2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/node_modules/.pnpm/openai@6.9.1_zod@3.25.76/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$9$2e$1_zod$40$3$2e$25$2e$76$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/node_modules/.pnpm/openai@6.9.1_zod@3.25.76/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
// Lazy initialization to avoid errors if API key is missing
let openai = null;
function getOpenAI() {
    if (!openai) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not set. Please add it to your .env.local file. ' + 'Get your API key from: https://platform.openai.com/api-keys');
        }
        openai = new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$9$2e$1_zod$40$3$2e$25$2e$76$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
            apiKey
        });
    }
    return openai;
}
// System prompt with PoX domain knowledge
const SYSTEM_PROMPT = `You are the ChimiaDAO Assistant, an AI specialized in helping scientists query and understand decentralized scientific data from the PoX (Proof-of-X) network.

**Context:**
- PoX is a blockchain-based reputation system for scientific experiments
- Experiments (HPLC, Air Quality, NMR) are stored on Filecoin with hashes on-chain
- The Graph indexes experiment metadata for fast queries
- Users can have private local data AND public on-chain data

**Your Capabilities:**
1. Query The Graph subgraph for experiment metadata
2. Explain blockchain concepts (CIDs, hashes, reputation scores)
3. Help interpret HPLC chromatograms and scientific data
4. Provide information about Filecoin storage deals
5. Answer questions about the PoX protocol and fraud proofs

**Tone:**
- Precise and scientific, but approachable
- Use technical terms when appropriate, but explain them
- Format numbers with proper units (mAU, ppb, μg/m³)
- Reference blockchain data when available (CIDs, addresses, block numbers)

**Data Access:**
- You receive real-time context about experiments from The Graph
- CIDs are Filecoin piece CIDs (bafkzcib... format)
- Difficulty scores: HPLC (7-14), Air Quality (15-24), NMR (25-70)
- Reputation decays over time (λ=0.01/day)

**Response Format:**
- Keep responses concise (2-3 paragraphs max)
- Use code formatting for CIDs, hashes, addresses
- Provide specific data when available (don't be vague)
- If data is missing, say so clearly

Remember: You're helping scientists verify and understand their decentralized lab notebook.`;
async function queryLLM(messages, graphContext, options = {}) {
    const client = getOpenAI();
    const { model = process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature = 0.7, maxTokens = 500, stream = false } = options;
    // Inject Graph context into system message if available
    let systemMessage = SYSTEM_PROMPT;
    if (graphContext) {
        systemMessage += `\n\n**Current Context:**\n${formatGraphContext(graphContext)}`;
    }
    const fullMessages = [
        {
            role: 'system',
            content: systemMessage
        },
        ...messages.map((m)=>({
                role: m.role,
                content: m.content
            }))
    ];
    try {
        const response = await client.chat.completions.create({
            model,
            messages: fullMessages,
            temperature,
            max_tokens: maxTokens,
            stream
        });
        if (stream) {
            return response;
        }
        // Non-streaming response
        const completion = response;
        return completion.choices[0]?.message?.content || 'No response generated.';
    } catch (error) {
        console.error('[LLM] Query failed:', error.message);
        // User-friendly error messages
        if (error.status === 401) {
            throw new Error('Invalid OpenAI API key. Please check your .env.local file.');
        }
        if (error.status === 429) {
            throw new Error('OpenAI rate limit exceeded. Please try again in a moment.');
        }
        if (error.status === 500) {
            throw new Error('OpenAI service error. Please try again later.');
        }
        throw new Error(`LLM query failed: ${error.message}`);
    }
}
/**
 * Format Graph context for LLM injection
 */ function formatGraphContext(context) {
    const parts = [];
    if (context.experiments && Array.isArray(context.experiments)) {
        parts.push(`**Recent Experiments (${context.experiments.length}):**`);
        context.experiments.slice(0, 5).forEach((exp, i)=>{
            parts.push(`${i + 1}. ${exp.sampleId || exp.id} - ` + `Type: ${exp.type}, Difficulty: ${exp.difficulty}, ` + `CID: ${exp.cid?.slice(0, 20)}...`);
        });
    }
    if (context.stats) {
        parts.push(`\n**Network Stats:**`);
        parts.push(`Total experiments: ${context.stats.totalExperiments || 0}`);
        parts.push(`HPLC: ${context.stats.hplcCount || 0}, Air Quality: ${context.stats.airQualityCount || 0}, NMR: ${context.stats.nmrCount || 0}`);
    }
    if (context.hplc) {
        parts.push(`\n**Active HPLC Data:**`);
        parts.push(`Sample: ${context.hplc.sampleId}`);
        parts.push(`Method: ${context.hplc.method}`);
        parts.push(`Status: ${context.hplc.metrics?.status || 'Unknown'}`);
    }
    return parts.join('\n');
}
function isLLMConfigured() {
    return !!process.env.OPENAI_API_KEY;
}
function getModelName() {
    return process.env.OPENAI_MODEL || 'gpt-4o-mini';
}
async function streamToString(stream) {
    const chunks = [];
    for await (const chunk of stream){
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
            chunks.push(content);
        }
    }
    return chunks.join('');
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/validation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Validation utilities for PoX dashboard
 * Ensures data integrity and prevents injection attacks
 */ __turbopack_context__.s([
    "addressSchema",
    ()=>addressSchema,
    "challengeRequestSchema",
    ()=>challengeRequestSchema,
    "checkRateLimit",
    ()=>checkRateLimit,
    "cidSchema",
    ()=>cidSchema,
    "clearRateLimit",
    ()=>clearRateLimit,
    "difficultySchema",
    ()=>difficultySchema,
    "experimentIdSchema",
    ()=>experimentIdSchema,
    "hashSchema",
    ()=>hashSchema,
    "isValidAddress",
    ()=>isValidAddress,
    "isValidCID",
    ()=>isValidCID,
    "isValidDifficulty",
    ()=>isValidDifficulty,
    "isValidExperimentId",
    ()=>isValidExperimentId,
    "isValidHash",
    ()=>isValidHash,
    "isValidTimestamp",
    ()=>isValidTimestamp,
    "onChainExperimentSchema",
    ()=>onChainExperimentSchema,
    "sanitizeInput",
    ()=>sanitizeInput,
    "timestampSchema",
    ()=>timestampSchema,
    "validateAndSanitizeCID",
    ()=>validateAndSanitizeCID,
    "validateExperimentData",
    ()=>validateExperimentData,
    "validateHash",
    ()=>validateHash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
// --- CID Validation ---
// Filecoin piece CIDs: bafkzcib... (longer than regular CIDs)
// Regular CIDs: bafk... (CIDv1) or Qm... (CIDv0)
const PIECE_CID_REGEX = /^bafkzcib[a-z2-7]{100,}$/i; // Filecoin piece CIDs (commp)
const CID_V1_REGEX = /^bafk[a-z2-7]{49,}$/i;
const CID_V0_REGEX = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/;
const cidSchema = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().refine((val)=>PIECE_CID_REGEX.test(val) || CID_V1_REGEX.test(val) || CID_V0_REGEX.test(val), {
    message: 'Invalid CID format. Expected CIDv0 (Qm...), CIDv1 (bafk...), or Filecoin piece CID (bafkzcib...)'
});
function isValidCID(cid) {
    return cidSchema.safeParse(cid).success;
}
const hashSchema = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid hash format. Expected 0x followed by 64 hex characters');
function isValidHash(hash) {
    return hashSchema.safeParse(hash).success;
}
const addressSchema = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid address format. Expected 0x followed by 40 hex characters');
function isValidAddress(address) {
    return addressSchema.safeParse(address).success;
}
const experimentIdSchema = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative();
function isValidExperimentId(id) {
    return experimentIdSchema.safeParse(id).success;
}
const difficultySchema = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).max(100);
function isValidDifficulty(difficulty) {
    return difficultySchema.safeParse(difficulty).success;
}
// --- Timestamp Validation ---
// Unix timestamp in seconds (not milliseconds)
const GENESIS_TIMESTAMP = 1609459200; // 2021-01-01 (reasonable min for blockchain)
const MAX_FUTURE_TIMESTAMP = Math.floor(Date.now() / 1000) + 86400; // 1 day future tolerance
const timestampSchema = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(GENESIS_TIMESTAMP, 'Timestamp too far in the past').max(MAX_FUTURE_TIMESTAMP, 'Timestamp too far in the future');
function isValidTimestamp(timestamp) {
    return timestampSchema.safeParse(timestamp).success;
}
const challengeRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    experimentId: experimentIdSchema,
    computedMetricsHash: hashSchema
});
const onChainExperimentSchema = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: experimentIdSchema,
    submitter: addressSchema,
    cid: cidSchema,
    dataHash: hashSchema,
    metricsHash: hashSchema,
    difficulty: difficultySchema,
    initialRV: __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    submittedAt: timestampSchema,
    blockExplorer: __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional()
});
function sanitizeInput(input) {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/on\w+="[^"]*"/gi, '').replace(/on\w+='[^']*'/gi, '').replace(/javascript:/gi, '').trim();
}
function validateAndSanitizeCID(cid) {
    if (typeof cid !== 'string') {
        throw new Error('CID must be a string');
    }
    const sanitized = sanitizeInput(cid);
    if (!isValidCID(sanitized)) {
        throw new Error(`Invalid CID format: ${sanitized}`);
    }
    return sanitized;
}
function validateHash(hash) {
    if (typeof hash !== 'string') {
        throw new Error('Hash must be a string');
    }
    const sanitized = sanitizeInput(hash);
    if (!isValidHash(sanitized)) {
        throw new Error(`Invalid hash format: ${sanitized}`);
    }
    return sanitized;
}
function validateExperimentData(data) {
    try {
        return onChainExperimentSchema.parse(data);
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            const issues = error.issues.map((i)=>`${i.path.join('.')}: ${i.message}`).join(', ');
            throw new Error(`Invalid experiment data: ${issues}`);
        }
        throw error;
    }
}
// --- Rate Limiting Helpers ---
const rateLimitStore = new Map();
function checkRateLimit(key, limit, windowMs) {
    const now = Date.now();
    const record = rateLimitStore.get(key);
    if (!record || now > record.resetAt) {
        rateLimitStore.set(key, {
            count: 1,
            resetAt: now + windowMs
        });
        return true;
    }
    if (record.count >= limit) {
        return false;
    }
    record.count++;
    return true;
}
function clearRateLimit(key) {
    rateLimitStore.delete(key);
}
}),
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/web3-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchAllExperiments",
    ()=>fetchAllExperiments,
    "fetchExperiment",
    ()=>fetchExperiment,
    "fetchExperimentData",
    ()=>fetchExperimentData,
    "fetchLatestExperiments",
    ()=>fetchLatestExperiments,
    "fetchTotalExperiments",
    ()=>fetchTotalExperiments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/ethers/lib.esm/ethers.js [app-route] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/validation.ts [app-route] (ecmascript)");
;
;
// Contract addresses from deployment
const REGISTRY_ADDRESS = '0xA6Fa61924F06DB9A84B92182B69F5C08F3176554';
const RPC_URL = 'https://api.calibration.node.glif.io/rpc/v1';
// Circuit breaker configuration
let failureCount = 0;
let circuitOpen = false;
let lastFailureTime = 0;
const MAX_FAILURES = 5;
const CIRCUIT_RESET_TIME = 60000; // 1 minute
// Minimal ABI - just the functions we need
const REGISTRY_ABI = [
    'function totalExperiments() view returns (uint256)',
    'function getExperiment(uint256) view returns (uint256 id, address submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint64 submittedAt)'
];
let provider = null;
let registry = null;
/**
 * Circuit breaker check - prevents hammering failed RPC
 */ function checkCircuitBreaker() {
    if (circuitOpen) {
        const now = Date.now();
        if (now - lastFailureTime > CIRCUIT_RESET_TIME) {
            console.log('[Web3] Circuit breaker reset');
            circuitOpen = false;
            failureCount = 0;
        } else {
            throw new Error('Circuit breaker is open. RPC unavailable. Try again later.');
        }
    }
}
/**
 * Record failure for circuit breaker
 */ function recordFailure() {
    failureCount++;
    lastFailureTime = Date.now();
    if (failureCount >= MAX_FAILURES) {
        console.error(`[Web3] Circuit breaker triggered after ${MAX_FAILURES} failures`);
        circuitOpen = true;
    }
}
/**
 * Record success for circuit breaker
 */ function recordSuccess() {
    failureCount = 0;
}
function getContract() {
    checkCircuitBreaker();
    if (!provider) {
        provider = new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].JsonRpcProvider(RPC_URL, undefined, {
            staticNetwork: true
        });
    }
    if (!registry) {
        registry = new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(REGISTRY_ADDRESS, REGISTRY_ABI, provider);
    }
    return registry;
}
async function fetchTotalExperiments() {
    try {
        const contract = getContract();
        const total = await contract.totalExperiments();
        return Number(total);
    } catch (error) {
        console.error('Failed to fetch total experiments:', error);
        return 0;
    }
}
async function fetchExperiment(id) {
    try {
        const contract = getContract();
        const [expId, submitter, cid, dataHash, metricsHash, difficulty, initialRV, submittedAt] = await contract.getExperiment(id);
        const experiment = {
            id: Number(expId),
            submitter,
            cid,
            dataHash,
            metricsHash,
            difficulty: Number(difficulty),
            initialRV: Number(initialRV),
            submittedAt: Number(submittedAt),
            blockExplorer: `https://calibration.filscan.io/address/${REGISTRY_ADDRESS}`
        };
        // Validate experiment data
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateExperimentData"])(experiment);
        } catch (validationError) {
            console.warn(`[Web3] Experiment ${id} failed validation:`, validationError.message);
        // Return data anyway but log warning - blockchain is source of truth
        }
        recordSuccess(); // Circuit breaker: record successful call
        return experiment;
    } catch (error) {
        recordFailure(); // Circuit breaker: record failure
        console.error(`[Web3] Failed to fetch experiment ${id}:`, error.message);
        return null;
    }
}
async function fetchAllExperiments() {
    try {
        const total = await fetchTotalExperiments();
        if (total === 0) return [];
        const promises = [];
        for(let i = 0; i < total; i++){
            promises.push(fetchExperiment(i));
        }
        const results = await Promise.all(promises);
        return results.filter((exp)=>exp !== null);
    } catch (error) {
        console.error('Failed to fetch all experiments:', error);
        return [];
    }
}
async function fetchLatestExperiments(count = 5) {
    try {
        const total = await fetchTotalExperiments();
        if (total === 0) return [];
        const startId = Math.max(0, total - count);
        const promises = [];
        for(let i = total - 1; i >= startId; i--){
            promises.push(fetchExperiment(i));
        }
        const results = await Promise.all(promises);
        return results.filter((exp)=>exp !== null);
    } catch (error) {
        console.error('Failed to fetch latest experiments:', error);
        return [];
    }
}
async function fetchExperimentData(cid) {
    // Skip IPFS fetch for now - Filecoin piece CIDs need special handling
    // For demo, we'll show on-chain metadata only
    // TODO: Implement Synapse SDK download for full data retrieval
    console.log(`[IPFS] Skipping fetch for Filecoin piece CID: ${cid.slice(0, 24)}...`);
    return null;
// Future implementation:
// const synapse = await Synapse.create({ signer: wallet });
// const data = await synapse.storage.download(cid);
// return JSON.parse(new TextDecoder().decode(data));
}
}),
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/filecoin-storage.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Filecoin Storage Integration
 * Downloads experiment data from Filecoin using Synapse SDK
 * 
 * Security features:
 * - CID validation before download
 * - Timeout protection (30s primary, 10s fallback)
 * - Retry logic with exponential backoff
 * - In-memory caching with size limits
 * - Error logging and user-friendly messages
 */ __turbopack_context__.s([
    "batchDownloadFromFilecoin",
    ()=>batchDownloadFromFilecoin,
    "clearCache",
    ()=>clearCache,
    "downloadFromFilecoin",
    ()=>downloadFromFilecoin,
    "getCacheStats",
    ()=>getCacheStats,
    "isDataCached",
    ()=>isDataCached
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$sdk$2f$dist$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-sdk/dist/src/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$sdk$2f$dist$2f$src$2f$synapse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/@filoz/synapse-sdk/dist/src/synapse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/node_modules/ethers/lib.esm/ethers.js [app-route] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/validation.ts [app-route] (ecmascript)");
;
;
;
// Cache to avoid re-downloading (with size limit)
const MAX_CACHE_SIZE = 100; // Max 100 experiments cached
const dataCache = new Map();
// Download configuration
const DOWNLOAD_TIMEOUT_MS = 30000; // 30 seconds
const FALLBACK_TIMEOUT_MS = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // Start with 1s, then exponential backoff
/**
 * Retry helper with exponential backoff
 */ async function retryWithBackoff(fn, retries = MAX_RETRIES, delay = RETRY_DELAY_MS) {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        console.log(`[Filecoin] Retry in ${delay}ms... (${retries} attempts remaining)`);
        await new Promise((resolve)=>setTimeout(resolve, delay));
        return retryWithBackoff(fn, retries - 1, delay * 2); // Exponential backoff
    }
}
/**
 * Enforce cache size limit (LRU-style)
 */ function enforceCacheLimit() {
    if (dataCache.size > MAX_CACHE_SIZE) {
        const firstKey = dataCache.keys().next().value;
        if (firstKey) {
            dataCache.delete(firstKey);
            console.log(`[Filecoin] Cache limit reached, evicted oldest entry`);
        }
    }
}
async function downloadFromFilecoin(pieceCid) {
    // Validate and sanitize CID
    let validatedCid;
    try {
        validatedCid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAndSanitizeCID"])(pieceCid);
    } catch (error) {
        console.error(`[Filecoin] Invalid CID:`, error.message);
        throw new Error(`Invalid CID format: ${error.message}`);
    }
    // Check cache first
    if (dataCache.has(validatedCid)) {
        console.log(`[Filecoin] Cache hit for ${validatedCid.slice(0, 20)}...`);
        return dataCache.get(validatedCid);
    }
    // Primary download attempt with retry logic
    try {
        console.log(`[Filecoin] Downloading ${validatedCid.slice(0, 20)}...`);
        const data = await retryWithBackoff(async ()=>{
            // Read-only mode - no private key needed for downloads
            const rpcUrl = process.env.FILECOIN_CLOUD_RPC || 'https://api.calibration.node.glif.io/rpc/v1';
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].JsonRpcProvider(rpcUrl);
            // For server-side downloads, we can use a dummy signer
            // Synapse downloads are public and don't require signatures
            const dummyWallet = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Wallet.createRandom().connect(provider);
            const synapse = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$node_modules$2f40$filoz$2f$synapse$2d$sdk$2f$dist$2f$src$2f$synapse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Synapse"].create({
                signer: dummyWallet,
                timeout: DOWNLOAD_TIMEOUT_MS
            });
            // Download data using piece CID
            const dataBytes = await synapse.storage.download(validatedCid);
            // Validate downloaded data is not empty
            if (!dataBytes || dataBytes.length === 0) {
                throw new Error('Downloaded data is empty');
            }
            // Convert bytes to JSON with error handling
            try {
                const dataStr = new TextDecoder().decode(dataBytes);
                const parsed = JSON.parse(dataStr);
                console.log(`[Filecoin] Successfully downloaded ${validatedCid.slice(0, 20)}... (${dataBytes.length} bytes)`);
                return parsed;
            } catch (parseError) {
                throw new Error(`Failed to parse downloaded data: ${parseError.message}`);
            }
        });
        // Cache successful download
        dataCache.set(validatedCid, data);
        enforceCacheLimit();
        return data;
    } catch (error) {
        console.error(`[Filecoin] Download failed after retries:`, error.message);
        // Fallback: Try IPFS gateways (may not work for fresh uploads)
        try {
            console.log(`[Filecoin] Attempting IPFS gateway fallback...`);
            const response = await fetch(`https://ipfs.io/ipfs/${validatedCid}`, {
                signal: AbortSignal.timeout(FALLBACK_TIMEOUT_MS)
            });
            if (!response.ok) {
                throw new Error(`Gateway returned ${response.status}`);
            }
            const data = await response.json();
            // Cache fallback result
            dataCache.set(validatedCid, data);
            enforceCacheLimit();
            console.log(`[Filecoin] Gateway fallback successful`);
            return data;
        } catch (fallbackError) {
            console.error(`[Filecoin] Gateway fallback also failed:`, fallbackError.message);
            // Provide user-friendly error message
            throw new Error(`Unable to retrieve experiment data. The data may not be available yet on Filecoin network. ` + `Original error: ${error.message}`);
        }
    }
}
async function batchDownloadFromFilecoin(cids) {
    const results = new Map();
    // Download in parallel with concurrency limit
    const BATCH_SIZE = 5;
    for(let i = 0; i < cids.length; i += BATCH_SIZE){
        const batch = cids.slice(i, i + BATCH_SIZE);
        const promises = batch.map(async (cid)=>{
            try {
                const data = await downloadFromFilecoin(cid);
                return {
                    cid,
                    data
                };
            } catch (error) {
                console.warn(`[Filecoin] Failed to download ${cid}:`, error);
                return {
                    cid,
                    data: null
                };
            }
        });
        const batchResults = await Promise.all(promises);
        batchResults.forEach(({ cid, data })=>{
            results.set(cid, data);
        });
    }
    return results;
}
function isDataCached(cid) {
    return dataCache.has(cid);
}
function clearCache() {
    dataCache.clear();
    console.log('[Filecoin] Cache cleared');
}
function getCacheStats() {
    return {
        size: dataCache.size,
        cids: Array.from(dataCache.keys()).map((cid)=>cid.slice(0, 20) + '...')
    };
}
}),
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/experiment-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Unified Experiment Data Service
 * Handles both HPLC and Air Quality experiments from Filecoin
 */ __turbopack_context__.s([
    "fetchAirQualityExperiments",
    ()=>fetchAirQualityExperiments,
    "fetchDashboardStats",
    ()=>fetchDashboardStats,
    "fetchHplcExperiments",
    ()=>fetchHplcExperiments,
    "fetchLatestExperiment",
    ()=>fetchLatestExperiment,
    "fetchUnifiedExperiments",
    ()=>fetchUnifiedExperiments,
    "formatAirQualityForDisplay",
    ()=>formatAirQualityForDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$web3$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/web3-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$filecoin$2d$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/filecoin-storage.ts [app-route] (ecmascript)");
;
;
/**
 * Detect experiment type from difficulty score pattern
 * NMR experiments: difficulty 25-70 (peak complexity based)
 * Air quality experiments: difficulty 15-25 (AQI-based)
 * HPLC experiments: difficulty 7-14 (peak-based)
 */ function detectExperimentType(difficulty, id) {
    // NMR experiments have highest difficulty (25-70)
    if (difficulty >= 25) {
        return 'NMR';
    }
    // Air quality: difficulty 15-24
    if (difficulty >= 15) {
        return 'AIR_QUALITY';
    }
    // HPLC: difficulty < 15
    return 'HPLC';
}
async function fetchUnifiedExperiments(includeData = false) {
    try {
        // Get all on-chain experiments
        const onChainExperiments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$web3$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAllExperiments"])();
        // Enrich with type detection and sample ID
        const enriched = await Promise.all(onChainExperiments.map(async (exp)=>{
            const type = detectExperimentType(exp.difficulty, exp.id);
            let sampleId;
            if (type === 'AIR_QUALITY') {
                sampleId = `AIR-${exp.submittedAt}`;
            } else if (type === 'NMR') {
                sampleId = `NMR-${String(exp.id + 1).padStart(6, '0')}`;
            } else {
                sampleId = `HPLC-${String(exp.id + 1).padStart(4, '0')}`;
            }
            // Optionally fetch full data from Filecoin
            let data = null;
            if (includeData && exp.cid) {
                try {
                    data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$filecoin$2d$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["downloadFromFilecoin"])(exp.cid);
                } catch (error) {
                    console.warn(`Failed to fetch data for experiment ${exp.id}:`, error);
                    data = null;
                }
            }
            return {
                id: exp.id,
                type,
                sampleId,
                cid: exp.cid,
                difficulty: exp.difficulty,
                submitter: exp.submitter,
                submittedAt: exp.submittedAt,
                data
            };
        }));
        return enriched;
    } catch (error) {
        console.error('Failed to fetch unified experiments:', error);
        return [];
    }
}
async function fetchAirQualityExperiments() {
    const all = await fetchUnifiedExperiments();
    return all.filter((exp)=>exp.type === 'AIR_QUALITY');
}
async function fetchHplcExperiments() {
    const all = await fetchUnifiedExperiments();
    return all.filter((exp)=>exp.type === 'HPLC');
}
async function fetchLatestExperiment() {
    const all = await fetchUnifiedExperiments();
    if (all.length === 0) return null;
    // Sort by ID descending (most recent first)
    all.sort((a, b)=>b.id - a.id);
    return all[0];
}
function formatAirQualityForDisplay(data) {
    const aqiColor = getAQIColor(data.metrics.air_quality_index);
    const aqiLabel = data.scenario.replace('_', ' ').toUpperCase();
    return {
        title: `Air Quality - ${data.sampleId}`,
        subtitle: `${data.location} • ${data.device}`,
        primaryMetric: {
            label: 'AQI',
            value: data.metrics.air_quality_index.toFixed(1),
            color: aqiColor,
            status: aqiLabel
        },
        sensors: data.sensors,
        metrics: [
            {
                label: 'Formaldehyde',
                value: `${data.metrics.avg_formaldehyde_ppb.toFixed(1)} ppb`,
                max: `${data.metrics.max_formaldehyde_ppb.toFixed(1)} ppb`
            },
            {
                label: 'PM2.5',
                value: `${data.metrics.avg_pm2_5_ugm3.toFixed(1)} μg/m³`,
                max: `${data.metrics.max_pm2_5_ugm3.toFixed(1)} μg/m³`
            },
            {
                label: 'Temperature',
                value: `${data.metrics.temperature_c.toFixed(1)}°C`
            },
            {
                label: 'Humidity',
                value: `${data.metrics.humidity_rh.toFixed(1)}%`
            }
        ],
        chartData: data.dataPoints.map((point)=>({
                time: point.time,
                formaldehyde: point.formaldehyde,
                pm2_5: point.pm2_5,
                light: point.light
            }))
    };
}
function getAQIColor(aqi) {
    if (aqi < 50) return 'green';
    if (aqi < 100) return 'yellow';
    if (aqi < 150) return 'orange';
    if (aqi < 200) return 'red';
    return 'purple';
}
async function fetchDashboardStats() {
    try {
        const experiments = await fetchUnifiedExperiments();
        const hplcCount = experiments.filter((e)=>e.type === 'HPLC').length;
        const airQualityCount = experiments.filter((e)=>e.type === 'AIR_QUALITY').length;
        const nmrCount = experiments.filter((e)=>e.type === 'NMR').length;
        // Get most recent upload
        experiments.sort((a, b)=>b.submittedAt - a.submittedAt);
        const lastSync = experiments.length > 0 ? new Date(experiments[0].submittedAt * 1000).toLocaleTimeString() : 'Never';
        return {
            totalExperiments: experiments.length,
            hplcCount,
            airQualityCount,
            nmrCount,
            lastSync,
            isLive: true
        };
    } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        return {
            totalExperiments: 0,
            hplcCount: 0,
            airQualityCount: 0,
            nmrCount: 0,
            lastSync: 'Error',
            isLive: false
        };
    }
}
}),
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$llm$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/llm-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$experiment$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/experiment-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-current/lib/validation.ts [app-route] (ecmascript)");
;
;
;
;
;
// Rate limiting: 20 chat requests per minute (LLM calls are expensive)
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60000;
async function POST(request) {
    const securityHeaders = {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
    };
    try {
        // Check if LLM is configured
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$llm$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isLLMConfigured"])()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'LLM not configured',
                message: 'OpenAI API key is missing. Add OPENAI_API_KEY to .env.local'
            }, {
                status: 503,
                headers: securityHeaders
            });
        }
        // Get client IP for rate limiting
        const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])();
        const forwarded = headersList.get('x-forwarded-for');
        const clientIp = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
        // Check rate limit (stricter for LLM calls)
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkRateLimit"])(`api:chat:${clientIp}`, RATE_LIMIT, RATE_WINDOW_MS)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Rate limit exceeded',
                message: 'Too many chat requests. Please wait before sending more.',
                retryAfter: 60
            }, {
                status: 429,
                headers: {
                    ...securityHeaders,
                    'Retry-After': '60'
                }
            });
        }
        // Parse request body
        const body = await request.json();
        const { messages, includeGraphContext = true } = body;
        // Validate messages
        if (!messages || !Array.isArray(messages)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid request',
                message: 'messages array is required'
            }, {
                status: 400,
                headers: securityHeaders
            });
        }
        // Fetch Graph context if requested
        let graphContext = null;
        if (includeGraphContext) {
            try {
                const [experiments, stats] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$experiment$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchUnifiedExperiments"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$experiment$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchDashboardStats"])()
                ]);
                graphContext = {
                    experiments: experiments.slice(0, 10),
                    stats
                };
            } catch (error) {
                console.warn('[Chat API] Failed to fetch Graph context:', error);
            // Continue without context rather than failing
            }
        }
        // Query LLM (non-streaming for now - can add streaming later)
        const startTime = Date.now();
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$lib$2f$llm$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queryLLM"])(messages, graphContext, {
            stream: false,
            maxTokens: 500,
            temperature: 0.7
        });
        const duration = Date.now() - startTime;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            response: response,
            duration,
            graphContext: graphContext ? {
                experimentCount: graphContext.experiments?.length || 0,
                totalExperiments: graphContext.stats?.totalExperiments || 0
            } : null,
            timestamp: Date.now()
        }, {
            headers: securityHeaders
        });
    } catch (error) {
        console.error('[Chat API] Error:', error.message);
        // User-friendly error messages (don't leak internals)
        let userMessage = 'Chat service temporarily unavailable. Please try again.';
        let status = 500;
        if (error.message.includes('API key')) {
            userMessage = 'Chat service is not configured. Please contact support.';
            status = 503;
        } else if (error.message.includes('rate limit')) {
            userMessage = 'OpenAI rate limit reached. Please try again in a moment.';
            status = 429;
        } else if (error.message.includes('timeout')) {
            userMessage = 'Request timeout. Please try a shorter query.';
            status = 504;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$current$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Chat error',
            message: userMessage,
            timestamp: Date.now()
        }, {
            status,
            headers: securityHeaders
        });
    }
}
const revalidate = 0;
const dynamic = 'force-dynamic';
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__033f39b4._.js.map