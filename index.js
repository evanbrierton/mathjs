/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { toDegrees, toPiRadians } = require('./utils');
const { Line, Point } = require('./geometry');
const { Fraction } = require('./number');

const verticalLine = new Line({ points: { p1: { x: 0, y: 0 }, p2: { x: 0, y: 1 } } });
const horizontalLine = new Line({ points: { p1: { x: 0, y: 0 }, p2: { x: 1, y: 1 } } });

console.log(verticalLine.intersect(verticalLine));
// console.log(new Line({ slope: 0, yIntercept: 0 }).angle());
// console.log({ ...new Fraction(0.5) });
console.log(horizontalLine);
