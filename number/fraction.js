const gcd = (a, b) => (b < Number.MIN_VALUE ? a : gcd(b, Math.floor(a % b)));

class Fraction {
  constructor(n) {
    this.negative = !(n >= 0);

    this.posValue = Math.abs(n);

    if (parseFloat(this.posValue) === parseInt(this.posValue, 10)) {
      this.numerator = n;
      this.denominator = 1;
      this.integer = true;
    } else {
      const denominator = 10 ** (this.posValue.toString().length - 2);
      const numerator = this.posValue * denominator;
      const divisor = gcd(numerator, denominator);
      this.denominator = denominator / divisor;
      this.numerator = this.negative ? -1 : 1 * (numerator / divisor);
      this.integer = false;
    }

    this.mixedNumber = {
      whole: null,
      fractional: null,
      string: '',
    };

    this.mixedNumber.whole = Math.floor(this.numerator / this.denominator);
    this.mixedNumber.fractional = this.posValue - this.mixedNumber.whole;

    this.string = `${Math.floor(this.numerator)}${this.integer ? '' : `/${Math.floor(this.denominator)}`}`;

    this.mixedNumber.string = Math.abs(this.posValue) < 1 ? this.string : `${this.mixedNumber.whole}${(this.integer) ? '' : ` ${new Fraction(this.mixedNumber.fractional).string}`}`;
  }
}

module.exports = Fraction;
