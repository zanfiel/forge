import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-cli',
  title: '47. CLI Applications',
  explanation: `## CLI Applications

Rust excels at building command-line tools. The ecosystem provides excellent crates for argument parsing, colored output, progress bars, and more.

### Clap - Argument Parsing
\`\`\`rust
use clap::Parser;

#[derive(Parser)]
#[command(name = "myapp", about = "A sample CLI")]
struct Cli {
    /// Input file path
    input: String,

    /// Output file path
    #[arg(short, long)]
    output: Option<String>,

    /// Verbose mode
    #[arg(short, long, default_value_t = false)]
    verbose: bool,
}

fn main() {
    let cli = Cli::parse();
    println!("Input: {}", cli.input);
}
\`\`\`

### Subcommands
\`\`\`rust
#[derive(Parser)]
enum Command {
    /// Add a new item
    Add { name: String },
    /// Remove an item
    Remove { id: u32 },
    /// List all items
    List,
}
\`\`\`

### Error Handling with anyhow
\`\`\`rust
use anyhow::{Context, Result};

fn read_config(path: &str) -> Result<String> {
    std::fs::read_to_string(path)
        .context(format!("Failed to read config from {}", path))
}
\`\`\`

### Exit Codes
\`\`\`rust
use std::process::ExitCode;

fn main() -> ExitCode {
    if everything_ok() {
        ExitCode::SUCCESS
    } else {
        ExitCode::FAILURE
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-cli-1',
      title: 'Clap Parser Derive',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use clap derive macro to define a CLI struct.',
      skeleton: `use clap::Parser;

#[derive(__BLANK__)]
struct Cli {
    /// Name to greet
    name: String,
}

fn main() {
    let cli = Cli::parse();
    println!("Hello, {}!", cli.name);
}`,
      solution: `use clap::Parser;

#[derive(Parser)]
struct Cli {
    /// Name to greet
    name: String,
}

fn main() {
    let cli = Cli::parse();
    println!("Hello, {}!", cli.name);
}`,
      hints: [
        'Clap uses a derive macro similar to serde.',
        'The derive macro is called Parser.',
        '#[derive(Parser)] generates the argument parsing code.',
      ],
      concepts: ['clap-derive', 'cli-arguments', 'parser'],
    },
    {
      id: 'rs-cli-2',
      title: 'Optional Argument',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define an optional CLI argument with clap.',
      skeleton: `use clap::Parser;

#[derive(Parser)]
struct Cli {
    input: String,

    #[arg(short, long)]
    output: __BLANK__<String>,
}`,
      solution: `use clap::Parser;

#[derive(Parser)]
struct Cli {
    input: String,

    #[arg(short, long)]
    output: Option<String>,
}`,
      hints: [
        'Optional arguments are represented by Option<T>.',
        'Clap treats Option<T> fields as optional flags.',
        'Option<String> means the user can omit --output.',
      ],
      concepts: ['optional-args', 'clap-option', 'cli-flags'],
    },
    {
      id: 'rs-cli-3',
      title: 'Boolean Flag',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define a boolean flag that defaults to false.',
      skeleton: `use clap::Parser;

#[derive(Parser)]
struct Cli {
    /// Enable verbose output
    #[arg(short, long, __BLANK__ = false)]
    verbose: bool,
}`,
      solution: `use clap::Parser;

#[derive(Parser)]
struct Cli {
    /// Enable verbose output
    #[arg(short, long, default_value_t = false)]
    verbose: bool,
}`,
      hints: [
        'Clap supports default values for arguments.',
        'default_value_t sets a typed default value.',
        'default_value_t = false makes the flag default to false.',
      ],
      concepts: ['clap-defaults', 'bool-flag', 'default-value-t'],
    },
    {
      id: 'rs-cli-4',
      title: 'Anyhow Context',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add context to an error using anyhow.',
      skeleton: `use anyhow::{Context, Result};

fn read_file(path: &str) -> Result<String> {
    std::fs::read_to_string(path)
        .__BLANK__(format!("Failed to read {}", path))
}`,
      solution: `use anyhow::{Context, Result};

