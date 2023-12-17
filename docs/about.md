---
---

<script lang="ts" setup>
import { VPTeamMembers } from 'vitepress/theme';
const members = [{
  avatar: 'https://avatars.githubusercontent.com/u/99722991',
  name: '凯凯本凯',
  title: '维护者',
  links: [
    { icon: 'github', link: 'https://github.com/kaikaibenkai' },
  ],
}];
</script>

# 关于

本项目是对 Fanbook 开放平台接口的封装，旨在使 Fanbook 机器人开发更便捷。

本项目非 Fanbook 官方项目。

## 团队

<VPTeamMembers :members='members' />
