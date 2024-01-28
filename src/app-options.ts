export interface OAuth2Session {
  /** OAuth 2.0 流程中的 access token。 */
  access_token: string
  /** OAuth 2.0 流程中的 refresh token。 */
  refresh_token: string
  token_type: 'Bearer'
  /** OAuth 2.0 流程中的 access token 有效时间（秒）。 */
  expires_in: number
  /** token 权限范围。 */
  scope: string
}
