## Why

站点所有内容仅有中文版。需要支持中英文双语，让英文用户也能访问。

## What Changes

### 第一阶段：基础设施（本次变更）
- 创建语言切换 JS 脚本 `assets/js/lang.js`
- 在所有页面的导航栏添加语言切换按钮（🌐 中/EN）
- 创建 `/en/` 目录镜像结构
- 翻译首页 `en/index.html` 作为示例/模板

### 第二阶段（后续变更）
- 翻译教程目录、教程系列 12 篇
- 翻译术语速查
- 翻译游戏、相册、工具等页面

本次只做第一阶段——搭好基础设施 + 首页英文版，确认方案可行后再批量翻译。

## Capabilities

### New Capabilities

无。

### Modified Capabilities

无。

## Impact

- `assets/js/lang.js`：新建（语言切换逻辑）
- `assets/css/base.css`：添加语言切换按钮样式
- `index.html`：添加语言切换按钮
- `en/index.html`：新建（英文首页）
- `en/` 目录结构：创建镜像目录
