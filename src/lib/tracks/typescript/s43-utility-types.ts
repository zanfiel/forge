import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-utility',
  title: '43. Built-in Utility Types',
  explanation: `## Built-in Utility Types

TypeScript ships with a rich set of utility types that transform existing types into new ones without writing custom type logic.

### Object Transformers
- **\\\`Partial<T>\\\`** -- Makes all properties optional.
- **\\\`Required<T>\\\`** -- Makes all properties required.
- **\\\`Readonly<T>\\\`** -- Makes all properties readonly.
- **\\\`Record<K, V>\\\`** -- Object type with keys K and values V.
- **\\\`Pick<T, K>\\\`** -- Selects a subset of properties.
- **\\\`Omit<T, K>\\\`** -- Removes a subset of properties.

### Union Transformers
- **\\\`Exclude<U, E>\\\`** -- Removes members from a union.
- **\\\`Extract<U, E>\\\`** -- Keeps only members assignable to E.
- **\\\`NonNullable<T>\\\`** -- Removes null and undefined.

### Function Transformers
- **\\\`ReturnType<T>\\\`** -- Extracts the return type of a function.
- **\\\`Parameters<T>\\\`** -- Extracts parameter types as a tuple.
- **\\\`ConstructorParameters<T>\\\`** -- Parameter types of a constructor.
- **\\\`InstanceType<T>\\\`** -- The instance type of a constructor.

### String Transformers
- **\\\`Uppercase<S>\\\`**, **\\\`Lowercase<S>\\\`**, **\\\`Capitalize<S>\\\`**, **\\\`Uncapitalize<S>\\\`**

### Async
- **\\\`Awaited<T>\\\`** -- Unwraps Promise types recursively.

### Inference Control
- **\\\`NoInfer<T>\\\`** -- Prevents inference from a position (TS 5.4+).
`,
  exercises: [
    {
      id: 'ts-utility-1',
      title: 'Partial<T>',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use Partial to make all User properties optional for an update function parameter.',
      skeleton: `interface User {
  name: string;
  email: string;
  age: number;
}

function updateUser(id: number, updates: __BLANK__): void {
  // Apply updates...
}

updateUser(1, { name: "Zan" }); // Only updating name`,
      solution: `interface User {
  name: string;
  email: string;
  age: number;
}

function updateUser(id: number, updates: Partial<User>): void {
  // Apply updates...
}

updateUser(1, { name: "Zan" }); // Only updating name`,
      hints: [
        'You need a type where all properties of User are optional.',
        'Partial<T> makes every property in T optional.',
        'The answer is: Partial<User>',
      ],
      concepts: ['Partial<T>', 'optional properties', 'update patterns'],
    },
    {
      id: 'ts-utility-2',
      title: 'Required<T>',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use Required to ensure all optional Config properties become mandatory.',
      skeleton: `interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

function startServer(config: __BLANK__): void {
  console.log(config.host, config.port, config.debug);
}`,
      solution: `interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

function startServer(config: Required<Config>): void {
  console.log(config.host, config.port, config.debug);
}`,
      hints: [
        'The opposite of Partial -- makes all optional properties required.',
        'Required<T> removes the ? modifier from all properties.',
        'The answer is: Required<Config>',
      ],
      concepts: ['Required<T>', 'required properties'],
    },
    {
      id: 'ts-utility-3',
      title: 'Readonly<T>',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use Readonly to prevent mutation of the settings object.',
      skeleton: `interface Settings {
  theme: string;
  language: string;
}

const defaults: __BLANK__ = {
  theme: "dark",
  language: "en",
};

// defaults.theme = "light"; // Should be an error`,
      solution: `interface Settings {
  theme: string;
  language: string;
}

const defaults: Readonly<Settings> = {
  theme: "dark",
  language: "en",
};

// defaults.theme = "light"; // Should be an error`,
      hints: [
        'You need a type that prevents reassignment of properties.',
        'Readonly<T> makes all properties in T readonly.',
        'The answer is: Readonly<Settings>',
      ],
      concepts: ['Readonly<T>', 'immutability'],
    },
    {
      id: 'ts-utility-4',
      title: 'Pick<T, K>',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use Pick to create a type with only the name and email from User.',
      skeleton: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

type UserSummary = __BLANK__;

const summary: UserSummary = { name: "Zan", email: "zan@example.com" };`,
      solution: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

type UserSummary = Pick<User, 'name' | 'email'>;

const summary: UserSummary = { name: "Zan", email: "zan@example.com" };`,
      hints: [
        'Pick selects specific properties from a type.',
        'Pick<T, K> takes the type and a union of property names to keep.',
        'The answer is: Pick<User, \'name\' | \'email\'>',
      ],
      concepts: ['Pick<T,K>', 'property selection'],
    },
    {
      id: 'ts-utility-5',
      title: 'Omit<T, K>',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use Omit to create a type without the id property for creating new users.',
      skeleton: `interface User {
  id: number;
  name: string;
  email: string;
}

type NewUser = __BLANK__;

const newUser: NewUser = { name: "Zan", email: "zan@example.com" };`,
      solution: `interface User {
  id: number;
  name: string;
  email: string;
}

type NewUser = Omit<User, 'id'>;

const newUser: NewUser = { name: "Zan", email: "zan@example.com" };`,
      hints: [
        'Omit is the inverse of Pick -- it removes specified properties.',
        'Omit<T, K> takes the type and the property names to remove.',
        'The answer is: Omit<User, \'id\'>',
      ],
      concepts: ['Omit<T,K>', 'property removal'],
    },
    {
      id: 'ts-utility-6',
      title: 'Exclude and Extract',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use Exclude to remove "admin" from the Roles union.',
      skeleton: `type Roles = 'admin' | 'editor' | 'viewer';

type NonAdminRoles = __BLANK__;
// Should be: 'editor' | 'viewer'`,
      solution: `type Roles = 'admin' | 'editor' | 'viewer';

type NonAdminRoles = Exclude<Roles, 'admin'>;
// Should be: 'editor' | 'viewer'`,
      hints: [
        'Exclude removes members from a union type.',
        'Exclude<U, E> removes all members of U that are assignable to E.',
        'The answer is: Exclude<Roles, \'admin\'>',
      ],
      concepts: ['Exclude<U,E>', 'union manipulation'],
    },
    {
      id: 'ts-utility-7',
      title: 'ReturnType<T>',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function createUser and then use ReturnType to extract the return type into a UserType alias.',
      skeleton: `// Write createUser function and extract its return type
`,
      solution: `function createUser(name: string, age: number) {
  return { name, age, createdAt: new Date() };
}

type UserType = ReturnType<typeof createUser>;

const user: UserType = { name: "Zan", age: 30, createdAt: new Date() };`,
      hints: [
        'First write a function that returns an object.',
        'ReturnType<T> extracts the return type of a function type.',
        'Use typeof to get the function type: ReturnType<typeof createUser>.',
      ],
      concepts: ['ReturnType<T>', 'typeof', 'type inference'],
    },
    {
      id: 'ts-utility-8',
      title: 'Parameters<T>',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use Parameters to extract the parameter types of a function and create a wrapper that logs the call.',
      skeleton: `function sendEmail(to: string, subject: string, body: string): boolean {
  return true;
}

// Write a loggedSendEmail function using Parameters<typeof sendEmail>
`,
      solution: `function sendEmail(to: string, subject: string, body: string): boolean {
  return true;
}

function loggedSendEmail(...args: Parameters<typeof sendEmail>): boolean {
  console.log('Sending email:', args);
  return sendEmail(...args);
}`,
      hints: [
        'Parameters<T> returns a tuple of the parameter types.',
        'Use rest parameters: ...args: Parameters<typeof sendEmail>.',
        'Spread args when calling the original function.',
      ],
      concepts: ['Parameters<T>', 'rest parameters', 'function wrapping'],
    },
    {
      id: 'ts-utility-9',
      title: 'NonNullable<T>',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the resulting type? Write it exactly.',
      skeleton: `type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// What is DefiniteString?`,
      solution: `string`,
      hints: [
        'NonNullable removes null and undefined from a type.',
        'string | null | undefined minus null and undefined equals...',
        'The answer is: string',
      ],
      concepts: ['NonNullable<T>', 'null removal'],
    },
    {
      id: 'ts-utility-10',
      title: 'Extract from union',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the resulting type? Write it exactly.',
      skeleton: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

type RoundShapes = Extract<Shape, { kind: 'circle' }>;
// What is RoundShapes?`,
      solution: `{ kind: 'circle'; radius: number }`,
      hints: [
        'Extract keeps only union members assignable to the second argument.',
        'Only the circle member has kind: "circle".',
        'The full type of the circle member is extracted.',
      ],
      concepts: ['Extract<U,E>', 'discriminated unions', 'type filtering'],
    },
    {
      id: 'ts-utility-11',
      title: 'ConstructorParameters & InstanceType',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic factory function that creates instances of any class. Use ConstructorParameters and InstanceType.',
      skeleton: `// Write a generic factory function
`,
      solution: `function createInstance<T extends new (...args: any[]) => any>(
  ctor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new ctor(...args);
}

class Point {
  constructor(public x: number, public y: number) {}
}

const p = createInstance(Point, 10, 20); // Point`,
      hints: [
        'Constrain T to be a constructor: T extends new (...args: any[]) => any.',
        'Use ConstructorParameters<T> for the arguments and InstanceType<T> for the return.',
        'Spread the args into the constructor call: new ctor(...args).',
      ],
      concepts: ['ConstructorParameters<T>', 'InstanceType<T>', 'generic factory'],
    },
    {
      id: 'ts-utility-12',
      title: 'Awaited<T>',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the resulting type? Write it exactly.',
      skeleton: `type Nested = Promise<Promise<Promise<string>>>;
type Result = Awaited<Nested>;
// What is Result?`,
      solution: `string`,
      hints: [
        'Awaited unwraps Promise types recursively.',
        'It keeps unwrapping until it reaches a non-Promise type.',
        'Promise<Promise<Promise<string>>> unwraps to string.',
      ],
      concepts: ['Awaited<T>', 'recursive unwrapping', 'Promise types'],
    },
    {
      id: 'ts-utility-13',
      title: 'String utility types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use the built-in string utility types to create a type that transforms event names from camelCase to SCREAMING_SNAKE_CASE style. Demonstrate Uppercase and template literals.',
      skeleton: `// Create event name types using string utilities
`,
      solution: `type EventName = 'click' | 'hover' | 'submit';

type UpperEvent = Uppercase<EventName>;
// 'CLICK' | 'HOVER' | 'SUBMIT'

type PrefixedEvent = \`ON_\${Uppercase<EventName>}\`;
// 'ON_CLICK' | 'ON_HOVER' | 'ON_SUBMIT'

type HandlerMap = Record<PrefixedEvent, () => void>;`,
      hints: [
        'Uppercase<S> converts string literal types to uppercase.',
        'Template literal types can combine with string utility types.',
        'Use \`ON_\${Uppercase<EventName>}\` to create prefixed uppercase names.',
      ],
      concepts: ['Uppercase', 'Lowercase', 'Capitalize', 'Uncapitalize', 'template literal types'],
    },
    {
      id: 'ts-utility-14',
      title: 'Fix: wrong utility type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this code that uses the wrong utility type. The goal is to create a type with only the "name" and "email" properties.',
      skeleton: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, 'name' | 'email'>;

const user: PublicUser = { name: "Zan", email: "zan@test.com" };`,
      solution: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Pick<User, 'name' | 'email'>;

const user: PublicUser = { name: "Zan", email: "zan@test.com" };`,
      hints: [
        'Omit removes the listed properties, Pick keeps them.',
        'The code uses Omit but wants to KEEP name and email.',
        'Change Omit to Pick.',
      ],
      concepts: ['Pick<T,K>', 'Omit<T,K>', 'utility type selection'],
    },
    {
      id: 'ts-utility-15',
      title: 'Combine Partial and Pick',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a type PartialPick<T, K> that makes only the specified keys optional while keeping everything else required.',
      skeleton: `// Define the PartialPick utility type and demonstrate its usage
`,
      solution: `type PartialPick<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
}

type UserWithOptionalBio = PartialPick<User, 'bio'>;

const user: UserWithOptionalBio = {
  id: 1,
  name: "Zan",
  email: "zan@test.com",
  // bio is optional
};`,
      hints: [
        'Combine Omit, Partial, and Pick with intersection.',
        'Omit<T, K> gives everything except K, Partial<Pick<T, K>> makes K optional.',
        'Intersect them: Omit<T, K> & Partial<Pick<T, K>>.',
      ],
      concepts: ['combining utility types', 'Partial', 'Pick', 'Omit', 'intersection'],
    },
    {
      id: 'ts-utility-16',
      title: 'Fix: ThisParameterType issue',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix this function so it correctly types the "this" context and uses OmitThisParameter to create a bound version type.',
      skeleton: `interface Formatter {
  prefix: string;
}

function format(this: Formatter, text: string): string {
  return this.prefix + text;
}

// This should be a function that doesn't need 'this'
type BoundFormat = typeof format;

const bound: BoundFormat = format.bind({ prefix: "[LOG] " });
bound("hello");`,
      solution: `interface Formatter {
  prefix: string;
}

function format(this: Formatter, text: string): string {
  return this.prefix + text;
}

type BoundFormat = OmitThisParameter<typeof format>;

const bound: BoundFormat = format.bind({ prefix: "[LOG] " });
bound("hello");`,
      hints: [
        'typeof format includes the "this" parameter in the type.',
        'After binding, the function no longer needs "this".',
        'Use OmitThisParameter to remove the this parameter from the function type.',
      ],
      concepts: ['ThisParameterType<T>', 'OmitThisParameter<T>', 'this parameter'],
    },
    {
      id: 'ts-utility-17',
      title: 'NoInfer<T>',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use NoInfer to prevent TypeScript from inferring the generic type from the default value parameter. The type should only be inferred from the first argument.',
      skeleton: `// Write a function using NoInfer
`,
      solution: `function createState<T>(initial: T, defaultValue: NoInfer<T>): { value: T; default: T } {
  return { value: initial, default: defaultValue };
}

// T is inferred as 'hello' | 'world' from the first arg only
const state = createState<'hello' | 'world'>('hello', 'world');`,
      hints: [
        'NoInfer<T> blocks type inference from a specific parameter position.',
        'Place NoInfer on the parameter that should NOT contribute to inference.',
        'The default value parameter uses NoInfer<T> while initial uses plain T.',
      ],
      concepts: ['NoInfer<T>', 'inference control', 'generic constraints'],
    },
    {
      id: 'ts-utility-18',
      title: 'Practical: API response transformer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create a utility type ApiResponse<T> that wraps T with common API fields, and a utility type ApiListResponse<T> that adds pagination. Use multiple utility types together.',
      skeleton: `// Define ApiResponse<T> and ApiListResponse<T>
`,
      solution: `type ApiResponse<T> = {
  data: T;
  success: boolean;
  timestamp: number;
  error?: string;
};

type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type ApiListResponse<T> = ApiResponse<T[]> & {
  pagination: Pagination;
};

type User = { id: number; name: string };

type UserResponse = ApiResponse<User>;
type UserListResponse = ApiListResponse<User>;

const response: UserListResponse = {
  data: [{ id: 1, name: "Zan" }],
  success: true,
  timestamp: Date.now(),
  pagination: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
};`,
      hints: [
        'ApiResponse wraps any T with success, timestamp, and error fields.',
        'ApiListResponse extends ApiResponse with T[] as data and adds pagination.',
        'Use intersection to combine ApiResponse<T[]> with pagination info.',
      ],
      concepts: ['practical utility compositions', 'generic wrappers', 'API patterns'],
    },
    {
      id: 'ts-utility-19',
      title: 'Refactor: manual types to utility types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these manually written types to use built-in utility types instead.',
      skeleton: `interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

// Manually written -- refactor these!
interface ProductUpdate {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  category?: string;
}

interface ProductPreview {
  name: string;
  price: number;
}

interface ProductCreate {
  name: string;
  price: number;
  description: string;
  category: string;
}`,
      solution: `interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

type ProductUpdate = Partial<Product>;

type ProductPreview = Pick<Product, 'name' | 'price'>;

type ProductCreate = Omit<Product, 'id'>;`,
      hints: [
        'ProductUpdate has all properties optional -- that is Partial<Product>.',
        'ProductPreview has only name and price -- that is Pick<Product, "name" | "price">.',
        'ProductCreate has everything except id -- that is Omit<Product, "id">.',
      ],
      concepts: ['Partial<T>', 'Pick<T,K>', 'Omit<T,K>', 'refactoring', 'DRY types'],
    },
    {
      id: 'ts-utility-20',
      title: 'Refactor: compose custom utility from built-ins',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this code to use a composition of built-in utility types. Create a Mutable<T> type (opposite of Readonly), and a RequiredKeys<T, K> type that makes only specific keys required.',
      skeleton: `interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// Manual types
interface SubmittableForm {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

// Manual mutable version of a frozen object
interface MutableSettings {
  theme: string;
  lang: string;
}
// Came from: Readonly<{ theme: string; lang: string }>`,
      solution: `type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

type SubmittableForm = RequiredKeys<FormData, 'name' | 'email'>;

type FrozenSettings = Readonly<{ theme: string; lang: string }>;
type MutableSettings = Mutable<FrozenSettings>;`,
      hints: [
        'Mutable is the opposite of Readonly: use -readonly in a mapped type.',
        'RequiredKeys makes only specific keys required: Omit<T, K> & Required<Pick<T, K>>.',
        'Compose built-in utility types to avoid manual type declarations.',
      ],
      concepts: ['combining utility types', 'mapped types', 'practical utility compositions'],
    },
  ],
};
