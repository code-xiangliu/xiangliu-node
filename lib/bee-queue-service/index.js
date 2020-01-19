"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bee_queue_1 = __importDefault(require("bee-queue"));
const redis_1 = __importDefault(require("redis"));
const base_service_1 = require("../base-service");
const useService = () => {
    base_service_1.register({
        key: 'beeQueueService',
        requirements: ['configService', 'redisService']
    });
    const { config } = base_service_1.globalStore.configService;
    const producerConfig = {
        getEvents: false,
        isWorker: false,
        redis: redis_1.default.createClient({
            port: config.redisService.port,
            host: config.redisService.host,
            password: config.redisService.password
        })
    };
    const workerConfig = {
        redis: redis_1.default.createClient({
            port: config.redisService.port,
            host: config.redisService.host,
            password: config.redisService.password
        })
    };
    base_service_1.globalStore.beeQueueService = {
        producerQueue: (key) => new bee_queue_1.default(key, producerConfig),
        workerQueue: (key) => new bee_queue_1.default(key, workerConfig)
    };
};
exports.default = useService;
//# sourceMappingURL=index.js.map