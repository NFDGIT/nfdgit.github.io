## ADDED Requirements

### Requirement: 站点应注册 Service Worker

系统 SHALL 在页面加载后注册 Service Worker（`sw.js`），注册过程 SHALL 使用 feature detection，不支持 SW 的浏览器 SHALL 无任何报错。

#### Scenario: 现代浏览器注册 SW
- **WHEN** 用户在支持 Service Worker 的浏览器首次访问站点
- **THEN** 系统 SHALL 成功注册 SW，后续请求进入缓存策略

#### Scenario: 旧浏览器不受影响
- **WHEN** 用户在不支持 Service Worker 的浏览器访问站点
- **THEN** 站点 SHALL 正常工作，无 JS 错误

### Requirement: 核心页面应使用 Cache-First 策略

系统 SHALL 对核心 HTML 页面（首页、笔记页、游戏目录）、所有 CSS 文件和所有 JS 文件使用 Cache-First 策略，优先从缓存读取。

#### Scenario: 用户离线访问首页
- **WHEN** 用户在已缓存后断网访问首页
- **THEN** 首页 SHALL 从缓存中正常加载

#### Scenario: 用户离线访问笔记页
- **WHEN** 用户在已缓存后断网访问笔记页
- **THEN** 笔记页 SHALL 可正常打开，已缓存的笔记内容可查看

### Requirement: 笔记内容应使用 Network-First 策略

系统 SHALL 对笔记 manifest 和笔记内容文件使用 Network-First 策略，优先从网络获取最新版本，网络不可用时回退到缓存。

#### Scenario: 笔记内容有更新
- **WHEN** 用户在线访问笔记且内容已更新
- **THEN** 系统 SHALL 从网络获取最新 manifest 和内容

#### Scenario: 网络不可用时回退缓存
- **WHEN** 用户离线访问笔记
- **THEN** 系统 SHALL 使用上次缓存的 manifest 和内容

### Requirement: 缓存应有版本控制

系统 SHALL 使用版本化的缓存名称（如 `v1-core-cache`），部署新版本时 SW SHALL 清理旧版本缓存。

#### Scenario: 部署新版本后缓存更新
- **WHEN** 站点部署了新版本且 SW 版本号已更新
- **THEN** SW SHALL 在激活时删除旧版本缓存，安装新版本缓存

### Requirement: 离线时应有友好提示

系统 SHALL 在用户离线且请求的资源未缓存时显示离线提示页，告知用户当前处于离线状态。

#### Scenario: 用户离线访问未缓存页面
- **WHEN** 用户离线访问一个从未缓存的页面
- **THEN** 系统 SHALL 显示友好的离线提示页，而非浏览器默认错误页
