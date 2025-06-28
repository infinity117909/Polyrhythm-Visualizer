const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

const pX = document.getElementById("count-x");
const pY = document.getElementById("count-y");
const pT = document.getElementById("hits");


/* Ask the user what polyrhythm they want to see here
Depending on what the user decides to do, adjust the  following elements:
- Ball radius (multiple of the formula given in index.html)
- X and Y of ball placement
- width and height of the canvas
- colors to the sides
- add sounds to left/right and top/bottom
- 
*/
canvas.width = 250;
canvas.height = 200



const ball = {
  x: 25,
  y: 25,
  vx: 5, // horizontal speed of the ball
  vy: 5, // vertical speed of the ball
  radius: 25,
  color: "black",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);

  if (
    ((ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius)) &&
    ((ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius))

  ) {
    pT.textContent = +pT.textContent + 1;
  }
  if (
    (ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius)
  ) {
    ball.vy = -ball.vy;
    pY.textContent = +pY.textContent + 1;
  }
  if (
    (ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius)
  ) {
    ball.vx = -ball.vx;
    pX.textContent = +pX.textContent + 1;
  }
  
}

canvas.addEventListener("mouseover", (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", (e) => {
  window.cancelAnimationFrame(raf);
});

ball.draw();

// when the object reaches the edge, try to pause the animation, catch the conditional, and rotate 90 degrees ccw
// Make sounds each time ball hits top/bottom or left/right
