# OpenSpec 使用指南

> 一份面向 AI 辅助开发的变更管理工具说明。语言生动、结构清晰，助你快速上手。

---

## 安装

### 安装 OpenSpec

OpenSpec 是一个 Node.js 命令行工具，通过 npm 全局安装即可：

```bash
npm install -g @fission-ai/openspec@latest
```

安装完成后，在终端执行：

```bash
openspec --version
```

若能看到版本号（如 `1.2.0`），说明安装成功。若提示「命令未找到」，请确认 Node.js 已安装且 `npm` 的全局 bin 目录已加入 `PATH`。

### 初始化项目

在项目根目录执行：

```bash
openspec init
```

这会创建 `openspec/` 目录结构，并根据你选择的 AI 工具（如 Cursor）生成对应的快捷命令配置。之后即可在 Cursor 中使用 `/opsx:*` 系列命令。

---

## 目录结构

OpenSpec 的「家」在项目根目录下的 `openspec/` 文件夹。理解它的结构，就像拿到一张地图——知道每个房间放什么，找东西才不会迷路。

```
openspec/
├── config.yaml          # 项目配置：schema、上下文、规则
├── changes/             # 进行中的变更（提案、设计、任务都在这里）
│   ├── add-xxx/        # 每个变更一个子目录
│   │   ├── proposal.md
│   │   ├── design.md
│   │   ├── tasks.md
│   │   ├── specs/      # 该变更的 spec 增量
│   │   └── .openspec.yaml
│   └── archive/        # 已完成的变更归档
│       └── 2026-03-10-add-xxx/
└── specs/              # 主规格库（当前系统的「真相」）
    └── feature-name/
        └── spec.md
```

| 路径 | 作用 |
|------|------|
| `openspec/config.yaml` | 项目级配置：指定 schema、注入项目上下文、为各 artifact 定义规则 |
| `openspec/changes/<name>/` | 单个变更的「工作区」：proposal、design、specs、tasks 等 artifact 的存放位置 |
| `openspec/changes/archive/` | 归档目录：已完成变更会以 `YYYY-MM-DD-<name>` 形式移入此处 |
| `openspec/specs/` | 主规格库：代表当前已部署系统的「真相」，archive 时会合并 specs 到此处 |

---

## 常用命令

OpenSpec 的 OPSX 工作流提供四个核心命令（在 Cursor 中对应 `/opsx:*` 系列）：

| 命令 | Cursor 调用 | 作用 |
|------|-------------|------|
| **propose** | `/opsx:propose` | 创建变更并一次性生成 proposal、design、specs、tasks 等规划 artifact |
| **explore** | `/opsx:explore` | 进入探索模式：思考想法、调查问题、澄清需求，**不写代码** |
| **apply** | `/opsx:apply` | 按 `tasks.md` 执行实现，逐项完成并勾选 |
| **archive** | `/opsx:archive` | 变更完成后归档，将变更目录移入 `archive/`，并可选同步 specs 到主库 |

> 以上为 OpenSpec OPSX 的 core 工作流，详见 [官方文档](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md)。

---

## 命令效果说明

执行每个命令后会发生什么？下面逐一说明，方便你在动手前心里有数。

### propose（创建变更提案）

**触发方式**：`/opsx:propose` 或 `/opsx:propose <变更名>`

**效果**：

- 在 `openspec/changes/<name>/` 下创建变更目录
- 按依赖顺序生成 `proposal.md`、`design.md`、`specs/**/*.md`、`tasks.md`
- 终端会输出类似「Created proposal」「Created design」等进度信息
- 完成后提示：`All artifacts complete! Ready for implementation.` 并建议运行 `/opsx:apply`

**文件变化**：新增一整个 `openspec/changes/<name>/` 目录及其中的 artifact 文件。

---

### explore（探索模式）

**触发方式**：`/opsx:explore` 或 `/opsx:explore <主题>`

**效果**：

- AI 进入「思考伙伴」模式：可以读代码、画图、讨论方案，但**不会写实现代码**
- 无固定步骤、无强制输出，对话自由流动
- 若你决定落地某个想法，AI 会建议先退出 explore，再用 `/opsx:propose` 创建正式变更

**文件变化**：通常不产生新文件；若你明确要求，可创建 proposal、design、specs 等 artifact 以「记录思考」。

---

### apply（执行实现）

**触发方式**：`/opsx:apply` 或 `/opsx:apply <变更名>`

**效果**：

- 读取 `tasks.md`，按顺序执行未完成的任务
- 每完成一项，将 `- [ ]` 改为 `- [x]`
- 终端会显示进度，如 `Working on task 3/7: ...`
- 全部完成后提示：`All tasks complete! You can archive this change with /opsx:archive`

**文件变化**：根据任务内容修改项目代码或文档；同时更新 `tasks.md` 中的勾选状态。

---

### archive（归档变更）

**触发方式**：`/opsx:archive` 或 `/opsx:archive <变更名>`

**效果**：

- 若存在 delta specs，会先询问是否同步到 `openspec/specs/`（推荐同步）
- 将 `openspec/changes/<name>/` 移动到 `openspec/changes/archive/YYYY-MM-DD-<name>/`
- 输出归档摘要：变更名、schema、归档路径、是否已同步 specs

**文件变化**：变更目录从 `changes/` 移至 `changes/archive/`；若选择同步，主规格库 `openspec/specs/` 会更新。

---

## 小贴士

- **先 explore，再 propose**：想法还不清晰时，用 explore 先聊一聊；成型后再 propose 正式立项。
- **版本说明**：本文基于 OpenSpec 1.2.x。若命令或输出有变化，请以 `openspec --help` 及[官方文档](https://github.com/Fission-AI/OpenSpec)为准。
