## Why

移动端存在多处严重的体验问题：

1. **笔记页返回首页消失**：`.note-toolbar-home` 在 `≤768px` 时 `display: none`，移动端完全无法返回首页。
2. **首页/保险页内容被 `.glass-nav` 遮挡**：`.glass-nav` 固定在顶部但 body 没有对应的 `padding-top`，首屏内容被导航栏盖住。
3. **工具页窄屏挤压**：`.tools-header` 无 `flex-wrap`，窄屏下标题和按钮挤在一行溢出。
4. **断点不统一**：各页面用了 768、700、640、560、480 五种不同的移动端断点，维护混乱。
5. **赛车页导航遮挡**：`.game-links` 固定在左上角，可能与游戏 UI 重叠。
6. **全局缺少统一的移动端 `.glass-nav` 适配**：固定导航栏没有任何移动端样式调整。

## What Changes

- **修复笔记页**：移动端恢复返回首页入口（不再 `display: none`，而是缩短文案为"←"图标按钮）。
- **全局 `.glass-nav` 移动端适配**：在 `base.css` 中添加 `≤768px` 媒体查询，缩小 padding/gap，给所有使用 `.glass-nav` 的页面统一处理内容避让（`.has-glass-nav` body 类 + `padding-top`）。
- **首页移动端修复**：首页 `.home-header` 增加足够的 `padding-top` 避让 `.glass-nav`。
- **保险页修复**：移动端 hero 区增加 `padding-top` 避让导航栏。
- **工具页修复**：`.tools-header` 添加 `flex-wrap: wrap` + 移动端堆叠。
- **断点统一**：全站统一使用 `768px` 作为移动端断点（不改变 `≤480px` 的超小屏特殊处理）。
- **赛车页导航调整**：移动端缩小 `.game-links` 间距，确保不遮挡核心 UI。

## Capabilities

### New Capabilities

- 无。

### Modified Capabilities

- `note-browser`：移动端工具条恢复返回首页。
- `design-system`：`.glass-nav` 添加移动端响应式规则。
- `theme`：全站断点统一规范。

## Impact

- 核心受影响文件：`assets/css/base.css`、`assets/css/home.css`、`assets/css/note-browser.css`、`insurance/insurance.css`、`tools/index.html`、`games/racing/index.html`。
- 轻微修改：`note/index.html`、`index.html`、`showcase/showcase.css`。
- 不改变功能逻辑。
