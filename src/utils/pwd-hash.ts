import crypto from 'crypto'
import fp from 'lodash/fp'

const saltChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const saltCharsCount = saltChars.length

const generateSalt = (len: number) => {
  if (!fp.isNumber(len) || len <= 0 || len !== parseInt(`${len}`, 10)) {
    throw new Error('invalid salt length')
  }
  if (crypto.randomBytes) {
    return crypto.randomBytes(Math.ceil(len / 2))
      .toString('hex').substring(0, len)
  } else {
    const salt = fp.range(0, len).map(x => {
      saltChars.charAt(Math.floor(Math.random() * saltCharsCount))
    })
    return salt.join()
  }
}

const generateHash = (
  algorithm: string, salt: string, password: string, iterations: number = 1
) => {
  try {
    const hash = fp.reduce(hashStr => (
      crypto.createHmac(algorithm, salt).update(hashStr).digest('hex')
    ), password)(fp.range(0, iterations))
    return `<=>$${salt}${hash}$:=`
  } catch (err) {
    return null
  }
}

export const generate = (
  password: string,
  options: { algorithm: string, saltLength: number, iterations: number }
) => {
  if (!fp.isString(password)) {
    throw new Error('invalid password')
  }
  options || (options = {} as any)
  options.algorithm || (options.algorithm = 'sha1')
  options.saltLength || options.saltLength === 0 || (options.saltLength = 32)
  options.iterations || (options.iterations = 1)
  const salt = generateSalt(options.saltLength)
  return generateHash(options.algorithm, salt, password, options.iterations)
}

const insert = (src: string, idx: number, str: string) => {
  return (
    idx > 0
      ? src.substring(0, idx) + str + src.substring(idx, src.length)
      : str + src
  )
}

export const verify = (password: string, hashedPassword: string) => {
  if (!(password && hashedPassword)) return false
  const words = insert(hashedPassword, 36, '$').split('$')
  if (words.length !== 4) return false
  try {
    return generateHash('sha1', words[1], password) === hashedPassword
  } catch (err) {
    return false
  }
}

export const isHashed = (password: string) => (
  fp.isString(password) && password.split('$').length === 3
)

export default {
  generate,
  verify,
  isHashed
}
