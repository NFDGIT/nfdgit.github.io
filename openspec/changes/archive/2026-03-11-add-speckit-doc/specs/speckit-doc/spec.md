## ADDED Requirements

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
