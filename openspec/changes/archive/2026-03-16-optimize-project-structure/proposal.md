## Why

项目经历多次迭代后，目录结构出现了以下碎片化问题：临时/测试目录遗留在仓库根目录（`.tmp-billiards-artifacts`、`.tmp-playwright-runner`、`test-results`）；各子模块的资源组织方式不统一（album 使用 `css/style.css`、insurance 依赖 jQuery + `main.js`、racing 完全不用共享样式和主题）；games 目录下有仅做跳转的冗余文件（`snake.html`、`racing.html`）以及遗留的 `legacy/` 目录；album 页面 `lang="en"` 且存在 `<metd>` 拼写错误。这些不一致增加了维护成本，也让新页面难以复用既有约定。

## What Changes

- 删除临时/测试目录：`.tmp-billiards-artifacts/`、`.tmp-playwright-runner/`、`test-results/`。
- 删除冗余跳转文件：`games/snake.html`、`games/racing.html`。
- 删除或归档 `games/legacy/` 目录。
- 修正 `album/index.html`：`lang` 改为 `zh-CN`，修复 `<metd>` 拼写错误。
- album 页面接入共享样式 `assets/css/home.css` 和主题切换 `assets/js/theme.js`，移除或简化本地 `css/style.css` 中与 home.css 重复的部分。
- insurance 页面去除 jQuery 依赖，将 `assets/js/main.js` 中的 URL 参数读取改为原生 JS 实现，并接入主题切换。
- racing 游戏页面接入 `assets/css/home.css` 共享变量和 `assets/js/theme.js` 主题切换，统一导航结构。
- 在 `.gitignore` 中补充临时目录规则，防止再次提交。
- 更新 `games/index.html` 中对 snake/racing 的链接路径，确保去掉跳转文件后入口不断裂。

## Capabilities

### New Capabilities

- 无。

### Modified Capabilities

- `games-organization`：去掉冗余跳转文件和 legacy 目录后，games 目录组织方式变更。
- `games-directory`：games 入口页链接路径需同步更新。
- `theme`：新增 album、insurance、racing 三个页面的主题适配要求。

## Impact

- 受影响文件：`album/index.html`、`album/css/style.css`、`insurance/index.html`、`assets/js/main.js`、`games/index.html`、`games/racing/index.html`、`.gitignore`。
- 被删除的文件/目录：`games/snake.html`、`games/racing.html`、`games/legacy/`、`.tmp-billiards-artifacts/`、`.tmp-playwright-runner/`、`test-results/`。
- 无新增依赖；insurance 的 jQuery 依赖将被移除。
