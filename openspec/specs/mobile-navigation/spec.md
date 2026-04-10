## ADDED Requirements

### Requirement: 移动端应使用汉堡菜单

系统 SHALL 在移动端（宽度 ≤ 768px）将导航栏折叠为汉堡菜单图标，点击后展开全屏或半屏导航菜单。

#### Scenario: 用户在移动端查看导航
- **WHEN** 用户在移动端查看页面导航栏
- **THEN** 导航链接 SHALL 隐藏，仅显示汉堡菜单图标和主题切换按钮

#### Scenario: 用户点击汉堡菜单
- **WHEN** 用户点击汉堡菜单图标
- **THEN** 导航菜单 SHALL 以滑入动画展开，显示所有页面链接

#### Scenario: 用户关闭汉堡菜单
- **WHEN** 用户点击关闭按钮或菜单外区域
- **THEN** 导航菜单 SHALL 以滑出动画收起

### Requirement: 汉堡菜单应有遮罩层

系统 SHALL 在汉堡菜单展开时显示半透明遮罩层覆盖页面内容，点击遮罩层 SHALL 关闭菜单。

#### Scenario: 用户点击遮罩层
- **WHEN** 汉堡菜单展开后用户点击遮罩层
- **THEN** 菜单 SHALL 关闭，遮罩层消失

### Requirement: 移动端应适配安全区域

系统 SHALL 使用 `env(safe-area-inset-*)` 适配 iOS 刘海屏和全面屏设备的安全区域，导航栏和底部固定元素 SHALL 不被系统 UI 遮挡。

#### Scenario: 用户在 iPhone 上查看页面
- **WHEN** 用户在有刘海的 iPhone 上打开页面
- **THEN** 导航栏内容 SHALL 不被刘海区域遮挡

#### Scenario: 底部固定元素适配安全区域
- **WHEN** 用户在有底部安全区域的设备上查看页面
- **THEN** 底部固定元素（如保险页联系条）SHALL 不被系统 Home 指示器遮挡

### Requirement: 桌面端应使用水平导航

系统 SHALL 在桌面端（宽度 > 768px）将导航链接水平排列在导航栏中，不显示汉堡菜单图标。

#### Scenario: 用户在桌面端查看导航
- **WHEN** 用户在桌面端查看页面
- **THEN** 导航栏 SHALL 水平显示所有页面链接，汉堡菜单图标不可见

### Requirement: 菜单展开时应阻止背景滚动

系统 SHALL 在汉堡菜单展开时阻止页面背景滚动（`body` 添加 `overflow: hidden`），关闭菜单后恢复。

#### Scenario: 用户在菜单展开时滚动
- **WHEN** 汉堡菜单展开后用户尝试滚动
- **THEN** 页面背景 SHALL 不滚动，仅菜单内容可滚动（如菜单项过多）
