## Context

本仓库为个人静态站点：首页、笔记浏览器、游戏、相册、工具等子站共享 `assets/css` 与 `assets/js`。约束包括：无构建工具、需兼容 GitHub Pages、中文内容为主（`lang="zh-CN"`）、主题通过 `data-theme` 与 CSS 变量切换。当前最大痛点是单文件过长与文档失真，而非功能缺失。

## Goals / Non-Goals

**Goals:**

- 降低 `note-browser.js` 单文件复杂度，使侧边栏、树渲染、预览与搜索等职责在文件层面可区分。
- 统一「站点级小工具」的导出位置，避免多处定义同类辅助函数。
- 用准确的根 README 帮助协作者与未来的自己快速理解仓库布局与维护命令（如 manifest 生成脚本若存在则列出）。

**Non-Goals:**

- 不引入 TypeScript、ESM 打包或框架迁移。
- 不改变现有 OpenSpec 流程与 `openspec/specs/` 中已归档能力的行为性要求。
- 不对游戏玩法或视觉设计做功能性改版（台球拆分以可读性为主，可分期完成）。

## Decisions

1. **脚本拆分策略（笔记）**  
   - **方案**：按领域拆成多个 `<script>` 顺序加载的文件，例如：`note-sidebar.js`（侧栏状态与移动端 overlay）、`note-tree.js`（manifest 树渲染）、`note-preview.js`（Markdown/HTML 预览与 hash）、`note-search.js`（搜索），最后保留极薄的 `note-browser.js` 作为 `init` 编排或删除编排改为在最后一文件启动。  
   - **理由**：与「无构建」约束一致；顺序加载在静态托管下行为明确。  
   - **备选**：单文件内用 `// ==== Section ====` 分区 — 保留为备选，若拆分导致重复全局过多则回退部分合并。

2. **工具合并**  
   - **方案**：将 `main.js` 中的 `getUrlParam` 迁入 `SiteUtils`（或 `window.SiteUtils.getUrlParam`），页面改为只引用 `utils.js`；删除或瘦身 `main.js`。  
   - **理由**：单一入口更易发现；调用点改动集中、可 grep 验证。  
   - **备选**：保留 `main.js` 仅作 re-export — 增加一层 indirection，除非兼容旧路径必需否则不采用。

3. **Billiards 大文件**  
   - **方案**：第一期仅提取常量、数学/几何辅助函数到 `billiards-utils.js`（或文件顶部清晰分块 + JSDoc）；核心循环与渲染仍可在主文件，避免一次大挪移引发回归。  
   - **理由**：风险可控；符合「可读性优先、分步交付」。  

4. **README**  
   - **方案**：中文简述站点模块、目录树要点、`assets` 约定、如何本地预览（如 `python -m http.server`）及 manifest 生成命令（若 `scripts/` 存在）。  
   - **理由**：替换 Jekyll 默认文即可显著改善可维护性。

## Risks / Trade-offs

- **[Risk] 多文件顺序错误导致未定义全局** → **Mitigation**：在 `note/index.html` 注释中写明加载顺序；在入口 `init` 前做最小运行时断言（可选）。  
- **[Risk] 拆分后重复加载或体积略增** → **Mitigation**：拆分粒度适中；HTTP/2 下多小文件可接受；后续若需合并再考虑仅加极简 concat 脚本（非本变更范围）。  
- **[Risk] 台球逻辑提取引入行为漂移** → **Mitigation**：提取仅限无副作用纯函数；每步完成后手动 smoke test。

## Migration Plan

1. 在分支上完成 JS 拆分与工具合并，本地静态服务器全站点关键路径点击测试。  
2. 合并前对照 `note-browser` 既有 spec 做清单验证（中文路径、侧边栏过渡、预览淡入等）。  
3. 若发现问题，优先恢复单文件备份块或回滚单个脚本文件，而非整仓库回滚。

## Open Questions

- `note` 下 manifest 生成脚本的确切命令与是否在 CI 中执行：实现阶段核对 `scripts/` 并写入 README。  
- 是否将 `large-text.js` / `theme.js` 的公共模式再抽象：仅当重复代码量明显时再开后续小变更。
