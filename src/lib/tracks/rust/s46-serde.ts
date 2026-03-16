import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-serde',
  title: '46. Serde Serialization',
  explanation: `## Serde Serialization

Serde is Rust's serialization/deserialization framework. It works with JSON, TOML, YAML, MessagePack, and many other formats.

### Derive Macros
\`\`\`rust
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct User {
    name: String,
    age: u32,
    email: Option<String>,
}
\`\`\`

### JSON with serde_json
\`\`\`rust
let user = User { name: "Alice".into(), age: 30, email: None };
let json = serde_json::to_string(&user).unwrap();
// {"name":"Alice","age":30,"email":null}

let parsed: User = serde_json::from_str(&json).unwrap();
\`\`\`

### Field Attributes
\`\`\`rust
#[derive(Serialize, Deserialize)]
struct Config {
    #[serde(rename = "apiKey")]
    api_key: String,

    #[serde(default)]
    retries: u32,

    #[serde(skip_serializing_if = "Option::is_none")]
    timeout: Option<u64>,
}
\`\`\`

### Enum Representations
\`\`\`rust
#[derive(Serialize, Deserialize)]
#[serde(tag = "type")]
enum Message {
    Text { content: String },
    Image { url: String, width: u32 },
}
// {"type":"Text","content":"hello"}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-serde-1',
      title: 'Derive Serialize',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Add the Serialize derive to a struct.',
      skeleton: `use serde::Serialize;

#[derive(__BLANK__)]
struct Point {
    x: f64,
    y: f64,
}`,
      solution: `use serde::Serialize;

#[derive(Serialize)]
struct Point {
    x: f64,
    y: f64,
}`,
      hints: [
        'Serde uses derive macros to generate serialization code.',
        'The derive macro name matches the trait.',
        '#[derive(Serialize)] implements the Serialize trait.',
      ],
      concepts: ['serde-derive', 'serialize', 'derive-macros'],
    },
    {
      id: 'rs-serde-2',
      title: 'Deserialize from JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Deserialize a JSON string into a struct.',
      skeleton: `use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct Config {
    host: String,
    port: u16,
}

fn main() {
    let json = r#"{"host":"localhost","port":8080}"#;
    let config: Config = serde_json::__BLANK__(json).unwrap();
    println!("{:?}", config);
}`,
      solution: `use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct Config {
    host: String,
    port: u16,
}

fn main() {
    let json = r#"{"host":"localhost","port":8080}"#;
    let config: Config = serde_json::from_str(json).unwrap();
    println!("{:?}", config);
}`,
      hints: [
        'serde_json provides functions to parse JSON strings.',
        'from_str() parses a &str into a type implementing Deserialize.',
        'serde_json::from_str(json) parses the JSON string.',
      ],
      concepts: ['serde-json', 'deserialize', 'from-str'],
    },
    {
      id: 'rs-serde-3',
      title: 'Serialize to JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Serialize a struct to a JSON string.',
      skeleton: `use serde::Serialize;

#[derive(Serialize)]
struct Item {
    name: String,
    price: f64,
}

fn main() {
    let item = Item { name: "Widget".into(), price: 9.99 };
    let json = serde_json::__BLANK__(&item).unwrap();
    println!("{}", json);
}`,
      solution: `use serde::Serialize;

#[derive(Serialize)]
struct Item {
    name: String,
    price: f64,
}

