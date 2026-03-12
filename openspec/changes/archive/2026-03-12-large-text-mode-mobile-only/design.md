## Context

当前大字模式在首页、笔记页、游戏目录页均显示 A+ 开关，任意视口下均可开启并持久化。需求改为：仅移动端显示并生效，PC 端不显示开关且不应用大字样式。站点已使用 769px 作为桌面/移动分界（如 note-browser 的 min-width:769px）。

## Goals / Non-Goals

**Goals:**

- 在视口宽度 &lt; 769px（移动端）时，大字模式开关可见、可操作，偏好持久化，行为与现有一致。
- 在视口宽度 ≥ 769px（桌面端）时，不显示大字模式开关，且不应用大字样式（根节点不设 `data-large-text="on"`）；若用户此前在移动端曾开启，从桌面端再回到移动端时仍按存储恢复。

**Non-Goals:**

- 不改变 769px 断点或全站响应式断点体系；不新增「桌面端单独的大字开关」。

## Decisions

1. **断点与「移动端」定义**  
   与笔记页等保持一致：`(max-width: 768px)` 为移动端，`(min-width: 769px)` 为桌面端。用 `window.matchMedia('(max-width: 768px)')` 在 JS 中判断。

2. **桌面端行为**  
   桌面端不应用大字：在 `large-text.js` 初始化及 `resize` 时，若当前为桌面端则移除 `document.documentElement` 的 `data-large-text`（不写入 localStorage，仅不应用样式）；若为移动端则按 localStorage 决定是否设置 `data-large-text`。这样桌面端永远看不到大字效果，移动端存储不变。

3. **开关可见性**  
   用 CSS 媒体查询在桌面端隐藏 `.large-text-toggle`：`@media (min-width: 769px) { .large-text-toggle { display: none; } }`，放在 home.css、note-browser.css 及 games 共用样式（若 games 页用 home.css 则 home 即覆盖）。不删 DOM，仅隐藏，避免 JS 依赖 DOM 存在而报错。

4. **首屏内联脚本**  
   各页 `<head>` 中现有「若 localStorage 为 on 则设 data-large-text」的内联脚本在桌面端会先加上属性，随后 `large-text.js` 在 DOMContentLoaded 时若检测到桌面端会移除该属性。存在极短闪烁可能；若需完全避免，可在内联中加视口判断（不推荐，因内联无 resize），或接受首帧由 JS 统一纠正。

## Risks / Trade-offs

- **Risk**：桌面端从移动端 tab 恢复时，若内联先执行会短暂出现大字再被 JS 去掉。  
  **Mitigation**：JS 尽早执行（如放 body 前或 DOMContentLoaded 前同步执行一次检测并移除），或接受极短闪烁。
- **Trade-off**：桌面端不写入 localStorage，故用户「在桌面端想关掉大字」无需操作——桌面端本来就不应用，只有回到移动端才会再看到开关与上次存储状态。
