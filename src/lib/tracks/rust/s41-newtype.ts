import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-newtype',
  title: '41. Newtype Pattern',
  explanation: `## Newtype Pattern

The newtype pattern wraps an existing type in a single-field tuple struct to create a distinct type with different semantics.

### Basic Newtype
\`\`\`rust
struct Meters(f64);
struct Seconds(f64);

// These are different types - cannot accidentally mix them
let distance = Meters(100.0);
let time = Seconds(9.58);
\`\`\`

### Benefits
- **Type safety**: prevents mixing logically different values
- **Abstraction**: hide implementation details
- **Trait implementations**: implement foreign traits on foreign types
- **Zero-cost**: compiled away, no runtime overhead

### Implementing Traits on Foreign Types
\`\`\`rust
struct Wrapper(Vec<String>);

impl std::fmt::Display for Wrapper {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "[{}]", self.0.join(", "))
    }
}
\`\`\`

### Accessing the Inner Value
\`\`\`rust
struct Email(String);

impl Email {
    fn as_str(&self) -> &str { &self.0 }
    fn into_inner(self) -> String { self.0 }
}
\`\`\`

### Common Uses
- Units: \`Meters\`, \`Kilograms\`, \`Celsius\`
- Validated types: \`Email\`, \`PhoneNumber\`, \`NonEmpty<T>\`
- Domain types: \`UserId(u64)\`, \`OrderId(u64)\`
`,
  exercises: [
    {
      id: 'rs-newtype-1',
      title: 'Define a Newtype',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define a newtype wrapper around f64 for kilometers.',
      skeleton: `struct Kilometers(__BLANK__);

fn main() {
    let dist = Kilometers(42.195);
    println!("Marathon: {} km", dist.0);
}`,
      solution: `struct Kilometers(f64);

fn main() {
    let dist = Kilometers(42.195);
    println!("Marathon: {} km", dist.0);
}`,
      hints: [
        'A newtype is a tuple struct with a single field.',
        'The inner type for distance is f64.',
        'struct Kilometers(f64);'
      ],
      concepts: ['newtype', 'tuple-struct', 'type-safety']
    },
    {
      id: 'rs-newtype-2',
      title: 'Access Inner Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Access the inner value of a newtype.',
      skeleton: `struct UserId(u64);

fn main() {
    let id = UserId(12345);
    println!("User ID: {}", id.__BLANK__);
}`,
      solution: `struct UserId(u64);

fn main() {
    let id = UserId(12345);
    println!("User ID: {}", id.0);
}`,
      hints: [
        'Tuple struct fields are accessed by index.',
        'The first (and only) field is at index 0.',
        'id.0 accesses the inner u64.'
      ],
      concepts: ['newtype', 'field-access', 'tuple-struct']
    },
    {
      id: 'rs-newtype-3',
      title: 'Newtype Constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a validated newtype with a constructor.',
      skeleton: `struct Percentage(f64);

impl Percentage {
    fn new(value: f64) -> Option<Self> {
        if value >= 0.0 && value <= 100.0 {
            __BLANK__
        } else {
            None
        }
    }
}`,
      solution: `struct Percentage(f64);

impl Percentage {
    fn new(value: f64) -> Option<Self> {
        if value >= 0.0 && value <= 100.0 {
            Some(Percentage(value))
        } else {
            None
        }
    }
}`,
      hints: [
        'Wrap valid values in Some(Percentage(value)).',
        'The constructor validates before creating.',
        'Some(Percentage(value))'
      ],
      concepts: ['newtype', 'validation', 'option', 'constructor']
    },
    {
      id: 'rs-newtype-4',
      title: 'Predict Newtype Safety',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict whether newtypes prevent type confusion.',
      skeleton: `struct Celsius(f64);
struct Fahrenheit(f64);

fn print_temp(t: Celsius) {
    println!("{:.1}C", t.0);
}

fn main() {
    let temp = Celsius(100.0);
    print_temp(temp);
}`,
      solution: '100.0C',
      hints: [
        'Celsius and Fahrenheit are different types.',
        'print_temp accepts Celsius, and we pass Celsius.',
        'Output: 100.0C.'
      ],
      concepts: ['newtype', 'type-safety', 'compile-time-check']
    },
    {
      id: 'rs-newtype-5',
      title: 'Implement Display for Newtype',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement Display for a newtype to format it nicely.',
      skeleton: `use std::fmt;

struct Email(String);

impl fmt::Display for Email {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, __BLANK__)
    }
}

fn main() {
    let e = Email(String::from("user@example.com"));
    println!("{e}");
}`,
      solution: `use std::fmt;

struct Email(String);

impl fmt::Display for Email {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

fn main() {
    let e = Email(String::from("user@example.com"));
    println!("{e}");
}`,
      hints: [
        'Access the inner String with self.0.',
        'Use write!(f, "{}", self.0) to format it.',
        'Display lets you use {} formatting.'
      ],
      concepts: ['newtype', 'display', 'formatting']
    },
    {
      id: 'rs-newtype-6',
      title: 'Write Unit Newtype',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create Meters and Seconds newtypes with a speed calculation function.',
      skeleton: `// todo: define Meters(f64) and Seconds(f64) newtypes

// todo: write fn speed(distance: Meters, time: Seconds) -> f64
// that returns meters per second`,
      solution: `struct Meters(f64);
struct Seconds(f64);

fn speed(distance: Meters, time: Seconds) -> f64 {
    distance.0 / time.0
}`,
      hints: [
        'Define each as a tuple struct wrapping f64.',
        'Access inner values with .0.',
        'Speed = distance / time.'
      ],
      concepts: ['newtype', 'type-safety', 'units']
    },
    {
      id: 'rs-newtype-7',
      title: 'Newtype with Deref',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a Name newtype that derefs to str for easy use.',
      skeleton: `use std::ops::Deref;

struct Name(String);

// todo: implement Deref for Name targeting str
// todo: implement Name::new(s: &str) -> Self`,
      solution: `use std::ops::Deref;

struct Name(String);

impl Name {
    fn new(s: &str) -> Self {
        Name(s.to_string())
    }
}

impl Deref for Name {
    type Target = str;
    fn deref(&self) -> &str {
        &self.0
    }
}`,
      hints: [
        'Deref to str so Name can be used where &str is expected.',
        'type Target = str; fn deref(&self) -> &str { &self.0 }',
        'This allows calling String methods on Name through auto-deref.'
      ],
      concepts: ['newtype', 'deref', 'ergonomics']
    },
    {
      id: 'rs-newtype-8',
      title: 'Fix Newtype Type Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the code that accidentally passes the wrong newtype.',
      skeleton: `struct Dollars(f64);
struct Euros(f64);

fn charge(amount: Dollars) -> String {
    format!("Charged \${:.2}", amount.0)
}

fn main() {
    let price = Euros(29.99);
    println!("{}", charge(price));
}`,
      solution: `struct Dollars(f64);
struct Euros(f64);

fn charge(amount: Dollars) -> String {
    format!("Charged \${:.2}", amount.0)
}

fn main() {
    let price = Dollars(29.99);
    println!("{}", charge(price));
}`,
      hints: [
        'charge() expects Dollars but receives Euros.',
        'Either change the variable to Dollars or convert.',
        'The simplest fix: let price = Dollars(29.99);'
      ],
      concepts: ['newtype', 'type-mismatch', 'type-safety']
    },
    {
      id: 'rs-newtype-9',
      title: 'Newtype with From',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement From conversions for a newtype.',
      skeleton: `struct PositiveInt(u32);

// todo: implement From<u32> for PositiveInt
// todo: implement From<PositiveInt> for u32

// todo: implement PositiveInt::value(&self) -> u32`,
      solution: `struct PositiveInt(u32);

impl From<u32> for PositiveInt {
    fn from(n: u32) -> Self {
        PositiveInt(n)
    }
}

impl From<PositiveInt> for u32 {
    fn from(p: PositiveInt) -> Self {
        p.0
    }
}

impl PositiveInt {
    fn value(&self) -> u32 {
        self.0
    }
}`,
      hints: [
        'From<u32> wraps the value in PositiveInt.',
        'From<PositiveInt> for u32 extracts with .0.',
        'This enables .into() conversions both ways.'
      ],
      concepts: ['newtype', 'from', 'into', 'conversion']
    },
    {
      id: 'rs-newtype-10',
      title: 'Fix Orphan Rule with Newtype',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the orphan rule violation by wrapping the foreign type in a newtype.',
      skeleton: `use std::fmt;

// Error: cannot implement Display for Vec<String> (orphan rule)
impl fmt::Display for Vec<String> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}]", self.join(", "))
    }
}

fn main() {
    let v = vec!["a".to_string(), "b".to_string()];
    println!("{v}");
}`,
      solution: `use std::fmt;

struct StringList(Vec<String>);

impl fmt::Display for StringList {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}]", self.0.join(", "))
    }
}

fn main() {
    let v = StringList(vec!["a".to_string(), "b".to_string()]);
    println!("{v}");
}`,
      hints: [
        'The orphan rule prevents implementing foreign traits on foreign types.',
        'Wrap Vec<String> in a newtype struct.',
        'Now you own the type and can implement Display on it.'
      ],
      concepts: ['newtype', 'orphan-rule', 'display', 'foreign-types']
    },
    {
      id: 'rs-newtype-11',
      title: 'Predict Newtype Comparison',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of comparing newtypes.',
      skeleton: `#[derive(PartialEq, Debug)]
struct Score(u32);

fn main() {
    let a = Score(100);
    let b = Score(100);
    let c = Score(50);
    println!("{} {}", a == b, a == c);
}`,
      solution: 'true false',
      hints: [
        'PartialEq is derived, comparing inner values.',
        'Score(100) == Score(100) is true.',
        'Score(100) == Score(50) is false.'
      ],
      concepts: ['newtype', 'partialeq', 'derive']
    },
    {
      id: 'rs-newtype-12',
      title: 'Write Validated Email',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create an Email newtype that validates the input contains @ on construction.',
      skeleton: `struct Email(String);

impl Email {
    fn new(s: &str) -> Result<Self, String> {
        // todo: validate contains '@', return Ok(Email) or Err
    }

    fn as_str(&self) -> &str {
        // todo
    }

    fn domain(&self) -> &str {
        // todo: return the part after '@'
    }
}`,
      solution: `struct Email(String);

impl Email {
    fn new(s: &str) -> Result<Self, String> {
        if s.contains('@') {
            Ok(Email(s.to_string()))
        } else {
            Err(format!("invalid email: {s}"))
        }
    }

    fn as_str(&self) -> &str {
        &self.0
    }

    fn domain(&self) -> &str {
        self.0.split('@').nth(1).unwrap_or("")
    }
}`,
      hints: [
        'Check for @ with contains() before creating.',
        'as_str returns &self.0.',
        'domain splits on @ and takes the second part.'
      ],
      concepts: ['newtype', 'validation', 'result', 'domain-type']
    },
    {
      id: 'rs-newtype-13',
      title: 'Newtype Arithmetic',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement Add for a Money newtype so two Money values can be added.',
      skeleton: `use std::ops::Add;

#[derive(Debug, Clone, Copy, PartialEq)]
struct Money(f64);

// todo: implement Add for Money so Money + Money = Money
// todo: implement Money::new(amount: f64) -> Self`,
      solution: `use std::ops::Add;

#[derive(Debug, Clone, Copy, PartialEq)]
struct Money(f64);

impl Money {
    fn new(amount: f64) -> Self {
        Money(amount)
    }
}

impl Add for Money {
    type Output = Money;
    fn add(self, rhs: Money) -> Money {
        Money(self.0 + rhs.0)
    }
}`,
      hints: [
        'Implement Add with type Output = Money.',
        'The add method sums the inner f64 values.',
        'Money(self.0 + rhs.0)'
      ],
      concepts: ['newtype', 'operator-overloading', 'add-trait']
    },
    {
      id: 'rs-newtype-14',
      title: 'Predict Newtype Method',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of a newtype with custom methods.',
      skeleton: `struct Reversed(String);

impl Reversed {
    fn new(s: &str) -> Self {
        Reversed(s.chars().rev().collect())
    }
    fn value(&self) -> &str {
        &self.0
    }
}

fn main() {
    let r = Reversed::new("hello");
    println!("{}", r.value());
}`,
      solution: 'olleh',
      hints: [
        'new() reverses the input string characters.',
        '"hello" reversed is "olleh".',
        'value() returns the stored reversed string.'
      ],
      concepts: ['newtype', 'string-manipulation', 'constructor']
    },
    {
      id: 'rs-newtype-15',
      title: 'Write NonEmpty Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a NonEmpty<T> newtype that guarantees a Vec is never empty.',
      skeleton: `struct NonEmpty<T>(Vec<T>);

impl<T> NonEmpty<T> {
    fn new(items: Vec<T>) -> Option<Self> {
        // todo: return None if empty
    }

    fn first(&self) -> &T {
        // todo: safe because we know it is non-empty
    }

    fn len(&self) -> usize {
        // todo
    }

    fn into_vec(self) -> Vec<T> {
        // todo
    }
}`,
      solution: `struct NonEmpty<T>(Vec<T>);

impl<T> NonEmpty<T> {
    fn new(items: Vec<T>) -> Option<Self> {
        if items.is_empty() {
            None
        } else {
            Some(NonEmpty(items))
        }
    }

    fn first(&self) -> &T {
        &self.0[0]
    }

    fn len(&self) -> usize {
        self.0.len()
    }

    fn into_vec(self) -> Vec<T> {
        self.0
    }
}`,
      hints: [
        'Validate non-emptiness in the constructor.',
        'first() can safely index [0] because we guarantee non-empty.',
        'into_vec() consumes self and returns the inner Vec.'
      ],
      concepts: ['newtype', 'invariant', 'generic', 'safety-guarantee']
    },
    {
      id: 'rs-newtype-16',
      title: 'Fix Newtype Deref Abuse',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix the newtype that inappropriately exposes mutability through Deref.',
      skeleton: `use std::ops::{Deref, DerefMut};

struct SortedVec(Vec<i32>);

impl SortedVec {
    fn new(mut v: Vec<i32>) -> Self {
        v.sort();
        SortedVec(v)
    }
}

impl Deref for SortedVec {
    type Target = Vec<i32>;
    fn deref(&self) -> &Vec<i32> { &self.0 }
}

impl DerefMut for SortedVec {
    fn deref_mut(&mut self) -> &mut Vec<i32> { &mut self.0 }
}

fn main() {
    let mut sv = SortedVec::new(vec![3, 1, 2]);
    sv.push(0); // breaks sorted invariant!
    println!("{:?}", *sv);
}`,
      solution: `use std::ops::Deref;

struct SortedVec(Vec<i32>);

impl SortedVec {
    fn new(mut v: Vec<i32>) -> Self {
        v.sort();
        SortedVec(v)
    }

    fn insert(&mut self, val: i32) {
        let pos = self.0.binary_search(&val).unwrap_or_else(|p| p);
        self.0.insert(pos, val);
    }
}

impl Deref for SortedVec {
    type Target = [i32];
    fn deref(&self) -> &[i32] { &self.0 }
}

fn main() {
    let mut sv = SortedVec::new(vec![3, 1, 2]);
    sv.insert(0);
    println!("{:?}", &*sv);
}`,
      hints: [
        'DerefMut on SortedVec breaks the sorted invariant.',
        'Remove DerefMut and provide a safe insert method.',
        'Deref to &[i32] instead of &Vec<i32> to limit exposed API.'
      ],
      concepts: ['newtype', 'invariant', 'deref-abuse', 'encapsulation']
    },
    {
      id: 'rs-newtype-17',
      title: 'Write Secret Newtype',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a Secret<T> newtype that hides its value from Debug/Display but allows controlled access.',
      skeleton: `use std::fmt;

struct Secret<T>(T);

// todo: impl Secret<T>::new(val: T) -> Self
// todo: impl Secret<T>::expose(&self) -> &T
// todo: impl Debug for Secret<T> that prints "Secret(***)"
// todo: impl Display for Secret<T> that prints "***"`,
      solution: `use std::fmt;

struct Secret<T>(T);

impl<T> Secret<T> {
    fn new(val: T) -> Self {
        Secret(val)
    }

    fn expose(&self) -> &T {
        &self.0
    }
}

impl<T> fmt::Debug for Secret<T> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Secret(***)")
    }
}

impl<T> fmt::Display for Secret<T> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "***")
    }
}`,
      hints: [
        'Debug and Display should NOT reveal the inner value.',
        'Only expose() gives access to the wrapped value.',
        'This prevents accidental logging of secrets.'
      ],
      concepts: ['newtype', 'security', 'debug', 'display', 'encapsulation']
    },
    {
      id: 'rs-newtype-18',
      title: 'Predict Newtype Conversion',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Predict the output of From/Into conversions with newtypes.',
      skeleton: `struct Inches(f64);
struct Centimeters(f64);

impl From<Inches> for Centimeters {
    fn from(i: Inches) -> Self {
        Centimeters(i.0 * 2.54)
    }
}

fn main() {
    let inches = Inches(10.0);
    let cm: Centimeters = inches.into();
    println!("{:.1}", cm.0);
}`,
      solution: '25.4',
      hints: [
        '10 inches * 2.54 = 25.4 centimeters.',
        'From<Inches> for Centimeters enables .into().',
        'Output: 25.4.'
      ],
      concepts: ['newtype', 'from', 'into', 'unit-conversion']
    },
    {
      id: 'rs-newtype-19',
      title: 'Refactor Primitive Obsession',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor code that uses raw primitives into domain-specific newtypes.',
      skeleton: `fn create_user(name: String, email: String, age: u32) -> String {
    if !email.contains('@') {
        return "invalid email".to_string();
    }
    if age > 150 {
        return "invalid age".to_string();
    }
    format!("{name} <{email}> age {age}")
}

fn main() {
    let result = create_user("Alice".to_string(), "alice@example.com".to_string(), 30);
    println!("{result}");
}`,
      solution: `struct UserName(String);
struct Email(String);
struct Age(u32);

impl Email {
    fn new(s: &str) -> Result<Self, String> {
        if s.contains('@') { Ok(Email(s.to_string())) }
        else { Err("invalid email".to_string()) }
    }
}

impl Age {
    fn new(n: u32) -> Result<Self, String> {
        if n <= 150 { Ok(Age(n)) }
        else { Err("invalid age".to_string()) }
    }
}

fn create_user(name: UserName, email: Email, age: Age) -> String {
    format!("{} <{}> age {}", name.0, email.0, age.0)
}

fn main() {
    let email = Email::new("alice@example.com").unwrap();
    let age = Age::new(30).unwrap();
    let name = UserName("Alice".to_string());
    let result = create_user(name, email, age);
    println!("{result}");
}`,
      hints: [
        'Replace each primitive with a validated newtype.',
        'Move validation into the newtype constructors.',
        'create_user now takes typed parameters instead of raw primitives.'
      ],
      concepts: ['newtype', 'primitive-obsession', 'refactoring', 'domain-modeling']
    },
    {
      id: 'rs-newtype-20',
      title: 'Refactor to Newtype with Traits',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor duplicate ID handling code into a generic Id<T> newtype.',
      skeleton: `fn format_user_id(id: u64) -> String {
    format!("USR-{:06}", id)
}

fn format_order_id(id: u64) -> String {
    format!("ORD-{:06}", id)
}

fn main() {
    println!("{}", format_user_id(42));
    println!("{}", format_order_id(99));
}`,
      solution: `use std::fmt;
use std::marker::PhantomData;

struct User;
struct Order;

struct Id<T> {
    value: u64,
    _type: PhantomData<T>,
}

impl<T> Id<T> {
    fn new(value: u64) -> Self {
        Id { value, _type: PhantomData }
    }
}

trait IdPrefix {
    fn prefix() -> &'static str;
}

impl IdPrefix for User { fn prefix() -> &'static str { "USR" } }
impl IdPrefix for Order { fn prefix() -> &'static str { "ORD" } }

impl<T: IdPrefix> fmt::Display for Id<T> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}-{:06}", T::prefix(), self.value)
    }
}

fn main() {
    let user_id: Id<User> = Id::new(42);
    let order_id: Id<Order> = Id::new(99);
    println!("{user_id}");
    println!("{order_id}");
}`,
      hints: [
        'Use a generic Id<T> with PhantomData for the entity type.',
        'A trait can provide the prefix for each entity type.',
        'Display impl uses the trait to format the ID.'
      ],
      concepts: ['newtype', 'generics', 'phantom-data', 'trait', 'refactoring']
    }
  ]
};
