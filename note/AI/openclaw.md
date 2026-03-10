# OpenClaw 使用指南

> 一个「能动手」的 AI 助手——在你自己的机器上跑，能读写文件、执行命令、控制浏览器、发消息。一句话：**ChatGPT 负责说，OpenClaw 负责做。**

---

## 安装

### 系统要求

- **Node.js 22+**（安装脚本会自动检测并安装）
- **macOS / Linux / Windows**（Windows 建议用 WSL2）
- 可选：`pnpm`（仅从源码构建时需要）

### 推荐安装（一键脚本）

**macOS / Linux / WSL2：**

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Windows PowerShell：**

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

脚本会处理 Node 检测、安装和后续引导。

### 仅安装二进制（跳过引导）

```bash
# macOS / Linux
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

### 手动安装（已有 Node 22+）

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

### 安装后验证

```bash
openclaw doctor      # 检查配置
openclaw status      # 查看 Gateway 状态
openclaw dashboard   # 打开 Web 控制台（默认 http://localhost:18789/）
```

---

## 目录结构（数据存放）

OpenClaw 的数据默认在 `~/.openclaw/`：

| 路径 | 作用 |
|------|------|
| `~/.openclaw/soul.md` | Agent 性格与行为规则 |
| `~/.openclaw/.env` | API 密钥与配置 |
| `~/.openclaw/skills/` | 已安装的 Skills 插件 |
| `~/.openclaw/data/` | 对话历史与记忆数据库 |
| `~/.openclaw/logs/` | 运行日志 |

---

## 核心功能

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        OpenClaw 能力图谱                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐                   │
│   │  本地运行   │   │  全系统访问  │   │  浏览器控制  │                   │
│   │  数据不出本机│   │  读写/执行  │   │  填表/抓取  │                   │
│   └─────────────┘   └─────────────┘   └─────────────┘                   │
│          │                  │                  │                         │
│          └──────────────────┼──────────────────┘                         │
│                             │                                            │
│                    ┌────────▼────────┐                                  │
│                    │    Gateway      │  ← 核心枢纽                       │
│                    │  消息路由/会话  │                                  │
│                    └────────┬────────┘                                  │
│                             │                                            │
│          ┌──────────────────┼──────────────────┐                        │
│          │                  │                  │                         │
│   ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐                   │
│   │  Channels   │   │   Skills   │   │   Memory    │                   │
│   │ 多平台聊天  │   │  能力插件  │   │  持久记忆   │                   │
│   └─────────────┘   └─────────────┘   └─────────────┘                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 功能点说明

### 1. 本地运行（Runs on Your Machine）

| 作用 | 说明 |
|------|------|
| **隐私** | 数据留在本机，不依赖第三方云服务 |
| **模型** | 支持 Anthropic Claude、OpenAI、Ollama 等本地模型 |
| **成本** | 软件免费（MIT），主要成本是 API 调用 |

---

### 2. 全系统访问（Full System Access）

| 作用 | 说明 |
|------|------|
| **文件** | 读写项目文件、配置等 |
| **命令** | 执行 shell 命令、脚本 |
| **模式** | 可选沙箱模式，限制访问范围 |

适合：代码生成、重构、自动化脚本、部署等。

---

### 3. 浏览器控制（Browser Control）

| 作用 | 说明 |
|------|------|
| **导航** | 打开网页、点击、滚动 |
| **表单** | 自动填写表单、提交 |
| **抓取** | 从网页提取结构化数据 |

适合：自动化测试、数据采集、重复性网页操作。

---

### 4. 多平台聊天（Channels）

| 作用 | 说明 |
|------|------|
| **接入** | 通过 Gateway 接入多种聊天平台 |
| **平台** | WhatsApp、Telegram、Discord、Slack、Signal、iMessage 等 |
| **场景** | 私聊、群聊，通过 @ 或关键词触发 |

你可以在常用聊天 App 里直接和 OpenClaw 对话，无需单独客户端。

---

### 5. 持久记忆（Persistent Memory）

| 作用 | 说明 |
|------|------|
| **偏好** | 记住你的偏好和习惯 |
| **上下文** | 跨会话保留对话和任务上下文 |
| **演进** | 随使用逐步个性化 |

---

### 6. Skills 与插件（Skills & Plugins）

| 作用 | 说明 |
|------|------|
| **扩展** | 为 Agent 增加新能力（如调用第三方 API） |
| **来源** | 社区 Skills、自建 Skills |
| **安装** | `openclaw skills install clawhub/skill-name` |
| **配置** | 在 `~/.openclaw/openclaw.json` 中管理 |

Skills 类似「技能包」，让 OpenClaw 能操作智能家居、日历、音乐等。

---

### 7. Gateway（网关）

| 作用 | 说明 |
|------|------|
| **路由** | 把各 Channel 的消息路由到对应 Agent |
| **会话** | 管理跨渠道的会话和上下文 |
| **调度** | 协调 Skills 和工具调用 |
| **状态** | 监控运行状态和性能 |

Gateway 是消息和能力的中心枢纽。

---

## 典型使用流程

```
安装 → openclaw onboard（配置 API、Channel、Daemon）
     → openclaw dashboard（打开控制台）
     → 在 WhatsApp/Telegram 等添加 Bot
     → 开始对话，让 AI 执行任务
```

---

## 与 ChatGPT 的对比

| 维度 | ChatGPT | OpenClaw |
|------|---------|----------|
| **部署** | 云端 | 本机/自托管 |
| **能力** | 对话、建议 | 对话 + 执行（文件、命令、浏览器等） |
| **隐私** | 数据在 OpenAI | 数据在你机器上 |
| **接入** | Web/App | 聊天 App、CLI、Web 控制台 |

---

## 小贴士

- **soul.md**：编辑 `~/.openclaw/soul.md` 可自定义 Agent 的性格、语气、禁忌话题
- **版本说明**：本文基于 OpenClaw 近期版本。若命令或输出有变化，请以 `openclaw --help` 及[官方文档](https://openclawlab.com/en/docs/)为准
