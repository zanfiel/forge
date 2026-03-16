import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-capstone',
  title: '50. Capstone Projects',
  explanation: `## Capstone Projects

This final section brings together everything you have learned across the entire TypeScript track. Each exercise is a mini-project that combines multiple concepts: generics, conditional types, mapped types, discriminated unions, design patterns, and more.

### What Makes These Different
- Each exercise is a self-contained project.
- You will combine 3-5 major concepts per exercise.
- Solutions require architectural thinking, not just syntax.
- These are the kinds of problems you will solve in real-world TypeScript codebases.

### Approach
1. Read the goal carefully.
2. Think about which types and patterns apply.
3. Start with the type definitions, then write the runtime code.
4. Use the hints if you get stuck -- they guide your architecture.

### Concepts You Will Use
- Generics & constraints
- Conditional types & infer
- Mapped types & template literals
- Discriminated unions & type narrowing
- Builder, Observer, and State Machine patterns
- Utility types & recursive types
- Variance & type safety
`,
  exercises: [
    {
      id: 'ts-capstone-1',
      title: 'Type-safe ORM query builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a type-safe query builder that knows which table columns are valid. Support select, where, orderBy, and limit. Column names should be auto-completed.',
      skeleton: `// Build a type-safe ORM query builder
`,
      solution: `interface Schema {
  users: { id: number; name: string; email: string; age: number };
  posts: { id: number; title: string; body: string; authorId: number };
  comments: { id: number; postId: number; text: string; userId: number };
}

type Column<T extends keyof Schema> = keyof Schema[T] & string;
type WhereClause<T extends keyof Schema> = Partial<Schema[T]>;

class QueryBuilder<T extends keyof Schema> {
  private table: T;
  private selectedFields: Column<T>[] = [];
  private conditions: WhereClause<T>[] = [];
  private orderField?: Column<T>;
  private orderDir: 'ASC' | 'DESC' = 'ASC';
  private limitCount?: number;

  constructor(table: T) {
    this.table = table;
  }

  select(...fields: Column<T>[]): this {
    this.selectedFields = fields;
    return this;
  }

  where(condition: WhereClause<T>): this {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: Column<T>, dir: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderField = field;
    this.orderDir = dir;
    return this;
  }

  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  toSQL(): string {
    const fields = this.selectedFields.length > 0
      ? this.selectedFields.join(', ')
      : '*';
    let sql = \\\`SELECT \${fields} FROM \${String(this.table)}\\\`;
    if (this.conditions.length > 0) {
      const clauses = this.conditions.map(c =>
        Object.entries(c).map(([k, v]) => \\\`\${k} = '\${v}'\\\`).join(' AND ')
      );
      sql += \\\` WHERE \${clauses.join(' AND ')}\\\`;
    }
    if (this.orderField) sql += \\\` ORDER BY \${this.orderField} \${this.orderDir}\\\`;
    if (this.limitCount) sql += \\\` LIMIT \${this.limitCount}\\\`;
    return sql;
  }
}

function from<T extends keyof Schema>(table: T): QueryBuilder<T> {
  return new QueryBuilder(table);
}

const query = from('users')
  .select('name', 'email')
  .where({ age: 30 })
  .orderBy('name', 'DESC')
  .limit(10)
  .toSQL();`,
      hints: [
        'Define a Schema type mapping table names to row types.',
        'The QueryBuilder is generic over T extends keyof Schema.',
        'Column<T> = keyof Schema[T] ensures only valid columns are accepted.',
      ],
      concepts: ['generics', 'mapped types', 'builder pattern', 'type-safe queries'],
    },
    {
      id: 'ts-capstone-2',
      title: 'Dependency injection container',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a type-safe dependency injection container. Register factories with token keys and resolve dependencies with full type inference.',
      skeleton: `// Build a type-safe DI container
`,
      solution: `class Container {
  private factories = new Map<string, () => any>();
  private singletons = new Map<string, any>();
  private types = new Map<string, 'transient' | 'singleton'>();

  register<T>(token: string, factory: () => T, lifecycle: 'transient' | 'singleton' = 'transient'): void {
    this.factories.set(token, factory);
    this.types.set(token, lifecycle);
  }

  resolve<T>(token: string): T {
    if (this.types.get(token) === 'singleton') {
      if (!this.singletons.has(token)) {
        this.singletons.set(token, this.factories.get(token)!());
      }
      return this.singletons.get(token);
    }
    const factory = this.factories.get(token);
    if (!factory) throw new Error(\\\`No factory registered for \${token}\\\`);
    return factory() as T;
  }
}

// Typed token approach
interface ServiceMap {
  logger: { log(msg: string): void };
  db: { query(sql: string): Promise<any[]> };
  cache: { get(key: string): string | null; set(key: string, value: string): void };
}

class TypedContainer<M extends Record<string, any>> {
  private factories = new Map<keyof M, () => any>();
  private instances = new Map<keyof M, any>();
  private lifecycles = new Map<keyof M, 'transient' | 'singleton'>();

  register<K extends keyof M>(
    token: K,
    factory: () => M[K],
    lifecycle: 'transient' | 'singleton' = 'transient'
  ): void {
    this.factories.set(token, factory);
    this.lifecycles.set(token, lifecycle);
  }

  resolve<K extends keyof M>(token: K): M[K] {
    if (this.lifecycles.get(token) === 'singleton') {
      if (!this.instances.has(token)) {
        this.instances.set(token, this.factories.get(token)!());
      }
      return this.instances.get(token);
    }
    return this.factories.get(token)!();
  }
}

const container = new TypedContainer<ServiceMap>();
container.register('logger', () => ({ log: (msg: string) => console.log(msg) }), 'singleton');
container.register('db', () => ({ query: async (sql: string) => [] }));
const logger = container.resolve('logger'); // Typed as { log(msg: string): void }`,
      hints: [
        'Use a service map interface to define token-to-type mappings.',
        'The container is generic over the service map.',
        'resolve() return type is M[K] based on the token key.',
      ],
      concepts: ['generics', 'dependency injection', 'factory pattern', 'singleton'],
    },
    {
      id: 'ts-capstone-3',
      title: 'Type-safe router',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a type-safe router that extracts params from route patterns like "/users/:id". Route handlers should receive correctly typed params.',
      skeleton: `// Build a type-safe router
`,
      solution: `type ExtractParams<T extends string> =
  T extends \\\`\${string}:\${infer Param}/\${infer Rest}\\\`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends \\\`\${string}:\${infer Param}\\\`
      ? { [K in Param]: string }
      : {};

type RouteHandler<T extends string> = (params: ExtractParams<T>) => void;

class Router {
  private routes: { pattern: string; handler: Function }[] = [];

  route<T extends string>(pattern: T, handler: RouteHandler<T>): void {
    this.routes.push({ pattern, handler });
  }

  match(path: string): void {
    for (const route of this.routes) {
      const params = this.extractParams(route.pattern, path);
      if (params) {
        route.handler(params);
        return;
      }
    }
    console.log('404: No matching route');
  }

  private extractParams(pattern: string, path: string): Record<string, string> | null {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');
    if (patternParts.length !== pathParts.length) return null;

    const params: Record<string, string> = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return params;
  }
}

const router = new Router();
router.route('/users/:id', (params) => {
  console.log(params.id); // Typed!
});
router.route('/posts/:postId/comments/:commentId', (params) => {
  console.log(params.postId, params.commentId); // Both typed!
});
router.match('/users/42');`,
      hints: [
        'Use template literal types with infer to extract param names.',
        'Recursively parse the route pattern to build a params object type.',
        'The handler receives ExtractParams<T> where T is the route pattern literal.',
      ],
      concepts: ['template literal types', 'infer', 'recursive types', 'router pattern'],
    },
    {
      id: 'ts-capstone-4',
      title: 'Reactive store (Svelte-like)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a reactive store system with writable, readable, and derived stores. Derived stores automatically recompute when their dependencies change.',
      skeleton: `// Build the reactive store system
`,
      solution: `type Subscriber<T> = (value: T) => void;
type Unsubscribe = () => void;
type Updater<T> = (value: T) => T;

interface Readable<T> {
  subscribe(subscriber: Subscriber<T>): Unsubscribe;
  get(): T;
}

interface Writable<T> extends Readable<T> {
  set(value: T): void;
  update(updater: Updater<T>): void;
}

function writable<T>(initial: T): Writable<T> {
  let value = initial;
  const subs = new Set<Subscriber<T>>();

  function notify() {
    subs.forEach(fn => fn(value));
  }

  return {
    subscribe(sub: Subscriber<T>): Unsubscribe {
      subs.add(sub);
      sub(value);
      return () => subs.delete(sub);
    },
    set(newValue: T) {
      value = newValue;
      notify();
    },
    update(updater: Updater<T>) {
      value = updater(value);
      notify();
    },
    get() { return value; },
  };
}

function derived<T, D extends Readable<any>[]>(
  deps: [...D],
  fn: (...values: { [K in keyof D]: D[K] extends Readable<infer U> ? U : never }) => T
): Readable<T> {
  const getValues = () => deps.map(d => d.get()) as any;
  let value = fn(...getValues());
  const subs = new Set<Subscriber<T>>();
  const unsubs: Unsubscribe[] = [];

  for (const dep of deps) {
    unsubs.push(dep.subscribe(() => {
      const newValue = fn(...getValues());
      if (newValue !== value) {
        value = newValue;
        subs.forEach(sub => sub(value));
      }
    }));
  }

  return {
    subscribe(sub: Subscriber<T>): Unsubscribe {
      subs.add(sub);
      sub(value);
      return () => subs.delete(sub);
    },
    get() { return value; },
  };
}

const count = writable(0);
const doubled = derived([count], (c) => c * 2);
doubled.subscribe((v) => console.log('Doubled:', v)); // "Doubled: 0"
count.set(5); // "Doubled: 10"`,
      hints: [
        'writable() returns an object with subscribe, set, update, and get.',
        'derived() subscribes to all dependencies and recomputes on changes.',
        'Use mapped tuple types to infer dependency value types.',
      ],
      concepts: ['observer pattern', 'reactive programming', 'generics', 'infer'],
    },
    {
      id: 'ts-capstone-5',
      title: 'JSON schema validator type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a type-level JSON schema validator. Define schemas as objects and infer the TypeScript type from the schema definition.',
      skeleton: `// Build a type-safe schema validator
`,
      solution: `type SchemaType =
  | { type: 'string' }
  | { type: 'number' }
  | { type: 'boolean' }
  | { type: 'object'; properties: Record<string, SchemaType> }
  | { type: 'array'; items: SchemaType };

type Infer<S extends SchemaType> =
  S extends { type: 'string' } ? string :
  S extends { type: 'number' } ? number :
  S extends { type: 'boolean' } ? boolean :
  S extends { type: 'array'; items: infer I extends SchemaType } ? Infer<I>[] :
  S extends { type: 'object'; properties: infer P extends Record<string, SchemaType> }
    ? { [K in keyof P]: Infer<P[K]> }
    : never;

function defineSchema<S extends SchemaType>(schema: S): S { return schema; }

function validate<S extends SchemaType>(schema: S, data: unknown): data is Infer<S> {
  if (schema.type === 'string') return typeof data === 'string';
  if (schema.type === 'number') return typeof data === 'number';
  if (schema.type === 'boolean') return typeof data === 'boolean';
  if (schema.type === 'array') {
    return Array.isArray(data) && data.every(item => validate(schema.items, item));
  }
  if (schema.type === 'object') {
    if (typeof data !== 'object' || data === null) return false;
    return Object.entries(schema.properties).every(([key, subSchema]) =>
      validate(subSchema as SchemaType, (data as any)[key])
    );
  }
  return false;
}

const userSchema = defineSchema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
    tags: { type: 'array', items: { type: 'string' } },
  },
});

type User = Infer<typeof userSchema>;
// { name: string; age: number; tags: string[] }`,
      hints: [
        'Define a SchemaType union for each possible JSON type.',
        'Use a recursive Infer<S> type to map schemas to TypeScript types.',
        'The validate function is a type predicate: data is Infer<S>.',
      ],
      concepts: ['conditional types', 'infer', 'recursive types', 'type predicates'],
    },
    {
      id: 'ts-capstone-6',
      title: 'Type-safe API client',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build an API client where endpoints, methods, request bodies, and response types are all defined in a single type map.',
      skeleton: `// Build a type-safe API client
`,
      solution: `interface ApiEndpoints {
  'GET /users': { response: { id: number; name: string }[] };
  'GET /users/:id': { params: { id: string }; response: { id: number; name: string } };
  'POST /users': { body: { name: string; email: string }; response: { id: number } };
  'PUT /users/:id': { params: { id: string }; body: { name: string }; response: { id: number } };
  'DELETE /users/:id': { params: { id: string }; response: void };
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type EndpointConfig = {
  params?: Record<string, string>;
  body?: unknown;
  response: unknown;
};

type ExtractMethod<E extends string> = E extends \\\`\${infer M} \${string}\\\` ? M : never;
type ExtractPath<E extends string> = E extends \\\`\${string} \${infer P}\\\` ? P : never;

class ApiClient<E extends Record<string, EndpointConfig>> {
  constructor(private baseUrl: string) {}

  async request<K extends keyof E & string>(
    endpoint: K,
    ...args: E[K] extends { params: any; body: any }
      ? [params: E[K]['params'], body: E[K]['body']]
      : E[K] extends { params: any }
        ? [params: E[K]['params']]
        : E[K] extends { body: any }
          ? [body: E[K]['body']]
          : []
  ): Promise<E[K]['response']> {
    const method = endpoint.split(' ')[0];
    let path = endpoint.split(' ')[1];

    if (args.length > 0 && typeof args[0] === 'object') {
      const params = args[0] as Record<string, string>;
      for (const [key, value] of Object.entries(params)) {
        path = path.replace(\\\`:\${key}\\\`, value);
      }
    }

    const response = await fetch(this.baseUrl + path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: args.length > 1 ? JSON.stringify(args[1]) : undefined,
    });

    return response.json();
  }
}

const api = new ApiClient<ApiEndpoints>('https://api.example.com');
// Fully typed:
const users = api.request('GET /users');
const user = api.request('GET /users/:id', { id: '42' });
const created = api.request('POST /users', { name: 'Zan', email: 'zan@test.com' });`,
      hints: [
        'Define endpoints as template literal keys like "GET /path".',
        'Each endpoint maps to its params, body, and response types.',
        'Use conditional types to determine which arguments are needed.',
      ],
      concepts: ['template literal types', 'conditional types', 'generics', 'API patterns'],
    },
    {
      id: 'ts-capstone-7',
      title: 'Middleware pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a type-safe middleware pipeline where each middleware can transform the context. The output type of one middleware feeds into the input of the next.',
      skeleton: `// Build a type-safe middleware pipeline
`,
      solution: `type Middleware<In, Out> = (ctx: In, next: (ctx: Out) => void) => void;

class Pipeline<T> {
  private middlewares: Middleware<any, any>[] = [];

  use<Out>(middleware: Middleware<T, Out>): Pipeline<Out> {
    this.middlewares.push(middleware);
    return this as any;
  }

  execute(initialCtx: T, final: (ctx: any) => void): void {
    const run = (index: number, ctx: any) => {
      if (index >= this.middlewares.length) {
        final(ctx);
        return;
      }
      this.middlewares[index](ctx, (nextCtx) => run(index + 1, nextCtx));
    };
    run(0, initialCtx);
  }
}

// Usage
interface BaseCtx { method: string; path: string; }
interface AuthCtx extends BaseCtx { userId: string; }
interface ParsedCtx extends AuthCtx { body: unknown; }

const pipeline = new Pipeline<BaseCtx>()
  .use<AuthCtx>((ctx, next) => {
    next({ ...ctx, userId: 'zan-123' });
  })
  .use<ParsedCtx>((ctx, next) => {
    next({ ...ctx, body: { parsed: true } });
  });

pipeline.execute(
  { method: 'GET', path: '/api/users' },
  (ctx) => console.log(ctx) // ctx is ParsedCtx
);`,
      hints: [
        'Each middleware transforms context from type In to type Out.',
        'Pipeline.use() returns a new Pipeline typed with the middleware output.',
        'execute() chains middlewares, passing context through each one.',
      ],
      concepts: ['generics', 'builder pattern', 'middleware pattern', 'type chaining'],
    },
    {
      id: 'ts-capstone-8',
      title: 'Type-safe config loader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a config loader that validates environment variables against a schema and returns a fully typed config object. Missing required variables should be caught at runtime.',
      skeleton: `// Build the type-safe config loader
`,
      solution: `type ConfigSchemaEntry =
  | { type: 'string'; required?: boolean; default?: string }
  | { type: 'number'; required?: boolean; default?: number }
  | { type: 'boolean'; required?: boolean; default?: boolean };

type ConfigSchema = Record<string, ConfigSchemaEntry>;

type InferConfig<S extends ConfigSchema> = {
  [K in keyof S]: S[K]['type'] extends 'string'
    ? string
    : S[K]['type'] extends 'number'
      ? number
      : S[K]['type'] extends 'boolean'
        ? boolean
        : never;
};

function loadConfig<S extends ConfigSchema>(
  schema: S,
  env: Record<string, string | undefined> = process.env
): InferConfig<S> {
  const config: Record<string, any> = {};

  for (const [key, entry] of Object.entries(schema)) {
    const raw = env[key];

    if (raw === undefined || raw === '') {
      if (entry.default !== undefined) {
        config[key] = entry.default;
        continue;
      }
      if (entry.required !== false) {
        throw new Error(\\\`Missing required config: \${key}\\\`);
      }
    }

    switch (entry.type) {
      case 'string':
        config[key] = raw ?? entry.default ?? '';
        break;
      case 'number': {
        const num = Number(raw);
        if (isNaN(num)) throw new Error(\\\`Config \${key} must be a number, got: \${raw}\\\`);
        config[key] = num;
        break;
      }
      case 'boolean':
        config[key] = raw === 'true' || raw === '1';
        break;
    }
  }

  return config as InferConfig<S>;
}

const config = loadConfig({
  DATABASE_URL: { type: 'string', required: true },
  PORT: { type: 'number', default: 3000 },
  DEBUG: { type: 'boolean', default: false },
  NODE_ENV: { type: 'string', default: 'development' },
});

// config.DATABASE_URL is string
// config.PORT is number
// config.DEBUG is boolean`,
      hints: [
        'Define a schema with type discriminants for each config entry.',
        'Use a conditional type to map schema types to TypeScript types.',
        'Validate and coerce at runtime, infer types at compile time.',
      ],
      concepts: ['conditional types', 'type inference', 'runtime validation', 'config patterns'],
    },
    {
      id: 'ts-capstone-9',
      title: 'Type-safe CLI parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a CLI argument parser where flags, their types, and whether they are required are all defined in a schema. The parsed result is fully typed.',
      skeleton: `// Build the type-safe CLI parser
`,
      solution: `interface FlagDef {
  type: 'string' | 'number' | 'boolean';
  short?: string;
  description: string;
  required?: boolean;
  default?: string | number | boolean;
}

type FlagSchema = Record<string, FlagDef>;

type InferFlags<S extends FlagSchema> = {
  [K in keyof S]: S[K]['type'] extends 'string'
    ? string
    : S[K]['type'] extends 'number'
      ? number
      : boolean;
};

function parseCLI<S extends FlagSchema>(
  schema: S,
  argv: string[]
): InferFlags<S> {
  const result: Record<string, any> = {};

  // Set defaults
  for (const [name, def] of Object.entries(schema)) {
    if (def.default !== undefined) result[name] = def.default;
  }

  // Parse args
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const flagName = Object.entries(schema).find(
      ([name, def]) => arg === \\\`--\${name}\\\` || arg === \\\`-\${def.short}\\\`
    )?.[0];

    if (!flagName) continue;
    const def = schema[flagName];

    if (def.type === 'boolean') {
      result[flagName] = true;
    } else {
      const value = argv[++i];
      result[flagName] = def.type === 'number' ? Number(value) : value;
    }
  }

  // Check required
  for (const [name, def] of Object.entries(schema)) {
    if (def.required && result[name] === undefined) {
      throw new Error(\\\`Missing required flag: --\${name}\\\`);
    }
  }

  return result as InferFlags<S>;
}

const flags = parseCLI({
  port: { type: 'number', short: 'p', description: 'Port number', default: 3000 },
  host: { type: 'string', short: 'h', description: 'Host address', default: 'localhost' },
  verbose: { type: 'boolean', short: 'v', description: 'Verbose output', default: false },
  config: { type: 'string', short: 'c', description: 'Config file', required: true },
}, ['--port', '8080', '-v', '--config', 'app.yaml']);

// flags.port: number, flags.host: string, flags.verbose: boolean, flags.config: string`,
      hints: [
        'Define a flag schema mapping flag names to their type and metadata.',
        'Use conditional types to infer the TypeScript type from the schema type field.',
        'Parse argv by matching --name or -short patterns.',
      ],
      concepts: ['conditional types', 'generics', 'CLI patterns', 'runtime parsing'],
    },
    {
      id: 'ts-capstone-10',
      title: 'Serialization framework',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a serialization/deserialization framework with type-safe codecs. Each codec knows how to encode and decode a specific type.',
      skeleton: `// Build the serialization framework
`,
      solution: `interface Codec<T> {
  encode(value: T): string;
  decode(raw: string): T;
}

const StringCodec: Codec<string> = {
  encode: (v) => v,
  decode: (r) => r,
};

const NumberCodec: Codec<number> = {
  encode: (v) => String(v),
  decode: (r) => { const n = Number(r); if (isNaN(n)) throw new Error('Invalid number'); return n; },
};

const BooleanCodec: Codec<boolean> = {
  encode: (v) => v ? 'true' : 'false',
  decode: (r) => r === 'true',
};

function ArrayCodec<T>(itemCodec: Codec<T>): Codec<T[]> {
  return {
    encode: (arr) => JSON.stringify(arr.map(v => itemCodec.encode(v))),
    decode: (raw) => (JSON.parse(raw) as string[]).map(v => itemCodec.decode(v)),
  };
}

type SchemaCodecs = Record<string, Codec<any>>;

type InferSchema<S extends SchemaCodecs> = {
  [K in keyof S]: S[K] extends Codec<infer T> ? T : never;
};

function createSerializer<S extends SchemaCodecs>(schema: S) {
  return {
    serialize(obj: InferSchema<S>): Record<string, string> {
      const result: Record<string, string> = {};
      for (const key of Object.keys(schema)) {
        result[key] = schema[key].encode((obj as any)[key]);
      }
      return result;
    },
    deserialize(data: Record<string, string>): InferSchema<S> {
      const result: Record<string, any> = {};
      for (const key of Object.keys(schema)) {
        result[key] = schema[key].decode(data[key]);
      }
      return result as InferSchema<S>;
    },
  };
}

const userSerializer = createSerializer({
  name: StringCodec,
  age: NumberCodec,
  active: BooleanCodec,
  tags: ArrayCodec(StringCodec),
});

const encoded = userSerializer.serialize({ name: 'Zan', age: 30, active: true, tags: ['ts', 'dev'] });
const decoded = userSerializer.deserialize(encoded);
// decoded: { name: string; age: number; active: boolean; tags: string[] }`,
      hints: [
        'Define a Codec<T> interface with encode and decode methods.',
        'Use infer to extract T from Codec<T> when building the schema type.',
        'createSerializer() takes a record of codecs and returns typed serialize/deserialize.',
      ],
      concepts: ['generics', 'infer', 'codec pattern', 'type-safe serialization'],
    },
    {
      id: 'ts-capstone-11',
      title: 'Task queue with typed results',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a typed task queue that processes tasks concurrently with a concurrency limit. Each task has a typed result. Include error handling and status tracking.',
      skeleton: `// Build the typed task queue
`,
      solution: `type TaskStatus = 'pending' | 'running' | 'completed' | 'failed';

interface TaskResult<T> {
  status: 'completed';
  data: T;
}

interface TaskError {
  status: 'failed';
  error: Error;
}

type TaskOutcome<T> = TaskResult<T> | TaskError;

class TaskQueue {
  private queue: { task: () => Promise<any>; resolve: Function; reject: Function }[] = [];
  private running = 0;

  constructor(private concurrency: number) {}

  async enqueue<T>(task: () => Promise<T>): Promise<TaskOutcome<T>> {
    return new Promise((resolve) => {
      this.queue.push({
        task,
        resolve: (data: T) => resolve({ status: 'completed', data }),
        reject: (error: Error) => resolve({ status: 'failed', error }),
      });
      this.processNext();
    });
  }

  private async processNext(): Promise<void> {
    if (this.running >= this.concurrency || this.queue.length === 0) return;

    const item = this.queue.shift()!;
    this.running++;

    try {
      const result = await item.task();
      item.resolve(result);
    } catch (err) {
      item.reject(err instanceof Error ? err : new Error(String(err)));
    } finally {
      this.running--;
      this.processNext();
    }
  }

  get pending(): number { return this.queue.length; }
  get active(): number { return this.running; }
}

const queue = new TaskQueue(3);

async function demo() {
  const results = await Promise.all([
    queue.enqueue(async () => { return 'task 1 done'; }),
    queue.enqueue(async () => { return 42; }),
    queue.enqueue(async () => { throw new Error('fail'); }),
  ]);

  for (const r of results) {
    if (r.status === 'completed') console.log('OK:', r.data);
    else console.log('FAIL:', r.error.message);
  }
}`,
      hints: [
        'Use a queue array and track running count against concurrency limit.',
        'enqueue() returns a Promise<TaskOutcome<T>> -- either completed or failed.',
        'processNext() dequeues and runs tasks when slots are available.',
      ],
      concepts: ['generics', 'discriminated unions', 'async patterns', 'concurrency'],
    },
    {
      id: 'ts-capstone-12',
      title: 'Memoization library',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a type-safe memoization library that preserves the exact function signature. Support TTL expiration and cache size limits.',
      skeleton: `// Build the memoization library
`,
      solution: `interface MemoOptions {
  maxSize?: number;
  ttlMs?: number;
}

interface CacheEntry<T> {
  value: T;
  createdAt: number;
}

function memoize<F extends (...args: any[]) => any>(
  fn: F,
  options: MemoOptions = {}
): F {
  const { maxSize = 100, ttlMs } = options;
  const cache = new Map<string, CacheEntry<ReturnType<F>>>();

  const memoized = function (this: any, ...args: Parameters<F>): ReturnType<F> {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const entry = cache.get(key)!;
      if (!ttlMs || Date.now() - entry.createdAt < ttlMs) {
        return entry.value;
      }
      cache.delete(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, { value: result, createdAt: Date.now() });

    // Evict oldest entries if over max size
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) cache.delete(firstKey);
    }

    return result;
  } as F;

  (memoized as any).clear = () => cache.clear();
  (memoized as any).size = () => cache.size;

  return memoized;
}

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return memoFib(n - 1) + memoFib(n - 2);
}

const memoFib = memoize(fibonacci);
console.log(memoFib(40)); // Fast!

const fetchUser = memoize(
  async (id: string): Promise<{ name: string }> => {
    return { name: 'User ' + id };
  },
  { ttlMs: 60000, maxSize: 50 }
);`,
      hints: [
        'The memoized function must have the exact same type as the original.',
        'Use JSON.stringify(args) as the cache key.',
        'Check TTL on cache hits and evict old entries on size overflow.',
      ],
      concepts: ['generics', 'Parameters', 'ReturnType', 'caching patterns'],
    },
    {
      id: 'ts-capstone-13',
      title: 'Type-safe deep merge',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a type-safe deep merge function. The return type should accurately reflect the merged object, with properties from the second object overriding the first.',
      skeleton: `// Build the type-safe deep merge
`,
      solution: `type DeepMerge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? K extends keyof A
      ? A[K] extends object
        ? B[K] extends object
          ? DeepMerge<A[K], B[K]>
          : B[K]
        : B[K]
      : B[K]
    : K extends keyof A
      ? A[K]
      : never;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<A extends Record<string, any>, B extends Record<string, any>>(
  a: A,
  b: B
): DeepMerge<A, B> {
  const result: Record<string, any> = { ...a };

  for (const key of Object.keys(b)) {
    if (isObject(a[key]) && isObject(b[key])) {
      result[key] = deepMerge(a[key], b[key]);
    } else {
      result[key] = b[key];
    }
  }

  return result as DeepMerge<A, B>;
}

const defaults = {
  db: { host: 'localhost', port: 5432, pool: { min: 2, max: 10 } },
  cache: { enabled: true, ttl: 3600 },
};

const overrides = {
  db: { host: 'prod-server', pool: { max: 50 } },
  cache: { ttl: 7200 },
  logging: true,
};

const config = deepMerge(defaults, overrides);
// Type includes all properties from both, with correct override types`,
      hints: [
        'Define a recursive DeepMerge<A, B> type that handles nested objects.',
        'At runtime, check if both values are objects before recursing.',
        'Properties from B override A at each level.',
      ],
      concepts: ['recursive types', 'mapped types', 'conditional types', 'deep merge'],
    },
    {
      id: 'ts-capstone-14',
      title: 'Type-safe deep diff',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a function that computes the deep diff between two objects of the same type, returning only changed values with their old and new values.',
      skeleton: `// Build the type-safe deep diff
`,
      solution: `type DiffEntry<T> = {
  old: T;
  new: T;
};

type DeepDiff<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepDiff<T[K]>
    : DiffEntry<T[K]>;
};

function isObject(v: unknown): v is Record<string, any> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function deepDiff<T extends Record<string, any>>(
  oldObj: T,
  newObj: T
): DeepDiff<T> {
  const diff: Record<string, any> = {};

  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const key of allKeys) {
    const oldVal = oldObj[key];
    const newVal = newObj[key];

    if (isObject(oldVal) && isObject(newVal)) {
      const nested = deepDiff(oldVal, newVal);
      if (Object.keys(nested).length > 0) {
        diff[key] = nested;
      }
    } else if (oldVal !== newVal) {
      diff[key] = { old: oldVal, new: newVal };
    }
  }

  return diff as DeepDiff<T>;
}

const before = {
  name: 'Zan',
  settings: { theme: 'dark', fontSize: 14 },
  active: true,
};

const after = {
  name: 'Zan',
  settings: { theme: 'light', fontSize: 14 },
  active: false,
};

const changes = deepDiff(before, after);
// { settings: { theme: { old: 'dark', new: 'light' } }, active: { old: true, new: false } }`,
      hints: [
        'Define DiffEntry<T> to hold old and new values.',
        'Use a recursive DeepDiff<T> type for nested objects.',
        'Only include keys where values actually differ.',
      ],
      concepts: ['recursive types', 'generics', 'object comparison', 'diff algorithms'],
    },
    {
      id: 'ts-capstone-15',
      title: 'Type-safe path accessor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build get() and set() functions that access nested object properties via dot-separated string paths with full type safety.',
      skeleton: `// Build type-safe path get and set functions
`,
      solution: `type PathValue<T, P extends string> =
  P extends \\\`\${infer Key}.\${infer Rest}\\\`
    ? Key extends keyof T
      ? PathValue<T[Key], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;

function get<T extends Record<string, any>, P extends string>(
  obj: T,
  path: P
): PathValue<T, P> {
  const keys = path.split('.');
  let current: any = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined as any;
    current = current[key];
  }
  return current;
}

function set<T extends Record<string, any>, P extends string>(
  obj: T,
  path: P,
  value: PathValue<T, P>
): T {
  const keys = path.split('.');
  const result = { ...obj };
  let current: any = result;

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

const data = {
  user: {
    profile: { name: 'Zan', age: 30 },
    settings: { theme: 'dark' as const },
  },
};

const name = get(data, 'user.profile.name'); // string
const theme = get(data, 'user.settings.theme'); // 'dark'
const updated = set(data, 'user.profile.name', 'NewName');`,
      hints: [
        'PathValue<T, P> recursively splits the path and indexes into T.',
        'get() walks the object at runtime using split path keys.',
        'set() creates shallow copies at each level for immutability.',
      ],
      concepts: ['template literal types', 'infer', 'recursive types', 'path access'],
    },
    {
      id: 'ts-capstone-16',
      title: 'Type-safe event system',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a complete type-safe event system with namespaced events (like "user:login"), wildcard listeners ("user:*"), and typed payloads.',
      skeleton: `// Build the type-safe event system
`,
      solution: `type EventMap = Record<string, any>;

type WildcardMatch<Pattern extends string, Event extends string> =
  Pattern extends \\\`\${infer NS}:*\\\`
    ? Event extends \\\`\${NS}:\${string}\\\`
      ? true
      : false
    : Pattern extends Event
      ? true
      : false;

class TypedEvents<E extends EventMap> {
  private handlers = new Map<string, Set<(data: any) => void>>();
  private wildcardHandlers = new Map<string, Set<(event: string, data: any) => void>>();

  on<K extends keyof E & string>(event: K, handler: (data: E[K]) => void): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.handlers.get(event)?.delete(handler);
  }

  onWildcard(pattern: string, handler: (event: string, data: any) => void): () => void {
    if (!this.wildcardHandlers.has(pattern)) this.wildcardHandlers.set(pattern, new Set());
    this.wildcardHandlers.get(pattern)!.add(handler);
    return () => this.wildcardHandlers.get(pattern)?.delete(handler);
  }

  emit<K extends keyof E & string>(event: K, data: E[K]): void {
    this.handlers.get(event)?.forEach(fn => fn(data));

    for (const [pattern, handlers] of this.wildcardHandlers) {
      const ns = pattern.replace(':*', '');
      if (event.startsWith(ns + ':')) {
        handlers.forEach(fn => fn(event, data));
      }
    }
  }
}

interface AppEvents {
  'user:login': { userId: string; timestamp: number };
  'user:logout': { userId: string };
  'user:update': { userId: string; changes: Record<string, any> };
  'system:error': { message: string; stack?: string };
  'system:ready': undefined;
}

const events = new TypedEvents<AppEvents>();
events.on('user:login', (data) => console.log(data.userId));
events.onWildcard('user:*', (event, data) => console.log('User event:', event));
events.emit('user:login', { userId: 'zan', timestamp: Date.now() });`,
      hints: [
        'Use namespaced event names like "user:login".',
        'Wildcard listeners match on the namespace prefix.',
        'Type-safe on() uses keyof E, wildcard matching is runtime-checked.',
      ],
      concepts: ['typed event map', 'wildcard patterns', 'observer pattern'],
    },
    {
      id: 'ts-capstone-17',
      title: 'Type-safe state machine',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a type-safe state machine where valid transitions are enforced at the type level. Invalid transitions should be compile-time errors.',
      skeleton: `// Build the type-safe state machine
`,
      solution: `type MachineDefinition = {
  initial: string;
  states: Record<string, { on: Record<string, string> }>;
};

type ValidTransition<
  D extends MachineDefinition,
  S extends keyof D['states'],
  E extends string
> = E extends keyof D['states'][S]['on'] ? D['states'][S]['on'][E] : never;

class StateMachine<D extends MachineDefinition, Current extends keyof D['states'] = D['initial'] & keyof D['states']> {
  constructor(
    private definition: D,
    private _state: Current
  ) {}

  get state(): Current { return this._state; }

  send<E extends keyof D['states'][Current]['on'] & string>(
    event: E
  ): StateMachine<D, D['states'][Current]['on'][E] & keyof D['states']> {
    const nextState = this.definition.states[this._state as string].on[event];
    return new StateMachine(this.definition, nextState as any);
  }
}

function createMachine<D extends MachineDefinition>(definition: D): StateMachine<D> {
  return new StateMachine(definition, definition.initial as any);
}

const definition = {
  initial: 'idle' as const,
  states: {
    idle: { on: { FETCH: 'loading' as const } },
    loading: { on: { SUCCESS: 'success' as const, FAIL: 'error' as const } },
    success: { on: { RESET: 'idle' as const } },
    error: { on: { RETRY: 'loading' as const, RESET: 'idle' as const } },
  },
} as const;

const machine = createMachine(definition);
const loading = machine.send('FETCH');      // StateMachine<..., 'loading'>
const success = loading.send('SUCCESS');     // StateMachine<..., 'success'>
// machine.send('SUCCESS');                  // Error: 'SUCCESS' not valid in 'idle'`,
      hints: [
        'Track the current state as a generic parameter.',
        'send() is constrained to only accept valid events for the current state.',
        'Use as const for the definition to preserve literal types.',
      ],
      concepts: ['state machine pattern', 'phantom types', 'const assertions', 'type-level enforcement'],
    },
    {
      id: 'ts-capstone-18',
      title: 'Type-safe pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a pipe() function that chains functions where the output of each feeds into the next. The final return type is inferred from the chain.',
      skeleton: `// Build the type-safe pipeline
`,
      solution: `function pipe<A, B>(fn1: (a: A) => B): (a: A) => B;
function pipe<A, B, C>(fn1: (a: A) => B, fn2: (b: B) => C): (a: A) => C;
function pipe<A, B, C, D>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D): (a: A) => D;
function pipe<A, B, C, D, E>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D, fn4: (d: D) => E): (a: A) => E;
function pipe(...fns: ((arg: any) => any)[]): (arg: any) => any {
  return (input) => fns.reduce((acc, fn) => fn(acc), input);
}

// Alternative: class-based builder for unlimited chaining
class Pipeline<In, Out> {
  constructor(private readonly fns: ((arg: any) => any)[]) {}

  static of<T>(): Pipeline<T, T> {
    return new Pipeline([]);
  }

  then<Next>(fn: (value: Out) => Next): Pipeline<In, Next> {
    return new Pipeline([...this.fns, fn]);
  }

  execute(input: In): Out {
    return this.fns.reduce((acc, fn) => fn(acc), input as any);
  }
}

// Using overloaded pipe:
const processUser = pipe(
  (name: string) => name.trim(),
  (name) => name.toLowerCase(),
  (name) => ({ name, slug: name.replace(/\\s+/g, '-') }),
);

const result = processUser('  Zan Fielack  ');
// { name: 'zan fielack', slug: 'zan-fielack' }

// Using class-based Pipeline:
const transform = Pipeline.of<number>()
  .then(n => n * 2)
  .then(n => String(n))
  .then(s => \\\`Result: \${s}\\\`)
  .execute(21);
// "Result: 42"`,
      hints: [
        'Use function overloads for the pipe() function up to N arguments.',
        'Each overload chains the output type to the next input type.',
        'Alternatively, use a class-based builder for unlimited chaining.',
      ],
      concepts: ['function overloads', 'type chaining', 'functional composition', 'builder pattern'],
    },
    {
      id: 'ts-capstone-19',
      title: 'Type-safe validator composition',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build composable validators that can be chained: string().minLength(3).email() returns a validator that narrows the type and reports errors.',
      skeleton: `// Build the validator composition system
`,
      solution: `type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

interface Validator<T> {
  validate(input: unknown): ValidationResult<T>;
  and<U>(other: Validator<U>): Validator<T & U>;
}

function createValidator<T>(
  check: (input: unknown) => ValidationResult<T>
): Validator<T> {
  return {
    validate: check,
    and<U>(other: Validator<U>): Validator<T & U> {
      return createValidator((input) => {
        const r1 = check(input);
        const r2 = other.validate(input);
        if (!r1.success || !r2.success) {
          return {
            success: false,
            errors: [
              ...(!r1.success ? r1.errors : []),
              ...(!r2.success ? r2.errors : []),
            ],
          };
        }
        return { success: true, data: { ...r1.data, ...r2.data } as T & U };
      });
    },
  };
}

function string() {
  const base = createValidator<string>((input) =>
    typeof input === 'string'
      ? { success: true, data: input }
      : { success: false, errors: ['Expected string'] }
  );

  return Object.assign(base, {
    minLength(n: number) {
      return createValidator<string>((input) => {
        const r = base.validate(input);
        if (!r.success) return r;
        return r.data.length >= n
          ? r
          : { success: false, errors: [\\\`Minimum length is \${n}\\\`] };
      });
    },
    email() {
      return createValidator<string>((input) => {
        const r = base.validate(input);
        if (!r.success) return r;
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(r.data)
          ? r
          : { success: false, errors: ['Invalid email format'] };
      });
    },
  });
}

function number() {
  return Object.assign(
    createValidator<number>((input) =>
      typeof input === 'number'
        ? { success: true, data: input }
        : { success: false, errors: ['Expected number'] }
    ),
    {
      min(n: number) {
        return createValidator<number>((input) =>
          typeof input === 'number' && input >= n
            ? { success: true, data: input }
            : { success: false, errors: [\\\`Must be >= \${n}\\\`] }
        );
      },
    }
  );
}

const emailValidator = string().email();
const r1 = emailValidator.validate('zan@test.com'); // success
const r2 = emailValidator.validate('invalid'); // errors`,
      hints: [
        'Each validator has a validate() method returning a discriminated union result.',
        'Composition uses .and() to merge validators.',
        'Builder methods like minLength() return new validators that chain checks.',
      ],
      concepts: ['discriminated unions', 'builder pattern', 'composition', 'type narrowing'],
    },
    {
      id: 'ts-capstone-20',
      title: 'Grand finale: full-stack type system',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a mini type-safe RPC system. Define procedures with input/output types. The client infers method signatures from the server definition. Combine generics, conditional types, mapped types, and infer.',
      skeleton: `// Build the type-safe RPC system
`,
      solution: `// Server-side: procedure definitions
interface ProcedureDef<I, O> {
  input: I;
  output: O;
  handler: (input: I) => Promise<O>;
}

function procedure<I, O>(
  handler: (input: I) => Promise<O>
): ProcedureDef<I, O> {
  return { handler } as any;
}

function createRouter<
  P extends Record<string, ProcedureDef<any, any>>
>(procedures: P) {
  return {
    procedures,
    async handle<K extends keyof P & string>(
      method: K,
      input: P[K]['input']
    ): Promise<P[K]['output']> {
      const proc = procedures[method];
      if (!proc) throw new Error(\\\`Unknown procedure: \${method}\\\`);
      return proc.handler(input);
    },
  };
}

// Client-side: infer types from router
type InferRouterInput<R, K extends string> =
  R extends { procedures: infer P }
    ? K extends keyof P
      ? P[K] extends ProcedureDef<infer I, any> ? I : never
      : never
    : never;

type InferRouterOutput<R, K extends string> =
  R extends { procedures: infer P }
    ? K extends keyof P
      ? P[K] extends ProcedureDef<any, infer O> ? O : never
      : never
    : never;

function createClient<R extends ReturnType<typeof createRouter>>(
  _router: R
) {
  return {
    async call<K extends keyof R['procedures'] & string>(
      method: K,
      input: R['procedures'][K] extends ProcedureDef<infer I, any> ? I : never
    ): Promise<R['procedures'][K] extends ProcedureDef<any, infer O> ? O : never> {
      // In real code, this would make an HTTP/WebSocket call
      return (_router as any).handle(method, input);
    },
  };
}

// Usage
const router = createRouter({
  getUser: procedure<{ id: string }, { name: string; email: string }>(
    async (input) => ({ name: 'Zan', email: 'zan@test.com' })
  ),
  createPost: procedure<{ title: string; body: string }, { id: number }>(
    async (input) => ({ id: 1 })
  ),
  listUsers: procedure<{ page: number }, { users: string[]; total: number }>(
    async (input) => ({ users: ['Zan'], total: 1 })
  ),
});

const client = createClient(router);

async function demo() {
  // Fully typed: input and output inferred from server definition
  const user = await client.call('getUser', { id: '42' });
  console.log(user.name, user.email);

  const post = await client.call('createPost', { title: 'Hello', body: 'World' });
  console.log(post.id);

  const list = await client.call('listUsers', { page: 1 });
  console.log(list.users, list.total);

  // client.call('getUser', { wrong: true }); // Type error!
  // client.call('unknown', {}); // Type error!
}`,
      hints: [
        'Define procedures with input/output type parameters.',
        'createRouter() takes a record of procedures and infers the full type.',
        'createClient() uses infer to extract input/output types from the router definition.',
      ],
      concepts: ['generics', 'infer', 'mapped types', 'conditional types', 'RPC pattern', 'full-stack types'],
    },
  ],
};
