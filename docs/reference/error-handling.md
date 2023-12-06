# 错误处理

API 请求失败后，在请求失败后抛出 [`FanbookApiError`](/api/classes/FanbookApiError.html)，你可以使用 `try-catch` 语法捕获错误：

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
// ...
```

或者使用 `Promise#catch`，两种写法是等价的：

```ts
import { Bot, FanbookApiError } from 'fanbook-api-node-sdk';

const bot = new Bot('在此填入你的机器人令牌');
bot.getMe()
  .catch((e) => {
    if (e instanceof FanbookApiError) {
      console.error('Request failing with code', e.code);
    } else {
      console.error('Unknown error', e);
    }
  )
  .then(() => {
    // ...
  });
```

有关 `FanbookApiError` 的其他属性，请参考 [API 文档](/api/classes/FanbookApiError.html)。
