"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_service_1 = require("../base-service");
const mailgun_1 = __importDefault(require("./mailgun"));
const server_1 = __importDefault(require("./server"));
const useService = () => {
    base_service_1.register({ key: 'mailService', requirements: 'serverService' });
    base_service_1.globalStore.mailServer = { MailgunClient: mailgun_1.default, Server: server_1.default };
};
exports.default = useService;
//# sourceMappingURL=index.js.map