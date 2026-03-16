import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-math',
  title: '29. Math Library',
  explanation: `## Math Library in Lua

The \`math\` library provides standard mathematical functions:

\`\`\`lua
-- Rounding
math.floor(3.7)    -- 3
math.ceil(3.2)     -- 4

-- Random numbers
math.randomseed(os.time())
math.random()      -- float in [0, 1)
math.random(10)    -- integer in [1, 10]
math.random(5, 10) -- integer in [5, 10]

-- Trigonometry (radians)
math.sin(math.pi / 2)  -- 1.0
math.cos(0)             -- 1.0
math.atan(1, 1)         -- pi/4

-- Constants
math.pi            -- 3.14159265...
math.huge          -- infinity
math.maxinteger    -- largest integer (Lua 5.3+)
math.mininteger    -- smallest integer (Lua 5.3+)

-- Integer conversion (Lua 5.3+)
math.tointeger(5.0)   -- 5
math.tointeger(5.5)   -- nil (not exact)
math.type(5)          -- "integer"
math.type(5.0)        -- "float"
math.type("hi")       -- false

-- Other useful functions
math.abs(-5)        -- 5
math.max(1, 5, 3)   -- 5
math.min(1, 5, 3)   -- 1
math.sqrt(16)        -- 4.0
\`\`\``,
  exercises: [
    {
      id: 'lua-math-1',
      title: 'Floor and Ceil',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use math.floor and math.ceil to round numbers.',
      skeleton: `local a = math.___(3.7)
local b = math.___(3.2)
print(a, b)  -- 3, 4`,
      solution: `local a = math.floor(3.7)
local b = math.ceil(3.2)
print(a, b)  -- 3, 4`,
      hints: [
        'math.floor rounds down to the nearest integer.',
        'math.ceil rounds up to the nearest integer.',
        'floor(3.7) = 3, ceil(3.2) = 4.',
      ],
      concepts: ['math-library', 'rounding'],
    },
    {
      id: 'lua-math-2',
      title: 'Random Integer Range',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Generate a random integer in a specific range.',
      skeleton: `math.randomseed(42)
local roll = math.random(___, ___)  -- dice roll: 1 to 6
print(roll >= 1 and roll <= 6)  -- true`,
      solution: `math.randomseed(42)
local roll = math.random(1, 6)  -- dice roll: 1 to 6
print(roll >= 1 and roll <= 6)  -- true`,
      hints: [
        'math.random(m, n) returns an integer in [m, n].',
        'For a dice roll, use math.random(1, 6).',
        'Always seed with math.randomseed for different sequences.',
      ],
      concepts: ['math-library', 'random'],
    },
    {
      id: 'lua-math-3',
      title: 'Predict math.type',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output of math.type for various values.',
      skeleton: `print(math.type(42))
print(math.type(42.0))
print(math.type("42"))`,
      solution: `integer
float
false`,
      hints: [
        'math.type returns "integer" for integer numbers.',
        'math.type returns "float" for float numbers.',
        'math.type returns false for non-number types.',
      ],
      concepts: ['math-library', 'number-types'],
    },
    {
      id: 'lua-math-4',
      title: 'Compute Distance',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function to compute the distance between two 2D points.',
      skeleton: `-- Write distance(x1, y1, x2, y2) that returns the
-- Euclidean distance between two points.

-- YOUR CODE HERE`,
      solution: `function distance(x1, y1, x2, y2)
  local dx = x2 - x1
  local dy = y2 - y1
  return math.sqrt(dx * dx + dy * dy)
end`,
      hints: [
        'Euclidean distance: sqrt((x2-x1)^2 + (y2-y1)^2).',
        'Use math.sqrt for the square root.',
        'You can also use the ^ operator for squaring.',
      ],
      concepts: ['math-library', 'sqrt', 'geometry'],
    },
    {
      id: 'lua-math-5',
      title: 'Clamp Value',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a clamp function using math.min and math.max.',
      skeleton: `-- Write clamp(value, minVal, maxVal) that constrains
-- value to be within [minVal, maxVal].

-- YOUR CODE HERE`,
      solution: `function clamp(value, minVal, maxVal)
  return math.max(minVal, math.min(value, maxVal))
end`,
      hints: [
        'math.max returns the larger of its arguments.',
        'math.min returns the smaller of its arguments.',
        'Combine them: max(min_val, min(value, max_val)).',
      ],
      concepts: ['math-library', 'min', 'max'],
    },
    {
      id: 'lua-math-6',
      title: 'Convert Degrees to Radians',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Convert degrees to radians using math.pi.',
      skeleton: `function toRadians(degrees)
  return degrees * math.___ / 180
end
local rad = toRadians(180)
print(rad == math.pi)  -- true`,
      solution: `function toRadians(degrees)
  return degrees * math.pi / 180
end
local rad = toRadians(180)
print(rad == math.pi)  -- true`,
      hints: [
        'The conversion formula is: radians = degrees * pi / 180.',
        'math.pi is the constant pi (3.14159...).',
        '180 degrees equals pi radians.',
      ],
      concepts: ['math-library', 'trigonometry', 'pi'],
    },
    {
      id: 'lua-math-7',
      title: 'Predict Floor on Negatives',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict math.floor behavior with negative numbers.',
      skeleton: `print(math.floor(-3.2))
print(math.floor(-3.7))
print(math.ceil(-3.2))`,
      solution: `-4
-4
-3`,
      hints: [
        'math.floor rounds toward negative infinity.',
        'floor(-3.2) = -4, not -3.',
        'math.ceil rounds toward positive infinity.',
      ],
      concepts: ['math-library', 'rounding', 'negatives'],
    },
    {
      id: 'lua-math-8',
      title: 'Fix tointeger Usage',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the incorrect assumption about math.tointeger.',
      skeleton: `function safeInt(n)
  local result = math.tointeger(n)
  return result  -- should return the integer or nil
end

-- BUG: this crashes because result is used without nil check
local x = safeInt(5.5)
print(x + 1)  -- ERROR: attempt to perform arithmetic on nil`,
      solution: `function safeInt(n)
  local result = math.tointeger(n)
  return result  -- returns the integer or nil
end

local x = safeInt(5.5)
if x then
  print(x + 1)
else
  print("not an exact integer")
end`,
      hints: [
        'math.tointeger returns nil when the float is not an exact integer.',
        '5.5 is not an exact integer, so it returns nil.',
        'Always check for nil before using the result.',
      ],
      concepts: ['math-library', 'tointeger', 'nil-safety'],
    },
    {
      id: 'lua-math-9',
      title: 'Write Lerp Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a linear interpolation function.',
      skeleton: `-- Write lerp(a, b, t) that returns the linear interpolation
-- between a and b at parameter t (0.0 to 1.0).
-- lerp(0, 10, 0.5) should return 5.0

-- YOUR CODE HERE`,
      solution: `function lerp(a, b, t)
  return a + (b - a) * t
end`,
      hints: [
        'Linear interpolation formula: a + (b - a) * t.',
        'When t = 0, result is a. When t = 1, result is b.',
        'When t = 0.5, result is the midpoint.',
      ],
      concepts: ['math-library', 'interpolation'],
    },
    {
      id: 'lua-math-10',
      title: 'Write Round Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a round function that rounds to n decimal places.',
      skeleton: `-- Write round(num, places) that rounds num to the
-- specified number of decimal places.
-- round(3.14159, 2) should return 3.14

-- YOUR CODE HERE`,
      solution: `function round(num, places)
  local mult = 10 ^ (places or 0)
  return math.floor(num * mult + 0.5) / mult
end`,
      hints: [
        'Multiply by 10^places, floor with +0.5 for rounding, then divide back.',
        'math.floor(x + 0.5) rounds to the nearest integer.',
        'Default places to 0 if not provided.',
      ],
      concepts: ['math-library', 'rounding', 'algorithms'],
    },
    {
      id: 'lua-math-11',
      title: 'Fix Infinity Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the infinity check that does not work correctly.',
      skeleton: `function safeDivide(a, b)
  local result = a / b
  if result == infinity then  -- BUG: wrong variable
    return 0
  end
  return result
end
print(safeDivide(1, 0))  -- should print 0`,
      solution: `function safeDivide(a, b)
  local result = a / b
  if result == math.huge then  -- FIXED: use math.huge
    return 0
  end
  return result
end
print(safeDivide(1, 0))  -- should print 0`,
      hints: [
        'Lua uses math.huge for positive infinity.',
        'There is no global "infinity" variable in Lua.',
        '1/0 produces math.huge (inf) in Lua.',
      ],
      concepts: ['math-library', 'huge', 'infinity'],
    },
    {
      id: 'lua-math-12',
      title: 'Predict maxinteger',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict what happens with math.maxinteger.',
      skeleton: `local m = math.maxinteger
print(type(m))
print(m > 0)
print(math.type(m))`,
      solution: `number
true
integer`,
      hints: [
        'math.maxinteger is the largest representable integer.',
        'Its type is "number" (Lua only has one number type at the language level).',
        'math.type distinguishes "integer" from "float".',
      ],
      concepts: ['math-library', 'maxinteger', 'number-types'],
    },
    {
      id: 'lua-math-13',
      title: 'Write Angle Between Vectors',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function to compute the angle in radians between two 2D vectors.',
      skeleton: `-- Write angleBetween(x1, y1, x2, y2) that returns the
-- angle in radians between vectors (x1,y1) and (x2,y2).
-- Use math.atan and dot product / cross product.

-- YOUR CODE HERE`,
      solution: `function angleBetween(x1, y1, x2, y2)
  local dot = x1 * x2 + y1 * y2
  local cross = x1 * y2 - y1 * x2
  return math.atan(cross, dot)
end`,
      hints: [
        'The dot product gives the cosine component.',
        'The cross product gives the sine component.',
        'math.atan(y, x) computes atan2 in Lua 5.3+.',
      ],
      concepts: ['math-library', 'trigonometry', 'vectors'],
    },
    {
      id: 'lua-math-14',
      title: 'Fix Random Seed Pattern',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the random number generation that produces the same sequence.',
      skeleton: `function rollDice()
  math.randomseed(0)  -- BUG: constant seed
  return math.random(1, 6)
end

-- These will always be the same
local r1 = rollDice()
local r2 = rollDice()
print(r1 == r2)  -- always true - not random!`,
      solution: `math.randomseed(os.time())  -- FIXED: seed once at startup

function rollDice()
  return math.random(1, 6)
end

local r1 = rollDice()
local r2 = rollDice()
print(type(r1))  -- "number"`,
      hints: [
        'Do not seed inside the function - seed once at program start.',
        'Using a constant seed always produces the same sequence.',
        'Use os.time() for a varying seed value.',
      ],
      concepts: ['math-library', 'random', 'debugging'],
    },
    {
      id: 'lua-math-15',
      title: 'Write Map Range Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that maps a value from one range to another.',
      skeleton: `-- Write mapRange(value, inMin, inMax, outMin, outMax)
-- that maps value from [inMin, inMax] to [outMin, outMax].
-- Example: mapRange(5, 0, 10, 0, 100) -> 50

-- YOUR CODE HERE`,
      solution: `function mapRange(value, inMin, inMax, outMin, outMax)
  return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin)
end`,
      hints: [
        'First normalize value to [0, 1]: (value - inMin) / (inMax - inMin).',
        'Then scale to output range: normalized * (outMax - outMin) + outMin.',
        'This is a common pattern in graphics and game programming.',
      ],
      concepts: ['math-library', 'interpolation', 'mapping'],
    },
    {
      id: 'lua-math-16',
      title: 'Refactor Repeated math.floor',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor code that repeatedly uses math.floor for integer division.',
      skeleton: `local a = 17
local b = 5
local quotient = math.floor(a / b)
local remainder = a - math.floor(a / b) * b

local x = 23
local y = 7
local qx = math.floor(x / y)
local rx = x - math.floor(x / y) * y

print(quotient, remainder)
print(qx, rx)`,
      solution: `local function divmod(a, b)
  local q = a // b
  local r = a % b
  return q, r
end

local quotient, remainder = divmod(17, 5)
local qx, rx = divmod(23, 7)

print(quotient, remainder)
print(qx, rx)`,
      hints: [
        'Lua 5.3+ has integer division operator //.',
        'The modulo operator % gives the remainder.',
        'Extract a divmod helper function to avoid repetition.',
      ],
      concepts: ['math-library', 'refactoring', 'integer-division'],
    },
    {
      id: 'lua-math-17',
      title: 'Refactor Trig Calculations',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor raw trigonometry into a reusable vector rotation function.',
      skeleton: `-- Rotate point (3, 4) by 90 degrees
local x1 = 3 * math.cos(math.pi / 2) - 4 * math.sin(math.pi / 2)
local y1 = 3 * math.sin(math.pi / 2) + 4 * math.cos(math.pi / 2)

-- Rotate point (1, 0) by 45 degrees
local x2 = 1 * math.cos(math.pi / 4) - 0 * math.sin(math.pi / 4)
local y2 = 1 * math.sin(math.pi / 4) + 0 * math.cos(math.pi / 4)

print(math.floor(x1 + 0.5), math.floor(y1 + 0.5))
print(string.format("%.4f", x2))`,
      solution: `local function rotatePoint(x, y, angle)
  local c = math.cos(angle)
  local s = math.sin(angle)
  return x * c - y * s, x * s + y * c
end

local x1, y1 = rotatePoint(3, 4, math.pi / 2)
local x2, y2 = rotatePoint(1, 0, math.pi / 4)

print(math.floor(x1 + 0.5), math.floor(y1 + 0.5))
print(string.format("%.4f", x2))`,
      hints: [
        'Extract the rotation formula into a reusable function.',
        'Compute cos and sin once per call.',
        'Return both x and y as multiple return values.',
      ],
      concepts: ['math-library', 'trigonometry', 'refactoring'],
    },
    {
      id: 'lua-math-18',
      title: 'Predict math.huge Arithmetic',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Predict arithmetic with math.huge.',
      skeleton: `print(math.huge + 1 == math.huge)
print(math.huge * 0 == math.huge * 0)
print(1 / math.huge == 0)`,
      solution: `true
false
true`,
      hints: [
        'Adding a finite number to infinity gives infinity.',
        'infinity * 0 is NaN, and NaN ~= NaN.',
        '1 / infinity equals 0.',
      ],
      concepts: ['math-library', 'huge', 'nan'],
    },
    {
      id: 'lua-math-19',
      title: 'Write Smooth Step',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Implement the smoothstep function for smooth interpolation.',
      skeleton: `-- Write smoothstep(edge0, edge1, x) that returns:
-- 0 if x <= edge0, 1 if x >= edge1
-- Otherwise smooth Hermite interpolation.
-- Formula: t = clamp((x-edge0)/(edge1-edge0), 0, 1)
-- return t * t * (3 - 2 * t)

-- YOUR CODE HERE`,
      solution: `function smoothstep(edge0, edge1, x)
  local t = (x - edge0) / (edge1 - edge0)
  t = math.max(0, math.min(1, t))
  return t * t * (3 - 2 * t)
end`,
      hints: [
        'First compute t as the normalized position between edges.',
        'Clamp t to [0, 1] using math.max and math.min.',
        'Apply the Hermite formula: t^2 * (3 - 2t).',
      ],
      concepts: ['math-library', 'interpolation', 'algorithms'],
    },
    {
      id: 'lua-math-20',
      title: 'Fill in Integer Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use math.type to check if a number is an integer.',
      skeleton: `function isInteger(n)
  return math.___(n) == "___"
end
print(isInteger(42))    -- true
print(isInteger(42.5))  -- false
print(isInteger("42"))  -- false`,
      solution: `function isInteger(n)
  return math.type(n) == "integer"
end
print(isInteger(42))    -- true
print(isInteger(42.5))  -- false
print(isInteger("42"))  -- false`,
      hints: [
        'math.type returns "integer", "float", or false.',
        'For non-number types it returns false.',
        'false == "integer" is false, so non-numbers return false correctly.',
      ],
      concepts: ['math-library', 'type-checking', 'integers'],
    },
  ],
};
