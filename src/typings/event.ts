/** WebSocket 连接成功。 */
export interface ConnectEvent {
  action: 'connect'
  data: {
    client_id: string
  }
}

/** 消息被操作（发送、撤回等）。 */
export interface MessageEvent {
  action: 'push'
  data: {
    content: string
    time: number
    user_id: string
    channel_id: string
    message_id: string
    quote_l1?: string | null
    quote_l2?: string | null
    guild_id: string
    channel_type: number
    status?: number
    nonce?: string
    ctype?: number
    mentions?: Array<{
      nickname: string
      user_id: string
    }>
    member?: {
      nick: string | null
      roles: string[]
      guild_card: string[]
      assist_level: number
    }
    resource_type?: string
    platform?: string
    author?: {
      nickname: string
      username: string
      avatar: string
      avatar_nft?: unknown
      bot: boolean
    }
    desc?: string
  }
  ack?: number
  seq?: number | null
  status?: boolean
}

export type PushPayload =
  | ConnectEvent
  | MessageEvent
