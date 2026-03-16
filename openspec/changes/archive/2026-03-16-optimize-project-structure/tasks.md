## 1. 清理临时/遗留目录

- [x] 1.1 删除 `.tmp-billiards-artifacts/` 目录
- [x] 1.2 删除 `.tmp-playwright-runner/` 目录
- [x] 1.3 删除 `test-results/` 目录
- [x] 1.4 删除 `games/legacy/` 目录
- [x] 1.5 在 `.gitignore` 中添加 `.tmp-*`、`test-results/` 等规则，防止再次提交

## 2. 修复 album 页面

- [x] 2.1 修正 `album/index.html` 的 `lang` 属性为 `zh-CN`
- [x] 2.2 修复 `album/index.html` 中 `<metd>` 拼写错误为 `<meta>`
- [x] 2.3 在 `album/index.html` 中引入 `assets/css/home.css` 和 `assets/js/theme.js`，添加主题切换按钮与预设脚本
- [x] 2.4 清理 `album/css/style.css` 中与 home.css 重复的基础样式

## 3. 改造 insurance 页面

- [x] 3.1 将 `assets/js/main.js` 中 jQuery URL 参数读取改为原生 `URLSearchParams` 实现
- [x] 3.2 从 `insurance/index.html` 移除 jQuery CDN 引用
- [x] 3.3 在 `insurance/index.html` 中接入 `assets/js/theme.js` 主题切换

## 4. 改造 racing 游戏页面

- [x] 4.1 在 `games/racing/index.html` 中引入 `assets/css/home.css` 共享变量
- [x] 4.2 在 `games/racing/index.html` 中接入 `assets/js/theme.js` 主题切换并添加切换按钮
- [x] 4.3 统一 racing 导航结构（添加"返回首页""返回游戏目录"链接）

## 5. 去除冗余跳转与更新链接

- [x] 5.1 删除 `games/snake.html` 跳转文件
- [x] 5.2 删除 `games/racing.html` 跳转文件
- [x] 5.3 更新 `games/index.html` 中 snake 和 racing 的链接，直接指向 `snake/index.html` 和 `racing/index.html`

## 6. 全量验证

- [x] 6.1 验证所有受影响页面可正常加载、主题切换正常、导航链接不断裂
