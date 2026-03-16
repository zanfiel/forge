import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-pmacro',
  title: '30. Procedural Macros',
  explanation: `## Procedural Macros

Procedural macros operate on Rust syntax at compile time using TokenStreams.

### Three Kinds
1. **Derive macros**: \`#[derive(MyTrait)]\`
2. **Attribute macros**: \`#[my_attr]\`
3. **Function-like macros**: \`my_macro!(...)\`

### Derive Macro (lib.rs of proc-macro crate)
\`\`\`rust
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let gen = quote! {
        impl HelloMacro for #name {
            fn hello() { println!("Hello from {}!", stringify!(#name)); }
        }
    };
    gen.into()
}
\`\`\`

### Using syn and quote
- **syn**: Parses TokenStream into an AST
- **quote**: Generates TokenStream from Rust-like syntax
- **proc_macro2**: Re-exported types for testing

### Attribute Macro
\`\`\`rust
#[proc_macro_attribute]
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {
    // attr = the attribute arguments
    // item = the annotated item
    item // return modified or unchanged
}
\`\`\`

### Cargo.toml for proc-macro crates
\`\`\`toml
[lib]
proc-macro = true

[dependencies]
syn = { version = "2", features = ["full"] }
quote = "1"
\`\`\`
`,
  exercises: [
    {
      id: 'rs-pmacro-1',
      title: 'Proc Macro Crate Setup',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Set the correct Cargo.toml setting for a proc-macro crate.',
      skeleton: `# Cargo.toml
[lib]
__BLANK__ = true

[dependencies]
syn = { version = "2", features = ["full"] }
quote = "1"`,
      solution: `# Cargo.toml
[lib]
proc-macro = true

[dependencies]
syn = { version = "2", features = ["full"] }
quote = "1"`,
      hints: [
        'Proc-macro crates need a special [lib] setting.',
        'It tells Cargo this crate provides procedural macros.',
        'The answer is proc-macro.',
      ],
      concepts: ['proc-macro', 'Cargo.toml', 'crate-type'],
    },
    {
      id: 'rs-pmacro-2',
      title: 'Derive Attribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Apply a custom derive macro to a struct.',
      skeleton: `// Assuming HelloMacro derive is available
#[__BLANK__(HelloMacro)]
struct Pancakes;

fn main() {
    Pancakes::hello();
}`,
      solution: `#[derive(HelloMacro)]
struct Pancakes;

fn main() {
    Pancakes::hello();
}`,
      hints: [
        'Custom derive macros are applied with #[derive(...)].',
        'Just like #[derive(Debug)] or #[derive(Clone)].',
        'The answer is derive.',
      ],
      concepts: ['derive', 'custom-derive', 'attribute'],
    },
    {
      id: 'rs-pmacro-3',
      title: 'Parse Input',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Parse the input TokenStream in a derive macro.',
      skeleton: `use proc_macro::TokenStream;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(MyTrait)]
pub fn my_derive(input: TokenStream) -> TokenStream {
    let ast = __BLANK__!(input as DeriveInput);
    // use ast...
    TokenStream::new()
}`,
      solution: `use proc_macro::TokenStream;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(MyTrait)]
pub fn my_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    // use ast...
    TokenStream::new()
}`,
      hints: [
        'syn provides parse_macro_input! to parse TokenStreams.',
        'It converts raw tokens into a structured AST.',
        'The answer is parse_macro_input.',
      ],
      concepts: ['parse_macro_input', 'syn', 'DeriveInput'],
    },
    {
      id: 'rs-pmacro-4',
      title: 'Quote Code Generation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use the quote! macro to generate an impl block.',
      skeleton: `use quote::quote;
use syn::DeriveInput;

fn generate_impl(ast: &DeriveInput) -> proc_macro2::TokenStream {
    let name = &ast.ident;
    __BLANK__! {
        impl #name {
            fn name() -> &'static str {
                stringify!(#name)
            }
        }
    }
}`,
      solution: `use quote::quote;
use syn::DeriveInput;

fn generate_impl(ast: &DeriveInput) -> proc_macro2::TokenStream {
    let name = &ast.ident;
    quote! {
        impl #name {
            fn name() -> &'static str {
                stringify!(#name)
            }
        }
    }
}`,
      hints: [
        'quote! generates TokenStreams from Rust-like syntax.',
        'Use #variable to interpolate values.',
        'The answer is quote.',
      ],
      concepts: ['quote', 'code-generation', 'interpolation'],
    },
    {
      id: 'rs-pmacro-5',
      title: 'proc_macro_derive Attribute',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Mark a function as a derive macro implementation.',
      skeleton: `use proc_macro::TokenStream;

#[__BLANK__(Greet)]
pub fn greet_derive(input: TokenStream) -> TokenStream {
    // implementation
    input
}`,
      solution: `use proc_macro::TokenStream;

#[proc_macro_derive(Greet)]
pub fn greet_derive(input: TokenStream) -> TokenStream {
    // implementation
    input
}`,
      hints: [
        'Derive macros are annotated with #[proc_macro_derive(Name)].',
        'The Name in parentheses is what users write in #[derive(Name)].',
        'The answer is proc_macro_derive.',
      ],
      concepts: ['proc_macro_derive', 'derive-macro', 'registration'],
    },
    {
      id: 'rs-pmacro-6',
      title: 'Attribute Macro Signature',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write the correct attribute for an attribute macro function.',
      skeleton: `use proc_macro::TokenStream;

#[__BLANK__]
pub fn my_attr(attr: TokenStream, item: TokenStream) -> TokenStream {
    item
}`,
      solution: `use proc_macro::TokenStream;

#[proc_macro_attribute]
pub fn my_attr(attr: TokenStream, item: TokenStream) -> TokenStream {
    item
}`,
      hints: [
        'Attribute macros use #[proc_macro_attribute].',
        'They receive both the attribute args and the annotated item.',
        'The answer is proc_macro_attribute.',
      ],
      concepts: ['proc_macro_attribute', 'attribute-macro'],
    },
    {
      id: 'rs-pmacro-7',
      title: 'Simple Derive: Debug Message',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a derive macro that generates a debug_name() method returning the struct name.',
      skeleton: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

// #[derive(DebugName)] should add fn debug_name() -> &'static str
#[proc_macro_derive(DebugName)]
pub fn debug_name_derive(input: TokenStream) -> TokenStream {
    // TODO
}`,
      solution: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(DebugName)]
pub fn debug_name_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let gen = quote! {
        impl #name {
            fn debug_name() -> &'static str {
                stringify!(#name)
            }
        }
    };
    gen.into()
}`,
      hints: [
        'Parse with parse_macro_input!, get ident from ast.',
        'Use quote! to generate an impl block with the method.',
        'stringify!(#name) converts the type name to a string.',
      ],
      concepts: ['proc_macro_derive', 'quote', 'stringify', 'syn'],
    },
    {
      id: 'rs-pmacro-8',
      title: 'Derive with Generics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a derive macro that works with generic types.',
      skeleton: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

// #[derive(Describe)] adds fn describe() -> String
// Must work with generic structs: struct Foo<T> { ... }
#[proc_macro_derive(Describe)]
pub fn describe_derive(input: TokenStream) -> TokenStream {
    // TODO: handle generics
}`,
      solution: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(Describe)]
pub fn describe_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let (impl_generics, ty_generics, where_clause) = ast.generics.split_for_impl();
    let gen = quote! {
        impl #impl_generics #name #ty_generics #where_clause {
            fn describe() -> String {
                format!("Type: {}", stringify!(#name))
            }
        }
    };
    gen.into()
}`,
      hints: [
        'Use ast.generics.split_for_impl() to get generic parts.',
        'It returns (impl_generics, ty_generics, where_clause).',
        'Place them in the correct positions in the impl block.',
      ],
      concepts: ['generics', 'split_for_impl', 'proc-macro', 'DeriveInput'],
    },
    {
      id: 'rs-pmacro-9',
      title: 'Iterate Struct Fields',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a derive that iterates over struct fields to generate a field_names() method.',
      skeleton: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput, Data, Fields};

// #[derive(FieldNames)] adds fn field_names() -> Vec<&'static str>
#[proc_macro_derive(FieldNames)]
pub fn field_names_derive(input: TokenStream) -> TokenStream {
    // TODO: extract named fields and return their names
}`,
      solution: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput, Data, Fields};

#[proc_macro_derive(FieldNames)]
pub fn field_names_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let field_names = match &ast.data {
        Data::Struct(data) => match &data.fields {
            Fields::Named(fields) => {
                let names: Vec<_> = fields.named.iter().map(|f| {
                    let fname = f.ident.as_ref().unwrap();
                    quote! { stringify!(#fname) }
                }).collect();
                names
            }
            _ => vec![],
        },
        _ => vec![],
    };
    let gen = quote! {
        impl #name {
            fn field_names() -> Vec<&'static str> {
                vec![#(#field_names),*]
            }
        }
    };
    gen.into()
}`,
      hints: [
        'Match on Data::Struct then Fields::Named to get field info.',
        'Each field has an ident you can stringify.',
        'Use #(#items),* in quote! for repetition.',
      ],
      concepts: ['Data', 'Fields', 'Named', 'field-iteration', 'quote-repetition'],
    },
    {
      id: 'rs-pmacro-10',
      title: 'Function-Like Proc Macro',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a function-like procedural macro that reverses a string literal.',
      skeleton: `use proc_macro::TokenStream;
use syn::{parse_macro_input, LitStr};
use quote::quote;

// reverse!("hello") expands to "olleh"
#[proc_macro]
pub fn reverse(input: TokenStream) -> TokenStream {
    // TODO
}`,
      solution: `use proc_macro::TokenStream;
use syn::{parse_macro_input, LitStr};
use quote::quote;

#[proc_macro]
pub fn reverse(input: TokenStream) -> TokenStream {
    let lit = parse_macro_input!(input as LitStr);
    let reversed: String = lit.value().chars().rev().collect();
    let gen = quote! { #reversed };
    gen.into()
}`,
      hints: [
        'Parse the input as LitStr to get a string literal.',
        'Call .value() to get the String, reverse it.',
        'quote! can interpolate a String as a string literal.',
      ],
      concepts: ['proc_macro', 'LitStr', 'function-like-macro'],
    },
    {
      id: 'rs-pmacro-11',
      title: 'Helper Attribute',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a derive macro with a helper attribute for field-level configuration.',
      skeleton: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

// #[derive(Builder)]
// struct Config {
//     #[builder(default = "8080")]
//     port: u16,
// }
// This exercise just shows the registration of helper attributes
#[proc_macro_derive(Builder, attributes(builder))]
pub fn builder_derive(input: TokenStream) -> TokenStream {
    // TODO: parse and return empty impl for now
}`,
      solution: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(Builder, attributes(builder))]
pub fn builder_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let gen = quote! {
        impl #name {
            fn builder() -> Self {
                todo!("Builder implementation")
            }
        }
    };
    gen.into()
}`,
      hints: [
        'attributes(builder) registers #[builder] as a helper attribute.',
        'Helper attributes are consumed by the derive macro.',
        'They do not need separate proc_macro_attribute registration.',
      ],
      concepts: ['helper-attribute', 'proc_macro_derive', 'attributes'],
    },
    {
      id: 'rs-pmacro-12',
      title: 'Derive Default Impl',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a derive that generates a Default impl using default values for each field type.',
      skeleton: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput, Data, Fields};

