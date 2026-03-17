## Context

站点有 7 个 CSS 文件、6 个 JS 文件和 9 个 HTML 页面。审计发现：主题切换按钮定义了 2 份、按钮样式 4 份、玻璃面板 2 份、overlay 2 份、导航链接 3 份、`getCssVariable()` 2 份、主题初始化脚本 9 份复制粘贴。header/nav 有 9 种不同写法。视觉上混用 `blur(4px)`/`blur(6px)`/`blur(12px)`，rgba 值随意设定，缺乏统一的设计令牌。

## Goals / Non-Goals

**Goals:**

- 建立 `base.css` 作为设计系统基础层，定义液态玻璃变量和所有通用组件类。
- 让所有页面的 header/nav、按钮、面板、overlay 使用统一组件类。
- 代码瘦身：`home.css` 和 `note-browser.css` 的重复定义被 `base.css` 替代。
- JS 公共函数封装到 `utils.js`，主题初始化脚本提取为独立文件。
- 消除所有内联 `style` 属性。
- 视觉效果达到苹果风格的液态玻璃质感：大模糊、半透明、细边框、微光泽。

**Non-Goals:**

- 不重写游戏逻辑。
- 不改变页面的功能或路由。
- 不引入 CSS 预处理器或构建工具。

## Decisions

### 液态玻璃设计令牌

```css
--glass-bg-light: rgba(255, 255, 255, 0.72);
--glass-bg-dark: rgba(30, 33, 40, 0.68);
--glass-blur: 20px;
--glass-border: 1px solid rgba(255, 255, 255, 0.18);
--glass-border-dark: 1px solid rgba(255, 255, 255, 0.08);
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
--glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.25);
--radius-sm: 10px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-pill: 999px;
```

- 备选：material design 3 风格。
- 取舍：苹果液态玻璃更高级，且 `backdrop-filter` 浏览器兼容性已足够。

### CSS 分层架构

```
base.css     →  reset + 变量 + 通用组件（所有页面引用）
home.css     →  首页/游戏目录专用（grid、header 扩展）
note-browser.css → 笔记浏览器专用（侧边栏、树、预览区）
<game>.css   →  各游戏专用（画布、游戏 UI）
insurance.css → 保险专用（hero、产品卡片）
```

- 备选：合并为单文件。
- 取舍：单文件太大且 note/游戏不需要彼此的样式，分层更清晰。

### 通用组件类设计

| 组件 | 类名 | 用途 |
|------|------|------|
| 液态玻璃面板 | `.glass-panel` | 替代 billiards/snake 的 panel |
| 液态玻璃按钮 | `.glass-btn`, `.glass-btn-primary` | 替代所有按钮类 |
| 液态玻璃导航 | `.glass-nav` | 固定顶部导航条 |
| 液态玻璃导航链接 | `.glass-nav-link` | 替代 `.nav-pill`、`.billiards-nav-link` 等 |
| 液态玻璃卡片 | `.glass-card` | 替代 `.home-card` 的玻璃变体 |
| 液态玻璃 overlay | `.glass-overlay` | 替代 billiards/snake 的 overlay |
| 主题切换 | `.theme-toggle`（统一定义在 base.css） | 所有页面共用 |

### JS 封装

- `utils.js`：`getCssVar(name)` + `isMobile(bp)` + `isTouchDevice()`
- `theme-init.js`：3 行同步脚本，替代 9 份内联复制

### header/nav 统一方案

所有页面使用 `.glass-nav` 固定导航条（顶部右对齐），包含返回链接 + 功能按钮。游戏页额外在下方有 `.glass-panel` 的状态信息。笔记页保留侧边栏结构，但侧边栏头部接入 `.glass-nav` 样式。

## Risks / Trade-offs

- **[风险]** `backdrop-filter` 在 Firefox < 103 不支持。
  **缓解：** 添加 `@supports` 回退，无 `backdrop-filter` 时使用不透明背景。

- **[风险]** 大规模 CSS 重构导致样式回归。
  **缓解：** 分批改（先 base.css + 通用组件 → 再逐页接入），每步验证。

- **[风险]** 液态玻璃在低端设备性能差。
  **缓解：** `prefers-reduced-motion` 下降级为不透明背景 + 无模糊。
