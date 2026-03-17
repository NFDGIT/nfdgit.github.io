## 1. 修复目录打不开（最高优先级）

- [x] 1.1 修改 `note-browser.js` 的 `isMobile()` 函数：改用 `window.innerWidth <= MOBILE_BREAKPOINT` 作为主要判断
- [x] 1.2 确保 `initSidebarToggle` 中的工具条按钮在移动端正确走 `openSidebar()` 分支

## 2. 修复 100vh 视口问题

- [x] 2.1 在 `note-browser.css` 中 `body` 的 `height: 100vh` 后添加 `height: -webkit-fill-available` 回退
- [x] 2.2 在 `album/css/style.css` 中 `body` 的 `height: 100vh` 后添加同样的回退

## 3. 修复 inset 兼容性

- [x] 3.1 在 `base.css` 的 `.glass-overlay` 的 `inset: 0` 前添加 `top: 0; right: 0; bottom: 0; left: 0`
- [x] 3.2 在 `note-browser.css` 的 `.note-sidebar-overlay` 的 `inset: 0` 前添加四向回退
- [x] 3.3 在 `billiards.css` 的 `.billiards-overlay` 和 `.billiards-3d-wrap` 的 `inset: 0` 前添加四向回退
- [x] 3.4 在 `snake.css` 的 `.snake-overlay` 的 `inset: 0` 前添加四向回退

## 4. 修复 blur(calc()) 兼容性

- [x] 4.1 将 `base.css` 中 `.glass-btn` 和 `.glass-input`/`.glass-textarea` 的 `blur(calc(var(--glass-blur) * 0.6))` 替换为 `blur(12px)`
- [x] 4.2 将 `billiards.css` 中 `.billiards-btn` 的 `blur(calc(...))` 替换为 `blur(12px)`
- [x] 4.3 将 `insurance.css` 中 `.ins-cta-secondary` 的 `blur(calc(...))` 替换为 `blur(12px)`

## 5. 其他修复

- [x] 5.1 为 `showcase/index.html` 中所有缺少 `type` 的按钮添加 `type="button"`
- [x] 5.2 在 `base.css` 的 `@supports` 降级规则中补充 `.note-toolbar` 等组件的回退
