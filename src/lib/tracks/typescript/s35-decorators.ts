import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-decorators',
  title: '35. Decorators',
  explanation: `## Decorators

Decorators are a powerful metaprogramming feature that lets you annotate and modify classes and their members.

### Class Decorators
Applied to the class constructor. Can modify or replace the class.

### Method Decorators
Applied to method descriptors. Can wrap or replace methods.

### Property Decorators
Applied to class properties. Can add metadata or intercept access.

### Decorator Factories
Functions that return decorators, allowing configuration via parameters.

### TC39 Stage 3 Decorators
The new standard decorator syntax uses a context object instead of the legacy (descriptor, target, key) signature. TypeScript 5.0+ supports both.

### auto-accessor
The \\\`accessor\\\` keyword creates auto-generated getter/setter pairs that decorators can intercept.

### Decorator Composition
Multiple decorators on one target are applied bottom-up (closest to the target first).

### Key Rules
- Enable \\\`experimentalDecorators\\\` for legacy decorators or use TC39 syntax.
- Decorators run at class definition time, not at instantiation.
- Decorator factories are called first, then the returned decorator is applied.
`,
  exercises: [
    {
      id: 'ts-decorators-1',
      title: 'Basic class decorator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Apply the sealed decorator to the Greeter class.',
      skeleton: `function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

__BLANK__
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}`,
      solution: `function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}`,
      hints: [
        'Decorators are applied with the @ symbol before the target.',
        'Place @decoratorName on the line before the class.',
        'The answer is: @sealed',
      ],
      concepts: ['class decorator', 'decorator syntax'],
    },
    {
      id: 'ts-decorators-2',
      title: 'Decorator factory',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the decorator factory that adds a label to a class.',
      skeleton: `function label(name: string) {
  __BLANK__ function (constructor: Function) {
    (constructor as any).label = name;
  };
}

@label("MyService")
class Service {}`,
      solution: `function label(name: string) {
  return function (constructor: Function) {
    (constructor as any).label = name;
  };
}

@label("MyService")
class Service {}`,
      hints: [
        'A decorator factory is a function that returns a decorator.',
        'Use the return keyword to return the inner decorator function.',
        'The answer is: return',
      ],
      concepts: ['decorator factory', 'return', 'class decorator'],
    },
    {
      id: 'ts-decorators-3',
      title: 'Method decorator shape',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the parameter types for a legacy method decorator.',
      skeleton: `function log(
  target: __BLANK__,
  propertyKey: __BLANK__,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\\\`Calling \${propertyKey}\\\`);
    return original.apply(this, args);
  };
}`,
      solution: `function log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\\\`Calling \${propertyKey}\\\`);
    return original.apply(this, args);
  };
}`,
      hints: [
        'Legacy method decorators receive (target, propertyKey, descriptor).',
        'target is any (the prototype), propertyKey is string.',
        'The blanks are: any and string',
      ],
      concepts: ['method decorator', 'legacy decorator signature'],
    },
    {
      id: 'ts-decorators-4',
      title: 'Predict decorator order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What is the order of decorator execution?',
      skeleton: `function first() {
  console.log("first factory");
  return function (target: any) {
    console.log("first decorator");
  };
}

function second() {
  console.log("second factory");
  return function (target: any) {
    console.log("second decorator");
  };
}

@first()
@second()
class Example {}`,
      solution: `first factory
second factory
second decorator
first decorator`,
      hints: [
        'Decorator factories are evaluated top-to-bottom.',
        'But the returned decorators are applied bottom-to-top.',
        'Output: first factory, second factory, second decorator, first decorator',
      ],
      concepts: ['decorator composition order', 'factory evaluation'],
    },
    {
      id: 'ts-decorators-5',
      title: 'Write a logging decorator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a method decorator that logs the method name and arguments before calling the original method.',
      skeleton: `// Write a log method decorator (legacy style)
// It should console.log the method name and arguments
`,
      solution: `function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\\\`\${propertyKey} called with:\\\`, args);
    return original.apply(this, args);
  };
  return descriptor;
}`,
      hints: [
        'Save the original method from descriptor.value.',
        'Replace descriptor.value with a wrapper that logs then calls the original.',
        'Use original.apply(this, args) to preserve the correct this context.',
      ],
      concepts: ['method decorator', 'logging', 'descriptor.value'],
    },
    {
      id: 'ts-decorators-6',
      title: 'Property decorator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a legacy property decorator that logs when a property is registered.',
      skeleton: `// Write a property decorator called track
// It should console.log the class name and property name
`,
      solution: `function track(target: any, propertyKey: string) {
  console.log(\\\`Property \${propertyKey} registered on \${target.constructor.name}\\\`);
}

class User {
  @track
  name: string = "Alice";
}`,
      hints: [
        'Property decorators receive (target, propertyKey) -- no descriptor.',
        'target is the prototype, propertyKey is the property name string.',
        'function track(target: any, propertyKey: string) { console.log(...); }',
      ],
      concepts: ['property decorator', 'metadata'],
    },
    {
      id: 'ts-decorators-7',
      title: 'Validation decorator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a decorator factory that validates a method argument is a positive number.',
      skeleton: `// Write a validatePositive decorator factory for methods
// If the first argument is not a positive number, throw an error
`,
      solution: `function validatePositive(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (typeof args[0] !== "number" || args[0] <= 0) {
      throw new Error(\\\`\${propertyKey}: argument must be a positive number\\\`);
    }
    return original.apply(this, args);
  };
  return descriptor;
}

class Calculator {
  @validatePositive
  sqrt(n: number): number {
    return Math.sqrt(n);
  }
}`,
      hints: [
        'Wrap the original method and check args[0] before calling it.',
        'Throw an Error if the value is not positive.',
        'Check typeof args[0] !== "number" || args[0] <= 0.',
      ],
      concepts: ['validation decorator', 'argument checking', 'method wrapping'],
    },
    {
      id: 'ts-decorators-8',
      title: 'Memoize decorator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a memoize method decorator that caches results based on arguments.',
      skeleton: `// Write a memoize method decorator that caches results
// Use a Map with JSON.stringify(args) as the key
`,
      solution: `function memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  const cache = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = original.apply(this, args);
    cache.set(key, result);
    return result;
  };
  return descriptor;
}`,
      hints: [
        'Create a Map to store cached results.',
        'Use JSON.stringify(args) as the cache key.',
        'Check the cache first, return cached value if it exists, otherwise compute and store.',
      ],
      concepts: ['memoization', 'caching', 'method decorator'],
    },
    {
      id: 'ts-decorators-9',
      title: 'Fix: lost this context',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This decorator loses the this context by using an arrow function. Fix it.',
      skeleton: `function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = (...args: any[]) => {
    console.log(\\\`\${key} called\\\`);
    return original.apply(this, args);  // 'this' is wrong here
  };
  return descriptor;
}

class Service {
  name = "MyService";

  @log
  greet() {
    return this.name;
  }
}`,
      solution: `function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\\\`\${key} called\\\`);
    return original.apply(this, args);
  };
  return descriptor;
}

class Service {
  name = "MyService";

  @log
  greet() {
    return this.name;
  }
}`,
      hints: [
        'Arrow functions capture the outer this, which is wrong for method decorators.',
        'Use a regular function expression to get the correct this.',
        'Change (...args: any[]) => { ... } to function (...args: any[]) { ... }.',
      ],
      concepts: ['this context', 'arrow vs function', 'decorator bug'],
    },
    {
      id: 'ts-decorators-10',
      title: 'Deprecate decorator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a deprecate decorator factory that logs a deprecation warning with a custom message.',
      skeleton: `// Write deprecate(message: string) decorator factory
// Should console.warn the message when the method is called
`,
      solution: `function deprecate(message: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.warn(\\\`DEPRECATED: \${propertyKey} - \${message}\\\`);
      return original.apply(this, args);
    };
    return descriptor;
  };
}

class Api {
  @deprecate("Use fetchV2 instead")
  fetch() {
    return "data";
  }
}`,
      hints: [
        'A decorator factory returns a decorator function.',
        'The inner decorator wraps the method to log a warning.',
        'function deprecate(message) { return function(target, key, desc) { ... }; }',
      ],
      concepts: ['deprecation', 'decorator factory', 'console.warn'],
    },
    {
      id: 'ts-decorators-11',
      title: 'TC39 class decorator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a class decorator using TC39 stage 3 syntax that adds a static timestamp.',
      skeleton: `// Write a TC39-style class decorator called timestamped
// It should add a static createdAt property to the class
`,
      solution: `function timestamped<T extends new (...args: any[]) => any>(
  target: T,
  context: ClassDecoratorContext
) {
  (target as any).createdAt = new Date();
  return target;
}

@timestamped
class Document {
  title: string;
  constructor(title: string) {
    this.title = title;
  }
}`,
      hints: [
        'TC39 decorators receive (target, context) instead of the legacy signature.',
        'context is a ClassDecoratorContext object.',
        'Set a static property on the target class.',
      ],
      concepts: ['TC39 decorators', 'ClassDecoratorContext', 'stage 3'],
    },
    {
      id: 'ts-decorators-12',
      title: 'TC39 method decorator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a TC39-style method decorator that measures execution time.',
      skeleton: `// Write a TC39-style timed method decorator
// Should log the method name and execution time in ms
`,
      solution: `function timed<T extends (...args: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext
) {
  return function (this: any, ...args: any[]) {
    const start = performance.now();
    const result = target.apply(this, args);
    const end = performance.now();
    console.log(\\\`\${String(context.name)} took \${(end - start).toFixed(2)}ms\\\`);
    return result;
  } as T;
}`,
      hints: [
        'TC39 method decorators receive the original method and a context object.',
        'Return a new function that wraps the original with timing logic.',
        'Use context.name to get the method name.',
      ],
      concepts: ['TC39 method decorator', 'ClassMethodDecoratorContext', 'performance'],
    },
    {
      id: 'ts-decorators-13',
      title: 'Predict multiple decorators',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What value does result hold after applying both decorators?',
      skeleton: `function double(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    return original.apply(this, args) * 2;
  };
}

function addOne(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    return original.apply(this, args) + 1;
  };
}

class Math {
  @double
  @addOne
  getValue() { return 3; }
}

const result = new Math().getValue();
console.log(result);`,
      solution: `8`,
      hints: [
        'Decorators apply bottom-up: addOne wraps getValue first, then double wraps that.',
        'addOne(getValue()) = 3 + 1 = 4, then double(4) = 8.',
        'Output is: 8',
      ],
      concepts: ['decorator composition', 'bottom-up application', 'wrapping'],
    },
    {
      id: 'ts-decorators-14',
      title: 'auto-accessor keyword',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use the auto-accessor keyword with a TC39 decorator that logs property changes.',
      skeleton: `// Write a TC39-style accessor decorator that logs set operations
// Use the auto-accessor keyword on a class field
`,
      solution: `function logged<T>(
  target: ClassAccessorDecoratorTarget<any, T>,
  context: ClassAccessorDecoratorContext
): ClassAccessorDecoratorResult<any, T> {
  return {
    set(value: T) {
      console.log(\\\`Setting \${String(context.name)} to \${value}\\\`);
      target.set.call(this, value);
    },
    get() {
      return target.get.call(this);
    },
  };
}

class Settings {
  @logged
  accessor theme: string = "dark";
}`,
      hints: [
        'auto-accessor creates a getter/setter pair that decorators can intercept.',
        'The decorator returns an object with get and set methods.',
        'Use the accessor keyword before the property name.',
      ],
      concepts: ['auto-accessor', 'TC39 accessor decorator', 'ClassAccessorDecoratorContext'],
    },
    {
      id: 'ts-decorators-15',
      title: 'addInitializer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a TC39 method decorator that uses addInitializer to bind the method to the instance.',
      skeleton: `// Write a bound decorator that auto-binds a method to its instance
// Use context.addInitializer
`,
      solution: `function bound<T extends (...args: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext
) {
  context.addInitializer(function (this: any) {
    this[context.name] = target.bind(this);
  });
  return target;
}

class Button {
  label = "Click me";

  @bound
  handleClick() {
    console.log(this.label);
  }
}`,
      hints: [
        'addInitializer registers a function that runs when the class is instantiated.',
        'Inside the initializer, bind the method to this.',
        'context.addInitializer(function() { this[context.name] = target.bind(this); });',
      ],
      concepts: ['addInitializer', 'method binding', 'TC39 decorator'],
    },
    {
      id: 'ts-decorators-16',
      title: 'Parameter decorator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a legacy parameter decorator that records which parameters are required.',
      skeleton: `// Write a @required parameter decorator (legacy style)
// Store the parameter index in metadata on the target
`,
      solution: `const requiredParams = new Map<string, number[]>();

function required(target: any, propertyKey: string, parameterIndex: number) {
  const existing = requiredParams.get(propertyKey) || [];
  existing.push(parameterIndex);
  requiredParams.set(propertyKey, existing);
}

class UserService {
  createUser(@required name: string, age?: number) {
    return { name, age };
  }
}`,
      hints: [
        'Parameter decorators receive (target, methodName, parameterIndex).',
        'Store the parameter index somewhere for later validation.',
        'Use a Map to track which parameters on which methods are required.',
      ],
      concepts: ['parameter decorator', 'metadata', 'legacy decorator'],
    },
    {
      id: 'ts-decorators-17',
      title: 'Fix: decorator return type',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This class decorator tries to add a method but does not return the modified class. Fix it.',
      skeleton: `function withToString(constructor: Function) {
  constructor.prototype.toString = function () {
    return JSON.stringify(this);
  };
  // Missing: should return the constructor
}

@withToString
class Config {
  host = "localhost";
  port = 3000;
}`,
      solution: `function withToString<T extends new (...args: any[]) => any>(constructor: T): T {
  constructor.prototype.toString = function () {
    return JSON.stringify(this);
  };
  return constructor;
}

@withToString
class Config {
  host = "localhost";
  port = 3000;
}`,
      hints: [
        'Class decorators should return the constructor to avoid issues.',
        'Add a generic constraint and return type to be type-safe.',
        'Return constructor at the end of the decorator.',
      ],
      concepts: ['class decorator return', 'generic constraint', 'decorator fix'],
    },
    {
      id: 'ts-decorators-18',
      title: 'Predict decorator timing',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'When does the decorator run -- at definition time or instantiation time?',
      skeleton: `function register(constructor: Function) {
  console.log("registered: " + constructor.name);
}

console.log("before class");

@register
class MyClass {}

console.log("after class");

const instance = new MyClass();
console.log("after instance");`,
      solution: `before class
registered: MyClass
after class
after instance`,
      hints: [
        'Decorators run when the class is defined, not when instantiated.',
        'The decorator runs immediately after the class declaration is processed.',
        'Output: before class, registered: MyClass, after class, after instance',
      ],
      concepts: ['decorator timing', 'definition time', 'class decoration'],
    },
    {
      id: 'ts-decorators-19',
      title: 'Refactor: extract repeated logic to decorator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor repeated try/catch error handling in methods into a decorator.',
      skeleton: `class Api {
  async getUser(id: number): Promise<any> {
    try {
      const res = await fetch("/api/users/" + id);
      return await res.json();
    } catch (e) {
      console.error("getUser failed:", e);
      return null;
    }
  }

  async getPost(id: number): Promise<any> {
    try {
      const res = await fetch("/api/posts/" + id);
      return await res.json();
    } catch (e) {
      console.error("getPost failed:", e);
      return null;
    }
  }
}`,
      solution: `function catchErrors(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    try {
      return await original.apply(this, args);
    } catch (e) {
      console.error(\\\`\${key} failed:\\\`, e);
      return null;
    }
  };
  return descriptor;
}

class Api {
  @catchErrors
  async getUser(id: number): Promise<any> {
    const res = await fetch("/api/users/" + id);
    return await res.json();
  }

  @catchErrors
  async getPost(id: number): Promise<any> {
    const res = await fetch("/api/posts/" + id);
    return await res.json();
  }
}`,
      hints: [
        'Extract the try/catch pattern into a decorator.',
        'The decorator wraps the method in try/catch and logs on error.',
        'Create a catchErrors decorator that handles the pattern.',
      ],
      concepts: ['refactoring', 'cross-cutting concern', 'decorator pattern'],
    },
    {
      id: 'ts-decorators-20',
      title: 'Refactor: inject dependency',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor manual dependency creation into a simple inject decorator pattern.',
      skeleton: `class Logger {
  log(msg: string) { console.log(msg); }
}

class Database {
  query(sql: string) { return []; }
}

class UserService {
  private logger = new Logger();
  private db = new Database();

  getUsers() {
    this.logger.log("Fetching users");
    return this.db.query("SELECT * FROM users");
  }
}`,
      solution: `const container = new Map<string, any>();
container.set("Logger", new (class Logger {
  log(msg: string) { console.log(msg); }
}));
container.set("Database", new (class Database {
  query(sql: string) { return []; }
}));

function inject(serviceName: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get() {
        return container.get(serviceName);
      },
      enumerable: true,
      configurable: true,
    });
  };
}

class UserService {
  @inject("Logger")
  private logger!: { log(msg: string): void };

  @inject("Database")
  private db!: { query(sql: string): any[] };

  getUsers() {
    this.logger.log("Fetching users");
    return this.db.query("SELECT * FROM users");
  }
}`,
      hints: [
        'Create a simple container (Map) for dependencies.',
        'Write an inject decorator factory that looks up the dependency by name.',
        'Use Object.defineProperty in the decorator to provide the value from the container.',
      ],
      concepts: ['dependency injection', 'decorator factory', 'container pattern'],
    },
  ],
};
