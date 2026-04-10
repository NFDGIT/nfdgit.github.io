## REMOVED Requirements

### Requirement: 相册 3D 立方体应居中显示
**Reason**: 3D 立方体布局被响应式网格画廊取代。新的 `responsive-album` 能力提供了更好的移动端适配和图片浏览体验。
**Migration**: 使用 `responsive-album` 能力中定义的 CSS Grid 响应式布局 + 灯箱预览替代 3D 立方体。

### Requirement: 相册页面应适配移动端
**Reason**: 此需求被 `responsive-album` 能力中更完善的响应式布局方案取代。
**Migration**: 使用 `responsive-album` 能力中定义的响应式网格，自动适配各种屏幕尺寸。

## ADDED Requirements

### Requirement: 相册页应使用统一 Shell

系统 SHALL 在相册页通过 Shell 注入统一导航栏和面包屑（「首页 > 相册」），替代当前独立实现的导航。

#### Scenario: 相册页导航栏
- **WHEN** 用户打开相册页
- **THEN** 页面 SHALL 显示统一 Shell 导航栏和面包屑

### Requirement: 相册页应使用设计系统主题

系统 SHALL 确保相册页在亮色和暗色主题下均正常显示，图片网格背景和灯箱遮罩 SHALL 使用主题 token。

#### Scenario: 暗色主题下查看相册
- **WHEN** 用户在暗色主题下打开相册页
- **THEN** 页面背景和网格间距 SHALL 使用暗色主题 token 渲染
