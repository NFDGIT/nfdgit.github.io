## ADDED Requirements

### Requirement: CSS 应按五层架构组织

系统 SHALL 将样式文件组织为 tokens → reset → base → components → layouts → pages 五层，每层有明确的职责边界，上层不依赖下层。

#### Scenario: 开发者查看 CSS 目录
- **WHEN** 开发者查看 `assets/css/` 目录结构
- **THEN** SHALL 能看到按层级组织的子目录或文件，且每层职责通过文件名即可识别

#### Scenario: 组件层不包含页面特有样式
- **WHEN** 开发者审查 `components/` 目录下的 CSS 文件
- **THEN** SHALL 不包含仅用于特定页面的样式规则

### Requirement: 设计 token 应集中在 tokens.css 中定义

系统 SHALL 将所有 CSS 自定义属性（颜色、间距、圆角、阴影、字体、动画时长）集中定义在 `tokens.css` 中，其他层的 CSS SHALL 引用 token 而非硬编码值。

#### Scenario: 开发者修改主色调
- **WHEN** 开发者需要修改站点主色调
- **THEN** SHALL 仅需修改 `tokens.css` 中的一处定义，所有使用该 token 的组件自动更新

#### Scenario: 组件不使用硬编码颜色值
- **WHEN** 开发者审查组件层 CSS
- **THEN** 颜色值 SHALL 全部通过 `var(--token-name)` 引用，不出现硬编码的 `#hex` 或 `rgb()` 值

### Requirement: 间距和圆角应使用 token 体系

系统 SHALL 定义一组间距 token（`--space-xs`、`--space-sm`、`--space-md`、`--space-lg`、`--space-xl`）和圆角 token（`--radius-sm`、`--radius-md`、`--radius-lg`、`--radius-full`），所有组件 SHALL 使用这些 token。

#### Scenario: 开发者添加新组件
- **WHEN** 开发者为新组件编写 CSS
- **THEN** SHALL 使用 `var(--space-*)` 和 `var(--radius-*)` 设置间距和圆角

### Requirement: CSS 加载顺序应明确

系统 SHALL 确保 `tokens.css` 和 `reset.css` 在所有其他样式之前加载。关键 CSS（tokens、reset、base）SHALL 通过 `<link>` 直接加载，组件和页面 CSS 按需引入。

#### Scenario: 页面样式正确渲染
- **WHEN** 页面加载完成
- **THEN** 所有 CSS 变量 SHALL 已定义，组件样式 SHALL 正确引用到 token 值

### Requirement: 每个页面只加载必要的 CSS

系统 SHALL 确保各页面只加载该页面需要的组件和页面层 CSS，不加载无关页面的样式文件。

#### Scenario: 首页不加载笔记浏览器 CSS
- **WHEN** 用户访问首页
- **THEN** 页面 SHALL 不加载 `note-browser.css`

#### Scenario: 笔记页加载侧边栏布局 CSS
- **WHEN** 用户访问笔记页
- **THEN** 页面 SHALL 加载 `sidebar.css` 和 `note-browser.css`
