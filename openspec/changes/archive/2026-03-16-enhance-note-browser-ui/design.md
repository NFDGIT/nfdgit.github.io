## Context

笔记浏览器是站点使用频率最高的页面之一，但 CSS 排版长期只做了最基础的 reset + 间距，Markdown 内容渲染后的视觉效果远不如 GitHub/Notion 等现代笔记产品。交互上也缺少面包屑、搜索和代码高亮等常见能力。

## Goals / Non-Goals

**Goals:**

- 让 Markdown 内容排版达到接近 GitHub 风格的可读性和美观度。
- 侧边栏通过图标和色条提供更清晰的视觉层级。
- 代码块获得语法高亮能力。
- 打开文件后有面包屑路径导航。
- 空态页更友好。
- 移动端抽屉更精致。

**Non-Goals:**

- 不做全文搜索（可作为后续 change）。
- 不改变 manifest 结构或文件加载流程。
- 不引入构建工具。

## Decisions

- **代码高亮方案**：使用 highlight.js CDN（`@11.x`），配合 `marked` 的 renderer 回调自动检测语言。
  - 备选：Prism.js。
  - 取舍：highlight.js 自动检测语言更好（笔记中很多代码块无语言标记），且与 marked 集成简单。

- **图标方案**：使用 CSS `::before` 伪元素 + emoji 或 SVG data-URI，不引入图标字体库。
  - 备选：引入 Lucide/Material Icons。
  - 取舍：emoji 足以区分文件夹/Markdown/HTML，无需额外依赖。

- **面包屑**：在预览区顶部添加一行 `<nav class="note-breadcrumb">`，由 JS 在文件加载时动态更新。
  - 备选：放在侧边栏头部。
  - 取舍：放在内容区与阅读流更贴近。

- **引用块与表格样式**：引用块使用左侧 4px 主题色条 + 浅背景；表格使用斑马行 + 圆角 + 细边框。纯 CSS 实现。

- **highlight.js 主题适配**：亮色用 `github`，暗色用 `github-dark`。通过两个 `<link>` 标签 + `media` 属性或 JS 动态切换。
  - 决定使用 JS 在主题切换时动态替换 `<link>` 的 `href`，与已有 `theme.js` 的 `data-theme` 属性联动。

## Risks / Trade-offs

- **[风险]** highlight.js CDN 不可达时代码块无高亮。
  **缓解：** 代码块保留基础 `pre/code` 样式，高亮只是增量，不影响可读性。

- **[风险]** 自动语言检测偶尔误判。
  **缓解：** highlight.js 误判率低于 5%，且用户可以在 Markdown 中指定语言标签。

- **[风险]** 样式修改量大，可能影响已有排版。
  **缓解：** 所有新样式都限定在 `.note-preview-content` 选择器下，不影响其他页面。
