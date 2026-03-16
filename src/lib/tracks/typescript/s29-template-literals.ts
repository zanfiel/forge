import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-template-lit',
  title: '29. Template Literal Types',
  explanation: `## Template Literal Types

Template literal types bring **string manipulation** to the type level. They use the same backtick syntax as runtime template literals but operate on types.

\\\`\\\`\\\`typescript
type Greeting = \\\`Hello, \\\${string}\\\`;
// matches "Hello, Alice", "Hello, Bob", etc.

type EventName = \\\`on\\\${Capitalize<'click' | 'load'>}\\\`;
// "onClick" | "onLoad"
\\\`\\\`\\\`

Built-in intrinsic types:
- **\\\`Uppercase<S>\\\`** -- "hello" -> "HELLO"
- **\\\`Lowercase<S>\\\`** -- "HELLO" -> "hello"
- **\\\`Capitalize<S>\\\`** -- "hello" -> "Hello"
- **\\\`Uncapitalize<S>\\\`** -- "Hello" -> "hello"

Template literals with unions **expand**: every combination is generated. This enables type-safe string patterns, route parameters, event naming, CSS units, and more.`,
  exercises: [
    {
      id: 'ts-template-lit-1',
      title: 'Basic template literal type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the template literal type for a CSS color string.',
      skeleton: `type CssColor = \`#\${__BLANK__}\`;

const c1: CssColor = '#ff0000'; // OK
const c2: CssColor = '#abc';    // OK
// const c3: CssColor = 'red'; // Error`,
      solution: `type CssColor = \`#\${string}\`;

const c1: CssColor = '#ff0000'; // OK
const c2: CssColor = '#abc';    // OK
// const c3: CssColor = 'red'; // Error`,
      hints: [
        'What type matches any string content after the # prefix?',
        'The string type matches any string.',
        'Replace __BLANK__ with string.',
      ],
      concepts: ['basic template literal types'],
    },
    {
      id: 'ts-template-lit-2',
      title: 'Union in template literals',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to generate all combination of size and color.',
      skeleton: `type Size = 'sm' | 'md' | 'lg';
type Color = 'red' | 'blue';

type ClassName = \`\${__BLANK__}-\${__BLANK__}\`;
// 'sm-red' | 'sm-blue' | 'md-red' | 'md-blue' | 'lg-red' | 'lg-blue'`,
      solution: `type Size = 'sm' | 'md' | 'lg';
type Color = 'red' | 'blue';

type ClassName = \`\${Size}-\${Color}\`;
// 'sm-red' | 'sm-blue' | 'md-red' | 'md-blue' | 'lg-red' | 'lg-blue'`,
      hints: [
        'Unions in template literals expand to all combinations.',
        'Use the type aliases directly in the template literal.',
        'Replace the blanks with Size and Color.',
      ],
      concepts: ['union in template literals', 'template literal unions expansion'],
    },
    {
      id: 'ts-template-lit-3',
      title: 'Uppercase intrinsic',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the intrinsic type to uppercase the string.',
      skeleton: `type Loud<T extends string> = __BLANK__<T>;

type Result = Loud<'hello'>; // 'HELLO'`,
      solution: `type Loud<T extends string> = Uppercase<T>;

type Result = Loud<'hello'>; // 'HELLO'`,
      hints: [
        'Which built-in type converts a string to uppercase?',
        'Uppercase<T> transforms string literal types to uppercase.',
        'Replace __BLANK__ with Uppercase.',
      ],
      concepts: ['uppercase/lowercase intrinsics'],
    },
    {
      id: 'ts-template-lit-4',
      title: 'Capitalize and uncapitalize',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What types do A and B resolve to?',
      skeleton: `type A = Capitalize<'hello world'>;
type B = Uncapitalize<'Hello World'>;`,
      solution: `A is 'Hello world' (only first character capitalized). B is 'hello World' (only first character lowercased).`,
      hints: [
        'Capitalize only affects the very first character.',
        'Uncapitalize only lowercases the first character.',
        'A = "Hello world", B = "hello World".',
      ],
      concepts: ['capitalize/uncapitalize'],
    },
    {
      id: 'ts-template-lit-5',
      title: 'Event name patterns',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a type OnEvent<T> that transforms event names like "click" | "load" into "onClick" | "onLoad".',
      skeleton: `// Write OnEvent<T>
`,
      solution: `type OnEvent<T extends string> = \`on\${Capitalize<T>}\`;

type Events = OnEvent<'click' | 'load' | 'submit'>;
// 'onClick' | 'onLoad' | 'onSubmit'`,
      hints: [
        'Combine template literal with Capitalize.',
        'Prefix with "on" and capitalize the event name.',
        'type OnEvent<T extends string> = `on${Capitalize<T>}`;',
      ],
      concepts: ['event name patterns', 'capitalize/uncapitalize'],
    },
    {
      id: 'ts-template-lit-6',
      title: 'CSS unit types',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Define a type for CSS length values: a number followed by a unit.',
      skeleton: `type CssUnit = 'px' | 'rem' | 'em' | '%';

type CssLength = \`\${__BLANK__}\${CssUnit}\`;

const a: CssLength = '16px';  // OK
const b: CssLength = '1.5rem'; // OK`,
      solution: `type CssUnit = 'px' | 'rem' | 'em' | '%';

type CssLength = \`\${number}\${CssUnit}\`;

const a: CssLength = '16px';  // OK
const b: CssLength = '1.5rem'; // OK`,
      hints: [
        'The number part can be any number value.',
        'TypeScript has a number type that matches numeric literals in template strings.',
        'Replace __BLANK__ with number.',
      ],
      concepts: ['CSS unit types', 'basic template literal types'],
    },
    {
      id: 'ts-template-lit-7',
      title: 'Template literal inference',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type ExtractRouteParams<T> that extracts parameter names from a route string like "/user/:id/post/:postId" into a union "id" | "postId".',
      skeleton: `// Write ExtractRouteParams<T>
`,
      solution: `type ExtractRouteParams<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? Param | ExtractRouteParams<Rest>
    : T extends \`\${string}:\${infer Param}\`
      ? Param
      : never;

type Params = ExtractRouteParams<'/user/:id/post/:postId'>;
// 'id' | 'postId'`,
      hints: [
        'Use infer to capture the text after : and before the next /.',
        'Recurse on the rest of the string to find more parameters.',
        'Match `:${infer Param}/${infer Rest}` for params with more path segments, and `:${infer Param}` for the last one.',
      ],
      concepts: ['template literal inference', 'route parameter extraction'],
    },
    {
      id: 'ts-template-lit-8',
      title: 'Template literal with generics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the blank to create a type-safe event handler registration.',
      skeleton: `type PropEventSource<T> = {
  [K in keyof T & string as \`on\${__BLANK__<K>}Changed\`]:
    (newValue: T[K]) => void;
};

interface Config {
  darkMode: boolean;
  fontSize: number;
}

type ConfigEvents = PropEventSource<Config>;
// { onDarkModeChanged: (newValue: boolean) => void; onFontSizeChanged: (newValue: number) => void }`,
      solution: `type PropEventSource<T> = {
  [K in keyof T & string as \`on\${Capitalize<K>}Changed\`]:
    (newValue: T[K]) => void;
};

interface Config {
  darkMode: boolean;
  fontSize: number;
}

type ConfigEvents = PropEventSource<Config>;
// { onDarkModeChanged: (newValue: boolean) => void; onFontSizeChanged: (newValue: number) => void }`,
      hints: [
        'The key should be transformed: darkMode -> onDarkModeChanged.',
        'You need to capitalize the first letter of each key.',
        'Replace __BLANK__ with Capitalize.',
      ],
      concepts: ['template literal with generics', 'template literal with mapped types'],
    },
    {
      id: 'ts-template-lit-9',
      title: 'Dot-notation path types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type DotPath<T> that produces dot-notation paths like "a" | "a.b" | "a.b.c" for nested objects.',
      skeleton: `// Write DotPath<T>
`,
      solution: `type DotPath<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]:
        | (Prefix extends '' ? K : \`\${Prefix}.\${K}\`)
        | DotPath<T[K], Prefix extends '' ? K : \`\${Prefix}.\${K}\`>;
    }[keyof T & string]
  : never;

// Usage:
interface Nested {
  a: {
    b: {
      c: number;
    };
    d: string;
  };
  e: boolean;
}

type Paths = DotPath<Nested>;
// 'a' | 'a.b' | 'a.b.c' | 'a.d' | 'e'`,
      hints: [
        'Recursively build paths by appending each key with a dot separator.',
        'Track the prefix through a second generic parameter.',
        'For each key K: include the current path and recurse into nested objects.',
      ],
      concepts: ['dot-notation path types', 'template literal recursion'],
    },
    {
      id: 'ts-template-lit-10',
      title: 'Predict template expansion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'How many members does the union type have?',
      skeleton: `type Method = 'get' | 'post' | 'put' | 'delete';
type Resource = 'user' | 'post';
type Action = \`\${Method}_\${Resource}\`;

// How many string literals in the Action union?`,
      solution: `8 members: 'get_user' | 'get_post' | 'post_user' | 'post_post' | 'put_user' | 'put_post' | 'delete_user' | 'delete_post'. Template literals expand as a cartesian product: 4 methods x 2 resources = 8.`,
      hints: [
        'Template literals with unions create the cartesian product.',
        'Every combination of Method and Resource is generated.',
        '4 methods x 2 resources = 8 total members.',
      ],
      concepts: ['template literal unions expansion'],
    },
    {
      id: 'ts-template-lit-11',
      title: 'String manipulation at type level',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type KebabCase<T> that converts camelCase to kebab-case. For example, "fontSize" becomes "font-size".',
      skeleton: `// Write KebabCase<T>
`,
      solution: `type KebabCase<T extends string> =
  T extends \`\${infer First}\${infer Rest}\`
    ? Rest extends Uncapitalize<Rest>
      ? \`\${Lowercase<First>}\${KebabCase<Rest>}\`
      : \`\${Lowercase<First>}-\${KebabCase<Rest>}\`
    : T;

type A = KebabCase<'fontSize'>;     // 'font-size'
type B = KebabCase<'backgroundColor'>; // 'background-color'`,
      hints: [
        'Split the string character by character. When you find an uppercase letter, insert a dash.',
        'Check if Rest starts with uppercase by comparing Rest extends Uncapitalize<Rest>.',
        'If Rest does not equal Uncapitalize<Rest>, it starts with uppercase -- insert a dash.',
      ],
      concepts: ['string manipulation at type level', 'template literal recursion'],
    },
    {
      id: 'ts-template-lit-12',
      title: 'Template literal with mapped types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type Getters<T> that creates getter method types for each property: { getName: () => string; getAge: () => number } from { name: string; age: number }.',
      skeleton: `// Write Getters<T>
`,
      solution: `type Getters<T> = {
  [K in keyof T & string as \`get\${Capitalize<K>}\`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }`,
      hints: [
        'Use key remapping with as and a template literal.',
        'Transform each key K to `get${Capitalize<K>}`.',
        '[K in keyof T & string as `get${Capitalize<K>}`]: () => T[K];',
      ],
      concepts: ['template literal with mapped types'],
    },
    {
      id: 'ts-template-lit-13',
      title: 'Fix template literal type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This type is supposed to extract the file extension but the pattern matching is wrong. Fix it.',
      skeleton: `type Extension<T extends string> = T extends \`\${string}.\${infer Ext}\` ? Ext : never;

// Problem: 'archive.tar.gz' returns 'tar.gz' instead of 'gz'
type Test = Extension<'archive.tar.gz'>; // Should be 'gz'`,
      solution: `type Extension<T extends string> = T extends \`\${string}.\${infer Ext}\`
  ? Ext extends \`\${string}.\${string}\`
    ? Extension<Ext>
    : Ext
  : never;

type Test = Extension<'archive.tar.gz'>; // 'gz'`,
      hints: [
        'The pattern greedily matches the first dot, capturing everything after it.',
        'You need to recursively process the extension if it still contains dots.',
        'After extracting Ext, check if it still contains a dot and recurse if so.',
      ],
      concepts: ['template literal inference', 'template literal recursion'],
    },
    {
      id: 'ts-template-lit-14',
      title: 'Split type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type Split<S, D> that splits a string type by a delimiter into a tuple type. Split<"a.b.c", "."> should be ["a", "b", "c"].',
      skeleton: `// Write Split<S, D>
`,
      solution: `type Split<S extends string, D extends string> =
  S extends \`\${infer Head}\${D}\${infer Tail}\`
    ? [Head, ...Split<Tail, D>]
    : [S];

type Result = Split<'a.b.c', '.'>;
// ['a', 'b', 'c']`,
      hints: [
        'Pattern match the first occurrence of the delimiter.',
        'Capture Head (before delimiter) and Tail (after). Recurse on Tail.',
        'S extends `${infer Head}${D}${infer Tail}` ? [Head, ...Split<Tail, D>] : [S];',
      ],
      concepts: ['split type', 'template literal recursion'],
    },
    {
      id: 'ts-template-lit-15',
      title: 'Join type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type Join<T, D> that joins a string tuple with a delimiter. Join<["a", "b", "c"], "."> should be "a.b.c".',
      skeleton: `// Write Join<T, D>
`,
      solution: `type Join<T extends string[], D extends string> =
  T extends []
    ? ''
    : T extends [infer Head extends string]
      ? Head
      : T extends [infer Head extends string, ...infer Rest extends string[]]
        ? \`\${Head}\${D}\${Join<Rest, D>}\`
        : string;

type Result = Join<['a', 'b', 'c'], '.'>;
// 'a.b.c'`,
      hints: [
        'Handle three cases: empty array, single element, and multiple elements.',
        'For multiple elements: `${Head}${D}${Join<Rest, D>}`.',
        'Empty: "". Single: Head. Multiple: Head + D + Join(Rest, D).',
      ],
      concepts: ['join type', 'template literal recursion'],
    },
    {
      id: 'ts-template-lit-16',
      title: 'Replace type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type Replace<S, From, To> that replaces the first occurrence of From with To in the string type S.',
      skeleton: `// Write Replace<S, From, To>
`,
      solution: `type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends \`\${infer Head}\${From}\${infer Tail}\`
  ? \`\${Head}\${To}\${Tail}\`
  : S;

type Result = Replace<'hello world', 'world', 'TypeScript'>;
// 'hello TypeScript'`,
      hints: [
        'Pattern match to find From within S.',
        'Capture Head (before) and Tail (after). Reconstruct with To in the middle.',
        'S extends `${infer Head}${From}${infer Tail}` ? `${Head}${To}${Tail}` : S;',
      ],
      concepts: ['replace type', 'string manipulation at type level'],
    },
    {
      id: 'ts-template-lit-17',
      title: 'Template literal constraints',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Constrain the function parameter to only accept strings matching a URL pattern.',
      skeleton: `type HttpUrl = \`http\${'s' | ''}://\${string}\`;

function fetchUrl(url: __BLANK__): void {
  console.log('Fetching', url);
}

fetchUrl('https://example.com'); // OK
fetchUrl('http://localhost');     // OK
// fetchUrl('ftp://files.com');  // Error`,
      solution: `type HttpUrl = \`http\${'s' | ''}://\${string}\`;

function fetchUrl(url: HttpUrl): void {
  console.log('Fetching', url);
}

fetchUrl('https://example.com'); // OK
fetchUrl('http://localhost');     // OK
// fetchUrl('ftp://files.com');  // Error`,
      hints: [
        'Use the template literal type as the parameter type.',
        'HttpUrl matches both "http://" and "https://" prefixed strings.',
        'Replace __BLANK__ with HttpUrl.',
      ],
      concepts: ['template literal constraints'],
    },
    {
      id: 'ts-template-lit-18',
      title: 'Predict recursive template literal',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What type does TrimLeft<"   hello"> produce?',
      skeleton: `type TrimLeft<T extends string> =
  T extends \` \${infer Rest}\` ? TrimLeft<Rest> : T;

type Result = TrimLeft<'   hello'>;`,
      solution: `'hello' (all leading spaces are recursively removed)`,
      hints: [
        'TrimLeft recursively removes one space at a time from the left.',
        '3 spaces: " hello" -> " hello" -> "hello".',
        'Result is "hello" with all leading spaces stripped.',
      ],
      concepts: ['template literal recursion', 'string manipulation at type level'],
    },
    {
      id: 'ts-template-lit-19',
      title: 'Practical: type-safe string formatting',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type ExtractPlaceholders<T> that extracts placeholder names from a format string like "Hello, {name}! You are {age} years old." into "name" | "age".',
      skeleton: `// Write ExtractPlaceholders<T>
`,
      solution: `type ExtractPlaceholders<T extends string> =
  T extends \`\${string}{\${infer Name}}\${infer Rest}\`
    ? Name | ExtractPlaceholders<Rest>
    : never;

type Placeholders = ExtractPlaceholders<'Hello, {name}! You are {age} years old.'>;
// 'name' | 'age'`,
      hints: [
        'Match the pattern: any text, then {, then the name, then }, then the rest.',
        'Capture the Name between { and }. Recurse on Rest.',
        'T extends `${string}{${infer Name}}${infer Rest}` ? Name | ExtractPlaceholders<Rest> : never;',
      ],
      concepts: ['practical template literal patterns', 'type-safe string formatting'],
    },
    {
      id: 'ts-template-lit-20',
      title: 'Practical template literal patterns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these manually typed event handler names into a single mapped type using template literals.',
      skeleton: `interface UserEvents {
  onNameChanged: (value: string) => void;
  onAgeChanged: (value: number) => void;
  onEmailChanged: (value: string) => void;
}

// Refactor: derive UserEvents from User automatically
interface User {
  name: string;
  age: number;
  email: string;
}`,
      solution: `interface User {
  name: string;
  age: number;
  email: string;
}

type EventHandlers<T> = {
  [K in keyof T & string as \`on\${Capitalize<K>}Changed\`]: (value: T[K]) => void;
};

type UserEvents = EventHandlers<User>;
// { onNameChanged: (value: string) => void; onAgeChanged: (value: number) => void; onEmailChanged: (value: string) => void }`,
      hints: [
        'Use a mapped type with key remapping to generate event names.',
        'Transform each key K to `on${Capitalize<K>}Changed`.',
        'type EventHandlers<T> = { [K in keyof T & string as `on${Capitalize<K>}Changed`]: (value: T[K]) => void };',
      ],
      concepts: ['practical template literal patterns', 'template literal with mapped types'],
    },
  ],
};
