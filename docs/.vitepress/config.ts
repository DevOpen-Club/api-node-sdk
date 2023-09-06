import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Fanbook API Node.js SDK',
  description: 'Fanbook OpenAPI JavaScript / Node.js SDK',
  head: [
    ['link', { rel: 'icon', href: '/icon/fanbook.svg' }],
  ],
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/guide/quick-starter.html' },
      { text: 'API 文档', link: '/api/' },
      { text: '关于', link: '/about.html' },
    ],
    sidebar: [{
      text: '入门',
      items: [
        { text: '快速开始', link: '/guide/quick-starter.html' },
        { text: 'Hello World', link: '/guide/hello-world.html' },
      ],
    }, {
      text: '参考',
      items: [
        { text: 'API 调用', link: '/reference/api-calling.html' },
        { text: '错误处理', link: '/reference/error-handling.html' },
        { text: '示例', link: '/reference/examples.html' },
      ],
    }, {
      text: '其他',
      items: [
        { text: '更新日志', link: '/changelog.html' },
        { text: '贡献', link: '/contributing.html' },
      ],
    }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DevOpen-Club/api-node-sdk' },
      {
        icon: { svg: '<img src="/icon/fanbook.svg" alt="Fanbook" width="24" />' },
        link: 'https://fanbook.mobi/rjCNRFUN',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present DevOpen Club',
    },
    editLink: {
      pattern: 'https://github.com/DevOpen-Club/api-node-sdk/edit/main/docs/:path',
      text: '修改本页',
    },
    lastUpdated: {
      formatOptions: {
        timeZone: 'Asia/Shanghai',
      },
      text: '上次更新时间',
    },
    search: {
      provider: 'local',
    },
  },
});
