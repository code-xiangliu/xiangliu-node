import { Response } from 'express';
declare const _default: {
    sendJSON: (res: Response<any>, camelObj: any) => void;
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
export default _default;
