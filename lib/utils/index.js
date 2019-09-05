"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const change_case_object_1 = __importDefault(require("change-case-object"));
const pwd_hash_1 = __importDefault(require("./pwd-hash"));
const sendJSON = (res, camelObj) => {
    const useCamel = res.req.headers['x-use-camel'];
    if (useCamel === 'true') {
        res.json(camelObj);
    }
    else {
        const snakeObj = change_case_object_1.default.snakeCase(camelObj);
        res.json(snakeObj);
    }
};
exports.default = {
    sendJSON,
    pwdHash: pwd_hash_1.default
};
//# sourceMappingURL=index.js.map