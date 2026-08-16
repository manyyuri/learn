# Learn - LLM 学习项目合集

这是一个包含多个 LLM（大型语言模型）学习项目的仓库，专注于从零开始构建和理解大型语言模型及其推理技术。

## 项目概览

### 📚 build-a-llm - 从零构建大型语言模型

**任务：从零构建大型语言模型（Build a LLM From Scratch）**

#### 目标
- 彻底搞懂 ChatGPT 类 LLM 的底层原理，去"黑盒"化
- 亲手用 PyTorch 实现并训练一个真正的 GPT 模型
- 支撑 LLM 应用开发工作与 AI 方向职业发展

#### 学习成果
- 能徒手画出 GPT 架构图并解释每个组件
- 能用 PyTorch 从零实现 GPT-2 规模（124M 参数）的模型
- 能读懂《Attention Is All You Need》等论文
- 能向同事清晰解释 token/attention/微调/LoRA 等核心概念

#### 课程结构（16 课）
1. LLM 全景图：三阶段 + Transformer 家族
2. 分词：文字 → token ID
3. BPE + 滑动窗口 + 嵌入与位置编码
4. 注意力的直觉：从"打分"到自注意力
5. 可训练权重的自注意力 + 缩放点积
6. 因果注意力 + dropout + 多头注意力
7. PyTorch 检查点（张量/autograd/训练循环）
8. GPT 骨架：LayerNorm / GELU / FFN / 残差
9. Transformer 块 + 完整 GPT + 参数量计算
10. 自回归文本生成
11. 损失函数 + 训练循环 + 预训练
12. 解码策略 + 加载 OpenAI 的 GPT-2 权重
13. 分类微调：垃圾邮件分类器
14. 指令微调：迷你助手 + 评估
15. 训练稳定三件套：预热/余弦/裁剪
16. LoRA 参数高效微调

---

### 🧠 build-reasonal-llm - 掌握 LLM 推理技术

**任务：掌握 LLM 推理技术，并应用到工作中**

#### 目标
- 把推理技术真正用进工作：能判断业务场景何时值得上推理模型
- 能自己动手评估、改进、训练模型的推理能力
- 面对工作中的具体需求，能选出合适的推理技术

#### 学习成果
- 在 Mac 上跑通书的代码：加载小模型、构建数学验证器、跑 GSM8K 风格评估
- 能实现 CoT 提示、self-consistency、self-refinement，并用评估数字量化收益
- 能从零实现 GRPO 训练循环，解释每个组件为什么存在
- 能用蒸馏把大模型的推理能力转移到小模型

#### 课程结构（16 课）
1. 什么是推理 + 三大流派地图
2. 加载模型与生成循环
3. KV cache 与生成加速
4. 数学验证器
5. 评估 harness：数据集 + 评分
6. CoT 提示
7. 温度与 top-p
8. Self-consistency 投票
9. log-prob 置信度
10. Self-refinement 循环
11. RL 铺垫：policy / reward / RLHF→RLVR
12. GRPO 核心：rollouts + advantages
13. GRPO loss + 训练循环
14. GRPO 改进：clipping + KL + format reward
15. 蒸馏 I：数据生成 + SFT 训练
16. 蒸馏 II：评估 + 三路线终局对比 + 工作应用地图

---

## 技术栈

- **编程语言**：Python（PyTorch）
- **硬件要求**：Mac M1 Pro 16GB（MPS 后端），消费级硬件可运行
- **学习背景**：JavaScript 熟练，Python 中等，矩阵运算基础，PyTorch 零基础

## 文件结构

```
├── build-a-llm/          # 从零构建 LLM 项目
│   ├── lessons/         # 课程内容
│   ├── reference/       # 参考文档
│   ├── assets/          # 共享资源（样式、测验组件）
│   ├── learning-records/ # 学习记录
│   └── scripts/         # 工具脚本
└── build-reasonal-llm/   # LLM 推理技术项目
    ├── lessons/         # 课程内容
    ├── .book/           # 书籍文本提取
    └── assets/          # 共享资源
```

## 如何使用

1. **build-a-llm**：按照课程顺序学习，从基础概念到完整实现
2. **build-reasonal-llm**：在掌握基础 LLM 构建后学习，专注于推理技术

每个项目都包含详细的课程、参考文档和学习记录，适合系统性地学习 LLM 技术栈。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这些学习材料。每个项目都遵循特定的教学协议和课程地图，确保学习体验的一致性。