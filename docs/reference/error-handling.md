# 错误处理

API 请求失败后，在请求失败后抛出 [`FanbookApiError`](/api/classes/FanbookApiError.html)，你可以使用 `try...catch` 语法捕获错误：

```ts
import { Bot, FanbookApiError } from 'fanbook-api-node-sdk';

const bot = new Bot('在此填入你的机器人令牌');
try {
  await bot.getMe();
} catch (e) {
  if (e instanceof FanbookApiError) {
    console.error('Request failing with code', e.code);
  } else {
    console.error('Unknown error', e);
  }
}
```

有关错误对象的其他属性，请参考 [API 文档](/api/classes/FanbookApiError.html)。

::: tip 如果直接调用 [`Bot#request`](/api/classes/Bot.html#request)

函数式 API 在 [`Bot.unwrap`](/api/classes/Bot.html#unwrap) 中判断并抛出异常，因此直接调用 [`Bot#request`](/api/classes/Bot.html#request) 不会抛出 [`FanbookApiError`](/api/classes/FanbookApiError.html)，只会有 Axios 抛出的 [`AxiosError`](https://github.com/axios/axios/blob/v1.x/README.md#error-types)。

:::
