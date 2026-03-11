# Spec Kit 使用指南文档 — 设计

## Context

`note/AI/openspec.md` 已形成固定风格：开篇一句概括、安装、目录结构、常用命令表、各命令效果说明、小贴士；语言生动、结构清晰。本次仅在 `note/AI/` 下新增一篇 Markdown（speckit.md），不涉及站点代码或构建；若存在 AI 文档索引（如 index.md 或 manifest），需将新文档纳入以便发现。

## Goals / Non-Goals

**Goals:**

- 新增 `note/AI/speckit.md`，与 openspec.md 在章节与语气上对齐，覆盖 Spec Kit 的安装、项目结构、斜杠命令及四阶段工作流。
- 内容以 [Spec Kit 官网](https://speckit.org/) 与 [GitHub 仓库](https://github.com/github/spec-kit) 为据，保证安装命令与命令名称准确。

**Non-Goals:**

- 不修改 openspec.md 或 spec.MD；不增加自动化校验或脚本。

## Decisions

1. **文档结构对齐 openspec.md**  
   采用：标题 + 一句概括 → 安装（安装 Spec Kit、初始化项目）→ 目录/项目结构（简述 specify init 后的产物或引用官方）→ 常用命令（表格：命令、在 AI 中的调用方式、作用）→ 命令效果说明（逐条：触发方式、效果、文件变化）→ 小贴士。保证读者在 OpenSpec 与 Spec Kit 两篇间切换时体验一致。

2. **斜杠命令与工作流**  
   列出 `/constitution`、`/specify`、`/clarify`、`/plan`、`/tasks`、`/analyze`、`/implement`，并说明四阶段顺序（Specify → Plan → Tasks → Implement）；注明在 Cursor 等 AI 中可能以 `/speckit.xxx` 形式出现，以实际集成为准。

3. **安装方式**  
   以官方推荐的 `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git` 及 `specify init <项目名> --ai <agent>` 为主；可选补充一次性使用方式（uvx）及系统要求（Python 3.8+、Git 等），并附官方文档链接。

4. **索引更新**  
   若 `note/AI/index.md` 存在且包含文档列表，则在本 change 内增加 speckit.md 的条目；若索引由 manifest 或脚本生成，则按现有机制在任务中说明更新方式。

## Risks / Trade-offs

- **[取舍]** Spec Kit  CLI 与斜杠命令会随版本更新 → 文档中注明「以 [Spec Kit 官方文档](https://speckit.org/) 为准」，并保留关键命令与链接，减少后续维护成本。
