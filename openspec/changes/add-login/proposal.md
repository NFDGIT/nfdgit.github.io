## Why

部分页面（如保险、小工具）可能需要区分访客与已登录用户，以提供个性化内容或受限功能。当前站点为纯静态，无登录能力。增加登录入口和基础 UI 可为后续扩展（如 OAuth、后端集成）打下基础。

## What Changes

- 新增登录页面（login.html）及登录表单
- 支持邮箱 + 密码输入、表单校验
- 使用 localStorage 模拟登录状态（纯前端，无后端）
- 首页或导航区增加「登录」入口，已登录时显示「退出」
- 登录状态持久化至下次访问

## Capabilities

### New Capabilities

- `auth`: 登录/登出 UI、表单校验、localStorage 模拟登录状态、登录入口与状态展示

### Modified Capabilities

- （无）

## Impact

- **CSS**：`assets/css/` 新增或复用 login 相关样式
- **HTML**：新增 `login.html`，首页或导航增加登录入口
- **JS**：新建 `assets/js/auth.js` 处理登录/登出逻辑

**注意**：本项目为纯静态站点，无后端。本次实现为前端模拟，仅供演示与扩展基础。真实登录需后续接入 OAuth 或后端 API。
