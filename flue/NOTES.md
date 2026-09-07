# 授课笔记

## 用户偏好（沿用 build-a-llm / pi-coding-agent 约定）
- 中文讲解 + 英文术语：首次出现的术语给「中文（English）」格式
- 背景：TS/Node/React/vite 熟练；agent 基本原理熟；**flue 使用层高阶**（多个生产项目）；要的是使用层之下的架构心智模型
- 真实项目可当案例：stylist-agent、Headroom（postgres/flue.config）、Glow、dance-teacher、workflow-console
- 常备一手资料：`project/tools/flue` 源码 + `apps/docs/src/content/docs/guide` + 自己的代码；不靠记忆编
- 节奏由老师定、每课一屏一屏短小、跨多次会话

## 授课协议（每课必做，沿用 build-a-llm）
1. **开场检索**：每课开头 2–3 道上一课回忆题（spacing + retrieval，用 `assets/quiz.js`）
2. **单一胜利**：每课只有一个可带走的具体成果
3. **测验选项等长**：同题所有选项字数（中文按字符）一致，不给格式线索
4. **引用**：所有知识点标注来源（源码路径 / 官方 guide md / 项目路径）
5. **术语一致**：先建 `reference/glossary.html`，新课新增术语同步更新
6. 课后附「问老师」提示框 + 主推资源（最高质量一个）

## 组件复用
- `assets/style.css`：全局样式（lessons + reference 共用，Tufte 风、宋体系）
- `assets/quiz.js`：选择题检索组件（`<div data-quiz>` + JSON）
- `assets/order.js`：排序组件（`<div data-order>` + JSON）
- 新可复用组件一律放 `assets/`，不内联进课程

## 课程地图（草案，随进度修订）
底层逻辑：用户使用层已高阶 → 不做 API 教程，按「从 render 中心向外」建心智模型。先画地图（1 课），再逐节点拆。

| 课 | 主题 | 主要一手资料 | 状态 |
|---|---|---|---|
| 0001 | **全景地图**：agent 即函数——一次对话的生命周期旅程 + 分层图（render / hook 注册 / LLM 循环 / 工具 / sandbox / 会话） | guide/why-flue + building-agents + hooks/* 目录 + 自己的 stylist agent | ☐ |
| 0002 | render 模型拆解：为什么 agent 是函数、`'use agent'` + vite transform 把它变成什么 | vite/use-agent-transform + guide/agent-hooks | ☐ |
| 0003 | hook 索引：组合 vs 数据态 vs 生命周期——各注册什么、何时生效 | runtime/src/hooks/* + runtime/src/index.ts | ☐ |
| 0004 | 指令与模型：useModel / useInstruction / useResponseStart-Finish；provider 解析 | hooks/use-model + guide/models | ☐ |
| 0005 | 工具系统：useTool + ToolDefinition(valibot) + 标准 sandbox 工具集 + tool-adapter | hooks/use-tool + agent.ts + tool.ts + Headroom | ☐ |
| 0006 | skill 挂载：SKILL.md 静态导入、agentskills 格式、markdown-import-plugin 为什么禁动态 import | vite/markdown-import-plugin + guide/skills + Headroom skills | ☐ |
| 0007 | sandbox：useSandbox、sandbox.ts、local() 与工具托管 | hooks/use-sandbox + sandbox.ts + guide/sandboxes | ☐ |
| 0008 | 会话与状态：usePersistentState / 会话存储（SQLite run.db vs @flue/postgres）/ conversation 投影 | Headroom + conversation-* + guide/database | ☐ |
| 0009 | **durability**：检查点/重放语义、maxAttempts/timeoutMs、agent-execution-store、compaction | stylist durability + guide/durability + compaction.ts | ☐ |
| 0010 | subagents 与委派：defineSubagent/useSubagent、delegation depth | hooks/use-subagent + guide/subagents | ☐ |
| 0011 | 运行时与部署：CLI run 引导、flue-app/dispatch/agent-routes、SDK http 消费、init() 编程入口 | cli/run-bootstrap + runtime/* + sdk + guide/routing/deploy | ☐ |
| 0012 | **案例课**：stylist-agent——pi-ai 与 flue 的桥接、durability 决策复盘（为什么那么配） | stylist-agent/flue 全量 | ☐ |
| 0013 | 架构对照：flue vs pi-coding-agent（agent 循环/工具/会话/上下文），及其对 workflow-console 的意义 | 两个源码对照 + 自己的 console | ☐ |

### 阶段二 · 进阶扩展（用户确认都要学，排后）
| 课 | 主题 | 主要一手资料 | 状态 |
|---|---|---|---|
| 0014 | provider 与模型层细节：flue 复用什么、自建什么（pi-ai 运输层、provider-diagnostics、多 provider 路由） | usage.ts / provider-diagnostics.ts / runtime/providers.ts + guide/models | ☐ |
| 0015 | Channels：事件 ingress（Slack/Discord/GitHub 等）与 verified 投递 | guide/channels + 对应 channel 包 | ☐ |
| 0016 | Cloudflare 部署：worker-config / DO 会话存储 / cf-sandbox 与 Node target 的分叉 | cloudflare/* + guide/cloudflare-target | ☐ |
| 0017 | 使用层 API 语义精修：init/dispatch/start、SDK 各方法、react 适配——纠正误解为主 | sdk + guide/sdk + reference/agent-api | ☐ |

## 已确认的答复（2025-09 kickoff 追问）
- (a) Channels、Cloudflare、单 provider 细节、使用层 API **全部保留在射程内**（进阶阶段，勿从地图删除）
- (b) 用户自述：几乎到处都是「表面能跑、说不出凭什么」——故课程顺序以「先地图、再从 render 中心向外拆」为准，不预设某一块特别优先
