## Why

英文版目前仅翻译了首页，其余 18+ 页面均未覆盖，维护成本高但实际价值有限。移除英文版可简化项目结构，减少后续每次改动的同步负担。

## What Changes

- **删除** `/en/` 目录及其下所有英文 HTML 页面
- **删除** `assets/js/lang.js` 语言切换脚本
- **移除** 首页 `index.html` 中的语言切换按钮（`.lang-toggle`）及 `lang.js` 引用
- **清理** `assets/css/base.css` 中 `.lang-toggle` 相关样式

## Capabilities

### New Capabilities

_无_

### Modified Capabilities

_无_

## Impact

- 删除文件：`en/index.html`、`assets/js/lang.js`
- 修改文件：`index.html`（移除按钮和脚本标签）、`assets/css/base.css`（移除 `.lang-toggle` 样式）
- 无 API 或依赖变更
- 无破坏性变更（英文版尚未对外发布）
