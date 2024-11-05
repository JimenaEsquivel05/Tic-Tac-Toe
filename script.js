const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const restartButton = document.getElementById('restart');
const xScoreDisplay = document.getElementById('x-score');
const oScoreDisplay = document.getElementById('o-score');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let xScore = 0; // Contador para jugador X
let oScore = 0; // Contador para jugador O

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
    [0, 4, 8], [2, 4, 6]             // diagonales
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            result.textContent = `¡Jugador ${currentPlayer} gana!`;
            cells.forEach(cell => cell.classList.add('taken'));

            // Incrementar el contador del jugador ganador
            if (currentPlayer === 'X') {
                xScore++;
                xScoreDisplay.textContent = xScore; // Actualiza el contador de X
            } else {
                oScore++;
                oScoreDisplay.textContent = oScore; // Actualiza el contador de O
            }
            return true;
        }
    }
    if (!boardState.includes(null)) {
        result.textContent = '¡Es un empate!';
        return true;
    }
    return false;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!boardState[index]) {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add('taken');

            if (currentPlayer === 'X') {
                cell.classList.add('x-color');
            } else {
                cell.classList.add('o-color');
            }

            if (!checkWinner()) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

// Lógica para reiniciar el juego
restartButton.addEventListener('click', () => {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'x-color', 'o-color');
    });
    result.textContent = '';
    currentPlayer = 'X'; // Reinicia al jugador X
});
