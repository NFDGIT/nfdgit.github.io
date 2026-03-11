## 1. 扩充底层原理.md

- [x] 1.1 将 `note/Flutter/底层原理.md` 扩充至约 5 倍篇幅（目标约 230 行）：增加 Layer 与合成、Key 与 Element 复用、InheritedWidget、BuildOwner/PipelineOwner、Skia/Impeller、约束与布局边界、RepaintBoundary 原理、帧调度与 VSync 等小节，保持小标题与「一句话」小结，内容参考官方与优质博客并对比择优

## 2. 扩充面试.md

- [x] 2.1 将 `note/Flutter/面试.md` 扩充至约 5 倍篇幅（目标约 315 行）：增加大量题目与分类（Dart 语言、Widget 生命周期、Key、状态管理、网络与存储、路由、性能、调试与 DevTools、工程与 pub 等），每题给出要点或短答；若单文件过长可拆为 面试-原理.md / 面试-实践.md 等，并在 README 中更新链接

## 3. 扩充高阶用法.md

- [x] 3.1 将 `note/Flutter/高阶用法.md` 扩充至约 5 倍篇幅（目标约 260 行）：扩展状态管理各方案对比与示例、性能优化清单与案例、Platform Channel 详解与示例、混合开发步骤、插件开发与发布要点、测试与 CI 简述等，保持生动简练，内容参考官方与社区最佳实践

## 4. 更新 README 与验证

- [x] 4.1 若新增或拆分了文档，更新 `note/Flutter/README.md` 的导航链接；运行 `node scripts/generate-note-manifest.js`，确认 manifest 包含所有新建/修改文件；通读抽查，确认总篇幅约达 5 倍基线且无注水、结构清晰
