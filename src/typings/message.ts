import type { Chat } from './chat';
import type { Animation, CallbackGame, Game, Invoice, PhotoSize, Sticker, SuccessfulPayment } from './general';
import type { User } from './user';

/** 消息对象。 */
export interface Message {
  /** 消息唯一 ID。 */
  message_id: bigint;
  /** 消息发送者。 */
  from?: User;
  /** 消息发送时间（unix 时间戳）。 */
  date: number;
  /** 消息所在聊天。 */
  chat: Chat;
  /** @unused */
  forward_from?: User;
  /** @unused */
  forward_from_chat?: Chat;
  /** @unused */
  forward_from_message_id?: bigint;
  /** @unused */
  forward_signature?: string;
  /** @unused */
  forward_sender_name?: string;
  /** 转发消息时，原消息的发送时间（unix 时间戳）。 */
  forward_date?: number;
  /** 回复消息时，原消息对象。 */
  reply_to_message?: Message;
  /** 是否机器人发送的消息。 */
  via_bot?: User;
  /** 消息的最后编辑时间（unix 时间戳）。 */
  edit_date?: number;
  /** @unused */
  media_group_id?: string;
  /** @unused */
  author_signature?: string;
  /** 消息的文本内容（最大 102400KB）。 */
  text?: string;
  /**
   * 消息的中实体对象。
   *
   * 对于文本消息，包括但不限于：
   * - \@ 的用户
   * - 识别到的 url
   * - 机器人命令
   */
  entities?: MessageEntity[];
  /** 动画对象。 */
  animation?: Animation;
  /** 音频对象 */
  audio?: Audio;
  /** 文件对象。 */
  document?: Document;
  /** 图片对象。 */
  photo?: PhotoSize[];
  /** @unused */
  sticker?: Sticker;
  /** 视频对象。 */
  video?: Video;
  /** videonote 对象。 */
  video_note?: VideoNote;
  /** 语音对象。 */
  voice?: Voice;
  /** 标题。 */
  caption?: string;
  /** @unused */
  caption_entities?: MessageEntity[];
  /** 联系人对象。 */
  contact?: Contact;
  /** 骰子对象。 */
  dice?: Dice;
  /** 游戏对象 */
  game?: Game;
  /** 投票对象。 */
  poll?: Poll;
  /** 场所对象. */
  venue?: Venue;
  /** 位置对象 */
  location?: Location;
  /** 如果是用户进入服务器的通知消息，表示进入的用户。 */
  new_chat_members?: User[];
  /** 如果是用户退出服务器的通知消息，表示退出的用户。 */
  left_chat_member?: User;
  /** @unused */
  new_chat_title?: string;
  /** @unused */
  new_chat_photo?: PhotoSize[];
  /** @unused */
  delete_chat_photo?: true;
  /** @unused */
  group_chat_created?: true;
  /** 是否是 supergroup 创建通知。 */
  supergroup_chat_created?: true;
  /** @unused */
  channel_chat_created?: true;
  /**  @unused */
  migrate_to_chat_id?: bigint;
  /** @unused */
  migrate_from_chat_id?: bigint;
  /** @unused */
  pinned_message?: Message;
  /** @unused */
  invoice?: Invoice;
  /** @unused */
  successful_payment?: SuccessfulPayment;
  /** 内联键盘。 */
  reply_markup?: unknown;
}

/** 实体类型。 */
export type EntityType = 'at' | 'hashtag' | 'cashtag' | 'URL' | 'email' | 'phone_number' | 'bold' | 'italic' | 'underline' | 'delete' | 'code' | 'pre' | 'text_link';

/** @unused */
export interface MessageEntity {
  /** 实体类型。 */
  type: string;
  /** utf-16 编码下，实体开始的偏移量。 */
  offset: number;
  /** utf-16 编码下，实体长度。 */
  length: number;
  /** 如果 {@link "type"} 是 `text_link`，表示用户点击后打开的链接地址。 */
  url?: string;
  /** 如果 {@link "type"} 是 `at`，表示 \@ 的用户对象。 */
  user?: unknown;
  /** 如果 {@link "type"} 是 `pre`，表示使用的语言。 */
  language?: string;
}

/** 文件。 */
export interface Attachment {
  /**
   * 文件标识。
   *
   * 可用于下载、重用文件。
   */
  file_id: string;
  /**
   * 文件唯一 ID。
   *
   * 不受时间、获取人的影响。不可用于下载、重用文件。
   */
  file_unique_id: string;
  /** 文件的MIME 类型 */
  mime_type?: string;
  /** 文件大小 */
  file_size?: number;
  /** 封面。 */
  thumb?: PhotoSize;
}

