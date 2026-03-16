## Why

保险页面当前几乎没有任何设计：两张产品图片直接铺满页面、联系方式用 `position:fixed` 的小浮窗硬编码、全部内联样式、无标题/描述/分区结构、暗色主题下白色浮窗非常刺眼、移动端无法正常操作浮窗按钮。作为对外展示的业务落地页，视觉质量远低于站点其他页面。

## What Changes

- 重建页面结构：用语义化 HTML 替代裸 `<div>` + 内联样式，添加 hero 区（标题 + 副标题 + CTA）、产品卡片区（将两张大图改为带文字说明的卡片）、联系方式区（底部固定或卡片内）。
- 新建 `insurance/insurance.css` 专属样式文件，消除所有内联样式。
- 联系方式从左侧白色小浮窗改为底部固定条或 hero 区内的按钮组，适配暗色主题。
- 产品图片改为卡片展示（圆角 + 阴影 + 标题 + 描述），支持悬停效果。
- 接入全局动画工具类（`anim-fade-in`、`anim-slide-up`、`stagger-*`）实现入场动画。
- 移动端响应式适配：卡片单列、CTA 按钮全宽、底部联系条不遮挡内容。

## Capabilities

### New Capabilities

- `insurance-landing`：定义保险落地页的结构、排版、联系入口和响应式布局要求。

### Modified Capabilities

- 无。

## Impact

- 核心受影响文件：`insurance/index.html`（全面重写 HTML 结构）。
- 新增文件：`insurance/insurance.css`。
- 可能清理的文件：`assets/js/main.js` 中的 URL 参数逻辑可保留但保险页不再强依赖。
- 无新增外部依赖。
