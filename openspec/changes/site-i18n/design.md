## Context

站点是纯静态 HTML/CSS/JS，无构建工具。共 25+ 个 HTML 页面。需要一种简单可靠的双语方案。

## Goals / Non-Goals

**Goals:**
- 用户可以在任何页面切换中英文
- 语言选择持久化（localStorage）
- 每种语言的页面是独立的 HTML 文件（SEO 友好）
- CSS、JS、图片等资源共享不复制
- 方案足够简单，后续翻译只需复制 HTML 文件并替换文字

**Non-Goals:**
- 不用 JSON 翻译文件（页面内容太丰富，data-i18n 方案不实际）
- 不改变现有中文页面的 URL 结构
- 第一阶段不翻译所有页面

## Decisions

### 方案：镜像目录 + 语言切换脚本

```
/                          ← 中文版（保持不变）
├── index.html
├── guide/
│   ├── index.html
│   └── agent/
│       ├── index.html
│       └── ...
├── games/
│   └── ...
│
/en/                       ← 英文版（镜像结构）
├── index.html
├── guide/
│   ├── index.html
│   └── agent/
│       ├── index.html
│       └── ...
├── games/
│   └── ...
│
/assets/                   ← 共享资源（不复制）
├── css/
├── js/
└── ...
```

### 语言切换逻辑（lang.js）

1. 读取 `localStorage.lang`，默认根据 `navigator.language` 判断
2. 页面加载时检查：如果当前语言偏好与页面语言不匹配，自动跳转
   - 中文页面路径：`/guide/agent/index.html`
   - 英文页面路径：`/en/guide/agent/index.html`
   - 切换逻辑：加或去掉 `/en/` 前缀
3. 语言按钮点击时：切换 localStorage 并跳转到对应语言版本

### 资源路径处理

英文页面中的资源路径需要多一级 `../`：
- 中文 `guide/agent/index.html` → `../../assets/css/base.css`
- 英文 `en/guide/agent/index.html` → `../../../assets/css/base.css`

但为了避免路径混乱，英文版统一使用**绝对路径**引用资源：`/assets/css/base.css`

### 语言按钮

在 `glass-nav` 中添加一个语言切换按钮，样式与 `theme-toggle` 一致。显示当前语言的缩写（中/EN），点击切换。

## Risks / Trade-offs

- **[资源路径]** → 英文页面用绝对路径（`/assets/...`），需要部署在站点根目录才能工作。GitHub Pages 默认就是根目录，没问题。
- **[内容同步]** → 改了中文页面内容后需要手动同步到英文版。这是所有静态双语方案的共同问题，暂无完美解决方案。
- **[不存在的英文页面]** → 如果用户在英文模式下访问还没翻译的页面，lang.js 应该 fallback 到中文版而不是 404。
