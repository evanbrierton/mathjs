const { ArrayProxy, getMethods } = require('../utils');

class ArithmeticSequence extends ArrayProxy {
  constructor(firstTerm, commonDifference) {
    super(
      (target, n) => firstTerm + n * commonDifference,
      [],
      getMethods(ArithmeticSequence),
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
