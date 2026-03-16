import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-closures',
  title: '10. Closures',
  explanation: `## Closures in Lua

A **closure** is a function that captures variables from its enclosing scope (called **upvalues**). This is one of Lua's most powerful features.

### Basic Closure
\`\`\`lua
local function makeCounter()
  local count = 0
  return function()
    count = count + 1
    return count
  end
end

local counter = makeCounter()
print(counter()) -- 1
print(counter()) -- 2
\`\`\`

### Factory Functions
\`\`\`lua
local function makeAdder(x)
  return function(y)
    return x + y
  end
end

local add5 = makeAdder(5)
print(add5(3)) -- 8
\`\`\`

### Stateful Iterators
\`\`\`lua
local function range(n)
  local i = 0
  return function()
    i = i + 1
    if i <= n then return i end
  end
end

for val in range(3) do
  print(val) -- 1, 2, 3
end
\`\`\`

Closures enable encapsulation, factories, callbacks, and iterators.`,
  exercises: [
    {
      id: 'lua-closures-1',
      title: 'Basic Closure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the closure to capture the outer variable.',
      skeleton: `local function makeGreeter(greeting)
  return function(name)
    return ___ .. ", " .. name
  end
end
local hi = makeGreeter("Hello")
print(hi("World"))`,
      solution: `local function makeGreeter(greeting)
  return function(name)
    return greeting .. ", " .. name
  end
end
local hi = makeGreeter("Hello")
print(hi("World"))`,
      hints: ['The inner function captures greeting from the outer function.', 'greeting is an upvalue.', 'Fill in "greeting".'],
      concepts: ['closures', 'upvalues'],
    },
    {
      id: 'lua-closures-2',
      title: 'Counter Closure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the counter factory.',
      skeleton: `local function makeCounter()
  local n = 0
  return function()
    n = ___ + 1
    return n
  end
end
local c = makeCounter()
print(c(), c(), c()) -- 1 2 3`,
      solution: `local function makeCounter()
  local n = 0
  return function()
    n = n + 1
    return n
  end
end
local c = makeCounter()
print(c(), c(), c()) -- 1 2 3`,
      hints: ['The closure modifies the captured variable n.', 'n persists between calls.', 'Fill in "n".'],
      concepts: ['closures', 'state'],
    },
    {
      id: 'lua-closures-3',
      title: 'Adder Factory',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create an adder factory function.',
      skeleton: `local function makeAdder(x)
  return ___(y)
    return x + y
  end
end
local add10 = makeAdder(10)
print(add10(5)) -- 15`,
      solution: `local function makeAdder(x)
  return function(y)
    return x + y
  end
end
local add10 = makeAdder(10)
print(add10(5)) -- 15`,
      hints: ['Return an anonymous function.', 'The keyword is "function".', 'The returned function captures x.'],
      concepts: ['factory-functions'],
    },
    {
      id: 'lua-closures-4',
      title: 'Closure Over Mutable State',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Complete the accumulator closure.',
      skeleton: `local function makeAccumulator(initial)
  local total = initial
  return function(n)
    total = total + ___
    return total
  end
end
local acc = makeAccumulator(100)
print(acc(5))  -- 105
print(acc(10)) -- 115`,
      solution: `local function makeAccumulator(initial)
  local total = initial
  return function(n)
    total = total + n
    return total
  end
end
local acc = makeAccumulator(100)
print(acc(5))  -- 105
print(acc(10)) -- 115`,
      hints: ['The inner function adds n to the running total.', 'n is the parameter of the inner function.', 'Fill in "n".'],
      concepts: ['closures', 'accumulator'],
    },
    {
      id: 'lua-closures-5',
      title: 'Closure with Table',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Complete the closure that captures a table.',
      skeleton: `local function makeLogger()
  local ___ = {}
  return {
    log = function(msg) logs[#logs + 1] = msg end,
    getAll = function() return logs end,
  }
end
local logger = makeLogger()
logger.log("hello")
print(#logger.getAll()) -- 1`,
      solution: `local function makeLogger()
  local logs = {}
  return {
    log = function(msg) logs[#logs + 1] = msg end,
    getAll = function() return logs end,
  }
end
local logger = makeLogger()
logger.log("hello")
print(#logger.getAll()) -- 1`,
      hints: ['The table variable is shared by both closures.', 'It needs to be named "logs".', 'Fill in "logs".'],
      concepts: ['closures', 'encapsulation'],
    },
    {
      id: 'lua-closures-6',
      title: 'Iterator Closure',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Complete the range iterator closure.',
      skeleton: `local function range(n)
  local i = ___
  return function()
    i = i + 1
    if i <= n then return i end
  end
end
for val in range(3) do print(val) end`,
      solution: `local function range(n)
  local i = 0
  return function()
    i = i + 1
    if i <= n then return i end
  end
end
for val in range(3) do print(val) end`,
      hints: ['i starts before the first value.', 'Since we increment before returning, start at 0.', 'Fill in "0".'],
      concepts: ['iterators', 'closures'],
    },
    {
      id: 'lua-closures-7',
      title: 'Write a Multiplier Factory',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function makeMultiplier(factor) that returns a function multiplying its argument by factor.',
      skeleton: `-- Write function makeMultiplier(factor)`,
      solution: `local function makeMultiplier(factor)
  return function(x)
    return x * factor
  end
end

local double = makeMultiplier(2)
local triple = makeMultiplier(3)
print(double(5))  -- 10
print(triple(5))  -- 15`,
      hints: ['Return a function that uses factor.', 'factor is captured as an upvalue.', 'The returned function takes x and returns x * factor.'],
      concepts: ['factory-functions', 'closures'],
    },
    {
      id: 'lua-closures-8',
      title: 'Write a Toggle Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function makeToggle() that returns a function alternating between true and false.',
      skeleton: `-- Write function makeToggle()`,
      solution: `local function makeToggle()
  local state = false
  return function()
    state = not state
    return state
  end
end

local toggle = makeToggle()
print(toggle()) -- true
print(toggle()) -- false
print(toggle()) -- true`,
      hints: ['Use a boolean upvalue.', 'Flip it with not on each call.', 'Return the new state.'],
      concepts: ['closures', 'state'],
    },
    {
      id: 'lua-closures-9',
      title: 'Write a Rate Limiter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function makeLimiter(maxCalls) that returns a function which only executes the first maxCalls times, returning true on success and false when exhausted.',
      skeleton: `-- Write function makeLimiter(maxCalls)`,
      solution: `local function makeLimiter(maxCalls)
  local remaining = maxCalls
  return function()
    if remaining > 0 then
      remaining = remaining - 1
      return true
    end
    return false
  end
end

local limit = makeLimiter(2)
print(limit()) -- true
print(limit()) -- true
print(limit()) -- false`,
      hints: ['Track remaining calls with an upvalue.', 'Decrement on each successful call.', 'Return false when exhausted.'],
      concepts: ['closures', 'rate-limiting'],
    },
    {
      id: 'lua-closures-10',
      title: 'Write a Fibonacci Iterator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function fibonacci(n) that returns an iterator closure producing the first n Fibonacci numbers.',
      skeleton: `-- Write function fibonacci(n)`,
      solution: `local function fibonacci(n)
  local a, b = 0, 1
  local count = 0
  return function()
    count = count + 1
    if count > n then return nil end
    a, b = b, a + b
    return a
  end
end

for val in fibonacci(7) do
  print(val) -- 1 1 2 3 5 8 13
end`,
      hints: ['Track two previous values as upvalues.', 'Swap and add each iteration.', 'Return nil after n values to stop.'],
      concepts: ['closures', 'iterators', 'fibonacci'],
    },
    {
      id: 'lua-closures-11',
      title: 'Write a Getter/Setter Pair',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function makeProperty(initial) that returns two functions: get() and set(val).',
      skeleton: `-- Write function makeProperty(initial)`,
      solution: `local function makeProperty(initial)
  local value = initial
  local function get()
    return value
  end
  local function set(val)
    value = val
  end
  return get, set
end

local getName, setName = makeProperty("Alice")
print(getName())   -- Alice
setName("Bob")
print(getName())   -- Bob`,
      hints: ['Both functions share the same upvalue.', 'get reads it, set writes it.', 'Return both functions.'],
      concepts: ['closures', 'getter-setter'],
    },
    {
      id: 'lua-closures-12',
      title: 'Write a Cache with Expiry',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function makeCache(maxSize) that returns add(key, val) and get(key) functions. When full, the oldest entry is evicted.',
      skeleton: `-- Write function makeCache(maxSize)`,
      solution: `local function makeCache(maxSize)
  local cache = {}
  local order = {}
  return {
    add = function(key, val)
      if cache[key] == nil then
        if #order >= maxSize then
          local oldest = table.remove(order, 1)
          cache[oldest] = nil
        end
        order[#order + 1] = key
      end
      cache[key] = val
    end,
    get = function(key)
      return cache[key]
    end,
  }
end

local c = makeCache(2)
c.add("a", 1); c.add("b", 2); c.add("c", 3)
print(c.get("a")) -- nil (evicted)
print(c.get("c")) -- 3`,
      hints: ['Use two upvalues: a cache table and an order array.', 'When full, remove the first entry in order.', 'Track insertion order for eviction.'],
      concepts: ['closures', 'caching'],
    },
    {
      id: 'lua-closures-13',
      title: 'Fix Shared Upvalue Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the closures that all share the same upvalue.',
      skeleton: `local counters = {}
local n = 0
for i = 1, 3 do
  counters[i] = function()
    n = n + 1
    return n
  end
end
print(counters[1]()) -- should print 1
print(counters[2]()) -- should print 1
print(counters[3]()) -- should print 1`,
      solution: `local counters = {}
for i = 1, 3 do
  local n = 0
  counters[i] = function()
    n = n + 1
    return n
  end
end
print(counters[1]()) -- 1
print(counters[2]()) -- 1
print(counters[3]()) -- 1`,
      hints: ['All closures share the same n variable.', 'Move local n inside the loop.', 'Each iteration creates its own n.'],
      concepts: ['closures', 'upvalue-sharing'],
    },
    {
      id: 'lua-closures-14',
      title: 'Fix Iterator Return Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the iterator that never stops.',
      skeleton: `local function countdown(n)
  return function()
    n = n - 1
    return n
  end
end
for val in countdown(3) do
  print(val)  -- should print 2, 1, 0
end`,
      solution: `local function countdown(n)
  return function()
    if n <= 0 then return nil end
    n = n - 1
    return n
  end
end
for val in countdown(3) do
  print(val) -- 2, 1, 0
end`,
      hints: ['The generic for stops when the iterator returns nil.', 'Without a nil return, the loop is infinite.', 'Check if n <= 0 and return nil to stop.'],
      concepts: ['iterators', 'closures'],
    },
    {
      id: 'lua-closures-15',
      title: 'Fix Factory Reset Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the factory that does not create independent instances.',
      skeleton: `local data = {}
local function makeStack()
  return {
    push = function(val) data[#data + 1] = val end,
    pop = function() return table.remove(data) end,
    size = function() return #data end,
  }
end
local s1 = makeStack()
local s2 = makeStack()
s1.push(1)
print(s2.size()) -- should print 0, not 1`,
      solution: `local function makeStack()
  local data = {}
  return {
    push = function(val) data[#data + 1] = val end,
    pop = function() return table.remove(data) end,
    size = function() return #data end,
  }
end
local s1 = makeStack()
local s2 = makeStack()
s1.push(1)
print(s2.size()) -- 0`,
      hints: ['data is shared between all stacks.', 'Move local data inside the factory.', 'Each call creates its own data table.'],
      concepts: ['closures', 'factory-functions'],
    },
    {
      id: 'lua-closures-16',
      title: 'Predict Closure Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local function make()
  local x = 0
  local function inc() x = x + 1 end
  local function get() return x end
  return inc, get
end
local inc, get = make()
inc(); inc(); inc()
print(get())`,
      solution: `3`,
      hints: ['inc and get share the same x upvalue.', 'inc is called 3 times, so x becomes 3.', 'get returns the current value of x.'],
      concepts: ['closures', 'shared-upvalues'],
    },
    {
      id: 'lua-closures-17',
      title: 'Predict Independent Closures',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local function makeCounter()
  local n = 0
  return function() n = n + 1; return n end
end
local a = makeCounter()
local b = makeCounter()
print(a(), a(), b())`,
      solution: `1\t2\t1`,
      hints: ['Each makeCounter() call creates a new n.', 'a and b have independent counters.', 'a() returns 1, 2; b() returns 1.'],
      concepts: ['closures', 'independent-state'],
    },
    {
      id: 'lua-closures-18',
      title: 'Predict Upvalue Capture',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local function outer()
  local x = 10
  local function inner()
    return x
  end
  x = 20
  return inner
end
print(outer()())`,
      solution: `20`,
      hints: ['The closure captures the variable, not the value.', 'x is changed to 20 before inner is returned.', 'inner sees the current value of x.'],
      concepts: ['upvalue-capture'],
    },
    {
      id: 'lua-closures-19',
      title: 'Refactor to Closure Pattern',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the global state into a closure-based factory.',
      skeleton: `local balance = 0
local function deposit(amount)
  balance = balance + amount
end
local function withdraw(amount)
  balance = balance - amount
end
local function getBalance()
  return balance
end
deposit(100)
withdraw(30)
print(getBalance())`,
      solution: `local function makeAccount(initial)
  local balance = initial or 0
  return {
    deposit = function(amount) balance = balance + amount end,
    withdraw = function(amount) balance = balance - amount end,
    getBalance = function() return balance end,
  }
end
local acct = makeAccount(0)
acct.deposit(100)
acct.withdraw(30)
print(acct.getBalance())`,
      hints: ['Wrap balance inside a factory function.', 'Return a table of closure functions.', 'Each account gets its own balance.'],
      concepts: ['refactoring', 'closures', 'encapsulation'],
    },
    {
      id: 'lua-closures-20',
      title: 'Refactor Callbacks to Closures',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the repeated callback logic into a closure-based event system.',
      skeleton: `local handlers = {}
local function onEvent(name, fn)
  handlers[name] = fn
end
local function emit(name, data)
  if handlers[name] then handlers[name](data) end
end
onEvent("click", function(d) print("clicked: " .. d) end)
emit("click", "button")`,
      solution: `local function makeEventEmitter()
  local handlers = {}
  return {
    on = function(name, fn)
      handlers[name] = handlers[name] or {}
      handlers[name][#handlers[name] + 1] = fn
    end,
    emit = function(name, data)
      for _, fn in ipairs(handlers[name] or {}) do
        fn(data)
      end
    end,
  }
end
local emitter = makeEventEmitter()
emitter.on("click", function(d) print("clicked: " .. d) end)
emitter.emit("click", "button")`,
      hints: ['Encapsulate handlers in a factory.', 'Support multiple handlers per event.', 'Use a table of arrays.'],
      concepts: ['refactoring', 'closures', 'event-system'],
    },
  ],
};
