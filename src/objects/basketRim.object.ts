import Phaser from "phaser";
import { GRID_UNIT, COLOR_PALETTE, GROUND } from "~/game.config";
import CalculatorService, { Bound } from "~/services/calculator.service";
import BallImageObject from "./ball.object";

export class BasketRimObject {
  private body?: Phaser.GameObjects.Group;
  private leftCorner: Phaser.GameObjects.Sprite;
  private rightCorner: Phaser.GameObjects.Sprite;
  private goal: Phaser.GameObjects.Sprite;

  private moveDelay: number = 100;
  private calculator = new CalculatorService();
  private isMark = false;

  constructor(scene: Phaser.Scene, x, y) {
    this.body = scene.add.group({
      defaultKey: "basketRimBody",
      createCallback: (obj) => {},
    });
    const edgeSizes = { width: GRID_UNIT / 2, height: GRID_UNIT / 2 };

    // left corner
    this.leftCorner = this.body.create(x, y);
    this.leftCorner.setTintFill(COLOR_PALETTE.darkBlue);
    this.leftCorner.setDisplaySize(edgeSizes.width, edgeSizes.height);

    // right corner
    this.rightCorner = this.body.create(x + GRID_UNIT * 3, y);
    this.rightCorner.setTintFill(COLOR_PALETTE.darkBlue);
    this.rightCorner.setDisplaySize(edgeSizes.width, edgeSizes.height);

    // goal area
    const goalAreaSize = { width: GRID_UNIT / 2, height: 1 };
    this.goal = this.body.create(x + edgeSizes.width * 3, y);
    this.goal.setTintFill(COLOR_PALETTE.lightBlue);
    this.goal.setDisplaySize(goalAreaSize.width, goalAreaSize.height);
    this.goal.alpha = 0.4;
  }

  collideWithBall(
    ballBounds?: Bound,
    onCollides?: (obj: Phaser.GameObjects.Sprite) => void,
    onScores?: () => void
  ) {
    if (ballBounds === undefined) {
      return;
    }

    [this.leftCorner, this.rightCorner].forEach((obj) => {
      if (this.calculator.containsAABB(obj.getBounds(), ballBounds)) {
        onCollides && onCollides(obj);
        return;
      }
    });

    if (
      !this.isMark &&
      this.calculator.containsAABB(this.goal.getBounds(), ballBounds)
    ) {
      this.isMark = true;
      onScores && onScores();
      return;
    }
  }

  resetMark() {
    this.isMark = false;
  }
}
