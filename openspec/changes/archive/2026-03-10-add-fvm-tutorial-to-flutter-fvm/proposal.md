# 在 flutter_fvm 笔记中增加 FVM 安装教程与常用命令

## Why

`note/IT/flutter_fvm.md` 当前主要说明「项目 vs 全局」用法与 VSCode 配置，缺少 FVM 的安装步骤和常用命令速查，新成员或新环境配置时不便。补充安装教程与常用命令可降低上手成本，并便于日常查阅。

## What Changes

- 在 `note/IT/flutter_fvm.md` 中新增 **FVM 安装** 小节：覆盖常见平台（macOS / Windows / 其他）的安装方式（如 brew、pub global、官方脚本等），以及安装后 PATH 或 shell 配置要点。
- 在 `note/IT/flutter_fvm.md` 中新增 **常用命令** 小节：列出并简要说明常用 FVM 命令（如 `fvm install`、`fvm use`、`fvm list`、`fvm global`、`fvm flutter` / `fvm dart` 等），与现有「推荐用法」形成互补。

## Capabilities

### New Capabilities

- `flutter-fvm-doc`：flutter_fvm 笔记须包含 FVM 安装教程与常用命令说明，便于新成员上手与日常查阅。

### Modified Capabilities

无。

## Impact

- **note/IT/flutter_fvm.md**：新增「FVM 安装」与「常用命令」两节，保持与现有结构和语气一致，不破坏现有 VSCode 与用法说明。
