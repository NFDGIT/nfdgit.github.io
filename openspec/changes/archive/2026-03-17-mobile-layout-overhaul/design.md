## Context

全站有 10 个用户可见页面，其中 5 个使用 `.glass-nav` 固定导航、1 个使用 `.note-toolbar`、4 个使用页内 header。移动端断点在 480~768 之间有 5 种不同值，`.glass-nav` 完全没有移动端适配，导致内容被遮挡、入口缺失等问题。

## Goals / Non-Goals

**Goals:**

- 所有页面在移动端都能正常访问"返回首页"。
- `.glass-nav` 在移动端缩紧 padding 并给内容留出避让空间。
- 断点统一为 `768px`（主断点）+ `480px`（超小屏辅助）。
- 工具页、赛车页的移动端布局修复。

**Non-Goals:**

- 不重做各页面的桌面端布局。
- 不改变游戏玩法或侧边栏功能。

## Decisions

- **`.glass-nav` 移动端适配**：在 `base.css` 添加 `@media (max-width: 768px)` 规则：缩小 `padding` 和 `gap`，添加 `--nav-height: 44px` 变量。所有使用 `.glass-nav` 的页面在 body 上加 `.has-glass-nav` 类，CSS 给 `.has-glass-nav` 的首个内容容器加 `padding-top: var(--nav-height)`。
  - 备选：每个页面单独加 padding-top。
  - 取舍：一个类统一处理更不易遗漏。

- **笔记页返回首页恢复**：不再 `display: none`，改为移动端缩短为只显示 `←` 图标（`.note-toolbar-home span` 隐藏文字）。
  - 备选：加独立的返回按钮。
  - 取舍：工具条空间紧张，图标化最省空间。

- **断点统一**：将 `games.css`/`snake.css` 中的 `700px` 改为 `768px`，`insurance.css`/`showcase.css` 中的 `640px` 改为 `768px`。保留 `480px` 作为超小屏辅助断点。

## Risks / Trade-offs

- **[风险]** 断点统一可能让某些页面在 641~768px 范围内提前切换为移动布局。
  **缓解：** 这个范围的设备本身就更接近手机而非桌面，提前切换反而更合理。
