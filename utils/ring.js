const ArrayProxy = require('./arrayProxy');

class Ring extends ArrayProxy {
  constructor(...entries) {
    super(
      (target, key) => target[((key % target.length) + target.length) % target.length],
      entries,
      Object.getOwnPropertyNames(Array.prototype),
    );
  }

  flatten() {
    return new Ring(
      ...this.reduce((acc, next) => [...acc, ...(Array.isArray(next) ? next : [next])]),
    );
  }
}

module.exports = Ring;
