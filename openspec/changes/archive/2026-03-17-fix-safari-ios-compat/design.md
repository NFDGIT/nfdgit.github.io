## Context

Safari iOS 有几个众所周知的 CSS/JS 行为差异：`100vh` 包含 URL 栏、`matchMedia` 在页面初始化时可能不准确、部分 CSS 新特性（`inset`、`calc` inside `blur()`）在旧版本不支持。这些问题在其他浏览器不存在，需要针对性修复。

## Goals / Non-Goals

**Goals:**

- 确保笔记页目录在 Safari iOS 上能正常打开。
- 确保全屏页面（笔记、相册）不会因 `100vh` 溢出。
- 确保所有 overlay/遮罩在旧版 Safari 上正常定位。
- 确保按钮模糊效果在旧版 Safari 上不丢失。

**Non-Goals:**

- 不支持 iOS 12 及更旧版本。
- 不改变功能逻辑。

## Decisions

- **`isMobile()` 修复**：改为 `window.innerWidth <= MOBILE_BREAKPOINT`（更可靠），保留 `matchMedia` 作为次要检查。Safari iOS 在 `DOMContentLoaded` 时 `window.innerWidth` 已经准确。
  - 备选：用 `navigator.userAgent` 检测 Safari。
  - 取舍：UA 嗅探不可靠且维护成本高，不采用。

- **`100vh` 修复**：使用 `height: 100vh; height: -webkit-fill-available;` 双写法。Safari 支持 `-webkit-fill-available` 作为"可见视口高度"。
  - 备选：用 JS 动态计算 `window.innerHeight`。
  - 取舍：CSS 方案更简洁且无 JS 开销。

- **`inset` 回退**：在 `inset: 0` 前添加 `top: 0; right: 0; bottom: 0; left: 0`。浏览器会忽略不认识的 `inset` 并使用前面的四个属性。

- **`blur(calc(...))` 替换**：将 `blur(calc(var(--glass-blur) * 0.6))` 替换为 `blur(12px)`（20 * 0.6 = 12），`blur(calc(var(--glass-blur) * 0.5))` 替换为 `blur(10px)`。用硬编码值虽然不够灵活，但保证兼容性。

## Risks / Trade-offs

- **[风险]** `blur()` 硬编码值与 `--glass-blur` 变量脱钩。
  **缓解：** 在注释中标注来源（`12px = --glass-blur * 0.6`），变量改时同步更新。
