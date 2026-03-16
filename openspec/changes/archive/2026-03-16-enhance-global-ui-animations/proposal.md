## Why

站点各页面虽然功能完善，但整体视觉精细度不足：缺乏入场动画（页面加载后元素直接闪现）、悬停反馈不统一、部分页面（racing、album、tools、insurance）仍使用内联样式或硬编码颜色，与已有的设计系统脱节。用户对"好看"和"有质感"的感知很大程度依赖微交互和动画，而当前几乎没有。

## What Changes

- 在 `home.css` 中建立一套通用 CSS 动画工具类：淡入（fade-in）、上滑入场（slide-up）、缩放入场（scale-in）、交错延迟（stagger）、悬停发光/抬升，供所有页面直接使用。
- 首页与游戏目录页：卡片加入交错入场动画、悬停时微妙边框发光与图标缩放；标题区加入淡入下移效果。
- 笔记浏览器：侧边栏展开/收起改为弹性过渡、内容区切换加入淡入效果、树节点悬停加入背景过渡。
- racing 游戏：将内联链接样式改为使用共享 CSS 类，加入悬停过渡。
- album：导航改用共享组件样式，CSS 加入标准前缀（去除仅 `-webkit-` 写法），响应式优化。
- tools：替换硬编码颜色为主题变量，加入卡片布局与入场动画。
- insurance：导航与按钮改用共享样式，加入基础过渡。
- 全局补充 `focus-visible` 可访问性样式和 `prefers-reduced-motion` 动画降级。

## Capabilities

### New Capabilities

- `global-animation-system`：定义站点通用的 CSS 动画工具类、交互过渡规范和动画降级策略。

### Modified Capabilities

- `theme`：新增 `focus-visible` 样式和 `prefers-reduced-motion` 媒体查询支持。
- `note-browser`：侧边栏与内容区的过渡动画增强。
- `games-directory`：卡片入场动画与悬停微交互增强。

## Impact

- 核心受影响文件：`assets/css/home.css`（新增动画工具类）、`assets/css/note-browser.css`（过渡增强）。
- 页面级修改：`index.html`、`games/index.html`、`note/index.html`、`games/racing/index.html`、`album/index.html`、`album/css/style.css`、`tools/index.html`、`insurance/index.html`。
- 无新增依赖，所有动画纯 CSS 实现。
