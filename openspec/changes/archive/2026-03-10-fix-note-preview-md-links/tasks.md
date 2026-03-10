## 1. 路径解析与链接拦截

- [x] 1.1 在 `note-browser.js` 中实现 `resolveNotePath(currentPath, href)`：将相对路径解析为 manifest 绝对路径，支持 `..` 与 `.`
- [x] 1.2 实现 `initPreviewLinkInterceptor()`：在预览区监听 click，拦截相对 `.md` / `.html` 链接，设置 `location.hash` 并 `preventDefault`
- [x] 1.3 在 `init()` 中调用 `initPreviewLinkInterceptor()`