// #[derive(MyDefault)] generates impl Default
#[proc_macro_derive(MyDefault)]
pub fn my_default_derive(input: TokenStream) -> TokenStream {
    // TODO
}`,
      solution: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput, Data, Fields};

#[proc_macro_derive(MyDefault)]
pub fn my_default_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let fields = match &ast.data {
        Data::Struct(data) => match &data.fields {
            Fields::Named(fields) => {
                let defaults: Vec<_> = fields.named.iter().map(|f| {
                    let fname = &f.ident;
                    let ftype = &f.ty;
                    quote! { #fname: <#ftype as Default>::default() }
                }).collect();
                defaults
            }
            _ => vec![],
        },
        _ => vec![],
    };
    let gen = quote! {
        impl Default for #name {
            fn default() -> Self {
                Self {
                    #(#fields),*
                }
            }
        }
    };
    gen.into()
}`,
      hints: [
        'Iterate over fields, generating name: <Type as Default>::default() for each.',
        'Use quote repetition #(#items),* to join field initializers.',
        'The generated impl calls Default::default() for each field type.',
      ],
      concepts: ['Default', 'derive', 'field-iteration', 'quote'],
    },
    {
      id: 'rs-pmacro-13',
      title: 'Bug: Wrong Return Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix a derive macro that returns the wrong type.',
      skeleton: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(Greet)]
