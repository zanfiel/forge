/**
 * lua.ts - Complete Lua learning track
 *
 * 5 sections, 14 exercises. Progresses from variables through metatables and OOP.
 * Highlights Lua's 1-indexed tables, table-as-everything philosophy, and embeddability.
 */

import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'lua',
  name: 'Lua',
  language: 'lua',
  monacoLang: 'lua',
  icon: '\u{1F319}',
  description: 'Lightweight and embeddable. Game scripting, Redis, Nginx, and embedded systems.',
  sections: [
    {
      id: 'lua-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

Lua is dynamically typed with a small set of core types. All variables are **global by default** -- use \`local\` to keep them scoped:

\`\`\`lua
local name = "Zan"          -- string
local age = 25               -- number (all numbers are floats in Lua 5.3+: integers exist too)
local pi = 3.14              -- number
local active = true          -- boolean (lowercase true/false!)
local nothing = nil          -- nil (absence of value)
\`\`\`

**Key differences from other languages:**
- \`nil\` is the only "falsy" non-boolean (0 and "" are truthy!)
- Strings are immutable and can use \`"double"\` or \`'single'\` quotes
- String concatenation uses \`..\` (two dots), NOT \`+\`
- No \`+=\` operator -- you write \`x = x + 1\`

\`\`\`lua
local greeting = "Hello, " .. name .. "!"  -- concatenation
local length = #greeting                    -- # gives string/table length
print(greeting)                             -- Hello, Zan!
print(type(name))                           -- "string"
print(type(nil))                            -- "nil"
\`\`\`

**Multi-line strings** use double brackets:
\`\`\`lua
local block = [[
This is a
multi-line string.
No escaping needed.
]]
\`\`\``,
      exercises: [
        {
          id: 'lua-var-1',
          title: 'Local Variables',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'lua',
          goal: 'Declare local variables of different types and print a formatted string using concatenation.',
          skeleton: `-- Declare local variables
__BLANK__ server_name = "rocky"
__BLANK__ cpu_cores = 8
__BLANK__ online = true
__BLANK__ tag = nil

-- Build a status string using concatenation (..)
local status = server_name __BLANK__ ": " __BLANK__ cpu_cores __BLANK__ " cores"
print(status)       -- rocky: 8 cores
print(type(tag))    -- nil`,
          solution: `-- Declare local variables
local server_name = "rocky"
local cpu_cores = 8
local online = true
local tag = nil

-- Build a status string using concatenation (..)
local status = server_name .. ": " .. cpu_cores .. " cores"
print(status)       -- rocky: 8 cores
print(type(tag))    -- nil`,
          hints: [
            'All variables should be declared with `local` to avoid polluting the global scope.',
            'Lua concatenates strings with `..` (two dots). Numbers are auto-converted to strings during concatenation.',
            'Fill in `local` for each declaration and `..` for each concatenation.',
          ],
          concepts: ['local', 'nil', 'string concatenation', 'type()', 'dynamic typing'],
        },
        {
          id: 'lua-var-2',
          title: 'Truthy & Nil',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'lua',
          goal: 'Predict what each print statement outputs. Remember: in Lua, only `false` and `nil` are falsy. Zero and empty strings are truthy!',
          skeleton: `-- Predict the output of each print statement
local a = 0
local b = ""
local c = nil
local d = false

if a then print("A") else print("no A") end
if b then print("B") else print("no B") end
if c then print("C") else print("no C") end
if d then print("D") else print("no D") end

print(a or "default")
print(c or "default")
print(d or "default")`,
          solution: `-- Output:
-- A
-- B
-- no C
-- no D
-- 0
-- default
-- default

-- Explanation:
-- 0 is truthy in Lua, so "A" prints
-- "" is truthy in Lua, so "B" prints
-- nil is falsy, so "no C" prints
-- false is falsy, so "no D" prints
-- `a or "default"` returns a (0) because 0 is truthy
-- `c or "default"` returns "default" because nil is falsy
-- `d or "default"` returns "default" because false is falsy`,
          hints: [
            'Unlike most languages, `0` and `""` are truthy in Lua. Only `nil` and `false` are falsy.',
            'The `or` operator returns the first truthy value, or the last value if all are falsy.',
            '`0 or "default"` returns `0` because `0` is truthy. `nil or "default"` returns `"default"`.',
          ],
          concepts: ['truthy/falsy', 'nil', 'or operator', 'boolean logic', 'short-circuit evaluation'],
        },
        {
          id: 'lua-var-3',
          title: 'String Operations',
          type: 'fix-bug',
          difficulty: 'beginner',
          language: 'lua',
          goal: 'Fix the bugs in this Lua script. Common mistakes: wrong concatenation operator, missing `local`, and wrong length operator.',
          skeleton: `-- Bug 1: Wrong concatenation operator
name = "rocky"
greeting = "Hello, " + name + "!"
print(greeting)

-- Bug 2: Wrong way to get string length
local message = "server is online"
local len = length(message)
print("Length: " + len)

-- Bug 3: Wrong string method call
local upper_name = name.toUpperCase()
print(upper_name)`,
          solution: `-- Fix 1: Use .. for concatenation, and local for scope
local name = "rocky"
local greeting = "Hello, " .. name .. "!"
print(greeting)

-- Fix 2: Use # for length, .. for concatenation
local message = "server is online"
local len = #message
print("Length: " .. len)

-- Fix 3: Use string.upper() with colon syntax
local upper_name = string.upper(name)
print(upper_name)`,
          hints: [
            'Lua uses `..` for string concatenation, not `+`. The `+` operator is only for arithmetic.',
            'String length in Lua uses the `#` prefix operator: `#mystring`. There is no `length()` function.',
            'Lua string methods live in the `string` library: `string.upper(s)`, `string.lower(s)`, `string.sub(s, i, j)`. Also add `local` to the globals!',
          ],
          concepts: ['string concatenation', '# operator', 'string.upper', 'local scope', 'common mistakes'],
        },
      ],
    },
    {
      id: 'lua-functions',
      title: '2. Functions & Scope',
      explanation: `## Functions & Scope

Functions in Lua are **first-class values** -- they can be stored in variables, passed as arguments, and returned from other functions:

\`\`\`lua
-- Named function (syntactic sugar)
local function greet(name)
  return "Hello, " .. name .. "!"
end

-- Same thing, more explicit
local greet = function(name)
  return "Hello, " .. name .. "!"
end
\`\`\`

**Multiple return values** (a Lua specialty):
\`\`\`lua
local function divide(a, b)
  if b == 0 then
    return nil, "division by zero"
  end
  return a / b, nil
end

local result, err = divide(10, 3)
local bad, err2 = divide(10, 0)
\`\`\`

**Closures** capture their enclosing scope:
\`\`\`lua
local function counter(start)
  local count = start
  return function()
    count = count + 1
    return count
  end
end

local next = counter(0)
print(next())  -- 1
print(next())  -- 2
\`\`\`

**Variadic functions** use \`...\`:
\`\`\`lua
local function sum(...)
  local args = {...}   -- pack args into a table
  local total = 0
  for _, v in ipairs(args) do
    total = total + v
  end
  return total
end

print(sum(1, 2, 3))   -- 6
\`\`\``,
      exercises: [
        {
          id: 'lua-func-1',
          title: 'Multiple Returns',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'lua',
          goal: 'Write a function `safe_divide` that takes two numbers and returns two values: the result and an error string. If the divisor is zero, return `nil` and an error message. Otherwise return the result and `nil`.',
          skeleton: `-- Write safe_divide here


-- Tests
local result, err = safe_divide(10, 3)
print(result, err)     -- 3.3333333333333  nil

local result2, err2 = safe_divide(10, 0)
print(result2, err2)   -- nil    division by zero

local result3, err3 = safe_divide(0, 5)
print(result3, err3)   -- 0.0    nil`,
          solution: `local function safe_divide(a, b)
  if b == 0 then
    return nil, "division by zero"
  end
  return a / b, nil
end

local result, err = safe_divide(10, 3)
print(result, err)

local result2, err2 = safe_divide(10, 0)
print(result2, err2)

local result3, err3 = safe_divide(0, 5)
print(result3, err3)`,
          hints: [
            'Lua functions can return multiple values separated by commas: `return val1, val2`.',
            'Check `if b == 0` first and return `nil, "division by zero"`. Otherwise return `a / b, nil`.',
            'Callers unpack multiple returns with: `local result, err = safe_divide(10, 3)`.',
          ],
          concepts: ['multiple return values', 'nil as error', 'conditional return', 'local function'],
        },
        {
          id: 'lua-func-2',
          title: 'Closures',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'lua',
          goal: 'Complete the closure-based rate limiter. The outer function captures the limit and count; the inner function checks and increments.',
          skeleton: `local function make_limiter(max_requests)
  local __BLANK__ = 0

  return __BLANK__()
    if count >= __BLANK__ then
      return false, "rate limit exceeded"
    end
    __BLANK__ = count + 1
    return true, count
  __BLANK__
end

-- Tests
local check = make_limiter(3)
print(check())   -- true   1
print(check())   -- true   2
print(check())   -- true   3
print(check())   -- false  rate limit exceeded
print(check())   -- false  rate limit exceeded`,
          solution: `local function make_limiter(max_requests)
  local count = 0

  return function()
    if count >= max_requests then
      return false, "rate limit exceeded"
    end
    count = count + 1
    return true, count
  end
end

local check = make_limiter(3)
print(check())
print(check())
print(check())
print(check())
print(check())`,
          hints: [
            'The captured variable needs a name: `local count = 0`. The inner function is returned with `return function() ... end`.',
            'The closure captures `max_requests` from the outer scope. Compare `count >= max_requests` to check the limit.',
            'Fill in: `count`, `function`, `max_requests`, `count`, `end`. Remember Lua uses `count = count + 1` (no `+=`).',
          ],
          concepts: ['closures', 'upvalues', 'function factories', 'encapsulation', 'state'],
        },
        {
          id: 'lua-func-3',
          title: 'Variadic Logger',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'lua',
          goal: 'Write a function `log` that takes a level string ("INFO", "WARN", "ERROR") followed by any number of message parts. It should concatenate all parts with spaces and return a formatted log line like "[INFO] server started on port 8080".',
          skeleton: `-- Write the log function here (use ... for variadic args)


-- Tests
print(log("INFO", "server", "started"))
-- [INFO] server started

print(log("ERROR", "disk", "full", "on", "/dev/sda1"))
-- [ERROR] disk full on /dev/sda1

print(log("WARN", "memory", "at", "95%"))
-- [WARN] memory at 95%`,
          solution: `local function log(level, ...)
  local parts = {...}
  local message = table.concat(parts, " ")
  return "[" .. level .. "] " .. message
end

print(log("INFO", "server", "started"))
print(log("ERROR", "disk", "full", "on", "/dev/sda1"))
print(log("WARN", "memory", "at", "95%"))`,
          hints: [
            'Variadic args are captured with `...`. Pack them into a table with `local parts = {...}`.',
            '`table.concat(tbl, separator)` joins all elements of a table into a string with the separator between them.',
            'Build the final string: `"[" .. level .. "] " .. message` where message comes from `table.concat`.',
          ],
          concepts: ['variadic functions', '...', 'table.concat', 'string formatting', 'argument packing'],
        },
      ],
    },
    {
      id: 'lua-tables',
      title: '3. Tables',
      explanation: `## Tables

Tables are Lua's **only data structure** -- they serve as arrays, dictionaries, objects, modules, and namespaces. This is Lua's most important concept.

**Tables as arrays** (1-indexed!):
\`\`\`lua
local servers = {"rocky", "pangolin", "ovh-vps"}
print(servers[1])    -- "rocky" (NOT index 0!)
print(#servers)      -- 3 (length)

table.insert(servers, "bav-apps")   -- append
table.remove(servers, 2)             -- remove index 2
\`\`\`

**Tables as dictionaries:**
\`\`\`lua
local server = {
  name = "rocky",
  ip = "192.168.8.133",
  port = 22,
  online = true,
}

print(server.name)           -- "rocky" (dot syntax)
print(server["ip"])          -- "192.168.8.133" (bracket syntax)
server.tags = {"local"}      -- add a new field
server.online = false        -- update a field
server.port = nil            -- delete a field
\`\`\`

**Mixed tables** (both array and dict parts):
\`\`\`lua
local mixed = {
  "first",              -- [1] = "first"
  "second",             -- [2] = "second"
  name = "example",     -- ["name"] = "example"
}
\`\`\`

**Important:** The \`#\` length operator only counts the array part (sequential integer keys from 1). Dict keys are not counted.`,
      exercises: [
        {
          id: 'lua-tbl-1',
          title: 'Arrays (1-indexed!)',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'lua',
          goal: 'Work with Lua tables as arrays. Remember: Lua arrays start at index 1, not 0!',
          skeleton: `local fruits = {"apple", "banana", "cherry"}

-- Get the first element (Lua is 1-indexed!)
local first = fruits[__BLANK__]
print(first)   -- apple

-- Get the last element using the length operator
local last = fruits[__BLANK__fruits]
print(last)    -- cherry

-- Add "date" to the end
table.__BLANK__(fruits, "date")
print(#fruits)  -- 4

-- Remove the second element
table.__BLANK__(fruits, 2)
print(fruits[2])  -- cherry (banana was removed, everything shifted)`,
          solution: `local fruits = {"apple", "banana", "cherry"}

-- Get the first element (Lua is 1-indexed!)
local first = fruits[1]
print(first)   -- apple

-- Get the last element using the length operator
local last = fruits[#fruits]
print(last)    -- cherry

-- Add "date" to the end
table.insert(fruits, "date")
print(#fruits)  -- 4

-- Remove the second element
table.remove(fruits, 2)
print(fruits[2])  -- cherry (banana was removed, everything shifted)`,
          hints: [
            'Lua arrays start at index 1, not 0. The first element is `fruits[1]`.',
            '`#fruits` gives the length. The last element is at index `#fruits`.',
            '`table.insert(t, val)` appends to the end. `table.remove(t, index)` removes at that index and shifts elements down.',
          ],
          concepts: ['1-indexed arrays', '# length operator', 'table.insert', 'table.remove'],
        },
        {
          id: 'lua-tbl-2',
          title: 'Tables as Dictionaries',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'lua',
          goal: 'Write a function `merge` that takes two tables (used as dictionaries) and returns a new table with all key-value pairs from both. If a key exists in both, the second table\'s value wins.',
          skeleton: `-- Write the merge function here


-- Tests
local defaults = {port = 22, user = "zan", timeout = 30}
local overrides = {port = 4822, timeout = 60}

local config = merge(defaults, overrides)
print(config.port)      -- 4822
print(config.user)      -- zan
print(config.timeout)   -- 60`,
          solution: `local function merge(base, override)
  local result = {}
  for k, v in pairs(base) do
    result[k] = v
  end
  for k, v in pairs(override) do
    result[k] = v
  end
  return result
end

local defaults = {port = 22, user = "zan", timeout = 30}
local overrides = {port = 4822, timeout = 60}

local config = merge(defaults, overrides)
print(config.port)
print(config.user)
print(config.timeout)`,
          hints: [
            'Create a new empty table `{}`. Use `pairs()` to iterate over key-value pairs of a table.',
            'Copy all keys from `base` first, then copy all keys from `override`. The second loop overwrites any duplicates.',
            'Pattern: `for k, v in pairs(tbl) do result[k] = v end`. Do this twice: once for base, once for override.',
          ],
          concepts: ['pairs()', 'table iteration', 'table copying', 'dict merge pattern'],
        },
        {
          id: 'lua-tbl-3',
          title: 'Nested Tables',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'lua',
          goal: 'Fix the bugs in this inventory system that uses nested tables.',
          skeleton: `local inventory = {
  {name = "sword", damage = 10, count = 1},
  {name = "potion", healing = 25, count = 5},
  {name = "shield", defense = 8, count = 1},
}

-- Bug 1: Wrong starting index (not 0-indexed!)
local first_item = inventory[0]
print(first_item.name)

-- Bug 2: Wrong way to get table length
local num_items = inventory.length
print("Items: " .. num_items)

-- Bug 3: Wrong iteration (should use ipairs for array part)
local total_count = 0
for i, item in pairs(inventory) do
  total_count = total_count + item["count"]
end
print("Total count: " .. total_count)

-- Bug 4: Wrong way to add a field
inventory[2].count = inventory[2].count += 3
print("Potions: " .. inventory[2].count)`,
          solution: `local inventory = {
  {name = "sword", damage = 10, count = 1},
  {name = "potion", healing = 25, count = 5},
  {name = "shield", defense = 8, count = 1},
}

-- Fix 1: Lua is 1-indexed
local first_item = inventory[1]
print(first_item.name)

-- Fix 2: Use # for length
local num_items = #inventory
print("Items: " .. num_items)

-- Fix 3: Use ipairs for sequential array iteration
local total_count = 0
for i, item in ipairs(inventory) do
  total_count = total_count + item.count
end
print("Total count: " .. total_count)

-- Fix 4: No += in Lua, use explicit addition
inventory[2].count = inventory[2].count + 3
print("Potions: " .. inventory[2].count)`,
          hints: [
            'Lua arrays start at 1: `inventory[1]` is the first item. There is no `.length` property -- use `#inventory`.',
            'For sequential array iteration, `ipairs` is preferred over `pairs`. Also, dot syntax `item.count` works the same as `item["count"]`.',
            'Lua has no `+=` operator. Write `x = x + 3` instead of `x += 3`.',
          ],
          concepts: ['1-indexed arrays', '# operator', 'ipairs vs pairs', 'nested tables', 'no compound assignment'],
        },
      ],
    },
    {
      id: 'lua-control',
      title: '4. Control Flow & Iterators',
      explanation: `## Control Flow & Iterators

**if/elseif/else** (note: \`elseif\` is ONE word, and blocks end with \`end\`):
\`\`\`lua
local status = "warn"

if status == "error" then
  print("CRITICAL!")
elseif status == "warn" then
  print("Warning...")
else
  print("All good")
end
\`\`\`

**Logical operators:** \`and\`, \`or\`, \`not\` (words, not symbols!)
\`\`\`lua
if age >= 18 and has_id then ...
if not online then ...
local name = user or "anonymous"   -- default value pattern
\`\`\`

**Numeric for:**
\`\`\`lua
for i = 1, 5 do        -- 1, 2, 3, 4, 5 (inclusive!)
  print(i)
end

for i = 10, 1, -1 do   -- countdown: 10, 9, 8, ..., 1
  print(i)
end
\`\`\`

**Generic for with iterators:**
\`\`\`lua
local fruits = {"apple", "banana", "cherry"}

-- ipairs: sequential integer keys (1, 2, 3, ...)
for i, fruit in ipairs(fruits) do
  print(i, fruit)   -- 1 apple, 2 banana, 3 cherry
end

-- pairs: ALL keys (unordered for non-integer keys)
local server = {name = "rocky", port = 22}
for key, value in pairs(server) do
  print(key, value)
end
\`\`\`

**while and repeat:**
\`\`\`lua
while condition do
  -- body
end

repeat
  -- body (runs at least once)
until condition
\`\`\`

**Important:** Use \`ipairs\` for arrays (stops at first nil gap). Use \`pairs\` for dictionaries (visits all keys).`,
      exercises: [
        {
          id: 'lua-ctrl-1',
          title: 'FizzBuzz Lua Style',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'lua',
          goal: 'Write a function `fizzbuzz` that takes a number n and prints numbers from 1 to n. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for multiples of both print "FizzBuzz".',
          skeleton: `-- Write fizzbuzz here


-- Test
fizzbuzz(15)
-- Expected output:
-- 1
-- 2
-- Fizz
-- 4
-- Buzz
-- Fizz
-- 7
-- 8
-- Fizz
-- Buzz
-- 11
-- Fizz
-- 13
-- 14
-- FizzBuzz`,
          solution: `local function fizzbuzz(n)
  for i = 1, n do
    if i % 3 == 0 and i % 5 == 0 then
      print("FizzBuzz")
    elseif i % 3 == 0 then
      print("Fizz")
    elseif i % 5 == 0 then
      print("Buzz")
    else
      print(i)
    end
  end
end

fizzbuzz(15)`,
          hints: [
            'Use `for i = 1, n do` for the loop. The modulo operator in Lua is `%`, same as most languages.',
            'Check the combined case `i % 3 == 0 and i % 5 == 0` first, then individual cases with `elseif`.',
            'Lua uses `and`/`or`/`not` as logical operators (words, not `&&`/`||`/`!`). Remember `elseif` is one word.',
          ],
          concepts: ['numeric for', 'if/elseif/else', 'modulo', 'and operator', 'print'],
        },
        {
          id: 'lua-ctrl-2',
          title: 'ipairs vs pairs',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'lua',
          goal: 'Use the correct iterator for each situation: `ipairs` for sequential arrays, `pairs` for dictionaries.',
          skeleton: `local scores = {85, 92, 78, 95, 88}

-- Calculate average using ipairs (sequential array)
local total = 0
for __BLANK__, score in __BLANK__(scores) do
  total = total + score
end
local average = total / __BLANK__scores
print("Average: " .. average)

-- Server config (dictionary -- use pairs)
local config = {
  host = "192.168.8.133",
  port = 4200,
  debug = true,
}

-- Print all config key-value pairs
for __BLANK__, __BLANK__ in __BLANK__(config) do
  print(key .. " = " .. tostring(value))
end`,
          solution: `local scores = {85, 92, 78, 95, 88}

-- Calculate average using ipairs (sequential array)
local total = 0
for _, score in ipairs(scores) do
  total = total + score
end
local average = total / #scores
print("Average: " .. average)

-- Server config (dictionary -- use pairs)
local config = {
  host = "192.168.8.133",
  port = 4200,
  debug = true,
}

-- Print all config key-value pairs
for key, value in pairs(config) do
  print(key .. " = " .. tostring(value))
end`,
          hints: [
            'When you do not need the index, use `_` as a throwaway variable: `for _, score in ipairs(scores)`.',
            '`ipairs` is for sequential arrays (integer keys 1, 2, 3...). `pairs` is for all keys including string keys.',
            '`tostring()` converts any value to a string. Use `#scores` for the array length. Fill in: `_`, `ipairs`, `#`, `key`, `value`, `pairs`.',
          ],
          concepts: ['ipairs', 'pairs', '_ placeholder', 'tostring', '# operator', 'array vs dict iteration'],
        },
        {
          id: 'lua-ctrl-3',
          title: 'Custom Iterator',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'lua',
          goal: 'Write a function `range` that works like Python\'s range -- it returns an iterator function that yields numbers from `start` to `stop` (inclusive) with an optional `step`. Use it with a generic for loop.',
          skeleton: `-- Write the range function here (return an iterator function)


-- Tests
-- Count 1 to 5
for num in range(1, 5) do
  io.write(num .. " ")
end
print()  -- 1 2 3 4 5

-- Count by twos
for num in range(0, 10, 2) do
  io.write(num .. " ")
end
print()  -- 0 2 4 6 8 10

-- Countdown
for num in range(5, 1, -1) do
  io.write(num .. " ")
end
print()  -- 5 4 3 2 1`,
          solution: `local function range(start, stop, step)
  step = step or 1
  local current = start - step
  return function()
    current = current + step
    if step > 0 and current <= stop then
      return current
    elseif step < 0 and current >= stop then
      return current
    end
    return nil
  end
end

for num in range(1, 5) do
  io.write(num .. " ")
end
print()

for num in range(0, 10, 2) do
  io.write(num .. " ")
end
print()

for num in range(5, 1, -1) do
  io.write(num .. " ")
end
print()`,
          hints: [
            'A custom iterator is a function that returns the next value each time it is called, and `nil` to stop.',
            'Use `step = step or 1` for the default. Track `current` in the closure. Each call advances by `step` and checks bounds.',
            'For positive step: continue while `current <= stop`. For negative step: continue while `current >= stop`. Return `nil` to end iteration.',
          ],
          concepts: ['custom iterators', 'closures as iterators', 'generic for protocol', 'default parameters', 'stateful functions'],
        },
      ],
    },
    {
      id: 'lua-metatables',
      title: '5. Metatables & OOP',
      explanation: `## Metatables & OOP

Metatables are Lua's mechanism for operator overloading and inheritance. Every table can have a **metatable** that defines special behaviors:

\`\`\`lua
local vec = {x = 1, y = 2}
local meta = {
  __add = function(a, b)
    return {x = a.x + b.x, y = a.y + b.y}
  end,
  __tostring = function(v)
    return "(" .. v.x .. ", " .. v.y .. ")"
  end,
}
setmetatable(vec, meta)
\`\`\`

**The \`__index\` metamethod** is the key to OOP. When you access a key that does not exist in a table, Lua checks \`__index\`:

\`\`\`lua
local Animal = {}
Animal.__index = Animal    -- look up missing keys in Animal itself

function Animal.new(name, sound)
  local self = setmetatable({}, Animal)
  self.name = name
  self.sound = sound
  return self
end

function Animal:speak()          -- colon syntax = auto-pass self
  return self.name .. " says " .. self.sound
end

local cat = Animal.new("Cat", "meow")
print(cat:speak())    -- Cat says meow
\`\`\`

**How it works:**
1. \`cat:speak()\` looks for \`speak\` in the \`cat\` table -- not found
2. Lua checks \`cat\`'s metatable -- finds \`__index = Animal\`
3. Lua looks for \`speak\` in \`Animal\` -- found! Calls it with \`cat\` as \`self\`

**Colon syntax** (\`:\`) is sugar for passing \`self\`:
\`\`\`lua
function Animal:speak()        -- same as Animal.speak(self)
cat:speak()                     -- same as cat.speak(cat)
\`\`\`

**Inheritance:**
\`\`\`lua
local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog

function Dog.new(name)
  local self = Animal.new(name, "woof")
  return setmetatable(self, Dog)
end

function Dog:fetch(item)
  return self.name .. " fetches the " .. item
end
\`\`\``,
      exercises: [
        {
          id: 'lua-mt-1',
          title: 'Build a Class',
          type: 'fill-blank',
          difficulty: 'advanced',
          language: 'lua',
          goal: 'Complete the Vector class using metatables. It should support creation, addition with `+`, and string conversion with `tostring()`.',
          skeleton: `local Vector = {}
Vector.__index = __BLANK__

function Vector.new(x, y)
  local self = __BLANK__({}, Vector)
  self.x = x
  self.y = y
  return self
end

function Vector:magnitude()
  return math.sqrt(self.x __BLANK__ self.x + self.y * self.y)
end

function Vector:__add(other)
  return Vector.__BLANK__(self.x + other.x, self.y + other.y)
end

function Vector:__BLANK__()
  return "Vector(" .. self.x .. ", " .. self.y .. ")"
end

-- Tests
local a = Vector.new(3, 4)
local b = Vector.new(1, 2)
local c = a + b

print(tostring(a))         -- Vector(3, 4)
print(tostring(b))         -- Vector(1, 2)
print(tostring(c))         -- Vector(4, 6)
print(a:magnitude())       -- 5.0`,
          solution: `local Vector = {}
Vector.__index = Vector

function Vector.new(x, y)
  local self = setmetatable({}, Vector)
  self.x = x
  self.y = y
  return self
end

function Vector:magnitude()
  return math.sqrt(self.x * self.x + self.y * self.y)
end

function Vector:__add(other)
  return Vector.new(self.x + other.x, self.y + other.y)
end

function Vector:__tostring()
  return "Vector(" .. self.x .. ", " .. self.y .. ")"
end

local a = Vector.new(3, 4)
local b = Vector.new(1, 2)
local c = a + b

print(tostring(a))
print(tostring(b))
print(tostring(c))
print(a:magnitude())`,
          hints: [
            '`__index` should point to the class table itself: `Vector.__index = Vector`. This makes instances look up methods in Vector.',
            '`setmetatable({}, Vector)` creates a new table with Vector as its metatable. `__add` is the metamethod for the `+` operator.',
            'Fill in: `Vector`, `setmetatable`, `*`, `new`, `__tostring`. The magnitude formula is sqrt(x*x + y*y).',
          ],
          concepts: ['metatables', '__index', 'setmetatable', '__add', '__tostring', 'class pattern'],
        },
        {
          id: 'lua-mt-2',
          title: 'Inheritance Chain',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'lua',
          goal: 'Create a `Shape` base class with a `describe` method, then a `Circle` class that inherits from it. Circle should have its own `area` method and override `describe` to include the radius.',
          skeleton: `-- Write Shape base class and Circle subclass here
-- Shape.new(name) should store the name
-- Shape:describe() should return "Shape: <name>"
-- Circle.new(radius) should call Shape with name "Circle"
-- Circle:area() should return pi * r^2
-- Circle:describe() should return "Circle: radius=<r>"


-- Tests
local s = Shape.new("Triangle")
print(s:describe())       -- Shape: Triangle

local c = Circle.new(5)
print(c:describe())       -- Circle: radius=5
print(c:area())           -- 78.539816339745

local c2 = Circle.new(1)
print(c2:describe())      -- Circle: radius=1
print(c2:area())          -- 3.1415926535898`,
          solution: `local Shape = {}
Shape.__index = Shape

function Shape.new(name)
  local self = setmetatable({}, Shape)
  self.name = name
  return self
end

function Shape:describe()
  return "Shape: " .. self.name
end

local Circle = setmetatable({}, {__index = Shape})
Circle.__index = Circle

function Circle.new(radius)
  local self = Shape.new("Circle")
  setmetatable(self, Circle)
  self.radius = radius
  return self
end

function Circle:area()
  return math.pi * self.radius * self.radius
end

function Circle:describe()
  return "Circle: radius=" .. self.radius
end

local s = Shape.new("Triangle")
print(s:describe())

local c = Circle.new(5)
print(c:describe())
print(c:area())

local c2 = Circle.new(1)
print(c2:describe())
print(c2:area())`,
          hints: [
            'Shape follows the standard class pattern: `Shape.__index = Shape`, constructor uses `setmetatable({}, Shape)`.',
            'Circle inherits from Shape: `local Circle = setmetatable({}, {__index = Shape})` and `Circle.__index = Circle`. This creates the lookup chain: instance -> Circle -> Shape.',
            'In Circle.new, call `Shape.new("Circle")` to get a base instance, then `setmetatable(self, Circle)` to switch its metatable to Circle. Override `describe` by defining `Circle:describe()`.',
          ],
          concepts: ['inheritance', '__index chain', 'method override', 'setmetatable', 'math.pi', 'class hierarchy'],
        },
      ],
    },
  ],
};
