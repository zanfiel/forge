import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-guards',
  title: '39. Type Guards & Assertions',
  explanation: `## Type Guards & Assertions

Type guards narrow types at runtime, letting TypeScript understand what type a value is within a conditional branch.

### typeof Guards
\\\`typeof x === "string"\\\` narrows x to string. Works for primitives: string, number, boolean, symbol, bigint, undefined, function.

### instanceof Guards
\\\`x instanceof Class\\\` narrows x to that class type.

### in Operator Guards
\\\`"property" in x\\\` narrows x to types that have that property.

### Custom Type Guards
A function returning \\\`x is Type\\\` tells TypeScript the parameter is that type when the function returns true.

### Assertion Functions
A function with return type \\\`asserts x is Type\\\` throws if the condition fails, otherwise narrows the type.

### Discriminated Union Guards
Check a shared discriminant property (\\\`type\\\`, \\\`kind\\\`) to narrow union types.

### as const and as Type
\\\`as const\\\` narrows to literal types. \\\`as Type\\\` is a type assertion (cast) that overrides the compiler.

### Non-null Assertion
The \\\`!\\\` postfix operator tells TypeScript a value is not null/undefined.

### Key Rules
- Prefer type guards over type assertions.
- Custom type guards should be pure and reliable.
- Use assertion functions for preconditions at function entry.
`,
  exercises: [
    {
      id: 'ts-guards-1',
      title: 'typeof guard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use a typeof guard to narrow the union type.',
      skeleton: `function double(value: string | number): string | number {
  if (__BLANK__ value === "string") {
    return value.repeat(2);
  }
  return value * 2;
}`,
      solution: `function double(value: string | number): string | number {
  if (typeof value === "string") {
    return value.repeat(2);
  }
  return value * 2;
}`,
      hints: [
        'Which operator checks the runtime type of a value?',
        'typeof returns a string like "string", "number", etc.',
        'The answer is: typeof',
      ],
      concepts: ['typeof guard', 'type narrowing'],
    },
    {
      id: 'ts-guards-2',
      title: 'instanceof guard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use instanceof to narrow the error type.',
      skeleton: `class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function handleError(error: unknown): string {
  if (error __BLANK__ HttpError) {
    return \\\`HTTP \${error.status}: \${error.message}\\\`;
  }
  return "Unknown error";
}`,
      solution: `class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function handleError(error: unknown): string {
  if (error instanceof HttpError) {
    return \\\`HTTP \${error.status}: \${error.message}\\\`;
  }
  return "Unknown error";
}`,
      hints: [
        'Which operator checks if an object is an instance of a class?',
        'Use instanceof to check the prototype chain.',
        'The answer is: instanceof',
      ],
      concepts: ['instanceof guard', 'class type narrowing'],
    },
    {
      id: 'ts-guards-3',
      title: 'in operator guard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use the "in" operator to narrow a union type based on a property.',
      skeleton: `interface Dog { bark(): void; breed: string; }
interface Cat { meow(): void; color: string; }

function speak(animal: Dog | Cat): void {
  if ("bark" __BLANK__ animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}`,
      solution: `interface Dog { bark(): void; breed: string; }
interface Cat { meow(): void; color: string; }

function speak(animal: Dog | Cat): void {
  if ("bark" in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}`,
      hints: [
        'The "in" operator checks if a property exists on an object.',
        'TypeScript narrows the type based on which properties are present.',
        'The answer is: in',
      ],
      concepts: ['in operator guard', 'property-based narrowing'],
    },
    {
      id: 'ts-guards-4',
      title: 'Predict narrowing',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `function describe(x: string | number | boolean): string {
  if (typeof x === "string") return "string: " + x;
  if (typeof x === "number") return "number: " + x;
  return "boolean: " + x;
}

console.log(describe("hi"));
console.log(describe(42));
console.log(describe(true));`,
      solution: `string: hi
number: 42
boolean: true`,
      hints: [
        'Each typeof check narrows x to a specific type.',
        'The function returns the type name followed by the value.',
        'Output: string: hi, number: 42, boolean: true',
      ],
      concepts: ['typeof narrowing', 'union types'],
    },
    {
      id: 'ts-guards-5',
      title: 'Custom type guard function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a custom type guard function isString that checks if a value is a string.',
      skeleton: `// Write function isString(value: unknown): value is string
`,
      solution: `function isString(value: unknown): value is string {
  return typeof value === "string";
}

const input: unknown = "hello";
if (isString(input)) {
  console.log(input.toUpperCase()); // TypeScript knows input is string
}`,
      hints: [
        'A type guard function returns "value is Type" instead of boolean.',
        'The body performs the runtime check and returns true/false.',
        'function isString(value: unknown): value is string { return typeof value === "string"; }',
      ],
      concepts: ['custom type guard', 'is keyword', 'type predicate'],
    },
    {
      id: 'ts-guards-6',
      title: 'Nullish guard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Guard against null/undefined before accessing a property.',
      skeleton: `function getLength(value: string | null | undefined): number {
  if (value __BLANK__ null && value __BLANK__ undefined) {
    return value.length;
  }
  return 0;
}`,
      solution: `function getLength(value: string | null | undefined): number {
  if (value !== null && value !== undefined) {
    return value.length;
  }
  return 0;
}`,
      hints: [
        'Check that value is not null and not undefined.',
        'Use !== for strict inequality checks.',
        'The answer is: !== (both blanks)',
      ],
      concepts: ['null guard', 'undefined guard', 'strict inequality'],
    },
    {
      id: 'ts-guards-7',
      title: 'Assertion function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an assertion function that asserts a value is not null or undefined.',
      skeleton: `// Write function assertDefined<T>(value: T | null | undefined, name: string): asserts value is T
`,
      solution: `function assertDefined<T>(value: T | null | undefined, name: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(\\\`\${name} must be defined, got \${value}\\\`);
  }
}

const input: string | null = "hello";
assertDefined(input, "input");
console.log(input.toUpperCase()); // TypeScript knows input is string`,
      hints: [
        'Use the "asserts value is T" return type annotation.',
        'Throw an error if the value is null or undefined.',
        'After calling this function, TypeScript narrows the type automatically.',
      ],
      concepts: ['assertion function', 'asserts', 'non-null narrowing'],
    },
    {
      id: 'ts-guards-8',
      title: 'Discriminated union guard',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that uses a discriminant property to handle different shape types.',
      skeleton: `interface Circle { kind: "circle"; radius: number; }
interface Square { kind: "square"; side: number; }
interface Triangle { kind: "triangle"; base: number; height: number; }

type Shape = Circle | Square | Triangle;

// Write function area(shape: Shape): number
`,
      solution: `interface Circle { kind: "circle"; radius: number; }
interface Square { kind: "square"; side: number; }
interface Triangle { kind: "triangle"; base: number; height: number; }

type Shape = Circle | Square | Triangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}`,
      hints: [
        'Switch on the discriminant property "kind".',
        'Each case narrows the type to the specific shape.',
        'TypeScript knows which properties are available in each case.',
      ],
      concepts: ['discriminated union', 'switch narrowing', 'exhaustive check'],
    },
    {
      id: 'ts-guards-9',
      title: 'Array.isArray guard',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use Array.isArray to narrow a union type.',
      skeleton: `function sum(input: number | number[]): number {
  if (__BLANK__(input)) {
    return input.reduce((a, b) => a + b, 0);
  }
  return input;
}`,
      solution: `function sum(input: number | number[]): number {
  if (Array.isArray(input)) {
    return input.reduce((a, b) => a + b, 0);
  }
  return input;
}`,
      hints: [
        'Array.isArray is a built-in type guard for arrays.',
        'It narrows the type to the array variant of the union.',
        'The answer is: Array.isArray',
      ],
      concepts: ['Array.isArray', 'array type guard'],
    },
    {
      id: 'ts-guards-10',
      title: 'Truthiness guard',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does TypeScript infer after the truthiness check?',
      skeleton: `function process(value: string | null): void {
  if (value) {
    // What type is value here?
    console.log(value.toUpperCase());
  } else {
    console.log("no value");
  }
}

process("hello");
process(null);
process("");`,
      solution: `HELLO
no value
no value`,
      hints: [
        'Truthiness check eliminates null, undefined, and empty string.',
        '"hello" is truthy, null is falsy, "" is falsy.',
        'Output: HELLO, no value, no value',
      ],
      concepts: ['truthiness guard', 'falsy values', 'type narrowing'],
    },
    {
      id: 'ts-guards-11',
      title: 'Generic type guard',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic type guard that checks if an object has a specific property.',
      skeleton: `// Write function hasProperty<T extends string>(obj: unknown, prop: T): obj is Record<T, unknown>
`,
      solution: `function hasProperty<T extends string>(obj: unknown, prop: T): obj is Record<T, unknown> {
  return typeof obj === "object" && obj !== null && prop in obj;
}

const data: unknown = { name: "Alice", age: 30 };

if (hasProperty(data, "name")) {
  console.log(data.name); // TypeScript knows data has 'name'
}`,
      hints: [
        'The guard should check that obj is an object and the property exists.',
        'Use "prop in obj" after confirming obj is an object.',
        'Return type is "obj is Record<T, unknown>".',
      ],
      concepts: ['generic type guard', 'Record type', 'property check'],
    },
    {
      id: 'ts-guards-12',
      title: 'Guard composition',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write type guard functions for an API response and compose them to validate the full structure.',
      skeleton: `interface ApiResponse {
  status: number;
  data: { id: number; name: string };
}

// Write isApiResponse(value: unknown): value is ApiResponse
// Use multiple checks composed together
`,
      solution: `function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiResponse(value: unknown): value is ApiResponse {
  if (!isObject(value)) return false;
  if (typeof value.status !== "number") return false;
  if (!isObject(value.data)) return false;
  if (typeof value.data.id !== "number") return false;
  if (typeof value.data.name !== "string") return false;
  return true;
}

interface ApiResponse {
  status: number;
  data: { id: number; name: string };
}`,
      hints: [
        'Break validation into small, composable checks.',
        'Check each property type step by step.',
        'Start with isObject, then check nested properties.',
      ],
      concepts: ['guard composition', 'runtime validation', 'nested guards'],
    },
    {
      id: 'ts-guards-13',
      title: 'Fix: unsafe type assertion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code uses "as" to bypass type checking. Replace it with a proper type guard.',
      skeleton: `interface User {
  name: string;
  email: string;
}

function processInput(input: unknown): string {
  const user = input as User; // Unsafe!
  return user.name + " <" + user.email + ">";
}`,
      solution: `interface User {
  name: string;
  email: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof (value as any).name === "string" &&
    "email" in value &&
    typeof (value as any).email === "string"
  );
}

function processInput(input: unknown): string {
  if (!isUser(input)) {
    throw new Error("Invalid user input");
  }
  return input.name + " <" + input.email + ">";
}`,
      hints: [
        'Replace "as User" with a proper runtime check.',
        'Write a type guard function that validates all required properties.',
        'Throw an error if the input does not match the expected shape.',
      ],
      concepts: ['type assertion', 'type guard', 'runtime safety'],
    },
    {
      id: 'ts-guards-14',
      title: 'Non-null assertion',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use the non-null assertion operator to tell TypeScript the element exists.',
      skeleton: `const element = document.getElementById("app")__BLANK__;
element.textContent = "Hello";`,
      solution: `const element = document.getElementById("app")!;
element.textContent = "Hello";`,
      hints: [
        'getElementById returns HTMLElement | null.',
        'The non-null assertion operator tells TypeScript the value is not null.',
        'The answer is: !',
      ],
      concepts: ['non-null assertion', '! operator', 'nullable types'],
    },
    {
      id: 'ts-guards-15',
      title: 'as const assertion',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What is the inferred type of config with "as const"?',
      skeleton: `const config = {
  host: "localhost",
  port: 3000,
  features: ["auth", "logging"],
} as const;

// What is typeof config.host?
// What is typeof config.features?
console.log(typeof config.host);
console.log(Array.isArray(config.features));`,
      solution: `string
true`,
      hints: [
        'as const makes all properties readonly and narrows to literal types.',
        'typeof still returns the runtime type ("string"), not the TS type.',
        'Output: string, true',
      ],
      concepts: ['as const', 'literal types', 'readonly'],
    },
    {
      id: 'ts-guards-16',
      title: 'Exhaustive type guard',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type guard with exhaustive checking using never.',
      skeleton: `type Status = "active" | "inactive" | "pending";

// Write function getStatusLabel(status: Status): string
// Handle all cases with a default that uses never for exhaustiveness
`,
      solution: `type Status = "active" | "inactive" | "pending";

function assertNever(value: never): never {
  throw new Error(\\\`Unexpected value: \${value}\\\`);
}

function getStatusLabel(status: Status): string {
  switch (status) {
    case "active": return "Active";
    case "inactive": return "Inactive";
    case "pending": return "Pending";
    default: return assertNever(status);
  }
}`,
      hints: [
        'After all cases are handled, the remaining type should be never.',
        'Create an assertNever function that accepts never.',
        'If a new status is added but not handled, TypeScript will error.',
      ],
      concepts: ['exhaustive check', 'never', 'assertNever'],
    },
    {
      id: 'ts-guards-17',
      title: 'Type guard with classes',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write type guards for a class hierarchy to determine the specific subclass.',
      skeleton: `abstract class Vehicle {
  abstract type: string;
}

class Car extends Vehicle {
  type = "car" as const;
  doors: number = 4;
}

class Motorcycle extends Vehicle {
  type = "motorcycle" as const;
  cc: number = 600;
}

// Write type guard functions isCar and isMotorcycle
`,
      solution: `abstract class Vehicle {
  abstract type: string;
}

class Car extends Vehicle {
  type = "car" as const;
  doors: number = 4;
}

class Motorcycle extends Vehicle {
  type = "motorcycle" as const;
  cc: number = 600;
}

function isCar(vehicle: Vehicle): vehicle is Car {
  return vehicle instanceof Car;
}

function isMotorcycle(vehicle: Vehicle): vehicle is Motorcycle {
  return vehicle instanceof Motorcycle;
}

function describe(v: Vehicle): string {
  if (isCar(v)) return \\\`Car with \${v.doors} doors\\\`;
  if (isMotorcycle(v)) return \\\`Motorcycle with \${v.cc}cc\\\`;
  return "Unknown vehicle";
}`,
      hints: [
        'Use instanceof checks wrapped in type guard functions.',
        'The return type is "vehicle is Car" or "vehicle is Motorcycle".',
        'This provides both runtime safety and compile-time narrowing.',
      ],
      concepts: ['class type guard', 'instanceof', 'abstract class'],
    },
    {
      id: 'ts-guards-18',
      title: 'Fix: type guard not narrowing',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This type guard returns boolean instead of using "is" syntax, so TypeScript does not narrow. Fix it.',
      skeleton: `interface Fish { swim(): void; }
interface Bird { fly(): void; }

function isFish(pet: Fish | Bird): boolean {
  return "swim" in pet;
}

function move(pet: Fish | Bird): void {
  if (isFish(pet)) {
    pet.swim(); // Error: swim does not exist on Fish | Bird
  }
}`,
      solution: `interface Fish { swim(): void; }
interface Bird { fly(): void; }

function isFish(pet: Fish | Bird): pet is Fish {
  return "swim" in pet;
}

function move(pet: Fish | Bird): void {
  if (isFish(pet)) {
    pet.swim(); // OK: narrowed to Fish
  }
}`,
      hints: [
        'The return type must use "is" syntax for type narrowing.',
        'Change ": boolean" to ": pet is Fish".',
        'TypeScript only narrows when the return type is a type predicate.',
      ],
      concepts: ['type predicate', 'is keyword', 'narrowing fix'],
    },
    {
      id: 'ts-guards-19',
      title: 'Refactor: repeated narrowing',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor repeated inline type checks into reusable type guard functions.',
      skeleton: `type Response = { status: "success"; data: string } | { status: "error"; message: string };

function handleA(res: Response): void {
  if (res.status === "success") {
    console.log("A data:", res.data);
  } else {
    console.log("A error:", res.message);
  }
}

function handleB(res: Response): void {
  if (res.status === "success") {
    console.log("B data:", res.data);
  } else {
    console.log("B error:", res.message);
  }
}`,
      solution: `type SuccessResponse = { status: "success"; data: string };
type ErrorResponse = { status: "error"; message: string };
type Response = SuccessResponse | ErrorResponse;

function isSuccess(res: Response): res is SuccessResponse {
  return res.status === "success";
}

function isError(res: Response): res is ErrorResponse {
  return res.status === "error";
}

function handleA(res: Response): void {
  if (isSuccess(res)) {
    console.log("A data:", res.data);
  } else {
    console.log("A error:", res.message);
  }
}

function handleB(res: Response): void {
  if (isSuccess(res)) {
    console.log("B data:", res.data);
  } else {
    console.log("B error:", res.message);
  }
}`,
      hints: [
        'Extract the inline checks into named type guard functions.',
        'Create isSuccess and isError with proper type predicates.',
        'This improves readability and ensures consistent checking.',
      ],
      concepts: ['refactoring', 'reusable guards', 'type predicates'],
    },
    {
      id: 'ts-guards-20',
      title: 'Refactor: assertion chain',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor nested null checks into assertion functions for cleaner code.',
      skeleton: `interface Config {
  db?: {
    host?: string;
    port?: number;
  };
}

function connect(config: Config): void {
  if (!config.db) {
    throw new Error("db config required");
  }
  if (!config.db.host) {
    throw new Error("db.host required");
  }
  if (!config.db.port) {
    throw new Error("db.port required");
  }

  console.log(\\\`Connecting to \${config.db.host}:\${config.db.port}\\\`);
}`,
      solution: `interface Config {
  db?: {
    host?: string;
    port?: number;
  };
}

function assertDefined<T>(value: T | undefined | null, name: string): asserts value is T {
  if (value == null) {
    throw new Error(\\\`\${name} is required\\\`);
  }
}

function connect(config: Config): void {
  assertDefined(config.db, "db config");
  assertDefined(config.db.host, "db.host");
  assertDefined(config.db.port, "db.port");

  console.log(\\\`Connecting to \${config.db.host}:\${config.db.port}\\\`);
}`,
      hints: [
        'Create a reusable assertDefined function with an assertion signature.',
        'Each call narrows the type, so subsequent accesses are safe.',
        'function assertDefined<T>(value: T | undefined | null, name: string): asserts value is T',
      ],
      concepts: ['assertion function', 'refactoring', 'progressive narrowing'],
    },
  ],
};
