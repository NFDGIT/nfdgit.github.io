## Purpose

定义保险落地页的结构、排版、联系入口和响应式布局要求。

## Requirements

### Requirement: 保险页应有结构化的 hero 区

系统 SHALL 在保险页顶部展示 hero 区域，包含页面标题、副标题描述和至少一个联系方式按钮（电话或在线咨询），使用户在首屏即可了解服务内容和联系方式。

#### Scenario: 用户打开保险页
- **WHEN** 用户访问保险页面
- **THEN** 页面 SHALL 显示包含标题、描述和联系按钮的 hero 区域

### Requirement: 产品展示应以卡片形式呈现

系统 SHALL 将产品图片包装为带标题、描述和圆角阴影的卡片，而非直接全宽铺满。卡片 SHALL 支持悬停效果。

#### Scenario: 用户浏览产品区
- **WHEN** 用户滚动到产品展示区域
- **THEN** 各产品 SHALL 以卡片形式展示，包含产品图片、名称和简要描述

#### Scenario: 用户悬停在产品卡片
- **WHEN** 用户将鼠标悬停在某产品卡片上
- **THEN** 卡片 SHALL 展示悬停效果（阴影增强和轻微抬升）

### Requirement: 联系方式应清晰可达且不遮挡内容

系统 SHALL 在 hero 区提供联系按钮（电话拨打、QQ 咨询），移动端 SHALL 在页面底部提供固定联系条。联系入口 SHALL 不以浮动小窗的形式遮挡页面主内容。

#### Scenario: 用户在桌面端查找联系方式
- **WHEN** 用户在桌面端访问保险页
- **THEN** hero 区 SHALL 包含可点击的电话和 QQ 联系按钮

#### Scenario: 用户在移动端查找联系方式
- **WHEN** 用户在移动端访问保险页
- **THEN** 页面底部 SHALL 有固定联系条，包含电话和 QQ 入口，不遮挡主要内容区

### Requirement: 保险页应完全适配暗色主题

系统 SHALL 确保保险页在暗色主题下所有文字、背景、卡片和按钮使用主题变量渲染，无硬编码白色或浅色背景。

#### Scenario: 用户切换到暗色主题
- **WHEN** 用户在保险页切换到暗色主题
- **THEN** 页面所有区域 SHALL 使用暗色主题变量，无刺眼的白色区块

### Requirement: 保险页应无内联样式

系统 SHALL 将所有样式外部化到 CSS 文件中，`insurance/index.html` 中 SHALL 不包含 `style` 属性。

#### Scenario: 维护者检查 HTML
- **WHEN** 维护者查看 `insurance/index.html` 源码
- **THEN** 页面元素 SHALL 不包含 `style` 属性，所有样式通过 CSS 类实现

### Requirement: 保险页应有入场动画

系统 SHALL 为 hero 区和产品卡片添加入场动画，使页面加载时元素依次展现而非同时闪现。

#### Scenario: 用户首次加载保险页
- **WHEN** 用户打开保险页
- **THEN** hero 区 SHALL 以淡入动画展示，产品卡片 SHALL 以交错上滑动画展示

### Requirement: 保险页应适配移动端

系统 SHALL 在窄屏设备上将产品卡片改为单列布局，CTA 按钮全宽，确保可读性和可操作性。

#### Scenario: 用户在窄屏设备访问
- **WHEN** 用户在窄屏设备上打开保险页
- **THEN** 产品卡片 SHALL 单列展示，按钮 SHALL 足够大便于触控操作
