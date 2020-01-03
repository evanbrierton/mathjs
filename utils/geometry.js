const { Fraction } = require('../number');

const modulus = (...points) => Math.sqrt(points.reduce((acc, next) => acc + next ** 2, 0));

const toRadians = (degs) => degs * (Math.PI / 180);
const toPiRadians = (rads) => `(${new Fraction(rads / Math.PI).string})π`;

const toDegrees = (rads) => rads * (180 / Math.PI);

module.exports = {
  modulus, toRadians, toPiRadians, toDegrees,
};
