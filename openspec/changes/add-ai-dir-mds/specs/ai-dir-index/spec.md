## ADDED Requirements

### Requirement: 目录索引存在

系统 SHALL 在 `note/AI/index.md` 提供 AI 文档目录索引，列出该目录下各文档的标题与简要说明。

#### Scenario: 读者查找文档

- **WHEN** 读者打开 `note/AI/index.md`
- **THEN** 读者能看到所有 AI 相关文档的列表及简介，并能通过链接跳转到对应文档

### Requirement: 索引覆盖现有及新增文档

索引 MUST 包含 `openspec.md`、`spec.md`、`openclaw.md` 及 `index.md` 自身，每项配有标题与一句话简介。

#### Scenario: 索引完整性

- **WHEN** 读者查看索引
- **THEN** 索引列出 openspec、spec、openclaw、index 四份文档，且每项有可点击链接和简介
