import Phaser from "phaser";
import { GRID_UNIT, COLOR_PALETTE, GROUND } from "~/game.config";

export class BasketRimObject {
  private body?: Phaser.GameObjects.Group;
  private ring: Phaser.GameObjects.Sprite;
  private direction: Phaser.Geom.Point;
  private rotation: number = 0;
  private headPosition: Phaser.Geom.Point = new Phaser.Geom.Point(0, 0);
  private tailPosition = new Phaser.Math.Vector2(0, 0);

  public isAlive: Boolean = true;
  public isStopped: Boolean = false;
  private updated: Boolean = true;
  private moveTime: number = 0;
  private moveDelay: number = 100;

  constructor(scene: Phaser.Scene, x, y) {
    this.body = scene.add.group({
      defaultKey: "basketRimBody",
      createCallback: (obj) => {},
    });
    this.ring = this.body.create(x, y);
    this.ring.setTintFill(COLOR_PALETTE.darkBlue);
    this.ring.setDisplaySize(GRID_UNIT * 4, GRID_UNIT);
    this.direction = new Phaser.Geom.Point(GRID_UNIT, 0);
  }

  update(scene: Phaser.Scene, time: number) {}

  collideWithBall(ball, points): boolean {
    if (this.ring?.x == ball.x && this.ring?.y == ball.y) {
      if (this.moveDelay > 20 && points % 25 === 0) {
        this.moveDelay -= 5;
      }
      return true;
    }
    return false;
  }

  hitBody() {
    const children = this.body?.children.entries || [];
    return Phaser.Actions.GetFirst(
      children,
      { x: this.ring.x, y: this.ring.y },
      1
    );
  }

  hitEdge(scene: Phaser.Scene): boolean {
    const { width, height } = scene.sys.game.config;
    const edges = {
      top: GROUND.Y,
      left: GROUND.X,
      right: GROUND.X + GROUND.WIDTH - GRID_UNIT / 2,
      bottom: GROUND.HEIGHT + GROUND.Y - GRID_UNIT / 2,
    };
    const { x: headX, y: headY } = this.ring;
    return (
      headX > edges.right ||
      headX < edges.left ||
      headY > edges.bottom ||
      headY < edges.top
    );
  }

  stop() {
    this.isStopped = true;
  }

  resume() {
    this.isStopped = false;
  }

  updateGrid(grid) {
    const children = this.body?.getChildren() || [];
    for (const segment of children) {
      const x = segment["x"] / GRID_UNIT - GROUND.X / GRID_UNIT;
      const y = segment["y"] / GRID_UNIT - GROUND.Y / GRID_UNIT;
      if (grid[y] !== undefined) {
        if (grid[y][x] !== undefined) {
          grid[y][x] = false;
        }
      }
    }
    return grid;
  }
}
