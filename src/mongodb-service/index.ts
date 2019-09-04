import mongoose from 'mongoose'

import { register, globalStore } from '../base-service'

const defaultHost = 'localhost'
const defaultPort = 27017

class MongoService {
  static options: any = null
  static connection: mongoose.Collection = null

  static async connect (options: any) {
    if (MongoService.connection) return
    try {
      MongoService.options = options
      const { host, port, database, ...opts } = options
      if (!database) {
        throw new Error('mongodb database could not be empty')
      }
      const uri = `mongodb://${host || defaultHost}:${port || defaultPort}/${database}`
      MongoService.connection = await (mongoose.createConnection(uri, opts) as any)
      globalStore.loggerService.info('connected successfully')
    } catch (err) {
      globalStore.loggerService.info(`connected failed: ${err.message}`)
    }
  }

  static async getConnection () {
    if (!MongoService.connection) {
      await MongoService.connect(MongoService.options)
    }
    return MongoService.connection
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
    getConnection: MongoService.getConnection
  }
}

export default useService
