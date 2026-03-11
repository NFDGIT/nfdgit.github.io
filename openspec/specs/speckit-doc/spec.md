## Purpose

定义站点笔记 `note/AI/speckit.md`（Spec Kit 使用指南）的内容要求：须包含安装与常用命令、风格与 openspec 对齐、步骤必做/可选说明，以及关于统一配置的当前结论。

## Requirements

### Requirement: Spec Kit 使用指南文档存在且风格与 openspec 一致

站点 SHALL 在 `note/AI/speckit.md` 提供 Spec Kit 使用指南，文档风格与 `note/AI/openspec.md` 一致，并包含安装、目录/项目结构、常用斜杠命令及命令效果说明、小贴士。

#### Scenario: 文档存在且含安装说明
- **WHEN** 读者打开 `note/AI/speckit.md`
- **THEN** 文档 SHALL 包含安装小节，并给出至少一种可执行的 Spec Kit 安装方式（如 uv 安装 specify-cli 与 specify init）及官方文档链接

#### Scenario: 文档含常用命令与工作流
- **WHEN** 读者打开 `note/AI/speckit.md`
- **THEN** 文档 SHALL 包含常用斜杠命令说明（如 `/specify`、`/plan`、`/tasks`、`/implement` 等）及四阶段工作流（Specify → Plan → Tasks → Implement）的简要说明

#### Scenario: 文档风格与 openspec 对齐
- **WHEN** 读者同时查阅 openspec.md 与 speckit.md
- **THEN** 两篇文档 SHALL 在章节结构上对齐（如：安装、目录/结构、常用命令、命令效果说明、小贴士），语言风格一致、便于对照

### Requirement: Spec Kit 使用指南包含步骤必做/可选与统一配置说明

Spec Kit 使用指南（`note/AI/speckit.md`）SHALL 包含步骤必做与可选的说明，以及关于「通过统一配置自动执行或默认跳过某步骤」的当前结论（以官方文档为准）。

#### Scenario: 文档区分必做与可选步骤
- **WHEN** 读者查阅 Spec Kit 使用指南
- **THEN** 文档 SHALL 明确标注必做步骤（specify、plan、tasks、implement）与可选步骤（constitution、clarify、analyze），并说明最小可行路径为 specify → plan → tasks → implement

#### Scenario: 文档说明统一配置的当前状态
- **WHEN** 读者查阅 Spec Kit 使用指南
- **THEN** 文档 SHALL 说明目前 Spec Kit 公开文档中是否支持通过项目级配置自动执行或默认跳过某步骤，并建议以官方文档为准

### Requirement: Spec Kit 使用指南包含完整目录结构说明

Spec Kit 使用指南（`note/AI/speckit.md`）SHALL 在「目录结构」小节中说明执行 `specify init` 后项目内出现的完整目录列表，以及每个目录的典型内容与作用。

#### Scenario: 文档列出根目录与子目录
- **WHEN** 读者查阅 Spec Kit 使用指南的目录结构小节
- **THEN** 文档 SHALL 明确根目录为 `.specify/`，并列出其下各子目录（如 memory/、scripts/、specs/、templates/、out/ 等，以官方为准）

#### Scenario: 文档说明各目录内容与作用
- **WHEN** 读者查阅目录结构小节
- **THEN** 对每个列出的子目录，文档 SHALL 说明其典型内容（如文件名或类型）及作用（如存放规范、脚本、输出等），并可选注明升级时受保护的目录（如 specs/）
