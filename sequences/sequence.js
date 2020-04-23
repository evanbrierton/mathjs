const { ArrayProxy, getMethods } = require('../utils');

class Sequence extends ArrayProxy {
  constructor(fn, init = []) {
    super(
      (target, n) => {
        if (n >= 0 && n < init.length) return init[n];
        if (Number.isInteger(+n)) return fn.call(this, +n, this);
        throw Error('Sequence index must be an integer');
      },
      [],
      getMethods(Sequence),
    );
  }

  subSequence(start, end) {
    return new Array(end - start).fill().map((item, i) => this[start + i]);
  }
}

module.exports = Sequence;
