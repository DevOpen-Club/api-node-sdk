# API 调用

本项目存在的意义就是**让 Fanbook OpenAPI 更易用**。

## 机器人实例

调用 API 之前，需要创建一个机器人实例：

```ts
import { Bot } from 'fanbook-api-node-sdk';
const bot = new Bot('在此填入你的机器人令牌');
```

[`Bot`](/api/classes/Bot.html) 类的构造函数接受一个字符串，作为机器人令牌。在此实例上的 API 调用默认使用此令牌。

SDK 不校验令牌的有效性，但错误的令牌会在 API 调用时报错。

## 函数式调用 API

如果不使用 SDK，发送一条消息需要：

::: code-group

```ts [xhr]
import _jsonBigint from 'json-bigint';
const jsonBigint = _jsonBigint({ strict: true, useNativeBigInt: true });

const BOT_TOKEN = '在此填入你的机器人令牌';
const CHAT_ID = BigInt('在此填入发送到的聊天 ID');
const CONTENT = '在此填入消息内容';

const xhr = new XMLHttpRequest();
xhr.open('POST', `https://a1.fanbook.mobi/api/bot/${BOT_TOKEN}/sendMessage`);
xhr.onload = (e) => {
  if (xhr.readyState !== 4) return;
  const data = jsonBigint.parse(xhr.responseText);
  if (data.ok) console.log(data.result);
  else console.error(data);
};
xhr.send(jsonBigint.stringify({
  chat_id: CHAT_ID,
  text: CONTENT,
  desc: CONTENT,
}));
```

```ts [fetch]
import _jsonBigint from 'json-bigint';
const jsonBigint = _jsonBigint({ strict: true, useNativeBigInt: true });

const BOT_TOKEN = '在此填入你的机器人令牌';
const CHAT_ID = BigInt('在此填入发送到的聊天 ID');
const CONTENT = '在此填入消息内容';

const response = await fetch(`https://a1.fanbook.mobi/api/bot/${BOT_TOKEN}/sendMessage`, {
  method: 'POST',
  body: jsonBigint.stringify({
    chat_id: CHAT_ID,
    text: CONTENT,
    desc: CONTENT,
  }),
});
const data = jsonBigint.parse(await response.text());
if (data.ok) console.log(data.result);
else console.error(data);
```

```ts [axios]
import axios from 'axios';
import _jsonBigint from 'json-bigint';
const jsonBigint = _jsonBigint({ strict: true, useNativeBigInt: true });

const BOT_TOKEN = '在此填入你的机器人令牌';
const CHAT_ID = BigInt('在此填入发送到的聊天 ID');
const CONTENT = '在此填入消息内容';

const response = await axios.post(`https://a1.fanbook.mobi/api/bot/${BOT_TOKEN}/sendMessage`, jsonBigint.stringify({
  chat_id: CHAT_ID,
  text: CONTENT,
  desc: CONTENT,
}), {
  transformResponse: (data) => jsonBigint.parse(data),
});
const data = response.data;
if (data.ok) console.log(data.result);
else console.error(data);
```

:::

使用 SDK，发送一条消息需要：

```ts
import { Bot } from 'fanbook-api-node-sdk';

const BOT_TOKEN = '在此填入你的机器人令牌';
const CHAT_ID = BigInt('在此填入发送到的聊天 ID');
const CONTENT = '在此填入消息内容';

const bot = new Bot(BOT_TOKEN);
console.log(await bot.sendMessage(CHAT_ID, CONTENT, CONTENT));
```

这就是函数化 API 调用的优点：将业务无关的代码抽离，使代码逻辑清晰、维护简单。

常用的 API 可用方法封装于 [`Bot`](/api/classes/Bot.html) 类中，作为成员函数存在。详见 [API 文档](/api/classes/Bot.html#methods)。

如果你有兴趣深入研究，或有更复杂的业务需求，推荐你了解一下函数式 API 的执行流程：

![](/res/api-calling.svg)

## 自定义 API 调用

如果 [`Bot`](/api/classes/Bot.html) 类的成员函数中没有你需要的 API，可以考虑采用底层些的方法：

![](/res/api-calling.custom-api.svg)

也就是直接调用 [`Bot#request`](/api/classes/Bot.html#request) 来实现自定义 API 调用。

::: tip 关于 [`Bot#request`](/api/classes/Bot.html#request)

类型参数：

1. `D`：请求体的类型，无约束，建议不传，从 `data` 推断

参数：

1. `path`：接口路径，是 url path 中去除 `/api/bot/` 和令牌的部分（如 `https://a1.fanbook.mobi/api/bot/00000000/getMe` 应传入 `'getMe'`）
2. `data`：请求体，支持 JSON 和 `BigInt`
3. `options`：本次请求的 Axios 配置

返回：`Promise<AxiosResponse<D, any>>` 请求结果。

:::

## 自定义请求

如果你需要修改 HTTP 请求选项，或在请求前后进行处理，可以考虑混入 Axios 选项。

![](/res/api-calling.custom-request.svg)

只需把 Axios 选项作为 [`Bot`](/api/classes/Bot.html) 类构造函数的第 2 个参数的 `axios` 键值，即可在请求使用的 Axios 实例中混入选项。

```ts
import { Bot } from 'fanbook-api-node-sdk';

const BOT_TOKEN = '在此填入你的机器人令牌';
const bot = new Bot(BOT_TOKEN, {
  axios: { // axios 选项
    timeout: 3 * 1000,
    timeoutErrorMessage: 'Timeout 3000ms',
  },
});
```
