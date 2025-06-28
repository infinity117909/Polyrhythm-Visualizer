const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

const pX = document.getElementById("count-x");
const pY = document.getElementById("count-y");
const pT = document.getElementById("hits");

/* 
- width and height of the canvas
- colors to the sides
- add sounds to left/right and top/bottom
*/

canvas.width = 250;
canvas.height = 200;

function calculatePolyrhythm() {
  let x = Number(document.getElementById('poly-x').value);
  let y = Number(document.getElementById('poly-y').value);
  let d = Number(ball.radius * 2);
  let resX = Number((x + 1) * (ball.radius * 2));
  let resY = Number((y + 1) * (ball.radius * 2));

  console.log(x, y, d);
  console.log(resX, resY);

  canvas.width = resY;
  canvas.height = resX;
}

const ball = {
  x: 25,
  y: 25,
  vx: 1, // horizontal speed of the ball
  vy: 1, // vertical speed of the ball
  dx: 5,
  dy: 5,
  radius: 25,
  color: "black",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.dx;
  ball.y += ball.dy;
  raf = window.requestAnimationFrame(draw);

  console.clear();
  console.log([ball.x, ball.y, ball.dx, ball.dy])

  // Test to see if the ball has hit the corners of the canvas
  if (
    ((ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius)) &&
    ((ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius))
  ) {
    pT.textContent = +pT.textContent + 1;
    window.cancelAnimationFrame(raf);
  }

  // Test to see if the ball has hit the top or bottom of the canvas
  if (
    (ball.y + ball.dy > canvas.height - ball.radius ||
    ball.y + ball.dy < ball.radius)
  ) {
    ball.dy = -ball.dy;
    ball.vy *= -1;
    pY.textContent = +pY.textContent + 1;
  }

  // Test to see if the ball has hit the left or right side of the canvas
  if (
    (ball.x + ball.dx > canvas.width - ball.radius ||
    ball.x + ball.dx < ball.radius)
  ) {
    ball.dx = -ball.dx;
    ball.vx *= -1;
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

