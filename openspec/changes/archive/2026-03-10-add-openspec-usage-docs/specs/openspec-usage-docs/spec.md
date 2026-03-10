## ADDED Requirements

### Requirement: 安装说明

文档 MUST 包含 OpenSpec 的安装方式说明，包括通过 npm 全局安装及验证安装成功的步骤。

#### Scenario: 读者按文档完成安装

- **WHEN** 读者按照文档中的安装步骤操作
- **THEN** 读者能够成功安装 OpenSpec 并通过 `openspec --version` 或类似命令验证

### Requirement: 目录结构介绍

文档 MUST 介绍 OpenSpec 相关目录结构，至少涵盖 `openspec/`、`openspec/config.yaml`、`openspec/changes/`、`openspec/specs/`、`openspec/changes/archive/` 等核心目录与文件的作用。

#### Scenario: 读者理解目录用途

- **WHEN** 读者阅读目录介绍部分
- **THEN** 读者能够理解各目录及关键文件的职责，知道 proposal、design、specs、tasks 等 artifact 的存放位置

### Requirement: 常用命令列表

文档 MUST 列出四个常用 OpenSpec 工作流命令：`propose`、`apply`、`explore`、`archive`（对应 Cursor 中的 `/opsx-propose`、`/opsx:apply`、`/opsx:explore`、`/opsx:archive`），并简要说明各命令的用途。

#### Scenario: 读者查找命令

- **WHEN** 读者需要执行某一类操作（如创建变更、查看状态、开始实现）
- **THEN** 读者能够在文档中快速找到对应命令及简要说明

### Requirement: 命令效果说明

文档 MUST 对所列常用命令分别说明「执行后会产生什么效果」，包括：创建了哪些文件、更新了哪些状态、终端输出的大致形式等。必要时可附示例输出或目录变化说明。

#### Scenario: 读者预判命令结果

- **WHEN** 读者在执行某命令前阅读其效果说明
- **THEN** 读者能够预判该命令会产生的文件变更或状态变化，减少误操作

### Requirement: 语言风格

文档 MUST 使用简体中文撰写，语言生动形象、系统全面，便于理解和查阅。

#### Scenario: 读者阅读体验

- **WHEN** 读者阅读文档全文
- **THEN** 读者能够感受到语言友好、结构清晰，且内容覆盖安装、目录、命令及效果等核心主题
