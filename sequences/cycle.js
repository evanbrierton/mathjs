const { ArrayProxy, Ring, getMethods } = require('../utils');

class Cycle extends ArrayProxy {
  constructor(...entries) {
    if (Array.from(new Set(entries)).length !== entries.length) throw Error('Cycles cannot contain duplicate elements');
    super(
      (target, key) => (
        entries.includes(+key)
          ? new Ring(...entries)[entries.indexOf(+key) + 1]
          : +key
      ),
      entries,
      getMethods(Cycle),
    );
    // this.order = entries.length;
  }

  static pushElementToCycleRing(cycleArray, nextValue, elements) {
    if (cycleArray.flatten().includes(nextValue)) {
      cycleArray
        .push(new Ring(elements.filter((element) => !cycleArray.flatten().includes(element))[0]));
    } else cycleArray[-1].push(nextValue);
  }

  static toCycleArray(input, output) {
    const elements = new Ring(...Array.from(input));
    const disjointCycles = new Ring(new Ring(Array.from(input)[0]));
    if (Array.from(output)[0] !== disjointCycles[0][0]) {
      disjointCycles[0].push(Array.from(output)[0]);
    }

    Array.from(input).slice(disjointCycles[0].length).forEach(() => {
      this.pushElementToCycleRing(
        disjointCycles,
        Array.from(output)[Array.from(input).indexOf(disjointCycles.flatten()[-1])],
        elements,
      );
    });

    return Array.from(disjointCycles)
      .map((i) => new Cycle(...Array.from(i)));
  }

  compose(cycle) {
    const elements = new Ring(...Array.from(new Set([...this, ...cycle])).sort());
    const disjointCycles = new Ring(new Ring(elements[0]));

    elements.slice(1).forEach(() => {
      Cycle.pushElementToCycleRing(disjointCycles, this[cycle[disjointCycles[-1][-1]]], elements);
    });
    return Array.from(disjointCycles).map((i) => new Cycle(...Array.from(i)));
  }
}

module.exports = Cycle;
