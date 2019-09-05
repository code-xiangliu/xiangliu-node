/// <reference types="express" />
declare const _default: {
    utils: {
        sendJSON: (res: import("express").Response, camelObj: any) => void;
        pwdHash: {
            generate: (password: string, options: {
                algorithm: string;
                saltLength: number;
                iterations: number;
            }) => string;
            verify: (password: string, hashedPassword: string) => boolean;
            isHashed: (password: string) => boolean;
        };
    };
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
