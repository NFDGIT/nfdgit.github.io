# nfdgit.github.io

个人静态站点，托管于 [GitHub Pages](https://pages.github.com/)。技术栈为纯 HTML / CSS / JavaScript，无打包构建；页面语言以简体中文为主（`lang="zh-CN"`），主题通过 `data-theme` 与 CSS 变量切换。

## 目录概览

| 路径 | 说明 |
|------|------|
| [`index.html`](index.html) | 站点首页，入口导航到各子模块 |
| [`assets/css/`](assets/css/) | 共享样式：`base.css`（全局与主题变量）、`home.css`、`note-browser.css` 等 |
| [`assets/js/`](assets/js/) | 共享脚本：`theme.js` / `theme-init.js`、`large-text.js`、`utils.js`（`SiteUtils` 工具）、笔记浏览器多文件（`note-browser-*.js`） |
| [`note/`](note/) | 笔记浏览器：左侧目录树、右侧 Markdown/HTML 预览；目录数据由 `manifest.js`（可由脚本生成）提供 |
| [`games/`](games/) | 小游戏（台球、贪吃蛇等）及游戏目录页 |
| [`album/`](album/) | 相册 |
| [`tools/`](tools/) | 小工具合集 |
| [`insurance/`](insurance/) | 保险业务落地页 |
| [`showcase/`](showcase/) | 组件/设计展示 |
| [`guide/`](guide/) | 教程与文档入口 |
| [`openspec/`](openspec/) | OpenSpec 规范与变更记录 |
| [`scripts/`](scripts/) | 仓库维护脚本（如笔记 manifest 生成） |

## 本地预览

在仓库根目录启动任意静态文件服务即可，例如：

```bash
python3 -m http.server 8080
```

浏览器访问 `http://localhost:8080/`。笔记页依赖 `note/manifest.js`；若新增或调整了 `note/` 下笔记文件，请先运行下方 manifest 生成命令。

## 笔记目录（manifest）生成

扫描 `note/` 下 Markdown/HTML，生成 `manifest.json` 与内嵌数据的 `manifest.js`：

```bash
node scripts/generate-note-manifest.js
```

## 共享工具（JavaScript）

`assets/js/utils.js` 暴露 `SiteUtils`，包含例如：

- `getCssVar`、`isMobile`、`isTouchDevice`
- `getUrlParam(name)`：读取当前页 URL 查询参数

新页面如需主题，通常引入 `theme-init.js`（置于 `<head>` 尽早）、`theme.js`（置于 `</body>` 前），并与 `base.css` 配合。

## 规范与变更流程

功能与行为变更使用仓库内 OpenSpec 工作流（`openspec/`）。历史提案与归档见 `openspec/changes/` 与 `openspec/changes/archive/`。
