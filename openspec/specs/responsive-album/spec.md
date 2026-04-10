## ADDED Requirements

### Requirement: 相册应使用响应式网格布局

系统 SHALL 将相册页面从 CSS 3D 盒子替换为响应式网格（CSS Grid）布局，图片 SHALL 按网格排列，列数根据视口宽度自适应。

#### Scenario: 桌面端查看相册
- **WHEN** 用户在桌面端（宽度 > 768px）打开相册
- **THEN** 图片 SHALL 以多列网格排列（3-4 列），各图片等宽展示

#### Scenario: 移动端查看相册
- **WHEN** 用户在移动端（宽度 ≤ 768px）打开相册
- **THEN** 图片 SHALL 以 1-2 列网格排列，适配小屏

### Requirement: 相册应支持灯箱预览

系统 SHALL 在用户点击图片时以灯箱（lightbox）形式全屏预览，灯箱 SHALL 支持左右切换上/下一张图片和关闭操作。

#### Scenario: 用户点击图片
- **WHEN** 用户点击相册中的某张图片
- **THEN** 系统 SHALL 以全屏灯箱形式展示该图片，背景为半透明遮罩

#### Scenario: 用户在灯箱中切换图片
- **WHEN** 用户在灯箱中点击左/右箭头（或按键盘方向键）
- **THEN** 灯箱 SHALL 切换显示上/下一张图片

#### Scenario: 用户关闭灯箱
- **WHEN** 用户点击灯箱关闭按钮或按 Escape 键
- **THEN** 灯箱 SHALL 关闭，回到网格视图

### Requirement: 灯箱应支持触摸手势

系统 SHALL 在移动端支持左右滑动手势切换图片，支持双指捏合缩放图片。

#### Scenario: 用户左滑切换图片
- **WHEN** 用户在灯箱中向左滑动
- **THEN** 灯箱 SHALL 切换到下一张图片

#### Scenario: 用户双指缩放图片
- **WHEN** 用户在灯箱中双指捏合
- **THEN** 图片 SHALL 按手势方向放大或缩小

### Requirement: 相册图片应懒加载

系统 SHALL 对非首屏图片使用懒加载（`loading="lazy"` 或 Intersection Observer），仅在图片即将进入视口时才加载。

#### Scenario: 页面首次加载
- **WHEN** 用户打开相册页面
- **THEN** 仅首屏可见的图片 SHALL 立即加载，其余图片 SHALL 在滚动到附近时才加载

### Requirement: 图片加载过程应有占位效果

系统 SHALL 在图片加载过程中显示占位色块或骨架屏效果，避免布局跳动。

#### Scenario: 图片正在加载
- **WHEN** 某张图片尚在加载中
- **THEN** 该位置 SHALL 显示与图片容器等大的占位色块
