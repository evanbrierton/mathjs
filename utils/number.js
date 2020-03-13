const isNumber = (n) => typeof n === 'number' && !Number.isNaN(n);

const factorial = (n) => ((n === 0 || n === 1) ? 1 : n * Math.factorial(n - 1));

const choose = (n, k) => (
  k > n ? 0 : factorial(n) / (factorial(k) * factorial(n - k))
);

const gcd = (a, b) => (b < Number.MIN_VALUE ? a : Math.gcd(b, Math.floor(a % b)));

const sum = (k, n, fn) => {
  let total = 0;
  for (let i = k; i <= n; i += 1) total += fn(i);
  return total;
};

module.exports = {
  isNumber, factorial, choose, gcd, sum,
};
