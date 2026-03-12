## Why

大字模式主要服务于小屏阅读与可访问性，在 PC 端大屏上意义不大且可能影响排版。将大字模式限定为「仅移动端可用」可减少桌面端界面干扰，同时保留移动端用户的放大能力。

## What Changes

- 大字模式开关仅在**移动端**（如视口宽度小于 769px）显示并可点击；在 **PC/桌面端**（视口 ≥ 769px）不显示开关，且不应用大字样式（即使本地曾存储为开启，在桌面端也视为关闭）。
- 移动端行为不变：开关可见、可切换、偏好持久化；用户从移动端切到桌面端再切回移动端时，仍按本地存储恢复大字状态。

## Capabilities

### New Capabilities

- 无

### Modified Capabilities

- `large-text-mode`：在现有需求基础上增加「仅移动端可用」的约束——开关仅在移动端显示与生效，桌面端不显示开关且不应用大字模式。

## Impact

- **assets/js/large-text.js**：在初始化与视口变化时根据当前是否为移动端决定是否应用/移除 `data-large-text`、是否显示或隐藏开关按钮。
- **assets/css**（home.css、note-browser.css、games 相关）：通过媒体查询在桌面端隐藏 `.large-text-toggle`；或由 JS 在桌面端移除根节点 `data-large-text` 即可不应用大字样式，开关隐藏可通过 CSS 或 JS 控制。
- **各页面**：无需改 HTML 结构，仅逻辑与样式随视口切换。
