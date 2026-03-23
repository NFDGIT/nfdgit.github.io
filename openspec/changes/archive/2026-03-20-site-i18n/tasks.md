## 1. 语言切换基础设施

- [x] 1.1 创建 `assets/js/lang.js`：语言检测（localStorage + navigator.language）、路径切换逻辑（加/去 `/en/` 前缀）、fallback 到中文版（英文页不存在时）
- [x] 1.2 在 `assets/css/base.css` 中添加 `.lang-toggle` 按钮样式（与 theme-toggle 一致）

## 2. 中文首页改造

- [x] 2.1 在 `index.html` 的 glass-nav 中添加语言切换按钮，引入 `lang.js`

## 3. 英文首页

- [x] 3.1 创建 `en/` 目录结构
- [x] 3.2 创建 `en/index.html`：首页英文翻译，使用绝对路径引用资源，`html lang="en"`，包含语言切换按钮
