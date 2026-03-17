# theme（变更增量）

## ADDED Requirements

### Requirement: 全站移动端断点应统一

系统 SHALL 统一使用 `768px` 作为主要移动端断点，`480px` 作为超小屏辅助断点，各页面的 CSS 媒体查询 SHALL 不使用 700px、640px、560px 等非标准断点。

#### Scenario: 维护者检查断点一致性

- **WHEN** 维护者在所有 CSS 文件中搜索 `max-width` 媒体查询
- **THEN** 主要移动端断点 SHALL 统一为 `768px`
