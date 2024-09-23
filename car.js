export default class Car{
  constructor(x, y, context) {
    this.x = x;
    this.y = y;
    this.width = 300;
    this.height = 300;
    this.speed = 5;
    this.velocityY = 0;
    this.gravity = 0.6;
    this.isJumping = false;
    this.jumpCount = 0;
    this.maxJumpCount = 2;
    this.context = context;
    this.carImage = new Image();
    this.carImage.src = "./images/jeep.png";
  }

  draw() {
    this.context.drawImage(this.carImage, this.x, this.y, this.width, this.height);
  }

  update(ground) {
    if (this.isJumping) {
      this.velocityY += this.gravity;
      this.y += this.velocityY;
    }
    if (this.y + this.height > ground) {
      this.y = ground - this.height;
      this.isJumping = false;
      this.velocityY = 0;
      this.jumpCount = 0;
    }
  }

  jump() {
    if (this.jumpCount < this.maxJumpCount) {
      this.isJumping = true;
      this.velocityY = -22;
      this.jumpCount++;
    }
  }

  isCollidingWith(object) {
    const collisionBuffer = -100;
    return (
      this.x < object.x + object.width + collisionBuffer &&
      this.x + this.width > object.x - collisionBuffer &&
      this.y < object.y + object.height + collisionBuffer &&
      this.y + this.height > object.y - collisionBuffer
    );
  }
}