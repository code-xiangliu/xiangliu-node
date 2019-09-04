"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const base_service_1 = require("../base-service");
const customConfig = path_1.default.join(__dirname, '..', '..', 'config.json');
const defaultConfig = path_1.default.join(__dirname, '..', '..', 'config.default.json');
const useService = (configPath = null) => {
    base_service_1.register({ key: 'configService' });
    const configs = [{}];
    if (configPath) {
        configs.push(require(configPath));
    }
    else if (fs_1.default.existsSync(customConfig)) {
        configs.push(require(customConfig));
    }
    else if (fs_1.default.existsSync(defaultConfig)) {
        configs.push(require(defaultConfig));
    }
    base_service_1.globalStore.configService = { config: configs[configs.length - 1] };
};
exports.default = useService;
//# sourceMappingURL=index.js.map