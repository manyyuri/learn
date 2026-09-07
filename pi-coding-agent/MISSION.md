# Mission: 吃透 pi-coding-agent 的架构模型

## Why
用户已经用 `@earendil-works/pi-coding-agent` 的 SDK 做出了一款「从需求澄清到测试报告」的固定流程软件开发工作流应用，能跑、在用。但它是照文档拼出来的——对底层架构（agent 循环、session、事件流、工具、资源加载）只有表面心智模型。用户现在要把这套机器**真正吃透**：不是为了再用得更好，而是为了能解释它、扩展它、并且在自己做架构决策（什么时候用长会话 vs 短会话、怎么挂工具、怎么处理上下文）时胸有成竹。

## Success looks like
- 能用一段话 + 一张图，准确画出「一次 prompt 从调用到完成的完整旅程」，说清每个环节的职责
- 能说出 pi 的分层（agent 核心 / model / tools / session / 资源 / mode），并指出它们之间的边界与调用方向
- 遇到异常行为时，能定位到具体是哪一层出的问题（是 agent 循环、事件流、compaction 还是工具实现）
- 能解释 session 为什么是树、为什么需要 compaction/retry，以及这些如何影响他自建 workflow 的设计
- 能对着源码讲出关键文件/函数的作用（agent-loop、agent-session、resource-loader、model-runtime 等）

## Constraints
- 用户熟悉 TypeScript/Node，了解 agent 基本原理（LLM 工具调用循环、流式），SDK 层已有实战经验
- 仓库源码在本地 `/Users/junyingli/project/tools/pi/packages/coding-agent`（含 agent/ai/session-backends 等 monorepo 包），可随时精读
- 时间灵活，跨多次会话持续学习；课程粒度宜短，每课一个可消化的知识点
- 用中文教学

## Out of scope
- 不教通用 agent 原理入门（用户已懂）
- 不教 TypeScript/Node 本身
- 不重做他已经完成的 workflow 应用（那是他的实战层，我们只在其下加深理解）
- 暂不深入 TUI 界面渲染实现与具体某家 model provider 的接入细节（除非后续任务需要）
