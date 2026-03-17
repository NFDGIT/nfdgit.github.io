# note-browser（变更增量）

## MODIFIED Requirements

### Requirement: 移动端工具条应保留返回首页入口

系统 SHALL 在移动端工具条中保留返回首页入口，在空间不足时 SHALL 以图标形式（如 `←`）展示，而非完全隐藏。

#### Scenario: 用户在移动端需要返回首页

- **WHEN** 用户在移动端的笔记页想返回首页
- **THEN** 工具条 SHALL 显示一个可点击的返回首页入口（图标或文字）
