import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-types',
  title: '2. Types & Coercion',
  explanation: `## Types & Coercion

JavaScript is **dynamically typed** -- variables can hold any type, and types can change at runtime.

### Primitive Types
There are 7 primitive types: \`string\`, \`number\`, \`boolean\`, \`undefined\`, \`null\`, \`symbol\`, \`bigint\`.

### typeof Operator
\`typeof\` returns a string indicating the type. Beware: \`typeof null === 'object'\` (a historical bug).

### Type Coercion
JavaScript implicitly converts types when operators expect a certain type:
- \`+\` with a string converts the other operand to string
- \`-\`, \`*\`, \`/\` convert operands to numbers
- \`==\` (abstract equality) coerces, \`===\` (strict equality) does not

### Truthy & Falsy
Falsy values: \`false\`, \`0\`, \`-0\`, \`0n\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`. Everything else is truthy.

### Utility Functions
- \`Number()\`, \`String()\`, \`Boolean()\` -- explicit conversion
- \`parseInt()\`, \`parseFloat()\` -- parse strings to numbers
- \`Number.isNaN()\` vs global \`isNaN()\` -- the global one coerces first
- \`Object.is()\` -- same-value equality (handles NaN and -0)
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-types-1',
      title: 'typeof string',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the result of typeof on a string.',
      skeleton: `console.log(typeof 'hello'); // "__BLANK__"`,
      solution: `console.log(typeof 'hello'); // "string"`,
      hints: [
        'typeof returns a string representation of the type.',
        'A string literal like "hello" is of type...',
        'The answer is `string`.',
      ],
      concepts: ['typeof', 'string', 'primitives'],
    },
    {
      id: 'js-types-2',
      title: 'typeof null',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the (surprising) result of typeof null.',
      skeleton: `console.log(typeof null); // "__BLANK__"`,
      solution: `console.log(typeof null); // "object"`,
      hints: [
        'This is a well-known historical bug in JavaScript.',
        'typeof null does not return "null".',
        'It returns `"object"`.',
      ],
      concepts: ['typeof', 'null', 'type quirks'],
    },
    {
      id: 'js-types-3',
      title: 'Loose equality coercion',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the boolean result of loose equality between a string and a number.',
      skeleton: `console.log(0 == ''); // __BLANK__`,
      solution: `console.log(0 == ''); // true`,
      hints: [
        'The == operator performs type coercion.',
        'An empty string coerces to 0 when compared to a number.',
        'The result is `true`.',
      ],
      concepts: ['==', 'type coercion', 'abstract equality'],
    },
    {
      id: 'js-types-4',
      title: 'NaN identity',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the result of NaN compared to itself.',
      skeleton: `console.log(NaN === NaN); // __BLANK__`,
      solution: `console.log(NaN === NaN); // false`,
      hints: [
        'NaN is special in JavaScript.',
        'NaN is the only value that is not equal to itself.',
        'The result is `false`.',
      ],
      concepts: ['NaN', 'strict equality', 'IEEE 754'],
    },
    {
      id: 'js-types-5',
      title: 'Boolean constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the explicit boolean conversion result.',
      skeleton: `console.log(Boolean(0));    // __BLANK__
console.log(Boolean('0'));  // __BLANK__`,
      solution: `console.log(Boolean(0));    // false
console.log(Boolean('0'));  // true`,
      hints: [
        '0 is a falsy value.',
        'Any non-empty string is truthy, even "0".',
        'Results: false, true.',
      ],
      concepts: ['Boolean', 'truthy', 'falsy', 'type conversion'],
    },
    {
      id: 'js-types-6',
      title: 'Object.is vs ===',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fill in where Object.is differs from ===.',
      skeleton: `console.log(Object.is(NaN, NaN)); // __BLANK__
console.log(Object.is(0, -0));    // __BLANK__`,
      solution: `console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0));    // false`,
      hints: [
        'Object.is uses same-value equality.',
        'Unlike ===, Object.is(NaN, NaN) returns true.',
        'Unlike ===, Object.is(0, -0) returns false.',
      ],
      concepts: ['Object.is', 'same-value equality', 'NaN', '-0'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-types-7',
      title: 'Type checker function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `getType(val)` that returns the typeof the value, but correctly returns "null" for null.',
      skeleton: `function getType(val) {
  // Return the type as a string, handling null correctly
}
`,
      solution: `function getType(val) {
  if (val === null) return 'null';
  return typeof val;
}`,
      hints: [
        'typeof null returns "object", which is incorrect.',
        'Check for null explicitly first.',
        'Use `val === null` before falling back to typeof.',
      ],
      concepts: ['typeof', 'null', 'type checking'],
    },
    {
      id: 'js-types-8',
      title: 'Safe number parser',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `safeParseInt(str)` that parses a string to an integer (base 10), returning 0 if the result is NaN.',
      skeleton: `function safeParseInt(str) {
  // Parse and return 0 if not a number
}
`,
      solution: `function safeParseInt(str) {
  const n = parseInt(str, 10);
  return Number.isNaN(n) ? 0 : n;
}`,
      hints: [
        'Use parseInt with radix 10.',
        'Check the result with Number.isNaN().',
        'Return 0 if NaN, otherwise the parsed number.',
      ],
      concepts: ['parseInt', 'Number.isNaN', 'NaN', 'radix'],
    },
    {
      id: 'js-types-9',
      title: 'Truthy filter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `truthyValues(arr)` that returns a new array with only the truthy values.',
      skeleton: `function truthyValues(arr) {
  // Return only truthy values
}
`,
      solution: `function truthyValues(arr) {
  return arr.filter(Boolean);
}`,
      hints: [
        'Array.filter takes a callback that returns true/false.',
        'The Boolean function converts values to true/false.',
        'Pass Boolean directly as the filter callback.',
      ],
      concepts: ['truthy', 'falsy', 'Boolean', 'Array.filter'],
    },
    {
      id: 'js-types-10',
      title: 'Strict type comparator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `strictEquals(a, b)` that mimics === but also returns true for NaN === NaN. Use Object.is for NaN and standard === for everything else.',
      skeleton: `function strictEquals(a, b) {
  // Handle NaN case, otherwise use ===
}
`,
      solution: `function strictEquals(a, b) {
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  return a === b;
}`,
      hints: [
        'NaN === NaN is false, but we want it to be true.',
        'Check if both values are NaN using Number.isNaN.',
        'For all other values, just use ===.',
      ],
      concepts: ['NaN', 'Object.is', 'strict equality', 'Number.isNaN'],
    },
    {
      id: 'js-types-11',
      title: 'Coercion-safe comparison',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `looseEquals(a, b)` that returns the same result as `a == b` but using only explicit conversions and ===.',
      skeleton: `function looseEquals(a, b) {
  // Convert both to the same type, then compare with ===
  // Handle: number/string comparison only
}
`,
      solution: `function looseEquals(a, b) {
  return Number(a) === Number(b);
}`,
      hints: [
        'When == compares a number and a string, it converts the string to a number.',
        'You can use Number() to explicitly convert both.',
        'Then compare with ===.',
      ],
      concepts: ['type coercion', '==', '===', 'Number'],
    },
    {
      id: 'js-types-12',
      title: 'BigInt factorial',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `bigFactorial(n)` that computes factorial using BigInt to avoid overflow. `n` is a regular number.',
      skeleton: `function bigFactorial(n) {
  // Return n! as a BigInt
}
`,
      solution: `function bigFactorial(n) {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}`,
      hints: [
        'Use BigInt literals (suffix n) or the BigInt() constructor.',
        'Start with 1n and multiply in a loop.',
        'Convert n to BigInt for comparison: BigInt(n).',
      ],
      concepts: ['BigInt', 'factorial', 'overflow', 'type conversion'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-types-13',
      title: 'Fix: isNaN confusion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code incorrectly identifies "hello" as NaN using the global isNaN. Fix it to use the correct check.',
      skeleton: `function isReallyNaN(val) {
  return isNaN(val); // incorrectly returns true for "hello"
}
console.log(isReallyNaN('hello')); // should be false
console.log(isReallyNaN(NaN));     // should be true`,
      solution: `function isReallyNaN(val) {
  return Number.isNaN(val);
}
console.log(isReallyNaN('hello')); // false
console.log(isReallyNaN(NaN));     // true`,
      hints: [
        'Global isNaN coerces its argument to a number first.',
        'Number.isNaN does not coerce and only returns true for actual NaN.',
        'Replace `isNaN` with `Number.isNaN`.',
      ],
      concepts: ['isNaN', 'Number.isNaN', 'type coercion'],
    },
    {
      id: 'js-types-14',
      title: 'Fix: equality check',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This code uses == where === is needed. The function should return true only when value and type both match.',
      skeleton: `function isZero(val) {
  return val == 0; // Bug: '' == 0 is true
}
console.log(isZero(0));   // true
console.log(isZero(''));  // should be false`,
      solution: `function isZero(val) {
  return val === 0;
}
console.log(isZero(0));   // true
console.log(isZero(''));  // false`,
      hints: [
        '== performs type coercion.',
        'An empty string coerces to 0 with ==.',
        'Change == to === to prevent coercion.',
      ],
      concepts: ['==', '===', 'type coercion', 'strict equality'],
    },
    {
      id: 'js-types-15',
      title: 'Fix: parseInt without radix',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code parses "08" but may produce unexpected results in older environments without a radix. Fix it.',
      skeleton: `const month = parseInt('08');
console.log(month); // should be 8`,
      solution: `const month = parseInt('08', 10);
console.log(month); // 8`,
      hints: [
        'parseInt can interpret leading zeros as octal in older JS.',
        'Always specify the radix parameter.',
        'Add 10 as the second argument.',
      ],
      concepts: ['parseInt', 'radix', 'octal'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-types-16',
      title: 'Predict: string + number',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `console.log('5' + 3);
console.log('5' - 3);`,
      solution: `53
2`,
      hints: [
        '+ with a string concatenates.',
        '- with a string converts to number.',
        'First line: "53", second line: 2.',
      ],
      concepts: ['type coercion', 'string concatenation', 'arithmetic'],
    },
    {
      id: 'js-types-17',
      title: 'Predict: double negation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `console.log(!!0);
console.log(!!'');
console.log(!!'false');
console.log(!!null);`,
      solution: `false
false
true
false`,
      hints: [
        '!! converts any value to its boolean equivalent.',
        '0 and "" are falsy. null is falsy.',
        '"false" is a non-empty string, so it is truthy.',
      ],
      concepts: ['double negation', 'truthy', 'falsy', 'boolean coercion'],
    },
    {
      id: 'js-types-18',
      title: 'Predict: unary plus',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `console.log(+true);
console.log(+'');
console.log(+null);
console.log(+undefined);`,
      solution: `1
0
0
NaN`,
      hints: [
        'Unary + converts to number.',
        'true becomes 1, "" becomes 0, null becomes 0.',
        'undefined becomes NaN.',
      ],
      concepts: ['unary plus', 'type coercion', 'Number conversion'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-types-19',
      title: 'Refactor: explicit type checks',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor the type-checking code to use a cleaner pattern.',
      skeleton: `function describe(val) {
  if (typeof val === 'string') {
    return 'string';
  } else if (typeof val === 'number') {
    return 'number';
  } else if (typeof val === 'boolean') {
    return 'boolean';
  } else if (val === null) {
    return 'null';
  } else if (typeof val === 'undefined') {
    return 'undefined';
  } else {
    return 'object';
  }
}`,
      solution: `function describe(val) {
  if (val === null) return 'null';
  return typeof val;
}`,
      hints: [
        'Most of these branches just return typeof val.',
        'The only special case is null (typeof null === "object").',
        'Check for null first, then return typeof for everything else.',
      ],
      concepts: ['typeof', 'null', 'type checking', 'refactoring'],
    },
    {
      id: 'js-types-20',
      title: 'Refactor: remove coercion reliance',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this code to use explicit conversions and strict equality instead of relying on coercion.',
      skeleton: `function process(input) {
  if (input == null) return 'empty';
  if (input == 0) return 'zero';
  if (input == true) return 'truthy-one';
  return 'other';
}`,
      solution: `function process(input) {
  if (input === null || input === undefined) return 'empty';
  if (Number(input) === 0) return 'zero';
  if (Number(input) === 1) return 'truthy-one';
  return 'other';
}`,
      hints: [
        '`== null` matches both null and undefined. Make that explicit.',
        '`== 0` coerces strings and booleans. Use Number() and ===.',
        '`== true` coerces true to 1. Use Number() conversion explicitly.',
      ],
      concepts: ['==', '===', 'type coercion', 'explicit conversion', 'refactoring'],
    },
  ],
};
