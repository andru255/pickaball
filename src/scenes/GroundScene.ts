import Phaser from "phaser";
import { BasketRimObject } from "~/objects/BasketRim";
import { BorderObject } from "~/objects/Border";
import BallImageObject from "~/objects/Ball";
import GridSprite from "~/sprites/GridSprite";

export default class GroundScene extends Phaser.Scene {
  constructor() {
    super({
      key: "Ground",
    });
  }

  addGround(x = 0, y = 0) {
    return new GridSprite(this, x, y, "grid");
  }

  addBorders(x = 0, y = 0) {
    return new BorderObject(this, x, y);
  }

  addBall(x = 0, y = 0, texture) {
    return new BallImageObject(this, x, y, texture);
  }

  addBasketRim(x = 0, y = 0): BasketRimObject {
    return new BasketRimObject(this, x, y);
  }
}
