import { COLOR_PALETTE, GRID_UNIT } from "~/game.config";

export default class ArrowObject extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setDisplaySize(GRID_UNIT, GRID_UNIT);
    this.setTintFill(COLOR_PALETTE.lightBlue);
    scene.children.add(this);
  }
}
