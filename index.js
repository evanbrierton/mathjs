/* eslint-disable no-unused-vars */
const { toDegrees } = require('./utils');
const { Line, Point } = require('./geometry');

console.log(
  toDegrees(new Line({ slope: 1, yIntercept: 0 }).angle()),
);
