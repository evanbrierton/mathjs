class Complex {
  constructor(re, im = 0) {
    this.re = re;
    this.im = im;
  }

  rect() {
    const { re, im } = this;
    return `${re} + ${im}i`;
  }

  arg() {
    const { re, im } = this;
    return Math.atan2(im, re);
  }

  mod() {
    const { re, im } = this;
    return Math.sqrt((re ** 2) + (im ** 2));
  }

  pol() {
    return `${this.mod()}(cos${this.arg()}+isin${this.arg()})`;
  }

  exp() {
    return `${this.mod()}e^${this.arg()}i`;
  }

  conjugate() {
    const { re, im } = this;
    return new Complex(re, -im);
  }

  multiply(z) {
    const { re, im } = this;
    return new Complex((z.re * re) - (z.im * im), (z.re * im) + (z.im * re));
  }

  add(z) {
    const { re, im } = this;
    return new Complex(z.re + re, z.im + im);
  }

  subtract(z) {
    const { re, im } = this;
    return new Complex(z.re - re, z.im - im);
  }

  divide(z) {
    const { re, im } = this;
    return new Complex(
      ((z.re * re) + (z.im * im)) / ((z.re ** 2) + (z.im ** 2)),
      ((z.re * im) + (z.im * re)) / ((z.re ** 2) + (z.im ** 2)),
    );
  }
}

module.exports = Complex;
