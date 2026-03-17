## Context

教程共 5 页，形成如下学习路径：

```
主教程 (index.html) — 基础 6 步
  → 添加更多工具 (tools.html)
  → 加入记忆 (memory.html)
  → 试试 MCP (mcp.html)
  → 多 Agent 协作 (multi-agent.html)
```

推荐阅读顺序：主教程 → Tools → Memory → MCP → Multi-Agent（从简到难）。

## Goals / Non-Goals

**Goals:**
- 每个子页面末尾有上一篇/下一篇导航和完整教程列表
- 主教程 Step 6 提示推荐阅读顺序
- 导航区块风格与现有 glass 设计一致

**Non-Goals:**
- 不修改页面内容本身
- 不改变现有的 sidebar 步骤导航

## Decisions

### 导航区块结构

在每个子页面的 `agent-content` 末尾（最后一个 section 之后）添加一个 `agent-guide-nav` 区块，包含：

1. **上一篇/下一篇**：两端对齐的链接按钮，使用 `glass-btn` 风格
2. **完整教程列表**：水平排列的教程链接，当前页加 `is-current` 样式

阅读顺序链定义：
- tools.html：上一篇=主教程，下一篇=memory
- memory.html：上一篇=tools，下一篇=mcp
- mcp.html：上一篇=memory，下一篇=multi-agent
- multi-agent.html：上一篇=mcp，下一篇=无（最后一篇，显示"返回主教程"）

### 主教程提示

在 index.html Step 6 的"下一步可以做什么？"标题后添加一行推荐阅读顺序提示文字。

## Risks / Trade-offs

无风险。纯 HTML/CSS 添加。
