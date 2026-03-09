## Context

站点为静态 HTML/CSS/JS 个人主页，无构建工具、无框架。主要页面：首页（index.html）、笔记浏览器（note/index.html）等，样式集中在 `assets/css/`。当前为固定亮色主题。

## Goals / Non-Goals

**Goals:**
- 支持亮色 / 暗色两种主题切换
- 用户选择持久化（localStorage）
- 首次访问时尊重系统偏好（prefers-color-scheme）
- 覆盖首页、笔记浏览器等核心页面

**Non-Goals:**
- 不引入构建工具或 CSS 预处理器
- 不覆盖第三方页面（如相册、小游戏内嵌样式）
- 不实现自动切换（如按时间）

## Decisions

1. **实现方式：CSS 变量 + data 属性**
   - 在 `<html>` 上设置 `data-theme="light"|"dark"`，通过 CSS 变量切换颜色
   - 理由：无依赖、易维护、与现有纯静态架构一致

2. **默认主题**
   - 优先读取 localStorage 中的 `theme`；若无，使用 `prefers-color-scheme: dark` 媒体查询
   - 理由：兼顾用户显式选择与系统偏好

3. **切换控件**
   - 首页 header 右侧增加图标按钮（☀️/🌙），点击切换
   - 笔记页复用同一控件或引入共享脚本
   - 理由：简单直观，不占用过多空间

4. **脚本组织**
   - 新建 `assets/js/theme.js`，在需要主题的页面引入；或合并到 `main.js` 若已有全局脚本
   - 理由：职责清晰，便于复用

## Risks / Trade-offs

- **[风险]** 部分子页面（如 album、games）可能未引入 theme.js，保持亮色
  - **缓解**：先覆盖首页与笔记，后续按需扩展

- **[风险]** 内联样式或第三方 CSS 可能覆盖变量
  - **缓解**：使用较高优先级选择器，必要时加 `!important`（谨慎使用）
