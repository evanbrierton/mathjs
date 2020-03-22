const { ArrayProxy, getMethods } = require('../utils');

class GeometricSequence extends ArrayProxy {
  constructor(firstTerm, commonRatio) {
    super(
      (target, n) => firstTerm * commonRatio ** (n),
      [],
      getMethods(GeometricSequence),
    );

    this.firstTerm = firstTerm;
    this.commonRatio = commonRatio;
  }

  sum(n) {
    const { firstTerm, commonRatio } = this;
    return (firstTerm * (1 - commonRatio) ** n) / 1 - commonRatio;
  }
}

module.exports = GeometricSequence;
