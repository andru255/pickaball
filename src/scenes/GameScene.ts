import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/GameConfig";
import BallObject from "~/objects/Ball";

export default class GameScene extends Phaser.Scene {
  private ball?: BallObject;

  constructor() {
    super("Game");
  }

  create() {
    this.cameras.main.setBackgroundColor(COLOR_PALETTE.light2);
    this.ball = new BallObject(this, GRID_UNIT*2, GRID_UNIT*2);
    this.ball.setPosition(GRID_UNIT*2, GRID_UNIT*2);

    //let ball = this.add.image(GRID_UNIT, GRID_UNIT, '');
    //ball.setTintFill(COLOR_PALETTE.dark2)

  }

  update() {}

}