fn read_file(path: &str) -> Result<String> {
    std::fs::read_to_string(path)
        .context(format!("Failed to read {}", path))
}`,
      hints: [
        'anyhow::Context provides the .context() method.',
        'It wraps errors with additional context messages.',
        '.context("message") adds human-readable context to errors.',
      ],
      concepts: ['anyhow-context', 'error-context', 'error-handling'],
    },
    {
      id: 'rs-cli-5',
      title: 'Exit Code Return',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Return proper exit codes from main.',
      skeleton: `use std::process::ExitCode;

fn main() -> __BLANK__ {
    let args: Vec<String> = std::env::args().collect();
    if args.len() < 2 {
        eprintln!("Usage: app <input>");
        return ExitCode::FAILURE;
    }
    println!("Processing: {}", args[1]);
    ExitCode::SUCCESS
}`,
      solution: `use std::process::ExitCode;

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().collect();
    if args.len() < 2 {
        eprintln!("Usage: app <input>");
        return ExitCode::FAILURE;
    }
    println!("Processing: {}", args[1]);
    ExitCode::SUCCESS
}`,
      hints: [
        'main() can return ExitCode for explicit exit status.',
        'ExitCode::SUCCESS is 0, ExitCode::FAILURE is 1.',
        'The return type is ExitCode.',
      ],
      concepts: ['exit-code', 'main-return', 'process-exit'],
    },
    {
      id: 'rs-cli-6',
      title: 'Subcommand Enum',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define subcommands using a clap enum.',
      skeleton: `use clap::{Parser, __BLANK__};

#[derive(Parser)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    Add { name: String },
    Remove { id: u32 },
    List,
}`,
      solution: `use clap::{Parser, Subcommand};

#[derive(Parser)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    Add { name: String },
    Remove { id: u32 },
    List,
}`,
      hints: [
        'Clap has a Subcommand derive macro for enum variants.',
        'Import Subcommand from clap.',
        'use clap::{Parser, Subcommand};',
      ],
      concepts: ['clap-subcommand', 'cli-commands', 'enum-dispatch'],
    },
    {
      id: 'rs-cli-7',
      title: 'Build a Greeter CLI',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a complete CLI struct with clap that greets a user.',
      skeleton: `use clap::Parser;

// Define a Cli struct with:
// - name: String (positional, required)
// - greeting: Option<String> (--greeting or -g flag)
// - shout: bool (--shout or -s flag, default false)
// Add #[command(name = "greeter", about = "A friendly greeter")]

// Then write a function 'format_greeting' that:
// Takes the cli args and returns the greeting string
// Default greeting is "Hello"
// If shout is true, return the greeting in UPPERCASE

fn format_greeting(name: &str, greeting: Option<&str>, shout: bool) -> String {
    todo!()
}`,
      solution: `use clap::Parser;

#[derive(Parser)]
#[command(name = "greeter", about = "A friendly greeter")]
struct Cli {
    /// Name of the person to greet
    name: String,

    /// Custom greeting
    #[arg(short, long)]
    greeting: Option<String>,

    /// Shout the greeting
    #[arg(short, long, default_value_t = false)]
    shout: bool,
}

fn format_greeting(name: &str, greeting: Option<&str>, shout: bool) -> String {
    let g = greeting.unwrap_or("Hello");
    let message = format!("{}, {}!", g, name);
    if shout {
        message.to_uppercase()
    } else {
        message
    }
}`,
      hints: [
        'Use Option<String> for optional flags, bool for boolean flags.',
        'unwrap_or("Hello") provides the default greeting.',
        'Use .to_uppercase() when shout is true.',
      ],
      concepts: ['clap-struct', 'cli-design', 'string-formatting'],
    },
    {
      id: 'rs-cli-8',
      title: 'Parse and Validate Config',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function that reads and validates a config file path.',
      skeleton: `use std::path::Path;
use anyhow::{bail, Result};

// Write a function 'validate_config_path' that:
// 1. Checks if the path has a .toml or .json extension
// 2. Returns Ok(()) if valid
// 3. Returns an error with a descriptive message if invalid

