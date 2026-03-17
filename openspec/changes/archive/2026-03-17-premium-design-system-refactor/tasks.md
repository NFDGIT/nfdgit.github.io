## 1. 基础设施层

- [x] 1.1 新建 `assets/css/base.css`：全局 reset、主题变量（亮/暗）、字体栈、`data-large-text`、`focus-visible`、`prefers-reduced-motion`
- [x] 1.2 在 `base.css` 中定义液态玻璃设计令牌：`--glass-bg`/`--glass-blur`/`--glass-border`/`--glass-shadow`/`--glass-highlight`/`--radius-*`
- [x] 1.3 在 `base.css` 中定义通用组件类：`.glass-panel`、`.glass-btn`、`.glass-btn-primary`、`.glass-nav`、`.glass-nav-link`、`.glass-card`、`.glass-overlay`
- [x] 1.4 在 `base.css` 中统一定义 `.theme-toggle` 和 `.large-text-toggle`（液态玻璃风格）
- [x] 1.5 在 `base.css` 中添加 `@supports not (backdrop-filter: blur(1px))` 降级规则
- [x] 1.6 新建 `assets/js/theme-init.js`：提取主题初始化逻辑（3 行同步脚本）
- [x] 1.7 新建 `assets/js/utils.js`：封装 `getCssVar()`、`isMobile()`、`isTouchDevice()`

## 2. 瘦身 home.css 和 note-browser.css

- [x] 2.1 从 `home.css` 移除已迁移到 `base.css` 的规则（reset、主题变量、toggle、nav-pill、focus/motion 规则），保留首页/游戏目录专用样式
- [x] 2.2 从 `note-browser.css` 移除重复的 reset、主题变量、toggle 定义，改为继承 `base.css`

## 3. 全站 HTML 统一

- [x] 3.1 所有 9 个 HTML 页面：替换内联主题初始化脚本为 `<script src="assets/js/theme-init.js">`，添加 `<link>` 引用 `base.css`
- [x] 3.2 所有页面的 header/nav 统一为 `.glass-nav` 结构（固定顶部，包含返回链接 + 功能按钮）
- [x] 3.3 消除所有剩余的内联 `style` 属性

## 4. 游戏页接入

- [x] 4.1 billiards：`.billiards-panel` 继承 `.glass-panel`、按钮改用 `.glass-btn`、overlay 改用 `.glass-overlay`、导航改用 `.glass-nav-link`
- [x] 4.2 snake：`.snake-panel` 继承 `.glass-panel`、按钮改用 `.glass-btn`、overlay 改用 `.glass-overlay`、导航改用 `.glass-nav-link`
- [x] 4.3 billiards.js：移除内部 `getCss()` 函数，改用 `utils.js` 的 `getCssVar()`
- [x] 4.4 snake.js：移除内部 `getCssVariable()` 函数，改用 `utils.js` 的 `getCssVar()`

## 5. 其他页面接入

- [x] 5.1 笔记浏览器：侧边栏接入 `.glass-panel` 风格，移除 note-browser.css 中重复的 toggle 定义
- [x] 5.2 保险页：按钮改用 `.glass-btn` 系列，导航改用 `.glass-nav`
- [x] 5.3 工具页：卡片改用 `.glass-card`，按钮改用 `.glass-btn`
- [x] 5.4 相册页：导航改用 `.glass-nav`
- [x] 5.5 赛车页：导航改用 `.glass-nav-link`，消除内联样式
