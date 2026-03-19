import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-func',
  title: '08. Functions',
  explanation: `## Functions in Lua

Functions are first-class values in Lua. They can be stored in variables, passed as arguments, and returned from other functions.

### Function Declaration
\`\`\`lua
-- Named function (syntactic sugar)
local function greet(name)
  return "Hello, " .. name
end

-- Anonymous function in variable
local greet = function(name)
  return "Hello, " .. name
end
\`\`\`

### Multiple Return Values
\`\`\`lua
local function minmax(a, b)
  if a < b then
    return a, b
  else
    return b, a
  end
end
local lo, hi = minmax(5, 3)
\`\`\`

### Variadic Functions
\`\`\`lua
local function sum(...)
  local args = {...}
  local total = 0
  for i = 1, #args do
    total = total + args[i]
  end
  return total
end
print(sum(1, 2, 3)) -- 6
\`\`\`

### First-Class Functions
\`\`\`lua
local function apply(fn, x)
  return fn(x)
end
print(apply(math.sqrt, 16)) -- 4.0
\`\`\``,
  exercises: [
    {
      id: 'lua-func-1',
      title: 'Declare a Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Declare a local function named double that returns n * 2.',
      skeleton: `local ___ double(n)
  return n * 2
end
print(double(5))`,
      solution: `local function double(n)
  return n * 2
end
print(double(5))`,
      hints: ['Use "local function" to declare a local function.', 'The syntax is: local function name(params).', 'Fill in "function".'],
      concepts: ['function-declaration'],
    },
    {
      id: 'lua-func-2',
      title: 'Return a Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the function to return the square of n.',
      skeleton: `local function square(n)
  ___ n * n
end
print(square(4)) -- should print 16`,
      solution: `local function square(n)
  return n * n
end
print(square(4)) -- should print 16`,
      hints: ['Use the return keyword.', 'return sends a value back to the caller.', 'Fill in "return".'],
      concepts: ['return-values'],
    },
    {
      id: 'lua-func-3',
      title: 'Multiple Return Values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Capture both return values from the function.',
      skeleton: `local function divide(a, b)
  return a // b, a % b
end
local quotient, ___ = divide(17, 5)
print(quotient, remainder)`,
      solution: `local function divide(a, b)
  return a // b, a % b
end
local quotient, remainder = divide(17, 5)
print(quotient, remainder)`,
      hints: ['Functions can return multiple values.', 'Capture them with multiple variables.', 'Fill in "remainder".'],
      concepts: ['multiple-returns'],
    },
    {
      id: 'lua-func-4',
      title: 'Variadic Arguments',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Collect variadic arguments into a table.',
      skeleton: `local function count(...)
  local args = {___}
  return #args
end
print(count(1, 2, 3)) -- should print 3`,
      solution: `local function count(...)
  local args = {...}
  return #args
end
print(count(1, 2, 3)) -- should print 3`,
      hints: ['... represents variadic arguments.', '{...} collects them into a table.', 'Fill in "..." inside the braces.'],
      concepts: ['variadic-functions'],
    },
    {
      id: 'lua-func-5',
      title: 'Pass Function as Argument',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Pass math.abs as an argument to the apply function.',
      skeleton: `local function apply(fn, x)
  return fn(x)
end
print(apply(___, -5)) -- should print 5`,
      solution: `local function apply(fn, x)
  return fn(x)
end
print(apply(math.abs, -5)) -- should print 5`,
      hints: ['Functions are first-class values.', 'Pass math.abs without calling it (no parentheses).', 'Fill in math.abs.'],
      concepts: ['first-class-functions'],
    },
    {
      id: 'lua-func-6',
      title: 'Anonymous Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create an anonymous function that triples its input.',
      skeleton: `local triple = ___(x) return x * 3 end
print(triple(4)) -- should print 12`,
      solution: `local triple = function(x) return x * 3 end
print(triple(4)) -- should print 12`,
      hints: ['Anonymous functions use the function keyword.', 'function(params) body end', 'Fill in "function".'],
      concepts: ['anonymous-functions'],
    },
    {
      id: 'lua-func-7',
      title: 'Write a Compose Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function compose(f, g) that returns a new function h(x) = f(g(x)).',
      skeleton: `-- Write function compose(f, g)`,
      solution: `local function compose(f, g)
  return function(x)
    return f(g(x))
  end
end

local double = function(x) return x * 2 end
local addOne = function(x) return x + 1 end
local doubleAndAdd = compose(addOne, double)
print(doubleAndAdd(5)) -- 11`,
      hints: ['Return a new function that chains f and g.', 'The inner function calls g first, then f.', 'return function(x) return f(g(x)) end'],
      concepts: ['composition', 'higher-order-functions'],
    },
    {
      id: 'lua-func-8',
      title: 'Write a Memoize Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function memoize(fn) that caches results for single-argument functions.',
      skeleton: `-- Write function memoize(fn)`,
      solution: `local function memoize(fn)
  local cache = {}
  return function(x)
    if cache[x] == nil then
      cache[x] = fn(x)
    end
    return cache[x]
  end
end

local function slowSquare(x)
  return x * x
end
local fastSquare = memoize(slowSquare)
print(fastSquare(5)) -- 25
print(fastSquare(5)) -- 25 (cached)`,
      hints: ['Use a table as a cache.', 'Check if the result is already cached.', 'Store and return the result.'],
      concepts: ['memoization', 'closures'],
    },
    {
      id: 'lua-func-9',
      title: 'Write a Variadic Sum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function sum(...) that sums all its arguments.',
      skeleton: `-- Write function sum(...)`,
      solution: `local function sum(...)
  local args = {...}
  local total = 0
  for i = 1, #args do
    total = total + args[i]
  end
  return total
end

print(sum(1, 2, 3))       -- 6
print(sum(10, 20, 30, 40)) -- 100`,
      hints: ['Collect arguments with {...}.', 'Loop through the args table.', 'Sum all values and return.'],
      concepts: ['variadic-functions'],
    },
    {
      id: 'lua-func-10',
      title: 'Write a Curry Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function curry(fn) that converts a two-argument function into curried form: curry(fn)(a)(b) = fn(a, b).',
      skeleton: `-- Write function curry(fn) for two-argument functions`,
      solution: `local function curry(fn)
  return function(a)
    return function(b)
      return fn(a, b)
    end
  end
end

local add = function(a, b) return a + b end
local addFive = curry(add)(5)
print(addFive(3))  -- 8
print(addFive(10)) -- 15`,
      hints: ['Return a function that returns another function.', 'The first function captures the first argument.', 'The second function calls fn with both arguments.'],
      concepts: ['currying', 'closures'],
    },
    {
      id: 'lua-func-11',
      title: 'Write a Once Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function once(fn) that returns a function that calls fn only the first time.',
      skeleton: `-- Write function once(fn)`,
      solution: `local function once(fn)
  local called = false
  local result
  return function(...)
    if not called then
      called = true
      result = fn(...)
    end
    return result
  end
end

local init = once(function() print("initialized"); return 42 end)
print(init()) -- prints "initialized", returns 42
print(init()) -- returns 42 (no "initialized")`,
      hints: ['Track if the function has been called.', 'Store the result of the first call.', 'Return the cached result on subsequent calls.'],
      concepts: ['closures', 'state'],
    },
    {
      id: 'lua-func-12',
      title: 'Write a Pipe Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function pipe(...) that takes multiple functions and returns a new function that pipes a value through all of them left-to-right.',
      skeleton: `-- Write function pipe(...)`,
      solution: `local function pipe(...)
  local fns = {...}
  return function(x)
    local result = x
    for i = 1, #fns do
      result = fns[i](result)
    end
    return result
  end
end

local transform = pipe(
  function(x) return x + 1 end,
  function(x) return x * 2 end,
  function(x) return x - 3 end
)
print(transform(5)) -- (5+1)*2-3 = 9`,
      hints: ['Collect all functions into a table.', 'Return a function that applies each one in order.', 'Pass the result of each function to the next.'],
      concepts: ['pipe', 'higher-order-functions'],
    },
    {
      id: 'lua-func-13',
      title: 'Fix Missing Return Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the function that does not return its result.',
      skeleton: `local function add(a, b)
  a + b
end
print(add(2, 3)) -- should print 5`,
      solution: `local function add(a, b)
  return a + b
end
print(add(2, 3)) -- should print 5`,
      hints: ['Lua functions do not auto-return the last expression.', 'You must use the return keyword.', 'Add return before a + b.'],
      concepts: ['return-values'],
    },
    {
      id: 'lua-func-14',
      title: 'Fix Extra Args Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the function to handle being called with too few arguments.',
      skeleton: `local function greet(name, greeting)
  print(greeting .. ", " .. name .. "!")
end
greet("Alice") -- should print "Hello, Alice!" with default greeting`,
      solution: `local function greet(name, greeting)
  greeting = greeting or "Hello"
  print(greeting .. ", " .. name .. "!")
end
greet("Alice") -- prints "Hello, Alice!"`,
      hints: ['Missing arguments become nil.', 'nil .. string causes an error.', 'Use "or" to provide a default value.'],
      concepts: ['default-parameters', 'or-idiom'],
    },
    {
      id: 'lua-func-15',
      title: 'Fix Recursive Call Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the recursive function declaration.',
      skeleton: `local factorial = function(n)
  if n <= 1 then return 1 end
  return n * factorial(n - 1)
end
print(factorial(5))`,
      solution: `local function factorial(n)
  if n <= 1 then return 1 end
  return n * factorial(n - 1)
end
print(factorial(5))`,
      hints: ['Anonymous functions assigned to locals cannot self-reference.', 'local function name() is syntactic sugar that handles this.', 'Use "local function factorial" instead of "local factorial = function".'],
      concepts: ['recursion', 'function-declaration'],
    },
    {
      id: 'lua-func-16',
      title: 'Predict Multiple Return',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local function multi()
  return 1, 2, 3
end
local a = multi()
print(a)`,
      solution: `1`,
      hints: ['When assigned to a single variable, extra returns are discarded.', 'Only the first return value is captured.', 'a gets 1.'],
      concepts: ['multiple-returns'],
    },
    {
      id: 'lua-func-17',
      title: 'Predict Adjusted Return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local function two()
  return 1, 2
end
print(two(), "end")`,
      solution: `1\tend`,
      hints: ['Multiple returns in the middle of an arg list are adjusted to one.', 'Only the last call in an argument list keeps all returns.', 'two() in the middle yields only 1.'],
      concepts: ['multiple-returns', 'adjustment'],
    },
    {
      id: 'lua-func-18',
      title: 'Predict Nil Arguments',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local function test(a, b, c)
  print(a, b, c)
end
test(1)`,
      solution: `1\tnil\tnil`,
      hints: ['Missing arguments become nil.', 'Only a gets the value 1.', 'b and c are nil.'],
      concepts: ['function-arguments', 'nil'],
    },
    {
      id: 'lua-func-19',
      title: 'Refactor to Named Function',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Refactor the anonymous function assignment to a named function declaration.',
      skeleton: `local multiply = function(a, b)
  return a * b
end
print(multiply(3, 4))`,
      solution: `local function multiply(a, b)
  return a * b
end
print(multiply(3, 4))`,
      hints: ['local function name() is preferred style.', 'It also allows recursion.', 'Replace "local name = function" with "local function name".'],
      concepts: ['function-declaration', 'refactoring'],
    },
    {
      id: 'lua-func-20',
      title: 'Refactor Repeated Default Logic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor repeated default parameter handling into clean "or" idioms.',
      skeleton: `local function createUser(name, age, role)
  if name == nil then name = "Anonymous" end
  if age == nil then age = 0 end
  if role == nil then role = "user" end
  return {name = name, age = age, role = role}
end
local u = createUser()
print(u.name, u.age, u.role)`,
      solution: `local function createUser(name, age, role)
  name = name or "Anonymous"
  age = age or 0
  role = role or "user"
  return {name = name, age = age, role = role}
end
local u = createUser()
print(u.name, u.age, u.role)`,
      hints: ['Use the "or" idiom for defaults.', 'name = name or "default" is shorter.', 'Note: this treats false as nil too.'],
      concepts: ['or-idiom', 'refactoring'],
    },
  ],
};