fn validate_config_path(path: &str) -> Result<()> {
    todo!()
}`,
      solution: `use std::path::Path;
use anyhow::{bail, Result};

fn validate_config_path(path: &str) -> Result<()> {
    let ext = Path::new(path)
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("");

    match ext {
        "toml" | "json" => Ok(()),
        _ => bail!("Invalid config format: expected .toml or .json, got .{}", ext),
    }
}`,
      hints: [
        'Use Path::new(path).extension() to get the file extension.',
        'anyhow::bail! returns an error with a message.',
        'Match on the extension string.',
      ],
      concepts: ['path-validation', 'anyhow-bail', 'file-extensions'],
    },
    {
      id: 'rs-cli-9',
      title: 'Stdin Reader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function that reads lines from stdin or a file.',
      skeleton: `use std::io::{self, BufRead, BufReader, Read};
use std::fs::File;
use anyhow::Result;

// Write a function 'read_input' that:
// If path is Some, reads lines from that file
// If path is None, reads lines from stdin
// Returns all lines as Vec<String>

fn read_input(path: Option<&str>) -> Result<Vec<String>> {
    todo!()
}`,
      solution: `use std::io::{self, BufRead, BufReader, Read};
use std::fs::File;
use anyhow::Result;

fn read_input(path: Option<&str>) -> Result<Vec<String>> {
    let reader: Box<dyn BufRead> = match path {
        Some(p) => Box::new(BufReader::new(File::open(p)?)),
        None => Box::new(BufReader::new(io::stdin())),
    };

    let lines: Result<Vec<String>, _> = reader.lines().collect();
    Ok(lines?)
}`,
      hints: [
        'Use Box<dyn BufRead> to abstract over different input sources.',
        'BufReader wraps both File and stdin.',
        'reader.lines().collect() gathers all lines.',
      ],
      concepts: ['stdin-reading', 'trait-objects', 'input-abstraction'],
    },
    {
      id: 'rs-cli-10',
      title: 'Progress Reporter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a simple progress reporting function for CLI output.',
      skeleton: `use std::io::{self, Write};

// Write a function 'print_progress' that:
// Takes current step (usize), total steps (usize), and a message (&str)
// Prints: "[3/10] Processing file.txt" format to stderr
// Uses eprint! for progress output (not stdout)

fn print_progress(current: usize, total: usize, message: &str) {
    todo!()
}`,
      solution: `use std::io::{self, Write};

fn print_progress(current: usize, total: usize, message: &str) {
    eprint!("\r[{}/{}] {}", current, total, message);
    io::stderr().flush().unwrap();
}`,
      hints: [
        'Use eprint! to write to stderr (keeps stdout clean for data).',
        '\\r returns the cursor to the start of the line for overwriting.',
        'Flush stderr to ensure immediate output.',
      ],
      concepts: ['stderr-output', 'progress-reporting', 'line-overwrite'],
    },
    {
      id: 'rs-cli-11',
      title: 'Environment Variable Config',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a config struct that loads from environment variables with defaults.',
      skeleton: `use std::env;

struct AppConfig {
    host: String,
    port: u16,
    debug: bool,
}

// Write a function 'load_config' that:
// Reads APP_HOST (default "localhost"), APP_PORT (default 8080), APP_DEBUG (default false)
// APP_DEBUG should be true if the env var is "true" or "1"
// Returns AppConfig

fn load_config() -> AppConfig {
    todo!()
}`,
      solution: `use std::env;

struct AppConfig {
    host: String,
    port: u16,
    debug: bool,
}

