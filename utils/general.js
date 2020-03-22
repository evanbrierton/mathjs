const util = require('util');

const bind = (fn, ...boundArgs) => (...args) => fn(...args, ...boundArgs);

const arrEquals = (a, b) => (
  a.every((entry, i) => (Array.isArray(a[i]) ? arrEquals(a[i], b[i]) : a[i] === b[i]))
);

const getMinValue = (arr) => arr.reduce((acc, next) => (next < acc ? next : acc), Number.MAX_VALUE);
const getMaxValue = (arr) => arr.reduce((acc, next) => (next > acc ? next : acc), Number.MIN_VALUE);

const check = (fn, items) => (
  Array.isArray(items) ? items : Object.values(items)).every((item) => fn(item));

const print = (item) => console.log(util.inspect(item, false, null, true));

const getMethods = (Class) => Object.getOwnPropertyNames(Class.prototype).filter((method) => method !== 'constructor');

module.exports = {
  bind, arrEquals, check, print, getMinValue, getMaxValue, getMethods,
};
