# billiards-game（变更增量）

## MODIFIED Requirements

### Requirement: 台球游戏 UI 面板应使用统一设计系统

系统 SHALL 让台球游戏的信息面板、按钮、overlay 使用基础样式文件中定义的液态玻璃组件类（`.glass-panel`、`.glass-btn`、`.glass-overlay`），而非在 `billiards.css` 中单独定义面板和 overlay 样式。

#### Scenario: 台球面板使用液态玻璃

- **WHEN** 用户查看台球游戏的信息面板
- **THEN** 面板 SHALL 使用液态玻璃效果，与站点其他页面的面板风格一致
