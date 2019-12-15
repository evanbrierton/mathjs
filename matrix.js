const util = require('util');

const { bindArgs, arrEquals } = require('./utils.js');

class Matrix {
  constructor(matrix) {
    matrix.forEach((row, i) => {
      if (row.length !== matrix[i > 0 ? i - 1 : 0].length) throw Error('All rows must be of the same length.');
    });

    this.dimensions = {
      rows: matrix.length,
      columns: matrix[0].length,
      min: Math.min(matrix.length, matrix[0].length),
    };

    this.entries = matrix.map((row) => row.map((entry) => +entry.toFixed(5)));

    this.square = this.dimensions.rows === this.dimensions.columns;

    this.vector = this.dimensions.min === 1;
    this.columnVector = this.dimensions.columns === 1;
    this.rowVector = this.dimensions.rows === 1;
  }

  static generate(n, m, callback) {
    return new Matrix(
      Array(n).fill().map((row, i, arr) => Array(m).fill().map(bindArgs(callback, row, i, arr))),
    );
  }

  static identity(n) {
    return Matrix
      .generate(n, n, (entry, column, arr, row, rowIndex) => (column === rowIndex ? 1 : 0));
  }

  static zero(n) {
    return Matrix.generate(n, n, () => 0);
  }

  static random(n, m, min, max) {
    return Matrix.generate(n, m, () => Math.floor(Math.random() * (max - min) + min));
  }

  // Matrix utility methods

  clone() {
    return new Matrix(this.entries);
  }

  equals(...matrices) {
    return matrices.every((matrix) => arrEquals(this.entries, matrix.entries));
  }

  operate(operations) {
    let resultantMatrix = this.clone();
    operations.forEach(({ operation, args }) => {
      resultantMatrix = resultantMatrix[operation](...args);
    });
    return resultantMatrix;
  }

  scale(k) {
    return this.entries.reduce((acc, next, i) => acc.multiplyRow(i, k), this.clone());
  }

  // Determinant

  det() {
    if (!this.square) throw Error('Only square matrices have determinants.');
    const { operations, diagonals } = this.upperTriangular('o', 'd');
    return diagonals.reduce((acc, next) => acc * next) * (-1) ** operations.reduce((acc, next) => (next.operation === 'swapRows' ? acc + 1 : acc), 0);
  }

  // Entry manipulation methods

  entry(i, j) {
    return this.entries[i][j];
  }

  minor(i, j) {
    if (!this.square) throw Error('Only square matrices have minors.');
    return this.removeRow(i).removeColumn(j).det();
  }

  cofactor(i, j) {
    if (!this.square) throw Error('Only square matrices have cofactors.');
    return (-1) ** (i + j) * this.minor(i, j);
  }

  // Row utility methods

  isolateRow(n) {
    return new Matrix(this.entries.filter((row, i) => i === n));
  }

  isolateColumn(n) {
    return new Matrix(this.entries.map((row) => row.filter((entry, i) => i === n)));
  }

  removeRow(n) {
    return new Matrix(this.entries.filter((row, i) => i !== n));
  }

  removeColumn(n) {
    return new Matrix(this.entries.map((row) => row.filter((entry, i) => i !== n)));
  }

  changeRow(row, fn) {
    const { entries } = this;
    if (row >= entries.length) throw Error('The matrix does not contain that many rows.');
    return new Matrix(
      [
        ...entries.slice(0, row),
        entries[row].map(fn),
        ...entries.slice(row + 1, entries.length),
      ],
    );
  }

  // Elementary row operations

  swapRows(n, m) {
    const { entries } = this;
    return new Matrix(entries.map((row, i) => {
      if (i === n) return entries[m];
      if (i === m) return entries[n];
      return row;
    }));
  }

