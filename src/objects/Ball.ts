import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/GameConfig";

export default class BallImageObject extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setDisplaySize(GRID_UNIT, GRID_UNIT);
    scene.children.add(this);
  }

  reposition(scene: Phaser.Scene) {
    const numOfCellsY = GROUND.HEIGHT / GRID_UNIT;
    const numOfCellsX = GROUND.WIDTH / GRID_UNIT;
  }
}
