## Why

用户在低光环境下浏览个人站点时，浅色背景容易造成视觉疲劳。增加黑暗模式可提升阅读舒适度，并符合现代网站常见的主题切换预期。

## What Changes

- 新增主题切换能力：支持亮色 / 暗色两种模式
- 首页、笔记浏览器等主要页面支持主题切换
- 用户偏好持久化（localStorage），刷新后保持选择
- 遵循系统偏好（prefers-color-scheme）作为默认值

## Capabilities

### New Capabilities

- `theme`: 站点主题切换能力，包括亮色/暗色模式、切换控件、偏好持久化与系统偏好检测

### Modified Capabilities

- （无：本次为新增能力，不修改现有规范）

## Impact

- **CSS**：`assets/css/home.css`、`assets/css/note-browser.css` 等需增加暗色变量与媒体查询
- **HTML**：首页、笔记页等需增加主题切换控件（如按钮或开关）
- **JS**：`assets/js/main.js` 或新建 `assets/js/theme.js` 处理切换逻辑与 localStorage
- **依赖**：无新增依赖，纯 CSS + 少量 JS
