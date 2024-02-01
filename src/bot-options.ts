import type {
  Event,
  ForceReply,
  GuildInviteCodeRecord,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  User,
} from './typings'

export interface GetMeOptions {
  /**
   * 是否不使用缓存，而强制重新获取机器人信息。
   *
   * @default false
   */
  forced?: boolean
  /**
   * 更新缓存的策略。
   *
   * `no`: 不更新缓存。
   * `assign`: 直接赋值。
   * `copy`: 深拷贝后赋值。
   *
   * 如果选择 `assign`，修改返回值会导致缓存被一同修改。
   * @default 'copy'
   */
  writeToCache?: 'no' | 'assign' | 'copy'
}

export interface SendMessageOptions {
  /**
   * 解析模式。
   *
   * 富文本、消息卡片为 `Fanbook`。
   */
  parse_mode?: string
  /**
   * 消息是否是临时消息。
   *
   * 临时消息不做持久化存储，不多端同步，清除手机缓存后消失，并且不能被表态。
   */
  ephemeral?: boolean
  /**
   * 临时消息可见用户。
   *
   * {@link ephemeral} 非空时必填。
   *
   * `['all']` 表示所有在线用户。
   */
  users?: string[]
  /** 是否仅发送者、被 \@ 的用户可见。 */
  selective?: boolean
  /** 回复的消息。 */
  reply_to_message_id?: bigint
  /** 回复的消息所回复的消息。 */
  reply_to_message_id_level_2?: bigint
  /** 附加的接口选项. json格式化的对象，这些对象定义有内联键盘，自定义回复键盘，关于内联消息的定义可以参考的说明, 或者参考telegram的说明，我们是对他们兼容的实现：,。 */
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
  /**
   * 是否禁止表态。
   *
   * `1`: 禁止表态。
   * `0` / undefined: 允许表态。
   */
  unreactive?: 1 | 0
  /** 通知的用户 ID 列表。 */
  mentions?: string[]
  /** 需要通知提醒的身份组 ID 列表。 */
  mention_roles?: string[]
}

export interface SendPhotoOptions {
  /** 图片宽度。 */
  width?: number
  /** 图片高度。 */
  height?: number
  /** 回复的消息 ID。 */
  reply_to_message_id?: number
  /**
   * 附加选项。
   * @see telegram 对内联消息的定义
   */
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove
}

export type Emoji = '赞' | '掌声' | '好的' | '+1' | '爱心' | '比心' | '完成' | '微笑' | '可爱' | '憨笑' | '呲牙' | '色' | '汗颜' | '斜眼笑' | '暗中观察' | '酷' | '大哭' | '害羞' | '飞吻' | '瞌睡' | '尴尬' | '666' | '碰拳' | '握手' | '抱拳' | '玫瑰' | '加油干' | '奥力给' | '厉害哦' | '庆祝' | '干杯' | '惊喜' | '灵光一闪' | '可怜' | '鼓掌' | '再见' | '恶心' | '叹气' | '快哭了' | '耶' | '哈欠' | '爱意' | '倒笑脸' | '裂开' | '衰' | '小恶魔' | '猪头' | '生病' | '委屈' | '闭嘴' | '捂脸哭' | '不看' | '不听' | '嘿哈' | '挖鼻孔' | '不说' | '烦躁' | '拥抱' | '捂嘴笑' | '吃瓜' | '疑惑' | '幽灵' | '扶额' | '举手' | '拜托' | '拒绝' | '生气' | '勾' | '不' | '对' | '叉' | '1' | '2' | '3' | '4' | 'A' | 'B' | 'C' | 'D'

export interface SendReactionOptions {
  /** 自带的表情文案。 */
  emoji?: Emoji
  /** 自定义表情符号。 */
  avatar?: string
}

export interface EditMessageOptions {
  /** 解析模式，同 {@link SendMessageOptions.parse_mode}。 */
  parse_mode?: string
  /** 是否关闭链接预览。 */
  disable_web_page_preview?: boolean
  /** 内联键盘对象。 */
  reply_markup?: InlineKeyboardMarkup
  /** 是否关闭预览。 */
  selective?: boolean
}

