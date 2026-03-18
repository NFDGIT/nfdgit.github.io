## Context

当前 skills.html 有 4 步：Skill 概念 → SKILL.md 结构 → 加载使用 → 代码审查实战。新增 Step 5 讲脚本命令的使用，变为 5 步。

## Goals / Non-Goals

**Goals:**
- 教读者如何在 Skill 中放置辅助脚本（Python、Bash、Node.js）
- 教读者如何在 SKILL.md 指令中指导 Agent 执行这些脚本
- 展示脚本参数传递和结果处理的完整示例
- 讲清 Agent 执行脚本的机制（Cursor 用 Shell 工具，自写 Agent 用 subprocess）

**Non-Goals:**
- 不讲复杂的脚本开发（不是 Python/Bash 教程）
- 不修改其他页面

## Decisions

### Step 5 内容结构

1. **scripts/ 目录结构**：文件组织方式，命名规范
2. **编写辅助脚本**：一个实用的 Python 脚本示例（如项目统计脚本）
3. **在 SKILL.md 中引用脚本**：如何在指令中告诉 Agent 执行 `python scripts/xxx.py --arg value`
4. **执行机制**：Cursor/Claude Code 通过 Shell 工具执行；自写 Agent 通过 subprocess 执行
5. **安全提示**：脚本权限、沙箱限制

### 插入位置

新 Step 5 插入在现有 Step 4（代码审查）和底部导航之间。Sidebar 导航从 4 项变 5 项。

## Risks / Trade-offs

无风险。纯内容增补。
