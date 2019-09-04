"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decimal_js_1 = __importDefault(require("decimal.js"));
const purdy_1 = __importDefault(require("purdy"));
const exit_hook_1 = __importDefault(require("exit-hook"));
const object_inspect_1 = __importDefault(require("object-inspect"));
const fp_1 = __importDefault(require("lodash/fp"));
const base_service_1 = require("../base-service");
const purdy = (obj, options = undefined) => purdy_1.default(obj, options);
const useService = () => {
    base_service_1.register({ key: 'langExtService' });
    if (!base_service_1.globalStore.__exit_hooked__) {
        exit_hook_1.default(() => console.log('\0'));
        base_service_1.globalStore.__exit_hooked__ = true;
    }
    base_service_1.globalStore.calc = obj => new decimal_js_1.default(obj);
    base_service_1.globalStore.p = (...args) => fp_1.default.each(a => {
        if (fp_1.default.isString(a)) {
            console.log(`"${a.replace(/"/g, '\\"')}"`);
        }
        else {
            console.log(object_inspect_1.default(a));
        }
    })(args);
    base_service_1.globalStore.puts = (...args) => fp_1.default.each(a => {
        if (fp_1.default.isError(a)) {
            purdy(a);
        }
        else {
            console.log(`${a}`);
        }
    })(args);
    base_service_1.globalStore.print = (...args) => {
        process.stdout.write(args.map(a => `${a}`).join(' '));
    };
};
exports.default = useService;
//# sourceMappingURL=index.js.map