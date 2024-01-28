/**
 * 发送富文本消息到指定频道。
 *
 * 注：机器人发送消息需要申请白名单。
 */

import type { RichTextNode } from 'fanbook-api-node-sdk'
import { Bot, RichText } from 'fanbook-api-node-sdk'

const YOUR_BOT_TOKEN = '在此填入你的机器人令牌'
const TARGET_CHANNEL = BigInt('在此填入发送到的频道 ID')

const bot = new Bot(YOUR_BOT_TOKEN)
const nodes: RichTextNode[] = [{
  insert: '粗体\n',
  attributes: { bold: true },
}, {
  insert: '斜体\n',
  attributes: { italic: true },
}, {
  insert: '链接\n',
  attributes: { link: 'https://fanbook-api-sdk.js.org/' },
}, {
  insert: 'Hello World',
}, {
  insert: '\n',
  attributes: { 'code-block': true },
}]

const text = RichText.fromNodes(nodes)
await bot.sendMessage(TARGET_CHANNEL, text.toString(), '点击查看富文本消息')
