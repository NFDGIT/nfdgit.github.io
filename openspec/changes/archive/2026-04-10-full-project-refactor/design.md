## Context

当前站点是部署在 GitHub Pages 上的纯静态个人网站（HTML/CSS/JS，无构建工具），包含 7 个子模块：笔记浏览器、小游戏（赛车/贪吃蛇/台球）、相册、小工具、保险落地页、组件库展示、教程。

经过多轮迭代，站点已建立了「液态玻璃」设计系统和深色/浅色主题支持，但各子模块在 HTML 结构、导航模式、JS 架构、CSS 使用上仍然各自为政。proposal 中列出的架构碎片化、UI 不一致、体验断裂和可维护性问题，需要一次系统性重构来解决。

**约束条件**：
- 必须保持纯静态架构（GitHub Pages 部署），不引入构建工具或框架
- 现有 URL 结构尽量保持稳定（避免 SEO 和外链影响）
- 增量可交付——重构分阶段推进，每阶段结束时站点可正常运行

## Goals / Non-Goals

**Goals:**
- 建立统一的页面骨架约定，使所有页面在导航、布局、主题上行为一致
- 将 JS 架构从全局变量/IIFE 迁移至 ES Modules，提升可维护性
- 扩展设计系统，覆盖所有 UI 场景（布局、表单、反馈、导航）
- 全面提升移动端体验（导航、触摸、安全区域）
- 改善可访问性（ARIA、键盘、焦点管理）
- 为核心页面提供离线访问能力

**Non-Goals:**
- 不引入 React/Vue/Svelte 等前端框架
- 不引入 Webpack/Vite 等构建工具
- 不重写游戏核心逻辑（只做 Shell 适配和移动端优化）
- 不做 SSR/SSG 改造
- 不变更 GitHub Pages 部署方式
- 不迁移现有笔记内容格式（Markdown/HTML 保持不变）

## Decisions

### 1. 页面 Shell 方案：HTML 约定 + JS 运行时注入

**选择**：通过 JS 模块在运行时注入统一的导航栏和页脚，各页面 HTML 保留语义化骨架。

**替代方案**：
- Jekyll includes：依赖 GitHub Pages 的 Jekyll 构建，但当前站点实际未使用 Jekyll 模板功能，引入会增加构建复杂度
- 手动复制粘贴：当前做法，维护成本高，已证明不可持续
- Web Components：浏览器支持良好但 `<template>` 和 Shadow DOM 对 SEO 不友好

**理由**：JS 运行时注入保持零构建，通过 `shell.js` 模块统一管理导航内容。页面 HTML 中只保留 `<div id="app-shell"></div>` 占位，由模块填充。降级时（JS 加载失败），页面内容仍可访问，只是缺少统一导航。

### 2. JS 模块化：原生 ES Modules（无 bundler）

**选择**：使用 `<script type="module">` + `import/export`，文件直接部署。

**替代方案**：
- 保持 IIFE：无法实现真正的模块隔离和依赖管理
- 引入 bundler（Vite/Rollup）：违反零构建约束

**理由**：ES Modules 是浏览器原生支持的模块系统，所有目标浏览器（Chrome 61+、Firefox 60+、Safari 11+）均支持。`type="module"` 自动 defer，天然解决加载顺序问题。模块作用域隔离消除全局变量污染。

**模块结构**：
```
assets/js/
├── core/
│   ├── shell.js          # 页面骨架注入（导航栏、面包屑、页脚）
│   ├── theme.js           # 主题管理（重构自现有 theme.js）
│   ├── large-text.js      # 大字模式（重构自现有）
│   └── router.js          # 简单的路由工具（面包屑生成、当前位置高亮）
├── components/
│   ├── toast.js           # 全局 toast 通知
│   ├── lightbox.js        # 灯箱组件
│   └── lazy-load.js       # 图片/资源懒加载
├── utils/
│   ├── dom.js             # DOM 操作工具
│   ├── storage.js         # localStorage 封装
│   └── event-bus.js       # 简易事件总线
└── theme-init.js          # 保留现有内联初始化（避免 FOUC）
```

### 3. CSS 分层架构：五层结构

**选择**：将 `base.css` 拆分为分层文件，通过 `@import` 或多 `<link>` 加载。

```
assets/css/
├── tokens.css             # 设计 token（颜色、间距、圆角、阴影、字体）
├── reset.css              # CSS Reset
├── base.css               # 基础排版和元素样式
├── components/
│   ├── nav.css            # 导航栏
│   ├── card.css           # 卡片
│   ├── button.css         # 按钮
│   ├── form.css           # 表单控件
│   ├── toast.css          # Toast 通知
│   ├── lightbox.css       # 灯箱
│   └── breadcrumb.css     # 面包屑
├── layouts/
│   ├── shell.css          # 页面 Shell 布局
│   ├── grid.css           # 通用网格
│   └── sidebar.css        # 侧边栏布局
├── pages/
│   ├── home.css
│   ├── note-browser.css
│   ├── games.css
│   ├── album.css
│   ├── tools.css
│   ├── insurance.css
│   └── showcase.css
└── animations.css         # 全局动画（含 View Transition）
```

