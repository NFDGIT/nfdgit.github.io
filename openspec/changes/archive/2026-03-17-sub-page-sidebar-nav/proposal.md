## Why

Agent 教程的 4 个子页面（tools、memory、mcp、multi-agent）缺少与主页面一致的左侧步骤导航栏，导致用户体验不连贯：无法快速跳转步骤，也没有当前进度指示。

## What Changes

- 为 4 个子页面添加与主页面相同的 `agent-layout` 两栏布局 + `agent-progress` 侧边栏导航
- 为每个子页面的 `<section>` 添加 `id="step-N"` 属性，使滚动跟踪和锚点跳转生效

## Capabilities

### New Capabilities

无新能力。

### Modified Capabilities

无规格级别变更，纯 UI 布局调整。

## Impact

- `guide/agent/tools.html`: 添加布局包装和侧边栏
- `guide/agent/memory.html`: 同上
- `guide/agent/mcp.html`: 同上
- `guide/agent/multi-agent.html`: 同上
- 无 CSS/JS 变更——现有 `agent-guide.css` 和 `agent-guide.js` 已完全支持
