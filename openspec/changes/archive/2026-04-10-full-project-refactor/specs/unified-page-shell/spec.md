## ADDED Requirements

### Requirement: 所有页面应共享统一的导航栏结构

系统 SHALL 通过 `shell.js` 模块在所有页面运行时注入统一导航栏，导航栏 SHALL 包含站点 logo/标题、主要页面链接（笔记、游戏、相册、工具、教程）、主题切换按钮和大字模式按钮。

#### Scenario: 用户访问任意子页面
- **WHEN** 用户打开站点任意页面（首页、笔记、游戏、相册、工具、保险、组件库、教程）
- **THEN** 页面 SHALL 显示统一的导航栏，包含站点标题和主要页面链接

#### Scenario: JS 加载失败时页面仍可用
- **WHEN** `shell.js` 加载失败
- **THEN** 页面主内容 SHALL 仍可访问和阅读，只是缺少统一导航栏

### Requirement: 导航栏应高亮当前页面

系统 SHALL 根据当前 URL 路径自动高亮导航栏中对应的链接项，使用户知晓自己所在位置。

#### Scenario: 用户在笔记页
- **WHEN** 用户访问 `note/index.html`
- **THEN** 导航栏中"笔记"链接 SHALL 有活跃状态高亮样式

#### Scenario: 用户在首页
- **WHEN** 用户访问首页
- **THEN** 导航栏中 SHALL 无特定链接高亮（或高亮"首页"标识）

### Requirement: 所有页面应显示面包屑导航

系统 SHALL 在页面内容区顶部显示面包屑导航，格式为「首页 > 当前区域 > 子页面」，面包屑的每一级 SHALL 可点击跳转。

#### Scenario: 用户在游戏子页面查看面包屑
- **WHEN** 用户在 `games/snake/index.html`
- **THEN** 面包屑 SHALL 显示「首页 > 小游戏 > 贪吃蛇」，前两级可点击

#### Scenario: 面包屑在移动端自动截断
- **WHEN** 用户在窄屏设备访问深层页面
- **THEN** 面包屑 SHALL 截断为仅显示上一级和当前页，避免溢出

### Requirement: 所有页面应共享统一的页脚

系统 SHALL 在所有页面底部注入统一页脚，包含版权信息和返回顶部链接。

#### Scenario: 用户滚动到页面底部
- **WHEN** 用户在任意页面滚动到底部
- **THEN** 页面 SHALL 显示统一的页脚区域

### Requirement: 页面 Shell 注入不应导致布局偏移

系统 SHALL 通过 CSS 预留导航栏和页脚的空间（固定高度占位），确保 Shell 注入前后页面不产生可感知的布局偏移（CLS）。

#### Scenario: 页面加载过程中无跳动
- **WHEN** 页面 HTML 加载后、Shell JS 执行前
- **THEN** 页面内容区 SHALL 已有正确的顶部偏移，Shell 注入后不产生内容跳动

### Requirement: Shell 配置应通过 HTML data 属性声明

系统 SHALL 允许各页面通过 `<body>` 上的 `data-shell-*` 属性声明 Shell 配置（如 `data-shell-breadcrumb="首页/笔记"` 、`data-shell-nav="false"` 等），`shell.js` 根据这些属性决定注入内容。

#### Scenario: 笔记页面使用自定义工具条
- **WHEN** 笔记页 `<body>` 设置了 `data-shell-nav="custom"`
- **THEN** `shell.js` SHALL 跳过默认导航栏注入，由笔记页自行管理工具条