fn main() {
    let item = Item { name: "Widget".into(), price: 9.99 };
    let json = serde_json::to_string(&item).unwrap();
    println!("{}", json);
}`,
      hints: [
        'serde_json::to_string() serializes to a JSON String.',
        'It takes a reference to the value.',
        'serde_json::to_string(&item) produces the JSON output.',
      ],
      concepts: ['serde-json', 'serialize', 'to-string'],
    },
    {
      id: 'rs-serde-4',
      title: 'Rename Field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use serde rename attribute to change field name in JSON.',
      skeleton: `use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct ApiResponse {
    #[serde(__BLANK__ = "statusCode")]
    status_code: u16,
    body: String,
}`,
      solution: `use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct ApiResponse {
    #[serde(rename = "statusCode")]
    status_code: u16,
    body: String,
}`,
      hints: [
        'Serde field attributes control serialization behavior.',
        'The rename attribute changes the serialized name.',
        '#[serde(rename = "statusCode")] maps the Rust field to camelCase.',
      ],
      concepts: ['serde-rename', 'field-attributes', 'json-naming'],
    },
    {
      id: 'rs-serde-5',
      title: 'Default Values',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use serde default attribute for missing fields.',
      skeleton: `use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct Settings {
    name: String,
    #[serde(__BLANK__)]
    retries: u32,
}

fn main() {
    let json = r#"{"name":"app"}"#;
    let s: Settings = serde_json::from_str(json).unwrap();
    println!("{:?}", s); // retries will be 0 (u32 default)
}`,
      solution: `use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct Settings {
    name: String,
    #[serde(default)]
    retries: u32,
}

fn main() {
    let json = r#"{"name":"app"}"#;
    let s: Settings = serde_json::from_str(json).unwrap();
    println!("{:?}", s);
}`,
      hints: [
        '#[serde(default)] uses the type\'s Default implementation for missing fields.',
        'For u32, the default value is 0.',
        '#[serde(default)] makes the field optional during deserialization.',
      ],
      concepts: ['serde-default', 'optional-fields', 'deserialization'],
    },
    {
      id: 'rs-serde-6',
      title: 'Skip Serializing None',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Skip serializing None values in Option fields.',
      skeleton: `use serde::Serialize;

#[derive(Serialize)]
struct Profile {
    name: String,
    #[serde(__BLANK__ = "Option::is_none")]
    bio: Option<String>,
}

fn main() {
    let p = Profile { name: "Alice".into(), bio: None };
    let json = serde_json::to_string(&p).unwrap();
    println!("{}", json);
    // {"name":"Alice"} -- bio is omitted
}`,
      solution: `use serde::Serialize;

#[derive(Serialize)]
struct Profile {
    name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    bio: Option<String>,
}

fn main() {
    let p = Profile { name: "Alice".into(), bio: None };
    let json = serde_json::to_string(&p).unwrap();
    println!("{}", json);
}`,
      hints: [
        'skip_serializing_if takes a path to a function returning bool.',
        'Option::is_none returns true when the value is None.',
        '#[serde(skip_serializing_if = "Option::is_none")] omits null fields.',
      ],
      concepts: ['serde-skip', 'option-serialization', 'clean-json'],
    },
    {
      id: 'rs-serde-7',
      title: 'Serialize an Enum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define and serialize a tagged enum with serde.',
      skeleton: `use serde::Serialize;

// Define an enum 'Shape' with #[serde(tag = "type")] that has:
// - Circle { radius: f64 }
// - Rectangle { width: f64, height: f64 }
// Derive Serialize and Debug

// Then write a function 'shape_to_json' that takes a &Shape and returns a String
`,
      solution: `use serde::Serialize;

#[derive(Serialize, Debug)]
#[serde(tag = "type")]
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
}

fn shape_to_json(shape: &Shape) -> String {
    serde_json::to_string(shape).unwrap()
}`,
      hints: [
        '#[serde(tag = "type")] adds a "type" field to the JSON.',
        'Each variant becomes a different value for the "type" key.',
        'serde_json::to_string(shape).unwrap() serializes the enum.',
      ],
      concepts: ['serde-enum', 'tagged-enum', 'json-serialization'],
    },
    {
      id: 'rs-serde-8',
      title: 'Custom Deserializer Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a custom deserialization function for a field.',
      skeleton: `use serde::{Deserialize, Deserializer};

// Write a function 'deserialize_bool_from_string' that:
// Deserializes "true"/"false" strings as bool values
// Use as: #[serde(deserialize_with = "deserialize_bool_from_string")]

