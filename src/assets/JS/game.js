const cssInput = document.getElementById("css-input");
const flexArea = document.getElementById("flex-area");
const levelNumber = document.getElementById("level-number");
const instructionEl = document.getElementById("instruction");
const basket = document.querySelector(".basket");

let currentLevel = 0;

const levels = [
  // === LEVEL 1 ===
  {
    instruction:
      "Use <b>justify-content: right;</b> to move the apple 🍎 toward the basket 🧺 on the right side.",
    setupCSS: "justify-content: flex-start; align-items: center;",
    answer: [
      "justify-content: right;",
      "justify-content: flex-end;",
      "justify-content:end;",
      "justify-content:right;",
      "justify-content:flex-end;"
    ],
    basketPos: { right: "40px", bottom: "200px" }
  },
  // === LEVEL 2 ===
  {
    instruction:
      "Use <b>justify-content: center;</b> to move the apple 🍎 into the basket 🧺 at the center.",
    setupCSS: "justify-content: flex-start; align-items: center;",
    answer: ["justify-content: center;"],
    basketPos: { left: "50%", bottom: "200px", transform: "translateX(-50%)" }
  },
  // === LEVEL 3 ===
  {
    instruction:
      "Use <b>align-items: flex-end;</b> to move the apple 🍎 toward the basket 🧺 at the bottom.",
    setupCSS: "justify-content: center; align-items: flex-start;",
    answer: ["align-items: flex-end;", "align-items: end;"],
    basketPos: { left: "50%", bottom: "10px", transform: "translateX(-50%)" }
  },
  // === LEVEL 4 ===
  {
    instruction:
      "Use both <b>justify-content: flex-start;</b> and <b>align-items: flex-start;</b> to move the apple 🍎 to the top-left basket 🧺.",
    setupCSS: "justify-content: center; align-items: center;",
    answer: [
      "justify-content: flex-start; align-items: flex-start;",
      "align-items: flex-start; justify-content: flex-start;"
    ],
    basketPos: { left: "50px", top: "100px", bottom: "auto" }
  },
  // === LEVEL 5 ===
  {
    instruction:
      "Use both <b>justify-content: flex-end;</b> and <b>align-items: center;</b> to move the apple 🍎 into the basket 🧺 on the right-center of the field.",
    setupCSS: "justify-content: flex-start; align-items: flex-start;",
    answer: [
      "justify-content: flex-end; align-items: center;",
      "align-items: center; justify-content: flex-end;"
    ],
    basketPos: { right: "40px", bottom: "200px" }
  },
  // === LEVEL 6 ===
{
  instruction:
    "The basket 🧺 is now at the **top-right corner**. Reverse the row direction and align items upward using <b>flex-direction: row-reverse;</b> and <b>align-items: flex-start;</b>.",
  setupCSS: "justify-content: flex-start; align-items: flex-end; flex-direction: row;",
  answer: [
    "flex-direction: row-reverse; align-items: flex-start;",
    "align-items: flex-start; flex-direction: row-reverse;"
  ],
  basketPos: { right: "60px", top: "80px", bottom: "auto" }
},

// === LEVEL 7 ===
{
  instruction:
    "The basket 🧺 hides in the **top-center**. Stack vertically using <b>flex-direction: column;</b>, then center horizontally and push upward with <b>justify-content: flex-start;</b> and <b>align-items: center;</b>.",
  setupCSS: "justify-content: center; align-items: center; flex-direction: row;",
  answer: [
    "flex-direction: column; justify-content: flex-start; align-items: center;",
    "align-items: center; flex-direction: column; justify-content: flex-start;"
  ],
  basketPos: { left: "50%", top: "60px", bottom: "auto", transform: "translateX(-50%)" }
},

// === LEVEL 8 ===
{
  instruction:
    "Now the basket 🧺 sits at a **diagonal (bottom-left)**. Mix both axes: use <b>flex-direction: column-reverse;</b>, <b>justify-content: flex-end;</b>, and <b>align-items: flex-start;</b> to corner the apple 🍎.",
  setupCSS: "justify-content: center; align-items: center; flex-direction: column;",
  answer: [
    "flex-direction: column-reverse; justify-content: flex-end; align-items: flex-start;",
    "align-items: flex-start; justify-content: flex-end; flex-direction: column-reverse;"
  ],
  basketPos: { left: "60px", bottom: "40px" }
},

// === LEVEL 9 (perfect tilt alignment) ===
{
  instruction:
    "Basket 🧺 rests at the **left-center**, tilted slightly. Keep the apple 🍎 aligned toward it using <b>justify-content: flex-start;</b> and <b>align-items: center;</b>. Tilt the field gently with <b>transform: rotate(5deg);</b> so the apple matches the basket angle.",
  setupCSS: "justify-content: center; align-items: center; flex-direction: row;",
  answer: [
    "justify-content: flex-start; align-items: center; transform: rotate(5deg);",
    "align-items: center; justify-content: flex-start; transform: rotate(5deg);"
  ],
  basketPos: { left: "80px", bottom: "200px", transform: "rotate(5deg)" }
},

// === LEVEL 10 (final boss with proper tilt) ===
{
  instruction:
    "Final Boss 👑 — Basket 🧺 sits at the **bottom-center**, slightly tilted. Use <b>flex-direction: column;</b>, <b>justify-content: flex-end;</b>, and <b>align-items: center;</b>. Give both apple 🍎 and basket a smooth forward lean with <b>transform: rotate(5deg) scale(0.95);</b>.",
  setupCSS: "justify-content: center; align-items: center; flex-direction: row;",
  answer: [
    "flex-direction: column; justify-content: flex-end; align-items: center; transform: rotate(5deg) scale(0.95);",
    "align-items: center; justify-content: flex-end; flex-direction: column; transform: rotate(5deg) scale(0.95);"
  ],
  basketPos: { left: "50%", bottom: "25px", transform: "translateX(-50%) rotate(5deg)" }
}


];

