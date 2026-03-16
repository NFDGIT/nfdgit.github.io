## Why

当前移动端台球体验存在明显偏差：六个球袋在缩放后相对位置不准确，视觉上与桌边关系错位；球体尺寸与台面比例也不合理，导致操作判断和击球预期不稳定。需要对移动端布局与渲染比例做一次统一修正，保证规则感知与触控体验一致。

## What Changes

- 修正移动端（竖屏与横屏）下六个球袋的位置映射与渲染布局，确保与桌边几何关系正确。
- 重新校准移动端球体半径、桌面逻辑尺寸与缩放策略，保证球与台面的比例合理且可操作。
- 校验并修正 2D/3D 模式在移动端的比例一致性，避免切换后出现洞位或球体相对尺寸跳变。
- 增加针对移动端关键分辨率的验收项（洞位正确、边界碰撞一致、触控瞄准可用）。

## Capabilities

### New Capabilities

- 无。

### Modified Capabilities

- `billiards-game`：补充并收紧移动端下球袋几何布局与球台比例一致性的要求，明确 2D/3D 下的可用性标准。

## Impact

- 受影响代码：`games/billiards/billiards.js`（布局参数、球袋坐标计算、球半径/缩放策略、2D/3D 一致性映射），必要时 `games/billiards/billiards.css`（移动端容器尺寸约束）。
- 受影响规范：`openspec/specs/billiards-game/spec.md`。
- 无新增依赖，继续使用现有静态 HTML/CSS/JS 与 Three.js CDN。
