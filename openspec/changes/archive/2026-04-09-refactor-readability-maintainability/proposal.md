## Why

站点为纯静态 GitHub Pages 项目，核心逻辑集中在少数大文件（如 `assets/js/note-browser.js` 约五百行、`games/billiards/billiards.js` 逾千行），共享工具分散在 `main.js` 与 `utils.js`，根目录 `README.md` 仍为默认 Jekyll 说明，与真实结构不符。上述状况使代码审阅、定位缺陷与并行修改成本偏高，需要在**不改变既有用户可见行为**的前提下，建立可执行的目录与脚本组织约定并落实重构。

## What Changes

- 将笔记浏览器相关脚本按职责拆分为多个无构建步骤的脚本文件（IIFE 或全局命名空间），在 `note/index.html` 中以固定顺序加载；拆分后对外行为与现有 `note-browser` 规范一致。
- 整理共享工具：将 URL 参数等通用能力并入 `SiteUtils`（或等价单一入口），消除 `main.js` 与 `utils.js` 职责重叠带来的困惑。
- 将仓库根 `README.md` 替换为反映本仓库真实用途、主要目录与本地开发/生成脚本说明的文档（非 Jekyll 占位文）。
- 对 `games/billiards/billiards.js` 等大型游戏脚本采用分文件或分区段注释的渐进式整理（优先提取纯函数与常量，降低单文件认知负担）；不强行引入打包工具。
- 在 `assets/css` 侧仅做与结构配套的注释或分段整理，避免大规模视觉改版。

## Capabilities

### New Capabilities

- `static-site-maintainability`：约定静态站点共享脚本拆分方式、工具入口、根文档与可维护性检查项，使后续改动可预测、可审查。

### Modified Capabilities

- 无（本变更以内部结构与文档为主，不改变 `openspec/specs/` 中已有面向用户行为的规范条目；笔记浏览器对外行为仍由既有 `note-browser` 等 spec 约束）。

## Impact

- 主要受影响路径：`assets/js/`（含新增拆分文件）、`note/index.html`、部分引用 `main.js` 的页面、`README.md`、可选 `games/billiards/` 下脚本组织。
- 无新增 npm 依赖；不引入 Webpack/Vite 等构建链，保持 GitHub Pages 直接托管静态文件的工作方式。
- 回归验证重点：笔记浏览（含中文路径与 hash）、主题与大字模式、保险等使用 URL 参数的页面、台球游戏核心操作。
