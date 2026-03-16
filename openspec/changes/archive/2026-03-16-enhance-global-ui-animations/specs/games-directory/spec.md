# games-directory（变更增量）

## ADDED Requirements

### Requirement: 游戏卡片入场动画

系统 SHALL 让游戏目录页中的游戏卡片在页面加载时以交错入场动画展示，而非同时闪现。

#### Scenario: 用户打开游戏目录页

- **WHEN** 用户打开游戏目录页
- **THEN** 各游戏卡片 SHALL 以依次延迟的入场动画展示

### Requirement: 游戏卡片悬停微交互

系统 SHALL 为游戏目录页中的卡片提供悬停时的发光阴影和图标缩放反馈。

#### Scenario: 用户悬停在游戏卡片上

- **WHEN** 用户将鼠标悬停在游戏目录页的某张卡片上
- **THEN** 卡片 SHALL 展示发光阴影效果，且卡片内的图标 SHALL 有轻微放大动画
