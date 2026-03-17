# note-browser（变更增量）

## MODIFIED Requirements

### Requirement: 笔记浏览器侧边栏应使用统一设计系统

系统 SHALL 让笔记浏览器的侧边栏、控件按钮和面板使用基础样式文件中定义的液态玻璃组件类，而非在 `note-browser.css` 中重复定义主题切换、大字模式等按钮样式。

#### Scenario: 侧边栏使用液态玻璃风格

- **WHEN** 用户查看笔记浏览器侧边栏
- **THEN** 侧边栏 SHALL 使用液态玻璃面板效果，与站点其他页面的面板风格一致
