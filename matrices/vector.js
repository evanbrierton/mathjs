const Matrix = require('./matrix');
const { flatten } = require('../utils');

class Vector extends Matrix {
  constructor(...entries) {
    super(...flatten(Array.isArray(...entries) ? entries : [entries]));
    this.rows = entries.length;
    this.columns = entries[0].length;
  }

  magnitude() {
    Math.sqrt(this.reduce((acc, next) => acc + next ** 2, 0));
  }

  dotProduct(vector) {
    return this.reduce((acc, next, i) => acc + this[i] * vector[i], 0);
  }

  angleBetween(vector) {
    return Math.acos(this.dotProduct(vector) / (this.magnitude() * vector.magnitude()));
  }
}

module.exports = Vector;
