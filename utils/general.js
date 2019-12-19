const bind = (fn, ...boundArgs) => (...args) => fn(...args, ...boundArgs);

const arrEquals = (a, b) => (
  a.every((entry, i) => (Array.isArray(a[i]) ? arrEquals(a[i], b[i]) : a[i] === b[i]))
);

const check = (fn, items) => (
  (Array.isArray(items) ? items : Object.values(items)).every((item) => fn(item))
);

module.exports = { bind, arrEquals, check };
