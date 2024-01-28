export enum Gender {
  /** 男。 */
  MALE = 1,
  /** 女。 */
  FEMALE = 2,
  /** 保密。 */
  UNKNOWN = 3,
}

/** OAuth 2.0 流程中的用户。 */
export interface User {
  /** 用户 user id。 */
  user_id: string
  /** 是否机器人。 */
  is_bot: boolean
  /** 性别。 */
  gender: Gender
  /** 用户昵称。 */
  nickname: string
  /** 用户短 ID。 */
  username: string
  /** 头像图片地址。 */
  avatar: string
  /** 加入时间（unix 时间戳）。 */
  joined_at: string
  is_abroad: boolean
}

/** OAuth 2.0 流程中的第三方应用。 */
export interface Application {
  /** 应用 client id。 */
  client_id: string
  /** 应用简介。 */
  description: string
  /** 应用图标地址。 */
  icon: string
  /** 应用名称。 */
  name: string
  /** 应用申请的权限。 */
  scopes: string
}

/**
 * OAuth 2.0 权限范围。
 *
 * `user.info`: 用户基本信息。
 * `user.link`: 用户手机号码。
 */
export type Scope = 'user.info' | 'user.link'
