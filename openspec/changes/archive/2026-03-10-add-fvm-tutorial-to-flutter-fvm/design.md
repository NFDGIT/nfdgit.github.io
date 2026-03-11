# flutter_fvm 笔记补充 FVM 安装与常用命令 — 设计

## Context

`note/IT/flutter_fvm.md` 为站点笔记浏览器中的一篇 Markdown，已有「项目 vs 全局」、推荐用法与 VSCode 配置，缺安装步骤与命令速查。变更仅涉及该文件内容增补，不涉及代码或构建。

## Goals / Non-Goals

**Goals:**

- 在现有文档中增加可复制的 FVM 安装步骤（多平台或主流方式），以及常用命令列表与简要说明，风格与现有小节一致。

**Non-Goals:**

- 不修改站点构建、笔记浏览器逻辑或其它 note 文件；不增加自动化校验（如脚本检查文档是否包含某关键词）。

## Decisions

1. **安装小节内容范围**  
   覆盖 macOS（Homebrew / pub global）、Windows（PowerShell / pub global）及「其他」（如 pub global 或官方安装说明链接），各平台给出可直接执行的命令；必要时提示 PATH 或 shell 配置，与 FVM 官方文档保持一致表述。

2. **常用命令小节结构**  
   以表格或列表形式列出：`fvm install`、`fvm use`、`fvm list`、`fvm global`、`fvm flutter` / `fvm dart`、`fvm exec` 等，每条一行说明用途；与现有「推荐用法」不重复，侧重命令速查。

3. **插入位置与顺序**  
   在现有「项目 vs 全局」之前或紧跟标题后增加「FVM 安装」，在「推荐用法」前或后增加「常用命令」，保持「VSCode 配置」「小结」等既有结构不变，便于老读者定位。

## Risks / Trade-offs

- **[取舍]** 安装方式会随 FVM 版本更新而变动 → 文档中可注明「以 [FVM 官方文档](https://fvm.app/) 为准」，必要时只保留通用步骤与链接，减少维护成本。
