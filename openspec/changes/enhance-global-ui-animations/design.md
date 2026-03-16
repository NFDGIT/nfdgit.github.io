## Context

站点基于纯静态 HTML/CSS/JS，已有 `home.css` 提供主题变量、卡片阴影和基础悬停效果（`scale(1.02)` + 阴影增强），但缺乏入场动画、微交互体系和 a11y 动画降级。多个子模块（racing、album、tools、insurance）使用内联样式或硬编码颜色，视觉不统一。

## Goals / Non-Goals

**Goals:**

- 在 `home.css` 中建立一套纯 CSS 动画工具类库，其他页面通过添加 class 即可使用。
- 让首页和游戏目录的卡片有交错入场动画，悬停有微妙发光与图标反馈。
- 让笔记浏览器的侧边栏和内容切换更流畅。
- 让 racing/album/tools/insurance 的导航和排版接入共享设计语言。
- 补齐 `focus-visible` 可访问性样式和 `prefers-reduced-motion` 降级。

**Non-Goals:**

- 不重写各页面的核心功能或布局结构。
- 不引入 JS 动画库（如 GSAP、anime.js）。
- 不修改游戏玩法逻辑。

## Decisions

- **纯 CSS 动画工具类**：使用 `@keyframes` + `.anim-fade-in`、`.anim-slide-up`、`.anim-scale-in` 等命名约定。通过 `--anim-delay` CSS 变量和 `.stagger-1` ~ `.stagger-6` 实现交错延迟。
  - 备选：JS IntersectionObserver 触发动画。
  - 取舍：首屏内容少，CSS `animation` 加载即播放已足够；IO 方案增加 JS 复杂度，不采用。

- **悬停增强**：在已有 `scale(1.02)` 基础上叠加 `box-shadow` 发光（使用主题色半透明值）和卡片图标的 `transform: scale(1.15)` 动效。悬停过渡统一为 `0.25s cubic-bezier(0.4, 0, 0.2, 1)`。
  - 备选：使用 `outline` 发光。
  - 取舍：`box-shadow` 视觉更柔和，且已有变量基础，采用。

- **笔记浏览器过渡**：侧边栏宽度过渡从 `0.25s linear` 改为 `0.3s cubic-bezier(0.4, 0, 0.2, 1)`；内容区加 `.anim-fade-in`；树节点悬停加 `transition: background 0.15s`。

- **粗糙页面统一**：将 racing/album/tools/insurance 的导航/按钮替换为共享 CSS 类（如 `.nav-pill`），去除内联样式。tools 页面改用卡片布局 + 主题变量。album 的 CSS 补齐标准前缀。

- **a11y 降级**：`@media (prefers-reduced-motion: reduce)` 下将所有 `animation-duration` 和 `transition-duration` 设为极短值（`0.01s`），保留语义不产生视觉晃动。补充 `:focus-visible` 轮廓样式。

## Risks / Trade-offs

- **[风险]** 动画在低端设备上卡顿。
  **缓解：** 仅使用 `transform` 和 `opacity`（GPU 加速属性），避免 `height/width/margin` 动画。

- **[风险]** 给既有页面加 class 可能遗漏或冲突。
  **缓解：** 工具类使用 `anim-` 前缀命名，与现有类名不冲突。

- **[风险]** album 3D 旋转动画与新工具类冲突。
  **缓解：** album 保留自有 `@keyframes move`，不替换其 3D 动画，只补齐标准前缀和导航样式。
