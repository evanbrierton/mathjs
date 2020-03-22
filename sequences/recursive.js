const { ArrayProxy, getMethods } = require('../utils');

class RecursiveSequence extends ArrayProxy {
  constructor(initialValues, coefficients = Array(initialValues.length).fill(1)) {
    super(
      (target, n) => (
        n < initialValues.length
          ? initialValues[n]
          : coefficients.reduce((acc, next, i) => acc + next * this.terms[n - 1 - i], 0)
      ),
      [],
      getMethods(RecursiveSequence),
    );
  }
}

module.exports = RecursiveSequence;
