// game page
const GameCanvas = document.getElementById("gameCanvas");
const ctx = GameCanvas.getContext('2d');

let changingDirection = false;
let Run = true;

// when game changed
document.addEventListener("keydown", Changedirection)
function Changedirection(event) {
    const keyLeft = 37;
    const keyRight = 39;
    const keyUp = 38;
    const keyDown = 40;

    if (changingDirection) return;
    changingDirection = true;
    const keyPress = event.keyCode;

    if (keyPress === keyLeft && DX !== 10 && DX !== -10) {
        DX -= 10;
        DY = 0;
    }
    if (keyPress === keyRight && DX !== -10 && DX !== 10) {
        DX += 10;
        DY = 0;
    }
    if (keyPress === keyUp && DY !== 10 && DY !== -10) {
        DX = 0;
        DY -= 10;
    }
    if (keyPress === keyDown && DY !== -10 && DY !== 10) {
        DX = 0;
        DY += 10;
    }
}

//food place
let foodX;
let foodY;

//snake movement
let DX = 10;
let DY = 0;
//player scroe
let Score = 0;

//snake coordinates
let snake = [
    { x: 160, y: 150 },
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
]

// central core 
function main() {
    if (FinishGame()) {
        document.querySelector(".finishGame").innerHTML = "Game Over";
        document.querySelector(".EndScore").innerHTML = `your score: ${Score}`;
        let PlayAgain = document.querySelector(".PlayAgain");
        PlayAgain.style.display = "block";
        Restart.style.display = "none";
        Pause.style.display = "none";
        PlayAgain.addEventListener("click", ResetGame);
        function ResetGame() {
            window.location.reload();
        }
        return;
    }
    function reset() {
        setTimeout(() => {
            changingDirection = false;
            clearCanvas();
            drawFood();
            if (Run) advanceSnake();
            drawSnake();

            main();
        }, 70);
    }

    if (Run === false) {
        clearTimeout(reset());
    } else if (Run === true) {
        reset();
    }
}


// when game finished
function FinishGame() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            Run = false;
            return true;
        }
    }

    const leftWall = snake[0].x < 0;
    const rightWall = snake[0].x > GameCanvas.width - 10;
    const topWall = snake[0].y < 0;
    const bottomWall = snake[0].y > gameCanvas.height - 10;

    return leftWall || rightWall || topWall || bottomWall;
}

// clear canvas
function clearCanvas() {
    ctx.fillStyle = '#0c1021'
    ctx.strokeStyle = 'black'

    ctx.fillRect(0, 0, GameCanvas.width, GameCanvas.height)
    ctx.strokeRect(0, 0, gameCanvas.width, GameCanvas.height)
}
clearCanvas();

// draw food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred'

    ctx.fillRect(foodX, foodY, 10, 10)
    ctx.strokeRect(foodX, foodY, 10, 10)
}
drawFood();

// when snake eat food
function advanceSnake() {
    let head = { x: snake[0].x + DX, y: snake[0].y + DY };
    let points = document.getElementById("score");
    snake.unshift(head);
    if (head.x === foodX && head.y === foodY) {
        Score += 10;
        points.classList.add("takingpoint");
        points.innerHTML = `${Score}`;

        createFood();
    } else {
        snake.pop();
        points.classList.remove("takingpoint");
    }
}

// draw snake
function drawSnake() {
    snake.forEach(snakePart => {

        ctx.fillStyle = 'lightgreen';
        ctx.strokeStyle = 'black'

        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    })
}
drawSnake();

// create food
let randomNumber = (min, max) => Math.round((Math.random() * (max - min) + min) / 10) * 10;
function createFood() {
    foodX = randomNumber(0, GameCanvas.width - 10);
    foodY = randomNumber(0, GameCanvas.height - 10);
    snake.forEach(snakePart => {
        if (snakePart.x === foodX && snakePart.y === foodY) {
            createFood();
        }
    })
}


createFood();

// when clicked restart game
const Restart = document.querySelector(".restart");
Restart.addEventListener("click", function () {
    window.location.reload();
    main();
})

// when clicked pause game
const Pause = document.querySelector(".pause");
Pause.addEventListener('click', PauseGame);

function PauseGame() {
    Run = !Run;
    Pause.textContent = Run ? 'Pause' : 'Resume'
}


// when clicked start game
let startbtn = document.querySelector(".startgame-btn");
let explaingame = document.querySelector(".explaingame")
startbtn.addEventListener("click", startFun);
function startFun(e) {
    Run = true;
    let startgame = document.querySelector(".startgame");
    startgame.style.display = "none";
    explaingame.style.display = "none";
    Restart.style.display = "block";
    Pause.style.display = "block";

    main();
}