/** 音频文件对象。 */
export interface Audio extends Attachment {
  /** 音频时长（单位：秒）。 */
  duration: number;
  /** 音频制作人。 */
  performer?: string;
  /** 标题。 */
  title?: string;
}

/** 普通文件对象。 */
export interface Document extends Attachment {
  /** 文件名称 */
  file_name?: string;
}

/** 视频文件对象。 */
export interface Video extends Attachment {
  /** 视频的宽度。 */
  width: number;
  /** 视频的高度。 */
  height: number;
  /** 视频时长（单位：秒）。 */
  duration: number;
}

/** 视频消息对象。 */
export interface VideoNote extends Attachment {
  /** 发送方设定的视频宽高。 */
  length: number;
  /** 视频时长（单位：秒）。 */
  duration: number;
}

/** 语音消息对象。 */
export interface Voice extends Attachment {
  /** 语音时间（单位：秒）。 */
  duration: number;
}

/** @unused */
export interface Contact {
  /** 联系人的电话。 */
  phone_number: string;
  /** 姓。 */
  first_name: string;
  /** 名。 */
  last_name?: string;
  /** 用户 ID。 */
  user_id?: bigint;
  /** 附加数据。 */
  vcard?: string;
}

/** @unused */
export interface Dice {
  /** 投掷动画类型。 */
  emoji: string;
  /** 骰子的数值。 */
  value: number;
}

/** 投票选项对象。 */
export interface PollOption {
  /** 选项文本（`1`~`100` 字符）。 */
  text: string;
  /** 得票数量。 */
  voter_count: number;
}

/** 用户在实名投票中投出的选票对象。 */
export interface PollAnswer {
  /** 唯一 ID。 */
  poll_id: string;
  /** 投票用户。 */
  user: User;
  /**
   * 用户选择的的选项标识符（从 `0` 开始）。
   *
   * 用户撤回投票时为空。
   */
  option_ids: number[];
}

export type  PollType = 'regular' | 'quiz';

/** 投票对象。 */
export interface Poll {
  /** 投票唯一 ID。 */
  id: string;
  /** 投票标题（`1`~`255` 字符）。 */
  question: string;
  /** 选项列表。 */
  options: PollOption[];
  /** 已投票的用户数。 */
  total_voter_count: number;
  /** 投票是否已结束。 */
  is_closed: boolean;
  /** 是否匿名。 */
  is_anonymous: boolean;
  /** 投票类型。 */
  type: PollType;
  /** 是否支持多选。 */
  allows_multiple_answers: boolean;
  /** 当 {@link "type"} 为 `quiz` 时，正确答案的选项标识符。 */
  correct_option_id?: number;
  /** 当 {@link "type"} 时，回答错误时、点击灯图标时显示的文本（`0`~`200` 字符）。 */
  explanation?: string;
  /** 在 {@link explanation} 中。 */
  explanation_entities?: MessageEntity[];
  /** 允许查询结果的时长（单位：秒）。 */
  open_period?: number;
  /** 查询关闭时间（unix 时间戳）。 */
  close_date?: number;
}

/** @unused */
export interface Location {
  /** 纬度。 */
  longitude: number;
  /** 经度。 */
  latitude: number;
}

/** 场所对象。 */
export interface Venue {
  /** 位置 */
  location: Location;
  /** 名称。 */
  title: string;
  /** 地址 */
  address: string;
  /** 地理的四方标识符。 */
  foursquare_id?: string;
  /** 四方形的场地。 */
  foursquare_type?: string;
}

/** 准备下载的临时文件。 */
export interface File {
  /**
   * 文件标识。
   *
   * 可用于下载、重用文件。
   */
  file_id: string;
  /**
   * 文件唯一 ID。
   *
   * 不受时间、获取人的影响。不可用于下载、重用文件。
   */
  file_unique_id: string;
  /** 文件大小。 */
  file_size?: number;
  /** 文件路径。 */
  file_path?: string;
}

/** 有回复选项的自定义键盘。 */
export interface ReplyKeyboardMarkup {
  /** 对象数组 */
  keyboard: KeyboardButton[];
  /**
   * 是否允许客户端垂直响应式调整键盘大小。
   *
   * 如：如果只有两行按钮，则缩小键盘，但高度始终不变。
   *
   * @default false
   */
  resize_keyboard?: boolean;
  /**
   * 是否使用一次后就隐藏。
   *
   * 键盘仍将可用，但客户端将使用默认键盘。用户可以按下输入栏中的特殊按钮，再次显示自定义键盘。
   *
   * @default false
   */
  one_time_keyboard?: boolean;
  /** 是否仅对 \@ 的用户、回复的用户可见。 */
  selective?: boolean;
}

