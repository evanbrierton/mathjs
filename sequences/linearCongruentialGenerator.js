class LinearCongruentialGenerator {
  constructor(multiplier, increment, modulus, seed) {
    if (modulus <= 0) throw Error('Modulus must be greater than 0');
    this.modulus = modulus;

    if (multiplier <= 0) throw Error('Multiplier must be greater than 0');
    if (multiplier > modulus) throw Error('Modulus must be greater than multiplier');
    this.multiplier = multiplier;

    if (increment < 0) throw Error('Increment must be greater than 0');
    if (increment > modulus) throw Error('Modulus must be greater than increment');
    this.increment = increment;

    if (seed) this.setSeed(seed);

    this.terms = new Proxy(
      this,
      {
        get: (target, n) => (
          n <= 0
            ? this.seed
            : (this.multiplier * this.terms[n - 1] + this.increment) % this.modulus
        ),
      },
    );
  }

  range(a, b) {
    return Array(b - a + 1).fill().map((item, i) => this.terms[a + i]);
  }

  setSeed(seedInternal) {
    if (seedInternal < 0) throw Error('Seed must be greater than 0');
    if (seedInternal >= this.modulus) throw Error('Seed must be less than modulus');
    this.seedInternal = seedInternal;
  }

  get seed() {
    if (!this.seedInternal) throw Error('Generator must be seeded');
    return this.seedInternal;
  }
}

module.exports = LinearCongruentialGenerator;
