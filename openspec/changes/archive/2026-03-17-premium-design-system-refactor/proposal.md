## Why

项目经过多轮迭代后，代码组织和视觉风格呈碎片化状态：9 个 CSS 文件中大量重复定义（主题切换按钮定义了 2 份、按钮样式 4 份、面板/overlay 各 2 份、导航链接 3 份）；每个页面的 header/nav 结构都不一样（共 9 种写法）；`getCssVariable()` 在 snake 和 billiards 中各写了一遍；racing 页导航仍用内联样式。视觉上缺乏统一的设计语言——按钮、面板、卡片各有各的圆角、阴影、模糊值。需要一次系统级重构，建立苹果风格的液态玻璃（glassmorphism）设计系统，让整站看起来高级且一致。

## What Changes

### 代码封装层（结构治理）

- 新建 `assets/css/base.css`：抽取全局 reset、主题变量、字体栈、`data-large-text`、`focus-visible`、`prefers-reduced-motion` 规则。`home.css` 和 `note-browser.css` 不再重复定义这些。
- 新建 `assets/js/utils.js`：封装 `getCssVariable()`、`isMobile()`、`isTouchDevice()`。snake/billiards 改为引用此文件。
- 将 9 个 HTML 文件中重复的主题初始化内联脚本提取为 `assets/js/theme-init.js`（极小，同步加载）。

### 液态玻璃设计系统（视觉升级）

- 在 `base.css` 中定义液态玻璃变量：`--glass-bg`（半透明白/暗）、`--glass-blur`（20px）、`--glass-border`（半透明边框）、`--glass-shadow`。
- 定义通用组件类：`.glass-panel`（液态玻璃面板）、`.glass-btn`（液态玻璃按钮）、`.glass-card`（液态玻璃卡片）、`.glass-nav`（液态玻璃导航条）、`.glass-overlay`（液态玻璃遮罩）。
- 所有通用控件（主题切换、大字模式、导航链接、开始/重置按钮、状态条）统一为液态玻璃风格。

### 全站页面接入

- 所有页面的 header/nav 统一为 `.glass-nav` 结构。
- billiards/snake 的 `.billiards-panel`/`.snake-panel` 改为继承 `.glass-panel`。
- billiards/snake 的 overlay 改为继承 `.glass-overlay`。
- 各页面的按钮统一为 `.glass-btn` + `.glass-btn-primary` 变体。
- 消除所有内联 `style` 属性。
- `.nav-pill` 替换为 `.glass-btn` 或 `.glass-nav-link`。

## Capabilities

### New Capabilities

- `design-system`：定义站点统一的液态玻璃设计系统，包括 CSS 变量、通用组件类、交互规范。

### Modified Capabilities

- `theme`：主题变量从各文件集中到 `base.css`；液态玻璃色值随主题切换。
- `note-browser`：侧边栏和控件接入液态玻璃风格。
- `games-directory`：卡片和导航接入液态玻璃。
- `billiards-game`：面板、按钮、overlay 接入统一组件。
- `snake-game`：面板、按钮、overlay 接入统一组件。

## Impact

- 新增文件：`assets/css/base.css`、`assets/js/utils.js`、`assets/js/theme-init.js`。
- 大幅修改文件：`assets/css/home.css`（瘦身，移出 base 内容）、`assets/css/note-browser.css`（移出重复定义，接入 glass 类）、`games/billiards/billiards.css`、`games/snake/snake.css`、`insurance/insurance.css`。
- 全部 9 个 HTML 页面：统一引入 `base.css` + `theme-init.js`，统一 header/nav 结构。
- JS 修改：`snake.js`、`billiards.js` 移除内部 `getCssVariable`/`getCss`，改用 `utils.js`。
- 无新增外部依赖。
