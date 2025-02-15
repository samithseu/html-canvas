const canvas = document.querySelector("#canvas");

let displayWidth = window.innerWidth;
let displayHeight = window.innerHeight;
canvas.style.width = `${displayWidth}px`;
canvas.style.height = `${displayHeight}px`;
canvas.width = displayWidth;
canvas.height = displayHeight;

const ctx = canvas.getContext("2d");

// Circle object
function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
  this.update = () => {
    if (this.x + this.radius > displayWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > displayHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

// initialize array of circles
let circles = [];

// adding each circle into the array
for (let i = 0; i < 100; i++) {
  let radius = 2;
  let x = Math.random() * (displayWidth - radius * 2) + radius;
  let y = Math.random() * (displayHeight - radius * 2) + radius;
  let dx = Math.random() * 2;
  let dy = Math.random() * 2;
  circles.push(
    new Circle(
      x,
      y,
      dx,
      dy,
      radius,
      "white"
      // `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      //   Math.random() * 255
      // })`
    )
  );
}

// animate those circles
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => {
    circle.update();
  });
}
animate();
