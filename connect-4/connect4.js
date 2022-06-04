var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board; 

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];

    for (var r = 0; r < rows; r++) {
        let row = [];
        for (var c = 0; c < columns; c++) {
            row.push(' ');

            // <div id="1-1" class="tile"></div>
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString(); // coordinates of the board as id.
            tile.className = "tile";
            document.getElementById('board').appendChild(tile);
        }
        board.push(row);
    }
}