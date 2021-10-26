import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/GameConfig";

export default class BallImageObject extends Phaser.GameObjects.Image {
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
}
