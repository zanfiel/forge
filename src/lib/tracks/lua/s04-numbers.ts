import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-num',
  title: '04. Numbers',
  explanation: `## Numbers in Lua

Lua 5.3+ has two numeric subtypes: **integers** and **floats**. Earlier versions only had floats.

### Integer and Float
\`\`\`lua
local i = 42       -- integer
local f = 3.14     -- float
local e = 1e10     -- float (scientific notation)
local h = 0xFF     -- integer (hex: 255)
\`\`\`

### Arithmetic Operators
\`\`\`lua
print(10 + 3)   -- 13
print(10 - 3)   -- 7
print(10 * 3)   -- 30
print(10 / 3)   -- 3.3333... (float division)
print(10 // 3)  -- 3 (floor division)
print(10 % 3)   -- 1 (modulo)
print(2 ^ 10)   -- 1024.0 (exponentiation)
print(-5)       -- -5 (unary minus)
\`\`\`

### Math Library
\`\`\`lua
math.floor(3.7)   -- 3
math.ceil(3.2)    -- 4
math.abs(-5)      -- 5
math.max(1,2,3)   -- 3
math.min(1,2,3)   -- 1
math.sqrt(16)     -- 4.0
math.random(1,6)  -- random 1-6
\`\`\`

### Type Coercion
\`\`\`lua
tonumber("42")   -- 42
tostring(42)     -- "42"
\`\`\``,
  exercises: [
    {
      id: 'lua-num-1',
      title: 'Floor Division',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use floor division to divide 17 by 5.',
      skeleton: `local result = 17 ___ 5
print(result) -- should print 3`,
      solution: `local result = 17 // 5
print(result) -- should print 3`,
      hints: ['Floor division uses the // operator.', '17 // 5 = 3 (rounds down).', 'Replace the blank with //.'],
      concepts: ['floor-division'],
    },
    {
      id: 'lua-num-2',
      title: 'Modulo Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Get the remainder of 17 divided by 5.',
      skeleton: `local result = 17 ___ 5
print(result) -- should print 2`,
      solution: `local result = 17 % 5
print(result) -- should print 2`,
      hints: ['The modulo operator is %.', '17 % 5 = 2 (remainder).', 'Replace the blank with %.'],
      concepts: ['modulo'],
    },
    {
      id: 'lua-num-3',
      title: 'Exponentiation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Compute 2 to the power of 8.',
      skeleton: `local result = 2 ___ 8
print(result) -- should print 256.0`,
      solution: `local result = 2 ^ 8
print(result) -- should print 256.0`,
      hints: ['Lua uses ^ for exponentiation.', '2 ^ 8 = 256.', 'Replace the blank with ^.'],
      concepts: ['exponentiation'],
    },
    {
      id: 'lua-num-4',
      title: 'Convert String to Number',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Convert the string "99" to a number.',
      skeleton: `local n = ___("99")
print(n + 1) -- should print 100`,
      solution: `local n = tonumber("99")
print(n + 1) -- should print 100`,
      hints: ['Use tonumber() to convert strings.', 'tonumber("99") returns 99.', 'Replace the blank with tonumber.'],
      concepts: ['tonumber'],
    },
    {
      id: 'lua-num-5',
      title: 'Math Absolute Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Get the absolute value of -42.',
      skeleton: `local result = math.___(  -42)
print(result) -- should print 42`,
      solution: `local result = math.abs(-42)
print(result) -- should print 42`,
      hints: ['math.abs returns the absolute value.', 'math.abs(-42) = 42.', 'Fill in abs.'],
      concepts: ['math-library'],
    },
    {
      id: 'lua-num-6',
      title: 'Hex Number Literal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Assign the hex value 0xFF to a variable.',
      skeleton: `local val = ___
print(val) -- should print 255`,
      solution: `local val = 0xFF
print(val) -- should print 255`,
      hints: ['Hex literals start with 0x.', '0xFF = 255 in decimal.', 'Replace the blank with 0xFF.'],
      concepts: ['hex-literals'],
    },
    {
      id: 'lua-num-7',
      title: 'Write an Even/Odd Checker',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function isEven(n) that returns true if n is even.',
      skeleton: `-- Write function isEven(n)`,
      solution: `local function isEven(n)
  return n % 2 == 0
end

print(isEven(4))  -- true
print(isEven(7))  -- false`,
      hints: ['Use the modulo operator %.', 'n % 2 == 0 means n is even.', 'Return the boolean comparison.'],
      concepts: ['modulo', 'functions'],
    },
    {
      id: 'lua-num-8',
      title: 'Write a Clamp Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function clamp(val, minVal, maxVal) that restricts val to the range [minVal, maxVal].',
      skeleton: `-- Write function clamp(val, minVal, maxVal)`,
      solution: `local function clamp(val, minVal, maxVal)
  return math.max(minVal, math.min(maxVal, val))
end

print(clamp(15, 0, 10))  -- 10
print(clamp(-5, 0, 10))  -- 0
print(clamp(5, 0, 10))   -- 5`,
      hints: ['Use math.min and math.max together.', 'math.min(maxVal, val) caps the upper bound.', 'math.max(minVal, ...) caps the lower bound.'],
      concepts: ['math-library', 'functions'],
    },
    {
      id: 'lua-num-9',
      title: 'Write a Round Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function round(n) that rounds n to the nearest integer.',
      skeleton: `-- Write function round(n)`,
      solution: `local function round(n)
  return math.floor(n + 0.5)
end

print(round(3.7))  -- 4
print(round(3.2))  -- 3
print(round(2.5))  -- 3`,
      hints: ['Add 0.5 then use math.floor.', 'math.floor(n + 0.5) rounds to nearest.', 'This is the standard rounding trick.'],
      concepts: ['math-library', 'functions'],
    },
    {
      id: 'lua-num-10',
      title: 'Write a Factorial Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function factorial(n) that computes n! using a loop.',
      skeleton: `-- Write function factorial(n) using a loop`,
      solution: `local function factorial(n)
  local result = 1
  for i = 2, n do
    result = result * i
  end
  return result
end

print(factorial(5))  -- 120
print(factorial(0))  -- 1`,
      hints: ['Start result at 1.', 'Multiply by each number from 2 to n.', 'Use a numeric for loop.'],
      concepts: ['loops', 'arithmetic'],
    },
    {
      id: 'lua-num-11',
      title: 'Write a Distance Calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function distance(x1, y1, x2, y2) that returns the Euclidean distance.',
      skeleton: `-- Write function distance(x1, y1, x2, y2)`,
      solution: `local function distance(x1, y1, x2, y2)
  local dx = x2 - x1
  local dy = y2 - y1
  return math.sqrt(dx * dx + dy * dy)
end

print(distance(0, 0, 3, 4)) -- 5.0`,
      hints: ['Use the Pythagorean theorem.', 'Compute dx and dy first.', 'Return math.sqrt(dx*dx + dy*dy).'],
      concepts: ['math-library', 'functions'],
    },
    {
      id: 'lua-num-12',
      title: 'Write Integer Check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function isInteger(n) that returns true if n is an integer (has no fractional part).',
      skeleton: `-- Write function isInteger(n)`,
      solution: `local function isInteger(n)
  return n == math.floor(n)
end

print(isInteger(5))    -- true
print(isInteger(5.5))  -- false`,
      hints: ['An integer equals its floor value.', 'math.floor(n) == n means no fractional part.', 'Return the comparison result.'],
      concepts: ['math-library', 'number-types'],
    },
    {
      id: 'lua-num-13',
      title: 'Fix Division Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code to get integer division result.',
      skeleton: `local result = 7 / 2
print(result) -- should print 3, not 3.5`,
      solution: `local result = 7 // 2
print(result) -- should print 3, not 3.5`,
      hints: ['/ gives float division in Lua 5.3+.', 'Use // for floor (integer) division.', 'Replace / with //.'],
      concepts: ['floor-division'],
    },
    {
      id: 'lua-num-14',
      title: 'Fix tonumber Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code that crashes when converting an invalid string.',
      skeleton: `local input = "abc"
local n = tonumber(input)
print(n + 1) -- crashes!`,
      solution: `local input = "abc"
local n = tonumber(input)
if n then
  print(n + 1)
else
  print("not a number")
end`,
      hints: ['tonumber returns nil for invalid strings.', 'nil + 1 causes an error.', 'Check if n is not nil before using it.'],
      concepts: ['tonumber', 'nil-check'],
    },
    {
      id: 'lua-num-15',
      title: 'Fix Random Seed Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code so math.random produces different results each run.',
      skeleton: `-- Produces same numbers every run
print(math.random(1, 100))
print(math.random(1, 100))`,
      solution: `math.randomseed(os.time())
print(math.random(1, 100))
print(math.random(1, 100))`,
      hints: ['The random number generator needs a seed.', 'Use math.randomseed to set the seed.', 'os.time() provides a different seed each second.'],
      concepts: ['math-random', 'random-seed'],
    },
    {
      id: 'lua-num-16',
      title: 'Predict Float Division',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `print(1 / 0)`,
      solution: `inf`,
      hints: ['Division by zero produces infinity in Lua.', 'Lua follows IEEE 754 floating point.', 'The result is inf.'],
      concepts: ['float-arithmetic'],
    },
    {
      id: 'lua-num-17',
      title: 'Predict Integer Arithmetic',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `print(type(3 + 4))
print(type(3 + 4.0))`,
      solution: `number
number`,
      hints: ['In Lua 5.3+, 3+4 is integer, 3+4.0 is float.', 'But type() returns "number" for both.', 'Both subtypes have type "number".'],
      concepts: ['number-types', 'type-function'],
    },
    {
      id: 'lua-num-18',
      title: 'Predict Modulo Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `print(10 % 3)
print(-10 % 3)`,
      solution: `1
2`,
      hints: ['10 % 3 = 1 (standard remainder).', 'Lua modulo follows the sign of the divisor.', '-10 % 3 = 2 (not -1).'],
      concepts: ['modulo'],
    },
    {
      id: 'lua-num-19',
      title: 'Refactor Magic Numbers',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor magic numbers into named constants.',
      skeleton: `local function circleArea(r)
  return 3.14159 * r * r
end

local function circumference(r)
  return 2 * 3.14159 * r
end

print(circleArea(5))
print(circumference(5))`,
      solution: `local PI = math.pi

local function circleArea(r)
  return PI * r * r
end

local function circumference(r)
  return 2 * PI * r
end

print(circleArea(5))
print(circumference(5))`,
      hints: ['Replace 3.14159 with math.pi.', 'Store math.pi in a local constant.', 'Use the constant in both functions.'],
      concepts: ['refactoring', 'math-library'],
    },
    {
      id: 'lua-num-20',
      title: 'Refactor Manual Min/Max',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the manual min/max logic to use math.min and math.max.',
      skeleton: `local a, b, c = 7, 2, 9

local smallest = a
if b < smallest then smallest = b end
if c < smallest then smallest = c end

local largest = a
if b > largest then largest = b end
if c > largest then largest = c end

print(smallest, largest)`,
      solution: `local a, b, c = 7, 2, 9
local smallest = math.min(a, b, c)
local largest = math.max(a, b, c)
print(smallest, largest)`,
      hints: ['math.min accepts multiple arguments.', 'math.max accepts multiple arguments.', 'Replace the manual comparisons with library calls.'],
      concepts: ['refactoring', 'math-library'],
    },
  ],
};
