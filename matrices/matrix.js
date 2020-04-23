const { Permutation } = require('../sequences');
const {
  arrEquals, arrayInRange, sumOverArray, productOverArray, isNumber,
} = require('../utils');

class Matrix extends Array {
  constructor(...rows) {
    rows.forEach((row) => {
      if (row.length !== rows[0].length) throw Error('All rows must be of the same length');
    });
    super(...rows);

    this.rows = rows.length;
    this.columns = rows[0].length;
    this.square = rows.length === rows[0].length;
  }

  static generate(n, m, callback, init = Array(n).fill()) {
    return new Matrix(...init.map((row, i, matrix) => (
      (row || Array(m).fill()).map((entry, j) => callback(i, j, matrix))
    )));
  }

  static identity(n) {
    return Matrix.generate(n, n, (i, j) => (i === j ? 1 : 0));
  }

  static zero(n) {
    return Matrix.generate(n, n, () => 0);
  }

  static random(n, m, min, max) {
    return Matrix.generate(n, m, () => Math.floor(Math.random() * (max - min) + min));
  }

  // Matrix utility methods

  mapEntries(callback) {
    return new Matrix(...Array.from(this).map((row, i) => (
      row.map((entry, j) => callback(entry, i, j))
    )));
  }

  clone() {
    return new Matrix(...Array.from(this));
  }

  equals(matrix) {
    return arrEquals(this, matrix);
  }

  changeRow(row, fn) {
    if (row >= this.length) throw Error('The matrix does not contain that many rows.');
    return new Matrix(
      ...this.slice(0, row),
      this[row].map(fn),
      ...this.slice(row + 1, this.length),
    );
  }

  swapRows(n, m) {
    return new Matrix(...this.map((row, i) => {
      if (i === n) return this[m];
      if (i === m) return this[n];
      return row;
    }));
  }

  addRows(scalar, targetRow, ...rows) {
    return this.changeRow(targetRow, (entry, index) => (
      entry + scalar * rows.reduce((acc, row) => acc + this[row][index], 0)
    ));
  }

  subtractRows(scalar, targetRow, ...rows) {
    return this.addRows(-scalar, targetRow, ...rows);
  }

  multiplyRow(row, n) {
    return this.changeRow(row, (i) => i * n);
  }

  divideRow(row, n) {
    return this.multiplyRow(row, 1 / n);
  }

  scale(k) {
    return this.reduce((acc, next, i) => acc.multiplyRow(i, k), this.clone());
  }

  // Row utility methods
  isolateRow(n) {
    // eslint-disable-next-line global-require
    const Vector = require('./vector');
    return new Vector(...this.filter((row, i) => i === n));
  }

  isolateColumn(n) {
    // eslint-disable-next-line global-require
    const Vector = require('./vector');
    return new Vector(...this.map((row) => row.filter((entry, i) => i === n)));
  }

  removeRow(n) {
    return new Matrix(...this.filter((row, i) => i !== n));
  }

  removeColumn(n) {
    return new Matrix(...this.map((row) => row.filter((entry, i) => i !== n)));
  }

  // Determinant
  det() {
    if (!this.square) throw Error('Only square matrices have determinants.');
    return sumOverArray(
      Permutation.symmetricGroup(new Set(arrayInRange(0, this.rows - 1))),
      (permutation) => permutation.sign * productOverArray(this, (row, i) => row[permutation[i]]),
    );
  }

  // Entry manipulation methods
  entry(i, j) {
    return this[i][j];
  }

  minor(i, j) {
    if (!this.square) throw Error('Only square matrices have minors.');
    return this.removeRow(i).removeColumn(j).det();
  }

  cofactor(i, j) {
    if (!this.square) throw Error('Only square matrices have cofactors.');
    return (-1) ** (i + j) * this.minor(i, j);
  }

  // Unary matrix operations

  transpose() {
    const { rows, columns } = this;
    return Matrix.generate(columns, rows, (i, j) => this[j][i]);
  }

  pow(n) {
    if (!(isNumber(n) && Number.isInteger(n))) throw Error('The power must be an integer');
    if (n >= 1) return this.times(this.pow(n - 1));
    if (n <= -1) return this.times(this.pow(Math.abs(n) - 1)).inverse();
    return Matrix.identity(this.rows);
  }

  minorMatrix() {
    const { square, rows } = this;
    if (!square) throw Error('Only square matrices have minor matrices.');
    return Matrix.generate(rows, rows, (i, j) => this.minor(i, j));
  }

  cofactorMatrix() {
    const { square, rows } = this;
    if (!square) throw Error('Only square matrices have minor matrices.');
    return Matrix.generate(rows, rows, (i, j) => this.cofactor(i, j));
  }

  adj() {
    return this.cofactorMatrix().transpose();
  }

  inverse() {
    if (this.det() === 0) throw Error('Only matrices with non-zero determinants have inverses.');
    return this.adj().scale(1 / this.det());
  }

  triangular(sign = 1) {
    const { rows, columns } = this;
    const T = this.clone();
    for (let i = 0; i < rows; i += 1) {
      if (T[i][i] === 0) {
        for (let j = 0; j < rows; j += 1) {
          if (T[j][i] !== 0 && T[i][j] !== 0) {
            [T[j], T[i]] = [T[i], T[j]];
          }
        }
      }
    }

    return Matrix.generate(rows, columns, (i, j) => (
      (sign < 0 ? j > i : j < i) ? T[i][j] * (1 - T[j][j] * (1 / (T[j][j] || 1))) : T[i][j]
    ));
  }

  ref() {
    const { rows, columns } = this;
    const T = this.triangular();
    return Matrix.generate(rows, columns, (i, j) => (T[i][i] !== 0 ? T[i][j] / T[i][i] : T[i][j]));
  }

  rref() {
    const { rows, columns } = this;
    const refMatrix = this.ref();
    return Matrix.generate(rows, columns, (i, j) => (
      j > i ? refMatrix[i][j] * (1 - refMatrix[j][j]) : refMatrix[i][j]
    ));
  }

  // Matrix composition

  add(matrix, scalar = 1) {
    if (this.rows !== matrix.rows || this.columns !== matrix.columns) throw Error('Matrices must be of the same dimensions to be added.');
    return Matrix.generate(this.rows, this.columns, (i, j) => this[i][j] + scalar * matrix[i][j]);
  }

  subtract(matrix, scalar = 1) {
    return this.addMatrix(matrix, -scalar);
  }

  times(matrix) {
    if (this.columns !== matrix.rows) throw Error('Cannot multiply');
    console.log(this);
    return Matrix.generate(this.rows, matrix.columns, (i, j) => (
      this.isolateRow(i).dotProduct(matrix.isolateColumn(j))
    ));
  }
}

module.exports = Matrix;
