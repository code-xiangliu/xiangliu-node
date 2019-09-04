export declare const generate: (password: string, options: {
    algorithm: string;
    saltLength: number;
    iterations: number;
}) => string;
export declare const verify: (password: string, hashedPassword: string) => boolean;
export declare const isHashed: (password: string) => boolean;
declare const _default: {
    generate: (password: string, options: {
        algorithm: string;
        saltLength: number;
        iterations: number;
    }) => string;
    verify: (password: string, hashedPassword: string) => boolean;
    isHashed: (password: string) => boolean;
};
export default _default;
