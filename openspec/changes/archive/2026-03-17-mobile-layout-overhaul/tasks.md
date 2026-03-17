## 1. glass-nav 移动端适配

- [x] 1.1 在 `base.css` 中添加 `@media (max-width: 768px)` 规则：`.glass-nav` 缩小 padding/gap，定义 `--nav-height: 44px`
- [x] 1.2 在 `base.css` 中添加 `.has-glass-nav` body 类规则：首个内容容器 `padding-top: var(--nav-height)`
- [x] 1.3 在所有使用 `.glass-nav` 的页面（index、album、insurance、showcase）的 body 添加 `.has-glass-nav` 类

## 2. 笔记页移动端修复

- [x] 2.1 修改 `note-browser.css`：移除 `.note-toolbar-home { display: none }` 规则，改为移动端只显示 `←` 图标（隐藏文字）
- [x] 2.2 修改 `note/index.html`：返回首页链接结构改为 `<a><span class="note-home-icon">←</span><span class="note-home-text">首页</span></a>`

## 3. 首页和保险页避让修复

- [x] 3.1 在 `home.css` 中为 `.home-header` 移动端增加足够的 `padding-top`（≥ nav-height + 原有 padding）
- [x] 3.2 在 `insurance.css` 中为 `.ins-hero` 移动端增加 `padding-top` 避让

## 4. 工具页移动端修复

- [x] 4.1 在 `tools/index.html` 的 `<style>` 中添加移动端媒体查询：`.tools-header` 改为 `flex-wrap: wrap`，`.tools-actions` 全宽

## 5. 断点统一

- [x] 5.1 将 `games.css` 中的 `max-width: 700px` 改为 `max-width: 768px`
- [x] 5.2 将 `snake.css` 中的 `max-width: 700px` 改为 `max-width: 768px`
- [x] 5.3 将 `insurance.css` 中的 `max-width: 640px` 改为 `max-width: 768px`
- [x] 5.4 将 `showcase.css` 中的 `max-width: 640px` 改为 `max-width: 768px`

## 6. 赛车页移动端调整

- [x] 6.1 在 `games/racing/index.html` 的 `<style>` 中添加移动端媒体查询：`.game-links` 缩小 gap 和 padding
