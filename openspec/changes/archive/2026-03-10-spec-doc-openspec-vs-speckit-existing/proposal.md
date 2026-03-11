# 在规范式编程文档中补充「已有项目二选一选 OpenSpec」的结论与原因

## Why

探索阶段基于网络公开对比得出的结论——已有项目若在 OpenSpec 与 Spec Kit 中必须选一个，更推荐 OpenSpec，且有一组可引用的主要原因——若只留在对话里容易遗忘，也不利于读者查阅。将结论与主要原因沉淀到 `note/AI/spec.md`，可让「老项目适合什么框架」一节更有依据、便于选型。

## What Changes

- 在 `note/AI/spec.md` 的「五、老项目适合什么框架？怎么用？」中补充：
  - **结论**：已有项目在 OpenSpec 与 Spec Kit 二选一时，更推荐 OpenSpec。
  - **主要原因**（基于公开对比）：OpenSpec 为 brownfield/已有代码库设计、规范为统一单源真相、流程更轻、迭代更快、依赖更少（仅 Node.js）；Spec Kit 在公开资料中多被描述为 greenfield/新项目、流程更重、产出更详。
- 保留现有「场景 → 推荐」表格与起步建议，不删除既有内容；可选在总结表中增加一句与该结论对应的要点。

## Capabilities

### New Capabilities

- `spec-framework-doc`：规范式编程与框架对比文档（`note/AI/spec.md`）须包含「已有项目二选一选 OpenSpec」的结论及上述主要原因的说明。

### Modified Capabilities

无。

## Impact

- **note/AI/spec.md**：仅增补「五、老项目」下的结论与原因，不改变其他章节与站点代码。
