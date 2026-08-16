/* 千金妆研习 · 通用测验组件
   用法：
   <div class="quiz" data-quiz>
     <div class="quiz-q" data-answer="1" data-note="解析文字">
       <p class="quiz-stem">1. 题干</p>
       <div class="quiz-opts">
         <button class="quiz-opt" data-opt="0">A. 选项</button>
         ...
       </div>
     </div>
     ...更多 .quiz-q...
     <p class="quiz-score" data-quiz-score></p>
   </div>
*/
(function () {
  "use strict";

  document.querySelectorAll("[data-quiz]").forEach(function (quiz) {
    var questions = Array.prototype.slice.call(quiz.querySelectorAll(".quiz-q"));
    var scoreEl = quiz.querySelector("[data-quiz-score]");
    var answered = 0;
    var correct = 0;

    function renderScore() {
      if (!scoreEl) return;
      if (answered < questions.length) {
        scoreEl.textContent = "已完成 " + answered + " / " + questions.length + " 题";
      } else {
        scoreEl.textContent =
          "得分 " + correct + " / " + questions.length +
          (correct === questions.length ? " · 满分！可以进入下一课" : " · 错的地方往上翻，再读一遍拆解");
      }
    }

    questions.forEach(function (q) {
      var answer = parseInt(q.getAttribute("data-answer"), 10);
      var note = q.getAttribute("data-note") || "";
      var opts = Array.prototype.slice.call(q.querySelectorAll(".quiz-opt"));

      opts.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var picked = parseInt(btn.getAttribute("data-opt"), 10);

          opts.forEach(function (b) {
            b.disabled = true;
            if (parseInt(b.getAttribute("data-opt"), 10) === answer) {
              b.classList.add("is-correct");
            }
          });

          if (picked === answer) {
            correct += 1;
          } else {
            btn.classList.add("is-wrong");
          }

          if (note) {
            var p = document.createElement("p");
            p.className = "quiz-note";
            p.textContent = (picked === answer ? "✓ " : "✗ ") + note;
            q.appendChild(p);
          }

          answered += 1;
          renderScore();
        });
      });
    });

    renderScore();
  });
})();
