import { ObjectID } from 'typeorm';
export declare class Product {
    id: ObjectID;
    restId: string;
    quantity: number;
    addedAt: number;
    selected: boolean;
    constructor(restId: string, quantity: number);
}
