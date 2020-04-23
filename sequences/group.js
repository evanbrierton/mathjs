const { toSubscript, toSuperscript } = require('../utils');

class Group extends Set {
  constructor(permutations) {
    super(permutations);

    this.cycleIndex = permutations
      .reduce((acc, { type }) => [{ coefficient: 1, type: `${type}` }, ...acc], [])
      .reduce((acc, { type }) => {
        if (acc.some((entry) => entry.type === type)) {
          acc[acc.findIndex((entry) => entry.type === type)].coefficient += 1;
          return acc;
        }
        return [...acc, { coefficient: 1, type }];
      }, [])
      .sort((a, b) => (a.type < b.type ? 1 : -1))
      .map((term) => ({ ...term, type: term.type.split(',').map((i) => +i) }));

    this.cycleIndexString = this.cycleIndex
      .reduce((acc, { coefficient, type }) => (
        `${acc ? `${acc} + ` : ''}${coefficient}${type.reduce((acc2, next, i) => `${acc2}${next ? `x_${i + 1}^${next}` : ''}`, '')}`),
      '')
      .replace(/_(?<subscript>\d+)/g, (string, subscript) => `${toSubscript(+subscript)}`)
      .replace(/\^(?<superscript>\d+)/g, (string, superscript) => `${+superscript !== 1 ? toSuperscript(+superscript) : ''}`)
      .replace(/(?<coeffecient>\d+)x/g, (string, coefficient) => (+coefficient !== 1 ? string : 'x'));
  }

  derangements() {
    return new Set(Array.from(this).filter(({ type }) => !type[1]));
  }
}

module.exports = Group;
