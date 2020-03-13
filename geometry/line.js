const Point = require('./point');
const { Fraction } = require('../number');
const { check } = require('../utils');

class Line {
  constructor({ points, slope, yIntercept }) {
    this.points = {
      x1: null, y1: null, x2: null, y2: null,
    };

    if (points) {
      const { p1, p2 } = points;
      if (p1.x === p2.x && p1.y === p2.y) throw Error('Cannot generate a line from a single point');
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

    this.slope = Math.isNumber(slope) ? slope : (y2 - y1) / (x2 - x1);

    this.yIntercept = yIntercept || y1 - this.slope * x1;
    this.xIntercept = x1 === x2 ? x1 : -this.yIntercept / this.slope;

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
    if (check(Math.isNumber, points)) return Math.modulus(x2 - x1, y2 - y1);
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

  distanceFrom({ x, y }) {
    const { a, b, c } = this;
    Math.abs((a * x + b * y + c) / Math.modulus(a, b));
  }

  divideRatio(a, b) {
    const {
      x1, y1, x2, y2,
    } = this.points;
    return [(b * x1 + a * x2) / (b + a), (b * y1 + a * y2) / (b + a)];
  }

  angle = () => (
    this.slope === Infinity
      ? Math.PI / 2
      : Math.atan2(new Fraction(this.slope).numerator, new Fraction(this.slope).denominator)
  );

  angleBetween = (line) => Math.abs(this.angle() - line.angle());

  intersect(line) {
    if (this.m === line.m) throw Error('Lines are parallel');
    let x = (line.c - this.c) / (this.m - line.m);
    let y = this.m * x + this.c;
    if (this.m === Infinity) {
      x = this.xIntercept;
      y = line.m * x + line.c;
    }
    if (line.m === Infinity) {
      x = line.xIntercept;
      y = this.m * x + this.c;
    }
    return new Point({ x, y });
  }

  contains = ({ x, y }) => (
    this.m !== Infinity ? y === this.m * x + this.c : x === this.xIntercept
  );
}

module.exports = Line;
