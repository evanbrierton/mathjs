class RecursiveSequence {
  constructor(initialValues, coefficients = Array(initialValues.length).fill(1)) {
    this.terms = new Proxy(
      this,
      {
        get: (target, n) => (
          n < initialValues.length
            ? initialValues[n]
            : coefficients.reduce((acc, next, i) => acc + next * this.terms[n - 1 - i], 0)
        ),
      },
    );
  }
}

module.exports = RecursiveSequence;
