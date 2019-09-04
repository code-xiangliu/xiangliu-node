import { createConnection, Connection } from 'typeorm'

import { register, globalStore } from '../base-service'

class MongoService {
  static options: any = null
  static connection: Connection = null

  static async connect (options: any) {
    if (MongoService.connection) return
    try {
      MongoService.options = options
      MongoService.connection = await createConnection(options)
      globalStore.loggerService.info('connected successfully')
    } catch (err) {
      globalStore.loggerService.info(`connected failed: ${err.message}`)
    }
  }

  static async getManager () {
    if (!MongoService.connection) {
      await MongoService.connect(MongoService.options)
    }
    return MongoService.connection.manager
  }
}

const useService = () => {
  register({
    key: 'mongoService',
    requirements: ['configService', 'loggerService']
  })

  const { configService } = globalStore
  MongoService.connect(configService.config.mongoService).catch()

  globalStore.mongoService = {
    getManager: MongoService.getManager
  }
}

export default useService
