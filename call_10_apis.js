function promiseFunction(i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (i % 2 === 0) {
        resolve(i);
      } else {
        reject(`Error: ${i}`);
      }
    }, i * 1000);
  });
}

const promises = [];

for (let i = 1; i <= 10; ++i) {
  promises.push(promiseFunction(i));
}

(async () => {
  try {
    const result = await Promise.allSettled(promises);
    console.log(`Result: ${JSON.stringify(result)}`);
  } catch (err) {
    console.log(err);
  }
})();
