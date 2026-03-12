## 1. 脚本与首屏状态

- [x] 1.1 新增 `assets/js/large-text.js`：实现读取/写入 localStorage（key: `largeText`）、设置/移除 `document.documentElement` 的 `data-large-text="on"`、绑定 `.large-text-toggle` 点击切换；页面加载时根据存储设置根节点属性并更新按钮状态（aria-label/图标）
- [x] 1.2 在首页 `<head>` 内增加与主题类似的内联脚本：优先读取 `localStorage.getItem('largeText')`，若为 `'on'` 则设置 `document.documentElement.setAttribute('data-large-text','on')`，避免首屏闪烁

## 2. 样式

- [x] 2.1 在 `assets/css/home.css`（或共享入口）中增加 `[data-large-text="on"]` 下根/body 的字体放大规则（如根 font-size 缩放至约 1.2 倍），确保首页、使用该样式的子页面在开启大字模式时正文与标题一致放大
- [x] 2.2 在 `assets/css/note-browser.css` 中增加 `[data-large-text="on"]` 下笔记预览区与目录树的字体放大规则，使笔记页大字模式生效

## 3. 页面入口

- [x] 3.1 在首页 header 的主题按钮旁增加大字模式按钮：`class="large-text-toggle"`、`aria-label` 为「开启大字模式」或「关闭大字模式」、图标可用 🔤 或 A+；首页引入 `large-text.js`
- [x] 3.2 在笔记页 `note/index.html` 的 header/工具栏增加大字模式按钮并引入 `large-text.js`，若笔记页有独立样式则确保已加载含 `[data-large-text="on"]` 规则的 CSS
- [x] 3.3 在游戏目录页 `games/index.html` 的 header 或工具栏增加大字模式按钮并引入 `large-text.js`（若该页使用 home.css 或共享样式，则 2.1 已覆盖；否则补一条该页或 games 共用 CSS 的大字规则）

## 4. 验证

- [x] 4.1 在首页、笔记页、游戏目录页分别点击大字模式开关，确认文字立即放大/恢复，且刷新后状态保持；清除 localStorage 后再次打开，确认为关闭状态
