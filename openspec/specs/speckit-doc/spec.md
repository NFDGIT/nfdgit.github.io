## Purpose

定义站点笔记 `note/AI/speckit.md`（Spec Kit 使用指南）的内容要求：须包含安装与常用命令、步骤必做/可选说明，以及关于统一配置的当前结论。

## Requirements

### Requirement: Spec Kit 使用指南包含步骤必做/可选与统一配置说明

Spec Kit 使用指南（`note/AI/speckit.md`）SHALL 包含步骤必做与可选的说明，以及关于「通过统一配置自动执行或默认跳过某步骤」的当前结论（以官方文档为准）。

#### Scenario: 文档区分必做与可选步骤
- **WHEN** 读者查阅 Spec Kit 使用指南
- **THEN** 文档 SHALL 明确标注必做步骤（specify、plan、tasks、implement）与可选步骤（constitution、clarify、analyze），并说明最小可行路径为 specify → plan → tasks → implement

#### Scenario: 文档说明统一配置的当前状态
- **WHEN** 读者查阅 Spec Kit 使用指南
- **THEN** 文档 SHALL 说明目前 Spec Kit 公开文档中是否支持通过项目级配置自动执行或默认跳过某步骤，并建议以官方文档为准
