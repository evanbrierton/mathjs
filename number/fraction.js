const { gcd } = require('../utils');

class Fraction {
  constructor(n) {
    this.value = n;

    if (parseFloat(n) === parseInt(n, 10)) {
      this.numerator = n;
      this.denominator = 1;
      this.integer = true;
    } else {
      const denominator = 10 ** n.toString().length - 2;
      const numerator = n * denominator;
      const divisor = gcd(numerator, denominator);
      this.denominator = denominator / divisor;
      this.numerator = numerator / divisor;
      this.integer = false;
    }

    this.mixedNumber = {
      whole: null,
      fractional: null,
      string: '',
    };

    if (this.numerator > this.denominator) {
      this.mixedNumber.whole = Math.floor(this.numerator / this.denominator);
      this.mixedNumber.fractional = n - this.mixedNumber.whole;
      this.mixedNumber.string = `${this.mixedNumber.whole}${this.integer ? '' : ` ${new Fraction(this.mixedNumber.fractional).string}`}`;
    }

    this.string = `${Math.floor(this.numerator)}${this.integer ? '' : `/${Math.floor(this.denominator)}`}`;
  }
}

module.exports = Fraction;
