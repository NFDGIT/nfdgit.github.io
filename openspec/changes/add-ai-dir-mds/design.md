## Context

`note/AI/` 已有 `openspec.md`（OpenSpec 使用指南）、`spec.md`（规范式编程概述）。用户希望补充索引和 OpenClaw 文档，提升目录可发现性与完整性。笔记浏览器通过 `manifest.json` 生成目录树，新增 md 文件后需运行 `generate-note-manifest.js` 以更新侧边栏。

## Goals / Non-Goals

**Goals:**

- 新增 `note/AI/index.md` 作为目录索引，便于跳转
- 新增 `note/AI/openclaw.md` 作为 OpenClaw 使用指南
- 文档语言生动、系统全面

**Non-Goals:**

- 不修改现有 `openspec.md`、`spec.md` 内容
- 不新增其他工具文档（如 Cursor、Copilot）
- 不改变笔记浏览器的渲染逻辑

## Decisions

### 索引文件命名

- **选择**：`index.md` 而非 `README.md`
- **理由**：与项目其他笔记风格一致，且笔记浏览器通常以文件名排序；`index` 在字母序中靠前，便于作为入口

### OpenClaw 文档内容范围

- **选择**：安装、功能点及各自作用、与 ChatGPT 对比、小贴士
- **理由**：与 `openspec.md` 结构类似，满足「生动形象、系统全面」；不深入 Gateway/Channel 配置细节，避免冗长

### manifest 更新

- **选择**：在 tasks 中显式包含「运行 `generate-note-manifest.js`」
- **理由**：确保笔记浏览器侧边栏能展示新文件

## Risks / Trade-offs

- **[风险]** OpenClaw 版本更新后文档过时 → **缓解**：文档中注明基于当前版本，建议以官方文档为准
- **[取舍]** 索引仅列出 `note/AI/` 下的文档，不递归子目录 → 当前无子目录，后续若有再扩展
