import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-variance',
  title: '46. Variance & Type Compatibility',
  explanation: `## Variance & Type Compatibility

Variance describes how subtyping of a generic type relates to the subtyping of its type parameter.

### Covariance (out)
If \\\`Dog extends Animal\\\`, then \\\`Producer<Dog> extends Producer<Animal>\\\`.
Outputs preserve the direction of subtyping.

### Contravariance (in)
If \\\`Dog extends Animal\\\`, then \\\`Consumer<Animal> extends Consumer<Dog>\\\`.
Inputs reverse the direction of subtyping.

### Invariance
The type parameter is used in both input and output positions, so neither direction holds.

### Bivariance
TypeScript methods (not function properties) are bivariant by default -- assignable in both directions. This is unsound but practical.

### Variance Annotations (TS 4.7+)
\\\`\\\`\\\`typescript
type Producer<out T> = { get(): T };
type Consumer<in T> = { accept(value: T): void };
type ReadWrite<in out T> = { get(): T; set(value: T): void };
\\\`\\\`\\\`

### strictFunctionTypes
When enabled, function parameters are checked contravariantly instead of bivariantly. Method syntax remains bivariant.

### Key Concepts
- Array<T> is covariant in T (but unsound for mutation).
- Function parameters are contravariant (with strictFunctionTypes).
- Readonly structures are safely covariant.
`,
  exercises: [
    {
      id: 'ts-variance-1',
      title: 'Covariance basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in whether this assignment is valid. Animal is a supertype of Dog.',
      skeleton: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

type Box<T> = { value: T; };

const dogBox: Box<Dog> = { value: { name: "Rex", breed: "Lab" } };
const animalBox: Box<Animal> = __BLANK__; // dogBox or Error?`,
      solution: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

type Box<T> = { value: T; };

const dogBox: Box<Dog> = { value: { name: "Rex", breed: "Lab" } };
const animalBox: Box<Animal> = dogBox; // Valid: Box is covariant in T`,
      hints: [
        'Box<T> only outputs T (read-only access).',
        'Since Dog extends Animal, Box<Dog> is assignable to Box<Animal>.',
        'The answer is: dogBox',
      ],
      concepts: ['covariance', 'structural subtyping'],
    },
    {
      id: 'ts-variance-2',
      title: 'Predict: function parameter variance',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'With strictFunctionTypes enabled, does this compile? Write "Compiles" or "Error".',
      skeleton: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

type Handler<T> = (value: T) => void;

const animalHandler: Handler<Animal> = (a) => console.log(a.name);
const dogHandler: Handler<Dog> = animalHandler;`,
      solution: `Compiles`,
      hints: [
        'Function parameters are contravariant with strictFunctionTypes.',
        'Animal is a supertype of Dog, so Handler<Animal> is assignable to Handler<Dog>.',
        'A function that handles any Animal can also handle a Dog.',
      ],
      concepts: ['contravariance', 'strictFunctionTypes', 'function parameters'],
    },
    {
      id: 'ts-variance-3',
      title: 'Predict: contravariance direction',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'With strictFunctionTypes enabled, does this compile? Write "Compiles" or "Error".',
      skeleton: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

type Handler<T> = (value: T) => void;

const dogHandler: Handler<Dog> = (d) => console.log(d.breed);
const animalHandler: Handler<Animal> = dogHandler;`,
      solution: `Error`,
      hints: [
        'Contravariance reverses the direction: Handler<Dog> is NOT assignable to Handler<Animal>.',
        'A function expecting Dog cannot safely handle any Animal.',
        'The dogHandler accesses .breed which not all Animals have.',
      ],
      concepts: ['contravariance', 'type safety', 'unsound assignments'],
    },
    {
      id: 'ts-variance-4',
      title: 'Variance annotations: out',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add the correct variance annotation to mark this type as covariant in T.',
      skeleton: `type Producer<__BLANK__ T> = {
  get(): T;
};`,
      solution: `type Producer<out T> = {
  get(): T;
};`,
      hints: [
        'Covariant means T appears in output positions.',
        'The "out" annotation marks a type parameter as covariant.',
        'The answer is: out',
      ],
      concepts: ['variance annotations', 'covariance'],
    },
    {
      id: 'ts-variance-5',
      title: 'Variance annotations: in',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add the correct variance annotation to mark this type as contravariant in T.',
      skeleton: `type Consumer<__BLANK__ T> = {
  accept(value: T): void;
};`,
      solution: `type Consumer<in T> = {
  accept(value: T): void;
};`,
      hints: [
        'Contravariant means T appears in input positions.',
        'The "in" annotation marks a type parameter as contravariant.',
        'The answer is: in',
      ],
      concepts: ['variance annotations', 'contravariance'],
    },
    {
      id: 'ts-variance-6',
      title: 'Invariance',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add the correct variance annotation for a type that uses T in both input and output positions.',
      skeleton: `type ReadWrite<__BLANK__ T> = {
  get(): T;
  set(value: T): void;
};`,
      solution: `type ReadWrite<in out T> = {
  get(): T;
  set(value: T): void;
};`,
      hints: [
        'When T is used for both reading and writing, it is invariant.',
        'Use both "in" and "out" annotations together.',
        'The answer is: in out',
      ],
      concepts: ['invariance', 'variance annotations'],
    },
    {
      id: 'ts-variance-7',
      title: 'Write: covariant readonly container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a ReadonlyBox<T> type with an "out" annotation and a "value" readonly property. Demonstrate that ReadonlyBox<Dog> is assignable to ReadonlyBox<Animal>.',
      skeleton: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

// Define ReadonlyBox<T> and demonstrate covariant assignment
`,
      solution: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

type ReadonlyBox<out T> = {
  readonly value: T;
};

const dogBox: ReadonlyBox<Dog> = { value: { name: "Rex", breed: "Lab" } };
const animalBox: ReadonlyBox<Animal> = dogBox; // OK: covariant`,
      hints: [
        'Use the "out" variance annotation since T is only read.',
        'Make the value property readonly to enforce covariance.',
        'ReadonlyBox<Dog> should be assignable to ReadonlyBox<Animal>.',
      ],
      concepts: ['covariance', 'readonly and variance', 'variance annotations'],
    },
    {
      id: 'ts-variance-8',
      title: 'Method vs function property',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'With strictFunctionTypes, does this compile? Write "Compiles" or "Error".',
      skeleton: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

interface MethodStyle {
  handle(value: Dog): void;
}

interface FuncStyle {
  handle: (value: Dog) => void;
}

const animalFn = (a: Animal) => console.log(a.name);

const m: MethodStyle = { handle: animalFn };
const f: FuncStyle = { handle: animalFn };
// Does BOTH compile, or does one fail?`,
      solution: `Compiles`,
      hints: [
        'Both actually compile: animalFn accepts Animal which is a supertype of Dog.',
        'Handler<Animal> IS assignable to Handler<Dog> (contravariance).',
        'The direction matters: we are assigning a wider handler to a narrower slot, which is safe.',
      ],
      concepts: ['method vs function property', 'bivariance', 'strictFunctionTypes'],
    },
    {
      id: 'ts-variance-9',
      title: 'Fix: unsound array assignment',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this code that exploits TypeScript array covariance unsoundness.',
      skeleton: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

const dogs: Dog[] = [{ name: "Rex", breed: "Lab" }];
const animals: Animal[] = dogs; // Covariant assignment
animals.push({ name: "Cat" }); // Oops! Not a Dog!

// Now dogs[1] is missing .breed
console.log(dogs[1].breed); // Runtime error!`,
      solution: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

const dogs: Dog[] = [{ name: "Rex", breed: "Lab" }];
const animals: readonly Animal[] = dogs; // ReadonlyArray prevents mutation

// animals.push({ name: "Cat" }); // Error: push does not exist on readonly
console.log(animals[0].name); // Safe read access`,
      hints: [
        'Mutable arrays are unsafely covariant in TypeScript.',
        'Use readonly arrays to prevent mutation through the supertype reference.',
        'Change Animal[] to readonly Animal[] to make the assignment safe.',
      ],
      concepts: ['variance in arrays', 'readonly and variance', 'soundness'],
    },
    {
      id: 'ts-variance-10',
      title: 'Variance in generics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type-safe event system where EventHandler<T> is contravariant in T, and EventSource<T> is covariant in T.',
      skeleton: `// Define EventHandler<T> and EventSource<T> with variance annotations
`,
      solution: `type EventHandler<in T> = {
  handle(event: T): void;
};

type EventSource<out T> = {
  lastEvent(): T | null;
};

interface UIEvent { target: string; }
interface ClickEvent extends UIEvent { x: number; y: number; }

const uiHandler: EventHandler<UIEvent> = {
  handle(e) { console.log(e.target); }
};
const clickHandler: EventHandler<ClickEvent> = uiHandler; // OK: contravariant

const clickSource: EventSource<ClickEvent> = {
  lastEvent() { return { target: "btn", x: 10, y: 20 }; }
};
const uiSource: EventSource<UIEvent> = clickSource; // OK: covariant`,
      hints: [
        'Handlers consume events (contravariant: use "in").',
        'Sources produce events (covariant: use "out").',
        'A handler for UIEvent can safely handle ClickEvent (wider handler, narrower usage).',
      ],
      concepts: ['variance in generics', 'contravariance', 'covariance', 'event systems'],
    },
    {
      id: 'ts-variance-11',
      title: 'Variance in interfaces',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an interface Comparable<T> that uses T contravariantly in a compareTo method. Demonstrate that Comparable<Animal> is assignable to Comparable<Dog>.',
      skeleton: `// Define Comparable<T> and demonstrate contravariant assignment
`,
      solution: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

interface Comparable<in T> {
  compareTo(other: T): number;
}

const animalCompare: Comparable<Animal> = {
  compareTo(other: Animal) {
    return other.name.localeCompare("ref");
  }
};

const dogCompare: Comparable<Dog> = animalCompare; // OK: contravariant`,
      hints: [
        'T appears only as an input parameter, making it contravariant.',
        'Use the "in" variance annotation.',
        'Comparable<Animal> is assignable to Comparable<Dog> because Animal is wider.',
      ],
      concepts: ['variance in interfaces', 'contravariance', 'comparable pattern'],
    },
    {
      id: 'ts-variance-12',
      title: 'Predict: conditional type variance',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the resulting type? Write it exactly.',
      skeleton: `type IsString<T> = T extends string ? true : false;

type A = IsString<string>;
type B = IsString<"hello">;
type C = IsString<number>;
// What are A, B, C?`,
      solution: `true, true, false`,
      hints: [
        'string extends string is true.',
        '"hello" extends string is also true (literal subtypes).',
        'number does not extend string, so C is false.',
      ],
      concepts: ['variance with conditional types', 'literal subtyping'],
    },
    {
      id: 'ts-variance-13',
      title: 'Fix: variance annotation mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the variance annotation that incorrectly marks T as covariant when it is used contravariantly.',
      skeleton: `type Processor<out T> = {
  process(input: T): void;
  transform(input: T): string;
};`,
      solution: `type Processor<in T> = {
  process(input: T): void;
  transform(input: T): string;
};`,
      hints: [
        'T is only used as a parameter (input position).',
        'Input-only positions are contravariant, not covariant.',
        'Change "out" to "in".',
      ],
      concepts: ['variance annotations', 'contravariance', 'type checking'],
    },
    {
      id: 'ts-variance-14',
      title: 'Structural subtyping depth',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Does this compile? Write "Compiles" or "Error".',
      skeleton: `interface Point2D { x: number; y: number; }
interface Point3D { x: number; y: number; z: number; }

function logPoint(p: Point2D): void {
  console.log(p.x, p.y);
}

const p3: Point3D = { x: 1, y: 2, z: 3 };
logPoint(p3);`,
      solution: `Compiles`,
      hints: [
        'TypeScript uses structural subtyping, not nominal.',
        'Point3D has all properties of Point2D (and more).',
        'A value with extra properties is assignable to a type with fewer required properties.',
      ],
      concepts: ['structural subtyping depth', 'assignability rules'],
    },
    {
      id: 'ts-variance-15',
      title: 'Excess property checking',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Does this compile? Write "Compiles" or "Error".',
      skeleton: `interface Point2D { x: number; y: number; }

// Direct object literal
const p: Point2D = { x: 1, y: 2, z: 3 };`,
      solution: `Error`,
      hints: [
        'Object literals undergo excess property checking.',
        'Unlike variable assignment, direct literals cannot have extra properties.',
        'The "z" property is not in Point2D, so this fails with excess property check.',
      ],
      concepts: ['excess property checking', 'fresh object literals'],
    },
    {
      id: 'ts-variance-16',
      title: 'Write: variance-safe collection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a ReadonlyCollection<T> (covariant) and a MutableCollection<T> (invariant) with appropriate variance annotations. Show that readonly allows covariant assignment but mutable does not.',
      skeleton: `// Define both collection types
`,
      solution: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

type ReadonlyCollection<out T> = {
  get(index: number): T;
  readonly length: number;
};

type MutableCollection<in out T> = {
  get(index: number): T;
  set(index: number, value: T): void;
  readonly length: number;
};

const dogs: ReadonlyCollection<Dog> = {
  get: (i) => ({ name: "Rex", breed: "Lab" }),
  length: 1,
};

// OK: covariant
const animals: ReadonlyCollection<Animal> = dogs;

const mutableDogs: MutableCollection<Dog> = {
  get: (i) => ({ name: "Rex", breed: "Lab" }),
  set: (i, v) => {},
  length: 1,
};

// Error: invariant -- cannot assign MutableCollection<Dog> to MutableCollection<Animal>
// const mutableAnimals: MutableCollection<Animal> = mutableDogs;`,
      hints: [
        'ReadonlyCollection only reads T, so it is covariant (out).',
        'MutableCollection reads and writes T, so it is invariant (in out).',
        'Only the readonly version allows the subtype assignment.',
      ],
      concepts: ['variance in classes', 'invariance', 'covariance', 'collection safety'],
    },
    {
      id: 'ts-variance-17',
      title: 'Variance with union types',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Demonstrate how variance interacts with union types. Write a function that accepts a callback for string | number but show that a callback for just string is NOT assignable (contravariance).',
      skeleton: `// Demonstrate variance with union types
`,
      solution: `function processItems(
  items: (string | number)[],
  handler: (item: string | number) => void
): void {
  items.forEach(handler);
}

// This works: handler accepts a wider type
const wideHandler = (item: string | number | boolean) => console.log(item);
processItems(["a", 1], wideHandler);

// This fails: handler accepts a narrower type
const narrowHandler = (item: string) => console.log(item.toUpperCase());
// processItems(["a", 1], narrowHandler); // Error!
// narrowHandler cannot handle numbers`,
      hints: [
        'A callback expecting string | number needs to handle both types.',
        'A callback for only string is too narrow (contravariance).',
        'A callback for string | number | boolean is wider and IS assignable.',
      ],
      concepts: ['variance with union types', 'contravariance', 'callback safety'],
    },
    {
      id: 'ts-variance-18',
      title: 'Fix: bivariance exploit',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix this code that exploits method bivariance to create an unsound assignment. Convert the method syntax to function property syntax.',
      skeleton: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

interface Listener {
  onEvent(event: Dog): void; // Method syntax: bivariant!
}

// This should NOT compile but does due to bivariance
const listener: Listener = {
  onEvent(event: Animal) {
    // Cannot access .breed safely
    console.log(event.name);
  }
};`,
      solution: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

interface Listener {
  onEvent: (event: Dog) => void; // Function property: contravariant
}

// Now this correctly fails with strictFunctionTypes
// const listener: Listener = {
//   onEvent: (event: Animal) => {
//     console.log(event.name);
//   }
// };

// Correct usage
const listener: Listener = {
  onEvent: (event: Dog) => {
    console.log(event.name, event.breed);
  }
};`,
      hints: [
        'Method syntax (method(): void) is bivariant even with strictFunctionTypes.',
        'Function property syntax (method: () => void) is checked contravariantly.',
        'Convert onEvent(event: Dog): void to onEvent: (event: Dog) => void.',
      ],
      concepts: ['bivariance', 'method vs function property', 'strictFunctionTypes'],
    },
    {
      id: 'ts-variance-19',
      title: 'Refactor: make type relationships explicit',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these generic interfaces to add explicit variance annotations (in/out) based on how T is used.',
      skeleton: `interface Repository<T> {
  findAll(): T[];
  findById(id: string): T | null;
  save(entity: T): void;
  delete(entity: T): void;
}

interface ReadOnlyRepo<T> {
  findAll(): T[];
  findById(id: string): T | null;
}

interface WriteOnlyRepo<T> {
  save(entity: T): void;
  delete(entity: T): void;
}

interface Mapper<TIn, TOut> {
  map(input: TIn): TOut;
}`,
      solution: `interface Repository<in out T> {
  findAll(): T[];
  findById(id: string): T | null;
  save(entity: T): void;
  delete(entity: T): void;
}

interface ReadOnlyRepo<out T> {
  findAll(): T[];
  findById(id: string): T | null;
}

interface WriteOnlyRepo<in T> {
  save(entity: T): void;
  delete(entity: T): void;
}

interface Mapper<in TIn, out TOut> {
  map(input: TIn): TOut;
}`,
      hints: [
        'Repository reads and writes T, so it is invariant (in out).',
        'ReadOnlyRepo only outputs T, so it is covariant (out).',
        'WriteOnlyRepo only accepts T, so it is contravariant (in). Mapper: TIn is in, TOut is out.',
      ],
      concepts: ['variance annotations', 'covariance', 'contravariance', 'invariance', 'practical variance understanding'],
    },
    {
      id: 'ts-variance-20',
      title: 'Refactor: soundness-safe type hierarchy',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this event system to be variance-safe. Split the mutable EventEmitter into separate Producer (covariant) and Consumer (contravariant) interfaces.',
      skeleton: `interface EventEmitter<T> {
  emit(event: T): void;
  listen(handler: (event: T) => void): void;
  lastEvent(): T | null;
}

interface UIEvent { target: string; }
interface ClickEvent extends UIEvent { x: number; y: number; }

// Problem: EventEmitter<ClickEvent> is neither safely covariant nor contravariant
const clickEmitter: EventEmitter<ClickEvent> = {
  emit(e) { /* ... */ },
  listen(handler) { /* ... */ },
  lastEvent() { return null; },
};`,
      solution: `interface EventProducer<out T> {
  lastEvent(): T | null;
  listen(handler: (event: T) => void): void;
}

interface EventConsumer<in T> {
  emit(event: T): void;
}

interface EventEmitter<T> extends EventProducer<T>, EventConsumer<T> {}

interface UIEvent { target: string; }
interface ClickEvent extends UIEvent { x: number; y: number; }

const clickEmitter: EventEmitter<ClickEvent> = {
  emit(e) { /* store event */ },
  listen(handler) { /* register handler */ },
  lastEvent() { return null; },
};

// Safe covariant read
const producer: EventProducer<UIEvent> = clickEmitter;

// Safe contravariant write
const consumer: EventConsumer<ClickEvent> = clickEmitter;`,
      hints: [
        'Split the emitter into a producer (read/listen) and consumer (emit).',
        'Producer is covariant: EventProducer<ClickEvent> assignable to EventProducer<UIEvent>.',
        'Consumer is contravariant: EventConsumer<UIEvent> assignable to EventConsumer<ClickEvent>.',
      ],
      concepts: ['practical variance understanding', 'interface segregation', 'soundness'],
    },
  ],
};
