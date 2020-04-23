/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const {
  PHI, toDegrees, toPiRadians, print, choose, sum, Ring, ArrayProxy, gcd, product,
} = require('./utils');
const {
  Line, Point, Triangle, RegularPolygon,
} = require('./geometry');
const {
  Sequence,
  ArithmeticSequence,
  Cycle,
  GeometricSequence,
  LinearCongruentialGenerator,
  Permutation,
  RecursiveSequence,
  Group,
  SymmetricGroup,
  CyclicGroup,
  DihedralGroup,
  RotationalGroup,
} = require('./sequences');
const { Fraction } = require('./number');
const { Matrix, Vector } = require('./matrices');

// const indices = Object.values(
//   Array.from(new SymmetricGroup(6)).map(({ type }) => type.sort())
//     .reduce((acc, next, j) => ({ [next]: j, ...acc }), {}),
// ).sort((a, b) => a.length - b.length);

// print(
//   Array.from(new SymmetricGroup(6)).filter((group, i) => indices.includes(i)).sort((a, b) => a.type.length - b.type.length),
// );

console.log(new Sequence((n, self) => 2 * self[n - 1] - 3, [1]).subSequence(0, 10));
