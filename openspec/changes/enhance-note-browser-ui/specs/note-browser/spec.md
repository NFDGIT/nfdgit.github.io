# note-browser（变更增量）

## ADDED Requirements

### Requirement: 侧边栏目录节点应有类型图标

系统 SHALL 为目录树中的文件夹节点、Markdown 文件节点和 HTML 文件节点分别显示可区分的图标（如文件夹图标、文档图标）。

#### Scenario: 用户查看目录树

- **WHEN** 用户查看笔记侧边栏目录树
- **THEN** 文件夹节点 SHALL 显示文件夹图标，Markdown 文件 SHALL 显示文档图标，HTML 文件 SHALL 显示网页图标

### Requirement: 活跃文件节点应有左侧色条指示

系统 SHALL 为当前打开的文件节点显示左侧色条高亮，使其在目录树中更容易定位。

#### Scenario: 用户打开某个文件

- **WHEN** 用户点击目录树中的某个文件
- **THEN** 该文件节点 SHALL 显示左侧色条高亮，与普通节点形成视觉区分

### Requirement: Markdown 标题应有清晰的视觉层级

系统 SHALL 为预览区的 h1–h6 标题提供递减的字号和间距，h1/h2 SHALL 有底部分割线。

#### Scenario: 文件包含多级标题

- **WHEN** 用户打开一个包含 h1、h2、h3 标题的 Markdown 文件
- **THEN** 各级标题 SHALL 以递减字号和适当间距渲染，h1 和 h2 SHALL 有底部分割线

### Requirement: Markdown 引用块应有左侧色条与背景

系统 SHALL 为预览区的 `<blockquote>` 渲染左侧色条和浅背景，使其与正文段落形成视觉区分。

#### Scenario: 文件包含引用块

- **WHEN** 用户打开包含 `>` 引用语法的 Markdown 文件
- **THEN** 引用块 SHALL 渲染左侧色条和浅色背景

### Requirement: Markdown 表格应有清晰的行区分

系统 SHALL 为预览区的 `<table>` 提供斑马行背景、细边框和圆角，使数据可读。

#### Scenario: 文件包含表格

- **WHEN** 用户打开包含表格的 Markdown 文件
- **THEN** 表格 SHALL 以斑马行 + 细边框 + 圆角渲染

### Requirement: 代码块应有语法高亮

系统 SHALL 通过 highlight.js 为 Markdown 代码块提供语法高亮，支持自动语言检测，并适配亮色/暗色主题。

#### Scenario: 文件包含代码块

- **WHEN** 用户打开包含代码块的 Markdown 文件
- **THEN** 代码块 SHALL 以语法高亮渲染，颜色与当前主题一致

#### Scenario: highlight.js 加载失败

- **WHEN** highlight.js CDN 不可达
- **THEN** 代码块 SHALL 仍以基础样式（等宽字体 + 背景色）渲染，不影响阅读

### Requirement: 预览区应显示面包屑路径

系统 SHALL 在预览区顶部显示当前打开文件的路径面包屑（如 `Flutter > 底层原理.md`），使用户知晓当前阅读位置。

#### Scenario: 用户打开某文件

- **WHEN** 用户打开 `Flutter/底层原理.md`
- **THEN** 预览区顶部 SHALL 显示面包屑：`Flutter > 底层原理.md`

### Requirement: 空态应有友好提示

系统 SHALL 在未选择文件时显示友好的空态提示（含图标/图案和引导文案），替代纯文本占位符。

#### Scenario: 用户首次进入笔记页

- **WHEN** 用户打开笔记页且未选择任何文件
- **THEN** 预览区 SHALL 显示含图标的空态引导，提示用户从目录中选择文件

### Requirement: 侧边栏底部应显示文件统计

系统 SHALL 在侧边栏底部显示当前目录的统计信息（目录数和文件数）。

#### Scenario: 目录加载完成

- **WHEN** 笔记目录树渲染完毕
- **THEN** 侧边栏底部 SHALL 显示形如"x 个目录 · y 个文件"的统计
