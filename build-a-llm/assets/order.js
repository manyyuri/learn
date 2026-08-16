/* ============================================================
   order.js — 可复用"按正确顺序点击"排序组件
   用法（在课程 HTML 中）：
     <div class="widget" data-order>
       <script type="application/json">
       {
         "title": "组件标题",
         "intro": "说明文字",
         "items": ["步骤1", "步骤2", "步骤3", "步骤4"],
         "success": "全部排对后的鼓励语",
         "explain": "完成后展示的解释"
       }
       </script>
     </div>
   行为：items 顺序即正确顺序（组件会打乱展示）。用户按顺序点击，
   点对→填入编号槽位；点错→抖动+提示。完成或点错 2 次后显示解释。
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

  function build(root, config) {
    root.innerHTML = "";

    if (config.title) {
      var t = document.createElement("p");
      t.className = "widget-title";
      t.textContent = config.title;
      root.appendChild(t);
    }
    if (config.intro) {
      var sub = document.createElement("p");
      sub.className = "widget-sub";
      sub.textContent = config.intro;
      root.appendChild(sub);
    }

    var items = config.items || [];
    var next = 0;          // 下一个应点的正确索引
    var mistakes = 0;

    var pool = document.createElement("div");
    pool.className = "order-pool";
    pool.style.position = "relative";

    var slots = document.createElement("div");
    slots.className = "order-slots";

    var msg = document.createElement("p");
    msg.className = "order-msg";

    var explain = document.createElement("div");
    explain.className = "order-explain";
    explain.textContent = config.explain || "";

    var shuffled = shuffle(items.map(function (text, idx) { return { text: text, idx: idx }; }));

    function finish(ok) {
      if (ok) {
        msg.className = "order-msg ok";
        msg.textContent = "🎉 " + (config.success || "完全正确！");
      }
      explain.classList.add("show");
    }

    shuffled.forEach(function (pair) {
      var btn = document.createElement("button");
      btn.className = "order-item";
      btn.type = "button";
      btn.textContent = pair.text;

      btn.addEventListener("click", function () {
        if (btn.classList.contains("placed")) return;

        if (pair.idx === next) {
          btn.classList.add("placed");
          var slot = slots.children[next];
          slot.classList.add("filled");
          slot.childNodes[1].textContent = pair.text;
          next++;
          msg.className = "order-msg";
          msg.textContent = "";
          if (next === items.length) finish(true);
        } else {
          mistakes++;
          btn.classList.remove("shake");
          void btn.offsetWidth; // 重启动画
          btn.classList.add("shake");
          msg.className = "order-msg no";
          msg.textContent = "顺序不对，再想想第 " + (next + 1) + " 步是什么。";
          if (mistakes >= 2) explain.classList.add("show");
        }
      });

      pool.appendChild(btn);
    });

    items.forEach(function (text, i) {
      var slot = document.createElement("div");
      slot.className = "order-slot";
      var no = document.createElement("span");
      no.className = "stepno";
      no.textContent = (i + 1);
      var span = document.createElement("span");
      slot.appendChild(no);
      slot.appendChild(span);
      slots.appendChild(slot);
    });

    root.appendChild(pool);
    root.appendChild(slots);
    root.appendChild(msg);
    root.appendChild(explain);

    if (config.retry !== false) {
      var reset = document.createElement("button");
      reset.className = "quiz-reset";
      reset.type = "button";
      reset.textContent = "重做一遍";
      reset.addEventListener("click", function () { build(root, config); });
      root.appendChild(reset);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nodes = document.querySelectorAll("[data-order]");
    for (var i = 0; i < nodes.length; i++) {
      var dataNode = nodes[i].querySelector('script[type="application/json"]');
      if (!dataNode) continue;
      try {
        var config = JSON.parse(dataNode.textContent);
        build(nodes[i], config);
      } catch (e) {
        console.error("order.js 配置解析失败:", e);
      }
    }
  });
})();
