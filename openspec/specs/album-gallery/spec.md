## Purpose

定义相册页面的布局、响应式和交互要求。

## Requirements

### Requirement: 相册 3D 立方体应居中显示

系统 SHALL 使用 flexbox 居中将 3D 立方体在视口中居中显示，确保在任意屏幕宽度下都位于页面中央。

#### Scenario: 用户在桌面端访问相册
- **WHEN** 用户在桌面端打开相册页面
- **THEN** 3D 立方体 SHALL 水平和垂直居中于视口

#### Scenario: 用户在移动端访问相册
- **WHEN** 用户在窄屏设备打开相册页面
- **THEN** 3D 立方体 SHALL 自动缩小以适配屏幕宽度，保持居中且不溢出

### Requirement: 相册页面应适配移动端

系统 SHALL 使用视口相对单位控制 3D 立方体尺寸，确保在竖屏和横屏下都有合理的展示大小。

#### Scenario: 用户旋转设备
- **WHEN** 用户在移动端旋转设备方向
- **THEN** 3D 立方体 SHALL 自动调整大小以适配新的视口比例
