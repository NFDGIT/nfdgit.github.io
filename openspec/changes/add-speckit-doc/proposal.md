# 新增 Spec Kit 使用指南文档（openspec.md 风格）

## Why

站点已有 `note/AI/openspec.md` 作为 OpenSpec 使用指南，风格统一（安装、目录结构、常用命令、命令效果说明、小贴士），便于快速上手。AI 目录下尚无与 OpenSpec 同风格的 Spec Kit 说明；`spec.MD` 中仅对 Spec Kit 做框架对比简述。新增一份「Spec Kit 使用指南」可补齐 AI 工具文档，方便读者在规范式编程多种方案间对照与选用。

## What Changes

- 在 `note/AI/` 下新增 **speckit.md**，作为 Spec Kit 使用指南。
- 文档风格与 **openspec.md** 对齐：开篇一句概括、安装（含推荐方式与可选方式）、目录/项目结构说明、常用斜杠命令表、各命令效果说明（触发方式、效果、文件变化）、小贴士；语言生动、结构清晰。
- 内容覆盖：Spec Kit 是什么、安装（如 uv / specify init）、四阶段工作流（Specify → Plan → Tasks → Implement）及斜杠命令（`/constitution`、`/specify`、`/clarify`、`/plan`、`/tasks`、`/analyze`、`/implement`）、支持的 AI 代理、官方文档链接。

## Capabilities

### New Capabilities

- `speckit-doc`：站点须在 `note/AI/speckit.md` 提供 Spec Kit 使用指南，风格与 openspec.md 一致，包含安装、命令与工作流说明。

### Modified Capabilities

无。

## Impact

- **note/AI/speckit.md**：新增文件。
- **note/AI/index.md** 或 **note/manifest**：若存在 AI 文档索引，需将 speckit.md 加入列表（由实现任务决定是否在本 change 内完成）。
