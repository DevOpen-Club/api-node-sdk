import { bigintJsonParser } from '../src/axios'

describe('带 bigint 的 JSON 解析', () => {
  it('parse', () => {
    const str = '{"n1":999999999999999,"n2":1000000000000000,"id":9223372036854775808}'
    const obj = { n1: 999999999999999, n2: 1000000000000000n, id: 9223372036854775808n }
    const res = expect(bigintJsonParser.parse(str))
    res.toMatchObject(obj)
    res.not.toBeInstanceOf(Object)
  })

  it('stringify', () => {
    const str = '{"n1":999999999999999,"n2":1000000000000000,"id":9223372036854775808}'
    const obj = { n1: 999999999999999, n2: 1000000000000000n, id: 9223372036854775808n }
    const res = expect(bigintJsonParser.stringify(obj))
    res.toBe(str)
    res.not.toBeInstanceOf(Object)
  })
})
