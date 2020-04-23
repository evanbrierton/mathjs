const ArrayProxy = require('./arrayProxy');
const { flatten } = require('./general');

class Ring extends ArrayProxy {
  constructor(...entries) {
    super(
      (target, key) => target[((key % target.length) + target.length) % target.length],
      entries,
      Object.getOwnPropertyNames(Array.prototype),
    );
  }

  flatten() {
    return new Ring(...flatten(this));
  }

  shift(n = 1) {
    return this.map((entry, i, ring) => ring[i - n]);
  }
}

module.exports = Ring;
