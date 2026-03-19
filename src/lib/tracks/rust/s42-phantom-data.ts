import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-phantom',
  title: '42. PhantomData',
  explanation: `## PhantomData

\`PhantomData<T>\` is a zero-sized type that tells the compiler your struct logically "uses" a type parameter \`T\`, even though it stores no data of type \`T\`.

### Why PhantomData?
Without it, unused type parameters are a compile error:
\`\`\`rust
// Error: parameter T is never used
struct Foo<T> { data: u32 }

// Fixed with PhantomData
use std::marker::PhantomData;
struct Foo<T> { data: u32, _marker: PhantomData<T> }
\`\`\`

### Common Uses

**1. Type-level tags (zero-cost abstraction):**
\`\`\`rust
struct Meters;
struct Feet;
struct Distance<U> { value: f64, _unit: PhantomData<U> }
\`\`\`

**2. Lifetime markers:**
\`\`\`rust
struct Iter<'a, T> {
    ptr: *const T,
    _marker: PhantomData<&'a T>,
}
\`\`\`

**3. Ownership semantics:**
\`\`\`rust
// PhantomData<T> - acts as if it owns T (for drop check)
// PhantomData<&'a T> - acts as if it borrows T
// PhantomData<*const T> - no ownership, no Send/Sync
\`\`\`

### Key Properties
- Zero-sized: no runtime cost
- Affects variance, auto-traits (Send/Sync), and drop check
- Does not affect layout or size of the struct
`,
  exercises: [
    {
      id: 'rs-phantom-1',
      title: 'Add PhantomData',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Add PhantomData to use an unused type parameter.',
      skeleton: `use std::marker::PhantomData;

struct Tagged<T> {
    value: i32,
    _marker: __BLANK__,
}`,
      solution: `use std::marker::PhantomData;

struct Tagged<T> {
    value: i32,
    _marker: PhantomData<T>,
}`,
      hints: [
        'PhantomData<T> tells Rust the struct logically uses T.',
        'Without it, unused type parameters cause a compile error.',
        'PhantomData<T>'
      ],
      concepts: ['phantom-data', 'type-parameters', 'zero-sized']
    },
    {
      id: 'rs-phantom-2',
      title: 'Construct PhantomData',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create an instance of a struct containing PhantomData.',
      skeleton: `use std::marker::PhantomData;

struct Wrapper<T> {
    data: u64,
    _marker: PhantomData<T>,
}

fn main() {
    let w: Wrapper<String> = Wrapper { data: 42, _marker: __BLANK__ };
    println!("{}", w.data);
}`,
      solution: `use std::marker::PhantomData;

struct Wrapper<T> {
    data: u64,
    _marker: PhantomData<T>,
}

fn main() {
    let w: Wrapper<String> = Wrapper { data: 42, _marker: PhantomData };
    println!("{}", w.data);
}`,
      hints: [
        'PhantomData is a zero-sized type, just write PhantomData.',
        'No need for PhantomData::new() or similar.',
        'The type parameter is inferred from context.'
      ],
      concepts: ['phantom-data', 'construction', 'zero-sized']
    },
    {
      id: 'rs-phantom-3',
      title: 'Unit Tag Types',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define unit tag types for a PhantomData-based measurement system.',
      skeleton: `use std::marker::PhantomData;

struct Kg;
struct Lb;

struct Weight<U> {
    value: f64,
    _unit: PhantomData<__BLANK__>,
}

fn main() {
    let w: Weight<Kg> = Weight { value: 70.0, _unit: PhantomData };
    println!("{} kg", w.value);
}`,
      solution: `use std::marker::PhantomData;

struct Kg;
struct Lb;

struct Weight<U> {
    value: f64,
    _unit: PhantomData<U>,
}

fn main() {
    let w: Weight<Kg> = Weight { value: 70.0, _unit: PhantomData };
    println!("{} kg", w.value);
}`,
      hints: [
        'The PhantomData marker should use the type parameter U.',
        'U will be Kg or Lb at use site.',
        'PhantomData<U>'
      ],
      concepts: ['phantom-data', 'tag-types', 'unit-system']
    },
    {
      id: 'rs-phantom-4',
      title: 'Predict PhantomData Size',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the size of a struct with PhantomData.',
      skeleton: `use std::marker::PhantomData;
use std::mem::size_of;

struct A {
    x: u32,
    _p: PhantomData<String>,
}

fn main() {
    println!("{}", size_of::<A>());
}`,
      solution: '4',
      hints: [
        'PhantomData has zero size - it adds nothing.',
        'Only x: u32 contributes to the size.',
        'size_of u32 = 4 bytes.'
      ],
      concepts: ['phantom-data', 'zero-sized', 'size-of']
    },
    {
      id: 'rs-phantom-5',
      title: 'PhantomData Constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a constructor for a PhantomData struct.',
      skeleton: `use std::marker::PhantomData;

struct Id<T> {
    value: u64,
    _type: PhantomData<T>,
}

impl<T> Id<T> {
    fn new(value: u64) -> Self {
        Id { value, _type: __BLANK__ }
    }
}`,
      solution: `use std::marker::PhantomData;

struct Id<T> {
    value: u64,
    _type: PhantomData<T>,
}

impl<T> Id<T> {
    fn new(value: u64) -> Self {
        Id { value, _type: PhantomData }
    }
}`,
      hints: [
        'PhantomData is instantiated by just writing PhantomData.',
        'The compiler infers the type parameter from Self.',
        'Id { value, _type: PhantomData }'
      ],
      concepts: ['phantom-data', 'constructor', 'type-inference']
    },
    {
      id: 'rs-phantom-6',
      title: 'Write Typed Index',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a typed index using PhantomData to prevent mixing indices from different collections.',
      skeleton: `use std::marker::PhantomData;

struct Index<T> {
    value: usize,
    _collection: PhantomData<T>,
}

// todo: impl<T> Index<T>::new(value: usize) -> Self
// todo: impl<T> Index<T>::get(&self) -> usize`,
      solution: `use std::marker::PhantomData;

struct Index<T> {
    value: usize,
    _collection: PhantomData<T>,
}

impl<T> Index<T> {
    fn new(value: usize) -> Self {
        Index { value, _collection: PhantomData }
    }

    fn get(&self) -> usize {
        self.value
    }
}`,
      hints: [
        'The PhantomData marker prevents mixing indices from different types.',
        'new() wraps the usize with PhantomData.',
        'get() returns the inner usize value.'
      ],
      concepts: ['phantom-data', 'typed-index', 'type-safety']
    },
    {
      id: 'rs-phantom-7',
      title: 'Predict PhantomData Equality',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict whether two PhantomData structs with different tags can be compared.',
      skeleton: `use std::marker::PhantomData;

#[derive(Debug, PartialEq)]
struct Token<T> {
    id: u32,
    _kind: PhantomData<T>,
}

struct Admin;
struct User;

fn main() {
    let a: Token<Admin> = Token { id: 1, _kind: PhantomData };
    let b: Token<Admin> = Token { id: 1, _kind: PhantomData };
    println!("{}", a == b);
}`,
      solution: 'true',
      hints: [
        'Both tokens are Token<Admin> with id=1.',
        'PhantomData always compares equal (zero-sized).',
        'Output: true.'
      ],
      concepts: ['phantom-data', 'partialeq', 'comparison']
    },
    {
      id: 'rs-phantom-8',
      title: 'Fix Missing PhantomData',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the struct that has an unused type parameter.',
      skeleton: `struct Cache<K, V> {
    data: Vec<(String, String)>,
}

impl<K, V> Cache<K, V> {
    fn new() -> Self {
        Cache { data: Vec::new() }
    }
}

fn main() {
    let c: Cache<u32, String> = Cache::new();
    println!("cache created");
}`,
      solution: `use std::marker::PhantomData;

struct Cache<K, V> {
    data: Vec<(String, String)>,
    _key: PhantomData<K>,
    _val: PhantomData<V>,
}

impl<K, V> Cache<K, V> {
    fn new() -> Self {
        Cache { data: Vec::new(), _key: PhantomData, _val: PhantomData }
    }
}

fn main() {
    let c: Cache<u32, String> = Cache::new();
    println!("cache created");
}`,
      hints: [
        'K and V are unused - Rust requires all type parameters to be used.',
        'Add PhantomData<K> and PhantomData<V> fields.',
        'This tells the compiler the struct logically depends on K and V.'
      ],
      concepts: ['phantom-data', 'unused-type-parameter', 'compile-error']
    },
    {
      id: 'rs-phantom-9',
      title: 'Write Unit Conversion',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a measurement type with PhantomData for units and a conversion function.',
      skeleton: `use std::marker::PhantomData;

struct Meters;
struct Feet;

struct Length<U> {
    value: f64,
    _unit: PhantomData<U>,
}

impl<U> Length<U> {
    fn new(value: f64) -> Self {
        // todo
    }
}

// todo: implement a method on Length<Meters> to convert to Length<Feet>
// (1 meter = 3.28084 feet)

// todo: implement a method on Length<Feet> to convert to Length<Meters>
// (1 foot = 0.3048 meters)`,
      solution: `use std::marker::PhantomData;

struct Meters;
struct Feet;

struct Length<U> {
    value: f64,
    _unit: PhantomData<U>,
}

impl<U> Length<U> {
    fn new(value: f64) -> Self {
        Length { value, _unit: PhantomData }
    }
}

impl Length<Meters> {
    fn to_feet(self) -> Length<Feet> {
        Length::new(self.value * 3.28084)
    }
}

impl Length<Feet> {
    fn to_meters(self) -> Length<Meters> {
        Length::new(self.value * 0.3048)
    }
}`,
      hints: [
        'Conversion methods are specific to each unit type.',
        'to_feet() only exists on Length<Meters>.',
        'Create a new Length with the converted value.'
      ],
      concepts: ['phantom-data', 'unit-conversion', 'type-safe-units']
    },
    {
      id: 'rs-phantom-10',
      title: 'Fix PhantomData Ownership',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the struct that needs to express borrowing semantics with PhantomData.',
      skeleton: `use std::marker::PhantomData;

struct Iter<T> {
    ptr: *const T,
    end: *const T,
    _marker: PhantomData<T>,
}

impl<T> Iter<T> {
    fn new(slice: &[T]) -> Iter<T> {
        let ptr = slice.as_ptr();
        let end = unsafe { ptr.add(slice.len()) };
        Iter { ptr, end, _marker: PhantomData }
    }
}

fn main() {
    let v = vec![1, 2, 3];
    let _iter = Iter::new(&v);
    println!("iter created");
}`,
      solution: `use std::marker::PhantomData;

struct Iter<'a, T> {
    ptr: *const T,
    end: *const T,
    _marker: PhantomData<&'a T>,
}

impl<'a, T> Iter<'a, T> {
    fn new(slice: &'a [T]) -> Iter<'a, T> {
        let ptr = slice.as_ptr();
        let end = unsafe { ptr.add(slice.len()) };
        Iter { ptr, end, _marker: PhantomData }
    }
}

fn main() {
    let v = vec![1, 2, 3];
    let _iter = Iter::new(&v);
    println!("iter created");
}`,
      hints: [
        'PhantomData<T> implies ownership of T, but we are borrowing.',
        'Use PhantomData<&\'a T> to express a borrowed relationship.',
        'Add a lifetime parameter to the struct tied to the slice.'
      ],
      concepts: ['phantom-data', 'lifetime', 'ownership-semantics', 'borrowing']
    },
    {
      id: 'rs-phantom-11',
      title: 'Predict PhantomData Inference',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict type inference behavior with PhantomData.',
      skeleton: `use std::marker::PhantomData;

struct Pair<A, B> {
    first: A,
    _second: PhantomData<B>,
}

fn main() {
    let p: Pair<i32, String> = Pair { first: 42, _second: PhantomData };
    println!("{}", p.first);
    println!("{}", std::mem::size_of_val(&p));
}`,
      solution: '42\n4',
      hints: [
        'p.first is 42.',
        'PhantomData<String> has zero size, so only i32 counts.',
        'Size is 4 bytes (i32 = 4 bytes).'
      ],
      concepts: ['phantom-data', 'type-inference', 'size-of', 'zero-cost']
    },
    {
      id: 'rs-phantom-12',
      title: 'Write Channel Types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create typed Sender<T> and Receiver<T> using PhantomData.',
      skeleton: `use std::marker::PhantomData;

struct Sender<T> {
    id: u32,
    _msg: PhantomData<T>,
}

struct Receiver<T> {
    id: u32,
    _msg: PhantomData<T>,
}

// todo: fn channel<T>() -> (Sender<T>, Receiver<T>) with matching ids
// todo: impl Sender<T>::send(&self, _msg: T) -> String
// todo: impl Receiver<T>::recv(&self) -> String`,
      solution: `use std::marker::PhantomData;

struct Sender<T> {
    id: u32,
    _msg: PhantomData<T>,
}

struct Receiver<T> {
    id: u32,
    _msg: PhantomData<T>,
}

fn channel<T>() -> (Sender<T>, Receiver<T>) {
    let id = 1;
    (
        Sender { id, _msg: PhantomData },
        Receiver { id, _msg: PhantomData },
    )
}

impl<T> Sender<T> {
    fn send(&self, _msg: T) -> String {
        format!("sent on channel {}", self.id)
    }
}

impl<T> Receiver<T> {
    fn recv(&self) -> String {
        format!("recv on channel {}", self.id)
    }
}`,
      hints: [
        'Both Sender and Receiver share the same channel id.',
        'PhantomData<T> ensures type safety of messages.',
        'channel() returns a matching pair.'
      ],
      concepts: ['phantom-data', 'channel', 'typed-communication']
    },
    {
      id: 'rs-phantom-13',
      title: 'Write Permission System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a type-safe permission system using PhantomData tags.',
      skeleton: `use std::marker::PhantomData;

struct ReadOnly;
struct ReadWrite;

struct Handle<P> {
    data: String,
    _perm: PhantomData<P>,
}

// todo: impl Handle<ReadOnly>::read(&self) -> &str
// todo: impl Handle<ReadWrite>::read(&self) -> &str
// todo: impl Handle<ReadWrite>::write(&mut self, s: &str)
// todo: fn open_readonly(data: &str) -> Handle<ReadOnly>
// todo: fn open_readwrite(data: &str) -> Handle<ReadWrite>`,
      solution: `use std::marker::PhantomData;

struct ReadOnly;
struct ReadWrite;

struct Handle<P> {
    data: String,
    _perm: PhantomData<P>,
}

impl Handle<ReadOnly> {
    fn read(&self) -> &str {
        &self.data
    }
}

impl Handle<ReadWrite> {
    fn read(&self) -> &str {
        &self.data
    }

    fn write(&mut self, s: &str) {
        self.data = s.to_string();
    }
}

fn open_readonly(data: &str) -> Handle<ReadOnly> {
    Handle { data: data.to_string(), _perm: PhantomData }
}

fn open_readwrite(data: &str) -> Handle<ReadWrite> {
    Handle { data: data.to_string(), _perm: PhantomData }
}`,
      hints: [
        'ReadOnly handles only have read().',
        'ReadWrite handles have both read() and write().',
        'PhantomData controls which methods are available.'
      ],
      concepts: ['phantom-data', 'permissions', 'type-level-security']
    },
    {
      id: 'rs-phantom-14',
      title: 'Predict Multiple PhantomData',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Predict the size of a struct with multiple PhantomData fields.',
      skeleton: `use std::marker::PhantomData;
use std::mem::size_of;

struct Multi<A, B, C> {
    x: u8,
    _a: PhantomData<A>,
    _b: PhantomData<B>,
    _c: PhantomData<C>,
}

fn main() {
    println!("{}", size_of::<Multi<String, Vec<i32>, Box<f64>>>());
}`,
      solution: '1',
      hints: [
        'All three PhantomData fields are zero-sized.',
        'Only x: u8 contributes to size.',
        'size_of u8 = 1 byte.'
      ],
      concepts: ['phantom-data', 'zero-sized', 'multiple-markers']
    },
    {
      id: 'rs-phantom-15',
      title: 'Fix PhantomData Drop',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix a struct where PhantomData incorrectly affects drop checking.',
      skeleton: `use std::marker::PhantomData;

struct Holder<T> {
    raw: *const u8,
    _owns: PhantomData<T>,
}

impl<T> Drop for Holder<T> {
    fn drop(&mut self) {
        println!("dropping holder");
    }
}

fn main() {
    let data = String::from("hello");
    let _h: Holder<&String> = Holder {
        raw: data.as_ptr(),
        _owns: PhantomData,
    };
    drop(data);
    println!("done");
}`,
      solution: `use std::marker::PhantomData;

struct Holder {
    raw: *const u8,
    _marker: PhantomData<*const u8>,
}

impl Drop for Holder {
    fn drop(&mut self) {
        println!("dropping holder");
    }
}

fn main() {
    let data = String::from("hello");
    let _h = Holder {
        raw: data.as_ptr(),
        _marker: PhantomData,
    };
    drop(data);
    println!("done");
}`,
      hints: [
        'PhantomData<&String> implies borrowing, causing lifetime issues.',
        'Use PhantomData<*const u8> for raw pointers without ownership.',
        'Remove the generic parameter if ownership semantics are not needed.'
      ],
      concepts: ['phantom-data', 'drop-check', 'raw-pointer', 'ownership']
    },
    {
      id: 'rs-phantom-16',
      title: 'Write Type-Level State Machine',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a compile-time state machine using PhantomData with Red/Yellow/Green traffic light states.',
      skeleton: `use std::marker::PhantomData;

struct Red;
struct Yellow;
struct Green;

struct Light<S> {
    _state: PhantomData<S>,
    duration_ms: u32,
}

// todo: Light<Red>::new() -> Light<Red> (duration 3000)
// todo: Light<Red>::next(self) -> Light<Green> (duration 3000)
// todo: Light<Green>::next(self) -> Light<Yellow> (duration 1000)
// todo: Light<Yellow>::next(self) -> Light<Red> (duration 3000)
// todo: impl<S> Light<S>::duration(&self) -> u32`,
      solution: `use std::marker::PhantomData;

struct Red;
struct Yellow;
struct Green;

struct Light<S> {
    _state: PhantomData<S>,
    duration_ms: u32,
}

impl<S> Light<S> {
    fn duration(&self) -> u32 {
        self.duration_ms
    }
}

impl Light<Red> {
    fn new() -> Self {
        Light { _state: PhantomData, duration_ms: 3000 }
    }

    fn next(self) -> Light<Green> {
        Light { _state: PhantomData, duration_ms: 3000 }
    }
}

impl Light<Green> {
    fn next(self) -> Light<Yellow> {
        Light { _state: PhantomData, duration_ms: 1000 }
    }
}

impl Light<Yellow> {
    fn next(self) -> Light<Red> {
        Light { _state: PhantomData, duration_ms: 3000 }
    }
}`,
      hints: [
        'Each state has a next() returning the next state type.',
        'duration() is available on all states via impl<S>.',
        'PhantomData is zero-cost - only duration_ms takes memory.'
      ],
      concepts: ['phantom-data', 'state-machine', 'type-level', 'zero-cost']
    },
    {
      id: 'rs-phantom-17',
      title: 'Write Invariant Lifetime',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a type that is invariant over its lifetime parameter using PhantomData.',
      skeleton: `use std::marker::PhantomData;
use std::cell::Cell;

struct Invariant<'a> {
    _marker: PhantomData<Cell<&'a ()>>,
}

// todo: impl Invariant::new() -> Invariant<'a> (use a dummy lifetime)
// Note: Cell<&'a ()> makes the lifetime invariant, preventing
// the compiler from shortening or lengthening it`,
      solution: `use std::marker::PhantomData;
use std::cell::Cell;

struct Invariant<'a> {
    _marker: PhantomData<Cell<&'a ()>>,
}

impl<'a> Invariant<'a> {
    fn new() -> Self {
        Invariant { _marker: PhantomData }
    }
}`,
      hints: [
        'PhantomData<Cell<&\'a ()>> makes the lifetime invariant.',
        'Invariant means the lifetime cannot be shortened or lengthened.',
        'This is useful for preventing unsound coercions.'
      ],
      concepts: ['phantom-data', 'invariance', 'lifetime', 'variance']
    },
    {
      id: 'rs-phantom-18',
      title: 'Refactor to PhantomData',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor a struct that stores a dummy value just for type discrimination into PhantomData.',
      skeleton: `struct TypedKey<T> {
    name: String,
    _dummy: Option<T>, // wastes memory just for type info
}

impl<T> TypedKey<T> {
    fn new(name: &str) -> Self {
        TypedKey { name: name.to_string(), _dummy: None }
    }

    fn name(&self) -> &str {
        &self.name
    }
}

fn main() {
    let key: TypedKey<Vec<u8>> = TypedKey::new("data");
    println!("Key: {}", key.name());
    println!("Size: {}", std::mem::size_of_val(&key));
}`,
      solution: `use std::marker::PhantomData;

struct TypedKey<T> {
    name: String,
    _marker: PhantomData<T>,
}

impl<T> TypedKey<T> {
    fn new(name: &str) -> Self {
        TypedKey { name: name.to_string(), _marker: PhantomData }
    }

    fn name(&self) -> &str {
        &self.name
    }
}

fn main() {
    let key: TypedKey<Vec<u8>> = TypedKey::new("data");
    println!("Key: {}", key.name());
    println!("Size: {}", std::mem::size_of_val(&key));
}`,
      hints: [
        'Option<T> wastes memory storing None for a type that is never used.',
        'Replace with PhantomData<T> for zero-cost type discrimination.',
        'The struct will be smaller since PhantomData has zero size.'
      ],
      concepts: ['phantom-data', 'refactoring', 'zero-cost', 'memory-efficiency']
    },
    {
      id: 'rs-phantom-19',
      title: 'Write Type-Safe Builder with PhantomData',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a type-safe API key that distinguishes between different API services at the type level.',
      skeleton: `use std::marker::PhantomData;

struct GitHub;
struct Stripe;
struct AWS;

struct ApiKey<Service> {
    key: String,
    _service: PhantomData<Service>,
}

// todo: impl<Service> ApiKey<Service>::new(key: &str) -> Self
// todo: impl<Service> ApiKey<Service>::as_str(&self) -> &str
// todo: fn call_github(key: &ApiKey<GitHub>) -> String
// todo: fn call_stripe(key: &ApiKey<Stripe>) -> String`,
      solution: `use std::marker::PhantomData;

struct GitHub;
struct Stripe;
struct AWS;

struct ApiKey<Service> {
    key: String,
    _service: PhantomData<Service>,
}

impl<Service> ApiKey<Service> {
    fn new(key: &str) -> Self {
        ApiKey { key: key.to_string(), _service: PhantomData }
    }

    fn as_str(&self) -> &str {
        &self.key
    }
}

fn call_github(key: &ApiKey<GitHub>) -> String {
    format!("GitHub API called with key: {}", key.as_str())
}

fn call_stripe(key: &ApiKey<Stripe>) -> String {
    format!("Stripe API called with key: {}", key.as_str())
}`,
      hints: [
        'Each API function only accepts its specific key type.',
        'You cannot pass an ApiKey<GitHub> to call_stripe.',
        'PhantomData ensures type safety at zero cost.'
      ],
      concepts: ['phantom-data', 'type-safety', 'api-keys', 'service-tagging']
    },
    {
      id: 'rs-phantom-20',
      title: 'Refactor Generic Container',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor a type-erased container to use PhantomData for type-safe access.',
      skeleton: `struct Container {
    data: Vec<u8>,
    type_name: String,
}

impl Container {
    fn new_i32(val: i32) -> Self {
        Container {
            data: val.to_le_bytes().to_vec(),
            type_name: "i32".to_string(),
        }
    }

    fn get_i32(&self) -> Option<i32> {
        if self.type_name == "i32" && self.data.len() == 4 {
            let bytes: [u8; 4] = self.data[..4].try_into().ok()?;
            Some(i32::from_le_bytes(bytes))
        } else {
            None
        }
    }
}

fn main() {
    let c = Container::new_i32(42);
    println!("{:?}", c.get_i32());
}`,
      solution: `use std::marker::PhantomData;

struct Container<T> {
    data: Vec<u8>,
    _type: PhantomData<T>,
}

impl Container<i32> {
    fn new(val: i32) -> Self {
        Container {
            data: val.to_le_bytes().to_vec(),
            _type: PhantomData,
        }
    }

    fn get(&self) -> i32 {
        let bytes: [u8; 4] = self.data[..4].try_into().unwrap();
        i32::from_le_bytes(bytes)
    }
}

fn main() {
    let c: Container<i32> = Container::new(42);
    println!("{}", c.get());
}`,
      hints: [
        'Replace runtime type checking with compile-time PhantomData.',
        'Container<i32> can only store and retrieve i32.',
        'No need for Option or type_name strings.'
      ],
      concepts: ['phantom-data', 'type-safety', 'refactoring', 'compile-time-vs-runtime']
    }
  ]
};
