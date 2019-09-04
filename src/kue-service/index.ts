import Redis from 'ioredis'
import kue from 'kue'

import { register, globalStore } from '../base-service'

class KueRedis extends Redis { }

const useService = () => {
  register({
    key: 'kueService',
    requirements: ['configService', 'redisService']
  })

  const { config } = globalStore.configService

  const queue = kue.createQueue({
    prefix: config.kueService.prefix,
    redis: {
      createClientFactory: function () {
        return new KueRedis({
          port: config.redisService.port,
          host: config.redisService.host,
          password: config.redisService.password
        })
      }
    }
  })

  globalStore.kueService = {
    queue
  }
}

export default useService
