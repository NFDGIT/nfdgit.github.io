## 1. 共享工具与文档

- [x] 1.1 将 `getUrlParam` 并入 `assets/js/utils.js` 的 `SiteUtils`，并全局检索 `main.js` 引用处改为只依赖 `utils.js`
- [x] 1.2 删除或清空不再需要的 `assets/js/main.js`，并更新所有曾引用它的 HTML
- [x] 1.3 重写根目录 `README.md`（简体中文）：站点简介、`note`/`games`/`assets` 职责、本地预览命令、`scripts/` 中与笔记 manifest 相关的命令（若存在）

## 2. 笔记浏览器脚本拆分

- [x] 2.1 在 `assets/js/` 下新增拆分文件（侧栏、树、预览、搜索等），从 `note-browser.js` 迁出对应函数，保持全局/IIFE 约定一致
- [x] 2.2 更新 `note/index.html` 中 `<script>` 列表：顺序正确，并加简短注释说明依赖关系
- [x] 2.3 删除或收缩原 `note-browser.js` 为薄编排层（若不再需要则移除），确保无重复 `init`
- [x] 2.4 按 `openspec/specs/note-browser/spec.md` 做回归：中文路径首次点击、hash 恢复、侧栏过渡、预览淡入、搜索与主题/highlight

## 3. 台球脚本渐进整理

- [x] 3.1 阅读 `games/billiards/billiards.js`，标出可提取的无副作用常量与纯函数列表
- [x] 3.2 将提取部分放入新文件（如 `games/billiards/billiards-utils.js`）或清晰分节，主文件引用之；保证游戏核心操作与 `openspec/specs/billiards-game/spec.md` 行为一致
- [x] 3.3 更新 `games/billiards/index.html`（若需增加 script 引用），本地 smoke test 击球、瞄准、移动端

## 4. 收尾

- [x] 4.1 全站检索遗漏的旧脚本路径或未使用文件
- [x] 4.2 提交前 diff 审查：无无关格式化；必要时更新本 change 的 `tasks.md` 勾选状态
