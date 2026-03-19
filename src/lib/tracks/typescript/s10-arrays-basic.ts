import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-arr-basic',
  title: '10. Arrays Fundamentals',
  explanation: `## Arrays Fundamentals

Arrays are ordered collections of values. TypeScript provides strong typing for arrays.

### Declaration Syntax
\\\`\\\`\\\`typescript
const nums: number[] = [1, 2, 3];
const strs: Array<string> = ["a", "b", "c"];
\\\`\\\`\\\`

### Common Operations
- **push / pop**: Add/remove from the end
- **shift / unshift**: Remove/add from the beginning
- **splice**: Add/remove at any position
- **slice**: Extract a portion (non-mutating)
- **indexOf / includes**: Search for elements
- **concat**: Merge arrays (non-mutating)
- **flat**: Flatten nested arrays
- **spread**: \\\`[...arr1, ...arr2]\\\` to merge or copy

### Array Creation
- \\\`Array.from\\\`: Create from array-like or iterable
- \\\`Array.of\\\`: Create from arguments
- \\\`Array.isArray\\\`: Check if a value is an array
- \\\`fill\\\`: Fill array with a value

### Readonly Arrays
\\\`readonly number[]\\\` or \\\`ReadonlyArray<number>\\\` prevents mutation.

### Tuples
Fixed-length arrays with specific types per position:
\\\`\\\`\\\`typescript
const pair: [string, number] = ["age", 30];
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 'ts-arr-1',
      title: 'Array declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare a typed array of numbers.',
      skeleton: `const scores: __BLANK__ = [95, 87, 92, 78];
console.log(scores);`,
      solution: `const scores: number[] = [95, 87, 92, 78];
console.log(scores);`,
      hints: [
        'What type annotation represents an array of numbers?',
        'Use Type[] syntax.',
        'The answer is: number[]',
      ],
      concepts: ['array declaration', 'number[]'],
    },
    {
      id: 'ts-arr-2',
      title: 'Array<T> syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare the same array using generic syntax.',
      skeleton: `const names: __BLANK__ = ["Alice", "Bob"];
console.log(names);`,
      solution: `const names: Array<string> = ["Alice", "Bob"];
