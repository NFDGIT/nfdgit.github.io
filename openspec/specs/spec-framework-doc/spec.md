# spec-framework-doc

## Purpose

规范式编程与框架对比文档（`note/AI/spec.md`）为站点读者提供规范式编程概念、主流框架对比及老项目选型建议。本 capability 约定该文档须包含「已有项目下 OpenSpec 与 Spec Kit 二选一」的结论及主要原因说明。

## Requirements

### Requirement: 文档包含已有项目二选一选 OpenSpec 的结论与主要原因

规范式编程文档（`note/AI/spec.md`）SHALL 在「老项目适合什么框架」相关章节中明确写出：已有项目在 OpenSpec 与 Spec Kit 中二选一时更推荐 OpenSpec，并列出基于公开对比的主要原因（如 brownfield 定位、统一规范、流程轻重、迭代速度、依赖与上手成本等）。

#### Scenario: 读者查阅老项目选型结论
- **WHEN** 读者打开规范式编程文档并查看老项目/已有项目选型部分
- **THEN** 文档 SHALL 给出「二选一更推荐 OpenSpec」的结论，并至少包含上述主要原因中的若干条说明

#### Scenario: 原因可追溯
- **WHEN** 读者希望了解该结论的依据
- **THEN** 文档 SHALL 注明结论依据为公开对比或社区表述（如第三方对比文章、官方定位），或提供可查证的表述方式
