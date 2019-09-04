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
const user_1 = __importDefault(require("./user"));
const product_1 = require("../entity/product");
const fp_1 = __importDefault(require("lodash/fp"));
class CartModel {
    constructor(token) {
        this.token = token;
        this.userModel = new user_1.default();
        this.cart = null;
    }
    getCart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.user = yield this.userModel.getUserInfo(this.token);
            this.cart = this.user.cart;
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cart)
                yield this.getCart();
            return this.cart;
        });
    }
    push(products) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cart)
                yield this.getCart();
            const currProducts = fp_1.default.map((x) => (Object.assign({}, x, { selected: false })))(this.cart.products);
            const plainProducts = fp_1.default.flatten([products]);
            const result = fp_1.default.reduce((mem, val) => {
                const { restId, quantity } = val;
                const index = fp_1.default.findIndex((x) => x.restId === restId)(mem);
                const product = mem[index];
                if (product) {
                    product.quantity += quantity;
                }
                else {
                    mem.push(new product_1.Product(restId, quantity));
                }
                return mem;
            }, currProducts)(plainProducts);
            this.cart.products = result;
            yield this.save();
        });
    }
    decrease(restId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cart)
                yield this.getCart();
            const newProducts = fp_1.default.map((product) => {
                if (product.restId === restId) {
                    product.quantity = Math.max(0, product.quantity - 1);
                }
                return product;
            })(this.cart.products);
            this.cart.products = newProducts;
            yield this.save();
        });
    }
    remove(restId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cart)
                yield this.getCart();
            const newProducts = fp_1.default.filter((product) => (product.restId !== restId))(this.cart.products);
            this.cart.products = newProducts;
            yield this.save();
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userModel.saveCart(this.cart);
        });
    }
}
exports.default = CartModel;
//# sourceMappingURL=cart.js.map