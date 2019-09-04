import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm'
import { Cart } from './cart'

@Entity()
export class User {

  @ObjectIdColumn()
  id: ObjectID

  @Column()
  outerId: string

  @Column(type => Cart)
  cart: Cart

}
