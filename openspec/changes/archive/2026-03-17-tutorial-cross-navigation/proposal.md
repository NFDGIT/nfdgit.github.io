## Why

Agent 教程的 5 个页面（1 个主页 + 4 个子页）之间缺乏导航连接，用户读完一篇后不知道接下来该读什么、当前在整体指南中处于什么位置。需要在每篇文章的末尾添加导航链接，形成完整的学习路径。

## What Changes

- 在每个子页面末尾添加"教程导航"区块，包含：上一篇/下一篇链接、返回主教程链接、所有子页面列表（当前页高亮）
- 在主页面 Step 6 的"下一步"卡片区域上方添加推荐阅读顺序提示
- 新增导航区块的 CSS 样式

## Capabilities

### New Capabilities

无新能力。

### Modified Capabilities

无规格级别变更。

## Impact

- `guide/agent/tools.html`：末尾添加导航区块
- `guide/agent/memory.html`：同上
- `guide/agent/mcp.html`：同上
- `guide/agent/multi-agent.html`：同上
- `guide/agent/index.html`：Step 6 添加阅读顺序提示
- `guide/agent/agent-guide.css`：新增导航区块样式
