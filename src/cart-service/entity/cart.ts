import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm'
import { Product } from './product'

@Entity()
export class Cart {

  @ObjectIdColumn()
  id: ObjectID

  @Column()
  outerId: string

  @Column()
  uuid: string

  @Column(type => Product)
  products: Product[]

}
