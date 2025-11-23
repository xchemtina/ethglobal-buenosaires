module.exports = [
"[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/node_modules/@apm-js-collab/code-transformer/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;
// ./pkg/orchestrion_js.js has a side effect of loading the wasm binary. 
// We only want that if the library is actually used!
var cachedCreate;
/**
 * Create a new instrumentation matcher from an array of instrumentation configs.
 */ function create(configs, dc_module) {
    if (!cachedCreate) {
        cachedCreate = __turbopack_context__.r("[project]/ETHGlobalBuenosAires/blockchain-status-plotter-new/node_modules/@apm-js-collab/code-transformer/pkg/orchestrion_js.js [app-rsc] (ecmascript)").create;
    }
    if (cachedCreate === undefined) {
        throw new Error("Failed to load '@apm-js-collab/code-transformer'");
    }
    return cachedCreate(configs, dc_module);
}
}),
];

//# sourceMappingURL=b95de_%40apm-js-collab_code-transformer_index_93a6676c.js.map