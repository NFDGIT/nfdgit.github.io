## Why

当前台球游戏 3D 模式下，拖拽瞄准的**出杆方向与用户拖拽方向不一致**，导致「往左拖却往右打」或方向/力度感错乱，体验与 2D 模式不符。需要修复 3D 模式下从指针坐标到逻辑坐标的映射，使瞄准方向与击球方向与 2D 完全一致。

## What Changes

- 修正 3D 模式下的**指针 → 逻辑坐标**转换：确保在 3D 视图上拖拽时，`aimStart` / `aimCurrent` 使用的逻辑坐标与 2D 模式下在同一套规则下一致（同一屏幕位置对应同一逻辑点），从而出杆方向与拖拽方向一致。
- 可能涉及：在 3D 模式下使用**当前可见的 3D 容器（或 WebGL 画布）**的尺寸与 getBoundingClientRect 进行换算，和/或统一使用 **scaleX、scaleY**（或等价比率）以兼容容器与逻辑坐标系宽高比不一致的情况。
- 不改变 2D 模式下的现有行为；不改变物理与胜负规则。

## Capabilities

### New Capabilities

- 无。

### Modified Capabilities

- `billiards-game`：在「3D 模式下可瞄准与击球」相关要求中，明确 3D 模式下瞄准与击球方向 SHALL 与 2D 模式一致（同一拖拽在同一逻辑坐标下产生相同的击球方向与力度）。

## Impact

- **受影响路径**：`games/billiards/billiards.js`（如 `toLogical`、事件绑定元素、3D 下使用的 scale/rect 来源）。
- 无新增依赖；无 API 或页面结构变更。
