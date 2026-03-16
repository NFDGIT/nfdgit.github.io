## Purpose

定义 `games/` 目录的文件组织能力，覆盖正式入口暴露范围、文件按职责归类、目录规整后游戏页可访问性，以及历史遗留文件的导航隔离。

## Requirements

### Requirement: 游戏目录应只暴露整理后的正式入口

系统 SHALL 让 `games/` 目录页只展示整理后的正式游戏入口，而不是把历史遗留页面、测试文件或无关资源暴露给用户。

#### Scenario: 用户访问游戏目录页
- **WHEN** 用户打开游戏目录页
- **THEN** 页面 SHALL 只展示正式可玩的游戏入口和必要说明

### Requirement: 游戏相关文件应按职责清晰归类

系统 SHALL 对 `games/` 下的页面、共享资源和单个游戏专有资源进行清晰归类，使维护者能够通过目录结构快速理解各文件用途。`games/` 目录下 SHALL 不存在仅做跳转的冗余 HTML 文件，也 SHALL 不存在已退役的 `legacy/` 目录。

#### Scenario: 维护者查看游戏目录
- **WHEN** 维护者查看 `games/` 目录结构
- **THEN** 目录 SHALL 能区分正式页面文件、共享资源和单个游戏专有资源，且不包含 `snake.html`、`racing.html` 等仅做跳转的冗余文件

#### Scenario: legacy 目录不再存在
- **WHEN** 维护者查看 `games/` 目录
- **THEN** 目录 SHALL 不包含 `legacy/` 子目录

### Requirement: 规整后正式游戏页仍应可访问

系统 SHALL 在目录规整后保持现有正式游戏页可访问，并确保它们依赖的脚本、样式和图片路径有效。

#### Scenario: 用户从目录进入正式游戏
- **WHEN** 用户从游戏目录页进入任意正式游戏页面
- **THEN** 页面 SHALL 成功加载并展示该游戏所需的界面与资源

#### Scenario: 用户直接访问正式游戏页面
- **WHEN** 用户直接打开正式游戏页面链接
- **THEN** 页面 SHALL 仍然可访问，且不因目录规整导致空白或资源丢失

### Requirement: 历史遗留文件应退出正式导航路径

系统 SHALL 将历史遗留、命名不清晰或不再面向用户的文件移出正式导航路径，避免用户误入非正式内容。`games/legacy/` 目录 SHALL 被完全删除。

#### Scenario: 用户通过站点导航浏览小游戏
- **WHEN** 用户从首页或游戏目录页进入小游戏模块
- **THEN** 系统 SHALL 不把历史遗留文件作为可见导航入口展示给用户

#### Scenario: legacy 目录已被删除
- **WHEN** 用户或维护者尝试访问 `games/legacy/` 路径
- **THEN** 该路径 SHALL 不再存在于仓库中
