import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/game.config";

export default class GameScene extends Phaser.Scene {
  imageName = "kerodekroma-logo";

  constructor() {
    super("logo");
  }

  preload() {
    this.load.image(this.imageName, `sprites/${this.imageName}.png`);
  }

  create() {
    this.add.image(GROUND.WIDTH / 2, GROUND.HEIGHT / 2, this.imageName);

    this.cameras.main.fadeIn(100, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.hideAndContinue(300);
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.hideAndContinue(0);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (camera, fx) => {
        this.time.delayedCall(200, () => {
          this.scene.start("Loader", { fadeIn: true });
        });
      }
    );
  }

  hideAndContinue(time = 1000) {
    this.cameras.main.fadeOut(time, 0, 0, 0);
  }
}
