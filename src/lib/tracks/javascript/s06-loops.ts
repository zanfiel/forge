import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-loops',
  title: '6. Loops',
  explanation: `## Loops

Loops repeat a block of code until a condition is met.

### for Loop
\`\`\`js
for (let i = 0; i < 10; i++) { ... }
\`\`\`

### while / do-while
\`while\` checks before each iteration. \`do-while\` runs at least once.

### for...of
Iterates over **iterable** values (arrays, strings, Maps, Sets).
\`\`\`js
for (const item of [1, 2, 3]) { ... }
\`\`\`

### for...in
Iterates over **enumerable property names** (keys) of an object. Generally avoid for arrays.

### break & continue
- \`break\` exits the loop immediately
- \`continue\` skips to the next iteration
- Labeled statements allow breaking out of nested loops

### var vs let in loops
\`var\` in a for loop shares a single binding across iterations. \`let\` creates a new binding per iteration (critical for closures).

### Converting loops to methods
Many loops can be replaced with \`map\`, \`filter\`, \`reduce\`, \`forEach\`, etc.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-loop-1',
      title: 'Basic for loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the for loop syntax to iterate from 0 to 4.',
      skeleton: `for (__BLANK__ i = 0; i < 5; i++) {
  console.log(i);
}`,
      solution: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
      hints: [
        'You need a keyword to declare the loop variable.',
        'Use block-scoped declaration.',
        'The keyword is `let`.',
      ],
      concepts: ['for loop', 'let', 'iteration'],
    },
    {
      id: 'js-loop-2',
      title: 'for...of iteration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the correct for loop to iterate over array values.',
      skeleton: `const fruits = ['apple', 'banana', 'cherry'];
for (const fruit __BLANK__ fruits) {
  console.log(fruit);
}`,
      solution: `const fruits = ['apple', 'banana', 'cherry'];
for (const fruit of fruits) {
  console.log(fruit);
}`,
      hints: [
        'for...of iterates over values of an iterable.',
        'for...in iterates over keys.',
        'The keyword is `of`.',
      ],
      concepts: ['for...of', 'iteration', 'arrays'],
    },
    {
      id: 'js-loop-3',
      title: 'break keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the keyword to exit the loop when we find the target.',
      skeleton: `const nums = [1, 2, 3, 4, 5];
let found = -1;
for (let i = 0; i < nums.length; i++) {
  if (nums[i] === 3) {
    found = i;
    __BLANK__;
  }
}`,
      solution: `const nums = [1, 2, 3, 4, 5];
let found = -1;
for (let i = 0; i < nums.length; i++) {
  if (nums[i] === 3) {
    found = i;
    break;
  }
}`,
      hints: [
        'You want to stop the loop once the target is found.',
        'This keyword exits the loop immediately.',
        'Use `break`.',
      ],
      concepts: ['break', 'for loop', 'early exit'],
    },
    {
      id: 'js-loop-4',
      title: 'continue keyword',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the keyword to skip even numbers.',
      skeleton: `for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) __BLANK__;
  console.log(i); // only odd numbers
}`,
      solution: `for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue;
  console.log(i); // only odd numbers
}`,
      hints: [
        'You want to skip the rest of the loop body for even numbers.',
        'This keyword jumps to the next iteration.',
        'Use `continue`.',
      ],
      concepts: ['continue', 'for loop', 'skip iteration'],
    },
    {
      id: 'js-loop-5',
      title: 'for...in with objects',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the correct for loop to iterate over object keys.',
      skeleton: `const scores = { math: 90, science: 85, english: 92 };
for (const subject __BLANK__ scores) {
  console.log(subject, scores[subject]);
}`,
      solution: `const scores = { math: 90, science: 85, english: 92 };
for (const subject in scores) {
  console.log(subject, scores[subject]);
}`,
      hints: [
        'for...in iterates over enumerable property names.',
        'for...of would not work directly on a plain object.',
        'The keyword is `in`.',
      ],
      concepts: ['for...in', 'object keys', 'iteration'],
    },
    {
      id: 'js-loop-6',
      title: 'entries() with index',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use entries() to get both index and value in a for...of loop.',
      skeleton: `const colors = ['red', 'green', 'blue'];
for (const [index, color] of colors.__BLANK__()) {
  console.log(index, color);
}`,
      solution: `const colors = ['red', 'green', 'blue'];
