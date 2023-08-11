import axios, { Axios, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';
import * as _jsonBigint from 'json-bigint';
import { FanbookApiError } from './error';
import { User } from './typings';

const jsonBigint = _jsonBigint({
  strict: true,
  useNativeBigInt: true,
});

export interface BotOptions {
  /** Axios 实例配置。 */
  axios?: CreateAxiosDefaults;
}

/** 机器人客户端。 */
export class Bot {
  /**
   * 转换请求响应。
   * @param data - 响应体
   * @returns 转换后的响应体
   */
  public static parseResponse(data: unknown) {
    if (typeof data === 'string') {
      try { // 能转 JSON 就转
        return jsonBigint.parse(data);
      } catch { // 不能转原样返回
        return data;
      }
    }
    return data;
  }

  /**
   * 对请求进行中间处理。
   * @param request - 发出的请求
   * @returns 请求结果
   * @throws ：{@link FanbookApiError}
   */
  public static async unwrap<D, T = unknown>(request: Promise<AxiosResponse<T, D>>): Promise<D> {
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
    if (Reflect.has(data, 'ok') && !Reflect.get(data, 'ok')) { // 返回错误
      throw new FanbookApiError(
        Reflect.get(data, 'error_code') as number,
        Reflect.get(data, 'description') as string,
        response.request,
        response,
      );
    }
    return Reflect.get(data, 'result') as D; // 拿出结果。返回
  }

  constructor(
    /** 机器人 token。 */
    public token: string,
    /** 配置项。 */
    options?: BotOptions,
  ) {
    const resTransformers = options?.axios?.transformResponse ?? [];
    this.axios = axios.create({
      ...options?.axios,
      transformResponse: [
        Bot.parseResponse, // 解析 JSON
        ...(Array.isArray(resTransformers) // 加入所有给定的 transformer
          ? resTransformers
          : [resTransformers]
        ),
      ],
    });
  }

  /** 请求使用的 axios 实例。 */
  public readonly axios: Axios;

  /**
   * 向发送开放平台请求
   * @param path - 请求路径（不包括公共部分）
   * @param data - 请求体
   * @param options - 其他 axios 配置
   * @returns 响应体
   */
  async request<D>(path: string, data?: D, options?: AxiosRequestConfig) {
    return await this.axios.request<D>({
      url: path,
      baseURL: `https://a1.fanbook.mobi/api/bot/${this.token}`,
      data,
      ...options,
    });
  }

  public async getMe() {
    return Bot.unwrap<User>(this.request('/getMe'));
  }
}
