import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-typestate',
  title: '39. Type-State Pattern',
  explanation: `## Type-State Pattern

The type-state pattern uses the type system to encode valid states and transitions, making invalid states unrepresentable at compile time.

### Basic Example
\`\`\`rust
struct Locked;
struct Unlocked;

struct Door<State> {
    _state: std::marker::PhantomData<State>,
}

impl Door<Locked> {
    fn unlock(self) -> Door<Unlocked> {
        Door { _state: std::marker::PhantomData }
    }
}

impl Door<Unlocked> {
    fn lock(self) -> Door<Locked> {
        Door { _state: std::marker::PhantomData }
    }
    fn open(&self) { println!("Door opened!"); }
}
\`\`\`

### Benefits
- Invalid operations are **compile-time errors**, not runtime errors
- Self-documenting API: types show allowed operations
- Zero runtime overhead: states are zero-sized types

### Common Use Cases
- Connection states: Disconnected -> Connected -> Authenticated
- Builder patterns with required fields
- File handles: Open -> Read/Write -> Closed
- HTTP requests: Building -> Sent -> ResponseReceived

### PhantomData
\`PhantomData<T>\` lets you use a type parameter without storing data of that type:
\`\`\`rust
use std::marker::PhantomData;
struct Tagged<T> { _marker: PhantomData<T> }
\`\`\`
`,
  exercises: [
    {
      id: 'rs-typestate-1',
      title: 'State Marker Types',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define marker types for a type-state machine.',
      skeleton: `struct On;
struct Off;

struct Light<State> {
    _state: std::marker::__BLANK__<State>,
}`,
      solution: `struct On;
struct Off;

struct Light<State> {
    _state: std::marker::PhantomData<State>,
}`,
      hints: [
        'PhantomData allows using a type parameter without storing it.',
        'It is a zero-sized type from std::marker.',
        'std::marker::PhantomData<State>'
      ],
      concepts: ['phantom-data', 'marker-types', 'type-state']
    },
    {
      id: 'rs-typestate-2',
      title: 'State Transition Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the state transition that consumes one state and returns another.',
      skeleton: `use std::marker::PhantomData;

struct Draft;
struct Published;

struct Post<S> { _s: PhantomData<S>, content: String }

impl Post<Draft> {
    fn publish(self) -> __BLANK__ {
        Post { _s: PhantomData, content: self.content }
    }
}`,
      solution: `use std::marker::PhantomData;

struct Draft;
struct Published;

struct Post<S> { _s: PhantomData<S>, content: String }

impl Post<Draft> {
    fn publish(self) -> Post<Published> {
        Post { _s: PhantomData, content: self.content }
    }
}`,
      hints: [
        'The method transitions from Draft to Published state.',
        'Return type is Post<Published>.',
        'The method consumes self (takes ownership) to prevent reuse.'
      ],
      concepts: ['type-state', 'state-transition', 'ownership']
    },
    {
      id: 'rs-typestate-3',
      title: 'Create Initial State',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a constructor that produces the initial state.',
      skeleton: `use std::marker::PhantomData;

struct Empty;
struct Full;

struct Tank<S> {
    _s: PhantomData<S>,
    liters: f64,
}

impl Tank<Empty> {
    fn new() -> __BLANK__ {
        Tank { _s: PhantomData, liters: 0.0 }
    }
}`,
      solution: `use std::marker::PhantomData;

struct Empty;
struct Full;

struct Tank<S> {
    _s: PhantomData<S>,
    liters: f64,
}

impl Tank<Empty> {
    fn new() -> Tank<Empty> {
        Tank { _s: PhantomData, liters: 0.0 }
    }
}`,
      hints: [
        'The constructor returns the initial Empty state.',
        'Return type is Tank<Empty>.',
        'PhantomData needs no value - just PhantomData.'
      ],
      concepts: ['type-state', 'constructor', 'initial-state']
    },
    {
      id: 'rs-typestate-4',
      title: 'Predict Compile Error',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict whether this type-state code compiles.',
      skeleton: `use std::marker::PhantomData;
struct Locked;
struct Unlocked;
struct Door<S> { _s: PhantomData<S> }

impl Door<Locked> {
    fn new() -> Door<Locked> { Door { _s: PhantomData } }
    fn unlock(self) -> Door<Unlocked> { Door { _s: PhantomData } }
}
impl Door<Unlocked> {
    fn open(&self) { println!("opened"); }
}

fn main() {
    let door = Door::new();
    let door = door.unlock();
    door.open();
    println!("done");
}`,
      solution: 'opened\ndone',
      hints: [
        'Door starts Locked, unlock() transitions to Unlocked.',
        'open() is only available on Door<Unlocked>, which is correct here.',
        'Code compiles and runs: "opened" then "done".'
      ],
      concepts: ['type-state', 'state-transition', 'compile-time-safety']
    },
    {
      id: 'rs-typestate-5',
      title: 'State-Specific Methods',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement methods only available in a specific state.',
      skeleton: `use std::marker::PhantomData;

struct Connected;
struct Disconnected;

struct Socket<S> { _s: PhantomData<S> }

impl Socket<Disconnected> {
    fn new() -> Self { Socket { _s: PhantomData } }
    fn connect(self) -> Socket<Connected> { Socket { _s: PhantomData } }
}

impl Socket<__BLANK__> {
    fn send(&self, data: &str) {
        println!("Sending: {data}");
    }
}`,
      solution: `use std::marker::PhantomData;

struct Connected;
struct Disconnected;

struct Socket<S> { _s: PhantomData<S> }

impl Socket<Disconnected> {
    fn new() -> Self { Socket { _s: PhantomData } }
    fn connect(self) -> Socket<Connected> { Socket { _s: PhantomData } }
}

impl Socket<Connected> {
    fn send(&self, data: &str) {
        println!("Sending: {data}");
    }
}`,
      hints: [
        'send() should only be available when Connected.',
        'Implement the method on Socket<Connected>.',
        'This prevents calling send on a disconnected socket.'
      ],
      concepts: ['type-state', 'state-specific-methods', 'safety']
    },
    {
      id: 'rs-typestate-6',
      title: 'Write Light Switch',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement a type-state light switch with On/Off states and toggle methods.',
      skeleton: `use std::marker::PhantomData;

struct On;
struct Off;

struct Switch<S> {
    _s: PhantomData<S>,
}

// todo: implement Switch<Off>::new() -> Switch<Off>
// todo: implement Switch<Off>::turn_on(self) -> Switch<On>
// todo: implement Switch<On>::turn_off(self) -> Switch<Off>
// todo: implement Switch<On>::brightness(&self) -> &str that returns "bright"`,
      solution: `use std::marker::PhantomData;

struct On;
struct Off;

struct Switch<S> {
    _s: PhantomData<S>,
}

impl Switch<Off> {
    fn new() -> Self {
        Switch { _s: PhantomData }
    }

    fn turn_on(self) -> Switch<On> {
        Switch { _s: PhantomData }
    }
}

impl Switch<On> {
    fn turn_off(self) -> Switch<Off> {
        Switch { _s: PhantomData }
    }

    fn brightness(&self) -> &str {
        "bright"
    }
}`,
      hints: [
        'Each state gets its own impl block.',
        'Transition methods consume self and return the new state.',
        'brightness is only available on Switch<On>.'
      ],
      concepts: ['type-state', 'state-machine', 'phantom-data']
    },
    {
      id: 'rs-typestate-7',
      title: 'Fill State with Data',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete a type-state pattern where the state carries data.',
      skeleton: `use std::marker::PhantomData;

struct Unauthenticated;
struct Authenticated;

struct Session<S> {
    _s: PhantomData<S>,
    user: Option<String>,
}

impl Session<Unauthenticated> {
    fn new() -> Self {
        Session { _s: PhantomData, user: None }
    }

    fn login(self, username: &str) -> Session<Authenticated> {
        Session { _s: __BLANK__, user: Some(username.to_string()) }
    }
}`,
      solution: `use std::marker::PhantomData;

struct Unauthenticated;
struct Authenticated;

struct Session<S> {
    _s: PhantomData<S>,
    user: Option<String>,
}

impl Session<Unauthenticated> {
    fn new() -> Self {
        Session { _s: PhantomData, user: None }
    }

    fn login(self, username: &str) -> Session<Authenticated> {
        Session { _s: PhantomData, user: Some(username.to_string()) }
    }
}`,
      hints: [
        'PhantomData is a zero-sized value, just write PhantomData.',
        'No need for PhantomData::new() or similar.',
        'The type parameter is inferred from the return type.'
      ],
      concepts: ['phantom-data', 'type-state', 'type-inference']
    },
    {
      id: 'rs-typestate-8',
      title: 'Fix Invalid State Transition',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the code that tries to use a method in the wrong state.',
      skeleton: `use std::marker::PhantomData;

struct Raw;
struct Validated;

struct Input<S> { _s: PhantomData<S>, data: String }

impl Input<Raw> {
    fn new(data: &str) -> Self { Input { _s: PhantomData, data: data.to_string() } }
    fn validate(self) -> Input<Validated> { Input { _s: PhantomData, data: self.data } }
}

impl Input<Validated> {
    fn process(&self) -> String { format!("Processed: {}", self.data) }
}

fn main() {
    let input = Input::new("hello");
    let result = input.process();
    println!("{result}");
}`,
      solution: `use std::marker::PhantomData;

struct Raw;
struct Validated;

struct Input<S> { _s: PhantomData<S>, data: String }

impl Input<Raw> {
    fn new(data: &str) -> Self { Input { _s: PhantomData, data: data.to_string() } }
    fn validate(self) -> Input<Validated> { Input { _s: PhantomData, data: self.data } }
}

impl Input<Validated> {
    fn process(&self) -> String { format!("Processed: {}", self.data) }
}

fn main() {
    let input = Input::new("hello");
    let validated = input.validate();
    let result = validated.process();
    println!("{result}");
}`,
      hints: [
        'process() is only available on Input<Validated>, not Input<Raw>.',
        'You must call validate() first to transition states.',
        'Chain: new() -> validate() -> process().'
      ],
      concepts: ['type-state', 'invalid-state', 'compile-error']
    },
    {
      id: 'rs-typestate-9',
      title: 'Write HTTP Request Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a type-state HTTP request builder where URL must be set before sending.',
      skeleton: `use std::marker::PhantomData;

struct NoUrl;
struct HasUrl;

struct Request<S> {
    _s: PhantomData<S>,
    url: String,
    method: String,
}

// todo: implement Request<NoUrl>::new() -> Request<NoUrl>
// todo: implement Request<NoUrl>::url(self, url: &str) -> Request<HasUrl>
// todo: implement Request<HasUrl>::method(self, m: &str) -> Request<HasUrl>
// todo: implement Request<HasUrl>::send(&self) -> String`,
      solution: `use std::marker::PhantomData;

struct NoUrl;
struct HasUrl;

struct Request<S> {
    _s: PhantomData<S>,
    url: String,
    method: String,
}

impl Request<NoUrl> {
    fn new() -> Self {
        Request { _s: PhantomData, url: String::new(), method: String::from("GET") }
    }

    fn url(self, url: &str) -> Request<HasUrl> {
        Request { _s: PhantomData, url: url.to_string(), method: self.method }
    }
}

impl Request<HasUrl> {
    fn method(self, m: &str) -> Request<HasUrl> {
        Request { _s: PhantomData, url: self.url, method: m.to_string() }
    }

    fn send(&self) -> String {
        format!("{} {}", self.method, self.url)
    }
}`,
      hints: [
        'send() should only be available after URL is set.',
        'url() transitions from NoUrl to HasUrl.',
        'method() stays in HasUrl state since URL is already set.'
      ],
      concepts: ['type-state', 'builder-pattern', 'compile-time-safety']
    },
    {
      id: 'rs-typestate-10',
      title: 'Fix Missing Transition',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the pipeline that skips a required state transition.',
      skeleton: `use std::marker::PhantomData;

struct Uninitialized;
struct Configured;
struct Running;

struct Service<S> { _s: PhantomData<S>, name: String }

impl Service<Uninitialized> {
    fn new(name: &str) -> Self { Service { _s: PhantomData, name: name.to_string() } }
    fn configure(self) -> Service<Configured> { Service { _s: PhantomData, name: self.name } }
}
impl Service<Configured> {
    fn start(self) -> Service<Running> { Service { _s: PhantomData, name: self.name } }
}
impl Service<Running> {
    fn status(&self) -> String { format!("{} is running", self.name) }
}

fn main() {
    let svc = Service::new("web");
    let running = svc.start();
    println!("{}", running.status());
}`,
      solution: `use std::marker::PhantomData;

struct Uninitialized;
struct Configured;
struct Running;

struct Service<S> { _s: PhantomData<S>, name: String }

impl Service<Uninitialized> {
    fn new(name: &str) -> Self { Service { _s: PhantomData, name: name.to_string() } }
    fn configure(self) -> Service<Configured> { Service { _s: PhantomData, name: self.name } }
}
impl Service<Configured> {
    fn start(self) -> Service<Running> { Service { _s: PhantomData, name: self.name } }
}
impl Service<Running> {
    fn status(&self) -> String { format!("{} is running", self.name) }
}

fn main() {
    let svc = Service::new("web");
    let configured = svc.configure();
    let running = configured.start();
    println!("{}", running.status());
}`,
      hints: [
        'start() is on Service<Configured>, not Service<Uninitialized>.',
        'You must call configure() before start().',
        'Add the missing configure() call in the chain.'
      ],
      concepts: ['type-state', 'required-transition', 'pipeline']
    },
    {
      id: 'rs-typestate-11',
      title: 'Predict Type-State Error',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict whether the code compiles and what it outputs.',
      skeleton: `use std::marker::PhantomData;
struct Open;
struct Closed;
struct File<S> { _s: PhantomData<S>, name: String }

impl File<Open> {
    fn read(&self) -> String { format!("reading {}", self.name) }
    fn close(self) -> File<Closed> { File { _s: PhantomData, name: self.name } }
}
impl File<Closed> {
    fn open(name: &str) -> File<Open> { File { _s: PhantomData, name: name.to_string() } }
}

fn main() {
    let f = File::open("data.txt");
    println!("{}", f.read());
    let f = f.close();
    println!("closed");
}`,
      solution: 'reading data.txt\nclosed',
      hints: [
        'File::open returns File<Open>, read() works on Open.',
        'close() transitions to Closed.',
        'All operations are valid - outputs reading line then closed.'
      ],
      concepts: ['type-state', 'valid-transitions', 'output-prediction']
    },
    {
      id: 'rs-typestate-12',
      title: 'Write Rocket Launch Sequence',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Model a rocket launch sequence: Grounded -> Fueled -> Launched with type-state.',
      skeleton: `use std::marker::PhantomData;

struct Grounded;
struct Fueled;
struct Launched;

struct Rocket<S> {
    _s: PhantomData<S>,
    name: String,
    fuel: f64,
}

// todo: implement Rocket<Grounded>::new(name) with fuel=0
// todo: implement Rocket<Grounded>::fuel(self, amount) -> Rocket<Fueled>
// todo: implement Rocket<Fueled>::launch(self) -> Rocket<Launched>
// todo: implement Rocket<Launched>::altitude(&self) -> String`,
      solution: `use std::marker::PhantomData;

struct Grounded;
struct Fueled;
struct Launched;

struct Rocket<S> {
    _s: PhantomData<S>,
    name: String,
    fuel: f64,
}

impl Rocket<Grounded> {
    fn new(name: &str) -> Self {
        Rocket { _s: PhantomData, name: name.to_string(), fuel: 0.0 }
    }

    fn fuel(self, amount: f64) -> Rocket<Fueled> {
        Rocket { _s: PhantomData, name: self.name, fuel: amount }
    }
}

impl Rocket<Fueled> {
    fn launch(self) -> Rocket<Launched> {
        Rocket { _s: PhantomData, name: self.name, fuel: self.fuel }
    }
}

impl Rocket<Launched> {
    fn altitude(&self) -> String {
        format!("{} at altitude with {} fuel", self.name, self.fuel)
    }
}`,
      hints: [
        'Each transition method consumes self and returns the next state.',
        'Data (name, fuel) carries through state transitions.',
        'altitude() is only available on Rocket<Launched>.'
      ],
      concepts: ['type-state', 'state-machine', 'ownership-transfer']
    },
    {
      id: 'rs-typestate-13',
      title: 'Common Methods Across States',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add methods available in all states using a generic impl block.',
      skeleton: `use std::marker::PhantomData;

struct Idle;
struct Active;

struct Worker<S> {
    _s: PhantomData<S>,
    name: String,
    tasks_done: u32,
}

// todo: implement a generic impl<S> Worker<S> with:
//   fn name(&self) -> &str
//   fn tasks_done(&self) -> u32

impl Worker<Idle> {
    fn new(name: &str) -> Self {
        Worker { _s: PhantomData, name: name.to_string(), tasks_done: 0 }
    }
    fn activate(self) -> Worker<Active> {
        Worker { _s: PhantomData, name: self.name, tasks_done: self.tasks_done }
    }
}`,
      solution: `use std::marker::PhantomData;

struct Idle;
struct Active;

struct Worker<S> {
    _s: PhantomData<S>,
    name: String,
    tasks_done: u32,
}

impl<S> Worker<S> {
    fn name(&self) -> &str {
        &self.name
    }

    fn tasks_done(&self) -> u32 {
        self.tasks_done
    }
}

impl Worker<Idle> {
    fn new(name: &str) -> Self {
        Worker { _s: PhantomData, name: name.to_string(), tasks_done: 0 }
    }
    fn activate(self) -> Worker<Active> {
        Worker { _s: PhantomData, name: self.name, tasks_done: self.tasks_done }
    }
}`,
      hints: [
        'Use impl<S> Worker<S> for methods available in all states.',
        'The generic S means it works for any state type.',
        'State-specific methods go in impl Worker<SpecificState>.'
      ],
      concepts: ['type-state', 'generic-impl', 'shared-methods']
    },
    {
      id: 'rs-typestate-14',
      title: 'Fix Reuse After Transition',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix the code that tries to use a value after a state transition consumed it.',
      skeleton: `use std::marker::PhantomData;

struct Open;
struct Sealed;

struct Envelope<S> { _s: PhantomData<S>, contents: String }

impl Envelope<Open> {
    fn new(contents: &str) -> Self { Envelope { _s: PhantomData, contents: contents.to_string() } }
    fn seal(self) -> Envelope<Sealed> { Envelope { _s: PhantomData, contents: self.contents } }
    fn read(&self) -> &str { &self.contents }
}

fn main() {
    let env = Envelope::new("secret");
    let sealed = env.seal();
    println!("Contents: {}", env.read());
}`,
      solution: `use std::marker::PhantomData;

struct Open;
struct Sealed;

struct Envelope<S> { _s: PhantomData<S>, contents: String }

impl Envelope<Open> {
    fn new(contents: &str) -> Self { Envelope { _s: PhantomData, contents: contents.to_string() } }
    fn seal(self) -> Envelope<Sealed> { Envelope { _s: PhantomData, contents: self.contents } }
    fn read(&self) -> &str { &self.contents }
}

fn main() {
    let env = Envelope::new("secret");
    println!("Contents: {}", env.read());
    let _sealed = env.seal();
}`,
      hints: [
        'seal() consumes env, so env cannot be used after.',
        'Read the contents before sealing.',
        'Move the read() call before seal().'
      ],
      concepts: ['type-state', 'move-semantics', 'use-after-move']
    },
    {
      id: 'rs-typestate-15',
      title: 'Write Database Connection States',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Model a database connection with states: Disconnected -> Connected -> InTransaction, with rollback returning to Connected.',
      skeleton: `use std::marker::PhantomData;

struct Disconnected;
struct Connected;
struct InTransaction;

struct DbConn<S> {
    _s: PhantomData<S>,
    url: String,
}

// todo: implement all state transitions:
// Disconnected::new(url) -> Disconnected
// Disconnected::connect(self) -> Connected
// Connected::begin(self) -> InTransaction
// Connected::disconnect(self) -> Disconnected
// InTransaction::commit(self) -> Connected
// InTransaction::rollback(self) -> Connected
// InTransaction::execute(&self, sql: &str) -> String`,
      solution: `use std::marker::PhantomData;

struct Disconnected;
struct Connected;
struct InTransaction;

struct DbConn<S> {
    _s: PhantomData<S>,
    url: String,
}

impl DbConn<Disconnected> {
    fn new(url: &str) -> Self {
        DbConn { _s: PhantomData, url: url.to_string() }
    }

    fn connect(self) -> DbConn<Connected> {
        DbConn { _s: PhantomData, url: self.url }
    }
}

impl DbConn<Connected> {
    fn begin(self) -> DbConn<InTransaction> {
        DbConn { _s: PhantomData, url: self.url }
    }

    fn disconnect(self) -> DbConn<Disconnected> {
        DbConn { _s: PhantomData, url: self.url }
    }
}

impl DbConn<InTransaction> {
    fn commit(self) -> DbConn<Connected> {
        DbConn { _s: PhantomData, url: self.url }
    }

    fn rollback(self) -> DbConn<Connected> {
        DbConn { _s: PhantomData, url: self.url }
    }

    fn execute(&self, sql: &str) -> String {
        format!("Executing on {}: {}", self.url, sql)
    }
}`,
      hints: [
        'Each state gets its own impl block with valid transitions.',
        'commit and rollback both return to Connected.',
        'execute is only available in InTransaction.'
      ],
      concepts: ['type-state', 'database', 'transaction', 'state-machine']
    },
    {
      id: 'rs-typestate-16',
      title: 'Predict Chained Transitions',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Predict the output of chained type-state transitions.',
      skeleton: `use std::marker::PhantomData;
struct A; struct B; struct C;
struct M<S> { _s: PhantomData<S>, val: i32 }

impl M<A> {
    fn new(v: i32) -> Self { M { _s: PhantomData, val: v } }
    fn to_b(self) -> M<B> { M { _s: PhantomData, val: self.val + 1 } }
}
impl M<B> {
    fn to_c(self) -> M<C> { M { _s: PhantomData, val: self.val * 2 } }
}
impl M<C> {
    fn result(&self) -> i32 { self.val }
}

fn main() {
    let r = M::new(3).to_b().to_c().result();
    println!("{r}");
}`,
      solution: '8',
      hints: [
        'new(3) creates M<A> with val=3.',
        'to_b() makes val=3+1=4, to_c() makes val=4*2=8.',
        'result() returns 8.'
      ],
      concepts: ['type-state', 'method-chaining', 'state-transitions']
    },
    {
      id: 'rs-typestate-17',
      title: 'Write Form Validator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a type-state form that must have both name and email set before submission.',
      skeleton: `use std::marker::PhantomData;

struct NeedsName;
struct NeedsEmail;
struct Complete;

struct Form<S> {
    _s: PhantomData<S>,
    name: String,
    email: String,
}

// todo: Form<NeedsName>::new() -> Form<NeedsName>
// todo: Form<NeedsName>::set_name(self, name) -> Form<NeedsEmail>
// todo: Form<NeedsEmail>::set_email(self, email) -> Form<Complete>
// todo: Form<Complete>::submit(&self) -> String`,
      solution: `use std::marker::PhantomData;

struct NeedsName;
struct NeedsEmail;
struct Complete;

struct Form<S> {
    _s: PhantomData<S>,
    name: String,
    email: String,
}

impl Form<NeedsName> {
    fn new() -> Self {
        Form { _s: PhantomData, name: String::new(), email: String::new() }
    }

    fn set_name(self, name: &str) -> Form<NeedsEmail> {
        Form { _s: PhantomData, name: name.to_string(), email: self.email }
    }
}

impl Form<NeedsEmail> {
    fn set_email(self, email: &str) -> Form<Complete> {
        Form { _s: PhantomData, name: self.name, email: email.to_string() }
    }
}

impl Form<Complete> {
    fn submit(&self) -> String {
        format!("Submitted: {} <{}>", self.name, self.email)
    }
}`,
      hints: [
        'Each required field transition moves to the next state.',
        'submit() is only on Form<Complete>.',
        'Data carries through each transition.'
      ],
      concepts: ['type-state', 'form-validation', 'required-fields', 'builder']
    },
    {
      id: 'rs-typestate-18',
      title: 'Refactor Runtime Checks to Type-State',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor code that uses runtime state checking into a compile-time type-state pattern.',
      skeleton: `struct Printer {
    is_ready: bool,
    document: Option<String>,
}

impl Printer {
    fn new() -> Self {
        Printer { is_ready: false, document: None }
    }

    fn load(&mut self, doc: &str) {
        self.document = Some(doc.to_string());
        self.is_ready = true;
    }

    fn print(&self) -> Result<String, &'static str> {
        if !self.is_ready {
            return Err("not ready");
        }
        match &self.document {
            Some(doc) => Ok(format!("Printing: {doc}")),
            None => Err("no document"),
        }
    }
}`,
      solution: `use std::marker::PhantomData;

struct Idle;
struct Ready;

struct Printer<S> {
    _s: PhantomData<S>,
    document: String,
}

impl Printer<Idle> {
    fn new() -> Self {
        Printer { _s: PhantomData, document: String::new() }
    }

    fn load(self, doc: &str) -> Printer<Ready> {
        Printer { _s: PhantomData, document: doc.to_string() }
    }
}

impl Printer<Ready> {
    fn print(&self) -> String {
        format!("Printing: {}", self.document)
    }
}`,
      hints: [
        'Replace runtime is_ready check with type-state.',
        'load() transitions from Idle to Ready.',
        'print() only exists on Printer<Ready> - no Result needed.'
      ],
      concepts: ['type-state', 'refactoring', 'compile-time-vs-runtime']
    },
    {
      id: 'rs-typestate-19',
      title: 'Refactor Enum State to Type-State',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor an enum-based state machine into a type-state pattern.',
      skeleton: `enum TrafficLight {
    Red,
    Yellow,
    Green,
}

impl TrafficLight {
    fn new() -> Self { TrafficLight::Red }

    fn next(self) -> Self {
        match self {
            TrafficLight::Red => TrafficLight::Green,
            TrafficLight::Green => TrafficLight::Yellow,
            TrafficLight::Yellow => TrafficLight::Red,
        }
    }

    fn can_go(&self) -> bool {
        matches!(self, TrafficLight::Green)
    }
}`,
      solution: `use std::marker::PhantomData;

struct Red;
struct Yellow;
struct Green;

struct TrafficLight<S> { _s: PhantomData<S> }

impl TrafficLight<Red> {
    fn new() -> Self { TrafficLight { _s: PhantomData } }
    fn next(self) -> TrafficLight<Green> { TrafficLight { _s: PhantomData } }
}

impl TrafficLight<Green> {
    fn next(self) -> TrafficLight<Yellow> { TrafficLight { _s: PhantomData } }
    fn can_go(&self) -> bool { true }
}

impl TrafficLight<Yellow> {
    fn next(self) -> TrafficLight<Red> { TrafficLight { _s: PhantomData } }
}`,
      hints: [
        'Each enum variant becomes a separate marker struct.',
        'next() on each state returns the specific next state type.',
        'can_go() only exists on TrafficLight<Green>.'
      ],
      concepts: ['type-state', 'enum-to-typestate', 'refactoring']
    },
    {
      id: 'rs-typestate-20',
      title: 'Write Protocol Handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Model a protocol: Handshake -> Authenticated -> Streaming -> Closed, where each state has specific operations.',
      skeleton: `use std::marker::PhantomData;

struct Handshake;
struct Authenticated;
struct Streaming;
struct Closed;

struct Protocol<S> {
    _s: PhantomData<S>,
    session_id: String,
}

// todo: implement the full protocol:
// Handshake::new(id) -> start handshake
// Handshake::authenticate(self, token) -> Authenticated
// Authenticated::start_stream(self) -> Streaming
// Streaming::send(&self, data) -> String
// Streaming::close(self) -> Closed
// Closed::summary(&self) -> String
// All states: fn session_id(&self) -> &str`,
      solution: `use std::marker::PhantomData;

struct Handshake;
struct Authenticated;
struct Streaming;
struct Closed;

struct Protocol<S> {
    _s: PhantomData<S>,
    session_id: String,
}

impl<S> Protocol<S> {
    fn session_id(&self) -> &str {
        &self.session_id
    }
}

impl Protocol<Handshake> {
    fn new(id: &str) -> Self {
        Protocol { _s: PhantomData, session_id: id.to_string() }
    }

    fn authenticate(self, _token: &str) -> Protocol<Authenticated> {
        Protocol { _s: PhantomData, session_id: self.session_id }
    }
}

impl Protocol<Authenticated> {
    fn start_stream(self) -> Protocol<Streaming> {
        Protocol { _s: PhantomData, session_id: self.session_id }
    }
}

impl Protocol<Streaming> {
    fn send(&self, data: &str) -> String {
        format!("[{}] Sent: {}", self.session_id, data)
    }

    fn close(self) -> Protocol<Closed> {
        Protocol { _s: PhantomData, session_id: self.session_id }
    }
}

impl Protocol<Closed> {
    fn summary(&self) -> String {
        format!("Session {} closed", self.session_id)
    }
}`,
      hints: [
        'Use impl<S> Protocol<S> for shared methods like session_id.',
        'Each state has its own impl block with allowed operations.',
        'send() only on Streaming, summary() only on Closed.'
      ],
      concepts: ['type-state', 'protocol', 'state-machine', 'generic-impl']
    }
  ]
};
