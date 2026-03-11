## ADDED Requirements

### Requirement: Spec Kit 使用指南包含完整目录结构说明

Spec Kit 使用指南（`note/AI/speckit.md`）SHALL 在「目录结构」小节中说明执行 `specify init` 后项目内出现的完整目录列表，以及每个目录的典型内容与作用。

#### Scenario: 文档列出根目录与子目录
- **WHEN** 读者查阅 Spec Kit 使用指南的目录结构小节
- **THEN** 文档 SHALL 明确根目录为 `.specify/`，并列出其下各子目录（如 memory/、scripts/、specs/、templates/、out/ 等，以官方为准）

#### Scenario: 文档说明各目录内容与作用
- **WHEN** 读者查阅目录结构小节
- **THEN** 对每个列出的子目录，文档 SHALL 说明其典型内容（如文件名或类型）及作用（如存放规范、脚本、输出等），并可选注明升级时受保护的目录（如 specs/）
