# Mission: 从零构建大型语言模型（Build a LLM From Scratch）

## Why
三个目标合一：(a) 彻底搞懂 ChatGPT 类 LLM 的底层原理，去"黑盒"化；(b) 亲手用 PyTorch 实现并训练一个真正的 GPT 模型；(c) 支撑 LLM 应用开发工作与 AI 方向职业发展（含面试）。

## Success looks like
- 不看任何资料，能徒手画出 GPT 架构图（token → embedding → Transformer 块 → 输出）并解释每个组件的作用
- 能用 PyTorch 从零实现 GPT-2 规模（124M 参数）的模型，跑通"预训练 → 分类微调 → 指令微调"全流程
- 能读懂《Attention Is All You Need》这类论文的主干内容
- 能向同事清晰解释 token / attention / 微调 / LoRA 等核心概念（面试级表达）
- 理解书末三大附录：训练技巧（预热/余弦衰减/梯度裁剪）、LoRA 参数高效微调、PyTorch 基础

## Constraints
- 语言：中文讲解 + 英文术语保留（首个出现的术语给"中文（English）"格式）
- 学习者背景：JS 熟练；Python 中等（能写函数/类，需要在代码课中补 numpy 惯用法）；矩阵运算基础 OK；**PyTorch 零基础**——必须在第 4 章（实现 GPT 模型）之前安排 PyTorch 检查点课
- 硬件：macOS 消费级设备（无大 GPU）——书中所有代码消费级硬件可跑，符合约束
- 节奏由老师制定，追求完整理解而非速成；包含附录 A/D/E

## Out of scope
- 分布式训练与超大规模模型训练基建（FSDP、Megatron 等）
- 前沿论文的系统性精读（仅在需要时引用）
- 计算机视觉方向的 Transformer 应用
