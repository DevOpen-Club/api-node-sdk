import axios, { AxiosResponse, CreateAxiosDefaults } from 'axios';
import jsonBigint from 'json-bigint';
import { FanbookApiError } from './error';

export const bigintJsonParser = jsonBigint({
  strict: true,
  useNativeBigInt: true,
});

/**
 * 转换请求响应。
 * @param data - 响应体
 * @returns 转换后的响应体
 */
function parseResponseBigint(data: unknown) {
  console.log(data);
  if (typeof data === 'string') {
    try { // 能转 JSON 就转
      return bigintJsonParser.parse(data);
    } catch { // 不能转原样返回
      return data;
    }
  }
  return data;
}

/**
 * 创建 Axios 实例。
 * @param options - 选项
 * @returns Axios 实例
 */
export function createAxios(options?: CreateAxiosDefaults) {
  let pipes = options?.transformResponse;
  // 将 pipes 转数组，然后浅拷贝，保证后续修改 options 不会影响到 pipes
  if (Array.isArray(pipes)) pipes = [...pipes];
  else pipes = pipes ? [pipes] : []; // pipes 可能为 undefined

  pipes.unshift(parseResponseBigint);
  return axios.create(options);
}

/**
 * 对请求进行中间处理。
 * @param request - 发出的请求
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
