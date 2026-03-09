## 1. CSS 变量与主题样式

- [x] 1.1 在 `assets/css/home.css` 中定义 CSS 变量（`--bg`, `--text`, `--card-bg` 等），支持 `[data-theme="light"]` 与 `[data-theme="dark"]`
- [x] 1.2 在 `assets/css/note-browser.css` 中应用相同变量或引入共享主题变量

## 2. 主题脚本

- [x] 2.1 新建 `assets/js/theme.js`：读取 localStorage、检测 prefers-color-scheme，设置 `<html data-theme>`
- [x] 2.2 实现切换函数：点击时在 light/dark 间切换并写入 localStorage
- [x] 2.3 在页面加载时调用初始化逻辑

## 3. 首页集成

- [x] 3.1 在 `index.html` 的 header 中增加主题切换按钮
- [x] 3.2 在 `index.html` 中引入 `assets/js/theme.js` 并绑定按钮点击事件

## 4. 笔记页集成

- [x] 4.1 在 `note/index.html` 中引入 theme.js 并增加主题切换按钮
