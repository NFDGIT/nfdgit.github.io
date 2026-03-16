# games-organization（变更增量）

## MODIFIED Requirements

### Requirement: 游戏相关文件应按职责清晰归类

系统 SHALL 对 `games/` 下的页面、共享资源和单个游戏专有资源进行清晰归类，使维护者能够通过目录结构快速理解各文件用途。`games/` 目录下 SHALL 不存在仅做跳转的冗余 HTML 文件，也 SHALL 不存在已退役的 `legacy/` 目录。

#### Scenario: 维护者查看游戏目录

- **WHEN** 维护者查看 `games/` 目录结构
- **THEN** 目录 SHALL 能区分正式页面文件、共享资源和单个游戏专有资源，且不包含 `snake.html`、`racing.html` 等仅做跳转的冗余文件

#### Scenario: legacy 目录不再存在

- **WHEN** 维护者查看 `games/` 目录
- **THEN** 目录 SHALL 不包含 `legacy/` 子目录

### Requirement: 历史遗留文件应退出正式导航路径

系统 SHALL 将历史遗留、命名不清晰或不再面向用户的文件移出正式导航路径，避免用户误入非正式内容。`games/legacy/` 目录 SHALL 被完全删除。

#### Scenario: 用户通过站点导航浏览小游戏

- **WHEN** 用户从首页或游戏目录页进入小游戏模块
- **THEN** 系统 SHALL 不把历史遗留文件作为可见导航入口展示给用户

#### Scenario: legacy 目录已被删除

- **WHEN** 用户或维护者尝试访问 `games/legacy/` 路径
- **THEN** 该路径 SHALL 不再存在于仓库中

## REMOVED Requirements

### Requirement: 冗余跳转文件

**Reason**: `games/snake.html` 和 `games/racing.html` 仅包含跳转逻辑，各游戏已有 `<game>/index.html` 作为正式入口，跳转文件冗余。
**Migration**: 所有指向 `games/snake.html` 或 `games/racing.html` 的链接 SHALL 直接指向 `games/snake/index.html` 和 `games/racing/index.html`。
