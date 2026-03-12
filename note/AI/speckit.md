# Spec Kit 使用指南

> GitHub 开源的规范驱动开发工具包——用斜杠命令把「要做什么」说清楚，再让 AI 按规范生成代码。一句话：**先定规矩，再动手写。**

---

## 安装

### 安装 Spec Kit（Specify CLI）

Spec Kit 通过 **Specify CLI** 与项目绑定，推荐用 [uv](https://docs.astral.sh/uv/) 安装（需 Python 3.8+）：

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

安装完成后，在终端执行：

```bash
specify --version
```

若能看到版本号，说明安装成功。若提示「命令未找到」，请确认 uv 已安装且其 bin 目录在 `PATH` 中。也可用 `specify check` 检查系统要求（需 Git 2.20+、网络等）。

### 一次性使用（不安装）

想先试一把再决定是否安装，可以直接用 uvx 跑一次：

```bash
uvx --from git+https://github.com/github/spec-kit.git specify init my-project --ai cursor
```

### 初始化项目

在要使用 Spec Kit 的项目目录（或新项目名）下执行：

```bash
specify init my-project --ai cursor
```

或在本目录初始化：

```bash
specify init . --ai cursor
```

`--ai` 可选：`cursor`、`claude`、`copilot`、`gemini` 等（支持 10+ AI 代理）。初始化后会生成项目结构并配置好对应 AI 的斜杠命令，之后在 Cursor 等环境中即可使用 `/specify`、`/plan`、`/tasks`、`/implement` 等（具体前缀以各 AI 集成文档为准，如 Cursor 中可能是 `/speckit.specify`）。

---

## 目录结构

执行 `specify init` 后，项目根目录下会生成 **`.specify/`** 目录，集中存放规范、脚本与 AI 相关制品，与业务代码分离。典型结构如下：

```
.specify/
├── memory/      # 共享记忆（如 constitution 等）
├── scripts/     # 自动化脚本（Bash .sh / PowerShell .ps1）
├── specs/       # 规范与计划文件
├── templates/   # AI 提示模板
└── out/         # 输出目录
```

各子目录的典型内容与作用：

| 目录 | 典型内容 | 作用 |
|------|----------|------|
| **memory/** | `constitution.md` 等 | 存放项目原则、开发准则等共享记忆，供 `/constitution` 等命令使用 |
| **scripts/** | `.sh`、`.ps1` 脚本 | 自动化脚本，CLI 按系统选用 Bash 或 PowerShell 版本 |
| **specs/** | 规范、计划、任务等 Markdown | 存放 `/specify`、`/plan`、`/tasks` 产出的 artifact，AI 按顺序读取并执行；**升级时受保护，不会被覆盖** |
| **templates/** | 模板文件 | 供 AI 使用的提示模板 |
| **out/** | 生成物 | 输出目录，存放 CLI 或流程产生的文件 |

不同版本可能略有差异，具体以你当前 `specify --version` 对应的 [Spec Kit 文档](https://speckit.org/) 或 [GitHub 仓库](https://github.com/github/spec-kit) 为准。

---

## 常用命令

Spec Kit 的核心是一套**斜杠命令**，在已配置的 AI 对话中直接输入即可。推荐的四阶段顺序：**Specify → Plan → Tasks → Implement**。

| 命令 | 在 AI 中的调用 | 作用 | 必做/可选 |
|------|----------------|------|----------|
| **constitution** | `/constitution` 或 `/speckit.constitution` | 建立项目原则与开发准则，建议最先运行 | 可选 |
| **specify** | `/specify` 或 `/speckit.specify` | 定义要做什么、解决什么问题、成功标准（偏业务，不写技术细节） | **必做** |
| **clarify** | `/clarify` 或 `/speckit.clarify` | 通过结构化提问澄清规范中模糊之处，建议在 `/plan` 前执行（除非跳过） | 可选（可显式跳过） |
| **plan** | `/plan` 或 `/speckit.plan` | 制定技术实现计划：技术栈、架构、框架选型 | **必做** |
| **tasks** | `/tasks` 或 `/speckit.tasks` | 把计划拆成可执行、可测试的小任务列表 | **必做** |
| **analyze** | `/analyze` 或 `/speckit.analyze` | 做跨 artifact 的一致性、覆盖度分析，建议在 `/tasks` 之后、`/implement` 之前 | 可选 |
| **implement** | `/implement` 或 `/speckit.implement` | 按任务顺序执行，生成并修改代码 | **必做** |

> 以上命令以 [Spec Kit 官方文档](https://speckit.org/) 为准；在 Cursor 等工具中实际名称可能带前缀（如 `speckit.`），请以当前集成说明为准。

### 步骤必做与可选

不必每次都跑满全部 7 步。**必做**的只有四步：**specify → plan → tasks → implement**（最小可行路径）。其余三步为**可选**：

- **constitution**：建议在新项目或需要统一团队原则时跑；单次小需求可省略。
- **clarify**：官方允许「显式跳过」；若需求已清晰可直接进入 plan。
- **analyze**：建议在 implement 前跑一遍做一致性检查，但不跑也可以直接 implement。

**关于「通过统一配置执行」**：目前 Spec Kit 公开文档中，未发现项目级配置可指定「某步骤自动运行」或「某步骤默认跳过」；是否支持请以 [Spec Kit 官方文档](https://speckit.org/) 为准。若后续版本提供，可在使用指南中再补充配置方式。

---

## 命令效果说明

执行每个斜杠命令后会发生什么？下面按推荐顺序简要说明，方便你在动手前心里有数。

### constitution（项目原则）

**触发方式**：`/constitution` 或 `/speckit.constitution`，可在对话中附带一段描述（如「注重代码质量、测试与 UX 一致」）

**效果**：

- 为项目建立「宪法」：开发原则、风格与约束
- 后续 specify / plan / tasks 会参考这些原则，使 AI 输出更一致

**文件变化**：会写入或更新项目内规范相关文件（具体路径以 CLI 输出为准）。

---

### specify（定义规范）

**触发方式**：`/specify` 或 `/specify <一段需求描述>`

**效果**：

- 定义要做什么、解决什么问题、成功标准
- 聚焦「做什么、为什么」，不写技术实现细节
- AI 会整理成结构化规范（需求、用户故事等）

**文件变化**：生成或更新规范 artifact（如 `.specify/` 下的 Markdown 等）。

---

### clarify（澄清模糊）

**触发方式**：`/clarify`

**效果**：

- AI 针对当前规范提出针对性问题，帮你补全遗漏或消除歧义
- 建议在 `/plan` 前跑一次，除非你主动跳过

**文件变化**：可能更新规范或仅记录问答，视集成而定。

---

### plan（技术计划）

**触发方式**：`/plan` 或 `/plan <技术选型说明>`（如「用 Vite + TypeScript + SQLite」）

**效果**：

- 在规范基础上加入技术约束：架构、框架、技术栈
- 输出可实现的技术计划，供后续拆任务

**文件变化**：生成或更新计划 artifact。

---

### tasks（任务列表）

**触发方式**：`/tasks`

**效果**：

- 把技术计划拆成可评审、可测试的小任务
- 任务粒度适合单次 AI 会话执行，便于逐步实现

**文件变化**：生成或更新任务列表 artifact。

---

### analyze（一致性分析）

**触发方式**：`/analyze`

**效果**：

- 检查规范、计划、任务之间的一致性与覆盖度
- 建议在 `/implement` 前执行，减少遗漏与冲突

**文件变化**：可能生成分析报告或更新现有 artifact。

---

### implement（执行实现）

**触发方式**：`/implement`

**效果**：

- 按任务列表顺序，由 AI 生成或修改代码
- 实现过程以规范与计划为约束，减少「乱写」与偏离

**文件变化**：根据任务修改项目代码与文件；任务状态会随之更新。

---

## 小贴士

- **顺序很重要**：建议按 constitution → specify → clarify → plan → tasks → analyze → implement 走一遍，规范清晰再写代码，事半功倍。
- **与 OpenSpec 对比**：OpenSpec 偏「变更 + 归档 + 主规格库」；Spec Kit 偏「规范 → 计划 → 任务 → 实现」一条龙。两者都是规范驱动编程，可按团队习惯二选一或搭配使用。
- **版本与集成**：本文基于 Spec Kit 当前公开文档整理。若命令或输出有变化，请以 [speckit.org](https://speckit.org/) 与 [GitHub spec-kit](https://github.com/github/spec-kit) 为准。
