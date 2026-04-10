## ADDED Requirements

### Requirement: 图片应支持懒加载

系统 SHALL 为非首屏图片添加 `loading="lazy"` 属性或使用 Intersection Observer 实现懒加载，减少首次加载的网络请求。

#### Scenario: 相册页面首屏加载
- **WHEN** 用户打开相册页面
- **THEN** 仅视口内可见的图片 SHALL 立即加载，其余图片 SHALL 在滚动到附近时才加载

#### Scenario: 保险页产品图片懒加载
- **WHEN** 用户打开保险页
- **THEN** 非首屏的产品图片 SHALL 使用懒加载

### Requirement: 关键渲染路径应优化

系统 SHALL 确保首屏渲染所需的关键 CSS（tokens、reset、base、当前页面 CSS）在 `<head>` 中通过 `<link>` 加载，非关键 CSS SHALL 使用 `media` 属性或异步加载策略延迟加载。

#### Scenario: 首页首次绘制速度
- **WHEN** 用户首次访问首页
- **THEN** 首屏内容 SHALL 在关键 CSS 加载后即可渲染，不被非关键 CSS 阻塞

### Requirement: JS 应按需加载

系统 SHALL 确保各页面只加载该页面需要的 JS 模块。ES Module 的 `import()` 动态导入 SHALL 用于按需加载非关键组件（如灯箱、toast）。

#### Scenario: 灯箱组件按需加载
- **WHEN** 用户在相册页点击图片触发灯箱
- **THEN** 灯箱 JS 模块 SHALL 在首次触发时动态加载，而非页面初始化时加载

### Requirement: manifest 应支持预构建

系统 SHALL 支持通过 `scripts/generate-note-manifest.js` 预构建笔记 manifest，生成的 `manifest.js` SHALL 包含版本戳以支持缓存更新。

#### Scenario: 笔记内容更新后重新构建 manifest
- **WHEN** 维护者添加或修改笔记文件后运行 manifest 生成脚本
- **THEN** 生成的 `manifest.js` SHALL 包含更新后的内容和新的版本戳

### Requirement: 字体加载应不阻塞渲染

系统 SHALL 使用系统字体栈作为主要字体，不引入自定义 Web 字体，确保零字体加载延迟。

#### Scenario: 页面使用系统字体
- **WHEN** 页面加载完成
- **THEN** 所有文本 SHALL 使用系统字体栈渲染，不出现 FOIT（Flash of Invisible Text）
