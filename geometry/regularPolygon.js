class RegularPolygon {
  constructor(n, s) {
    if (n < 3) throw Error('A 2-dimensional polygon must have at least 3 sides.');

    this.edges = n;
    this.vertices = n;
    this.sideLength = s;
    this.internalAngles = ((n - 2) * Math.PI) / n;
    this.area = (1 / 4) * n * s ** 2 * Math.cot(Math.PI / n);
  }
}

module.exports = RegularPolygon;
