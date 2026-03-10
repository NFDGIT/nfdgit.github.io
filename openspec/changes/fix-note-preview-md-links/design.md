## Context

笔记浏览器为单页应用，入口为 `note/index.html`，当前文件路径存于 `location.hash`（如 `#AI/index.md`）。Markdown 渲染后的相对链接（如 `[openspec.md](openspec.md)`）会触发浏览器默认导航，解析基准为 `note/index.html`，导致路径错误。

## Goals / Non-Goals

**Goals:**

- 预览区内相对 `.md` / `.html` 链接点击后正确跳转到目标文档
- 支持同目录（`openspec.md`）及父目录（`../IT/README.md`）相对路径

**Non-Goals:**

- 不修改 Markdown 源文件中的链接写法
- 不处理外部链接或 `#` 锚点

## Decisions

### 方案选择：链接拦截 vs 修改 Markdown

- **选择**：在 `note-browser.js` 中拦截预览区链接点击
- **理由**：无需改动各笔记的 Markdown，且后续新增笔记中的相对链接自动生效

### 路径解析

- **选择**：实现 `resolveNotePath(currentPath, href)`，将相对路径解析为 manifest 中的绝对路径
- **理由**：`loadFileByPath` 依赖 manifest 路径（如 `AI/openspec.md`），需将 `openspec.md` 解析为 `AI/openspec.md`

### 事件委托

- **选择**：在 `PREVIEW_EL` 上使用 `addEventListener('click')`，通过 `e.target.closest('a')` 获取链接
- **理由**：预览内容为动态渲染，事件委托可覆盖所有链接

## Risks / Trade-offs

- **[风险]** 若 Markdown 中存在与笔记路径同名的外部资源链接，可能被误拦截 → **缓解**：仅拦截不以 `://` 或 `#` 开头的链接
- **[取舍]** 不拦截 `./` 开头的显式相对路径 → 当前解析逻辑已支持，`./xxx.md` 与 `xxx.md` 等效
