# tools-collection

## ADDED Requirements

### Requirement: 工具页应提供 JSON 格式化工具

系统 SHALL 提供一个 JSON 格式化/美化工具，用户输入 JSON 字符串后 SHALL 输出格式化后的带缩进 JSON，格式错误时 SHALL 显示错误提示。

#### Scenario: 用户格式化有效 JSON

- **WHEN** 用户在输入框粘贴有效 JSON 并点击格式化
- **THEN** 输出区 SHALL 显示美化后的 JSON（带缩进和换行）

#### Scenario: 用户输入无效 JSON

- **WHEN** 用户输入格式错误的 JSON 并点击格式化
- **THEN** 系统 SHALL 显示错误提示，指出 JSON 语法问题

### Requirement: 工具页应提供颜色格式转换工具

系统 SHALL 提供颜色格式转换工具，支持 HEX、RGB、HSL 之间的双向转换。

#### Scenario: 用户输入 HEX 颜色

- **WHEN** 用户输入 `#2563eb`
- **THEN** 系统 SHALL 显示对应的 RGB 值和 HSL 值，并展示颜色预览色块

### Requirement: 工具页应提供二维码生成工具

系统 SHALL 提供二维码生成工具，用户输入文本或 URL 后 SHALL 生成可下载的二维码图片。

#### Scenario: 用户生成二维码

- **WHEN** 用户输入文本并点击生成
- **THEN** 系统 SHALL 渲染二维码图片

#### Scenario: 二维码库加载失败

- **WHEN** qrcode.js CDN 不可达
- **THEN** 二维码工具 SHALL 显示"功能暂不可用"提示

### Requirement: 各工具应以可展开卡片形式呈现

系统 SHALL 将每个工具包装为可展开/折叠的卡片，默认全部展开，用户可折叠不需要的工具以减少页面滚动。

#### Scenario: 用户访问工具页

- **WHEN** 用户打开工具页
- **THEN** 页面 SHALL 展示所有工具卡片，每个卡片包含工具名称、操作区和输出区
