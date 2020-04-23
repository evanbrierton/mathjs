const isNumber = (n) => typeof n === 'number' && !Number.isNaN(n);

const factorial = (n) => ((n === 0 || n === 1) ? 1 : n * Math.factorial(n - 1));

const choose = (n, k) => (
  k > n ? 0 : factorial(n) / (factorial(k) * factorial(n - k))
);

const gcd = (...args) => {
  const binaryGCD = (a, b) => (b === 0 ? a : binaryGCD(b, a % b));
  return args.reduce((acc, next) => binaryGCD(acc, next));
};

const lcm = (...args) => (
  args.length === 1
    ? args[0]
    : Array.from(new Set(args))
      .reduce((acc, next) => acc * next) / gcd(...Array.from(new Set(args)))
);

const sum = (k, n, fn) => (
  Array(n + 1 - k).fill().map((term, i) => fn(i)).reduce((acc, next) => acc + next, 0)
);

const sumOverArray = (arr, fn) => arr.reduce((acc, next, i) => acc + fn(next, i), 0);

const product = (k, n, fn) => (
  Array(n + 1 - k).fill().map((term, i) => fn(i + k)).reduce((acc, next) => acc * next, 1)
);

const productOverArray = (arr, fn) => arr.reduce((acc, next, i) => acc * fn(next, i), 1);

module.exports = {
  isNumber, factorial, choose, gcd, lcm, sum, sumOverArray, product, productOverArray,
};
