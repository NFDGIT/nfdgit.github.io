## ADDED Requirements

### Requirement: 笔记浏览器脚本应使用 ES Module 架构

系统 SHALL 将笔记浏览器的所有 JS 文件（sidebar、tree、preview、search、state）重构为 ES Module 格式，通过 `import/export` 管理依赖，在 `note/index.html` 中通过 `<script type="module">` 加载入口模块。

#### Scenario: 笔记页以模块方式加载脚本
- **WHEN** 用户打开笔记页
- **THEN** 所有笔记浏览器脚本 SHALL 以 ES Module 方式加载，不产生全局变量

#### Scenario: 模块间依赖关系明确
- **WHEN** 开发者查看笔记浏览器入口模块
- **THEN** SHALL 能通过 `import` 语句清晰看到各模块的依赖关系

### Requirement: 移动端侧边栏应支持手势操作

系统 SHALL 在移动端支持从左边缘右滑打开侧边栏、在侧边栏上左滑关闭的触摸手势。

#### Scenario: 用户右滑打开侧边栏
- **WHEN** 用户在移动端从屏幕左边缘向右滑动
- **THEN** 笔记侧边栏 SHALL 以滑入动画打开

#### Scenario: 用户左滑关闭侧边栏
- **WHEN** 用户在移动端在已打开的侧边栏上向左滑动
- **THEN** 侧边栏 SHALL 以滑出动画关闭

### Requirement: 搜索框应支持快捷键

系统 SHALL 支持 `/` 快捷键聚焦搜索框、`Escape` 键清空搜索并失焦。

#### Scenario: 用户按 / 键聚焦搜索框
- **WHEN** 用户在笔记页按 `/` 键（非输入状态）
- **THEN** 搜索框 SHALL 获得焦点

#### Scenario: 用户按 Escape 清空搜索
- **WHEN** 用户在搜索框中按 Escape 键
- **THEN** 搜索框 SHALL 清空内容并失去焦点，目录树恢复全部显示

## MODIFIED Requirements

### Requirement: 笔记浏览器侧边栏应使用统一设计系统

系统 SHALL 让笔记浏览器的侧边栏、控件按钮和面板使用 `tokens.css` 定义的设计 token 和 `components/` 中的组件类，而非在 `note-browser.css` 中重复定义变量或组件样式。

#### Scenario: 侧边栏使用液态玻璃风格
- **WHEN** 用户查看笔记浏览器侧边栏
- **THEN** 侧边栏 SHALL 使用液态玻璃面板效果，与站点其他页面的面板风格一致

### Requirement: 笔记页应有始终可见的顶部工具条

系统 SHALL 在笔记页顶部显示一个固定工具条，包含目录展开/收起切换按钮、返回首页链接（来自 Shell 或自定义实现）、面包屑路径、主题切换和大字模式按钮。工具条 SHALL 使用设计系统的 `.glass-nav` 组件类。

#### Scenario: 用户收起侧边栏后仍可访问控制按钮
- **WHEN** 用户在桌面端收起侧边栏
- **THEN** 顶部工具条 SHALL 仍然显示目录切换、返回首页、主题切换和大字模式按钮

#### Scenario: 用户在移动端查看工具条
- **WHEN** 用户在移动端打开笔记页
- **THEN** 顶部工具条 SHALL 显示目录打开按钮和主题切换按钮
