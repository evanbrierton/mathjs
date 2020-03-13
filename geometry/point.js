const { check } = require('../utils');

class Point {
  constructor({
    x, y, radius, angle,
  }) {
    if (!((check(Math.isNumber, [x, y])) || (check(Math.isNumber, radius, angle)))) {
      throw Error('Not enough information provided to construct point');
    }

    this.x = Math.isNumber(x) ? x : radius * Math.cos(angle);
    this.y = Math.isNumber(y) ? y : radius * Math.sin(angle);

    this.radius = Math.isNumber(radius) ? radius : Math.modulus(x, y);
    this.angle = Math.isNumber(angle) ? angle : Math.atan2(y, x);
  }
}

module.exports = Point;
