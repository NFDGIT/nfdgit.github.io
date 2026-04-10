## ADDED Requirements

### Requirement: 共享脚本应使用 ES Module 格式

系统 SHALL 将 `assets/js/` 下的所有共享脚本重构为 ES Module 格式（使用 `export`/`import`），HTML 页面 SHALL 通过 `<script type="module">` 引入。

#### Scenario: 主题脚本以模块方式加载
- **WHEN** 页面加载 `assets/js/core/theme.js`
- **THEN** 脚本 SHALL 通过 `export` 暴露 API，不向 `window` 挂载全局变量

#### Scenario: 多个模块间正确导入
- **WHEN** `shell.js` 需要调用 `theme.js` 的功能
- **THEN** SHALL 通过 `import { toggleTheme } from './theme.js'` 导入，不依赖全局变量

### Requirement: 主题初始化脚本应保持同步加载

系统 SHALL 保留 `theme-init.js` 作为普通 `<script>` 同步加载（非 module），确保在页面渲染前完成主题设置，避免 FOUC。

#### Scenario: 页面加载时无主题闪烁
- **WHEN** 用户打开任意页面
- **THEN** 页面 SHALL 在首次绘制时即使用用户偏好的主题，不出现先亮后暗（或反之）的闪烁

### Requirement: 模块应提供 nomodule 回退

系统 SHALL 为关键功能提供 `<script nomodule>` 回退脚本，使不支持 ES Module 的浏览器仍可使用主题切换等核心功能。

#### Scenario: 旧浏览器访问站点
- **WHEN** 不支持 `type="module"` 的浏览器加载页面
- **THEN** 页面 SHALL 通过 nomodule 回退脚本提供主题切换和基本导航功能

### Requirement: 模块不应产生全局变量污染

系统 SHALL 确保所有 ES Module 不向 `window` 对象挂载属性（`theme-init.js` 除外），模块间通信 SHALL 通过 import/export 或事件总线实现。

#### Scenario: 开发者检查全局变量
- **WHEN** 开发者在控制台检查 `window` 对象
- **THEN** SHALL 不存在 `SiteUtils`、`NoteBrowser` 等全局变量（`theme-init.js` 设置的 `data-theme` 属性除外）

### Requirement: 模块依赖关系应形成有向无环图

系统 SHALL 确保模块间不存在循环依赖。`core/` 模块不应依赖 `components/`，`utils/` 不应依赖 `core/` 或 `components/`。

#### Scenario: 开发者分析依赖关系
- **WHEN** 开发者分析 `assets/js/` 下所有模块的 import 语句
- **THEN** SHALL 不存在循环引用链
