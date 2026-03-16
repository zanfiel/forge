import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-types',
  title: '02. Types',
  explanation: `## Types in Lua

Lua is a dynamically typed language with eight basic types:

| Type | Description |
|------|-------------|
| \`nil\` | Represents absence of value |
| \`boolean\` | \`true\` or \`false\` |
| \`number\` | Double-precision floating point (integers in 5.3+) |
| \`string\` | Immutable byte sequences |
| \`table\` | The only data structure (arrays, dicts, objects) |
| \`function\` | First-class functions |
| \`userdata\` | C data in Lua |
| \`thread\` | Coroutines |

### The type() Function
\`\`\`lua
print(type(42))        -- "number"
print(type("hello"))   -- "string"
print(type(true))      -- "boolean"
print(type(nil))       -- "nil"
print(type({}))        -- "table"
print(type(print))     -- "function"
\`\`\`

### Truthiness
In Lua, only \`false\` and \`nil\` are falsy. Everything else is truthy, including \`0\` and \`""\`.`,
  exercises: [
    {
      id: 'lua-types-1',
      title: 'Check Type of Number',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use type() to check the type of 42.',
      skeleton: `local t = ___(42)
print(t) -- should print "number"`,
      solution: `local t = type(42)
print(t) -- should print "number"`,
      hints: ['The type() function returns a string.', 'Pass the value to type().', 'type(42) returns "number".'],
      concepts: ['type-function'],
    },
    {
      id: 'lua-types-2',
      title: 'Check Type of String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fill in the expected type string for a string value.',
      skeleton: `local val = "hello"
print(type(val) == "___") -- should print true`,
      solution: `local val = "hello"
print(type(val) == "string") -- should print true`,
      hints: ['type() returns the name of the type as a string.', 'Strings have the type "string".', 'Replace the blank with string.'],
      concepts: ['type-function', 'string-type'],
    },
    {
      id: 'lua-types-3',
      title: 'Nil Type Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Check if a variable is nil using type().',
      skeleton: `local x
if type(x) == "___" then
  print("x is nil")
end`,
      solution: `local x
if type(x) == "nil" then
  print("x is nil")
end`,
      hints: ['An uninitialized variable is nil.', 'type(nil) returns the string "nil".', 'Fill in "nil".'],
      concepts: ['nil', 'type-function'],
    },
    {
      id: 'lua-types-4',
      title: 'Boolean Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Declare a boolean variable set to true.',
      skeleton: `local isActive = ___
print(type(isActive)) -- should print "boolean"`,
      solution: `local isActive = true
print(type(isActive)) -- should print "boolean"`,
      hints: ['Lua booleans are true and false (lowercase).', 'Use true without quotes.', 'true is a keyword, not a string.'],
      concepts: ['boolean-type'],
    },
    {
      id: 'lua-types-5',
      title: 'Table Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create an empty table and verify its type.',
      skeleton: `local t = ___
print(type(t)) -- should print "table"`,
      solution: `local t = {}
print(type(t)) -- should print "table"`,
      hints: ['Tables are created with curly braces.', 'An empty table is {}.', 'Replace the blank with {}.'],
      concepts: ['table-type'],
    },
    {
      id: 'lua-types-6',
      title: 'Function Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Check the type of the print function.',
      skeleton: `local t = type(___)
print(t) -- should print "function"`,
      solution: `local t = type(print)
print(t) -- should print "function"`,
      hints: ['Functions are first-class values in Lua.', 'print is a built-in function.', 'Pass print (without parentheses) to type().'],
      concepts: ['function-type', 'type-function'],
    },
    {
      id: 'lua-types-7',
      title: 'Write a Type Checker',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function isString(val) that returns true if val is a string, false otherwise.',
      skeleton: `-- Write function isString(val)`,
      solution: `local function isString(val)
  return type(val) == "string"
end

print(isString("hello")) -- true
print(isString(42))      -- false`,
      hints: ['Use type(val) to check the type.', 'Compare with == "string".', 'Return the boolean result.'],
      concepts: ['type-function', 'functions'],
    },
    {
      id: 'lua-types-8',
      title: 'Write a Type Name Printer',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write code that prints the type of each value: 42, "hi", true, nil, {}, print.',
      skeleton: `-- Print the type of each value on its own line`,
      solution: `print(type(42))
print(type("hi"))
print(type(true))
print(type(nil))
print(type({}))
print(type(print))`,
      hints: ['Use type() for each value.', 'Pass each value directly to type().', 'Wrap each type() call in print().'],
      concepts: ['type-function'],
    },
    {
      id: 'lua-types-9',
      title: 'Write a Truthiness Tester',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function isTruthy(val) that returns true if val is truthy in Lua, false otherwise.',
      skeleton: `-- Write function isTruthy(val)
-- Remember: only nil and false are falsy in Lua`,
      solution: `local function isTruthy(val)
  if val then
    return true
  else
    return false
  end
end

print(isTruthy(0))     -- true
print(isTruthy(""))    -- true
print(isTruthy(nil))   -- false
print(isTruthy(false)) -- false`,
      hints: ['In Lua, 0 and "" are truthy.', 'Only nil and false are falsy.', 'Use an if statement to test the value.'],
      concepts: ['truthiness', 'nil', 'boolean-type'],
    },
    {
      id: 'lua-types-10',
      title: 'Write a Safe Type Converter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function toNumberSafe(val) that returns tonumber(val) if it succeeds, or 0 if conversion fails.',
      skeleton: `-- Write function toNumberSafe(val)`,
      solution: `local function toNumberSafe(val)
  return tonumber(val) or 0
end

print(toNumberSafe("42"))    -- 42
print(toNumberSafe("hello")) -- 0
print(toNumberSafe(nil))     -- 0`,
      hints: ['tonumber() returns nil on failure.', 'Use the or operator for a default value.', 'tonumber(val) or 0 provides a fallback.'],
      concepts: ['tonumber', 'or-operator'],
    },
    {
      id: 'lua-types-11',
      title: 'Write a Type Assertion',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function assertType(val, expected) that errors if type(val) does not match expected.',
      skeleton: `-- Write function assertType(val, expected)`,
      solution: `local function assertType(val, expected)
  if type(val) ~= expected then
    error("expected " .. expected .. ", got " .. type(val))
  end
  return val
end

assertType("hello", "string")
print("passed!")`,
      hints: ['Use type(val) to get the actual type.', 'Compare with ~= for not equal.', 'Use error() to throw an error message.'],
      concepts: ['type-function', 'error-handling'],
    },
    {
      id: 'lua-types-12',
      title: 'Write a Dynamic Dispatch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function describe(val) that returns "number: X", "string: X", or "other: TYPE" based on the type.',
      skeleton: `-- Write function describe(val)`,
      solution: `local function describe(val)
  local t = type(val)
  if t == "number" then
    return "number: " .. val
  elseif t == "string" then
    return "string: " .. val
  else
    return "other: " .. t
  end
end

print(describe(42))
print(describe("hi"))
print(describe(true))`,
      hints: ['Use type(val) to get the type string.', 'Use if/elseif/else for branching.', 'Concatenate with .. operator.'],
      concepts: ['type-function', 'control-flow', 'string-concatenation'],
    },
    {
      id: 'lua-types-13',
      title: 'Fix Boolean Comparison Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code that incorrectly checks for nil.',
      skeleton: `local x = nil
if x == false then
  print("x is nil")
else
  print("x is not nil")
end`,
      solution: `local x = nil
if x == nil then
  print("x is nil")
else
  print("x is not nil")
end`,
      hints: ['nil and false are different values.', 'nil == false is false in Lua.', 'Use x == nil to check for nil.'],
      concepts: ['nil', 'boolean-type', 'equality'],
    },
    {
      id: 'lua-types-14',
      title: 'Fix Type Comparison Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the type comparison to use the correct operator.',
      skeleton: `local val = 42
if type(val) ~= number then
  print("not a number")
end`,
      solution: `local val = 42
if type(val) ~= "number" then
  print("not a number")
end`,
      hints: ['type() returns a string.', 'Compare with the string "number", not the word number.', 'Add quotes around number.'],
      concepts: ['type-function', 'string-comparison'],
    },
    {
      id: 'lua-types-15',
      title: 'Fix Tostring Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code that tries to concatenate a number with a string incorrectly.',
      skeleton: `local count = 10
local msg = "Count: " + count
print(msg)`,
      solution: `local count = 10
local msg = "Count: " .. count
print(msg)`,
      hints: ['Lua uses .. for string concatenation, not +.', '+ is only for arithmetic.', 'Replace + with .. for concatenation.'],
      concepts: ['string-concatenation', 'operators'],
    },
    {
      id: 'lua-types-16',
      title: 'Predict Truthiness',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output of this truthiness test.',
      skeleton: `if 0 then
  print("truthy")
else
  print("falsy")
end`,
      solution: `truthy`,
      hints: ['In Lua, 0 is truthy.', 'Only false and nil are falsy.', 'This is different from many other languages.'],
      concepts: ['truthiness'],
    },
    {
      id: 'lua-types-17',
      title: 'Predict Type Coercion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output of this arithmetic with strings.',
      skeleton: `print("10" + 5)`,
      solution: `15`,
      hints: ['Lua coerces strings to numbers for arithmetic.', '"10" becomes 10 for the + operation.', '10 + 5 = 15.'],
      concepts: ['type-coercion', 'number-type'],
    },
    {
      id: 'lua-types-18',
      title: 'Predict Type Function Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `print(type(type))`,
      solution: `function`,
      hints: ['type is itself a function.', 'type(type) checks the type of the type function.', 'Functions have type "function".'],
      concepts: ['type-function', 'function-type'],
    },
    {
      id: 'lua-types-19',
      title: 'Refactor Type Checks',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor repeated type checks into a single helper function.',
      skeleton: `local a = "hello"
local b = 42
local c = true

if type(a) == "string" then print("a is string") end
if type(b) == "string" then print("b is string") end
if type(c) == "string" then print("c is string") end`,
      solution: `local function checkString(name, val)
  if type(val) == "string" then
    print(name .. " is string")
  end
end

local a = "hello"
local b = 42
local c = true

checkString("a", a)
checkString("b", b)
checkString("c", c)`,
      hints: ['Extract the repeated pattern into a function.', 'Pass the variable name and value as parameters.', 'Call the function for each variable.'],
      concepts: ['refactoring', 'functions', 'type-function'],
    },
    {
      id: 'lua-types-20',
      title: 'Refactor Nested Type Logic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the nested if-else into a table-based dispatch.',
      skeleton: `local function process(val)
  if type(val) == "number" then
    return val * 2
  elseif type(val) == "string" then
    return #val
  elseif type(val) == "boolean" then
    return not val
  else
    return nil
  end
end

print(process(5))
print(process("hi"))
print(process(true))`,
      solution: `local handlers = {
  number = function(val) return val * 2 end,
  string = function(val) return #val end,
  boolean = function(val) return not val end,
}

local function process(val)
  local handler = handlers[type(val)]
  return handler and handler(val) or nil
end

print(process(5))
print(process("hi"))
print(process(true))`,
      hints: ['Create a table mapping type names to handler functions.', 'Look up the handler using type(val) as the key.', 'Call the handler if it exists.'],
      concepts: ['refactoring', 'tables', 'first-class-functions'],
    },
  ],
};
