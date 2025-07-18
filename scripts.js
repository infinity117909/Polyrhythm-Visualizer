/*
x_r => the anticedent of the polyrhythm ratio (first) =>
  x_r = (res_x / d) - 1
y_r => the consequent of the polyrhythm ratio (second) =>
  y_r = (res_y / d) - 1

r => radius of the ball
d => diameter of the ball =>
  d = 2*r
  d = res_x / (x + 1)
  d = res_y / (y + 1)

res_x = canvas width =>
  res_x = (x_r + 1) * d
res_y = canvas height =>
  res_y = (y_r + 1) * d

x => x position of the ball =>
  x = r
y => y position of the ball =>
  y = r

x_s => horizontal speed of the ball =>
  x_s = x_r
y_s => vertical speed of the ball =>
  y_s = y_r

vx => width to check if the ball hits the sides or corners
vy => height to check if the ball hits the top, bottom, or corners
*/


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

const metronome1 = document.createElement("audio");
metronome1.src = "metronome.mp3";

const metronome2 = document.createElement("audio");
metronome2.src = "metronome.mp3";

// Default = 20
canvas.width = 2000;

// Default = 15
canvas.height = 1500;

// Draw the square (ball)
const square = {
  // Default = (0, 0)
  x: 0,
  y: 0,

  // Default = (0.5, 0.5)
  dx: 50,
  dy: 50,

  // Default = 0.2 x 0.2
  width: 20,
  height: 20,

  // Default = black
  color: "black",

  draw() {
    ctx.fillstyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}

console.clear();
console.log(`
  x: ${square.x}
  y: ${square.y} \n
  dx: ${square.dx}
  dy: ${square.dy} \n
  width: ${square.width}
  height: ${square.height} \n
  color: ${square.color}
  canvas width: ${canvas.width}
  canvas height: ${canvas.height}
`)

// Start the animation
function draw() {

  console.clear();
console.log(`
  x: ${square.x}
  y: ${square.y} \n
  dx: ${square.dx}
  dy: ${square.dy} \n
  width: ${square.width}
  height: ${square.height} \n
  color: ${square.color}
  canvas width: ${canvas.width}
  canvas height: ${canvas.height}
`)

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  square.draw();
  square.x += square.dx;
  square.y += square.dy;
    
  raf = window.requestAnimationFrame(draw);

  // A function to test if the square has hit the left or right side of the canvas
  if(
    square.x + square.width >= canvas.width ||
    square.x + square.dx < 0
  ) {
    square.dx = -square.dx;
    Click(metronome1);
  }

  // A function to test if the square has hit the top or bottom of the canvas
  if(
    square.y + square.height >= canvas.height  ||
    square.y + square.dy < 0
  ) {
    square.dy = -square.dy;
    Click(metronome2);
    }

  // A function to test if the square has hit the corners of the canvas
  if (
    (square.x + square.dx >= canvas.width - square.width) && 
    (square.y + Math.abs(square.dx) >= canvas.height - square.height) ||
    (square.x < 0) && 
    (square.y < 0) ||
    (square.x  + square.dx >= canvas.width) && 
    (square.y + Math.abs(square.dy) <= square.dy) ||
    (square.x < 0) && 
    (square.y >= canvas.height - square.height)
  ) {
    //Make this click special!
  }
}


canvas.addEventListener("mouseover", () => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", () => {
  window.cancelAnimationFrame(raf);
});


// A function to stop the animation after a certain number of hits
function stopPolyrhythm() {
  let tmpX = square.dx;
  let tmpY = square.dy;
  square.dx = 0;
  square.dy = 0;
  square.x = 0;
  square.y = 0;
  window.cancelAnimationFrame(raf);
  square.dx = tmpX;
  square.dy = tmpY;
  console.log("Animation stopped.");
}

function Click(metronome) {
  metronome.load();
  metronome.play();
}

function calculatePolyrhythm() {
  clearCanvas();
  dx = Number(document.getElementById('poly-x').value);
  dy = Number(document.getElementById('poly-y').value);

  canvas.width = dx * 500; // Adjust width based on x value
  canvas.height = dy * 500; // Adjust height based on y value

  console.clear();
console.log(`
  x: ${square.x}
  y: ${square.y} \n
  dx: ${square.dx}
  dy: ${square.dy} \n
  width: ${square.width}
  height: ${square.height} \n
  color: ${square.color}
  canvas width: ${canvas.width}
  canvas height: ${canvas.height}
`)
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  console.log("Canvas cleared.");
}


// when the object reaches the edge, try to pause the animation, catch the conditional, and rotate 90 degrees ccw
// Make sounds each time ball hits top/bottom or left/right



