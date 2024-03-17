# API 调用

本项目存在的意义就是**让 Fanbook OpenAPI 更易用**。

## 机器人实例

调用 API 之前，需要创建一个机器人实例：

```ts
import { Bot } from 'fanbook-api-node-sdk'
const bot = new Bot('在此填入你的机器人令牌')
```

[`Bot` 类](/api/classes/Bot.html)的构造函数接受一个字符串，作为机器人令牌。在此实例上的 API 调用默认使用此令牌。

SDK 不校验令牌的有效性，但错误的令牌会在 API 调用时报错。

## 函数式调用 API

如果不使用 SDK，发送一条消息需要：

::: code-group

```ts [xhr]
import _jsonBigint from 'json-bigint'
const jsonBigint = _jsonBigint({ strict: true, useNativeBigInt: true })

const BOT_TOKEN = '在此填入你的机器人令牌'
const CHAT_ID = BigInt('在此填入发送到的聊天 ID')
const CONTENT = '在此填入消息内容'

const xhr = new XMLHttpRequest()
xhr.open('POST', `https://a1.fanbook.mobi/api/bot/${BOT_TOKEN}/sendMessage`)
xhr.onload = (e) => {
  if (xhr.readyState !== 4)
    return
  const data = jsonBigint.parse(xhr.responseText)
  if (data.ok)
    console.log(data.result)
  else console.error(data)
}
xhr.send(jsonBigint.stringify({
  chat_id: CHAT_ID,
  text: CONTENT,
  desc: CONTENT,
}))
```

```ts [fetch]
import _jsonBigint from 'json-bigint'
const jsonBigint = _jsonBigint({ strict: true, useNativeBigInt: true })

const BOT_TOKEN = '在此填入你的机器人令牌'
const CHAT_ID = BigInt('在此填入发送到的聊天 ID')
const CONTENT = '在此填入消息内容'

const response = await fetch(`https://a1.fanbook.mobi/api/bot/${BOT_TOKEN}/sendMessage`, {
  method: 'POST',
  body: jsonBigint.stringify({
    chat_id: CHAT_ID,
    text: CONTENT,
    desc: CONTENT,
  }),
})
const data = jsonBigint.parse(await response.text())
if (data.ok)
  console.log(data.result)
else console.error(data)
```

```ts [axios]
import axios from 'axios'
import _jsonBigint from 'json-bigint'
const jsonBigint = _jsonBigint({ strict: true, useNativeBigInt: true })

const BOT_TOKEN = '在此填入你的机器人令牌'
const CHAT_ID = BigInt('在此填入发送到的聊天 ID')
const CONTENT = '在此填入消息内容'

const response = await axios.post(`https://a1.fanbook.mobi/api/bot/${BOT_TOKEN}/sendMessage`, jsonBigint.stringify({
  chat_id: CHAT_ID,
  text: CONTENT,
  desc: CONTENT,
}), {
  transformResponse: data => jsonBigint.parse(data),
})
const data = response.data
if (data.ok)
  console.log(data.result)
else console.error(data)
```

:::

使用 SDK，发送一条消息只需：

```ts
import { Bot } from 'fanbook-api-node-sdk'

const BOT_TOKEN = '在此填入你的机器人令牌'
const CHAT_ID = BigInt('在此填入发送到的聊天 ID')
const CONTENT = '在此填入消息内容'

const bot = new Bot(BOT_TOKEN)
console.log(await bot.sendMessage(CHAT_ID, CONTENT, CONTENT))
```

这就是函数化 API 调用的优点：将业务无关的代码抽离，使代码逻辑清晰、便于维护。

常用的 API 可用方法封装于 [`Bot` 类](/api/classes/Bot.html) 中，作为成员函数存在。详见 [API 文档](/api/classes/Bot.html#methods)。

## 自定义请求

`Bot` 类的函数化 API 被调用时，会对参数进行一些转换，并使用 [`Bot#axios`](/api/classes/Bot.html#axios) 发起网络请求。

`Bot#axios` 支持解析请求、响应体中的 `BigInt`，你也可以在构造 `Bot` 实例时传入第二个参数，作为 axios 选项。

如果需要自定义 axios 选项，只需在构造时传入第 2 个参数作为 axios 选项，即可在请求使用的 axios 实例中加入自定义选项。

```ts
import { Bot } from 'fanbook-api-node-sdk'

// ---cut---
const bot = new Bot('在此填入你的机器人令牌', {
  axios: { // axios 选项
    timeout: 3 * 1000,
    timeoutErrorMessage: 'Timeout 3000ms',
  },
})
```

对于 SDK 还未支持的 API，你可以直接使用 axios 实例：

```ts{7}
import { Bot } from 'fanbook-api-node-sdk'

const bot = new Bot('在此填入你的机器人令牌')

// ---cut---
// baseURL 是 `https://a1.fanbook.mobi/api/bot/${this.token}`
await bot.axios.post('/path/to/api')
```

这种方式同样支持解析请求、响应体中的 `BigInt`，但发生错误时抛出的是 `axiosError` 而不是 `FanbookApiError`。
