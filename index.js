/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const {
  toDegrees, toPiRadians, print, choose, sum,
} = require('./utils');
const {
  Line, Point, Triangle, RegularPolygon,
} = require('./geometry');
const { Fraction } = require('./number');

const isbn = [5, 3, 3, 6, 1, 2, 0, 1, 4, 3];

console.log((Math.sum(0, 9, (i) => (i + 1) * isbn[i]) + 7 * 9) % 11);
