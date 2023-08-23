# Hello World

在对世界说 Hello 之前，你要先有一个身份，也就是机器人。

## 创建机器人

打开 [Fanbook 开放平台](https://open.fanbook.mobi/developers/manage/app)，登录你的 Fanbook 账号。

登录后自动跳转到开发者平台，点击右上角按钮“创建应用”：

![](https://github.com/DevOpen-Club/api-node-sdk/assets/99722991/9c138880-5849-4e38-8a37-082ade17bad2)

输入应用名称，点击“确定”：

![](https://github.com/DevOpen-Club/api-node-sdk/assets/99722991/b6ad5612-0ef2-480d-b814-2cddfc396b70)

确定后就能看见创建的应用，点击刚刚创建的应用的图标，在左边选择“机器人”标签页，点击按钮“添加机器人”：

![](https://github.com/DevOpen-Club/api-node-sdk/assets/99722991/10f82f4f-2f21-49b3-83bc-4873a3df6991)

填写机器人信息：

::: tip 关于机器人权限

对于初学者，建议开启“超级管理员”权限，避免因权限不足而报错。

对于正式应用，建议遵循**最小够用原则**，只开启用到的权限，避免因权限需求过高导致风险增大和用户流失。

:::

![](https://github.com/DevOpen-Club/api-node-sdk/assets/99722991/8f348315-5389-4f10-8408-f241a7b8db80)

复制你的服务器 ID：

![](https://github.com/DevOpen-Club/api-node-sdk/assets/99722991/0f54d34f-76df-468c-937e-1be0b59b7b78)

在机器人设置中点击“申请上架”，填入你的服务器 ID，添加，确定：

![](https://github.com/DevOpen-Club/api-node-sdk/assets/99722991/7ae40f3f-b4f8-456b-b18b-280818c5c936)

在服务器机器人市场中添加机器人：

![](https://github.com/DevOpen-Club/api-node-sdk/assets/99722991/bb66e77a-21b5-42ec-a37a-e478276edf09)

完成！

## 运行示例

由于 Fanbook 严格限制机器人消息，就用**获取机器人信息**代替发送消息，作为你的第一步。

<<< @/../examples/src/quick-starter.ts

如果运行后输出了你的机器人信息，那么恭喜你，你已经迈出了第一步。
