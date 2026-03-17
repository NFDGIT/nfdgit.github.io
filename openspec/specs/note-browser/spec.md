# note-browser

## Purpose

定义站点**笔记浏览器**（`note/index.html` + `assets/js/note-browser.js`）的交互与加载行为：左树右预览、通过 hash 与 manifest 加载文件；须保证含中文等非 ASCII 文件名的文件在**首次点击**即可正确打开并显示，不出现「无法加载文件」或需二次点击才打开。

## Requirements

### Requirement: 中文等非 ASCII 文件名首次点击即可打开

笔记浏览器 SHALL 在用户点击目录树中任意文件（含中文或其它非 ASCII 字符的文件名）时，**第一次点击**即能正确加载并显示该文件内容；SHALL 不出现「无法加载文件」的提示，也不要求用户再次点击同一文件才能打开。

#### Scenario: 点击中文文件名一次即打开
- **WHEN** 用户在笔记页目录树中点击一个文件名为中文（或含中文路径）的条目（如 `Flutter/底层原理.md`）
- **THEN** 右侧预览区 SHALL 在本次点击后即显示该文件内容（或来自 manifest 内嵌 content，或通过 fetch 成功加载），不显示「无法加载文件」

#### Scenario: 从 hash 恢复时中文路径正确加载
- **WHEN** 页面通过带 hash 的 URL 打开（如 `note/index.html#Flutter/底层原理.md` 或其编码形式），或用户刷新后 hash 仍指向含中文路径的文件
- **THEN** 笔记浏览器 SHALL 能根据 hash 正确解析出与 manifest 一致的 path，并成功加载并显示该文件，不因 path 编码不一致导致查找或 fetch 失败

### Requirement: 侧边栏展开/收起应有平滑过渡

系统 SHALL 在侧边栏展开和收起时使用平滑的缓动过渡（而非线性或无过渡），使交互感知更流畅。

#### Scenario: 用户展开侧边栏
- **WHEN** 用户在桌面端点击展开侧边栏
- **THEN** 侧边栏 SHALL 以平滑缓动过渡从收起状态展开

#### Scenario: 用户收起侧边栏
- **WHEN** 用户点击收起侧边栏
- **THEN** 侧边栏 SHALL 以平滑缓动过渡收起

### Requirement: 笔记内容切换应有淡入效果

系统 SHALL 在用户切换笔记内容时为预览区添加淡入过渡，避免内容硬切。

#### Scenario: 用户点击不同笔记条目
- **WHEN** 用户在侧边栏中点击另一条笔记
- **THEN** 预览区 SHALL 以淡入效果展示新内容

### Requirement: 树节点悬停应有背景过渡

系统 SHALL 为笔记树节点的悬停状态添加背景色过渡，使视觉反馈平滑。

#### Scenario: 用户悬停在树节点上
- **WHEN** 用户将鼠标移入某笔记树节点
- **THEN** 节点背景 SHALL 以平滑过渡变为悬停色

### Requirement: 侧边栏目录节点应有类型图标

系统 SHALL 为目录树中的文件夹节点、Markdown 文件节点和 HTML 文件节点分别显示可区分的图标。

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

### Requirement: 笔记浏览器侧边栏应使用统一设计系统

系统 SHALL 让笔记浏览器的侧边栏、控件按钮和面板使用基础样式文件中定义的液态玻璃组件类，而非在 `note-browser.css` 中重复定义。

#### Scenario: 侧边栏使用液态玻璃风格
- **WHEN** 用户查看笔记浏览器侧边栏
- **THEN** 侧边栏 SHALL 使用液态玻璃面板效果，与站点其他页面的面板风格一致

### Requirement: 笔记浏览器应支持文件名搜索

系统 SHALL 在侧边栏提供搜索框，用户输入关键词后 SHALL 实时过滤目录树，仅显示文件名匹配的节点及其父目录。搜索 SHALL 不区分大小写。

