# 更新日志

完整版：[CHANGELOG.md](https://github.com/DevOpen-Club/api-node-sdk/blob/main/CHANGELOG.md)。

## [0.6.0](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.6.0)

- <Badge type='warning'>破坏性变更</Badge> `createAxios` 创建的 axios 实例，请求、响应体都支持了 `BigInt` ([#83](https://github.com/DevOpen-Club/api-node-sdk/pull/83))
- 从 TSDoc 迁移到 JSDoc ([#81](https://github.com/DevOpen-Club/api-node-sdk/pull/81)) ([#82](https://github.com/DevOpen-Club/api-node-sdk/pull/82))
- 修复 `BigInt` 解析错误 ([#83](https://github.com/DevOpen-Club/api-node-sdk/pull/83))
- 示例说明兼容 node 20 ([#84](https://github.com/DevOpen-Club/api-node-sdk/pull/84))
- 统一专有名词大小写 ([#86](https://github.com/DevOpen-Club/api-node-sdk/pull/86))

## [0.5.2](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.5.2)

- 修复 TS 声明文件未发布的问题 ([#78](https://github.com/DevOpen-Club/api-node-sdk/pull/78))

## [0.5.1](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.5.1)

- 修正 `Bot#axios` `App#axios` 的类型 ([#75](https://github.com/DevOpen-Club/api-node-sdk/pull/75))

## [0.5.0](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.5.0)

- <Badge type='warning'>破坏性变更</Badge> 将 `Bot#token` 标记为只读 ([#70](https://github.com/DevOpen-Club/api-node-sdk/pull/70))
- <Badge type='warning'>破坏性变更</Badge> 重构请求流程 ([#71](https://github.com/DevOpen-Club/api-node-sdk/pull/71))
- 修复示例代码 tsconfig 和依赖 ([#64](https://github.com/DevOpen-Club/api-node-sdk/pull/64))
- 改进订阅事件示例代码 ([#65](https://github.com/DevOpen-Club/api-node-sdk/pull/65))
- 替换不必要的 `${bigint}` 为 `string` 类型 ([#68](https://github.com/DevOpen-Club/api-node-sdk/pull/68))
- 添加第三方应用接口 ([#71](https://github.com/DevOpen-Club/api-node-sdk/pull/71))

## [0.4.4](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.4.4)

- 添加 `GuildCredit` 在文档中未列出的属性 ([#61](https://github.com/DevOpen-Club/api-node-sdk/pull/61))

## [0.4.3](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.4.3)

- 修正 `CreditSlot` 的可选属性 ([#59](https://github.com/DevOpen-Club/api-node-sdk/pull/59))

## [0.4.2](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.4.2)

- 修正 v0.4.1 更新日志的标题 ([#55](https://github.com/DevOpen-Club/api-node-sdk/pull/55))
- 修复浏览器环境无法订阅事件的问题 ([#56](https://github.com/DevOpen-Club/api-node-sdk/pull/56))

## [0.4.1](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.4.1)

- 修复 `Bot#getPrivateChat` 接口请求体格式错误 ([#53](https://github.com/DevOpen-Club/api-node-sdk/pull/53))

## [0.4.0](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.4.0)

- 优化文档目录 ([#43](https://github.com/DevOpen-Club/api-node-sdk/pull/43)) ([#45](https://github.com/DevOpen-Club/api-node-sdk/pull/45))
- 导出 `src/error.ts` ([#44](https://github.com/DevOpen-Club/api-node-sdk/pull/44))
- 修改错误的对比示例和描述 ([#45](https://github.com/DevOpen-Club/api-node-sdk/pull/45))
- 添加错误处理文档、贡献指南 ([#45](https://github.com/DevOpen-Club/api-node-sdk/pull/45))
- 添加富文本类型支持、解析、转字符串功能 ([#46](https://github.com/DevOpen-Club/api-node-sdk/pull/46))
- 添加单元测试 ([#47](https://github.com/DevOpen-Club/api-node-sdk/pull/47)) ([#50](https://github.com/DevOpen-Club/api-node-sdk/pull/50))
- 修改示例运行方法 ([#48](https://github.com/DevOpen-Club/api-node-sdk/pull/48))

## [0.3.0](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.3.0)

- <Badge type='warning'>破坏性变更</Badge> 修复 `Bot#listGuildMember` 的 `range` 参数类型中的拼写错误 ([#35](https://github.com/DevOpen-Club/api-node-sdk/pull/35))
- 修复 `Bot#listGuildRole` 错误的数据类型转换 ([#34](https://github.com/DevOpen-Club/api-node-sdk/pull/34))
- 移除 commitlint ([#36](https://github.com/DevOpen-Club/api-node-sdk/pull/36))
- 更新 `README.md` `CONTRIBUTING.md`；添加 `SECURITY.md` ([#37](https://github.com/DevOpen-Club/api-node-sdk/pull/37))
- 修复可选的 options 参数不能留空的问题 ([#38](https://github.com/DevOpen-Club/api-node-sdk/pull/38))
- 修复无法导入在 `src/typings/*.ts` 定义的的值的问题 ([#39](https://github.com/DevOpen-Club/api-node-sdk/pull/39))
- 修复请求体中的 `BigInt` 解析失败报错的问题 ([#40](https://github.com/DevOpen-Club/api-node-sdk/pull/40))
- 添加示例 ([#41](https://github.com/DevOpen-Club/api-node-sdk/pull/41))

## [0.2.1](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.2.1)

- 修复 ES Module 下无法正常工作的问题 ([#32](https://github.com/DevOpen-Club/api-node-sdk/pull/32))

::: danger 请升级到 v0.2.1 及以上

v0.2.1 以下的 ES Module 版本在非 Node 环境下存在严重问题，不推荐使用！

:::

## [0.2.0](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.2.0)

- 分离[已发布的文档](https://fanbook-api-sdk.js.org/)和[最新文档](https://devopen-club.github.io/api-node-sdk/) ([#17](https://github.com/DevOpen-Club/api-node-sdk/pull/17))
- 补充文档和教程 ([#18](https://github.com/DevOpen-Club/api-node-sdk/pull/18))
- 导出 `src/bot-options.ts` ([#22](https://github.com/DevOpen-Club/api-node-sdk/pull/22))
- 添加事件订阅方法 ([#23](https://github.com/DevOpen-Club/api-node-sdk/pull/23))
- 优化首页样式和文案 ([#25](https://github.com/DevOpen-Club/api-node-sdk/pull/25))
- 修改示例目录结构 ([#26](https://github.com/DevOpen-Club/api-node-sdk/pull/26))
- 更新兼容性数据 ([#28](https://github.com/DevOpen-Club/api-node-sdk/pull/28))

## [0.1.0](https://github.com/DevOpen-Club/api-node-sdk/releases/tag/v0.1.0)

- 发布首个版本
