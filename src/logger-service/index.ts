import winston from 'winston'

import { register, globalStore } from '../base-service'

const useService = () => {
  register({ key: 'loggerService', requirements: 'configService' })

  const filename = globalStore.configService.config.loggerService.filename
  const transports = [
    new winston.transports.Console(),
    new winston.transports.File({ filename })
  ]
  globalStore.loggerService = winston.createLogger({ transports })
}

export default useService
