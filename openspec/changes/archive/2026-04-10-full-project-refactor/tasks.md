## 1. CSS 架构重组（Phase 1 基础）

- [x] 1.1 创建 `assets/css/tokens.css`，从 `base.css` 提取所有 CSS 自定义属性（颜色、glass-*、radius），新增间距 token（--space-xs ~ --space-2xl）、阴影层级 token（--shadow-sm ~ --shadow-xl）、过渡时长 token（--transition-fast/normal/slow）
- [x] 1.2 创建 `assets/css/reset.css`，从 `base.css` 提取 CSS Reset 部分（*、html、body、a、button 等重置规则）
- [x] 1.3 精简 `assets/css/base.css`，保留排版、字体栈、data-large-text、focus-visible、prefers-reduced-motion 规则，移除已提取到 tokens/reset 的内容
- [x] 1.4 创建 `assets/css/components/` 目录，从 `base.css` 提取组件类：nav.css（.glass-nav）、card.css（.glass-card）、button.css（.glass-btn）、breadcrumb.css（面包屑样式）
- [x] 1.5 新增组件 CSS：form.css（.glass-input/.glass-select/.glass-textarea）、toast.css（.glass-toast）、lightbox.css（灯箱样式）
- [x] 1.6 创建 `assets/css/layouts/` 目录：shell.css（页面 Shell 布局）、grid.css（通用网格）、sidebar.css（侧边栏布局）
- [x] 1.7 创建 `assets/css/animations.css`，从 `base.css` 提取动画工具类，新增退场动画（.anim-fade-out/.anim-slide-down）和 View Transition 过渡规则
- [x] 1.8 将 `home.css` 迁移为 `assets/css/pages/home.css`，移除与组件层重复的样式，仅保留首页特有布局
- [x] 1.9 将 `note-browser.css` 迁移为 `assets/css/pages/note-browser.css`，移除与 tokens/components 重复的变量和样式定义
- [x] 1.10 更新所有 HTML 页面的 `<link>` 引用，按 tokens → reset → base → animations → 组件 → 布局 → 页面 顺序加载
- [x] 1.11 验证所有页面在新 CSS 架构下样式无回归（亮色/暗色主题、移动端/桌面端）

## 2. JS 模块化架构（Phase 2）

- [x] 2.1 创建 `assets/js/utils/dom.js` ES Module，封装 getCssVariable()、isMobile()、isTouchDevice() 等工具函数
- [x] 2.2 创建 `assets/js/utils/storage.js` ES Module，封装 localStorage 读写（主题偏好、大字模式等）
- [x] 2.3 创建 `assets/js/utils/event-bus.js` ES Module，实现简易事件总线用于模块间通信
- [x] 2.4 重构 `assets/js/theme.js` 为 ES Module（core/theme.js），export initTheme/toggleTheme/getCurrentTheme，集成 View Transition 支持
- [x] 2.5 重构 `assets/js/large-text.js` 为 ES Module（core/large-text.js），export initLargeText/toggleLargeText
- [x] 2.6 保留 `assets/js/theme-init.js` 为同步脚本（非 module），确保 FOUC 防护
- [x] 2.7 创建 `assets/js/core/router.js` ES Module，实现面包屑生成和当前位置高亮功能
- [x] 2.8 创建 `assets/js/components/toast.js` ES Module，实现全局 toast 通知组件
- [x] 2.9 创建 `assets/js/components/lightbox.js` ES Module，实现灯箱预览组件（支持键盘导航和触摸手势）
- [x] 2.10 创建 `assets/js/components/lazy-load.js` ES Module，实现图片懒加载（Intersection Observer）
- [x] 2.11 创建 `<script nomodule>` 回退脚本（assets/js/legacy.js），提供主题切换等核心功能的 IIFE 版本
- [x] 2.12 验证模块间无循环依赖，utils 不依赖 core/components，core 不依赖 components

## 3. 统一页面 Shell（Phase 2）

- [x] 3.1 创建 `assets/js/core/shell.js` ES Module，实现导航栏运行时注入（站点标题、页面链接、主题切换、大字模式）
- [x] 3.2 实现 Shell 面包屑注入功能，根据 `data-shell-breadcrumb` 属性生成面包屑
- [x] 3.3 实现 Shell 页脚注入功能（版权信息、返回顶部链接）
- [x] 3.4 实现导航栏当前页面高亮（根据 URL 路径匹配）
- [x] 3.5 实现 Shell 配置系统（data-shell-nav、data-shell-breadcrumb、data-shell-footer 等 body 属性）
- [x] 3.6 CSS 层面为 Shell 预留导航栏和页脚高度占位，确保注入前后无 CLS
- [x] 3.7 首页适配：更新 index.html 使用 Shell，添加 data-shell 属性配置
- [x] 3.8 创建仓库根目录 `package.json`，定义 scripts（generate-manifest、serve）

## 4. 移动端导航系统（Phase 2）

- [x] 4.1 在 shell.js 中实现移动端汉堡菜单逻辑（展开/收起、遮罩层、背景滚动锁定）
- [x] 4.2 实现汉堡菜单 CSS（滑入/滑出动画、遮罩层半透明背景）
- [x] 4.3 实现安全区域适配（env(safe-area-inset-*) 用于导航栏和底部固定元素）
- [x] 4.4 桌面端水平导航样式和响应式断点切换（768px）
- [x] 4.5 实现菜单 ARIA 标注和焦点管理（打开时焦点进入菜单，关闭时焦点恢复）

## 5. 各页面适配统一 Shell（Phase 3）

