import Phaser from "phaser";
import GameOverScene from "./scenes/GameOverScene";

import GameScene from "./scenes/GameScene";
import GroundScene from "./scenes/GroundScene";
import HighScoreScene from "./scenes/HighScoresScene";
import HUDScene from "./scenes/HUDScene";
import LoaderScene from "./scenes/LoaderScene";
import LogoScene from "./scenes/LogoScene";
import MenuScene from "./scenes/MenuScene";
import PauseScene from "./scenes/PauseScene";

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
  X: GRID_UNIT * 2,
  Y: GRID_UNIT * 3,
  WIDTH: GRID_UNIT * 28,
  HEIGHT: GRID_UNIT * 17,
};

export const SOUNDS = ["shot", "die"];

export const STORAGE_NAME = "pickaball-score";

export const MAIN_TITLE = "PICK A BALL";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
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
