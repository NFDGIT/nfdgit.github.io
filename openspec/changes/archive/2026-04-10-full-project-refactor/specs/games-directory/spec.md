## ADDED Requirements

### Requirement: 游戏页面应使用统一 Shell 面包屑

系统 SHALL 在游戏目录页和各游戏子页面通过 Shell 配置声明面包屑路径，替代各页面独立实现的返回链接。

#### Scenario: 游戏目录页面包屑
- **WHEN** 用户在游戏目录页
- **THEN** 面包屑 SHALL 显示「首页 > 小游戏」

#### Scenario: 具体游戏页面包屑
- **WHEN** 用户在贪吃蛇游戏页
- **THEN** 面包屑 SHALL 显示「首页 > 小游戏 > 贪吃蛇」，"小游戏"可点击返回目录

## MODIFIED Requirements

### Requirement: 具体游戏页应支持返回游戏目录

系统 SHALL 通过统一 Shell 的面包屑导航提供返回游戏目录的入口（替代此前各页面独立的"返回"链接），面包屑中"小游戏"链接 SHALL 指向游戏目录页。

#### Scenario: 用户从具体游戏返回目录
- **WHEN** 用户位于任意具体游戏页面并点击面包屑中的"小游戏"
- **THEN** 系统 SHALL 导航到游戏目录页

### Requirement: 游戏目录页导航应使用统一组件

系统 SHALL 让游戏目录页使用统一 Shell 注入的导航栏（替代此前独立实现的导航），导航栏 SHALL 使用液态玻璃组件类。

#### Scenario: 游戏目录导航使用液态玻璃
- **WHEN** 用户查看游戏目录页的导航区
- **THEN** 导航栏 SHALL 为 Shell 统一注入的液态玻璃风格导航

### Requirement: 游戏目录页与具体游戏页应保持移动端可用

系统 SHALL 让游戏目录页和具体游戏页在移动端使用统一 Shell 的汉堡菜单导航，游戏卡片 SHALL 在移动端以单列布局展示。

#### Scenario: 用户在窄屏设备访问目录页
- **WHEN** 用户在窄屏设备上打开游戏目录页
- **THEN** 页面 SHALL 使用汉堡菜单导航，游戏卡片以单列展示

#### Scenario: 用户在具体游戏页查看导航
- **WHEN** 用户在移动端打开具体游戏页
- **THEN** 页面 SHALL 显示统一 Shell 导航栏和面包屑
