import Phaser from "phaser";
import { BasketRimObject } from "~/objects/basketRim.object";
import BallImageObject from "~/objects/ball.object";
import GridSprite from "~/sprites/grid.sprite";
import ArrowObject from "~/objects/arrow.object";

export default class GroundScene extends Phaser.Scene {
  constructor() {
    super({
      key: "Ground",
    });
  }

  addGround(x = 0, y = 0) {
    return new GridSprite(this, x, y, "grid");
  }

  addBall(x = 0, y = 0, texture) {
    return new BallImageObject(this, x, y, texture);
  }

  addArrow(x = 0, y = 0, texture) {
    return new ArrowObject(this, x, y, texture);
  }

  addBasketRim(x = 0, y = 0): BasketRimObject {
    return new BasketRimObject(this, x, y);
  }
}
