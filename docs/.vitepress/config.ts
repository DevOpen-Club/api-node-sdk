import { defineConfig } from 'vitepress'

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
      { text: '教程', link: '/guide/quick-starter' },
      { text: 'API 文档', link: '/api' },
    ],
    sidebar: [{
      text: '入门',
      items: [
        { text: '快速开始', link: '/guide/quick-starter' },
      ],
    }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DevOpen-Club/api-node-sdk' },
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
  },
});
