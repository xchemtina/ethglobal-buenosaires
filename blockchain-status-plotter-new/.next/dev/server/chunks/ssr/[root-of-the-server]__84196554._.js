module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/layout.tsx [app-rsc] (ecmascript)"));
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
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/lib/web3-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/node_modules/ethers/lib.esm/ethers.js [app-rsc] (ecmascript) <export * as ethers>");
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
        provider = new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].JsonRpcProvider(RPC_URL);
    }
    if (!registry) {
        registry = new __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(REGISTRY_ADDRESS, REGISTRY_ABI, provider);
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
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/lib/experiment-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$web3$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/lib/web3-service.ts [app-rsc] (ecmascript)");
;
/**
 * Detect experiment type from difficulty score pattern
 * Air quality experiments: difficulty 15-25 (AQI-based)
 * HPLC experiments: difficulty 7-12 (peak-based)
 */ function detectExperimentType(difficulty, id) {
    // Experiment #16 is our first air quality test
    if (id >= 16) {
        return 'AIR_QUALITY';
    }
    // Difficulty > 14 suggests air quality (AQI component)
    if (difficulty > 14) {
        return 'AIR_QUALITY';
    }
    return 'HPLC';
}
async function fetchUnifiedExperiments() {
    try {
        // Get all on-chain experiments
        const onChainExperiments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$web3$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAllExperiments"])();
        // Enrich with type detection and sample ID
        const enriched = onChainExperiments.map((exp)=>{
            const type = detectExperimentType(exp.difficulty, exp.id);
            let sampleId;
            if (type === 'AIR_QUALITY') {
                sampleId = `AIR-${exp.submittedAt}`;
            } else {
                sampleId = `HPLC-${String(exp.id + 1).padStart(4, '0')}`;
            }
            return {
                id: exp.id,
                type,
                sampleId,
                cid: exp.cid,
                difficulty: exp.difficulty,
                submitter: exp.submitter,
                submittedAt: exp.submittedAt,
                data: null
            };
        });
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
        // Get most recent upload
        experiments.sort((a, b)=>b.submittedAt - a.submittedAt);
        const lastSync = experiments.length > 0 ? new Date(experiments[0].submittedAt * 1000).toLocaleTimeString() : 'Never';
        return {
            totalExperiments: experiments.length,
            hplcCount,
            airQualityCount,
            lastSync,
            isLive: true
        };
    } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        return {
            totalExperiments: 0,
            hplcCount: 0,
            airQualityCount: 0,
            lastSync: 'Error',
            isLive: false
        };
    }
}
}),
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TestExperiments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$experiment$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/lib/experiment-service.ts [app-rsc] (ecmascript)");
;
;
async function TestExperiments() {
    const experiments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$experiment$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchUnifiedExperiments"])();
    const stats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$lib$2f$experiment$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchDashboardStats"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 max-w-6xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-8",
                children: "PoX Experiments Test"
            }, void 0, false, {
                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-4 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-gray-800 p-4 rounded-lg shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500",
                                children: "Total Experiments"
                            }, void 0, false, {
                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: stats.totalExperiments
                            }, void 0, false, {
                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                lineNumber: 14,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-gray-800 p-4 rounded-lg shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500",
                                children: "HPLC"
                            }, void 0, false, {
                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: stats.hplcCount
                            }, void 0, false, {
                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-gray-800 p-4 rounded-lg shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500",
                                children: "Air Quality"
                            }, void 0, false, {
                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: stats.airQualityCount
                            }, void 0, false, {
                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-gray-800 p-4 rounded-lg shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500",
                                children: "Last Sync"
                            }, void 0, false, {
                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg font-bold",
                                children: stats.lastSync
                            }, void 0, false, {
                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    experiments.map((exp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold",
                                                    children: exp.sampleId
                                                }, void 0, false, {
                                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                    lineNumber: 38,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500",
                                                    children: [
                                                        exp.type,
                                                        " • Experiment #",
                                                        exp.id
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                    lineNumber: 39,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                            lineNumber: 37,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-500",
                                                    children: "Difficulty"
                                                }, void 0, false, {
                                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                    lineNumber: 45,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-lg font-bold",
                                                    children: exp.difficulty
                                                }, void 0, false, {
                                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                    lineNumber: 46,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                            lineNumber: 44,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "CID:"
                                                }, void 0, false, {
                                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                    lineNumber: 52,
                                                    columnNumber: 17
                                                }, this),
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "text-xs",
                                                    children: [
                                                        exp.cid.slice(0, 24),
                                                        "..."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Submitted:"
                                                }, void 0, false, {
                                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                    lineNumber: 57,
                                                    columnNumber: 17
                                                }, this),
                                                ' ',
                                                new Date(exp.submittedAt * 1000).toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                            lineNumber: 56,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                exp.data && exp.type === 'AIR_QUALITY' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-4 border-t",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-4 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500",
                                                        children: "AQI"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold",
                                                        children: exp.data.metrics.air_quality_index.toFixed(1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 67,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500 capitalize",
                                                        children: exp.data.scenario
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                lineNumber: 65,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500",
                                                        children: "Formaldehyde"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold",
                                                        children: exp.data.metrics.avg_formaldehyde_ppb.toFixed(1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500",
                                                        children: "ppb"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500",
                                                        children: "PM2.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 84,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold",
                                                        children: exp.data.metrics.avg_pm2_5_ugm3.toFixed(1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 85,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500",
                                                        children: "μg/m³"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                lineNumber: 83,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500",
                                                        children: "Data Points"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold",
                                                        children: exp.data.dataPoints?.length || 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this),
                                exp.data && exp.type === 'HPLC' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-4 border-t",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-500",
                                        children: "HPLC Trace Data Available"
                                    }, void 0, false, {
                                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, this),
                                !exp.data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-4 border-t text-sm text-orange-500",
                                    children: "⚠️ Data not yet available from IPFS"
                                }, void 0, false, {
                                    fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, exp.id, true, {
                            fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)),
                    experiments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ETHGlobalBuenosAires$2f$blockchain$2d$status$2d$plotter$2d$new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12 text-gray-500",
                        children: "No experiments found on-chain"
                    }, void 0, false, {
                        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/app/test-experiments/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__84196554._.js.map