# NOTES

## Working notes

- **Source book (primary resource):** `/Users/junyingli/Downloads/Build a Reasoning Model (From Scratch) MEAP V08 (all 8 chapters) (Sebastian Raschka) (z-library.sk, 1lib.sk, z-lib.sk).pdf` (528 pp, MEAP V08)
- Full text extracted to `.book/` (page markers as `<<<page N>>>`, Manning footers stripped):
  - `ch01-understanding-reasoning-models.txt` — what reasoning is, LLM pipeline overview, roadmap
  - `ch02-generating-text-with-pretrained-llm.txt` — env setup, loading Qwen3-ish small model, generation loop, KV cache, torch.compile
  - `ch03-evaluating-reasoning-models.txt` — math verifier, answer extraction/normalization, GSM8K eval harness
  - `ch04-inference-time-scaling.txt` — CoT prompting, temperature, top-p, self-consistency (majority vote)
  - `ch05-self-refinement.txt` — scoring responses, log-probs as confidence, iterative refinement loop
  - `ch06-rl-training-grpo.txt` — RLHF→RLVR, GRPO intuition (chef analogy), rollouts, advantages, GRPO loss, training loop
  - `ch07-improving-grpo.txt` — metrics (entropy, advantage), clipped ratios, KL term, format reward, `<think>` tokens
  - `ch08-distillation.txt` — SFT on generated reasoning traces, training loop, eval
  - `appendices.txt` — A refs, B exercise solutions, C Qwen3 source code, D larger LLMs, E batching, F eval approaches, G chat UI
- Companion repo referenced in book: `github.com/rasbt/reasoning-from-scratch`

## 用户画像（2025-08-16 首次面谈）

- 目标：**工作中应用推理技术**（评估、改进、训练模型推理能力）
- 背景：读完《Build an LLM (From Scratch)》，会 PyTorch；**无 RL 背景**
- 硬件：Mac M1 Pro 16GB（MPS）；模型选 0.6B–1.7B
- 语言：中文授课与对话（用户明确要求），代码与术语保留英文
- 节奏：每课 30–45 分钟，由我定；用户要求完整理解

## 课程路线图（16 课 · 全部发布 2025-08-16 批量生成）

1. ✅ 什么是推理 + 三大流派地图（ch1）
2. ✅ 加载模型与生成循环（ch2）
3. ✅ KV cache 与生成加速（ch2）
4. ✅ 数学验证器（ch3）
5. ✅ 评估 harness：数据集 + 评分（ch3）
6. ✅ CoT 提示（ch4）
7. ✅ 温度与 top-p（ch4）
8. ✅ Self-consistency 投票（ch4）
9. ✅ log-prob 置信度（ch5）
10. ✅ Self-refinement 循环（ch5）
11. ✅ RL 铺垫：policy / reward / RLHF→RLVR（ch6.1–6.2，无 RL 背景专门设计）
12. ✅ GRPO 核心：rollouts + advantages（ch6）
13. ✅ GRPO loss + 训练循环（ch6）
14. ✅ GRPO 改进：clipping + KL + format reward（ch7）
15. ✅ 蒸馏 I：数据生成 + SFT 训练（ch8）
16. ✅ 蒸馏 II：评估 + 三路线终局对比 + 工作应用地图（ch8）

导航：`index.html`（课程首页）→ 0001…0016 链式导航；术语表已覆盖 ch1–8。

## 硬件备忘（M1 Pro 16GB / MPS）

- bf16 在 MPS 上支持有限，必要时用 fp16/fp32（ch2 实操时验证，以 rasbt/reasoning-from-scratch repo 说明为准）
- 0.6B 推理轻松；GRPO 训练显存 ≈ 参数×4（AdamW），0.6B 约 5GB，可行但慢 → 训练课用小步数演示

## Open questions

- M1 上 GRPO 实测速度（到 ch6 时用小规模跑通再定训练规模）—— 已在 0013 给出冒烟测试建议（num_rollouts=2, max_new_tokens=64）

## 待办（结课后）

- [ ] 学习者按课做测验 → 反馈成绩 → 讨论与补课（交互模式）
- [ ] 可选：下载 rasbt/reasoning-from-scratch 的蒸馏 checkpoint 在本机跑评估
- [ ] 可选：工作落地——挑一个真实任务套用 0016 第 04 节应用地图
