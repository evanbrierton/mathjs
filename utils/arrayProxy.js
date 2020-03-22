class ArrayProxy extends Array {
  constructor(accessor, entries, methods = []) {
    if (entries.length === 1 && typeof entries[0] === 'number') {
      super(entries[0].toString());
      this[0] = +this[0];
    } else super(...entries);
    return new Proxy(
      this,
      {
        get: (target, key) => {
          if (typeof key === 'string' && /^-?\d+$/.test(key)) return accessor(target, key);
          return typeof target[key] === 'function' && !methods.includes(key) ? () => {
            target[key].call(entries);
            return target[key]();
          } : target[key];
        },
      },
    );
  }
}

module.exports = ArrayProxy;
