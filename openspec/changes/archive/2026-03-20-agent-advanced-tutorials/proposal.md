## Why

Agent 教程系列目前有 7 篇（主教程 + Tools + Memory + MCP + Multi-Agent + Skills + OpenClaw），覆盖了 Agent 的核心构建。但在实际应用中还有 5 个高频需求未涉及：Prompt Engineering（让 Agent 更准确）、流式输出（实时打字效果）、RAG 检索增强（基于文档回答）、部署上线（变成可用服务）、安全防护（防注入防泄露）。补充这 5 篇使教程系列从"能用"升级到"能上线"。

## What Changes

- 新建 5 个教程页面：`prompt.html`、`streaming.html`、`rag.html`、`deploy.html`、`security.html`
- 更新教程目录 `guide/index.html` 添加 5 个新卡片
- 更新主教程 `guide/agent/index.html` Step 6 添加 5 个入口卡片
- 更新所有子页面底部教程导航列表
- 更新阅读顺序提示

## Capabilities

### New Capabilities

无。

### Modified Capabilities

无。

## Impact

- `guide/agent/prompt.html`、`streaming.html`、`rag.html`、`deploy.html`、`security.html`：新建
- `guide/index.html`：添加 5 个卡片
- `guide/agent/index.html`：添加 5 个卡片 + 更新阅读顺序
- 所有现有子页面：底部教程列表加入 5 个新链接
- `assets/css/base.css`：可能需要 stagger-8 到 stagger-12
