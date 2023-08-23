/**
 * 订阅所有机器人所在的频道、私聊的事件，如消息推送、消息撤回等。
 * 运行 10s 后自动取消。
 */

import { Bot } from 'fanbook-api-node-sdk';

const YOUR_BOT_TOKEN = '在此填入你的机器人令牌';

const bot = new Bot(YOUR_BOT_TOKEN);
const bus = await bot.listen();

bus.on('connect', (data) => console.log('Connection open, id:', data.client_id));
bus.on('push', (ev) => console.log('Receive push:', ev));
bus.on('error', (e) => console.error('Error occurred:', e));

setTimeout(() => {
  console.log('10s is reached, closing connection');
  bus.emit('close');
}, 10 * 1000);
