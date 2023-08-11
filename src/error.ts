import { AxiosRequestConfig, AxiosResponse } from 'axios';

/** Fanbook API 请求错误。 */
export class FanbookApiError extends Error {
  constructor(
    /** 错误码。 */
    public code?: number,
    /** 错误信息。 */
    public description?: string,
    /** 请求对象。 */
    public request?: AxiosRequestConfig,
    /** 响应对象。 */
    public response?: AxiosResponse,
    /** Axios 抛出的错误。 */
    public error?: unknown,
  ) {
    super('Failed to call Fanbook API' + (code ? `: ${code}` : ''));
  }
}
