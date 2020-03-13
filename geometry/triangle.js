const Line = require('./line');

class Triangle {
  constructor({ points: { p1, p2, p3 } }) {
    this.vertices = [p1, p2, p3];

    this.sides = [
      new Line({ points: { p1, p2 } }),
      new Line({ points: { p1: p2, p2: p3 } }),
      new Line({ points: { p1: p3, p2: p1 } }),
    ];

    this.angles = [
      this.sides[0].angleBetween(this.sides[1]),
      this.sides[1].angleBetween(this.sides[2]),
      this.sides[2].angleBetween(this.sides[0]),
    ];

    this.lengths = this.sides.map((side) => side.length);

    this.height = this.lengths[2] * Math.sin(this.angles[2]);
    this.area = (this.lengths[0] * this.height) / 2;
  }
}

module.exports = Triangle;
