## Why

Skills 教程当前写法面向开发者：每一步直接上代码，概念用技术术语解释。不懂编程的读者在第一段就会迷失。目标是让**不懂编程的人也能读懂主线**，懂编程的人通过展开折叠区深入了解。

## What Changes

重写 `skills.html` 全部 5 个 Step 的叙事层：
- 每步先用**生活类比**解释概念（菜谱、说明书等），不出现任何代码
- 代码示例全部移入**可折叠的"技术细节"区块**
- 现有知识点折叠区保留并增强
- 不改变页面结构（5 步 + sidebar + 底部导航不变）

## Capabilities

### New Capabilities

无。

### Modified Capabilities

无。

## Impact

- `guide/agent/skills.html`：全部 5 个 Step 的 HTML 内容重写（结构不变，叙事和代码位置调整）
