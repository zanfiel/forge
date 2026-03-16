import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-future',
  title: '44. Futures and Polling',
  explanation: `## Futures and Polling

The \`Future\` trait is the foundation of async Rust. Understanding how futures work under the hood is essential for writing efficient async code.

### The Future Trait
\`\`\`rust
use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

trait Future {
    type Output;
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
\`\`\`

### Poll Enum
\`\`\`rust
enum Poll<T> {
    Ready(T),   // Future completed with value T
    Pending,    // Future not yet ready
}
\`\`\`

### How Async Works
1. \`async fn\` desugars into a state machine implementing \`Future\`
2. The executor calls \`poll()\` on the future
3. If \`Pending\`, the waker is registered; the executor sleeps until woken
4. If \`Ready(value)\`, the result is returned

### Waker
The \`Waker\` tells the executor to re-poll a future:
\`\`\`rust
impl Future for MyFuture {
    type Output = i32;
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<i32> {
        if self.is_ready() {
            Poll::Ready(42)
        } else {
            cx.waker().wake_by_ref();
            Poll::Pending
        }
    }
}
\`\`\`

### Combinators
\`\`\`rust
use futures::future::{join, select};
// Run two futures concurrently
let (a, b) = join(future_a, future_b).await;
\`\`\`
`,
  exercises: [
    {
      id: 'rs-future-1',
      title: 'Future Trait Output Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define the Output associated type for a Future.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct MyFuture;

impl Future for MyFuture {
    type __BLANK__ = i32;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Self::Output> {
        Poll::Ready(42)
    }
}`,
      solution: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct MyFuture;

impl Future for MyFuture {
    type Output = i32;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Self::Output> {
        Poll::Ready(42)
    }
}`,
      hints: [
        'The Future trait has one associated type.',
        'The associated type is called Output.',
        'type Output = i32; defines what the future resolves to.',
      ],
      concepts: ['future-trait', 'associated-types', 'poll'],
    },
    {
      id: 'rs-future-2',
      title: 'Poll::Ready',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Return a ready value from a poll function.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct Immediate(String);

impl Future for Immediate {
    type Output = String;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<String> {
        __BLANK__(self.get_mut().0.clone())
    }
}`,
      solution: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct Immediate(String);

impl Future for Immediate {
    type Output = String;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<String> {
        Poll::Ready(self.get_mut().0.clone())
    }
}`,
      hints: [
        'Poll has two variants: Ready and Pending.',
        'To indicate a future is complete, return Poll::Ready(value).',
        'Poll::Ready(self.get_mut().0.clone()) returns the contained string.',
      ],
      concepts: ['poll-ready', 'future-trait', 'pin'],
    },
    {
      id: 'rs-future-3',
      title: 'Poll::Pending',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Return Pending from a future that is not yet ready.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct NotReady;

impl Future for NotReady {
    type Output = ();

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<()> {
        cx.waker().wake_by_ref();
        __BLANK__
    }
}`,
      solution: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct NotReady;

impl Future for NotReady {
    type Output = ();

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<()> {
        cx.waker().wake_by_ref();
        Poll::Pending
    }
}`,
      hints: [
        'When a future is not ready, it returns Poll::Pending.',
        'Before returning Pending, you should register the waker.',
        'Poll::Pending tells the executor to try again later.',
      ],
      concepts: ['poll-pending', 'waker', 'future-trait'],
    },
    {
      id: 'rs-future-4',
      title: 'Async Function Desugaring',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Understand what async fn desugars to.',
      skeleton: `use std::future::Future;

// async fn get_value() -> i32 { 42 }
// desugars approximately to:
fn get_value() -> __BLANK__<Output = i32> {
    async { 42 }
}`,
      solution: `use std::future::Future;

// async fn get_value() -> i32 { 42 }
// desugars approximately to:
fn get_value() -> impl Future<Output = i32> {
    async { 42 }
}`,
      hints: [
        'async fn returns something that implements Future.',
        'Use impl Future<Output = T> as the return type.',
        'impl Future<Output = i32> is the desugared return type.',
      ],
      concepts: ['async-desugaring', 'impl-future', 'async-fn'],
    },
    {
      id: 'rs-future-5',
      title: 'Waker Wake By Ref',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use the waker to schedule re-polling.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct Countdown { remaining: u32 }

impl Future for Countdown {
    type Output = &'static str;

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<&'static str> {
        if self.remaining == 0 {
            Poll::Ready("done")
        } else {
            self.remaining -= 1;
            cx.__BLANK__().wake_by_ref();
            Poll::Pending
        }
    }
}`,
      solution: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct Countdown { remaining: u32 }

impl Future for Countdown {
    type Output = &'static str;

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<&'static str> {
        if self.remaining == 0 {
            Poll::Ready("done")
        } else {
            self.remaining -= 1;
            cx.waker().wake_by_ref();
            Poll::Pending
        }
    }
}`,
      hints: [
        'The Context provides access to the Waker.',
        'cx.waker() returns a reference to the waker.',
        'wake_by_ref() schedules the future for re-polling without consuming the waker.',
      ],
      concepts: ['waker', 'context', 'poll-lifecycle'],
    },
    {
      id: 'rs-future-6',
      title: 'Boxed Future',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a boxed future for dynamic dispatch.',
      skeleton: `use std::future::Future;
use std::pin::Pin;

type BoxFuture<'a, T> = Pin<Box<dyn Future<Output = T> + Send + 'a>>;

fn make_future(val: i32) -> BoxFuture<'static, i32> {
    __BLANK__(async move { val * 2 })
}`,
      solution: `use std::future::Future;
use std::pin::Pin;

type BoxFuture<'a, T> = Pin<Box<dyn Future<Output = T> + Send + 'a>>;

fn make_future(val: i32) -> BoxFuture<'static, i32> {
    Box::pin(async move { val * 2 })
}`,
      hints: [
        'To create a Pin<Box<dyn Future>>, use Box::pin().',
        'Box::pin() allocates on the heap and pins the value.',
        'Box::pin(async move { val * 2 }) creates the boxed future.',
      ],
      concepts: ['box-pin', 'boxed-future', 'dynamic-dispatch'],
    },
    {
      id: 'rs-future-7',
      title: 'Implement a Delay Future',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a future that returns Ready on its second poll.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct OnePoll {
    polled: bool,
}

impl OnePoll {
    fn new() -> Self {
        OnePoll { polled: false }
    }
}

// Implement Future for OnePoll:
// - First poll: set polled to true, wake, return Pending
// - Second poll: return Poll::Ready("complete")
`,
      solution: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct OnePoll {
    polled: bool,
}

impl OnePoll {
    fn new() -> Self {
        OnePoll { polled: false }
    }
}

impl Future for OnePoll {
    type Output = &'static str;

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        if self.polled {
            Poll::Ready("complete")
        } else {
            self.polled = true;
            cx.waker().wake_by_ref();
            Poll::Pending
        }
    }
}`,
      hints: [
        'Implement Future with Output = &\'static str.',
        'Check self.polled to decide if this is the first or second poll.',
        'On first poll, set polled = true, wake the waker, return Pending. On second poll, return Ready.',
      ],
      concepts: ['future-impl', 'state-machine', 'poll-lifecycle'],
    },
    {
      id: 'rs-future-8',
      title: 'Implement a Ready Future',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a future that immediately returns a value.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct Ready<T>(Option<T>);

// Implement Future for Ready<T> that returns the inner value immediately.
// Use self.0.take() to extract the value.
`,
      solution: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct Ready<T>(Option<T>);

impl<T> Future for Ready<T> {
    type Output = T;

    fn poll(mut self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<T> {
        match self.0.take() {
            Some(val) => Poll::Ready(val),
            None => panic!("Ready polled after completion"),
        }
    }
}`,
      hints: [
        'Use self.0.take() to move the value out of the Option.',
        'If Some(val), return Poll::Ready(val).',
        'If None, the future was already consumed; panic is acceptable.',
      ],
      concepts: ['future-impl', 'option-take', 'poll-ready'],
    },
    {
      id: 'rs-future-9',
      title: 'Chain Two Futures',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write an async function that chains two futures together.',
      skeleton: `use std::future::Future;

// Write an async function 'chain' that:
// 1. Awaits the first future to get an i32
// 2. Awaits the second future to get an i32
// 3. Returns their sum
async fn chain<F1, F2>(a: F1, b: F2) -> i32
where
    F1: Future<Output = i32>,
    F2: Future<Output = i32>,
{
    todo!()
}`,
      solution: `use std::future::Future;

async fn chain<F1, F2>(a: F1, b: F2) -> i32
where
    F1: Future<Output = i32>,
    F2: Future<Output = i32>,
{
    let x = a.await;
    let y = b.await;
    x + y
}`,
      hints: [
        'Use .await to get the value from each future.',
        'Await a first, then await b, then sum them.',
        'let x = a.await; let y = b.await; x + y',
      ],
      concepts: ['async-fn', 'await', 'future-chaining'],
    },
    {
      id: 'rs-future-10',
      title: 'Future Map Combinator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write an async function that maps the output of a future.',
      skeleton: `use std::future::Future;

// Write an async function 'map_future' that:
// Takes a future and a closure
// Awaits the future and applies the closure to the result
async fn map_future<F, T, U, M>(fut: F, mapper: M) -> U
where
    F: Future<Output = T>,
    M: FnOnce(T) -> U,
{
    todo!()
}`,
      solution: `use std::future::Future;

async fn map_future<F, T, U, M>(fut: F, mapper: M) -> U
where
    F: Future<Output = T>,
    M: FnOnce(T) -> U,
{
    let result = fut.await;
    mapper(result)
}`,
      hints: [
        'Await the future to get its output.',
        'Apply the mapper closure to the result.',
        'let result = fut.await; mapper(result)',
      ],
      concepts: ['future-combinators', 'closures', 'async-fn'],
    },
    {
      id: 'rs-future-11',
      title: 'Conditional Future',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write an async function that conditionally awaits one of two futures.',
      skeleton: `use std::future::Future;

// Write 'select_future' that takes a bool and two futures.
// If the bool is true, await and return the first future's result.
// Otherwise, await and return the second future's result.
async fn select_future<F1, F2>(condition: bool, a: F1, b: F2) -> i32
where
    F1: Future<Output = i32>,
    F2: Future<Output = i32>,
{
    todo!()
}`,
      solution: `use std::future::Future;

async fn select_future<F1, F2>(condition: bool, a: F1, b: F2) -> i32
where
    F1: Future<Output = i32>,
    F2: Future<Output = i32>,
{
    if condition {
        a.await
    } else {
        b.await
    }
}`,
      hints: [
        'Use an if/else expression with .await.',
        'Only one branch will be awaited.',
        'if condition { a.await } else { b.await }',
      ],
      concepts: ['async-control-flow', 'conditional-await', 'futures'],
    },
    {
      id: 'rs-future-12',
      title: 'Future with Timeout State',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement a future with a poll counter that times out.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct LimitedPolls {
    count: u32,
    max: u32,
}

impl LimitedPolls {
    fn new(max: u32) -> Self {
        LimitedPolls { count: 0, max }
    }
}

// Implement Future for LimitedPolls:
// Output: Result<u32, &'static str>
// Each poll increments count. If count >= max, return Ready(Ok(count)).
// Otherwise wake and return Pending.
`,
      solution: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct LimitedPolls {
    count: u32,
    max: u32,
}

impl LimitedPolls {
    fn new(max: u32) -> Self {
        LimitedPolls { count: 0, max }
    }
}

impl Future for LimitedPolls {
    type Output = Result<u32, &'static str>;

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        self.count += 1;
        if self.count >= self.max {
            Poll::Ready(Ok(self.count))
        } else {
            cx.waker().wake_by_ref();
            Poll::Pending
        }
    }
}`,
      hints: [
        'Increment count each time poll is called.',
        'Compare count to max to decide if ready.',
        'Return Poll::Ready(Ok(self.count)) when done, Poll::Pending otherwise.',
      ],
      concepts: ['future-state-machine', 'poll-counting', 'waker'],
    },
    {
      id: 'rs-future-13',
      title: 'Bug: Missing Waker Call',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix a future that never completes because it forgets to wake.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct NeverWakes {
    done: bool,
}

impl Future for NeverWakes {
    type Output = &'static str;

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        if self.done {
            Poll::Ready("finally!")
        } else {
            self.done = true;
            // BUG: forgot to wake!
            Poll::Pending
        }
    }
}`,
      solution: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct NeverWakes {
    done: bool,
}

impl Future for NeverWakes {
    type Output = &'static str;

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        if self.done {
            Poll::Ready("finally!")
        } else {
            self.done = true;
            cx.waker().wake_by_ref();
            Poll::Pending
        }
    }
}`,
      hints: [
        'A future returning Pending must arrange to be woken up again.',
        'Without calling the waker, the executor will never re-poll.',
        'Add cx.waker().wake_by_ref(); before returning Poll::Pending.',
      ],
      concepts: ['waker', 'future-correctness', 'poll-contract'],
    },
    {
      id: 'rs-future-14',
      title: 'Bug: Wrong Poll Return',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a future that returns Pending when it should return Ready.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct AlwaysReady(i32);

impl Future for AlwaysReady {
    type Output = i32;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<i32> {
        // BUG: this should be ready immediately
        Poll::Pending
    }
}`,
      solution: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct AlwaysReady(i32);

impl Future for AlwaysReady {
    type Output = i32;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<i32> {
        Poll::Ready(self.0)
    }
}`,
      hints: [
        'This future has a value ready immediately.',
        'It should return Poll::Ready, not Poll::Pending.',
        'Change to Poll::Ready(self.0) to return the contained value.',
      ],
      concepts: ['poll-ready', 'future-correctness', 'immediate-future'],
    },
    {
      id: 'rs-future-15',
      title: 'Bug: Double Consume',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a future that panics when polled twice because it consumes its value.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct TakeOnce {
    value: String,
    taken: bool,
}

impl Future for TakeOnce {
    type Output = String;

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<String> {
        if !self.taken {
            self.taken = true;
            cx.waker().wake_by_ref();
            Poll::Pending
        } else {
            // BUG: value was already moved out!
            Poll::Ready(std::mem::replace(&mut self.value, String::new()))
        }
    }
}`,
      solution: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct TakeOnce {
    value: Option<String>,
    taken: bool,
}

impl Future for TakeOnce {
    type Output = String;

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<String> {
        if !self.taken {
            self.taken = true;
            cx.waker().wake_by_ref();
            Poll::Pending
        } else {
            Poll::Ready(self.value.take().unwrap())
        }
    }
}`,
      hints: [
        'Using String directly means leaving an empty string behind.',
        'Wrap the value in Option<String> for safe extraction.',
        'Use self.value.take().unwrap() to safely move the value out.',
      ],
      concepts: ['option-take', 'future-safety', 'ownership-in-futures'],
    },
    {
      id: 'rs-future-16',
      title: 'Predict: Poll Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of polling a simple future.',
      skeleton: `use std::task::Poll;

fn main() {
    let result: Poll<i32> = Poll::Ready(42);
    match result {
        Poll::Ready(v) => println!("Got: {}", v),
        Poll::Pending => println!("Not ready"),
    }
}`,
      solution: `Got: 42`,
      hints: [
        'The Poll value is Poll::Ready(42).',
        'The match arm for Ready will execute.',
        'It prints "Got: 42".',
      ],
      concepts: ['poll-enum', 'pattern-matching', 'futures'],
    },
    {
      id: 'rs-future-17',
      title: 'Predict: Poll Map',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of mapping a Poll value.',
      skeleton: `use std::task::Poll;

fn main() {
    let poll: Poll<i32> = Poll::Ready(10);
    let mapped = poll.map(|x| x * 3);
    println!("{:?}", mapped);

    let pending: Poll<i32> = Poll::Pending;
    let mapped2 = pending.map(|x| x * 3);
    println!("{:?}", mapped2);
}`,
      solution: `Ready(30)
Pending`,
      hints: [
        'Poll::Ready(10).map(|x| x * 3) applies the closure to the inner value.',
        'Poll::Pending.map() does nothing and remains Pending.',
        'Output: Ready(30) then Pending.',
      ],
      concepts: ['poll-map', 'poll-combinators', 'debug-trait'],
    },
    {
      id: 'rs-future-18',
      title: 'Predict: Async Block Type',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict what async blocks evaluate to.',
      skeleton: `#[tokio::main]
async fn main() {
    let val = async { 5 + 5 }.await;
    let msg = async { format!("value is {}", val) }.await;
    println!("{}", msg);
}`,
      solution: `value is 10`,
      hints: [
        'async { 5 + 5 } creates a future that resolves to 10.',
        '.await resolves the future immediately in this context.',
        'The format! macro creates "value is 10".',
      ],
      concepts: ['async-blocks', 'await', 'future-evaluation'],
    },
    {
      id: 'rs-future-19',
      title: 'Refactor: Manual Future to Async',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor a manual Future impl into an async function.',
      skeleton: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct AddFuture {
    a: i32,
    b: i32,
}

impl Future for AddFuture {
    type Output = i32;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<i32> {
        Poll::Ready(self.a + self.b)
    }
}

fn add(a: i32, b: i32) -> AddFuture {
    AddFuture { a, b }
}`,
      solution: `async fn add(a: i32, b: i32) -> i32 {
    a + b
}`,
      hints: [
        'The manual future just immediately returns a + b.',
        'This can be simplified to an async fn.',
        'async fn add(a: i32, b: i32) -> i32 { a + b }',
      ],
      concepts: ['async-fn', 'future-simplification', 'refactoring'],
    },
    {
      id: 'rs-future-20',
      title: 'Refactor: Nested Awaits to Sequential',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor deeply nested .await chains into flat sequential code.',
      skeleton: `use std::future::Future;

async fn fetch_id() -> u32 { 1 }
async fn fetch_name(id: u32) -> String { format!("user_{}", id) }
async fn fetch_email(name: &str) -> String { format!("{}@example.com", name) }

async fn get_user_email() -> String {
    fetch_email(
        &fetch_name(
            fetch_id().await
        ).await
    ).await
}`,
      solution: `use std::future::Future;

async fn fetch_id() -> u32 { 1 }
async fn fetch_name(id: u32) -> String { format!("user_{}", id) }
async fn fetch_email(name: &str) -> String { format!("{}@example.com", name) }

async fn get_user_email() -> String {
    let id = fetch_id().await;
    let name = fetch_name(id).await;
    let email = fetch_email(&name).await;
    email
}`,
      hints: [
        'Nested .await calls are hard to read.',
        'Assign each result to a variable, then use it in the next step.',
        'Use let bindings to flatten the chain into sequential steps.',
      ],
      concepts: ['async-readability', 'sequential-await', 'refactoring'],
    },
  ],
};
