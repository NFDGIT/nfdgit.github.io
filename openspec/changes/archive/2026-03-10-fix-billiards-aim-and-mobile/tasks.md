## 1. 击球与瞄准方向统一为拖拽方向

- [x] 1.1 将击球方向改为拖拽向量：在 `getAimDirection` 与 `hitCueBall` 中，使用 `(aimCurrent - aimStart)` 的归一化向量作为击球方向，不再使用「按下点到母球」的向量
- [x] 1.2 将瞄准线改为拖拽方向：在 `drawAimLine` 中，使用 `(aimCurrent - aimStart)` 计算从母球延伸的箭头方向，使瞄准线随拖拽实时旋转并与击球方向一致

## 2. 触控坐标与 NaN 防护

- [x] 2.1 在 `getEventPos` 中区分 touch 事件：对 `touchend`/`touchcancel` 使用 `e.changedTouches[0]` 取坐标（当 `e.touches.length === 0` 时），避免取到 undefined 导致 NaN
- [x] 2.2 在 `drawAimLine`、`hitCueBall` 及使用 `aimCurrent` 处，对 `aimCurrent.x`/`aimCurrent.y` 做有效数值校验，无效时不绘制瞄准线、不施加力

## 3. 移动端拖拽时画面不消失

- [x] 3.1 在 `window.resize` 回调中，若处于瞄准状态（`aimStart !== null`），在 `resizeCanvas` 之后立即调用 `render()`，确保同一帧内重绘，避免画布被清空后未重绘导致白屏
- [x] 3.2 确认画布或容器已设置 `touch-action: none`（已有则仅确认），防止拖拽触发页面滚动或缩放导致视口变化

## 4. 验证

- [x] 4.1 在桌面与移动端（或窄视口）各验证：瞄准线随拖拽方向实时旋转、击球方向与拖拽方向一致；移动端拖拽过程中球桌内容持续可见、无白屏或消失
