## ADDED Requirements

### Requirement: 工具页应使用统一 Shell

系统 SHALL 在工具页通过 Shell 注入统一导航栏和面包屑（「首页 > 小工具」），替代当前独立实现的导航。

#### Scenario: 工具页导航栏
- **WHEN** 用户打开工具页
- **THEN** 页面 SHALL 显示统一 Shell 导航栏和面包屑

### Requirement: 工具操作应有 toast 反馈

系统 SHALL 在工具操作成功或失败时使用全局 toast 组件提供反馈（如"JSON 格式化成功"、"已生成二维码"）。

#### Scenario: JSON 格式化成功
- **WHEN** 用户成功格式化 JSON
- **THEN** 系统 SHALL 显示 toast 提示"格式化成功"

#### Scenario: 输入无效 JSON
- **WHEN** 用户输入无效 JSON 并点击格式化
- **THEN** 系统 SHALL 显示 toast 提示错误信息

## MODIFIED Requirements

### Requirement: 各工具应以可展开卡片形式呈现

系统 SHALL 将每个工具包装为使用设计系统 `.glass-card` 类的可展开/折叠卡片，卡片 SHALL 使用 `.glass-btn` 按钮和 `.glass-input` 输入框。

#### Scenario: 用户访问工具页
- **WHEN** 用户打开工具页
- **THEN** 页面 SHALL 展示所有工具卡片，卡片使用液态玻璃风格
