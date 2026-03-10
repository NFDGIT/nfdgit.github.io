## ADDED Requirements

### Requirement: 相对 md/html 链接拦截

系统 SHALL 在笔记预览区内拦截对相对路径 `.md` 或 `.html` 链接的点击，阻止默认导航，改为设置 `location.hash` 为目标文件的 manifest 路径，从而触发笔记浏览器的 hash 导航逻辑。

#### Scenario: 同目录链接跳转

- **WHEN** 用户在预览 `AI/index.md` 时点击链接 `[openspec.md](openspec.md)`
- **THEN** 预览区切换为 `AI/openspec.md` 的内容，且 URL hash 为 `#AI/openspec.md`

#### Scenario: 父目录链接跳转

- **WHEN** 用户在预览 `AI/subdir/foo.md` 时点击链接 `[../README.md](../README.md)`
- **THEN** 预览区切换为 `AI/README.md` 的内容（若存在）

### Requirement: 外部链接与锚点不受影响

系统 SHALL 不拦截以 `http://`、`https://` 开头的链接，以及以 `#` 开头的锚点链接，保持浏览器默认行为。

#### Scenario: 外部链接正常跳转

- **WHEN** 用户点击预览区内的 `[官方文档](https://example.com/docs)`
- **THEN** 浏览器按默认行为打开外部链接
