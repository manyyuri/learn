# 基线与任务确立（Kickoff）

用户在 kickoff 中确认：学习形态与 pi-coding-agent 工作区同构——不是补 flue 使用层 API（其产品层已高阶），而是**吃透 flue 的架构模型**，全程对着官方源码（`project/tools/flue` v2.0.3 monorepo）+ 用户自己的真实项目（stylist-agent、Headroom、Glow、dance-teacher、workflow-console）讲。

**Evidence**：用户点名复述了任务目标措辞（"从会用 flue 搭 agent 到能解释它、扩它、做架构决策"）；基线侦察确认其生产级使用：durability（maxAttempts/timeoutMs + agentName）、@flue/postgres 持久化、valibot useTool、useInstruction、vite+hono 部署、@flue/sdk 消费、pi-ai 与 flue 混用（stylist）。

**Implications**：(1) 课程不做 API 教程，从「agent 即函数（一次 render 注册一切、返回指令）」这个中心向外建分层心智模型，首课先给全景地图；(2) 用户已知层厚，回忆题应测「机制为什么」而非「怎么调用」；(3) 已从 `learn/build-a-llm` 复用共享样式与 quiz/order 组件，授课协议（开场检索、单一胜利、选项等长、引用、术语表同步）沿用。
