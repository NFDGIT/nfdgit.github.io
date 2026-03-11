# 新增 Flutter 笔记目录

## Why

站点已有 iOS、IT、AI 等笔记分类，但 Flutter 相关内容仅零散存在于 `note/IT/flutter_fvm.md`。需要独立的 **Flutter** 目录，系统整理底层原理、面试题、高阶用法等，便于查阅与复习；内容从网络获取并对比择优，语言生动、言简意赅，形成可复用的知识库。

## What Changes

- 在 `note/` 下新建 **Flutter** 目录（与 iOS、IT、AI 同级）。
- 在 `note/Flutter/` 内按主题分类建文档：
  - **底层原理**：框架架构、渲染管线、Dart VM、Widget/Element/RenderObject 等核心机制，言简意赅。
  - **面试**：常见面试题与参考答案，按考点分类整理。
  - **高阶用法**：状态管理、性能优化、平台通道、混合开发、插件与包等进阶内容。
  - 可选：**最佳实践**、**性能优化**、**资源与链接** 等子文档或子目录，视内容量决定扁平/层级。
- 提供 `note/Flutter/README.md` 作为目录索引与导航。
- 内容来源：从网络（官方文档、优质博客、GitHub、面试汇总等）获取并对比，选取准确、易懂的表述；文风生动形象、言简意赅。
- 笔记浏览器通过现有 `generate-note-manifest.js` 自动扫描，无需改脚本即可展示新目录。

## Capabilities

### New Capabilities

- `flutter-note-doc`：Flutter 笔记目录（`note/Flutter/`）存在，且包含底层原理、面试问题、高阶用法等分类内容，结构清晰、内容经网络对比择优、语言生动简练。

### Modified Capabilities

无。

## Impact

- **note/Flutter/**：新增目录及若干 Markdown 文件。
- **scripts/generate-note-manifest.js**：无需修改，自动包含新目录。
- 与现有 `note/IT/flutter_fvm.md` 无冲突，可保留并在 Flutter 目录 README 中链入「FVM 见 IT 笔记」。
