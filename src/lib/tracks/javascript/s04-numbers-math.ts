import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-numbers',
  title: '4. Numbers & Math',
  explanation: `## Numbers & Math

JavaScript uses **IEEE 754 double-precision** floating point for all numbers. This gives 64 bits of storage per number.

### Key Properties
- Safe integer range: \`-(2^53 - 1)\` to \`2^53 - 1\` (\`Number.MAX_SAFE_INTEGER\`)
- \`Number.EPSILON\` -- smallest difference between two representable numbers
- \`Infinity\`, \`-Infinity\`, \`NaN\` are all of type \`number\`

### Parsing
- \`parseInt(str, radix)\` -- parse integer from string (always specify radix!)
- \`parseFloat(str)\` -- parse floating-point from string
- \`Number(val)\` -- strict conversion (rejects trailing garbage)

### Number Methods
\`Number.isInteger()\`, \`Number.isFinite()\`, \`Number.isNaN()\`, \`Number.isSafeInteger()\`

### Math Object
Static methods: \`Math.floor\`, \`Math.ceil\`, \`Math.round\`, \`Math.trunc\`, \`Math.abs\`, \`Math.min\`, \`Math.max\`, \`Math.pow\`, \`Math.sqrt\`, \`Math.random\`, \`Math.sign\`, \`Math.log\`, \`Math.log2\`, \`Math.log10\`

### Formatting
\`toFixed(digits)\`, \`toPrecision(digits)\`, \`toLocaleString(locale, options)\`

### BigInt
For integers beyond the safe range, use BigInt: \`123n\` or \`BigInt(123)\`. BigInt cannot be mixed with Number in arithmetic.

### Numeric Separators
\`1_000_000\` is valid and equals \`1000000\` -- improves readability.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-num-1',
      title: 'Math.floor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the Math method that rounds down.',
      skeleton: `console.log(Math.__BLANK__(4.7)); // 4`,
      solution: `console.log(Math.floor(4.7)); // 4`,
      hints: [
        'You need a method that rounds toward negative infinity.',
        'It always rounds down, never up.',
        'The method is `floor`.',
      ],
      concepts: ['Math.floor', 'rounding'],
    },
    {
      id: 'js-num-2',
      title: 'Number.isInteger',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Check if a value is an integer.',
      skeleton: `console.log(Number.__BLANK__(42));   // true
console.log(Number.__BLANK__(42.5)); // false`,
      solution: `console.log(Number.isInteger(42));   // true
console.log(Number.isInteger(42.5)); // false`,
      hints: [
        'You need a method on the Number object.',
        'It returns true only for integer values.',
        'Use `isInteger`.',
      ],
      concepts: ['Number.isInteger', 'type checking'],
    },
    {
      id: 'js-num-3',
      title: 'toFixed formatting',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Format a number to exactly 2 decimal places.',
      skeleton: `const price = 9.9;
console.log(price.__BLANK__(2)); // "9.90"`,
      solution: `const price = 9.9;
console.log(price.toFixed(2)); // "9.90"`,
      hints: [
        'You need a method that formats a number with a fixed number of decimal places.',
        'It returns a string.',
        'The method is `toFixed`.',
      ],
      concepts: ['Number.toFixed', 'number formatting'],
    },
    {
      id: 'js-num-4',
      title: 'Numeric separator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the numeric separator syntax for one million.',
      skeleton: `const million = 1__BLANK__000__BLANK__000;
console.log(million); // 1000000`,
      solution: `const million = 1_000_000;
console.log(million); // 1000000`,
      hints: [
        'JavaScript allows underscores in numeric literals for readability.',
        'They do not affect the value.',
        'Use `_` as the separator.',
      ],
      concepts: ['numeric separators', 'readability'],
    },
    {
      id: 'js-num-5',
      title: 'Number.isFinite',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the check for finite numbers.',
      skeleton: `console.log(Number.__BLANK__(42));       // true
console.log(Number.__BLANK__(Infinity)); // false`,
      solution: `console.log(Number.isFinite(42));       // true
console.log(Number.isFinite(Infinity)); // false`,
      hints: [
        'You need a method that checks if a value is a finite number.',
        'It returns false for Infinity, -Infinity, and NaN.',
        'Use `isFinite`.',
      ],
      concepts: ['Number.isFinite', 'Infinity'],
    },
    {
      id: 'js-num-6',
      title: 'MAX_SAFE_INTEGER',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fill in the property name for the maximum safe integer.',
      skeleton: `console.log(Number.__BLANK__); // 9007199254740991`,
      solution: `console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991`,
      hints: [
        'Safe integers can be exactly represented as IEEE 754 doubles.',
        'This is 2^53 - 1.',
        'The property is `MAX_SAFE_INTEGER`.',
      ],
      concepts: ['Number.MAX_SAFE_INTEGER', 'IEEE 754', 'safe integers'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-num-7',
      title: 'Clamp a number',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `clamp(value, min, max)` that restricts a number to a range.',
      skeleton: `function clamp(value, min, max) {
  // Return value clamped between min and max
}
`,
      solution: `function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}`,
      hints: [
        'Use Math.max to enforce the minimum.',
        'Use Math.min to enforce the maximum.',
        'Nest them: `Math.min(Math.max(value, min), max)`.',
      ],
      concepts: ['Math.min', 'Math.max', 'clamping'],
    },
    {
      id: 'js-num-8',
      title: 'Random integer in range',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `randomInt(min, max)` that returns a random integer between min (inclusive) and max (inclusive).',
      skeleton: `function randomInt(min, max) {
  // Return random integer in [min, max]
}
`,
      solution: `function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}`,
      hints: [
        'Math.random() gives a number in [0, 1).',
        'Multiply by the range size and floor the result.',
        '`Math.floor(Math.random() * (max - min + 1)) + min`.',
      ],
      concepts: ['Math.random', 'Math.floor', 'random range'],
    },
    {
      id: 'js-num-9',
      title: 'Round to N decimal places',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `roundTo(num, decimals)` that rounds a number to a specified number of decimal places, returning a number (not a string).',
      skeleton: `function roundTo(num, decimals) {
  // Round to N decimal places
}
`,
      solution: `function roundTo(num, decimals) {
  const factor = 10 ** decimals;
  return Math.round(num * factor) / factor;
}`,
      hints: [
        'Multiply by 10^decimals, round, then divide back.',
        'Use Math.round for rounding.',
        '`Math.round(num * factor) / factor`.',
      ],
      concepts: ['Math.round', 'rounding', 'exponentiation'],
    },
    {
      id: 'js-num-10',
      title: 'Sum of digits',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `sumDigits(n)` that returns the sum of all digits in a non-negative integer.',
      skeleton: `function sumDigits(n) {
  // Return sum of digits
}
`,
      solution: `function sumDigits(n) {
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
      hints: [
        'Use modulo 10 to get the last digit.',
        'Divide by 10 and floor to remove the last digit.',
        'Repeat until n is 0.',
      ],
      concepts: ['modulo', 'Math.floor', 'digit extraction'],
    },
    {
      id: 'js-num-11',
      title: 'Format with locale',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `formatCurrency(amount, locale, currency)` that formats a number as currency using toLocaleString.',
      skeleton: `function formatCurrency(amount, locale, currency) {
  // Format as currency
}
// formatCurrency(1234.5, 'en-US', 'USD') => "$1,234.50"
`,
      solution: `function formatCurrency(amount, locale, currency) {
  return amount.toLocaleString(locale, { style: 'currency', currency });
}`,
      hints: [
        'toLocaleString accepts a locale and an options object.',
        'Set style to "currency" and pass the currency code.',
        'Use `{ style: "currency", currency }`.',
      ],
      concepts: ['Number.toLocaleString', 'currency formatting', 'internationalization'],
    },
    {
      id: 'js-num-12',
      title: 'Floating point comparison',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `nearlyEqual(a, b)` that checks if two floating point numbers are equal within Number.EPSILON.',
      skeleton: `function nearlyEqual(a, b) {
  // Return true if a and b are nearly equal
}
`,
      solution: `function nearlyEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}`,
      hints: [
        'Floating point arithmetic can produce tiny rounding errors.',
        'Compare the absolute difference against a small threshold.',
        'Use `Math.abs(a - b) < Number.EPSILON`.',
      ],
      concepts: ['Number.EPSILON', 'floating point', 'Math.abs', 'comparison'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-num-13',
      title: 'Fix: floating point addition',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This comparison fails due to floating point errors. Fix it.',
      skeleton: `const result = 0.1 + 0.2;
console.log(result === 0.3); // should be true`,
      solution: `const result = 0.1 + 0.2;
console.log(Math.abs(result - 0.3) < Number.EPSILON); // true`,
      hints: [
        '0.1 + 0.2 is not exactly 0.3 in IEEE 754.',
        'Compare using an epsilon threshold instead of ===.',
        'Use `Math.abs(result - 0.3) < Number.EPSILON`.',
      ],
      concepts: ['floating point', 'Number.EPSILON', 'IEEE 754'],
    },
    {
      id: 'js-num-14',
      title: 'Fix: NaN comparison',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This function tries to check for NaN using ===. Fix it.',
      skeleton: `function isNotANumber(val) {
  return val === NaN;
}
console.log(isNotANumber(NaN)); // should be true`,
      solution: `function isNotANumber(val) {
  return Number.isNaN(val);
}
console.log(isNotANumber(NaN)); // true`,
      hints: [
        'NaN is the only value not equal to itself.',
        'NaN === NaN is always false.',
        'Use Number.isNaN() instead.',
      ],
      concepts: ['NaN', 'Number.isNaN', 'equality'],
    },
    {
      id: 'js-num-15',
      title: 'Fix: BigInt mixed arithmetic',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This code throws a TypeError because it mixes BigInt and Number. Fix it.',
      skeleton: `const big = 100n;
const small = 5;
console.log(big + small); // TypeError`,
      solution: `const big = 100n;
const small = 5;
console.log(big + BigInt(small)); // 105n`,
      hints: [
        'BigInt and Number cannot be mixed in arithmetic.',
        'Convert one type to match the other.',
        'Convert small to BigInt: `BigInt(small)`.',
      ],
      concepts: ['BigInt', 'type conversion', 'TypeError'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-num-16',
      title: 'Predict: Math.trunc vs Math.floor',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `console.log(Math.trunc(-4.7));
console.log(Math.floor(-4.7));`,
      solution: `-4
-5`,
      hints: [
        'Math.trunc removes the decimal part.',
        'Math.floor rounds toward negative infinity.',
        'For -4.7: trunc gives -4, floor gives -5.',
      ],
      concepts: ['Math.trunc', 'Math.floor', 'negative numbers'],
    },
    {
      id: 'js-num-17',
      title: 'Predict: safe integer overflow',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const a = Number.MAX_SAFE_INTEGER;
console.log(a + 1 === a + 2);`,
      solution: `true`,
      hints: [
        'Beyond MAX_SAFE_INTEGER, integers lose precision.',
        'a + 1 and a + 2 may produce the same floating point value.',
        'The result is true because both round to the same value.',
      ],
      concepts: ['Number.MAX_SAFE_INTEGER', 'integer overflow', 'IEEE 754'],
    },
    {
      id: 'js-num-18',
      title: 'Predict: Infinity arithmetic',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `console.log(1 / 0);
console.log(-1 / 0);
console.log(0 / 0);`,
      solution: `Infinity
-Infinity
NaN`,
      hints: [
        'Dividing a positive number by 0 gives Infinity.',
        'Dividing a negative number by 0 gives -Infinity.',
        'Dividing 0 by 0 gives NaN.',
      ],
      concepts: ['Infinity', '-Infinity', 'NaN', 'division by zero'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-num-19',
      title: 'Refactor: Math.pow to exponentiation',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Refactor Math.pow calls to use the ** operator.',
      skeleton: `const squared = Math.pow(x, 2);
const cubed = Math.pow(x, 3);
const root = Math.pow(x, 0.5);`,
      solution: `const squared = x ** 2;
const cubed = x ** 3;
const root = x ** 0.5;`,
      hints: [
        'The ** operator was introduced in ES2016.',
        'It works exactly like Math.pow.',
        'Replace `Math.pow(x, n)` with `x ** n`.',
      ],
      concepts: ['exponentiation operator', 'Math.pow', 'refactoring'],
    },
    {
      id: 'js-num-20',
      title: 'Refactor: manual min/max to Math methods',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor the manual comparisons to use Math.min and Math.max.',
      skeleton: `function getRange(arr) {
  let min = Infinity;
  let max = -Infinity;
  for (const n of arr) {
    if (n < min) min = n;
    if (n > max) max = n;
  }
  return { min, max };
}`,
      solution: `function getRange(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
}`,
      hints: [
        'Math.min and Math.max accept multiple arguments.',
        'Use spread to pass array elements as arguments.',
        '`Math.min(...arr)` and `Math.max(...arr)`.',
      ],
      concepts: ['Math.min', 'Math.max', 'spread operator', 'refactoring'],
    },
  ],
};
