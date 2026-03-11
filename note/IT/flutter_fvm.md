## FVM 使用说明与 VSCode 配置

本项目使用 [FVM](https://fvm.app/) 固定 Flutter 版本，推荐在项目内使用 `fvm flutter`，并在 VSCode 中指向项目内 SDK。

### FVM 安装

以 [FVM 官方文档](https://fvm.app/docs/getting_started/installation) 为准，常见方式如下。

- **macOS（Homebrew）**：
  ```bash
  brew tap leoafarias/fvm
  brew install fvm
  ```
- **macOS / Linux / Windows（Dart pub global）**：已安装 Dart/Flutter 时可用：
  ```bash
  dart pub global activate fvm
  ```
  安装后需把 Dart 的 pub cache 的 bin 目录加入 PATH。例如 macOS/Linux：`export PATH="$PATH:$HOME/.pub-cache/bin"`，Windows 在用户环境变量中添加 `%LOCALAPPDATA%\Pub\Cache\bin`。
- **其他方式**：参见 [官方安装说明](https://fvm.app/docs/getting_started/installation)（如 PowerShell 脚本等）。

### 项目 vs 全局

- **全局（global）**：本机「默认」的 Flutter，在任意目录执行 `flutter` 时使用；通过 `fvm global <版本>` 切换，与具体项目无关。
- **项目（project）**：当前项目 `.fvm/` 下安装的 Flutter；只有在本项目内使用 `fvm flutter` 或 IDE 指向 `.fvm` 时才会用到。

```
┌─────────────────────────────────────────────────────────────────┐
│  全局 Flutter (fvm global)     │  项目 A .fvm/ → 3.41.x           │
│  在任意目录打 flutter 时用这版  │  打开项目 A 且 IDE 指向 .fvm 时用这版  │
└─────────────────────────────────────────────────────────────────┘
```

### 推荐用法

- **固定当前项目版本**：在项目根目录执行 `fvm use 3.41.0`（或所需版本），会写入 `.fvm/`，团队拉代码后执行 `fvm install` 再 `fvm use` 即可。
- **在项目内跑命令**：使用 `fvm flutter run`、`fvm dart pub get` 等，避免直接用 `flutter`，保证使用项目锁定的版本。
- **CI / 脚本**：使用 `fvm flutter` 或 `fvm exec -- flutter ...`，与本地、VSCode 行为一致。

### 常用命令

| 命令 | 说明 |
|------|------|
| `fvm install <版本>` | 安装指定 Flutter 版本（如 `fvm install 3.41.0`），仅下载不绑定到当前项目 |
| `fvm use <版本>` | 在当前项目使用指定版本，写入 `.fvm/`，团队需执行 `fvm install` 再 `fvm use` |
| `fvm list` | 列出已安装的版本与当前项目/全局使用的版本 |
| `fvm global <版本>` | 设置本机全局默认 Flutter 版本（任意目录打 `flutter` 时用这版） |
| `fvm flutter` / `fvm dart` | 使用当前项目 `.fvm` 内版本执行 flutter/dart 子命令 |
| `fvm exec -- <命令>` | 在项目 FVM 环境下执行任意命令（如 `fvm exec -- flutter pub get`） |

### VSCode 配置

在项目 `.vscode/settings.json` 中配置：

1. **使用项目内 Flutter SDK**（必须）：
   ```json
   "dart.flutterSdkPath": ".fvm/flutter_sdk"
   ```
   也可写绝对路径如 `.fvm/versions/3.41.0`，只要指向 `.fvm` 下的 SDK 即可。

2. **排除 .fvm 避免索引噪音**（建议）：
   ```json
   "search.exclude": { "**/.fvm": true }
   ```

配置完成后，在 VSCode 中打开本项目时，运行、调试、Dart/Flutter 扩展都会使用 `.fvm` 内的版本，与系统全局 Flutter 版本无关。

### 小结

| 概念 | 说明 | 何时用到 |
|------|------|----------|
| **FVM 全局** | 本机默认 Flutter 版本 | 未进项目或未配项目 FVM 时，终端 `flutter` 会用这版 |
| **FVM 项目** | 当前项目 `.fvm/` 内版本 | 在本项目执行 `fvm flutter` 或 VSCode 指向 .fvm 时 |
| **VSCode** | 通过 `dart.flutterSdkPath` 选择 SDK | 指向 `.fvm/flutter_sdk` 或 `.fvm/versions/xxx` 即使用项目版本 |