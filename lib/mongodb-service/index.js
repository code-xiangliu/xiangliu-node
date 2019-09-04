"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const base_service_1 = require("../base-service");
const defaultHost = 'localhost';
const defaultPort = 27017;
class MongoService {
    static connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (MongoService.connection)
                return;
            try {
                MongoService.options = options;
                const { host, port, database } = options, opts = __rest(options, ["host", "port", "database"]);
                if (!database) {
                    throw new Error('mongodb database could not be empty');
                }
                const uri = `mongodb://${host || defaultHost}:${port || defaultPort}/${database}`;
                MongoService.connection = yield mongoose_1.default.createConnection(uri, opts);
                base_service_1.globalStore.loggerService.info('connected successfully');
            }
            catch (err) {
                base_service_1.globalStore.loggerService.info(`connected failed: ${err.message}`);
            }
        });
    }
    static getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!MongoService.connection) {
                yield MongoService.connect(MongoService.options);
            }
            return MongoService.connection;
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
        getConnection: MongoService.getConnection
    };
};
exports.default = useService;
//# sourceMappingURL=index.js.map