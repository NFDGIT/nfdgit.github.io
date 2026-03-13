## Context

台球游戏在 3D 模式下使用与 2D 相同的 `toLogical(clientX, clientY)`：用 wrap（canvas 的父元素）的 getBoundingClientRect 与全局 scale（wrap.clientWidth / LOGIC_W）将屏幕坐标转为逻辑坐标。当前实现中，3D 时 wrap 内可见的是 3D 容器（position: absolute），2D 画布被隐藏；若 3D 容器的实际显示区域与 wrap 的尺寸或宽高比不一致，或 scale 仅按宽度计算导致纵轴换算错误，就会出现「同一拖拽在 3D 下得到的逻辑坐标与 2D 下不同」，从而出杆方向不匹配。

## Goals / Non-Goals

**Goals:**

- 使 3D 模式下拖拽得到的逻辑坐标与 2D 模式下**同一屏幕位置**得到的逻辑坐标一致，从而瞄准方向与击球方向与 2D 一致。
- 不改变 2D 模式下的 toLogical 与事件行为。

**Non-Goals:**

- 不修改物理或规则逻辑；不增加新依赖。

## Decisions

- **统一使用「当前接收事件的视口」的 rect 与比例**：在 3D 模式下，用 **3D 容器（或其中 WebGL canvas）的 getBoundingClientRect()** 作为坐标换算的基准，而不是 wrap；并采用 **scaleX = rect.width / LOGIC_W、scaleY = rect.height / LOGIC_H** 分别换算 logicX、logicY，避免容器与逻辑宽高比不一致时单 scale 带来的纵向拉伸/压缩。这样同一屏幕位置在 2D 画布与 3D 画布上会得到相同的逻辑点（在两者尺寸一致的前提下）；若 3D 容器与 2D 画布同尺寸同位置，则方向一致。
- **事件仍挂在 wrap 上**：继续在 wrap 上监听指针事件，但 toLogical 根据当前 renderMode 选择 rect 与 scale 来源：renderMode === '3d' 且 threeContainer 可见时，用 threeContainer（或 scene3d.renderer.domElement）的 getBoundingClientRect() 及 width/height 计算 scaleX、scaleY；否则用 wrap（或 canvas）的 rect 与现有单一 scale）。这样 3D 下点击/拖拽的 clientX/Y 相对于 3D 视图换算，方向即与视觉一致。
- **备选**：若实现时发现 3D 容器与 2D 画布始终同尺寸同位置（wrap 内绝对定位填满），则问题可能来自别处（例如 CSS 或设备像素比导致 3D canvas 实际绘制区域与 rect 不一致）；仍优先采用「3D 时用 3D 容器的 rect + scaleX/scaleY」以保证与可见视图一致。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| 2D 与 3D 容器尺寸不完全一致导致两模式手感略有差异 | 通过 CSS 保证 3D 容器与 2D 画布同尺寸（均已做）；若仍有偏差可再核对 setSize 与 wrap 尺寸。 |
| scaleX/scaleY 在 2D 下未使用导致行为变化 | 2D 时保持现有 toLogical（单 scale + wrap rect），仅 3D 分支使用 scaleX/scaleY + 3D 容器 rect。 |

## Migration Plan

- 无数据迁移。发布后验证：在 2D 与 3D 下对同一相对位置拖拽，击球方向一致。

## Open Questions

- 无。若修复后仍有偏差，再排查 3D 容器内 WebGL canvas 的 display size 与 client rect 是否一致（含 devicePixelRatio）。
