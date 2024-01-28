import type { AxiosRequestHeaders, AxiosResponse, CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { isPlainObject } from 'is-plain-object'
import jsonBigint from 'json-bigint'
import { FanbookApiError } from './error'

/**
 * json-bigint 实例。
 *
 * 注意：
 * 1. 位数大于 15 位的数值会被当做 bigint 处理
 * 2. JSON 对象原型为 `null`
 */
export const bigintJsonParser = jsonBigint({
  strict: true,
  useNativeBigInt: true,
})

/**
 * 转换请求 bigint。
 * @param data 请求体
 * @param headers 请求头
 * @returns 转换后的请求体
 */
function requestBigintTransformer(data: unknown, headers: AxiosRequestHeaders) {
  if (isPlainObject(data)) { // 是 JSON
    data = bigintJsonParser.stringify(data)
    headers.setContentType('application/json')
  }
  return data
}
/**
 * 转换响应 bigint。
 * @param data 响应体
 * @returns 转换后的响应体
 */
function responseBigintTransformer(data: unknown) {
  // Fanbook 开放平台太坑爹，响应 Content-Type 是 text/plain，所以就不判断 Content-Type 了
  if (typeof data === 'string') {
    // 带 bigint 解析 json，不行就算了
    try {
      data = bigintJsonParser.parse(data)
    }
    catch {}
  }
  return data
}

/**
 * 创建 axios 实例。
 * @param options 选项
 * @returns axios 实例
 */
export function createAxios(options?: CreateAxiosDefaults) {
  let transformRequest = options?.transformRequest ?? []
  if (!Array.isArray(transformRequest))
    transformRequest = [transformRequest]
  let transformResponse = options?.transformResponse ?? []
  if (!Array.isArray(transformResponse))
    transformResponse = [transformResponse]

  const inst = axios.create({
    ...options,
    // 加入
    transformRequest: [requestBigintTransformer, ...transformRequest],
    transformResponse: [responseBigintTransformer, ...transformResponse],
  })
  return inst
}

/**
 * 对请求进行中间处理。
 * @param request 发出的请求
 * @returns 请求结果
 * @throws FanbookApiError
 */
export async function wrapResponse<D, T = unknown>(request: Promise<AxiosResponse<T, D>>): Promise<D> {
  let response: AxiosResponse<T, D>
  try {
    response = await request
  }
  catch (e) {
    throw new FanbookApiError(undefined, undefined, undefined, undefined, e)
  }
  const { data } = response
  if (typeof data !== 'object') { // 响应不合法
    throw new FanbookApiError(undefined, 'data is not object', response.request, response)
  }

  // Bot API 使用 ok 字段，OAuth 2.0 API 使用 error 字段
  const ok = Reflect.get(data, 'ok') ?? !Reflect.has(data, 'error')
  if (!ok) { // 返回错误
    throw new FanbookApiError(
      Reflect.get(data, 'error_code') as number,
      // Bot API 使用 description 字段，OAuth 2.0 API 使用 error 字段
      (Reflect.get(data, 'description') ?? Reflect.get(data, 'error')) as string,
      response.request,
      response,
    )
  }

  if (Reflect.has(data, 'result')) { // 有 result 字段的，结果在 result 里
    return Reflect.get(data, 'result') as D
  }
  if (Reflect.has(data, 'data')) { // 有 data 字段的，结果在 data 里
    return Reflect.get(data, 'data') as D
  }
  return data as D // 否则整个都是
}
