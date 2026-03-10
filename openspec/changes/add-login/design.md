## Context

站点为纯静态 HTML/CSS/JS，托管于 GitHub Pages，无后端、无数据库。登录需在纯前端实现，使用 localStorage 模拟会话。

## Goals / Non-Goals

**Goals:**
- 登录页面与表单 UI
- 邮箱格式校验、密码非空校验
- localStorage 存储「已登录」状态及用户名
- 首页 header 显示登录入口或「退出」

**Non-Goals:**
- 真实密码验证、后端 API
- 注册、找回密码
- 多用户、权限控制

## Decisions

1. **登录页路径**：`login.html` 放在根目录，与 `index.html` 同级
2. **状态存储**：`localStorage.auth` 存 `{ user: string, loggedIn: true }`，登出时移除
3. **入口位置**：首页 header 右侧（与 theme-toggle 并列）增加「登录」链接；已登录时显示「用户名 · 退出」
4. **样式**：复用 `home.css` 主题变量，新建 `login.css` 或内联于 login 页
5. **脚本**：`assets/js/auth.js`，负责表单提交、校验、状态读写、入口渲染

## Risks / Trade-offs

- **[风险]** 密码存 localStorage 不安全
  - **缓解**：本次为模拟，不存密码，仅存用户名；真实场景需后端
