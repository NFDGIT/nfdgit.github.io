## Why

Skills 教程目前讲了 SKILL.md 的 frontmatter 和 Markdown 指令，但完全没有讲 Skill 中如何使用脚本命令。Step 1 提到了 `scripts/` 目录但一笔带过。读者不知道：
- 怎么在 Skill 目录下放脚本文件
- 怎么在 SKILL.md 指令中引用并执行脚本
- Agent 在 Cursor 等工具中如何通过 Shell 工具执行这些脚本
- 脚本如何接收参数、返回结果

## What Changes

- 在 `skills.html` 现有 Step 4（代码审查实战）之后新增 Step 5"在 Skill 中使用脚本命令"
- 内容包含：scripts/ 目录结构、编写辅助脚本（Python/Bash）、在 SKILL.md 中指导 Agent 执行脚本、参数传递与结果处理
- 更新 sidebar 导航加入 Step 5

## Capabilities

### New Capabilities

无新能力。

### Modified Capabilities

无规格级别变更，纯内容补充。

## Impact

- `guide/agent/skills.html`：新增 Step 5 section + 更新 sidebar 导航
