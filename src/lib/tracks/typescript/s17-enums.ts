import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-enums',
  title: '17. Enums',
  explanation: `## Enums

Enums let you define a set of named constants. TypeScript supports both numeric and string enums.

### Numeric Enums
\\\`\\\`\\\`typescript
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
\\\`\\\`\\\`
By default, members are auto-incremented from 0. You can set custom starting values.

### String Enums
\\\`\\\`\\\`typescript
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}
\\\`\\\`\\\`
String enums require explicit values for every member.

### Const Enums
\\\`\\\`\\\`typescript
const enum Status { Active, Inactive }
\\\`\\\`\\\`
Const enums are inlined at compile time -- no runtime object is generated.

### Reverse Mapping
Numeric enums get reverse mapping: you can look up the name from the value.
\\\`\\\`\\\`typescript
Direction[0] // "Up"
\\\`\\\`\\\`

### Enum vs Union Type
Modern TypeScript often prefers union types over enums:
\\\`\\\`\\\`typescript
type Direction = "up" | "down" | "left" | "right"; // often preferred
\\\`\\\`\\\`

### Bit Flags
Enums can represent combinable flags using powers of 2:
\\\`\\\`\\\`typescript
enum Permission {
  Read  = 1 << 0, // 1
  Write = 1 << 1, // 2
  Exec  = 1 << 2, // 4
}
\\\`\\\`\\\`

### Best Practices
- Prefer string enums for debuggability
- Consider union types as an alternative
- Use const enums for performance-critical code
- Avoid heterogeneous enums (mixing strings and numbers)`,
  exercises: [
    // --- 1 ---
    {
      id: 'ts-enums-1',
      title: 'Numeric enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a numeric enum for days of the week starting from 1.',
      skeleton: `__BLANK__ Day {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

console.log(Day.Wednesday);`,
      solution: `enum Day {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

console.log(Day.Wednesday);`,
      hints: [
        'What keyword declares an enum?',
        'The keyword is "enum".',
        'enum Day { Monday = 1, ... }. Wednesday will be 3.',
      ],
      concepts: ['numeric enums'],
    },
    // --- 2 ---
    {
      id: 'ts-enums-2',
      title: 'String enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a string enum for log levels.',
      skeleton: `enum LogLevel {
  Debug = __BLANK__,
  Info = __BLANK__,
  Warn = __BLANK__,
  Error = __BLANK__,
}

console.log(LogLevel.Info);`,
      solution: `enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR",
}

console.log(LogLevel.Info);`,
      hints: [
        'String enum members must each have an explicit string value.',
        'Convention is to use UPPERCASE string values.',
        '"DEBUG", "INFO", "WARN", "ERROR"',
      ],
      concepts: ['string enums'],
    },
    // --- 3 ---
    {
      id: 'ts-enums-3',
      title: 'Enum as type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use an enum as a type annotation for a function parameter.',
      skeleton: `enum Direction {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
}

function move(dir: __BLANK__): string {
  return \`Moving \${dir}\`;
}

move(Direction.North);`,
      solution: `enum Direction {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
}

function move(dir: Direction): string {
  return \`Moving \${dir}\`;
}

move(Direction.North);`,
      hints: [
        'Enum names can be used as types directly.',
        'The parameter should accept any Direction member.',
        'dir: Direction',
      ],
      concepts: ['enum as type'],
    },
    // --- 4 ---
    {
      id: 'ts-enums-4',
      title: 'Enum in switch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the switch statement using enum members.',
      skeleton: `enum Season { Spring, Summer, Autumn, Winter }

function getActivities(season: Season): string {
  switch (season) {
    case Season.__BLANK__: return "Plant flowers";
    case Season.__BLANK__: return "Go swimming";
    case Season.__BLANK__: return "Rake leaves";
    case Season.__BLANK__: return "Build snowman";
  }
}`,
      solution: `enum Season { Spring, Summer, Autumn, Winter }

function getActivities(season: Season): string {
  switch (season) {
    case Season.Spring: return "Plant flowers";
    case Season.Summer: return "Go swimming";
    case Season.Autumn: return "Rake leaves";
    case Season.Winter: return "Build snowman";
  }
}`,
      hints: [
        'Reference enum members with EnumName.MemberName.',
        'Match the activity to the season.',
        'Spring, Summer, Autumn, Winter',
      ],
      concepts: ['enum in switch'],
    },
    // --- 5 ---
    {
      id: 'ts-enums-5',
      title: 'Reverse mapping',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use reverse mapping to get the name from a numeric enum value.',
      skeleton: `enum Color { Red, Green, Blue }

const name: string = Color__BLANK__;
console.log(name); // "Green"`,
      solution: `enum Color { Red, Green, Blue }

const name: string = Color[1];
console.log(name); // "Green"`,
      hints: [
        'Numeric enums support reverse mapping: use the value as an index.',
        'Green has value 1 (auto-incremented from 0).',
        'Color[1] returns "Green".',
      ],
      concepts: ['reverse mapping'],
    },
    // --- 6 ---
    {
      id: 'ts-enums-6',
      title: 'Const enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Make the enum a const enum so it gets inlined at compile time.',
      skeleton: `__BLANK__ enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}

const code = StatusCode.OK; // Inlined to 200 at compile time`,
      solution: `const enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}

const code = StatusCode.OK; // Inlined to 200 at compile time`,
      hints: [
        'Add "const" before "enum" to make it a const enum.',
        'Const enums are erased at compile time, replaced with literal values.',
        'const enum StatusCode { ... }',
      ],
      concepts: ['const enums'],
    },
    // --- 7 ---
    {
      id: 'ts-enums-7',
      title: 'Computed enum members',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create an enum with computed member values using expressions.',
      skeleton: `// Create an enum FileSize where:
// KB = 1024
// MB = 1024 * 1024
// GB = 1024 * 1024 * 1024

function formatSize(bytes: number): string {
  if (bytes >= FileSize.GB) return \`\${(bytes / FileSize.GB).toFixed(1)} GB\`;
  if (bytes >= FileSize.MB) return \`\${(bytes / FileSize.MB).toFixed(1)} MB\`;
  return \`\${(bytes / FileSize.KB).toFixed(1)} KB\`;
}`,
      solution: `enum FileSize {
  KB = 1024,
  MB = 1024 * 1024,
  GB = 1024 * 1024 * 1024,
}

function formatSize(bytes: number): string {
  if (bytes >= FileSize.GB) return \`\${(bytes / FileSize.GB).toFixed(1)} GB\`;
  if (bytes >= FileSize.MB) return \`\${(bytes / FileSize.MB).toFixed(1)} MB\`;
  return \`\${(bytes / FileSize.KB).toFixed(1)} KB\`;
}`,
      hints: [
        'Enum members can use computed expressions.',
        'KB = 1024, then MB and GB are multiples.',
        'enum FileSize { KB = 1024, MB = 1024 * 1024, GB = 1024 * 1024 * 1024 }',
      ],
      concepts: ['computed enum members'],
    },
    // --- 8 ---
    {
      id: 'ts-enums-8',
      title: 'Iterating enums',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that returns all string values of a string enum.',
      skeleton: `enum Fruit {
  Apple = "apple",
  Banana = "banana",
  Cherry = "cherry",
}

function getEnumValues(): string[] {
  // return all string values of the Fruit enum
}`,
      solution: `enum Fruit {
  Apple = "apple",
  Banana = "banana",
  Cherry = "cherry",
}

function getEnumValues(): string[] {
  return Object.values(Fruit);
}`,
      hints: [
        'Enums are compiled to objects at runtime.',
        'Object.values() works on string enums directly.',
        'return Object.values(Fruit); for string enums.',
      ],
      concepts: ['iterating enums'],
    },
    // --- 9 ---
    {
      id: 'ts-enums-9',
      title: 'Enum vs union type',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict how enum and union type behave differently at runtime.',
      skeleton: `enum ColorEnum { Red = "red", Blue = "blue" }
type ColorUnion = "red" | "blue";

const e: ColorEnum = ColorEnum.Red;
const u: ColorUnion = "red";

console.log(e);
console.log(u);
console.log(typeof ColorEnum);
// What is typeof ColorUnion at runtime?`,
      solution: `red
red
object
ColorUnion does not exist at runtime -- type aliases are erased. typeof ColorEnum is "object" because enums compile to real JavaScript objects.`,
      hints: [
        'Enums produce a real object at runtime. Type aliases are erased.',
        'Both log "red", but ColorEnum is an object at runtime.',
        'typeof ColorEnum is "object". ColorUnion has no runtime presence.',
      ],
      concepts: ['enum vs union type', 'runtime behavior'],
    },
    // --- 10 ---
    {
      id: 'ts-enums-10',
      title: 'Bit flag enum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a bit flag enum for file permissions and write functions to combine and check flags.',
      skeleton: `// Create Permission enum with Read=1, Write=2, Execute=4 using bit shifts

function combine(...perms: Permission[]): number {
  // combine permissions using bitwise OR
}

function hasPermission(flags: number, perm: Permission): boolean {
  // check if a specific permission is set using bitwise AND
}`,
      solution: `enum Permission {
  Read = 1 << 0,
  Write = 1 << 1,
  Execute = 1 << 2,
}

function combine(...perms: Permission[]): number {
  return perms.reduce((acc, p) => acc | p, 0);
}

function hasPermission(flags: number, perm: Permission): boolean {
  return (flags & perm) === perm;
}`,
      hints: [
        'Bit flags use powers of 2 so each flag occupies one bit.',
        'Combine with | (OR), check with & (AND).',
        'enum Permission { Read = 1 << 0, Write = 1 << 1, Execute = 1 << 2 }',
      ],
      concepts: ['enum bit flags', 'bitwise operations'],
    },
    // --- 11 ---
    {
      id: 'ts-enums-11',
      title: 'Enum with functions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create utility functions that work with an enum.',
      skeleton: `enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

function isSuccess(status: HttpStatus): boolean {
  // return true if status is in the 200 range
}

function isError(status: HttpStatus): boolean {
  // return true if status is 400 or above
}

function statusToMessage(status: HttpStatus): string {
  // return a human-readable message for each status
}`,
      solution: `enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

function isSuccess(status: HttpStatus): boolean {
  return status >= 200 && status < 300;
}

function isError(status: HttpStatus): boolean {
  return status >= 400;
}

function statusToMessage(status: HttpStatus): string {
  switch (status) {
    case HttpStatus.OK: return "OK";
    case HttpStatus.Created: return "Created";
    case HttpStatus.BadRequest: return "Bad Request";
    case HttpStatus.NotFound: return "Not Found";
    case HttpStatus.ServerError: return "Internal Server Error";
  }
}`,
      hints: [
        'Numeric enum values can be compared with < and >=.',
        'isSuccess checks 200-299 range; isError checks 400+.',
        'Use a switch statement for statusToMessage.',
      ],
      concepts: ['enum with functions', 'enum patterns'],
    },
    // --- 12 ---
    {
      id: 'ts-enums-12',
      title: 'Enum namespace merging',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the code to add a static method to an enum using namespace merging.',
      skeleton: `enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

// Try to add a fromHex method to the Color enum
Color.fromHex = function(hex: string): Color {
  // This doesn't work -- how to fix?
  const map: Record<string, Color> = { "#ff0000": Color.Red, "#00ff00": Color.Green, "#0000ff": Color.Blue };
  return map[hex] ?? Color.Red;
};`,
      solution: `enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

namespace Color {
  export function fromHex(hex: string): Color {
    const map: Record<string, Color> = {
      "#ff0000": Color.Red,
      "#00ff00": Color.Green,
      "#0000ff": Color.Blue,
    };
    return map[hex] ?? Color.Red;
  }
}`,
      hints: [
        'You cannot directly assign properties to an enum.',
        'Use a namespace with the same name to merge additional members.',
        'namespace Color { export function fromHex(...) { ... } }',
      ],
      concepts: ['enum namespace merging'],
    },
    // --- 13 ---
    {
      id: 'ts-enums-13',
      title: 'Enum anti-patterns',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this code that demonstrates common enum anti-patterns.',
      skeleton: `// Anti-pattern 1: heterogeneous enum
enum Mixed {
  Name = "admin",
  Level = 3,
}

// Anti-pattern 2: using numeric enum for string comparisons
enum Status { Active, Inactive }
function isActive(status: string): boolean {
  return status === Status.Active; // Bug: comparing string to number
}

// Fix both issues`,
      solution: `// Fix 1: use consistent types (all strings)
enum Role {
  Name = "admin",
  Level = "3",
}

// Fix 2: use string enum for string comparisons
enum Status {
  Active = "active",
  Inactive = "inactive",
}
function isActive(status: string): boolean {
  return status === Status.Active;
}`,
      hints: [
        'Heterogeneous enums (mixing string and number) are confusing and should be avoided.',
        'When comparing with strings, use string enums.',
        'Make both enums use consistent value types.',
      ],
      concepts: ['enum anti-patterns', 'enum best practices'],
    },
    // --- 14 ---
    {
      id: 'ts-enums-14',
      title: 'Ambient enums',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the behavior difference between regular and const enums.',
      skeleton: `enum Regular { A = 1, B = 2 }
const enum Const { A = 1, B = 2 }

console.log(Regular.A);
console.log(Regular[1]);
// console.log(Const[1]); // Can you use reverse mapping on const enum?

const arr = [Regular.A, Regular.B];
console.log(arr);`,
      solution: `1
A
Const enums do NOT support reverse mapping -- they are fully inlined at compile time.
[1, 2]`,
      hints: [
        'Regular enums create a real object; const enums are inlined.',
        'Reverse mapping (Enum[value]) only works for regular numeric enums.',
        'Regular.A = 1, Regular[1] = "A". Const enums cannot do reverse mapping.',
      ],
      concepts: ['ambient enums', 'const enums', 'reverse mapping'],
    },
    // --- 15 ---
    {
      id: 'ts-enums-15',
      title: 'Enum member types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use individual enum members as types for precise typing.',
      skeleton: `enum Role {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

// Write a function that only accepts Admin role
function adminOnly(role: Role.Admin): string {
  return \`Admin access granted for \${role}\`;
}

// Write a function that accepts Admin or Editor
function editorOrAbove(role: Role.Admin | Role.Editor): string {
  return \`Editor access for \${role}\`;
}`,
      solution: `enum Role {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

function adminOnly(role: Role.Admin): string {
  return \`Admin access granted for \${role}\`;
}

function editorOrAbove(role: Role.Admin | Role.Editor): string {
  return \`Editor access for \${role}\`;
}`,
      hints: [
        'Individual enum members (like Role.Admin) can be used as literal types.',
        'This restricts the function to specific enum values.',
        'role: Role.Admin only accepts the Admin member.',
      ],
      concepts: ['enum member types', 'literal enum members'],
    },
    // --- 16 ---
    {
      id: 'ts-enums-16',
      title: 'Enum initialization',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Predict the numeric values of enum members with partial initialization.',
      skeleton: `enum Ports {
  HTTP = 80,
  HTTPS = 443,
  FTP,
  SSH = 22,
  DNS,
}

console.log(Ports.FTP);
console.log(Ports.DNS);`,
      solution: `444
23`,
      hints: [
        'Auto-increment continues from the last explicitly set value.',
        'FTP follows HTTPS (443), so FTP = 444.',
        'DNS follows SSH (22), so DNS = 23.',
      ],
      concepts: ['enum initialization', 'auto-increment'],
    },
    // --- 17 ---
    {
      id: 'ts-enums-17',
      title: 'Converting enum to object',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a utility function that converts a string enum to a plain object for use in non-TypeScript contexts.',
      skeleton: `enum Theme {
  Light = "light",
  Dark = "dark",
  System = "system",
}

function enumToObject<T extends Record<string, string>>(
  enumObj: T
): { [K in keyof T]: T[K] } {
  // convert enum to a plain frozen object
}

const themeOptions = enumToObject(Theme);`,
      solution: `enum Theme {
  Light = "light",
  Dark = "dark",
  System = "system",
}

function enumToObject<T extends Record<string, string>>(
  enumObj: T
): { [K in keyof T]: T[K] } {
  return Object.freeze({ ...enumObj });
}

const themeOptions = enumToObject(Theme);`,
      hints: [
        'Spread the enum into a new object to create a plain copy.',
        'Object.freeze prevents accidental modification.',
        'return Object.freeze({ ...enumObj });',
      ],
      concepts: ['converting enum to object'],
    },
    // --- 18 ---
    {
      id: 'ts-enums-18',
      title: 'Enum best practices',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor a numeric enum to a safer string enum with proper naming.',
      skeleton: `// Problematic: numeric values are not self-documenting
enum status {
  active,
  inactive,
  pending,
  deleted,
}

function handleStatus(s: status): string {
  if (s === 0) return "Active user";
  if (s === 1) return "Inactive user";
  if (s === 2) return "Pending approval";
  if (s === 3) return "Deleted";
  return "Unknown";
}`,
      solution: `enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
  Deleted = "DELETED",
}

function handleStatus(s: Status): string {
  switch (s) {
    case Status.Active: return "Active user";
    case Status.Inactive: return "Inactive user";
    case Status.Pending: return "Pending approval";
    case Status.Deleted: return "Deleted";
  }
}`,
      hints: [
        'PascalCase for enum name; PascalCase for members.',
        'String values make logs and debugging much clearer.',
        'Replace numeric comparisons with enum member references in a switch.',
      ],
      concepts: ['enum best practices', 'string enums'],
    },
    // --- 19 ---
    {
      id: 'ts-enums-19',
      title: 'preserveConstEnums',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Understand the effect of preserveConstEnums compiler option.',
      skeleton: `// With preserveConstEnums: false (default)
const enum InlinedEnum { A = 1, B = 2, C = 3 }
const val = InlinedEnum.A;
// Compiled JS: const val = 1; (no enum object)

// With preserveConstEnums: true
// Compiled JS: var InlinedEnum; (function...) + const val = 1;

// Question: Can you use Object.values(InlinedEnum) with const enum?
// What about with preserveConstEnums: true?`,
      solution: `Without preserveConstEnums, const enums are completely erased -- you cannot use Object.values() on them at all. With preserveConstEnums: true, the enum object is emitted but values are still inlined at usage sites. However, you still cannot use Object.values() in TypeScript code because the type system treats const enums as inlined.`,
      hints: [
        'Const enums are inlined -- the enum object does not exist at runtime by default.',
        'preserveConstEnums keeps the object for debugging but still inlines values.',
        'You cannot iterate const enums at runtime regardless of this flag.',
      ],
      concepts: ['preserveConstEnums', 'const enum behavior'],
    },
    // --- 20 ---
    {
      id: 'ts-enums-20',
      title: 'Refactor enum to union',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor an enum-based API to use union types instead, following modern TypeScript practices.',
      skeleton: `enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}

interface Task {
  id: string;
  title: string;
  priority: Priority;
}

function getPriorityLabel(priority: Priority): string {
  switch (priority) {
    case Priority.Low: return "Low Priority";
    case Priority.Medium: return "Medium Priority";
    case Priority.High: return "High Priority";
    case Priority.Critical: return "CRITICAL";
  }
}

const task: Task = { id: "1", title: "Fix bug", priority: Priority.High };`,
      solution: `type Priority = "low" | "medium" | "high" | "critical";

interface Task {
  id: string;
  title: string;
  priority: Priority;
}

function getPriorityLabel(priority: Priority): string {
  switch (priority) {
    case "low": return "Low Priority";
    case "medium": return "Medium Priority";
    case "high": return "High Priority";
    case "critical": return "CRITICAL";
  }
}

const task: Task = { id: "1", title: "Fix bug", priority: "high" };`,
      hints: [
        'Replace the enum with a type alias of string literals.',
        'Switch cases use the string values directly instead of Enum.Member.',
        'type Priority = "low" | "medium" | "high" | "critical";',
      ],
      concepts: ['enum to union refactoring', 'modern TypeScript'],
    },
  ],
};