console.log(names);`,
      hints: [
        'The generic array syntax uses Array<ElementType>.',
        'For string arrays, it is Array<string>.',
        'The answer is: Array<string>',
      ],
      concepts: ['Array<T>', 'generic syntax'],
    },
    {
      id: 'ts-arr-3',
      title: 'push and pop',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const arr: number[] = [1, 2, 3];
arr.push(4);
const last = arr.pop();
console.log(arr);
console.log(last);`,
      solution: `[ 1, 2, 3 ]
4`,
      hints: [
        'push adds to the end, pop removes from the end.',
        'After push(4): [1,2,3,4]. After pop(): [1,2,3] and returns 4.',
        'Output: [1,2,3] then 4.',
      ],
      concepts: ['push', 'pop', 'mutation'],
    },
    {
      id: 'ts-arr-4',
      title: 'shift and unshift',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const arr = ["b", "c"];
arr.unshift("a");
console.log(arr);
const first = arr.shift();
console.log(first);
console.log(arr);`,
      solution: `[ 'a', 'b', 'c' ]
a
[ 'b', 'c' ]`,
      hints: [
        'unshift adds to the beginning, shift removes from the beginning.',
        'After unshift("a"): ["a","b","c"]. shift() removes and returns "a".',
        'Output: ["a","b","c"], "a", ["b","c"].',
      ],
      concepts: ['shift', 'unshift', 'array operations'],
    },
    {
      id: 'ts-arr-5',
      title: 'indexOf and includes',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use includes to check if the array contains "banana".',
      skeleton: `const fruits = ["apple", "banana", "cherry"];
const hasBanana: boolean = fruits.__BLANK__("banana");
console.log(hasBanana); // true`,
      solution: `const fruits = ["apple", "banana", "cherry"];
const hasBanana: boolean = fruits.includes("banana");
console.log(hasBanana); // true`,
      hints: [
        'Which array method checks if an element exists?',
        'includes() returns a boolean.',
        'The answer is: includes',
      ],
      concepts: ['includes', 'array search'],
    },
    {
      id: 'ts-arr-6',
      title: 'Array length',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Get the number of elements in the array.',
      skeleton: `const items = [10, 20, 30, 40, 50];
const count: number = items.__BLANK__;
console.log(count); // 5`,
      solution: `const items = [10, 20, 30, 40, 50];
const count: number = items.length;
console.log(count); // 5`,
      hints: [
        'Which property gives the number of elements?',
        'It is the length property.',
        'The answer is: length',
      ],
      concepts: ['length', 'array property'],
    },
    {
      id: 'ts-arr-7',
      title: 'Array destructuring',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that takes an array and returns the first and last elements as a tuple.',
      skeleton: `function firstAndLast(arr: string[]): [string, string] {
  // Return [first element, last element]
}

console.log(firstAndLast(["a", "b", "c", "d"])); // ["a", "d"]`,
      solution: `function firstAndLast(arr: string[]): [string, string] {
  return [arr[0], arr[arr.length - 1]];
}

console.log(firstAndLast(["a", "b", "c", "d"])); // ["a", "d"]`,
      hints: [
        'The first element is arr[0], the last is arr[arr.length - 1].',
        'Return them as a tuple: [first, last].',
        'return [arr[0], arr[arr.length - 1]];',
      ],
      concepts: ['array access', 'tuple return', 'length'],
    },
    {
      id: 'ts-arr-8',
      title: 'Spread into array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that merges two arrays using the spread operator.',
      skeleton: `function merge<T>(a: T[], b: T[]): T[] {
  // Merge using spread
}

console.log(merge([1, 2], [3, 4]));       // [1, 2, 3, 4]
console.log(merge(["a"], ["b", "c"]));    // ["a", "b", "c"]`,
      solution: `function merge<T>(a: T[], b: T[]): T[] {
  return [...a, ...b];
}

console.log(merge([1, 2], [3, 4]));       // [1, 2, 3, 4]
console.log(merge(["a"], ["b", "c"]));    // ["a", "b", "c"]`,
      hints: [
        'Spread operator copies all elements into a new array.',
        '[...a, ...b] creates a new array with elements from both.',
        'return [...a, ...b];',
      ],
      concepts: ['spread operator', 'array merge', 'generics'],
    },
    {
      id: 'ts-arr-9',
      title: 'slice (non-mutating)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that returns the middle elements of an array (all except first and last).',
      skeleton: `function middle<T>(arr: T[]): T[] {
  // Use slice to get elements between first and last
}

console.log(middle([1, 2, 3, 4, 5])); // [2, 3, 4]
console.log(middle([1, 2]));           // []`,
      solution: `function middle<T>(arr: T[]): T[] {
  return arr.slice(1, -1);
}

console.log(middle([1, 2, 3, 4, 5])); // [2, 3, 4]
console.log(middle([1, 2]));           // []`,
      hints: [
        'slice(start, end) extracts a portion without mutating.',
        'Negative indices count from the end.',
        'arr.slice(1, -1) gets everything except first and last.',
      ],
      concepts: ['slice', 'non-mutating', 'negative index'],
    },
    {
      id: 'ts-arr-10',
      title: 'splice (mutating)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that removes an element at a given index and returns the modified array.',
      skeleton: `function removeAt<T>(arr: T[], index: number): T[] {
  // Use splice to remove one element at index
  // Return the array
}

const items = ["a", "b", "c", "d"];
console.log(removeAt(items, 1)); // ["a", "c", "d"]`,
      solution: `function removeAt<T>(arr: T[], index: number): T[] {
  arr.splice(index, 1);
  return arr;
}

const items = ["a", "b", "c", "d"];
console.log(removeAt(items, 1)); // ["a", "c", "d"]`,
      hints: [
        'splice(index, deleteCount) removes elements starting at index.',
        'splice(index, 1) removes exactly one element.',
        'arr.splice(index, 1); return arr;',
      ],
      concepts: ['splice', 'mutation', 'remove element'],
    },
    {
      id: 'ts-arr-11',
      title: 'concat arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that concatenates multiple arrays without mutating any of them.',
      skeleton: `function concatAll<T>(...arrays: T[][]): T[] {
  // Concatenate all arrays
}

console.log(concatAll([1, 2], [3, 4], [5])); // [1, 2, 3, 4, 5]`,
      solution: `function concatAll<T>(...arrays: T[][]): T[] {
  return ([] as T[]).concat(...arrays);
}

console.log(concatAll([1, 2], [3, 4], [5])); // [1, 2, 3, 4, 5]`,
      hints: [
        'concat() creates a new array by merging arrays.',
        'Start with an empty array and concat all.',
        '([] as T[]).concat(...arrays)',
      ],
      concepts: ['concat', 'non-mutating', 'rest parameters'],
    },
    {
      id: 'ts-arr-12',
      title: 'flat nested arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use flat() to flatten a nested array one level deep.',
      skeleton: `function flatten(arr: number[][]): number[] {
  // Flatten one level
}

console.log(flatten([[1, 2], [3, 4], [5]])); // [1, 2, 3, 4, 5]`,
      solution: `function flatten(arr: number[][]): number[] {
  return arr.flat();
}

console.log(flatten([[1, 2], [3, 4], [5]])); // [1, 2, 3, 4, 5]`,
      hints: [
        'flat() flattens an array by one level by default.',
        'No arguments needed for one level.',
        'return arr.flat();',
      ],
      concepts: ['flat', 'nested arrays', 'flatten'],
    },
    {
      id: 'ts-arr-13',
      title: 'Array.from',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use Array.from to create an array of numbers from 0 to n-1.',
      skeleton: `function range(n: number): number[] {
  // Use Array.from
}

console.log(range(5)); // [0, 1, 2, 3, 4]`,
      solution: `function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

console.log(range(5)); // [0, 1, 2, 3, 4]`,
      hints: [
        'Array.from({ length: n }) creates an array of n undefined elements.',
        'The second argument is a mapping function.',
        'Array.from({ length: n }, (_, i) => i)',
      ],
      concepts: ['Array.from', 'range generation', 'mapping function'],
    },
    {
      id: 'ts-arr-14',
      title: 'Array.isArray',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that wraps a value in an array if it is not already an array.',
      skeleton: `function ensureArray(value: string | string[]): string[] {
  // Return value as-is if array, or wrap in an array
}

console.log(ensureArray("hello"));        // ["hello"]
console.log(ensureArray(["a", "b"]));     // ["a", "b"]`,
      solution: `function ensureArray(value: string | string[]): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

console.log(ensureArray("hello"));        // ["hello"]
console.log(ensureArray(["a", "b"]));     // ["a", "b"]`,
      hints: [
        'Array.isArray() checks if a value is an array.',
        'If it is an array, return it. If not, wrap in [value].',
        'if (Array.isArray(value)) return value; return [value];',
      ],
      concepts: ['Array.isArray', 'type guard', 'normalize'],
    },
    {
      id: 'ts-arr-15',
      title: 'Array.of',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use Array.of to create an array from individual values.',
      skeleton: `const arr: number[] = Array.__BLANK__(1, 2, 3);
console.log(arr); // [1, 2, 3]`,
      solution: `const arr: number[] = Array.of(1, 2, 3);
console.log(arr); // [1, 2, 3]`,
      hints: [
        'Which static Array method creates an array from its arguments?',
        'Array.of creates an array from the provided values.',
        'The answer is: of',
      ],
      concepts: ['Array.of', 'static method'],
    },
    {
      id: 'ts-arr-16',
      title: 'fill method',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create an array of n zeros using Array constructor and fill.',
      skeleton: `function zeros(n: number): number[] {
  // Create an array of n zeros
}

console.log(zeros(5)); // [0, 0, 0, 0, 0]`,
      solution: `function zeros(n: number): number[] {
  return new Array(n).fill(0);
}

console.log(zeros(5)); // [0, 0, 0, 0, 0]`,
      hints: [
        'new Array(n) creates an array with n empty slots.',
        'fill(value) fills all slots with the given value.',
        'return new Array(n).fill(0);',
      ],
      concepts: ['fill', 'Array constructor', 'initialization'],
    },
    {
      id: 'ts-arr-17',
      title: 'Readonly arrays',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix this function so it does not mutate the input array. Return a new sorted array instead.',
      skeleton: `function sortedCopy(arr: readonly number[]): number[] {
  // Bug: sort() mutates the original array
  return arr.sort((a, b) => a - b);
}

const original: readonly number[] = [3, 1, 4, 1, 5];
const sorted = sortedCopy(original);
console.log(sorted);   // [1, 1, 3, 4, 5]
console.log(original); // should still be [3, 1, 4, 1, 5]`,
      solution: `function sortedCopy(arr: readonly number[]): number[] {
  return [...arr].sort((a, b) => a - b);
}

const original: readonly number[] = [3, 1, 4, 1, 5];
const sorted = sortedCopy(original);
console.log(sorted);   // [1, 1, 3, 4, 5]
console.log(original); // [3, 1, 4, 1, 5]`,
      hints: [
        'sort() mutates the array in place and cannot be called on readonly arrays.',
        'Copy the array first with spread, then sort the copy.',
        '[...arr].sort((a, b) => a - b)',
      ],
      concepts: ['readonly', 'non-mutating sort', 'spread copy'],
    },
    {
      id: 'ts-arr-18',
      title: 'Tuple basics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that returns a named tuple [min, max] from an array of numbers.',
      skeleton: `function minMax(arr: number[]): [number, number] {
  // Return [minimum, maximum]
}

const [min, max] = minMax([3, 1, 4, 1, 5, 9]);
console.log(min, max); // 1 9`,
      solution: `function minMax(arr: number[]): [number, number] {
  return [Math.min(...arr), Math.max(...arr)];
}

const [min, max] = minMax([3, 1, 4, 1, 5, 9]);
console.log(min, max); // 1 9`,
      hints: [
        'Math.min(...arr) finds the minimum, Math.max(...arr) finds the maximum.',
        'Return them as a tuple: [min, max].',
        'return [Math.min(...arr), Math.max(...arr)];',
      ],
      concepts: ['tuples', 'Math.min', 'Math.max', 'destructuring'],
    },
    {
      id: 'ts-arr-19',
      title: 'copyWithin',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3);
