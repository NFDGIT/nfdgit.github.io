# theme（变更增量）

## ADDED Requirements

### Requirement: 全局 focus-visible 焦点样式

系统 SHALL 在共享样式中定义 `:focus-visible` 规则，为所有可交互元素（按钮、链接、输入框）提供统一的焦点轮廓，确保键盘导航可用性。

#### Scenario: 按钮获得键盘焦点

- **WHEN** 用户通过 Tab 键聚焦到任一按钮
- **THEN** 按钮 SHALL 显示与当前主题适配的焦点轮廓

### Requirement: prefers-reduced-motion 全局降级

系统 SHALL 在 `@media (prefers-reduced-motion: reduce)` 下将所有 `animation-duration` 和 `transition-duration` 设为极短值，实现动画降级。

#### Scenario: 系统偏好减少动画时页面不晃动

- **WHEN** 用户系统设置了减少动画偏好
- **THEN** 页面中所有过渡和动画 SHALL 近乎瞬间完成
