/* ============================================================
   quiz.js — 可复用选择题组件（检索练习）
   用法（在课程 HTML 中）：
     <div class="widget" data-quiz>
       <script type="application/json">
       {
         "intro": "可选的开场说明",
         "questions": [
           {
             "q": "题干",
             "options": ["选项A", "选项B", "选项C"],
             "answer": 0,
             "explain": "答对/答错后显示的解释"
           }
         ]
       }
       </script>
     </div>
   行为：选项随机打乱；点击即锁定该题并给即时反馈（对/错+解释）；
   统计首答正确率；结束显示成绩，可重做。
   ============================================================ */
(function () {
  "use strict";

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var LETTERS = ["A", "B", "C", "D", "E", "F"];

  function build(root, config) {
    root.innerHTML = "";

    if (config.intro) {
      var sub = document.createElement("p");
      sub.className = "widget-sub";
      sub.textContent = config.intro;
      root.appendChild(sub);
    }

    var questions = config.questions || [];
    var state = questions.map(function () { return null; }); // null=未答 true/false=首答
    var answered = 0;

    function renderScore() {
      var score = document.createElement("div");
      score.className = "quiz-score";
      var firstTry = state.filter(function (s) { return s === true; }).length;
      var total = questions.length;
      var msg;
      if (answered < total) {
        msg = "已完成 " + answered + " / " + total;
      } else if (firstTry === total) {
        msg = "🏆 全对（" + firstTry + "/" + total + "）——可以进入下一课了";
      } else if (firstTry >= Math.ceil(total * 0.7)) {
        msg = "✅ " + firstTry + "/" + total + " 首答正确 —— 建议明天再来一遍这组题";
      } else {
        msg = "📌 " + firstTry + "/" + total + " 首答正确 —— 值得回看上面的讲解再来一次";
      }
      score.textContent = msg;
      root.appendChild(score);

      var reset = document.createElement("button");
      reset.className = "quiz-reset";
      reset.textContent = "重做一遍";
      reset.addEventListener("click", function () { build(root, config); });
      root.appendChild(reset);
    }

    questions.forEach(function (q, qi) {
      var box = document.createElement("div");
      box.className = "quiz-q";

      var stem = document.createElement("p");
      stem.className = "stem";
      var no = document.createElement("span");
      no.className = "no";
      no.textContent = "Q" + (qi + 1) + ".";
      stem.appendChild(no);
      stem.appendChild(document.createTextNode(q.q));
      box.appendChild(stem);

      var optsBox = document.createElement("div");
      optsBox.className = "quiz-opts";

      var pairs = shuffle(q.options).map(function (text, i) {
        return { text: text, isAnswer: q.options.indexOf(text) === q.answer };
      });

      pairs.forEach(function (pair, i) {
        var btn = document.createElement("button");
        btn.className = "quiz-opt";
        btn.type = "button";
        var letter = document.createElement("span");
        letter.className = "letter";
        letter.textContent = LETTERS[i];
        btn.appendChild(letter);
        btn.appendChild(document.createTextNode(pair.text));

        btn.addEventListener("click", function () {
          if (state[qi] !== null) return; // 已作答
          var buttons = optsBox.querySelectorAll(".quiz-opt");
          var k;
          for (k = 0; k < buttons.length; k++) buttons[k].disabled = true;

          var correct = pair.isAnswer;
          if (state[qi] === null) { state[qi] = correct; answered++; }

          if (correct) {
            btn.classList.add("correct");
          } else {
            btn.classList.add("wrong");
            for (k = 0; k < pairs.length; k++) {
              if (pairs[k].isAnswer) optsBox.children[k].classList.add("correct");
            }
          }

          var ex = document.createElement("div");
          ex.className = "quiz-explain " + (correct ? "ok" : "no");
          ex.textContent = (correct ? "✔ 正确。" : "✘ 不对。") + (q.explain || "");
          box.appendChild(ex);

          if (answered === questions.length) renderScore();
        });

        optsBox.appendChild(btn);
      });

      box.appendChild(optsBox);
      root.appendChild(box);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nodes = document.querySelectorAll("[data-quiz]");
    for (var i = 0; i < nodes.length; i++) {
      var dataNode = nodes[i].querySelector('script[type="application/json"]');
      if (!dataNode) continue;
      try {
        var config = JSON.parse(dataNode.textContent);
        build(nodes[i], config);
      } catch (e) {
        console.error("quiz.js 配置解析失败:", e);
      }
    }
  });
})();
