import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-builder',
  title: '47. Design Pattern: Builder',
  explanation: `## Design Pattern: Builder

The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

### Core Concepts
- **Fluent interface**: Methods return \\\`this\\\` so calls can be chained.
- **Type-safe builders**: Use generics and phantom types to enforce required fields at compile time.
- **Step builders**: Force a specific order of method calls using type state.

### Basic Builder
\\\`\\\`\\\`typescript
class QueryBuilder {
  private query = '';
  select(fields: string[]) { this.query += 'SELECT ...'; return this; }
  from(table: string) { this.query += ' FROM ...'; return this; }
  build() { return this.query; }
}
\\\`\\\`\\\`

### Type-Safe Builder with Generics
\\\`\\\`\\\`typescript
class Builder<T extends Record<string, unknown>> {
  private data: Partial<T> = {};
  set<K extends keyof T>(key: K, value: T[K]) {
    this.data[key] = value;
    return this;
  }
  build(): T { return this.data as T; }
}
\\\`\\\`\\\`

### Phantom Types for Required Fields
Track which fields have been set at the type level using generic flags. Only allow \\\`build()\\\` when all required fields are present.
`,
  exercises: [
    {
      id: 'ts-builder-1',
      title: 'Basic builder with chaining',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the method return type so that method chaining works.',
      skeleton: `class StringBuilder {
  private parts: string[] = [];

  append(text: string): __BLANK__ {
    this.parts.push(text);
    return this;
  }

  build(): string {
    return this.parts.join('');
  }
}

const result = new StringBuilder().append("hello").append(" ").append("world").build();`,
      solution: `class StringBuilder {
  private parts: string[] = [];

  append(text: string): this {
    this.parts.push(text);
    return this;
  }

  build(): string {
    return this.parts.join('');
  }
}

const result = new StringBuilder().append("hello").append(" ").append("world").build();`,
      hints: [
        'For method chaining, the method must return the current instance.',
        'The return type should be "this" to support subclassing.',
        'The answer is: this',
      ],
      concepts: ['basic builder pattern', 'fluent interface', 'return this'],
    },
    {
      id: 'ts-builder-2',
      title: 'Fluent interface return type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the builder so the select and from methods return this for chaining.',
      skeleton: `class QueryBuilder {
  private parts: string[] = [];

  select(fields: string[]): __BLANK__ {
    this.parts.push(\\\`SELECT \${fields.join(', ')}\\\`);
    return this;
  }

  from(table: string): __BLANK__ {
    this.parts.push(\\\`FROM \${table}\\\`);
    return this;
  }

  build(): string {
    return this.parts.join(' ');
  }
}

const query = new QueryBuilder().select(["name", "age"]).from("users").build();`,
      solution: `class QueryBuilder {
  private parts: string[] = [];

  select(fields: string[]): this {
    this.parts.push(\\\`SELECT \${fields.join(', ')}\\\`);
    return this;
  }

  from(table: string): this {
    this.parts.push(\\\`FROM \${table}\\\`);
    return this;
  }

  build(): string {
    return this.parts.join(' ');
  }
}

const query = new QueryBuilder().select(["name", "age"]).from("users").build();`,
      hints: [
        'Both methods need to return this for chaining.',
        'Using "this" as the return type preserves the correct type in subclasses.',
        'The answer is: this (for both blanks)',
      ],
      concepts: ['fluent interface', 'method chaining', 'builder for queries'],
    },
    {
      id: 'ts-builder-3',
      title: 'Predict: builder chain result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `class Builder {
  private items: string[] = [];

  add(item: string): this {
    this.items.push(item);
    return this;
  }

  build(): string {
    return this.items.join('-');
  }
}

console.log(new Builder().add("a").add("b").add("c").build());`,
      solution: `a-b-c`,
      hints: [
        'Each add() call pushes to the items array.',
        'build() joins all items with hyphens.',
        'Three items: "a", "b", "c" joined by "-".',
      ],
      concepts: ['builder pattern', 'method chaining', 'string joining'],
    },
    {
      id: 'ts-builder-4',
      title: 'Builder for configuration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the generic set method that type-safely sets a config property.',
      skeleton: `interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

class ConfigBuilder {
  private config: Partial<AppConfig> = {};

  set<K extends __BLANK__>(key: K, value: AppConfig[K]): this {
    this.config[key] = value;
    return this;
  }

  build(): AppConfig {
    return this.config as AppConfig;
  }
}

const config = new ConfigBuilder()
  .set("host", "localhost")
  .set("port", 3000)
  .set("debug", true)
  .build();`,
      solution: `interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

class ConfigBuilder {
  private config: Partial<AppConfig> = {};

  set<K extends keyof AppConfig>(key: K, value: AppConfig[K]): this {
    this.config[key] = value;
    return this;
  }

  build(): AppConfig {
    return this.config as AppConfig;
  }
}

const config = new ConfigBuilder()
  .set("host", "localhost")
  .set("port", 3000)
  .set("debug", true)
  .build();`,
      hints: [
        'K must be constrained to the keys of AppConfig.',
        'keyof AppConfig gives the union of all property names.',
        'The answer is: keyof AppConfig',
      ],
      concepts: ['type-safe builder with generics', 'keyof', 'builder for configuration objects'],
    },
    {
      id: 'ts-builder-5',
      title: 'Builder with optional steps',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the conditional type to make the where clause optional in the query builder.',
      skeleton: `class SelectBuilder {
  private query: string[] = [];

  from(table: string): this {
    this.query.push(\\\`FROM \${table}\\\`);
    return this;
  }

  where(condition: string): this {
    this.query.push(\\\`WHERE \${condition}\\\`);
    return __BLANK__;
  }

  build(): string {
    return this.query.join(' ');
  }
}`,
      solution: `class SelectBuilder {
  private query: string[] = [];

  from(table: string): this {
    this.query.push(\\\`FROM \${table}\\\`);
    return this;
  }

  where(condition: string): this {
    this.query.push(\\\`WHERE \${condition}\\\`);
    return this;
  }

  build(): string {
    return this.query.join(' ');
  }
}`,
      hints: [
        'Like other chainable methods, where returns this.',
        'Since where is optional, the user simply does not call it.',
        'The answer is: this',
      ],
      concepts: ['builder with conditional steps', 'optional builder steps'],
    },
    {
      id: 'ts-builder-6',
      title: 'Write: HTTP request builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an HttpRequestBuilder class with methods: url(string), method("GET"|"POST"|"PUT"|"DELETE"), header(key, value), body(data), and build() returning a typed request object.',
      skeleton: `// Write the HttpRequestBuilder
`,
      solution: `interface HttpRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: Record<string, string>;
  body?: unknown;
}

class HttpRequestBuilder {
  private request: Partial<HttpRequest> = { headers: {} };

  url(url: string): this {
    this.request.url = url;
    return this;
  }

  method(method: HttpRequest['method']): this {
    this.request.method = method;
    return this;
  }

  header(key: string, value: string): this {
    this.request.headers![key] = value;
    return this;
  }

  body(data: unknown): this {
    this.request.body = data;
    return this;
  }

  build(): HttpRequest {
    if (!this.request.url) throw new Error('URL is required');
    if (!this.request.method) throw new Error('Method is required');
    return this.request as HttpRequest;
  }
}

const req = new HttpRequestBuilder()
  .url('https://api.example.com/users')
  .method('POST')
  .header('Content-Type', 'application/json')
  .body({ name: 'Zan' })
  .build();`,
      hints: [
        'Each method sets a property and returns this.',
        'build() validates required fields and returns the assembled object.',
        'Use runtime checks in build() for required fields like url and method.',
      ],
      concepts: ['builder for HTTP requests', 'method chaining', 'runtime validation'],
    },
    {
      id: 'ts-builder-7',
      title: 'Write: generic builder factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic createBuilder<T>() function that returns a builder with a type-safe set method for any object type T.',
      skeleton: `// Write the generic builder factory
`,
      solution: `function createBuilder<T extends Record<string, unknown>>() {
  const data: Partial<T> = {};

  const builder = {
    set<K extends keyof T>(key: K, value: T[K]) {
      data[key] = value;
      return builder;
    },
    build(): T {
      return data as T;
    },
  };

  return builder;
}

interface User {
  name: string;
  age: number;
  email: string;
}

const user = createBuilder<User>()
  .set('name', 'Zan')
  .set('age', 30)
  .set('email', 'zan@test.com')
  .build();`,
      hints: [
        'The factory returns an object with set and build methods.',
        'set is generic over K extends keyof T.',
        'The builder maintains Partial<T> internally and casts to T on build.',
      ],
      concepts: ['generic builder factory', 'type-safe builder with generics', 'closure'],
    },
    {
      id: 'ts-builder-8',
      title: 'Fix: builder loses type info',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this builder that loses type information because it returns a new object instead of this.',
      skeleton: `class FormBuilder {
  private fields: Record<string, string> = {};

  field(name: string, value: string) {
    this.fields[name] = value;
    return { field: this.field, build: this.build }; // Bug: loses 'this'
  }

  build(): Record<string, string> {
    return { ...this.fields };
  }
}

const form = new FormBuilder().field("name", "Zan").field("email", "test@test.com").build();`,
      solution: `class FormBuilder {
  private fields: Record<string, string> = {};

  field(name: string, value: string): this {
    this.fields[name] = value;
    return this;
  }

  build(): Record<string, string> {
    return { ...this.fields };
  }
}

const form = new FormBuilder().field("name", "Zan").field("email", "test@test.com").build();`,
      hints: [
        'Returning a new object breaks the prototype chain and loses state.',
        'The method should return "this" to maintain the builder instance.',
        'Add ": this" return type and return this directly.',
      ],
      concepts: ['fluent interface', 'return this', 'method chaining bugs'],
    },
    {
      id: 'ts-builder-9',
      title: 'Builder with reset/clone',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a builder class with reset() (clears state) and clone() (returns a new builder with copied state) methods.',
      skeleton: `// Write a ClonerableBuilder class
`,
      solution: `interface Widget {
  width: number;
  height: number;
  color: string;
}

class WidgetBuilder {
  private data: Partial<Widget> = {};

  width(w: number): this { this.data.width = w; return this; }
  height(h: number): this { this.data.height = h; return this; }
  color(c: string): this { this.data.color = c; return this; }

  reset(): this {
    this.data = {};
    return this;
  }

  clone(): WidgetBuilder {
    const copy = new WidgetBuilder();
    (copy as any).data = { ...this.data };
    return copy;
  }

  build(): Widget {
    return this.data as Widget;
  }
}

const base = new WidgetBuilder().width(100).height(50);
const red = base.clone().color("red").build();
const blue = base.clone().color("blue").build();`,
      hints: [
        'reset() clears the internal data and returns this.',
        'clone() creates a new instance and copies the data.',
        'Use spread to shallow-copy the data object.',
      ],
      concepts: ['builder reset/clone', 'immutable builder', 'prototype pattern'],
    },
    {
      id: 'ts-builder-10',
      title: 'Step builder with phantom types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a step builder that forces calling host() before port() before build(). Use phantom type flags to enforce the order at compile time.',
      skeleton: `// Write a type-safe step builder
`,
      solution: `interface ServerConfig {
  host: string;
  port: number;
}

type HasHost = { __host: true };
type HasPort = { __port: true };

class ServerBuilder<Flags = {}> {
  private config: Partial<ServerConfig> = {};

  host(h: string): ServerBuilder<Flags & HasHost> {
    this.config.host = h;
    return this as any;
  }

  port(this: ServerBuilder<HasHost & Flags>, p: number): ServerBuilder<Flags & HasHost & HasPort> {
    this.config.port = p;
    return this as any;
  }

  build(this: ServerBuilder<HasHost & HasPort>): ServerConfig {
    return this.config as ServerConfig;
  }
}

const server = new ServerBuilder()
  .host("localhost") // Required first
  .port(3000)        // Required second
  .build();          // Only available after both

// new ServerBuilder().port(3000); // Error: host not set yet
// new ServerBuilder().host("x").build(); // Error: port not set yet`,
      hints: [
        'Use generic flags to track which methods have been called.',
        'Constrain "this" in methods that require prior steps.',
        'The build method requires all flags to be present.',
      ],
      concepts: ['step builder', 'phantom types', 'type-safe builder with generics'],
    },
    {
      id: 'ts-builder-11',
      title: 'Predict: builder method order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this builder produce?',
      skeleton: `class PathBuilder {
  private segments: string[] = [];

  add(segment: string): this {
    this.segments.push(segment);
    return this;
  }

  build(): string {
    return '/' + this.segments.join('/');
  }
}

console.log(new PathBuilder().add("api").add("v2").add("users").build());`,
      solution: `/api/v2/users`,
      hints: [
        'Each add() pushes a segment.',
        'build() joins with "/" and prepends a "/".',
        'Three segments: "api", "v2", "users".',
      ],
      concepts: ['builder pattern', 'method chaining'],
    },
    {
      id: 'ts-builder-12',
      title: 'Builder for test fixtures',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a UserFixtureBuilder that creates test user objects with sensible defaults. Any property can be overridden.',
      skeleton: `// Write the test fixture builder
`,
      solution: `interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  active: boolean;
}

class UserFixtureBuilder {
  private data: User = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    active: true,
  };

  withId(id: number): this { this.data.id = id; return this; }
  withName(name: string): this { this.data.name = name; return this; }
  withEmail(email: string): this { this.data.email = email; return this; }
  withRole(role: User['role']): this { this.data.role = role; return this; }
  withActive(active: boolean): this { this.data.active = active; return this; }

  build(): User {
    return { ...this.data };
  }
}

const admin = new UserFixtureBuilder().withRole('admin').withName('Admin').build();
const guest = new UserFixtureBuilder().withRole('guest').withActive(false).build();`,
      hints: [
        'Initialize with sensible defaults in the constructor.',
        'Each withX method overrides one property.',
        'build() returns a copy to prevent shared state between tests.',
      ],
      concepts: ['builder for test fixtures', 'default values', 'test patterns'],
    },
    {
      id: 'ts-builder-13',
      title: 'Fix: mutable builder state leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this builder where build() returns a reference to the internal state, allowing external mutation.',
      skeleton: `interface Config {
  tags: string[];
  settings: Record<string, string>;
}

class ConfigBuilder {
  private config: Config = { tags: [], settings: {} };

  addTag(tag: string): this {
    this.config.tags.push(tag);
    return this;
  }

  setSetting(key: string, value: string): this {
    this.config.settings[key] = value;
    return this;
  }

  build(): Config {
    return this.config; // Bug: returns reference!
  }
}

const builder = new ConfigBuilder().addTag("prod");
const c1 = builder.build();
const c2 = builder.addTag("v2").build();
// c1.tags now has "v2" too!`,
      solution: `interface Config {
  tags: string[];
  settings: Record<string, string>;
}

class ConfigBuilder {
  private config: Config = { tags: [], settings: {} };

  addTag(tag: string): this {
    this.config.tags.push(tag);
    return this;
  }

  setSetting(key: string, value: string): this {
    this.config.settings[key] = value;
    return this;
  }

  build(): Readonly<Config> {
    return {
      tags: [...this.config.tags],
      settings: { ...this.config.settings },
    };
  }
}

const builder = new ConfigBuilder().addTag("prod");
const c1 = builder.build();
const c2 = builder.addTag("v2").build();
// c1 and c2 are independent copies`,
      hints: [
        'build() should return a deep copy, not the internal reference.',
        'Use spread to copy arrays and objects.',
        'Consider returning Readonly<Config> for extra safety.',
      ],
      concepts: ['builder with readonly result', 'defensive copying', 'immutability'],
    },
    {
      id: 'ts-builder-14',
      title: 'Builder type inference',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a builder that infers the resulting type based on which methods were called. If only name() is called, the result only has name. If email() is also called, it has both.',
      skeleton: `// Write an inference-based builder
`,
      solution: `class InferBuilder<T extends Record<string, unknown> = {}> {
  private data: T = {} as T;

  name(name: string): InferBuilder<T & { name: string }> {
    (this.data as any).name = name;
    return this as any;
  }

  email(email: string): InferBuilder<T & { email: string }> {
    (this.data as any).email = email;
    return this as any;
  }

  age(age: number): InferBuilder<T & { age: number }> {
    (this.data as any).age = age;
    return this as any;
  }

  build(): T {
    return { ...this.data };
  }
}

const partial = new InferBuilder().name("Zan").build();
// Type: { name: string }

const full = new InferBuilder().name("Zan").email("zan@test.com").age(30).build();
// Type: { name: string } & { email: string } & { age: number }`,
      hints: [
        'Each method returns a builder with an expanded generic type.',
        'Use intersection types: T & { newProp: type }.',
        'The build() method returns T, which accumulates all set properties.',
      ],
      concepts: ['builder type inference', 'generic accumulation', 'intersection types'],
    },
    {
      id: 'ts-builder-15',
      title: 'Write: UI component builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a ButtonBuilder that builds a typed Button config with required "label" and optional "onClick", "disabled", "variant", and "size" properties.',
      skeleton: `// Write the ButtonBuilder
`,
      solution: `interface Button {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

class ButtonBuilder {
  private config: Partial<Button> = {};

  label(text: string): this {
    this.config.label = text;
    return this;
  }

  onClick(handler: () => void): this {
    this.config.onClick = handler;
    return this;
  }

  disabled(value = true): this {
    this.config.disabled = value;
    return this;
  }

  variant(v: NonNullable<Button['variant']>): this {
    this.config.variant = v;
    return this;
  }

  size(s: NonNullable<Button['size']>): this {
    this.config.size = s;
    return this;
  }

  build(): Button {
    if (!this.config.label) throw new Error('Label is required');
    return { ...this.config } as Button;
  }
}

const btn = new ButtonBuilder()
  .label('Submit')
  .variant('primary')
  .size('lg')
  .onClick(() => console.log('clicked'))
  .build();`,
      hints: [
        'Required fields should be validated in build().',
        'Use NonNullable on optional property types for setter parameters.',
        'Return this from every setter method.',
      ],
      concepts: ['builder for UI components', 'required vs optional fields', 'validation'],
    },
    {
      id: 'ts-builder-16',
      title: 'Write: async builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a builder with async steps. The build method returns a Promise. Include an async validate step.',
      skeleton: `// Write an async builder
`,
      solution: `interface DeployConfig {
  image: string;
  tag: string;
  replicas: number;
  validated: boolean;
}

class DeployBuilder {
  private config: Partial<DeployConfig> = {};

  image(name: string): this {
    this.config.image = name;
    return this;
  }

  tag(tag: string): this {
    this.config.tag = tag;
    return this;
  }

  replicas(n: number): this {
    this.config.replicas = n;
    return this;
  }

  async validate(): Promise<this> {
    // Simulate async validation
    await new Promise(resolve => setTimeout(resolve, 100));
    if (!this.config.image) throw new Error('Image required');
    this.config.validated = true;
    return this;
  }

  async build(): Promise<DeployConfig> {
    if (!this.config.validated) {
      await this.validate();
    }
    return { ...this.config } as DeployConfig;
  }
}

async function deploy() {
  const config = await new DeployBuilder()
    .image('myapp')
    .tag('v1.0')
    .replicas(3)
    .build();
}`,
      hints: [
        'Async methods return Promise<this> to allow chaining with await.',
        'The build method should be async and return Promise<Config>.',
        'Chain sync methods normally, but await async steps.',
      ],
      concepts: ['async builder steps', 'Promise', 'validation'],
    },
    {
      id: 'ts-builder-17',
      title: 'Predict: builder generic accumulation',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What properties does the built object type have? List them as "prop1, prop2".',
      skeleton: `class B<T = {}> {
  private d: any = {};
  a(v: string): B<T & { a: string }> { this.d.a = v; return this as any; }
  b(v: number): B<T & { b: number }> { this.d.b = v; return this as any; }
  c(v: boolean): B<T & { c: boolean }> { this.d.c = v; return this as any; }
  build(): T { return this.d; }
}

const result = new B().a("x").c(true).build();
// What properties does result have?`,
      solution: `a, c`,
      hints: [
        'Each method adds its property to the generic type.',
        'Only a() and c() were called, not b().',
        'The type is {} & { a: string } & { c: boolean }, so properties are a and c.',
      ],
      concepts: ['builder type inference', 'generic accumulation'],
    },
    {
      id: 'ts-builder-18',
      title: 'Write: immutable builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a builder that creates a new builder instance on each method call instead of mutating state. This allows branching from any point.',
      skeleton: `// Write an immutable builder
`,
      solution: `interface QueryConfig {
  table: string;
  fields: string[];
  conditions: string[];
  limit?: number;
}

class ImmutableQueryBuilder {
  private constructor(private readonly config: Partial<QueryConfig>) {}

  static create(): ImmutableQueryBuilder {
    return new ImmutableQueryBuilder({ fields: [], conditions: [] });
  }

  from(table: string): ImmutableQueryBuilder {
    return new ImmutableQueryBuilder({ ...this.config, table });
  }

  select(...fields: string[]): ImmutableQueryBuilder {
    return new ImmutableQueryBuilder({
      ...this.config,
      fields: [...(this.config.fields ?? []), ...fields],
    });
  }

  where(condition: string): ImmutableQueryBuilder {
    return new ImmutableQueryBuilder({
      ...this.config,
      conditions: [...(this.config.conditions ?? []), condition],
    });
  }

  limit(n: number): ImmutableQueryBuilder {
    return new ImmutableQueryBuilder({ ...this.config, limit: n });
  }

  build(): QueryConfig {
    if (!this.config.table) throw new Error('Table required');
    return { ...this.config } as QueryConfig;
  }
}

const base = ImmutableQueryBuilder.create().from("users").select("name", "email");
const admins = base.where("role = 'admin'").build();
const active = base.where("active = true").limit(10).build();`,
      hints: [
        'Each method returns a NEW instance with copied + updated state.',
        'Use a private constructor and a static create() factory.',
        'Spread the existing config and override the changed property.',
      ],
      concepts: ['immutable builder', 'functional patterns', 'branching builds'],
    },
    {
      id: 'ts-builder-19',
      title: 'Refactor: constructor overload to builder',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this class with many constructor parameters into a builder pattern.',
      skeleton: `class Email {
  constructor(
    public from: string,
    public to: string[],
    public subject: string,
    public body: string,
    public cc?: string[],
    public bcc?: string[],
    public replyTo?: string,
    public attachments?: { name: string; data: Buffer }[],
    public priority?: 'low' | 'normal' | 'high',
  ) {}
}

const email = new Email(
  "me@test.com",
  ["you@test.com"],
  "Hello",
  "Body text",
  undefined,
  undefined,
  "reply@test.com",
  undefined,
  "high"
);`,
      solution: `interface EmailConfig {
  from: string;
  to: string[];
  subject: string;
  body: string;
  cc: string[];
  bcc: string[];
  replyTo?: string;
  attachments: { name: string; data: Buffer }[];
  priority: 'low' | 'normal' | 'high';
}

class EmailBuilder {
  private config: Partial<EmailConfig> = {
    to: [],
    cc: [],
    bcc: [],
    attachments: [],
    priority: 'normal',
  };

  from(addr: string): this { this.config.from = addr; return this; }
  to(...addrs: string[]): this { this.config.to!.push(...addrs); return this; }
  subject(s: string): this { this.config.subject = s; return this; }
  body(b: string): this { this.config.body = b; return this; }
  cc(...addrs: string[]): this { this.config.cc!.push(...addrs); return this; }
  bcc(...addrs: string[]): this { this.config.bcc!.push(...addrs); return this; }
  replyTo(addr: string): this { this.config.replyTo = addr; return this; }
  attach(name: string, data: Buffer): this {
    this.config.attachments!.push({ name, data });
    return this;
  }
  priority(p: EmailConfig['priority']): this { this.config.priority = p; return this; }

  build(): EmailConfig {
    if (!this.config.from) throw new Error('From is required');
    if (!this.config.to?.length) throw new Error('At least one recipient required');
    if (!this.config.subject) throw new Error('Subject is required');
    if (!this.config.body) throw new Error('Body is required');
    return { ...this.config } as EmailConfig;
  }
}

const email = new EmailBuilder()
  .from("me@test.com")
  .to("you@test.com")
  .subject("Hello")
  .body("Body text")
  .replyTo("reply@test.com")
  .priority("high")
  .build();`,
      hints: [
        'Replace the constructor with named methods for each parameter.',
        'Use defaults for optional fields in the initial config.',
        'Validate required fields in build().',
      ],
      concepts: ['refactoring', 'builder pattern', 'constructor anti-pattern'],
    },
    {
      id: 'ts-builder-20',
      title: 'Refactor: ad-hoc object creation to builder',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this scattered middleware pipeline configuration into a clean, type-safe pipeline builder.',
      skeleton: `// Current: ad-hoc object creation
const pipeline: any = {
  middleware: [],
  errorHandler: null,
  timeout: 5000,
};

pipeline.middleware.push((req: any, next: any) => { /* auth */ next(); });
pipeline.middleware.push((req: any, next: any) => { /* logging */ next(); });
pipeline.errorHandler = (err: any) => console.error(err);
pipeline.timeout = 10000;`,
      solution: `type Middleware = (req: Request, next: () => void) => void;
type ErrorHandler = (error: Error) => void;

interface PipelineConfig {
  middleware: Middleware[];
  errorHandler: ErrorHandler | null;
  timeout: number;
}

class PipelineBuilder {
  private config: PipelineConfig = {
    middleware: [],
    errorHandler: null,
    timeout: 5000,
  };

  use(mw: Middleware): this {
    this.config.middleware.push(mw);
    return this;
  }

  onError(handler: ErrorHandler): this {
    this.config.errorHandler = handler;
    return this;
  }

  timeout(ms: number): this {
    this.config.timeout = ms;
    return this;
  }

  build(): Readonly<PipelineConfig> {
    return {
      middleware: [...this.config.middleware],
      errorHandler: this.config.errorHandler,
      timeout: this.config.timeout,
    };
  }
}

const pipeline = new PipelineBuilder()
  .use((req, next) => { /* auth */ next(); })
  .use((req, next) => { /* logging */ next(); })
  .onError((err) => console.error(err))
  .timeout(10000)
  .build();`,
      hints: [
        'Replace the any-typed object with a proper interface.',
        'Create a builder class with typed methods for each configuration step.',
        'Return Readonly from build() to prevent mutation of the result.',
      ],
      concepts: ['practical builder implementations', 'type safety', 'refactoring'],
    },
  ],
};
