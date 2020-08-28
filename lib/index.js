"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_service_1 = __importStar(require("./base-service"));
const config_service_1 = __importDefault(require("./config-service"));
const lang_ext_service_1 = __importDefault(require("./lang-ext-service"));
const logger_service_1 = __importDefault(require("./logger-service"));
const redis_service_1 = __importDefault(require("./redis-service"));
const cache_service_1 = __importDefault(require("./cache-service"));
const mongodb_service_1 = __importDefault(require("./mongodb-service"));
const server_service_1 = __importDefault(require("./server-service"));
const kue_service_1 = __importDefault(require("./kue-service"));
const utils_1 = __importDefault(require("./utils"));
exports.default = {
    utils: utils_1.default,
    globalStore: base_service_1.globalStore,
    useBaseService: base_service_1.default,
    useConfigService: config_service_1.default,
    useLangExtService: lang_ext_service_1.default,
    useLoggerService: logger_service_1.default,
    useRedisService: redis_service_1.default,
    useCacheService: cache_service_1.default,
    useMongoService: mongodb_service_1.default,
    useServerService: server_service_1.default,
    useKueService: kue_service_1.default
};
//# sourceMappingURL=index.js.map