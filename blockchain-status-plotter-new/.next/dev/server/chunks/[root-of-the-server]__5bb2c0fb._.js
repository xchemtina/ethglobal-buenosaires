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
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/lib/web3-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/node_modules/ethers/lib.esm/ethers.js [app-route] (ecmascript) <export * as ethers>");
;
// Contract addresses from deployment
const REGISTRY_ADDRESS = '0xA6Fa61924F06DB9A84B92182B69F5C08F3176554';
const RPC_URL = 'https://api.calibration.node.glif.io/rpc/v1';
// Minimal ABI - just the functions we need
const REGISTRY_ABI = [
    'function totalExperiments() view returns (uint256)',
    'function getExperiment(uint256) view returns (uint256 id, address submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint64 submittedAt)'
];
let provider = null;
let registry = null;
function getContract() {
    if (!provider) {
        provider = new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].JsonRpcProvider(RPC_URL);
    }
    if (!registry) {
        registry = new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(REGISTRY_ADDRESS, REGISTRY_ABI, provider);
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
        return {
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
    } catch (error) {
        console.error(`Failed to fetch experiment ${id}:`, error);
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
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/lib/filecoin-storage.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Filecoin Storage Integration
 * Downloads experiment data from Filecoin using Synapse SDK
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
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f40$filoz$2f$synapse$2d$sdk$2f$dist$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/node_modules/@filoz/synapse-sdk/dist/src/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f40$filoz$2f$synapse$2d$sdk$2f$dist$2f$src$2f$synapse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/node_modules/@filoz/synapse-sdk/dist/src/synapse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/node_modules/ethers/lib.esm/ethers.js [app-route] (ecmascript) <export * as ethers>");
;
;
// Cache to avoid re-downloading
const dataCache = new Map();
async function downloadFromFilecoin(pieceCid) {
    // Check cache first
    if (dataCache.has(pieceCid)) {
        console.log(`[Filecoin] Cache hit for ${pieceCid.slice(0, 20)}...`);
        return dataCache.get(pieceCid);
    }
    try {
        console.log(`[Filecoin] Downloading ${pieceCid.slice(0, 20)}...`);
        // Read-only mode - no private key needed for downloads
        // We'll use a public RPC endpoint
        const rpcUrl = process.env.FILECOIN_CLOUD_RPC || 'https://api.calibration.node.glif.io/rpc/v1';
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].JsonRpcProvider(rpcUrl);
        // For server-side downloads, we can use a dummy signer
        // Synapse downloads are public and don't require signatures
        const dummyWallet = __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Wallet.createRandom().connect(provider);
        const synapse = await __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f40$filoz$2f$synapse$2d$sdk$2f$dist$2f$src$2f$synapse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Synapse"].create({
            signer: dummyWallet,
            // Add timeout to prevent hanging
            timeout: 30000
        });
        // Download data using piece CID
        const dataBytes = await synapse.storage.download(pieceCid);
        // Convert bytes to JSON
        const dataStr = new TextDecoder().decode(dataBytes);
        const data = JSON.parse(dataStr);
        // Cache for future requests
        dataCache.set(pieceCid, data);
        console.log(`[Filecoin] Successfully downloaded ${pieceCid.slice(0, 20)}... (${dataBytes.length} bytes)`);
        return data;
    } catch (error) {
        console.error(`[Filecoin] Download failed for ${pieceCid}:`, error.message);
        // Fallback: Try IPFS gateways (may not work for fresh uploads)
        try {
            console.log(`[Filecoin] Attempting IPFS gateway fallback...`);
            const response = await fetch(`https://ipfs.io/ipfs/${pieceCid}`, {
                signal: AbortSignal.timeout(10000)
            });
            if (!response.ok) {
                throw new Error(`Gateway returned ${response.status}`);
            }
            const data = await response.json();
            dataCache.set(pieceCid, data);
            console.log(`[Filecoin] Gateway fallback successful`);
            return data;
        } catch (fallbackError) {
            console.error(`[Filecoin] Gateway fallback also failed:`, fallbackError.message);
            throw new Error(`Could not retrieve data from Filecoin or IPFS: ${error.message}`);
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
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/lib/experiment-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$web3$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/lib/web3-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$filecoin$2d$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/lib/filecoin-storage.ts [app-route] (ecmascript)");
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
        const onChainExperiments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$web3$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAllExperiments"])();
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
                    data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$filecoin$2d$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["downloadFromFilecoin"])(exp.cid);
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
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/api/experiments/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$experiment$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/lib/experiment-service.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const [experiments, stats] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$experiment$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchUnifiedExperiments"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$experiment$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchDashboardStats"])()
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            experiments,
            stats,
            timestamp: Date.now()
        });
    } catch (error) {
        console.error('API error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch experiments'
        }, {
            status: 500
        });
    }
}
const revalidate = 10;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5bb2c0fb._.js.map