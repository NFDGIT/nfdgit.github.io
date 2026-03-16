# games-directory（变更增量）

## MODIFIED Requirements

### Requirement: 游戏目录页应展示可玩的游戏列表

系统 SHALL 提供一个游戏目录页，用于展示当前可游玩的游戏名称、简要说明以及进入具体游戏页面的入口。目录页中的游戏链接 SHALL 直接指向各游戏的 `<game>/index.html`，不经过中间跳转文件。

#### Scenario: 用户访问游戏目录页

- **WHEN** 用户打开 `games/` 目录页
- **THEN** 页面 SHALL 展示至少一个游戏卡片或列表项，并为每个游戏提供直接指向 `<game>/index.html` 的可点击入口

#### Scenario: 用户查看多个游戏入口

- **WHEN** 目录页中存在多个游戏
- **THEN** 系统 SHALL 为每个游戏展示可区分的名称或描述，帮助用户选择

#### Scenario: 链接不经过跳转文件

- **WHEN** 用户在游戏目录页点击某游戏入口
- **THEN** 系统 SHALL 直接导航到该游戏的 `<game>/index.html`，不经过 `games/<game>.html` 跳转
