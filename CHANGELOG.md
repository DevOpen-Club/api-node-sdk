# 更新日志

## 0.7.0 (2024-08-16)

### ⚠️ 需要注意

- `Bot#listen` 现在传出完整的事件数据，你需要对代码进行类似这样的修改：

   ```diff
    bus.on('push', (ev) => {
      console.log('Received push:', ev)
      if (ev.action !== 'push') // 非消息推送
        return
   -  if (ev.content === CLOSING_MESSAGE) { // 收到“取消”消息
   +  if (ev.data.content === CLOSING_MESSAGE) { // 收到“取消”消息
        console.log('Closing connection by message:', ev.data.message_id)
        bus.emit('close')
      }
    })
   ```

   ([#124](https://github.com/DevOpen-Club/api-node-sdk/pull/124), [7b53bd9](https://github.com/DevOpen-Club/api-node-sdk/commit/7b53bd9f25fa3a1518c81844a52ddcae6054dfc9))
- `Bot#getMe` 现在默认缓存上次调用的结果，你可以使用 `bot.getMe({ forced: true })` 来强制重新拉取机器人信息 ([#104](https://github.com/DevOpen-Club/api-node-sdk/pull/104))

### 🐛 bug 修复

- 修复 OAuth 2.0 接口 Content-Type 问题 ([327dc7a](https://github.com/DevOpen-Club/api-node-sdk/commit/327dc7a309ff1f0c1e70900f7915fdc8b28ff7bd))
- 跟进上游供应链对 CVE-2024-39338 的修复 ([e61115d](https://github.com/DevOpen-Club/api-node-sdk/commit/e61115db0c5e27297b5df26dcc0cacc8340712c8))

### 📝 文档改进

- 添加代码块类型提示 ([#126](https://github.com/DevOpen-Club/api-node-sdk/pull/126))
- 修复 API 文档生成错误 ([ec7b59f](https://github.com/DevOpen-Club/api-node-sdk/commit/ec7b59f7c811e51aa66f84a36cd8e418ca1b0a4a), [ebe6730](https://github.com/DevOpen-Club/api-node-sdk/commit/ebe67308be3f4a82f9c26dd6477a8d5c99bdb811))

## 0.6.0 (2024-01-08)

### ⚠️ 需要注意

- `createAxios` 创建的 axios 实例，请求、响应体都支持了 `BigInt` ([#83](https://github.com/DevOpen-Club/api-node-sdk/pull/83))

### 🐛 bug 修复

- 修复 `BigInt` 解析错误 ([#83](https://github.com/DevOpen-Club/api-node-sdk/pull/83))

### 📝 文档改进

- 从 TSDoc 迁移到 JSDoc ([#81](https://github.com/DevOpen-Club/api-node-sdk/pull/81)) ([#82](https://github.com/DevOpen-Club/api-node-sdk/pull/82))
- 统一专有名词大小写 ([#86](https://github.com/DevOpen-Club/api-node-sdk/pull/86))

### 🧹 其他

- 示例说明兼容 node 20 ([#84](https://github.com/DevOpen-Club/api-node-sdk/pull/84))

## 0.5.2 (2023-12-05)

### 🐛 bug 修复

- 修复 TS 声明文件未发布的问题 ([#78](https://github.com/DevOpen-Club/api-node-sdk/pull/78))

## 0.5.1 (2023-12-05)

### 🐛 bug 修复

- 修正 `Bot#axios` `App#axios` 的类型 ([#75](https://github.com/DevOpen-Club/api-node-sdk/pull/75))

### 🧹 其他

- 优化包体积 ([#76](https://github.com/DevOpen-Club/api-node-sdk/pull/76))

## 0.5.0 (2023-12-03)

### ⚠️ 需要注意

- 将 `Bot#token` 标记为只读 ([#70](https://github.com/DevOpen-Club/api-node-sdk/pull/70))
- 重构请求流程 ([#71](https://github.com/DevOpen-Club/api-node-sdk/pull/71))

### 🚀 新功能

- 添加第三方应用接口 ([#71](https://github.com/DevOpen-Club/api-node-sdk/pull/71))

### 🐛 bug 修复

- 替换不必要的 `${bigint}` 为 string 类型 ([#68](https://github.com/DevOpen-Club/api-node-sdk/pull/68))

### 📝 文档改进

- 改进订阅事件示例代码 ([#65](https://github.com/DevOpen-Club/api-node-sdk/pull/65))

### 🧹 其他

- 修复示例代码 tsconfig 和依赖 ([#64](https://github.com/DevOpen-Club/api-node-sdk/pull/64))

## 0.4.4 (2023-11-05)

### 🐛 bug 修复

- 添加 `GuildCredit` 在文档中未列出的属性 ([#61](https://github.com/DevOpen-Club/api-node-sdk/pull/61))

## 0.4.3 (2023-10-23)

### 🐛 bug 修复

- 修正 `CreditSlot` 的可选属性 ([#59](https://github.com/DevOpen-Club/api-node-sdk/pull/59))

### 🧹 其他

- 更新 `package.json` 中的 `homepage` ([#58](https://github.com/DevOpen-Club/api-node-sdk/pull/58))
- 贡献指南补充分支规则 ([#58](https://github.com/DevOpen-Club/api-node-sdk/pull/58))

## 0.4.2 (2023-10-04)

### 🐛 bug 修复

- 修复浏览器环境无法订阅事件的问题 ([#56](https://github.com/DevOpen-Club/api-node-sdk/pull/56))

### 📝 文档改进

- 修正 v0.4.1 更新日志的标题 ([#55](https://github.com/DevOpen-Club/api-node-sdk/pull/55))

## 0.4.1 (2023-10-02)

### 🐛 bug 修复

- 修复 `Bot#getPrivateChat` 接口请求体格式错误 ([#53](https://github.com/DevOpen-Club/api-node-sdk/pull/53))

## 0.4.0 (2023-09-29)

### 🚀 新功能

- 添加富文本类型支持、解析、转字符串功能 ([#46](https://github.com/DevOpen-Club/api-node-sdk/pull/46))

### 🐛 bug 修复

- 导出 `src/error.ts` ([#44](https://github.com/DevOpen-Club/api-node-sdk/pull/44))

### 📝 文档改进

- 添加 Fanbook 社区链接 ([#43](https://github.com/DevOpen-Club/api-node-sdk/pull/43))
- 优化文档目录 ([#43](https://github.com/DevOpen-Club/api-node-sdk/pull/43)) ([#45](https://github.com/DevOpen-Club/api-node-sdk/pull/45))
- 修改错误的对比示例和描述 ([#45](https://github.com/DevOpen-Club/api-node-sdk/pull/45))
- 添加错误处理文档、贡献指南 ([#45](https://github.com/DevOpen-Club/api-node-sdk/pull/45))

### 🧹 其他

- 添加单元测试 ([#47](https://github.com/DevOpen-Club/api-node-sdk/pull/47)) ([#50](https://github.com/DevOpen-Club/api-node-sdk/pull/50))
- 修改示例运行方法 ([#48](https://github.com/DevOpen-Club/api-node-sdk/pull/48))

## 0.3.0 (2023-08-27)

### ⚠️ 需要注意

- 修复 `Bot#listGuildMember` 的 `range` 参数类型中的拼写错误 ([#35](https://github.com/DevOpen-Club/api-node-sdk/pull/35))

对于本项目的贡献者：

- 移除 commitlint ([#36](https://github.com/DevOpen-Club/api-node-sdk/pull/36))
- 更新 `README.md` `CONTRIBUTING.md`；添加 `SECURITY.md` ([#37](https://github.com/DevOpen-Club/api-node-sdk/pull/37))

### 🐛 bug 修复

- 修复 `Bot#listGuildRole` 错误的数据类型转换 ([#34](https://github.com/DevOpen-Club/api-node-sdk/pull/34))
- 修复可选的 options 参数不能留空的问题 ([#38](https://github.com/DevOpen-Club/api-node-sdk/pull/38))
- 修复无法导入在 `src/typings/*.ts` 定义的的值的问题 ([#39](https://github.com/DevOpen-Club/api-node-sdk/pull/39))
- 修复请求体中的 `BigInt` 解析失败报错的问题 ([#40](https://github.com/DevOpen-Club/api-node-sdk/pull/40))

### 📝 文档改进

- 添加示例 ([#41](https://github.com/DevOpen-Club/api-node-sdk/pull/41))

## 0.2.1 (2023-08-23)

### 🐛 bug 修复

- 修复 ES Module 下无法正常工作的问题 ([#32](https://github.com/DevOpen-Club/api-node-sdk/pull/32))

## 0.2.0 (2023-08-23)

### 🚀 新功能

- 添加事件订阅方法 ([#23](https://github.com/DevOpen-Club/api-node-sdk/pull/23))

### 🐛 bug 修复

- 导出 `src/bot-options.ts` ([#22](https://github.com/DevOpen-Club/api-node-sdk/pull/22))

### 📝 文档改进

- 分离已发布的文档和最新文档 ([#17](https://github.com/DevOpen-Club/api-node-sdk/pull/17))
- 补充文档和教程 ([#18](https://github.com/DevOpen-Club/api-node-sdk/pull/18))
- 优化首页样式和文案 ([#25](https://github.com/DevOpen-Club/api-node-sdk/pull/25))
- 更新兼容性数据 ([#28](https://github.com/DevOpen-Club/api-node-sdk/pull/28))

### 🧹 其他

- 修改示例目录结构 ([#26](https://github.com/DevOpen-Club/api-node-sdk/pull/26))

## 0.1.0 (2023-08-18)

- 发布首个版本
