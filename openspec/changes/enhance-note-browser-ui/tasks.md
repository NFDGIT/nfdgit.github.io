## 1. 侧边栏视觉增强

- [x] 1.1 在 `note-browser.css` 中为目录节点和文件节点添加 `::before` 伪元素图标（文件夹📁、Markdown📄、HTML🌐）
- [x] 1.2 在 `note-browser.css` 中为 `.note-tree-node.file.active` 添加左侧 3px 色条（`border-left` 或 `box-shadow`）
- [x] 1.3 在 `note-browser.css` 中为收起态侧边栏的图标列添加样式（居中显示收起按钮图标）
- [x] 1.4 在 `note-browser.js` 中渲染目录树时计算文件/目录数量，在侧边栏底部添加统计信息

## 2. Markdown 排版重做

- [x] 2.1 在 `note-browser.css` 中重写 `.note-preview-content` 标题样式：h1/h2 加底部分割线、各级递减字号与间距
- [x] 2.2 在 `note-browser.css` 中新增 blockquote 样式：左侧 4px 色条 + 浅背景 + 内边距
- [x] 2.3 在 `note-browser.css` 中新增 table 样式：斑马行 + 细边框 + 圆角 + 响应式滚动
- [x] 2.4 在 `note-browser.css` 中新增 img 样式：最大宽度 100% + 圆角 + 居中
- [x] 2.5 在 `note-browser.css` 中优化段落间距、列表间距、水平线样式

## 3. 代码语法高亮

- [x] 3.1 在 `note/index.html` 中引入 highlight.js CDN（JS + 亮色/暗色 CSS）
- [x] 3.2 在 `note-browser.js` 中在 Markdown 渲染后调用 `hljs.highlightAll()`
- [x] 3.3 在 `note-browser.js` 或 `theme.js` 中实现主题切换时动态更换 highlight.js 的 CSS 主题

## 4. 面包屑与空态

- [x] 4.1 在 `note/index.html` 预览区顶部添加面包屑容器 `<nav class="note-breadcrumb">`
- [x] 4.2 在 `note-browser.js` 中在文件加载时更新面包屑内容
- [x] 4.3 在 `note-browser.css` 中添加面包屑样式
- [x] 4.4 重新设计空态占位符：替换为图标 + 引导文案 + 更好的视觉层次

## 5. 移动端抽屉优化

- [x] 5.1 在 `note-browser.css` 中优化移动端抽屉：背景模糊增强、滑入弹性曲线、关闭按钮更明显
