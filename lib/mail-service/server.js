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
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("@hapi/joi"));
const fp_1 = __importDefault(require("lodash/fp"));
const body_parser_1 = __importDefault(require("body-parser"));
const base_service_1 = require("../base-service");
const mailgun_1 = __importDefault(require("./mailgun"));
class Server {
    constructor(apiKey, domain) {
        this.initApp = () => {
            const app = express_1.default();
            app.all('*', function (req, res, next) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
                res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
                next();
            });
            app.use(body_parser_1.default.text());
            app.use(body_parser_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            this.app = app;
        };
        this.send = ({ type, from, to, subject, content }) => __awaiter(this, void 0, void 0, function* () {
            const func = this.sendFunc[type] || this.client.sendText;
            const res = yield func(from, to, subject, content);
            return res;
        });
        this.defaultRoute = (app) => {
            app.post('/mail', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const { type, from, to, subject, content } = req.body;
                const { error } = joi_1.default.validate({ type, from, to: fp_1.default.flatten([to]), subject, content }, {
                    type: joi_1.default.string().lowercase().allow(['text', 'html']).required(),
                    from: joi_1.default.string().email().required(),
                    to: joi_1.default.array().length(1).unique()
                        .items(joi_1.default.string().email()).required(),
                    subject: joi_1.default.string().required(),
                    content: joi_1.default.string()
                });
                if (error)
                    throw error;
                const sendResult = yield this.send({ type, from, to, subject, content });
                res.json({ code: sendResult.code, message: sendResult.message });
            }));
        };
        this.client = new mailgun_1.default(apiKey, domain);
        this.sendFunc = {
            html: this.client.sendHtml,
            text: this.client.sendText
        };
        this.initApp();
    }
    run(port, routers = [this.defaultRoute]) {
        const { serverService } = base_service_1.globalStore;
        routers.forEach(func => func && func(this.app));
        serverService.run(this.app, port);
    }
}
exports.Server = Server;
exports.default = Server;
//# sourceMappingURL=server.js.map