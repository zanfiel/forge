import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-builder',
  title: '40. Builder Pattern',
  explanation: `## Builder Pattern

The builder pattern constructs complex objects step-by-step, providing a flexible and readable API.

### Basic Builder
\`\`\`rust
struct Server {
    host: String,
    port: u16,
    max_connections: u32,
}

struct ServerBuilder {
    host: String,
    port: u16,
    max_connections: u32,
}

impl ServerBuilder {
    fn new() -> Self {
        ServerBuilder {
            host: String::from("localhost"),
            port: 8080,
            max_connections: 100,
        }
    }

    fn host(mut self, host: &str) -> Self {
        self.host = host.to_string();
        self
    }

    fn port(mut self, port: u16) -> Self {
        self.port = port;
        self
    }

    fn build(self) -> Server {
        Server {
            host: self.host,
            port: self.port,
            max_connections: self.max_connections,
        }
    }
}
\`\`\`

### Usage
\`\`\`rust
let server = ServerBuilder::new()
    .host("0.0.0.0")
    .port(3000)
    .build();
\`\`\`

### Key Patterns
- **Method chaining**: each setter returns \`Self\`
- **Default values**: builder starts with sensible defaults
- **Validation**: \`build()\` can return \`Result\` for validation
- **Consuming vs borrowing**: \`mut self\` vs \`&mut self\` trade-offs
`,
  exercises: [
    {
      id: 'rs-builder-1',
      title: 'Builder Method Chaining',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the builder method so it returns self for chaining.',
      skeleton: `struct ConfigBuilder {
    debug: bool,
    verbose: bool,
}

impl ConfigBuilder {
    fn new() -> Self {
        ConfigBuilder { debug: false, verbose: false }
    }

    fn debug(mut self, val: bool) -> __BLANK__ {
        self.debug = val;
        self
    }
}`,
      solution: `struct ConfigBuilder {
    debug: bool,
    verbose: bool,
}

impl ConfigBuilder {
    fn new() -> Self {
        ConfigBuilder { debug: false, verbose: false }
    }

    fn debug(mut self, val: bool) -> Self {
        self.debug = val;
        self
    }
}`,
      hints: [
        'Builder methods return Self to enable chaining.',
        'Self refers to the type being implemented.',
        'fn debug(mut self, val: bool) -> Self'
      ],
      concepts: ['builder-pattern', 'method-chaining', 'self-return']
    },
    {
      id: 'rs-builder-2',
      title: 'Builder Default Values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the builder constructor with default values.',
      skeleton: `struct QueryBuilder {
    table: String,
    limit: usize,
    offset: usize,
}

impl QueryBuilder {
    fn new(table: &str) -> Self {
        QueryBuilder {
            table: table.to_string(),
            limit: __BLANK__,
            offset: 0,
        }
    }
}`,
      solution: `struct QueryBuilder {
    table: String,
    limit: usize,
    offset: usize,
}

impl QueryBuilder {
    fn new(table: &str) -> Self {
        QueryBuilder {
            table: table.to_string(),
            limit: 100,
            offset: 0,
        }
    }
}`,
      hints: [
        'Builders typically provide sensible default values.',
        'A reasonable default limit might be 100.',
        'Any positive number works as a default limit.'
      ],
      concepts: ['builder-pattern', 'default-values', 'constructor']
    },
    {
      id: 'rs-builder-3',
      title: 'Build Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the build method that creates the final struct.',
      skeleton: `struct Email {
    to: String,
    subject: String,
    body: String,
}

struct EmailBuilder {
    to: String,
    subject: String,
    body: String,
}

impl EmailBuilder {
    fn new() -> Self {
        EmailBuilder { to: String::new(), subject: String::new(), body: String::new() }
    }

    fn to(mut self, to: &str) -> Self { self.to = to.to_string(); self }
    fn subject(mut self, s: &str) -> Self { self.subject = s.to_string(); self }
    fn body(mut self, b: &str) -> Self { self.body = b.to_string(); self }

    fn build(self) -> __BLANK__ {
        Email { to: self.to, subject: self.subject, body: self.body }
    }
}`,
      solution: `struct Email {
    to: String,
    subject: String,
    body: String,
}

struct EmailBuilder {
    to: String,
    subject: String,
    body: String,
}

impl EmailBuilder {
    fn new() -> Self {
        EmailBuilder { to: String::new(), subject: String::new(), body: String::new() }
    }

    fn to(mut self, to: &str) -> Self { self.to = to.to_string(); self }
    fn subject(mut self, s: &str) -> Self { self.subject = s.to_string(); self }
    fn body(mut self, b: &str) -> Self { self.body = b.to_string(); self }

    fn build(self) -> Email {
        Email { to: self.to, subject: self.subject, body: self.body }
    }
}`,
      hints: [
        'build() consumes the builder and returns the final type.',
        'The return type is the struct being built, not Self.',
        'fn build(self) -> Email'
      ],
      concepts: ['builder-pattern', 'build-method', 'consuming-builder']
    },
    {
      id: 'rs-builder-4',
      title: 'Predict Builder Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of a builder chain.',
      skeleton: `struct Msg { text: String, urgent: bool }

struct MsgBuilder { text: String, urgent: bool }

impl MsgBuilder {
    fn new() -> Self { MsgBuilder { text: String::new(), urgent: false } }
    fn text(mut self, t: &str) -> Self { self.text = t.to_string(); self }
    fn urgent(mut self) -> Self { self.urgent = true; self }
    fn build(self) -> Msg { Msg { text: self.text, urgent: self.urgent } }
}

fn main() {
    let m = MsgBuilder::new().text("hello").urgent().build();
    println!("{} {}", m.text, m.urgent);
}`,
      solution: 'hello true',
      hints: [
        'text is set to "hello" by the text() method.',
        'urgent() sets urgent to true.',
        'Output: hello true.'
      ],
      concepts: ['builder-pattern', 'method-chaining', 'output-prediction']
    },
    {
      id: 'rs-builder-5',
      title: 'Optional Builder Fields',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the builder with an optional field.',
      skeleton: `struct User {
    name: String,
    email: Option<String>,
}

struct UserBuilder {
    name: String,
    email: Option<String>,
}

impl UserBuilder {
    fn new(name: &str) -> Self {
        UserBuilder { name: name.to_string(), email: __BLANK__ }
    }

    fn email(mut self, email: &str) -> Self {
        self.email = Some(email.to_string());
        self
    }

    fn build(self) -> User {
        User { name: self.name, email: self.email }
    }
}`,
      solution: `struct User {
    name: String,
    email: Option<String>,
}

struct UserBuilder {
    name: String,
    email: Option<String>,
}

impl UserBuilder {
    fn new(name: &str) -> Self {
        UserBuilder { name: name.to_string(), email: None }
    }

    fn email(mut self, email: &str) -> Self {
        self.email = Some(email.to_string());
        self
    }

    fn build(self) -> User {
        User { name: self.name, email: self.email }
    }
}`,
      hints: [
        'Optional fields start as None in the builder.',
        'Setting the field wraps the value in Some.',
        'If email is not called, it stays None.'
      ],
      concepts: ['builder-pattern', 'option', 'optional-fields']
    },
    {
      id: 'rs-builder-6',
      title: 'Write Simple Builder',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a complete builder for a Rectangle struct with width and height.',
      skeleton: `struct Rectangle {
    width: f64,
    height: f64,
}

struct RectangleBuilder {
    width: f64,
    height: f64,
}

// todo: implement RectangleBuilder with:
// - new() with defaults (1.0, 1.0)
// - width(mut self, w: f64) -> Self
// - height(mut self, h: f64) -> Self
// - build(self) -> Rectangle`,
      solution: `struct Rectangle {
    width: f64,
    height: f64,
}

struct RectangleBuilder {
    width: f64,
    height: f64,
}

impl RectangleBuilder {
    fn new() -> Self {
        RectangleBuilder { width: 1.0, height: 1.0 }
    }

    fn width(mut self, w: f64) -> Self {
        self.width = w;
        self
    }

    fn height(mut self, h: f64) -> Self {
        self.height = h;
        self
    }

    fn build(self) -> Rectangle {
        Rectangle { width: self.width, height: self.height }
    }
}`,
      hints: [
        'Each setter takes mut self and returns Self.',
        'Defaults provide 1.0 for both dimensions.',
        'build() consumes the builder and creates a Rectangle.'
      ],
      concepts: ['builder-pattern', 'method-chaining', 'constructor']
    },
    {
      id: 'rs-builder-7',
      title: 'Builder with Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a builder whose build() returns Result to validate the constructed object.',
      skeleton: `struct DatabaseConfig {
    host: String,
    port: u16,
    database: String,
}

struct DatabaseConfigBuilder {
    host: Option<String>,
    port: u16,
    database: Option<String>,
}

// todo: implement builder where:
// - new() starts with host=None, port=5432, database=None
// - host(mut self, h: &str) -> Self
// - port(mut self, p: u16) -> Self
// - database(mut self, db: &str) -> Self
// - build(self) -> Result<DatabaseConfig, String> that errors if host or database is missing`,
      solution: `struct DatabaseConfig {
    host: String,
    port: u16,
    database: String,
}

struct DatabaseConfigBuilder {
    host: Option<String>,
    port: u16,
    database: Option<String>,
}

impl DatabaseConfigBuilder {
    fn new() -> Self {
        DatabaseConfigBuilder { host: None, port: 5432, database: None }
    }

    fn host(mut self, h: &str) -> Self {
        self.host = Some(h.to_string());
        self
    }

    fn port(mut self, p: u16) -> Self {
        self.port = p;
        self
    }

    fn database(mut self, db: &str) -> Self {
        self.database = Some(db.to_string());
        self
    }

    fn build(self) -> Result<DatabaseConfig, String> {
        let host = self.host.ok_or("host is required".to_string())?;
        let database = self.database.ok_or("database is required".to_string())?;
        Ok(DatabaseConfig { host, port: self.port, database })
    }
}`,
      hints: [
        'Required fields are Option in the builder, validated in build().',
        'Use ok_or to convert None to an error message.',
        'build() returns Result<DatabaseConfig, String>.'
      ],
      concepts: ['builder-pattern', 'validation', 'result', 'required-fields']
    },
    {
      id: 'rs-builder-8',
      title: 'Fix Builder Borrow Issue',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the builder that incorrectly uses &mut self instead of mut self.',
      skeleton: `struct Widget {
    label: String,
    width: u32,
}

struct WidgetBuilder {
    label: String,
    width: u32,
}

impl WidgetBuilder {
    fn new() -> Self {
        WidgetBuilder { label: String::from("default"), width: 100 }
    }

    fn label(&mut self, l: &str) -> &mut Self {
        self.label = l.to_string();
        self
    }

    fn width(&mut self, w: u32) -> &mut Self {
        self.width = w;
        self
    }

    fn build(&self) -> Widget {
        Widget { label: self.label.clone(), width: self.width }
    }
}

fn main() {
    let w = WidgetBuilder::new().label("btn").width(200).build();
    println!("{} {}", w.label, w.width);
}`,
      solution: `struct Widget {
    label: String,
    width: u32,
}

struct WidgetBuilder {
    label: String,
    width: u32,
}

impl WidgetBuilder {
    fn new() -> Self {
        WidgetBuilder { label: String::from("default"), width: 100 }
    }

    fn label(mut self, l: &str) -> Self {
        self.label = l.to_string();
        self
    }

    fn width(mut self, w: u32) -> Self {
        self.width = w;
        self
    }

    fn build(self) -> Widget {
        Widget { label: self.label, width: self.width }
    }
}

fn main() {
    let w = WidgetBuilder::new().label("btn").width(200).build();
    println!("{} {}", w.label, w.width);
}`,
      hints: [
        'Using &mut self creates temporary reference issues with chaining.',
        'Change &mut self to mut self to take ownership.',
        'build(self) can then move fields instead of cloning.'
      ],
      concepts: ['builder-pattern', 'ownership', 'method-chaining', 'mut-self']
    },
    {
      id: 'rs-builder-9',
      title: 'Builder with Vec Field',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a builder for a Command struct that accumulates arguments into a Vec.',
      skeleton: `struct Command {
    program: String,
    args: Vec<String>,
    env: Vec<(String, String)>,
}

struct CommandBuilder {
    program: String,
    args: Vec<String>,
    env: Vec<(String, String)>,
}

// todo: implement CommandBuilder with:
// - new(program: &str)
// - arg(mut self, a: &str) -> Self  (appends to args)
// - env(mut self, key: &str, val: &str) -> Self (appends to env)
// - build(self) -> Command`,
      solution: `struct Command {
    program: String,
    args: Vec<String>,
    env: Vec<(String, String)>,
}

struct CommandBuilder {
    program: String,
    args: Vec<String>,
    env: Vec<(String, String)>,
}

impl CommandBuilder {
    fn new(program: &str) -> Self {
        CommandBuilder {
            program: program.to_string(),
            args: Vec::new(),
            env: Vec::new(),
        }
    }

    fn arg(mut self, a: &str) -> Self {
        self.args.push(a.to_string());
        self
    }

    fn env(mut self, key: &str, val: &str) -> Self {
        self.env.push((key.to_string(), val.to_string()));
        self
    }

    fn build(self) -> Command {
        Command {
            program: self.program,
            args: self.args,
            env: self.env,
        }
    }
}`,
      hints: [
        'Vec fields accumulate values across multiple calls.',
        'Use push() in each setter to add items.',
        'The build method moves the Vecs into the final struct.'
      ],
      concepts: ['builder-pattern', 'vec', 'accumulation', 'method-chaining']
    },
    {
      id: 'rs-builder-10',
      title: 'Fix Missing Required Field',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the builder that does not validate a required field before building.',
      skeleton: `struct Connection {
    host: String,
    port: u16,
}

struct ConnectionBuilder {
    host: Option<String>,
    port: u16,
}

impl ConnectionBuilder {
    fn new() -> Self {
        ConnectionBuilder { host: None, port: 80 }
    }

    fn host(mut self, h: &str) -> Self {
        self.host = Some(h.to_string());
        self
    }

    fn port(mut self, p: u16) -> Self {
        self.port = p;
        self
    }

    fn build(self) -> Connection {
        Connection {
            host: self.host.unwrap(),
            port: self.port,
        }
    }
}

fn main() {
    let conn = ConnectionBuilder::new().port(443).build();
    println!("{}:{}", conn.host, conn.port);
}`,
      solution: `struct Connection {
    host: String,
    port: u16,
}

struct ConnectionBuilder {
    host: Option<String>,
    port: u16,
}

impl ConnectionBuilder {
    fn new() -> Self {
        ConnectionBuilder { host: None, port: 80 }
    }

    fn host(mut self, h: &str) -> Self {
        self.host = Some(h.to_string());
        self
    }

    fn port(mut self, p: u16) -> Self {
        self.port = p;
        self
    }

    fn build(self) -> Result<Connection, String> {
        let host = self.host.ok_or("host is required".to_string())?;
        Ok(Connection { host, port: self.port })
    }
}

fn main() {
    match ConnectionBuilder::new().port(443).build() {
        Ok(conn) => println!("{}:{}", conn.host, conn.port),
        Err(e) => println!("Error: {e}"),
    }
}`,
      hints: [
        'unwrap() on None will panic - use Result instead.',
        'Change build() to return Result<Connection, String>.',
        'Handle the error case in main with match.'
      ],
      concepts: ['builder-pattern', 'validation', 'result', 'panic-prevention']
    },
    {
      id: 'rs-builder-11',
      title: 'Predict Builder Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of a builder with overridden values.',
      skeleton: `struct Config { a: i32, b: i32 }
struct CB { a: i32, b: i32 }

impl CB {
    fn new() -> Self { CB { a: 0, b: 0 } }
    fn a(mut self, v: i32) -> Self { self.a = v; self }
    fn b(mut self, v: i32) -> Self { self.b = v; self }
    fn build(self) -> Config { Config { a: self.a, b: self.b } }
}

fn main() {
    let c = CB::new().a(1).b(2).a(3).build();
    println!("{} {}", c.a, c.b);
}`,
      solution: '3 2',
      hints: [
        'The second .a(3) call overrides the first .a(1).',
        'b remains 2 from the single .b(2) call.',
        'Output: 3 2.'
      ],
      concepts: ['builder-pattern', 'override', 'last-write-wins']
    },
    {
      id: 'rs-builder-12',
      title: 'Predict Validation Error',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of a builder with validation.',
      skeleton: `struct Item { name: String, qty: u32 }
struct IB { name: Option<String>, qty: u32 }

impl IB {
    fn new() -> Self { IB { name: None, qty: 0 } }
    fn name(mut self, n: &str) -> Self { self.name = Some(n.to_string()); self }
    fn qty(mut self, q: u32) -> Self { self.qty = q; self }
    fn build(self) -> Result<Item, String> {
        let name = self.name.ok_or("no name".to_string())?;
        if self.qty == 0 { return Err("qty must be > 0".to_string()); }
        Ok(Item { name, qty: self.qty })
    }
}

fn main() {
    match IB::new().name("widget").build() {
        Ok(i) => println!("{} {}", i.name, i.qty),
        Err(e) => println!("err: {e}"),
    }
}`,
      solution: 'err: qty must be > 0',
      hints: [
        'name is set to Some("widget"), so that passes.',
        'qty defaults to 0, which fails the > 0 check.',
        'Output: err: qty must be > 0.'
      ],
      concepts: ['builder-pattern', 'validation', 'result', 'error-messages']
    },
    {
      id: 'rs-builder-13',
      title: 'Write Builder with Closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a builder that accepts a closure for custom transformation.',
      skeleton: `struct Pipeline {
    steps: Vec<String>,
}

struct PipelineBuilder {
    steps: Vec<String>,
}

// todo: implement PipelineBuilder with:
// - new()
// - step(mut self, name: &str) -> Self
// - transform(mut self, f: impl Fn(&mut Vec<String>)) -> Self
// - build(self) -> Pipeline`,
      solution: `struct Pipeline {
    steps: Vec<String>,
}

struct PipelineBuilder {
    steps: Vec<String>,
}

impl PipelineBuilder {
    fn new() -> Self {
        PipelineBuilder { steps: Vec::new() }
    }

    fn step(mut self, name: &str) -> Self {
        self.steps.push(name.to_string());
        self
    }

    fn transform(mut self, f: impl Fn(&mut Vec<String>)) -> Self {
        f(&mut self.steps);
        self
    }

    fn build(self) -> Pipeline {
        Pipeline { steps: self.steps }
    }
}`,
      hints: [
        'transform takes a closure that can modify the steps Vec.',
        'Use impl Fn(&mut Vec<String>) for the closure parameter.',
        'Call f(&mut self.steps) to apply the transformation.'
      ],
      concepts: ['builder-pattern', 'closures', 'impl-fn', 'transformation']
    },
    {
      id: 'rs-builder-14',
      title: 'Write Generic Builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a generic builder for a Pair<A, B> using the type-state builder pattern to ensure both fields are set.',
      skeleton: `use std::marker::PhantomData;

struct Pair<A, B> {
    first: A,
    second: B,
}

struct NeedFirst;
struct NeedSecond<A> { first: A }

struct PairBuilder<S> {
    _s: PhantomData<S>,
}

// todo: PairBuilder<NeedFirst>::new() -> PairBuilder<NeedFirst>
// todo: PairBuilder<NeedFirst>::first<A>(self, a: A) -> PairBuilder<NeedSecond<A>>
// todo: PairBuilder<NeedSecond<A>>::second<B>(self, b: B) -> Pair<A, B>`,
      solution: `use std::marker::PhantomData;

struct Pair<A, B> {
    first: A,
    second: B,
}

struct NeedFirst;
struct NeedSecond<A> { first: A }

struct PairBuilder<S> {
    _s: S,
}

impl PairBuilder<NeedFirst> {
    fn new() -> Self {
        PairBuilder { _s: NeedFirst }
    }

    fn first<A>(self, a: A) -> PairBuilder<NeedSecond<A>> {
        PairBuilder { _s: NeedSecond { first: a } }
    }
}

impl<A> PairBuilder<NeedSecond<A>> {
    fn second<B>(self, b: B) -> Pair<A, B> {
        Pair { first: self._s.first, second: b }
    }
}`,
      hints: [
        'Store actual data in the state types, not PhantomData.',
        'NeedSecond<A> holds the first value until second is provided.',
        'second() consumes the builder and returns the final Pair.'
      ],
      concepts: ['type-state-builder', 'generics', 'required-fields', 'compile-time']
    },
    {
      id: 'rs-builder-15',
      title: 'Fix Builder Consuming Error',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix the builder that tries to reuse itself after build() consumes it.',
      skeleton: `struct Report { title: String, pages: u32 }
struct ReportBuilder { title: String, pages: u32 }

impl ReportBuilder {
    fn new() -> Self { ReportBuilder { title: String::new(), pages: 0 } }
    fn title(mut self, t: &str) -> Self { self.title = t.to_string(); self }
    fn pages(mut self, p: u32) -> Self { self.pages = p; self }
    fn build(self) -> Report { Report { title: self.title, pages: self.pages } }
}

fn main() {
    let builder = ReportBuilder::new().title("Q4").pages(10);
    let r1 = builder.build();
    let r2 = builder.build();
    println!("{} {}", r1.title, r2.title);
}`,
      solution: `#[derive(Clone)]
struct Report { title: String, pages: u32 }

#[derive(Clone)]
struct ReportBuilder { title: String, pages: u32 }

impl ReportBuilder {
    fn new() -> Self { ReportBuilder { title: String::new(), pages: 0 } }
    fn title(mut self, t: &str) -> Self { self.title = t.to_string(); self }
    fn pages(mut self, p: u32) -> Self { self.pages = p; self }
    fn build(&self) -> Report { Report { title: self.title.clone(), pages: self.pages } }
}

fn main() {
    let builder = ReportBuilder::new().title("Q4").pages(10);
    let r1 = builder.build();
    let r2 = builder.build();
    println!("{} {}", r1.title, r2.title);
}`,
      hints: [
        'build(self) consumes the builder, preventing reuse.',
        'Change build to take &self and clone the fields.',
        'Alternatively, clone the builder before calling build.'
      ],
      concepts: ['builder-pattern', 'ownership', 'clone', 'reusable-builder']
    },
    {
      id: 'rs-builder-16',
      title: 'Write Builder with derive Default',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a builder that leverages Default for initialization and supports selective overrides.',
      skeleton: `#[derive(Debug)]
struct AppConfig {
    name: String,
    port: u16,
    workers: usize,
    debug: bool,
}

#[derive(Default)]
struct AppConfigBuilder {
    name: Option<String>,
    port: Option<u16>,
    workers: Option<usize>,
    debug: Option<bool>,
}

// todo: implement AppConfigBuilder with setters and a build()
// that uses defaults: name="app", port=8080, workers=4, debug=false`,
      solution: `#[derive(Debug)]
struct AppConfig {
    name: String,
    port: u16,
    workers: usize,
    debug: bool,
}

#[derive(Default)]
struct AppConfigBuilder {
    name: Option<String>,
    port: Option<u16>,
    workers: Option<usize>,
    debug: Option<bool>,
}

impl AppConfigBuilder {
    fn new() -> Self {
        Self::default()
    }

    fn name(mut self, n: &str) -> Self {
        self.name = Some(n.to_string());
        self
    }

    fn port(mut self, p: u16) -> Self {
        self.port = Some(p);
        self
    }

    fn workers(mut self, w: usize) -> Self {
        self.workers = Some(w);
        self
    }

    fn debug(mut self, d: bool) -> Self {
        self.debug = Some(d);
        self
    }

    fn build(self) -> AppConfig {
        AppConfig {
            name: self.name.unwrap_or_else(|| "app".to_string()),
            port: self.port.unwrap_or(8080),
            workers: self.workers.unwrap_or(4),
            debug: self.debug.unwrap_or(false),
        }
    }
}`,
      hints: [
        'Use #[derive(Default)] so new() can call Self::default().',
        'All fields are Option - None means use the default.',
        'unwrap_or provides the default in build().'
      ],
      concepts: ['builder-pattern', 'default', 'option', 'unwrap-or']
    },
    {
      id: 'rs-builder-17',
      title: 'Predict Nested Builder',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Predict the output of a builder used in a function.',
      skeleton: `struct S { a: i32, b: i32 }
struct SB { a: i32, b: i32 }

impl SB {
    fn new() -> Self { SB { a: 0, b: 0 } }
    fn a(mut self, v: i32) -> Self { self.a = v; self }
    fn b(mut self, v: i32) -> Self { self.b = v; self }
    fn build(self) -> S { S { a: self.a, b: self.b } }
}

fn make(base: i32) -> S {
    SB::new().a(base).b(base * 2).build()
}

fn main() {
    let s = make(5);
    println!("{} {}", s.a, s.b);
}`,
      solution: '5 10',
      hints: [
        'make(5) calls .a(5).b(10).build().',
        'a=5, b=5*2=10.',
        'Output: 5 10.'
      ],
      concepts: ['builder-pattern', 'function', 'computation']
    },
    {
      id: 'rs-builder-18',
      title: 'Refactor Constructor to Builder',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor a complex constructor with many parameters into a builder pattern.',
      skeleton: `struct Window {
    title: String,
    width: u32,
    height: u32,
    resizable: bool,
    fullscreen: bool,
}

impl Window {
    fn new(title: &str, width: u32, height: u32, resizable: bool, fullscreen: bool) -> Self {
        Window {
            title: title.to_string(),
            width,
            height,
            resizable,
            fullscreen,
        }
    }
}

fn main() {
    let w = Window::new("My App", 800, 600, true, false);
    println!("{} {}x{}", w.title, w.width, w.height);
}`,
      solution: `struct Window {
    title: String,
    width: u32,
    height: u32,
    resizable: bool,
    fullscreen: bool,
}

struct WindowBuilder {
    title: String,
    width: u32,
    height: u32,
    resizable: bool,
    fullscreen: bool,
}

impl WindowBuilder {
    fn new(title: &str) -> Self {
        WindowBuilder {
            title: title.to_string(),
            width: 800,
            height: 600,
            resizable: true,
            fullscreen: false,
        }
    }

    fn width(mut self, w: u32) -> Self { self.width = w; self }
    fn height(mut self, h: u32) -> Self { self.height = h; self }
    fn resizable(mut self, r: bool) -> Self { self.resizable = r; self }
    fn fullscreen(mut self, f: bool) -> Self { self.fullscreen = f; self }

    fn build(self) -> Window {
        Window {
            title: self.title,
            width: self.width,
            height: self.height,
            resizable: self.resizable,
            fullscreen: self.fullscreen,
        }
    }
}

fn main() {
    let w = WindowBuilder::new("My App").width(800).height(600).build();
    println!("{} {}x{}", w.title, w.width, w.height);
}`,
      hints: [
        'Replace the multi-parameter constructor with a builder.',
        'Only title is required; others get sensible defaults.',
        'Each optional parameter becomes a chainable setter method.'
      ],
      concepts: ['builder-pattern', 'refactoring', 'api-design', 'defaults']
    },
    {
      id: 'rs-builder-19',
      title: 'Refactor to Derive Builder',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor a manual builder to use a more concise impl pattern with a builder() associated function.',
      skeleton: `struct Theme {
    name: String,
    primary: String,
    secondary: String,
    dark: bool,
}

struct ThemeBuilder {
    name: String,
    primary: String,
    secondary: String,
    dark: bool,
}

impl ThemeBuilder {
    fn new() -> Self {
        ThemeBuilder {
            name: "default".to_string(),
            primary: "#000".to_string(),
            secondary: "#fff".to_string(),
            dark: false,
        }
    }
    fn name(mut self, n: &str) -> Self { self.name = n.to_string(); self }
    fn primary(mut self, c: &str) -> Self { self.primary = c.to_string(); self }
    fn secondary(mut self, c: &str) -> Self { self.secondary = c.to_string(); self }
    fn dark(mut self, d: bool) -> Self { self.dark = d; self }
    fn build(self) -> Theme {
        Theme { name: self.name, primary: self.primary, secondary: self.secondary, dark: self.dark }
    }
}

fn main() {
    let t = ThemeBuilder::new().name("ocean").dark(true).build();
    println!("{} dark={}", t.name, t.dark);
}`,
      solution: `struct Theme {
    name: String,
    primary: String,
    secondary: String,
    dark: bool,
}

impl Theme {
    fn builder() -> ThemeBuilder {
        ThemeBuilder {
            name: "default".to_string(),
            primary: "#000".to_string(),
            secondary: "#fff".to_string(),
            dark: false,
        }
    }
}

struct ThemeBuilder {
    name: String,
    primary: String,
    secondary: String,
    dark: bool,
}

impl ThemeBuilder {
    fn name(mut self, n: &str) -> Self { self.name = n.to_string(); self }
    fn primary(mut self, c: &str) -> Self { self.primary = c.to_string(); self }
    fn secondary(mut self, c: &str) -> Self { self.secondary = c.to_string(); self }
    fn dark(mut self, d: bool) -> Self { self.dark = d; self }
    fn build(self) -> Theme {
        Theme { name: self.name, primary: self.primary, secondary: self.secondary, dark: self.dark }
    }
}

fn main() {
    let t = Theme::builder().name("ocean").dark(true).build();
    println!("{} dark={}", t.name, t.dark);
}`,
      hints: [
        'Add a Theme::builder() associated function that returns ThemeBuilder.',
        'This is more discoverable - users start from the target type.',
        'Usage becomes Theme::builder().name(...).build().'
      ],
      concepts: ['builder-pattern', 'associated-function', 'api-design', 'discoverability']
    },
    {
      id: 'rs-builder-20',
      title: 'Write Composable Builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a builder for an HttpResponse that supports headers as a HashMap and a body.',
      skeleton: `use std::collections::HashMap;

struct HttpResponse {
    status: u16,
    headers: HashMap<String, String>,
    body: String,
}

struct HttpResponseBuilder {
    status: u16,
    headers: HashMap<String, String>,
    body: String,
}

// todo: implement HttpResponseBuilder with:
// - new(status: u16) -> Self
// - header(mut self, key: &str, value: &str) -> Self
// - body(mut self, body: &str) -> Self
// - json(mut self, data: &str) -> Self  (sets content-type header + body)
// - build(self) -> HttpResponse`,
      solution: `use std::collections::HashMap;

struct HttpResponse {
    status: u16,
    headers: HashMap<String, String>,
    body: String,
}

struct HttpResponseBuilder {
    status: u16,
    headers: HashMap<String, String>,
    body: String,
}

impl HttpResponseBuilder {
    fn new(status: u16) -> Self {
        HttpResponseBuilder {
            status,
            headers: HashMap::new(),
            body: String::new(),
        }
    }

    fn header(mut self, key: &str, value: &str) -> Self {
        self.headers.insert(key.to_string(), value.to_string());
        self
    }

    fn body(mut self, body: &str) -> Self {
        self.body = body.to_string();
        self
    }

    fn json(mut self, data: &str) -> Self {
        self.headers.insert("Content-Type".to_string(), "application/json".to_string());
        self.body = data.to_string();
        self
    }

    fn build(self) -> HttpResponse {
        HttpResponse {
            status: self.status,
            headers: self.headers,
            body: self.body,
        }
    }
}`,
      hints: [
        'json() is a convenience method that sets both header and body.',
        'Headers use a HashMap for flexible key-value storage.',
        'Each setter returns Self for chaining.'
      ],
      concepts: ['builder-pattern', 'hashmap', 'convenience-methods', 'http']
    }
  ]
};
