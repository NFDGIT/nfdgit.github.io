# 台球瞄准与移动端拖拽修复 — 技术设计

## Context

当前台球游戏（`games/billiards/billiards.js`）的瞄准与击球逻辑存在两处问题：

1. **方向逻辑**：`getAimDirection()` 使用「按下点到母球」的向量再取反作为击球方向，而瞄准线 `drawAimLine` 用「按下点到母球」的法向画箭头，导致：(a) 击球方向与用户拖拽方向不一致；(b) 瞄准线不随拖拽移动而旋转，只与按下点相对母球的位置有关。
2. **移动端拖拽时画面消失**：可能原因包括：`touchend` 时使用 `e.touches[0]` 得到 undefined（应使用 `e.changedTouches[0]`），产生 NaN 坐标并破坏绘制；或拖拽触发 `resize`（如地址栏收起），`resizeCanvas()` 重设画布尺寸清空内容，若未在同一帧内触发 `render()` 会短暂白屏。

项目为纯静态站点，无构建与框架，仅修改前端 JS/CSS 与 spec。

## Goals / Non-Goals

**Goals:**

- 击球方向与拖拽方向一致：从按下点指向当前指针位置的单位向量即击球方向；瞄准线从母球沿该方向延伸，并随拖拽实时旋转。
- 移动端拖拽过程中球桌内容保持可见、不闪白：触控坐标正确（含 touchend）、避免 NaN；resize 时要么在拖拽期间推迟应用，要么在 resize 后立即重绘。

**Non-Goals:**

- 不改变游戏规则、物理或关卡设计；不新增游戏功能（如多人在线、存档）。

## Decisions

1. **击球与瞄准方向统一为拖拽向量**
   - 使用 `(aimCurrent - aimStart)` 的归一化向量作为击球方向与瞄准线方向；`getAimDirection()`、`drawAimLine()`、`hitCueBall()` 均基于该向量。
   - 备选：保留「按下点到母球」语义。已否决，因与用户「往哪拖就往哪打」的预期不符。

2. **触控事件中 touchend 使用 changedTouches**
   - 在 `getEventPos(e)` 中区分事件类型：若为 `touchend`/`touchcancel` 且 `e.touches.length === 0`，则从 `e.changedTouches[0]` 取坐标，避免取到 undefined 导致 NaN。
   - 备选：仅在 `onPointerUp` 内特殊处理。采用在 `getEventPos` 内统一处理，避免遗漏且便于维护。

3. **拖拽期间 resize 与重绘**
   - 在 `window.resize` 回调中，若当前处于瞄准状态（`aimStart !== null`），先不修改画布尺寸（或先执行 resize 后立即调用 `render()`），确保同一帧内重绘，避免白屏。
   - 备选：完全推迟 resize 至 `aimStart === null`。采用「resize 后立即 render」以保持布局与视口一致，实现更简单。

4. **坐标与绘制健壮性**
   - 在 `drawAimLine` 与使用 `aimCurrent` 的地方，对 `aimCurrent` 做简单有效校验（如 `typeof aimCurrent.x === 'number' && !isNaN(aimCurrent.x)`），无效时不绘制瞄准线、不施加力，避免 NaN 污染 ctx。

## Risks / Trade-offs

- **[风险]** 部分老旧移动浏览器对 `changedTouches` 支持异常 → **[缓解]** 使用前检查 `e.changedTouches && e.changedTouches.length > 0`，否则不更新 `aimCurrent` 或使用上一有效点。
- **[取舍]** 击球方向改为纯拖拽方向后，与「从母球指向按下点」的旧语义不同 → 已在 proposal 与 spec 中明确为新行为，无需兼容旧逻辑。
