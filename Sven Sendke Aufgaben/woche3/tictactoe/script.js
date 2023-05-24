let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let cells = document.getElementsByClassName("cell");

function won(player) {
    if (board[0] == player && board[1] == player && board[2] == player) return true
    if (board[3] == player && board[4] == player && board[5] == player) return true
    if (board[6] == player && board[7] == player && board[8] == player) return true

    if (board[0] == player && board[3] == player && board[6] == player) return true
    if (board[1] == player && board[4] == player && board[7] == player) return true
    if (board[2] == player && board[5] == player && board[8] == player) return true

    if (board[0] == player && board[4] == player && board[8] == player) return true
    if (board[2] == player && board[4] == player && board[6] == player) return true
}

function makeMove(index) {
    if (board[index] === '' && !gameOver){
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerHTML = currentPlayer;
        if(currentPlayer === 'O'){
            if(won(currentPlayer)){
                gameOver = true;
            }
            else {
                currentPlayer = 'X'
            }    
        }
        else {
            if(won(currentPlayer)){
                gameOver = true;
            }
            else {
                currentPlayer = 'O';
            }  
        }   
    }

    if(gameOver){
        for(let cell of cells) {
            cell.style.backgroundColor = "green"; 
        }
        alert(currentPlayer + " won!");
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("cell")[i].innerHTML = '';
        cells[i].style.backgroundColor = "#eee"; 
    }
}

