## 1. 全局动画工具类与可访问性基础

- [x] 1.1 在 `home.css` 中新增 `@keyframes` 定义：`fade-in`、`slide-up`、`scale-in`
- [x] 1.2 在 `home.css` 中新增工具类 `.anim-fade-in`、`.anim-slide-up`、`.anim-scale-in` 并绑定对应 keyframes
- [x] 1.3 在 `home.css` 中新增交错延迟工具类 `.stagger-1` ~ `.stagger-6`（递增 `animation-delay`）
- [x] 1.4 在 `home.css` 中增强 `.home-card` 悬停效果：发光阴影（主题色半透明 `box-shadow`）+ 图标 `.home-card-icon` 缩放过渡
- [x] 1.5 在 `home.css` 中统一可交互元素过渡曲线为 `0.25s cubic-bezier(0.4, 0, 0.2, 1)`
- [x] 1.6 在 `home.css` 中添加 `:focus-visible` 全局轮廓样式
- [x] 1.7 在 `home.css` 中添加 `@media (prefers-reduced-motion: reduce)` 降级规则

## 2. 首页与游戏目录页动画接入

- [x] 2.1 在 `index.html` 的标题区和卡片元素上添加入场动画类与交错延迟类
- [x] 2.2 在 `games/index.html` 的标题区和游戏卡片上添加入场动画类与交错延迟类
- [x] 2.3 在 `games/assets/games.css` 中为 `.games-card` 悬停添加发光与图标缩放

## 3. 笔记浏览器过渡增强

- [x] 3.1 在 `note-browser.css` 中将侧边栏展开/收起过渡从 `linear` 改为 `cubic-bezier(0.4, 0, 0.2, 1)`
- [x] 3.2 在 `note-browser.css` 中为树节点悬停添加 `transition: background 0.15s ease`
- [x] 3.3 在 `note-browser.js` 中为预览区内容切换添加淡入 class（或 CSS 过渡）

## 4. 粗糙页面视觉统一

- [x] 4.1 racing：将导航区内联样式迁移到 `home.css` 的共享 `.nav-pill` 类，添加悬停过渡
- [x] 4.2 album：补齐 CSS 标准前缀（`transform`、`animation`），导航改用共享类
- [x] 4.3 tools：替换硬编码颜色为主题变量，改用卡片布局，添加入场动画类
- [x] 4.4 insurance：导航改用共享样式，添加基础过渡效果
