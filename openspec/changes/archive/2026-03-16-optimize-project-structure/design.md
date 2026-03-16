## Context

项目是纯静态 GitHub Pages 站点，无构建工具。随着 snake、billiards、racing 等游戏与 album、insurance 等子模块不断追加，部分模块未遵循最初约定（共享 home.css + theme.js + `lang="zh-CN"`），还残留了测试/临时目录和冗余跳转文件。本次变更属于横向治理，不引入新功能，仅消除结构债务。

## Goals / Non-Goals

**Goals:**

- 移除所有残留的临时/测试/遗留目录与冗余跳转文件。
- 让 album、insurance、racing 三个此前未接入主题的模块统一引用 `assets/css/home.css`、`assets/js/theme.js`，并设置 `lang="zh-CN"`。
- 去掉 insurance 对 jQuery 的依赖，用原生 JS 替换 `main.js` 中的 URL 参数读取。
- 在 `.gitignore` 中防止临时目录再次提交。
- 修正 album 页面的 HTML 拼写错误。

**Non-Goals:**

- 不重新设计 album/insurance/racing 的视觉风格。
- 不改变游戏玩法或核心逻辑。
- 不合并各子模块的 CSS 到单一文件。

## Decisions

- **共享样式引入方式**：直接在各页面 `<head>` 中添加 `<link>` 引用 `assets/css/home.css`，不做 CSS 合并或内联。这与既有 snake/billiards 的引用方式一致。
  - 备选：将各模块 CSS 合并为单文件。
  - 取舍：增加构建复杂度，与项目"零构建"约定冲突，不采用。

- **theme.js 集成**：在 `<body>` 底部添加 `<script src="../../assets/js/theme.js">`，并在页面头部添加同步内联脚本读取 localStorage 预设主题（与已有页面一致）。
  - 备选：用 CSS `prefers-color-scheme` 纯媒体查询。
  - 取舍：无法持久化用户选择，不采用。

- **insurance jQuery 替换**：`main.js` 仅使用了 jQuery 的 URL 参数解析功能，替换为 `URLSearchParams` 原生 API（兼容性已充分覆盖目标设备）。
  - 备选：保留 jQuery 仅做最小化。
  - 取舍：增加无谓的 85KB 依赖，不采用。

- **冗余跳转文件处理**：直接删除 `games/snake.html` 和 `games/racing.html`，同步更新 `games/index.html` 中的链接指向 `snake/index.html`、`racing/index.html`。
  - 备选：保留跳转文件做 301。
  - 取舍：静态站点无法发 301 头，跳转 HTML 只是多余中间层，不采用。

- **legacy 目录处理**：直接删除 `games/legacy/`。
  - 备选：移入 `_archive/` 目录。
  - 取舍：内容已无参考价值且不应出现在 GitHub Pages，不采用。

## Risks / Trade-offs

- **[风险]** 外部链接如果直接指向 `games/snake.html` 或 `games/racing.html` 会 404。
  **缓解：** 这些文件此前仅由站内链接引用，外部分享概率极低；可在发布后监控 404。

- **[风险]** insurance 去 jQuery 后可能遗漏某些隐式依赖。
  **缓解：** `main.js` 极简（仅 URL 参数读取），替换后全量手动验证。

- **[风险]** racing 接入 home.css 可能与其已有行内样式冲突。
  **缓解：** home.css 主要定义 CSS 变量和基础排版，不强制覆盖组件样式；接入后做视觉回归。

## Migration Plan

1. 先删除临时/遗留文件。
2. 修复 album HTML 错误并接入共享样式/主题。
3. 重写 insurance `main.js` 为原生实现，移除 jQuery 引用。
4. racing 接入共享样式和主题。
5. 更新 games/index.html 链接并删除跳转文件。
6. 更新 .gitignore。
7. 全量验证所有受影响页面。

## Open Questions

- 无。
