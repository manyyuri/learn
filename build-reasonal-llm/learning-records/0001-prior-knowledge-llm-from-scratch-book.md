# 已有基础：读过《Build an LLM (From Scratch)》

用户已读完 Raschka 前作，熟悉 transformer 内部机制、tokenization、预训练、指令微调与偏好微调、PyTorch。因此本书 ch1.2 的管线复习、ch2 的模型加载与生成循环对他而言是复习而非新知——课程可以快速切入推理特有的内容，把时间预算留给评估（ch3）、采样与投票（ch4–5）和 RL（ch6–7）。

**Evidence:** 用户自述（2025-08-16 首次面谈）。

**Implications:**
- 不重教 transformer 内部与 PyTorch 基础，代码可直接上
- RL 是全新领域 → ch6 之前需要一节 RL 概念铺垫课（policy / reward / advantage）
- 硬件 M1 Pro 16GB：推理用 0.6B–1.7B 无压力；GRPO 训练可行但慢，课程要提前设定期望
