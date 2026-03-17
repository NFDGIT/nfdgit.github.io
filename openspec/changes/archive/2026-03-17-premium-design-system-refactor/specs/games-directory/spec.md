# games-directory（变更增量）

## MODIFIED Requirements

### Requirement: 游戏目录页导航应使用统一组件

系统 SHALL 让游戏目录页的导航链接和按钮使用基础样式文件中定义的液态玻璃组件类（`.glass-nav-link`、`.glass-btn`），而非在 `games.css` 中单独定义。

#### Scenario: 游戏目录导航使用液态玻璃

- **WHEN** 用户查看游戏目录页的导航区
- **THEN** 导航链接 SHALL 使用液态玻璃按钮风格，与站点其他页面一致
