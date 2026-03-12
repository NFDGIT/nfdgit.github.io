# flutter-note-doc

## Purpose

（与主 spec 一致：定义 Flutter 专题目录的内容与结构；本 delta 仅增加「继续补充」相关需求。）

## ADDED Requirements

### Requirement: Flutter 笔记可继续补充

在满足现有「目录存在、分类文档、内容择优、体量要求」的前提下，站点 SHALL 支持对 `note/Flutter/` 进行**继续补充**：可在现有文档（底层原理、面试-原理、面试-实践、高阶用法）中增加新小节、考点或例题；和/或新增独立主题文档（如工程实践、调试与排错、包与插件等），并在 README 中提供指向这些文档的导航。补充内容 SHALL 继续遵循「网络对比择优、生动简练」的约定，且 SHALL 不降低已有文档的可读性与结构清晰度。

#### Scenario: 现有文档可增加小节或考点
- **WHEN** 维护者对现有某一篇 Flutter 笔记进行补充（如底层原理增加「常见坑与排查」、面试增加新题）
- **THEN** 补充后该文档 SHALL 保持小标题与列表清晰，文风与既有段落一致，且 SHALL 便于在笔记浏览器中查阅

#### Scenario: 可新增主题文档并在 README 导航
- **WHEN** 维护者新增独立 md 文件（如 `工程实践.md`、`调试与排错.md`）于 `note/Flutter/`
- **THEN** README SHALL 在导航表格或列表中包含该文档的链接与简短说明，且 SHALL 在补充后运行 manifest 生成脚本使笔记浏览器侧栏展示新文件
