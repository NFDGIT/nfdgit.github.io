## 1. 创建目录与索引

- [x] 1.1 创建 `note/Flutter/` 目录，并新增 `README.md`：包含 Flutter 笔记说明、到「底层原理」「面试」「高阶用法」等文档的导航链接；可选链入 `note/IT/flutter_fvm.md`（FVM 见 IT 笔记）

## 2. 底层原理文档

- [x] 2.1 新增 `note/Flutter/底层原理.md`：整理 Flutter 框架架构、渲染管线、Widget/Element/RenderObject、Dart 与 Flutter 关系等核心机制；内容参考官方文档与优质博客并对比择优，语言生动、言简意赅，结构清晰（小标题、列表、必要时表格或示意）

## 3. 面试文档

- [x] 3.1 新增 `note/Flutter/面试.md`：整理常见 Flutter/Dart 面试题及参考答案或要点，按考点或题型分类（如原理类、状态管理、性能、实践类等）；内容从网络面试汇总与面经对比择优，表述简练、便于复习

## 4. 高阶用法文档

- [x] 4.1 新增 `note/Flutter/高阶用法.md`：整理状态管理（Provider/Riverpod/Bloc 等）、性能优化、平台通道、混合开发、插件与包等进阶主题；内容参考官方进阶指南与社区最佳实践并对比择优，语言生动简练

## 5. 验证与 manifest

- [x] 5.1 运行 `node scripts/generate-note-manifest.js`，确认 `note/manifest.json` 中包含 Flutter 目录及新建文件；在笔记浏览器中打开 Flutter 目录，确认 README 与各文档可正常导航与阅读
