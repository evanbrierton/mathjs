const Group = require('./group');
const Permutation = require('./permutation');

class SymmetricGroup extends Group {
  constructor(n) {
    const arr = Array(n).fill().map((item, i) => i + 1);
    super(
      arr.reduce(function permute(acc, next, i, remainder) {
        return acc.concat(
          remainder.length > 1
            ? remainder
              .slice(0, i)
              .concat(remainder.slice(i + 1))
              .reduce(permute, [])
              .map((permutation) => [next].concat(permutation))
            : next,
        );
      }, [])
        .map((permutation) => new Permutation(new Set(arr), new Set(permutation))),
    );
  }
}

module.exports = SymmetricGroup;