/** 回复键盘的按钮。 */
export interface KeyboardButton {
  /** 按钮的文本. 如果没有使用任何可选字段，当按下按钮时，它将作为消息发送 */
  text: string;
  /**
   * 是否将用户的电话号码将作为联系人发送。
   *
   * 仅在私聊中可用。
   *
   * 与 {@link request_location} 和 {@link request_poll} 互斥。
   */
  request_contact?: boolean;
  /**
   * 是否发送当前位置。
   *
   * 仅在私聊中可用。
   *
   * 与 {@link request_contact} 和 {@link request_poll} 互斥。
   */
  request_location?: boolean;
  /**
   * 将要创建的投票类型。
   *
   * 仅在私聊中可用。
   *
   * 与 {@link request_contact} 和 {@link request_location} 互斥。
   */
  request_poll?: KeyboardButtonPollType;
}

/** 投票类型按钮。 */
export interface KeyboardButtonPollType {
  /**
   * 只允许的投票类型。
   *
   * 不填则无限制。
   */
  type?: PollType;
}

/** 删除当前自定义键盘的消息。 */
export interface ReplyKeyboardRemove {
  /** 是否删除当前自定义键盘。 */
  remove_keyboard: true;
  /** 是否仅对 \@ 的用户、回复的用户删除。 */
  selective?: boolean;
}

/** 内联键盘对象。 */
export interface InlineKeyboardMarkup {
  /** 多行按钮。 */
  inline_keyboard: InlineKeyboardButton[][];
}

/**
 * 内联键盘中的按钮。
 *
 * @example
 * ```json
 * // 带“确定”“取消”按钮的内联键盘
 * {
 *   'inline_keyboard': [
 *     [
 *       {
 *       'text': '确定',
 *       'callback_data': 'confirm#>{\'command\':\'confirm\',\'data\':{\'credit_apply\':{\'guild_id\':259248080753266688,\'user_id\':135398049852686336,\'status\':true,\'apply_data\':{\'server_id\':\'302\',\'pid\':\'3568780\'},\'updated_at\':1628066996,\'created_at\':1628066996,\'message_id\':263587296580730880},\'unbind\':{\'guild_id\':259248080753266688,\'user_id\':135398049852686336,\'unbind_times\':1,\'latest_unbind_time\':1627141034},\'username\':\'655690\',\'nickname\':\'Allen.Lee\'}}'
 *       }
 *     ],
 *     [
 * /      {
 *       'text': '取消',
 *       'callback_data': 'cancle#>{\'command\':\'cancle\',\'data\':{\'credit_apply\':{\'guild_id\':259248080753266688,\'user_id\':135398049852686336,\'status\':true,\'apply_data\':{\'server_id\':\'302\',\'pid\':\'3568780\'},\'updated_at\':1628066996,\'created_at\':1628066996,\'message_id\':263587296580730880},\'unbind\':{\'guild_id\':259248080753266688,\'user_id\':135398049852686336,\'unbind_times\':1,\'latest_unbind_time\':1627141034},\'username\':\'655690\',\'nickname\':\'Allen.Lee\'}}'
 *       }
 *     ]
 *   ]
 * }
 * ```
 */
export interface InlineKeyboardButton {
  /** 按钮文本。 */
  text: string;
  /** 按下按钮时，打开的链接地址。 */
  url?: string;
  /** 按下按钮时，打开小程序 app_id。 */
  app_id?: string;
  /** @unused */
  login_url?: unknown;
  /** 按下按钮后，发送的回调数据。 */
  callback_data?: string;
  /** 按下按钮后，提示用户选择并打开一个聊天，自动在输入框中插入 `@机器人 本字段内容`。 */
  switch_inline_query?: string;
  /** 按下按钮后，在当前聊天输入框中插入 `@机器人 本字段内容`。 */
  switch_inline_query_current_chat?: string;
  /**
   * 按下按钮后，启动的游戏。
   *
   * 仅在第一行第一列中生效。
   */
  callback_game?: CallbackGame;
  /**
   * 按下按钮后，是否发送支付按钮。
   *
   * 仅在第一行第一列中生效。
   */
  pay?: boolean;
}

/** 内联键盘中的按钮的回调。 */
export interface CallbackQuery {
  /** 回调唯一 ID。 */
  id: string;
  /** 发送者。 */
  from: User;
  /**
   * 点击的按钮所在的消息。
   *
   * 如果消息太旧，消息内容和消息日期将不可用。
   */
  message?: Message;
  /** 点击的按钮所在的内联消息。*/
  inline_message_id?: string;
  /** 在按钮所在消息中，唯一的标识符。 */
  chat_instance?: string;
  /**
   * 回调附加数据。
   *
   * 此字段内容不一定可靠。
   */
  data?: string;
  /** 要返回的游戏的简称，用作游戏的唯一标识符。 */
  game_short_name?: string;
}