fn deserialize_bool_from_string<'de, D>(deserializer: D) -> Result<bool, D::Error>
where
    D: Deserializer<'de>,
{
    todo!()
}`,
      solution: `use serde::{Deserialize, Deserializer};
use serde::de::Error;

fn deserialize_bool_from_string<'de, D>(deserializer: D) -> Result<bool, D::Error>
where
    D: Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    match s.as_str() {
        "true" => Ok(true),
        "false" => Ok(false),
        other => Err(D::Error::custom(format!("expected true or false, got {}", other))),
    }
}`,
      hints: [
        'First deserialize the value as a String.',
        'Then match on the string content to produce a bool.',
        'Use D::Error::custom() for error messages.',
      ],
      concepts: ['custom-deserializer', 'serde-with', 'type-coercion'],
    },
    {
      id: 'rs-serde-9',
      title: 'Flatten Nested Structs',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use serde flatten to merge nested struct fields.',
      skeleton: `use serde::{Serialize, Deserialize};

// Define two structs:
// 1. Metadata with fields: created_at (String), updated_at (String)
// 2. Document with fields: title (String), content (String)
//    and a flattened Metadata field
// Both should derive Serialize, Deserialize, Debug
// The JSON should be flat: {"title":"...","content":"...","created_at":"...","updated_at":"..."}
`,
      solution: `use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct Metadata {
    created_at: String,
    updated_at: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Document {
    title: String,
    content: String,
    #[serde(flatten)]
    metadata: Metadata,
}`,
      hints: [
        '#[serde(flatten)] merges the nested struct fields into the parent.',
        'The Metadata fields appear at the same level as Document fields.',
        'Add #[serde(flatten)] above the metadata field.',
      ],
      concepts: ['serde-flatten', 'nested-structs', 'json-structure'],
    },
    {
      id: 'rs-serde-10',
      title: 'Parse JSON Value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Work with serde_json::Value for dynamic JSON.',
      skeleton: `use serde_json::Value;

// Write a function 'extract_name' that:
// Takes a JSON string
// Parses it into a serde_json::Value
// Returns the "name" field as an Option<String>
// Returns None if the field doesn't exist or isn't a string

fn extract_name(json: &str) -> Option<String> {
    todo!()
}`,
      solution: `use serde_json::Value;

fn extract_name(json: &str) -> Option<String> {
    let value: Value = serde_json::from_str(json).ok()?;
    value.get("name")?.as_str().map(String::from)
}`,
      hints: [
        'Parse the string into a Value with serde_json::from_str.',
        'Use .get("name") to access a field on the Value.',
        'Use .as_str() to convert a Value to &str, then map to String.',
      ],
      concepts: ['serde-value', 'dynamic-json', 'option-chaining'],
    },
    {
      id: 'rs-serde-11',
      title: 'Serialize with Custom Format',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a struct that serializes to pretty-printed JSON.',
      skeleton: `use serde::Serialize;

#[derive(Serialize)]
struct Report {
    title: String,
    items: Vec<String>,
    total: f64,
}

// Write a function 'to_pretty_json' that serializes a Report
// to a pretty-printed JSON string (with indentation)

fn to_pretty_json(report: &Report) -> String {
    todo!()
}`,
      solution: `use serde::Serialize;

#[derive(Serialize)]
struct Report {
    title: String,
    items: Vec<String>,
    total: f64,
}

fn to_pretty_json(report: &Report) -> String {
    serde_json::to_string_pretty(report).unwrap()
}`,
      hints: [
        'serde_json has a function for pretty-printed output.',
        'to_string_pretty() adds indentation to the JSON.',
        'serde_json::to_string_pretty(report).unwrap()',
      ],
      concepts: ['pretty-print', 'serde-json', 'formatting'],
    },
    {
      id: 'rs-serde-12',
      title: 'Untagged Enum',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Define an untagged enum that can deserialize from multiple JSON shapes.',
      skeleton: `use serde::{Serialize, Deserialize};

// Define an enum 'StringOrNumber' with #[serde(untagged)] that can be:
// - Text(String) - matches JSON strings
// - Number(f64) - matches JSON numbers
// Derive Serialize, Deserialize, Debug

// Write a function 'parse_flexible' that parses a JSON string into StringOrNumber
`,
      solution: `use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(untagged)]
