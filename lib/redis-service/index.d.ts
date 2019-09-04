export interface RedisOptions {
    port: number;
    host: string;
    options: any;
}
declare const useService: (options?: RedisOptions) => void;
export default useService;
