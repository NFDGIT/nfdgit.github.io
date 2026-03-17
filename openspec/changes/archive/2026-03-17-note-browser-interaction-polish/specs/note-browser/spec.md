# note-browser（变更增量）

## ADDED Requirements

### Requirement: 笔记页应有始终可见的顶部工具条

系统 SHALL 在笔记页顶部显示一个固定工具条，包含目录展开/收起切换按钮、返回首页链接、面包屑路径、主题切换和大字模式按钮。工具条 SHALL 在侧边栏收起和展开时都可见。

#### Scenario: 用户收起侧边栏后仍可访问控制按钮

- **WHEN** 用户在桌面端收起侧边栏
- **THEN** 顶部工具条 SHALL 仍然显示目录切换、返回首页、主题切换和大字模式按钮

#### Scenario: 用户在移动端查看工具条

- **WHEN** 用户在移动端打开笔记页
- **THEN** 顶部工具条 SHALL 显示目录打开按钮、返回首页链接和主题切换按钮

### Requirement: 面包屑应显示在顶部工具条中

系统 SHALL 将面包屑路径显示在顶部工具条的中间区域，而非预览区内部。面包屑 SHALL 在宽度不足时自动截断。

#### Scenario: 用户打开某文件后查看面包屑

- **WHEN** 用户打开 `Flutter/底层原理.md`
- **THEN** 工具条中间区域 SHALL 显示 `Flutter › 底层原理.md`

#### Scenario: 面包屑在移动端截断

- **WHEN** 用户在窄屏设备打开深层目录中的文件
- **THEN** 面包屑 SHALL 截断为仅显示最后两级路径

## MODIFIED Requirements

### Requirement: 桌面端侧边栏收起应完全隐藏

系统 SHALL 在桌面端收起侧边栏时将其宽度过渡到 0（完全隐藏），而非保留 48px 窄条。目录切换按钮 SHALL 在顶部工具条中始终可用。

#### Scenario: 用户收起侧边栏

- **WHEN** 用户点击工具条中的目录切换按钮收起侧边栏
- **THEN** 侧边栏 SHALL 以动画过渡到完全隐藏（width: 0），预览区占据全部宽度

#### Scenario: 用户展开侧边栏

- **WHEN** 用户点击工具条中的目录切换按钮展开侧边栏
- **THEN** 侧边栏 SHALL 以动画过渡到展开状态，显示目录树和搜索框

### Requirement: 移动端不应有独立浮动的目录按钮

系统 SHALL 不再使用 `position: fixed` 的独立浮动目录按钮，改为由顶部工具条中的按钮触发抽屉式目录。预览区 SHALL 不需要额外的 `padding-top` 来给浮动按钮让路。

#### Scenario: 用户在移动端打开目录

- **WHEN** 用户在移动端点击工具条中的目录按钮
- **THEN** 侧边栏 SHALL 以抽屉式滑入，与当前行为一致

## REMOVED Requirements

### Requirement: 预览区内的 topbar（返回首页 + 面包屑）

**Reason**: 返回首页和面包屑已移入顶部工具条，预览区内不再需要 topbar，让内容从顶部直接开始。
**Migration**: 预览区内容紧跟工具条下方开始渲染。
