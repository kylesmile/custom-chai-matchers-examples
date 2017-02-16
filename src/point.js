export default class Point {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  x() {
    return this._x;
  }

  y() {
    return this._y;
  }

  distanceTo(other) {
    return Math.sqrt(Math.pow(this.x() - other.x(), 2) + Math.pow(this.y() - other.y(), 2));
  }

  toString() {
    return `Point(${this.x()}, ${this.y()})`;
  }
}
