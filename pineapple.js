export default class Pineapple {
  constructor(x, y, context) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 50;
    this.context = context;
    this.pineappleImage = new Image();
    this.pineappleImage.src = "./images/ananas.png";
  }
  draw() {
    this.context.drawImage(
      this.pineappleImage,
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
