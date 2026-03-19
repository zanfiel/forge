import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-conditionals',
  title: '5. Conditionals & Control Flow',
  explanation: `## Conditionals & Control Flow

Conditionals let your program make decisions.

### if / else
The fundamental branching construct. Executes code blocks based on boolean conditions.

### switch / case
Compares a value against multiple cases. Always include \\\`break\\\` (or \\\`return\\\`) to avoid fall-through. TypeScript can check for exhaustiveness in switch statements over union types.

### Truthiness & Falsiness
Falsy values in JavaScript/TypeScript: \\\`false\\\`, \\\`0\\\`, \\\`""\\\`, \\\`null\\\`, \\\`undefined\\\`, \\\`NaN\\\`.
Everything else is truthy.

### Guard Clauses & Early Returns
Return early from functions to reduce nesting and improve readability.

### Type Narrowing in Conditionals
TypeScript narrows types inside conditional blocks based on checks like \\\`typeof\\\`, \\\`instanceof\\\`, and \\\`in\\\`.

### Short-Circuit Evaluation
\\\`&&\\\` stops at the first falsy value; \\\`||\\\` stops at the first truthy value. This is often used for conditional execution.
`,
  exercises: [
    {
      id: 'ts-cond-1',
      title: 'Basic if/else',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the keyword to complete the conditional.',
      skeleton: `const age = 20;
__BLANK__ (age >= 18) {
  console.log("adult");
} else {
  console.log("minor");
}`,
      solution: `const age = 20;
if (age >= 18) {
  console.log("adult");
} else {
  console.log("minor");
}`,
      hints: [
        'What keyword starts a conditional block?',
        'The most basic conditional keyword in TypeScript.',
        'The answer is: if',
      ],
      concepts: ['if/else', 'conditional'],
    },
    {
      id: 'ts-cond-2',
      title: 'else if chain',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the missing else if clause to handle the "B" grade.',
      skeleton: `function getGrade(score: number): string {
  if (score >= 90) {
    return "A";
  } __BLANK__ (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else {
    return "F";
  }
}
console.log(getGrade(85)); // "B"`,
      solution: `function getGrade(score: number): string {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else {
    return "F";
  }
}
console.log(getGrade(85)); // "B"`,
      hints: [
        'What two keywords create an additional conditional branch?',
        'Use else if to add another condition.',
        'The answer is: else if',
      ],
      concepts: ['else if', 'chained conditionals'],
    },
    {
      id: 'ts-cond-3',
      title: 'Switch case basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the keyword that prevents fall-through in a switch statement.',
      skeleton: `function dayName(day: number): string {
  switch (day) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    default: return "Other";
  }
}
console.log(dayName(1)); // "Monday"`,
      solution: `function dayName(day: number): string {
  switch (day) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    default: return "Other";
  }
}
console.log(dayName(1)); // "Monday"`,
      hints: [
        'Using return in each case already prevents fall-through.',
        'Alternatively, break prevents fall-through.',
        'This code is already correct -- return exits the function.',
      ],
      concepts: ['switch', 'case', 'return'],
    },
    {
      id: 'ts-cond-4',
      title: 'Truthiness check',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const values = [0, "", null, "hello", 42, undefined, false, true];
const truthy = values.filter(Boolean);
console.log(truthy);`,
      solution: `[ 'hello', 42, true ]`,
      hints: [
        'Boolean() converts values to true or false.',
        'Falsy values: 0, "", null, undefined, false.',
        'Output: ["hello", 42, true]',
      ],
      concepts: ['truthiness', 'falsy values', 'filter'],
    },
    {
      id: 'ts-cond-5',
      title: 'Ternary expression',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that returns "positive", "negative", or "zero" using ternary expressions.',
      skeleton: `function classify(n: number): string {
  // Use ternary operators (no if/else)
}

console.log(classify(5));   // "positive"
console.log(classify(-3));  // "negative"
console.log(classify(0));   // "zero"`,
      solution: `function classify(n: number): string {
  return n > 0 ? "positive" : n < 0 ? "negative" : "zero";
}

console.log(classify(5));   // "positive"
console.log(classify(-3));  // "negative"
console.log(classify(0));   // "zero"`,
      hints: [
        'You can nest ternary operators for multiple conditions.',
        'condition1 ? value1 : condition2 ? value2 : value3',
        'return n > 0 ? "positive" : n < 0 ? "negative" : "zero";',
      ],
      concepts: ['ternary operator', 'nested ternary'],
    },
    {
      id: 'ts-cond-6',
      title: 'Guard clause',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Rewrite this function to use a guard clause (early return) instead of nested if/else.',
      skeleton: `function processOrder(order: { status: string; total: number } | null): string {
  // If order is null, return "No order"
  // If order.total <= 0, return "Invalid total"
  // Otherwise return "Processing order for $TOTAL"
}

console.log(processOrder(null));                           // "No order"
console.log(processOrder({ status: "new", total: 0 }));   // "Invalid total"
console.log(processOrder({ status: "new", total: 50 }));  // "Processing order for $50"`,
      solution: `function processOrder(order: { status: string; total: number } | null): string {
  if (order === null) return "No order";
  if (order.total <= 0) return "Invalid total";
  return "Processing order for $" + order.total;
}

console.log(processOrder(null));                           // "No order"
console.log(processOrder({ status: "new", total: 0 }));   // "Invalid total"
console.log(processOrder({ status: "new", total: 50 }));  // "Processing order for $50"`,
      hints: [
        'A guard clause returns early for invalid cases.',
        'Check null first, then invalid total, then proceed with the happy path.',
        'if (order === null) return "No order"; if (order.total <= 0) return "Invalid total";',
      ],
      concepts: ['guard clause', 'early return', 'null check'],
    },
    {
      id: 'ts-cond-7',
      title: 'Switch with return',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that converts a traffic light color to an action using a switch statement with returns.',
      skeleton: `function trafficAction(color: "red" | "yellow" | "green"): string {
  // Use switch with return
}

console.log(trafficAction("red"));    // "stop"
console.log(trafficAction("yellow")); // "caution"
console.log(trafficAction("green"));  // "go"`,
      solution: `function trafficAction(color: "red" | "yellow" | "green"): string {
  switch (color) {
    case "red": return "stop";
    case "yellow": return "caution";
    case "green": return "go";
  }
}

console.log(trafficAction("red"));    // "stop"
console.log(trafficAction("yellow")); // "caution"
console.log(trafficAction("green"));  // "go"`,
      hints: [
        'Each case can directly return a value.',
        'With a union type, no default is needed if all cases are covered.',
        'case "red": return "stop"; case "yellow": return "caution"; case "green": return "go";',
      ],
      concepts: ['switch', 'return', 'literal types'],
    },
    {
      id: 'ts-cond-8',
      title: 'Exhaustive switch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an exhaustive switch that handles all variants of a Shape type. Use a never check in the default case to ensure exhaustiveness.',
      skeleton: `type Shape = "circle" | "square" | "triangle";

function sides(shape: Shape): number {
  switch (shape) {
    case "circle": return 0;
    case "square": return 4;
    case "triangle": return 3;
    default: {
      const _exhaustive: never = shape;
      return _exhaustive;
    }
  }
}

console.log(sides("square"));   // 4
console.log(sides("triangle")); // 3`,
      solution: `type Shape = "circle" | "square" | "triangle";

function sides(shape: Shape): number {
  switch (shape) {
    case "circle": return 0;
    case "square": return 4;
    case "triangle": return 3;
    default: {
      const _exhaustive: never = shape;
      return _exhaustive;
    }
  }
}

console.log(sides("square"));   // 4
console.log(sides("triangle")); // 3`,
      hints: [
        'The never type ensures all cases of the union are handled.',
        'If you add a new Shape variant, the default case will cause a compile error.',
        'This pattern is called the exhaustiveness check.',
      ],
      concepts: ['exhaustive switch', 'never', 'union types'],
    },
    {
      id: 'ts-cond-9',
      title: 'Short-circuit execution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const user: { name?: string } = {};
const displayName = user.name || "Guest";
const actualName = user.name ?? "Guest";
console.log(displayName);
console.log(actualName);

const user2: { name?: string } = { name: "" };
const displayName2 = user2.name || "Guest";
const actualName2 = user2.name ?? "Guest";
console.log(displayName2);
console.log(actualName2);`,
      solution: `Guest
Guest
Guest
`,
      hints: [
        '|| treats "" as falsy. ?? only treats null/undefined as nullish.',
        'For user with no name, both give "Guest".',
        'For user2 with name "", || gives "Guest" but ?? gives "".',
      ],
      concepts: ['short-circuit', '||', '??', 'falsy vs nullish'],
    },
    {
      id: 'ts-cond-10',
      title: 'Type narrowing in conditionals',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that accepts string | number and returns the value doubled. For strings, double means concatenate with itself. For numbers, double means multiply by 2.',
      skeleton: `function double(value: string | number): string | number {
  // Use typeof to narrow the type
}

console.log(double("ha"));  // "haha"
console.log(double(21));    // 42`,
      solution: `function double(value: string | number): string | number {
  if (typeof value === "string") {
    return value + value;
  }
  return value * 2;
}

console.log(double("ha"));  // "haha"
console.log(double(21));    // 42`,
      hints: [
        'Use typeof to check if the value is a string or number.',
        'Inside the if block, TypeScript narrows the type.',
        'if (typeof value === "string") { return value + value; } return value * 2;',
      ],
      concepts: ['type narrowing', 'typeof', 'union types'],
    },
    {
      id: 'ts-cond-11',
      title: 'Nested conditionals cleanup',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This deeply nested code has a logic bug -- it never returns "admin". Fix it.',
      skeleton: `function getRole(user: { isAdmin: boolean; isMod: boolean }): string {
  if (user.isAdmin) {
    if (user.isMod) {
      return "admin-mod";
    }
  } else {
    return "user";
  }
  return "user";
}

console.log(getRole({ isAdmin: true, isMod: false }));  // should be "admin"
console.log(getRole({ isAdmin: true, isMod: true }));   // should be "admin-mod"
console.log(getRole({ isAdmin: false, isMod: false })); // should be "user"`,
      solution: `function getRole(user: { isAdmin: boolean; isMod: boolean }): string {
  if (user.isAdmin && user.isMod) {
    return "admin-mod";
  }
  if (user.isAdmin) {
    return "admin";
  }
  return "user";
}

console.log(getRole({ isAdmin: true, isMod: false }));  // "admin"
console.log(getRole({ isAdmin: true, isMod: true }));   // "admin-mod"
console.log(getRole({ isAdmin: false, isMod: false })); // "user"`,
      hints: [
        'When isAdmin is true but isMod is false, the code falls through to return "user".',
        'Flatten the nesting: check admin+mod first, then admin alone, then default.',
        'Use guard clauses: if (isAdmin && isMod) return "admin-mod"; if (isAdmin) return "admin";',
      ],
      concepts: ['nested conditionals', 'logic bug', 'guard clauses'],
    },
    {
      id: 'ts-cond-12',
      title: 'Conditional assignment pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that assigns a shipping rate based on weight using conditional logic.',
      skeleton: `function shippingRate(weightKg: number): number {
  // Under 1kg: 5
  // 1-5kg: 10
  // Over 5kg: 20
}

console.log(shippingRate(0.5));  // 5
console.log(shippingRate(3));    // 10
console.log(shippingRate(10));   // 20`,
      solution: `function shippingRate(weightKg: number): number {
  if (weightKg < 1) return 5;
  if (weightKg <= 5) return 10;
  return 20;
}

console.log(shippingRate(0.5));  // 5
console.log(shippingRate(3));    // 10
console.log(shippingRate(10));   // 20`,
      hints: [
        'Use if/else or guard clauses for the weight ranges.',
        'Check the smallest range first, then medium, then large.',
        'if (weightKg < 1) return 5; if (weightKg <= 5) return 10; return 20;',
      ],
      concepts: ['conditional assignment', 'range check', 'guard clauses'],
    },
    {
      id: 'ts-cond-13',
      title: 'Switch true pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use the switch(true) pattern to classify a temperature into "cold", "mild", "warm", or "hot".',
      skeleton: `function classify(tempC: number): string {
  // Use switch(true) pattern
  // < 0: "cold"
  // 0-15: "mild"
  // 16-30: "warm"
  // > 30: "hot"
}

console.log(classify(-5));  // "cold"
console.log(classify(10));  // "mild"
console.log(classify(25));  // "warm"
console.log(classify(35));  // "hot"`,
      solution: `function classify(tempC: number): string {
  switch (true) {
    case tempC < 0: return "cold";
    case tempC <= 15: return "mild";
    case tempC <= 30: return "warm";
    default: return "hot";
  }
}

console.log(classify(-5));  // "cold"
console.log(classify(10));  // "mild"
console.log(classify(25));  // "warm"
console.log(classify(35));  // "hot"`,
      hints: [
        'switch(true) evaluates each case as a boolean expression.',
        'The first case that evaluates to true is matched.',
        'switch (true) { case tempC < 0: return "cold"; ... }',
      ],
      concepts: ['switch true', 'range matching', 'pattern'],
    },
    {
      id: 'ts-cond-14',
      title: 'Complex boolean logic',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that determines if a user can access a resource. Access is granted if: (1) user is admin, OR (2) user is active AND (has role "editor" OR has role "reviewer").',
      skeleton: `interface User {
  isAdmin: boolean;
  isActive: boolean;
  role: string;
}

function canAccess(user: User): boolean {
  // Your code here
}

console.log(canAccess({ isAdmin: true, isActive: false, role: "viewer" }));   // true
console.log(canAccess({ isAdmin: false, isActive: true, role: "editor" }));   // true
console.log(canAccess({ isAdmin: false, isActive: true, role: "viewer" }));   // false
console.log(canAccess({ isAdmin: false, isActive: false, role: "editor" }));  // false`,
      solution: `interface User {
  isAdmin: boolean;
  isActive: boolean;
  role: string;
}

function canAccess(user: User): boolean {
  return user.isAdmin || (user.isActive && (user.role === "editor" || user.role === "reviewer"));
}

console.log(canAccess({ isAdmin: true, isActive: false, role: "viewer" }));   // true
console.log(canAccess({ isAdmin: false, isActive: true, role: "editor" }));   // true
console.log(canAccess({ isAdmin: false, isActive: true, role: "viewer" }));   // false
console.log(canAccess({ isAdmin: false, isActive: false, role: "editor" }));  // false`,
      hints: [
        'Use || for OR conditions and && for AND conditions.',
        'Use parentheses to group: admin OR (active AND (editor OR reviewer)).',
        'return user.isAdmin || (user.isActive && (user.role === "editor" || user.role === "reviewer"));',
      ],
      concepts: ['boolean logic', 'operator precedence', 'access control'],
    },
    {
      id: 'ts-cond-15',
      title: 'Nullish checks pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that safely processes a value that might be null, undefined, or a valid number. Return the number doubled, or 0 if null/undefined.',
      skeleton: `function safeDouble(value: number | null | undefined): number {
  // Your code here
}

console.log(safeDouble(5));         // 10
console.log(safeDouble(null));      // 0
console.log(safeDouble(undefined)); // 0
console.log(safeDouble(0));         // 0 (0 doubled is still 0)`,
      solution: `function safeDouble(value: number | null | undefined): number {
  return (value ?? 0) * 2;
}

console.log(safeDouble(5));         // 10
console.log(safeDouble(null));      // 0
console.log(safeDouble(undefined)); // 0
console.log(safeDouble(0));         // 0`,
      hints: [
        'Use ?? to provide a default of 0 for null/undefined.',
        '(value ?? 0) gives the value if it exists, or 0 otherwise.',
        'return (value ?? 0) * 2;',
      ],
      concepts: ['nullish coalescing', 'null handling', 'safe computation'],
    },
    {
      id: 'ts-cond-16',
      title: 'if with declarations',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Parse a string to a number and only use it if parsing succeeds (not NaN). Use a local variable inside the if condition.',
      skeleton: `function parseAndDouble(input: string): number | null {
  // Parse input to a number
  // If it is a valid number (not NaN), return it doubled
  // Otherwise return null
}

console.log(parseAndDouble("42"));     // 84
console.log(parseAndDouble("hello"));  // null`,
      solution: `function parseAndDouble(input: string): number | null {
  const parsed = Number(input);
  if (!isNaN(parsed)) {
    return parsed * 2;
  }
  return null;
}

console.log(parseAndDouble("42"));     // 84
console.log(parseAndDouble("hello"));  // null`,
      hints: [
        'Use Number() to parse and isNaN() to check.',
        'Declare the parsed value, then check it with isNaN.',
        'const parsed = Number(input); if (!isNaN(parsed)) return parsed * 2;',
      ],
      concepts: ['Number parsing', 'isNaN', 'conditional declaration'],
    },
    {
      id: 'ts-cond-17',
      title: 'Multiple conditions refactor',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this function to use an array of valid statuses and includes() instead of multiple OR conditions.',
      skeleton: `function isValidStatus(status: string): boolean {
  if (status === "active" || status === "pending" || status === "approved" || status === "review") {
    return true;
  }
  return false;
}

console.log(isValidStatus("active"));   // true
console.log(isValidStatus("deleted"));  // false`,
      solution: `function isValidStatus(status: string): boolean {
  const validStatuses = ["active", "pending", "approved", "review"];
  return validStatuses.includes(status);
}

console.log(isValidStatus("active"));   // true
console.log(isValidStatus("deleted"));  // false`,
      hints: [
        'Multiple OR comparisons with the same variable can be replaced with an array.',
        'Use Array.includes() to check membership.',
        'const validStatuses = ["active", "pending", "approved", "review"]; return validStatuses.includes(status);',
      ],
      concepts: ['refactoring', 'includes', 'array membership'],
    },
    {
      id: 'ts-cond-18',
      title: 'Fix truthiness bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This function incorrectly treats 0 and empty string as missing values. Fix it to only default on null/undefined.',
      skeleton: `function displayValue(value: string | number | null | undefined): string {
  if (!value) {
    return "N/A";
  }
  return String(value);
}

console.log(displayValue("hello"));    // "hello"
console.log(displayValue(42));         // "42"
console.log(displayValue(0));          // should be "0", not "N/A"
console.log(displayValue(""));         // should be "", not "N/A"
console.log(displayValue(null));       // "N/A"
console.log(displayValue(undefined));  // "N/A"`,
      solution: `function displayValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return "N/A";
  }
  return String(value);
}

console.log(displayValue("hello"));    // "hello"
console.log(displayValue(42));         // "42"
console.log(displayValue(0));          // "0"
console.log(displayValue(""));         // ""
console.log(displayValue(null));       // "N/A"
console.log(displayValue(undefined));  // "N/A"`,
      hints: [
        '!value is true for all falsy values: 0, "", null, undefined, false.',
        'Check specifically for null and undefined instead.',
        'if (value === null || value === undefined) -- or use value == null which matches both.',
      ],
      concepts: ['truthiness bug', 'null check', 'falsy values'],
    },
    {
      id: 'ts-cond-19',
      title: 'Assertion-like narrowing',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function ensureString that throws if the value is not a string, and returns the string otherwise. Use this to narrow types.',
      skeleton: `function ensureString(value: unknown): string {
  // Throw if not a string, return the string otherwise
}

const input: unknown = "hello";
const result: string = ensureString(input);
console.log(result); // "hello"

try {
  ensureString(42);
} catch (e) {
  console.log("caught"); // "caught"
}`,
      solution: `function ensureString(value: unknown): string {
  if (typeof value !== "string") {
    throw new Error("Expected a string, got " + typeof value);
  }
  return value;
}

const input: unknown = "hello";
const result: string = ensureString(input);
console.log(result); // "hello"

try {
  ensureString(42);
} catch (e) {
  console.log("caught"); // "caught"
}`,
      hints: [
        'Check typeof and throw if it is not "string".',
        'After the throw, TypeScript knows the value must be a string.',
        'if (typeof value !== "string") throw new Error(...); return value;',
      ],
      concepts: ['assertion', 'type narrowing', 'throw', 'unknown'],
    },
    {
      id: 'ts-cond-20',
      title: 'Refactor deeply nested conditions',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this deeply nested conditional into a flat structure using early returns.',
      skeleton: `function processPayment(amount: number, method: string | null, verified: boolean): string {
  if (amount > 0) {
    if (method !== null) {
      if (verified) {
        if (method === "card" || method === "bank") {
          return "Payment of $" + amount + " via " + method + " processed";
        } else {
          return "Unsupported payment method";
        }
      } else {
        return "User not verified";
      }
    } else {
      return "No payment method";
    }
  } else {
    return "Invalid amount";
  }
}

console.log(processPayment(50, "card", true));    // "Payment of $50 via card processed"
console.log(processPayment(0, "card", true));     // "Invalid amount"
console.log(processPayment(50, null, true));      // "No payment method"
console.log(processPayment(50, "card", false));   // "User not verified"
console.log(processPayment(50, "crypto", true));  // "Unsupported payment method"`,
      solution: `function processPayment(amount: number, method: string | null, verified: boolean): string {
  if (amount <= 0) return "Invalid amount";
  if (method === null) return "No payment method";
  if (!verified) return "User not verified";
  if (method !== "card" && method !== "bank") return "Unsupported payment method";
  return "Payment of $" + amount + " via " + method + " processed";
}

console.log(processPayment(50, "card", true));    // "Payment of $50 via card processed"
console.log(processPayment(0, "card", true));     // "Invalid amount"
console.log(processPayment(50, null, true));      // "No payment method"
console.log(processPayment(50, "card", false));   // "User not verified"
console.log(processPayment(50, "crypto", true));  // "Unsupported payment method"`,
      hints: [
        'Convert each nested else into an early return at the top level.',
        'Check error conditions first, return early, then handle the happy path.',
        'if (amount <= 0) return ...; if (method === null) return ...; if (!verified) return ...;',
      ],
      concepts: ['refactoring', 'early return', 'guard clauses', 'flatten nesting'],
    },
  ],
};
