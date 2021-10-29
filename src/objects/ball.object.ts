import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/game.config";
import CalculatorService, { Position } from "~/services/calculator.service";

export default class BallImageObject extends Phaser.GameObjects.Image {
  public vY = 0;
  public vX = 0;

  private isTriggered = false;
  private gravity = 0.2;
  private accY = 0;
  private calculator = new CalculatorService();

  constructor(scene: Phaser.Scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setDisplaySize(GRID_UNIT * 2, GRID_UNIT * 2);
    this.setTintFill(COLOR_PALETTE.lightOrange);
    scene.children.add(this);
  }

  reposition(scene: Phaser.Scene) {
    const numOfCellsY = GROUND.HEIGHT / GRID_UNIT;
    const numOfCellsX = GROUND.WIDTH / GRID_UNIT;
  }

  setGravity(value: number) {
    //  this.gravity = value;
    //  this.accY = value;
  }

  update() {
    this.rotation += 0.01;
    this.vY += this.accY;
    this.x += this.vX;
    this.y += this.vY;
  }

  bounce() {
    // touch the bottom
    if (this.y - this.height > GROUND.HEIGHT) {
      // this.vY = -this.velocityY;
      // this.accY += this.gravity;
      this.vY -= 3;
    }

    this.vY += this.accY;
    this.y += this.vY;
  }

  shot(target: Position) {
    const posA: Position = {
      x: this.x + this.width / 2 || 0,
      y: this.y + this.height / 2 || 0,
    };
    const speed = this.calculator.distanceAABB(posA, target) / 25;
    this.vX = Math.cos(this.calculator.distanceAngle(posA, target)) * speed;
    this.vY = Math.sin(this.calculator.distanceAngle(posA, target)) * speed;
    this.accY = this.gravity;
  }

  trigger() {
    this.isTriggered = true;
  }
}
