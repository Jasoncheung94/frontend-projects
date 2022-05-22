// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; // drawing object

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

// food 
var foodX ;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); // 100ms
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);


    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) { // if snake eats food 
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // start from end and move forward to previous segment.
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // game over
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function placeFood() {
    // 0-1 * (0-19.999) -> 0-19 * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(event) {
    // ie can't go up and down, left and right. Need to make a turn before moving in opposite direction
    if ((event.code == "ArrowUp" || event.code == "KeyW") && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if ((event.code == "ArrowDown" || event.code == "KeyS") && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if ((event.code == "ArrowLeft" || event.code == "KeyA") && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if ((event.code == "ArrowRight" || event.code == "KeyD") && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}