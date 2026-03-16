import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-multiret',
  title: '36. Multiple Returns',
  explanation: `## Multiple Returns in Lua

Lua functions can return multiple values, with specific adjustment rules:

\`\`\`lua
-- Returning multiple values
function minmax(t)
  local min, max = t[1], t[1]
  for _, v in ipairs(t) do
    if v < min then min = v end
    if v > max then max = v end
  end
  return min, max
end

local lo, hi = minmax({3, 1, 4, 1, 5})  -- lo=1, hi=5

-- Adjustment rules:
-- Multiple returns at END of expression list keep all values
-- Multiple returns NOT at the end are adjusted to ONE value

local a, b, c = minmax({1,5}), "extra"
-- a = 1 (first return from minmax, adjusted to 1 because not last)
-- b = "extra"
-- c = nil

-- table.pack preserves all returns
local t = table.pack(minmax({1,5}))  -- {1, 5, n=2}

-- select works with multiple returns
print(select(2, minmax({1,5})))  -- 5

-- In table constructors
local t = {minmax({1,5})}  -- {1, 5} (at end, keeps all)
local t = {minmax({1,5}), 99}  -- {1, 99} (not at end, adjusted)

-- Parentheses force single value
local a = (minmax({1,5}))  -- a = 1 only
\`\`\``,
  exercises: [
    {
      id: 'lua-multiret-1',
      title: 'Return Two Values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function that returns two values.',
      skeleton: `function divide(a, b)
  return a / b___ a % b
end
local q, r = divide(17, 5)
print(q, r)  -- 3.4, 2`,
      solution: `function divide(a, b)
  return a / b, a % b
end
local q, r = divide(17, 5)
print(q, r)  -- 3.4, 2`,
      hints: [
        'Separate multiple return values with commas.',
        'return val1, val2 returns two values.',
        'The caller captures them in two variables.',
      ],
      concepts: ['multiple-returns', 'basics'],
    },
    {
      id: 'lua-multiret-2',
      title: 'Capture All Returns',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Capture all return values into a table.',
      skeleton: `function threeValues()
  return 10, 20, 30
end
local t = table.___(threeValues())
print(t[1], t[2], t[3], t.n)  -- 10, 20, 30, 3`,
      solution: `function threeValues()
  return 10, 20, 30
end
local t = table.pack(threeValues())
print(t[1], t[2], t[3], t.n)  -- 10, 20, 30, 3`,
      hints: [
        'table.pack captures all values into a table with .n field.',
        'This preserves the count even with nil values.',
        '{threeValues()} also works but does not set .n.',
      ],
      concepts: ['multiple-returns', 'table-pack'],
    },
    {
      id: 'lua-multiret-3',
      title: 'Predict Adjustment in Middle',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how multiple returns are adjusted when not last.',
      skeleton: `function two() return 1, 2 end
local a, b, c = two(), 30
print(a, b, c)`,
      solution: `1	30	nil`,
      hints: [
        'two() is not the last expression, so it adjusts to one value.',
        'a gets 1 (first value from two()), b gets 30.',
        'c gets nil because there are no more values.',
      ],
      concepts: ['multiple-returns', 'adjustment-rules'],
    },
    {
      id: 'lua-multiret-4',
      title: 'Predict Adjustment at End',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how multiple returns work at the end of an expression list.',
      skeleton: `function three() return 10, 20, 30 end
local a, b, c = three()
print(a, b, c)`,
      solution: `10	20	30`,
      hints: [
        'When a function call is the last (or only) expression, all values are kept.',
        'three() returns 10, 20, 30 and all are assigned.',
        'a=10, b=20, c=30.',
      ],
      concepts: ['multiple-returns', 'adjustment-rules'],
    },
    {
      id: 'lua-multiret-5',
      title: 'Force Single Return',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use parentheses to force a function to return only one value.',
      skeleton: `function multi() return 1, 2, 3 end
local a = ___(multi())___
print(a)  -- 1 (only the first value)`,
      solution: `function multi() return 1, 2, 3 end
local a = (multi())
print(a)  -- 1 (only the first value)`,
      hints: [
        'Wrapping a function call in parentheses adjusts to one value.',
        '(multi()) returns only the first return value.',
        'This is useful when you only want the first result.',
      ],
      concepts: ['multiple-returns', 'parentheses'],
    },
    {
      id: 'lua-multiret-6',
      title: 'Write Swap Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function that swaps two values using multiple returns.',
      skeleton: `-- Write swap(a, b) that returns b, a.

-- YOUR CODE HERE`,
      solution: `function swap(a, b)
  return b, a
end`,
      hints: [
        'Simply return the values in reversed order.',
        'Multiple return values make swapping trivial in Lua.',
        'No temporary variable needed.',
      ],
      concepts: ['multiple-returns', 'swap'],
    },
    {
      id: 'lua-multiret-7',
      title: 'Write Safe Division',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function returning value and error using multiple returns.',
      skeleton: `-- Write safeDivide(a, b) that returns:
-- (result, nil) on success
-- (nil, error_message) if b is 0

-- YOUR CODE HERE`,
      solution: `function safeDivide(a, b)
  if b == 0 then
    return nil, "division by zero"
  end
  return a / b, nil
end`,
      hints: [
        'Return nil and an error message for failure.',
        'Return the result and nil for success.',
        'This is the standard Lua error convention.',
      ],
      concepts: ['multiple-returns', 'error-convention'],
    },
    {
      id: 'lua-multiret-8',
      title: 'Fix Lost Return Values',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code where return values are lost due to adjustment.',
      skeleton: `function getCoords()
  return 10, 20
end

function getSize()
  return 100, 200
end

-- BUG: only gets first value from getCoords because it's not last
local x, y, w, h = getCoords(), getSize()
print(x, y, w, h)  -- should be 10, 20, 100, 200 but y is 100!`,
      solution: `function getCoords()
  return 10, 20
end

function getSize()
  return 100, 200
end

-- FIXED: capture separately
local x, y = getCoords()
local w, h = getSize()
print(x, y, w, h)  -- 10, 20, 100, 200`,
      hints: [
        'getCoords() is not the last expression, so it adjusts to 1 value.',
        'Capture each multi-return call separately.',
        'Or use table.pack if you need them in one line.',
      ],
      concepts: ['multiple-returns', 'adjustment-rules', 'debugging'],
    },
    {
      id: 'lua-multiret-9',
      title: 'Predict Table Constructor',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how multiple returns behave in table constructors.',
      skeleton: `function pair() return "a", "b" end
local t1 = {pair()}
local t2 = {pair(), "c"}
print(#t1)
print(#t2)`,
      solution: `2
2`,
      hints: [
        '{pair()} at the end keeps both values: {"a", "b"} -> length 2.',
        '{pair(), "c"} adjusts pair() to one value: {"a", "c"} -> length 2.',
        'Only the last call in a table constructor keeps all returns.',
      ],
      concepts: ['multiple-returns', 'table-constructors'],
    },
    {
      id: 'lua-multiret-10',
      title: 'Write Multi-Return Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that transforms multiple return values.',
      skeleton: `-- Write doubleReturns(fn, ...) that calls fn(...)
-- and doubles each numeric return value.
-- Return all doubled values.

-- YOUR CODE HERE`,
      solution: `function doubleReturns(fn, ...)
  local results = table.pack(fn(...))
  for i = 1, results.n do
    if type(results[i]) == "number" then
      results[i] = results[i] * 2
    end
  end
  return table.unpack(results, 1, results.n)
end`,
      hints: [
        'Capture all returns with table.pack.',
        'Transform each numeric value in the table.',
        'Use table.unpack with .n to preserve all values.',
      ],
      concepts: ['multiple-returns', 'table-pack', 'transform'],
    },
    {
      id: 'lua-multiret-11',
      title: 'Select with Multiple Returns',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use select to get a specific return value.',
      skeleton: `function info()
  return "Alice", 30, "Engineer"
end
local job = select(___, info())
print(job)  -- "Engineer"`,
      solution: `function info()
  return "Alice", 30, "Engineer"
end
local job = select(3, info())
print(job)  -- "Engineer"`,
      hints: [
        'select(n, ...) returns everything from position n onward.',
        'select(3, ...) returns the 3rd value onward.',
        'Since we assign to one variable, only the 3rd value is kept.',
      ],
      concepts: ['multiple-returns', 'select'],
    },
    {
      id: 'lua-multiret-12',
      title: 'Fix Assert with Multiple Returns',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the assert call that loses the error message.',
      skeleton: `function parse(s)
  local n = tonumber(s)
  if not n then
    return nil, "invalid number: " .. s
  end
  return n
end

-- BUG: assert works but error message is lost on success
local result = assert((parse("42")))  -- parentheses discard error
print(result)`,
      solution: `function parse(s)
  local n = tonumber(s)
  if not n then
    return nil, "invalid number: " .. s
  end
  return n
end

-- FIXED: remove parentheses so assert gets all return values
local result = assert(parse("42"))
print(result)`,
      hints: [
        'assert(expr) passes through all values when expr is truthy.',
        'Wrapping parse("42") in parentheses forces one return value.',
        'assert(parse(s)) works correctly, passing through the value.',
      ],
      concepts: ['multiple-returns', 'assert', 'debugging'],
    },
    {
      id: 'lua-multiret-13',
      title: 'Write Range Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that returns a range of numbers as multiple values.',
      skeleton: `-- Write range(a, b) that returns all integers from a to b
-- as multiple values. Use table.unpack.
-- Example: range(3, 6) -> 3, 4, 5, 6

-- YOUR CODE HERE`,
      solution: `function range(a, b)
  local t = {}
  for i = a, b do
    t[#t + 1] = i
  end
  return table.unpack(t)
end`,
      hints: [
        'Build a table with the range values.',
        'Use table.unpack to return them as multiple values.',
        'The for loop fills the table from a to b.',
      ],
      concepts: ['multiple-returns', 'table-unpack', 'range'],
    },
    {
      id: 'lua-multiret-14',
      title: 'Predict Nested Multiple Returns',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Predict how nested function calls handle multiple returns.',
      skeleton: `function inner() return 1, 2, 3 end
function outer() return inner() end
print(outer())`,
      solution: `1	2	3`,
      hints: [
        'return inner() is a tail call that preserves all return values.',
        'outer() returns whatever inner() returns.',
        'All three values (1, 2, 3) are passed through.',
      ],
      concepts: ['multiple-returns', 'tail-calls', 'forwarding'],
    },
    {
      id: 'lua-multiret-15',
      title: 'Write Error-Checked Chain',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that chains operations using the nil-error pattern.',
      skeleton: `-- Write chain(value, ...) where ... are functions that
-- return (result, err). Chain stops at the first error.
-- Each function receives the result of the previous one.
-- Returns (final_result, nil) or (nil, error).

-- YOUR CODE HERE`,
      solution: `function chain(value, ...)
  local result = value
  for i = 1, select("#", ...) do
    local fn = select(i, ...)
    local res, err = fn(result)
    if err then return nil, err end
    result = res
  end
  return result, nil
end`,
      hints: [
        'Call each function with the previous result.',
        'Check the second return value (err) after each call.',
        'Short-circuit and return the error if any step fails.',
      ],
      concepts: ['multiple-returns', 'error-handling', 'chaining'],
    },
    {
      id: 'lua-multiret-16',
      title: 'Refactor to Multiple Returns',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor a function returning a table to return multiple values.',
      skeleton: `function getStats(numbers)
  local sum = 0
  local min = numbers[1]
  local max = numbers[1]
  for _, v in ipairs(numbers) do
    sum = sum + v
    if v < min then min = v end
    if v > max then max = v end
  end
  return {
    sum = sum,
    min = min,
    max = max,
    avg = sum / #numbers,
  }
end

local stats = getStats({1, 2, 3, 4, 5})
print(stats.sum, stats.min, stats.max)`,
      solution: `function getStats(numbers)
  local sum = 0
  local min = numbers[1]
  local max = numbers[1]
  for _, v in ipairs(numbers) do
    sum = sum + v
    if v < min then min = v end
    if v > max then max = v end
  end
  return sum, min, max, sum / #numbers
end

local sum, min, max, avg = getStats({1, 2, 3, 4, 5})
print(sum, min, max)`,
      hints: [
        'Replace the returned table with multiple return values.',
        'Caller uses multiple assignment instead of table indexing.',
        'This avoids creating a temporary table.',
      ],
      concepts: ['multiple-returns', 'refactoring'],
    },
    {
      id: 'lua-multiret-17',
      title: 'Refactor Multiple Returns to Named',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor too many positional returns into a named table for clarity.',
      skeleton: `function parseColor(hex)
  hex = hex:gsub("#", "")
  local r = tonumber(hex:sub(1, 2), 16)
  local g = tonumber(hex:sub(3, 4), 16)
  local b = tonumber(hex:sub(5, 6), 16)
  local a = 255
  return r, g, b, a  -- too many positional returns
end

local r, g, b, a = parseColor("#FF8040")
print(r, g, b, a)`,
      solution: `function parseColor(hex)
  hex = hex:gsub("#", "")
  return {
    r = tonumber(hex:sub(1, 2), 16),
    g = tonumber(hex:sub(3, 4), 16),
    b = tonumber(hex:sub(5, 6), 16),
    a = 255,
  }
end

local color = parseColor("#FF8040")
print(color.r, color.g, color.b, color.a)`,
      hints: [
        'When there are many return values, named fields are clearer.',
        'A table with named fields is self-documenting.',
        'Callers do not need to remember positional order.',
      ],
      concepts: ['multiple-returns', 'refactoring', 'readability'],
    },
    {
      id: 'lua-multiret-18',
      title: 'Write Values Iterator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an iterator function that yields multiple values per iteration.',
      skeleton: `-- Write indexed(t) that returns an iterator function.
-- Each call yields: index, value, isLast (boolean).
-- This is a stateful iterator using closures.

-- YOUR CODE HERE`,
      solution: `function indexed(t)
  local i = 0
  local n = #t
  return function()
    i = i + 1
    if i > n then return nil end
    return i, t[i], i == n
  end
end`,
      hints: [
        'Return a closure that increments i on each call.',
        'Return nil when past the end to stop iteration.',
        'The third return value signals the last element.',
      ],
      concepts: ['multiple-returns', 'iterators', 'closures'],
    },
    {
      id: 'lua-multiret-19',
      title: 'Write Spread Into Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that spreads a table as arguments to another function.',
      skeleton: `-- Write spread(fn, t) that calls fn with the elements of t
-- as separate arguments and returns all of fn's return values.
-- Handle tables with .n field from table.pack.

-- YOUR CODE HERE`,
      solution: `function spread(fn, t)
  local n = t.n or #t
  return fn(table.unpack(t, 1, n))
end`,
      hints: [
        'Use table.unpack to convert table elements to arguments.',
        'Check for .n field first, fall back to #t.',
        'Return all values from the function call.',
      ],
      concepts: ['multiple-returns', 'table-unpack', 'spread'],
    },
    {
      id: 'lua-multiret-20',
      title: 'Write Parallel Assignment Helper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that enables named destructuring from multiple returns.',
      skeleton: `-- Write destructure(names, fn, ...) where names is a table
-- of strings. Calls fn(...), captures all returns, and
-- returns a table mapping each name to the corresponding value.
-- Example: destructure({"x","y"}, function() return 1,2 end) -> {x=1,y=2}

-- YOUR CODE HERE`,
      solution: `function destructure(names, fn, ...)
  local values = table.pack(fn(...))
  local result = {}
  for i, name in ipairs(names) do
    result[name] = values[i]
  end
  return result
end`,
      hints: [
        'Capture all return values with table.pack.',
        'Map each name to the corresponding positional value.',
        'This creates a named table from positional returns.',
      ],
      concepts: ['multiple-returns', 'destructuring', 'patterns'],
    },
  ],
};