export interface GetGuildMembersResult {
  ops: Array<{
    range: number[]
    op: 'SYNC'
    items: Array<{
      group?: {
        id: string
        name: string
        count: number
      }
      user?: {
        user_id: string
        nickname: string
        username: string
        avatar: string
        roles: Array<{
          id: string
          name: string
        }>
      }
    }>
  }>
  online_count: number
  member_count: number
  guild_count: number
  item_count: number
  guild_id: string
  channel_id: string
  channel_pub_ids: string[]
  groups: Array<{
    id: string
    name: string
    count: number
  }>
}

export interface GuideChatMember {
  user: User
  status: 'member'
  oversea: boolean
}

export interface KickChatMemberOptions {
  /**
   * 所在聊天 ID。
   *
   * 与 {@link guild_id} 二选一。
   */
  chat_id?: bigint
  /**
   * 所在服务器 ID。
   *
   * 与 {@link chat_id} 二选一。
   */
  guild_id?: bigint
  /** @unused */
  until_date: number
}

export interface ListGuildInvitationResult {
  /** 邀请信息列表。 */
  records: GuildInviteCodeRecord[]
  /** 获取的数量。 */
  size: number
  /** 本次分页 ID，可转为 `bigint`。 */
  list_id: string
  /** 是否还有下一页（`'0'`：无；`'1'`：有）。 */
  next: string
}

export type ListChatMessageBehavior = 'before' | 'after'

export interface SetChatOptions {
  /** 操作的用户 ID，留空则为机器人的 user id。 */
  user?: bigint
  /** 频道所属服务器 ID。 */
  guild?: bigint
  /** 新的聊天名称。 */
  name?: string
  /** 频道主题。 */
  topic?: string
  /** 频道所属频道分类 ID。 */
  parent?: bigint
  /** 新的图标。 */
  icon?: string
}

export interface ListChatMemberOptions {
  /** 操作的用户 ID，留空则为机器人的 user id。 */
  user?: bigint
  /**
   * 聊天 ID。
   *
   * 与 {@link guild} 二选一。
   */
  chat?: bigint
  /**
   * 服务器 ID。
   *
   * 与 {@link chat} 二选一。
   */
  guild?: bigint
}

export interface CreateGuildRoleOptions {
  /** 是否可以被 \@ 提及。 */
  mentionable?: boolean
  /** 是否在成员列表中单独显示。 */
  hoist?: boolean
}

export interface SetGuildRoleOptions extends CreateGuildRoleOptions {
  /** 身份组名称。 */
  name?: string
  /** 身份组颜色 RGB 数值。 */
  color?: number
  /** 身份组权限值。 */
  permissions: number
}

export interface SetUserCreditOptions {
  /** 荣誉自定义 ID，留空则自动生成。 */
  card?: string
  /**
   * 聊天 ID。
   *
   * 与 {@link guild} 二选一。
   */
  chat?: bigint
  /**
   * 服务器 ID。
   *
   * 与 {@link chat} 二选一。
   */
  guild?: bigint
}

export interface DeleteGuildUserCreditOptions {
  /**
   * 聊天 ID。
   *
   * 与 {@link guild} 二选一。
   */
  chat?: bigint
  /**
   * 服务器 ID。
   *
   * 与 {@link chat} 二选一。
   */
  guild?: string
}

export interface ListenOptions {
  /**
   * 事件订阅 WebSocket 接口 url。
   * @default 'wss://gateway-bot.fanbook.mobi/websocket'
   */
  url?: string | URL
  /** @default (await this.getMe()).user_token */
  userToken?: string
  /** @default String((await this.getMe()).id) */
  deviceId?: string
  /** @default '1.6.60' */
  version?: string
  /**
   * @default
   * base64.encode(JSON.stringify({
   *   platform: 'bot',
   *   version: '1.6.60',
   *   channel: 'office',
   *   device_id: deviceId,
   *   build_number: '1',
   * }))
   */
  superStr?: string
  /**
   * 心跳包间隔时间（单位：秒）。
   * @default 25
   */
  ping?: number
  /**
   * 是否过滤 `connect` `pong` 事件。
   *
   * 接收到上述事件后，会自动做一些特殊处理。
   * 如果此选项为 `true`，则处理后你就不会收到上述事件。
   * @default true
   */
  filterBgEvents?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ListenEvents = { // mitt 要求使用 type
  /** 连接成功。 */
  connect: Event.ConnectEvent
  /** 连接发生错误。 */
  error: any
  /**
   * 收到事件推送。
   *
   * 注意：`connect` `pong` 事件默认不会传出
   */
  push: Event.PushPayload
  /** 关闭连接。 */
  close: void
}
