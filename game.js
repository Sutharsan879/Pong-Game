const gameBoard = document.getElementById('gameBoard');
const ctx=gameBoard.getContext("2d");
const scoretext=document.querySelector("#scoretext");
const resetBtn=document.querySelector("#resetBtn");
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const boardBackground="forestgreen";
const paddle1color="lightblue";
const paddle2color="red";
const ballcolor="yellow";
const paddleBorder="black";
const ballBorderColor="black";
const ballRadius=12.5;
const paddleSpeed=50;
let intervalID;
let ballSpeed=1;
let ballX=gameWidth/2;
let ballY=gameHeight/2;
let ballXDirection=0;
let ballYDirection=0;
let player1Score=0;
let player2Score=0;
let paddle1={
    width:25,
    height:100,
    x:0,
    y:0
};
let paddle2={
    width:25,
    height:100,
    x:gameWidth-25,
    y:gameHeight-100
};
window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener("click",resetGame);
gameStart();

function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalID=setTimeout(()=>{
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX,ballY);
        checkCollision();
        checkWinner();
        nextTick();
    },5);
};
function clearBoard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function drawPaddles(){
    ctx.strokeStyle=paddleBorder;
    ctx.fillStyle=paddle1color;
   ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
   ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
   
   ctx.fillStyle=paddle2color;
   ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
   ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
};
function createBall(){
    ballSpeed=1;
    if(Math.round(Math.random())==1)
    {
        ballXDirection=1;
    }
    else{
        ballXDirection=-1;
    }
    if(Math.round(Math.random())==1)
    {
        ballYDirection=1;
    }
    else{
        ballYDirection=-1;
    }
    ballX=gameWidth/2;
    ballY=gameHeight/2;
    drawBall(ballX,ballY);
};
/*function moveBall(){
    ballX+=(ballSpeed*ballXDirection);
    ballY+=(ballSpeed*ballYDirection);
};*/
let isGameOver = false;
function moveBall() {
    if (!isGameOver) {
        ballX += ballSpeed * ballXDirection;
        ballY += ballSpeed * ballYDirection;
    }
}

function drawBall(ballX,ballY){
    ctx.fillStyle=ballcolor;
    ctx.strokeStyle=ballBorderColor;
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRadius,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkCollision(){
    if(ballY<=0+ballRadius)
    {
        ballYDirection*=-1;
    }
    if(ballY>=gameHeight-ballRadius)
    {
        ballYDirection*=-1;
    }
    if(ballX<=0)
    {
        player2Score+=1;
        updateScore();
        createBall();
        return;
    }
    if(ballX>=gameWidth)
    {
        player1Score+=1;
        updateScore();
        createBall();
        return;
    }
    if(ballX<=(paddle1.x+paddle1.width+ballRadius)){
        if(ballY>paddle1.y&& ballY<paddle1.y+paddle1.height){
            ballX=(paddle1.x+paddle1.width)+ballRadius;
            ballXDirection*=-1;
            ballSpeed+=1;
        }
    }
    if(ballX>=(paddle2.x-ballRadius)){
        if(ballY>paddle2.y&& ballY<paddle2.y+paddle2.height){
            ballX=paddle2.x-ballRadius;
            ballXDirection*=-1;
            ballSpeed+=1;
        }
    }
};
let isGameOverPlayer1 = false;
let isGameOverPlayer2 = false;
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    if (!isGameOverPlayer1) {
        switch (keyPressed) {
            case paddle1Up:
                if (paddle1.y > 0) {
                    paddle1.y -= paddleSpeed;
                }
                break;
            case paddle1Down:
                if (paddle1.y < gameHeight - paddle1.height) {
                    paddle1.y += paddleSpeed;
                }
                break;
        }
    }

    if (!isGameOverPlayer2) {
        switch (keyPressed) {
            case paddle2Up:
                if (paddle2.y > 0) {
                    paddle2.y -= paddleSpeed;
                }
                break;
            case paddle2Down:
                if (paddle2.y < gameHeight - paddle2.height) {
                    paddle2.y += paddleSpeed;
                }
                break;
        }
    }
}
function updateScore(){
    scoretext.textContent=`${player1Score}:${player2Score}`;
};
function resetGame(){
    player1Score=0;
    player2Score=0;
    paddle1={
        width:25,
        height:100,
        x:0,
        y:0
    };
    paddle2={
        width:25,
        height:100,
        x:gameWidth-25,
        y:gameHeight-100
    };
    ballSpeed=1;
    ballX=0;
    ballY=0;
    ballXDirection=0;
    ballYDirection=0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};
const restartBtn = document.querySelector("#restartBtn");
const gameOverScreen = document.querySelector("#game-over");
const winnerText = document.querySelector("#winner-text");
restartBtn.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    resetGame();
    gameStart();
});
function checkWinner() {
    if (player1Score >= 5 || player2Score >= 5) {
        isGameOver = true;
        clearInterval(intervalID); 
        showGameOverScreen();
    }
}
function showGameOverScreen() {
    gameOverScreen.style.display = "block";
    if (player1Score >= 5) {
        winnerText.textContent = "Player A wins!";
    } else {
        winnerText.textContent = "Player B wins!";
    }
}
function resetGame() {
    isGameOver = false; 
    player1Score = 0; 
    player2Score = 0; 
    updateScore();
}
function moveBall() {
    if (!isGameOver) {
        ballX += ballSpeed * ballXDirection;
        ballY += ballSpeed * ballYDirection;
    }
}