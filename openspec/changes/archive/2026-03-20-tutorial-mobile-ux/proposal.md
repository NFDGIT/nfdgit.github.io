## Why

教程页面在移动端存在多个体验问题：
1. 代码块文字太小（0.82rem），横向滚动不明显，用户不知道代码被截断
2. 步骤导航条太挤，选项难以点击（不够 44px 触控目标）
3. 图表（diagram）在窄屏被压扁，箭头和文字堆叠
4. 知识折叠按钮和复制按钮触控区域太小
5. 底部教程导航 12 个 pill 链接堆在一起难以点击
6. 上一篇/下一篇按钮没有足够的触控面积
7. 代码块没有"可横向滚动"的视觉提示

## What Changes

- 优化 `agent-guide.css` 的移动端响应式样式
- 不改变 HTML 结构，纯 CSS 调整

## Capabilities

### New Capabilities

无。

### Modified Capabilities

无。

## Impact

- `guide/agent/agent-guide.css`：添加/修改移动端媒体查询样式
