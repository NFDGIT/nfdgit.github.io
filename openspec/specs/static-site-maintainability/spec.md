# static-site-maintainability

## Purpose

约定本仓库在**无构建工具**前提下，共享 JavaScript/CSS 与根文档的组织方式，使代码易于导航、审阅与增量修改，且不依赖单文件超长脚本作为唯一真相来源。

## Requirements

### Requirement: 笔记浏览器脚本须按职责拆分且加载顺序可查

系统 SHALL 将笔记浏览器相关逻辑按职责拆分为多个脚本文件（例如侧栏、目录树、预览、搜索等），并在 `note/index.html` 中以明确顺序加载；拆分后的对外行为 SHALL 仍满足既有 `note-browser` 能力规范（含中文路径与 hash 等），不因拆分引入功能回归。

#### Scenario: 维护者定位侧栏逻辑

- **WHEN** 维护者需要修改笔记页侧栏或移动端 overlay 行为
- **THEN** 其 SHALL 能在专用脚本文件（或等价命名）中找到主要逻辑，而无需在单一大文件中无结构地搜索

#### Scenario: 新成员理解加载依赖

- **WHEN** 新成员打开 `note/index.html` 查看脚本引用
- **THEN** 其 SHALL 能通过文件命名与可选简短注释理解各脚本职责及加载顺序依赖

### Requirement: 站点级通用工具须集中暴露

系统 SHALL 将 URL 查询参数读取等与页面无关的通用方法并入同一工具入口（现有 `SiteUtils` 或经提案确认的统一命名空间），并 SHALL 避免在多个独立小文件中重复定义相同工具函数；引用页面 SHALL 更新为使用该入口。

#### Scenario: 查找 URL 参数工具

- **WHEN** 开发者需要读取 `?` 查询参数
- **THEN** 其 SHALL 在共享工具入口文档或代码中定位到唯一实现位置

### Requirement: 仓库根 README 须描述真实项目而非占位模板

仓库根目录的 `README.md` SHALL 使用简体中文说明本站点用途、主要子目录职责（如 `note/`、`games/`、`assets/`）、以及本地预览或维护命令（含 manifest 或脚本生成步骤，若仓库内存在对应脚本）；SHALL 不得保留与本项目无关的默认 Jekyll/GitHub Pages 教程占位内容作为主要说明。

#### Scenario: 协作者克隆后了解结构

- **WHEN** 协作者首次克隆仓库并打开 `README.md`
- **THEN** 其 SHALL 获得与本仓库实际结构一致的介绍，并能按文档完成基本本地预览或维护操作

### Requirement: 大型游戏脚本须渐进式降复杂度

对行数显著偏大的游戏脚本（如 `games/billiards/billiards.js`），系统 SHALL 通过提取无副作用的纯函数、常量与配置，或增加清晰分节注释，降低单文件认知负担；SHALL 不在本变更中强制引入打包工具或改变游戏对外玩法。

#### Scenario: 审阅台球数学辅助逻辑

- **WHEN** 维护者需要审阅或修改台球相关的几何/数值辅助逻辑
- **THEN** 其 SHALL 能在独立区域（独立文件或明确分节）中找到相关代码，而不必在整篇脚本中线性扫描
