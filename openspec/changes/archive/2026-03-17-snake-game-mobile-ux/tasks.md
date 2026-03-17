## 1. 滑动手势输入

- [x] 1.1 在 `snake.js` 中为 `.snake-canvas-wrap` 添加 `touchstart` / `touchend` 监听，记录起终点坐标
- [x] 1.2 实现滑动方向计算逻辑：根据 dx/dy 绝对值比较判断水平/垂直方向，设定最小滑动距离阈值（30px），调用现有 `queueDirection()`
- [x] 1.3 在 `touchstart` handler 中调用 `e.preventDefault()` 以阻止画布区域的默认滚动行为

## 2. 防误触与滚动抑制

- [x] 2.1 在 `snake.css` 中为 `.snake-canvas-wrap` 添加 `touch-action: none`，阻止浏览器默认触摸手势
- [x] 2.2 确认画布区域外（页头、侧栏按钮区）的触摸滚动行为不受影响

## 3. 移动端布局优化

- [x] 3.1 在 `@media (max-width: 768px)` 中调整 `.snake-layout` 为单列布局，画布区域在上、侧栏在下
- [x] 3.2 画布容器 `.snake-canvas-wrap` 在窄屏下宽度设为 `100%`，通过 `aspect-ratio: 1` 或 padding-bottom 保持正方形比例
- [x] 3.3 移动端下隐藏或折叠「玩法说明」区域（`.snake-help`），减少滚动量

## 4. 触控热区扩大

- [x] 4.1 在 `@media (max-width: 768px)` 中将 `.snake-control` 的 `min-height` 提升至 3.5rem（≥44px）
- [x] 4.2 将 `.snake-button` 在移动端的 `min-height` 设为 2.75rem（≥44px），增加 padding

## 5. 触觉反馈（可选）

- [x] 5.1 在滑动手势或方向按钮触发方向变更成功时，若 `navigator.vibrate` 存在则调用 `navigator.vibrate(10)`
