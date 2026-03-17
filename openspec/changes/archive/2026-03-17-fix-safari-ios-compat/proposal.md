## Why

Safari iOS 上出现多个兼容性问题：

1. **目录打不开（高优先级）**：`isMobile()` 使用 `matchMedia('(max-width: 768px)')` 判断设备类型，但 Safari iOS 在页面初始化时 viewport 可能尚未稳定，导致 `isMobile()` 返回 `false`，工具条的 `≡` 按钮走了桌面端逻辑（切换 `note-sidebar-collapsed`）而不是打开抽屉。
2. **`100vh` 视口高度问题**：Safari iOS 的 `100vh` 包含 URL 栏高度，导致笔记页内容溢出可见区域底部，用户看不到底部内容。
3. **`inset` 不支持（iOS < 14.5）**：`inset: 0` 在旧版 Safari 上无效，导致 overlay 和侧边栏遮罩层不生效。
4. **`blur(calc(...))` 不支持**：`blur(calc(var(--glass-blur) * 0.6))` 在部分 Safari 版本上被忽略，导致按钮/输入框没有模糊效果。
5. **showcase 按钮缺少 `type="button"`**：部分按钮默认为 `submit`，在某些上下文中可能触发意外行为。

## What Changes

- **修复 `isMobile()` 判断**：改为同时检查 `matchMedia` 和 `window.innerWidth`，增加对 `orientationchange`/`resize` 后的重新评估。
- **修复 `100vh`**：在 `note-browser.css` 和 `album/css/style.css` 中为 `100vh` 添加 `-webkit-fill-available` 回退。
- **修复 `inset`**：在所有使用 `inset: 0` 的地方前面加 `top: 0; right: 0; bottom: 0; left: 0` 回退。
- **修复 `blur(calc(...))`**：改为使用预计算的固定 `blur()` 值替代 `calc()` 写法。
- **补齐 `type="button"`**：为 showcase 页面所有缺少 type 的按钮添加 `type="button"`。
- **扩展 `@supports` 降级**：为 `.note-toolbar`、`.note-sidebar` 等添加 backdrop-filter 降级规则。

## Capabilities

### New Capabilities

- 无。

### Modified Capabilities

- `design-system`：`@supports` 降级扩展、`blur(calc())` 替换。
- `note-browser`：`isMobile()` 逻辑修复、`100vh` 回退。

## Impact

- 受影响文件：`assets/js/note-browser.js`（`isMobile()` 重写）、`assets/css/base.css`（`inset` 回退 + `blur` 修复 + 降级扩展）、`assets/css/note-browser.css`（`100vh` 回退 + `inset` 回退）、`games/billiards/billiards.css`（`inset` 回退）、`games/snake/snake.css`（`inset` 回退）、`showcase/index.html`（按钮 type）、`album/css/style.css`（`100vh` 回退）。
