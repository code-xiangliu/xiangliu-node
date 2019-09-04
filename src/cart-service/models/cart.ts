import UserModel from './user'
import { Product } from '../entity/product'
import { Cart } from '../entity/cart'
import { User } from '../entity/user'
import fp from 'lodash/fp'

class CartModel {
  token: string
  userModel: UserModel
  user: User
  cart: Cart

  constructor (token: string) {
    this.token = token
    this.userModel = new UserModel()
    this.cart = null
  }

  async getCart () {
    this.user = await this.userModel.getUserInfo(this.token)
    this.cart = this.user.cart
  }

  async get () {
    if (!this.cart) await this.getCart()
    return this.cart
  }

  async push (products: Product[] | Product) {
    if (!this.cart) await this.getCart()

    const currProducts = fp.map((x: Product) => ({
      ...x, selected: false
    }))(this.cart.products)
    const plainProducts = fp.flatten([products])

    const result = fp.reduce((mem: Product[], val: Product) => {
      const { restId, quantity } = val
      const index = fp.findIndex((x: Product) => x.restId === restId)(mem)
      const product = mem[index]
      if (product) {
        product.quantity += quantity
      } else {
        mem.push(new Product(restId, quantity))
      }
      return mem
    }, currProducts)(plainProducts)

    this.cart.products = result

    await this.save()
  }

  async decrease (restId: string) {
    if (!this.cart) await this.getCart()

    const newProducts = fp.map((product: Product) => {
      if (product.restId === restId) {
        product.quantity = Math.max(0, product.quantity - 1)
      }
      return product
    })(this.cart.products)

    this.cart.products = newProducts

    await this.save()
  }

  async remove (restId: string) {
    if (!this.cart) await this.getCart()

    const newProducts = fp.filter(
      (product: Product) => (product.restId !== restId)
    )(this.cart.products)

    this.cart.products = newProducts

    await this.save()
  }

  async save () {
    await this.userModel.saveCart(this.cart)
  }
}

export default CartModel