for (const [index, color] of colors.entries()) {
  console.log(index, color);
}`,
      hints: [
        'You need a method that returns [index, value] pairs.',
        'It is an iterator method on arrays.',
        'Use `entries`.',
      ],
      concepts: ['Array.entries', 'destructuring', 'for...of'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-loop-7',
      title: 'Sum with while',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `sumTo(n)` that uses a while loop to sum all integers from 1 to n.',
      skeleton: `function sumTo(n) {
  // Use a while loop
}
`,
      solution: `function sumTo(n) {
  let sum = 0;
  let i = 1;
  while (i <= n) {
    sum += i;
    i++;
  }
  return sum;
}`,
      hints: [
        'Initialise a sum variable and a counter.',
        'Loop while the counter is <= n.',
        'Add the counter to sum each iteration.',
      ],
      concepts: ['while loop', 'accumulator', 'sum'],
    },
    {
      id: 'js-loop-8',
      title: 'Array.from range',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `range(start, end)` that returns an array of integers from start to end (inclusive) using Array.from.',
      skeleton: `function range(start, end) {
  // Use Array.from
}
`,
      solution: `function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}`,
      hints: [
        'Array.from takes a length and a mapper function.',
        'The second argument is (element, index) => value.',
        '`Array.from({ length: end - start + 1 }, (_, i) => start + i)`.',
      ],
      concepts: ['Array.from', 'range', 'mapper'],
    },
    {
      id: 'js-loop-9',
      title: 'Find first duplicate',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `firstDuplicate(arr)` that returns the first element that appears more than once. Return undefined if none.',
      skeleton: `function firstDuplicate(arr) {
  // Find the first duplicate
}
`,
      solution: `function firstDuplicate(arr) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) return item;
    seen.add(item);
  }
  return undefined;
}`,
      hints: [
        'Use a Set to track seen elements.',
        'If an element is already in the Set, it is a duplicate.',
        'Return it immediately (first duplicate).',
      ],
      concepts: ['for...of', 'Set', 'early return', 'duplicate detection'],
    },
    {
      id: 'js-loop-10',
      title: 'Nested loop: multiplication table',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `multiTable(n)` that returns a 2D array representing the multiplication table from 1 to n.',
      skeleton: `function multiTable(n) {
  // Return n x n multiplication table
}
// multiTable(3) => [[1,2,3],[2,4,6],[3,6,9]]
`,
      solution: `function multiTable(n) {
  const table = [];
  for (let i = 1; i <= n; i++) {
    const row = [];
    for (let j = 1; j <= n; j++) {
      row.push(i * j);
    }
    table.push(row);
  }
  return table;
}`,
      hints: [
        'Use two nested for loops.',
        'Outer loop for rows (i), inner loop for columns (j).',
        'Each cell is i * j.',
      ],
      concepts: ['nested loops', '2D array', 'multiplication'],
    },
    {
      id: 'js-loop-11',
      title: 'Labeled break',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `findInMatrix(matrix, target)` that searches a 2D array and returns [row, col] of the first match. Use a labeled break to exit both loops.',
      skeleton: `function findInMatrix(matrix, target) {
  // Use labeled break to find target
}
`,
      solution: `function findInMatrix(matrix, target) {
  let result = [-1, -1];
  outer:
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === target) {
        result = [r, c];
        break outer;
      }
    }
  }
  return result;
}`,
      hints: [
        'Label the outer loop with a name followed by a colon.',
        'Use `break labelName` to exit the outer loop from inside the inner.',
        'The label goes before the for keyword: `outer: for (...)`.',
      ],
      concepts: ['labeled statements', 'break', 'nested loops', '2D search'],
    },
    {
      id: 'js-loop-12',
      title: 'do-while input validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `generateUntilEven(generator)` that calls generator() repeatedly using do-while until it returns an even number, then returns that number.',
      skeleton: `function generateUntilEven(generator) {
  // Call generator() at least once, keep going until even
}
`,
      solution: `function generateUntilEven(generator) {
  let value;
  do {
    value = generator();
  } while (value % 2 !== 0);
  return value;
}`,
      hints: [
        'do-while runs the body at least once.',
        'Check if the value is odd in the while condition.',
        'The loop continues while the value is not even.',
      ],
      concepts: ['do-while', 'input validation', 'at least once'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-loop-13',
      title: 'Fix: off-by-one error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This loop skips the last element. Fix it.',
      skeleton: `const arr = [10, 20, 30];
