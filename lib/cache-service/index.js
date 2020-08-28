"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_timeout_1 = require("promise-timeout");
const base_service_1 = require("../base-service");
const delCache = (redis) => (cacheKey) => redis.del(cacheKey);
const setCache = (redis) => (cacheKey, content, ttl = null) => {
    if (ttl === null)
        ttl = 3600 * 6;
    return redis.setex(cacheKey, ttl, JSON.stringify(content));
};
const getCache = (redis) => (cacheKey, timeout = 200) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield promise_timeout_1.timeout(redis.get(cacheKey), timeout);
        return result ? JSON.parse(result) : null;
    }
    catch (err) {
        if (!(err instanceof promise_timeout_1.TimeoutError)) {
            base_service_1.globalStore.loggerService.error(`cache error: ${err.message}`);
        }
    }
    return null;
});
const useService = () => {
    base_service_1.register({
        key: 'cacheService',
        requirements: ['redisService', 'loggerService']
    });
    const { redisService } = base_service_1.globalStore;
    const set = setCache(redisService.redis);
    const get = getCache(redisService.redis);
    const del = delCache(redisService.redis);
    base_service_1.globalStore.cacheService = {
        set,
        get,
        del,
        setCache: set,
        getCache: get,
        delCache: del
    };
};
exports.default = useService;
//# sourceMappingURL=index.js.map