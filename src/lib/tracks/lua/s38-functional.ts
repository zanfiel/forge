import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-functional',
  title: '38. Functional',
  explanation: `## Functional Programming in Lua

Lua's first-class functions enable powerful functional patterns:

\`\`\`lua
-- Higher-order functions
function apply(fn, x) return fn(x) end
function twice(fn) return function(x) return fn(fn(x)) end end

-- Compose: combine functions right-to-left
function compose(f, g)
  return function(...) return f(g(...)) end
end
local shout = compose(string.upper, function(s) return s.."!" end)
print(shout("hello"))  -- "HELLO!"

-- Partial application
function partial(fn, ...)
  local args = table.pack(...)
  return function(...)
    local allArgs = {}
    for i = 1, args.n do allArgs[i] = args[i] end
    local extra = table.pack(...)
    for i = 1, extra.n do allArgs[args.n + i] = extra[i] end
    return fn(table.unpack(allArgs, 1, args.n + extra.n))
  end
end

-- Currying
function curry(fn)
  return function(a) return function(b) return fn(a, b) end end
end
local add = curry(function(a, b) return a + b end)
print(add(3)(4))  -- 7

-- Memoization
function memoize(fn)
  local cache = {}
  return function(x)
    if cache[x] == nil then cache[x] = fn(x) end
    return cache[x]
  end
end
\`\`\``,
  exercises: [
    {
      id: 'lua-functional-1',
      title: 'Pass Function as Argument',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Pass a function as an argument to another function.',
      skeleton: `function apply(fn, value)
  return ___(value)
end
local result = apply(math.sqrt, 16)
print(result)  -- 4.0`,
      solution: `function apply(fn, value)
  return fn(value)
end
local result = apply(math.sqrt, 16)
print(result)  -- 4.0`,
      hints: [
        'fn is a function stored in a variable.',
        'Call it like any other function: fn(value).',
        'Functions are first-class values in Lua.',
      ],
      concepts: ['functional', 'higher-order'],
    },
    {
      id: 'lua-functional-2',
      title: 'Return Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a function that returns another function.',
      skeleton: `function makeMultiplier(factor)
  return ___(x)
    return x * factor
  end
end
local double = makeMultiplier(2)
print(double(5))  -- 10`,
      solution: `function makeMultiplier(factor)
  return function(x)
    return x * factor
  end
end
local double = makeMultiplier(2)
print(double(5))  -- 10`,
      hints: [
        'Return an anonymous function with the function keyword.',
        'The inner function captures factor from the outer scope.',
        'This creates a closure.',
      ],
      concepts: ['functional', 'closures', 'factory'],
    },
    {
      id: 'lua-functional-3',
      title: 'Write Compose',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that composes two functions.',
      skeleton: `-- Write compose(f, g) that returns a new function h
-- where h(x) = f(g(x)).

-- YOUR CODE HERE`,
      solution: `function compose(f, g)
  return function(...)
    return f(g(...))
  end
end`,
      hints: [
        'compose applies g first, then f to the result.',
        'Use ... to pass through all arguments to g.',
        'Return whatever f returns.',
      ],
      concepts: ['functional', 'compose'],
    },
    {
      id: 'lua-functional-4',
      title: 'Write Pipe',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write pipe that composes functions left-to-right.',
      skeleton: `-- Write pipe(...) that takes multiple functions and returns
-- a new function that applies them left-to-right.
-- pipe(f, g, h)(x) = h(g(f(x)))

-- YOUR CODE HERE`,
      solution: `function pipe(...)
  local fns = table.pack(...)
  return function(...)
    local result = table.pack(fns[1](...))
    for i = 2, fns.n do
      result = table.pack(fns[i](table.unpack(result, 1, result.n)))
    end
    return table.unpack(result, 1, result.n)
  end
end`,
      hints: [
        'Capture all functions with table.pack.',
        'Apply the first function to the input.',
        'Feed each result into the next function.',
      ],
      concepts: ['functional', 'pipe', 'composition'],
    },
    {
      id: 'lua-functional-5',
      title: 'Predict Closure Capture',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict what a closure captures.',
      skeleton: `function makeCounter()
  local count = 0
  return {
    inc = function() count = count + 1 end,
    get = function() return count end,
  }
end
local c = makeCounter()
c.inc()
c.inc()
c.inc()
print(c.get())`,
      solution: `3`,
      hints: [
        'Both inc and get share the same count variable.',
        'inc increments it three times.',
        'get returns the current value: 3.',
      ],
      concepts: ['functional', 'closures', 'shared-state'],
    },
    {
      id: 'lua-functional-6',
      title: 'Write Memoize',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a memoization function for single-argument functions.',
      skeleton: `-- Write memoize(fn) that returns a cached version.
-- The first call with a given argument computes and caches.
-- Subsequent calls return the cached value.

-- YOUR CODE HERE`,
      solution: `function memoize(fn)
  local cache = {}
  return function(x)
    if cache[x] == nil then
      cache[x] = fn(x)
    end
    return cache[x]
  end
end`,
      hints: [
        'Use a table as the cache, keyed by argument.',
        'Check if the result is already cached.',
        'This only works correctly for single-argument functions.',
      ],
      concepts: ['functional', 'memoization', 'closures'],
    },
    {
      id: 'lua-functional-7',
      title: 'Write Partial Application',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement partial application.',
      skeleton: `-- Write partial(fn, ...) that fixes the first arguments.
-- partial(add, 5)(3) should be like add(5, 3).

-- YOUR CODE HERE`,
      solution: `function partial(fn, ...)
  local bound = table.pack(...)
  return function(...)
    local extra = table.pack(...)
    local all = {}
    for i = 1, bound.n do all[i] = bound[i] end
    for i = 1, extra.n do all[bound.n + i] = extra[i] end
    return fn(table.unpack(all, 1, bound.n + extra.n))
  end
end`,
      hints: [
        'Capture the bound arguments with table.pack.',
        'Merge bound and extra arguments.',
        'Call fn with the combined arguments.',
      ],
      concepts: ['functional', 'partial-application'],
    },
    {
      id: 'lua-functional-8',
      title: 'Fix Compose Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the compose function that applies functions in the wrong order.',
      skeleton: `function compose(f, g)
  return function(x) return g(f(x)) end  -- BUG: wrong order
end

local addBang = function(s) return s .. "!" end
local upper = string.upper
local shout = compose(upper, addBang)
print(shout("hello"))  -- should print "HELLO!" not "hello!"`,
      solution: `function compose(f, g)
  return function(x) return f(g(x)) end  -- FIXED: f(g(x))
end

local addBang = function(s) return s .. "!" end
local upper = string.upper
local shout = compose(upper, addBang)
print(shout("hello"))  -- "HELLO!"`,
      hints: [
        'compose(f, g) should mean f after g: f(g(x)).',
        'g is applied first, then f is applied to the result.',
        'The original had f applied first, then g.',
      ],
      concepts: ['functional', 'compose', 'debugging'],
    },
    {
      id: 'lua-functional-9',
      title: 'Write Once Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that ensures another function is called at most once.',
      skeleton: `-- Write once(fn) that returns a wrapper.
-- The first call executes fn and caches the result.
-- Subsequent calls return the cached result without calling fn.

-- YOUR CODE HERE`,
      solution: `function once(fn)
  local called = false
  local result
  return function(...)
    if not called then
      result = fn(...)
      called = true
    end
    return result
  end
end`,
      hints: [
        'Use a boolean flag to track if fn has been called.',
        'Cache the result on first call.',
        'Return the cached result on subsequent calls.',
      ],
      concepts: ['functional', 'once', 'closures'],
    },
    {
      id: 'lua-functional-10',
      title: 'Predict Partial Application',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the result of partial application.',
      skeleton: `function add(a, b) return a + b end

function partial(fn, x)
  return function(y) return fn(x, y) end
end

local add10 = partial(add, 10)
print(add10(5))
print(add10(20))`,
      solution: `15
30`,
      hints: [
        'partial(add, 10) creates a function that adds 10 to its argument.',
        'add10(5) = add(10, 5) = 15.',
        'add10(20) = add(10, 20) = 30.',
      ],
      concepts: ['functional', 'partial-application'],
    },
    {
      id: 'lua-functional-11',
      title: 'Write Curry',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a curry function for a two-argument function.',
      skeleton: `-- Write curry2(fn) that converts a two-argument function
-- into a chain of single-argument functions.
-- curry2(fn)(a)(b) should equal fn(a, b).

-- YOUR CODE HERE`,
      solution: `function curry2(fn)
  return function(a)
    return function(b)
      return fn(a, b)
    end
  end
end`,
      hints: [
        'Return a function that takes the first arg and returns another function.',
        'The inner function takes the second arg and calls fn.',
        'Each function captures its argument in a closure.',
      ],
      concepts: ['functional', 'currying'],
    },
    {
      id: 'lua-functional-12',
      title: 'Fix Memoize with Nil',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the memoize function that breaks when fn returns nil.',
      skeleton: `function memoize(fn)
  local cache = {}
  return function(x)
    if cache[x] == nil then  -- BUG: can't distinguish nil result from uncached
      cache[x] = fn(x)
    end
    return cache[x]
  end
end

local function maybeNil(x)
  if x > 5 then return nil end
  return x * 2
end

local m = memoize(maybeNil)
print(m(3))   -- 6 (correct)
print(m(10))  -- nil (but fn gets called every time!)`,
      solution: `function memoize(fn)
  local cache = {}
  local sentinel = {}
  return function(x)
    if cache[x] == nil then
      local result = fn(x)
      cache[x] = result == nil and sentinel or result
    end
    local v = cache[x]
    return v == sentinel and nil or v
  end
end

local function maybeNil(x)
  if x > 5 then return nil end
  return x * 2
end

local m = memoize(maybeNil)
print(m(3))   -- 6
print(m(10))  -- nil (cached, fn not called again)`,
      hints: [
        'nil values cannot be stored in tables (they disappear).',
        'Use a sentinel (unique table) to represent cached nil.',
        'Convert sentinel back to nil on retrieval.',
      ],
      concepts: ['functional', 'memoization', 'debugging'],
    },
    {
      id: 'lua-functional-13',
      title: 'Write Debounce Stub',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a debounce function that only runs after a quiet period (count-based).',
      skeleton: `-- Write debounce(fn, threshold) that returns a wrapper.
-- The wrapper has :call() and :tick().
-- Each call() resets an internal counter to threshold.
-- Each tick() decrements the counter; when it hits 0,
-- fn() is called and the counter is disabled until next call().
-- :pending() returns true if waiting.

-- YOUR CODE HERE`,
      solution: `function debounce(fn, threshold)
  local counter = 0
  local active = false
  local obj = {}
  function obj.call()
    counter = threshold
    active = true
  end
  function obj.tick()
    if not active then return end
    counter = counter - 1
    if counter <= 0 then
      active = false
      fn()
    end
  end
  function obj.pending()
    return active
  end
  return obj
end`,
      hints: [
        'Track a counter and an active flag.',
        'call() resets the counter and activates.',
        'tick() decrements; at 0, fire fn and deactivate.',
      ],
      concepts: ['functional', 'debounce', 'closures'],
    },
    {
      id: 'lua-functional-14',
      title: 'Write Negate',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function that negates a predicate function.',
      skeleton: `function negate(predicate)
  return function(...)
    return ___ predicate(...)
  end
end
local isOdd = function(x) return x % 2 ~= 0 end
local isEven = negate(isOdd)
print(isEven(4))  -- true
print(isEven(3))  -- false`,
      solution: `function negate(predicate)
  return function(...)
    return not predicate(...)
  end
end
local isOdd = function(x) return x % 2 ~= 0 end
local isEven = negate(isOdd)
print(isEven(4))  -- true
print(isEven(3))  -- false`,
      hints: [
        'negate returns a function that inverts the predicate.',
        'Use the not operator to flip the boolean result.',
        'Pass through all arguments with ...',
      ],
      concepts: ['functional', 'negate', 'predicates'],
    },
    {
      id: 'lua-functional-15',
      title: 'Predict Compose Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the result of a composition chain.',
      skeleton: `local function add1(x) return x + 1 end
local function double(x) return x * 2 end
local function square(x) return x * x end

-- Compose: right to left
local fn = function(x) return square(double(add1(x))) end
print(fn(3))`,
      solution: `64`,
      hints: [
        'add1(3) = 4.',
        'double(4) = 8.',
        'square(8) = 64.',
      ],
      concepts: ['functional', 'compose', 'evaluation-order'],
    },
    {
      id: 'lua-functional-16',
      title: 'Write Every/Some',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write every and some functions for tables.',
      skeleton: `-- Write every(t, pred) that returns true if pred(v) is true for all elements.
-- Write some(t, pred) that returns true if pred(v) is true for at least one.

-- YOUR CODE HERE`,
      solution: `function every(t, pred)
  for _, v in ipairs(t) do
    if not pred(v) then return false end
  end
  return true
end

function some(t, pred)
  for _, v in ipairs(t) do
    if pred(v) then return true end
  end
  return false
end`,
      hints: [
        'every returns false as soon as any element fails.',
        'some returns true as soon as any element passes.',
        'Short-circuit evaluation makes these efficient.',
      ],
      concepts: ['functional', 'predicates', 'quantifiers'],
    },
    {
      id: 'lua-functional-17',
      title: 'Refactor Callbacks to Compose',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor nested function calls into a composition.',
      skeleton: `local function trim(s) return s:match("^%s*(.-)%s*$") end
local function lower(s) return s:lower() end
local function addPrefix(s) return "user_" .. s end

-- Nested calls are hard to read
local function processUsername(input)
  return addPrefix(lower(trim(input)))
end

print(processUsername("  Alice  "))`,
      solution: `local function trim(s) return s:match("^%s*(.-)%s*$") end
local function lower(s) return s:lower() end
local function addPrefix(s) return "user_" .. s end

local function compose(...)
  local fns = table.pack(...)
  return function(x)
    local result = x
    for i = fns.n, 1, -1 do
      result = fns[i](result)
    end
    return result
  end
end

local processUsername = compose(addPrefix, lower, trim)
print(processUsername("  Alice  "))`,
      hints: [
        'Write a compose function that applies functions right-to-left.',
        'Replace the nested call with a composed function.',
        'This makes the pipeline explicit and reusable.',
      ],
      concepts: ['functional', 'compose', 'refactoring'],
    },
    {
      id: 'lua-functional-18',
      title: 'Refactor State to Functional',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor mutable state operations into immutable functional style.',
      skeleton: `local state = {items = {}, total = 0}

function addItem(name, price)
  table.insert(state.items, {name=name, price=price})
  state.total = state.total + price
end

addItem("apple", 1.50)
addItem("banana", 0.75)
print(state.total)`,
      solution: `local function addItem(state, name, price)
  local newItems = {}
  for i, v in ipairs(state.items) do newItems[i] = v end
  newItems[#newItems + 1] = {name = name, price = price}
  return {
    items = newItems,
    total = state.total + price,
  }
end

local state = {items = {}, total = 0}
state = addItem(state, "apple", 1.50)
state = addItem(state, "banana", 0.75)
print(state.total)`,
      hints: [
        'Instead of mutating, return a new state table.',
        'Copy existing items and add the new one.',
        'The caller rebinds the state variable.',
      ],
      concepts: ['functional', 'immutability', 'refactoring'],
    },
    {
      id: 'lua-functional-19',
      title: 'Write Tap Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a tap function for debugging in a pipeline.',
      skeleton: `-- Write tap(fn) that returns a function which:
-- 1. Calls fn with its arguments (for side effects)
-- 2. Returns the original arguments unchanged
-- Useful for inserting debug prints in a pipeline.

-- YOUR CODE HERE`,
      solution: `function tap(fn)
  return function(...)
    fn(...)
    return ...
  end
end`,
      hints: [
        'tap is a pass-through that performs a side effect.',
        'Call fn with the arguments but ignore its return value.',
        'Return the original arguments unchanged.',
      ],
      concepts: ['functional', 'tap', 'debugging'],
    },
    {
      id: 'lua-functional-20',
      title: 'Write Transducer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple transducer that combines map and filter in a single pass.',
      skeleton: `-- Write transduce(t, mapFn, filterFn, reduceFn, init)
-- that maps, filters, and reduces in a single pass over t.
-- For each element: apply mapFn, then filterFn on the result,
-- if it passes, fold with reduceFn.

-- YOUR CODE HERE`,
      solution: `function transduce(t, mapFn, filterFn, reduceFn, init)
  local acc = init
  for _, v in ipairs(t) do
    local mapped = mapFn(v)
    if filterFn(mapped) then
      acc = reduceFn(acc, mapped)
    end
  end
  return acc
end`,
      hints: [
        'Process each element through map, then filter, then reduce.',
        'This avoids creating intermediate tables.',
        'A single pass is more memory-efficient than chained operations.',
      ],
      concepts: ['functional', 'transducers', 'efficiency'],
    },
  ],
};
