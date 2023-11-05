# 更新日志

## [0.4.4] - 2023-11-05

### 🐛 bug 修复

- 添加 `GuildCredit` 在文档中未列出的属性 ([#61](https://github.com/DevOpen-Club/api-node-sdk/pull/61))

## [0.4.3] - 2023-10-23

### 🐛 bug 修复

- 修正 `CreditSlot` 的可选属性 ([#59](https://github.com/DevOpen-Club/api-node-sdk/pull/59))

### 🧹 其他

- 更新 `package.json` 中的 `homepage` ([#58](https://github.com/DevOpen-Club/api-node-sdk/pull/58))
- 贡献指南补充分支规则 ([#58](https://github.com/DevOpen-Club/api-node-sdk/pull/58))

## [0.4.2] - 2023-10-04

### 🐛 bug 修复

- 修复浏览器环境无法订阅事件的问题 ([#56](https://github.com/DevOpen-Club/api-node-sdk/pull/56))

### 📝 文档改进

- 修正 v0.4.1 更新日志的标题 ([#55](https://github.com/DevOpen-Club/api-node-sdk/pull/55))

## [0.4.1] - 2023-10-02

### 🐛 bug 修复

- 修复 `Bot#getPrivateChat` 接口请求体格式错误 ([#53](https://github.com/DevOpen-Club/api-node-sdk/pull/53))

## [0.4.0] - 2023-09-29

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

## [0.3.0] - 2023-08-27

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

## [0.2.1] - 2023-08-23

### 🐛 bug 修复

- 修复 ES Module 下无法正常工作的问题 ([#32](https://github.com/DevOpen-Club/api-node-sdk/pull/32))

## [0.2.0] - 2023-08-23

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

## [0.1.0] - 2023-08-18

- 发布首个版本
