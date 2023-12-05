import { Axios, CreateAxiosDefaults } from 'axios';
import base64 from 'js-base64';
import { createAxios, wrapResponse } from './axios';
import type { Guild, OAuth2 } from './typings';
import type { OAuth2Session } from './app-options';

export interface AppOptions {
  publicKey?: string;
  /** Axios 实例配置。 */
  axios?: CreateAxiosDefaults;
}

/** Fanbook 第三方应用。 */
export class App {
  constructor (
    /** OAuth 2.0 流程中的 client id。 */
    public readonly clientId: string,
    /** OAuth 2.0 流程中的 client secret。 */
    public readonly clientSecret: string,
    /** OAuth 2.0 流程中的 redirect url。 */
    public readonly redirectUrl: string,
    /** 配置项。 */
    options?: AppOptions,
  ) {
    this.axios = createAxios(options?.axios);
    this.axios.defaults.baseURL = 'https://a1.fanbook.mobi/open';
    // 这里用 defaults.headers 而不用 defaults.auth，因为后者会覆盖请求实际传入的配置
    this.axios.defaults.headers.common.Authorization = 'Basic ' + base64.encode(`${this.clientId}:${this.clientSecret}`);
    this.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  /**
   * 请求使用的 axios 实例。
   *
   * 默认配置：
   * - `baseURL`: `https://a1.fanbook.mobi/open`
   * - `headers`:
   *   - `Authorization`: 用户名为 {@link clientId}，密码为 {@link clientSecret}
   *   - `Content-Type`: `application/x-www-form-urlencoded`
   */
  public readonly axios: InstanceType<typeof Axios>;

  /**
   * OAuth 2.0 流程中，通过 authorization code 获取 access token。
   * @param code - authorization code
   * @returns 获取结果
   */
  public async codeToToken(code: string) {
    return await wrapResponse<OAuth2Session>(this.axios.post('/oauth2/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUrl,
    }));
  }

  /**
   * OAuth 2.0 流程中，刷新 access token。
   * @param refreshToken - OAuth 2.0 流程中的 refresh token
   * @returns 刷新结果
   */
  public async refreshToken(refreshToken: string) {
    return await wrapResponse<OAuth2Session>(this.axios.post('/oauth2/refresh', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      redirect_uri: this.redirectUrl,
    }));
  }

  /**
   * 获取用户基本信息。
   * @param accessToken - OAuth 2.0 流程中的 access token
   * @returns access token 对应的用户的基本信息
   */
  public async getUser(accessToken: string) {
    return await wrapResponse<OAuth2.User>(this.axios.post('/api/user/getMe', {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }));
  }

  /**
   * 获取用户所在的服务器。
   * @param accessToken - OAuth 2.0 流程中的 access token
   * @returns access token 对应的用户所在的服务器列表
   */
  public async listUserGuild(accessToken: string) {
    return await wrapResponse<Guild[]>(this.axios.post('/api/guild/getGuilds', {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }));
  }
}
