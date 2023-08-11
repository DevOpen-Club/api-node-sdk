import type { PhotoSize } from './general';
import type { GuildRole } from './role';

/** Fanbook 用户。 */
export interface User {
  /** 用户唯一 ID。 */
  id: number;
  /** 是否机器人。 */
  is_bot: boolean;
  /** 姓。 */
  first_name: string;
  /** 名。 */
  last_name?: string;
  /** username 字段（又称为 Fanbook ID）。 */
  username?: string;
  /** 用户语言的 IETF 语言标签。 */
  language_code?: string;
  /**
   * 机器人是否可以被邀请进服务器。
   *
   * 该参数仅可通过 `Bot.getMe` 获取。
   */
  can_join_groups?: boolean;
  /**
   * 机器人是否可以接收服务器的所有消息。
   *
   * 该参数仅可通过 `Bot.getMe` 获取。
   */
  can_read_all_group_messages?: boolean;
  /**
   * 机器人是否支持内联查询。
   *
   * 该参数仅可通过 `Bot.getMe` 获取。
   */
  supports_inline_queries?: boolean;
  /** 服务器开启入门仪式时，用户是否已完成入门仪式。 */
  pending?: boolean;
}

/** 用户资料图片。 */
export interface UserProfilePhotos {
  /** 目标用户拥有的个人资料图片总数 */
  total_count: number;
  /** 请求的个人资料图片(每个最多4种尺寸) */
  photos: PhotoSize[][];
}

export type ChatMemberStatus = 'creator' | 'administrator' | 'member' | 'restricted' | 'left' | 'kicked';

/** 聊天成员对象。 */
export interface ChatMember {
  /** 用户对象。 */
  user: User;
  /** 在聊天中的状态。 */
  status: ChatMemberStatus;
  /** 成员在当前服务器拥有的角色 ID 列表 */
  roles?: GuildRole[];
  /** @unused */
  custom_title?: string;
  /** @unused */
  until_date?: number;
  /** 是否可管理服务器。 */
  can_manage_guild?: boolean;
  /** 是否可管理频道。 */
  can_manage_channels?: boolean;
  /** 是否可管理角色。 */
  can_manage_roles?: boolean;
  /** 是否可管理表情。 */
  can_manage_emojis?: boolean;
  /** 是机器人时，是否可修改用户的管理员权限。 */
  can_be_edited?: boolean;
  /** 是否可发送消息。 */
  can_post_messages?: boolean;
  /** 是否可管理消息。 */
  can_edit_messages?: boolean;
  /** @unused */
  can_delete_messages?: boolean;
  /** @unused */
  can_restrict_members?: boolean;
  /** @unused */
  can_promote_members?: boolean;
  /** @unused */
  can_change_info?: boolean;
  /** @unused */
  can_invite_users?: boolean;
  /** @unused */
  can_pin_messages?: boolean;
  /** @unused */
  is_member?: boolean;
  /** @unused */
  can_send_messages?: boolean;
  /** @unused */
  can_send_media_messages?: boolean;
  /** @unused */
  can_send_polls?: boolean;
  /** @unused */
  can_send_other_messages?: boolean;
  /** @unused */
  can_add_web_page_previews?: boolean;
}

/**
 * 命令可见级别。
 *
 * `0`: 所有人可见
 * `1`: 私聊可见
 * `2`: 服务器管理员可见
 */
export type BotCommandVisibleLevel = 0 | 1 | 2;

export interface BotCommand {
  /** 命令标题（1~32 字符，仅包含小写英文字母、数字和下划线）。 */
  command: string;
  /** 命令描述（3~256 字符）。 */
  description: string;
  /** 可见级别。 */
  visible_level: BotCommandVisibleLevel;
  /** 表单参数。 */
  form_parameters: BotCommandParameter[];
  /** 发出的消息是否仅触发命令的用户可见。 */
  hide: string;
  /** 点击发出的命令蓝字是否可以再次发出。 */
  clickable: string;
  /** 打开的小程序 app id。 */
  app_id: string;
  /** 打开的链接。 */
  url: string;
}

/** 机器人命令参数。 */
export interface BotCommandParameter {
  /** 图标图片地址。 */
  icon: string;
  /** 唯一标识。 */
  k: string;
  /** 值。 */
  v: string;
}

/** 机器人对象。 */
export interface Bot {
  /** 机器人 user id。 */
  bot_id: bigint;
  /** 所有者 user id */
  owner_id: bigint;
  /** 昵称。 */
  bot_name: string;
  /** 描述信息。 */
  bot_description: string;
  /** 关于机器人的一些详情。 */
  bot_about: string;
  /** 头像图片地址。 */
  bot_avatar: string;
  /** 命令。 */
  commands: BotCommand[];
  /** @unused*/
  webhook: string;
  /** 是否以内联模式工作。 */
  enable_inline_mode: boolean;
  /** 是否允许加入频道。 */
  join_group_allowed: boolean;
  /** 是否可以接收服务器的所有消息。 */
  enable_group_privacy_mode: boolean;
}
