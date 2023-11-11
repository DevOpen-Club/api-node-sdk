/**
 * 订阅所有机器人所在的频道、私聊的事件，如消息推送、消息撤回等。
 * 收到纯文本消息“取消”后，取消订阅。
 */

import { Bot } from 'fanbook-api-node-sdk';

const YOUR_BOT_TOKEN = '在此填入你的机器人令牌';
const CLOSING_MESSAGE = '{"type":"text","text":"取消","contentType":0}'; // 纯文本消息“取消”

const bot = new Bot(YOUR_BOT_TOKEN);
const bus = await bot.listen();

bus.on('connect', (data) => console.log('Connection opened, id:', data.client_id));
bus.on('error', (e) => console.error('Error occurred:', e));
bus.on('push', (ev) => {
  console.log('Received push:', ev);
  if (ev.content === CLOSING_MESSAGE) { // 收到“取消”消息
    console.log('Closing connection by message:', ev.message_id);
    bus.emit('close');
  }
});
