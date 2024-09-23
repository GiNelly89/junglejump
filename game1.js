import Car from "./car.js";
import Banana from "./banana.js";
import Pineapple from "./pineapple.js";

//! Spiel-Setup
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const x = 50; //? Wert für die X-Position
const y = canvas.height - 150; //? Wert für die Y-Position

//? Instanzen
const myCar = new Car(x, y, context);
// const myBanana = new Banana(x, y, context);
// const myPineapple = new Pineapple(x, y, context);


//! 2)
class Game {
  constructor() {
    this.backgroundImage = new Image();
    this.backgroundImage.src = "./images/wald.jpg";
    this.backgroundX = 0;
    this.bananas = [];
    this.pineapples = [];
    this.ground = canvas.height - 35;
    this.car = myCar;
    this.experiencePoints = 0;
    this.lifePoints = 3;

    this.start();
  }

  start() {
    setInterval(() => this.spawnBanana(), 2000);
    this.gameLoop();
  }

  spawnBanana() {
    const lastBananaX =
      this.bananas.length > 0
        ? this.bananas[this.bananas.length - 1].x
        : canvas.width;
    const banana = new Banana(
      lastBananaX + Math.random() * 500 + 300,
      this.ground - 120, context
    );
    this.bananas.push(banana);

    if (Math.random() < 0.3) {
      const pineappleX = Math.random() * (canvas.width - 30);
      const pineappleY = this.ground - 120;
      const pineapple = new Pineapple(pineappleX, pineappleY, context);
      this.pineapples.push(pineapple);
    }
  }

  drawBackground() {
    context.drawImage(
      this.backgroundImage,
      this.backgroundX,
      0,
      canvas.width,
      canvas.height
    );
    context.drawImage(
      this.backgroundImage,
      this.backgroundX + canvas.width,
      0,
      canvas.width,
      canvas.height
    );
  }

  drawRoad() {
    context.fillStyle = "#333";
    context.fillRect(0, this.ground, canvas.width, 0);
  }

  //! Position der LP & EP
  drawHUD() {
    context.fillStyle = "black";
    context.font = "32px Helvetica";
    context.fillText(`LP: ${this.lifePoints}`, 30, 50);
    context.fillText(`Score: ${this.experiencePoints}`, canvas.width - 150, 50);
  }
  draw() {
    this.drawBackground();
    this.drawRoad();
    this.bananas.forEach((banana) => banana.draw());
    this.pineapples.forEach((pineapple) => pineapple.draw());
    this.car.draw();
    this.drawHUD();
  }

  update() {
    this.car.update(this.ground);
    this.backgroundX -= 2;

    if (this.backgroundX <= -canvas.width) {
      this.backgroundX = 0;
    }

    this.bananas.forEach((banana, index) => {
      banana.update();
      if (banana.x + banana.width < 0) {
        this.bananas.splice(index, 1);
        this.experiencePoints++; //* EP erhöhen, wenn eine Banane übersprungen
      }
      if (this.car.isCollidingWith(banana)) {
        this.lifePoints--;
        if (this.lifePoints) {
          alert("You hit a banana!");
        }
        if (this.lifePoints <= 0) {
          alert("Game Over! You loose all LP");
          document.location.reload();
        }
        this.bananas.splice(index, 1); // * Banane nach Kollision entfernen
      }
    });

    this.pineapples.forEach((pineapple, index) => {
      pineapple.update();
      if (pineapple.x + pineapple.width < 0) {
        this.pineapples.splice(index, 1);
      }
      if (this.car.isCollidingWith(pineapple)) {
        this.lifePoints++;
        this.pineapples.splice(index, 1);
      }
    });
  }

  gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.draw();
    this.update();
    requestAnimationFrame(() => this.gameLoop());
  }
}

// class Car {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.width = 300;
//     this.height = 300;
//     this.speed = 5;
//     this.velocityY = 0;
//     this.gravity = 0.6;
//     this.isJumping = false;
//     this.jumpCount = 0;
//     this.maxJumpCount = 2;
//     this.carImage = new Image();
//     this.carImage.src = "./images/jeep.png";
//   }

//   draw() {
//     context.drawImage(this.carImage, this.x, this.y, this.width, this.height);
//   }

//   update(ground) {
//     if (this.isJumping) {
//       this.velocityY += this.gravity;
//       this.y += this.velocityY;
//     }
//     if (this.y + this.height > ground) {
//       this.y = ground - this.height;
//       this.isJumping = false;
//       this.velocityY = 0;
//       this.jumpCount = 0;
//     }
//   }

//   jump() {
//     if (this.jumpCount < this.maxJumpCount) {
//       this.isJumping = true;
//       this.velocityY = -22;
//       this.jumpCount++;
//     }
//   }

//   isCollidingWith(object) {
//     const collisionBuffer = -100;
//     return (
//       this.x < object.x + object.width + collisionBuffer &&
//       this.x + this.width > object.x - collisionBuffer &&
//       this.y < object.y + object.height + collisionBuffer &&
//       this.y + this.height > object.y - collisionBuffer
//     );
//   }
// }

// class Banana {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.width = 30;
//     this.height = 50;
//     this.bananaImage = new Image();
//     this.bananaImage.src = "./images/banana.png";
//   }
//   draw() {
//     context.drawImage(
//       this.bananaImage,
//       this.x,
//       this.y,
//       this.width,
//       this.height
//     );
//   }
//   update() {
//     this.x -= 7;
//   }
// }

// class Pineapple {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.width = 30;
//     this.height = 50;
//     this.pineappleImage = new Image();
//     this.pineappleImage.src = "./images/ananas.png";
//   }
//   draw() {
//     context.drawImage(
//       this.pineappleImage,
//       this.x,
//       this.y,
//       this.width,
//       this.height
//     );
//   }
//   update() {
//     this.x -= 7;
//   }
// }
const game = new Game();

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    game.car.jump();
  }
});
