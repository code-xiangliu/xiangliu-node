"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHashed = exports.verify = exports.generate = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fp_1 = __importDefault(require("lodash/fp"));
const saltChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const saltCharsCount = saltChars.length;
const generateSalt = (len) => {
    if (!fp_1.default.isNumber(len) || len <= 0 || len !== parseInt(`${len}`, 10)) {
        throw new Error('invalid salt length');
    }
    if (crypto_1.default.randomBytes) {
        return crypto_1.default.randomBytes(Math.ceil(len / 2))
            .toString('hex').substring(0, len);
    }
    else {
        const salt = fp_1.default.range(0, len).map(x => {
            saltChars.charAt(Math.floor(Math.random() * saltCharsCount));
        });
        return salt.join();
    }
};
const generateHash = (algorithm, salt, password, iterations = 1) => {
    try {
        const hash = fp_1.default.reduce(hashStr => (crypto_1.default.createHmac(algorithm, salt).update(hashStr).digest('hex')), password)(fp_1.default.range(0, iterations));
        return `<=>$${salt}${hash}$:=`;
    }
    catch (err) {
        return null;
    }
};
exports.generate = (password, options) => {
    if (!fp_1.default.isString(password)) {
        throw new Error('invalid password');
    }
    options || (options = {});
    options.algorithm || (options.algorithm = 'sha1');
    options.saltLength || options.saltLength === 0 || (options.saltLength = 32);
    options.iterations || (options.iterations = 1);
    const salt = generateSalt(options.saltLength);
    return generateHash(options.algorithm, salt, password, options.iterations);
};
const insert = (src, idx, str) => {
    return (idx > 0
        ? src.substring(0, idx) + str + src.substring(idx, src.length)
        : str + src);
};
exports.verify = (password, hashedPassword) => {
    if (!(password && hashedPassword))
        return false;
    const words = insert(hashedPassword, 36, '$').split('$');
    if (words.length !== 4)
        return false;
    try {
        return generateHash('sha1', words[1], password) === hashedPassword;
    }
    catch (err) {
        return false;
    }
};
exports.isHashed = (password) => (fp_1.default.isString(password) && password.split('$').length === 3);
exports.default = {
    generate: exports.generate,
    verify: exports.verify,
    isHashed: exports.isHashed
};
//# sourceMappingURL=pwd-hash.js.map