import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND, MAIN_TITLE } from "~/game.config";

export interface MenuOption {
  x: number;
  y: number;
  text: string;
  callback: () => void;
}
export default class MenuScene extends Phaser.Scene {
  private menuOptions: MenuOption[] = [];

  constructor() {
    super({ key: "Menu" });
  }

  create() {
    this.menuOptions = [
      {
        x: GRID_UNIT * 11,
        y: GRID_UNIT * 12,
        text: "START GAME!",
        callback: () => {},
      },
      {
        x: GRID_UNIT * 11,
        y: GRID_UNIT * 15,
        text: "HALL OF FAME",
        callback: () => {
          this.scene.start("HighScore");
        },
      },
    ];

    // forcing to start the main game directly
    this.scene.start("Game");

    this.cameras.main.setBackgroundColor(COLOR_PALETTE.darkOrange);

    this.add.text(GRID_UNIT * 4, GRID_UNIT * 5, MAIN_TITLE, {
      font: "82px Berkelium",
    });

    // rendering buttons
    this.menuOptions.forEach((option, index) => {
      this.buildMenuOption(option, index);
    });
  }

  private buildMenuOption(
    option: MenuOption,
    index: number,
    debug: boolean = false
  ) {
    const optionBtn = this.add.text(option.x, option.y, option.text, {
      font: "28px Berkelium",
    });
    const zone = this.add
      .zone(
        optionBtn.x - optionBtn.width * optionBtn.originX - 16,
        optionBtn.y - optionBtn.height * optionBtn.originY - 16,
        optionBtn.width + 32,
        optionBtn.height + 32
      )
      .setOrigin(0, 0)
      .setInteractive({ cursor: "hand" })
      .once("pointerup", option.callback)
      .on("pointerover", () => {
        this.goToOption(index);
      });
    if (debug) {
      this.add.graphics().lineStyle(2, 0x00ff00).strokeRectShape(zone);
    }
  }

  private goToOption(indexOption: number) {
    const y = this.menuOptions[indexOption].y + GRID_UNIT / 2;
  }
}
