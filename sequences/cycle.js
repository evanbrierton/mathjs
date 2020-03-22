const { ArrayProxy, Ring } = require('../utils');

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
      Object.getOwnPropertyNames(Cycle.prototype),
    );
    this.order = entries.length;
  }

  compose(cycle) {
    const elements = Array.from(new Set([...this, ...cycle])).sort();
    const disjointCycles = new Ring(new Ring(elements[0]));

    elements.slice(1, elements.length + 1).forEach(() => {
      const nextValue = this[cycle[disjointCycles[-1][-1]]];
      if (disjointCycles[-1].includes(nextValue)) {
        disjointCycles
          .push(new Ring(elements.filter((element) => !disjointCycles[-1].includes(element))[0]));
      } else disjointCycles[-1].push(nextValue);
    });


    return disjointCycles.map((i) => new Cycle(...Array.from(i)));
  }
}

module.exports = Cycle;
