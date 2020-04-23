const Cycle = require('./cycle');
const {
  lcm, ArrayProxy, getMethods, arrEquals,
} = require('../utils');

class Permutation extends ArrayProxy {
  constructor(input, output) {
    if (!(input instanceof Set && output instanceof Set)) throw Error('Both arguments of a Permutation must be sets');
    super(
      (target, key) => (
        Array.from(input).includes(+key)
          ? Array.from(output)[Array.from(input).indexOf(+key)]
          : +key
      ),
      [],
      getMethods(Permutation),
    );

    this.input = input;
    this.output = output;

    this.cycles = Cycle.toCycleArray(input, output);
    this.type = new ArrayProxy(
      (target, key) => target[key - 1],
      this.cycles.map(({ length }) => length)
        .reduce((acc, next) => {
          acc[next - 1] += 1;
          return acc;
        }, Array.from(this.input).map(() => 0)),
    );

    this.transpositions = [];
    this.cycles.forEach((cycle) => {
      Array.from(cycle).slice(0, -1).forEach((element, i) => {
        this.transpositions.push(new Cycle(element, Array.from(cycle)[i + 1]));
      });
    });
    this.fixedPoints = this.cycles.reduce((acc, { length }) => acc + (length === 1), 0);

    this.order = lcm(...this.cycles.map((cycle) => cycle.length));
    this.inversions = this.transpositions.length;
    this.sign = (-1) ** this.inversions;
    this.parity = this.sign === 1 ? 'even' : 'odd';
  }

  compose(permutation) {
    return new Permutation(this.input, new Set(Array.from(this.output)
      .map((entry) => permutation[entry])));
  }

  equals(permutation) {
    return arrEquals(Array.from(this.input), Array.from(permutation.input))
      && arrEquals(Array.from(this.output), Array.from(permutation.output));
  }
}

module.exports = Permutation;
