## Why

笔记浏览器使用 hash 导航（`#AI/index.md`），而 Markdown 中的相对链接（如 `[openspec.md](openspec.md)`）会被浏览器解析为相对于 `note/index.html` 的路径，导致点击后无法正确跳转到对应文档，出现 404 或打开错误页面。

## What Changes

- 在 `assets/js/note-browser.js` 中增加预览区链接拦截：当用户点击预览区内相对路径的 `.md` 或 `.html` 链接时，拦截默认导航，改为通过 `location.hash` 跳转，使笔记浏览器正确加载目标文件

## Capabilities

### New Capabilities

- `note-preview-link-interception`：笔记预览区内相对 `.md` / `.html` 链接的点击被拦截并转换为 hash 导航，支持同目录及 `../` 相对路径解析

### Modified Capabilities

- （无）

## Impact

- **JS**：`assets/js/note-browser.js` 新增 `resolveNotePath`、`initPreviewLinkInterceptor` 及初始化调用
- **无破坏性变更**：外部链接（`http://`、`https://`）及锚点（`#xxx`）保持原有行为
