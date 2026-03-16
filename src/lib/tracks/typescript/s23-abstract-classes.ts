import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-abstract',
  title: '23. Abstract Classes & Methods',
  explanation: `## Abstract Classes & Methods

An **abstract class** cannot be instantiated directly -- it serves as a blueprint for subclasses. Abstract methods have no implementation; subclasses **must** provide one.

\\\`\\\`\\\`typescript
abstract class Shape {
  abstract area(): number;       // no body -- subclasses must implement
  abstract perimeter(): number;

  describe(): string {           // concrete method -- inherited as-is
    return \\\`Area: \\\${this.area()}, Perimeter: \\\${this.perimeter()}\\\`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
  perimeter(): number { return 2 * Math.PI * this.radius; }
}
// new Shape(); // Error: cannot instantiate abstract class
\\\`\\\`\\\`

Abstract classes vs interfaces:
- Abstract classes can have **concrete methods** and **state**
- Interfaces are purely structural -- no runtime code
- A class can implement multiple interfaces but extend only one class
- Use abstract classes for shared behavior, interfaces for shared contracts`,
  exercises: [
    {
      id: 'ts-abstract-1',
      title: 'Declare abstract class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the keyword to make this class abstract.',
      skeleton: `__BLANK__ class Animal {
  abstract speak(): string;
}

class Dog extends Animal {
  speak(): string {
    return 'Woof!';
  }
}`,
      solution: `abstract class Animal {
  abstract speak(): string;
}

class Dog extends Animal {
  speak(): string {
    return 'Woof!';
  }
}`,
      hints: [
        'Which keyword prevents a class from being instantiated directly?',
        'abstract before class means it cannot be constructed with new.',
        'Replace __BLANK__ with abstract.',
      ],
      concepts: ['abstract class declaration'],
    },
    {
      id: 'ts-abstract-2',
      title: 'Abstract method syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to declare an abstract method (no body).',
      skeleton: `abstract class Validator {
  __BLANK__ validate(input: string): boolean;

  run(input: string): string {
    return this.validate(input) ? 'Valid' : 'Invalid';
  }
}`,
      solution: `abstract class Validator {
  abstract validate(input: string): boolean;

  run(input: string): string {
    return this.validate(input) ? 'Valid' : 'Invalid';
  }
}`,
      hints: [
        'Abstract methods have no body -- they end with a semicolon.',
        'The abstract keyword before a method declares it without implementation.',
        'Replace __BLANK__ with abstract.',
      ],
      concepts: ['abstract methods'],
    },
    {
      id: 'ts-abstract-3',
      title: 'Implement abstract members',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Given the abstract class, create a JsonFormatter class that extends Formatter and implements format() to return JSON.stringify of the data.',
      skeleton: `abstract class Formatter {
  abstract format(data: unknown): string;
}

// Write JsonFormatter here
`,
      solution: `abstract class Formatter {
  abstract format(data: unknown): string;
}

class JsonFormatter extends Formatter {
  format(data: unknown): string {
    return JSON.stringify(data);
  }
}`,
      hints: [
        'Extend the abstract class and provide an implementation for format().',
        'class JsonFormatter extends Formatter { format(data) { ... } }',
        'Use JSON.stringify(data) to convert data to a JSON string.',
      ],
      concepts: ['implementing abstract members'],
    },
    {
      id: 'ts-abstract-4',
      title: 'Abstract properties',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blanks to declare an abstract property.',
      skeleton: `abstract class Vehicle {
  __BLANK__ __BLANK__ wheels: number;

  describe(): string {
    return \`This vehicle has \${this.wheels} wheels.\`;
  }
}

class Bike extends Vehicle {
  wheels = 2;
}`,
      solution: `abstract class Vehicle {
  abstract readonly wheels: number;

  describe(): string {
    return \`This vehicle has \${this.wheels} wheels.\`;
  }
}

class Bike extends Vehicle {
  wheels = 2;
}`,
      hints: [
        'Abstract properties are declared with the abstract keyword.',
        'You can combine abstract with readonly for a property that subclasses set once.',
        'Replace the blanks with abstract readonly.',
      ],
      concepts: ['abstract properties'],
    },
    {
      id: 'ts-abstract-5',
      title: 'Predict abstract error',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Will this code compile? If not, what is the error?',
      skeleton: `abstract class Base {
  abstract doWork(): void;
}

const b = new Base();`,
      solution: `Error: Cannot create an instance of an abstract class.`,
      hints: [
        'Can you create an instance of an abstract class?',
        'Abstract classes exist only to be extended, not instantiated.',
        'new Base() fails because Base is abstract.',
      ],
      concepts: ['abstract class declaration'],
    },
    {
      id: 'ts-abstract-6',
      title: 'Abstract with concrete methods',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to complete the concrete method that uses the abstract method.',
      skeleton: `abstract class Sorter {
  abstract compare(a: number, b: number): number;

  sort(arr: number[]): number[] {
    return [...arr].sort(__BLANK__);
  }
}

class AscSorter extends Sorter {
  compare(a: number, b: number): number {
    return a - b;
  }
}`,
      solution: `abstract class Sorter {
  abstract compare(a: number, b: number): number;

  sort(arr: number[]): number[] {
    return [...arr].sort(this.compare);
  }
}

class AscSorter extends Sorter {
  compare(a: number, b: number): number {
    return a - b;
  }
}`,
      hints: [
        'The concrete sort method needs to use the abstract compare method.',
        'Pass the comparison function to Array.sort().',
        'Replace __BLANK__ with this.compare.',
      ],
      concepts: ['abstract with concrete methods'],
    },
    {
      id: 'ts-abstract-7',
      title: 'Abstract vs interface',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the main difference that makes this code valid for the abstract class but invalid for the interface?',
      skeleton: `abstract class WithLogger {
  log(msg: string): void {
    console.log(\`[LOG] \${msg}\`);
  }
  abstract process(): void;
}

interface WithLogger2 {
  log(msg: string): void;   // no implementation possible
  process(): void;
}`,
      solution: `Abstract classes can contain concrete method implementations (like log()), while interfaces can only declare method signatures with no implementation.`,
      hints: [
        'Look at the log method in both cases.',
        'One can have a method body, the other cannot.',
        'Abstract classes can have concrete (implemented) methods. Interfaces cannot have any implementation.',
      ],
      concepts: ['abstract vs interface'],
    },
    {
      id: 'ts-abstract-8',
      title: 'Template method pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Implement the Template Method pattern: abstract class DataProcessor has a concrete process(data: string): string method that calls abstract validate(data: string): boolean, abstract transform(data: string): string, and abstract save(data: string): void in sequence. If validate fails, throw an error.',
      skeleton: `// Write the DataProcessor abstract class
`,
      solution: `abstract class DataProcessor {
  abstract validate(data: string): boolean;
  abstract transform(data: string): string;
  abstract save(data: string): void;

  process(data: string): string {
    if (!this.validate(data)) {
      throw new Error('Validation failed');
    }
    const transformed = this.transform(data);
    this.save(transformed);
    return transformed;
  }
}`,
      hints: [
        'The Template Method pattern defines the algorithm skeleton in a concrete method, deferring steps to abstract methods.',
        'process() calls validate, transform, and save in order. All three are abstract.',
        'process calls validate first (throw if false), then transforms, then saves, and returns the transformed result.',
      ],
      concepts: ['template method pattern', 'abstract with concrete methods'],
    },
    {
      id: 'ts-abstract-9',
      title: 'Abstract class constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an abstract class Entity with a constructor that takes id: string and createdAt: Date (defaults to new Date()). Add an abstract serialize(): string method. Then write a UserEntity subclass with a name field.',
      skeleton: `// Write Entity and UserEntity
`,
      solution: `abstract class Entity {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date = new Date()
  ) {}

  abstract serialize(): string;
}

class UserEntity extends Entity {
  constructor(id: string, public name: string) {
    super(id);
  }

  serialize(): string {
    return JSON.stringify({ id: this.id, name: this.name, createdAt: this.createdAt });
  }
}`,
      hints: [
        'Abstract classes can have constructors that subclasses call via super().',
        'Entity takes id and optional createdAt. UserEntity extends it and adds name.',
        'UserEntity calls super(id) and implements serialize() returning JSON.',
      ],
      concepts: ['abstract class constructor', 'implementing abstract members'],
    },
    {
      id: 'ts-abstract-10',
      title: 'Abstract with generics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an abstract class Repository<T> with abstract methods findById(id: string): T | undefined, save(item: T): void, and getAll(): T[]. Then write InMemoryRepository<T> that implements them using an internal Map.',
      skeleton: `// Write Repository<T> and InMemoryRepository<T>
`,
      solution: `abstract class Repository<T> {
  abstract findById(id: string): T | undefined;
  abstract save(id: string, item: T): void;
  abstract getAll(): T[];
}

class InMemoryRepository<T> extends Repository<T> {
  private store = new Map<string, T>();

  findById(id: string): T | undefined {
    return this.store.get(id);
  }

  save(id: string, item: T): void {
    this.store.set(id, item);
  }

  getAll(): T[] {
    return Array.from(this.store.values());
  }
}`,
      hints: [
        'The abstract class is generic: abstract class Repository<T>.',
        'InMemoryRepository<T> extends Repository<T> and uses a Map<string, T> internally.',
        'findById uses map.get, save uses map.set, getAll uses Array.from(map.values()).',
      ],
      concepts: ['abstract with generics'],
    },
    {
      id: 'ts-abstract-11',
      title: 'Fix missing implementation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This class extends an abstract class but forgets to implement one of the abstract methods. Fix it.',
      skeleton: `abstract class Codec {
  abstract encode(data: string): string;
  abstract decode(data: string): string;
}

class Base64Codec extends Codec {
  encode(data: string): string {
    return btoa(data);
  }
  // Bug: decode is not implemented
}`,
      solution: `abstract class Codec {
  abstract encode(data: string): string;
  abstract decode(data: string): string;
}

class Base64Codec extends Codec {
  encode(data: string): string {
    return btoa(data);
  }

  decode(data: string): string {
    return atob(data);
  }
}`,
      hints: [
        'All abstract methods must be implemented in concrete subclasses.',
        'Base64Codec is missing the decode method implementation.',
        'Add decode(data: string): string { return atob(data); }.',
      ],
      concepts: ['implementing abstract members'],
    },
    {
      id: 'ts-abstract-12',
      title: 'Abstract factory pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Implement an abstract factory: abstract class UIFactory with abstract createButton(): Button and abstract createInput(): Input. Define Button and Input interfaces with render(): string. Create a DarkUIFactory that returns dark-themed components.',
      skeleton: `// Write interfaces, abstract factory, and concrete factory
`,
      solution: `interface Button {
  render(): string;
}

interface Input {
  render(): string;
}

abstract class UIFactory {
  abstract createButton(): Button;
  abstract createInput(): Input;
}

class DarkButton implements Button {
  render(): string { return '<button class="dark">Click</button>'; }
}

class DarkInput implements Input {
  render(): string { return '<input class="dark" />'; }
}

class DarkUIFactory extends UIFactory {
  createButton(): Button { return new DarkButton(); }
  createInput(): Input { return new DarkInput(); }
}`,
      hints: [
        'Define Button and Input interfaces first, then the abstract UIFactory.',
        'The concrete factory creates specific implementations of Button and Input.',
        'DarkUIFactory returns DarkButton and DarkInput instances.',
      ],
      concepts: ['abstract factory pattern', 'abstract class as contract'],
    },
    {
      id: 'ts-abstract-13',
      title: 'Abstract getter/setter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the blanks to declare an abstract getter.',
      skeleton: `abstract class ConfigSource {
  __BLANK__ get value(): string;
}

class EnvConfig extends ConfigSource {
  get value(): string {
    return process.env.MY_VAR ?? 'default';
  }
}`,
      solution: `abstract class ConfigSource {
  abstract get value(): string;
}

class EnvConfig extends ConfigSource {
  get value(): string {
    return process.env.MY_VAR ?? 'default';
  }
}`,
      hints: [
        'Getters can be abstract too.',
        'abstract goes before get to declare an abstract getter.',
        'Replace __BLANK__ with abstract.',
      ],
      concepts: ['abstract getter/setter'],
    },
    {
      id: 'ts-abstract-14',
      title: 'Partial implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an abstract class HttpClient with a concrete get(url: string): Promise<string> that calls abstract fetch(url: string, method: string): Promise<string> with method "GET". Also add abstract post(url: string, body: string): Promise<string>.',
      skeleton: `// Write the HttpClient abstract class
`,
      solution: `abstract class HttpClient {
  abstract fetch(url: string, method: string, body?: string): Promise<string>;

  async get(url: string): Promise<string> {
    return this.fetch(url, 'GET');
  }

  abstract post(url: string, body: string): Promise<string>;
}`,
      hints: [
        'Partial implementation means some methods are concrete (get) and some are abstract (fetch, post).',
        'get() is concrete and delegates to the abstract fetch() method.',
        'get calls this.fetch(url, "GET"). post is abstract for subclasses to implement.',
      ],
      concepts: ['partial implementation', 'abstract with concrete methods'],
    },
    {
      id: 'ts-abstract-15',
      title: 'Abstract class hierarchy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this code log?',
      skeleton: `abstract class Base2 {
  abstract tag(): string;
  describe(): string { return \`[\${this.tag()}]\`; }
}

abstract class Middle extends Base2 {
  override describe(): string { return \`<\${this.tag()}>\`; }
}

class Leaf extends Middle {
  tag(): string { return 'leaf'; }
}

console.log(new Leaf().describe());`,
      solution: `<leaf>`,
      hints: [
        'Leaf extends Middle which extends Base2. Which describe() is used?',
        'Middle overrides describe() from Base2. Leaf inherits the override.',
        'Middle.describe returns `<${this.tag()}>`. Leaf.tag returns "leaf". Output: <leaf>.',
      ],
      concepts: ['abstract class hierarchy'],
    },
    {
      id: 'ts-abstract-16',
      title: 'When to use abstract',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This code uses an interface where an abstract class would be better because there is shared logic. Refactor: extract the shared log method into an abstract class while keeping the unique execute method abstract.',
      skeleton: `interface Task {
  name: string;
  execute(): string;
}

class PrintTask implements Task {
  name = 'print';
  execute(): string {
    console.log(\`[\${this.name}] executing...\`);
    return 'printed';
  }
}

class EmailTask implements Task {
  name = 'email';
  execute(): string {
    console.log(\`[\${this.name}] executing...\`);
    return 'emailed';
  }
}`,
      solution: `abstract class Task {
  constructor(public name: string) {}

  abstract run(): string;

  execute(): string {
    console.log(\`[\${this.name}] executing...\`);
    return this.run();
  }
}

class PrintTask extends Task {
  constructor() { super('print'); }
  run(): string { return 'printed'; }
}

class EmailTask extends Task {
  constructor() { super('email'); }
  run(): string { return 'emailed'; }
}`,
      hints: [
        'Both classes have identical logging logic in execute(). Extract it to an abstract class.',
        'The abstract class provides execute() with the logging. A new abstract run() holds the unique logic.',
        'abstract class Task { execute() logs and calls abstract run(). Subclasses only implement run().',
      ],
      concepts: ['when to use abstract', 'abstract vs interface'],
    },
    {
      id: 'ts-abstract-17',
      title: 'Testing abstract classes',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a test helper: a concrete TestDouble class that extends the abstract Cache class below and provides minimal implementations. findById returns undefined, save does nothing, clear does nothing.',
      skeleton: `abstract class Cache<T> {
  abstract findById(id: string): T | undefined;
  abstract save(id: string, item: T): void;
  abstract clear(): void;

  has(id: string): boolean {
    return this.findById(id) !== undefined;
  }
}

// Write TestDouble for testing
`,
      solution: `abstract class Cache<T> {
  abstract findById(id: string): T | undefined;
  abstract save(id: string, item: T): void;
  abstract clear(): void;

  has(id: string): boolean {
    return this.findById(id) !== undefined;
  }
}

class TestDoubleCache<T> extends Cache<T> {
  findById(_id: string): T | undefined {
    return undefined;
  }

  save(_id: string, _item: T): void {
    // no-op for testing
  }

  clear(): void {
    // no-op for testing
  }
}`,
      hints: [
        'A test double provides minimal implementations so you can test the concrete methods.',
        'Implement all abstract methods with minimal behavior: return undefined, do nothing, etc.',
        'findById returns undefined, save and clear are empty. Now you can test has() via the TestDouble.',
      ],
      concepts: ['testing abstract classes', 'implementing abstract members'],
    },
    {
      id: 'ts-abstract-18',
      title: 'Abstract with mixins',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a mixin Loggable that adds a log(msg: string): void method to any class. Then write an abstract class Service with abstract start(): void. Finally write ApiService that extends Loggable(Service) and implements start.',
      skeleton: `// Write Loggable mixin, abstract Service, and ApiService
`,
      solution: `type Constructor<T = {}> = new (...args: any[]) => T;

function Loggable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    log(msg: string): void {
      console.log(\`[LOG] \${msg}\`);
    }
  };
}

abstract class Service {
  abstract start(): void;
}

// Note: mixins with abstract classes require a concrete intermediate
class ConcreteService extends Service {
  start(): void {}
}

class ApiService extends Loggable(ConcreteService) {
  override start(): void {
    this.log('ApiService starting');
  }
}`,
      hints: [
        'Mixins work with concrete classes. You may need a concrete wrapper for the abstract class.',
        'Create a minimal ConcreteService extending Service, then apply the mixin to it.',
        'ApiService extends Loggable(ConcreteService) and overrides start().',
      ],
      concepts: ['abstract with mixins'],
    },
    {
      id: 'ts-abstract-19',
      title: 'Abstract class anti-patterns',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This abstract class has too many responsibilities (formatting + networking + storage). Refactor to a single abstract class that only handles data formatting, extracting the other concerns.',
      skeleton: `abstract class DataHandler {
  abstract format(data: unknown): string;
  abstract sendOverNetwork(data: string): void;
  abstract saveToFile(data: string): void;

  process(data: unknown): void {
    const formatted = this.format(data);
    this.sendOverNetwork(formatted);
    this.saveToFile(formatted);
  }
}`,
      solution: `interface NetworkSender {
  send(data: string): void;
}

interface FileStorage {
  save(data: string): void;
}

abstract class DataFormatter {
  abstract format(data: unknown): string;
}

class DataHandler {
  constructor(
    private formatter: DataFormatter,
    private sender: NetworkSender,
    private storage: FileStorage
  ) {}

  process(data: unknown): void {
    const formatted = this.formatter.format(data);
    this.sender.send(formatted);
    this.storage.save(formatted);
  }
}`,
      hints: [
        'An abstract class with too many abstract methods forces subclasses to implement unrelated concerns.',
        'Split concerns: DataFormatter (abstract), NetworkSender (interface), FileStorage (interface).',
        'DataHandler uses composition -- takes a formatter, sender, and storage via constructor injection.',
      ],
      concepts: ['abstract class anti-patterns', 'when to use abstract'],
    },
    {
      id: 'ts-abstract-20',
      title: 'Practical abstract patterns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these three parser classes into an abstract Parser base with shared error handling, and individual parse implementations.',
      skeleton: `class JsonParser {
  parse(input: string): unknown {
    try {
      return JSON.parse(input);
    } catch {
      throw new Error('JsonParser: invalid input');
    }
  }
}

class CsvParser {
  parse(input: string): string[][] {
    try {
      return input.split('\\n').map(row => row.split(','));
    } catch {
      throw new Error('CsvParser: invalid input');
    }
  }
}

class UrlParser {
  parse(input: string): Record<string, string> {
    try {
      const params = new URLSearchParams(input);
      const result: Record<string, string> = {};
      params.forEach((v, k) => { result[k] = v; });
      return result;
    } catch {
      throw new Error('UrlParser: invalid input');
    }
  }
}`,
      solution: `abstract class Parser<T> {
  abstract readonly name: string;
  protected abstract doParse(input: string): T;

  parse(input: string): T {
    try {
      return this.doParse(input);
    } catch {
      throw new Error(\`\${this.name}: invalid input\`);
    }
  }
}

class JsonParser extends Parser<unknown> {
  readonly name = 'JsonParser';
  protected doParse(input: string): unknown {
    return JSON.parse(input);
  }
}

class CsvParser extends Parser<string[][]> {
  readonly name = 'CsvParser';
  protected doParse(input: string): string[][] {
    return input.split('\\n').map(row => row.split(','));
  }
}

class UrlParser extends Parser<Record<string, string>> {
  readonly name = 'UrlParser';
  protected doParse(input: string): Record<string, string> {
    const params = new URLSearchParams(input);
    const result: Record<string, string> = {};
    params.forEach((v, k) => { result[k] = v; });
    return result;
  }
}`,
      hints: [
        'All three parsers have identical try/catch error handling. Extract it to a base class.',
        'abstract class Parser<T> with concrete parse() that calls abstract doParse().',
        'parse() does the try/catch. Subclasses only implement doParse() with their specific logic.',
      ],
      concepts: ['practical abstract patterns', 'template method pattern', 'abstract with generics'],
    },
  ],
};
