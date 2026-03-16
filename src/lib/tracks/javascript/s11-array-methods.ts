import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-arr-methods',
  title: '11. Array Methods',
  explanation: `## Array Methods

JavaScript arrays have powerful built-in methods for transformation, searching, and aggregation.

### Transformation
- \`map(fn)\` -- transform each element, return new array
- \`flatMap(fn)\` -- map then flatten one level
- \`toSorted(fn)\` / \`sort(fn)\` -- sort (toSorted is non-mutating)
- \`toReversed()\` / \`reverse()\` -- reverse order
- \`with(index, value)\` -- non-mutating index replacement

### Filtering
- \`filter(fn)\` -- keep elements where fn returns true
- \`find(fn)\` / \`findLast(fn)\` -- first/last matching element
- \`findIndex(fn)\` / \`findLastIndex(fn)\` -- index of match

### Testing
- \`some(fn)\` -- true if any element passes
- \`every(fn)\` -- true if all elements pass

### Aggregation
- \`reduce(fn, init)\` -- accumulate a single value
- \`reduceRight(fn, init)\` -- reduce from right to left

### Iteration
- \`forEach(fn)\` -- side-effect iteration (no return value)
- \`entries()\`, \`keys()\`, \`values()\` -- iterators
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-am-1',
      title: 'Array map',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use map to double each number.',
      skeleton: `const nums = [1, 2, 3];
