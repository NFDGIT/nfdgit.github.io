## Purpose

定义站点统一的液态玻璃设计系统，包括 CSS 设计令牌、通用组件类、降级方案、代码封装规范。

## Requirements

### Requirement: 站点应有统一的液态玻璃设计令牌

系统 SHALL 在共享基础样式表中定义液态玻璃设计令牌（glass-bg、glass-blur、glass-border、glass-shadow、glass-highlight、radius 系列），亮色和暗色主题 SHALL 各有适配值。

#### Scenario: 设计令牌在亮色主题下生效
- **WHEN** 页面处于亮色主题
- **THEN** 液态玻璃背景 SHALL 为半透明白色，边框为白色半透明

#### Scenario: 设计令牌在暗色主题下生效
- **WHEN** 页面处于暗色主题
- **THEN** 液态玻璃背景 SHALL 为半透明暗色，边框透明度降低

### Requirement: 站点应提供液态玻璃通用组件类

系统 SHALL 提供 `.glass-panel`、`.glass-btn`、`.glass-btn-primary`、`.glass-nav`、`.glass-nav-link`、`.glass-card`、`.glass-overlay` 等通用组件类，任何页面添加对应类名即可获得液态玻璃效果。

#### Scenario: 页面使用 glass-panel
- **WHEN** 页面元素添加了 `.glass-panel` 类
- **THEN** 该元素 SHALL 渲染半透明背景、大模糊、细边框和微光泽效果

#### Scenario: 页面使用 glass-btn
- **WHEN** 按钮添加了 `.glass-btn` 类
- **THEN** 该按钮 SHALL 渲染液态玻璃背景，悬停时有抬升和光泽增强

### Requirement: 液态玻璃效果应有降级方案

系统 SHALL 在 `backdrop-filter` 不支持时提供不透明背景回退，在 `prefers-reduced-motion` 下取消模糊和动画。

#### Scenario: 浏览器不支持 backdrop-filter
- **WHEN** 浏览器不支持 `backdrop-filter`
- **THEN** 玻璃组件 SHALL 使用不透明背景替代，不影响可读性

### Requirement: 主题变量和 reset 应集中定义

系统 SHALL 将全局 reset、主题变量、字体栈、`data-large-text`、`focus-visible`、`prefers-reduced-motion` 集中在一个基础样式文件中，其他 CSS 文件 SHALL 不重复定义这些规则。

#### Scenario: 基础样式文件被所有页面引用
- **WHEN** 用户打开站点任意页面
- **THEN** 页面 SHALL 引用统一的基础样式文件

### Requirement: 公共 JS 函数应封装为独立模块

系统 SHALL 将 `getCssVariable()`、`isMobile()`、`isTouchDevice()` 封装到一个共享 JS 文件中，游戏和笔记页面的 JS SHALL 引用该文件而非自行定义。

#### Scenario: 游戏 JS 使用共享工具函数
- **WHEN** billiards.js 或 snake.js 需要读取 CSS 变量
- **THEN** SHALL 调用 `utils.js` 中的 `getCssVar()` 而非内部定义的函数

### Requirement: 主题初始化脚本应为独立文件

系统 SHALL 将主题初始化逻辑提取为一个独立的同步加载脚本，所有 HTML 页面 SHALL 引用该脚本而非复制粘贴内联代码。

#### Scenario: 页面无内联主题初始化脚本
- **WHEN** 维护者查看任意 HTML 页面源码
- **THEN** 页面 SHALL 通过 `<script src>` 引用主题初始化脚本

### Requirement: 所有页面不应包含内联 style 属性

系统 SHALL 确保所有 HTML 页面的元素不使用 `style` 属性，所有样式通过 CSS 类实现。

#### Scenario: 维护者检查 HTML
- **WHEN** 维护者在所有 HTML 文件中搜索 `style=`
- **THEN** SHALL 无匹配结果（`display:none` 的初始隐藏状态除外）
