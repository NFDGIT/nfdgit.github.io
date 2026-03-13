## Why

当前台球游戏将拖拽方向作为出杆方向（同向），但需求已变更为“拖拽方向应与出杆方向相反”。需要在不改变物理系统与玩法框架的前提下，调整瞄准与击球方向映射规则，确保交互符合新预期。

## What Changes

- 修改瞄准与击球方向规则：拖拽向量从“同向出杆”改为“反向出杆”。
- 更新 2D 与 3D 模式下的方向一致性要求，确保两种模式都遵循“反向出杆”规则。
- 保持力度映射、碰撞、进袋、积分与重置逻辑不变。

## Capabilities

### New Capabilities

- 无。

### Modified Capabilities

- `billiards-game`：将“拖拽方向决定出杆方向”的 requirement 修改为“出杆方向与拖拽方向相反”，并要求在 2D/3D 模式下行为一致。

## Impact

- 受影响代码：`games/billiards/billiards.js`（瞄准方向向量计算、瞄准线方向渲染、2D/3D 一致性）。
- 受影响规范：`openspec/specs/billiards-game/spec.md`（交互方向相关 requirement/scenario）。
- 无新增依赖、无 API 变更。
