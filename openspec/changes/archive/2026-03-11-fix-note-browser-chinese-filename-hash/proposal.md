# 修复笔记浏览器中文文件名首次点击无法打开

## Why

在笔记页（`note/index.html`）中，点击目录树里**中文文件名**（如 `底层原理.md`）时，第一次点击常出现「无法加载文件」或无法打开，必须再点一次才能正常显示。根因是：设置 `location.hash` 后浏览器可能将 hash 编码为百分号形式，随后触发的 `hashchange` 从 hash 读出的 path 为编码串，与 manifest 中未编码的 path 不一致，导致 `findNodeByPath` 失败且 fetch 时对已编码 path 再编码而请求失败，从而覆盖了首次点击已正确加载的预览。

## What Changes

- 在 **`assets/js/note-browser.js`** 中修改 **`getFileFromHash()`**：对从 `location.hash` 取出的字符串做 **decodeURIComponent**（try/catch 兜底），使得到的 path 与 manifest 中存储的 path 一致，这样无论是点击触发的 load 还是 hashchange 触发的 load 都使用同一套逻辑 path，避免查找失败与双重编码。
- 不改变点击时传入的 `node.path`、不改变 manifest 生成逻辑；仅统一「从 hash 读取的 path」的语义。

## Capabilities

### New Capabilities

- `note-browser`：笔记浏览器（左树右预览）在点击任意文件名（含中文等非 ASCII）时，应能**首次点击即正确打开并显示**该文件内容，不出现「无法加载文件」或需二次点击才打开的情况。

### Modified Capabilities

无。

## Impact

- **assets/js/note-browser.js**：仅修改 `getFileFromHash()` 的实现，影响所有依赖 hash 加载文件的路径（初始加载、hashchange、预览内链跳转）。
- 无 API 或依赖变更；兼容现有 manifest 与 URL 习惯。
