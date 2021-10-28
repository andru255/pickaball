import Phaser from "phaser";
import customFont from "./services/customFont.service";

import { config } from "./game.config";

customFont();

export default new Phaser.Game(config);
