## Why

当前 3D 台球视角是固定的，玩家无法根据击球方向或个人习惯调整观察角度，导致某些走位和贴库球判断不直观。希望 3D 模式支持可调整视野，并在开始瞄准时默认对齐当前出杆方向，提升操作感和空间判断效率。

## What Changes

- 在 3D 模式增加视角调整能力（例如拖拽旋转、或等效输入方式），允许玩家改变观察角度。
- 将 3D 初始视角（以及每次进入击球瞄准阶段的默认朝向）设为与当前出杆方向一致，保证“看向即将击球方向”。
- 保持现有 2D/3D 切换、物理规则和计分逻辑不变，视角变化仅影响渲染观察，不改变游戏物理结果。
- 增加移动端适配约束，确保触控下可调整视角且不干扰原有拖拽出杆交互。

## Capabilities

### New Capabilities

- 无。

### Modified Capabilities

- `billiards-game`：补充 3D 模式下“可调视角 + 初始角度对齐出杆方向”的交互与行为要求。

## Impact

- 受影响代码：`games/billiards/billiards.js`（3D 相机控制、输入事件协调、瞄准阶段视角重置策略），必要时微调 `games/billiards/billiards.css`（交互提示与移动端手势相关样式）。
- 受影响规范：`openspec/specs/billiards-game/spec.md`。
- 无新增外部依赖，继续使用现有 Three.js CDN。
