# Spec Kit 文档补充步骤必做/可选 — 设计

## Context

`note/AI/speckit.md` 已有安装、目录结构、常用命令表与命令效果说明。本次仅在文档内增加「步骤必做与可选」及「统一配置」的说明，不涉及代码或构建；内容以 explore 结论与 Spec Kit 官方表述为准。

## Goals / Non-Goals

**Goals:**

- 明确必做四步：specify → plan → tasks → implement；可选三步：constitution、clarify、analyze。
- 说明 clarify 可显式跳过（与官方 "unless explicitly skipped" 一致）。
- 说明目前未见项目级配置可「自动执行某步骤」或「默认跳过某步骤」，并建议以官方文档为准。

**Non-Goals:**

- 不修改站点逻辑、不新增自动化校验；不替 Spec Kit 背书未来是否支持配置，仅记录当前公开文档状态。

## Decisions

1. **小节位置**  
   在「常用命令」与「命令效果说明」之间插入「步骤必做与可选」，读者先看到命令表，再看到必做/可选说明，最后看各命令效果，顺序自然。

2. **表格与标注**  
   在现有常用命令表中为每行增加一列「必做/可选」，或在表后加一句「其中 specify、plan、tasks、implement 为必做；constitution、clarify、analyze 为可选」，与新建小节一致。

3. **统一配置表述**  
   用一两句写明：目前 Spec Kit 公开文档中未发现项目级配置可指定某步骤自动运行或默认跳过；若后续版本支持，可再补充配置方式。附官方文档链接。

## Risks / Trade-offs

- **[取舍]** 官方若后续增加配置能力，文档可能过时 → 已注明「以官方文档为准」，便于后续更新。
