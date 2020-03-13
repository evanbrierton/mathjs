class ArithmeticSequence {
  constructor(firstTerm, commonDifference) {
    this.firstTerm = firstTerm;
    this.commonDifference = commonDifference;

    this.terms = new Proxy(this, { get: (target, n) => firstTerm + (n - 1) * commonDifference });
  }

  sum(n) {
    const { firstTerm, commonDifference } = this;
    return (n / 2) * (2 * firstTerm + (n - 1) * commonDifference);
  }
}

module.exports = ArithmeticSequence;
