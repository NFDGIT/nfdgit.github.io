## 1. 坐标换算修复

- [x] 1.1 在 `billiards.js` 中修改 `toLogical(clientX, clientY)`：当 `renderMode === '3d'` 且 `threeContainer` 可用时，使用 3D 容器（或其中 WebGL canvas）的 `getBoundingClientRect()` 作为基准，并用 `scaleX = rect.width / LOGIC_W`、`scaleY = rect.height / LOGIC_H` 分别计算 logicX、logicY；否则保持现有逻辑（wrap 的 rect + 单一 scale）
- [x] 1.2 确保 3D 容器与 2D 画布在布局上同尺寸同位置（已有 CSS），必要时在 `setRenderMode('3d')` 或 `init3D` 后触发一次 resize 以保证 rect 正确

## 2. 验证与收尾

- [x] 2.1 验证 2D 模式下瞄准与击球行为与修改前一致（toLogical 在 2D 分支未改动）
- [x] 2.2 在 3D 模式下手动验证：同一相对位置拖拽时瞄准线与击球方向与拖拽方向一致，与 2D 下同位置同拖拽结果一致
