## Why

站点已建立了完整的液态玻璃设计系统（`base.css` 中的 `glass-*` 组件类和设计令牌），但缺少一个集中展示所有组件效果的演示页面。一个高质量的 showcase 既能作为组件文档供开发参考，又能作为站点的视觉名片展示设计品质。

## What Changes

- 新建 `showcase/` 目录，创建液态玻璃组件演示页面（`showcase/index.html` + `showcase/showcase.css`）。
- 演示页面包含以下区段，每个区段展示一类组件的多种变体：
  - **Glass Panel**：不同圆角、不同模糊度、嵌套面板。
  - **Glass Card**：基础卡片、悬停效果、图标卡片、图片卡片。
  - **Glass Button**：默认按钮、主色按钮、圆角药丸按钮、图标按钮、按钮组、禁用态。
  - **Glass Nav**：顶部导航条、导航链接变体。
  - **Glass Overlay**：全屏遮罩 + 居中内容（可点击触发/关闭）。
  - **Glass Input**：输入框、搜索框、文本区域。
  - **色彩与令牌**：展示所有设计令牌的实际渲染效果（颜色色板、阴影层级、圆角尺寸、模糊对比）。
  - **动画演示**：fade-in / slide-up / scale-in / stagger 的实时重播。
  - **主题切换对比**：亮/暗双栏并排展示同一组件。
- 演示页面自身使用液态玻璃风格，带有彩色渐变背景以凸显玻璃效果。
- 首页增加"演示库"入口卡片。

## Capabilities

### New Capabilities

- `glass-showcase`：定义液态玻璃组件演示库页面的结构、内容和交互要求。

### Modified Capabilities

- 无。

## Impact

- 新增文件：`showcase/index.html`、`showcase/showcase.css`。
- 修改文件：`index.html`（添加入口卡片）。
- 可能新增到 `base.css`：`.glass-input` 组件类（如果当前没有）。
- 无外部依赖。
