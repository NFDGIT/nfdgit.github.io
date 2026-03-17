## ADDED Requirements

### Requirement: Theme toggle between light and dark

The system SHALL support two visual themes: light and dark. The active theme SHALL be switchable by the user.

#### Scenario: User switches to dark mode
- **WHEN** user clicks the theme toggle control
- **THEN** the page SHALL switch to dark theme (dark background, light text)

#### Scenario: User switches to light mode
- **WHEN** user clicks the theme toggle control while in dark mode
- **THEN** the page SHALL switch to light theme (light background, dark text)

### Requirement: Theme preference persistence

The system SHALL persist the user's theme choice across page loads and sessions.

#### Scenario: Preference persists after reload
- **WHEN** user selects dark mode and reloads the page
- **THEN** the page SHALL load in dark mode

### Requirement: Respect system preference on first visit

The system SHALL use the operating system's color scheme preference when the user has not yet made an explicit choice.

#### Scenario: First visit with system dark mode
- **WHEN** user visits the site for the first time and the system preference is dark
- **THEN** the page SHALL display in dark mode

#### Scenario: Ff d s
- **WHEN** user visits the site for the first time and the system preference is light
- **THEN** the page SHALL display in light mode

### Requirement: Theme toggle control visibility

系统 SHALL 在所有面向用户的页面（包括首页、笔记浏览器、游戏目录、各游戏页面、相册页面、工具页面与保险页面）提供可见的主题切换控件。

#### Scenario: Toggle visible on homepage
- **WHEN** 用户查看首页
- **THEN** 主题切换控件 SHALL 可见

#### Scenario: Toggle visible on album page
- **WHEN** 用户访问相册页面（`album/index.html`）
- **THEN** 页面 SHALL 引用共享主题脚本并展示主题切换控件

#### Scenario: Toggle visible on insurance page
- **WHEN** 用户访问保险页面（`insurance/index.html`）
- **THEN** 页面 SHALL 引用共享主题脚本并展示主题切换控件

#### Scenario: Toggle visible on racing game page
- **WHEN** 用户访问赛车游戏页面（`games/racing/index.html`）
- **THEN** 页面 SHALL 引用共享主题脚本并展示主题切换控件

### Requirement: 所有面向用户的页面应设置中文语言属性

系统 SHALL 确保所有面向用户的 HTML 页面的 `<html>` 标签包含 `lang="zh-CN"` 属性。

#### Scenario: album 页面语言属性正确
- **WHEN** 维护者或浏览器解析 `album/index.html`
- **THEN** `<html>` 标签 SHALL 包含 `lang="zh-CN"`

### Requirement: 临时与测试目录不应提交到仓库

系统 SHALL 通过 `.gitignore` 规则阻止临时目录（如 `.tmp-*`、`test-results/`）被提交到版本库中。

#### Scenario: gitignore 包含临时目录规则
- **WHEN** 维护者执行 `git status`
- **THEN** `.tmp-billiards-artifacts/`、`.tmp-playwright-runner/`、`test-results/` 等目录 SHALL 不出现在待跟踪文件列表中

### Requirement: insurance 页面不依赖 jQuery

系统 SHALL 确保 `insurance/index.html` 不加载 jQuery 库，所有 URL 参数读取功能 SHALL 使用原生 JavaScript 实现。

#### Scenario: insurance 页面无 jQuery 引用
- **WHEN** 浏览器加载 `insurance/index.html`
- **THEN** 页面 SHALL 不请求任何 jQuery CDN 资源

#### Scenario: URL 参数读取功能保持正常
- **WHEN** 用户带有 URL 参数访问 insurance 页面
- **THEN** 页面 SHALL 正确读取并应用 URL 参数，功能与替换前一致

### Requirement: 全局 focus-visible 焦点样式

系统 SHALL 在共享样式中定义 `:focus-visible` 规则，为所有可交互元素（按钮、链接、输入框）提供统一的焦点轮廓，确保键盘导航可用性。

#### Scenario: 按钮获得键盘焦点
- **WHEN** 用户通过 Tab 键聚焦到任一按钮
- **THEN** 按钮 SHALL 显示与当前主题适配的焦点轮廓

### Requirement: prefers-reduced-motion 全局降级

系统 SHALL 在 `@media (prefers-reduced-motion: reduce)` 下将所有 `animation-duration` 和 `transition-duration` 设为极短值，实现动画降级。

#### Scenario: 系统偏好减少动画时页面不晃动
- **WHEN** 用户系统设置了减少动画偏好
- **THEN** 页面中所有过渡和动画 SHALL 近乎瞬间完成

### Requirement: 主题切换按钮样式应统一定义

系统 SHALL 在共享基础样式文件中统一定义 `.theme-toggle` 样式（液态玻璃风格），所有页面 SHALL 引用同一份定义，不在各自的 CSS 中重复定义。

#### Scenario: 主题切换按钮样式一致
- **WHEN** 用户在任意页面看到主题切换按钮
- **THEN** 按钮 SHALL 使用统一的液态玻璃样式（半透明背景、模糊、圆角）

### Requirement: 全站移动端断点应统一

系统 SHALL 统一使用 `768px` 作为主要移动端断点，`480px` 作为超小屏辅助断点，各页面的 CSS 媒体查询 SHALL 不使用 700px、640px、560px 等非标准断点。

#### Scenario: 维护者检查断点一致性
- **WHEN** 维护者在所有 CSS 文件中搜索 `max-width` 媒体查询
- **THEN** 主要移动端断点 SHALL 统一为 `768px`
