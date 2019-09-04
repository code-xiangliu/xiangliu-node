import { User } from '../entity/user'
import { Cart } from '../entity/cart'
import { globalStore } from '../../base-service'

const { mongoService } = globalStore

interface UserInfo {
  outerId: string
}

export default class UserModel {
  userInfo: UserInfo
  user: User

  constructor () {
    this.userInfo = null
  }

  async getUserInfo (token: string) {
    const { outerId } = await this.fetchUserInfo(token)
    this.user = await this.queryUserInfo(outerId)
    return this.user
  }

  private async queryUserInfo (outerId: string) {
    const manager = await mongoService.getManager()
    const user = await manager.findOne(User, { outerId })
    return user
  }

  private async fetchUserInfo (token: string) {
    if (this.userInfo) return this.userInfo
    return {
      outerId: '1563684601362'
    }
  }

  async saveCart (cart: Cart) {
    this.user.cart = cart
    const manager = await mongoService.getManager()
    await manager.save(this.user)
  }
}
