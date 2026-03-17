## Why

首页直接链接到 Agent 教程主页（`guide/agent/index.html`），没有一个统一的教程目录页。随着教程增加（目前 Agent 系列已有 6 篇），用户需要一个入口页一眼看到所有可用教程，与 `games/index.html` 游戏目录页同等模式。

## What Changes

- 新建 `guide/index.html` 教程目录页，展示所有教程系列（卡片网格），当前包含 Agent 系列的 6 篇教程
- 新建 `guide/guide.css` 目录页专用样式
- 更新首页 `index.html` 的教程卡片：链接改为 `./guide/index.html`，标题改为"教程"，描述改为通用文案
- 更新 Agent 教程各页面的"返回教程"导航链接指向目录页

## Capabilities

### New Capabilities

无新能力。

### Modified Capabilities

无规格级别变更。

## Impact

- `guide/index.html`：新建
- `guide/guide.css`：新建
- `index.html`：修改教程卡片链接和文案
- `guide/agent/index.html`：glass-nav 添加"教程目录"链接
- `guide/agent/tools.html`、`memory.html`、`mcp.html`、`multi-agent.html`、`openclaw.html`：glass-nav 的"返回教程"改为指向目录页
