const Group = require('./group');
const Permutation = require('./permutation');
const { Ring, isNumber } = require('../utils');

class CyclicGroup extends Group {
  constructor(input) {
    const length = isNumber(input) ? input : input.length;
    const ring = isNumber(input)
      ? new Ring(...Array(length).fill().map((item, i) => i + 1)) : new Ring(...input);
    super(
      Array(length).fill().map((entry, i) => (
        new Permutation(new Set(ring), new Set(ring.shift(i)))
      )),
    );
  }
}

module.exports = CyclicGroup;
