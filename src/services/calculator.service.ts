export interface Position {
  x: number;
  y: number;
}

export default class CalculatorService {
  distanceAABB(a: Position, b: Position): number {
    const dx = Math.pow(a.x - b.x, 2);
    const dy = Math.pow(a.y - b.y, 2);
    return Math.sqrt(dx + dy);
  }

  distanceAngle(a: Position, b: Position): number {
    const dy = b.y - a.y;
    const dx = b.x - a.x;
    return Math.atan2(dy, dx);
  }
}
