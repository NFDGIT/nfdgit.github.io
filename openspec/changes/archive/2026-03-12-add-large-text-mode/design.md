## Context

站点为纯静态 HTML/CSS/JS，已有主题切换（亮/暗）通过 `data-theme` 与 `theme.js` + localStorage 实现，样式通过 CSS 变量区分。大字模式需在不破坏现有主题与布局的前提下，增加「整体放大文字」的开关与持久化，与主题并列、互不覆盖。

## Goals / Non-Goals

**Goals:**

- 提供用户可点击的大字模式开关，开启后全站（或主要页面）正文与标题字体按统一比例放大。
- 开关状态持久化到 localStorage，跨会话恢复。
- 实现方式与现有主题脚本风格一致，便于维护。

**Non-Goals:**

- 不实现「仅某一块区域放大」或「多档位字体大小」；本阶段仅做开/关两档。
- 不强制依赖系统无障碍偏好（如 `prefers-contrast`）；可选后续扩展。

## Decisions

1. **状态与 DOM 挂钩方式**  
   使用 `data-large-text="on"` 挂在 `document.documentElement` 上（与 `data-theme` 一致）。开启时根节点带该属性，CSS 通过 `[data-large-text="on"]` 选择器放大字体。  
   *备选*：仅用 class（如 `.large-text`）。选用 data 属性可与现有主题写法统一，且便于与未来其他「模式」并列。

2. **存储 key**  
   使用独立 key，如 `largeText`，与 `theme` 分开存储，避免与主题逻辑耦合。

3. **字体放大策略**  
   在共享 CSS 中为根或 body 定义基准 `font-size`（或使用现有基准），大字模式通过覆盖 CSS 变量或根 `font-size`（如 `100%` → `118%` 或 `1.2` 倍）实现整体缩放；标题、正文等使用 `em`/`rem` 时自动跟随。若当前部分使用 px，则需在 `[data-large-text="on"]` 下为关键模块增加 rem/em 或 scale 规则，保证主要阅读区域一致放大。

4. **脚本组织**  
   新增 `assets/js/large-text.js`，独立负责：读取/写入 localStorage、设置/移除 `data-large-text`、绑定 `.large-text-toggle` 按钮。与 `theme.js` 并列加载，各自只处理自己的 key 与 DOM，避免互相覆盖。

5. **开关控件**  
   在已有主题按钮旁增加「大字模式」按钮（如 🔤 或 A+），使用 class `large-text-toggle`，`aria-label` 为「开启大字模式」/「关闭大字模式」。仅在有主题切换的页面（首页、笔记、游戏目录等）增加该按钮，子页面可随入口页面已加载的脚本与根 data 属性生效（若子页面同源且共用同一根或继承 body 样式）。

## Risks / Trade-offs

- **Risk**：部分页面使用固定 `px` 字体且未挂共享样式，大字模式可能不生效。  
  **Mitigation**：优先在 `home.css`、`note-browser.css` 等共享样式中用 rem/根 font-size 放大；若发现某模块未放大，可在 tasks 中单独补一条对应该模块的 CSS。
- **Risk**：与主题脚本执行顺序或重复设置导致闪烁。  
  **Mitigation**：与主题一样，在 `<head>` 内内联一段仅读 storage 并设置 `data-large-text` 的脚本，避免 FOUC；`large-text.js` 在 DOMContentLoaded 时再绑定按钮并同步一次状态。
