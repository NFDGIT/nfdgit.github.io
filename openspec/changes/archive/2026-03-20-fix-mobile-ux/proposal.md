## Why

上一轮移动端优化有 3 个 CSS bug：代码块 `overflow:hidden` 和 `::after` 渐变冲突导致滚动和提示都不工作；底部导航箭头的 flex-direction 互相覆盖导致布局错乱；进度条没有背景色导致内容透过去不可读。需要完整重写 `agent-guide.css` 的移动端部分。

## What Changes

- 完整重写 `agent-guide.css`，修复所有移动端 bug，确保正确的响应式行为

## Capabilities

### New Capabilities

无。

### Modified Capabilities

无。

## Impact

- `guide/agent/agent-guide.css`：完整重写
