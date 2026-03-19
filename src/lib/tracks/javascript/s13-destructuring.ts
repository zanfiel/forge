import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-destructuring',
  title: '13. Destructuring',
  explanation: `## Destructuring

Destructuring lets you unpack values from arrays or properties from objects into distinct variables.

### Array Destructuring
\`\`\`js
const [a, b, c] = [1, 2, 3];
const [first, ...rest] = [1, 2, 3, 4];  // rest = [2, 3, 4]
const [x, , z] = [1, 2, 3];             // skip element
\`\`\`

### Object Destructuring
\`\`\`js
const { name, age } = person;
const { name: userName } = person;       // rename
const { role = 'viewer' } = person;      // default
const { a: { b } } = nested;            // nested
\`\`\`

### In Function Parameters
\`\`\`js
function greet({ name, greeting = 'Hi' }) { ... }
\`\`\`

### Computed Property Names
\`\`\`js
const key = 'name';
const { [key]: value } = obj;
\`\`\`

### Swap
\`\`\`js
[a, b] = [b, a];
\`\`\`

### Gotchas
- Destructuring \`null\` or \`undefined\` throws a TypeError
- Default values only apply when the value is \`undefined\`, not \`null\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-destr-1',
      title: 'Basic array destructuring',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Destructure the first two elements of an array.',
      skeleton: `const colors = ['red', 'green', 'blue'];
