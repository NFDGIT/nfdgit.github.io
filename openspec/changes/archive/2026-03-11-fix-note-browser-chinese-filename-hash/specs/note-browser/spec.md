# note-browser

## Purpose

定义站点**笔记浏览器**（`note/index.html` + `assets/js/note-browser.js`）的交互与加载行为：左树右预览、通过 hash 与 manifest 加载文件；须保证含中文等非 ASCII 文件名的文件在**首次点击**即可正确打开并显示，不出现「无法加载文件」或需二次点击才打开。

## ADDED Requirements

### Requirement: 中文等非 ASCII 文件名首次点击即可打开

笔记浏览器 SHALL 在用户点击目录树中任意文件（含中文或其它非 ASCII 字符的文件名）时，**第一次点击**即能正确加载并显示该文件内容；SHALL 不出现「无法加载文件」的提示，也不要求用户再次点击同一文件才能打开。

#### Scenario: 点击中文文件名一次即打开
- **WHEN** 用户在笔记页目录树中点击一个文件名为中文（或含中文路径）的条目（如 `Flutter/底层原理.md`）
- **THEN** 右侧预览区 SHALL 在本次点击后即显示该文件内容（或来自 manifest 内嵌 content，或通过 fetch 成功加载），不显示「无法加载文件」

#### Scenario: 从 hash 恢复时中文路径正确加载
- **WHEN** 页面通过带 hash 的 URL 打开（如 `note/index.html#Flutter/底层原理.md` 或其编码形式），或用户刷新后 hash 仍指向含中文路径的文件
- **THEN** 笔记浏览器 SHALL 能根据 hash 正确解析出与 manifest 一致的 path，并成功加载并显示该文件，不因 path 编码不一致导致查找或 fetch 失败
