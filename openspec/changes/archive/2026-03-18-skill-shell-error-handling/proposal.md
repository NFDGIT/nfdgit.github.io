## Why

Skills 教程 Step 5（脚本命令）目前只有 Python 脚本示例，缺少三个关键内容：
1. 实际的 Bash/Shell 脚本示例（`check_deps.sh` 被引用但从未展示内容）
2. 脚本执行失败时的错误处理（SKILL.md 指令中如何指导 Agent 处理失败）
3. 依赖未安装时的降级策略（如 Python/Node 不存在时怎么办）

## What Changes

- 在 `skills.html` Step 5 中补充：Bash 脚本示例、SKILL.md 中的错误处理指令写法、依赖检测与降级策略
- 补充内容直接加入现有 Step 5 section，不新增步骤

## Capabilities

### New Capabilities

无。

### Modified Capabilities

无。

## Impact

- `guide/agent/skills.html`：Step 5 内容扩充
