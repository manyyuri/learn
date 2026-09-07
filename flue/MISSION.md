# Mission: 吃透 flue 的架构模型

## Why
用户已用 `@flue/runtime` + `@flue/vite` + `@flue/cli` 独立做出了多个**生产级** agent 应用（stylist-agent、Headroom、Glow、dance-teacher 等）：能跑、已部署、有 durability 与 Postgres 持久化。但多数是照文档 + 实测拼出来的——对底层架构（agent 作为函数的 render 模型、durability 语义、sandbox、会话/会话投影、vite 打包与 `'use agent'` 变换、skill 挂载机制）仍是**表面心智模型**。目标是把这套机器真正吃透：能解释它、扩展它，并在自己设计 agent（何时用 durability、怎么组织 agent 函数、接 sandbox/持久化、怎么派发与回调）时胸有成竹。

## Success looks like
- 用一段话 + 一张图准确画出「一次 flue 对话从用户消息到 agent 回复的完整旅程」：render 生命周期、各 hook 注册了什么、工具调用循环、sandbox、durability 恢复点——每层职责说清
- 说清「agent 就是函数：一次 render 注册一切、返回指令文本」这一模型下，useModel / useSkill / useTool / useSandbox / useInstruction / usePersistentState / useSubagent / 生命周期 hooks（useAgentStart/Finish 等）各自在哪个阶段生效
- 能对着源码讲关键文件的作用：runtime 的 `agent.ts` / `session.ts` / `sandbox.ts` / `tool.ts` / `hooks/*` / `agent-client.ts`(init) / conversation 流与存储；vite 的 `use-agent-transform` / `markdown-import-plugin`；CLI 的 run 引导
- 遇到异常能定位到是哪一层（render、工具注册、sandbox、durability、会话存储、前端打包）
- 能解释 durability 的检查点/重放语义、`durability`/`agentName` 属性与 init 配置的关系；能说明会话存储选型（SQLite 默认 vs `@flue/postgres`）与 compaction 何时介入
- 能讲清 flue 与 pi-coding-agent 在「agent 循环 + 工具 + 会话」上的架构对照，以及自己的 flue-workflow-console 应该如何正确地建立在 flue 之上

## Constraints
- 用户熟悉 TypeScript/Node/React/vite；对 agent 基本原理（LLM 工具调用循环）已很熟；**flue 使用层已是高阶**——课程只在其下加深，不重教 useModel/useTool 的调用姿势（那是已知层）
- 用户的真实 flue 项目可当案例精读：`/Users/junyingli/project/AI/stylist-agent/flue`、`Headroom`（@flue/postgres、flue.config.ts）、`Glow`、`your-dance-teacher`、`flue-workflow-console`
- flue 官方源码在 `/Users/junyingli/project/tools/flue`（withastro/flue v2.0.3 monorepo，git root）；官方指南 md 在 `apps/docs/src/content/docs/guide/*`
- 时间灵活，跨多次会话；课程粒度宜短，每课一个可消化的知识点
- 中文讲解 + 英文术语（首次出现：中文（English）），沿用既有教学协议
- 一手资料优先：官方指南 + 源码 + 自己的项目，不靠模型参数记忆

## Out of scope
- 通用 agent 原理入门（已懂）；TypeScript/Node/React/vite 本身
- 不为用户重建其已有的 flue 应用

## In scope（含进阶项，按阶段推进）
用户明确：以下**都要学**——核心架构课（前中期）先铺心智模型，Channels / Cloudflare / provider / 使用层细节作为**进阶扩展阶段**排后：
- flue 使用层 API 的调用姿势（不做教程式重教；只在「机制解释需要 / 语义被误解」时深讲）
- 单个具体 model provider 的接入细节（作例子与对照）
- Channels（Slack/Teams/Discord/GitHub 等事件接收）
- Cloudflare 部署（workers/DO target 与 Node target 的分叉点）