fn load_config() -> AppConfig {
    let host = env::var("APP_HOST").unwrap_or_else(|_| "localhost".to_string());
    let port = env::var("APP_PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(8080);
    let debug = env::var("APP_DEBUG")
        .map(|v| v == "true" || v == "1")
        .unwrap_or(false);

    AppConfig { host, port, debug }
}`,
      hints: [
        'std::env::var() returns Result<String, VarError>.',
        'Use unwrap_or_else for default values.',
        'Parse port with .parse::<u16>(), check debug for "true" or "1".',
      ],
      concepts: ['env-vars', 'config-loading', 'default-values'],
    },
    {
      id: 'rs-cli-12',
      title: 'Command Dispatcher',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a function that dispatches subcommands to handler functions.',
      skeleton: `// Define an enum for commands and a dispatcher

enum Command {
    Add { name: String },
    Remove { id: u32 },
    List,
}

// Write a function 'dispatch' that:
// Matches on the command and returns a descriptive string
// Add -> "Added: {name}"
// Remove -> "Removed item #{id}"
// List -> "Listing all items"

fn dispatch(cmd: Command) -> String {
    todo!()
}`,
      solution: `enum Command {
    Add { name: String },
    Remove { id: u32 },
    List,
}

fn dispatch(cmd: Command) -> String {
    match cmd {
        Command::Add { name } => format!("Added: {}", name),
        Command::Remove { id } => format!("Removed item #{}", id),
        Command::List => "Listing all items".to_string(),
    }
}`,
      hints: [
        'Use match on the Command enum.',
        'Destructure each variant to access its fields.',
        'Return formatted strings for each command.',
      ],
      concepts: ['enum-dispatch', 'pattern-matching', 'command-pattern'],
    },
    {
      id: 'rs-cli-13',
      title: 'Bug: Conflicting Short Flags',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix conflicting short argument flags in a clap struct.',
      skeleton: `use clap::Parser;

#[derive(Parser)]
struct Cli {
    // BUG: Both use -v as short flag
    #[arg(short, long)]
    verbose: bool,

    #[arg(short, long)]
    version: bool,
}`,
      solution: `use clap::Parser;

#[derive(Parser)]
struct Cli {
    #[arg(short, long)]
    verbose: bool,

    #[arg(short = 'V', long)]
    version: bool,
}`,
      hints: [
        'Both fields start with "v", so they would get the same -v short flag.',
        'Explicitly set the short flag for one of them.',
        'Use #[arg(short = \'V\', long)] to distinguish them.',
      ],
      concepts: ['clap-conflicts', 'short-flags', 'argument-naming'],
    },
    {
      id: 'rs-cli-14',
      title: 'Bug: Unwrap Without Error Message',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix poor error handling that gives no context on failure.',
      skeleton: `use std::fs;

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let path = &args[1];

    // BUG: unwrap gives unhelpful error on failure
    let content = fs::read_to_string(path).unwrap();
    println!("{}", content);
}`,
      solution: `use std::fs;
use std::process;

fn main() {
    let args: Vec<String> = std::env::args().collect();

    if args.len() < 2 {
        eprintln!("Usage: {} <file>", args[0]);
        process::exit(1);
    }

    let path = &args[1];

    let content = match fs::read_to_string(path) {
        Ok(c) => c,
        Err(e) => {
            eprintln!("Error reading '{}': {}", path, e);
            process::exit(1);
        }
    };
    println!("{}", content);
}`,
      hints: [
        'unwrap() panics with an unhelpful message.',
        'Use match or .unwrap_or_else to provide context.',
        'Also validate that args[1] exists before accessing.',
      ],
      concepts: ['error-handling', 'user-friendly-errors', 'cli-robustness'],
    },
    {
      id: 'rs-cli-15',
      title: 'Bug: Missing Newline in Output',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix a CLI tool that does not end its output with a newline.',
      skeleton: `fn main() {
    let items = vec!["apple", "banana", "cherry"];

    // BUG: print! doesn't add newline, output may be garbled
    for item in &items {
        print!("{}", item);
    }
}`,
      solution: `fn main() {
    let items = vec!["apple", "banana", "cherry"];

    for item in &items {
        println!("{}", item);
    }
}`,
      hints: [
        'print! does not append a newline character.',
        'CLI tools should output one item per line.',
        'Use println! instead of print! for proper line-separated output.',
      ],
      concepts: ['println-vs-print', 'cli-output', 'newline'],
    },
    {
      id: 'rs-cli-16',
      title: 'Predict: Args Parsing',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict what std::env::args returns.',
      skeleton: `// Running: cargo run -- hello world
