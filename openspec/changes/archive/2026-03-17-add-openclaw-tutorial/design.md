## Context

Agent 教程系列当前 5 页（主教程 + 4 子页），阅读顺序为 主教程 → Tools → Memory → MCP → Multi-Agent。OpenClaw 教程定位为 Multi-Agent 之后的终极进阶——从手写到框架。

更新后阅读路径：主教程 → Tools → Memory → MCP → Multi-Agent → OpenClaw

## Goals / Non-Goals

**Goals:**
- 新建 OpenClaw 教程页面，复用现有 agent-guide 设计系统（sidebar、code blocks、knowledge toggle）
- 页面融入现有导航体系（底部教程导航、主页卡片）
- 内容聚焦快速上手：安装、启动、连接、扩展

**Non-Goals:**
- 不深入 OpenClaw 内部架构
- 不修改 CSS 或 JS

## Decisions

### 教程内容 4 步

1. **OpenClaw 是什么**：框架定位、核心特性（本地网关、50+ 集成、Skill 系统、MCP 支持）、与手写 Agent 的区别
2. **安装与启动**：curl 安装、onboard 配置、启动 dashboard
3. **连接消息平台**：WhatsApp/Telegram/Discord 接入、模型配置
4. **创建自定义 Skill**：SKILL.md 结构、frontmatter、指令编写、MCP 集成示例

### 导航更新

- multi-agent.html 的"下一篇"改为 OpenClaw（原来是"返回主教程"）
- openclaw.html 的"上一篇"为 Multi-Agent，"下一篇"为"返回主教程"
- 所有 5 个子页面的底部教程列表加入 OpenClaw 链接
- 主教程 Step 6 加入 OpenClaw 卡片并更新阅读顺序提示

## Risks / Trade-offs

- **[OpenClaw 快速迭代]** → 教程聚焦稳定的核心概念（安装、Skill 系统），避免依赖可能变化的 API 细节。
