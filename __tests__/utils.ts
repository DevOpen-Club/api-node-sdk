import { faker } from '@faker-js/faker'

/** 随机生成 ID。 */
export function randomId() {
  return faker.string.numeric({ length: 18, allowLeadingZeros: false })
}

/** 随机生成 bot token。 */
export function randomBotToken() {
  return faker.string.hexadecimal({ casing: 'lower', length: 96, prefix: '' })
}

/** 随机生成 user token。 */
export function randomUserToken() {
  return faker.string.hexadecimal({ casing: 'lower', length: 224, prefix: '' })
}
