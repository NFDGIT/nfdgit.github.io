## Context

主页面 `index.html` 使用 `agent-layout`（CSS Grid 两栏）包裹 `agent-progress`（sticky 侧边栏）和 `agent-content`（步骤内容区）。现有 CSS 和 JS（IntersectionObserver scroll spy）已完全支持该结构，子页面只需添加相同 HTML 结构即可生效。

## Goals / Non-Goals

**Goals:**
- 4 个子页面拥有与主页面一致的左侧步骤导航
- 侧边栏高亮当前步骤，可点击跳转
- 移动端自动切换为水平滚动条

**Non-Goals:**
- 不修改 CSS 或 JS
- 不改变子页面内容

## Decisions

**选择**：在每个子页面的 `<main>` 内，将 `agent-content` 用 `agent-layout` 包裹，前面插入 `agent-progress` 导航，并给每个 `<section>` 加 `id="step-N"`。

**理由**：零成本复用，无代码重复，现有 scroll spy 自动工作。

## Risks / Trade-offs

无风险。结构变更纯粹是 HTML 层面的包装调整。
