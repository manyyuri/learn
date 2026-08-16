# 任务：掌握 LLM 推理技术，并应用到工作中

## Why
把《Build a Reasoning Model (From Scratch)》里的推理技术真正用进工作：能判断业务场景何时值得上推理模型，能自己动手评估、改进、训练模型的推理能力，而不是只会调用别人的 API。

## Success looks like
- 在 Mac 上跑通书的代码：加载小模型、构建数学验证器、跑 GSM8K 风格评估
- 能实现 CoT 提示、self-consistency、self-refinement，并用评估数字量化收益
- 能从零实现 GRPO 训练循环（rollouts、advantage、loss、clipping、KL），解释每个组件为什么存在
- 能用蒸馏把大模型的推理能力转移到小模型，并评估转移效果
- 面对工作中的具体需求，能选出合适的推理技术，说清成本/收益/延迟的权衡

## Constraints
- 硬件：Mac M1 Pro 16GB（MPS 后端），无 CUDA —— 以 0.6B–1.7B 小模型为主
- 已读《Build an LLM (From Scratch)》：transformer 架构、预训练、微调是已知地基，**不重教**
- 无强化学习背景：第 6–7 章之前需要专门铺垫 RL 直觉，进度放慢
- 语言：对话与课程用中文，代码与术语保留英文
- 节奏由老师定：每课 30–45 分钟，宁慢勿浅

## Out of scope
- Transformer 架构与预训练细节（上一本书已覆盖）
- 多 GPU 分布式训练、大规模推理服务工程
- 高级数学（定理证明级别）
