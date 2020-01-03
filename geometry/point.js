const { modulus, isNumber, check } = require('../utils');

class Point {
  constructor({
    x, y, radius, angle,
  }) {
    console.log(x, y, radius, angle);
    if (!((check(isNumber, [x, y])) || (check(isNumber, radius, angle)))) {
      throw Error('Not enough information provided to construct point');
    }

    this.x = isNumber(x) ? x : radius * Math.cos(angle);
    this.y = isNumber(y) ? y : radius * Math.sin(angle);

    this.radius = isNumber(radius) ? radius : modulus(x, y);
    this.angle = isNumber(angle) ? angle : Math.atan2(y, x);
  }
}

module.exports = Point;
