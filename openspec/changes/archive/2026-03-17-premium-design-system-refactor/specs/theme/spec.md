# theme（变更增量）

## MODIFIED Requirements

### Requirement: Theme toggle control visibility

系统 SHALL 在共享基础样式文件中统一定义 `.theme-toggle` 样式（液态玻璃风格），所有页面 SHALL 引用同一份定义，不在各自的 CSS 中重复定义。

#### Scenario: 主题切换按钮样式一致

- **WHEN** 用户在任意页面看到主题切换按钮
- **THEN** 按钮 SHALL 使用统一的液态玻璃样式（半透明背景、模糊、圆角）
