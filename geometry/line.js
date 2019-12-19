const { modulus } = require('../utils');

class Line {
  constructor({ points: { p1, p2 }, slope, yIntercept }) {
    this.points = (p1 && p2) ? {
      x1: p1.cartesian.x,
      y1: p1.cartesian.y,
      x2: p2.cartesian.x,
      y2: p2.cartesian.y,
    } : null;

    const {
      x1, y1, x2, y2,
    } = this.points;

    this.slope = slope || (y2 - y1) / (x2 - x1);

    this.yIntercept = yIntercept || y1 - this.slope * x1;
    this.xIntercept = -this.yIntercept / this.slope;

    this.m = this.slope;
    this.a = this.m;
    this.b = -1;
    this.c = this.yIntercept;

    this.equation = {
      slopeIntercept: `y = ${this.m}x + ${this.c}`,
      pointSlope: `y - ${this.points ? y1 : this.yIntercept} = ${this.slope}(x - ${this.points ? x1 : 0}`,
      standard: `${this.a}x + ${this.b}y + ${this.c} = 0`,
    };

    this.equation = `y = ${this.m}x + ${this.c}`;
  }

  get length() {
    const {
      points, points: {
        x1, x2, y1, y2,
      },
    } = this;
    if (points) return modulus(x2 - x1, y2 - y1);
    throw Error('Line has no defined length.');
  }

  get midpoint() {
    const {
      points, points: {
        x1, x2, y1, y2,
      },
    } = this;
    if (points) return [(x1 + x2 / 2), (y1 + y2 / 2)];
    throw Error('Line has no defined midpoint.');
  }

  distanceFrom({ cartesian: { x, y } }) {
    const { a, b, c } = this;
    Math.abs((a * x + b * y + c) / modulus(a, b));
  }

  divideRatio(a, b) {
    const {
      x1, y1, x2, y2,
    } = this.points;
    return [(b * x1 + a * x2) / (b + a), (b * y1 + a * y2) / (b + a)];
  }

  angle() {
    return Math.atan2(this.points.y2, this.points.x2);
  }

  angleBetween(line) {
    return Math.abs(this.angle() - line.angle());
  }
}

module.exports = Line;
