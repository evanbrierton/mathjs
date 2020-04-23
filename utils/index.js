require('./constants');
require('./geometry');
require('./number');
require('./trigonometry');

const general = require('./general');
const number = require('./number');
const ArrayProxy = require('./arrayProxy');
const Ring = require('./ring');
const PHI = require('./constants');


module.exports = {
  ...general, ...number, ArrayProxy, Ring, PHI,
};
