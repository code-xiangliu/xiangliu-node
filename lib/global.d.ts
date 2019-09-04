export interface ConfigService {
    config: {
        redisService: any;
        mongoService: any;
        loggerService: {
            filename: string;
        };
    };
}
export interface RedisService {
    redis: import('ioredis').Redis;
    options: any;
}
export interface CacheService {
    set(cacheKey: string, content: any, ttl?: number): Promise<any>;
    get(cacheKey: string, timeout?: number): Promise<any>;
    del(cacheKey: string): Promise<any>;
    setCache(cacheKey: string, content: any, ttl: number): Promise<any>;
    getCache(cacheKey: string, timeout?: number): Promise<any>;
    delCache(cacheKey: string): Promise<any>;
}
export interface MongoService {
    getManager(): Promise<any>;
}
export interface ServerService {
    run: (app: import('express').Express, port: number) => void;
}
export interface MailService {
    MailgunClient: typeof import('./mail-service/mailgun').default;
    Server: typeof import('./mail-service/server').default;
}
export interface GlobalStore {
    serviceRegister: any;
    configService: ConfigService;
    redisService: RedisService;
    cacheService: CacheService;
    mongoService: MongoService;
    loggerService: import('winston').Logger;
    serverService: ServerService;
    mailServer: MailService;
    __exit_hooked__: boolean;
    calc: (obj: any) => {};
    p: (...args: any[]) => void;
    puts: (...args: any[]) => void;
    print: (...args: any[]) => void;
}
