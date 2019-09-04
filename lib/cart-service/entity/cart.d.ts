import { ObjectID } from 'typeorm';
import { Product } from './product';
export declare class Cart {
    id: ObjectID;
    outerId: string;
    uuid: string;
    products: Product[];
}
