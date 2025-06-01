const { Readable, Writable, Duplex, Transform } = require('stream');

// 1. Readable Stream: emits a sentence
const readable = new Readable({
  read() {
    this.push('hello stream world');
    this.push(null); // No more data
  }
});

// 2. Transform Stream: uppercase everything
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// 3. Duplex Stream: logs data and forwards it
const loggerDuplex = new Duplex({
  write(chunk, encoding, callback) {
    console.log(`📥 Logger (in): ${chunk.toString()}`);
    callback();
  },
  read() {
    // No readable side for demo
  }
});

// 4. Writable Stream: writes final output
const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log(`📤 Writable (out): ${chunk.toString()}`);
    callback();
  }
});

// 🧩 Pipe them together
readable
  .pipe(upperCaseTransform)
  .pipe(loggerDuplex) // logs it
  .pipe(writable);    // writes it
