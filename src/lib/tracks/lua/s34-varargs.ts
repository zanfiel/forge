import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-varargs',
  title: '34. Varargs',
  explanation: `## Varargs in Lua

The \`...\` operator lets functions accept a variable number of arguments:

\`\`\`lua
-- Basic varargs
function printAll(...)
  local args = table.pack(...)  -- capture with count
  for i = 1, args.n do
    print(i, args[i])           -- handles nil correctly
  end
end

-- select: access varargs info
function demo(...)
  print(select("#", ...))   -- total count (including nils)
  print(select(2, ...))     -- all args from position 2 onward
end

-- table.pack and table.unpack
local packed = table.pack(1, nil, 3)  -- {1, nil, 3, n=3}
print(table.unpack(packed, 1, packed.n))  -- 1, nil, 3

-- The arg table (Lua 5.0 style, deprecated)
-- In Lua 5.3+, use ... directly

-- Varargs in nested functions
function outer(...)
  local args = table.pack(...)  -- must capture before nesting
  local function inner()
    -- ... is NOT available here!
    return table.unpack(args, 1, args.n)
  end
  return inner()
end

-- Adjustment rules: ... at end of expression list
-- keeps all values. In middle, adjusted to 1 value.
function test(...)
  local a, b = ..., "extra"  -- only first vararg used for a
  return a, b
end
\`\`\``,
  exercises: [
    {
      id: 'lua-varargs-1',
      title: 'Basic Varargs',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Accept variable arguments and count them.',
      skeleton: `function countArgs(___)
  return select("#", ___)
end
print(countArgs(1, 2, 3))    -- 3
print(countArgs("a", "b"))   -- 2`,
      solution: `function countArgs(...)
  return select("#", ...)
end
print(countArgs(1, 2, 3))    -- 3
print(countArgs("a", "b"))   -- 2`,
      hints: [
        'Use ... as the parameter to accept variable arguments.',
        'select("#", ...) returns the total argument count.',
        'This count includes nil arguments.',
      ],
      concepts: ['varargs', 'select'],
    },
    {
      id: 'lua-varargs-2',
      title: 'Pack Varargs',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use table.pack to capture varargs into a table.',
      skeleton: `function packArgs(...)
  local t = table.___(...)
  return t, t.n
end
local t, n = packArgs(10, 20, 30)
print(n)     -- 3
print(t[2])  -- 20`,
      solution: `function packArgs(...)
  local t = table.pack(...)
  return t, t.n
end
local t, n = packArgs(10, 20, 30)
print(n)     -- 3
print(t[2])  -- 20`,
      hints: [
        'table.pack(...) creates a table from the arguments.',
        'The .n field stores the argument count.',
        'This correctly handles nil values.',
      ],
      concepts: ['varargs', 'table-pack'],
    },
    {
      id: 'lua-varargs-3',
      title: 'Select from Position',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use select to skip the first argument.',
      skeleton: `function skipFirst(...)
  return ___(2, ...)
end
print(skipFirst("a", "b", "c"))  -- b  c`,
      solution: `function skipFirst(...)
  return select(2, ...)
end
print(skipFirst("a", "b", "c"))  -- b  c`,
      hints: [
        'select(n, ...) returns all arguments from position n onward.',
        'select(2, ...) skips the first argument.',
        'The remaining arguments are returned as multiple values.',
      ],
      concepts: ['varargs', 'select'],
    },
    {
      id: 'lua-varargs-4',
      title: 'Predict Varargs Adjustment',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how varargs are adjusted in expressions.',
      skeleton: `function test(...)
  local a, b = ..., "end"
  print(a, b)
end
test(1, 2, 3)`,
      solution: `1	end`,
      hints: [
        'When ... is not at the end of an expression list, it adjusts to one value.',
        'Only the first vararg (1) is assigned to a.',
        'The string "end" is assigned to b.',
      ],
      concepts: ['varargs', 'adjustment-rules'],
    },
    {
      id: 'lua-varargs-5',
      title: 'Predict Select Count with Nil',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict select("#", ...) when nils are present.',
      skeleton: `function test(...)
  print(select("#", ...))
end
test(1, nil, 3, nil)`,
      solution: `4`,
      hints: [
        'select("#", ...) counts ALL arguments including nils.',
        'There are 4 arguments: 1, nil, 3, nil.',
        'This is different from #table which may not count past nils.',
      ],
      concepts: ['varargs', 'select', 'nil'],
    },
    {
      id: 'lua-varargs-6',
      title: 'Write Sum Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function that sums all its arguments using varargs.',
      skeleton: `-- Write sum(...) that returns the sum of all numeric arguments.
-- Skip any nil values.

-- YOUR CODE HERE`,
      solution: `function sum(...)
  local total = 0
  for i = 1, select("#", ...) do
    local v = select(i, ...)
    if v then total = total + v end
  end
  return total
end`,
      hints: [
        'Use select("#", ...) to get the count.',
        'Use select(i, ...) to get each argument.',
        'Check for nil before adding.',
      ],
      concepts: ['varargs', 'select', 'iteration'],
    },
    {
      id: 'lua-varargs-7',
      title: 'Write Printf Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a printf function that formats and prints.',
      skeleton: `-- Write printf(fmt, ...) that calls string.format
-- with fmt and all varargs, then prints the result.

-- YOUR CODE HERE`,
      solution: `function printf(fmt, ...)
  print(string.format(fmt, ...))
end`,
      hints: [
        'Pass ... directly to string.format.',
        'The ... expands to all additional arguments.',
        'Print the formatted result.',
      ],
      concepts: ['varargs', 'string-format'],
    },
    {
      id: 'lua-varargs-8',
      title: 'Fix Varargs in Nested Function',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code where varargs are not accessible in a nested function.',
      skeleton: `function makeAdder(...)
  return function(x)
    local sum = x
    for i = 1, select("#", ...) do  -- BUG: ... not available here
      sum = sum + select(i, ...)
    end
    return sum
  end
end
local add = makeAdder(1, 2, 3)
print(add(10))  -- should print 16`,
      solution: `function makeAdder(...)
  local args = table.pack(...)  -- FIXED: capture varargs first
  return function(x)
    local sum = x
    for i = 1, args.n do
      sum = sum + args[i]
    end
    return sum
  end
end
local add = makeAdder(1, 2, 3)
print(add(10))  -- should print 16`,
      hints: [
        'Varargs (...) are not accessible inside nested functions.',
        'Capture them into a table with table.pack first.',
        'The nested function can then access the captured table.',
      ],
      concepts: ['varargs', 'closures', 'debugging'],
    },
    {
      id: 'lua-varargs-9',
      title: 'Write First and Rest',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write functions to extract the first element and the rest from varargs.',
      skeleton: `-- Write first(...) that returns the first argument.
-- Write rest(...) that returns all but the first argument.

-- YOUR CODE HERE`,
      solution: `function first(...)
  return (select(1, ...))
end

function rest(...)
  return select(2, ...)
end`,
      hints: [
        'select(1, ...) returns all args from position 1.',
        'Wrapping in () adjusts to single value for first.',
        'select(2, ...) skips the first argument.',
      ],
      concepts: ['varargs', 'select'],
    },
    {
      id: 'lua-varargs-10',
      title: 'Fix table.unpack with Nils',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix unpack that loses trailing nils.',
      skeleton: `function identity(...)
  local t = table.pack(...)
  return table.unpack(t)  -- BUG: loses trailing nils
end

local a, b, c = identity(1, nil, 3)
print(select("#", identity(1, nil, 3)))  -- should be 3, might not be`,
      solution: `function identity(...)
  local t = table.pack(...)
  return table.unpack(t, 1, t.n)  -- FIXED: use explicit n
end

local a, b, c = identity(1, nil, 3)
print(select("#", identity(1, nil, 3)))  -- 3`,
      hints: [
        'table.unpack(t) uses #t which may not include trailing nils.',
        'table.unpack(t, 1, t.n) explicitly specifies the range.',
        'Always use the .n field from table.pack for the range.',
      ],
      concepts: ['varargs', 'table-unpack', 'debugging'],
    },
    {
      id: 'lua-varargs-11',
      title: 'Write Apply Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that calls another function with arguments from a table.',
      skeleton: `-- Write apply(fn, args) where args is a table with an
-- optional .n field (from table.pack). Call fn with the
-- unpacked arguments and return all results.

-- YOUR CODE HERE`,
      solution: `function apply(fn, args)
  local n = args.n or #args
  return fn(table.unpack(args, 1, n))
end`,
      hints: [
        'Use table.unpack to expand the args table.',
        'Use args.n if available, otherwise fall back to #args.',
        'Return all results from the function call.',
      ],
      concepts: ['varargs', 'table-unpack', 'apply'],
    },
    {
      id: 'lua-varargs-12',
      title: 'Write Bind Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a partial application function using varargs.',
      skeleton: `-- Write bind(fn, ...) that returns a new function.
-- When called, the new function prepends the bound args
-- before its own args and calls fn.
-- Example: local add5 = bind(add, 5); add5(3) -> add(5, 3)

-- YOUR CODE HERE`,
      solution: `function bind(fn, ...)
  local bound = table.pack(...)
  return function(...)
    local callArgs = table.pack(...)
    local allArgs = {}
    for i = 1, bound.n do
      allArgs[i] = bound[i]
    end
    for i = 1, callArgs.n do
      allArgs[bound.n + i] = callArgs[i]
    end
    return fn(table.unpack(allArgs, 1, bound.n + callArgs.n))
  end
end`,
      hints: [
        'Capture the bound arguments with table.pack.',
        'In the returned function, merge bound and new args.',
        'Use table.unpack with explicit count to call fn.',
      ],
      concepts: ['varargs', 'partial-application', 'closures'],
    },
    {
      id: 'lua-varargs-13',
      title: 'Predict Varargs in Table Constructor',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how varargs behave inside table constructors.',
      skeleton: `function test(...)
  local t1 = {...}
  local t2 = {10, ...}
  local t3 = {..., 99}
  return #t1, #t2, #t3
end
print(test(1, 2, 3))`,
      solution: `3	4	2`,
      hints: [
        '{...} captures all varargs into a table.',
        '{10, ...} puts 10 first, then all varargs.',
        '{..., 99} - varargs not at end adjusts to 1 value, so {1, 99}.',
      ],
      concepts: ['varargs', 'adjustment-rules', 'tables'],
    },
    {
      id: 'lua-varargs-14',
      title: 'Write Map with Varargs',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a map function that applies a transform to all varargs.',
      skeleton: `-- Write map(fn, ...) that applies fn to each argument
-- and returns all results as multiple values.
-- Example: map(tostring, 1, 2, 3) -> "1", "2", "3"

-- YOUR CODE HERE`,
      solution: `function map(fn, ...)
  local results = {}
  local n = select("#", ...)
  for i = 1, n do
    results[i] = fn(select(i, ...))
  end
  return table.unpack(results, 1, n)
end`,
      hints: [
        'Use select("#", ...) for the count.',
        'Apply fn to each argument using select(i, ...).',
        'Collect results and unpack them.',
      ],
      concepts: ['varargs', 'select', 'map'],
    },
    {
      id: 'lua-varargs-15',
      title: 'Fix Varargs Forwarding',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Fix varargs that get truncated during forwarding.',
      skeleton: `function wrapper(fn, ...)
  local prefix = "called"
  print(prefix)
  return fn(prefix, ...)  -- BUG: we don't want prefix passed to fn
end

function add(a, b)
  return a + b
end

print(wrapper(add, 3, 4))  -- should print 7, not error`,
      solution: `function wrapper(fn, ...)
  local prefix = "called"
  print(prefix)
  return fn(...)  -- FIXED: don't pass prefix to fn
end

function add(a, b)
  return a + b
end

print(wrapper(add, 3, 4))  -- prints 7`,
      hints: [
        'fn(prefix, ...) passes prefix as the first argument to fn.',
        'We only want to pass the original varargs to fn.',
        'Remove prefix from the fn call.',
      ],
      concepts: ['varargs', 'forwarding', 'debugging'],
    },
    {
      id: 'lua-varargs-16',
      title: 'Write Zip Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that zips multiple tables passed as varargs.',
      skeleton: `-- Write zip(...) that takes multiple tables and returns
-- a table of tuples. The length is the minimum table length.
-- Example: zip({1,2,3}, {"a","b","c"}) -> {{1,"a"},{2,"b"},{3,"c"}}

-- YOUR CODE HERE`,
      solution: `function zip(...)
  local tables = table.pack(...)
  if tables.n == 0 then return {} end
  local minLen = math.huge
  for i = 1, tables.n do
    if #tables[i] < minLen then
      minLen = #tables[i]
    end
  end
  local result = {}
  for i = 1, minLen do
    local tuple = {}
    for j = 1, tables.n do
      tuple[j] = tables[j][i]
    end
    result[i] = tuple
  end
  return result
end`,
      hints: [
        'Pack all table arguments with table.pack.',
        'Find the minimum length across all tables.',
        'Build tuples by taking element i from each table.',
      ],
      concepts: ['varargs', 'table-pack', 'algorithms'],
    },
    {
      id: 'lua-varargs-17',
      title: 'Refactor Positional Args to Varargs',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor a function with fixed args to use varargs.',
      skeleton: `function maximum(a, b, c, d)
  local max = a
  if b and b > max then max = b end
  if c and c > max then max = c end
  if d and d > max then max = d end
  return max
end

print(maximum(3, 7, 2, 9))
print(maximum(5, 1))`,
      solution: `function maximum(...)
  local max = nil
  for i = 1, select("#", ...) do
    local v = select(i, ...)
    if max == nil or v > max then
      max = v
    end
  end
  return max
end

print(maximum(3, 7, 2, 9))
print(maximum(5, 1))`,
      hints: [
        'Replace fixed parameters with ...',
        'Use select("#", ...) for the count.',
        'Loop through all arguments dynamically.',
      ],
      concepts: ['varargs', 'refactoring'],
    },
    {
      id: 'lua-varargs-18',
      title: 'Refactor Table Arg to Varargs',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor a function that takes a table to use varargs directly.',
      skeleton: `function printItems(items)
  for i = 1, #items do
    print(i .. ": " .. tostring(items[i]))
  end
end

printItems({"apple", "banana", "cherry"})`,
      solution: `function printItems(...)
  for i = 1, select("#", ...) do
    print(i .. ": " .. tostring(select(i, ...)))
  end
end

printItems("apple", "banana", "cherry")`,
      hints: [
        'Replace the table parameter with ...',
        'Use select to iterate over varargs.',
        'Callers now pass values directly instead of wrapping in a table.',
      ],
      concepts: ['varargs', 'refactoring', 'select'],
    },
    {
      id: 'lua-varargs-19',
      title: 'Write Curry Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that collects arguments one at a time until enough are gathered.',
      skeleton: `-- Write curry(fn, arity) that returns a function which
-- collects arguments one call at a time. When arity
-- arguments have been collected, call fn with all of them.
-- Example: local cadd = curry(function(a,b) return a+b end, 2)
--          cadd(3)(4) -> 7

-- YOUR CODE HERE`,
      solution: `function curry(fn, arity)
  local function helper(collected, n)
    if n >= arity then
      return fn(table.unpack(collected, 1, n))
    end
    return function(arg)
      collected[n + 1] = arg
      return helper(collected, n + 1)
    end
  end
  return helper({}, 0)
end`,
      hints: [
        'Use a recursive helper that tracks collected arguments.',
        'When enough arguments are collected, call fn.',
        'Otherwise return a function that collects the next argument.',
      ],
      concepts: ['varargs', 'currying', 'closures'],
    },
    {
      id: 'lua-varargs-20',
      title: 'Write Pipeline with Varargs',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a pipeline function that threads a value through multiple functions.',
      skeleton: `-- Write pipe(value, ...) where ... are functions.
-- Calls each function with the result of the previous one.
-- Example: pipe(5, double, addOne) where double(x)=x*2, addOne(x)=x+1
-- Result: addOne(double(5)) = 11

-- YOUR CODE HERE`,
      solution: `function pipe(value, ...)
  local result = value
  for i = 1, select("#", ...) do
    local fn = select(i, ...)
    result = fn(result)
  end
  return result
end`,
      hints: [
        'Start with the initial value.',
        'Iterate through each function argument with select.',
        'Apply each function to the running result.',
      ],
      concepts: ['varargs', 'pipeline', 'functional'],
    },
  ],
};
