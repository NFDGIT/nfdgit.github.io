## 1. HTML 结构重组

- [x] 1.1 在 `note/index.html` 中添加顶部固定工具条（`.note-toolbar`）：左区放目录切换按钮 + 返回首页链接；中区放面包屑；右区放大字模式 + 主题切换
- [x] 1.2 移除预览区内的 `.note-preview-topbar`（返回首页 + 面包屑容器），面包屑容器改为工具条内的元素
- [x] 1.3 移除独立的浮动目录按钮 `.note-sidebar-toggle-mobile`（`≡`），改为工具条内的统一切换按钮

## 2. CSS 布局调整

- [x] 2.1 新增 `.note-toolbar` 样式：固定顶部、glass 背景、三区 flex 布局（左/中/右）
- [x] 2.2 修改桌面端收起态：`.note-sidebar-collapsed` 时 `width: 0`（取代 48px），移除窄条内的收起按钮样式
- [x] 2.3 调整 `.note-layout` 添加 `padding-top` 给工具条让路（约 48px）
- [x] 2.4 移除移动端的独立浮动按钮样式和预览区的 `padding-top: 4rem`
- [x] 2.5 面包屑截断样式：`overflow: hidden; text-overflow: ellipsis; white-space: nowrap`

## 3. JS 交互调整

- [x] 3.1 将侧边栏切换逻辑从浮动按钮和侧边栏内按钮改为工具条内的统一按钮
- [x] 3.2 面包屑更新目标从预览区 topbar 改为工具条内的面包屑容器
- [x] 3.3 工具条的目录切换按钮在桌面端切换 `note-sidebar-collapsed`，在移动端触发抽屉
