// === FruitBox Flex - Multi-Level Dynamic Position System (with Local Storage) ===

const cssInput = document.getElementById("css-input");
const flexArea = document.getElementById("flex-area");
const levelNumber = document.getElementById("level-number");
const instructionEl = document.getElementById("instruction");
const basket = document.querySelector(".basket");

let currentLevel = 0;

// === LEVEL DATA ===
const levels = [
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
  {
    instruction:
      "Use <b>justify-content: center;</b> to move the apple 🍎 into the basket 🧺 at the center.",
    setupCSS: "justify-content: flex-start; align-items: center;",
    answer: ["justify-content: center;"],
    basketPos: { left: "50%", bottom: "200px", transform: "translateX(-50%)" }
  },
  {
    instruction:
      "Use <b>align-items: flex-end;</b> to move the apple 🍎 toward the basket 🧺 at the bottom.",
    setupCSS: "justify-content: center; align-items: flex-start;",
    answer: ["align-items: flex-end;", "align-items: end;"],
    basketPos: { left: "50%", bottom: "10px", transform: "translateX(-50%)" }
  },
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
  {
    instruction:
      "Use both <b>justify-content: flex-end;</b> and <b>align-items: center;</b> to move the apple 🍎 into the basket 🧺 on the right-center of the field.",
    setupCSS: "justify-content: flex-start; align-items: flex-start;",
    answer: [
      "justify-content: flex-end; align-items: center;",
      "align-items: center; justify-content: flex-end;"
    ],
    basketPos: { right: "40px", bottom: "200px" }
  }
];

// === Helpers ===
function normalize(str) {
  return str.replace(/\s+/g, " ").trim().toLowerCase();
}

function applyCss(css) {
  flexArea.style.cssText = "display:flex;" + css;
}

// === Load Level ===
function loadLevel(i) {
  // Clean up previous level
  if (levels[currentLevel]?.cleanup) levels[currentLevel].cleanup();

  const level = levels[i];
  currentLevel = i;
  levelNumber.textContent = i + 1;
  instructionEl.innerHTML = level.instruction;

  // Restore text from localStorage (if available)
  const savedCSS = localStorage.getItem("cssInput") || "";
  cssInput.value = savedCSS;

  // Apply setup (for level 5 multiple fruits)
  if (level.setup) {
    level.setup();
  } else {
    flexArea.innerHTML = `<div class="fruit">🍎</div>`;
  }

  // Apply base CSS
  applyCss(level.setupCSS);

  // Apply user CSS (if saved)
  if (savedCSS) flexArea.style.cssText += savedCSS;

  // Basket position
  basket.style.right = level.basketPos.right || "auto";
  basket.style.left = level.basketPos.left || "auto";
  basket.style.bottom = level.basketPos.bottom || "auto";
  basket.style.top = level.basketPos.top || "auto";
  basket.style.transform = level.basketPos.transform || "none";

  // Save level progress
  localStorage.setItem("currentLevel", currentLevel);
}

// === Live Input ===
cssInput.addEventListener("input", () => {
  const userCSS = cssInput.value;
  const base = levels[currentLevel].setupCSS;
  flexArea.style.cssText = "display:flex;" + base + userCSS;

  // Save current text to localStorage
  localStorage.setItem("cssInput", userCSS);
});

// === Check Answer ===
function checkSolution() {
  const userCode = normalize(cssInput.value);
  const validAnswers = levels[currentLevel].answer.map(a => normalize(a));
  const isCorrect = validAnswers.some(ans => userCode.includes(ans));

  if (isCorrect) {
    alert(`🎉 Level ${currentLevel + 1} complete!`);

    if (currentLevel < levels.length - 1) {
      setTimeout(() => {
        localStorage.removeItem("cssInput"); // Clear last CSS
        loadLevel(currentLevel + 1);
      }, 1000);
    } else {
      setTimeout(() => alert("🎊 You completed all levels!"), 500);
      localStorage.removeItem("cssInput");
    }
  } else {
    alert("❌ Try again!");
  }
}

// === Navigation ===
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

// === Init ===
document.addEventListener("DOMContentLoaded", () => {
  // Load saved level if any
  const savedLevel = parseInt(localStorage.getItem("currentLevel"));
  if (!isNaN(savedLevel)) {
    currentLevel = savedLevel;
  }
  loadLevel(currentLevel);
});