enum StringOrNumber {
    Number(f64),
    Text(String),
}

fn parse_flexible(json: &str) -> StringOrNumber {
    serde_json::from_str(json).unwrap()
}`,
      hints: [
        '#[serde(untagged)] tries each variant in order.',
        'Put Number before Text since strings can match more broadly.',
        'Serde will try Number first, then fall back to Text.',
      ],
      concepts: ['untagged-enum', 'flexible-deserialization', 'type-coercion'],
    },
    {
      id: 'rs-serde-13',
      title: 'Bug: Missing Derive',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix a struct that cannot be serialized because it is missing the derive macro.',
      skeleton: `use serde::Serialize;

// BUG: Missing derive
struct Color {
    r: u8,
    g: u8,
    b: u8,
}

fn main() {
    let c = Color { r: 255, g: 128, b: 0 };
    let json = serde_json::to_string(&c).unwrap();
    println!("{}", json);
}`,
      solution: `use serde::Serialize;

#[derive(Serialize)]
struct Color {
    r: u8,
    g: u8,
    b: u8,
}

fn main() {
    let c = Color { r: 255, g: 128, b: 0 };
    let json = serde_json::to_string(&c).unwrap();
    println!("{}", json);
}`,
      hints: [
        'serde_json::to_string requires the type to implement Serialize.',
        'Add #[derive(Serialize)] above the struct.',
        'The derive macro generates the Serialize implementation.',
      ],
      concepts: ['serde-derive', 'compile-error', 'trait-bounds'],
    },
    {
      id: 'rs-serde-14',
      title: 'Bug: Wrong Rename',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a deserialization failure caused by incorrect rename attribute.',
      skeleton: `use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct ApiData {
    // BUG: JSON has "user_name" but we renamed to "userName"
    #[serde(rename = "userName")]
    user_name: String,
    score: i32,
}

fn main() {
    let json = r#"{"user_name":"alice","score":100}"#;
    let data: ApiData = serde_json::from_str(json).unwrap();
    println!("{:?}", data);
}`,
      solution: `use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct ApiData {
    user_name: String,
    score: i32,
}

fn main() {
    let json = r#"{"user_name":"alice","score":100}"#;
    let data: ApiData = serde_json::from_str(json).unwrap();
    println!("{:?}", data);
}`,
      hints: [
        'The rename must match the JSON key exactly.',
        'The JSON has "user_name", not "userName".',
        'Remove the rename attribute since the field name already matches.',
      ],
      concepts: ['serde-rename', 'json-field-matching', 'deserialization-error'],
    },
    {
      id: 'rs-serde-15',
      title: 'Bug: Non-Serializable Field',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a struct with a field that cannot be serialized.',
      skeleton: `use serde::Serialize;
use std::sync::Mutex;

// BUG: Mutex<i32> does not implement Serialize
#[derive(Serialize)]
struct Counter {
    name: String,
    value: Mutex<i32>,
}`,
      solution: `use serde::Serialize;
use std::sync::Mutex;

#[derive(Serialize)]
struct Counter {
    name: String,
    #[serde(skip)]
    value: Mutex<i32>,
}`,
      hints: [
        'Mutex<T> does not implement Serialize.',
        'Use #[serde(skip)] to exclude fields from serialization.',
        'Fields that cannot be serialized should be skipped.',
      ],
      concepts: ['serde-skip', 'non-serializable', 'field-exclusion'],
    },
    {
      id: 'rs-serde-16',
      title: 'Predict: JSON Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the JSON output of serializing a struct.',
      skeleton: `use serde::Serialize;

#[derive(Serialize)]
struct Pet {
    name: String,
    age: u32,
}

