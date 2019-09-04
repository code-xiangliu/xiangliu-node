"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const base_service_1 = require("../base-service");
const useService = () => {
    base_service_1.register({ key: 'loggerService', requirements: 'configService' });
    const filename = base_service_1.globalStore.configService.config.loggerService.filename;
    const transports = [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename })
    ];
    base_service_1.globalStore.loggerService = winston_1.default.createLogger({ transports });
};
exports.default = useService;
//# sourceMappingURL=index.js.map