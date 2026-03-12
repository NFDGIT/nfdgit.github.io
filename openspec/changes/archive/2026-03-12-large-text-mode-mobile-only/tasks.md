## 1. 脚本：按视口启用/禁用大字模式

- [x] 1.1 在 `assets/js/large-text.js` 中增加移动端判断（如 `matchMedia('(max-width: 768px)')`）。初始化时：若为桌面端则移除 `document.documentElement` 的 `data-large-text` 且不写入 localStorage；若为移动端则按现有逻辑根据 localStorage 设置 `data-large-text` 并更新按钮。监听 `resize`（或 media query listener）：从桌面切到移动端时按存储恢复大字状态；从移动切到桌面时移除 `data-large-text`。

## 2. 样式：桌面端隐藏开关

- [x] 2.1 在 `assets/css/home.css` 中增加 `@media (min-width: 769px) { .large-text-toggle { display: none; } }`，使首页与使用 home.css 的游戏目录页在桌面端隐藏大字按钮
- [x] 2.2 在 `assets/css/note-browser.css` 中增加相同媒体查询隐藏 `.large-text-toggle`，使笔记页在桌面端隐藏大字按钮

## 3. 验证

- [x] 3.1 在桌面端（视口 ≥ 769px）打开首页、笔记页、游戏目录页，确认大字开关不可见且页面未应用大字样式；缩小视口到移动端后开关出现，且若此前在移动端曾开启则恢复大字
- [x] 3.2 在移动端开启大字后刷新，确认仍为大字；放大到桌面端后确认大字消失且开关隐藏
