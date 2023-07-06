let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function makeMove(index) {
  if (!gameOver && board[index] === '') {
    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerText = currentPlayer;
    checkWin();
    if (!gameOver) {
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      alert(`Spieler ${currentPlayer} hat gewonnen!`);
      break;
    }
  }

  if (!board.includes('') && !gameOver) {
    gameOver = true;
    alert('Das Spiel ist unentschieden!');
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  const cells = document.getElementsByClassName('cell');
  for (let cell of cells) {
    cell.innerText = '';
  }
}
