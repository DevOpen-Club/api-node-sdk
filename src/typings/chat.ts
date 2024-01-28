import type { ChatPhoto } from './general'
import type { Message } from './message'
import type { PermissionOverwrite } from './permission'

/** 聊天类型。 */
export type ChatType = 'private' | 'channel' | 'group' | 'supergroup'

/** 聊天。 */
export interface Chat {
  /** 聊天唯一 ID。 */
  id: bigint
  /** 聊天类型。 */
  type: ChatType
  /** 聊天标题。 */
  title?: string
  /** Fanbook ID。 */
  username?: string
  /** 目前是用户名。 */
  first_name?: string
  /** @unused */
  last_name?: string
  /** @unused */
  photo?: ChatPhoto
  /** @unused */
  description?: string
  /** @unused */
  invite_link?: string
  /** @unused */
  pinned_message?: Message
}

/** 频道对象。 */
export interface Channel {
  /** 频道唯一 ID。 */
  channel_id: string
  /** 频道类型。 */
  type: ChannelType
  /** 所属服务器 ID，仅服务器频道则有此字段。 */
  guild_id?: string
  /** 频道名称。 */
  name: string
  /** 频道图标，如果是群则表示群的头像。 */
  icon: string
  /** 频道人数限制，仅对于群有人数限制。 */
  user_limit?: number
  /** 创建者 user id。 */
  owner_id: string
  /** 频道主题。 */
  topic?: string
  /** 频道的权限覆盖表。 */
  permission_overwrites?: PermissionOverwrite[]
}

/** 频道类型。 */
export enum ChannelType {
  /** 普通文本频道 */
  TextChannel = 0,
  /** 语音频道 */
  VoiceChannel,
  /** 视频频道 */
  VideoChannel,
  /** 私聊频道 */
  DMChannel,
  /** 频道分类 */
  ClassChannel,
  /** 圈子 */
  CircleChannel,
  /** 直播频道 */
  LiveStreamChannel,
  /** 链接频道 */
  LinkChannel,
  /** 直播房间 */
  LiveRoomChannel,
  /** @unused */
  TaskInduction,
  /** 群。 */
  GroupDMChannel,
}

/** 服务器表情。 */
export interface GuildEmoji {
  /** 图片链接地址。 */
  avatar: string
  /** 名称。 */
  name: string
  /** 位置。 */
  position: number
  /** 上传者 user id。 */
  user: string
  /** 表情宽度（单位：像素）。 */
  w: number
  /** 高度（单位：像素）。 */
  h: number
}

/** 服务器对象。 */
export interface Guild {
  /** 服务器唯一 ID。 */
  guild_id: string
  /** 名称。 */
  name: string
  /** 图标。 */
  icon: string
  /** 背景图片地址。 */
  banner: string
  /** 简介。 */
  description: string
  /** 所有者 user id。 */
  owner_id: string
  /** 频道列表。 */
  channels: Channel[]
  /** 初始权限值。 */
  permissions: number
}

/**
 * 邀请码对应的频道是否已被输出。
 *
 * `0`: 未删除。
 * `1`: 已删除。
 */
export type GuildInviteChannelIsDeleted = 0 | 1

export interface GuildInviteCodeRecord {
  /** 邀请码（不包含域名）。 */
  code?: string
  /** 邀请人昵称。 */
  inviter_name?: string
  /** 频道是否删除。 */
  channel_on_del?: GuildInviteChannelIsDeleted
  /** 邀请者用户的user_id */
  inviter_id: string
  /** 邀请者头像图片地址。 */
  avatar?: string
  /** 频道名称。 */
  channel_name?: string
  /** 过期时间（单位：秒，-1 表示不过期） */
  expire_time: `${number}`
  /** 剩余可用邀请人数。 */
  number_less?: `${number}`
  /** 已邀请人数。 */
  has_invited?: `${number}`
  /** 记录唯一 ID。 */
  list_id?: string
  /** 备注。 */
  remark?: string
  /** 设定的有效期（`-1` 表示永久有效）。 */
  time?: string
  /** 设定的次数（`-1` 表示无限）。 */
  number: `${number}`
  /** 邀请加入的频道 ID。 */
  channel_id: string
  /** 频道类型（邀请加入服务器时为 `null`）。 */
  channel_type?: number | null
  /** 圈子分享时，来源 post id。 */
  post_id?: string
  /** 邀请码链接。 */
  url?: string
}
