import Phaser from "phaser";
import GameOverScene from "./scenes/gameOver.scene";

import GameScene from "./scenes/game.scene";
import GroundScene from "./scenes/ground.scene";
import HighScoreScene from "./scenes/highScores.scene";
import HUDScene from "./scenes/hud.scene";
import LoaderScene from "./scenes/loader.scene";
import LogoScene from "./scenes/logo.scene";
import MenuScene from "./scenes/menu.scene";
import PauseScene from "./scenes/pause.scene";

// from: https://lospec.com/palette-list/funkyfuture-8
export const COLOR_PALETTE = {
  darkBlue: 0x2b0f54,
  blue: 0x3368dc,
  lightBlue: 0x49e7ec,
  darkOrange: 0xab1f65,
  orange: 0xff4f69,
  lightOrange: 0xff8142,
  yellow: 0xffda45,
  white: 0xfff7f8,
};

export const GRID_UNIT = 16;

export const GROUND = {
  X: GRID_UNIT,
  Y: GRID_UNIT * 3,
  WIDTH: GRID_UNIT * 38,
  HEIGHT: GRID_UNIT * 15,
  GRAVITY: 0.5,
};

export const SOUNDS = ["shot", "die"];

export const STORAGE_NAME = "pickaball-score";

export const MAIN_TITLE = "PICK A BALL";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 40 * GRID_UNIT,
  height: 18 * GRID_UNIT,
  physics: {
    default: "arcade",
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    LogoScene,
    LoaderScene,
    MenuScene,
    HighScoreScene,
    GameScene,
    HUDScene,
    GroundScene,
    PauseScene,
    GameOverScene,
  ],
  plugins: {},
};
