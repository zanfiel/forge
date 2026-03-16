import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'javascript',
  name: 'JavaScript',
  language: 'javascript',
  monacoLang: 'javascript',
  icon: '🟨',
  description: 'The language of the web. Dynamic, versatile, everywhere.',
  sections: [
    // ── Section 1: Variables & Types ──────────────────
    {
      id: 'js-variables',
      title: 'Variables & Types',
      explanation: `# Variables & Types

JavaScript has three ways to declare variables:

\\\`\\\`\\\`javascript
var   name = 'old school';   // function-scoped, hoisted
let   name = 'modern';       // block-scoped, reassignable
const name = 'constant';     // block-scoped, NOT reassignable
\\\`\\\`\\\`

**Primitive types:** \\\`string\\\`, \\\`number\\\`, \\\`boolean\\\`, \\\`null\\\`, \\\`undefined\\\`, \\\`symbol\\\`, \\\`bigint\\\`

**Reference types:** \\\`object\\\`, \\\`array\\\`, \\\`function\\\`

Use \\\`const\\\` by default. Only use \\\`let\\\` when you need to reassign. Avoid \\\`var\\\`.

\\\`typeof\\\` returns a string describing the type:
\\\`\\\`\\\`javascript
typeof 42          // 'number'
typeof 'hello'     // 'string'
typeof true        // 'boolean'
typeof undefined   // 'undefined'
typeof null        // 'object'  (historical bug!)
typeof []          // 'object'
\\\`\\\`\\\`

**Template literals** use backticks and allow embedded expressions:
\\\`\\\`\\\`javascript
const name = 'World';
const greeting = \\\`Hello, \${name}!\\\`;
\\\`\\\`\\\``,
      exercises: [
        {
          id: 'js-var-1',
          title: 'Declare and Initialize',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'javascript',
          goal: 'Fill in the blanks to declare a constant user object and a mutable age variable, then build a greeting with a template literal.',
          skeleton: `// Declare a constant object
__BLANK__ user = {
  name: 'Alice',
  role: 'developer'
};

// Declare a mutable age variable
__BLANK__ age = 28;

// Build a greeting using a template literal
const greeting = __BLANK__;

console.log(greeting);
// Expected: "Hello, Alice! You are 28 years old."`,
          solution: `// Declare a constant object
const user = {
  name: 'Alice',
  role: 'developer'
};

// Declare a mutable age variable
let age = 28;

// Build a greeting using a template literal
const greeting = \`Hello, \${user.name}! You are \${age} years old.\`;

console.log(greeting);
// Expected: "Hello, Alice! You are 28 years old."`,
          hints: [
            'Use `const` for values that should not be reassigned and `let` for values that will change.',
            'Template literals use backticks (`) and ${expression} for interpolation.',
            'The greeting template should be: `Hello, ${user.name}! You are ${age} years old.`',
          ],
          concepts: ['const', 'let', 'template literals', 'object declaration', 'string interpolation'],
        },
        {
          id: 'js-var-2',
          title: 'Type Coercion Trap',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'javascript',
          goal: 'Predict the output of each console.log statement. JavaScript performs implicit type coercion in surprising ways.',
          skeleton: `// What does each line print?

console.log(typeof null);
console.log('5' + 3);
console.log('5' - 3);
console.log(true + true);
console.log('' == false);
console.log('' === false);

// Write your predictions as comments next to each line.`,
          solution: `// What does each line print?

console.log(typeof null);     // 'object'
console.log('5' + 3);         // '53'
console.log('5' - 3);         // 2
console.log(true + true);     // 2
console.log('' == false);     // true
console.log('' === false);    // false

// Write your predictions as comments next to each line.`,
          hints: [
            '`typeof null` is a famous JavaScript quirk -- it returns "object" even though null is a primitive.',
            'The `+` operator concatenates when either operand is a string, but `-` always coerces to numbers.',
            '`==` performs type coercion (empty string is falsy), while `===` checks type AND value (string !== boolean).',
          ],
          concepts: ['typeof', 'type coercion', 'loose equality', 'strict equality', 'truthy and falsy'],
        },
        {
          id: 'js-var-3',
          title: 'Destructuring Assignment',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'javascript',
          goal: 'Write a function `extractUserInfo` that uses destructuring to pull `name`, `email`, and the first `hobby` from a user object and returns a formatted string.',
          skeleton: `function extractUserInfo(user) {
  // Use destructuring to extract:
  // - name and email from user
  // - the first hobby from user.hobbies array
  // Return: "name (email) enjoys hobby"



}

// Example:
// extractUserInfo({
//   name: 'Bob',
//   email: 'bob@example.com',
//   hobbies: ['cycling', 'reading', 'cooking']
// })
// => "Bob (bob@example.com) enjoys cycling"`,
          solution: `function extractUserInfo(user) {
  // Use destructuring to extract:
  // - name and email from user
  // - the first hobby from user.hobbies array
  // Return: "name (email) enjoys hobby"

  const { name, email, hobbies: [firstHobby] } = user;
  return \`\${name} (\${email}) enjoys \${firstHobby}\`;
}

// Example:
// extractUserInfo({
//   name: 'Bob',
//   email: 'bob@example.com',
//   hobbies: ['cycling', 'reading', 'cooking']
// })
// => "Bob (bob@example.com) enjoys cycling"`,
          hints: [
            'Object destructuring syntax: `const { name, email } = user;`',
            'You can destructure nested arrays inside objects: `const { hobbies: [firstHobby] } = user;`',
            'Combine them: `const { name, email, hobbies: [firstHobby] } = user;` then use a template literal for the return.',
          ],
          concepts: ['destructuring', 'object destructuring', 'array destructuring', 'nested destructuring', 'template literals'],
        },
      ],
    },

    // ── Section 2: Functions & Scope ─────────────────
    {
      id: 'js-functions',
      title: 'Functions & Scope',
      explanation: `# Functions & Scope

JavaScript has multiple ways to define functions:

\\\`\\\`\\\`javascript
// Function declaration (hoisted)
function greet(name) {
  return 'Hello, ' + name;
}

// Function expression
const greet = function(name) {
  return 'Hello, ' + name;
};

// Arrow function (concise, lexical \\\`this\\\`)
const greet = (name) => 'Hello, ' + name;
\\\`\\\`\\\`

**Scope rules:**
- \\\`var\\\` is function-scoped (visible throughout the entire function)
- \\\`let\\\` and \\\`const\\\` are block-scoped (only visible inside \\\`{}\\\`)
- Inner functions can access outer variables (**closures**)

\\\`\\\`\\\`javascript
function counter() {
  let count = 0;
  return {
    increment: () => ++count,
    get: () => count,
  };
}
\\\`\\\`\\\`

**Default parameters:**
\\\`\\\`\\\`javascript
function power(base, exponent = 2) {
  return base ** exponent;
}
\\\`\\\`\\\`

**Rest parameters:**
\\\`\\\`\\\`javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
\\\`\\\`\\\``,
      exercises: [
        {
          id: 'js-fn-1',
          title: 'Arrow Function Conversion',
          type: 'refactor',
          difficulty: 'beginner',
          language: 'javascript',
          goal: 'Refactor all three functions to use arrow function syntax. Use concise body (implicit return) where possible.',
          skeleton: `// Refactor these to arrow functions

function double(n) {
  return n * 2;
}

function isEven(n) {
  return n % 2 === 0;
}

function formatPrice(amount, currency) {
  if (currency === undefined) {
    currency = 'USD';
  }
  return currency + ' ' + amount.toFixed(2);
}`,
          solution: `// Refactor these to arrow functions

const double = (n) => n * 2;

const isEven = (n) => n % 2 === 0;

const formatPrice = (amount, currency = 'USD') => \`\${currency} \${amount.toFixed(2)}\`;`,
          hints: [
            'Single-expression arrow functions can drop the `{}` and `return` keyword: `const fn = (x) => x * 2;`',
            'For `formatPrice`, replace the `if` with a default parameter: `(amount, currency = "USD")`.',
            'Use a template literal for cleaner string concatenation in `formatPrice`.',
          ],
          concepts: ['arrow functions', 'implicit return', 'default parameters', 'refactoring', 'template literals'],
        },
        {
          id: 'js-fn-2',
          title: 'Closure Counter',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'javascript',
          goal: 'Write a function `createCounter` that returns an object with `increment`, `decrement`, `reset`, and `getCount` methods. The count starts at an initial value (default 0) and is private -- only accessible through the returned methods.',
          skeleton: `function createCounter(initial) {
  // Your code here:
  // - Accept an optional initial value (default 0)
  // - Keep count in a private variable
  // - Return an object with increment(), decrement(), reset(), getCount()



}

// Usage:
// const counter = createCounter(10);
// counter.increment();  // internal count: 11
// counter.increment();  // internal count: 12
// counter.decrement();  // internal count: 11
// counter.getCount();   // 11
// counter.reset();      // internal count: 10
// counter.getCount();   // 10`,
          solution: `function createCounter(initial = 0) {
  let count = initial;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = initial; },
    getCount: () => count,
  };
}

// Usage:
// const counter = createCounter(10);
// counter.increment();  // internal count: 11
// counter.increment();  // internal count: 12
// counter.decrement();  // internal count: 11
// counter.getCount();   // 11
// counter.reset();      // internal count: 10
// counter.getCount();   // 10`,
          hints: [
            'Use a default parameter: `function createCounter(initial = 0)`.',
            'Declare `let count = initial;` inside the function -- this variable is "closed over" by the returned methods.',
            'Return an object literal with arrow functions. `reset` should set `count = initial`, not `count = 0`.',
          ],
          concepts: ['closures', 'encapsulation', 'factory functions', 'default parameters', 'private state'],
        },
        {
          id: 'js-fn-3',
          title: 'Scope Bug Hunt',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'javascript',
          goal: 'This code is supposed to create 5 buttons that each log their index when clicked. Fix the scoping bug so each callback logs the correct number (0 through 4).',
          skeleton: `// BUG: Every button logs "5" when clicked instead of 0, 1, 2, 3, 4

function setupButtons() {
  const buttons = [];

  for (var i = 0; i < 5; i++) {
    buttons.push({
      label: 'Button ' + i,
      onClick: function() {
        console.log('Clicked button index:', i);
      }
    });
  }

  return buttons;
}

const btns = setupButtons();
btns[0].onClick(); // Should log: "Clicked button index: 0"
btns[3].onClick(); // Should log: "Clicked button index: 3"`,
          solution: `// FIX: Use let instead of var so each iteration gets its own scoped i

function setupButtons() {
  const buttons = [];

  for (let i = 0; i < 5; i++) {
    buttons.push({
      label: 'Button ' + i,
      onClick: function() {
        console.log('Clicked button index:', i);
      }
    });
  }

  return buttons;
}

const btns = setupButtons();
btns[0].onClick(); // Should log: "Clicked button index: 0"
btns[3].onClick(); // Should log: "Clicked button index: 3"`,
          hints: [
            'The bug is related to `var` being function-scoped. All callbacks share the SAME `i` variable.',
            'By the time any callback runs, the loop has finished and `i` is 5.',
            'Change `var i` to `let i`. `let` is block-scoped, so each loop iteration creates a new `i`.',
          ],
          concepts: ['var vs let', 'block scope', 'closures', 'loop scoping bug', 'function scope'],
        },
      ],
    },

    // ── Section 3: Arrays & Objects ──────────────────
    {
      id: 'js-arrays',
      title: 'Arrays & Objects',
      explanation: `# Arrays & Objects

Arrays and objects are the workhorses of JavaScript data manipulation.

**Array methods you must know:**
\\\`\\\`\\\`javascript
const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);           // [2, 4, 6, 8, 10]
nums.filter(n => n > 3);        // [4, 5]
nums.reduce((sum, n) => sum + n, 0);  // 15
nums.find(n => n > 3);          // 4
nums.some(n => n > 4);          // true
nums.every(n => n > 0);         // true
\\\`\\\`\\\`

These methods are **immutable** -- they return new arrays without changing the original.

**Spread operator:**
\\\`\\\`\\\`javascript
const a = [1, 2];
const b = [...a, 3, 4]; // [1, 2, 3, 4]

const obj = { x: 1, y: 2 };
const merged = { ...obj, z: 3 }; // { x: 1, y: 2, z: 3 }
\\\`\\\`\\\`

**Object methods:**
\\\`\\\`\\\`javascript
Object.keys(obj);    // ['x', 'y']
Object.values(obj);  // [1, 2]
Object.entries(obj);  // [['x', 1], ['y', 2]]
\\\`\\\`\\\`

**Optional chaining** (\\\`?.\\\`) and **nullish coalescing** (\\\`??\\\`):
\\\`\\\`\\\`javascript
const city = user?.address?.city ?? 'Unknown';
\\\`\\\`\\\``,
      exercises: [
        {
          id: 'js-arr-1',
          title: 'Array Pipeline',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'javascript',
          goal: 'Write a function `getTopSpenders` that takes an array of transaction objects and returns the names of users who spent more than $100 total, sorted alphabetically.',
          skeleton: `function getTopSpenders(transactions) {
  // Each transaction: { user: string, amount: number }
  //
  // Steps:
  // 1. Group transactions by user
  // 2. Sum each user's total spending
  // 3. Filter users who spent more than 100
  // 4. Return their names sorted alphabetically



}

// Example:
// getTopSpenders([
//   { user: 'Alice', amount: 80 },
//   { user: 'Bob', amount: 45 },
//   { user: 'Alice', amount: 30 },
//   { user: 'Charlie', amount: 150 },
//   { user: 'Bob', amount: 20 },
// ])
// => ['Alice', 'Charlie']`,
          solution: `function getTopSpenders(transactions) {
  const totals = transactions.reduce((acc, { user, amount }) => {
    acc[user] = (acc[user] || 0) + amount;
    return acc;
  }, {});

  return Object.entries(totals)
    .filter(([, total]) => total > 100)
    .map(([name]) => name)
    .sort();
}

// Example:
// getTopSpenders([
//   { user: 'Alice', amount: 80 },
//   { user: 'Bob', amount: 45 },
//   { user: 'Alice', amount: 30 },
//   { user: 'Charlie', amount: 150 },
//   { user: 'Bob', amount: 20 },
// ])
// => ['Alice', 'Charlie']`,
          hints: [
            'Use `reduce` to build an object mapping user names to their total amount.',
            'Use `Object.entries()` to convert the totals object into [name, total] pairs, then `filter` and `map`.',
            'Chain: `.filter(([, total]) => total > 100).map(([name]) => name).sort()`.',
          ],
          concepts: ['reduce', 'Object.entries', 'filter', 'map', 'method chaining', 'data transformation'],
        },
        {
          id: 'js-arr-2',
          title: 'Spread and Merge',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'javascript',
          goal: 'Fill in the blanks using the spread operator and Object.assign to merge and clone objects and arrays immutably.',
          skeleton: `const defaults = { theme: 'dark', fontSize: 14, lang: 'en' };
const userPrefs = { fontSize: 18, lang: 'fr' };

// Merge defaults with user preferences (user prefs win)
const config = { __BLANK__ };

// Clone an array and add an element at the end
const colors = ['red', 'green', 'blue'];
const moreColors = __BLANK__;

// Create a new object with an updated nested property (immutably)
const state = { user: { name: 'Eve', score: 42 }, active: true };
const newState = {
  __BLANK__,
  user: { __BLANK__, score: 100 },
};

console.log(config);
// { theme: 'dark', fontSize: 18, lang: 'fr' }

console.log(moreColors);
// ['red', 'green', 'blue', 'yellow']

console.log(newState);
// { user: { name: 'Eve', score: 100 }, active: true }`,
          solution: `const defaults = { theme: 'dark', fontSize: 14, lang: 'en' };
const userPrefs = { fontSize: 18, lang: 'fr' };

// Merge defaults with user preferences (user prefs win)
const config = { ...defaults, ...userPrefs };

// Clone an array and add an element at the end
const colors = ['red', 'green', 'blue'];
const moreColors = [...colors, 'yellow'];

// Create a new object with an updated nested property (immutably)
const state = { user: { name: 'Eve', score: 42 }, active: true };
const newState = {
  ...state,
  user: { ...state.user, score: 100 },
};

console.log(config);
// { theme: 'dark', fontSize: 18, lang: 'fr' }

console.log(moreColors);
// ['red', 'green', 'blue', 'yellow']

console.log(newState);
// { user: { name: 'Eve', score: 100 }, active: true }`,
          hints: [
            'Spread into objects: `{ ...defaults, ...userPrefs }`. Later spreads override earlier ones.',
            'Spread into arrays: `[...colors, "yellow"]` creates a new array with the extra element.',
            'For nested updates, spread at each level: `{ ...state, user: { ...state.user, score: 100 } }`.',
          ],
          concepts: ['spread operator', 'object merging', 'immutable updates', 'shallow clone', 'nested spread'],
        },
        {
          id: 'js-arr-3',
          title: 'Optional Chaining Safety',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'javascript',
          goal: 'This function crashes on incomplete data. Fix it using optional chaining (?.) and nullish coalescing (??) so it handles missing fields gracefully.',
          skeleton: `// BUG: Crashes with "Cannot read properties of undefined" on incomplete data

function formatUserCard(user) {
  const name = user.profile.displayName;
  const city = user.profile.address.city;
  const firstTag = user.tags[0].toUpperCase();
  const bio = user.profile.bio || 'No bio provided';

  return name + ' from ' + city + ' [' + firstTag + '] - ' + bio;
}

// This works:
// formatUserCard({
//   profile: { displayName: 'Ada', address: { city: 'London' }, bio: '' },
//   tags: ['engineer']
// })

// This crashes:
// formatUserCard({
//   profile: { displayName: 'Grace' },
//   tags: []
// })`,
          solution: `// FIX: Use optional chaining and nullish coalescing for safe access

function formatUserCard(user) {
  const name = user?.profile?.displayName ?? 'Anonymous';
  const city = user?.profile?.address?.city ?? 'Unknown';
  const firstTag = user?.tags?.[0]?.toUpperCase() ?? 'NONE';
  const bio = user?.profile?.bio ?? 'No bio provided';

  return name + ' from ' + city + ' [' + firstTag + '] - ' + bio;
}

// This works:
// formatUserCard({
//   profile: { displayName: 'Ada', address: { city: 'London' }, bio: '' },
//   tags: ['engineer']
// })

// This also works now:
// formatUserCard({
//   profile: { displayName: 'Grace' },
//   tags: []
// })`,
          hints: [
            'Optional chaining `?.` short-circuits to `undefined` if any part of the chain is null/undefined.',
            'Use `??` instead of `||` for defaults. `||` treats `""` and `0` as falsy, but `??` only catches `null`/`undefined`. This matters for `bio` -- an empty string should stay empty with `||` but here we want a fallback.',
            'For array access, use `user?.tags?.[0]?.toUpperCase()` to safely handle empty arrays.',
          ],
          concepts: ['optional chaining', 'nullish coalescing', 'defensive programming', 'safe property access'],
        },
      ],
    },

    // ── Section 4: Async & Promises ──────────────────
    {
      id: 'js-async',
      title: 'Async & Promises',
      explanation: `# Async & Promises

JavaScript is single-threaded but handles async operations with **Promises** and \\\`async/await\\\`.

**Creating a Promise:**
\\\`\\\`\\\`javascript
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => resolve('data'), 1000);
});
\\\`\\\`\\\`

**Consuming Promises:**
\\\`\\\`\\\`javascript
// .then/.catch
fetchData
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await (cleaner)
async function load() {
  try {
    const data = await fetchData;
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
\\\`\\\`\\\`

**Parallel execution:**
\\\`\\\`\\\`javascript
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
]);
\\\`\\\`\\\`

**Promise.allSettled** waits for all promises, even if some reject:
\\\`\\\`\\\`javascript
const results = await Promise.allSettled([p1, p2, p3]);
// Each result: { status: 'fulfilled', value: ... }
//           or { status: 'rejected', reason: ... }
\\\`\\\`\\\`

**Common mistake:** forgetting to \\\`await\\\` -- you get a Promise object instead of the resolved value.`,
      exercises: [
        {
          id: 'js-async-1',
          title: 'Promise Chain to Async/Await',
          type: 'refactor',
          difficulty: 'intermediate',
          language: 'javascript',
          goal: 'Refactor this promise chain into clean async/await syntax with proper error handling using try/catch.',
          skeleton: `// Refactor this promise chain to async/await

function loadUserProfile(userId) {
  return fetch('/api/users/' + userId)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then(function(user) {
      return fetch('/api/posts?author=' + user.name);
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(posts) {
      return { posts: posts, count: posts.length };
    })
    .catch(function(error) {
      console.error('Failed to load profile:', error.message);
      return { posts: [], count: 0 };
    });
}`,
          solution: `// Refactored to async/await

async function loadUserProfile(userId) {
  try {
    const response = await fetch('/api/users/' + userId);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const user = await response.json();
    const postsResponse = await fetch('/api/posts?author=' + user.name);
    const posts = await postsResponse.json();
    return { posts, count: posts.length };
  } catch (error) {
    console.error('Failed to load profile:', error.message);
    return { posts: [], count: 0 };
  }
}`,
          hints: [
            'Add `async` before `function` and replace each `.then(callback)` with `const result = await expression;`.',
            'Replace the `.catch()` block with a `try/catch` that wraps the entire body.',
            'Each `.then` step becomes a separate `const x = await ...` line. Use shorthand properties: `{ posts, count: posts.length }`.',
          ],
          concepts: ['async/await', 'try/catch', 'fetch API', 'refactoring promises', 'error handling'],
        },
        {
          id: 'js-async-2',
          title: 'Parallel Fetch',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'javascript',
          goal: 'Write an async function `fetchMultiple` that takes an array of URLs, fetches them all in parallel, and returns an array of results. Each result should be `{ url, status: "ok", data }` on success or `{ url, status: "error", error: message }` on failure. Never throw -- always return results for every URL.',
          skeleton: `async function fetchMultiple(urls) {
  // Fetch all URLs in parallel
  // Return an array of result objects:
  //   Success: { url, status: 'ok', data: <parsed JSON> }
  //   Failure: { url, status: 'error', error: <error message> }
  // MUST handle individual failures without failing the whole batch



}

// Example:
// await fetchMultiple([
//   'https://api.example.com/users',
//   'https://api.example.com/bad-endpoint',
//   'https://api.example.com/posts',
// ])
// => [
//   { url: '...users', status: 'ok', data: [...] },
//   { url: '...bad-endpoint', status: 'error', error: 'Not Found' },
//   { url: '...posts', status: 'ok', data: [...] },
// ]`,
          solution: `async function fetchMultiple(urls) {
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return { url, status: 'ok', data };
    })
  );

  return results.map((result, i) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return { url: urls[i], status: 'error', error: result.reason.message };
  });
}

// Example:
// await fetchMultiple([
//   'https://api.example.com/users',
//   'https://api.example.com/bad-endpoint',
//   'https://api.example.com/posts',
// ])
// => [
//   { url: '...users', status: 'ok', data: [...] },
//   { url: '...bad-endpoint', status: 'error', error: 'Not Found' },
//   { url: '...posts', status: 'ok', data: [...] },
// ]`,
          hints: [
            'Use `Promise.allSettled()` instead of `Promise.all()` so one failure does not abort the rest.',
            'Map each URL to an async function that fetches and parses JSON, throwing on non-ok responses.',
            'After `allSettled`, map results: fulfilled ones have `.value`, rejected ones have `.reason.message`.',
          ],
          concepts: ['Promise.allSettled', 'parallel fetching', 'error handling', 'async/await', 'resilient data loading'],
        },
        {
          id: 'js-async-3',
          title: 'The Missing Await',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'javascript',
          goal: 'This async code has bugs that cause it to log Promise objects instead of values and skip error handling. Find and fix all the missing `await` keywords and the error handling issue.',
          skeleton: `// BUG: Logs "[object Promise]" and error handling doesn't work

async function processOrder(orderId) {
  const order = fetchOrder(orderId);
  console.log('Processing order:', order.id);

  const inventory = checkInventory(order.items);

  if (!inventory.available) {
    throw new Error('Out of stock');
  }

  const receipt = chargePayment(order.total);
  console.log('Payment receipt:', receipt.transactionId);

  return receipt;
}

async function handleOrder(orderId) {
  const result = processOrder(orderId);
  console.log('Order complete:', result.transactionId);
}

// Simulated async functions (do not modify these)
async function fetchOrder(id) {
  return { id, items: ['widget'], total: 29.99 };
}
async function checkInventory(items) {
  return { available: true, items };
}
async function chargePayment(amount) {
  return { transactionId: 'TXN-' + Date.now(), amount };
}`,
          solution: `// FIX: Added await to every async function call

async function processOrder(orderId) {
  const order = await fetchOrder(orderId);
  console.log('Processing order:', order.id);

  const inventory = await checkInventory(order.items);

  if (!inventory.available) {
    throw new Error('Out of stock');
  }

  const receipt = await chargePayment(order.total);
  console.log('Payment receipt:', receipt.transactionId);

  return receipt;
}

async function handleOrder(orderId) {
  const result = await processOrder(orderId);
  console.log('Order complete:', result.transactionId);
}

// Simulated async functions (do not modify these)
async function fetchOrder(id) {
  return { id, items: ['widget'], total: 29.99 };
}
async function checkInventory(items) {
  return { available: true, items };
}
async function chargePayment(amount) {
  return { transactionId: 'TXN-' + Date.now(), amount };
}`,
          hints: [
            'Every call to an `async` function returns a Promise. Without `await`, you get the Promise object, not the resolved value.',
            'There are four async calls missing `await`: `fetchOrder`, `checkInventory`, `chargePayment`, and `processOrder`.',
            'Add `await` before each call: `const order = await fetchOrder(orderId);` and so on for every async function invocation.',
          ],
          concepts: ['await', 'async functions', 'Promise objects', 'debugging async code', 'common async mistakes'],
        },
      ],
    },

    // ── Section 5: DOM & Events ──────────────────────
    {
      id: 'js-dom',
      title: 'DOM & Events',
      explanation: `# DOM & Events

The **Document Object Model** (DOM) is the browser's representation of your HTML page as a tree of JavaScript objects.

**Selecting elements:**
\\\`\\\`\\\`javascript
document.getElementById('app');
document.querySelector('.card');         // first match
document.querySelectorAll('.card');      // all matches (NodeList)
\\\`\\\`\\\`

**Modifying elements:**
\\\`\\\`\\\`javascript
const el = document.querySelector('#title');
el.textContent = 'New title';           // text only
el.innerHTML = '<em>styled</em>';       // HTML (careful: XSS risk!)
el.classList.add('active');
el.classList.toggle('hidden');
el.style.color = 'red';
el.setAttribute('aria-label', 'Close');
\\\`\\\`\\\`

**Creating elements:**
\\\`\\\`\\\`javascript
const li = document.createElement('li');
li.textContent = 'New item';
document.querySelector('ul').appendChild(li);
\\\`\\\`\\\`

**Event handling:**
\\\`\\\`\\\`javascript
button.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('clicked!', event.target);
});
\\\`\\\`\\\`

**Event delegation** -- attach one listener to a parent instead of many to children:
\\\`\\\`\\\`javascript
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('done');
  }
});
\\\`\\\`\\\``,
      exercises: [
        {
          id: 'js-dom-1',
          title: 'Build a Todo List',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'javascript',
          goal: 'Write a function `initTodoApp` that wires up a simple todo list. It should: (1) listen for form submission, (2) read the input value, (3) create a new `<li>` with that text, (4) append it to the `<ul>`, (5) clear the input. Also add click-to-toggle-done on each `<li>` using event delegation.',
          skeleton: `// HTML structure (already in the page):
// <form id="todo-form">
//   <input id="todo-input" placeholder="Add a task..." />
//   <button type="submit">Add</button>
// </form>
// <ul id="todo-list"></ul>

function initTodoApp() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // 1. Handle form submission: prevent default, read input, create <li>,
  //    append to list, clear input. Ignore empty input.



  // 2. Handle click on list items: toggle a 'done' CSS class
  //    using event delegation on the <ul>.



}`,
          solution: `// HTML structure (already in the page):
// <form id="todo-form">
//   <input id="todo-input" placeholder="Add a task..." />
//   <button type="submit">Add</button>
// </form>
// <ul id="todo-list"></ul>

function initTodoApp() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // 1. Handle form submission: prevent default, read input, create <li>,
  //    append to list, clear input. Ignore empty input.
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
    input.value = '';
    input.focus();
  });

  // 2. Handle click on list items: toggle a 'done' CSS class
  //    using event delegation on the <ul>.
  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('done');
    }
  });
}`,
          hints: [
            'Use `form.addEventListener("submit", (e) => { e.preventDefault(); ... })` to intercept the form submission.',
            'Create the list item with `document.createElement("li")`, set its `textContent`, then `list.appendChild(li)`.',
            'For event delegation, attach one click listener to the `<ul>` and check `e.target.tagName === "LI"` before toggling the class.',
          ],
          concepts: ['DOM manipulation', 'event listeners', 'event delegation', 'preventDefault', 'createElement', 'classList'],
        },
        {
          id: 'js-dom-2',
          title: 'Debounced Search Input',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'javascript',
          goal: 'Write two functions: (1) a reusable `debounce(fn, delay)` utility that returns a debounced version of any function, and (2) `initSearch` that uses it to debounce a search input, only calling `performSearch` after the user stops typing for 300ms.',
          skeleton: `// Write a reusable debounce utility
function debounce(fn, delay) {
  // Return a new function that delays invoking fn
  // until after 'delay' ms have passed since the last call.
  // If called again before the delay expires, reset the timer.



}

// Wire up the search input with debounce
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  // Create a debounced version of performSearch with 300ms delay
  // Add an 'input' event listener that calls the debounced function
  // with the current input value



}

// Simulated search (do not modify)
function performSearch(query) {
  const results = document.getElementById('search-results');
  results.textContent = 'Results for: ' + query;
}`,
          solution: `// Write a reusable debounce utility
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Wire up the search input with debounce
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  const debouncedSearch = debounce(performSearch, 300);

  input.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });
}

// Simulated search (do not modify)
function performSearch(query) {
  const results = document.getElementById('search-results');
  results.textContent = 'Results for: ' + query;
}`,
          hints: [
            'The debounce function stores a `timeoutId` in a closure. Each call clears the previous timeout and sets a new one.',
            'Use `clearTimeout(timeoutId)` then `timeoutId = setTimeout(() => fn.apply(this, args), delay)`.',
            'In `initSearch`, create `const debouncedSearch = debounce(performSearch, 300)` and call it from an `input` event listener.',
          ],
          concepts: ['debounce', 'closures', 'setTimeout', 'clearTimeout', 'event listeners', 'performance optimization'],
        },
      ],
    },
  ],
};
