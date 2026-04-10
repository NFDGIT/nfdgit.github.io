## ADDED Requirements

### Requirement: 主题切换应有视觉过渡

系统 SHALL 在用户切换主题时使用 `document.startViewTransition()`（如浏览器支持）为页面添加平滑的颜色过渡效果，不支持的浏览器 SHALL 直接切换无报错。

#### Scenario: 支持 View Transition 的浏览器切换主题
- **WHEN** 用户在 Chrome 111+ 点击主题切换
- **THEN** 页面 SHALL 以平滑的交叉淡入效果切换主题色

#### Scenario: 不支持 View Transition 的浏览器切换主题
- **WHEN** 用户在 Safari 点击主题切换
- **THEN** 主题 SHALL 直接切换，无 JS 错误

### Requirement: 主题脚本应为 ES Module 格式

系统 SHALL 将 `theme.js` 重构为 ES Module，通过 `export` 暴露 `initTheme()`、`toggleTheme()`、`getCurrentTheme()` 方法。

#### Scenario: 其他模块导入主题功能
- **WHEN** `shell.js` 需要渲染主题切换按钮
- **THEN** SHALL 通过 `import { getCurrentTheme } from './theme.js'` 获取当前主题状态

## MODIFIED Requirements

### Requirement: Theme toggle between light and dark

The system SHALL support two visual themes: light and dark. The active theme SHALL be switchable by the user. 切换时 SHALL 更新 `<html>` 的 `data-theme` 属性和 `aria-label`。

#### Scenario: User switches to dark mode
- **WHEN** user clicks the theme toggle control
- **THEN** the page SHALL switch to dark theme (dark background, light text), toggle 按钮 `aria-label` SHALL 更新为"切换到亮色主题"

#### Scenario: User switches to light mode
- **WHEN** user clicks the theme toggle control while in dark mode
- **THEN** the page SHALL switch to light theme (light background, dark text), toggle 按钮 `aria-label` SHALL 更新为"切换到暗色主题"

### Requirement: Theme toggle control visibility

系统 SHALL 在所有面向用户的页面通过统一的页面 Shell（`shell.js`）提供可见的主题切换控件，而非各页面单独实现。笔记页使用自定义工具条时 SHALL 自行包含主题切换按钮。

#### Scenario: Toggle visible on homepage
- **WHEN** 用户查看首页
- **THEN** 统一导航栏中的主题切换控件 SHALL 可见

#### Scenario: Toggle visible on album page
- **WHEN** 用户访问相册页面
- **THEN** 统一导航栏中的主题切换控件 SHALL 可见

#### Scenario: Toggle visible on insurance page
- **WHEN** 用户访问保险页面
- **THEN** 统一导航栏中的主题切换控件 SHALL 可见

#### Scenario: Toggle visible on racing game page
- **WHEN** 用户访问赛车游戏页面
- **THEN** 统一导航栏中的主题切换控件 SHALL 可见

### Requirement: 全站移动端断点应统一

系统 SHALL 统一使用 `768px` 作为主要移动端断点，`480px` 作为超小屏辅助断点。断点值 SHALL 定义在 `tokens.css` 中作为注释文档（CSS 自定义属性不支持 media query，故以注释形式约定）。

#### Scenario: 维护者检查断点一致性
- **WHEN** 维护者在所有 CSS 文件中搜索 `max-width` 媒体查询
- **THEN** 主要移动端断点 SHALL 统一为 `768px`
