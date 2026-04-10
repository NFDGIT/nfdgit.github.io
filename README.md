# nfdgit.github.io

个人静态站点，托管于 [GitHub Pages](https://pages.github.com/)。技术栈为纯 HTML / CSS / JavaScript（ES Modules），无打包构建；页面语言以简体中文为主（`lang="zh-CN"`），主题通过 `data-theme` 与 CSS 变量切换。

## 架构概览

### CSS 分层架构

```
assets/css/
├── tokens.css          # 设计令牌（颜色、间距、圆角、阴影、过渡）
├── reset.css           # CSS Reset
├── base.css            # 基础层（大字模式、焦点可见性、动画降级）
├── animations.css      # 动画工具类（入场/退场/交错/View Transition）
├── components/         # 组件层
│   ├── button.css      # .glass-btn、.theme-toggle、.large-text-toggle
│   ├── card.css        # .glass-card
│   ├── nav.css         # .glass-nav、.glass-nav-link
│   ├── panel.css       # .glass-panel
│   ├── overlay.css     # .glass-overlay
│   ├── form.css        # .glass-input、.glass-select、.glass-textarea
│   ├── breadcrumb.css  # .glass-breadcrumb
│   ├── toast.css       # .glass-toast
│   └── lightbox.css    # .glass-lightbox
├── layouts/            # 布局层
│   ├── shell.css       # 页面 Shell（导航栏、汉堡菜单、页脚）
│   ├── grid.css        # 通用网格
│   └── sidebar.css     # 侧边栏布局
└── pages/              # 页面层
    ├── home.css
    └── note-browser.css
```

### JS 模块架构（ES Modules）

```
assets/js/
├── theme-init.js       # 同步主题初始化（防 FOUC，非 module）
├── legacy.js           # nomodule 回退（旧浏览器）
├── utils/              # 工具层
│   ├── dom.js          # DOM 操作（getCssVar、isMobile、isTouchDevice）
│   ├── storage.js      # localStorage 封装
│   └── event-bus.js    # 事件总线
├── core/               # 核心层
│   ├── shell.js        # 页面 Shell 注入（导航、面包屑、页脚、SW 注册）
│   ├── theme.js        # 主题切换（含 View Transition）
│   ├── large-text.js   # 大字模式
│   └── router.js       # 路由工具（面包屑、当前位置）
├── components/         # 组件层
│   ├── toast.js        # Toast 通知
│   ├── lightbox.js     # 灯箱预览
│   └── lazy-load.js    # 图片懒加载
└── note-browser*.js    # 笔记浏览器模块
```

## 目录概览

| 路径 | 说明 |
|------|------|
| [`index.html`](index.html) | 站点首页，入口导航到各子模块 |
| [`assets/css/`](assets/css/) | 分层 CSS 架构（tokens → reset → base → components → layouts → pages） |
| [`assets/js/`](assets/js/) | ES Module 架构（utils → core → components） |
| [`note/`](note/) | 笔记浏览器：左侧目录树、右侧 Markdown/HTML 预览 |
| [`games/`](games/) | 小游戏（台球、贪吃蛇、赛车）及游戏目录页 |
| [`album/`](album/) | 响应式相册，支持灯箱预览 |
| [`tools/`](tools/) | 小工具合集（JSON 格式化、颜色转换、二维码） |
| [`insurance/`](insurance/) | 保险业务落地页 |
| [`showcase/`](showcase/) | 液态玻璃设计系统组件演示 |
| [`guide/`](guide/) | 教程与文档入口 |
| [`openspec/`](openspec/) | OpenSpec 规范与变更记录 |
| [`scripts/`](scripts/) | 仓库维护脚本 |
| [`sw.js`](sw.js) | Service Worker（离线缓存） |

## 本地开发

```bash
# 安装依赖（可选，仅用于脚本）
npm install

# 启动本地服务器
npm run serve
# 或
python3 -m http.server 8080

# 生成笔记 manifest
npm run generate-manifest
```

浏览器访问 `http://localhost:8080/`。

## 统一页面 Shell

所有页面通过 `shell.js` 模块在运行时注入统一导航栏、面包屑和页脚。页面通过 `<body>` 上的 `data-shell-*` 属性配置 Shell 行为：

- `data-shell-nav="false"` — 不注入导航栏
- `data-shell-nav="custom"` — 页面自行管理导航（如笔记页）
- `data-shell-breadcrumb="false"` — 不显示面包屑
- `data-shell-footer="false"` — 不注入页脚

## 规范与变更流程

功能与行为变更使用仓库内 OpenSpec 工作流（`openspec/`）。历史提案与归档见 `openspec/changes/archive/`。
