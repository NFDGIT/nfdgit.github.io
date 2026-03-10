# 修复台球瞄准方向与移动端拖拽时画面消失

## Why

当前台球游戏的击球方向与玩家拖拽方向不一致，瞄准线也不随拖拽实时更新，导致操作与预期不符；在移动端拖拽时整个球桌内容会消失，严重影响可玩性。需要修正瞄准与击球逻辑，并消除移动端拖拽时的渲染异常。

## What Changes

- **瞄准与击球方向**：击球方向改为与拖拽方向一致（从按下点指向松手点），瞄准线随拖拽实时旋转，与击球方向一致。
- **移动端拖拽时画面消失**：修复触控事件与坐标处理（如 `touchend` 使用 `changedTouches`、避免 NaN）、防止拖拽触发 resize 导致画布被清空不重绘，必要时在拖拽期间推迟 resize 或确保立即重绘。

## Capabilities

### New Capabilities

无。

### Modified Capabilities

- `billiards-game`：瞄准与击球方向改为“与拖拽方向一致”；移动端触控时球桌内容在拖拽过程中保持可见且稳定渲染。

## Impact

- **games/billiards/billiards.js**：`getAimDirection`、`drawAimLine`、`hitCueBall` 的方向计算改为基于拖拽向量；`getEventPos` 在 `touchend` 时使用 `changedTouches`；resize 与渲染逻辑需保证拖拽中不出现白屏。
- **openspec/specs/billiards-game/spec.md**：更新“瞄准并击打母球”相关场景描述，明确击球方向与拖拽方向一致；补充移动端拖拽时画面保持稳定的要求。
