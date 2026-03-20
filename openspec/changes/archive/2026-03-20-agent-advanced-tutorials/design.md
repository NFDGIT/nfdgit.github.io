## Context

更新后的完整阅读路径（12 篇）：

```
基础：主教程 → Tools → Memory → MCP → Multi-Agent → Skills → OpenClaw
进阶：Prompt Engineering → 流式输出 → RAG → 部署上线 → 安全防护
```

所有页面遵循统一设计系统（agent-guide.css/js，sidebar 导航，底部跨页导航）。采用 Skills 教程的通俗易懂风格：主线用生活类比，代码放折叠区。

## Goals / Non-Goals

**Goals:**
- 5 个新教程页面，每篇 3-4 步，通俗易懂风格
- 融入现有导航体系（目录页、主页卡片、底部跨页导航）
- 内容聚焦快速上手，不深入底层原理

**Non-Goals:**
- 不修改现有 7 篇教程内容
- 不改变 CSS/JS

## Decisions

### 5 篇教程内容设计

**1. Prompt Engineering（prompt.html）** — 3 步
- 什么是好的 System Prompt（像给新员工写工作手册）
- 常用技巧：角色设定、约束规则、Few-shot 示例
- 实战：写一个高质量的客服 Agent 提示词

**2. 流式输出（streaming.html）** — 3 步
- 为什么要流式（像打字一样逐字出现 vs 等半天一次性出来）
- Python 实现 stream=True
- 流式中的工具调用处理

**3. RAG 检索增强（rag.html）** — 4 步
- 什么是 RAG（像开卷考试，让 Agent 翻参考资料回答）
- 文档切分和向量化
- 检索并注入上下文
- 完整 RAG Agent

**4. 部署上线（deploy.html）** — 3 步
- 部署选项概览（API 服务 vs 聊天机器人 vs 桌面应用）
- 用 FastAPI 包装成 API
- 接入微信/钉钉/飞书机器人

**5. 安全与防护（security.html）** — 4 步
- Agent 面临的安全风险（提示注入、数据泄露、恶意工具）
- 输入过滤和输出审查
- 权限最小化和沙箱
- 安全检查清单

### 导航更新

- OpenClaw 的下一篇改为 Prompt Engineering
- 按顺序串联 5 篇新教程
- Security 是最后一篇，下一篇指向主教程
- 所有 12 篇的底部教程列表统一更新

### Stagger 动画

guide/index.html 将有 12 个卡片，需要 stagger-8 到 stagger-12。在 base.css 中补充。

## Risks / Trade-offs

- **[12 篇教程列表较长]** → 教程目录页已有分组标签（推荐起点/进阶），可自然扩展
- **[底部导航链接多]** → 12 个 pill 链接会自动换行，在移动端竖排也可接受