#### Scenario: 用户搜索笔记文件
- **WHEN** 用户在搜索框输入"flutter"
- **THEN** 目录树 SHALL 仅显示文件名包含"flutter"的文件及其父目录，其他节点隐藏

#### Scenario: 用户清空搜索框
- **WHEN** 用户清空搜索框内容
- **THEN** 目录树 SHALL 恢复显示所有节点

#### Scenario: 无匹配结果
- **WHEN** 用户输入的关键词没有匹配任何文件名
- **THEN** 目录树区域 SHALL 显示"无匹配结果"提示

### Requirement: 笔记页应有始终可见的顶部工具条

系统 SHALL 在笔记页顶部显示一个固定工具条，包含目录展开/收起切换按钮、返回首页链接、面包屑路径、主题切换和大字模式按钮。工具条 SHALL 在侧边栏收起和展开时都可见。

#### Scenario: 用户收起侧边栏后仍可访问控制按钮
- **WHEN** 用户在桌面端收起侧边栏
- **THEN** 顶部工具条 SHALL 仍然显示目录切换、返回首页、主题切换和大字模式按钮

#### Scenario: 用户在移动端查看工具条
- **WHEN** 用户在移动端打开笔记页
- **THEN** 顶部工具条 SHALL 显示目录打开按钮和主题切换按钮

### Requirement: 面包屑应显示在顶部工具条中

系统 SHALL 将面包屑路径显示在顶部工具条的中间区域，而非预览区内部。面包屑 SHALL 在宽度不足时自动截断。

#### Scenario: 面包屑在移动端截断
- **WHEN** 用户在窄屏设备打开深层目录中的文件
- **THEN** 面包屑 SHALL 截断为仅显示最后两级路径

### Requirement: 桌面端侧边栏收起应完全隐藏

系统 SHALL 在桌面端收起侧边栏时将其宽度过渡到 0（完全隐藏），而非保留窄条。目录切换按钮 SHALL 在顶部工具条中始终可用。

#### Scenario: 用户收起侧边栏
- **WHEN** 用户点击工具条中的目录切换按钮收起侧边栏
- **THEN** 侧边栏 SHALL 以动画过渡到完全隐藏（width: 0），预览区占据全部宽度

### Requirement: 移动端不应有独立浮动的目录按钮

系统 SHALL 不再使用 `position: fixed` 的独立浮动目录按钮，改为由顶部工具条中的按钮触发抽屉式目录。

#### Scenario: 用户在移动端打开目录
- **WHEN** 用户在移动端点击工具条中的目录按钮
- **THEN** 侧边栏 SHALL 以抽屉式滑入

### Requirement: 移动端工具条应保留返回首页入口

系统 SHALL 在移动端工具条中保留返回首页入口，在空间不足时 SHALL 以图标形式展示，而非完全隐藏。

#### Scenario: 用户在移动端需要返回首页
- **WHEN** 用户在移动端的笔记页想返回首页
- **THEN** 工具条 SHALL 显示一个可点击的返回首页入口

### Requirement: 移动端检测应在 Safari iOS 上可靠工作

系统 SHALL 使用 `window.innerWidth` 而非仅依赖 `matchMedia` 来判断移动端，确保 Safari iOS 初始化时能正确识别设备类型。

#### Scenario: Safari iOS 上首次点击目录按钮
- **WHEN** 用户在 Safari iOS 上首次点击工具条中的目录按钮
- **THEN** 侧边栏 SHALL 以抽屉式滑入，而非走桌面端的收起/展开逻辑

### Requirement: 全屏布局应适配 Safari iOS 视口

系统 SHALL 使用 `100vh` 搭配 `-webkit-fill-available` 回退，确保在 Safari iOS 上内容不被 URL 栏遮挡。

#### Scenario: Safari iOS 上笔记页底部可见
- **WHEN** 用户在 Safari iOS 上打开笔记页
- **THEN** 页面底部内容 SHALL 在 URL 栏显示时不被遮挡
