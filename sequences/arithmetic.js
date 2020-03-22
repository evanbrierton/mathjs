const { ArrayProxy } = require('../utils');

class ArithmeticSequence extends ArrayProxy {
  constructor(firstTerm, commonDifference) {
    super(
      (target, n) => firstTerm + n * commonDifference,
      [],
      Object.getOwnPropertyNames(ArithmeticSequence.prototype),
    );
    this.firstTerm = firstTerm;
    this.commonDifference = commonDifference;
  }

  sum(n) {
    const { firstTerm, commonDifference } = this;
    return (n / 2) * (2 * firstTerm + n * commonDifference);
  }
}

module.exports = ArithmeticSequence;