pub fn greet_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let gen = quote! {
        impl #name {
            fn greet() { println!("Hello from {}!", stringify!(#name)); }
        }
    };
    gen // ERROR: quote! returns proc_macro2::TokenStream
}`,
      solution: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(Greet)]
pub fn greet_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let gen = quote! {
        impl #name {
            fn greet() { println!("Hello from {}!", stringify!(#name)); }
        }
    };
    gen.into()
}`,
      hints: [
        'quote! returns proc_macro2::TokenStream, not proc_macro::TokenStream.',
        'You need to convert with .into().',
        'Add .into() after gen.',
      ],
      concepts: ['TokenStream', 'proc_macro2', 'into', 'type-conversion'],
    },
    {
      id: 'rs-pmacro-14',
      title: 'Bug: Missing quote Interpolation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a quote! block that fails to interpolate the struct name.',
      skeleton: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(Named)]
pub fn named_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let gen = quote! {
        impl name {
            fn type_name() -> &'static str {
                stringify!(name)
            }
        }
    };
    gen.into()
}`,
      solution: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(Named)]
pub fn named_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let gen = quote! {
        impl #name {
            fn type_name() -> &'static str {
                stringify!(#name)
            }
        }
    };
    gen.into()
}`,
      hints: [
        'In quote!, use # prefix to interpolate variables.',
        'name without # is treated as a literal identifier.',
        'Change name to #name in both places.',
      ],
      concepts: ['quote', 'interpolation', 'hash-prefix'],
    },
    {
      id: 'rs-pmacro-15',
      title: 'Bug: Enum Not Handled',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a derive macro that panics on enums because it only handles structs.',
      skeleton: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput, Data};

