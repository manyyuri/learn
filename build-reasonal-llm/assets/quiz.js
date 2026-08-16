/* ============================================================
   quiz.js — 课程通用测验组件（无依赖）
   用法：在页面底部 <script> 里定义 window.QUIZZES = {id: {...}}
   页面中放 <div class="quiz" data-quiz="id"></div> 即可渲染。

   支持两种题型：
   1. mc —— 单选题（即时反馈 + 解析）
   2. classify —— 分类题（每条陈述归入某个类别，即时判定）
   ============================================================ */
(function () {
  "use strict";

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  /* ---------- 单选题 ---------- */
  function renderMC(container, quiz, qno) {
    var state = { answered: false };
    var body = el("div", "quiz-body");
    var q = el("div", "quiz-q", '<span class="qno">' + (qno || "Q") + "</span>" + quiz.question);
    body.appendChild(q);

    var opts = el("div", "quiz-opts");
    var explain = el("div", "quiz-explain hidden", quiz.explain);

    quiz.options.forEach(function (opt, i) {
      var btn = el("button", "quiz-opt",
        '<span class="opt-key">' + "ABCD"[i] + "</span>" + opt);
      btn.type = "button";
      btn.onclick = function () {
        if (state.answered) return;
        state.answered = true;
        var buttons = opts.querySelectorAll(".quiz-opt");
        buttons.forEach(function (b) { b.disabled = true; });
        buttons[quiz.answer].classList.add("correct");
        if (i !== quiz.answer) {
          btn.classList.add("wrong");
        } else {
          if (container._onCorrect) container._onCorrect();
        }
        explain.classList.remove("hidden");
        explain._right = (i === quiz.answer);
        if (container._onFinish) container._onFinish(i === quiz.answer);
      };
      opts.appendChild(btn);
    });

    body.appendChild(opts);
    body.appendChild(explain);
    return body;
  }

  /* ---------- 多题单选组 ---------- */
  function renderMCSet(container, quiz) {
    var score = 0, done = 0, total = quiz.questions.length;
    var head = el("div", "quiz-head");
    var title = el("span", "", quiz.title || "检索练习");
    var scoreEl = el("span", "quiz-score", "0 / " + total + " 首答正确");
    head.appendChild(title); head.appendChild(scoreEl);
    container.appendChild(head);

    quiz.questions.forEach(function (q, qi) {
      var wrap = el("div", "quiz-body");
      wrap._onFinish = function (right) {
        done++;
        if (right) score++;
        scoreEl.textContent = score + " / " + total + " 首答正确";
      };
      wrap.appendChild(renderMC(wrap, q, String(qi + 1)));
      container.appendChild(wrap);
    });

    var footer = el("div", "quiz-footer");
    var reset = el("button", "btn quiz-reset", "↺ 全部重来（对抗遗忘，先合上笔记再试）");
    reset.type = "button";
    reset.onclick = function () { rerender(container, quiz); };
    footer.appendChild(reset);
    container.appendChild(footer);
  }

  /* ---------- 分类题 ---------- */
  function renderClassify(container, quiz) {
    var score = 0, done = 0, total = quiz.items.length;
    var head = el("div", "quiz-head");
    var title = el("span", "", quiz.title || "分类练习");
    var scoreEl = el("span", "quiz-score", "0 / " + total + " 一次归对");
    head.appendChild(title); head.appendChild(scoreEl);
    container.appendChild(head);

    var body = el("div", "quiz-body");
    if (quiz.instruction) {
      body.appendChild(el("p", "", '<em>' + quiz.instruction + '</em>'));
    }
    quiz.items.forEach(function (item) {
      var box = el("div", "classify-item");
      box.appendChild(el("div", "ci-text", item.text));
      var row = el("div", "ci-row");
      var settled = false;
      quiz.buckets.forEach(function (b, bi) {
        var btn = el("button", "btn", b);
        btn.type = "button";
        btn.onclick = function () {
          if (settled) return;
          if (bi === item.bucket) {
            settled = true; done++; score++;
            scoreEl.textContent = score + " / " + total + " 一次归对";
            box.classList.add("done-right");
            row.querySelectorAll(".btn").forEach(function (x) { x.disabled = true; });
            btn.classList.add("pick-correct");
            box.appendChild(el("div", "ci-verdict", "✓ " + (item.why || "正确")));
          } else {
            btn.classList.add("pick-wrong");
            btn.disabled = true;
          }
        };
        row.appendChild(btn);
      });
      box.appendChild(row);
      body.appendChild(box);
    });
    container.appendChild(body);

    var footer = el("div", "quiz-footer");
    var reset = el("button", "btn quiz-reset", "↺ 重来");
    reset.type = "button";
    reset.onclick = function () { rerender(container, quiz); };
    footer.appendChild(reset);
    container.appendChild(footer);
  }

  function rerender(container, quiz) {
    container.innerHTML = "";
    render(container, quiz);
  }

  function render(container, quiz) {
    if (quiz.type === "mc") renderMCSet(container, quiz);
    else if (quiz.type === "classify") renderClassify(container, quiz);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var quizzes = window.QUIZZES || {};
    document.querySelectorAll("[data-quiz]").forEach(function (node) {
      var quiz = quizzes[node.getAttribute("data-quiz")];
      if (quiz) render(node, quiz);
    });
  });
})();
