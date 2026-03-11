# 在 Spec Kit 使用指南中补充步骤必做/可选与统一配置说明

## Why

读者在 explore 中澄清了「不一定每次都跑全流程」的含义，并希望文档明确：哪些步骤必做、哪些可选、哪些可以跨过但通过统一配置执行。当前 `note/AI/speckit.md` 未区分必做/可选，也未说明 Spec Kit 是否支持通过项目配置自动执行或默认跳过某步骤，容易让人误以为每次都要跑满 7 步。

## What Changes

- 在 `note/AI/speckit.md` 中新增一小节（如「步骤必做与可选」），放在「常用命令」之前或紧跟其后：
  - **必做步骤**：specify、plan、tasks、implement（最小可行路径）。
  - **可选步骤**：constitution（建议新项目或统一原则时用）、clarify（可显式跳过）、analyze（建议 implement 前跑，可不跑）。
  - **关于「跨过但通过统一配置执行」**：说明目前 Spec Kit 公开文档中未见项目级配置可指定某步骤自动运行或默认跳过；是否支持请以官方文档为准，若有后续支持再补充。
- 在「常用命令」表格或命令效果说明中，对每个命令标注「必做」或「可选」（可与上述小节呼应）。

## Capabilities

### New Capabilities

无。

### Modified Capabilities

- `speckit-doc`：Spec Kit 使用指南须包含步骤必做/可选说明及关于统一配置的当前结论（见本 change 的 delta spec）。

## Impact

- **note/AI/speckit.md**：新增「步骤必做与可选」小节，并在常用命令表中为各命令标注必做/可选；补充关于统一配置的说明。
