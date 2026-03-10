## Context

`note/AI/openspec.md` 当前为空，项目使用 OpenSpec 管理 AI 辅助开发的变更流程。用户需要一份系统全面、生动易读的使用文档，覆盖安装、目录、命令及效果说明。

## Goals / Non-Goals

**Goals:**

- 在 `note/AI/openspec.md` 中提供完整的 OpenSpec 使用说明
- 文档结构清晰，便于查阅和跳转
- 语言生动形象，降低理解门槛

**Non-Goals:**

- 不修改 OpenSpec 工具本身
- 不涉及 Cursor 规则或技能的编写
- 不提供英文版本

## Decisions

### 文档格式与结构

- **格式**：Markdown，与项目其他笔记一致
- **结构**：按「安装 → 目录介绍 → 常用命令 → 命令效果」顺序组织，符合学习路径
- **决策理由**：自上而下、由浅入深，便于首次使用者快速上手

### 内容深度

- **安装**：覆盖 npm 全局安装及版本检查
- **目录**：说明 `openspec/`、`changes/`、`specs/`、`archive/` 等核心目录及文件作用
- **命令**：列出 `propose`、`apply`、`explore`、`archive` 四个常用工作流命令
- **效果**：每个命令配「执行后会发生什么」的说明，必要时附示例输出
- **决策理由**：满足「系统全面」的要求，同时避免冗长

### 语言风格

- 使用简体中文，语气友好、比喻恰当
- 适当使用小标题、列表、代码块，提升可读性
- **决策理由**：符合用户「生动形象」的诉求

## Risks / Trade-offs

- **[风险]** OpenSpec 版本更新后，命令或输出可能变化 → **缓解**：文档中注明基于当前版本，建议读者以 `openspec --help` 为准
- **[取舍]** 常用命令聚焦于 Cursor 工作流（`/opsx-propose`、`/opsx:apply`、`/opsx:explore`、`/opsx:archive`），底层 openspec CLI 可简要提及
