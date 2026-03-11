## 1. 修改 getFileFromHash 解码 hash

- [x] 1.1 在 `assets/js/note-browser.js` 的 `getFileFromHash()` 中，对 `location.hash.slice(1)` 的结果做 `decodeURIComponent` 再返回；使用 try/catch，解码异常时退回原字符串；保持对空串及含 `#` 的过滤逻辑不变

## 2. 验证

- [x] 2.1 在笔记页中点击含中文文件名的文件（如 `Flutter/底层原理.md`），确认首次点击即可打开；刷新后带 hash 的 URL 能正确恢复该文件预览；预览内链跳转到中文路径文件时也能一次打开
