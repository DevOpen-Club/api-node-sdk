# 第三方应用 OAuth 2.0

还记得 [Hello World](/guide/hello-world.html) 吗？我们首先创建了**应用**，然后才在应用中创建了**机器人**。

我们创建的应用在 Fanbook 中是**第三方应用**，机器人是第三方应用的一部分，它是特殊的用户，可以直接与 Fanbook 中的真实用户互动。

而第三方应用本身，是用来**获取登录用户信息**用的。

具体来说，支持以第三方应用的身份，在浏览器（或 Fanbook WebView）中，直接获取到访问页面的用户的基本信息。

这个流程遵循 **OAuth 2.0** 规范，如不了解请自行搜索。

SDK 封装了 [App 类](/api/classes/App.html)，简化 OAuth 2.0 的服务端逻辑。

以下是完整示例：

<<< @/../examples/src/oauth2.ts

访问 [API 文档](/api/classes/App.html) 可查看类定义。
