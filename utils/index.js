const general = require('./general');
const geometry = require('./geometry');
const number = require('./number');
const Ring = require('./ring');

module.exports = {
  ...general, ...geometry, ...number, Ring,
};
