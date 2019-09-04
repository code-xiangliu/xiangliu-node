"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = __importDefault(require("lodash/fp"));
const safe_1 = __importDefault(require("colors/safe"));
exports.globalStore = {};
const registers = {};
const checkUnregistered = (unregistered) => {
    if (unregistered.length > 0) {
        throw new Error(safe_1.default.red('requirements not found:\n\n\t' + fp_1.default.join('\n\t')(unregistered) + '\n\n'));
    }
};
const checkRequirements = (requirements) => {
    if (fp_1.default.isArray(requirements) || fp_1.default.isString(requirements)) {
        fp_1.default.compose(checkUnregistered, fp_1.default.without(Object.keys(registers)), fp_1.default.flatten)([requirements]);
    }
};
const registerFunc = ({ key, requirements = null }) => {
    checkRequirements(requirements);
    registers[key] = true;
};
exports.register = (registerInfo) => {
    const { serviceRegister } = exports.globalStore;
    if (serviceRegister) {
        serviceRegister.register(registerInfo);
    }
    else {
        throw new Error(safe_1.default.red('base service was required.'));
    }
};
const useService = () => {
    exports.globalStore.serviceRegister = {
        register: registerFunc
    };
};
exports.default = useService;
//# sourceMappingURL=base-service.js.map