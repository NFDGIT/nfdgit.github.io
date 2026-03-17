# note-browser（变更增量）

## MODIFIED Requirements

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
