const Group = require('./group');
const CyclicGroup = require('./cyclicGroup');
const Permutation = require('./permutation');
const { Ring } = require('../utils');

class ReflectiveGroup extends Group {
  constructor(n) {
    const ring = new Ring(...Array(n).fill().map((item, i) => i + 1));
    super(Array.from(new CyclicGroup(n)).map((permutation) => (
      permutation.compose(new Permutation(new Set(ring), new Set(ring.reverse())))
    )));
  }
}

module.exports = ReflectiveGroup;
