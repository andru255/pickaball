import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND, SOUNDS } from "~/game.config";
import { BasketRimObject } from "~/objects/basketRim.object";
import BallImageObject from "~/objects/ball.object";
import GroundScene from "./ground.scene";
import { Position } from "~/services/calculator.service";

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
      GROUND.X + GRID_UNIT * 2,
      GROUND.HEIGHT / 2
    );
    this.ball = groundScene.addBall(
      GROUND.WIDTH,
      GROUND.HEIGHT / 2,
      COLOR_PALETTE.white
    );
    this.ball.setGravity(GROUND.GRAVITY);

    // orientation checker
    this.checkOrientation(this.scale.orientation);
    this.scale.on("orientationchange", this.checkOrientation, this);

    // touch zone
    const zone = this.add
      .zone(GROUND.X, GROUND.Y, GROUND.WIDTH, GROUND.HEIGHT)
      .setOrigin(0, 0)
      .setInteractive({ cursor: "hand" })
      .on("pointerup", (data) => {
        const { downX, downY } = data;
        const pos: Position = { x: downX, y: downY };
        this.ball?.shot(pos);
      });
    // debugging touch area
    this.add.graphics().lineStyle(2, 0x00ff00).strokeRectShape(zone);
  }

  update(time) {
    this.updateLogic(time);
    this.ball?.update();
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
