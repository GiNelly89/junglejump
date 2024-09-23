export default class Banana {
  constructor(x, y, context) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 50;
    this.context = context;
    this.bananaImage = new Image();
    this.bananaImage.src = "./images/banana.png";
  }
  draw() {
    this.context.drawImage(
      this.bananaImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    this.x -= 7;
  }
}
