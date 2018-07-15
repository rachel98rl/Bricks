var canvas = document.getElementById("myCanvas"); // render graphics
var ctx = canvas.getContext("2d"); // store 2D rendering context

//define user control variables
var rightPressed = false;
var leftPressed = false;

// define starting point to bottom center of canvas
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

// define paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var ballRadius = 10;

// listen for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

// paints ball onto canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2); // define ball
  ctx.fillStyle = "#0095DD";
  ctx.fill(); // paints ball
  ctx.closePath();
}

// paints paddle onto convas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  // paints ball onto canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height); // method clears ball trail before each frame
  drawBall();
  drawPaddle();

  // allows ball to bounce off left & right walls
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // allows ball to bounce off top and bottom walls
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height-ballRadius) {
    // hitting the bottom wall results in game over!
      if(x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
      }
      else {
          alert("GAME OVER");
          document.location.reload();
      }
  }

  // reactions to left & right cursor press
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  } else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  // update ball position
  x += dx;
  y += dy;

}

setInterval(draw, 10); // draw() function executed every 10ms
