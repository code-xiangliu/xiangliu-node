"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
class Client {
    constructor(apiKey, domain) {
        this.auth = () => {
            return Buffer.from(`api:${this.apiKey}`).toString('base64');
        };
        this.requestWith = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.post(`https://api.mailgun.net/v3/${this.domain}/messages`, params, { headers: { Authorization: `Basic ${this.auth()}` } });
                return res.data;
            }
            catch (err) {
                return {
                    statusCode: 1,
                    body: err.message
                };
            }
        });
        this.handle = (response) => {
            if (response['status_code'] === 200) {
                const body = JSON.parse(response.body);
                return {
                    code: 200,
                    id: body.id,
                    message: body.message
                };
            }
            else {
                return {
                    code: 1,
                    id: null,
                    message: response.body
                };
            }
        };
        this.sendText = (from, to, subject, content) => __awaiter(this, void 0, void 0, function* () {
            const params = qs_1.default.stringify({ from, to, subject, text: content });
            const response = yield this.requestWith(params);
            return this.handle(response);
        });
        this.sendHtml = (from, to, subject, content) => __awaiter(this, void 0, void 0, function* () {
            const params = qs_1.default.stringify({ from, to, subject, html: content });
            const response = yield this.requestWith(params);
            return this.handle(response);
        });
        this.apiKey = apiKey.replace(/^api\:/, '');
        this.domain = domain;
    }
}
exports.default = Client;
//# sourceMappingURL=mailgun.js.map