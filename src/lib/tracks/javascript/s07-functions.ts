import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-functions',
  title: '7. Functions',
  explanation: `## Functions

Functions are the fundamental building blocks of JavaScript programs.

### Declaration vs Expression
\`\`\`js
function greet(name) { return 'Hi ' + name; }  // declaration (hoisted)
const greet = function(name) { return 'Hi ' + name; };  // expression (not hoisted)
\`\`\`

### Parameters
- **Default parameters**: \`function foo(x = 10) {}\`
- **Rest parameters**: \`function foo(...args) {}\` -- gathers remaining args into an array
- **arguments object**: array-like object available in non-arrow functions

### Return Values
A function without a \`return\` statement returns \`undefined\`.

### First-Class Functions
Functions are values: assign to variables, pass as arguments, return from functions.

### Higher-Order Functions
Functions that take or return other functions: \`map\`, \`filter\`, callbacks.

### IIFE (Immediately Invoked Function Expression)
\`\`\`js
(function() { /* runs immediately */ })();
\`\`\`

### Function Properties
- \`function.name\` -- the function's name
- \`function.length\` -- number of expected parameters (before rest/default)

### Pure Functions & Side Effects
A pure function returns the same output for the same input and has no side effects.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-fn-1',
      title: 'Function declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the keyword to declare a function.',
      skeleton: `__BLANK__ add(a, b) {
  return a + b;
}`,
      solution: `function add(a, b) {
  return a + b;
}`,
      hints: [
        'You need the keyword that declares a function.',
        'It starts with "f".',
        'The keyword is `function`.',
      ],
      concepts: ['function declaration', 'function keyword'],
    },
    {
      id: 'js-fn-2',
      title: 'Default parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add a default value for the greeting parameter.',
      skeleton: `function greet(name, greeting __BLANK__ 'Hello') {
  return greeting + ', ' + name;
}
console.log(greet('Zan')); // "Hello, Zan"`,
      solution: `function greet(name, greeting = 'Hello') {
  return greeting + ', ' + name;
}
console.log(greet('Zan')); // "Hello, Zan"`,
      hints: [
        'Default parameters use an assignment operator.',
        'The syntax is `param = defaultValue`.',
        'Use `=`.',
      ],
      concepts: ['default parameters', 'function parameters'],
    },
    {
      id: 'js-fn-3',
      title: 'Rest parameters',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use rest parameters to collect all arguments.',
      skeleton: `function sum(__BLANK__nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3)); // 6`,
      solution: `function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3)); // 6`,
      hints: [
        'Rest parameters use three dots before the parameter name.',
        'It gathers remaining arguments into an array.',
        'Use `...`.',
      ],
      concepts: ['rest parameters', 'spread/rest', 'variadic function'],
    },
    {
      id: 'js-fn-4',
      title: 'Function expression',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Assign an anonymous function to a variable.',
      skeleton: `const multiply = __BLANK__(a, b) {
  return a * b;
};`,
      solution: `const multiply = function(a, b) {
  return a * b;
};`,
      hints: [
        'A function expression assigns a function to a variable.',
        'The function keyword comes after the assignment.',
        'Use `function`.',
      ],
      concepts: ['function expression', 'anonymous function'],
    },
    {
      id: 'js-fn-5',
      title: 'IIFE syntax',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Complete the IIFE syntax.',
      skeleton: `const result = __BLANK__function() {
  return 42;
}__BLANK__;
console.log(result); // 42`,
      solution: `const result = (function() {
  return 42;
})();
console.log(result); // 42`,
      hints: [
        'An IIFE wraps the function in parentheses and immediately calls it.',
        'The first blank wraps with `(`, the second calls with `)(`.',
        'Use `(` and `)()`.',
      ],
      concepts: ['IIFE', 'immediately invoked function expression'],
    },
    {
      id: 'js-fn-6',
      title: 'function.length',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fill in the property that returns the number of expected parameters.',
      skeleton: `function foo(a, b, c) {}
console.log(foo.__BLANK__); // 3`,
      solution: `function foo(a, b, c) {}
console.log(foo.length); // 3`,
      hints: [
        'Functions have a property indicating parameter count.',
        'It counts parameters before any rest or default params.',
        'The property is `length`.',
      ],
      concepts: ['function.length', 'function properties'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-fn-7',
      title: 'Higher-order: apply function twice',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `applyTwice(fn, value)` that applies fn to value, then applies fn to the result.',
      skeleton: `function applyTwice(fn, value) {
  // Apply fn twice
}
// applyTwice(x => x * 2, 3) => 12
`,
      solution: `function applyTwice(fn, value) {
  return fn(fn(value));
}`,
      hints: [
        'Call fn with value, then call fn again with that result.',
        'Functions are first-class: you can call the fn parameter.',
        '`return fn(fn(value))`.',
      ],
      concepts: ['higher-order functions', 'first-class functions'],
    },
    {
      id: 'js-fn-8',
      title: 'Callback pattern',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `processItems(items, callback)` that calls callback on each item and returns an array of results.',
      skeleton: `function processItems(items, callback) {
  // Process each item with callback
}
`,
      solution: `function processItems(items, callback) {
  const results = [];
  for (const item of items) {
    results.push(callback(item));
  }
  return results;
}`,
      hints: [
        'Create an empty results array.',
        'Loop through items and push callback(item) to results.',
        'This is essentially what Array.map does.',
      ],
      concepts: ['callbacks', 'higher-order functions', 'iteration'],
    },
    {
      id: 'js-fn-9',
      title: 'Function that returns a function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `multiplier(factor)` that returns a new function which multiplies its argument by factor.',
      skeleton: `function multiplier(factor) {
  // Return a function that multiplies by factor
}
// const double = multiplier(2);
// double(5) => 10
`,
      solution: `function multiplier(factor) {
  return function(n) {
    return n * factor;
  };
}`,
      hints: [
        'Return a function from inside multiplier.',
        'The returned function has access to factor via closure.',
        'Return `function(n) { return n * factor; }`.',
      ],
      concepts: ['closure', 'higher-order functions', 'factory function'],
    },
    {
      id: 'js-fn-10',
      title: 'Once function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `once(fn)` that returns a new function which calls fn only on the first invocation. Subsequent calls return the first result.',
      skeleton: `function once(fn) {
  // Return a function that calls fn only once
}
`,
      solution: `function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}`,
      hints: [
        'Use a flag to track if fn has been called.',
        'Store the result of the first call.',
        'On subsequent calls, return the stored result.',
      ],
      concepts: ['closure', 'higher-order functions', 'memoisation'],
    },
    {
      id: 'js-fn-11',
      title: 'Pipe function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `pipe(...fns)` that returns a new function which applies the functions left to right.',
      skeleton: `function pipe(...fns) {
  // Return a function that pipes value through all fns
}
// pipe(x => x + 1, x => x * 2)(5) => 12
`,
      solution: `function pipe(...fns) {
  return function(value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}`,
      hints: [
        'Use reduce to chain function calls.',
        'Start with the initial value and apply each function.',
        '`fns.reduce((acc, fn) => fn(acc), value)`.',
      ],
      concepts: ['pipe', 'function composition', 'reduce', 'higher-order functions'],
    },
    {
      id: 'js-fn-12',
      title: 'Pure function check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Rewrite this impure function as a pure function. The original mutates the input array.',
      skeleton: `// Impure: mutates input
function addItem(arr, item) {
  arr.push(item);
  return arr;
}
// Write a pure version:
function addItemPure(arr, item) {
  // Return new array without mutating arr
}
`,
      solution: `function addItemPure(arr, item) {
  return [...arr, item];
}`,
      hints: [
        'A pure function should not modify its inputs.',
        'Create a new array instead of mutating.',
        'Use spread: `[...arr, item]`.',
      ],
      concepts: ['pure functions', 'immutability', 'spread operator'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-fn-13',
      title: 'Fix: missing return',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This function does not return anything. Fix it.',
      skeleton: `function square(n) {
  n * n;
}
console.log(square(5)); // should be 25, not undefined`,
      solution: `function square(n) {
  return n * n;
}
console.log(square(5)); // 25`,
      hints: [
        'The function computes n * n but does not return it.',
        'Without return, a function returns undefined.',
        'Add `return` before the expression.',
      ],
      concepts: ['return', 'undefined', 'function'],
    },
    {
      id: 'js-fn-14',
      title: 'Fix: hoisting trap',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to call a function expression before it is defined. Fix it.',
      skeleton: `console.log(double(5)); // TypeError: double is not a function

const double = function(n) {
  return n * 2;
};`,
      solution: `const double = function(n) {
  return n * 2;
};

console.log(double(5)); // 10`,
      hints: [
        'Function expressions assigned to const/let are not hoisted.',
        'Only function declarations are hoisted.',
        'Move the call after the definition.',
      ],
      concepts: ['hoisting', 'function expression', 'TDZ'],
    },
    {
      id: 'js-fn-15',
      title: 'Fix: arguments in strict mode',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This function uses arguments but arrow functions do not have their own arguments. Convert to a regular function.',
      skeleton: `const sum = () => {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
};
console.log(sum(1, 2, 3)); // ReferenceError`,
      solution: `const sum = function() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
};
console.log(sum(1, 2, 3)); // 6`,
      hints: [
        'Arrow functions do not have their own `arguments` object.',
        'Convert to a regular function expression.',
        'Or better yet, use rest parameters: `(...args)`.',
      ],
      concepts: ['arrow functions', 'arguments object', 'function expression'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-fn-16',
      title: 'Predict: hoisting',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `console.log(greet('Zan'));

function greet(name) {
  return 'Hello, ' + name;
}`,
      solution: `Hello, Zan`,
      hints: [
        'Function declarations are hoisted.',
        'The function is available before its definition in the code.',
        'The output is "Hello, Zan".',
      ],
      concepts: ['hoisting', 'function declaration'],
    },
    {
      id: 'js-fn-17',
      title: 'Predict: default + rest params',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `function test(a, b = 10, ...rest) {
  console.log(a, b, rest);
}
test(1);`,
      solution: `1 10 []`,
      hints: [
        'a gets 1, b uses default 10, rest collects nothing.',
        'rest is an empty array when no extra arguments are passed.',
        'Output: 1 10 [].',
      ],
      concepts: ['default parameters', 'rest parameters'],
    },
    {
      id: 'js-fn-18',
      title: 'Predict: function name property',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const foo = function bar() {};
console.log(foo.name);`,
      solution: `bar`,
      hints: [
        'Named function expressions have a name property.',
        'The name comes from the function itself, not the variable.',
        'The output is "bar".',
      ],
      concepts: ['named function expression', 'function.name'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-fn-19',
      title: 'Refactor: callback to named function',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor the inline callback to a named function for clarity.',
      skeleton: `const results = data.map(function(item) {
  return {
    id: item.id,
    name: item.firstName + ' ' + item.lastName,
    active: item.status === 'active',
  };
});`,
      solution: `function formatUser(item) {
  return {
    id: item.id,
    name: item.firstName + ' ' + item.lastName,
    active: item.status === 'active',
  };
}

const results = data.map(formatUser);`,
      hints: [
        'Extract the inline function into a named function.',
        'Give it a descriptive name.',
        'Pass the function reference to map.',
      ],
      concepts: ['named functions', 'refactoring', 'readability'],
    },
    {
      id: 'js-fn-20',
      title: 'Refactor: repeated logic to higher-order',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'These two functions share similar logic. Refactor into a higher-order function.',
      skeleton: `function doubleAll(arr) {
  const result = [];
  for (const n of arr) result.push(n * 2);
  return result;
}

function squareAll(arr) {
  const result = [];
  for (const n of arr) result.push(n * n);
  return result;
}`,
      solution: `function mapArray(arr, transform) {
  const result = [];
  for (const n of arr) result.push(transform(n));
  return result;
}

const doubleAll = (arr) => mapArray(arr, n => n * 2);
const squareAll = (arr) => mapArray(arr, n => n * n);`,
      hints: [
        'Both functions loop and transform each element.',
        'Extract the transformation as a parameter.',
        'Create a generic mapArray(arr, transform) function.',
      ],
      concepts: ['higher-order functions', 'DRY', 'refactoring'],
    },
  ],
};
