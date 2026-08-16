# Building Reasoning LLMs — Resources

Primary source of truth for this workspace is the book below; lessons cite it by chapter/section.

## Knowledge

- **Book: _Build a Reasoning Model (From Scratch)_ — Sebastian Raschka, Manning, MEAP V08** (local PDF; extracted text in `.book/`)
  The spine of the whole course: reasoning fundamentals → generation → evaluation → inference-time scaling → self-refinement → GRPO/RL → distillation. Use for: everything. Cite as "BRM ch. N".
- [Repo: `rasbt/reasoning-from-scratch`](https://github.com/rasbt/reasoning-from-scratch) — companion code for the book (referenced in book text). Use for: runnable notebooks per chapter, checking code against the book.
- [Blog: Ahead of AI — Sebastian Raschka](https://sebastianraschka.com/blog/) — author's blog with free articles on reasoning models, GRPO, distillation. Use for: quick conceptual refreshers between lessons. *(verify specific posts before citing)*
- [Paper: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"](https://arxiv.org/abs/2501.12948) — the RLVR/GRPO reasoning-model landmark the book's methods build toward. Use for: seeing how the from-scratch techniques scale to SOTA.

## Wisdom (Communities)

- (to be scouted once mission is known — e.g., r/LocalLLaMA, HF forums, book's liveBook forum)

## Gaps

- Need to confirm: does the user have GPU / Apple Silicon for the hands-on chapters (ch. 2+)?
- Need: a good GRPO intuition resource beyond the book (video or interactive explainer) for when we reach ch. 6–7.
