import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Product {

  @ObjectIdColumn()
  id: ObjectID

  @Column()
  restId: string

  @Column()
  quantity: number

  @Column()
  addedAt: number

  @Column()
  selected: boolean

  constructor (restId: string, quantity: number) {
    this.restId = restId
    this.quantity = quantity
    this.addedAt = new Date().valueOf()
    this.selected = true
  }

}
