# 规范式编程文档补充 OpenSpec vs Spec Kit 已有项目结论 — 设计

## Context

`note/AI/spec.md` 当前在「五、老项目适合什么框架？」中给出场景表（Cursor Plan / OpenSpec / Spec Kit）与起步建议，但未写明「若二选一选谁」及依据。探索阶段基于网络公开对比（如 intent-driven.dev、openspec.pro 对比页、Hashrocket 等）得出的结论是：已有项目更推荐 OpenSpec，需将结论与主要原因写进文档，便于读者选型时有据可查。

## Goals / Non-Goals

**Goals:**

- 在「五、老项目」下增加「已有项目二选一」的结论与主要原因（基于公开对比，非本站主观断言）。
- 保持与现有「场景 → 推荐」表格、起步建议一致，不删除或弱化 Spec Kit 作为「需要更结构化流程」时的选项。

**Non-Goals:**

- 不修改 OpenSpec / Spec Kit 的安装或使用步骤；不增加站点代码或构建。

## Decisions

1. **插入位置**  
   在「推荐：OpenSpec 或 Cursor Plan 模式」与「场景」表格之间，或表格之后、起步建议之前，增加一小节（如「若二选一：已有项目更选 OpenSpec」），先给结论再列主要原因，避免与表格重复。

2. **主要原因表述**  
   采用探索阶段归纳的四条（与公开对比一致）：  
   - 定位：OpenSpec 为 brownfield/已有代码库设计，Spec Kit 多被描述为 greenfield/新项目。  
   - 规范形态：OpenSpec 统一单源真相、变更用 delta 合并；Spec Kit 按 feature 多文件，已有项目下拼出「当前系统约定」成本更高。  
   - 流程与迭代：OpenSpec 三步、产出更精简；Spec Kit 阶段多、产出更详，已有项目常做小步修改，轻量流程更匹配。  
   - 依赖与上手：OpenSpec 仅 Node.js、约 5 分钟；Spec Kit 需 Python/uv、约 30 分钟，对纯前端/Node 栈更友好。  
   可加一句「以上依据公开对比与社区表述，详见 OpenSpec/Spec Kit 官方与第三方对比文章」。

3. **总结表**  
   在「六、总结」表中「老项目」一行可补充一句：如「已有项目二选一更推荐 OpenSpec（原因见第五节）」，保持简洁。

## Risks / Trade-offs

- **[取舍]** 公开对比会随时间变化 → 已用「基于公开对比」「详见官方与第三方」等表述，避免绝对化，便于日后更新。
