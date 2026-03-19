import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-arr-methods',
  title: '11. Array Methods',
  explanation: `## Array Methods

TypeScript arrays come with a rich set of built-in methods that let you transform, filter, search, and aggregate data without writing manual loops.

### Transformation Methods
- **map()** -- creates a new array by applying a function to each element
- **flatMap()** -- maps each element then flattens the result one level
- **fill()** -- fills all or part of an array with a static value
- **Array.from()** -- creates an array from an iterable, optionally with a mapper

### Filtering & Searching
- **filter()** -- returns elements that pass a test
- **find()** / **findIndex()** -- locate the first match
- **includes()** -- checks if an element exists
- **some()** / **every()** -- test whether any/all elements pass

### Aggregation
- **reduce()** -- accumulates a single value from left to right
- **reduceRight()** -- same but from right to left

### Ordering
- **sort()** -- sorts in place (mutating)
- **reverse()** -- reverses in place (mutating)
- **toSorted()** / **toReversed()** -- new ES2023 immutable versions

### Iteration & Access
- **forEach()** -- execute a side-effect for each element
- **at()** -- access by index (supports negative indices)
- **entries()** / **keys()** / **values()** -- return iterators
- **with()** -- returns a copy with one element replaced (ES2023)

### Grouping (ES2024+)
- **Object.groupBy()** -- groups elements by a key function

Master these methods and you will rarely need a raw \\\`for\\\` loop again.`,
  exercises: [
    // --- 1 ---
    {
      id: 'ts-arr-meth-1',
      title: 'Map basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use map() to double every number in an array.',
      skeleton: `const nums: number[] = [1, 2, 3, 4];
const doubled = nums.__BLANK__(n => n * 2);
console.log(doubled);`,
      solution: `const nums: number[] = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);
console.log(doubled);`,
      hints: [
        'Which array method creates a new array by transforming each element?',
        'The method is called map() and takes a callback.',
        'nums.map(n => n * 2) will double each element.',
      ],
      concepts: ['map', 'array transformation'],
    },
    // --- 2 ---
    {
      id: 'ts-arr-meth-2',
      title: 'Filter basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use filter() to keep only even numbers.',
      skeleton: `const nums: number[] = [1, 2, 3, 4, 5, 6];
const evens = nums.__BLANK__(n => n % 2 === 0);
console.log(evens);`,
      solution: `const nums: number[] = [1, 2, 3, 4, 5, 6];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens);`,
      hints: [
        'Which method returns a new array with only elements that pass a test?',
        'The method is filter() -- it keeps elements where the callback returns true.',
        'nums.filter(n => n % 2 === 0) keeps only even numbers.',
      ],
      concepts: ['filter', 'predicate function'],
    },
    // --- 3 ---
    {
      id: 'ts-arr-meth-3',
      title: 'Reduce sum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use reduce() to sum all numbers in an array.',
      skeleton: `const nums: number[] = [10, 20, 30];
const total = nums.__BLANK__((acc, n) => acc + n, 0);
console.log(total);`,
      solution: `const nums: number[] = [10, 20, 30];
const total = nums.reduce((acc, n) => acc + n, 0);
console.log(total);`,
      hints: [
        'Which method accumulates a single result from an array?',
        'reduce() takes an accumulator callback and an initial value.',
        'nums.reduce((acc, n) => acc + n, 0) sums starting from 0.',
      ],
      concepts: ['reduce', 'accumulator'],
    },
    // --- 4 ---
    {
      id: 'ts-arr-meth-4',
      title: 'Find an element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use find() to locate the first number greater than 10.',
      skeleton: `const nums: number[] = [3, 7, 12, 5, 18];
const result = nums.__BLANK__(n => n > 10);
console.log(result);`,
      solution: `const nums: number[] = [3, 7, 12, 5, 18];
const result = nums.find(n => n > 10);
console.log(result);`,
      hints: [
        'Which method returns the first element that satisfies a condition?',
        'find() returns the element itself (not the index).',
        'nums.find(n => n > 10) returns 12.',
      ],
      concepts: ['find', 'searching arrays'],
    },
    // --- 5 ---
    {
      id: 'ts-arr-meth-5',
      title: 'Includes check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Check whether the array includes the string "banana".',
      skeleton: `const fruits: string[] = ["apple", "banana", "cherry"];
const hasBanana: boolean = fruits.__BLANK__("banana");
console.log(hasBanana);`,
      solution: `const fruits: string[] = ["apple", "banana", "cherry"];
const hasBanana: boolean = fruits.includes("banana");
console.log(hasBanana);`,
      hints: [
        'Which method checks if a value exists in an array?',
        'includes() returns a boolean.',
        'fruits.includes("banana") returns true.',
      ],
      concepts: ['includes', 'membership check'],
    },
    // --- 6 ---
    {
      id: 'ts-arr-meth-6',
      title: 'Some and every',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use some() to check if any number is negative, and every() to check if all are positive.',
      skeleton: `const nums: number[] = [1, -2, 3, 4];
const hasNeg: boolean = nums.__BLANK__(n => n < 0);
const allPos: boolean = nums.__BLANK__(n => n > 0);
console.log(hasNeg, allPos);`,
      solution: `const nums: number[] = [1, -2, 3, 4];
const hasNeg: boolean = nums.some(n => n < 0);
const allPos: boolean = nums.every(n => n > 0);
console.log(hasNeg, allPos);`,
      hints: [
        'some() returns true if at least one element passes; every() needs all to pass.',
        'First blank: some(). Second blank: every().',
        'nums.some(n => n < 0) is true; nums.every(n => n > 0) is false.',
      ],
      concepts: ['some', 'every', 'quantifier methods'],
    },
    // --- 7 ---
    {
      id: 'ts-arr-meth-7',
      title: 'Map and filter chain',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that takes an array of numbers, filters out negatives, and returns the squares of the remaining numbers.',
      skeleton: `function positiveSquares(nums: number[]): number[] {
  // filter out negatives, then map to squares
}`,
      solution: `function positiveSquares(nums: number[]): number[] {
  return nums.filter(n => n >= 0).map(n => n * n);
}`,
      hints: [
        'Chain filter() and map() together.',
        'First filter for n >= 0, then map each n to n * n.',
        'return nums.filter(n => n >= 0).map(n => n * n);',
      ],
      concepts: ['method chaining', 'filter', 'map'],
    },
    // --- 8 ---
    {
      id: 'ts-arr-meth-8',
      title: 'FindIndex usage',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that returns the index of the first string longer than 5 characters, or -1 if none.',
      skeleton: `function findLongIndex(words: string[]): number {
  // use findIndex
}`,
      solution: `function findLongIndex(words: string[]): number {
  return words.findIndex(w => w.length > 5);
}`,
      hints: [
        'findIndex() is like find() but returns the index instead of the element.',
        'It returns -1 if no element matches.',
        'return words.findIndex(w => w.length > 5);',
      ],
      concepts: ['findIndex', 'searching arrays'],
    },
    // --- 9 ---
    {
      id: 'ts-arr-meth-9',
      title: 'ForEach side effects',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Predict what this code logs.',
      skeleton: `const names: string[] = ["Alice", "Bob", "Eve"];
const upper: string[] = [];
names.forEach(name => upper.push(name.toUpperCase()));
console.log(upper);
console.log(names.forEach(n => n));`,
      solution: `["ALICE", "BOB", "EVE"]
undefined`,
      hints: [
        'forEach() executes a callback for each element but always returns undefined.',
        'The push() call inside forEach mutates the upper array.',
        'First log: ["ALICE", "BOB", "EVE"]. Second log: undefined (forEach returns nothing).',
      ],
      concepts: ['forEach', 'side effects', 'return value'],
    },
    // --- 10 ---
    {
      id: 'ts-arr-meth-10',
      title: 'Reduce to object',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that uses reduce to count the frequency of each string in an array.',
      skeleton: `function countFrequency(items: string[]): Record<string, number> {
  // use reduce to build a frequency map
}`,
      solution: `function countFrequency(items: string[]): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}`,
      hints: [
        'reduce() can accumulate into any type, not just numbers.',
        'Start with an empty object {} and increment counts for each item.',
        'Use reduce<Record<string, number>>((acc, item) => { acc[item] = (acc[item] || 0) + 1; return acc; }, {}).',
      ],
      concepts: ['reduce', 'Record type', 'frequency counting'],
    },
    // --- 11 ---
    {
      id: 'ts-arr-meth-11',
      title: 'FlatMap usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that takes an array of sentences and returns all individual words using flatMap.',
      skeleton: `function allWords(sentences: string[]): string[] {
  // use flatMap to split each sentence into words
}`,
      solution: `function allWords(sentences: string[]): string[] {
  return sentences.flatMap(s => s.split(" "));
}`,
      hints: [
        'flatMap() maps each element to an array and then flattens one level.',
        'Split each sentence by space to get words, then flatMap flattens them.',
        'return sentences.flatMap(s => s.split(" "));',
      ],
      concepts: ['flatMap', 'string splitting'],
    },
    // --- 12 ---
    {
      id: 'ts-arr-meth-12',
      title: 'Sort with comparator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the sort so numbers are sorted numerically, not lexicographically.',
      skeleton: `const nums: number[] = [10, 1, 21, 2];
nums.sort();
console.log(nums); // Should be [1, 2, 10, 21]`,
      solution: `const nums: number[] = [10, 1, 21, 2];
nums.sort((a, b) => a - b);
console.log(nums); // [1, 2, 10, 21]`,
      hints: [
        'Default sort() converts elements to strings and sorts lexicographically.',
        'You need a comparator function for numeric sorting.',
        'nums.sort((a, b) => a - b) sorts numbers ascending.',
      ],
      concepts: ['sort', 'comparator function', 'lexicographic vs numeric'],
    },
    // --- 13 ---
    {
      id: 'ts-arr-meth-13',
      title: 'at() with negative index',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the output when using at() with negative indices.',
      skeleton: `const letters: string[] = ["a", "b", "c", "d", "e"];
console.log(letters.at(0));
console.log(letters.at(-1));
console.log(letters.at(-2));
console.log(letters.at(10));`,
      solution: `a
e
d
undefined`,
      hints: [
        'at(0) works like [0]. Negative indices count from the end.',
        'at(-1) returns the last element, at(-2) the second to last.',
        'at(10) is out of bounds and returns undefined.',
      ],
      concepts: ['at', 'negative indexing'],
    },
    // --- 14 ---
    {
      id: 'ts-arr-meth-14',
      title: 'entries/keys/values iterators',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that uses entries() to return an array of strings like "0: apple", "1: banana".',
      skeleton: `function indexedList(items: string[]): string[] {
  // use entries() to build "index: value" strings
}`,
      solution: `function indexedList(items: string[]): string[] {
  const result: string[] = [];
  for (const [i, item] of items.entries()) {
    result.push(\`\${i}: \${item}\`);
  }
  return result;
}`,
      hints: [
        'entries() returns an iterator of [index, value] pairs.',
        'Use a for...of loop to destructure each [index, value].',
        'for (const [i, item] of items.entries()) { result.push(`${i}: ${item}`); }',
      ],
      concepts: ['entries', 'iterator', 'destructuring'],
    },
    // --- 15 ---
    {
      id: 'ts-arr-meth-15',
      title: 'ReduceRight behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the output of reduceRight building a string.',
      skeleton: `const letters: string[] = ["a", "b", "c", "d"];
const result = letters.reduceRight((acc, letter) => acc + letter, "");
console.log(result);`,
      solution: `dcba`,
      hints: [
        'reduceRight processes elements from right to left.',
        'Starting with "", it appends d, then c, then b, then a.',
        'The result is "dcba".',
      ],
      concepts: ['reduceRight', 'right-to-left accumulation'],
    },
    // --- 16 ---
    {
      id: 'ts-arr-meth-16',
      title: 'fill() method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the code so it fills only indices 1 through 3 (exclusive) with zero.',
      skeleton: `const nums: number[] = [1, 2, 3, 4, 5];
nums.fill(0);
console.log(nums); // Should be [1, 0, 0, 4, 5]`,
      solution: `const nums: number[] = [1, 2, 3, 4, 5];
nums.fill(0, 1, 3);
console.log(nums); // [1, 0, 0, 4, 5]`,
      hints: [
        'fill() without range arguments fills the entire array.',
        'fill(value, start, end) fills from start index to end index (exclusive).',
        'nums.fill(0, 1, 3) fills indices 1 and 2 with 0.',
      ],
      concepts: ['fill', 'range arguments'],
    },
    // --- 17 ---
    {
      id: 'ts-arr-meth-17',
      title: 'Array.from with mapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use Array.from to create an array of the first 10 squares (1, 4, 9, ... 100).',
      skeleton: `function firstTenSquares(): number[] {
  // use Array.from with a length and mapper
}`,
      solution: `function firstTenSquares(): number[] {
  return Array.from({ length: 10 }, (_, i) => (i + 1) ** 2);
}`,
      hints: [
        'Array.from can take an object with a length property as the first argument.',
        'The second argument is a mapper function receiving (element, index).',
        'Array.from({ length: 10 }, (_, i) => (i + 1) ** 2)',
      ],
      concepts: ['Array.from', 'mapper function', 'array generation'],
    },
    // --- 18 ---
    {
      id: 'ts-arr-meth-18',
      title: 'toSorted and toReversed (immutable)',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix the code so the original array is NOT mutated. Use the immutable ES2023 methods.',
      skeleton: `const original: number[] = [3, 1, 2];
const sorted = original.sort((a, b) => a - b);
const reversed = original.reverse();
console.log(original); // Should still be [3, 1, 2]
console.log(sorted);   // Should be [1, 2, 3]
console.log(reversed); // Should be [3, 2, 1]`,
      solution: `const original: number[] = [3, 1, 2];
const sorted = original.toSorted((a, b) => a - b);
const reversed = original.toReversed();
console.log(original); // [3, 1, 2]
console.log(sorted);   // [1, 2, 3]
console.log(reversed); // [3, 2, 1]`,
      hints: [
        'sort() and reverse() mutate the original array.',
        'ES2023 introduced toSorted() and toReversed() which return new arrays.',
        'Replace sort() with toSorted() and reverse() with toReversed().',
      ],
      concepts: ['toSorted', 'toReversed', 'immutable array methods'],
    },
    // --- 19 ---
    {
      id: 'ts-arr-meth-19',
      title: 'with() method',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that replaces the element at a given index without mutating the original array, using the with() method.',
      skeleton: `function replaceAt<T>(arr: T[], index: number, value: T): T[] {
  // use the with() method to return a new array
}`,
      solution: `function replaceAt<T>(arr: T[], index: number, value: T): T[] {
  return arr.with(index, value);
}`,
      hints: [
        'The with() method is an ES2023 addition that returns a copy with one element replaced.',
        'It takes an index and a new value.',
        'return arr.with(index, value);',
      ],
      concepts: ['with', 'immutable update', 'ES2023'],
    },
    // --- 20 ---
    {
      id: 'ts-arr-meth-20',
      title: 'Refactor loops to methods',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this imperative loop-based code to use array methods (filter, map, reduce).',
      skeleton: `function processScores(scores: number[]): number {
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= 50) {
      const curved = scores[i] + 10;
      sum += curved;
    }
  }
  return sum;
}`,
      solution: `function processScores(scores: number[]): number {
  return scores
    .filter(score => score >= 50)
    .map(score => score + 10)
    .reduce((sum, score) => sum + score, 0);
}`,
      hints: [
        'Break the loop into three steps: filtering, transforming, and accumulating.',
        'Filter scores >= 50, map to add 10, then reduce to sum.',
        'Chain .filter().map().reduce() for a declarative solution.',
      ],
      concepts: ['refactoring', 'filter', 'map', 'reduce', 'declarative style'],
    },
  ],
};