const [__BLANK__, __BLANK__] = colors;
console.log(first, second); // "red" "green"`,
      solution: `const colors = ['red', 'green', 'blue'];
const [first, second] = colors;
console.log(first, second); // "red" "green"`,
      hints: [
        'Array destructuring matches by position.',
        'First variable gets first element, second gets second.',
        'Use `first, second`.',
      ],
      concepts: ['array destructuring', 'positional'],
    },
    {
      id: 'js-destr-2',
      title: 'Object destructuring with rename',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Destructure and rename a property.',
      skeleton: `const user = { name: 'Zan', age: 30 };
const { name__BLANK__ userName } = user;
console.log(userName); // "Zan"`,
      solution: `const user = { name: 'Zan', age: 30 };
const { name: userName } = user;
console.log(userName); // "Zan"`,
      hints: [
        'Renaming uses a colon between the original key and new name.',
        'The syntax is { originalKey: newName }.',
        'Use `:`.',
      ],
      concepts: ['object destructuring', 'renaming'],
    },
    {
      id: 'js-destr-3',
      title: 'Default value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Provide a default value for a missing property.',
      skeleton: `const config = { host: 'localhost' };
const { host, port __BLANK__ 3000 } = config;
console.log(port); // 3000`,
      solution: `const config = { host: 'localhost' };
const { host, port = 3000 } = config;
console.log(port); // 3000`,
      hints: [
        'Default values use the assignment operator.',
        'The default applies when the property is undefined.',
        'Use `=`.',
      ],
      concepts: ['destructuring', 'default values'],
    },
    {
      id: 'js-destr-4',
      title: 'Rest element in array',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Capture the remaining elements with rest.',
      skeleton: `const [head, __BLANK__tail] = [1, 2, 3, 4, 5];
console.log(tail); // [2, 3, 4, 5]`,
      solution: `const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(tail); // [2, 3, 4, 5]`,
      hints: [
        'Rest element uses three dots.',
        'It must be the last element.',
        'Use `...`.',
      ],
      concepts: ['rest element', 'array destructuring'],
    },
    {
      id: 'js-destr-5',
      title: 'Nested object destructuring',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Destructure a nested property.',
      skeleton: `const response = { data: { user: { name: 'Zan' } } };
const { data: { user: { __BLANK__ } } } = response;
console.log(name); // "Zan"`,
      solution: `const response = { data: { user: { name } } } = response;
const { data: { user: { name } } } = response;
console.log(name); // "Zan"`,
      hints: [
        'Nested destructuring follows the object structure.',
        'Each level uses its own curly braces.',
        'Extract `name` from the innermost object.',
      ],
      concepts: ['nested destructuring', 'deep extraction'],
    },
    {
      id: 'js-destr-6',
      title: 'Skip array elements',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Skip the second element when destructuring.',
      skeleton: `const [first, __BLANK__ third] = ['a', 'b', 'c'];
console.log(first, third); // "a" "c"`,
      solution: `const [first, , third] = ['a', 'b', 'c'];
console.log(first, third); // "a" "c"`,
      hints: [
        'Use an empty slot (just a comma) to skip an element.',
        'The syntax leaves a gap between commas.',
        'Use `,`.',
      ],
      concepts: ['array destructuring', 'skipping elements'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-destr-7',
      title: 'Function parameter destructuring',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function that destructures its parameter to extract name and age, with age defaulting to 0.',
      skeleton: `function introduce(/* destructure here */) {
  return \`I am \${name}, age \${age}\`;
}
// introduce({ name: 'Zan' }) => "I am Zan, age 0"
`,
      solution: `function introduce({ name, age = 0 }) {
  return \`I am \${name}, age \${age}\`;
}`,
      hints: [
        'Destructure the object directly in the parameter.',
        'Use { name, age = 0 } as the parameter.',
        'Default values work in parameter destructuring.',
      ],
      concepts: ['parameter destructuring', 'default values'],
    },
    {
      id: 'js-destr-8',
      title: 'Swap variables',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `swap(arr, i, j)` that returns a new array with elements at indices i and j swapped.',
      skeleton: `function swap(arr, i, j) {
  // Return new array with elements at i and j swapped
}
`,
      solution: `function swap(arr, i, j) {
  const result = [...arr];
  [result[i], result[j]] = [result[j], result[i]];
  return result;
}`,
      hints: [
        'Copy the array first to avoid mutation.',
        'Use destructuring assignment to swap: [a, b] = [b, a].',
        'Apply to result[i] and result[j].',
      ],
      concepts: ['destructuring', 'swap', 'array copy'],
    },
    {
      id: 'js-destr-9',
      title: 'Extract from API response',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `extractUser(response)` that destructures a nested API response: { data: { user: { id, name, email } } }. Return { id, name, email }.',
      skeleton: `function extractUser(response) {
  // Destructure and return user info
}
`,
      solution: `function extractUser(response) {
  const { data: { user: { id, name, email } } } = response;
  return { id, name, email };
}`,
      hints: [
        'Use nested destructuring to dig into the response.',
        'Each level of nesting uses its own braces.',
        'Return using shorthand properties.',
      ],
      concepts: ['nested destructuring', 'shorthand properties'],
    },
    {
      id: 'js-destr-10',
      title: 'Config with defaults',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `createServer({ host, port, secure })` with defaults: host="localhost", port=3000, secure=false.',
      skeleton: `function createServer(/* destructure with defaults */) {
  return \`\${secure ? 'https' : 'http'}://\${host}:\${port}\`;
}
// createServer({}) => "http://localhost:3000"
`,
      solution: `function createServer({ host = 'localhost', port = 3000, secure = false } = {}) {
  return \`\${secure ? 'https' : 'http'}://\${host}:\${port}\`;
}`,
      hints: [
        'Destructure in the parameter with default values.',
        'Add `= {}` after the destructuring to handle no argument.',
        'This prevents errors when called with no arguments.',
      ],
      concepts: ['parameter destructuring', 'default values', 'optional parameter'],
    },
    {
      id: 'js-destr-11',
      title: 'Mixed destructuring',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that destructures an array of objects: given [{name, scores: [s1, s2]}], extract the first item name and first score.',
      skeleton: `function getFirstScore(data) {
  // Destructure to get first item's name and first score
  // Return { name, firstScore }
}
// getFirstScore([{name: 'Zan', scores: [95, 87]}]) => { name: 'Zan', firstScore: 95 }
`,
      solution: `function getFirstScore(data) {
  const [{ name, scores: [firstScore] }] = data;
  return { name, firstScore };
}`,
      hints: [
        'Start with array destructuring to get the first object.',
        'Then object destructure name and scores.',
        'Array destructure scores to get the first score.',
      ],
      concepts: ['mixed destructuring', 'nested', 'array + object'],
    },
    {
      id: 'js-destr-12',
      title: 'Computed property destructuring',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `pluck(obj, key)` that uses computed property destructuring to extract a value.',
      skeleton: `function pluck(obj, key) {
  // Use computed property destructuring
}
// pluck({ name: 'Zan' }, 'name') => 'Zan'
`,
      solution: `function pluck(obj, key) {
  const { [key]: value } = obj;
  return value;
}`,
      hints: [
        'Computed properties in destructuring use square brackets.',
        'You must provide an alias with a colon.',
        'Use `{ [key]: value }`.',
      ],
      concepts: ['computed property', 'destructuring', 'dynamic key'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-destr-13',
      title: 'Fix: destructuring null',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code throws when the input is null. Add a safe default.',
      skeleton: `function getName(user) {
  const { name } = user; // TypeError if user is null
  return name;
}
console.log(getName(null)); // should return undefined`,
      solution: `function getName(user) {
  const { name } = user ?? {};
  return name;
}
console.log(getName(null)); // undefined`,
      hints: [
        'Destructuring null or undefined throws a TypeError.',
        'Provide a fallback with ?? {}.',
        'Use `user ?? {}`.',
      ],
      concepts: ['destructuring', 'null safety', 'nullish coalescing'],
    },
    {
      id: 'js-destr-14',
      title: 'Fix: default not applied to null',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'The default value does not apply because the property is null (not undefined). Fix it.',
      skeleton: `const data = { count: null };
const { count = 0 } = data;
console.log(count); // null, should be 0`,
      solution: `const data = { count: null };
const { count: rawCount } = data;
const count = rawCount ?? 0;
console.log(count); // 0`,
      hints: [
        'Destructuring defaults only apply for undefined, not null.',
        'Extract the raw value, then use ?? for null handling.',
        'Rename during destructuring, then apply ?? separately.',
      ],
      concepts: ['destructuring', 'default values', 'null vs undefined', '??'],
    },
    {
      id: 'js-destr-15',
      title: 'Fix: accidental global variable',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This destructuring assignment without declaration creates globals in sloppy mode. Fix it.',
      skeleton: `let a, b;
{a, b} = { a: 1, b: 2 }; // SyntaxError: block vs expression
console.log(a, b);`,
      solution: `let a, b;
({ a, b } = { a: 1, b: 2 });
console.log(a, b); // 1 2`,
      hints: [
        'The parser sees { as a block statement, not destructuring.',
        'Wrap the assignment in parentheses.',
        'Use `({ a, b } = ...)`.',
      ],
      concepts: ['destructuring assignment', 'parentheses', 'SyntaxError'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-destr-16',
      title: 'Predict: rest with destructuring',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const { a, ...rest } = { a: 1, b: 2, c: 3 };
console.log(rest);`,
      solution: `{ b: 2, c: 3 }`,
      hints: [
        'a is extracted, rest collects the remaining properties.',
        'rest is an object with b and c.',
        'Output: { b: 2, c: 3 }.',
      ],
      concepts: ['object rest', 'destructuring'],
    },
    {
      id: 'js-destr-17',
      title: 'Predict: default value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const [a = 5, b = 10] = [1];
console.log(a, b);`,
      solution: `1 10`,
      hints: [
        'a gets the value 1 from the array.',
        'b is undefined in the array, so the default 10 applies.',
        'Output: 1 10.',
      ],
      concepts: ['array destructuring', 'default values'],
    },
    {
      id: 'js-destr-18',
      title: 'Predict: nested destructuring',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const { a: { b } = {} } = { a: { b: 42 } };
console.log(b);`,
      solution: `42`,
      hints: [
        'The outer destructuring extracts a.',
        'The nested destructuring extracts b from a.',
        'a is { b: 42 }, so b is 42. The default {} is not used.',
      ],
      concepts: ['nested destructuring', 'default values'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-destr-19',
      title: 'Refactor: manual extraction to destructuring',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Refactor manual property access to destructuring.',
      skeleton: `function processEvent(event) {
  const type = event.type;
  const target = event.target;
  const timestamp = event.timestamp;
  return \`\${type} on \${target} at \${timestamp}\`;
}`,
      solution: `function processEvent({ type, target, timestamp }) {
  return \`\${type} on \${target} at \${timestamp}\`;
}`,
      hints: [
        'All three values come from the same object.',
        'Destructure directly in the parameter.',
        'Use `{ type, target, timestamp }`.',
      ],
      concepts: ['parameter destructuring', 'refactoring'],
    },
    {
      id: 'js-destr-20',
      title: 'Refactor: temp variable swap to destructuring',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Refactor this temp-variable swap to use destructuring.',
      skeleton: `let x = 1;
let y = 2;
const temp = x;
x = y;
y = temp;`,
      solution: `let x = 1;
let y = 2;
[x, y] = [y, x];`,
      hints: [
        'Array destructuring can swap variables in one line.',
        'Create a temporary array [y, x] and destructure into [x, y].',
        'Use `[x, y] = [y, x]`.',
      ],
      concepts: ['destructuring', 'swap', 'refactoring'],
    },
  ],
};
