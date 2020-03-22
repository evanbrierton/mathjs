class GeometricSequence {
  constructor(firstTerm, commonRatio) {
    this.firstTerm = firstTerm;
    this.commonRatio = commonRatio;

    this.terms = new Proxy(this, { get: (target, n) => firstTerm * commonRatio ** (n) });
  }

  sum(n) {
    const { firstTerm, commonRatio } = this;
    return (firstTerm * (1 - commonRatio) ** n) / 1 - commonRatio;
  }
}

module.exports = GeometricSequence;
