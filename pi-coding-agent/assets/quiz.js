/* quiz.js — shared quiz widget for pi architecture course.
   Markup: <div class="quiz" data-explain="..."> <p class="q">Q</p>
            <div class="opts"> <button data-correct="true">A</button> ... </div> </div>
   Design rule: option texts should be equal length in words/chars so formatting
   never leaks the answer. */

(function () {
	function initQuiz(root) {
		const explain = root.querySelector(".explain") || document.createElement("div");
		explain.className = "explain";
		if (!root.querySelector(".explain")) root.appendChild(explain);
		const buttons = root.querySelectorAll("button[data-correct]");
		let answered = false;

		buttons.forEach(function (btn) {
			btn.addEventListener("click", function () {
				if (answered) return;
				answered = true;
				const correct = btn.getAttribute("data-correct") === "true";
				buttons.forEach(function (b) {
					const isCorrect = b.getAttribute("data-correct") === "true";
					b.disabled = true;
					if (isCorrect) b.classList.add("correct");
					else b.classList.add("wrong");
				});
				if (correct) btn.classList.add("correct");
				explain.textContent = root.getAttribute("data-explain") || "";
				explain.classList.add("show");
			});
		});
	}

	document.addEventListener("DOMContentLoaded", function () {
		document.querySelectorAll(".quiz").forEach(initQuiz);
	});
})();
