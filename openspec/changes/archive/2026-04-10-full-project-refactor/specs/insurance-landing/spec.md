## ADDED Requirements

### Requirement: 保险页应使用统一 Shell

系统 SHALL 在保险页通过 Shell 注入统一导航栏和面包屑（「首页 > 保险」），替代当前独立实现的导航。

#### Scenario: 保险页导航栏
- **WHEN** 用户打开保险页
- **THEN** 页面 SHALL 显示统一 Shell 导航栏和面包屑

### Requirement: 保险页应使用设计系统组件

系统 SHALL 将保险页的 hero、产品卡片、CTA 按钮替换为设计系统的 `.glass-card`、`.glass-btn`、`.glass-btn-primary` 等组件类，移除 `insurance.css` 中与 `base.css` 重复的样式定义。

#### Scenario: 产品卡片使用设计系统组件
- **WHEN** 用户查看保险页产品区
- **THEN** 产品卡片 SHALL 使用 `.glass-card` 类，与站点其他卡片风格一致

#### Scenario: CTA 按钮使用设计系统按钮
- **WHEN** 用户查看保险页 CTA 按钮
- **THEN** 按钮 SHALL 使用 `.glass-btn-primary` 类

## MODIFIED Requirements

### Requirement: 保险页应有结构化的 hero 区

系统 SHALL 在保险页顶部展示 hero 区域，包含页面标题、副标题描述和至少一个联系方式按钮，hero 区 SHALL 使用 `.glass-panel` 组件类和设计系统的间距 token。

#### Scenario: 用户打开保险页
- **WHEN** 用户访问保险页面
- **THEN** 页面 SHALL 显示使用液态玻璃风格的 hero 区域

### Requirement: 保险页应无内联样式

系统 SHALL 将所有样式外部化到 CSS 文件中，`insurance/index.html` 中 SHALL 不包含 `style` 属性。保险页 CSS SHALL 仅包含该页面特有的布局样式，组件样式 SHALL 引用设计系统。

#### Scenario: 维护者检查 HTML
- **WHEN** 维护者查看 `insurance/index.html` 源码
- **THEN** 页面元素 SHALL 不包含 `style` 属性

#### Scenario: 保险页 CSS 不重复定义组件样式
- **WHEN** 开发者审查 `insurance.css`
- **THEN** SHALL 不包含与 `components/` 中重复的按钮、卡片或面板样式

### Requirement: 联系方式应清晰可达且不遮挡内容

系统 SHALL 在 hero 区提供联系按钮（电话拨打、QQ 咨询），移动端 SHALL 在页面底部提供固定联系条并适配安全区域（`env(safe-area-inset-bottom)`）。联系入口 SHALL 不以浮动小窗的形式遮挡页面主内容。

#### Scenario: 用户在桌面端查找联系方式
- **WHEN** 用户在桌面端访问保险页
- **THEN** hero 区 SHALL 包含可点击的电话和 QQ 联系按钮

#### Scenario: 用户在移动端查找联系方式
- **WHEN** 用户在移动端访问保险页
- **THEN** 页面底部 SHALL 有固定联系条并适配安全区域，不遮挡主要内容区
