import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/GameConfig";

export default class BallObject extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x, y, texture='') {
    super(scene, x, y, texture);
    this.setDisplaySize(GRID_UNIT, GRID_UNIT);
    this.setTintFill(COLOR_PALETTE.dark1);
    scene.children.add(this);
  }
}
