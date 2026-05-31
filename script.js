// --- GAME DATA (EDIT THIS FOR YOUR IMAGES) ---
const rounds = [
    { noBall: "round1_noball.jpg", withBall: "round1_withball.jpg", row: 3, col: 5 },
    { noBall: "round2_noball.jpg", withBall: "round2_withball.jpg", row: 6, col: 2 },
    { noBall: "round3_noball.jpg", withBall: "round3_withball.jpg", row: 4, col: 7 },
    { noBall: "round4_noball.jpg", withBall: "round4_withball.jpg", row: 2, col: 4 },
    { noBall: "round5_noball.jpg", withBall: "round5_withball.jpg", row: 7, col: 3 }
];

let currentRound = 0;
let score = 0;
let selectedRow = null;
let selectedCol = null;

const intro = document.getElementById("intro-screen");
const game = document.getElementById("game-screen");

const grid = document.getElementById("grid");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next-round");
const confirmBtn = document.getElementById("confirm-btn");
const img = document.getElementById("match-image");
const roundTitle = document.getElementById("round-title");

// Start button
document.getElementById("start-btn").addEventListener("click", () => {
    intro.style.display = "none";
    game.style.display = "block";
    loadRound();
});

// Build 8×8 grid
for (let r = 1; r <= 8; r++) {
    for (let c = 1; c <= 8; c++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.row = r;
        cell.dataset.col = c;

        cell.addEventListener("click", () => selectCell(r, c));
        grid.appendChild(cell);
    }
}

function loadRound() {
    const r = rounds[currentRound];
    img.src = r.noBall;
    roundTitle.textContent = `Round ${currentRound + 1} of 5`;

    result.textContent = "";
    nextBtn.style.display = "none";
    confirmBtn.style.display = "none";

    selectedRow = null;
    selectedCol = null;

    // Clear grid colours
    document.querySelectorAll(".grid-cell").forEach(cell => {
        cell.classList.remove("correct", "wrong", "selected");
    });
}

function selectCell(row, col) {
    selectedRow = row;
    selectedCol = col;

    // Clear previous selection
    document.querySelectorAll(".grid-cell").forEach(cell => {
        cell.classList.remove("selected");
    });

    // Highlight selected
    document.querySelector(
        `.grid-cell[data-row="${row}"][data-col="${col}"]`
    ).classList.add("selected");

    confirmBtn.style.display = "block";
}

confirmBtn.addEventListener("click", () => {
    if (!selectedRow || !selectedCol) return;

    const r = rounds[currentRound];

    // Mark correct cell
    document.querySelector(
        `.grid-cell[data-row="${r.row}"][data-col="${r.col}"]`
    ).classList.add("correct");

    // Mark wrong guess if needed
    if (selectedRow !== r.row || selectedCol !== r.col) {
        document.querySelector(
            `.grid-cell[data-row="${selectedRow}"][data-col="${selectedCol}"]`
        ).classList.add("wrong");

        result.textContent = "Wrong! ❌";
        result.style.color = "red";
    } else {
        result.textContent = "Correct! 🎉";
        result.style.color = "green";
        score++;
    }

    confirmBtn.style.display = "none";

    // Very short delay before showing with-ball image
    setTimeout(() => {
        img.src = r.withBall;
        nextBtn.style.display = "block";
    }, 200);
});

nextBtn.addEventListener("click", () => {
    currentRound++;

    if (currentRound >= rounds.length) {
        endGame();
    } else {
        loadRound();
    }
});

function endGame() {
    img.style.display = "none";
    grid.style.display = "none";
    nextBtn.style.display = "none";

    result.textContent = `Game Over! Your score: ${score} / 5`;
    result.style.color = "black";
}
