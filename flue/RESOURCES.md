# flue 架构学习资源

学习工作区 `/Users/junyingli/learn/flue`；官方源码 `/Users/junyingli/project/tools/flue`（withastro/flue v2.0.3 monorepo，git root）。一手资料优先：官方指南 + 源码 + 用户自己的真实项目，不靠模型参数记忆。

## Knowledge

### 官方文档（指南层——先看它，再看源码）
- [指南在线站 — flueframework.com/docs](https://flueframework.com/docs)
- [指南本地 md — `apps/docs/src/content/docs/guide/*.md`](../../project/tools/flue/apps/docs/src/content/docs/guide/)
  核心页：`why-flue`（为什么要 agent 即函数）、`project-layout`、`building-agents`、`agent-hooks`、`models`、`tools`、`skills`、`sandboxes`、`durability`、`subagents`、`workflows`、`sessions`(在 reference/cli 相关页)、`database`、`mcp`、`channels`、`routing`、`deploy`。用于：每课的知识基底与「官方怎么说」。
- [CLI 离线文档 — `flue docs read/search`]()（`npx flue docs read guide/skills`）
  在已装 `@flue/cli` 的项目里跑（如 stylist-agent/flue）。用于：查某个概念当前版本的权威措辞。

### 源码导航（架构课的真相所在——按层精读）
- [runtime — `/Users/junyingli/project/tools/flue/packages/runtime/src/`](../../project/tools/flue/packages/runtime/src/)
  - `agent.ts`：标准模型侧工具工厂（createBashTool/EditTool/…）与 agent 核心
  - `hooks/*.ts`：20 个 `use*` hook——render 期注册一切。**心智模型索引**：组合类（useModel/useSkill/useTool/useSandbox/useInstruction/useSubagent/useMcpConnection）、数据态（usePersistentState/useInitialData/useDataWriter/useDelivery/useDispatchMessage）、生命周期（useAgentStart/Finish、useResponseStart/Finish）
  - `agent.ts` / `session.ts` / `sandbox.ts` / `tool.ts` / `skill-package.ts` / `compaction.ts` / `context.ts` / `message-output.ts`：核心类型与机制
  - `agent-client.ts`：`init()`——无打包、程序化驱动一次会话的入口（对应 `@flue/runtime` 的编程 API）
  - `conversation-*.ts`（public/projections/reader/writer/records）与 `runtime/`（flue-app、dispatch、handle-agent、agent-routes、stream-offsets）：会话投影与运行时服务器层
- [vite 打包层 — `/Users/junyingli/project/tools/flue/packages/vite/src/`](../../project/tools/flue/packages/vite/src/)
  `use-agent-transform.ts`（把 `'use agent'` + agent 函数转成可注册代码的编译器）、`markdown-import-plugin.ts`（SKILL.md 静态导入）、`flue-plugin.ts` / `node-dev.ts` / `node-preview.ts`、`agent-scan.ts`。用于：解释「为什么 SKILL.md 必须静态导入、动态 import 是构建错误」。
- [CLI — `/Users/junyingli/project/tools/flue/packages/cli/src/`](../../project/tools/flue/packages/cli/src/)
  `lib/run-bootstrap.ts`（`flue run` 如何引导、缓存 run.db）、`lib/run-local.ts`、`commands/*`。
- [SDK — `/Users/junyingli/project/tools/flue/packages/sdk/src/`](../../project/tools/flue/packages/sdk/src/)
  `client.ts` + `public/{send,stream,conversation,settle,reply,observe}.ts`：HTTP 客户端消费已部署 agent 会话。用于：讲清「部署态」的消费模型。
- [react 适配 — `packages/react`]() 与 [会话/参考文档 — `apps/docs/src/content/docs/reference`、`docs/cli`、`docs/sdk`]()
  用于：把会话/客户端协议钉死成参考事实。

### 用户自己的真实项目（案例层——把抽象落到他已写的代码）
- [stylist-agent/flue — `/Users/junyingli/project/AI/stylist-agent/flue/`](../../project/AI/stylist-agent/flue/)
  三个 agent（stylist/photo-review/daily-outfit）；`Stylist.agentName` + `durability={maxAttempts:3, timeoutMs:300_000}`；valibot 封装的工具注册器（registerBusinessTools / registerDurableBusinessTools）；vite+hono 部署 + `@flue/sdk` 消费；**混用 `@earendil-works/pi-ai`**（跨框架桥接的稀有案例）。用于：durability、部署、SDK、render 组织方式的精读对象。
- [Headroom — `/Users/junyingli/project/AI/Headroom/`](../../project/AI/Headroom/)
  `useInstruction` / 内联 valibot `useTool` / `flue.config.ts` / **`@flue/postgres` 持久化** / 多 skill（agents/skills/energy-management 等）/ agent object 导出（`{name,skills,entry}`）。用于：持久化、会话存储选型、flue.config 的精读对象。
- [Glow — `/Users/junyingli/project/AI/Glow/`](../../project/AI/Glow/) 与 [dance-teacher — `/Users/junyingli/project/AI/your-dance-teacher/`](../../project/AI/your-dance-teacher/) 与 [workflow-console — `/Users/junyingli/project/AI/flue-workflow-console/flue/agents/hello.ts`](../../project/AI/flue-workflow-console/)
  更多使用形态（agent 与业务服务接线、Runtime 编排）。用于：对照不同接线方式。

## Wisdom（社区）
- 暂无。先由导师（本 agent）提供源码导航与反馈闭环。若用户后续想提交 PR/请教，可引入 withastro/flue 的 GitHub issues/PR（用户已有源码 clone，可直接在官方仓库上对比与提问）。

## Gaps
- 暂无面向「用 flue 深度二开/源码贡献者」的中文社区记录。若用户有兴趣，后续可搜 flue 的 GitHub Discussions / Discord 并记录其是否愿意加入。
- durability 的官方权威描述只有 guide/durability.md + 源码，缺乏第三方深度解读——本课程的 durability 课需要自己从源码与 init 实测中建立证据链。
