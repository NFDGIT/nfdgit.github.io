## Context

`base.css` 已定义 7 种 glass 组件类（panel/card/btn/btn-primary/nav/nav-link/overlay）+ 设计令牌（glass-bg/blur/border/shadow/highlight, accent, radius 系列）+ 动画工具类。但没有统一的展示页面来演示这些效果。

## Goals / Non-Goals

**Goals:**

- 创建一个视觉震撼的展示页面，充分展示液态玻璃设计系统的能力。
- 页面本身就是设计系统的最佳实践（吃自己的狗粮）。
- 每种组件展示多种变体和状态。
- 加入交互演示（overlay 触发/关闭、动画重播）。
- 彩色渐变背景让玻璃效果更加明显。

**Non-Goals:**

- 不做组件的 API 文档（不是给开发者看的 Storybook）。
- 不新增 JS 框架。

## Decisions

- **页面背景**：使用渐变 mesh 背景（多色渐变 blob），让玻璃的半透明和模糊效果充分展现。用纯 CSS `radial-gradient` 叠加实现，不用 canvas。
  - 备选：纯色背景。
  - 取舍：纯色下 glass 效果不明显，渐变背景是展示 glassmorphism 的标准做法。

- **页面结构**：单页纵向滚动，每个区段一个标题 + 组件网格。用 CSS Grid 排列组件变体。

- **Glass Input**：当前 `base.css` 没有 `.glass-input`，需要在本次补充。样式与 `.glass-btn` 一致的边框和背景，加上 focus 态的 accent 色边框。

- **动画重播**：通过一个"重播"按钮，用 JS 移除再添加动画类，触发 reflow 重播。

- **主题对比**：用 `<div data-theme="light">` 和 `<div data-theme="dark">` 的局部主题覆盖，在同一页面并排展示亮暗两种效果。

- **showcase.css**：只写展示页的布局和背景样式。组件本身全部使用 `base.css` 的类，不额外定义 glass 相关样式。

## Risks / Trade-offs

- **[风险]** 渐变背景在低端设备性能差。
  **缓解：** 背景是静态 CSS 渐变，不含动画，性能影响极小。

- **[风险]** 页面内容较多，加载时间长。
  **缓解：** 纯 HTML/CSS，无图片资源，体积很小。
