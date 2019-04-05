let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

let mouse = {};
window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function colorRandom (min, max) {
   return Math.floor(Math.random() * (max-min+1)) + min ;
}

function Circle(x,y,increaseX,increaseY,radius,color) {
  this.x = x;
  this.y = y;
  this.increaseX = increaseX;
  this.increaseY = increaseY;
  this.radius = radius;
  this.minRadius = radius;
  this.maxRadius = radius*2;
  this.color = color;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }

  this.move = function() {
    if (this.x + this.radius > innerWidth || this.x-this.radius < 0) {
      this.increaseX = -this.increaseX;
    }

    if (this.y + this.radius > innerHeight || this.y-this.radius < 0) {
      this.increaseY = -this.increaseY;
    }

    this.x += this.increaseX;
    this.y += this.increaseY;
  }

  this.scale = function() {
    if (mouse.x - this.x < radius && mouse.x - this.x > -radius &&
        mouse.y - this.y < radius && mouse.y - this.y > -radius ) {
        if (this.radius < this.maxRadius) {
          this.radius+=1;
        }
    } else if (this.radius > this.minRadius) {
      this.radius-=1;
    }
  }
}

let circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < 120; i++) {
    let radius = Math.random()* 50 + 1;
    let x = Math.random() * (innerWidth - radius*2) + radius;
    let y = Math.random() * (innerHeight - radius*2) + radius;
    let increaseX = (Math.random() - 0.5)*8;
    let increaseY = (Math.random() - 0.5)*8;
    let r = colorRandom(0, 255);
    let g = colorRandom(0, 255);
    let b = colorRandom(0, 255);
    let color = "rgb(" + r + ", " + g + ", " + b + ")"
    let circle = new Circle (x, y, increaseX, increaseY, radius, color);
    circleArray.push(circle);
  }
}

init();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].draw();
      circleArray[i].move();
      circleArray[i].scale();
    }
}

animate();
