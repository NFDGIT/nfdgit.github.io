## Why

当前 `games/` 模块已经收录了赛车和贪吃蛇两款游戏，但缺少一款兼具休闲与策略性的台球游戏。台球是一款规则简单、易于上手的经典桌游，适合用纯前端技术在浏览器中实现，可以有效丰富游戏目录的内容多样性。

## What Changes

- 在 `games/billiards/` 下新增一个独立的台球游戏页面
- 用 Canvas 渲染俯视视角的二维台球桌、球、瞄准线和口袋
- 支持鼠标（PC）与触控（移动端）输入进行瞄准和击球
- 实现基础台球物理：球的运动、滚动衰减、碰撞弹射、进袋判定
- 提供开始、重置和简单积分功能，并在全部球进袋后判定通关
- 在游戏目录页中补充台球游戏入口
- 保持实现为纯静态 HTML/CSS/JS，兼容站点现有目录结构、主题与响应式约束

## Capabilities

### New Capabilities

- `billiards-game`: 提供可直接访问的二维台球游戏，覆盖桌面渲染、球与口袋物理、瞄准与击球输入、积分与通关判定，以及桌面端和移动端适配

### Modified Capabilities

- （无）

## Impact

- **HTML**：新增 `games/billiards/index.html` 作为台球游戏独立页面
- **CSS**：新增 `games/billiards/billiards.css` 用于台球页面布局与主题适配
- **JS**：新增 `games/billiards/billiards.js` 承载 Canvas 渲染与游戏逻辑
- **导航/入口**：`games/index.html` 目录页需要新增台球游戏入口卡片