- [x] 5.1 游戏目录页适配：更新 `games/index.html`，添加 Shell 配置，移除独立导航实现
- [x] 5.2 各游戏子页面适配：更新 `games/racing/index.html`、`games/snake/index.html`、`games/billiards/index.html`，添加 Shell 面包屑配置
- [x] 5.3 工具页适配：更新 `tools/index.html`，使用 Shell 导航，工具卡片改用 .glass-card/.glass-btn/.glass-input 组件类，添加 toast 反馈
- [x] 5.4 保险页适配：更新 `insurance/index.html`，使用 Shell 导航，hero/产品卡片/CTA 改用设计系统组件，移除硬编码样式
- [x] 5.5 重构 `insurance.css`（迁移为 pages/insurance.css），仅保留页面特有布局，移除重复的组件样式
- [x] 5.6 展示页适配：更新 `showcase/index.html`，使用 Shell 导航，新增布局/表单/反馈组件演示区段和完整 token 展示
- [x] 5.7 教程页适配：更新 `guide/index.html` 及子页面，使用 Shell 导航和面包屑
- [x] 5.8 验证所有页面在统一 Shell 下导航、面包屑、主题切换正常工作

## 6. 笔记浏览器重构（Phase 3）

- [x] 6.1 将 note-browser.js 重构为 ES Module 入口模块（import 各子模块）
- [x] 6.2 将 note-browser-state.js、note-browser-sidebar.js、note-browser-tree.js、note-browser-preview.js、note-browser-search.js 各重构为 ES Module
- [x] 6.3 笔记页使用自定义 Shell 配置（data-shell-nav="custom"），保留自定义工具条
- [x] 6.4 实现移动端侧边栏触摸手势（左边缘右滑打开、侧边栏左滑关闭）
- [x] 6.5 实现搜索快捷键（/ 聚焦、Escape 清空失焦）
- [x] 6.6 笔记页 CSS 引用设计系统 token 和组件类，移除 note-browser.css 中重复的变量定义
- [x] 6.7 验证中文文件名首次点击加载、hash 恢复、搜索过滤等功能无回归

## 7. 相册页重构（Phase 3）

- [x] 7.1 重写 `album/index.html`，移除 3D 盒子结构，改为 CSS Grid 响应式图片网格
- [x] 7.2 实现 CSS Grid 响应式布局（桌面 3-4 列，移动 1-2 列，渐进增强 masonry）
- [x] 7.3 集成灯箱组件（点击图片打开、左右切换、Escape 关闭）
- [x] 7.4 实现灯箱触摸手势（左右滑动切换、双指缩放）
- [x] 7.5 实现图片懒加载和占位色块
- [x] 7.6 相册页使用 Shell 导航和面包屑（「首页 > 相册」）
- [x] 7.7 验证相册在亮色/暗色主题和各屏幕尺寸下正常显示

## 8. 可访问性增强（Phase 4）

- [x] 8.1 为所有交互元素添加 ARIA 标注（主题切换、汉堡菜单、灯箱控件、工具按钮等）
- [x] 8.2 实现焦点管理：模态组件（灯箱、汉堡菜单）打开时焦点陷阱、关闭时焦点恢复
- [x] 8.3 验证所有页面可通过纯键盘完成主要操作（Tab 导航、Enter 激活、Escape 关闭）
- [x] 8.4 所有页面添加语义化标签（nav/main/header/footer/article/section），确保每页有且仅有一个 main
- [x] 8.5 为所有内容图片添加描述性 alt 属性，装饰性图片使用 alt=""
- [x] 8.6 验证亮色/暗色主题下文本对比度符合 WCAG AA（4.5:1 正文、3:1 大号文本）

## 9. 离线支持（Phase 4）

- [x] 9.1 创建 `sw.js` Service Worker 文件，实现安装/激活/fetch 事件处理
- [x] 9.2 实现核心页面和静态资源的 Cache-First 策略
- [x] 9.3 实现笔记 manifest 和内容的 Network-First 策略
- [x] 9.4 实现版本化缓存名和旧缓存清理逻辑
- [x] 9.5 创建离线提示页（offline.html），在未缓存资源离线请求时展示
- [x] 9.6 在页面中添加 SW 注册脚本（feature detection，不支持时无报错）
- [x] 9.7 验证离线场景：首页/笔记页/游戏目录缓存后断网可访问

## 10. 性能优化（Phase 4）

- [x] 10.1 为所有非首屏图片添加 `loading="lazy"` 属性
- [x] 10.2 优化关键渲染路径：确保 tokens/reset/base CSS 在 head 中直接加载，组件/页面 CSS 按需加载
- [x] 10.3 灯箱等非关键 JS 组件使用动态 `import()` 按需加载
- [x] 10.4 manifest 生成脚本增加版本戳输出，支持缓存更新判断
- [x] 10.5 保险页和相册页产品/图片懒加载集成
- [x] 10.6 验证系统字体栈无自定义 Web 字体加载

## 11. 工程化与文档（Phase 4）

- [x] 11.1 更新 `README.md`，描述新的目录结构、CSS/JS 分层架构、本地开发和 manifest 构建流程
- [x] 11.2 配置 Git pre-commit hook 或 package.json script 自动运行 manifest 生成
- [x] 11.3 游戏大型脚本（billiards.js）提取纯函数到独立 ES Module（billiards-math.js）
- [x] 11.4 最终全站回归测试：所有页面在 Chrome/Firefox/Safari 的桌面端和移动端正常运行
- [x] 11.5 验证所有 BREAKING 变更的兼容性：ES Module 浏览器支持、全局变量移除无残留引用
