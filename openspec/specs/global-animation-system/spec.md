## Purpose

定义站点通用的 CSS 动画工具类、交互过渡规范和动画降级策略，覆盖入场动画、交错延迟、悬停微交互、动画降级与键盘焦点可见性。

## Requirements

### Requirement: 通用入场动画工具类

系统 SHALL 在共享样式表中提供一组 CSS 动画工具类（如 `.anim-fade-in`、`.anim-slide-up`、`.anim-scale-in`），页面元素添加对应类名后 SHALL 在加载时自动播放入场动画。

#### Scenario: 卡片使用淡入动画
- **WHEN** 页面中某元素添加了 `.anim-fade-in` 类
- **THEN** 该元素 SHALL 从透明到不透明播放淡入动画

#### Scenario: 卡片使用上滑入场动画
- **WHEN** 页面中某元素添加了 `.anim-slide-up` 类
- **THEN** 该元素 SHALL 从下方偏移位置向上滑入并淡入

### Requirement: 交错延迟机制

系统 SHALL 提供交错延迟工具类（如 `.stagger-1` 到 `.stagger-6`），使同组元素的入场动画呈依次展开的视觉效果。

#### Scenario: 多张卡片交错入场
- **WHEN** 页面中多个卡片分别设置了 `.stagger-1`、`.stagger-2`、`.stagger-3`
- **THEN** 各卡片 SHALL 按递增的延迟时间依次播放入场动画

### Requirement: 悬停微交互增强

系统 SHALL 为卡片悬停提供柔和的发光阴影效果和图标缩放反馈，过渡时间统一使用平滑缓动。

#### Scenario: 用户悬停在首页卡片上
- **WHEN** 用户将鼠标悬停在任一卡片上
- **THEN** 卡片 SHALL 展示增强的阴影（发光效果）和轻微抬升，且过渡平滑

#### Scenario: 卡片图标悬停缩放
- **WHEN** 用户悬停在包含图标的卡片上
- **THEN** 图标 SHALL 有轻微放大的过渡效果

### Requirement: 动画降级与可访问性

系统 SHALL 在用户系统偏好 `prefers-reduced-motion: reduce` 时，将所有动画和过渡时长缩减到接近零，保留功能语义但消除视觉晃动。

#### Scenario: 用户开启减少动画偏好
- **WHEN** 用户操作系统设置了"减少动画"偏好
- **THEN** 页面上所有入场动画和悬停过渡 SHALL 立即完成，不产生可感知的运动

### Requirement: 键盘焦点可见性

系统 SHALL 为所有可交互元素提供 `:focus-visible` 样式，使键盘导航时焦点轮廓清晰可见。

#### Scenario: 用户通过 Tab 键导航
- **WHEN** 用户使用键盘 Tab 键聚焦到按钮或链接
- **THEN** 该元素 SHALL 显示明显的焦点轮廓，与背景形成对比
