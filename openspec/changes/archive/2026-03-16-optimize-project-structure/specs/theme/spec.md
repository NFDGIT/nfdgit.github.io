# theme（变更增量）

## MODIFIED Requirements

### Requirement: Theme toggle control visibility

系统 SHALL 在所有面向用户的页面（包括首页、笔记浏览器、游戏目录、各游戏页面、相册页面、工具页面与保险页面）提供可见的主题切换控件。

#### Scenario: Toggle visible on homepage

- **WHEN** 用户查看首页
- **THEN** 主题切换控件 SHALL 可见

#### Scenario: Toggle visible on album page

- **WHEN** 用户访问相册页面（`album/index.html`）
- **THEN** 页面 SHALL 引用共享主题脚本并展示主题切换控件

#### Scenario: Toggle visible on insurance page

- **WHEN** 用户访问保险页面（`insurance/index.html`）
- **THEN** 页面 SHALL 引用共享主题脚本并展示主题切换控件

#### Scenario: Toggle visible on racing game page

- **WHEN** 用户访问赛车游戏页面（`games/racing/index.html`）
- **THEN** 页面 SHALL 引用共享主题脚本并展示主题切换控件

## ADDED Requirements

### Requirement: 所有面向用户的页面应设置中文语言属性

系统 SHALL 确保所有面向用户的 HTML 页面的 `<html>` 标签包含 `lang="zh-CN"` 属性。

#### Scenario: album 页面语言属性正确

- **WHEN** 维护者或浏览器解析 `album/index.html`
- **THEN** `<html>` 标签 SHALL 包含 `lang="zh-CN"`

### Requirement: 临时与测试目录不应提交到仓库

系统 SHALL 通过 `.gitignore` 规则阻止临时目录（如 `.tmp-*`、`test-results/`）被提交到版本库中。

#### Scenario: gitignore 包含临时目录规则

- **WHEN** 维护者执行 `git status`
- **THEN** `.tmp-billiards-artifacts/`、`.tmp-playwright-runner/`、`test-results/` 等目录 SHALL 不出现在待跟踪文件列表中

### Requirement: insurance 页面不依赖 jQuery

系统 SHALL 确保 `insurance/index.html` 不加载 jQuery 库，所有 URL 参数读取功能 SHALL 使用原生 JavaScript 实现。

#### Scenario: insurance 页面无 jQuery 引用

- **WHEN** 浏览器加载 `insurance/index.html`
- **THEN** 页面 SHALL 不请求任何 jQuery CDN 资源

#### Scenario: URL 参数读取功能保持正常

- **WHEN** 用户带有 URL 参数访问 insurance 页面
- **THEN** 页面 SHALL 正确读取并应用 URL 参数，功能与替换前一致