for (let i = 0; i < arr.length - 1; i++) {
  console.log(arr[i]); // should print all 3 elements
}`,
      solution: `const arr = [10, 20, 30];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // prints all 3 elements
}`,
      hints: [
        'The condition uses arr.length - 1.',
        'This means it stops one element too early.',
        'Remove the "- 1" from the condition.',
      ],
      concepts: ['for loop', 'off-by-one', 'array bounds'],
    },
    {
      id: 'js-loop-14',
      title: 'Fix: infinite loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This while loop never terminates. Fix it.',
      skeleton: `function countdown(n) {
  const result = [];
  while (n >= 0) {
    result.push(n);
  }
  return result;
}`,
      solution: `function countdown(n) {
  const result = [];
  while (n >= 0) {
    result.push(n);
    n--;
  }
  return result;
}`,
      hints: [
        'The loop condition never becomes false.',
        'n is never decremented.',
        'Add `n--` inside the loop body.',
      ],
      concepts: ['while loop', 'infinite loop', 'decrement'],
    },
    {
      id: 'js-loop-15',
      title: 'Fix: var closure in loop',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This loop creates functions that all log the same value due to var scoping. Fix it.',
      skeleton: `const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(function() { console.log(i); });
}
fns[0](); // should log 0, but logs 3
fns[1](); // should log 1, but logs 3`,
      solution: `const fns = [];
for (let i = 0; i < 3; i++) {
  fns.push(function() { console.log(i); });
}
fns[0](); // logs 0
fns[1](); // logs 1`,
      hints: [
        'var is function-scoped, so all closures share the same i.',
        'let creates a new binding for each iteration.',
        'Change var to let.',
      ],
      concepts: ['var', 'let', 'closure', 'loop scoping'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-loop-16',
      title: 'Predict: for...in on array',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const arr = ['a', 'b', 'c'];
for (const x in arr) {
  console.log(typeof x);
}`,
      solution: `string
string
string`,
      hints: [
        'for...in iterates over property names.',
        'Array indices are property names, which are strings.',
        'typeof each key is "string".',
      ],
      concepts: ['for...in', 'array', 'typeof', 'property names'],
    },
    {
      id: 'js-loop-17',
      title: 'Predict: continue and accumulator',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `let sum = 0;
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  sum += i;
}
console.log(sum);`,
      solution: `12`,
      hints: [
        'continue skips the iteration where i === 3.',
        'Sum = 1 + 2 + 4 + 5 = 12.',
        'The output is 12.',
      ],
      concepts: ['continue', 'for loop', 'accumulator'],
    },
    {
      id: 'js-loop-18',
      title: 'Predict: do-while runs once',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `let x = 10;
do {
  console.log(x);
  x++;
} while (x < 10);`,
      solution: `10`,
      hints: [
        'do-while runs the body at least once before checking the condition.',
        'x starts at 10, so the body runs once.',
        'Then x becomes 11, and 11 < 10 is false, so the loop stops.',
      ],
      concepts: ['do-while', 'at least once', 'loop condition'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-loop-19',
      title: 'Refactor: for loop to for...of',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Refactor this index-based for loop to use for...of since the index is not needed.',
      skeleton: `const names = ['Alice', 'Bob', 'Charlie'];
for (let i = 0; i < names.length; i++) {
  console.log(names[i].toUpperCase());
}`,
      solution: `const names = ['Alice', 'Bob', 'Charlie'];
for (const name of names) {
  console.log(name.toUpperCase());
}`,
      hints: [
        'The index i is only used to access the element.',
        'for...of directly gives you the element.',
        'Replace the entire for header with `for (const name of names)`.',
      ],
      concepts: ['for...of', 'for loop', 'refactoring'],
    },
    {
      id: 'js-loop-20',
      title: 'Refactor: loop to map',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor this for loop into a map call.',
      skeleton: `const numbers = [1, 2, 3, 4, 5];
const doubled = [];
for (const n of numbers) {
  doubled.push(n * 2);
}
console.log(doubled);`,
      solution: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
      hints: [
        'The loop transforms each element into a new value.',
        'This is exactly what map does.',
        'Use `numbers.map(n => n * 2)`.',
      ],
      concepts: ['Array.map', 'for...of', 'refactoring', 'functional'],
    },
  ],
};