console.log(arr);`,
      solution: `[ 4, 5, 3, 4, 5 ]`,
      hints: [
        'copyWithin(target, start) copies elements from start to the target position.',
        'From index 3 onwards is [4, 5]. Copy those to index 0.',
        'Output: [4, 5, 3, 4, 5]',
      ],
      concepts: ['copyWithin', 'in-place copy', 'array mutation'],
    },
    {
      id: 'ts-arr-20',
      title: 'Refactor imperative to declarative',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this imperative array code to use declarative array methods.',
      skeleton: `function processScores(scores: number[]): { passing: number[]; average: number } {
  const passing: number[] = [];
  let total = 0;

  for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= 60) {
      passing.push(scores[i]);
    }
    total += scores[i];
  }

  const average = scores.length > 0 ? total / scores.length : 0;
  return { passing, average };
}

console.log(processScores([45, 78, 92, 55, 88, 60]));
// { passing: [78, 92, 88, 60], average: 69.67 }`,
      solution: `function processScores(scores: number[]): { passing: number[]; average: number } {
  const passing = scores.filter(s => s >= 60);
  const total = scores.reduce((sum, s) => sum + s, 0);
  const average = scores.length > 0 ? total / scores.length : 0;
  return { passing, average };
}

console.log(processScores([45, 78, 92, 55, 88, 60]));
// { passing: [78, 92, 88, 60], average: 69.67 }`,
      hints: [
        'Replace the for loop with filter for passing scores and reduce for the total.',
        'filter(s => s >= 60) replaces the if + push pattern.',
        'const passing = scores.filter(s => s >= 60); const total = scores.reduce((sum, s) => sum + s, 0);',
      ],
      concepts: ['refactoring', 'declarative', 'filter', 'reduce'],
    },
  ],
};
