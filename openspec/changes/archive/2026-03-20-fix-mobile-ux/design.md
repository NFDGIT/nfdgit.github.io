## Context

前一轮的 CSS 补丁有 bug，需要整体重写确保正确性。

## Decisions

| Bug | 修复方案 |
|-----|---------|
| 代码块 `overflow:hidden` + `::after` 冲突 | 移除 `::after`，改用代码块容器的 `mask-image` CSS 渐变做右侧淡出提示 |
| 底部导航箭头 flex 冲突 | 移除冲突的选择器，移动端统一用 column 布局 |
| 进度条无背景 | 添加 `background: var(--glass-bg)` + backdrop-filter |
| 图表竖排箭头 | 用 CSS `writing-mode` 或简单的旋转文字替代 |

## Risks / Trade-offs

无。完整重写一次性解决所有问题。
