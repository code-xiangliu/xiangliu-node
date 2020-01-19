"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_service_1 = require("../base-service");
const useService = () => {
    base_service_1.register({ key: 'customDataService' });
    const data = {};
    base_service_1.globalStore.setItem = (key, value) => data[key] = value;
    base_service_1.globalStore.getItem = (key) => data[key];
};
exports.default = useService;
//# sourceMappingURL=index.js.map