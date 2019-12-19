const { modulus, isNumber } = require('../utils');

class Point {
  constructor({
    x, y, radius, angle,
  }) {
    this.cartesian = {
      x: isNumber(x) ? x : radius * Math.cos(angle),
      y: isNumber(y) ? y : radius * Math.sin(angle),
    };

    this.polar = {
      radius: isNumber(radius) ? radius : modulus(x, y),
      angle: isNumber(angle) ? angle : Math.atan2(y, x),
    };
  }
}

module.exports = Point;
