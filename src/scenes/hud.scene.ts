import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND, STORAGE_NAME } from "~/game.config";
import CountDownService from "~/services/countdown.service";
import ScoreService from "~/services/score.service";

export default class HUDScene extends Phaser.Scene {
  private scoreLabel?: Phaser.GameObjects.Text;
  private soundLabel?: Phaser.GameObjects.Text;
  private footerLabel?: Phaser.GameObjects.Text;
  private countdownLabel?: Phaser.GameObjects.Text;
  private countdownService?: CountDownService;

  private footerMessages = [
    "Press P to pause/resume the game",
    "Press M to mute/unmute the game",
  ];

  private footerText = "";

  constructor() {
    super({
      key: "HUD",
    });
  }

  init({ gameScene }: { gameScene: Phaser.Scene }) {
    gameScene.events.on("ate", (points) => this.setScore(points));
    gameScene.events.on("mute", (points) => {
      this.setSoundStateText("OFF");
    });
    gameScene.events.on("unmute", (points) => {
      this.setSoundStateText();
    });
  }

  create() {
    const font = `${GRID_UNIT}px Berkelium`;
    this.scoreLabel = this.add.text(GRID_UNIT, GRID_UNIT / 2, "SCORE 00", {
      font,
    });

    this.countdownLabel = this.add.text(
      GROUND.WIDTH / 2 - GRID_UNIT,
      GRID_UNIT / 2,
      "00:00",
      {
        font,
      }
    );
    this.countdownService = new CountDownService(this, this.countdownLabel);
    this.countdownService?.start(() => {
      console.log("done!");
    });

    this.soundLabel = this.add.text(
      GROUND.WIDTH - GRID_UNIT * 6,
      GRID_UNIT / 2,
      ``,
      {
        font,
      }
    );
    let value = this.game.sound.mute ? "OFF" : "ON";
    this.setSoundStateText(value);

    this.footerText = this.footerMessages[0];
    this.time.addEvent({
      callback: () => {
        this.footerText = Phaser.Math.RND.pick(this.footerMessages);
        this.footerLabel?.setText(this.footerText);
      },
      delay: 3600,
      loop: true,
    });

    this.footerLabel = this.add.text(
      GRID_UNIT * 2,
      GROUND.HEIGHT + GRID_UNIT * 5,
      this.footerText,
      {
        font: "28px Berkelium",
      }
    );
  }

  update() {
    this.countdownService?.update();
  }

  private setScore(value = 0) {
    this.scoreLabel?.setText(`SCORE ${String(value)}`);
  }

  private setSoundStateText(value = "ON") {
    this.soundLabel?.setText(`SOUND ${value}`);
  }
}
