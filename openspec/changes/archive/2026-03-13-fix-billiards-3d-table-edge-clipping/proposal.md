## Why

当前台球 3D 模式存在可视范围与逻辑边界不一致的问题：球桌边缘显示不完整，桌边渲染被裁切，球靠近边缘时会出现“还在运动但已看不见”的体验断层。这会直接影响瞄准判断与击球反馈，降低 3D 模式可用性。

## What Changes

- 修正 3D 场景中球桌、边框、袋口与相机视锥的匹配关系，确保整张桌面与边缘在常见分辨率下完整可见。
- 调整 3D 渲染尺寸与容器尺寸同步策略，避免切换 2D/3D、窗口缩放或移动端横竖屏切换后出现视口裁切。
- 统一 3D 显示边界与 2D 物理边界的视觉映射，确保球到达可碰撞边界时仍然处于可见区域。
- 补充针对桌面端与移动端（尤其横屏）的 3D 可见性验收点，明确“边缘可见、球不消失”的行为要求。

## Capabilities

### New Capabilities

- 无。

### Modified Capabilities

- `billiards-game`：补充并收紧 3D 模式下桌面完整可见、边缘不被裁切、球在边界附近持续可见的规范要求。

## Impact

- 受影响代码：`games/billiards/billiards.js`（相机参数、渲染尺寸同步、3D 桌面几何更新）、`games/billiards/billiards.css`（3D 容器显示边界/溢出策略，必要时）。
- 受影响规范：`openspec/specs/billiards-game/spec.md`。
- 无新增依赖，继续使用现有 Three.js CDN 方案。