fn main() {
    let args: Vec<String> = std::env::args().collect();
    println!("Count: {}", args.len());
    for (i, arg) in args.iter().enumerate() {
        if i > 0 {
            print!("{} ", arg);
        }
    }
    println!();
}`,
      solution: `Count: 3
hello world `,
      hints: [
        'args[0] is the program name, args[1..] are the arguments.',
        'With "hello world" there are 3 args total (program + 2).',
        'The loop skips args[0] and prints "hello world ".',
      ],
      concepts: ['env-args', 'cli-arguments', 'argument-indexing'],
    },
    {
      id: 'rs-cli-17',
      title: 'Predict: Error Display',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the error output of anyhow context chaining.',
      skeleton: `use anyhow::{Context, Result, anyhow};

fn inner() -> Result<()> {
    Err(anyhow!("disk full"))
}

fn outer() -> Result<()> {
    inner().context("failed to save data")
}

fn main() {
    match outer() {
        Ok(()) => println!("success"),
        Err(e) => println!("Error: {}", e),
    }
}`,
      solution: `Error: failed to save data`,
      hints: [
        '.context() wraps the error with additional context.',
        'When displayed with {}, the outermost context is shown.',
        'The display shows "Error: failed to save data".',
      ],
      concepts: ['anyhow-display', 'error-context', 'error-chaining'],
    },
    {
      id: 'rs-cli-18',
      title: 'Predict: Exit Code',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict what happens with Result return from main.',
      skeleton: `use std::num::ParseIntError;

fn main() -> Result<(), ParseIntError> {
    let number: i32 = "42".parse()?;
    println!("Parsed: {}", number);
    Ok(())
}`,
      solution: `Parsed: 42`,
      hints: [
        '"42" is a valid integer string.',
        'parse() succeeds and returns Ok(42).',
        'The ? operator unwraps Ok, so it prints "Parsed: 42".',
      ],
      concepts: ['main-result', 'parse', 'question-mark-operator'],
    },
    {
      id: 'rs-cli-19',
      title: 'Refactor: Panic to Result',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor a function that panics on error to return Result.',
      skeleton: `fn process_file(path: &str) -> String {
    let content = std::fs::read_to_string(path).unwrap();
    let lines: Vec<&str> = content.lines().collect();
    let count = lines.len();
    format!("{} has {} lines", path, count)
}`,
      solution: `use anyhow::{Context, Result};

fn process_file(path: &str) -> Result<String> {
    let content = std::fs::read_to_string(path)
        .context(format!("Could not read file '{}'", path))?;
    let count = content.lines().count();
    Ok(format!("{} has {} lines", path, count))
}`,
      hints: [
        'Replace unwrap() with ? and add .context() for better errors.',
        'Change the return type to Result<String>.',
        'Wrap the success value in Ok().',
      ],
      concepts: ['error-propagation', 'anyhow-result', 'unwrap-elimination'],
    },
    {
      id: 'rs-cli-20',
      title: 'Refactor: Hardcoded to Configurable',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor hardcoded values into a CLI argument structure.',
      skeleton: `fn main() {
    let host = "localhost";
    let port = 8080;
    let workers = 4;

    println!("Starting server on {}:{} with {} workers", host, port, workers);
}`,
      solution: `use clap::Parser;

#[derive(Parser)]
#[command(name = "server", about = "A configurable server")]
struct Cli {
    /// Host to bind to
    #[arg(long, default_value = "localhost")]
    host: String,

    /// Port to listen on
    #[arg(short, long, default_value_t = 8080)]
    port: u16,

    /// Number of worker threads
    #[arg(short, long, default_value_t = 4)]
    workers: u32,
}

fn main() {
    let cli = Cli::parse();
    println!("Starting server on {}:{} with {} workers", cli.host, cli.port, cli.workers);
}`,
      hints: [
        'Move hardcoded values into a Cli struct with defaults.',
        'Use #[arg(default_value = ...)] for string defaults.',
        'Use #[arg(default_value_t = ...)] for numeric defaults.',
      ],
      concepts: ['cli-configuration', 'clap-defaults', 'hardcoded-elimination'],
    },
  ],
};
