// Set the correct answer (row, column)
let correctRow = 3;
let correctCol = 5;

const grid = document.getElementById("grid");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next-round");

// Build 8×8 grid
for (let r = 1; r <= 8; r++) {
    for (let c = 1; c <= 8; c++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.row = r;
        cell.dataset.col = c;

        cell.addEventListener("click", () => handleGuess(r, c));
        grid.appendChild(cell);
    }
}

function handleGuess(row, col) {
    if (row === correctRow && col === correctCol) {
        result.textContent = "Correct! 🎉";
        result.style.color = "green";
    } else {
        result.textContent = "Wrong! ❌";
        result.style.color = "red";
    }

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    result.textContent = "";
    nextBtn.style.display = "none";

    // Example: change the correct answer for next round
    correctRow = Math.floor(Math.random() * 8) + 1;
    correctCol = Math.floor(Math.random() * 8) + 1;

    // You can also change the image here if you want
});
