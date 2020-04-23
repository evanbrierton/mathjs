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

const flatten = (arr) => (
  arr.reduce((acc, next) => [...acc, ...(Array.isArray(next) ? next : [next])])
);

const arrayInRange = (a, b) => Array(b - a + 1).fill().map((entry, i) => i + a);

const toSubscript = (n) => `${n}`.split('').map((digit) => ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'][+digit]).join('');
const toSuperscript = (n) => `${n}`.split('').map((digit) => ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][+digit - 1]).join('');

module.exports = {
  bind,
  arrEquals,
  check,
  print,
  getMinValue,
  getMaxValue,
  getMethods,
  flatten,
  arrayInRange,
  toSubscript,
  toSuperscript,
};
