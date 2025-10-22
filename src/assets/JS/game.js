const levels = [
    {
        number: 1,
        instruction: "Use <b>justify-content: flex-end;</b> to move the apple 🍎 into the red basket 🧺.",
        expectedCSS: "justify-content: flex-end;",
        fruit: "🍎",
        basketClass: "red"
    },
    {
        number: 2,
        instruction: "Use <b>justify-content: center;</b> to center the banana 🍌 over the yellow basket 🧺.",
        expectedCSS: "justify-content: center;",
        fruit: "🍌",
        basketClass: "yellow"
    },
    {
        number: 3,
        instruction: "Use <b>justify-content: flex-start;</b> to move the grapes 🍇 into the purple basket 🧺.",
        expectedCSS: "justify-content: flex-start;",
        fruit: "🍇",
        basketClass: "purple"
    }
];

let currentLevel = 0;

const levelNumberEl = document.getElementById("level-number");
const instructionEl = document.getElementById("instruction");
const cssInputEl = document.getElementById("css-input");
const gameContainerEl = document.getElementById("game-container");

function loadLevel() {
    const level = levels[currentLevel];
    levelNumberEl.textContent = level.number;
    instructionEl.innerHTML = level.instruction;
    gameContainerEl.innerHTML = `
        <div class="fruit">${level.fruit}</div>
        <div class="basket ${level.basketClass}">🧺</div>
    `;
    gameContainerEl.style.justifyContent = "flex-start";
    cssInputEl.value = "";
}

function checkSolution() {
    const userCSS = cssInputEl.value.trim().replace(/\s+/g, " ");
    const level = levels[currentLevel];
    gameContainerEl.style = `display:flex; ${userCSS}`;

    if (userCSS === level.expectedCSS) {
        instructionEl.innerHTML = `✅ Correct! Level ${level.number} completed.`;
        instructionEl.style.color = "#00FF7F";
        setTimeout(nextLevel, 1500);
    } else {
        instructionEl.innerHTML = `❌ Incorrect! Try again.`;
        instructionEl.style.color = "#ff6b6b";
    }
}

function resetCSS() {
    cssInputEl.value = "";
    gameContainerEl.style = "display:flex; justify-content:flex-start;";
    instructionEl.innerHTML = levels[currentLevel].instruction;
    instructionEl.style.color = "white";
}

function nextLevel() {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        loadLevel();
        instructionEl.style.color = "white";
    } else {
        instructionEl.innerHTML = "🎉 You’ve completed all levels!";
        instructionEl.style.color = "#adff2f";
    }
}

function previousLevel() {
    if (currentLevel > 0) {
        currentLevel--;
        loadLevel();
        instructionEl.style.color = "white";
    }
}

loadLevel();
