## ADDED Requirements

### Requirement: 演示页应展示布局组件

系统 SHALL 在演示页新增布局组件区段，展示 `.glass-layout`、`.glass-sidebar`、`.glass-content` 的组合效果。

#### Scenario: 用户查看布局组件区段
- **WHEN** 用户查看布局组件演示区
- **THEN** 页面 SHALL 展示侧边栏+内容区的双栏布局示例

### Requirement: 演示页应展示表单组件

系统 SHALL 在演示页新增表单组件区段，展示 `.glass-input`、`.glass-select`、`.glass-textarea`、`.glass-checkbox`、`.glass-radio` 的效果。

#### Scenario: 用户查看表单组件区段
- **WHEN** 用户查看表单组件演示区
- **THEN** 页面 SHALL 展示各类表单控件的液态玻璃风格

### Requirement: 演示页应展示反馈组件

系统 SHALL 在演示页新增反馈组件区段，展示 `.glass-toast` 和 `.glass-loading` 的效果，toast 提供触发按钮。

#### Scenario: 用户触发 toast 演示
- **WHEN** 用户点击"显示 Toast"按钮
- **THEN** 页面 SHALL 显示液态玻璃风格的 toast 通知

### Requirement: 演示页应展示设计 token 完整列表

系统 SHALL 在令牌区段展示所有新增的 token：间距系列、阴影层级系列、过渡时长系列，以及原有的颜色、圆角、模糊 token。

#### Scenario: 用户查看间距 token
- **WHEN** 用户查看设计令牌区的间距部分
- **THEN** 页面 SHALL 以可视化方式展示 xs 到 2xl 各级间距的实际大小

## MODIFIED Requirements

### Requirement: 演示页应展示所有液态玻璃面板变体

系统 SHALL 在演示页中展示 `.glass-panel` 的多种变体：不同圆角（sm/md/lg）、不同模糊强度、嵌套面板效果。所有面板 SHALL 使用 `tokens.css` 中定义的圆角和阴影 token。

#### Scenario: 用户查看面板区段
- **WHEN** 用户滚动到面板演示区段
- **THEN** 页面 SHALL 展示至少 3 种面板变体，可观察到半透明背景与模糊效果

### Requirement: 首页应有演示库入口

系统 SHALL 通过首页卡片网格中的入口卡片指向演示库。首页 Shell 统一导航栏 SHALL 不单独包含演示库链接（通过卡片入口访问即可）。

#### Scenario: 用户从首页进入演示库
- **WHEN** 用户在首页点击"组件库"卡片
- **THEN** 系统 SHALL 导航到演示库页面
