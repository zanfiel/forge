import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-fn-basic',
  title: '7. Functions Fundamentals',
  explanation: `## Functions Fundamentals

Functions are the building blocks of any program. In TypeScript, functions can be declared in several ways and carry type information.

### Function Declarations
\\\`\\\`\\\`typescript
function greet(name: string): string {
  return "Hello, " + name;
}
\\\`\\\`\\\`

### Function Expressions
\\\`\\\`\\\`typescript
const greet = function(name: string): string {
  return "Hello, " + name;
};
\\\`\\\`\\\`

### Key Concepts
- **Parameters vs Arguments**: Parameters are the names in the function definition; arguments are the values passed in.
- **Return values**: Functions can return a value, or return nothing (void).
- **Hoisting**: Function declarations are hoisted; function expressions are not.
- **Scope**: Functions create their own scope. Inner functions can access outer variables (closure).
- **Pure functions**: Functions that always return the same output for the same input and have no side effects.
- **Side effects**: Anything a function does besides returning a value (logging, modifying external state, etc.).
- **Callbacks**: Functions passed as arguments to other functions.
- **IIFE**: Immediately Invoked Function Expression -- a function that runs right after it's defined.
`,
  exercises: [
    {
      id: 'ts-fn-1',
      title: 'Function declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the function declaration keyword.',
      skeleton: `__BLANK__ square(n: number): number {
  return n * n;
}
console.log(square(5)); // 25`,
      solution: `function square(n: number): number {
  return n * n;
}
console.log(square(5)); // 25`,
      hints: [
        'What keyword declares a named function?',
        'The keyword is function.',
        'The answer is: function',
      ],
      concepts: ['function declaration', 'keyword'],
    },
    {
      id: 'ts-fn-2',
      title: 'Function expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the function expression.',
      skeleton: `const double = __BLANK__(n: number): number {
  return n * 2;
};
console.log(double(4)); // 8`,
      solution: `const double = function(n: number): number {
  return n * 2;
};
console.log(double(4)); // 8`,
      hints: [
        'A function expression assigns an anonymous function to a variable.',
        'The keyword is still function, but without a name after it.',
        'The answer is: function',
      ],
      concepts: ['function expression', 'anonymous function'],
    },
    {
      id: 'ts-fn-3',
      title: 'Return value',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that takes two numbers and returns their average.',
      skeleton: `function average(a: number, b: number): number {
  // Your code here
}

console.log(average(10, 20)); // 15`,
      solution: `function average(a: number, b: number): number {
  return (a + b) / 2;
}

console.log(average(10, 20)); // 15`,
      hints: [
        'Average of two numbers is their sum divided by 2.',
        'return (a + b) / 2;',
        'Make sure to use parentheses around the addition.',
      ],
      concepts: ['return value', 'arithmetic', 'function'],
    },
    {
      id: 'ts-fn-4',
      title: 'Void function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a void function that logs a formatted message.',
      skeleton: `function logMessage(level: string, message: string): void {
  // Log "[LEVEL] message"
}

logMessage("INFO", "Server started"); // [INFO] Server started`,
      solution: `function logMessage(level: string, message: string): void {
  console.log("[" + level + "] " + message);
}

logMessage("INFO", "Server started"); // [INFO] Server started`,
      hints: [
        'void functions do not return a value.',
        'Use console.log to output the formatted string.',
        'console.log("[" + level + "] " + message);',
      ],
      concepts: ['void', 'console.log', 'string concatenation'],
    },
    {
      id: 'ts-fn-5',
      title: 'Function hoisting',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `console.log(greet("World"));

function greet(name: string): string {
  return "Hello, " + name;
}`,
      solution: `Hello, World`,
      hints: [
        'Function declarations are hoisted to the top of their scope.',
        'You can call a function declaration before it appears in the code.',
        'Output: Hello, World',
      ],
      concepts: ['hoisting', 'function declaration'],
    },
    {
      id: 'ts-fn-6',
      title: 'Expression not hoisted',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What happens when this code runs? Write "Error" if it throws.',
      skeleton: `console.log(greet("World"));

const greet = function(name: string): string {
  return "Hello, " + name;
};`,
      solution: `Error`,
      hints: [
        'Function expressions are not hoisted.',
        'const declarations have a temporal dead zone.',
        'Output: Error (ReferenceError)',
      ],
      concepts: ['hoisting', 'function expression', 'temporal dead zone'],
    },
    {
      id: 'ts-fn-7',
      title: 'Default parameters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that creates a greeting with a default separator of ", ".',
      skeleton: `function greet(name: string, greeting: string = "Hello", separator: string = ", "): string {
  // Return greeting + separator + name
}

console.log(greet("Alice"));                    // "Hello, Alice"
console.log(greet("Bob", "Hi"));                // "Hi, Bob"
console.log(greet("Charlie", "Hey", " - "));    // "Hey - Charlie"`,
      solution: `function greet(name: string, greeting: string = "Hello", separator: string = ", "): string {
  return greeting + separator + name;
}

console.log(greet("Alice"));                    // "Hello, Alice"
console.log(greet("Bob", "Hi"));                // "Hi, Bob"
console.log(greet("Charlie", "Hey", " - "));    // "Hey - Charlie"`,
      hints: [
        'Default parameters provide fallback values.',
        'Just use the parameters directly -- defaults fill in when not provided.',
        'return greeting + separator + name;',
      ],
      concepts: ['default parameters', 'optional arguments'],
    },
    {
      id: 'ts-fn-8',
      title: 'Optional parameters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that builds a URL path. The query parameter is optional.',
      skeleton: `function buildPath(base: string, path: string, query?: string): string {
  // Return base + path, and append "?" + query if provided
}

console.log(buildPath("https://api.com", "/users"));             // "https://api.com/users"
console.log(buildPath("https://api.com", "/users", "active=1")); // "https://api.com/users?active=1"`,
      solution: `function buildPath(base: string, path: string, query?: string): string {
  let url = base + path;
  if (query) {
    url += "?" + query;
  }
  return url;
}

console.log(buildPath("https://api.com", "/users"));             // "https://api.com/users"
console.log(buildPath("https://api.com", "/users", "active=1")); // "https://api.com/users?active=1"`,
      hints: [
        'Optional parameters may be undefined.',
        'Check if query is truthy before appending.',
        'let url = base + path; if (query) url += "?" + query; return url;',
      ],
      concepts: ['optional parameters', 'conditional append'],
    },
    {
      id: 'ts-fn-9',
      title: 'Rest parameters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that joins strings with a separator, using rest parameters.',
      skeleton: `function joinWith(separator: string, ...parts: string[]): string {
  // Join all parts with the separator
}

console.log(joinWith("-", "a", "b", "c")); // "a-b-c"
console.log(joinWith(", ", "hello"));       // "hello"`,
      solution: `function joinWith(separator: string, ...parts: string[]): string {
  return parts.join(separator);
}

console.log(joinWith("-", "a", "b", "c")); // "a-b-c"
console.log(joinWith(", ", "hello"));       // "hello"`,
      hints: [
        'Rest parameters collect extra arguments into an array.',
        'Arrays have a join() method that takes a separator.',
        'return parts.join(separator);',
      ],
      concepts: ['rest parameters', 'join', 'variadic function'],
    },
    {
      id: 'ts-fn-10',
      title: 'Early return pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that validates a password. Use early returns for each check.',
      skeleton: `function validatePassword(password: string): string {
  // Return "too short" if < 8 chars
  // Return "needs uppercase" if no uppercase letter
  // Return "needs number" if no digit
  // Return "valid" if all checks pass
}

console.log(validatePassword("abc"));          // "too short"
console.log(validatePassword("abcdefgh"));     // "needs uppercase"
console.log(validatePassword("Abcdefgh"));     // "needs number"
console.log(validatePassword("Abcdefg1"));     // "valid"`,
      solution: `function validatePassword(password: string): string {
  if (password.length < 8) return "too short";
  if (!/[A-Z]/.test(password)) return "needs uppercase";
  if (!/[0-9]/.test(password)) return "needs number";
  return "valid";
}

console.log(validatePassword("abc"));          // "too short"
console.log(validatePassword("abcdefgh"));     // "needs uppercase"
console.log(validatePassword("Abcdefgh"));     // "needs number"
console.log(validatePassword("Abcdefg1"));     // "valid"`,
      hints: [
        'Check each condition and return immediately if it fails.',
        'Use regex /[A-Z]/ for uppercase and /[0-9]/ for digits.',
        'if (password.length < 8) return "too short"; if (!/[A-Z]/.test(password)) return "needs uppercase";',
      ],
      concepts: ['early return', 'validation', 'regex'],
    },
    {
      id: 'ts-fn-11',
      title: 'Multiple return paths',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This function sometimes returns undefined because of a missing return. Fix it.',
      skeleton: `function classify(n: number): string {
  if (n > 0) {
    return "positive";
  } else if (n < 0) {
    return "negative";
  }
  // Bug: no return for n === 0
}

console.log(classify(0)); // should be "zero"`,
      solution: `function classify(n: number): string {
  if (n > 0) {
    return "positive";
  } else if (n < 0) {
    return "negative";
  }
  return "zero";
}

console.log(classify(0)); // "zero"`,
      hints: [
        'The function is missing a return for when n is 0.',
        'Add a return "zero" at the end.',
        'Add: return "zero"; after the else if block.',
      ],
      concepts: ['return paths', 'exhaustive returns', 'bug'],
    },
    {
      id: 'ts-fn-12',
      title: 'Callback basics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that applies a callback to each element of an array and returns the results.',
      skeleton: `function mapArray(arr: number[], callback: (n: number) => number): number[] {
  // Apply callback to each element
}

console.log(mapArray([1, 2, 3], n => n * 2));     // [2, 4, 6]
console.log(mapArray([4, 9, 16], n => Math.sqrt(n))); // [2, 3, 4]`,
      solution: `function mapArray(arr: number[], callback: (n: number) => number): number[] {
  const result: number[] = [];
  for (const item of arr) {
    result.push(callback(item));
  }
  return result;
}

console.log(mapArray([1, 2, 3], n => n * 2));     // [2, 4, 6]
console.log(mapArray([4, 9, 16], n => Math.sqrt(n))); // [2, 3, 4]`,
      hints: [
        'Loop over the array and call the callback on each element.',
        'Push the result of callback(item) into a new array.',
        'for (const item of arr) { result.push(callback(item)); }',
      ],
      concepts: ['callbacks', 'higher-order function', 'mapping'],
    },
    {
      id: 'ts-fn-13',
      title: 'Function as value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that returns a different function based on the operation string.',
      skeleton: `function getOperation(op: "add" | "multiply"): (a: number, b: number) => number {
  // Return the appropriate function
}

const add = getOperation("add");
const mul = getOperation("multiply");
console.log(add(3, 4));  // 7
console.log(mul(3, 4));  // 12`,
      solution: `function getOperation(op: "add" | "multiply"): (a: number, b: number) => number {
  if (op === "add") {
    return (a, b) => a + b;
  }
  return (a, b) => a * b;
}

const add = getOperation("add");
const mul = getOperation("multiply");
console.log(add(3, 4));  // 7
console.log(mul(3, 4));  // 12`,
      hints: [
        'Functions are first-class values -- they can be returned from other functions.',
        'Return arrow functions for each operation.',
        'if (op === "add") return (a, b) => a + b; return (a, b) => a * b;',
      ],
      concepts: ['first-class functions', 'returning functions', 'factory'],
    },
    {
      id: 'ts-fn-14',
      title: 'Closure intro',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that creates a counter. Each call to the returned function increments and returns the count.',
      skeleton: `function createCounter(start: number = 0): () => number {
  // Return a function that increments and returns the count
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3`,
      solution: `function createCounter(start: number = 0): () => number {
  let count = start;
  return () => {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3`,
      hints: [
        'The returned function "closes over" the count variable.',
        'Each call to the returned function modifies the shared count.',
        'let count = start; return () => { count++; return count; };',
      ],
      concepts: ['closure', 'state', 'counter pattern'],
    },
    {
      id: 'ts-fn-15',
      title: 'IIFE pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use an IIFE to create a module-like scope that exposes only a public API.',
      skeleton: `const counter = (() => {
  // Private state
  // Return object with increment() and getCount() methods
})();

counter.increment();
counter.increment();
console.log(counter.getCount()); // 2`,
      solution: `const counter = (() => {
  let count = 0;
  return {
    increment() { count++; },
    getCount() { return count; },
  };
})();

counter.increment();
counter.increment();
console.log(counter.getCount()); // 2`,
      hints: [
        'An IIFE is a function that executes immediately: (() => { ... })()',
        'Declare private state inside, return a public API object.',
        'let count = 0; return { increment() { count++; }, getCount() { return count; } };',
      ],
      concepts: ['IIFE', 'module pattern', 'encapsulation'],
    },
    {
      id: 'ts-fn-16',
      title: 'Pure function',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This function has a side effect -- it modifies the input array. Fix it to be a pure function.',
      skeleton: `function addItem(items: string[], newItem: string): string[] {
  items.push(newItem); // side effect!
  return items;
}

const original = ["a", "b"];
const updated = addItem(original, "c");
console.log(original); // should still be ["a", "b"]
console.log(updated);  // ["a", "b", "c"]`,
      solution: `function addItem(items: string[], newItem: string): string[] {
  return [...items, newItem];
}

const original = ["a", "b"];
const updated = addItem(original, "c");
console.log(original); // ["a", "b"]
console.log(updated);  // ["a", "b", "c"]`,
      hints: [
        'push() mutates the original array.',
        'Create a new array instead of modifying the input.',
        'return [...items, newItem]; creates a new array.',
      ],
      concepts: ['pure function', 'immutability', 'spread'],
    },
    {
      id: 'ts-fn-17',
      title: 'Passing functions',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function retry that calls an action up to n times until it returns true.',
      skeleton: `function retry(action: () => boolean, maxAttempts: number): boolean {
  // Call action up to maxAttempts times
  // Return true if action ever returns true, false otherwise
}

let attempt = 0;
const result = retry(() => {
  attempt++;
  return attempt === 3;
}, 5);
console.log(result); // true (succeeded on 3rd attempt)`,
      solution: `function retry(action: () => boolean, maxAttempts: number): boolean {
  for (let i = 0; i < maxAttempts; i++) {
    if (action()) return true;
  }
  return false;
}

let attempt = 0;
const result = retry(() => {
  attempt++;
  return attempt === 3;
}, 5);
console.log(result); // true`,
      hints: [
        'Loop up to maxAttempts and call action() each time.',
        'If action() returns true, return true immediately.',
        'for (let i = 0; i < maxAttempts; i++) { if (action()) return true; } return false;',
      ],
      concepts: ['callbacks', 'retry pattern', 'loop'],
    },
    {
      id: 'ts-fn-18',
      title: 'Function scope',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const x = "global";

function outer(): void {
  const x = "outer";

  function inner(): void {
    const x = "inner";
    console.log(x);
  }

  inner();
  console.log(x);
}

outer();
console.log(x);`,
      solution: `inner
outer
global`,
      hints: [
        'Each function creates its own scope with its own x.',
        'inner() prints its local x, outer() prints its local x.',
        'Output: inner, outer, global.',
      ],
      concepts: ['function scope', 'shadowing', 'lexical scope'],
    },
    {
      id: 'ts-fn-19',
      title: 'Side effects awareness',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What does this code output? Identify the side effect.',
      skeleton: `let total = 0;

function addToTotal(n: number): number {
  total += n;  // side effect
  return total;
}

console.log(addToTotal(5));
console.log(addToTotal(3));
console.log(total);`,
      solution: `5
8
8`,
      hints: [
        'The function modifies the external variable total.',
        'Each call adds to the running total: 0+5=5, 5+3=8.',
        'Output: 5, 8, 8.',
      ],
      concepts: ['side effects', 'mutable state', 'impure function'],
    },
    {
      id: 'ts-fn-20',
      title: 'Refactor to pure functions',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this impure code to use pure functions. Remove all side effects and external state.',
      skeleton: `let users: string[] = [];

function addUser(name: string): void {
  users.push(name);
}

function getUsers(): string[] {
  return users;
}

addUser("Alice");
addUser("Bob");
console.log(getUsers()); // ["Alice", "Bob"]`,
      solution: `function addUser(users: readonly string[], name: string): string[] {
  return [...users, name];
}

function getUsers(users: readonly string[]): string[] {
  return [...users];
}

let users: string[] = [];
users = addUser(users, "Alice");
users = addUser(users, "Bob");
console.log(getUsers(users)); // ["Alice", "Bob"]`,
      hints: [
        'Pure functions take input and return output without side effects.',
        'Pass the users array in and return a new array out.',
        'function addUser(users: readonly string[], name: string): string[] { return [...users, name]; }',
      ],
      concepts: ['refactoring', 'pure functions', 'immutability'],
    },
  ],
};
