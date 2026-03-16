## 1. 相册页面现代化

- [ ] 1.1 重写 `album/css/style.css`：将 `.box` 从 `margin-left: 42%; margin-top: 22%` 改为 flexbox 居中 + `vmin` 单位缩放
- [ ] 1.2 在 `album/index.html` 中添加居中容器，移除导航内联样式
- [ ] 1.3 添加移动端媒体查询：窄屏自动缩小 3D 立方体

## 2. 工具页实际功能

- [ ] 2.1 重写 `tools/index.html`：替换占位符为 3 个工具卡片（JSON 格式化、颜色转换、二维码），使用 `<details>` 可展开结构
- [ ] 2.2 创建 `tools/tools.js`：实现 JSON 格式化逻辑（`JSON.parse` + `JSON.stringify` 美化 + 错误提示）
- [ ] 2.3 在 `tools/tools.js` 中实现颜色转换逻辑（HEX↔RGB↔HSL + 颜色预览色块）
- [ ] 2.4 在 `tools/index.html` 中引入 qrcode.js CDN，在 `tools/tools.js` 中实现二维码生成（含加载失败降级）
- [ ] 2.5 在 `tools/index.html` 的 `<style>` 或新建 `tools/tools.css` 中添加工具卡片样式

## 3. 赛车游戏暗色主题适配

- [ ] 3.1 分析 `games/racing/app.js` 中 UI 层硬编码颜色（开始画面、文字、按钮），将其改为读取 `data-theme` 属性动态取值
- [ ] 3.2 在 `games/racing/index.html` 的 `<style>` 中添加赛车 UI 的主题变量

## 4. 笔记浏览器搜索

- [ ] 4.1 在 `note/index.html` 侧边栏 header 下方添加搜索框 `<input>`
- [ ] 4.2 在 `assets/js/note-browser.js` 中实现实时搜索过滤：按文件名模糊匹配，隐藏不匹配的树节点，保留匹配节点的父目录
- [ ] 4.3 在 `assets/css/note-browser.css` 中添加搜索框样式和"无匹配结果"提示样式
