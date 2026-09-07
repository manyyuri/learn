# pi-coding-agent 架构学习资源

> 本工作区课程：打开 `index.html`（10 课 + 速查卡 `reference/architecture-map.html`）。课程为消化上述一手资料后的教学输出；本文件仍是资料源清单。

学习工作区位于 `/Users/junyingli/learn/pi-coding-agent`，仓库源码在 `/Users/junyingli/project/tools/pi`（monorepo，git root）。所有知识型内容优先从源码与官方文档提炼，不靠模型参数记忆。

## Knowledge（一手资料）

- [官方 SDK 文档 — `packages/coding-agent/docs/sdk.md`](../../project/tools/pi/packages/coding-agent/docs/sdk.md)
  程序化使用 `createAgentSession()` / `createAgentSessionRuntime()` 的权威文档。用户已用过，作为「已知层」的基线。
- [SDK 可运行示例 — `packages/coding-agent/examples/sdk/`](../../project/tools/pi/packages/coding-agent/examples/sdk/)
  13 个示例从 minimal 到 full-control。用于对照「文档说的」与「代码实际怎么拼」。
- [monorepo 开发规则 / 架构约定 — `/Users/junyingli/project/tools/pi/AGENTS.md`](../../project/tools/pi/AGENTS.md)
  代码质量规则、如何跑测试、提交规范。精读源码前必读，能避免踩坑。
- [agent 核心（最内层循环）— `/Users/junyingli/project/tools/pi/packages/agent/src/`](../../project/tools/pi/packages/agent/src/)
  `agent.ts`、`agent-loop.ts`、`types.ts`：纯 LLM 交互循环的真相所在。学「agent 循环」课的核心资料。
- [coding-agent 核心源码 — `/Users/junyingli/project/tools/pi/packages/coding-agent/src/`](../../project/tools/pi/packages/coding-agent/src/)
  `core/agent-session.ts`（session 层）、`core/resource-loader.ts`、`core/model-runtime.ts`、`core/session-manager.ts`、`core/compaction/`、`core/tools/`、`modes/`。
- [扩展系统文档 — `docs/extensions.md`](../../project/tools/pi/packages/coding-agent/docs/extensions.md)
  工具注册、事件订阅、命令、生命周期。学「扩展」课的核心资料。
- [会话格式 — `docs/session-format.md`](../../project/tools/pi/packages/coding-agent/docs/session-format.md)
  JSONL 会话的磁盘格式，理解「session 为什么是树」的钥匙。
- [RPC 协议 — `docs/rpc.md`](../../project/tools/pi/packages/coding-agent/docs/rpc.md)
  子进程集成协议。SDK vs RPC 两种嵌入方式的对比。

## Wisdom（社区）

- 暂无。先由导师（本 agent）提供源码导航与反馈闭环。若用户后续想提交 PR / 请教，可引入 pi 官方 GitHub（`@earendil-works/pi-coding-agent`）的 issues/PR 作为真实反馈源。

## Gaps
- 尚无社区或论坛可让用户与「其他基于 pi 做二开的人」交流。若用户有兴趣，后续可搜索是否有 pi 的 discord / GitHub discussions / 中文社区，并记录用户是否愿意加入。
