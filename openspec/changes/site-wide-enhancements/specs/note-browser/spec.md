# note-browser（变更增量）

## ADDED Requirements

### Requirement: 笔记浏览器应支持文件名搜索

系统 SHALL 在侧边栏提供搜索框，用户输入关键词后 SHALL 实时过滤目录树，仅显示文件名匹配的节点及其父目录。搜索 SHALL 不区分大小写。

#### Scenario: 用户搜索笔记文件

- **WHEN** 用户在搜索框输入"flutter"
- **THEN** 目录树 SHALL 仅显示文件名包含"flutter"的文件及其父目录，其他节点隐藏

#### Scenario: 用户清空搜索框

- **WHEN** 用户清空搜索框内容
- **THEN** 目录树 SHALL 恢复显示所有节点

#### Scenario: 无匹配结果

- **WHEN** 用户输入的关键词没有匹配任何文件名
- **THEN** 目录树区域 SHALL 显示"无匹配结果"提示