#[proc_macro_derive(TypeKind)]
pub fn type_kind_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let kind = match &ast.data {
        Data::Struct(_) => "struct",
        _ => panic!("Only structs are supported!"),
    };
    let gen = quote! {
        impl #name {
            fn kind() -> &'static str { #kind }
        }
    };
    gen.into()
}`,
      solution: `use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput, Data};

#[proc_macro_derive(TypeKind)]
pub fn type_kind_derive(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let name = &ast.ident;
    let kind = match &ast.data {
        Data::Struct(_) => "struct",
        Data::Enum(_) => "enum",
        Data::Union(_) => "union",
    };
    let gen = quote! {
        impl #name {
            fn kind() -> &'static str { #kind }
        }
    };
    gen.into()
}`,
      hints: [
        'Data has three variants: Struct, Enum, Union.',
        'Handle all three instead of panicking on non-structs.',
        'Add arms for Data::Enum and Data::Union.',
      ],
      concepts: ['Data', 'Enum', 'Union', 'exhaustive-match'],
    },
    {
      id: 'rs-pmacro-16',
      title: 'Predict: Derive Expansion',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict what a derive macro generates for a given struct.',
      skeleton: `// Given this derive macro:
// #[proc_macro_derive(Hello)]
// generates: impl T { fn hello() -> String { format!("I am {}", stringify!(T)) } }

#[derive(Hello)]
struct Robot;

fn main() {
    println!("{}", Robot::hello());
}`,
      solution: `I am Robot`,
      hints: [
        'The macro generates hello() that returns "I am {name}".',
        'stringify!(Robot) produces the string "Robot".',
        'format!("I am {}", "Robot") = "I am Robot".',
      ],
      concepts: ['derive-expansion', 'stringify', 'code-generation'],
    },
    {
      id: 'rs-pmacro-17',
      title: 'Predict: Attribute Macro',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the behavior of an attribute macro that wraps a function.',
      skeleton: `// Given #[log_call] attribute macro that wraps a function to print
// "calling: {fn_name}" before executing the original body.

#[log_call]
fn add(a: i32, b: i32) -> i32 { a + b }

fn main() {
    let result = add(2, 3);
    println!("{result}");
}`,
      solution: `calling: add
5`,
      hints: [
        'The attribute macro adds a println before the function body.',
        'First "calling: add" is printed.',
        'Then the function executes and returns 5.',
      ],
      concepts: ['attribute-macro', 'function-wrapping', 'instrumentation'],
    },
    {
      id: 'rs-pmacro-18',
      title: 'Predict: Token Manipulation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict how quote! interpolation works with iterators.',
      skeleton: `// Given this proc macro helper:
