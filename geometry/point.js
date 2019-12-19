const { modulus } = require('../utils');

class Point {
  constructor({
    x, y, radius, angle,
  }) {
    this.cartesian = {x: x || radius * Math.cos(angle), y: y || radius * Math.sin(angle)}

    this.polar = { radius: radius || modulus(x, y), angle: angle || y === 0 ? 0 : Math.atan2(y, x) };
  }
}

console.log(Math.atan2(0, 2))

module.exports = Point;
