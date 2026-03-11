# Spec Kit 文档补充目录结构 — 设计

## Context

Spec Kit 官方采用项目根下的 `.specify/` 目录集中存放规范与脚本等（见 [GitHub Issue #38](https://github.com/github/spec-kit/issues/38) 及文档）：`.specify/memory/`、`scripts/`、`specs/`、`templates/`、`out/`。当前 speckit.md 仅泛泛而谈，需改为按上述结构逐项说明内容与作用。

## Goals / Non-Goals

**Goals:**

- 在「目录结构」中给出 `.specify/` 的树形结构及表格（目录名、典型内容、作用）。
- 内容以 Spec Kit 官方文档与仓库为准；若不同版本有差异，注明「以你当前 `specify --version` 及官方文档为准」。

**Non-Goals:**

- 不修改站点代码或构建；不保证与未来 Spec Kit 版本完全一致，以文档与链接为准。

## Decisions

1. **目录列表来源**  
   以公开的 Spec Kit 文档与 Issue 为准：`.specify/` 下含 `memory/`（共享记忆，如 constitution.md）、`scripts/`（Bash/PowerShell 自动化脚本）、`specs/`（规范与计划文件）、`templates/`（AI 提示模板）、`out/`（输出目录）。升级时 `specs/` 受保护、不会被覆盖。

2. **呈现形式**  
   先给一棵目录树（ASCII），再给表格：列「目录」「典型内容」「作用」，与 openspec.md 的目录结构风格接近，便于对照阅读。

3. **兜底表述**  
   小节末尾保留「具体以 [Spec Kit 文档](https://speckit.org/) 或 [GitHub 仓库](https://github.com/github/spec-kit) 为准」，避免版本漂移导致文档失效。

## Risks / Trade-offs

- **[取舍]** 官方可能调整目录名或增减子目录 → 已注明以官方为准，并附链接，便于后续更新。
