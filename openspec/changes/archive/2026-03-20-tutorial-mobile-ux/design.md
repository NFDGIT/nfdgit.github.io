## Context

当前 `agent-guide.css` 有两个移动端断点：`max-width: 899px`（进度条横向）和 `max-width: 600px`（基础响应式）。需要增强这两个断点的样式并补充触控优化。

## Goals / Non-Goals

**Goals:**
- 所有可点击元素触控区域 >= 44px
- 代码块在移动端可读（字号、滚动提示）
- 图表在窄屏优雅折行
- 底部导航在移动端易用
- 进度导航条可滑动且当前项可见

**Non-Goals:**
- 不改变 HTML 结构
- 不改变桌面端样式

## Decisions

### 具体优化项

| 问题 | 方案 |
|------|------|
| 代码块字太小 | 移动端代码 font-size 提升到 0.85rem，pre 增加水平滚动渐变提示 |
| 进度条太挤 | 增加 padding 和 min-height，确保 44px 触控区 |
| 图表压扁 | 窄屏下图表竖排（flex-direction: column），箭头旋转 90 度 |
| 折叠按钮太小 | 移动端 min-height: 44px，加大 padding |
| 复制按钮太小 | 移动端 min-height: 36px，加大 padding |
| 12 个 pill 导航 | 移动端竖排列表，每行一个 pill，确保触控区 |
| 上下篇按钮 | 加大 padding，增加触控面积 |
| 代码截断无提示 | 代码块右侧加渐变遮罩提示可滚动 |

## Risks / Trade-offs

无风险。纯 CSS 样式增强，不影响桌面端。
