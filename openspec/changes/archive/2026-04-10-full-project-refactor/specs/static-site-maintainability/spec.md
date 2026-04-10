## ADDED Requirements

### Requirement: manifest 生成应集成到自动化流程

系统 SHALL 支持通过 Git hook（pre-commit）或 npm script 自动运行 `scripts/generate-note-manifest.js`，确保笔记 manifest 始终与文件系统同步。

#### Scenario: 维护者提交笔记变更
- **WHEN** 维护者在 `note/` 目录添加或修改文件后执行 git commit
- **THEN** manifest SHALL 在提交前自动更新（或提醒维护者手动更新）

### Requirement: 项目应有 package.json 管理脚本

系统 SHALL 在仓库根目录创建 `package.json`，定义 `scripts` 字段包含 manifest 生成、本地预览等常用命令，便于开发者使用 `npm run` 执行。

#### Scenario: 开发者运行 manifest 生成
- **WHEN** 开发者执行 `npm run generate-manifest`
- **THEN** SHALL 运行 `scripts/generate-note-manifest.js` 并更新 manifest 文件

#### Scenario: 开发者本地预览
- **WHEN** 开发者执行 `npm run serve`
- **THEN** SHALL 启动本地静态文件服务器

## MODIFIED Requirements

### Requirement: 笔记浏览器脚本须按职责拆分且加载顺序可查

系统 SHALL 将笔记浏览器相关逻辑按职责拆分为 ES Module 格式的多个脚本文件，通过 `import/export` 管理依赖关系（替代此前的 `<script>` 加载顺序约定）。拆分后的对外行为 SHALL 仍满足既有 `note-browser` 能力规范。

#### Scenario: 维护者定位侧栏逻辑
- **WHEN** 维护者需要修改笔记页侧栏行为
- **THEN** SHALL 能在 `note-browser-sidebar.js` 模块中找到主要逻辑

#### Scenario: 新成员理解模块依赖
- **WHEN** 新成员打开笔记浏览器入口模块
- **THEN** SHALL 能通过 `import` 语句理解各模块的依赖关系

### Requirement: 站点级通用工具须集中暴露

系统 SHALL 将 URL 查询参数读取等通用方法封装到 ES Module 格式的 `assets/js/utils/` 目录下，通过 `export` 暴露 API（替代此前的 `SiteUtils` 全局变量）。各页面 SHALL 通过 `import` 引用。

#### Scenario: 查找 URL 参数工具
- **WHEN** 开发者需要读取 `?` 查询参数
- **THEN** SHALL 通过 `import { getQueryParam } from '../assets/js/utils/url.js'` 引入

### Requirement: 大型游戏脚本须渐进式降复杂度

对行数显著偏大的游戏脚本（如 `games/billiards/billiards.js`），系统 SHALL 通过提取纯函数到独立 ES Module 文件降低单文件复杂度。SHALL 不在本变更中引入打包工具或改变游戏玩法。

#### Scenario: 审阅台球数学辅助逻辑
- **WHEN** 维护者需要审阅台球几何计算逻辑
- **THEN** SHALL 能在独立的 `billiards-math.js` 模块中找到相关代码
