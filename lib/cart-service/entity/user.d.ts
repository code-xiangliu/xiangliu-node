import { ObjectID } from 'typeorm';
import { Cart } from './cart';
export declare class User {
    id: ObjectID;
    outerId: string;
    cart: Cart;
}
