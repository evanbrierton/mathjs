/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const {
  toDegrees, toPiRadians, print, choose, sum, Ring, ArrayProxy,
} = require('./utils');
const {
  Line, Point, Triangle, RegularPolygon,
} = require('./geometry');
const {
  ArithmeticSequence,
  Cycle,
  GeometricSequence,
  LinearCongruentialGenerator,
  Permutation,
  RecursiveSequence,
} = require('./sequences');
const { Fraction } = require('./number');

// console.log(new Cycle(1, 4, 3).compose(new Cycle(4, 5, 7)));

// const C = new Cycle(1, 4, 3);

// C.push(5);

console.log(new Cycle(1, 3, 2, 4, 7).compose(new Cycle(5, 6)));
// console.log(new Cycle(6, 10, 1).includes(10));
// console.log(Object.getOwnPropertyNames(Cycle.prototype));

console.log(new ArithmeticSequence(0, 2)[3]);
