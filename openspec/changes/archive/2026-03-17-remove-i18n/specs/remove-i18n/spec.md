## REMOVED Requirements

### Requirement: 语言切换功能
网站不再提供中英文切换功能。所有 i18n 相关代码、文件和 UI 元素必须被移除。

**Reason**: 英文版仅覆盖首页，维护成本高于实际价值
**Migration**: 无需迁移，英文版未对外发布

#### Scenario: 首页无语言切换按钮
- **WHEN** 用户访问首页
- **THEN** 导航栏中不存在语言切换按钮

#### Scenario: 英文目录不存在
- **WHEN** 用户访问 `/en/` 路径
- **THEN** 返回 404（无对应页面）

#### Scenario: 无残留脚本引用
- **WHEN** 页面加载完成
- **THEN** 控制台无 `lang.js` 相关的 404 错误
