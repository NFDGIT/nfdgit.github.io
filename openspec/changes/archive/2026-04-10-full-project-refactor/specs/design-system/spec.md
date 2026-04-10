## ADDED Requirements

### Requirement: 设计系统应提供布局组件类

系统 SHALL 提供 `.glass-layout`（flex 主布局）、`.glass-sidebar`（侧边栏面板）、`.glass-content`（主内容区）布局组件类，用于构建统一的页面骨架。

#### Scenario: 笔记页使用布局组件
- **WHEN** 笔记页使用 `.glass-layout` + `.glass-sidebar` + `.glass-content`
- **THEN** SHALL 自动渲染为侧边栏 + 主内容区的双栏布局

#### Scenario: 布局组件响应式适配
- **WHEN** 视口宽度 ≤ 768px
- **THEN** `.glass-layout` SHALL 自动切换为单列堆叠布局

### Requirement: 设计系统应提供表单组件类

系统 SHALL 提供 `.glass-input`、`.glass-select`、`.glass-textarea`、`.glass-checkbox`、`.glass-radio` 等表单组件类，统一表单控件的液态玻璃风格。

#### Scenario: 工具页使用表单组件
- **WHEN** 工具页面的输入框添加 `.glass-input` 类
- **THEN** 输入框 SHALL 渲染半透明背景、模糊效果和焦点高亮

### Requirement: 设计系统应提供反馈组件类

系统 SHALL 提供 `.glass-toast`（通知提示）和 `.glass-loading`（加载状态）组件类，用于全局反馈。

#### Scenario: 显示 toast 通知
- **WHEN** 系统需要展示操作反馈（如"已复制到剪贴板"）
- **THEN** SHALL 使用 `.glass-toast` 组件以液态玻璃风格展示通知

### Requirement: 设计系统 token 应增加间距和阴影规范

系统 SHALL 在设计 token 中新增标准间距体系（xs/sm/md/lg/xl/2xl）和阴影层级体系（sm/md/lg/xl），所有组件 SHALL 引用这些 token。

#### Scenario: 组件使用标准间距
- **WHEN** 开发者为组件设置内边距
- **THEN** SHALL 使用 `var(--space-md)` 等间距 token，不使用硬编码像素值

## MODIFIED Requirements

### Requirement: 站点应有统一的液态玻璃设计令牌

系统 SHALL 在 `tokens.css`（从 `base.css` 拆出）中定义液态玻璃设计令牌（glass-bg、glass-blur、glass-border、glass-shadow、glass-highlight、radius 系列），以及新增的间距系列（`--space-xs` 到 `--space-2xl`）和阴影层级系列（`--shadow-sm` 到 `--shadow-xl`），亮色和暗色主题 SHALL 各有适配值。

#### Scenario: 设计令牌在亮色主题下生效
- **WHEN** 页面处于亮色主题
- **THEN** 液态玻璃背景 SHALL 为半透明白色，边框为白色半透明

#### Scenario: 设计令牌在暗色主题下生效
- **WHEN** 页面处于暗色主题
- **THEN** 液态玻璃背景 SHALL 为半透明暗色，边框透明度降低

#### Scenario: 间距 token 可用
- **WHEN** 开发者在 CSS 中引用 `var(--space-md)`
- **THEN** SHALL 获得标准间距值（如 16px）

### Requirement: 主题变量和 reset 应集中定义

系统 SHALL 将全局 reset 独立到 `reset.css`，主题变量独立到 `tokens.css`，字体栈、`data-large-text`、`focus-visible`、`prefers-reduced-motion` 集中在 `base.css` 中。其他 CSS 文件 SHALL 不重复定义这些规则。原有的单一 `base.css` SHALL 拆分为 `tokens.css` + `reset.css` + `base.css` 三个文件。

#### Scenario: 基础样式文件被所有页面引用
- **WHEN** 用户打开站点任意页面
- **THEN** 页面 SHALL 引用 `tokens.css`、`reset.css` 和 `base.css`

### Requirement: 公共 JS 函数应封装为独立模块

系统 SHALL 将 `getCssVariable()`、`isMobile()`、`isTouchDevice()` 封装到 ES Module 格式的 `utils/dom.js` 中，通过 `export` 暴露 API，游戏和笔记页面 SHALL 通过 `import` 引用。

#### Scenario: 游戏 JS 使用共享工具函数
- **WHEN** billiards.js 或 snake.js 需要读取 CSS 变量
- **THEN** SHALL 通过 `import { getCssVar } from '../../assets/js/utils/dom.js'` 引入

### Requirement: 主题初始化脚本应为独立文件

系统 SHALL 保留主题初始化脚本（`theme-init.js`）为独立的同步加载脚本（非 module），所有 HTML 页面 SHALL 在 `<head>` 中通过 `<script src>` 引用。

#### Scenario: 页面无内联主题初始化脚本
- **WHEN** 维护者查看任意 HTML 页面源码
- **THEN** 页面 SHALL 通过 `<script src>` 引用主题初始化脚本

### Requirement: glass-nav 应有移动端响应式适配

系统 SHALL 在 `≤768px` 时将 `.glass-nav` 内的导航链接折叠为汉堡菜单，保留主题切换等必要按钮可见。`has-glass-nav` body 类 SHALL 为页面内容提供顶部避让空间。

#### Scenario: 移动端内容不被导航遮挡
- **WHEN** 用户在移动端打开使用 `.glass-nav` 的页面
- **THEN** 页面首屏内容 SHALL 不被固定导航栏遮挡

#### Scenario: glass-nav 移动端折叠
- **WHEN** 页面宽度 ≤ 768px
- **THEN** `.glass-nav` SHALL 折叠导航链接为汉堡菜单，仅显示 logo 和控制按钮
