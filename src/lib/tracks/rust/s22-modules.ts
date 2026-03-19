import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-mod',
  title: '22. Modules',
  explanation: `## Modules

Rust's module system controls visibility and organization of code.

### Defining Modules
\`\`\`rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}
\`\`\`

### Visibility
- Items are private by default
- \`pub\` makes items public
- \`pub(crate)\` -- visible within the crate
- \`pub(super)\` -- visible to parent module
- \`pub(in path)\` -- visible within a specific path

### Paths
\`\`\`rust
crate::front_of_house::hosting::add_to_waitlist(); // absolute
front_of_house::hosting::add_to_waitlist();         // relative
super::some_function();                              // parent
self::helper();                                      // current
\`\`\`

### The use Keyword
\`\`\`rust
use crate::front_of_house::hosting;
hosting::add_to_waitlist();

use std::collections::HashMap;
use std::io::{self, Write}; // multiple imports
use std::io::*;             // glob import
\`\`\`

### Re-exports
\`\`\`rust
pub use crate::front_of_house::hosting;
\`\`\`

### File-based Modules
\`\`\`
src/
  main.rs
  garden.rs        // mod garden
  garden/
    vegetables.rs  // mod garden::vegetables
\`\`\`
`,
  exercises: [
    {
      id: 'rs-mod-1',
      title: 'Basic Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define a module with a public function.',
      skeleton: `__BLANK__ math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }
}

fn main() {
    println!("{}", math::add(2, 3));
}`,
      solution: `mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }
}

fn main() {
    println!("{}", math::add(2, 3));
}`,
      hints: [
        'The mod keyword defines a module.',
        'Items inside need pub to be accessible outside.',
        'The answer is mod.',
      ],
      concepts: ['mod', 'pub', 'module definition'],
    },
    {
      id: 'rs-mod-2',
      title: 'pub Visibility',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Make a struct field public.',
      skeleton: `mod config {
    pub struct Settings {
        __BLANK__ debug: bool,
        __BLANK__ port: u16,
    }

    impl Settings {
        pub fn new() -> Self {
            Settings { debug: false, port: 8080 }
        }
    }
}

fn main() {
    let s = config::Settings::new();
    println!("debug={}, port={}", s.debug, s.port);
}`,
      solution: `mod config {
    pub struct Settings {
        pub debug: bool,
        pub port: u16,
    }

    impl Settings {
        pub fn new() -> Self {
            Settings { debug: false, port: 8080 }
        }
    }
}

fn main() {
    let s = config::Settings::new();
    println!("debug={}, port={}", s.debug, s.port);
}`,
      hints: [
        'Struct fields are private by default even if the struct is pub.',
        'Each field needs its own pub modifier.',
        'The answer is pub for both blanks.',
      ],
      concepts: ['pub', 'struct visibility', 'field access'],
    },
    {
      id: 'rs-mod-3',
      title: 'use Import',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Import a module item with use.',
      skeleton: `mod shapes {
    pub fn circle_area(r: f64) -> f64 {
        std::f64::consts::PI * r * r
    }
}

__BLANK__ shapes::circle_area;

fn main() {
    println!("{:.2}", circle_area(5.0));
}`,
      solution: `mod shapes {
    pub fn circle_area(r: f64) -> f64 {
        std::f64::consts::PI * r * r
    }
}

use shapes::circle_area;

fn main() {
    println!("{:.2}", circle_area(5.0));
}`,
      hints: [
        'use brings a path into scope.',
        'After use, you can call the function directly.',
        'The answer is use.',
      ],
      concepts: ['use', 'import', 'path shortening'],
    },
    {
      id: 'rs-mod-4',
      title: 'Nested Modules',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Access a function in a nested module.',
      skeleton: `mod network {
    pub mod server {
        pub fn start() {
            println!("Server started");
        }
    }
}

fn main() {
    network::__BLANK__::start();
}`,
      solution: `mod network {
    pub mod server {
        pub fn start() {
            println!("Server started");
        }
    }
}

fn main() {
    network::server::start();
}`,
      hints: [
        'Access nested modules with :: path separator.',
        'Both the module and function must be pub.',
        'The answer is server.',
      ],
      concepts: ['nested modules', 'path', 'pub'],
    },
    {
      id: 'rs-mod-5',
      title: 'super Keyword',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use super to access parent module items.',
      skeleton: `fn helper() -> &'static str { "from parent" }

mod child {
    pub fn call_parent() -> &'static str {
        __BLANK__::helper()
    }
}

fn main() {
    println!("{}", child::call_parent());
}`,
      solution: `fn helper() -> &'static str { "from parent" }

mod child {
    pub fn call_parent() -> &'static str {
        super::helper()
    }
}

fn main() {
    println!("{}", child::call_parent());
}`,
      hints: [
        'super refers to the parent module.',
        'It is like .. in file paths.',
        'The answer is super.',
      ],
      concepts: ['super', 'parent module', 'relative path'],
    },
    {
      id: 'rs-mod-6',
      title: 'pub(crate) Visibility',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Restrict visibility to the current crate only.',
      skeleton: `mod internal {
    __BLANK__ fn secret() -> &'static str {
        "crate-only secret"
    }
}

fn main() {
    println!("{}", internal::secret());
}`,
      solution: `mod internal {
    pub(crate) fn secret() -> &'static str {
        "crate-only secret"
    }
}

fn main() {
    println!("{}", internal::secret());
}`,
      hints: [
        'pub(crate) makes an item visible within the crate but not to dependents.',
        'It is more restrictive than pub but less than private.',
        'The answer is pub(crate).',
      ],
      concepts: ['pub(crate)', 'visibility', 'encapsulation'],
    },
    {
      id: 'rs-mod-7',
      title: 'Module with Struct',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a module with a struct and constructor.',
      skeleton: `// Create a module called 'auth' with:
// - A public struct User with public fields: username (String), role (String)
// - A public function new_user(username: &str) that creates a User with role "user"

fn main() {
    let u = auth::new_user("alice");
    println!("{} ({})", u.username, u.role);
}`,
      solution: `mod auth {
    pub struct User {
        pub username: String,
        pub role: String,
    }

    pub fn new_user(username: &str) -> User {
        User {
            username: username.to_string(),
            role: String::from("user"),
        }
    }
}

fn main() {
    let u = auth::new_user("alice");
    println!("{} ({})", u.username, u.role);
}`,
      hints: [
        'Define the module with mod auth { ... }.',
        'Mark struct, fields, and function as pub.',
        'Return a User with default role "user".',
      ],
      concepts: ['mod', 'pub struct', 'constructor function'],
    },
    {
      id: 'rs-mod-8',
      title: 'Re-export Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Re-export items from a submodule for a cleaner API.',
      skeleton: `// Create a module hierarchy:
// animals::dogs::Dog struct
// animals::cats::Cat struct
// Re-export Dog and Cat at the animals level

fn main() {
    let d = animals::Dog { name: String::from("Rex") };
    let c = animals::Cat { name: String::from("Whiskers") };
    println!("{} and {}", d.name, c.name);
}`,
      solution: `mod animals {
    pub mod dogs {
        pub struct Dog {
            pub name: String,
        }
    }

    pub mod cats {
        pub struct Cat {
            pub name: String,
        }
    }

    pub use dogs::Dog;
    pub use cats::Cat;
}

fn main() {
    let d = animals::Dog { name: String::from("Rex") };
    let c = animals::Cat { name: String::from("Whiskers") };
    println!("{} and {}", d.name, c.name);
}`,
      hints: [
        'Use pub use to re-export from submodules.',
        'This lets users access items without knowing the internal structure.',
        'Place pub use statements in the parent module.',
      ],
      concepts: ['pub use', 're-export', 'API design'],
    },
    {
      id: 'rs-mod-9',
      title: 'Private Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a module with private helpers and a public API.',
      skeleton: `// Create a module 'crypto' with:
// - A private function hash_internal that returns a formatted string
// - A public function hash(input: &str) -> String that uses hash_internal
// The private function should not be accessible from main

fn main() {
    println!("{}", crypto::hash("password"));
    // crypto::hash_internal("password"); // should not compile
}`,
      solution: `mod crypto {
    fn hash_internal(input: &str) -> u64 {
        let mut hash: u64 = 5381;
        for byte in input.bytes() {
            hash = hash.wrapping_mul(33).wrapping_add(byte as u64);
        }
        hash
    }

    pub fn hash(input: &str) -> String {
        let h = hash_internal(input);
        format!("{:016x}", h)
    }
}

fn main() {
    println!("{}", crypto::hash("password"));
}`,
      hints: [
        'Functions without pub are private to the module.',
        'The public function can call private functions within the same module.',
        'This is the encapsulation pattern in Rust.',
      ],
      concepts: ['private functions', 'encapsulation', 'public API'],
    },
    {
      id: 'rs-mod-10',
      title: 'Module Prelude',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a prelude module that re-exports commonly used items.',
      skeleton: `// Create a library-like module structure:
// mylib::types::Config
// mylib::types::Mode (enum: Debug, Release)
// mylib::utils::init
// mylib::prelude (re-exports Config, Mode, init)

use mylib::prelude::*;

fn main() {
    let config = Config { mode: Mode::Debug, verbose: true };
    init(&config);
}`,
      solution: `mod mylib {
    pub mod types {
        #[derive(Debug)]
        pub struct Config {
            pub mode: Mode,
            pub verbose: bool,
        }

        #[derive(Debug)]
        pub enum Mode {
            Debug,
            Release,
        }
    }

    pub mod utils {
        use super::types::Config;

        pub fn init(config: &Config) {
            println!("Initialized with {:?}", config);
        }
    }

    pub mod prelude {
        pub use super::types::{Config, Mode};
        pub use super::utils::init;
    }
}

use mylib::prelude::*;

fn main() {
    let config = Config { mode: Mode::Debug, verbose: true };
    init(&config);
}`,
      hints: [
        'A prelude module re-exports the most commonly used items.',
        'Use pub use to bring items from sibling modules.',
        'Users can then use mylib::prelude::* for convenience.',
      ],
      concepts: ['prelude', 'pub use', 'glob import', 'API design'],
    },
    {
      id: 'rs-mod-11',
      title: 'Multiple use Imports',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use nested use declarations to import multiple items cleanly.',
      skeleton: `// Import HashMap, HashSet, and BTreeMap in one use statement
// Create one of each and print their types

fn main() {
    todo!()
}`,
      solution: `use std::collections::{HashMap, HashSet, BTreeMap};

fn main() {
    let mut hmap: HashMap<&str, i32> = HashMap::new();
    let mut hset: HashSet<i32> = HashSet::new();
    let mut bmap: BTreeMap<i32, &str> = BTreeMap::new();

    hmap.insert("a", 1);
    hset.insert(1);
    bmap.insert(1, "one");

    println!("HashMap: {:?}", hmap);
    println!("HashSet: {:?}", hset);
    println!("BTreeMap: {:?}", bmap);
}`,
      hints: [
        'Use curly braces to import multiple items from one path.',
        'Syntax: use std::collections::{A, B, C};',
        'This avoids repeating the common prefix.',
      ],
      concepts: ['nested use', 'multiple imports', 'std::collections'],
    },
    {
      id: 'rs-mod-12',
      title: 'Alias Import',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use as to create aliases for imported items.',
      skeleton: `// Import HashMap as Map and String as Str using aliases
// Create a Map<Str, Str> and use it

fn main() {
    todo!()
}`,
      solution: `use std::collections::HashMap as Map;

fn main() {
    let mut m: Map<String, String> = Map::new();
    m.insert(String::from("key"), String::from("value"));
    println!("{:?}", m);
}`,
      hints: [
        'Use the as keyword to rename an import.',
        'Syntax: use path::Item as Alias;',
        'Note: you cannot alias built-in types like String with use.',
      ],
      concepts: ['use as', 'alias', 'import rename'],
    },
    {
      id: 'rs-mod-13',
      title: 'Private Field Access',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix access to a private struct field.',
      skeleton: `mod account {
    pub struct Account {
        balance: f64, // private!
    }

    impl Account {
        pub fn new(initial: f64) -> Self {
            Account { balance: initial }
        }
    }
}

fn main() {
    let acc = account::Account::new(100.0);
    println!("Balance: {}", acc.balance); // error: field is private
}`,
      solution: `mod account {
    pub struct Account {
        balance: f64,
    }

    impl Account {
        pub fn new(initial: f64) -> Self {
            Account { balance: initial }
        }

        pub fn balance(&self) -> f64 {
            self.balance
        }
    }
}

fn main() {
    let acc = account::Account::new(100.0);
    println!("Balance: {}", acc.balance());
}`,
      hints: [
        'Private fields should be accessed through public methods.',
        'Add a public getter method for balance.',
        'This maintains encapsulation.',
      ],
      concepts: ['encapsulation', 'getter', 'private fields'],
    },
    {
      id: 'rs-mod-14',
      title: 'Missing pub on Module',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix visibility of a nested module.',
      skeleton: `mod outer {
    mod inner {
        pub fn greet() {
            println!("Hello from inner!");
        }
    }

    pub fn call_inner() {
        inner::greet();
    }
}

fn main() {
    outer::call_inner();
    outer::inner::greet(); // error: module inner is private
}`,
      solution: `mod outer {
    pub mod inner {
        pub fn greet() {
            println!("Hello from inner!");
        }
    }

    pub fn call_inner() {
        inner::greet();
    }
}

fn main() {
    outer::call_inner();
    outer::inner::greet();
}`,
      hints: [
        'The inner module itself needs to be pub.',
        'A pub function inside a private module is still inaccessible from outside.',
        'Add pub to mod inner.',
      ],
      concepts: ['module visibility', 'pub mod', 'nested access'],
    },
    {
      id: 'rs-mod-15',
      title: 'Circular Import',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix a module design that has circular dependency issues.',
      skeleton: `mod a {
    use super::b;
    pub struct TypeA {
        pub val: i32,
    }
    pub fn use_b() -> b::TypeB {
        b::TypeB { val: 10 }
    }
}

mod b {
    use super::a;
    pub struct TypeB {
        pub val: i32,
    }
    pub fn use_a() -> a::TypeA {
        a::TypeA { val: 20 }
    }
}

fn main() {
    let a = a::use_b();
    let b = b::use_a();
    println!("{} {}", a.val, b.val);
}`,
      solution: `mod types {
    pub struct TypeA {
        pub val: i32,
    }
    pub struct TypeB {
        pub val: i32,
    }
}

mod a {
    use super::types::{TypeA, TypeB};
    pub fn use_b() -> TypeB {
        TypeB { val: 10 }
    }
}

mod b {
    use super::types::{TypeA, TypeB};
    pub fn use_a() -> TypeA {
        TypeA { val: 20 }
    }
}

fn main() {
    let a = a::use_b();
    let b = b::use_a();
    println!("{} {}", a.val, b.val);
}`,
      hints: [
        'Extract shared types into a common module.',
        'Both modules import from the shared module.',
        'This breaks the circular dependency.',
      ],
      concepts: ['module design', 'circular dependency', 'shared types'],
    },
    {
      id: 'rs-mod-16',
      title: 'Predict Module Visibility',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict which function calls compile.',
      skeleton: `mod outer {
    pub fn public_fn() { println!("public"); }
    fn private_fn() { println!("private"); }

    pub mod inner {
        pub fn inner_pub() { println!("inner public"); }
        fn inner_priv() { println!("inner private"); }
    }
}

fn main() {
    outer::public_fn();
    outer::inner::inner_pub();
    // outer::private_fn();      // Would this compile?
    // outer::inner::inner_priv(); // Would this compile?
}`,
      solution: `public
inner public`,
      hints: [
        'Only pub items are accessible from outside the module.',
        'private_fn and inner_priv are not accessible.',
        'The two uncommented calls both succeed.',
      ],
      concepts: ['visibility', 'pub', 'private'],
    },
    {
      id: 'rs-mod-17',
      title: 'Predict super Path',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of super:: references.',
      skeleton: `fn value() -> i32 { 1 }

mod a {
    pub fn value() -> i32 { 2 }

    pub mod b {
        pub fn value() -> i32 { 3 }

        pub fn test() {
            println!("{}", value());
            println!("{}", super::value());
            println!("{}", super::super::value());
        }
    }
}

fn main() {
    a::b::test();
}`,
      solution: `3
2
1`,
      hints: [
        'value() in b returns 3.',
        'super::value() goes to module a, returns 2.',
        'super::super::value() goes to the crate root, returns 1.',
      ],
      concepts: ['super', 'path resolution', 'module hierarchy'],
    },
    {
      id: 'rs-mod-18',
      title: 'Predict use Scope',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict how use affects name resolution.',
      skeleton: `mod greetings {
    pub fn hello() -> &'static str { "Hello" }
    pub fn goodbye() -> &'static str { "Goodbye" }
}

use greetings::hello;

fn main() {
    println!("{}", hello());
    println!("{}", greetings::goodbye());
}`,
      solution: `Hello
Goodbye`,
      hints: [
        'use hello brings it into scope for direct calling.',
        'goodbye still requires the full path since it was not imported.',
        'Both calls work, just with different syntax.',
      ],
      concepts: ['use', 'name resolution', 'path'],
    },
    {
      id: 'rs-mod-19',
      title: 'Refactor Flat to Nested',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor flat function organization into modules.',
      skeleton: `fn user_create(name: &str) -> String { format!("Created: {}", name) }
fn user_delete(name: &str) -> String { format!("Deleted: {}", name) }
fn post_create(title: &str) -> String { format!("Posted: {}", title) }
fn post_delete(title: &str) -> String { format!("Removed: {}", title) }

fn main() {
    println!("{}", user_create("Alice"));
    println!("{}", post_create("Hello World"));
}`,
      solution: `mod user {
    pub fn create(name: &str) -> String { format!("Created: {}", name) }
    pub fn delete(name: &str) -> String { format!("Deleted: {}", name) }
}

mod post {
    pub fn create(title: &str) -> String { format!("Posted: {}", title) }
    pub fn delete(title: &str) -> String { format!("Removed: {}", title) }
}

fn main() {
    println!("{}", user::create("Alice"));
    println!("{}", post::create("Hello World"));
}`,
      hints: [
        'Group related functions into modules.',
        'Remove the prefix from function names.',
        'Use module::function syntax for clarity.',
      ],
      concepts: ['module organization', 'namespacing', 'refactoring'],
    },
    {
      id: 'rs-mod-20',
      title: 'Refactor Visibility',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor a module to properly encapsulate internal details.',
      skeleton: `mod database {
    pub static mut CONNECTION_COUNT: u32 = 0;
    pub static mut POOL_SIZE: u32 = 10;

    pub fn connect() {
        unsafe {
            CONNECTION_COUNT += 1;
            println!("Connected ({})", CONNECTION_COUNT);
        }
    }
}

fn main() {
    database::connect();
    unsafe {
        database::CONNECTION_COUNT = 999; // should not be allowed!
    }
}`,
      solution: `mod database {
    use std::sync::atomic::{AtomicU32, Ordering};

    static CONNECTION_COUNT: AtomicU32 = AtomicU32::new(0);
    static POOL_SIZE: AtomicU32 = AtomicU32::new(10);

    pub fn connect() {
        let count = CONNECTION_COUNT.fetch_add(1, Ordering::SeqCst) + 1;
        println!("Connected ({})", count);
    }

    pub fn connection_count() -> u32 {
        CONNECTION_COUNT.load(Ordering::SeqCst)
    }
}

fn main() {
    database::connect();
    println!("Count: {}", database::connection_count());
}`,
      hints: [
        'Remove pub from mutable statics to prevent external modification.',
        'Use AtomicU32 instead of static mut for thread safety.',
        'Expose read-only access through a public function.',
      ],
      concepts: ['encapsulation', 'AtomicU32', 'static mut removal', 'visibility'],
    },
  ],
};
