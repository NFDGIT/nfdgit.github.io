# design-system（变更增量）

## ADDED Requirements

### Requirement: glass-nav 应有移动端响应式适配

系统 SHALL 在 `≤768px` 时为 `.glass-nav` 缩小 padding 和 gap，并通过 `.has-glass-nav` body 类为页面内容提供顶部避让空间，防止内容被固定导航遮挡。

#### Scenario: 移动端内容不被导航遮挡

- **WHEN** 用户在移动端打开使用 `.glass-nav` 的页面
- **THEN** 页面首屏内容 SHALL 不被固定导航栏遮挡

#### Scenario: glass-nav 移动端缩紧

- **WHEN** 页面宽度 ≤768px
- **THEN** `.glass-nav` SHALL 缩小 padding 和间距，适配窄屏
