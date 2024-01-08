import axios, { AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import { isPlainObject } from 'is-plain-object';
import jsonBigint from 'json-bigint';
import { FanbookApiError } from './error';

export const bigintJsonParser = jsonBigint({
  strict: true,
  useNativeBigInt: true,
});

/** 测试 Content-Type 是否为 json 的正则表达式。 */
const isJsonContentType = /^application\/(.*\+)?json$/;
/**
 * 解析请求 bigint。
 * @param req 请求数据
 * @returns 转换后的请求数据
 */
function requestBigintInterceptor(req: InternalAxiosRequestConfig) {
  const type = req.headers['content-type'];
  if (
    (typeof type === 'string' && isJsonContentType.test(type))
    || isPlainObject(req.data)
  ) { // 是 JSON
    req.data = bigintJsonParser.stringify(req.data);
    req.headers['content-type'] ??= 'application/json';
  }
  return req;
}
/**
 * 解析响应 bigint。
 * @param res 响应数据
 * @returns 转换后的响应数据
 */
function responseBigintInterceptor(res: AxiosResponse) {
  // 非 json 不处理
  const type = res.headers['content-type'];
  if (typeof type !== 'string') return res;
  if (!isJsonContentType.test(type)) return res;

  // 带 bigint 解析 json，不行就算了
  try {
    res.data = bigintJsonParser.parse(res.data);
  } catch {}
  return res;
}

/**
 * 创建 Axios 实例。
 * @param options 选项
 * @returns Axios 实例
 */
export function createAxios(options?: CreateAxiosDefaults) {
  const inst = axios.create({
    ...options,
    // 由于 axios 自动解析 json 导致 bigint 精度丢失，要阻止它的 json 解析
    // 如果用户已经给定 pipes，它会阻止 json 解析
    // 如果用户没有给定 pipes，要用 `(x) => x` 阻止 json 解析
    transformRequest: options?.transformRequest ?? ((x) => x),
    transformResponse: options?.transformResponse ?? ((x) => x),
  });
  inst.interceptors.request.use(requestBigintInterceptor);
  inst.interceptors.response.use(responseBigintInterceptor);
  return inst;
}

/**
 * 对请求进行中间处理。
 * @param request 发出的请求
 * @returns 请求结果
 * @throws FanbookApiError
 */
export async function wrapResponse<D, T = unknown>(request: Promise<AxiosResponse<T, D>>): Promise<D> {
  let response: AxiosResponse<T, D>;
  try {
    response = await request;
  } catch (e) {
    throw new FanbookApiError(undefined, undefined, undefined, undefined, e);
  }
  const { data } = response;
  if (typeof data !== 'object') { // 响应不合法
    throw new FanbookApiError(undefined, 'data is not object', response.request, response);
  }

  // Bot API 使用 ok 字段，OAuth 2.0 API 使用 error 字段
  const ok = Reflect.get(data, 'ok') ?? !Reflect.has(data, 'error');
  if (!ok) { // 返回错误
    throw new FanbookApiError(
      Reflect.get(data, 'error_code') as number,
      // Bot API 使用 description 字段，OAuth 2.0 API 使用 error 字段
      (Reflect.get(data, 'description') ?? Reflect.get(data, 'error')) as string,
      response.request,
      response,
    );
  }

  if (Reflect.has(data, 'result')) { // 有 result 字段的，结果在 result 里
    return Reflect.get(data, 'result') as D;
  }
  if (Reflect.has(data, 'data')) { // 有 data 字段的，结果在 data 里
    return Reflect.get(data, 'data') as D;
  }
  return data as D; // 否则整个都是
}
