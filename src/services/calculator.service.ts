export interface Bound {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class CalculatorService {
  distanceAABB(a: Bound, b: Bound): number {
    const dx = Math.pow(a.x - b.x, 2);
    const dy = Math.pow(a.y - b.y, 2);
    return Math.sqrt(dx + dy);
  }

  distanceAngle(a: Bound, b: Bound): number {
    const dy = b.y - a.y;
    const dx = b.x - a.x;
    return Math.atan2(dy, dx);
  }
  containsAABB(a: Bound, b: Bound): boolean {
    const left = a.x + a.width < b.x;
    const right = a.x > b.x + b.width;
    const top = a.y + a.height < b.y;
    const bottom = a.y > b.y + b.height;
    return !(left || right || top || bottom);
  }
}