const doubled = nums.__BLANK__(n => n * 2);
console.log(doubled); // [2, 4, 6]`,
      solution: `const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]`,
      hints: [
        'You need a method that transforms each element.',
        'It returns a new array of the same length.',
        'The method is `map`.',
      ],
      concepts: ['Array.map', 'transformation'],
    },
    {
      id: 'js-am-2',
      title: 'Array filter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use filter to keep only even numbers.',
      skeleton: `const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.__BLANK__(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]`,
      solution: `const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]`,
      hints: [
        'You need a method that keeps elements based on a condition.',
        'Elements where the callback returns true are kept.',
        'The method is `filter`.',
      ],
      concepts: ['Array.filter', 'predicate'],
    },
    {
      id: 'js-am-3',
      title: 'Array reduce',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use reduce to sum all numbers.',
      skeleton: `const nums = [1, 2, 3, 4, 5];
const sum = nums.__BLANK__((acc, n) => acc + n, 0);
console.log(sum); // 15`,
      solution: `const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15`,
      hints: [
        'You need a method that accumulates a single value.',
        'It takes a callback and an initial value.',
        'The method is `reduce`.',
      ],
      concepts: ['Array.reduce', 'accumulator'],
    },
    {
      id: 'js-am-4',
      title: 'Array find',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Find the first element greater than 10.',
      skeleton: `const nums = [3, 7, 12, 5, 18];
const result = nums.__BLANK__(n => n > 10);
console.log(result); // 12`,
      solution: `const nums = [3, 7, 12, 5, 18];
const result = nums.find(n => n > 10);
console.log(result); // 12`,
      hints: [
        'You need a method that returns the first matching element.',
        'It returns the element itself, not the index.',
        'The method is `find`.',
      ],
      concepts: ['Array.find', 'search'],
    },
    {
      id: 'js-am-5',
      title: 'Array some and every',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Check if some/all elements meet a condition.',
      skeleton: `const ages = [18, 22, 15, 30];
console.log(ages.__BLANK__(a => a >= 18)); // true (some are)
console.log(ages.__BLANK__(a => a >= 18)); // false (not all)`,
      solution: `const ages = [18, 22, 15, 30];
console.log(ages.some(a => a >= 18)); // true (some are)
console.log(ages.every(a => a >= 18)); // false (not all)`,
      hints: [
        'First blank: method that returns true if any element passes.',
        'Second blank: method that returns true if all elements pass.',
        'Use `some` and `every`.',
      ],
      concepts: ['Array.some', 'Array.every', 'predicate'],
    },
    {
      id: 'js-am-6',
      title: 'Array flatMap',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Use flatMap to split words and flatten.',
      skeleton: `const lines = ['hello world', 'foo bar'];
const words = lines.__BLANK__(line => line.split(' '));
console.log(words); // ['hello', 'world', 'foo', 'bar']`,
      solution: `const lines = ['hello world', 'foo bar'];
const words = lines.flatMap(line => line.split(' '));
console.log(words); // ['hello', 'world', 'foo', 'bar']`,
      hints: [
        'map would give nested arrays.',
        'flatMap maps then flattens one level.',
        'The method is `flatMap`.',
      ],
      concepts: ['Array.flatMap', 'map + flat'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-am-7',
      title: 'Group by property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `groupBy(arr, key)` that groups array elements by a property value, returning an object.',
      skeleton: `function groupBy(arr, key) {
  // Return object grouping elements by key
}
// groupBy([{type:'a',v:1},{type:'b',v:2},{type:'a',v:3}], 'type')
// => { a: [{type:'a',v:1},{type:'a',v:3}], b: [{type:'b',v:2}] }
`,
      solution: `function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const k = item[key];
    (groups[k] ??= []).push(item);
    return groups;
  }, {});
}`,
      hints: [
        'Use reduce with an object as the accumulator.',
        'For each item, get the key value and add to the corresponding group.',
        'Use ??= to initialise the group array if needed.',
      ],
      concepts: ['Array.reduce', 'grouping', '??='],
    },
    {
      id: 'js-am-8',
      title: 'Frequency counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `frequency(arr)` that returns an object with element counts.',
      skeleton: `function frequency(arr) {
  // Return { element: count }
}
// frequency(['a','b','a','c','b','a']) => { a: 3, b: 2, c: 1 }
`,
      solution: `function frequency(arr) {
  return arr.reduce((counts, item) => {
    counts[item] = (counts[item] ?? 0) + 1;
    return counts;
  }, {});
}`,
      hints: [
        'Use reduce with an object accumulator.',
        'For each element, increment its count.',
        'Initialise missing keys to 0 with ??.',
      ],
      concepts: ['Array.reduce', 'frequency', 'counting'],
    },
    {
      id: 'js-am-9',
      title: 'Implement custom map',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `myMap(arr, fn)` that reimplements Array.map.',
      skeleton: `function myMap(arr, fn) {
  // Implement map from scratch
}
`,
      solution: `function myMap(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i, arr));
  }
  return result;
}`,
      hints: [
        'Create a new empty array.',
        'Loop through and push fn(element, index, array).',
        'Return the new array.',
      ],
      concepts: ['Array.map', 'implementation', 'callback'],
    },
    {
      id: 'js-am-10',
      title: 'Partition array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `partition(arr, predicate)` that splits an array into two: [truthy, falsy].',
      skeleton: `function partition(arr, predicate) {
  // Return [passing, failing]
}
// partition([1,2,3,4,5], n => n > 3) => [[4,5], [1,2,3]]
`,
      solution: `function partition(arr, predicate) {
  return arr.reduce(([pass, fail], item) => {
    return predicate(item) ? [[...pass, item], fail] : [pass, [...fail, item]];
  }, [[], []]);
}`,
      hints: [
        'Use reduce with a [pass, fail] accumulator.',
        'Push to pass if predicate returns true, fail otherwise.',
        'Return the two arrays.',
      ],
      concepts: ['Array.reduce', 'partition', 'destructuring'],
    },
    {
      id: 'js-am-11',
      title: 'Chain: top scorers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `topScorers(players, n)` that returns the names of the top n players by score, sorted highest first.',
      skeleton: `function topScorers(players, n) {
  // Return names of top n scorers
}
// players: [{ name: 'A', score: 50 }, { name: 'B', score: 80 }, ...]
`,
      solution: `function topScorers(players, n) {
  return players
    .toSorted((a, b) => b.score - a.score)
    .slice(0, n)
    .map(p => p.name);
}`,
      hints: [
        'Sort by score descending.',
        'Slice the first n elements.',
        'Map to extract names.',
      ],
      concepts: ['method chaining', 'toSorted', 'slice', 'map'],
    },
    {
      id: 'js-am-12',
      title: 'Reduce: build object from entries',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `fromEntries(entries)` that converts [key, value] pairs to an object using reduce.',
      skeleton: `function fromEntries(entries) {
  // Convert [[key, value], ...] to object using reduce
}
`,
      solution: `function fromEntries(entries) {
  return entries.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}`,
      hints: [
        'Use reduce with an empty object as the accumulator.',
        'Destructure each entry as [key, value].',
        'Assign obj[key] = value each iteration.',
      ],
      concepts: ['Array.reduce', 'Object.fromEntries', 'destructuring'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-am-13',
      title: 'Fix: sort without comparator',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This sort produces wrong results for numbers because it sorts lexicographically. Fix it.',
      skeleton: `const nums = [10, 5, 100, 1, 25];
nums.sort();
console.log(nums); // [1, 10, 100, 25, 5] - wrong!`,
      solution: `const nums = [10, 5, 100, 1, 25];
nums.sort((a, b) => a - b);
console.log(nums); // [1, 5, 10, 25, 100]`,
      hints: [
        'Default sort converts elements to strings.',
        'Provide a numeric comparator.',
        'Use `(a, b) => a - b`.',
      ],
      concepts: ['Array.sort', 'comparator', 'lexicographic'],
    },
    {
      id: 'js-am-14',
      title: 'Fix: reduce without initial value',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This reduce throws on an empty array because there is no initial value. Fix it.',
      skeleton: `function sum(arr) {
  return arr.reduce((a, b) => a + b);
}
console.log(sum([])); // TypeError`,
      solution: `function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
console.log(sum([])); // 0`,
      hints: [
        'reduce without an initial value throws if the array is empty.',
        'Always provide an initial value for safety.',
        'Add 0 as the second argument.',
      ],
      concepts: ['Array.reduce', 'initial value', 'empty array'],
    },
    {
      id: 'js-am-15',
      title: 'Fix: forEach return value',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code expects forEach to return a new array, but it returns undefined. Fix it.',
      skeleton: `const nums = [1, 2, 3];
const doubled = nums.forEach(n => n * 2);
console.log(doubled); // undefined, should be [2, 4, 6]`,
      solution: `const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]`,
      hints: [
        'forEach always returns undefined.',
        'Use map to transform and return a new array.',
        'Replace forEach with map.',
      ],
      concepts: ['Array.forEach', 'Array.map', 'return value'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-am-16',
      title: 'Predict: findIndex',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const arr = [5, 10, 15, 20];
console.log(arr.findIndex(n => n > 12));`,
      solution: `2`,
      hints: [
        'findIndex returns the index of the first matching element.',
        '15 is the first element > 12, at index 2.',
        'The output is 2.',
      ],
      concepts: ['Array.findIndex', 'search'],
    },
    {
      id: 'js-am-17',
      title: 'Predict: reduce accumulation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const result = [1, 2, 3, 4].reduce((acc, n) => {
  return acc * n;
}, 1);
console.log(result);`,
      solution: `24`,
      hints: [
        'Starting with 1, multiply by each element.',
        '1 * 1 * 2 * 3 * 4 = 24.',
        'The output is 24.',
      ],
      concepts: ['Array.reduce', 'multiplication', 'accumulator'],
    },
    {
      id: 'js-am-18',
      title: 'Predict: method chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const result = [1, 2, 3, 4, 5]
  .filter(n => n % 2 !== 0)
  .map(n => n * 10)
  .reduce((a, b) => a + b, 0);
console.log(result);`,
      solution: `90`,
      hints: [
        'filter keeps [1, 3, 5].',
        'map gives [10, 30, 50].',
        'reduce sums: 10 + 30 + 50 = 90.',
      ],
      concepts: ['method chaining', 'filter', 'map', 'reduce'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-am-19',
      title: 'Refactor: imperative to declarative',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor this imperative loop to use filter and map.',
      skeleton: `const users = [
  { name: 'Zan', active: true },
  { name: 'Bob', active: false },
  { name: 'Ada', active: true },
];
const result = [];
for (const user of users) {
  if (user.active) {
    result.push(user.name.toUpperCase());
  }
}`,
      solution: `const users = [
  { name: 'Zan', active: true },
  { name: 'Bob', active: false },
  { name: 'Ada', active: true },
];
const result = users
  .filter(u => u.active)
  .map(u => u.name.toUpperCase());`,
      hints: [
        'The loop filters and transforms.',
        'Use filter for the condition, map for the transformation.',
        'Chain them together.',
      ],
      concepts: ['filter', 'map', 'method chaining', 'refactoring'],
    },
    {
      id: 'js-am-20',
      title: 'Refactor: multiple reduces to Object.fromEntries',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this reduce to use map + Object.fromEntries.',
      skeleton: `const items = [['a', 1], ['b', 2], ['c', 3]];
const obj = items.reduce((acc, [key, val]) => {
  acc[key] = val * 2;
  return acc;
}, {});`,
      solution: `const items = [['a', 1], ['b', 2], ['c', 3]];
const obj = Object.fromEntries(
  items.map(([key, val]) => [key, val * 2])
);`,
      hints: [
        'Map each entry to a new [key, transformedValue] pair.',
        'Object.fromEntries converts entries back to an object.',
        'This is cleaner than reduce for key-value transformations.',
      ],
      concepts: ['Object.fromEntries', 'Array.map', 'entries', 'refactoring'],
    },
  ],
};
