'use strict';

// async functions
var fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1)
};
  
var fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
});

var fn3 = () => new Promise(resolve => {
  console.log('fn3')
  setTimeout(() => resolve(3), 500)
});

// implementation with async/await
async function promiseReduceAsync(asyncFunctions, reduce, initialValue) {

  let memo = initialValue
  for (const asyncFunction of asyncFunctions) { 
    memo = reduce(memo, await asyncFunction())
  }

  return memo
};

// implementation without async/await
function promiseReduce(asyncFunctions, reduce, initialValue) {

  const asyncFunctionsSupplier = function* () {
    for (let i = 0; i < asyncFunctions.length; i++) {
      yield asyncFunctions[i];
    }
  }();

  const executeNextAsyncTask = (memo) => {

    const asyncFunction = asyncFunctionsSupplier.next()
    if (asyncFunction.done) {
      return new Promise(resolve => resolve(memo))
    }

    return new Promise(resolve => asyncFunction.value().then(value => {resolve(reduce(memo, value))}))
                  .then(executeNextAsyncTask)
  };

  return executeNextAsyncTask(initialValue);
};

// tests
const runWithoutAsyncAwait = () => {

  console.log("invoking promiseReduce...")
  return promiseReduce(
    [fn1, fn2, fn3],
    function (memo, value) {
      console.log(`reduce in promiseReduce: memo = ${memo}, value = ${value}`)
      return memo * value
    },
    1)
    .then(console.log)
};

const runWithAsyncAwait = () => {

  console.log("invoking promiseReduceAsync...")
  return promiseReduceAsync(
    [fn1, fn2, fn3],
    function (memo, value) {
      console.log(`reduce in promiseReduceAsync: memo = ${memo}, value = ${value}`)
      return memo * value
    },
    1)
    .then(console.log);
};

runWithoutAsyncAwait().then(_ => console.log('\n\n\n')).then(runWithAsyncAwait)
