## Context

`games/index.html` 已建立了目录页模式：使用 `home.css` 卡片网格 + 自定义 CSS 展示子项目列表。教程目录页遵循相同模式。

Agent 教程系列当前 6 篇：

| 页面 | 标题 | 定位 |
|------|------|------|
| index.html | 从零搭建 AI Agent | 主教程（基础 6 步） |
| tools.html | 添加更多工具 | 进阶：多工具 |
| memory.html | 加入记忆 | 进阶：记忆持久化 |
| mcp.html | 试试 MCP | 进阶：MCP 协议 |
| multi-agent.html | 多 Agent 协作 | 进阶：多 Agent |
| openclaw.html | OpenClaw 框架 | 进阶：框架实战 |

## Goals / Non-Goals

**Goals:**
- 教程目录页一眼看到所有教程，卡片包含标题、描述、标签
- 卡片区分主教程和进阶教程（主教程突出显示）
- 首页教程入口改为指向目录页
- 子页面导航可回到目录页

**Non-Goals:**
- 不改变教程内容本身
- 不改变教程之间的跨页导航（底部 prev/next）

## Decisions

### 页面结构

参照 `games/index.html` 模式：
- 使用 `home.css` 卡片网格（`.home-grid`、`.home-card`）
- 自定义 `guide.css` 添加标签和描述样式
- Header 包含标题、描述、返回首页 + 主题切换
- 卡片分两组：主教程（推荐起点）+ 进阶教程

### 导航更新

- 首页卡片：`./guide/agent/index.html` → `./guide/index.html`
- Agent 子页面的 glass-nav "返回教程" 链接保持为 `./index.html`（相对路径，指向 agent 主教程），新增一个"教程目录"链接指向 `../index.html`（guide 目录页）

## Risks / Trade-offs

无风险。纯添加性变更。
