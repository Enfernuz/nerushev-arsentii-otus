// The target function's implementation:
function sum (num) {

  let result = 0;
  const accumulator = function (x) {

    if (x === undefined) {
      return result;
    } else if (typeof x !== 'number') {
      throw new Error('The argument is defined and is not a number.');
    }

    result += x;
    return accumulator;
  };

  return accumulator(num);
};

// Helper functions used in the unit tests:
function check (condition) {
  return condition ? 'PASSED' : 'FAILED';
};

function assertEquals (actual, expected) {
  console.log('assertEquals: ' + check(actual === expected));
};

function assertThrowsError (expr, errorMatcher) {

  try {
    expr();
    console.log("assertThrowsError: FAILED");
  } catch (e) {

    if (typeof errorMatcher === 'function') {
      console.log('assertThrowsError: ' + check(errorMatcher(e)));
      return;
    }

    console.log("assertThrowsError: PASSED");
  }
};

// The unit tests:
assertEquals(sum(1)(2)(3)(4)(5)(), (1 + 2 + 3 + 4 + 5));
assertEquals(sum(1)(5)(0)(18)(7)(), (1 + 5 + 0 + 18 + 7));
assertEquals(sum(10)(9)(8)(7)(6)(5)(4)(3)(2)(1)(0)(), (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10));
assertEquals(sum(), 0);
// Well, e or e.message could be null or undefined but that's enough for the start
assertThrowsError(() => sum('7'), (e) => e.message === 'The argument is defined and is not a number.');
assertThrowsError(() => sum()(), (e) => e.message.includes('is not a function'));
assertThrowsError(() => sum(2)(3)()(11), (e) => e.message.includes('is not a function'));
