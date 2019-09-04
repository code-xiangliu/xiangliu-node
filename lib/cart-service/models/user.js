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
const user_1 = require("../entity/user");
const base_service_1 = require("../../base-service");
const { mongoService } = base_service_1.globalStore;
class UserModel {
    constructor() {
        this.userInfo = null;
    }
    getUserInfo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { outerId } = yield this.fetchUserInfo(token);
            this.user = yield this.queryUserInfo(outerId);
            return this.user;
        });
    }
    queryUserInfo(outerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = yield mongoService.getManager();
            const user = yield manager.findOne(user_1.User, { outerId });
            return user;
        });
    }
    fetchUserInfo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.userInfo)
                return this.userInfo;
            return {
                outerId: '1563684601362'
            };
        });
    }
    saveCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user.cart = cart;
            const manager = yield mongoService.getManager();
            yield manager.save(this.user);
        });
    }
}
exports.default = UserModel;
//# sourceMappingURL=user.js.map