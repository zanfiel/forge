import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-literals',
  title: '16. Literal & Template Literal Types',
  explanation: `## Literal & Template Literal Types

Literal types let you specify the exact value a variable can hold, not just its general type.

### String Literal Types
\\\`\\\`\\\`typescript
type Color = "red" | "green" | "blue";
let c: Color = "red"; // OK
// c = "yellow"; // Error
\\\`\\\`\\\`

### Numeric & Boolean Literal Types
\\\`\\\`\\\`typescript
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type Success = true;
\\\`\\\`\\\`

### Const Assertions
\\\`\\\`\\\`typescript
const config = { mode: "dark", zoom: 2 } as const;
// config.mode is type "dark", not string
\\\`\\\`\\\`

### Template Literal Types
TypeScript can create types from template string patterns:
\\\`\\\`\\\`typescript
type EventName = \\\`on\$\{string\}\\\`;       // matches "onClick", "onHover", etc.
type Greeting = \\\`Hello, \$\{string\}!\\\`; // matches "Hello, world!"
\\\`\\\`\\\`

### String Manipulation Types
- \\\`Uppercase<S>\\\` -- converts to uppercase
- \\\`Lowercase<S>\\\` -- converts to lowercase
- \\\`Capitalize<S>\\\` -- capitalizes first letter
- \\\`Uncapitalize<S>\\\` -- lowercases first letter

### Template Literal Union Generation
\\\`\\\`\\\`typescript
type Color = "red" | "blue";
type Shade = "light" | "dark";
type Theme = \\\`\$\{Shade}-\$\{Color}\\\`; // "light-red" | "light-blue" | "dark-red" | "dark-blue"
\\\`\\\`\\\`

### Const Type Parameters (TS 5.0+)
Generic functions can use \\\`const\\\` type parameters to infer literal types:
\\\`\\\`\\\`typescript
function routes<const T extends string[]>(paths: T): T { return paths; }
\\\`\\\`\\\``,
  exercises: [
    // --- 1 ---
    {
      id: 'ts-literals-1',
      title: 'String literal type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a type that only allows specific color strings.',
      skeleton: `type TrafficLight = __BLANK__;

let light: TrafficLight = "green";
light = "red";
// light = "purple"; // Should be an error`,
      solution: `type TrafficLight = "red" | "yellow" | "green";

let light: TrafficLight = "green";
light = "red";
// light = "purple"; // Error`,
      hints: [
        'Use string literal types separated by |.',
        'A traffic light has three states: red, yellow, green.',
        '"red" | "yellow" | "green"',
      ],
      concepts: ['string literal types'],
    },
    // --- 2 ---
    {
      id: 'ts-literals-2',
      title: 'Numeric literal type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a type for valid HTTP success status codes.',
      skeleton: `type SuccessCode = __BLANK__;

const ok: SuccessCode = 200;
const created: SuccessCode = 201;
// const notFound: SuccessCode = 404; // Should error`,
      solution: `type SuccessCode = 200 | 201 | 204;

const ok: SuccessCode = 200;
const created: SuccessCode = 201;
// const notFound: SuccessCode = 404; // Error`,
      hints: [
        'Numeric literal types work just like string literal types.',
        'Common HTTP success codes are 200, 201, and 204.',
        '200 | 201 | 204',
      ],
      concepts: ['numeric literal types'],
    },
    // --- 3 ---
    {
      id: 'ts-literals-3',
      title: 'Boolean literal type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a type that only accepts true.',
      skeleton: `type Confirmed = __BLANK__;

function proceed(confirmed: Confirmed): void {
  console.log("Proceeding...");
}

proceed(true);
// proceed(false); // Should error`,
      solution: `type Confirmed = true;

function proceed(confirmed: Confirmed): void {
  console.log("Proceeding...");
}

proceed(true);
// proceed(false); // Error`,
      hints: [
        'true and false are their own literal types in TypeScript.',
        'Use just the value "true" as the type.',
        'type Confirmed = true;',
      ],
      concepts: ['boolean literal types'],
    },
    // --- 4 ---
    {
      id: 'ts-literals-4',
      title: 'As const assertion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use as const to make the array readonly with literal types.',
      skeleton: `const colors = ["red", "green", "blue"] __BLANK__;
// colors should be readonly ["red", "green", "blue"], not string[]

type Color = (typeof colors)[number];
// Color should be "red" | "green" | "blue"`,
      solution: `const colors = ["red", "green", "blue"] as const;

type Color = (typeof colors)[number];`,
      hints: [
        'Without "as const", TypeScript widens the types to string[].',
        'The "as const" assertion preserves literal types.',
        'as const',
      ],
      concepts: ['const assertions', 'as const'],
    },
    // --- 5 ---
    {
      id: 'ts-literals-5',
      title: 'Literal narrowing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fix the type widening issue by using a const declaration.',
      skeleton: `// Bug: method is inferred as string, not "GET"
__BLANK__ method = "GET";

function fetch(url: string, method: "GET" | "POST"): void {
  console.log(\`\${method} \${url}\`);
}

fetch("/api", method); // Should work without error`,
      solution: `const method = "GET";

function fetch(url: string, method: "GET" | "POST"): void {
  console.log(\`\${method} \${url}\`);
}

fetch("/api", method);`,
      hints: [
        'let declarations widen literal types; const declarations preserve them.',
        'Change let to const so "GET" stays as the literal type.',
        'const method = "GET"; infers type "GET" instead of string.',
      ],
      concepts: ['literal narrowing', 'literal type widening'],
    },
    // --- 6 ---
    {
      id: 'ts-literals-6',
      title: 'Template literal type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a template literal type that matches event handler names.',
      skeleton: `type EventHandler = __BLANK__;

const onClick: EventHandler = "onClick";
const onHover: EventHandler = "onHover";
// const click: EventHandler = "click"; // Should error`,
      solution: `type EventHandler = \`on\${string}\`;

const onClick: EventHandler = "onClick";
const onHover: EventHandler = "onHover";
// const click: EventHandler = "click"; // Error`,
      hints: [
        'Template literal types use backtick syntax with ${} interpolation.',
        'You want strings that start with "on" followed by anything.',
        '`on${string}`',
      ],
      concepts: ['template literal types'],
    },
    // --- 7 ---
    {
      id: 'ts-literals-7',
      title: 'Uppercase/Lowercase utilities',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use built-in string manipulation types to transform literal types.',
      skeleton: `type Method = "get" | "post" | "put" | "delete";

// Create an uppercase version of Method
type UpperMethod = // implement

// Write a function that takes a Method and returns the uppercase version
function toUpperMethod(method: Method): UpperMethod {
  // implement
}`,
      solution: `type Method = "get" | "post" | "put" | "delete";

type UpperMethod = Uppercase<Method>;

function toUpperMethod(method: Method): UpperMethod {
  return method.toUpperCase() as UpperMethod;
}`,
      hints: [
        'TypeScript has Uppercase<S>, Lowercase<S>, Capitalize<S>, Uncapitalize<S>.',
        'Uppercase<Method> transforms each union member to uppercase.',
        'type UpperMethod = Uppercase<Method>; return method.toUpperCase() as UpperMethod;',
      ],
      concepts: ['uppercase/lowercase/capitalize/uncapitalize'],
    },
    // --- 8 ---
    {
      id: 'ts-literals-8',
      title: 'Template literal union generation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Generate a union of CSS class names from component and variant types.',
      skeleton: `type Component = "btn" | "card" | "input";
type Variant = "primary" | "secondary" | "danger";

// Generate type: "btn-primary" | "btn-secondary" | ... etc.
type ClassName = // implement using template literal types

function applyClass(cls: ClassName): string {
  return \`class="\${cls}"\`;
}`,
      solution: `type Component = "btn" | "card" | "input";
type Variant = "primary" | "secondary" | "danger";

type ClassName = \`\${Component}-\${Variant}\`;

function applyClass(cls: ClassName): string {
  return \`class="\${cls}"\`;
}`,
      hints: [
        'Template literal types distribute over unions automatically.',
        'Each Component is combined with each Variant.',
        '`${Component}-${Variant}` generates all 9 combinations.',
      ],
      concepts: ['template literal union generation'],
    },
    // --- 9 ---
    {
      id: 'ts-literals-9',
      title: 'Literal type from array',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the inferred type when extracting literals from a const array.',
      skeleton: `const statuses = ["pending", "active", "closed"] as const;
type Status = (typeof statuses)[number];

// What is the type of Status?
// Can you assign "unknown" to a Status variable?

const s: Status = "active";
console.log(s);`,
      solution: `Status is "pending" | "active" | "closed". You cannot assign "unknown" to it. Output: active`,
      hints: [
        'as const makes the array readonly with literal element types.',
        '(typeof arr)[number] extracts a union of all element types.',
        'Status is "pending" | "active" | "closed".',
      ],
      concepts: ['literal type from array', 'typeof with const'],
    },
    // --- 10 ---
    {
      id: 'ts-literals-10',
      title: 'Satisfies with literals',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use the satisfies operator to validate a config while preserving literal types.',
      skeleton: `type ColorConfig = Record<string, string | number[]>;

// Without satisfies, we lose literal types
// With satisfies, we get both validation AND literal inference

const palette = {
  red: "#ff0000",
  green: [0, 255, 0],
  blue: "#0000ff",
} satisfies ColorConfig;

// What is the type of palette.red?
// Write a function that works because literal types are preserved
function getHex(key: "red" | "blue"): string {
  return palette[key]; // This works because red and blue are known to be strings
}`,
      solution: `type ColorConfig = Record<string, string | number[]>;

const palette = {
  red: "#ff0000",
  green: [0, 255, 0],
  blue: "#0000ff",
} satisfies ColorConfig;

function getHex(key: "red" | "blue"): string {
  return palette[key];
}`,
      hints: [
        'satisfies checks that the value matches the type without widening.',
        'palette.red is inferred as string (not string | number[]).',
        'This lets getHex return string without assertion.',
      ],
      concepts: ['satisfies with literals', 'type preservation'],
    },
    // --- 11 ---
    {
      id: 'ts-literals-11',
      title: 'Key remapping with template literals',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a type that adds "get" prefix to all keys using template literal remapping.',
      skeleton: `type Getters<T> = {
  // For each key K in T, create a new key "get{Capitalized K}" with a getter function
};

interface Person {
  name: string;
  age: number;
}

// Getters<Person> should be: { getName: () => string; getAge: () => number }
type PersonGetters = Getters<Person>;

function createGetters(person: Person): PersonGetters {
  return {
    getName: () => person.name,
    getAge: () => person.age,
  };
}`,
      solution: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;

function createGetters(person: Person): PersonGetters {
  return {
    getName: () => person.name,
    getAge: () => person.age,
  };
}`,
      hints: [
        'Use "as" in a mapped type to remap keys.',
        'Capitalize<string & K> capitalizes the key name.',
        '[K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]',
      ],
      concepts: ['key remapping with template literals', 'mapped types'],
    },
    // --- 12 ---
    {
      id: 'ts-literals-12',
      title: 'Literal inference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the literal type inference issue in the function call.',
      skeleton: `function createRequest(method: "GET" | "POST", url: string) {
  return { method, url };
}

const options = { method: "GET", url: "/api/data" };
createRequest(options.method, options.url);
// Error: Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'`,
      solution: `function createRequest(method: "GET" | "POST", url: string) {
  return { method, url };
}

const options = { method: "GET" as const, url: "/api/data" };
createRequest(options.method, options.url);`,
      hints: [
        'The object literal widens "GET" to string by default.',
        'Use "as const" on the method value to preserve the literal type.',
        'method: "GET" as const',
      ],
      concepts: ['literal inference', 'as const'],
    },
    // --- 13 ---
    {
      id: 'ts-literals-13',
      title: 'Literal unions for state machines',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use literal types to create a type-safe state machine transition map.',
      skeleton: `type OrderState = "draft" | "submitted" | "processing" | "shipped" | "delivered";

// Define valid transitions: which states can transition to which
type TransitionMap = {
  // implement: each key is an OrderState, value is the array of valid next states
};

const transitions: TransitionMap = {
  // fill in valid transitions
};

function canTransition(from: OrderState, to: OrderState): boolean {
  // check if the transition is valid
}`,
      solution: `type OrderState = "draft" | "submitted" | "processing" | "shipped" | "delivered";

type TransitionMap = {
  [K in OrderState]: OrderState[];
};

const transitions: TransitionMap = {
  draft: ["submitted"],
  submitted: ["processing"],
  processing: ["shipped"],
  shipped: ["delivered"],
  delivered: [],
};

function canTransition(from: OrderState, to: OrderState): boolean {
  return transitions[from].includes(to);
}`,
      hints: [
        'Map each state to an array of valid next states.',
        'Use a mapped type [K in OrderState]: OrderState[].',
        'Check transitions[from].includes(to) to validate.',
      ],
      concepts: ['literal unions for state machines'],
    },
    // --- 14 ---
    {
      id: 'ts-literals-14',
      title: 'Extracting literals',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the extracted type from a template literal type.',
      skeleton: `type ExtractRoute<T> = T extends \`/api/\${infer Resource}/\${infer Id}\`
  ? { resource: Resource; id: Id }
  : never;

type Result1 = ExtractRoute<"/api/users/123">;
type Result2 = ExtractRoute<"/api/posts/456">;
type Result3 = ExtractRoute<"/home">;

// What are Result1, Result2, and Result3?`,
      solution: `Result1 is { resource: "users"; id: "123" }. Result2 is { resource: "posts"; id: "456" }. Result3 is never.`,
      hints: [
        'The template literal type pattern extracts parts using infer.',
        '/api/users/123 matches the pattern: Resource="users", Id="123".',
        '/home does not match /api/${Resource}/${Id}, so it resolves to never.',
      ],
      concepts: ['extracting literals', 'infer with template literals'],
    },
    // --- 15 ---
    {
      id: 'ts-literals-15',
      title: 'Branded primitives with literals',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create a branded email type that validates the format at the type level.',
      skeleton: `// Create a type that only accepts strings matching an email-like pattern
type Email = string & { readonly __brand: "Email" };

function createEmail(input: string): Email {
  // validate and return branded email, or throw
}

function sendMail(to: Email, subject: string): string {
  return \`Sending "\${subject}" to \${to}\`;
}`,
      solution: `type Email = string & { readonly __brand: "Email" };

function createEmail(input: string): Email {
  if (!input.includes("@") || !input.includes(".")) {
    throw new Error(\`Invalid email: \${input}\`);
  }
  return input as Email;
}

function sendMail(to: Email, subject: string): string {
  return \`Sending "\${subject}" to \${to}\`;
}`,
      hints: [
        'Branded types add a phantom property via intersection.',
        'Runtime validation happens in the constructor function.',
        'Validate the email format, then cast with "as Email".',
      ],
      concepts: ['branded primitives with literals'],
    },
    // --- 16 ---
    {
      id: 'ts-literals-16',
      title: 'Const type parameters',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use a const type parameter to infer literal types in a generic function.',
      skeleton: `// Without const: T is inferred as string[]
// With const: T is inferred as readonly ["get", "post", "put"]

function defineRoutes<const T extends readonly string[]>(routes: T): T {
  return routes;
}

// Use defineRoutes and show the difference
const routes = defineRoutes(["get", "post", "put"]);
// What is typeof routes?

type Route = (typeof routes)[number];
// What is Route?`,
      solution: `function defineRoutes<const T extends readonly string[]>(routes: T): T {
  return routes;
}

const routes = defineRoutes(["get", "post", "put"]);
// typeof routes is readonly ["get", "post", "put"]

type Route = (typeof routes)[number];
// Route is "get" | "post" | "put"`,
      hints: [
        'The "const" modifier on a type parameter preserves literal types.',
        'Without it, T would be inferred as string[], losing literal info.',
        'routes is readonly ["get", "post", "put"]; Route is "get" | "post" | "put".',
      ],
      concepts: ['const type parameters', 'literal inference'],
    },
    // --- 17 ---
    {
      id: 'ts-literals-17',
      title: 'Template literal type patterns',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a type-safe CSS utility class generator using template literal types.',
      skeleton: `type Spacing = 0 | 1 | 2 | 3 | 4 | 8;
type Direction = "t" | "b" | "l" | "r" | "x" | "y";
type Property = "m" | "p";

// Generate class names like "mt-2", "px-4", "mb-0" etc.
type SpacingClass = // implement

function applySpacing(cls: SpacingClass): string {
  return cls;
}

applySpacing("mt-2");
applySpacing("px-4");
// applySpacing("mx-10"); // Should error (10 is not in Spacing)`,
      solution: `type Spacing = 0 | 1 | 2 | 3 | 4 | 8;
type Direction = "t" | "b" | "l" | "r" | "x" | "y";
type Property = "m" | "p";

type SpacingClass = \`\${Property}\${Direction}-\${Spacing}\`;

function applySpacing(cls: SpacingClass): string {
  return cls;
}

applySpacing("mt-2");
applySpacing("px-4");
// applySpacing("mx-10"); // Error`,
      hints: [
        'Template literal types distribute over unions in each position.',
        'Combine Property, Direction, and Spacing with the right separators.',
        '`${Property}${Direction}-${Spacing}` generates all valid combinations.',
      ],
      concepts: ['literal type patterns', 'template literal unions'],
    },
    // --- 18 ---
    {
      id: 'ts-literals-18',
      title: 'Template literal type parsing',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix the template literal type to correctly parse dot-notation paths.',
      skeleton: `type ParsePath<T extends string> =
  T extends \`\${infer Head}.\${infer Tail}\`
    ? [Head, Tail]
    : [T];

// Should recursively split, not stop at first dot
type Result = ParsePath<"a.b.c">;
// Currently: ["a", "b.c"] -- but we want: ["a", "b", "c"]`,
      solution: `type ParsePath<T extends string> =
  T extends \`\${infer Head}.\${infer Tail}\`
    ? [Head, ...ParsePath<Tail>]
    : [T];

type Result = ParsePath<"a.b.c">;
// Result is ["a", "b", "c"]`,
      hints: [
        'The current type only splits on the first dot.',
        'Make it recursive by spreading ParsePath<Tail> into the tuple.',
        '[Head, ...ParsePath<Tail>] recursively splits all dots.',
      ],
      concepts: ['recursive template literal types', 'type-level parsing'],
    },
    // --- 19 ---
    {
      id: 'ts-literals-19',
      title: 'Capitalize event handlers',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Predict the type generated by combining Capitalize with template literal types.',
      skeleton: `type Event = "click" | "hover" | "focus";
type Handler = \`on\${Capitalize<Event>}\`;

// What are the members of Handler?

type EventMap = { [K in Handler]: () => void };

// What are the keys of EventMap?`,
      solution: `Handler is "onClick" | "onHover" | "onFocus". EventMap has keys: onClick, onHover, onFocus.`,
      hints: [
        'Capitalize transforms "click" to "Click", "hover" to "Hover", etc.',
        'The template literal prepends "on" to each capitalized event.',
        'Handler is "onClick" | "onHover" | "onFocus".',
      ],
      concepts: ['capitalize', 'template literal with string manipulation'],
    },
    // --- 20 ---
    {
      id: 'ts-literals-20',
      title: 'Refactor string constants to literal types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor magic strings into a type-safe system using literal types and const assertions.',
      skeleton: `// Before: magic strings everywhere, no type safety
function createTheme(mode: string, size: string, variant: string): string {
  return \`theme-\${mode}-\${size}-\${variant}\`;
}

const theme1 = createTheme("dark", "large", "rounded");
const theme2 = createTheme("light", "small", "sharp");
const theme3 = createTheme("oops", "invalid", "nope"); // No error!`,
      solution: `const MODES = ["dark", "light"] as const;
const SIZES = ["small", "medium", "large"] as const;
const VARIANTS = ["rounded", "sharp", "flat"] as const;

type Mode = (typeof MODES)[number];
type Size = (typeof SIZES)[number];
type Variant = (typeof VARIANTS)[number];
type ThemeClass = \`theme-\${Mode}-\${Size}-\${Variant}\`;

function createTheme(mode: Mode, size: Size, variant: Variant): ThemeClass {
  return \`theme-\${mode}-\${size}-\${variant}\`;
}

const theme1 = createTheme("dark", "large", "rounded");
const theme2 = createTheme("light", "small", "sharp");
// const theme3 = createTheme("oops", "invalid", "nope"); // Error!`,
      hints: [
        'Use as const arrays to define valid values.',
        'Extract literal union types with (typeof arr)[number].',
        'Use template literal types for the return type.',
      ],
      concepts: ['refactoring to literal types', 'as const', 'template literal types'],
    },
  ],
};
