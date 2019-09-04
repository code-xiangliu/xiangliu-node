import { User } from '../entity/user';
import { Cart } from '../entity/cart';
interface UserInfo {
    outerId: string;
}
export default class UserModel {
    userInfo: UserInfo;
    user: User;
    constructor();
    getUserInfo(token: string): Promise<User>;
    private queryUserInfo;
    private fetchUserInfo;
    saveCart(cart: Cart): Promise<void>;
}
export {};
