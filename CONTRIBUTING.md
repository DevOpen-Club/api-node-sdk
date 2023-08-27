# 贡献指南

感谢你付出的宝贵时间。你的贡献将使这个项目变得更好！在提交贡献之前，请务必花点时间阅读下面的入门指南。

## 行为准则

项目有一份 [行为准则](./CODE_OF_CONDUCT.md)，希望参与项目的贡献者都能严格遵守。

## 透明的开发

所有工作都直接透明地在 GitHub 上进行。

## 版本管理

项目版本管理遵循 [SemVer 2.0.0](https://semver.org/lang/zh-CN/spec/v2.0.0.html) 规范。维护者在认为需要发版时在本仓库创建 `release/<版本号>` 分支

禁止：

- 在本仓库中“篡改历史”
- 非线性历史记录
- 强制推送

## 报告 Issues

我们使用 [Github issues](https://github.com/DevOpen-Club/api-node-sdk/issues) 进行 bug 报告和功能建议。

在报告 bug 之前，请确保已经搜索过类似的 [issue](https://github.com/DevOpen-Club/api-node-sdk/issues)，以防重复报告。

对于 bug 报告，请提供最简的复现步骤和平台信息。对于功能建议，请指出你想要的更改和期望。

## 提交 Pull Request

1. Fork [此仓库](https://github.com/DevOpen-Club/api-node-sdk)；
2. Clone 上一步 fork 出的仓库到本地；
3. 运行 `pnpm bootstrap` 初始化开发环境；
4. 从 `main` 创建分支；
5. 在源代码中自由发挥……
6. 自行测试，确保功能预期，且边缘情况可控；
7. 提交更改，推送到 fork 出的仓库；
8. 提交 pull request 到本仓库，如果有对应的 issue，请进行[关联](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)；
9.  等待合并……

## 分支命名指南

注：仅为建议，不强制要求。

分支名格式：`<类型>/<描述>`。其中 `<类型>` 见 [更改的类型](#更改类型)。

## Commit 指南

Pull request 合并时，更改将以 squash merge 的方式合并到 `main` 分支。

Commit message 遵循 [约定式提交标准](https://www.conventionalcommits.org/zh-hans/v1.0.0/)：

```
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

本仓库中的提交（包括合并提交）必须遵循此规范，合并提交必须在描述的末尾添加合并的 pull request 编号，如：`fix: typo (#19)`。

### 更改的类型

- feat: 新功能或对已有功能的增强
- fix: 问题修复
- style: 代码风格或者样式更新
- refactor: 不影响功能的重构
- perf: 性能优化
- test: 修改测试
- revert: 回滚更改
- chore: 其他

### 目录结构

```
├── es (编译后的 ES Module 产物)
├── example (使用示例)
├── lib (编译后的 CommonJS 产物)
├── scripts (开发用的脚本)
├── src (源码)
    └── typings (接口类型定义)
```

## 代码规范

遵循 [Google TypeScript 风格指南](https://zh-google-styleguide.readthedocs.io/en/latest/google-typescript-styleguide/contents/)。

### overrides

使用 TSDoc，并将 `@defaultValue` 重命名为 `@default`。

`@unused` 用于标记未使用/未定义的属性。

`@permission` 用于声明需要的权限，是用空格分割的 `src/typings/permission.ts~Permission` 枚举键或 `*`（表示需要白名单）。

同个 `@permission` 标识符的参数中的权限必须全部满足才能调用；多个 `@permission` 标识符只要满足一个就能调用，如：

```ts
/**
 * 本方法需要“编辑服务器资料 + 白名单”或“超级管理员”权限。
 * @permission MANAGE_GUILD *
 * @permission ADMINISTRATOR 
 */
function f() {}
```

在构造函数参数列表中声明的成员变量，在成员变量前注释，如：

```ts
class Channel {
  constructor (
    /** 频道名称。 */
    public name: string,
  ) {}
}
```

## License

[MIT 协议](./LICENSE)
