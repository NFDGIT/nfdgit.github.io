## ADDED Requirements

### Requirement: 组件状态切换应有统一过渡

系统 SHALL 提供统一的组件状态过渡变量（`--transition-fast: 150ms`、`--transition-normal: 300ms`、`--transition-slow: 500ms`），所有组件的状态切换（展开/折叠、显示/隐藏）SHALL 使用这些变量。

#### Scenario: 侧边栏展开使用统一过渡时长
- **WHEN** 用户展开笔记侧边栏
- **THEN** 展开动画 SHALL 使用 `var(--transition-normal)` 时长

#### Scenario: toast 出现使用统一过渡时长
- **WHEN** toast 通知出现
- **THEN** 淡入动画 SHALL 使用 `var(--transition-fast)` 时长

### Requirement: View Transition 应用于主题切换

系统 SHALL 在支持 `document.startViewTransition()` 的浏览器中，为主题切换添加交叉淡入过渡效果。

#### Scenario: 主题切换有平滑过渡
- **WHEN** 用户在支持 View Transition 的浏览器中切换主题
- **THEN** 页面 SHALL 以交叉淡入效果完成主题切换

#### Scenario: 不支持 View Transition 时正常降级
- **WHEN** 用户在不支持 View Transition 的浏览器中切换主题
- **THEN** 主题 SHALL 直接切换，无报错

### Requirement: 动画工具类应增加退场动画

系统 SHALL 提供退场动画工具类（`.anim-fade-out`、`.anim-slide-down`），用于元素移除前的过渡效果。

#### Scenario: toast 消失使用退场动画
- **WHEN** toast 通知需要消失
- **THEN** SHALL 以 `.anim-fade-out` 淡出后从 DOM 移除

## MODIFIED Requirements

### Requirement: 动画降级与可访问性

系统 SHALL 在用户系统偏好 `prefers-reduced-motion: reduce` 时，将所有动画和过渡时长设为 `0.01ms`（含新增的 View Transition 和组件状态过渡），保留功能语义但消除视觉晃动。同时 SHALL 设置 `::view-transition-*` 伪元素的 `animation-duration` 为 `0.01ms`。

#### Scenario: 用户开启减少动画偏好
- **WHEN** 用户操作系统设置了"减少动画"偏好
- **THEN** 页面上所有入场动画、退场动画、悬停过渡和 View Transition SHALL 立即完成，不产生可感知的运动

### Requirement: 悬停微交互增强

系统 SHALL 为卡片悬停提供柔和的发光阴影效果和图标缩放反馈，过渡时间 SHALL 使用 `var(--transition-fast)` token，不硬编码时长值。

#### Scenario: 用户悬停在首页卡片上
- **WHEN** 用户将鼠标悬停在任一卡片上
- **THEN** 卡片 SHALL 展示增强的阴影（发光效果）和轻微抬升，过渡时长为 `var(--transition-fast)`

#### Scenario: 卡片图标悬停缩放
- **WHEN** 用户悬停在包含图标的卡片上
- **THEN** 图标 SHALL 有轻微放大的过渡效果
