declare const _default: {
    globalStore: import("./global").GlobalStore;
    useBaseService: () => void;
    useConfigService: (configPath?: string) => void;
    useLangExtService: () => void;
    useLoggerService: () => void;
    useRedisService: (options?: import("./redis-service").RedisOptions) => void;
    useCacheService: () => void;
    useServerService: () => void;
    useMailService: () => void;
};
export default _default;
