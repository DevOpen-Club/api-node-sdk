# 快速开始

使用 `npm` 或 `yarn` 或 `pnpm` 安装：

::: code-group

```bash [npm]
npm install fanbook-api-node-sdk
```

```bash [yarn]
yarn add fanbook-api-node-sdk
```

```bash [pnpm]
pnpm add fanbook-api-node-sdk
```

:::

推荐使用
<img style='height:18px;display:inline;margin-bottom:-2px;' src='/icon/typescript.svg' aria-hidden />
&thinsp;[TypeScript](https://www.typescriptlang.org/)
获得更好的开发体验，文档中所有示例都将用 TS 撰写。

当然，如果您不想使用 TypeScript，本库也支持纯 JavaScript 调用。示例可以通过
<a href='https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Ctypescript&prettier=true&targets=&version=latest&externalPlugins=&assumptions=%7B%7D' target='_blank'>
<img style='display:inline;height:24px;margin-bottom:-8px;' src='/icon/babel.svg' alt='babel' />
</a>
转换为纯 JavaScript。

SDK 同时支持 Common JS 和 ES Module。

示例将使用 ES Module 撰写，转为 Common JS 只需修改导入语句：

::: code-group

```ts [ES Module]
import { Bot } from 'fanbook-api-node-sdk';
```

```ts [Common JS]
const { Bot } = require('fanbook-api-node-sdk');
```

:::

SDK 支持的环境：

| ![Chrome](/browser/chrome.svg) | ![Edge](/browser/edge.svg) | ![Firefox](/browser/firefox.svg) | ![Opera](/browser/opera.svg) | ![Safari](/browser/safari.svg) | <img style='height: 18px; margin: 0 auto;' src='/browser/nodejs.svg' alt='Node.js'> | ![Deno](/browser/deno.svg) |
| :----: | :--: | :-----: | :---: | :----: | :-----: | :--: |
| 67     | 79   | 68      | 54    | 14     | 10.4.0  | 1.0  |
