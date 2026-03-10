## Why

`note/AI/` 已有 `openspec.md`、`spec.md` 等文档，但缺乏统一入口和导航。新成员难以快速了解该目录下有哪些资料、各自讲什么。同时，探索过的 OpenClaw 等工具尚无对应文档。为提升可发现性和完整性，需要补充索引并生成相关 md 文件到 AI 目录。

## What Changes

- 在 `note/AI/` 中新增 `index.md`：作为目录索引，列出各文档及简要说明，便于跳转
- 在 `note/AI/` 中新增 `openclaw.md`：OpenClaw 使用指南，涵盖安装、功能点及作用说明，语言生动、系统全面

## Capabilities

### New Capabilities

- `ai-dir-index`：`note/AI/index.md` 作为 AI 文档目录索引，列出现有及新增文档的标题与简介
- `ai-dir-openclaw-doc`：`note/AI/openclaw.md` 提供 OpenClaw 的完整使用说明，包括安装、功能点及各自作用

### Modified Capabilities

- （无）

## Impact

- **新增文件**：`note/AI/index.md`、`note/AI/openclaw.md`
- **manifest**：若笔记浏览器依赖 `manifest.json`，需运行 `scripts/generate-note-manifest.js` 以更新目录树
- **无代码变更**：纯文档内容
