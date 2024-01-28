/**
 * 私信收到文本消息后，原样转发到指定频道。
 */

import { Bot, ChannelType } from 'fanbook-api-node-sdk'

const YOUR_BOT_TOKEN = '在此填入你的机器人令牌'
const TARGET_CHANNEL = BigInt('在此填入转发到的频道 ID')

const bot = new Bot(YOUR_BOT_TOKEN)
const bus = await bot.listen()

console.log('Service started')
bus.on('push', async (data) => {
  if (data.channel_type !== ChannelType.DMChannel)
    return // 非私聊，不处理
  const content = JSON.parse(data.content)
  if (content.contentType !== 0)
    return // 非纯文本，不处理
  try {
    const res = await bot.sendMessage(TARGET_CHANNEL, content.text, data.desc)
    console.log(`Forwarded ${data.message_id} -> ${res.message_id}`)
  }
  catch (e) {
    console.error(`Failed to forward message ${data.message_id}:`, e)
  }
})
