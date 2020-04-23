const Group = require('./group');
const CyclicGroup = require('./cyclicGroup');
const ReflectiveGroup = require('./reflectiveGroup');

class DihedralGroup extends Group {
  constructor(n) {
    super([
      ...Array.from(new CyclicGroup(n)),
      ...Array.from(new ReflectiveGroup(n)),
    ]);
  }
}

module.exports = DihedralGroup;
