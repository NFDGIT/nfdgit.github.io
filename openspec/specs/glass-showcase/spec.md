## Purpose

定义液态玻璃组件演示库页面的结构、内容和交互要求。

## Requirements

### Requirement: 演示页应展示所有液态玻璃面板变体

系统 SHALL 在演示页中展示 `.glass-panel` 的多种变体：不同圆角（sm/md/lg）、不同模糊强度、嵌套面板效果。

#### Scenario: 用户查看面板区段
- **WHEN** 用户滚动到面板演示区段
- **THEN** 页面 SHALL 展示至少 3 种面板变体，可观察到半透明背景与模糊效果

### Requirement: 演示页应展示所有液态玻璃卡片变体

系统 SHALL 展示 `.glass-card` 的多种用法：基础卡片、带图标卡片、带图片卡片，并展示悬停效果。

#### Scenario: 用户悬停在演示卡片上
- **WHEN** 用户将鼠标悬停在某演示卡片上
- **THEN** 卡片 SHALL 展示抬升和发光阴影效果

### Requirement: 演示页应展示所有液态玻璃按钮变体

系统 SHALL 展示 `.glass-btn` 的变体：默认按钮、主色按钮、药丸圆角按钮、图标按钮、按钮组、禁用态。

#### Scenario: 用户查看按钮区段
- **WHEN** 用户查看按钮演示区
- **THEN** 页面 SHALL 展示至少 4 种按钮变体，各自可交互

### Requirement: 演示页应展示 overlay 交互

系统 SHALL 提供一个可触发的 `.glass-overlay` 演示，用户点击按钮后 SHALL 显示覆盖层，点击关闭按钮后 SHALL 隐藏。

#### Scenario: 用户触发 overlay
- **WHEN** 用户点击"显示 Overlay"按钮
- **THEN** 页面 SHALL 显示液态玻璃 overlay，包含标题、内容和关闭按钮

#### Scenario: 用户关闭 overlay
- **WHEN** 用户点击 overlay 中的关闭按钮
- **THEN** overlay SHALL 平滑消失

### Requirement: 演示页应展示输入框组件

系统 SHALL 展示 `.glass-input` 输入框组件，包括文本输入框、搜索框和文本区域。

#### Scenario: 用户查看输入框区段
- **WHEN** 用户查看输入框演示区
- **THEN** 页面 SHALL 展示带液态玻璃背景和焦点高亮的输入框

### Requirement: 演示页应展示设计令牌

系统 SHALL 展示所有设计令牌的实际渲染效果：颜色色板、阴影层级、圆角尺寸对比、模糊程度对比。

#### Scenario: 用户查看令牌区段
- **WHEN** 用户查看设计令牌区
- **THEN** 页面 SHALL 以色块、示例框等形式直观展示各令牌值

### Requirement: 演示页应展示动画效果

系统 SHALL 展示 `anim-fade-in`、`anim-slide-up`、`anim-scale-in` 和 `stagger` 效果，并提供重播按钮。

#### Scenario: 用户点击重播按钮
- **WHEN** 用户点击动画演示区的"重播"按钮
- **THEN** 动画元素 SHALL 重新播放入场动画

### Requirement: 演示页应支持亮暗主题并排对比

系统 SHALL 在演示页中提供亮/暗双栏并排展示，让用户同时观察同一组件在两种主题下的效果。

#### Scenario: 用户查看主题对比区
- **WHEN** 用户查看主题对比区段
- **THEN** 页面 SHALL 左右并排展示同一组件的亮色和暗色版本

### Requirement: 演示页应有彩色渐变背景

系统 SHALL 使用多色渐变背景，使液态玻璃的半透明和模糊效果充分可见。

#### Scenario: 用户打开演示页
- **WHEN** 用户打开演示库页面
- **THEN** 页面背景 SHALL 为多色渐变效果，凸显玻璃组件的半透明质感

### Requirement: 首页应有演示库入口

系统 SHALL 在首页卡片网格中添加一个指向演示库的入口卡片。

#### Scenario: 用户从首页进入演示库
- **WHEN** 用户在首页点击演示库卡片
- **THEN** 系统 SHALL 导航到演示库页面