// === Utility functions ===
function normalize(str) {
  return str.replace(/\s+/g, " ").trim().toLowerCase();
}

function applyCss(css) {
  flexArea.style.cssText = "display:flex;" + css;
}

function loadLevel(i) {
  if (levels[currentLevel]?.cleanup) levels[currentLevel].cleanup();

  const level = levels[i];
  currentLevel = i;
  levelNumber.textContent = i + 1;
  instructionEl.innerHTML = level.instruction;
  const savedCSS = localStorage.getItem("cssInput") || "";
  cssInput.value = savedCSS;

  flexArea.innerHTML = `<div class="fruit">🍎</div>`;
  applyCss(level.setupCSS);
  if (savedCSS) flexArea.style.cssText += savedCSS;

  basket.style.right = level.basketPos.right || "auto";
  basket.style.left = level.basketPos.left || "auto";
  basket.style.bottom = level.basketPos.bottom || "auto";
  basket.style.top = level.basketPos.top || "auto";
  basket.style.transform = level.basketPos.transform || "none";

  localStorage.setItem("currentLevel", currentLevel);
}

cssInput.addEventListener("input", () => {
  const userCSS = cssInput.value;
  const base = levels[currentLevel].setupCSS;
  flexArea.style.cssText = "display:flex;" + base + userCSS;
  localStorage.setItem("cssInput", userCSS);
});

function checkSolution() {
  const userCode = normalize(cssInput.value);
  const validAnswers = levels[currentLevel].answer.map(a => normalize(a));
  const isCorrect = validAnswers.some(ans => userCode.includes(ans));

  if (isCorrect) {
    alert(`🎉 Level ${currentLevel + 1} complete!`);

    if (currentLevel < levels.length - 1) {
      setTimeout(() => {
        localStorage.removeItem("cssInput");
        loadLevel(currentLevel + 1);
      }, 1000);
    } else {
      setTimeout(() => alert("🎊 You completed all 10 levels — Flexbox Master! 🏆"), 500);
      localStorage.removeItem("cssInput");
    }
  } else {
    alert("❌ Try again!");
  }
}

function nextLevel() {
  if (currentLevel < levels.length - 1) {
    localStorage.removeItem("cssInput");
    loadLevel(currentLevel + 1);
  }
}

function previousLevel() {
  if (currentLevel > 0) {
    localStorage.removeItem("cssInput");
    loadLevel(currentLevel - 1);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLevel = parseInt(localStorage.getItem("currentLevel"));
  if (!isNaN(savedLevel)) currentLevel = savedLevel;
  loadLevel(currentLevel);
});