fn main() {
    let pet = Pet { name: "Rex".into(), age: 5 };
    println!("{}", serde_json::to_string(&pet).unwrap());
}`,
      solution: `{"name":"Rex","age":5}`,
      hints: [
        'serde_json serializes struct fields in declaration order.',
        'Strings become JSON strings, u32 becomes a JSON number.',
        'Output: {"name":"Rex","age":5}',
      ],
      concepts: ['json-serialization', 'field-order', 'serde-output'],
    },
    {
      id: 'rs-serde-17',
      title: 'Predict: Option Serialization',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict how Option fields serialize to JSON.',
      skeleton: `use serde::Serialize;

#[derive(Serialize)]
struct User {
    name: String,
    email: Option<String>,
}

fn main() {
    let u = User { name: "Bob".into(), email: None };
    println!("{}", serde_json::to_string(&u).unwrap());
}`,
      solution: `{"name":"Bob","email":null}`,
      hints: [
        'Option::None serializes to JSON null by default.',
        'Without skip_serializing_if, the field is included.',
        'Output: {"name":"Bob","email":null}',
      ],
      concepts: ['option-json', 'null-serialization', 'serde-defaults'],
    },
    {
      id: 'rs-serde-18',
      title: 'Predict: Tagged Enum Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the JSON output of a tagged enum.',
      skeleton: `use serde::Serialize;

#[derive(Serialize)]
#[serde(tag = "kind")]
enum Animal {
    Dog { breed: String },
    Cat { indoor: bool },
}

fn main() {
    let a = Animal::Cat { indoor: true };
    println!("{}", serde_json::to_string(&a).unwrap());
}`,
      solution: `{"kind":"Cat","indoor":true}`,
      hints: [
        '#[serde(tag = "kind")] adds a "kind" field with the variant name.',
        'The variant is Cat with field indoor: true.',
        'Output: {"kind":"Cat","indoor":true}',
      ],
      concepts: ['tagged-enum', 'enum-serialization', 'json-tagging'],
    },
    {
      id: 'rs-serde-19',
      title: 'Refactor: Manual JSON to Serde',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor manual JSON construction to serde serialization.',
      skeleton: `fn user_to_json(name: &str, age: u32, active: bool) -> String {
    format!(
        r#"{{"name":"{}","age":{},"active":{}}}"#,
        name, age, active
    )
}`,
      solution: `use serde::Serialize;

#[derive(Serialize)]
struct User<'a> {
    name: &'a str,
    age: u32,
    active: bool,
}

fn user_to_json(name: &str, age: u32, active: bool) -> String {
    let user = User { name, age, active };
    serde_json::to_string(&user).unwrap()
}`,
      hints: [
        'Manual format! strings are fragile and error-prone.',
        'Define a struct with Serialize and use serde_json::to_string.',
        'Serde handles escaping, formatting, and correctness.',
      ],
      concepts: ['serde-refactoring', 'type-safety', 'json-construction'],
    },
    {
      id: 'rs-serde-20',
      title: 'Refactor: Repeated Parsing to Generic',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor duplicated JSON parsing functions into a generic one.',
      skeleton: `use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct User { name: String }

#[derive(Deserialize, Debug)]
struct Config { port: u16 }

fn parse_user(json: &str) -> User {
    serde_json::from_str(json).unwrap()
}

fn parse_config(json: &str) -> Config {
    serde_json::from_str(json).unwrap()
}`,
      solution: `use serde::Deserialize;
use serde::de::DeserializeOwned;

#[derive(Deserialize, Debug)]
struct User { name: String }

#[derive(Deserialize, Debug)]
struct Config { port: u16 }

fn parse_json<T: DeserializeOwned>(json: &str) -> T {
    serde_json::from_str(json).unwrap()
}`,
      hints: [
        'Both functions do the same thing with different types.',
        'Use a generic function with a DeserializeOwned bound.',
        'fn parse_json<T: DeserializeOwned>(json: &str) -> T',
      ],
      concepts: ['generic-deserialization', 'deserialize-owned', 'code-deduplication'],
    },
  ],
};
