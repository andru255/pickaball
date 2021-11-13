import { COLOR_PALETTE, config, GRID_UNIT, GROUND } from "~/game.config";
import BallImageObject from "./ball.object";
import CalculatorService, { Bound } from "~/services/calculator.service";

export default class ArrowObject {
  private readonly stateSizes = {
    normal: { width: GRID_UNIT * 2, height: GRID_UNIT * 2 },
    pressed: { width: GRID_UNIT * 3, height: GRID_UNIT * 3 },
  };
  private onLeaveEvt = (centerPos: Phaser.Math.Vector2) => {};
  private onDragEvt = () => {};
  private body?: Phaser.GameObjects.Group;
  private box!: Phaser.GameObjects.Sprite;
  private draggableArea!: Phaser.GameObjects.Arc;
  private linkLine!: Phaser.Geom.Line;
  private projection!: Phaser.Curves.Line;
  private graphics!: Phaser.GameObjects.Graphics;
  private initPos = { x: 0, y: 0 };
  private calculador = new CalculatorService();

  constructor(scene: Phaser.Scene, x, y, texture) {
    this.initPos.x = x;
    this.initPos.y = y;
    this.body = scene.add.group({
      defaultKey: "arrowBody",
      createCallback: () => {},
    });

    this.graphics = scene.add.graphics({
      fillStyle: { color: COLOR_PALETTE.blue },
      lineStyle: { color: COLOR_PALETTE.blue },
    });

    const { normal, pressed } = this.stateSizes;

    // setup box
    this.box = this.body.create(x, y);
    this.box.setDisplaySize(normal.width, normal.height);
    this.box.setTintFill(COLOR_PALETTE.darkBlue);
    this.box.setInteractive();
    scene.input.setDraggable(this.box);

    this.box.on("pointerover", () => {
      this.box.setDisplaySize(pressed.width, pressed.height);
    });

    this.box.on("pointerout", () => {
      this.box.setDisplaySize(normal.width, normal.height);
      const center = this.box.getCenter();
      this.onLeaveEvt(center);
    });

    scene.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      console.log("circle", this.draggableArea.getBounds());
      const { x: x1, y: y1 } = this.draggableArea.getBounds();
      let distance = this.calculador.distanceAABB(
        { x: x1, y: y1, width: 0, height: 0 },
        {
          x: dragX - this.box.width,
          y: dragY - this.box.height,
          width: 0,
          height: 0,
        }
      );
      const angle = this.calculador.distanceAngle(
        { x: x1, y: y1, width: 0, height: 0 },
        {
          x: dragX - this.box.width,
          y: dragY - this.box.height,
          width: 0,
          height: 0,
        }
      );
      console.log("DRAG::angle", (angle / Math.PI) * 180, (90 * Math.PI) / 180);
      if (
        distance < GRID_UNIT * 4 * 2 &&
        (angle / Math.PI) * 180 < 50 &&
        (angle / Math.PI) * 180 > 30
      ) {
        this.linkLine.x1 = dragX;
        this.linkLine.y1 = dragY;
        this.box.setPosition(dragX, dragY);
      }
      this.onDragEvt();
    });

    //setup draggeable area
    this.draggableArea = scene.add.circle(
      0,
      0,
      GRID_UNIT * 4,
      COLOR_PALETTE.lightBlue,
      0.3
    );
  }

  public onLeave(callback = (centerPos: Phaser.Math.Vector2) => {}) {
    this.onLeaveEvt = callback;
  }

  public onDrag(callback = () => {}) {
    this.onDragEvt = callback;
  }

  public link(ball: BallImageObject) {
    const { x: x1, y: y1 } = this.box.getCenter();
    const { x: x2, y: y2 } = ball.getCenter();

    this.linkLine = new Phaser.Geom.Line(x1, y1, x2, y2);
    const dots = this.buildProjectionDots(ball);
    this.projection = new Phaser.Curves.Line(dots);
    this.draggableArea.setPosition(x2, y2);
  }

  public updateProjectionValues(ball: BallImageObject) {
    const dots = this.buildProjectionDots(ball);
    this.projection = new Phaser.Curves.Line(dots);
  }

  private getDistanceWithBall(ball: BallImageObject): number {
    const { x: x1, y: y1 } = this.box.getCenter();
    const { x: x2, y: y2 } = ball.getCenter();
    return this.calculador.distanceAABB(
      { x: x1, y: y1, width: 0, height: 0 },
      { x: x2, y: y2, width: 0, height: 0 }
    );
  }

  public hide() {
    this.body?.setAlpha(0);
    this.box.setAlpha(0);
    this.graphics.alpha = 0;
  }

  public reset(ball: BallImageObject) {
    this.body?.setAlpha(1);
    this.box.setAlpha(1);
    this.graphics.alpha = 1;
    this.box.x = this.initPos.x;
    this.box.y = this.initPos.y;
    this.link(ball);
  }

  public renderLink() {
    this.graphics.clear();
    this.graphics.strokeLineShape(this.linkLine);
    this.projection.getPoints().map((point) => {
      this.graphics.fillRect(point.x, point.y, 5, 5);
    });
  }

  private buildProjectionDots(ball: BallImageObject): number[] {
    const result: number[] = [];

    const { x: x1, y: y1 } = this.box.getCenter();
    const { x: x2, y: y2 } = ball.getCenter();

    // calculate the distance between the box and the ball
    const distance = this.getDistanceWithBall(ball);
    const angle = this.calculador.distanceAngle(
      { x: x1, y: y1, width: 0, height: 0 },
      { x: x2, y: y2, width: 0, height: 0 }
    );

    console.log("ball", x2, y2);
    console.log("distance", distance);
    console.log("angle", angle, (angle / Math.PI) * 180);

    const speed = distance;
    const accY = GROUND.GRAVITY;
    const length = 10;
    const fps = 1 / 3;
    const steps = fps * length;
    let vX = Math.cos(angle) * speed;
    let vY = Math.sin(angle) * speed;
    let x0 = x2;
    let y0 = y2;

    for (let i = 0; i < steps; i += fps) {
      vY += accY;
      x0 += fps * vX;
      y0 += fps * vY;
      result.push(x0);
      result.push(y0);
    }

    return [result[length - 2], result[length - 1], result[0], result[1]];
  }
}
