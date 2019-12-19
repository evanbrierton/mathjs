const factorial = (n) => ((n === 0 || n === 1) ? 1 : n * factorial(n - 1));

const choose = (n, k) => (k > n ? 0 : factorial(n) / (factorial(k) * factorial(n - k)));

const sum = (k, n, fn) => {
  let total = 0;
  for (let i = k; i <= n; i += 1) total += fn(i);
  return total;
};

module.exports = { factorial, choose, sum };
