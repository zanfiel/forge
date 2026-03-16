import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-crate',
  title: '23. Crates & Cargo',
  explanation: `## Crates & Cargo

Cargo is Rust's build system and package manager. A **crate** is a compilation unit.

### Crate Types
- **Binary crate**: has a \`main.rs\`, produces an executable
- **Library crate**: has a \`lib.rs\`, produces a library

### Cargo.toml
\`\`\`toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
rand = "0.8"

[dev-dependencies]
criterion = "0.5"
\`\`\`

### Cargo Commands
\`\`\`
cargo new project_name    # create new project
cargo build               # compile
cargo build --release     # optimized build
cargo run                 # build and run
cargo test                # run tests
cargo check               # check without building
cargo doc --open          # generate docs
\`\`\`

### Features
\`\`\`toml
[features]
default = ["json"]
json = ["serde_json"]
xml = ["quick-xml"]
\`\`\`

### Conditional Compilation
\`\`\`rust
#[cfg(target_os = "linux")]
fn platform_specific() { }

#[cfg(feature = "json")]
mod json_support { }
\`\`\`

### Workspaces
\`\`\`toml
[workspace]
members = ["crate_a", "crate_b"]
\`\`\`
`,
  exercises: [
    {
      id: 'rs-crate-1',
      title: 'Crate Root',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Identify the entry point of a binary crate.',
      skeleton: `// The entry point of a binary crate is:
// src/__BLANK__.rs`,
      solution: `// The entry point of a binary crate is:
// src/main.rs`,
      hints: [
        'Binary crates produce executables.',
        'They need a main function.',
        'The file is main.rs.',
      ],
      concepts: ['binary crate', 'main.rs', 'entry point'],
    },
    {
      id: 'rs-crate-2',
      title: 'Library Crate Root',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Identify the root file of a library crate.',
      skeleton: `// The root file of a library crate is:
// src/__BLANK__.rs`,
      solution: `// The root file of a library crate is:
// src/lib.rs`,
      hints: [
        'Library crates are used as dependencies.',
        'They do not have a main function.',
        'The file is lib.rs.',
      ],
      concepts: ['library crate', 'lib.rs', 'crate root'],
    },
    {
      id: 'rs-crate-3',
      title: 'extern crate',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use an external crate in code (2015 edition style).',
      skeleton: `// In modern Rust (2018+), this is usually not needed.
// But in 2015 edition, you would write:
// __BLANK__ crate serde;
// In 2018+, just add to Cargo.toml and use directly:
use serde::Serialize;

#[derive(Serialize)]
struct Data {
    value: i32,
}`,
      solution: `// In modern Rust (2018+), this is usually not needed.
// But in 2015 edition, you would write:
// extern crate serde;
// In 2018+, just add to Cargo.toml and use directly:
use serde::Serialize;

#[derive(Serialize)]
struct Data {
    value: i32,
}`,
      hints: [
        'The extern keyword links external crates.',
        'In 2018+ edition, this is automatic.',
        'The answer is extern.',
      ],
      concepts: ['extern crate', 'edition', 'dependencies'],
    },
    {
      id: 'rs-crate-4',
      title: 'cfg Attribute',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use cfg for conditional compilation.',
      skeleton: `#[__BLANK__(target_os = "windows")]
fn get_path_separator() -> char { '\\\\' }

#[cfg(not(target_os = "windows"))]
fn get_path_separator() -> char { '/' }

fn main() {
    println!("Separator: {}", get_path_separator());
}`,
      solution: `#[cfg(target_os = "windows")]
fn get_path_separator() -> char { '\\\\' }

#[cfg(not(target_os = "windows"))]
fn get_path_separator() -> char { '/' }

fn main() {
    println!("Separator: {}", get_path_separator());
}`,
      hints: [
        'cfg enables conditional compilation.',
        'Only one version of the function will be compiled.',
        'The answer is cfg.',
      ],
      concepts: ['cfg', 'conditional compilation', 'target_os'],
    },
    {
      id: 'rs-crate-5',
      title: 'Feature Flag',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use a feature flag for conditional code.',
      skeleton: `#[cfg(__BLANK__ = "logging")]
fn log(msg: &str) {
    println!("[LOG] {}", msg);
}

#[cfg(not(feature = "logging"))]
fn log(_msg: &str) {
    // no-op when logging is disabled
}

fn main() {
    log("Application started");
}`,
      solution: `#[cfg(feature = "logging")]
fn log(msg: &str) {
    println!("[LOG] {}", msg);
}

#[cfg(not(feature = "logging"))]
fn log(_msg: &str) {
    // no-op when logging is disabled
}

fn main() {
    log("Application started");
}`,
      hints: [
        'Features are defined in Cargo.toml.',
        'Use cfg(feature = "name") to check.',
        'The answer is feature.',
      ],
      concepts: ['feature', 'cfg', 'conditional compilation'],
    },
    {
      id: 'rs-crate-6',
      title: 'Build Profile',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Check if running in debug or release mode.',
      skeleton: `fn main() {
    if cfg!(__BLANK__) {
        println!("Debug mode");
    } else {
        println!("Release mode");
    }
}`,
      solution: `fn main() {
    if cfg!(debug_assertions) {
        println!("Debug mode");
    } else {
        println!("Release mode");
    }
}`,
      hints: [
        'debug_assertions is enabled in debug builds.',
        'cfg! is the macro form that returns bool.',
        'The answer is debug_assertions.',
      ],
      concepts: ['debug_assertions', 'cfg!', 'build profile'],
    },
    {
      id: 'rs-crate-7',
      title: 'Cargo.toml Dependencies',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a Cargo.toml with various dependency specifications.',
      skeleton: `// Write a Cargo.toml snippet that includes:
// 1. A simple version dependency on "rand" version 0.8
// 2. serde with the "derive" feature enabled
// 3. A dev-dependency on "pretty_assertions" version 1.0

// Note: Write your answer as a TOML comment block

/*
[dependencies]
todo!()

[dev-dependencies]
todo!()
*/`,
      solution: `// Cargo.toml dependency section:

/*
[dependencies]
rand = "0.8"
serde = { version = "1.0", features = ["derive"] }

[dev-dependencies]
pretty_assertions = "1.0"
*/

fn main() {
    println!("Dependencies configured!");
}`,
      hints: [
        'Simple deps: name = "version".',
        'With features: name = { version = "x", features = ["feat"] }.',
        'Dev deps go under [dev-dependencies].',
      ],
      concepts: ['Cargo.toml', 'dependencies', 'features'],
    },
    {
      id: 'rs-crate-8',
      title: 'Workspace Config',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a workspace Cargo.toml structure.',
      skeleton: `// Write a Cargo.toml for a workspace with:
// - A binary crate "cli" in cli/
// - A library crate "core" in core/
// - A library crate "utils" in utils/
// Also show how cli would depend on core and utils

/*
todo!()
*/`,
      solution: `// Root Cargo.toml:
/*
[workspace]
members = ["cli", "core", "utils"]

[workspace.dependencies]
serde = { version = "1.0", features = ["derive"] }
*/

// cli/Cargo.toml:
/*
[package]
name = "cli"
version = "0.1.0"
edition = "2021"

[dependencies]
core = { path = "../core" }
utils = { path = "../utils" }
*/

fn main() {
    println!("Workspace configured!");
}`,
      hints: [
        'Workspaces share a target directory and Cargo.lock.',
        'Use [workspace] with members array.',
        'Local deps use path = "../crate_name".',
      ],
      concepts: ['workspace', 'members', 'path dependency'],
    },
    {
      id: 'rs-crate-9',
      title: 'Module File Organization',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Describe how file-based modules map to mod declarations.',
      skeleton: `// Given this file structure:
// src/
//   main.rs
//   config.rs
//   handlers/
//     mod.rs
//     auth.rs
//     api.rs
//
// Write the mod declarations needed in main.rs and handlers/mod.rs

// main.rs contents:
fn main() {
    // What mod declarations are needed?
    todo!()
}`,
      solution: `// main.rs:
mod config;
mod handlers;

fn main() {
    // config module is loaded from src/config.rs
    // handlers module is loaded from src/handlers/mod.rs
    // handlers::auth from src/handlers/auth.rs
    // handlers::api from src/handlers/api.rs
    println!("Modules loaded!");
}

// handlers/mod.rs would contain:
// pub mod auth;
// pub mod api;`,
      hints: [
        'mod config; looks for config.rs or config/mod.rs.',
        'mod handlers; looks for handlers.rs or handlers/mod.rs.',
        'Submodules are declared in the parent mod.rs.',
      ],
      concepts: ['file modules', 'mod.rs', 'module tree'],
    },
    {
      id: 'rs-crate-10',
      title: 'Custom Build Script',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a build.rs that sets compile-time environment variables.',
      skeleton: `// build.rs -- runs before compilation
fn main() {
    // Set a compile-time environment variable BUILD_TIME
    // Set a cfg flag "custom_feature"
    todo!()
}

// In main.rs:
// fn main() {
//     println!("Built at: {}", env!("BUILD_TIME"));
// }`,
      solution: `// build.rs
fn main() {
    let timestamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_secs();
    println!("cargo:rustc-env=BUILD_TIME={}", timestamp);
    println!("cargo:rustc-cfg=custom_feature");
    println!("cargo:rerun-if-changed=build.rs");
}

// main.rs usage:
fn main() {
    println!("Built at: {}", env!("BUILD_TIME"));

    #[cfg(custom_feature)]
    println!("Custom feature enabled!");
}`,
      hints: [
        'build.rs outputs cargo: directives to stdout.',
        'cargo:rustc-env=KEY=VALUE sets compile-time env vars.',
        'cargo:rustc-cfg=name sets cfg flags.',
      ],
      concepts: ['build.rs', 'cargo directives', 'compile-time env'],
    },
    {
      id: 'rs-crate-11',
      title: 'Feature-Gated Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a module that is only compiled when a feature is enabled.',
      skeleton: `// Create two implementations of a Logger trait:
// - SimpleLogger (always available)
// - ColorLogger (only when "color" feature is enabled)

fn main() {
    todo!()
}`,
      solution: `trait Logger {
    fn log(&self, msg: &str);
}

struct SimpleLogger;
impl Logger for SimpleLogger {
    fn log(&self, msg: &str) {
        println!("[LOG] {}", msg);
    }
}

#[cfg(feature = "color")]
struct ColorLogger;

#[cfg(feature = "color")]
impl Logger for ColorLogger {
    fn log(&self, msg: &str) {
        println!("\\x1b[32m[LOG]\\x1b[0m {}", msg);
    }
}

fn main() {
    let logger = SimpleLogger;
    logger.log("always works");

    #[cfg(feature = "color")]
    {
        let color_logger = ColorLogger;
        color_logger.log("colored output");
    }
}`,
      hints: [
        'Use #[cfg(feature = "name")] on structs, impls, and blocks.',
        'Code behind cfg is completely excluded when the feature is off.',
        'Features are opt-in capabilities.',
      ],
      concepts: ['feature gate', 'cfg', 'optional functionality'],
    },
    {
      id: 'rs-crate-12',
      title: 'Documentation Comments',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write proper doc comments with examples that cargo doc can render.',
      skeleton: `// Write a function with full doc comments including:
// - Description
// - Examples section with runnable code
// - Panics section

fn main() {
    todo!()
}`,
      solution: `/// Divides two numbers and returns the result.
///
/// # Examples
///
/// \`\`\`
/// let result = divide(10.0, 2.0);
/// assert_eq!(result, 5.0);
/// \`\`\`
///
/// # Panics
///
/// Panics if the divisor is zero.
fn divide(a: f64, b: f64) -> f64 {
    if b == 0.0 {
        panic!("Division by zero!");
    }
    a / b
}

fn main() {
    println!("{}", divide(10.0, 3.0));
}`,
      hints: [
        'Use /// for doc comments (not //).',
        'Examples in doc comments are run as tests with cargo test.',
        'Use # headers for sections like Examples, Panics, Errors.',
      ],
      concepts: ['doc comments', '///', 'cargo doc', 'doc tests'],
    },
    {
      id: 'rs-crate-13',
      title: 'Wrong Edition Feature',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix code that uses a feature not available in the specified edition.',
      skeleton: `// Cargo.toml has edition = "2015"
// This code uses 2018+ features

extern crate std; // not needed in 2018+

fn main() {
    // In 2015, you need extern crate for non-std crates
    // In 2018+, just use works
    use std::collections::HashMap;
    let mut map = HashMap::new();
    map.insert("key", "value");
    println!("{:?}", map);
}`,
      solution: `// With edition = "2021" in Cargo.toml:
// No extern crate needed

fn main() {
    use std::collections::HashMap;
    let mut map = HashMap::new();
    map.insert("key", "value");
    println!("{:?}", map);
}`,
      hints: [
        'Modern Rust (2018+) does not need extern crate for most crates.',
        'Update the edition in Cargo.toml to "2021".',
        'std is always available without extern crate.',
      ],
      concepts: ['edition', 'extern crate', 'Cargo.toml'],
    },
    {
      id: 'rs-crate-14',
      title: 'Missing Feature',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a missing feature flag in dependency configuration.',
      skeleton: `// Cargo.toml:
// [dependencies]
// serde = "1.0"
//
// This code fails because derive feature is not enabled:

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct Config {
    name: String,
    value: i32,
}

fn main() {
    let c = Config { name: "test".into(), value: 42 };
    println!("{:?}", c);
}`,
      solution: `// Cargo.toml should be:
// [dependencies]
// serde = { version = "1.0", features = ["derive"] }

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct Config {
    name: String,
    value: i32,
}

fn main() {
    let c = Config { name: "test".into(), value: 42 };
    println!("{:?}", c);
}`,
      hints: [
        'serde derive macros require the "derive" feature.',
        'Change serde = "1.0" to serde = { version = "1.0", features = ["derive"] }.',
        'Features enable optional functionality in crates.',
      ],
      concepts: ['features', 'serde', 'derive'],
    },
    {
      id: 'rs-crate-15',
      title: 'Ambiguous Dependency',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix a dependency conflict with version ranges.',
      skeleton: `// Cargo.toml has:
// [dependencies]
// tokio = { version = "1", features = ["full"] }
// actix-web = "3"  # requires tokio 0.2
//
// This creates a version conflict.
// Fix the dependency versions.

// The fix is to use compatible versions:
// actix-web 4.x uses tokio 1.x

fn main() {
    println!("Dependencies resolved!");
}`,
      solution: `// Fixed Cargo.toml:
// [dependencies]
// tokio = { version = "1", features = ["full"] }
// actix-web = "4"  # actix-web 4.x is compatible with tokio 1.x

fn main() {
    println!("Dependencies resolved!");
}`,
      hints: [
        'Major version bumps in Rust crates often change runtime dependencies.',
        'actix-web 3.x used tokio 0.2, actix-web 4.x uses tokio 1.x.',
        'Ensure all async crates use the same tokio major version.',
      ],
      concepts: ['dependency resolution', 'version conflict', 'semver'],
    },
    {
      id: 'rs-crate-16',
      title: 'Predict cfg Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict which branch of cfg! is taken.',
      skeleton: `fn main() {
    if cfg!(debug_assertions) {
        println!("debug");
    } else {
        println!("release");
    }
    println!("{}", cfg!(target_pointer_width = "64"));
}`,
      solution: `debug
true`,
      hints: [
        'By default, cargo run uses debug mode.',
        'debug_assertions is true in debug builds.',
        'Most modern systems are 64-bit.',
      ],
      concepts: ['cfg!', 'debug_assertions', 'target_pointer_width'],
    },
    {
      id: 'rs-crate-17',
      title: 'Predict env! Macro',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the behavior of compile-time environment macros.',
      skeleton: `fn main() {
    println!("{}", env!("CARGO_PKG_NAME"));
    println!("{}", env!("CARGO_PKG_VERSION"));
    // Assuming package name is "my_app" and version is "0.1.0"
}`,
      solution: `my_app
0.1.0`,
      hints: [
        'env! reads environment variables at compile time.',
        'CARGO_PKG_NAME comes from Cargo.toml [package] name.',
        'CARGO_PKG_VERSION comes from Cargo.toml [package] version.',
      ],
      concepts: ['env!', 'CARGO_PKG_NAME', 'compile-time env'],
    },
    {
      id: 'rs-crate-18',
      title: 'Predict Feature cfg',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict conditional compilation with features.',
      skeleton: `// Compiled with: cargo run --features "json"

fn main() {
    #[cfg(feature = "json")]
    println!("json enabled");

    #[cfg(feature = "xml")]
    println!("xml enabled");

    #[cfg(not(feature = "xml"))]
    println!("xml disabled");
}`,
      solution: `json enabled
xml disabled`,
      hints: [
        'Only "json" feature was passed, not "xml".',
        'cfg(feature = "json") is true.',
        'cfg(feature = "xml") is false, but not(feature = "xml") is true.',
      ],
      concepts: ['feature flags', 'cfg', 'conditional compilation'],
    },
    {
      id: 'rs-crate-19',
      title: 'Refactor to Module Crate',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor a monolithic file into a proper crate structure.',
      skeleton: `// Everything in one file:
struct Config { debug: bool }
struct Logger { verbose: bool }
struct App { config: Config, logger: Logger }

impl Config {
    fn new() -> Self { Config { debug: false } }
}
impl Logger {
    fn new(verbose: bool) -> Self { Logger { verbose } }
    fn log(&self, msg: &str) { if self.verbose { println!("{}", msg); } }
}
impl App {
    fn new() -> Self {
        App { config: Config::new(), logger: Logger::new(false) }
    }
    fn run(&self) { self.logger.log("running"); }
}

fn main() {
    let app = App::new();
    app.run();
}`,
      solution: `mod config {
    pub struct Config {
        pub debug: bool,
    }
    impl Config {
        pub fn new() -> Self { Config { debug: false } }
    }
}

mod logging {
    pub struct Logger {
        pub verbose: bool,
    }
    impl Logger {
        pub fn new(verbose: bool) -> Self { Logger { verbose } }
        pub fn log(&self, msg: &str) { if self.verbose { println!("{}", msg); } }
    }
}

mod app {
    use super::config::Config;
    use super::logging::Logger;

    pub struct App {
        config: Config,
        logger: Logger,
    }
    impl App {
        pub fn new() -> Self {
            App { config: Config::new(), logger: Logger::new(false) }
        }
        pub fn run(&self) { self.logger.log("running"); }
    }
}

fn main() {
    let a = app::App::new();
    a.run();
}`,
      hints: [
        'Separate concerns into distinct modules.',
        'Each module owns its types and implementations.',
        'Use super:: to reference items from sibling modules.',
      ],
      concepts: ['module organization', 'separation of concerns', 'refactoring'],
    },
    {
      id: 'rs-crate-20',
      title: 'Refactor Dependencies',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor hard-coded behavior into feature-gated optional functionality.',
      skeleton: `// This code always includes JSON and YAML support
// Refactor to make them optional features

fn serialize_json(data: &str) -> String {
    format!("{{\"data\": \"{}\"}}", data)
}

fn serialize_yaml(data: &str) -> String {
    format!("data: {}", data)
}

fn main() {
    println!("{}", serialize_json("hello"));
    println!("{}", serialize_yaml("hello"));
}`,
      solution: `#[cfg(feature = "json")]
fn serialize_json(data: &str) -> String {
    format!("{{\"data\": \"{}\"}}", data)
}

#[cfg(feature = "yaml")]
fn serialize_yaml(data: &str) -> String {
    format!("data: {}", data)
}

fn serialize_plain(data: &str) -> String {
    data.to_string()
}

fn main() {
    println!("{}", serialize_plain("hello"));

    #[cfg(feature = "json")]
    println!("{}", serialize_json("hello"));

    #[cfg(feature = "yaml")]
    println!("{}", serialize_yaml("hello"));
}`,
      hints: [
        'Use #[cfg(feature = "name")] to gate each serializer.',
        'Provide a plain/default implementation always available.',
        'Corresponding Cargo.toml features would list the feature names.',
      ],
      concepts: ['feature gates', 'optional functionality', 'cfg', 'refactoring'],
    },
  ],
};