// let fields = vec!["a", "b", "c"];
// quote! { vec![#(#fields.to_string()),*] }
// What does it expand to?

fn main() {
    let result = vec!["a".to_string(), "b".to_string(), "c".to_string()];
    println!("{}", result.join("-"));
}`,
      solution: `a-b-c`,
      hints: [
        '#(#fields.to_string()),* repeats for each item with commas.',
        'It generates: "a".to_string(), "b".to_string(), "c".to_string().',
        'join("-") produces "a-b-c".',
      ],
      concepts: ['quote-repetition', 'interpolation', 'expansion'],
    },
    {
      id: 'rs-pmacro-19',
      title: 'Refactor: Manual to Derive',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Show how manual trait impls could be replaced by a derive macro.',
      skeleton: `trait Summary {
    fn summary(&self) -> String;
}

struct Article {
    title: String,
    author: String,
}

impl Summary for Article {
    fn summary(&self) -> String {
        format!("Article(title={}, author={})", self.title, self.author)
    }
}

struct Tweet {
    user: String,
    body: String,
}

impl Summary for Tweet {
    fn summary(&self) -> String {
        format!("Tweet(user={}, body={})", self.user, self.body)
    }
}

fn main() {
    let a = Article { title: "Rust".into(), author: "Ferris".into() };
    println!("{}", a.summary());
}`,
      solution: `// With a #[derive(Summary)] proc macro, the above becomes:
trait Summary {
    fn summary(&self) -> String;
}

// The derive macro would generate the impl automatically
// by iterating fields and building the format string.
// Usage would be:
// #[derive(Summary)]
// struct Article { title: String, author: String }

// Equivalent generated code for Article:
struct Article {
    title: String,
    author: String,
}

impl Summary for Article {
    fn summary(&self) -> String {
        let mut parts = Vec::new();
        parts.push(format!("title={}", self.title));
        parts.push(format!("author={}", self.author));
        format!("Article({})", parts.join(", "))
    }
}

fn main() {
    let a = Article { title: "Rust".into(), author: "Ferris".into() };
    println!("{}", a.summary());
}`,
      hints: [
        'A derive macro can iterate struct fields at compile time.',
        'For each field, generate format!("name={}", self.name).',
        'Join all parts and wrap with the struct name.',
      ],
      concepts: ['derive', 'refactor', 'Summary', 'code-generation'],
    },
    {
      id: 'rs-pmacro-20',
      title: 'Refactor: Boilerplate Elimination',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Design a derive macro to eliminate repeated From<> implementations.',
      skeleton: `struct AppError(String);

impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        AppError(e.to_string())
    }
}

impl From<std::num::ParseIntError> for AppError {
    fn from(e: std::num::ParseIntError) -> Self {
        AppError(e.to_string())
    }
}

impl From<std::fmt::Error> for AppError {
    fn from(e: std::fmt::Error) -> Self {
        AppError(e.to_string())
    }
}

fn main() {
    let e: AppError = "not a number".parse::<i32>().unwrap_err().into();
    println!("{}", e.0);
}`,
      solution: `// With a proc macro, this could be:
// #[derive(FromError)]
// #[from_error(std::io::Error, std::num::ParseIntError, std::fmt::Error)]
// struct AppError(String);

// For now, use a declarative macro to reduce boilerplate:
macro_rules! impl_from_error {
    ($target:ty, $( $source:ty ),* $(,)?) => {
        $(
            impl From<$source> for $target {
                fn from(e: $source) -> Self {
                    Self(e.to_string())
                }
            }
        )*
    };
}

struct AppError(String);

impl_from_error!(AppError,
    std::io::Error,
    std::num::ParseIntError,
    std::fmt::Error,
);

fn main() {
    let e: AppError = "not a number".parse::<i32>().unwrap_err().into();
    println!("{}", e.0);
}`,
      hints: [
        'All three impls follow the same pattern: convert with to_string().',
        'A macro or derive can generate these from a list of types.',
        'Each error type just calls .to_string() and wraps in AppError.',
      ],
      concepts: ['From', 'error-handling', 'boilerplate', 'derive-macro'],
    },
  ],
};
