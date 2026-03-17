## Why

Agent 教程系列缺少关于 Skill（技能）系统的教程。Skill 是 2026 年 AI Agent 生态的核心扩展机制——一个 SKILL.md 文件就能让 Agent 获得新能力。Cursor、Claude Code、OpenAI Codex 等 16+ 工具已支持这一开放标准。教程应教读者如何编写和使用 Skill 来扩展自己的 Agent。

## What Changes

- 新建 `guide/agent/skills.html` 教程页面，4 步快速入门：理解 Skill 概念 → SKILL.md 结构 → 在 Agent 中加载 Skill → 实战示例
- 在教程目录页 `guide/index.html` 添加 Skill 教程卡片
- 在主教程 `guide/agent/index.html` Step 6 添加 Skill 入口卡片
- 更新所有子页面底部教程导航链接，将 Skill 加入阅读路径（Multi-Agent 之后、OpenClaw 之前）

## Capabilities

### New Capabilities

无新能力。

### Modified Capabilities

无规格级别变更。

## Impact

- `guide/agent/skills.html`：新建
- `guide/index.html`：添加卡片
- `guide/agent/index.html`：添加卡片 + 更新阅读顺序
- `guide/agent/multi-agent.html`：下一篇改为 Skill
- `guide/agent/openclaw.html`：上一篇改为 Skill
- `guide/agent/tools.html`、`memory.html`、`mcp.html`：底部教程列表加入 Skill
