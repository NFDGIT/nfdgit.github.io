## Context

项目在 `site-i18n` 变更中引入了英文支持：`/en/` 镜像目录、`assets/js/lang.js` 切换脚本、首页的 `.lang-toggle` 按钮。目前仅首页有英文版，其余页面未覆盖。需要干净地回退这些改动。

## Goals / Non-Goals

**Goals:**
- 完全移除英文版相关代码与文件，使项目回到纯中文状态
- 确保移除后无残留引用导致 404 或 JS 报错

**Non-Goals:**
- 不重新设计导航栏布局（移除按钮后自然回落即可）
- 不涉及其他页面内容变更

## Decisions

1. **直接删除文件而非保留备份**
   - `/en/` 目录和 `assets/js/lang.js` 直接删除
   - 理由：Git 历史已保留完整记录，无需额外备份

2. **CSS 清理策略：仅移除 `.lang-toggle` 独有规则**
   - `.theme-toggle, .large-text-toggle, .lang-toggle` 组合选择器中移除 `.lang-toggle`
   - `.lang-toggle` 单独的样式块整体删除
   - `hover` 组合选择器中同样移除
   - 理由：保留其他按钮样式不受影响

3. **HTML 清理：移除按钮元素和脚本标签**
   - `index.html` 中删除 `<button class="lang-toggle">` 元素
   - 删除 `<script src="./assets/js/lang.js">` 标签
   - 理由：无引用后应清理干净

## Risks / Trade-offs

- **风险**：未来若需重新支持英文 → 可从 Git 历史恢复，成本低
- **风险**：其他页面可能也引用了 `lang.js` → 经搜索确认仅 `index.html` 引用，风险为零
