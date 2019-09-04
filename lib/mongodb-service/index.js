"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const base_service_1 = require("../base-service");
class MongoService {
    static connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (MongoService.connection)
                return;
            try {
                MongoService.options = options;
                MongoService.connection = yield typeorm_1.createConnection(options);
                base_service_1.globalStore.loggerService.info('connected successfully');
            }
            catch (err) {
                base_service_1.globalStore.loggerService.info(`connected failed: ${err.message}`);
            }
        });
    }
    static getManager() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!MongoService.connection) {
                yield MongoService.connect(MongoService.options);
            }
            return MongoService.connection.manager;
        });
    }
}
MongoService.options = null;
MongoService.connection = null;
const useService = () => {
    base_service_1.register({
        key: 'mongoService',
        requirements: ['configService', 'loggerService']
    });
    const { configService } = base_service_1.globalStore;
    MongoService.connect(configService.config.mongoService).catch();
    base_service_1.globalStore.mongoService = {
        getManager: MongoService.getManager
    };
};
exports.default = useService;
//# sourceMappingURL=index.js.map