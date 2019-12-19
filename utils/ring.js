class Ring extends Array {
  constructor(...args) {
    super(...args);
    return new Proxy(
      this,
      {
        get: (target, key) => (
          typeof key === 'string' && /^-?\d+$/.test(key)
            ? target[((key % target.length) + target.length) % target.length]
            : target[key]
        ),
      },
    );
  }
}

module.exports = Ring;
