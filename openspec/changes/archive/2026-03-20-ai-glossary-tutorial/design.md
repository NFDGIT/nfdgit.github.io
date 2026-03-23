## Context

教程系列有 12 篇 Agent 教程，但没有术语参考。读者遇到不懂的词需要去外部搜索。术语速查表作为"参考资料"类型放在教程目录中。

## Goals / Non-Goals

**Goals:**
- 覆盖 20+ 常见 AI 术语
- 每个术语用一句话通俗解释 + 生活类比
- 按分类组织（不是字母排序——中文用户不按字母查）
- 可以在页内用锚点快速跳转
- 与教程系列同一设计风格

**Non-Goals:**
- 不是学术论文，不追求技术精确到底层原理
- 不改变现有教程内容

## Decisions

### 术语分 4 组

| 分类 | 术语 |
|------|------|
| 基础概念 | LLM、Token、Prompt、System Prompt、Context Window、Temperature、Embedding/向量、Tokenizer |
| 模型能力 | 幻觉、Few-shot/Zero-shot、Chain of Thought、多模态、Fine-tuning、推理 vs 训练 |
| Agent 相关 | Agent、Function Calling、Tool Use、MCP、RAG、Skill、Multi-Agent |
| 安全与对齐 | 对齐、RLHF、Prompt Injection、Grounding、沙箱 |

### 页面结构

- 顶部：分类锚点导航（可点击跳转到对应分类）
- 每个分类一个 glass-panel 区块
- 每个术语一行：中英文名 + 一句话解释 + 可展开的详细说明和类比
- 复用 agent-guide.css 的折叠组件样式

### 教程目录更新

在 `guide/index.html` 的分类列表最后新增"参考资料"分类，包含术语速查链接。

## Risks / Trade-offs

- **[术语会过时]** → 聚焦稳定的核心概念，避免收录变化快的工具名
