import UserModel from './user';
import { Product } from '../entity/product';
import { Cart } from '../entity/cart';
import { User } from '../entity/user';
declare class CartModel {
    token: string;
    userModel: UserModel;
    user: User;
    cart: Cart;
    constructor(token: string);
    getCart(): Promise<void>;
    get(): Promise<Cart>;
    push(products: Product[] | Product): Promise<void>;
    decrease(restId: string): Promise<void>;
    remove(restId: string): Promise<void>;
    save(): Promise<void>;
}
export default CartModel;
