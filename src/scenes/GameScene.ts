import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND, SOUNDS } from "~/GameConfig";
import { BasketRimObject } from "~/objects/BasketRim";
import BallImageObject from "~/objects/Ball";
import GroundScene from "./GroundScene";

export default class GameScene extends Phaser.Scene {
  private ball?: BallImageObject;
  private basketRim?: BasketRimObject;
  private points: number = 0;

  private shotSound?: Phaser.Sound.BaseSound;
  private timeOutSound?: Phaser.Sound.BaseSound;
  private isEnabledTimeOutSound: boolean = true;
  private isMuted = false;

  constructor() {
    super("Game");
  }

  create() {
    this.points = 0;
    this.cameras.main.setBackgroundColor(COLOR_PALETTE.darkOrange);

    this.shotSound = this.sound.add(SOUNDS[0]);
    this.timeOutSound = this.sound.add(SOUNDS[1]);

    const hudScene = this.scene.get("HUD");
    const gameOverScene = this.scene.get("GameOver");
    const pauseResumeScene = this.scene.get("Pause");
    const groundScene: GroundScene = this.scene.get("Ground") as GroundScene;

    this.scene
      .launch(groundScene)
      .launch(hudScene, { gameScene: this })
      .launch(pauseResumeScene, { gameScene: this })
      .launch(gameOverScene, { gameScene: this });
    //objects setup
    this.basketRim = groundScene.addBasketRim(
      GROUND.X + GRID_UNIT,
      GROUND.HEIGHT / 2
    );
    this.ball = groundScene.addBall(
      GROUND.WIDTH,
      GROUND.HEIGHT / 2,
      COLOR_PALETTE.white
    );

    // orientation checker
    this.checkOrientation(this.scale.orientation);
    this.scale.on("orientationchange", this.checkOrientation, this);
  }

  update(time) {
    this.updateLogic(time);
  }

  updateLogic(time) {
    // logic here
  }

  endGame() {
    if (this.isEnabledTimeOutSound) {
      this.timeOutSound?.play();
      this.isEnabledTimeOutSound = false;
    }
    this.scene.pause("Ground");
    this.events.emit("lose", this.points);
    this.time.delayedCall(2300, () => {
      this.scene.stop("HUD").stop("GameOver").stop("Ground").start("Menu");
    });
  }

  updatePoints() {
    this.points += 5;
    this.events.emit("ate", this.points);
  }

  checkOrientation(orientation) {
    if (orientation === Phaser.Scale.PORTRAIT) {
      console.log("is in portrait");
    }
    if (orientation === Phaser.Scale.LANDSCAPE) {
      console.log("is in landscape");
    }
  }
}
