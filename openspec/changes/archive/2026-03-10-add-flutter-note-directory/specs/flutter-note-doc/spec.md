# flutter-note-doc

## Purpose

定义站点笔记中 **Flutter 专题目录**（`note/Flutter/`）的内容与结构要求：须包含底层原理、面试问题、高阶用法等分类，结构清晰，内容经网络对比择优，语言生动、言简意赅。

## ADDED Requirements

### Requirement: Flutter 笔记目录存在且包含分类文档

站点 SHALL 在 `note/Flutter/` 提供 Flutter 专题笔记目录，且 SHALL 包含至少以下分类的文档或章节：**底层原理**、**面试问题**、**高阶用法**；可选包含最佳实践、性能优化、资源链接等。目录 SHALL 提供 README 或索引，便于从笔记浏览器导航到各主题。

#### Scenario: 读者可进入 Flutter 目录并看到分类
- **WHEN** 读者在笔记浏览器中打开或浏览 `note/Flutter/`
- **THEN** 须存在至少三个主题入口（底层原理、面试、高阶用法），可为独立文件或 README 中的明确链接/目录

#### Scenario: 底层原理内容存在
- **WHEN** 读者打开「底层原理」对应文档
- **THEN** 文档 SHALL 涵盖 Flutter 核心机制（如框架架构、渲染管线、Widget/Element/RenderObject、Dart 与 Flutter 关系等）的简明说明，结构清晰、便于查阅

#### Scenario: 面试内容存在
- **WHEN** 读者打开「面试」对应文档
- **THEN** 文档 SHALL 包含常见 Flutter/Dart 面试题及参考答案或要点，按考点或题型分类整理

#### Scenario: 高阶用法内容存在
- **WHEN** 读者打开「高阶用法」对应文档
- **THEN** 文档 SHALL 包含进阶主题（如状态管理、性能优化、平台通道、混合开发、插件与包等）的整理与要点说明

### Requirement: 内容经网络对比择优且文风生动简练

Flutter 笔记目录下的文档内容 SHALL 基于网络资料（官方文档、优质博客、面试汇总、GitHub 等）对比与筛选后整理；同一知识点优先采用表述更准确、更易懂的来源。文风 SHALL 生动形象、言简意赅，可适当使用小标题、列表、表格与简短示例，避免冗长复述。

#### Scenario: 内容可追溯或符合择优原则
- **WHEN** 实现或维护 Flutter 笔记内容
- **THEN** 内容须参考并对比至少一类可靠来源（如官方文档、高星/高赞总结），关键结论可注明来源或「以官方/最新资料为准」

#### Scenario: 文风生动简练
- **WHEN** 读者阅读任意 Flutter 笔记文档
- **THEN** 文档须做到条理清晰、用语简练，可含比喻或「一句话记住」式小结，避免大段堆砌
