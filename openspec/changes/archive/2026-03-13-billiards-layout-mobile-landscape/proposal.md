## Why

当前台球页面中信息区和操作区占比偏高，台球桌可视区域不够突出，影响游戏沉浸感与操作效率。移动端也缺少明确的横屏友好布局，导致桌面利用率和触控体验不理想。

## What Changes

- 调整页面信息层级，让台球桌区域成为页面主视觉与主要交互区域。
- 弱化次要/非常用功能入口，将其收纳到“选项”面板（或等效折叠菜单）中，保留核心操作直达。
- 增强移动端横屏适配：在横屏场景下优先保证球桌尺寸与可操作区域，控制面板改为紧凑布局。

## Capabilities

### New Capabilities

- 无。

### Modified Capabilities

- `billiards-game`：更新页面布局与交互入口要求，明确“球桌优先展示”“非常用功能可收纳”“移动端支持横屏友好显示”。

## Impact

- 受影响文件：`games/billiards/index.html`、`games/billiards/billiards.css`（必要时微调 `games/billiards/billiards.js` 的 UI 交互绑定）。
- 受影响规范：`openspec/specs/billiards-game/spec.md`。
- 无新增外部依赖。
