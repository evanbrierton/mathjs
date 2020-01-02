const Point = require('./point');
const { modulus, check, isNumber } = require('../utils');

class Line {
  constructor({ points, slope, yIntercept }) {
    this.points = {
      x1: null, y1: null, x2: null, y2: null,
    };

    if (points) {
      const { p1, p2 } = points;
      this.points = {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
      };
    }

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
      pointSlope: `y - ${y1 || this.yIntercept} = ${this.slope}(x - ${x1 || 0})`,
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
    if (check(isNumber, points)) return modulus(x2 - x1, y2 - y1);
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

  angle = () => Math.atan2(this.points.y2, this.points.x2);

  angleBetween = (line) => Math.abs(this.angle() - line.angle());

  intersect(line) {
    if (this.m === line.m) throw Error('Lines are parallell');
    const x = (line.c - this.c) / (this.m - line.m);
    return new Point({ x, y: this.m * x + this.c });
  }

  contains = ({ x, y }) => y === this.m * x + this.c;
}

module.exports = Line;
