## Why

教程目录页（`guide/index.html`）使用大卡片布局，12 篇教程需要滚动好几屏，无法一览全局。而且所有教程平铺无分类，不知道从哪看起。需要改为紧凑的分组列表布局，让用户一眼看到全部教程和分类。

## What Changes

- 重写 `guide/index.html`：从大卡片网格改为紧凑的分类列表布局
- 重写 `guide/guide.css`：新的列表样式替代大卡片样式
- 教程分为 4 组：基础入门（主教程+核心能力）、高级架构（多Agent+Skills+RAG）、框架与工具（MCP+OpenClaw）、生产实战（Prompt+Streaming+Deploy+Security）

## Capabilities

### New Capabilities

无。

### Modified Capabilities

无。

## Impact

- `guide/index.html`：HTML 结构重写
- `guide/guide.css`：CSS 重写
- 不影响任何教程页面本身
