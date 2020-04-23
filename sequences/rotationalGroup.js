const Group = require('./group');
const CyclicGroup = require('./cyclicGroup');
const Permutation = require('./permutation');
const { arrEquals } = require('../utils');

class RotationalGroup extends Group {
  constructor(n) {
    const arr = Array(n).fill().map((entry, i) => i + 1);

    const primitiveCyclicGroup = arr.map((entry) => (
      Array.from(new CyclicGroup(arr.filter((i) => i !== entry)))
        .map(({ input, output }) => {
          const inputArray = [...Array.from(input), entry];
          const outputArray = [...Array.from(output), entry];
          return new Permutation(
            new Set([...Array.from(input), entry].sort()),
            new Set(
              outputArray.sort(
                (a, b) => inputArray[outputArray.indexOf(a)] - inputArray[outputArray.indexOf(b)],
              ),
            ),
          );
        }).filter(({ input, output }) => !arrEquals(Array.from(input), Array.from(output)))
    )).reduce((acc, next) => [...acc, ...next], []);

    const compoundCyclicGroup = primitiveCyclicGroup
      .map((permutation, i, group) => group[0].compose(permutation))
      .filter(({ order }) => order === n / 2);

    const permutations = [
      new Permutation(new Set(arr), new Set(arr)),
      ...primitiveCyclicGroup,
      ...compoundCyclicGroup,
    ];

    super(permutations);
  }
}

module.exports = RotationalGroup;
