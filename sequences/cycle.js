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
    this.order = entries.length;
  }

  compose(cycle) {
    const elements = new Ring(...Array.from(new Set([...this, ...cycle])).sort());
    const disjointCycles = new Ring(new Ring(elements[0]));

    elements.slice(1).forEach(() => {
      const currentCycle = disjointCycles[-1];
      const nextValue = this[cycle[currentCycle[-1]]];

      if (currentCycle.includes(nextValue)) {
        disjointCycles
          .push(new Ring(elements.filter((element) => !currentCycle.includes(element))[0]));
      } else currentCycle.push(nextValue);
    });

    return disjointCycles.map((i) => new Cycle(...Array.from(i)));
  }
}

module.exports = Cycle;
