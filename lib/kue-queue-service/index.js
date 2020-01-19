"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const kue_1 = __importDefault(require("kue"));
const base_service_1 = require("../base-service");
class KueRedis extends ioredis_1.default {
}
const useService = () => {
    base_service_1.register({
        key: 'kueQueueService',
        requirements: ['configService', 'redisService']
    });
    const { config } = base_service_1.globalStore.configService;
    const queue = kue_1.default.createQueue({
        prefix: config.kueService.prefix,
        redis: {
            createClientFactory: function () {
                return new KueRedis({
                    port: config.redisService.port,
                    host: config.redisService.host,
                    password: config.redisService.password
                });
            }
        }
    });
    base_service_1.globalStore.kueQueueService = {
        queue
    };
};
exports.default = useService;
//# sourceMappingURL=index.js.map