import fs from 'fs'
import path from 'path'

import { register, globalStore } from '../base-service'

const customConfig = path.join(__dirname, '..', '..', 'config.json')
const defaultConfig = path.join(__dirname, '..', '..', 'config.default.json')

const useService = (configPath: string | null = null) => {
  register({ key: 'configService' })

  const configs = [{}]

  if (configPath) {
    configs.push(require(configPath))
  } else if (fs.existsSync(customConfig)) {
    configs.push(require(customConfig))
  } else if (fs.existsSync(defaultConfig)) {
    configs.push(require(defaultConfig))
  }

  globalStore.configService = { config: configs[configs.length - 1] as any }
}

export default useService
