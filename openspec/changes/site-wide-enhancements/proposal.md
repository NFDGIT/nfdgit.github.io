## Why

项目分析发现四个待优化区域：相册页面使用 `margin-left: 42%` 硬编码定位完全不响应式；工具页仅有占位符无实际功能；赛车游戏 `app.js` 中大量硬编码颜色不跟随暗色主题；笔记浏览器缺少搜索功能，随着笔记增多查找困难。这些都是提升站点完整度和体验的低垂果实。

## What Changes

- **相册页面现代化**：去除 `margin-left: 42%` 硬编码定位，改为 flexbox/grid 居中；补齐标准 CSS 前缀；移动端响应式适配（3D 立方体在窄屏自动缩小）。
- **工具页加实际功能**：添加 3 个纯前端小工具（JSON 格式化/美化、颜色格式转换 HEX↔RGB↔HSL、二维码生成），使用卡片式布局，每个工具为一个可展开的交互卡片。
- **赛车游戏暗色主题适配**：将 `app.js` 中关键 UI 颜色（背景色、文字色、按钮色）改为读取 CSS 变量或根据 `data-theme` 属性动态切换，游戏画面内颜色保持不变。
- **笔记浏览器搜索**：在侧边栏头部添加搜索框，支持按文件名模糊搜索，实时过滤目录树并高亮匹配项。

## Capabilities

### New Capabilities

- `album-gallery`：定义相册页面的布局、响应式和交互要求。
- `tools-collection`：定义工具页面的工具列表、各工具的输入/输出和交互要求。

### Modified Capabilities

- `note-browser`：新增搜索功能要求。

## Impact

- 受影响文件：`album/index.html`、`album/css/style.css`、`tools/index.html`（大幅扩展）、`games/racing/index.html`、`games/racing/app.js`（主题相关 UI 色）、`note/index.html`、`assets/js/note-browser.js`、`assets/css/note-browser.css`。
- 新增 CDN 依赖：`qrcode.js`（二维码生成，轻量无依赖）。
- 不改变游戏核心玩法。
