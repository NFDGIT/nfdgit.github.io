## Context

Agent Skills 是一个开放标准（由 Anthropic 提出），用 SKILL.md 文件打包可复用的 Agent 能力。一个 Skill 就是一个目录 + 一个 SKILL.md（YAML frontmatter + Markdown 指令）。Cursor、Claude Code、Codex 等 16+ 工具已原生支持。

更新后阅读路径：主教程 → Tools → Memory → MCP → Multi-Agent → **Skills** → OpenClaw

## Goals / Non-Goals

**Goals:**
- 教读者理解 Skill 概念（与 Tool/Function Calling 的区别）
- 教读者编写 SKILL.md（frontmatter + 指令）
- 展示如何在自己的 Agent 中加载和使用 Skill
- 融入现有教程导航体系

**Non-Goals:**
- 不深入特定平台的 Skill 实现差异（如 Cursor vs Claude Code）
- 不修改 CSS 或 JS

## Decisions

### 教程内容 4 步

1. **Skill 是什么**：与 Tool 的区别（Tool=单个函数调用，Skill=多步工作流打包）、SKILL.md 标准、支持平台
2. **编写 SKILL.md**：frontmatter 字段（name/description/triggers/permissions）、Markdown 指令编写
3. **在 Agent 中使用 Skill**：加载 Skill 文件、注入 system prompt、按触发条件激活
4. **实战：创建一个代码审查 Skill**：完整示例 + 测试流程

### 导航更新

- multi-agent.html 的"下一篇"改为 Skills
- openclaw.html 的"上一篇"改为 Skills
- skills.html 的上一篇=Multi-Agent，下一篇=OpenClaw
- 所有子页面底部教程列表加入 Skills 链接

## Risks / Trade-offs

- **[标准仍在演进]** → 聚焦核心概念（SKILL.md 格式），避免依赖特定版本的字段。