**理由**：分层架构使样式职责清晰，避免重复定义。`tokens.css` 作为单一真相源管理所有设计变量。页面级 CSS 只包含该页面特有的样式。虽然多文件会增加 HTTP 请求，但 HTTP/2（GitHub Pages 支持）下影响极小。

### 4. 移动端导航：顶部汉堡 + 可选底部标签栏

**选择**：桌面端保持水平导航，移动端折叠为汉堡菜单。笔记浏览器等高频页面增加底部标签栏。

**理由**：汉堡菜单是移动端导航的通用模式，用户熟悉。底部标签栏只在需要频繁切换视图的页面使用（如笔记的目录/内容切换），避免全局过度使用。

### 5. 相册重构：CSS Grid 瀑布流 + 灯箱

**选择**：放弃 CSS 3D 盒子，改用 CSS Grid + `masonry`（渐进增强）+ 灯箱查看。

**替代方案**：
- 保留 3D 盒子：移动端体验差，图片数量受限
- 引入第三方库（PhotoSwipe 等）：增加外部依赖

**理由**：CSS Grid 响应式天然友好，`masonry` 布局在 Firefox 中已支持、Chrome 实验支持，降级为普通网格仍可用。灯箱组件自行实现，保持零依赖。

### 6. 离线支持：Service Worker + Cache-First

**选择**：注册 Service Worker，对核心 HTML/CSS/JS 使用 Cache-First 策略，笔记内容使用 Network-First。

**理由**：渐进增强，不支持 SW 的浏览器完全不受影响。核心页面 Shell 缓存后可实现秒开。笔记内容优先从网络获取以保证最新。

### 7. View Transition：渐进增强

**选择**：使用 `document.startViewTransition()` API（Chrome 111+），为页面内状态切换（主题、面板展开等）添加平滑过渡。跨页面 MPA 过渡暂不实现。

**理由**：API 支持的浏览器自动获得更好体验，不支持的浏览器无任何影响。MPA View Transitions 目前浏览器支持有限，留待后续。

## Risks / Trade-offs

### 风险

- **ES Modules 兼容性** → 影响极少数旧浏览器用户。缓解：`<script nomodule>` 回退加载关键脚本的 IIFE 版本（仅保证基本可用）
- **重构范围过大导致长时间不可部署** → 缓解：严格分阶段，每阶段独立可部署。Phase 1（CSS 架构 + Shell）→ Phase 2（JS 模块化）→ Phase 3（各页面适配）→ Phase 4（增强功能）
- **CSS @import 性能** → 多层 @import 可能导致瀑布加载。缓解：关键 CSS（tokens + reset + base）用 `<link>` 直接加载，组件/布局/页面 CSS 按需引入
- **Service Worker 缓存过时** → 缓解：版本化缓存名，每次部署更新 SW 版本号触发旧缓存清理
- **页面 Shell JS 注入闪烁** → 缓解：`theme-init.js` 保留为内联/阻塞脚本处理主题，Shell 注入使用 CSS 占位高度避免布局偏移

### Trade-offs

- **多文件 vs 单文件**：文件数量增多增加了项目复杂度，但换取了更清晰的职责划分和更好的按需加载
- **运行时 Shell 注入 vs 静态 HTML**：运行时注入增加了对 JS 的依赖，但消除了跨页面维护导航的负担
- **渐进增强策略**：部分高级功能（View Transition、masonry、SW）只在现代浏览器生效，但保证了所有浏览器的基线体验

## Migration Plan

### Phase 1：基础架构（CSS + Shell）
1. 拆分 `base.css` 为分层结构（tokens → reset → base → components）
2. 验证所有现有页面在新 CSS 架构下样式无回归
3. 实现 `shell.js` 模块和统一导航
4. 首页率先适配新 Shell

### Phase 2：JS 模块化
1. 将 `theme.js`、`large-text.js`、`utils.js` 重构为 ES Modules
2. 重构 note-browser JS 为模块架构
3. 添加 `nomodule` 回退

### Phase 3：各页面适配
1. 所有子页面适配统一 Shell
2. 相册页重构
3. 保险页融入设计系统
4. 展示页升级为完整设计系统文档

### Phase 4：增强功能
1. 移动端导航优化（汉堡菜单、底部标签栏）
2. 可访问性增强
3. Service Worker 离线支持
4. 性能优化（懒加载、关键路径）

### 回滚策略
每个 Phase 完成后打 Git tag。如某阶段引入严重问题，可回退到上一个 tag。CSS 和 JS 的旧文件在新文件稳定前保留，通过 `.legacy/` 目录备份。

## Open Questions

1. **CDN 依赖是否需要本地化？** marked.js 和 highlight.js 当前从 jsDelivr 加载，离线模式下不可用。是否需要将其收入本地？（会增加仓库体积）
2. **笔记 manifest 的 embedded content 模式是否保留？** 当前 manifest.js 内嵌所有笔记内容，文件可能很大。是否改为按需 fetch 单个文件？（影响离线策略）
3. **保险页是否长期保留？** 该页面风格和其他子模块差异较大，是否考虑独立部署或简化？
4. **教程（guide）板块的定位？** 当前有大量 AI Agent 教程内容，是否需要更深度的导航结构（如目录树）？
