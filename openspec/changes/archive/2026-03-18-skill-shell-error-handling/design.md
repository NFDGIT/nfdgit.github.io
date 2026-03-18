## Context

Step 5 当前结构：目录结构 → Python 脚本 → SKILL.md 引用 → 知识点 → 总结。需要在 Python 脚本之后、SKILL.md 引用之前插入 Bash 脚本示例，并在 SKILL.md 引用示例中加入错误处理和依赖检测的指令写法。

## Goals / Non-Goals

**Goals:**
- 展示完整的 Bash 脚本示例（对应 `check_deps.sh`）
- 在 SKILL.md 示例中加入失败处理指令（如"如果脚本返回非零退出码"）
- 加入依赖检测模式（先检查命令是否存在，不存在则降级或提示用户安装）

**Non-Goals:**
- 不改变 Step 5 的整体结构和标题
- 不新增步骤

## Decisions

在 Step 5 的 Python 脚本代码块之后插入三个新内容块：
1. Bash 脚本示例（check_deps.sh）
2. 带错误处理的 SKILL.md 指令示例（替换当前的简单版本）
3. 不改变现有知识点 section（已有安全提示）

## Risks / Trade-offs

无。纯内容扩充。
