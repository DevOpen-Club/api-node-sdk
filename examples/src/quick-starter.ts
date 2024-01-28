/**
 * 获取机器人基本信息。
 */

import { Bot } from 'fanbook-api-node-sdk'

const YOUR_BOT_TOKEN = '在此填入你的机器人令牌'

const bot = new Bot(YOUR_BOT_TOKEN)
console.log('Information about your bot:', await bot.getMe())
