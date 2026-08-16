# Build a LLM From Scratch — Resources

## Knowledge

- [书: 《Build a Large Language Model (From Scratch)》中文版 PDF — Sebastian Raschka](/Users/junyingli/Downloads/Build%20a%20Large%20Language%20Model%20(From%20Scratch)%20%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E6%9E%84%E5%BB%BA%E5%A4%A7%E5%9E%8B%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B%20(Sebastian%20Raschka)%20(z-library.sk,%201lib.sk,%20z-lib.sk).pdf)
  本课程的主教材，401 页。全书文本已提取至 `.book-extract/full_text.txt`（带页码标记）。备查：[Manning 官方页面](https://www.manning.com/books/build-a-large-language-model-from-scratch)。
- [代码: rasbt/LLMs-from-scratch — 官方配套代码库](https://github.com/rasbt/LLMs-from-scratch)
  作者 Sebastian Raschka 维护的 Jupyter notebook，按章组织，与书一一对应。所有代码实践课以它为准。
- [论文: "Attention Is All You Need" — Vaswani et al., 2017](https://arxiv.org/abs/1706.03762)
  Transformer 原始论文。第 3 章（注意力）学完后精读，是理解一切现代 LLM 的根。
- [论文: "Language Models are Few-Shot Learners" (GPT-3) — Brown et al., 2020](https://arxiv.org/abs/2005.14165)
  GPT-3 论文，含训练数据表（书表1.1来源）。第 5 章预训练时对照阅读。
- [论文: "Training language models to follow instructions with human feedback" (InstructGPT) — Ouyang et al., 2022](https://arxiv.org/abs/2203.02155)
  ChatGPT 背后的指令微调 + RLHF 方法论。第 7 章指令微调时对照阅读。
- [视频: "Intro to Large Language Models" — Andrej Karpathy (1h)](https://www.youtube.com/watch?v=zjkBMFhNj_g)
  前 OpenAI 创始成员的大局观演讲，与本课第 1 章内容互补，适合作为每章开头的"热身"。
- [视频: "Let's build GPT: from scratch, in code, spelled out" — Andrej Karpathy (2h)](https://www.youtube.com/watch?v=kCc8FmEb1nY)
  与书第 3–5 章高度互补的代码实操视频，代码风格与书一致（karpathy/nanoGPT 一脉）。
- [视频: "But what is a GPT?" + "Attention in transformers" — 3Blue1Brown](https://www.youtube.com/watch?v=wjZofJX0v4M&list=PLZHQObOWTQDnp6N3MH6x53S3bzFXLgpHL)
  最佳视觉直觉材料。注意力可视化在第 0004–0006 课前观看效果最好。
- [教程: PyTorch 官方 "Learn the Basics"](https://pytorch.org/tutorials/beginner/basics/intro.html)
  附录 A 的官方对照材料，第 0007 课（PyTorch 检查点）的主资源之一。

## Wisdom (Communities)

- [rasbt/LLMs-from-scratch — GitHub Discussions](https://github.com/rasbt/LLMs-from-scratch/discussions)
  作者本人亲自回答读者问题，书与代码的疑难首选这里。
- [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/)
  LLM 实操社区（本地部署、微调、量化），信号密度高。用英文提问，适合在微调章节（0013+）后参与。

## Gaps
- 中文的高信任 LLM 系统课程社区暂缺，以 GitHub Discussions + r/LocalLLaMA 替代
- PyTorch 中文文档可用但非首选；坚持官方英文教程，术语一致性更好
