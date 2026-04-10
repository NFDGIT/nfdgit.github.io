## Why

当前站点经过多次迭代，已积累了以下结构性问题：

1. **架构碎片化**：各子模块（note、games、album、tools、insurance、showcase、guide）各自为政，HTML 结构、导航模式、脚本加载方式不统一，维护成本高。
2. **UI 一致性不足**：虽有 `base.css` 液态玻璃设计系统，但各页面实际使用程度参差不齐（如 insurance 页面风格偏离、album 交互单一、guide 页面缺少统一导航）。
3. **用户体验断裂**：页面间缺少统一导航和过渡，子页面回到首页路径不一致，移动端体验在部分页面（如相册、台球游戏）存在明显不足。
4. **代码可维护性瓶颈**：无模块化加载策略，JS 通过全局变量耦合，CSS 重复定义多处，manifest 构建流程手动触发，缺少统一的错误处理和性能监控。

现在是进行全面重构的合适时机——设计系统已相对成熟，OpenSpec 工作流已建立，可以系统性地解决上述问题。

## What Changes

### 架构层
- 建立**统一页面 Shell**：所有页面共享一致的 HTML 骨架（导航栏、主内容区、页脚），通过模板片段或约定实现
- 引入**轻量模块化 JS 架构**：使用 ES Modules（`type="module"`）替代当前 IIFE + 全局变量模式，保持零构建工具
- 统一**脚本加载策略**：共享脚本通过 `<script type="module">` 引入，消除加载顺序依赖问题
- 建立**统一路由约定**：所有子模块采用一致的 URL 结构和面包屑导航

### UI 层
- **升级设计系统**：扩展 `base.css` 组件库，新增布局组件（`.glass-layout`、`.glass-sidebar`）、表单组件、反馈组件（toast/loading），统一间距/圆角/阴影的 token
- **统一导航体验**：所有页面使用增强版 `glass-nav`，含面包屑、移动端汉堡菜单、当前位置高亮
- **首页改版**：优化卡片布局，增加个人简介区域，支持卡片分组和动态排序
- **相册页重构**：从纯 CSS 3D 盒子升级为响应式瀑布流/网格画廊，支持灯箱预览和触摸手势
- **保险页整合**：融入设计系统，统一色彩和组件风格，移除遗留的硬编码样式

### 体验层
- **全局过渡动画**：页面间 View Transition（渐进增强），组件状态切换动画统一
- **移动端体验全面优化**：统一触摸交互、安全区域适配（`env(safe-area-inset-*)`）、底部导航栏
- **可访问性增强**：ARIA 标注完善、键盘导航全覆盖、焦点管理、屏幕阅读器支持
- **性能优化**：图片懒加载、CSS/JS 按需加载、关键渲染路径优化、manifest 预构建
- **离线支持**：引入 Service Worker 实现核心页面离线缓存（渐进增强）

### 工程层
- **CSS 架构重组**：从松散文件改为分层架构（tokens → base → components → layouts → pages）
- **统一错误处理**：全局 JS 错误捕获和用户友好提示
- **自动化 manifest**：笔记 manifest 生成集成到 Git hooks 或 CI

## Capabilities

### New Capabilities
- `unified-page-shell`：统一页面骨架——所有页面共享导航栏、面包屑、页脚的 HTML 结构约定
- `es-module-architecture`：ES Module 模块化架构——使用原生 ES Modules 替代全局变量，零构建工具
- `responsive-album`：响应式相册——瀑布流/网格布局、灯箱预览、触摸手势支持
- `mobile-navigation`：移动端导航系统——汉堡菜单、底部标签栏、安全区域适配
- `accessibility-system`：可访问性体系——ARIA、键盘导航、焦点管理、屏幕阅读器支持
- `offline-support`：离线缓存——Service Worker 实现核心页面和资源的离线访问
- `css-architecture`：CSS 分层架构——tokens/base/components/layouts/pages 五层结构
- `performance-optimization`：性能优化——懒加载、按需加载、关键路径优化

### Modified Capabilities
- `design-system`：扩展组件库（布局组件、表单、反馈组件），统一设计 token，增加间距/圆角/阴影规范
- `theme`：增强主题切换动画，View Transition 支持，所有页面强制统一主题体验
- `note-browser`：迁移至 ES Module 架构，优化移动端侧边栏交互，增强搜索体验
- `global-animation-system`：统一 View Transition API 支持，增强组件状态过渡动画
- `games-directory`：统一至页面 Shell，增强移动端游戏列表交互
- `tools-collection`：统一至页面 Shell，增强工具卡片交互
- `insurance-landing`：全面融入设计系统，移除硬编码样式，统一至页面 Shell
- `glass-showcase`：作为设计系统文档升级，展示所有新增组件
- `static-site-maintainability`：ES Module 架构替代当前脚本分拆方案，manifest 自动化
- `album-gallery`：从 3D 盒子替换为响应式画廊（此能力被 `responsive-album` 取代，保留 spec 兼容性说明）

## Impact

### 受影响的文件
- **所有 HTML 文件**（~26 个）：需要更新至统一 Shell 结构
- **`assets/css/`**：`base.css` 拆分重组，新增 token/component/layout 层文件
- **`assets/js/`**：所有共享脚本迁移至 ES Module 格式
- **`note/`**：note-browser 系列 JS 重构为模块
- **`games/`**：各游戏页面适配统一 Shell
- **`album/`**：HTML/CSS/JS 全面重写
- **`insurance/`**：样式全面重构
- **`showcase/`**：升级为完整设计系统文档

### 依赖变更
- 无新增外部依赖（保持纯静态架构）
- CDN 依赖（marked、highlight.js、qrcodejs）保持不变
- 新增 Service Worker 注册脚本（纯浏览器 API）

### 兼容性
- **BREAKING**：页面 HTML 结构变更，如有外部链接到具体 DOM 元素可能失效
- **BREAKING**：JS 全局变量（如 `window.NOTE_MANIFEST`、`window.SiteUtils`）将逐步替换为模块导出
- 浏览器兼容：ES Module 需要现代浏览器（Chrome 61+、Firefox 60+、Safari 11+），符合目标用户群
