/** 权限项。 */
export enum Permission {
  /** 创建邀请链接。*/
  CREATE_INSTANT_INVITE = 0x1,
  /** 踢人。 */
  KICK_MEMBERS = 0x2,
  /** @unused */
  BAN_MEMBERS = 0x4,
  /** 超级管理员。 */
  ADMINISTRATOR = 0x8,
  /** 修改频道设置。 */
  MANAGE_CHANNELS = 0x10,
  /** 修改服务器设置。 */
  MANAGE_GUILD = 0x20,
  /** 表态。 */
  ADD_REACTIONS = 0x40,
  /** @unused */
  VIEW_AUDIT_LOG = 0x80,
  /** @unused */
  PRIORITY_SPEAKER = 0x100,
  /** @unused */
  STREAM = 0x200,
  /** 查看频道。 */
  VIEW_CHANNEL = 0x400,
  /** 发送消息。 */
  SEND_MESSAGES = 0x800,
  /** @unused */
  SEND_TTS_MESSAGES = 0x1000,
  /** 管理消息。 */
  MANAGE_MESSAGES = 0x2000,
  /** @unused */
  EMBED_LINKS = 0x4000,
  /** @unused */
  ATTACH_FILES = 0x8000,
  /** 查看历史消息。 */
  READ_MESSAGE_HISTORY = 0x10000,
  /** \@ 所有人、\@ 身份组。 */
  MENTION_EVERYONE = 0x20000,
  /** @unused */
  USE_EXTERNAL_EMOJIS = 0x40000,
  /** @unused */
  VIEW_GUILD_INSIGHTS = 0x80000,
  /** 进入语音频道。 */
  CONNECT = 0x100000,
  /** 在语音频道开麦。 */
  SPEAK = 0x200000,
  /** 语音频道控场。 */
  MUTE_MEMBERS = 0x400000,
  /** @unused */
  DEAFEN_MEMBERS = 0x800000,
  /** 语音频道踢人。 */
  MOVE_MEMBERS = 0x1000000,
  /** @unused */
  USE_VAD = 0x2000000,
  /** @unused */
  CHANGE_NICKNAME = 0x4000000,
  /** @unused */
  MANAGE_NICKNAMES = 0x8000000,
  /** 管理身份组。 */
  MANAGE_ROLES = 0x10000000,
  /** @unused */
  MANAGE_WEBHOOKS = 0x20000000,
  /** 管理表情。 */
  MANAGE_EMOJIS_AND_STICKERS = 0x40000000,
  /** 管理圈子。 */
  MANAGE_CIRCLE = 0x80000000,
  /** @unused */
  REQUEST_TO_SPEAK = 0x100000000,
  /** @unused */
  MANAGE_THREADS = 0x400000000,
  /** @unused */
  USE_PUBLIC_THREADS = 0x800000000,
  /** @unused */
  USE_PRIVATE_THREADS = 0x1000000000,
  /** @unused */
  USE_EXTERNAL_STICKERS = 0x2000000000,
}

/** 权限覆盖的对象类型。 */
export type PermissionOverwriteActionType = 'role' | 'user';

export interface PermissionOverwrite {
  /** 角色或用户 ID。 */
  id: string;
  /** 权限覆盖的对象类型。 */
  action_type: PermissionOverwriteActionType;
  /** 拒绝的权限值。 */
  deny: number;
  /** 允许的权限值。 */
  allows: number;
}
