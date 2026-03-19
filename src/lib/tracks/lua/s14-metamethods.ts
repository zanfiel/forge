import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-metamethods',
  title: '14. Metamethods',
  explanation: `## Metamethods in Lua

Metamethods are special keys in a metatable that define how a table responds to operators and built-in operations.

### Arithmetic Metamethods
\`\`\`lua
__add(a, b)   -- a + b
__sub(a, b)   -- a - b
__mul(a, b)   -- a * b
__div(a, b)   -- a / b
__mod(a, b)   -- a % b
__pow(a, b)   -- a ^ b
__unm(a)      -- -a
\`\`\`

### Comparison Metamethods
\`\`\`lua
__eq(a, b)    -- a == b
__lt(a, b)    -- a < b
__le(a, b)    -- a <= b
\`\`\`

### Other Metamethods
\`\`\`lua
__tostring(a)    -- tostring(a)
__call(a, ...)   -- a(...)
__len(a)         -- #a
__concat(a, b)   -- a .. b
\`\`\`

### Example: Vector
\`\`\`lua
local Vec = {}
Vec.__index = Vec
function Vec.new(x, y) return setmetatable({x=x, y=y}, Vec) end
function Vec:__add(other) return Vec.new(self.x+other.x, self.y+other.y) end
function Vec:__tostring() return "("..self.x..","..self.y..")" end

local v = Vec.new(1,2) + Vec.new(3,4)
print(v) -- (4,6)
\`\`\``,
  exercises: [
    {
      id: 'lua-metamethods-1',
      title: '__add Metamethod',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Implement the __add metamethod for a simple wrapper.',
      skeleton: `local mt = {
  ___ = function(a, b)
    return setmetatable({val = a.val + b.val}, mt)
  end
}
local x = setmetatable({val = 10}, mt)
local y = setmetatable({val = 20}, mt)
local z = x + y
print(z.val) -- 30`,
      solution: `local mt = {
  __add = function(a, b)
    return setmetatable({val = a.val + b.val}, mt)
  end
}
local x = setmetatable({val = 10}, mt)
local y = setmetatable({val = 20}, mt)
local z = x + y
print(z.val) -- 30`,
      hints: ['__add is called when + is used.', 'It receives both operands.', 'Fill in "__add".'],
      concepts: ['__add'],
    },
    {
      id: 'lua-metamethods-2',
      title: '__tostring Metamethod',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Implement __tostring for a point table.',
      skeleton: `local mt = {
  ___ = function(self)
    return "(" .. self.x .. ", " .. self.y .. ")"
  end
}
local p = setmetatable({x = 3, y = 4}, mt)
print(p) -- (3, 4)`,
      solution: `local mt = {
  __tostring = function(self)
    return "(" .. self.x .. ", " .. self.y .. ")"
  end
}
local p = setmetatable({x = 3, y = 4}, mt)
print(p) -- (3, 4)`,
      hints: ['__tostring is called by tostring() and print().', 'It should return a string representation.', 'Fill in "__tostring".'],
      concepts: ['__tostring'],
    },
    {
      id: 'lua-metamethods-3',
      title: '__call Metamethod',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Make a table callable using __call.',
      skeleton: `local mt = {
  ___ = function(self, x)
    return x * 2
  end
}
local doubler = setmetatable({}, mt)
print(doubler(5)) -- 10`,
      solution: `local mt = {
  __call = function(self, x)
    return x * 2
  end
}
local doubler = setmetatable({}, mt)
print(doubler(5)) -- 10`,
      hints: ['__call is triggered when using () on a table.', 'First parameter is self (the table).', 'Fill in "__call".'],
      concepts: ['__call'],
    },
    {
      id: 'lua-metamethods-4',
      title: '__len Metamethod',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Override the # operator with __len.',
      skeleton: `local mt = {
  ___ = function(self)
    local count = 0
    for _ in pairs(self) do count = count + 1 end
    return count
  end
}
local t = setmetatable({a=1, b=2, c=3}, mt)
print(#t) -- 3`,
      solution: `local mt = {
  __len = function(self)
    local count = 0
    for _ in pairs(self) do count = count + 1 end
    return count
  end
}
local t = setmetatable({a=1, b=2, c=3}, mt)
print(#t) -- 3`,
      hints: ['__len overrides the # operator.', 'Count all keys with pairs.', 'Fill in "__len".'],
      concepts: ['__len'],
    },
    {
      id: 'lua-metamethods-5',
      title: '__eq Metamethod',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement equality comparison for value objects.',
      skeleton: `local mt = {
  ___ = function(a, b)
    return a.val == b.val
  end
}
local x = setmetatable({val = 5}, mt)
local y = setmetatable({val = 5}, mt)
print(x == y) -- true`,
      solution: `local mt = {
  __eq = function(a, b)
    return a.val == b.val
  end
}
local x = setmetatable({val = 5}, mt)
local y = setmetatable({val = 5}, mt)
print(x == y) -- true`,
      hints: ['__eq is called for == comparison.', 'Both operands must share the same metatable.', 'Fill in "__eq".'],
      concepts: ['__eq'],
    },
    {
      id: 'lua-metamethods-6',
      title: '__lt Metamethod',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement less-than comparison.',
      skeleton: `local mt = {
  __lt = function(a, b)
    return a.___ < b.___
  end
}
local x = setmetatable({val = 3}, mt)
local y = setmetatable({val = 7}, mt)
print(x < y) -- true`,
      solution: `local mt = {
  __lt = function(a, b)
    return a.val < b.val
  end
}
local x = setmetatable({val = 3}, mt)
local y = setmetatable({val = 7}, mt)
print(x < y) -- true`,
      hints: ['Compare the val fields.', '__lt defines the < operator.', 'Fill in "val" for both.'],
      concepts: ['__lt'],
    },
    {
      id: 'lua-metamethods-7',
      title: 'Write a Vector2D Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a Vector2D with __add, __sub, and __tostring metamethods.',
      skeleton: `-- Write Vector2D with +, -, and tostring`,
      solution: `local Vector2D = {}
Vector2D.__index = Vector2D

function Vector2D.new(x, y)
  return setmetatable({x = x, y = y}, Vector2D)
end

function Vector2D:__add(other)
  return Vector2D.new(self.x + other.x, self.y + other.y)
end

function Vector2D:__sub(other)
  return Vector2D.new(self.x - other.x, self.y - other.y)
end

function Vector2D:__tostring()
  return "(" .. self.x .. ", " .. self.y .. ")"
end

local a = Vector2D.new(1, 2)
local b = Vector2D.new(3, 4)
print(a + b) -- (4, 6)
print(a - b) -- (-2, -2)`,
      hints: ['Use setmetatable with __index for methods.', 'Each metamethod returns a new Vector2D.', '__tostring returns a string representation.'],
      concepts: ['metamethods', 'oop'],
    },
    {
      id: 'lua-metamethods-8',
      title: 'Write a Callable Config',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a config table that is callable to update values: config("key", value).',
      skeleton: `-- Write a callable config table`,
      solution: `local function makeConfig(initial)
  local data = initial or {}
  return setmetatable(data, {
    __call = function(self, key, val)
      if val ~= nil then
        self[key] = val
      end
      return self[key]
    end,
  })
end

local cfg = makeConfig({debug = false})
cfg("debug", true)
print(cfg("debug")) -- true`,
      hints: ['__call receives the table and all arguments.', 'If val is provided, set it. Always return the value.', 'This creates a getter/setter pattern.'],
      concepts: ['__call'],
    },
    {
      id: 'lua-metamethods-9',
      title: 'Write a Matrix Multiply',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a 2x2 matrix type with __mul for matrix multiplication.',
      skeleton: `-- Write a 2x2 Matrix with __mul`,
      solution: `local Matrix = {}
Matrix.__index = Matrix

function Matrix.new(a, b, c, d)
  return setmetatable({a, b, c, d}, Matrix)
end

function Matrix:__mul(other)
  return Matrix.new(
    self[1]*other[1] + self[2]*other[3],
    self[1]*other[2] + self[2]*other[4],
    self[3]*other[1] + self[4]*other[3],
    self[3]*other[2] + self[4]*other[4]
  )
end

function Matrix:__tostring()
  return string.format("[%d %d; %d %d]", self[1], self[2], self[3], self[4])
end

local a = Matrix.new(1,2,3,4)
local b = Matrix.new(5,6,7,8)
print(a * b) -- [19 22; 43 50]`,
      hints: ['Store 4 values in array indices 1-4.', 'Matrix multiply: result[i][j] = sum of row*col.', 'Return a new Matrix.'],
      concepts: ['__mul', 'matrix-math'],
    },
    {
      id: 'lua-metamethods-10',
      title: 'Write __concat',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a StringList type where .. concatenates two lists.',
      skeleton: `-- Write StringList with __concat`,
      solution: `local StringList = {}
StringList.__index = StringList

function StringList.new(items)
  return setmetatable({items = items or {}}, StringList)
end

function StringList:__concat(other)
  local result = {}
  for _, v in ipairs(self.items) do result[#result+1] = v end
  for _, v in ipairs(other.items) do result[#result+1] = v end
  return StringList.new(result)
end

function StringList:__tostring()
  return "[" .. table.concat(self.items, ", ") .. "]"
end

local a = StringList.new({"a", "b"})
local b = StringList.new({"c", "d"})
print(a .. b) -- [a, b, c, d]`,
      hints: ['__concat is called for the .. operator.', 'Combine both items arrays into a new one.', 'Return a new StringList.'],
      concepts: ['__concat'],
    },
    {
      id: 'lua-metamethods-11',
      title: 'Write __unm (Unary Minus)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a Number wrapper with __unm for negation.',
      skeleton: `-- Write Number wrapper with __unm`,
      solution: `local Num = {}
Num.__index = Num

function Num.new(val)
  return setmetatable({val = val}, Num)
end

function Num:__unm()
  return Num.new(-self.val)
end

function Num:__tostring()
  return tostring(self.val)
end

local n = Num.new(42)
print(-n) -- -42`,
      hints: ['__unm is called for the unary - operator.', 'It receives only one argument (self).', 'Return a new Num with negated value.'],
      concepts: ['__unm'],
    },
    {
      id: 'lua-metamethods-12',
      title: 'Write a Sortable Object',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a Priority type with __lt so it can be sorted with table.sort.',
      skeleton: `-- Write Priority type with __lt for sorting`,
      solution: `local Priority = {}
Priority.__index = Priority

function Priority.new(name, level)
  return setmetatable({name = name, level = level}, Priority)
end

function Priority:__lt(other)
  return self.level < other.level
end

function Priority:__tostring()
  return self.name .. "(" .. self.level .. ")"
end

local tasks = {
  Priority.new("low", 3),
  Priority.new("high", 1),
  Priority.new("med", 2),
}
table.sort(tasks)
for _, t in ipairs(tasks) do print(t) end`,
      hints: ['__lt defines the < comparison.', 'table.sort uses < by default.', 'Compare the level fields.'],
      concepts: ['__lt', 'sorting'],
    },
    {
      id: 'lua-metamethods-13',
      title: 'Fix __add Missing Return',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the __add that does not return a result.',
      skeleton: `local mt = {
  __add = function(a, b)
    setmetatable({val = a.val + b.val}, mt)
  end
}
local x = setmetatable({val = 1}, mt)
local y = setmetatable({val = 2}, mt)
local z = x + y
print(z.val) -- error: attempt to index nil`,
      solution: `local mt = {
  __add = function(a, b)
    return setmetatable({val = a.val + b.val}, mt)
  end
}
local x = setmetatable({val = 1}, mt)
local y = setmetatable({val = 2}, mt)
local z = x + y
print(z.val) -- 3`,
      hints: ['The __add function must return a value.', 'Without return, it returns nil.', 'Add return before setmetatable.'],
      concepts: ['__add', 'return-values'],
    },
    {
      id: 'lua-metamethods-14',
      title: 'Fix __eq Same Metatable Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the equality check that does not work because tables have different metatables.',
      skeleton: `local mt1 = {__eq = function(a, b) return a.val == b.val end}
local mt2 = {__eq = function(a, b) return a.val == b.val end}
local x = setmetatable({val = 5}, mt1)
local y = setmetatable({val = 5}, mt2)
print(x == y) -- false! Should be true`,
      solution: `local mt = {__eq = function(a, b) return a.val == b.val end}
local x = setmetatable({val = 5}, mt)
local y = setmetatable({val = 5}, mt)
print(x == y) -- true`,
      hints: ['__eq only works when both operands share the same metatable.', 'Use a single shared metatable.', 'mt1 and mt2 are different tables even with same content.'],
      concepts: ['__eq'],
    },
    {
      id: 'lua-metamethods-15',
      title: 'Fix __tostring Not Called',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code where tostring does not use the custom __tostring.',
      skeleton: `local mt = {}
mt.__tostring = function(self)
  return "MyObj(" .. self.val .. ")"
end
local obj = {val = 42}
print(tostring(obj)) -- should print MyObj(42)`,
      solution: `local mt = {}
mt.__tostring = function(self)
  return "MyObj(" .. self.val .. ")"
end
local obj = setmetatable({val = 42}, mt)
print(tostring(obj)) -- MyObj(42)`,
      hints: ['The metatable must be set on the object.', 'Just defining mt is not enough.', 'Use setmetatable to attach it.'],
      concepts: ['setmetatable', '__tostring'],
    },
    {
      id: 'lua-metamethods-16',
      title: 'Predict __add Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local mt = {
  __add = function(a, b)
    if type(a) == "number" then
      return setmetatable({val = a + b.val}, mt)
    end
    return setmetatable({val = a.val + b}, mt)
  end
}
local x = setmetatable({val = 10}, mt)
local y = x + 5
print(y.val)`,
      solution: `15`,
      hints: ['x + 5 triggers __add with a=x, b=5.', 'type(a) is table, so second branch runs.', 'a.val(10) + b(5) = 15.'],
      concepts: ['__add', 'mixed-types'],
    },
    {
      id: 'lua-metamethods-17',
      title: 'Predict __call Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local mt = {
  __call = function(self, ...)
    return select("#", ...)
  end
}
local t = setmetatable({}, mt)
print(t(1, 2, 3))`,
      solution: `3`,
      hints: ['__call receives self plus all arguments.', 'select("#", ...) returns the count of varargs.', '3 arguments were passed.'],
      concepts: ['__call', 'select'],
    },
    {
      id: 'lua-metamethods-18',
      title: 'Predict __len Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local mt = {
  __len = function(self) return self.size end
}
local t = setmetatable({1, 2, 3, size = 99}, mt)
print(#t)`,
      solution: `99`,
      hints: ['__len overrides the # operator.', 'It returns self.size which is 99.', 'The actual array length (3) is ignored.'],
      concepts: ['__len'],
    },
    {
      id: 'lua-metamethods-19',
      title: 'Refactor to Operator Overload',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the explicit method calls to use operator overloading.',
      skeleton: `local function addMoney(a, b)
  return {cents = a.cents + b.cents}
end
local function subMoney(a, b)
  return {cents = a.cents - b.cents}
end
local function moneyStr(m)
  return string.format("$%.2f", m.cents / 100)
end

local a = {cents = 1050}
local b = {cents = 325}
print(moneyStr(addMoney(a, b)))`,
      solution: `local Money = {}
Money.__index = Money

function Money.new(cents)
  return setmetatable({cents = cents}, Money)
end

function Money:__add(other)
  return Money.new(self.cents + other.cents)
end

function Money:__sub(other)
  return Money.new(self.cents - other.cents)
end

function Money:__tostring()
  return string.format("$%.2f", self.cents / 100)
end

local a = Money.new(1050)
local b = Money.new(325)
print(a + b) -- $13.75`,
      hints: ['Replace addMoney with __add.', 'Replace subMoney with __sub.', 'Replace moneyStr with __tostring.'],
      concepts: ['metamethods', 'refactoring'],
    },
    {
      id: 'lua-metamethods-20',
      title: 'Refactor Comparison Functions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor explicit comparison functions to metamethods for natural sorting.',
      skeleton: `local function newDate(y, m, d)
  return {year = y, month = m, day = d}
end
local function dateLess(a, b)
  if a.year ~= b.year then return a.year < b.year end
  if a.month ~= b.month then return a.month < b.month end
  return a.day < b.day
end
local dates = {newDate(2024,3,15), newDate(2024,1,20), newDate(2023,12,25)}
table.sort(dates, dateLess)
for _, d in ipairs(dates) do
  print(d.year, d.month, d.day)
end`,
      solution: `local Date = {}
Date.__index = Date

function Date.new(y, m, d)
  return setmetatable({year = y, month = m, day = d}, Date)
end

function Date:__lt(other)
  if self.year ~= other.year then return self.year < other.year end
  if self.month ~= other.month then return self.month < other.month end
  return self.day < other.day
end

function Date:__tostring()
  return string.format("%04d-%02d-%02d", self.year, self.month, self.day)
end

local dates = {Date.new(2024,3,15), Date.new(2024,1,20), Date.new(2023,12,25)}
table.sort(dates)
for _, d in ipairs(dates) do print(d) end`,
      hints: ['Move the comparison logic into __lt.', 'table.sort uses < by default when no comparator given.', 'Add __tostring for clean output.'],
      concepts: ['__lt', '__tostring', 'refactoring'],
    },
  ],
};
