import fp from 'lodash/fp'
import colors from 'colors/safe'
import { GlobalStore } from './global.d'

export const globalStore: GlobalStore = {} as any

interface RegisterInfo {
  key: string
  requirements: string | string[] | null
}

const registers = {}

const checkUnregistered = (unregistered: string[]) => {
  if (unregistered.length > 0) {
    throw new Error(colors.red(
      'requirements not found:\n\n\t' + fp.join('\n\t')(unregistered) + '\n\n'
    ))
  }
}

const checkRequirements = (requirements: any) => {
  if (fp.isArray(requirements) || fp.isString(requirements)) {
    fp.compose(
      checkUnregistered,
      fp.without(Object.keys(registers)),
      fp.flatten
    )([requirements])
  }
}

const registerFunc = ({ key, requirements = null }: RegisterInfo) => {
  checkRequirements(requirements)
  registers[key] = true
}

export const register = (registerInfo: RegisterInfo | { key: string }) => {
  const { serviceRegister } = globalStore
  if (serviceRegister) {
    serviceRegister.register(registerInfo)
  } else {
    throw new Error(colors.red('base service was required.'))
  }
}

const useService = () => {
  globalStore.serviceRegister = {
    register: registerFunc
  }
}

export default useService
