import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-loops',
  title: '6. Loops & Iteration',
  explanation: `## Loops & Iteration

Loops let you repeat code. TypeScript offers several loop constructs:

### for Loop
The classic C-style loop with initializer, condition, and increment.
\\\`\\\`\\\`typescript
for (let i = 0; i < 10; i++) { ... }
\\\`\\\`\\\`

### while / do-while
- \\\`while\\\`: checks condition before each iteration
- \\\`do-while\\\`: runs at least once, checks condition after

### for...of
Iterates over values of an iterable (arrays, strings, Maps, Sets).
\\\`\\\`\\\`typescript
for (const item of array) { ... }
\\\`\\\`\\\`

### for...in
Iterates over enumerable property keys of an object.
\\\`\\\`\\\`typescript
for (const key in obj) { ... }
\\\`\\\`\\\`

### break / continue
- \\\`break\\\` exits the loop entirely
- \\\`continue\\\` skips to the next iteration

### Loop Variable Scoping
Always use \\\`let\\\` (not \\\`var\\\`) in loops to get correct per-iteration scoping.
`,
  exercises: [
    {
      id: 'ts-loop-1',
      title: 'Basic for loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the for loop to iterate from 0 to 4.',
      skeleton: `for (let i = 0; i __BLANK__ 5; i++) {
  console.log(i);
}`,
      solution: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
      hints: [
        'What comparison operator limits i to values less than 5?',
        'Use < to exclude 5 from the range.',
        'The answer is: <',
      ],
      concepts: ['for loop', 'comparison operator'],
    },
    {
      id: 'ts-loop-2',
      title: 'While loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the while loop condition.',
      skeleton: `let count = 0;
__BLANK__ (count < 3) {
  console.log(count);
  count++;
}`,
      solution: `let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}`,
      hints: [
        'What keyword creates a loop that checks the condition first?',
        'It is the while keyword.',
        'The answer is: while',
      ],
      concepts: ['while loop', 'condition'],
    },
    {
      id: 'ts-loop-3',
      title: 'for...of with arrays',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use for...of to iterate over the array values.',
      skeleton: `const fruits = ["apple", "banana", "cherry"];
for (const fruit __BLANK__ fruits) {
  console.log(fruit);
}`,
      solution: `const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}`,
      hints: [
        'for...of iterates over values of an iterable.',
        'The keyword between variable and iterable is "of".',
        'The answer is: of',
      ],
      concepts: ['for...of', 'array iteration'],
    },
    {
      id: 'ts-loop-4',
      title: 'for...in with objects',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const person = { name: "Alice", age: 30 };
for (const key in person) {
  console.log(key);
}`,
      solution: `name
age`,
      hints: [
        'for...in iterates over property names (keys), not values.',
        'The object has two properties: name and age.',
        'Output: name then age.',
      ],
      concepts: ['for...in', 'object keys'],
    },
    {
      id: 'ts-loop-5',
      title: 'break out of a loop',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that finds the first negative number in an array using a loop with break.',
      skeleton: `function firstNegative(nums: number[]): number | undefined {
  // Use a for loop with break
}

console.log(firstNegative([3, 7, -2, 5]));   // -2
console.log(firstNegative([1, 2, 3]));        // undefined`,
      solution: `function firstNegative(nums: number[]): number | undefined {
  let result: number | undefined = undefined;
  for (const n of nums) {
    if (n < 0) {
      result = n;
      break;
    }
  }
  return result;
}

console.log(firstNegative([3, 7, -2, 5]));   // -2
console.log(firstNegative([1, 2, 3]));        // undefined`,
      hints: [
        'Loop through the array and check if each number is negative.',
        'When you find a negative number, save it and break.',
        'if (n < 0) { result = n; break; }',
      ],
      concepts: ['break', 'early exit', 'search'],
    },
    {
      id: 'ts-loop-6',
      title: 'continue to skip',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that sums only the positive numbers in an array, using continue to skip negatives.',
      skeleton: `function sumPositive(nums: number[]): number {
  // Use a for loop with continue
}

console.log(sumPositive([1, -2, 3, -4, 5])); // 9`,
      solution: `function sumPositive(nums: number[]): number {
  let total = 0;
  for (const n of nums) {
    if (n < 0) continue;
    total += n;
  }
  return total;
}

console.log(sumPositive([1, -2, 3, -4, 5])); // 9`,
      hints: [
        'Use continue to skip the current iteration when n is negative.',
        'if (n < 0) continue; then add n to total.',
        'for (const n of nums) { if (n < 0) continue; total += n; }',
      ],
      concepts: ['continue', 'skip iteration', 'accumulator'],
    },
    {
      id: 'ts-loop-7',
      title: 'do-while loop',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that uses a do-while loop to keep halving a number until it is less than 1, and returns the number of halvings.',
      skeleton: `function halvingsUntilBelowOne(n: number): number {
  // Use a do-while loop
}

console.log(halvingsUntilBelowOne(8));   // 4 (8 -> 4 -> 2 -> 1 -> 0.5)
console.log(halvingsUntilBelowOne(1));   // 1 (1 -> 0.5)`,
      solution: `function halvingsUntilBelowOne(n: number): number {
  let count = 0;
  do {
    n = n / 2;
    count++;
  } while (n >= 1);
  return count;
}

console.log(halvingsUntilBelowOne(8));   // 4
console.log(halvingsUntilBelowOne(1));   // 1`,
      hints: [
        'do-while executes the body at least once before checking the condition.',
        'Halve n and increment count in each iteration.',
        'do { n = n / 2; count++; } while (n >= 1);',
      ],
      concepts: ['do-while', 'halving', 'counter'],
    },
    {
      id: 'ts-loop-8',
      title: 'Iterate over a string',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that counts vowels in a string using for...of.',
      skeleton: `function countVowels(str: string): number {
  // Use for...of to iterate characters
}

console.log(countVowels("hello world")); // 3
console.log(countVowels("TypeScript"));  // 2`,
      solution: `function countVowels(str: string): number {
  const vowels = "aeiouAEIOU";
  let count = 0;
  for (const char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

console.log(countVowels("hello world")); // 3
console.log(countVowels("TypeScript"));  // 2`,
      hints: [
        'for...of can iterate over characters in a string.',
        'Check if each character is a vowel using includes.',
        'for (const char of str) { if ("aeiouAEIOU".includes(char)) count++; }',
      ],
      concepts: ['for...of', 'string iteration', 'includes'],
    },
    {
      id: 'ts-loop-9',
      title: 'Nested loops',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that generates a multiplication table as a 2D array for values 1 through n.',
      skeleton: `function multiTable(n: number): number[][] {
  // Use nested loops
}

console.log(multiTable(3));
// [[1,2,3],[2,4,6],[3,6,9]]`,
      solution: `function multiTable(n: number): number[][] {
  const table: number[][] = [];
  for (let i = 1; i <= n; i++) {
    const row: number[] = [];
    for (let j = 1; j <= n; j++) {
      row.push(i * j);
    }
    table.push(row);
  }
  return table;
}

console.log(multiTable(3));
// [[1,2,3],[2,4,6],[3,6,9]]`,
      hints: [
        'Use an outer loop for rows and inner loop for columns.',
        'Each cell value is i * j.',
        'Outer: for i 1..n, inner: for j 1..n, push i*j to row.',
      ],
      concepts: ['nested loops', '2D array', 'multiplication table'],
    },
    {
      id: 'ts-loop-10',
      title: 'Loop with index tracking',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that finds the index of a target value in an array. Return -1 if not found.',
      skeleton: `function findIndex(arr: number[], target: number): number {
  // Use a for loop with index
}

console.log(findIndex([10, 20, 30, 40], 30)); // 2
console.log(findIndex([10, 20, 30, 40], 50)); // -1`,
      solution: `function findIndex(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

console.log(findIndex([10, 20, 30, 40], 30)); // 2
console.log(findIndex([10, 20, 30, 40], 50)); // -1`,
      hints: [
        'Use a standard for loop to have access to the index.',
        'Compare each element to the target and return i when found.',
        'for (let i = 0; i < arr.length; i++) { if (arr[i] === target) return i; }',
      ],
      concepts: ['index tracking', 'search', 'for loop'],
    },
    {
      id: 'ts-loop-11',
      title: 'Countdown loop',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that returns an array counting down from n to 1.',
      skeleton: `function countdown(n: number): number[] {
  // Use a for loop counting downward
}

console.log(countdown(5)); // [5, 4, 3, 2, 1]`,
      solution: `function countdown(n: number): number[] {
  const result: number[] = [];
  for (let i = n; i >= 1; i--) {
    result.push(i);
  }
  return result;
}

console.log(countdown(5)); // [5, 4, 3, 2, 1]`,
      hints: [
        'Start i at n and decrement with i--.',
        'Continue while i >= 1.',
        'for (let i = n; i >= 1; i--) { result.push(i); }',
      ],
      concepts: ['countdown', 'decrement', 'for loop'],
    },
    {
      id: 'ts-loop-12',
      title: 'Iterate Map entries',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that takes a Map and returns an array of "key=value" strings.',
      skeleton: `function mapToStrings(map: Map<string, number>): string[] {
  // Iterate over the map
}

const m = new Map<string, number>([["a", 1], ["b", 2]]);
console.log(mapToStrings(m)); // ["a=1", "b=2"]`,
      solution: `function mapToStrings(map: Map<string, number>): string[] {
  const result: string[] = [];
  for (const [key, value] of map) {
    result.push(key + "=" + value);
  }
  return result;
}

const m = new Map<string, number>([["a", 1], ["b", 2]]);
console.log(mapToStrings(m)); // ["a=1", "b=2"]`,
      hints: [
        'Maps are iterable with for...of, yielding [key, value] pairs.',
        'Destructure the entry: for (const [key, value] of map).',
        'for (const [key, value] of map) { result.push(key + "=" + value); }',
      ],
      concepts: ['Map', 'for...of', 'destructuring'],
    },
    {
      id: 'ts-loop-13',
      title: 'Loop with accumulator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that computes the factorial of n using a loop.',
      skeleton: `function factorial(n: number): number {
  // Use a loop with an accumulator
}

console.log(factorial(5));  // 120
console.log(factorial(0));  // 1
console.log(factorial(1));  // 1`,
      solution: `function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5));  // 120
console.log(factorial(0));  // 1
console.log(factorial(1));  // 1`,
      hints: [
        'Start with result = 1 and multiply by each number up to n.',
        'for (let i = 2; i <= n; i++) { result *= i; }',
        'This handles 0! = 1 and 1! = 1 correctly since the loop does not execute.',
      ],
      concepts: ['accumulator', 'factorial', 'multiplication'],
    },
    {
      id: 'ts-loop-14',
      title: 'var scoping bug in loops',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix the loop variable scoping issue that causes all timeouts to print the same value.',
      skeleton: `const messages: string[] = [];
for (var i = 0; i < 3; i++) {
  messages.push("Item " + i);
}
console.log(messages); // should be ["Item 0", "Item 1", "Item 2"]
console.log(i);        // should not leak -- this line should error`,
      solution: `const messages: string[] = [];
for (let i = 0; i < 3; i++) {
  messages.push("Item " + i);
}
console.log(messages); // ["Item 0", "Item 1", "Item 2"]
// console.log(i); // Error: i is not defined (block-scoped)`,
      hints: [
        'var is function-scoped, so i leaks outside the for loop.',
        'Change var to let to make i block-scoped.',
        'Replace var with let and comment out the console.log(i) after the loop.',
      ],
      concepts: ['var vs let', 'loop scoping', 'block scope'],
    },
    {
      id: 'ts-loop-15',
      title: 'Convert loop to array method',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this for loop into an equivalent expression using array methods (map, filter, reduce).',
      skeleton: `function sumOfSquaresOfEvens(nums: number[]): number {
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      total += nums[i] * nums[i];
    }
  }
  return total;
}

console.log(sumOfSquaresOfEvens([1, 2, 3, 4, 5])); // 20 (4 + 16)`,
      solution: `function sumOfSquaresOfEvens(nums: number[]): number {
  return nums
    .filter(n => n % 2 === 0)
    .map(n => n * n)
    .reduce((sum, n) => sum + n, 0);
}

console.log(sumOfSquaresOfEvens([1, 2, 3, 4, 5])); // 20 (4 + 16)`,
      hints: [
        'Filter for even numbers, map to their squares, reduce to sum.',
        'Chain: .filter() -> .map() -> .reduce().',
        'nums.filter(n => n % 2 === 0).map(n => n * n).reduce((sum, n) => sum + n, 0)',
      ],
      concepts: ['refactoring', 'filter', 'map', 'reduce'],
    },
    {
      id: 'ts-loop-16',
      title: 'Iterate Set',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that finds the intersection of two Sets using iteration.',
      skeleton: `function intersection(a: Set<number>, b: Set<number>): Set<number> {
  // Iterate over one set and check membership in the other
}

const s1 = new Set([1, 2, 3, 4]);
const s2 = new Set([3, 4, 5, 6]);
console.log(intersection(s1, s2)); // Set { 3, 4 }`,
      solution: `function intersection(a: Set<number>, b: Set<number>): Set<number> {
  const result = new Set<number>();
  for (const item of a) {
    if (b.has(item)) {
      result.add(item);
    }
  }
  return result;
}

const s1 = new Set([1, 2, 3, 4]);
const s2 = new Set([3, 4, 5, 6]);
console.log(intersection(s1, s2)); // Set { 3, 4 }`,
      hints: [
        'Sets are iterable with for...of.',
        'Use the .has() method to check membership.',
        'for (const item of a) { if (b.has(item)) result.add(item); }',
      ],
      concepts: ['Set', 'iteration', 'intersection'],
    },
    {
      id: 'ts-loop-17',
      title: 'Labeled loop with break',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use a labeled break to exit from a nested loop when a target is found. Return the [row, col] position.',
      skeleton: `function findInMatrix(matrix: number[][], target: number): [number, number] | null {
  // Use a labeled loop
}

const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(findInMatrix(grid, 5)); // [1, 1]
console.log(findInMatrix(grid, 0)); // null`,
      solution: `function findInMatrix(matrix: number[][], target: number): [number, number] | null {
  let found: [number, number] | null = null;
  outer: for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === target) {
        found = [r, c];
        break outer;
      }
    }
  }
  return found;
}

const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(findInMatrix(grid, 5)); // [1, 1]
console.log(findInMatrix(grid, 0)); // null`,
      hints: [
        'A label is a name followed by a colon before a loop: outer: for ...',
        'break outer; exits the labeled loop, not just the inner one.',
        'outer: for (let r ...) { for (let c ...) { if (match) { found = [r,c]; break outer; } } }',
      ],
      concepts: ['labeled loops', 'break', 'nested loops', 'matrix search'],
    },
    {
      id: 'ts-loop-18',
      title: 'Array.from with iteration',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use Array.from to generate an array of the first n Fibonacci numbers.',
      skeleton: `function fibonacci(n: number): number[] {
  // Use Array.from with a mapping function
}

console.log(fibonacci(8)); // [0, 1, 1, 2, 3, 5, 8, 13]`,
      solution: `function fibonacci(n: number): number[] {
  const fibs: number[] = [];
  return Array.from({ length: n }, (_, i) => {
    if (i <= 1) {
      fibs.push(i);
      return i;
    }
    const val = fibs[i - 1] + fibs[i - 2];
    fibs.push(val);
    return val;
  });
}

console.log(fibonacci(8)); // [0, 1, 1, 2, 3, 5, 8, 13]`,
      hints: [
        'Array.from({ length: n }, (_, i) => ...) creates an array of n elements.',
        'Use a closure to track previous values for Fibonacci.',
        'Keep a running array and compute each element based on the previous two.',
      ],
      concepts: ['Array.from', 'Fibonacci', 'mapping function'],
    },
    {
      id: 'ts-loop-19',
      title: 'While with complex condition',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that implements binary search using a while loop.',
      skeleton: `function binarySearch(sorted: number[], target: number): number {
  // Return the index of target, or -1 if not found
}

console.log(binarySearch([1, 3, 5, 7, 9, 11, 13], 7));  // 3
console.log(binarySearch([1, 3, 5, 7, 9, 11, 13], 6));  // -1`,
      solution: `function binarySearch(sorted: number[], target: number): number {
  let low = 0;
  let high = sorted.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9, 11, 13], 7));  // 3
console.log(binarySearch([1, 3, 5, 7, 9, 11, 13], 6));  // -1`,
      hints: [
        'Binary search narrows the range by half each iteration.',
        'Use low and high pointers, compute mid, compare sorted[mid] to target.',
        'while (low <= high) { mid = Math.floor((low + high) / 2); compare and adjust low/high. }',
      ],
      concepts: ['binary search', 'while loop', 'algorithm'],
    },
    {
      id: 'ts-loop-20',
      title: 'Refactor loop to generator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this function that returns an array of ranges into a generator function that yields them lazily.',
      skeleton: `function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

// Refactor to a generator: function* range(...)

for (const n of range(0, 5)) {
  console.log(n);
}
// 0, 1, 2, 3, 4`,
      solution: `function* range(start: number, end: number): Generator<number> {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

for (const n of range(0, 5)) {
  console.log(n);
}
// 0, 1, 2, 3, 4`,
      hints: [
        'A generator function uses function* and yield instead of push/return.',
        'Generators are lazy -- they produce values on demand.',
        'function* range(start, end) { for (let i = start; i < end; i++) yield i; }',
      ],
      concepts: ['generator', 'yield', 'lazy iteration', 'refactoring'],
    },
  ],
};
