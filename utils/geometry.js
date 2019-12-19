const modulus = (...points) => Math.sqrt(points.reduce((acc, next) => acc + next ** 2, 0));

const toRadians = (degs) => degs * (Math.PI / 180);

const toDegrees = (rads) => rads * (180 / Math.PI);

module.exports = { modulus, toRadians, toDegrees };
