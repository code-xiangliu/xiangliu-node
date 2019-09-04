import Decimal from 'decimal.js'
import Purdy from 'purdy'
import exitHook from 'exit-hook'
import inspect from 'object-inspect'
import fp from 'lodash/fp'

import { register, globalStore } from '../base-service'

const purdy = (obj: any, options: any = undefined) => Purdy(obj, options)

const useService = () => {
  register({ key: 'langExtService' })

  if (!globalStore.__exit_hooked__) {
    exitHook(() => console.log('\0'))
    globalStore.__exit_hooked__ = true
  }

  globalStore.calc = obj => new Decimal(obj)

  globalStore.p = (...args) => fp.each(a => {
    if (fp.isString(a)) {
      console.log(`"${a.replace(/"/g, '\\"')}"`)
    } else {
      console.log(inspect(a))
    }
  })(args)

  globalStore.puts = (...args) => fp.each(a => {
    if (fp.isError(a)) {
      purdy(a)
    } else {
      console.log(`${a}`)
    }
  })(args)

  globalStore.print = (...args) => {
    process.stdout.write(args.map(a => `${a}`).join(' '))
  }
}

export default useService