  addRows(scalar, targetRow, ...rows) {
    return this
      .changeRow(
        targetRow,
        (entry, index) => (
          entry + scalar * rows.reduce((acc, row) => acc + this.entries[row][index], 0)
        ),
      );
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

  // Vector utility methods

  toRowVector() {
    return this.columnVector ? this.transpose() : this;
  }

  // Vector operations

  magnitude() {
    if (!this.vector) throw Error('Can only take get the magnitude of a vector');
    return Math.sqrt(this.toRowVector().entries[0].reduce((acc, next) => acc + next ** 2, 0));
  }

  angleBetween(v) {
    return Math.acos(this.dotProduct(v) / (this.magnitude() * v.magnitude()));
  }

  // Vector composition

  dotProduct(v) {
    if (!this.vector || !v.vector) throw Error('Can only take the dot product of a vector');
    const v1 = this.toRowVector().entries[0];
    const v2 = v.toRowVector().entries[0];
    return v1.reduce((acc, next, i) => acc + v1[i] * v2[i], 0);
  }

  crossProduct(...vectors) {
    if (!this.vector || !vectors.every((v) => v.vector)) throw Error('Can only take the cross product of a vector');
  }

  // Unary matrix operations

  transpose() {
    const transposeMatrix = Array(this.dimensions.columns).fill().map(() => []);
    for (let i = 0; i < this.dimensions.columns; i += 1) {
      for (let j = 0; j < this.dimensions.rows; j += 1) {
        transposeMatrix[i][j] = this.entries[j][i];
      }
    }
    return new Matrix(transposeMatrix);
  }

  minorMatrix() {
    const { square, dimensions: { min } } = this;
    if (!square) throw Error('Only square matrices have minor matrices.');
    return new Matrix(
      Array(min).fill(Array(min).fill()).map((row, i) => row.map((entry, j) => this.minor(i, j))),
    );
  }

  cofactorMatrix() {
    const { square, dimensions: { min } } = this;
    if (!square) throw Error('Only square matrices have minor matrices.');
    return new Matrix(
      Array(min)
        .fill(Array(min).fill())
        .map((row, i) => row.map((entry, j) => this.cofactor(i, j))),
    );
  }

  adj() {
    return this.cofactorMatrix().transpose();
  }

  inverse() {
    if (this.det() === 0) throw Error('Only matrices with non-zero determinants have inverses.');
    return this.adj().scale(1 / this.det());
  }

  upperTriangular(...flags) {
    const { rows, columns, min } = this.dimensions;
    const operations = [];
    let utMatrix = this.clone();
    for (let i = 0; i < columns; i += 1) {
      if (utMatrix.entries[i][i] === 0) {
        for (let k = 0; k < rows; k += 1) {
          if (utMatrix.entries[k][i] !== 0) {
            utMatrix = utMatrix.swapRows(i, k);
            operations.push({ operation: 'swapRows', args: [i, k] });
          }
        }
      }

      for (let k = i + 1; k < rows; k += 1) {
        utMatrix = utMatrix.subtractRows(
          utMatrix.entries[k][i] / (utMatrix.entries[i][i] || 1), k, i,
        );
        if (operations) operations.push({ operation: 'subtractRows', args: [utMatrix.entries[k][i] / (utMatrix.entries[i][i] || 1), k, i] });
      }
    }
    if (flags.length > 0) {
      return {
        ...(flags.includes('d') && { diagonals: Array(min).fill().map((item, i) => utMatrix.entries[i][i]) }),
        ...(flags.includes('o') && { operations }),
        ...(flags.includes('ut') && { upperTriangularMatrix: utMatrix }),
      };
    }
    return utMatrix;
  }

  ref(...flags) {
    let refMatrix = this.upperTriangular();
    const { diagonals, operations, upperTriangularMatrix } = this.upperTriangular(...flags);
    const { rows, columns } = this.dimensions;
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        if (refMatrix.entries[i][j] !== 0) {
          refMatrix = refMatrix.divideRow(i, refMatrix.entries[i][j]);
          if (operations) operations.push({ operation: 'divideRow', args: [i, refMatrix.entries[i][j]] });
          break;
        }
      }
    }
    if (flags.length > 0) {
      return {
        ...(flags.includes('d') && { diagonals }),
        ...(flags.includes('o') && { operations }),
        ...(flags.includes('ut') && { upperTriangularMatrix }),
        ...(flags.includes('ref') && { refMatrix }),
      };
    }
    return refMatrix;
  }

  rref(...flags) {
    let rrefMatrix = this.ref();
    const {
      diagonals, operations, upperTriangularMatrix, refMatrix,
    } = this.ref(...flags);
    const { min } = this.dimensions;
    for (let i = min - 1; i >= 0; i -= 1) {
      for (let j = i - 1; j >= 0; j -= 1) {
        rrefMatrix = rrefMatrix.subtractRows(rrefMatrix.entries[j][i], j, i);
        if (operations) operations.push({ operation: 'subtractRows', args: [rrefMatrix.entries[j][i], j, i] });
      }
    }
    if (flags.length > 0) {
      return {
        ...(flags.includes('d') && { diagonals }),
        ...(flags.includes('o') && { operations }),
        ...(flags.includes('ut') && { upperTriangularMatrix }),
        ...(flags.includes('ref') && { refMatrix }),
        ...(flags.includes('rref') && { rrefMatrix }),
      };
    }
    return rrefMatrix;
  }

  // Matrix composition

  add({ entries, dimensions: { rows, columns } }, scalar) {
    if (this.dimensions.rows !== rows || this.dimensions.columns !== columns) throw Error('Matrices must be of the same dimensions to be added.');
    return new Matrix(
      this.entries.map((row, i) => (
        row.map((entry, column) => entry + scalar * entries[i][column]))),
    );
  }

  subtract(matrix, scalar) {
    return this.addMatrix(matrix, -scalar);
  }

  times(matrix) {
    if (this.dimensions.columns !== matrix.dimensions.rows) throw Error('Invalid dimensions for matrix multiplication.');
    return new Matrix(Array(this.dimensions.rows)
      .fill(Array(matrix.dimensions.columns).fill())
      .map((row, i) => (
        row.map((entry, j) => this.isolateRow(i).dotProduct(matrix.isolateColumn(j))))));
  }
}

const v = new Matrix([[1, 0]]);

console.log(util.inspect(v.angleBetween(new Matrix([[0, 1]])), false, null, true));

module.exports = Matrix;
