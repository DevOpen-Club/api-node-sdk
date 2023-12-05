import { Axios, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import NodeWs from 'ws';
import { v4 as uuid } from 'uuid';
import * as base64 from 'js-base64';
import mitt from 'mitt';
import { bigintJsonParser, createAxios, wrapResponse } from './axios';

import type {
  Guild,
  BotCommand,
  Message,
  ReplyKeyboardMarkup,
  User,
  GuildEmoji,
  GuildInviteCodeRecord,
  Chat,
  GuildRole,
  GuildCredit,
  Channel,
} from './typings';
import type {
  EditMessageOptions,
  GetGuildMembersResult,
  GuideChatMember,
  SendMessageOptions,
  SendPhotoOptions,
  SendReactionOptions,
  KickChatMemberOptions,
  ListGuildInvitationResult,
  ListChatMessageBehavior,
  SetChatOptions,
  ListChatMemberOptions,
  CreateGuildRoleOptions,
  SetGuildRoleOptions,
  SetUserCreditOptions,
  DeleteGuildUserCreditOptions,
  ListenEvents,
  ListenOptions,
} from './bot-options';

export interface BotOptions {
  /** Axios 实例配置。 */
  axios?: CreateAxiosDefaults;
}

/** 机器人客户端。 */
export class Bot {
  constructor(
    /** 机器人 token。 */
    public readonly token: string,
    /** 配置项。 */
    options?: BotOptions,
  ) {
    this.axios = createAxios(options?.axios);
    this.axios.defaults.baseURL = `https://a1.fanbook.mobi/api/bot/${this.token}`;
  }

  /**
   * 请求使用的 axios 实例。
   *
   * 默认配置：
   * - `baseURL`: `https://a1.fanbook.mobi/api/bot/${this.token}`
   */
  public readonly axios: InstanceType<typeof Axios>;

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
      method: 'POST',
      data: typeof data === 'object' ? bigintJsonParser.stringify(data) : data,
      ...options,
      headers: {
        'Content-Type': typeof data === 'object' ? 'application/json' : undefined,
        ...options?.headers,
      },
    });
  }

  /**
   * 校验令牌有效性，获取机器人自身的信息。
   * @returns 机器人自身信息
   */
  public async getMe() {
    return await wrapResponse<User>(this.request('/getMe', undefined, {
      method: 'GET',
    }));
  }

  /**
   * 获取机器人自身的命令列表。
   * @returns 命令列表
   */
  public async listMyCommand() {
    return await wrapResponse<BotCommand[]>(this.request('/getMyCommands', undefined, {
      method: 'GET',
    }));
  }

  /**
   * 设置机器人在指定频道中的昵称。
   * @param guild - 频道 ID
   * @param name - 新的昵称
   * @param id - 机器人的 user id，留空则自动获取
   */
  public async setGuildScopedName(guild: bigint, name: string, id?: bigint) {
    id = id ?? (await this.getMe()).id;
    await wrapResponse(this.request('/robot/setGuildNick', {
      guild_id: String(guild),
      bot_id: String(id),
      nickname: name,
    }));
  }

  /**
   * 获取消息信息。
   * @param chat - 消息所在聊天 ID
   * @param message - 消息 ID
   * @returns 消息对象
   */
  public async getMessage(chat: bigint, message: bigint) {
    return await wrapResponse<Message>(this.request('/getMessage', {
      chat_id: chat,
      message_id: message,
    }));
  }

  /**
   * 发送消息。
   * @permission SEND_MESSAGES *
   * @permission ADMINISTRATOR *
   * @param chat - 发送到的聊天 ID
   * @param content - 消息内容（`1`~`150000` 字节）
   * @param description - 消息描述，作为只能显示纯文本时的降级方案
   * @param options - 其他选项
   * @returns 发送的消息对象
   */
  public async sendMessage(chat: bigint, content: string, description: string, options?: SendMessageOptions) {
    return await wrapResponse<Message>(this.request('/sendMessage', {
      chat_id: chat,
      text: content,
      desc: description,
      ...options,
    }));
  }

  /**
   * 发送图片消息。
   * @permission SEND_MESSAGES
   * @permission ADMINISTRATOR
   * @param chat - 发送到的聊天 ID
   * @param url - 图片链接
   * @param options - 其他选项
   * @returns 发送的消息对象
   */
  public async sendPhoto(chat: bigint, url: string, options?: SendPhotoOptions) {
    return await wrapResponse<Message>(this.request('/sendPhoto', {
      chat_id: chat,
      photo: { Url: url },
      ...options,
    }));
  }

  /**
   * 发送通知。
   * @param user - 目标用户
   * @param content - 通知内容
   * @param type - 通知类型（`1`：未完成的任务；`2`：已完成的任务）
   * @param nonce - 雪花 ID，留空则自动生成
   */
  public async sendNotication(user: bigint, content: string, type: 1 | 2, nonce?: string) {
    nonce = nonce ?? uuid();
    await wrapResponse(this.request('/sendNotication', {
      channel_type: String(type),
      to_user_id: String(user),
      content,
      nonce,
    }));
  }

  /**
   * 对消息表态。
   * @permission ADD_REACTIONS
   * @permission ADMINISTRATOR
   * @param user - 表态的用户 ID
   * @param chat - 被表态的消息所在聊天 ID
   * @param message - 被表态的消息 ID
   * @param options - 其他数据
   */
  public async sendReaction(user: bigint, chat: bigint, message: bigint, options: SendReactionOptions) {
    await wrapResponse(this.request('/sendReaction', {
      user_id: String(user),
      message_id: String(message),
      channel_id: String(chat),
      ...options,
    }));
  }

  /**
   * 编辑消息。
   * @param chat - 消息所在聊天 ID
   * @param message - 消息 ID
   * @param content - 新的消息内容
   * @param options - 其他选项
   * @returns 编辑后的消息对象
   */
  public async editMessage(chat: bigint, message: bigint, content: string, options?: EditMessageOptions) {
    return await wrapResponse<Message>(this.request('/editMessageText', {
      chat_id: chat,
      message_id: message,
      text: content,
      ...options,
    }));
  }

  /**
   * 编辑内联键盘。
   * @param chat - 消息所在聊天 ID
   * @param message - 消息 ID
   * @param content - 新的内联键盘
   * @returns 编辑后的消息对象
   */
  public async editReplyMarkup(chat: bigint, message: bigint, content: ReplyKeyboardMarkup) {
    return await wrapResponse<Message>(this.request('/editMessageReplyMarkup', {
      chat_id: chat,
      message_id: message,
      reply_markup: content,
    }));
  }

  /**
   * 撤回消息。
   *
   * 如果有撤回消息权限，则可以撤回任何时间的，且身份比机器人低的用户，发送的消息，否则只能撤回自身 3 分钟之内发送的消息。
   *
   * 撤回失败返回 `false`。
   * @param chat - 消息所在聊天 ID
   * @param message - 消息 ID
   * @returns 是否成功
   */
  public async deleteMessage(chat: bigint, message: bigint) {
    return await wrapResponse<boolean>(this.request('/deleteMessage', {
      chat_id: chat,
      message_id: message,
    }));
  }

  /** @todo */
  public async listQuote() {}

  /**
   * 设置精选消息。
   * @permission MANAGE_MESSAGES
   * @permission ADMINISTRATOR
   * @param chat - 消息所在聊天
   * @param message - 消息 ID
   */
  public async pinMessage(chat: bigint, message: bigint) {
    await wrapResponse(this.request('/pinChatMessage', {
      chat_id: chat,
      message_id: message,
    }));
  }

  /**
   * 取消精选消息。
   * @permission MANAGE_MESSAGES
   * @permission ADMINISTRATOR
   * @param chat - 消息所在聊天 ID
   * @param message - 消息 ID
   */
  public async unpinMessage(chat: bigint, message: bigint) {
    await wrapResponse(this.request('/unpinChatMessage', {
      chat_id: chat,
      message_id: message,
    }));
  }

  /**
   * 获取服务器信息。
   * @param guild - 服务器 ID
   * @param user - 用户 ID
   * @returns 服务器对象
   */
  public async getGuild(guild: bigint, user?: bigint) {
    user = user ?? (await this.getMe()).id;
    return await wrapResponse<Guild>(this.request('/guild', {
      user_id: String(user),
      guild_id: String(guild),
    }));
  }

  /**
   * 分页获取服务器成员列表。
   * @param guild - 服务器 ID
   * @param channel - 频道 ID
   * @param ranges - 分页
   * @param user - 用户 ID，必须在频道中，留空则自动获取
   * @returns 当前页的成员信息
   */
  public async listGuildMember(guild: bigint, channel: bigint, ranges: Array<{ start: number, end: number }>, user?: bigint) {
    user = user ?? (await this.getMe()).id;
    return await wrapResponse<GetGuildMembersResult>(this.request('/v2/guild/members', {
      guild_id: String(guild),
      channel_id: String(channel),
      user_id: String(user),
      ranges,
    }));
  }

  /**
   * 分页获取身份组成员列表。
   * @param guild - 身份组所在服务器 ID
   * @param role - 身份组 ID
   * @param size - 分页大小，留空则为 `50`
   * @param last - 上一页的最后一个 ID
   * @returns 成员列表
   */
  public async listRoleMember(guild: bigint, role: bigint, size: number = 50, last?: bigint) {
    return await wrapResponse<GuideChatMember[]>(this.request('/getRoleMembers', {
      guild_id: guild,
      role_id: role,
      size,
      last_id: last,
    }));
  }

  /**
   * 通过昵称模糊查询服务器成员。
   * @param guild - 所在服务器 ID
   * @param name - 查询的昵称
   */
  public async searchMembersByName(guild: bigint, name: string) {
    return await wrapResponse<GuideChatMember[]>(this.request('/searchGuildMember', {
      guild_id: guild,
      username: name,
    }));
  }

  /**
   * 批量通过 Fanbook ID（短 ID）获取用户。
   * @param guild - 所在频道 ID
   * @param ids - Fanbook ID 列表
   * @returns 用户列表
   */
  public async getMembersByShortIds(guild: bigint, ids: number[]) {
    return await wrapResponse<GuideChatMember[]>(this.request('/searchGuildMemberByName', {
      guild_id: guild,
      username: ids.map((v) => String(v)),
    }));
  }

  /**
   * 覆盖服务器成员的身份组。
   * @param guild - 所在服务器 ID
   * @param user - 用户 ID
   * @param roles - 新的身份组 ID 列表
   */
  public async setMemberRole(guild: bigint, user: bigint, roles: bigint[]) {
    await wrapResponse(this.request('/setMemberRoles', {
      guild_id: guild,
      user_id: user,
      roles,
    }));
  }

  /**
   * 给服务器成员添加身份组。
   * @param guild - 所在服务器 ID
   * @param user - 用户 ID
   * @param roles - 添加的身份组 ID 列表
   */
  public async addMemberRole(guild: bigint, user: bigint, roles: bigint[]) {
    await wrapResponse(this.request('/v2/setMemberRoles', {
      guild_id: guild,
      user_id: user,
      roles,
      operation: 'add',
    }));
  }

  /**
   * 给服务器成员移除身份组。
   * @param guild - 所在服务器 ID
   * @param user - 用户 ID
   * @param roles - 移除的身份组 ID 列表
   */
  public async removeMemberRole(guild: bigint, user: bigint, roles: bigint[]) {
    await wrapResponse(this.request('/v2/setMemberRoles', {
      guild_id: guild,
      user_id: user,
      roles,
      operation: 'del',
    }));
  }

  /**
   * 判断指定用户是否在指定服务器中。
   * @param guild - 所在服务器 ID
   * @param user - 用户 ID
   * @returns 是否在服务器中
   */
  public async isGuildMember(guild: bigint, user: bigint) {
    return (await wrapResponse<{ exists: boolean }>(this.request('/guild/existsMember', {
      guild_id: String(guild),
      member_id: String(user),
      operation: 'add',
    }))).exists;
  }

  /**
   * 禁言服务器成员。
   *
   * 禁言时长在 `60`~`2592000` 中，超出范围时如果在 `1`~`2147483647` 中则近取合法值，否则报错。
   * @param guild - 所在服务器 ID
   * @param user - 用户 ID
   * @param duration - 禁言时长（单位：秒）
   */
  public async forbidMemberSpeaking(guild: bigint, user: bigint, duration: number) {
    await wrapResponse(this.request('/forbidUserSpeaking', {
      target_uid: String(user),
      target_guild_id: String(guild),
      duration_in_second: duration,
    }));
  }

  /**
   * 从服务器或聊天中移除成员。
   * @param user - 用户 ID
   * @param options - 其他数据
   */
  public async removeChatMember(user: bigint, options: KickChatMemberOptions) {
    await wrapResponse(this.request('/kickChatMember', {
      user_id: user,
      ...options,
    }));
  }

  /**
   * 列出服务器表情符号。
   * @param guild - 所在服务器 ID
   * @returns 服务器表情符号列表
   */
  public async listGuildEmoji(guild: bigint) {
    return await wrapResponse<GuildEmoji[]>(this.request('/guild/emoji', undefined, {
      method: 'GET',
      params: { guild_id: String(guild) },
    }));
  }

  /**
   * 分页列出服务器邀请信息。
   * @param guild - 服务器 ID
   * @param size - 获取数量
   * @param last - 上一页 ID
   * @returns 当前页的服务器邀请信息列表
   */
  public async listGuildInvitation(guild: bigint, size: number, last?: bigint) {
    return await wrapResponse<ListGuildInvitationResult>(this.request('/invite/guildList', {
      guild_id: guild,
      size,
      list_id: String(last ?? 0),
    }));
  }

  /**
   * 获取邀请信息。
   * @param code - 邀请码（不包含域名）
   * @returns 邀请信息
   */
  public async getInvitation(code: string) {
    return await wrapResponse<GuildInviteCodeRecord>(this.request('/invite/codeInfo', {
      c: code,
    }));
  }

  /**
   * 获取用户实名认证状态。
   * @param user - 用户 ID
   * @returns 是否已实名认证
   */
  public async getUserHumanVerifyStatus(user: bigint) {
    return (await wrapResponse<{ authenrited: boolean; }>(this.request('/user/human_authentication', undefined, {
      method: 'GET',
      params: { user_id: user },
    }))).authenrited;
  }

  /**
   * 判断用户是否在指定服务器列表中。
   * @param user - 用户 ID
   * @param guilds - 服务器 ID 列表
   * @returns 用户在的服务器 ID 列表
   */
  public async checkUserGuilds(user: bigint, guilds: bigint[]) {
    return await wrapResponse<bigint[]>(this.request('/v2/checkUserGuilds', {
      user_id: user,
      guilds,
    }));
  }

  /**
   * 列出服务器频道。
   * @param guild - 服务器 ID
   * @returns 服务器频道 ID 列表
   */
  public async listGuildChannel(guild: bigint) {
    return await wrapResponse<Channel[]>(this.request('/channel/list', {
      guild_id: String(guild),
    }));
  }

  /**
   * 列出聊天的历史消息。
   * @param chat - 聊天 ID
   * @param size - 分页长度
   * @param message - 基准消息
   * @param behavior - 取基准消息的前还是后，留空则为 `before`
   * @returns 当前页的消息列表
   */
  public async listChatMessage(chat: bigint, size: number, message?: bigint, behavior?: ListChatMessageBehavior) {
    return await wrapResponse<bigint[]>(this.request('/message/getList', {
      channel_id: String(chat),
      size,
      message_id: message !== undefined ? String(message) : undefined,
      behavior,
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }));
  }

  /**
   * 设置聊天信息。
   * @param chat - 聊天 ID
   * @param options - 其他选项
   */
  public async setChat(chat: bigint, options?: SetChatOptions) {
    await wrapResponse(this.request('/channel/edit', {
      channel_id: String(chat),
      user_id: String(options?.user ?? (await this.getMe()).id),
      guild_id: options?.guild !== undefined ? String(options?.guild) : undefined,
      name: options?.name,
      topic: options?.topic,
      parent_id: options?.parent !== undefined ? String(options?.parent) : undefined,
      icon: options?.icon,
    }));
  }

  /**
   * 获取与用户的私聊。
   * @param user - 目标用户 ID
   * @returns 私聊
   */
  public async getPrivateChat(user: bigint) {
    return await wrapResponse<Chat>(this.request('/getPrivateChat', {
      user_id: user,
    }));
  }

  /**
   * 列出聊天或服务器成员。
   * @param options - 其他数据
   * @returns 成员列表
   */
  public async listChatMember(options: ListChatMemberOptions) {
    return await wrapResponse(this.request('/getChatMember', {
      user_id: String(options.user ?? (await this.getMe()).id),
      guild_id: options.guild !== undefined ? String(options.guild) : undefined,
      chat_id: options.chat !== undefined ? String(options.chat) : undefined,
    }));
  }

  /**
   * 列出服务器身份组。
   * @param guild - 服务器 ID
   * @param last - 上一页的最后一个 ID，留空则为第一页
   * @returns 服务器身份组列表
   */
  public async listGuildRole(guild: bigint, last?: bigint) {
    return await wrapResponse<GuildRole[]>(this.request('/getGuildRoles', {
      guild_id: guild,
      last_id: last,
    }));
  }

  /**
   * 创建服务器身份组。
   * @param guild - 所属服务器 ID
   * @param name - 身份组名称
   * @param color - 身份组颜色 RGB 数值
   * @param options - 其他选项
   * @returns 身份组对象
   */
  public async createGuildRole(guild: bigint, name: string, color: number, options?: CreateGuildRoleOptions) {
    return await wrapResponse<GuildRole>(this.request('/guild/role', {
      guild_id: String(guild),
      name,
      mentionable: options?.mentionable,
      hoist: options?.hoist,
      color: color,
    }, {
      method: 'PUT',
    }));
  }

  /**
   * 设置服务器身份组。
   * @param guild - 服务器 ID
   * @param role - 身份组 ID
   * @param options - 其他选项
   */
  public async setGuildRole(guild: bigint, role: bigint, options?: SetGuildRoleOptions) {
    await wrapResponse(this.request('/v2/guild/role', {
      guild_id: String(guild),
      id: String(role),
      name: options?.name,
      permissions: options?.permissions,
      mentionable: options?.mentionable,
      hoist: options?.hoist,
      color: options?.color,
    }, {
      method: 'PATCH',
    }));
  }

  /**
   * 删除服务器身份组。
   * @param guild - 服务器 ID
   * @param role - 身份组 ID
   */
  public async deleteGuildRole(guild: bigint, role: bigint) {
    await wrapResponse(this.request('/guild/role', {
      guild_id: String(guild),
      id: String(role),
    }, {
      method: 'DELETE',
    }));
  }

  /**
   * 获取服务器用户荣誉。
   * @param guild - 服务器 ID
   * @param user - 用户 ID
   * @returns 服务器用户荣誉列表
   */
  public async getGuildUserCredits(guild: bigint, user: bigint) {
    return await wrapResponse<GuildCredit[]>(this.request('/getGuildCredit', {
      guild_id: guild,
      user_id: user,
    }));
  }

  /**
   * 设置服务器用户荣誉。
   * @param user - 用户 ID
   * @param credit - 荣誉数据
   * @param options - 其他数据
   * @returns 荣誉自定义 ID
   */
  public async setUserCredit(user: bigint, credit: GuildCredit, options: SetUserCreditOptions) {
    const id = options.card ?? uuid();
    await wrapResponse(this.request('/v2/guild/credit', {
      guild_id: options.guild !== undefined ? String(options.guild) : undefined,
      chat_id: options.chat,
      user_id: String(user),
      card_id: id,
      guild_credit: credit,
    }, {
      method: 'PUT',
    }));
    return id;
  }

  /**
   * 删除服务器用户荣誉。
   * @param user - 用户 ID
   * @param card - 荣誉自定义 ID
   * @param options - 其他数据
   */
  public async deleteGuildUserCredit(user: bigint, card: string, options: DeleteGuildUserCreditOptions) {
    await wrapResponse(this.request('/v2/guild/credit', {
      guild_id: options.guild !== undefined ? String(options.guild) : undefined,
      chat_id: options.chat,
      user_id: String(user),
      card_id: card,
    }, {
      method: 'DELETE',
    }));
  }

  /**
   * 订阅事件。
   *
   * 在返回值上调用 `.emit('close')` 可以取消订阅。
   * @param options - 其他选项
   * @returns 事件总线，[mitt](https://npmjs.com/package/mitt) 实例
   * @see https://github.com/fanbook-open/websocket-doc/blob/main/README.md
   */
  async listen(options?: ListenOptions) {
    async function handleMessage(ev: MessageEvent) {
      const data = JSON.parse(
        ev.data instanceof Blob
        ? await (ev.data as Blob).text() // 浏览器
        : ev.toString() // Node.js
      );
      switch (data.action) {
        case 'connect': bus.emit('connect', data.data); break; // 连接成功
        case 'pong': break; // 心跳包
        default:
          bus.emit('push', data.data);
      }
    }
    const Ws = (typeof WebSocket === 'undefined') ? NodeWs : WebSocket;
    const userToken = encodeURI(options?.userToken ?? Reflect.get(await this.getMe(), 'user_token') as string);
    const deviceId = encodeURI(options?.deviceId ?? String((await this.getMe()).id));
    const props = encodeURI(options?.superStr ?? base64.encode(JSON.stringify({
      platform: 'bot',
      version: '1.6.60',
      channel: 'office',
      device_id: deviceId,
      build_number: '1',
    })));
    const ping = options?.ping ?? 25;
    const ws = new Ws(`wss://gateway-bot.fanbook.mobi/websocket?id=${userToken}&dId=${deviceId}&v=1.6.60&x-super-properties=${props}`);
    // ws.onmessage 在 Node.js 下无法获取数据
    // 为了兼容浏览器环境，分开实现
    if ('on' in ws) ws.on('message', handleMessage);
    else ws.onmessage = handleMessage;
    ws.onerror = (e: unknown) => bus.emit('error', e);
    ws.onclose = () => clearInterval(interval); // 防意外关闭导致 interval 不释放（释放两次是安全的）
    const interval = setInterval(() => { // 定时发送心跳包
      ws.send('{"type":"ping"}');
    }, 1000 * ping);
    const bus = mitt<ListenEvents>();
    bus.on('close', () => { // 监听用户发的关闭事件
      if (ws.readyState === ws.CLOSED || ws.readyState === ws.CLOSING) return;
      clearInterval(interval); // 关闭需要时间，为防关闭时刚好发心跳包，所以提前清除 interval
      ws.close();
    });
    return bus;
  }
}
