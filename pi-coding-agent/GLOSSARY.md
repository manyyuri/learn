# pi-coding-agent 架构术语表

本工作区的规范用语。所有课程、讲义、学习记录都遵循本表。定义尽量一句话，能引用本表术语的地方优先引用。

## 分层与核心对象

**Agent 核心（agent core）**:
`packages/agent` 里与 UI、具体工具无关的 LLM 交互引擎。给定 `state`（messages + model + systemPrompt + tools）跑到「没有更多事要做」为止。
_Avoid_: 把 session 或 coding-agent 整个包叫做「agent」

**Agent（`Agent` 类）**:
核心引擎的有状态外壳。持有 transcript、单飞运行（一次一个 run）、发生命周期事件、提供 steer/followUp 队列。
_Avoid_: "引擎", "循环"

**AgentSession（session）**:
包住 Agent 的监护人层：prompt 前处理（命令/skill/模板/auth/压缩检查）、事件转发、持久化、自动重试、压缩编排。SDK 用户主要面对它。

**ModelRuntime**:
`pi-ai` 之上的模型运行时外壳：模型目录、认证（auth.json / 运行时 key）、可用性快照（getAvailable）。

**SessionManager**:
会话文件的读写与树结构管理（JSONL、`id`/`parentId`、branching）。

**ResourceLoader / DefaultResourceLoader**:
发现扩展、skills、prompts、themes、AGENTS.md 的加载器。可注入 override 钩子替换其输出。

## 运行时概念

**run（一次运行）**:
一次 `prompt()` / `continue()` / 扩展命令导致的完整 agent 处理过程，以 `agent_start` 开始、`agent_end` 结束。
_Avoid_: "一次对话"

**turn（回合）**:
一次「LLM 返回一条助手消息」的过程，含可能的工具执行与结果回灌。一次 run 内含 0..N 个 turn。

**toolCall**:
助手消息里的工具调用内容块（type/id/name/arguments）。

**toolResult**:
工具执行产出被包成的消息角色（toolResult），推入上下文供下一回合模型看到。
_Avoid_: 把工具结果叫"副作用"或"额外输出"

**steer / followUp**:
Agent 单飞期间向队列注入消息的两种方式。steer 在当前回合工具调用结束后注入；followUp 在 agent 本该停止时再续跑。

**single-flight（单飞）**:
一个 Agent 同时只跑一个 run 的约束；流式期间再 `prompt()` 会抛错，必须走队列。

**queue drain point（队列排空点）**:
循环中检查 steer/followUp 队列的时机（内层每回合后、外层停止前）。

## 消息与状态

**message role（消息角色）**:
`user` / `assistant` / `toolResult` 为 LLM 可见三角色；`custom` 为扩展自定义角色，默认不发给 LLM。
_Avoid_: 笼统叫"角色"而不指明是哪几个

**AgentState（state）**:
Agent 的可变状态：systemPrompt、model、thinkingLevel、tools、messages，加只读的 isStreaming/streamingMessage/pendingToolCalls/errorMessage。

**convertToLlm**:
AgentMessage[] → 模型 Message[] 的边界转换；默认过滤只留 user/assistant/toolResult。

**compaction（压缩）**:
上下文超限时把旧消息压缩成 checkpoint 总结、释放窗口的机制。由 session 编排，不属 agent 循环。

## 工具

**AgentTool**:
带 schema（TypeBox）与 execute 的工具定义；含 label、prepareArguments、可选 executionMode/replay。
_Avoid_: "函数", "MCP 工具"（语境不一时）

**defineTool**:
SDK 里声明自定义工具（name/label/description/parameters/execute）的工厂。

**executionMode**:
工具执行策略，`parallel`（默认，允许并发）或 `sequential`（逐个）。模型停因是 `length`（被截断）时，整批工具调用直接判失败。

## 资源与模式

**Extension（扩展）**:
经 ResourceLoader 加载、能注册工具/命令/事件监听/自定义消息的代码模块（.ts 文件或内联工厂）。

**Skill**:
结构化的指令文档（SKILL.md），作为系统提示的一部分被 agent 读取。

**PromptTemplate（slash command）**:
`/name` 形式的命令，展开为消息内容；分文件型与命令型。

**Mode（运行模式）**:
驱动同一套 runtime 的外壳：interactive（TUI）、print（单发）、rpc（JSON-RPC）。

## 本工作区约定

- 本文中「LLM 可见」指会进入模型请求上下文；`custom` 消息默认不进。
- 事件分两层：Agent 核心事件（loop 发出）与 Session 事件（在核心事件之上增补，如 agent_settled、auto_retry_*、compaction_*）。
