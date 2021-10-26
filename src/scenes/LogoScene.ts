import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT } from "~/GameConfig";

export default class GameScene extends Phaser.Scene {
  imageName = "kerodekroma-logo";

  constructor() {
    super("logo");
  }

  preload() {
    this.load.image(this.imageName, `sprites/${this.imageName}.png`);
  }

  create() {
    this.cameras.main.setBackgroundColor(COLOR_PALETTE.dark1);
    this.add.image(GRID_UNIT * 15, GRID_UNIT * 12, this.imageName).setScale(2);

    this.cameras.main.fadeIn(100, 0, 0, 0);
    this.time.delayedCall(100, () => {
      this.hideAndContinue(100);
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.hideAndContinue(0);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (camera, fx) => {
        this.time.delayedCall(100, () => {
          this.scene.start("Loader", { fadeIn: true });
        });
      }
    );
  }

  hideAndContinue(time = 1000) {
    this.cameras.main.fadeOut(time, 0, 0, 0);
  }
}
