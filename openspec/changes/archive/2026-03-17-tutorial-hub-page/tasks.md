## 1. 创建目录页

- [x] 1.1 创建 `guide/guide.css`，教程目录页卡片标签和描述样式
- [x] 1.2 创建 `guide/index.html`，教程目录页：标题区 + 卡片网格展示 Agent 系列全部 6 篇教程（主教程标记为推荐起点）

## 2. 首页入口更新

- [x] 2.1 修改 `index.html` 的教程卡片：链接改为 `./guide/index.html`，标题改为"教程"，描述改为"AI Agent 系列教程，从入门到框架实战"

## 3. 子页面导航更新

- [x] 3.1 更新 `guide/agent/index.html` 的 glass-nav，添加"教程目录"链接指向 `../index.html`
- [x] 3.2 更新 5 个子页面（tools/memory/mcp/multi-agent/openclaw）的 glass-nav，将"返回教程"改为"教程主页"指向 `./index.html`，新增"教程目录"指向 `../index.html`
