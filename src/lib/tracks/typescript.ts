import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'typescript',
  name: 'TypeScript',
  language: 'typescript',
  monacoLang: 'typescript',
  icon: '🔷',
  description: 'Variables, functions, types, objects, arrays, async — the language of the modern web.',
  sections: [
    {
      id: 'ts-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

In TypeScript, you declare variables with \`let\` (can change) or \`const\` (can't change).

Every variable has a **type**. TypeScript can infer it, or you can be explicit:

\`\`\`typescript
let name: string = "Zan";       // explicit type
let age = 25;                    // inferred as number
const PI = 3.14159;             // inferred as 3.14159 (literal type)
let active: boolean = true;
\`\`\`

**Basic types:** \`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`

**Arrays:** \`string[]\` or \`Array<string>\`

**Union types:** \`string | number\` — can be either`,
      exercises: [
        {
          id: 'ts-var-1',
          title: 'Declare Variables',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'typescript',
          goal: 'Declare three variables: a string called `name`, a number called `age`, and a boolean called `isAdmin`.',
          skeleton: `// Declare a string variable called "name" with your name
__BLANK__ name: string = "Zan";

// Declare a number variable called "age"
__BLANK__ age: __BLANK__ = 25;

// Declare a constant boolean called "isAdmin"
__BLANK__ isAdmin: __BLANK__ = true;

console.log(name, age, isAdmin);`,
          solution: `let name: string = "Zan";
let age: number = 25;
const isAdmin: boolean = true;

console.log(name, age, isAdmin);`,
          hints: [
            'Use `let` for variables that can change, `const` for ones that can\'t.',
            'The type for whole numbers is `number`. True/false values are `boolean`.',
            'Fill in: `let`, `number`, `const`, `boolean`',
          ],
          concepts: ['let', 'const', 'string', 'number', 'boolean', 'type annotation'],
        },
        {
          id: 'ts-var-2',
          title: 'Arrays & Union Types',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'typescript',
          goal: 'Create an array of numbers, an array of strings, and a variable that can be either a string or null.',
          skeleton: `// An array of scores (numbers)
const scores: __BLANK__ = [95, 87, 92, 78];

// An array of names (strings)
const names: __BLANK__ = ["Alice", "Bob", "Charlie"];

// A variable that might be a string or might be null
let nickname: __BLANK__ = null;

// Later we assign it
nickname = "Ace";

console.log(scores, names, nickname);`,
          solution: `const scores: number[] = [95, 87, 92, 78];
const names: string[] = ["Alice", "Bob", "Charlie"];
let nickname: string | null = null;
nickname = "Ace";
console.log(scores, names, nickname);`,
          hints: [
            'Array types look like `type[]` — so an array of numbers is...',
            '`number[]` for number arrays, `string[]` for string arrays.',
            'Union types use `|` — a value that\'s string or null is `string | null`.',
          ],
          concepts: ['arrays', 'number[]', 'string[]', 'union types', 'null'],
        },
        {
          id: 'ts-var-3',
          title: 'Write It Yourself',
          type: 'free-write',
          difficulty: 'beginner',
          language: 'typescript',
          goal: 'From scratch: Create a `const` called `servers` that is an array of strings containing at least 3 server names. Create a `let` called `activeServer` typed as `string | null`, initially `null`. Then assign the first element of `servers` to `activeServer`.',
          skeleton: `// Write your code here\n`,
          solution: `const servers: string[] = ["rocky", "pangolin", "ovh-vps"];
let activeServer: string | null = null;
activeServer = servers[0];`,
          hints: [
            'Start with `const servers: string[] = [...]`',
            'Access the first element with `servers[0]`',
            'Three lines total: declare array, declare variable, assign.',
          ],
          concepts: ['const', 'arrays', 'union types', 'array indexing'],
        },
      ],
    },
    {
      id: 'ts-functions',
      title: '2. Functions',
      explanation: `## Functions

Functions are reusable blocks of code. In TypeScript, you type the **parameters** and the **return value**:

\`\`\`typescript
function greet(name: string): string {
  return "Hello, " + name;
}

// Arrow function (shorter syntax, same thing)
const add = (a: number, b: number): number => {
  return a + b;
};

// One-liner arrow (implicit return)
const double = (n: number): number => n * 2;
\`\`\`

**Optional parameters** use \`?\`:
\`\`\`typescript
function log(msg: string, level?: string): void {
  console.log(level || "INFO", msg);
}
\`\`\`

**\`void\`** means the function returns nothing.`,
      exercises: [
        {
          id: 'ts-fn-1',
          title: 'Basic Function',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'typescript',
          goal: 'Complete the function that takes two numbers and returns their sum.',
          skeleton: `// Fill in the parameter types and return type
function add(a: __BLANK__, b: __BLANK__): __BLANK__ {
  __BLANK__ a + b;
}

console.log(add(5, 3)); // Should print 8`,
          solution: `function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 3));`,
          hints: [
            'Both parameters are numbers, and adding numbers gives you a number.',
            'The return type goes after the `)` and before `{`.',
            'Fill in: `number`, `number`, `number`, `return`.',
          ],
          concepts: ['function', 'parameters', 'return type', 'number'],
        },
        {
          id: 'ts-fn-2',
          title: 'Arrow Functions',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'typescript',
          goal: 'Rewrite these functions as arrow functions.',
          skeleton: `// Convert to arrow function
// function double(n: number): number { return n * 2; }
const double = __BLANK__

// Convert to one-liner arrow function
// function isEven(n: number): boolean { return n % 2 === 0; }
const isEven = __BLANK__

console.log(double(5));  // 10
console.log(isEven(4));  // true`,
          solution: `const double = (n: number): number => n * 2;
const isEven = (n: number): boolean => n % 2 === 0;

console.log(double(5));
console.log(isEven(4));`,
          hints: [
            'Arrow function syntax: `(params): returnType => expression`',
            'For one-liners, you don\'t need `{}` or `return` — the expression IS the return value.',
            '`(n: number): number => n * 2` — parameters, types, arrow, expression.',
          ],
          concepts: ['arrow functions', 'implicit return', 'boolean', 'modulo'],
        },
        {
          id: 'ts-fn-3',
          title: 'Write a Function',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'typescript',
          goal: 'Write a function called `clamp` that takes three numbers: `value`, `min`, `max`. It should return `min` if value is below min, `max` if value is above max, otherwise `value` itself.',
          skeleton: `// Write the clamp function here


// Tests (don't modify)
console.log(clamp(5, 0, 10));   // 5 (within range)
console.log(clamp(-3, 0, 10));  // 0 (below min)
console.log(clamp(15, 0, 10));  // 10 (above max)`,
          solution: `function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

console.log(clamp(5, 0, 10));
console.log(clamp(-3, 0, 10));
console.log(clamp(15, 0, 10));`,
          hints: [
            'The function signature: `function clamp(value: number, min: number, max: number): number`',
            'Use `if` statements — check if value < min first, then if value > max.',
            'Three return paths: `return min`, `return max`, or `return value`.',
          ],
          concepts: ['function', 'if statements', 'comparison operators', 'multiple return'],
        },
        {
          id: 'ts-fn-4',
          title: 'Higher-Order Functions',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'typescript',
          goal: 'Write a function called `retry` that takes a function `fn` and a number `times`. It should call `fn()` and return its result. If `fn` throws an error, retry up to `times` attempts. If all attempts fail, throw the last error.',
          skeleton: `// Write the retry function here


// Test
const flaky = () => {
  if (Math.random() > 0.3) throw new Error("failed");
  return "success";
};

try {
  const result = retry(flaky, 5);
  console.log(result);
} catch (e) {
  console.log("All retries failed");
}`,
          solution: `function retry<T>(fn: () => T, times: number): T {
  let lastError: Error;
  for (let i = 0; i < times; i++) {
    try {
      return fn();
    } catch (e) {
      lastError = e as Error;
    }
  }
  throw lastError!;
}`,
          hints: [
            'Use a `for` loop that runs `times` iterations. Inside, `try` calling `fn()`.',
            'In the `catch` block, save the error. After the loop, `throw` the saved error.',
            'The signature is `function retry<T>(fn: () => T, times: number): T` — the generic `<T>` means it works with any return type.',
          ],
          concepts: ['generics', 'try-catch', 'for loop', 'higher-order functions', 'error handling'],
        },
      ],
    },
    {
      id: 'ts-objects',
      title: '3. Objects & Interfaces',
      explanation: `## Objects & Interfaces

Objects group related data. **Interfaces** define the shape of an object:

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email?: string;    // optional (might not exist)
}

const user: User = {
  name: "Zan",
  age: 25,
};
\`\`\`

**Nested objects:**
\`\`\`typescript
interface Server {
  name: string;
  ip: string;
  specs: {
    cpu: number;
    ram: number;   // in GB
  };
}
\`\`\`

**Destructuring** pulls values out of objects:
\`\`\`typescript
const { name, age } = user;
// same as: const name = user.name; const age = user.age;
\`\`\``,
      exercises: [
        {
          id: 'ts-obj-1',
          title: 'Define an Interface',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'typescript',
          goal: 'Define an interface for a Game object and create one.',
          skeleton: `// Define the Game interface
__BLANK__ Game {
  appId: __BLANK__;
  title: __BLANK__;
  sizeGb: __BLANK__;
  installed: __BLANK__;
  lastPlayed__BLANK__: string;  // optional — might not have been played
}

// Create a game object that matches the interface
const game: Game = {
  __BLANK__: 2362060,
  __BLANK__: "Code Vein 2",
  __BLANK__: 45.2,
  __BLANK__: true,
};

console.log(game.title, game.sizeGb + "GB");`,
          solution: `interface Game {
  appId: number;
  title: string;
  sizeGb: number;
  installed: boolean;
  lastPlayed?: string;
}

const game: Game = {
  appId: 2362060,
  title: "Code Vein 2",
  sizeGb: 45.2,
  installed: true,
};

console.log(game.title, game.sizeGb + "GB");`,
          hints: [
            'Interfaces start with `interface Name {`. Types are the basics: `string`, `number`, `boolean`.',
            'Optional properties use `?` before the colon: `lastPlayed?: string`.',
            'Object keys match the interface: `appId: 2362060, title: "Code Vein 2"`, etc.',
          ],
          concepts: ['interface', 'optional properties', 'object literals'],
        },
        {
          id: 'ts-obj-2',
          title: 'Destructuring & Spread',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'typescript',
          goal: 'Write a function `updateServer` that takes a Server object and a partial update object, and returns a NEW server with the updates applied (don\'t modify the original).',
          skeleton: `interface Server {
  name: string;
  ip: string;
  port: number;
  online: boolean;
}

// Write updateServer here — it should return a new Server, not modify the original


// Tests
const srv: Server = { name: "rocky", ip: "192.168.8.133", port: 22, online: true };
const updated = updateServer(srv, { port: 4200, online: false });

console.log(srv.port);      // 22 (original unchanged)
console.log(updated.port);  // 4200
console.log(updated.name);  // "rocky" (kept from original)`,
          solution: `function updateServer(server: Server, updates: Partial<Server>): Server {
  return { ...server, ...updates };
}`,
          hints: [
            'The spread operator `...obj` copies all properties from an object.',
            '`Partial<Server>` makes all fields optional — perfect for "only update some fields".',
            'Spread the original first, then spread the updates: `{ ...server, ...updates }`. Later spreads overwrite earlier ones.',
          ],
          concepts: ['spread operator', 'Partial', 'immutability', 'object spread'],
        },
      ],
    },
    {
      id: 'ts-arrays',
      title: '4. Array Methods',
      explanation: `## Array Methods

Arrays have powerful built-in methods. The big three:

**\`.map()\`** — transform every element:
\`\`\`typescript
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);  // [2, 4, 6]
\`\`\`

**\`.filter()\`** — keep only matching elements:
\`\`\`typescript
const evens = nums.filter(n => n % 2 === 0);  // [2]
\`\`\`

**\`.reduce()\`** — combine all elements into one value:
\`\`\`typescript
const sum = nums.reduce((total, n) => total + n, 0);  // 6
\`\`\`

**Others:** \`.find()\`, \`.some()\`, \`.every()\`, \`.includes()\`, \`.sort()\`, \`.forEach()\``,
      exercises: [
        {
          id: 'ts-arr-1',
          title: 'Map, Filter, Reduce',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'typescript',
          goal: 'Use array methods to transform data.',
          skeleton: `const games = [
  { title: "Elden Ring", hours: 120 },
  { title: "Code Vein 2", hours: 45 },
  { title: "Yakuza Kiwami 3", hours: 80 },
  { title: "JWE3", hours: 15 },
];

// Get just the titles → ["Elden Ring", "Code Vein 2", ...]
const titles = games.__BLANK__(g => __BLANK__);

// Get games with more than 50 hours
const longGames = games.__BLANK__(g => __BLANK__);

// Get total hours across all games
const totalHours = games.__BLANK__((sum, g) => __BLANK__, __BLANK__);

console.log(titles);      // 4 titles
console.log(longGames);   // 2 games
console.log(totalHours);  // 260`,
          solution: `const titles = games.map(g => g.title);
const longGames = games.filter(g => g.hours > 50);
const totalHours = games.reduce((sum, g) => sum + g.hours, 0);`,
          hints: [
            '`.map()` transforms — you want to extract `.title` from each game.',
            '`.filter()` keeps items where the callback returns `true`. Check `g.hours > 50`.',
            '`.reduce()` accumulates. Start at `0`, add each game\'s hours to the running sum.',
          ],
          concepts: ['map', 'filter', 'reduce', 'arrow functions', 'array methods'],
        },
        {
          id: 'ts-arr-2',
          title: 'Chain Methods',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'typescript',
          goal: 'Write a function `topPlayers` that takes an array of `{ name: string, score: number }` objects and returns the names of the top 3 scorers, sorted highest first.',
          skeleton: `interface Player {
  name: string;
  score: number;
}

// Write topPlayers here — return string[] of top 3 names


// Test
const players: Player[] = [
  { name: "Alice", score: 850 },
  { name: "Bob", score: 1200 },
  { name: "Charlie", score: 950 },
  { name: "Diana", score: 1100 },
  { name: "Eve", score: 780 },
];

console.log(topPlayers(players)); // ["Bob", "Diana", "Charlie"]`,
          solution: `function topPlayers(players: Player[]): string[] {
  return players
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(p => p.name);
}`,
          hints: [
            'Chain three methods: sort → slice → map.',
            '`.sort((a, b) => b.score - a.score)` sorts descending. `.slice(0, 3)` takes first 3.',
            'Finally `.map(p => p.name)` extracts just the names from the sliced array.',
          ],
          concepts: ['method chaining', 'sort', 'slice', 'map'],
        },
      ],
    },
    {
      id: 'ts-async',
      title: '5. Async & Promises',
      explanation: `## Async & Promises

When code talks to a server, reads a file, or waits for anything — it's **asynchronous**.

**Promises** represent a value that will arrive later:

\`\`\`typescript
// async function — always returns a Promise
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();
  return data;
}

// Calling it — use await (inside another async function)
const user = await fetchUser(1);
\`\`\`

**\`await\`** pauses until the Promise resolves. Without it, you get the Promise object, not the value.

**Error handling:**
\`\`\`typescript
try {
  const data = await fetchUser(1);
} catch (error) {
  console.error("Failed:", error);
}
\`\`\``,
      exercises: [
        {
          id: 'ts-async-1',
          title: 'Fetch Data',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'typescript',
          goal: 'Complete the async function that fetches a list of games from an API.',
          skeleton: `interface Game {
  appId: number;
  title: string;
}

// Fill in the async function
__BLANK__ function fetchGames(): __BLANK__<Game[]> {
  const response = __BLANK__ fetch("/api/games");

  if (!response.ok) {
    __BLANK__ new Error("Failed to fetch games");
  }

  const games: Game[] = __BLANK__ response.json();
  return games;
}

// Usage
__BLANK__ {
  const games = __BLANK__ fetchGames();
  console.log(games.length, "games loaded");
} __BLANK__ (error) {
  console.error("Error:", error);
}`,
          solution: `async function fetchGames(): Promise<Game[]> {
  const response = await fetch("/api/games");
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  const games: Game[] = await response.json();
  return games;
}

try {
  const games = await fetchGames();
  console.log(games.length, "games loaded");
} catch (error) {
  console.error("Error:", error);
}`,
          hints: [
            '`async` goes before `function`. The return type wraps in `Promise<...>`.',
            'Use `await` before any async call (fetch, response.json). Use `throw` to raise errors.',
            'Error handling: `try { ... } catch (error) { ... }`.',
          ],
          concepts: ['async', 'await', 'Promise', 'fetch', 'try-catch', 'throw'],
        },
        {
          id: 'ts-async-2',
          title: 'Parallel Requests',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'typescript',
          goal: 'Write an async function `fetchAll` that takes an array of URLs and fetches them all in parallel (not one by one). Return an array of the JSON responses.',
          skeleton: `// Write fetchAll here — use Promise.all for parallel execution


// Test
const urls = ["/api/games", "/api/users", "/api/stats"];
const results = await fetchAll(urls);
console.log(results.length); // 3`,
          solution: `async function fetchAll(urls: string[]): Promise<any[]> {
  const promises = urls.map(url => fetch(url).then(r => r.json()));
  return Promise.all(promises);
}`,
          hints: [
            '`Promise.all()` takes an array of Promises and waits for ALL of them at once.',
            'Use `.map()` to turn each URL into a fetch Promise.',
            '`urls.map(url => fetch(url).then(r => r.json()))` creates the Promise array. Wrap in `Promise.all()`.',
          ],
          concepts: ['Promise.all', 'parallel async', 'map with promises'],
        },
      ],
    },
  ],
};
