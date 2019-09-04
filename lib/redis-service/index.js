"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const base_service_1 = require("../base-service");
const useService = (options = null) => {
    base_service_1.register({ key: 'redisService', requirements: 'configService' });
    const config = options || base_service_1.globalStore.configService.config.redisService;
    const redis = new ioredis_1.default(config);
    base_service_1.globalStore.redisService = { redis, options };
};
exports.default = useService;
//# sourceMappingURL=index.js.map