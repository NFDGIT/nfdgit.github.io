## ADDED Requirements

### Requirement: 所有交互元素应有 ARIA 标注

系统 SHALL 为所有非语义化的交互元素提供 `aria-label` 或 `aria-labelledby` 属性，确保屏幕阅读器用户能理解元素用途。

#### Scenario: 主题切换按钮有 ARIA 标注
- **WHEN** 屏幕阅读器聚焦到主题切换按钮
- **THEN** 按钮 SHALL 播报"切换到暗色主题"或"切换到亮色主题"（根据当前状态）

#### Scenario: 汉堡菜单按钮有 ARIA 标注
- **WHEN** 屏幕阅读器聚焦到汉堡菜单按钮
- **THEN** 按钮 SHALL 播报"打开导航菜单"或"关闭导航菜单"

### Requirement: 键盘导航应覆盖所有功能

系统 SHALL 确保站点所有功能均可通过键盘完成，Tab 键可依次聚焦所有交互元素，Enter/Space 可激活按钮和链接。

#### Scenario: 用户通过键盘浏览首页
- **WHEN** 用户在首页使用 Tab 键导航
- **THEN** 焦点 SHALL 依次经过导航链接、主题切换、各卡片链接，顺序合理

#### Scenario: 用户通过键盘操作灯箱
- **WHEN** 用户在灯箱打开时使用键盘
- **THEN** 左/右方向键 SHALL 切换图片，Escape 键 SHALL 关闭灯箱

### Requirement: 焦点管理应合理

系统 SHALL 在打开模态框/灯箱/菜单时将焦点移至该组件内部，关闭时将焦点恢复到触发元素。焦点 SHALL 被陷阱（trap）在模态组件内部，不逃逸到背景内容。

#### Scenario: 打开灯箱后焦点转移
- **WHEN** 用户通过键盘打开灯箱
- **THEN** 焦点 SHALL 移至灯箱的关闭按钮或第一个可交互元素

#### Scenario: 关闭菜单后焦点恢复
- **WHEN** 用户关闭汉堡菜单
- **THEN** 焦点 SHALL 恢复到汉堡菜单按钮

### Requirement: 页面应有正确的语义化标签

系统 SHALL 使用语义化 HTML 标签（`<nav>`、`<main>`、`<header>`、`<footer>`、`<article>`、`<section>`），每个页面 SHALL 有且仅有一个 `<main>` 元素。

#### Scenario: 屏幕阅读器识别页面结构
- **WHEN** 屏幕阅读器解析页面
- **THEN** SHALL 能识别导航（nav）、主内容（main）、页头（header）、页脚（footer）等地标区域

### Requirement: 图片应有替代文本

系统 SHALL 为所有内容图片提供描述性 `alt` 属性，装饰性图片 SHALL 使用 `alt=""`。

#### Scenario: 相册图片有描述
- **WHEN** 屏幕阅读器聚焦到相册中的图片
- **THEN** SHALL 播报图片的描述性替代文本

### Requirement: 颜色对比度应符合 WCAG AA 标准

系统 SHALL 确保所有文本与其背景的颜色对比度不低于 4.5:1（正文）或 3:1（大号文本），在亮色和暗色主题下均满足。

#### Scenario: 暗色主题下文本可读
- **WHEN** 用户在暗色主题下阅读正文
- **THEN** 文本与背景的对比度 SHALL 不低于 4.5:1
