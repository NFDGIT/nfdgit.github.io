# 在 Spec Kit 使用指南中补充完整目录结构说明

## Why

当前 `note/AI/speckit.md` 的「目录结构」小节只笼统提到「规范与计划等 artifact 的存放位置」「以官方为准」，未列出执行 `specify init` 后实际会有哪些目录、各目录下有哪些内容、各自作用是什么，读者无法快速建立心智模型。补充完整目录列表与说明可降低上手成本，便于查阅与版本管理（如 `.gitignore`）。

## What Changes

- 在 `note/AI/speckit.md` 的「目录结构」小节中，替换或扩充现有模糊描述为**具体目录列表**：
  - 明确根目录为项目下的 **`.specify/`**（执行 `specify init` 后生成）。
  - 列出 `.specify/` 下各子目录：`memory/`、`scripts/`、`specs/`、`templates/`、`out/`（以当前 Spec Kit 官方文档为准，若版本差异则注明）。
  - 对每个子目录说明：**里面有什么**（典型文件或内容）、**作用是什么**（如 memory 存 constitution 等共享记忆，specs 存规范与计划，scripts 为自动化脚本等），并可选注明升级时 `specs/` 受保护等注意点。
- 保留「以官方文档为准」的兜底表述，并附官方/仓库链接。

## Capabilities

### New Capabilities

无。

### Modified Capabilities

- `speckit-doc`：Spec Kit 使用指南须包含「执行 specify init 后的完整目录列表及各目录内容与作用」的说明（见本 change 的 delta spec）。

## Impact

- **note/AI/speckit.md**：仅修改「目录结构」小节，不改变其他章节。
