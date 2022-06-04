var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns; // keep track of the number of pieces in each column

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5,5,5,5,5,5,5]; // used to figure out "gravity" of the pieces

    for (var r = 0; r < rows; r++) {
        let row = [];
        for (var c = 0; c < columns; c++) {
            row.push(' ');

            // <div id="1-1" class="tile"></div>
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString(); // coordinates of the board as id.
            tile.className = "tile";
            tile.addEventListener('click', setPiece);
            document.getElementById('board').appendChild(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); //"0-0" -> ["0", "0"]
    let row = parseInt(coords[0]);
    let column = parseInt(coords[1]);

    row = currColumns[column];
    if (row < 0) {
        return;
    }

    board[row][column] = currPlayer;
    // let tile = this;
    let tile = document.getElementById(row.toString() + "-" + column.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }
    row -= 1; // row height for column
    currColumns[column] = row; // update the array

    checkWinner();
}

function checkWinner() {
    // horizontal - sliding window.
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
        }
   }

   // vertical
   for (let c = 0; c < columns; c++) {
       for (let r = 0; r < rows - 3; r++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }

   // anti diagonal
   for (let r = 0; r < rows - 3; r++) {
       for (let c = 0; c < columns - 3; c++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }

   // diagonal
   for (let r = 3; r < rows; r++) {
       for (let c = 0; c < columns - 3; c++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";             
    } else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;
}