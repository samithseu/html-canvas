const canvas = document.querySelector("#canvas");

let displayWidth = window.innerWidth;
let displayHeight = window.innerHeight;
canvas.width = displayWidth;
canvas.height = displayHeight;

const ctx = canvas.getContext("2d");

let mouse = {
  x: undefined,
  y: undefined,
};

// Event Listeners
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  displayWidth = window.innerWidth;
  displayHeight = window.innerHeight;
  canvas.width = displayWidth;
  canvas.height = displayHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Circle object
function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.speed = 0.015;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = () => {
    if (mouse.x && mouse.y) {
      const distanceX = mouse.x - this.x;
      const distanceY = mouse.y - this.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      const attractionRange = 100; // Adjust as needed

      if (distance < attractionRange) {
        // Calculate the angle towards the mouse
        const angle = Math.atan2(distanceY, distanceX);
        // Update velocity towards the mouse
        this.dx += Math.cos(angle) * this.speed;
        this.dy += Math.sin(angle) * this.speed;
      }
    }

    this.x += this.dx;
    this.y += this.dy;

    // setting the boundary
    if (this.x + this.radius > displayWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > displayHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.draw();
  };
}

// initialize array of circles
let circles = [];

// adding each circle into the array
for (let i = 0; i < 200; i++) {
  let radius = 0.9;
  let x = Math.random() * (displayWidth - radius * 2) + radius;
  let y = Math.random() * (displayHeight - radius * 2) + radius;
  let dx = Math.random() / 5;
  let dy = Math.random() / 5;
  let color = `rgba(255,255,255,${Math.random()})`;

  circles.push(new Circle(x, y, dx, dy, radius, color));
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
