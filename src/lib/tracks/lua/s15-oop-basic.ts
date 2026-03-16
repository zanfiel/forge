import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-oop',
  title: '15. OOP Basics',
  explanation: `## OOP Basics in Lua

Lua does not have built-in classes, but you can implement OOP using tables and metatables.

### The Colon Syntax
\`\`\`lua
-- Dot syntax: explicit self
function Dog.bark(self) print(self.name .. " barks!") end
Dog.bark(myDog)

-- Colon syntax: implicit self
function Dog:bark() print(self.name .. " barks!") end
myDog:bark()
\`\`\`

### Basic Class Pattern
\`\`\`lua
local Dog = {}
Dog.__index = Dog

function Dog.new(name, breed)
  local self = setmetatable({}, Dog)
  self.name = name
  self.breed = breed
  return self
end

function Dog:bark()
  return self.name .. " says Woof!"
end

local d = Dog.new("Rex", "Lab")
print(d:bark()) -- "Rex says Woof!"
\`\`\`

### How It Works
1. \`Dog.__index = Dog\` -- when a key is missing, look in Dog
2. \`setmetatable({}, Dog)\` -- new table with Dog as metatable
3. \`d:bark()\` -- d has no bark, __index finds it in Dog
4. Colon syntax passes d as \`self\``,
  exercises: [
    {
      id: 'lua-oop-1',
      title: 'Colon Syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Call a method using colon syntax.',
      skeleton: `local obj = {name = "test", greet = function(self) return "Hi, " .. self.name end}
print(obj___greet()) -- should print "Hi, test"`,
      solution: `local obj = {name = "test", greet = function(self) return "Hi, " .. self.name end}
print(obj:greet()) -- should print "Hi, test"`,
      hints: ['Colon syntax passes the table as self.', 'obj:method() is shorthand for obj.method(obj).', 'Fill in ":".'],
      concepts: ['colon-syntax'],
    },
    {
      id: 'lua-oop-2',
      title: 'Set __index',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Set __index on the class table.',
      skeleton: `local Animal = {}
Animal.___ = Animal

function Animal.new(name)
  return setmetatable({name = name}, Animal)
end
function Animal:speak() return self.name end

local a = Animal.new("Cat")
print(a:speak())`,
      solution: `local Animal = {}
Animal.__index = Animal

function Animal.new(name)
  return setmetatable({name = name}, Animal)
end
function Animal:speak() return self.name end

local a = Animal.new("Cat")
print(a:speak())`,
      hints: ['__index tells Lua where to find missing methods.', 'Setting it to the class table makes methods available.', 'Fill in "__index".'],
      concepts: ['__index', 'oop-pattern'],
    },
    {
      id: 'lua-oop-3',
      title: 'Constructor Pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the constructor.',
      skeleton: `local Car = {}
Car.__index = Car

function Car.new(make, year)
  local self = ___(  {}, Car)
  self.make = make
  self.year = year
  return self
end
local c = Car.new("Toyota", 2024)
print(c.make)`,
      solution: `local Car = {}
Car.__index = Car

function Car.new(make, year)
  local self = setmetatable({}, Car)
  self.make = make
  self.year = year
  return self
end
local c = Car.new("Toyota", 2024)
print(c.make)`,
      hints: ['setmetatable creates the instance with the class metatable.', 'It returns the table.', 'Fill in "setmetatable".'],
      concepts: ['constructor'],
    },
    {
      id: 'lua-oop-4',
      title: 'Method with Self',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Define a method using colon syntax.',
      skeleton: `local Counter = {}
Counter.__index = Counter

function Counter.new()
  return setmetatable({count = 0}, Counter)
end

function Counter___increment()
  self.count = self.count + 1
end

local c = Counter.new()
c:increment()
print(c.count) -- 1`,
      solution: `local Counter = {}
Counter.__index = Counter

function Counter.new()
  return setmetatable({count = 0}, Counter)
end

function Counter:increment()
  self.count = self.count + 1
end

local c = Counter.new()
c:increment()
print(c.count) -- 1`,
      hints: ['Colon syntax in definition passes self implicitly.', 'Counter:method() defines with self parameter.', 'Fill in ":".'],
      concepts: ['colon-syntax', 'methods'],
    },
    {
      id: 'lua-oop-5',
      title: 'Instance Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Check if an object is an instance of a class.',
      skeleton: `local Dog = {}
Dog.__index = Dog
function Dog.new(name) return setmetatable({name=name}, Dog) end

local d = Dog.new("Rex")
print(___(d) == Dog) -- true`,
      solution: `local Dog = {}
Dog.__index = Dog
function Dog.new(name) return setmetatable({name=name}, Dog) end

local d = Dog.new("Rex")
print(getmetatable(d) == Dog) -- true`,
      hints: ['getmetatable returns the metatable of an object.', 'Compare it with the class table.', 'Fill in "getmetatable".'],
      concepts: ['getmetatable', 'instanceof'],
    },
    {
      id: 'lua-oop-6',
      title: 'toString for Objects',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Add a __tostring metamethod to the class.',
      skeleton: `local Point = {}
Point.__index = Point
function Point.new(x, y) return setmetatable({x=x, y=y}, Point) end

function Point:___()
  return "Point(" .. self.x .. ", " .. self.y .. ")"
end

print(Point.new(3, 4))`,
      solution: `local Point = {}
Point.__index = Point
function Point.new(x, y) return setmetatable({x=x, y=y}, Point) end

function Point:__tostring()
  return "Point(" .. self.x .. ", " .. self.y .. ")"
end

print(Point.new(3, 4))`,
      hints: ['__tostring is called by print/tostring.', 'Define it as a method on the class.', 'Fill in "__tostring".'],
      concepts: ['__tostring', 'oop'],
    },
    {
      id: 'lua-oop-7',
      title: 'Write a Stack Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a Stack class with push, pop, peek, and isEmpty methods.',
      skeleton: `-- Write a Stack class`,
      solution: `local Stack = {}
Stack.__index = Stack

function Stack.new()
  return setmetatable({items = {}}, Stack)
end

function Stack:push(val)
  self.items[#self.items + 1] = val
end

function Stack:pop()
  return table.remove(self.items)
end

function Stack:peek()
  return self.items[#self.items]
end

function Stack:isEmpty()
  return #self.items == 0
end

local s = Stack.new()
s:push(1); s:push(2); s:push(3)
print(s:pop())     -- 3
print(s:peek())    -- 2
print(s:isEmpty()) -- false`,
      hints: ['Use a table with __index for the class.', 'Store items in an internal array.', 'pop removes the last element, peek looks at it.'],
      concepts: ['oop', 'stack'],
    },
    {
      id: 'lua-oop-8',
      title: 'Write a Queue Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a Queue class with enqueue, dequeue, and size methods.',
      skeleton: `-- Write a Queue class`,
      solution: `local Queue = {}
Queue.__index = Queue

function Queue.new()
  return setmetatable({items = {}, head = 1, tail = 0}, Queue)
end

function Queue:enqueue(val)
  self.tail = self.tail + 1
  self.items[self.tail] = val
end

function Queue:dequeue()
  if self.head > self.tail then return nil end
  local val = self.items[self.head]
  self.items[self.head] = nil
  self.head = self.head + 1
  return val
end

function Queue:size()
  return self.tail - self.head + 1
end

local q = Queue.new()
q:enqueue("a"); q:enqueue("b")
print(q:dequeue()) -- "a"
print(q:size())    -- 1`,
      hints: ['Track head and tail indices.', 'enqueue adds at tail, dequeue removes from head.', 'This avoids table.remove(t, 1) which is O(n).'],
      concepts: ['oop', 'queue'],
    },
    {
      id: 'lua-oop-9',
      title: 'Write a BankAccount Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a BankAccount class with deposit, withdraw (no overdraft), and getBalance methods.',
      skeleton: `-- Write a BankAccount class`,
      solution: `local BankAccount = {}
BankAccount.__index = BankAccount

function BankAccount.new(owner, balance)
  return setmetatable({
    owner = owner,
    balance = balance or 0,
  }, BankAccount)
end

function BankAccount:deposit(amount)
  self.balance = self.balance + amount
end

function BankAccount:withdraw(amount)
  if amount > self.balance then
    return false, "insufficient funds"
  end
  self.balance = self.balance - amount
  return true
end

function BankAccount:getBalance()
  return self.balance
end

function BankAccount:__tostring()
  return self.owner .. ": $" .. self.balance
end

local acct = BankAccount.new("Alice", 100)
acct:deposit(50)
print(acct:withdraw(200)) -- false  insufficient funds
print(acct) -- Alice: $150`,
      hints: ['Check balance before withdrawal.', 'Return false and error message on overdraft.', 'Use __tostring for printing.'],
      concepts: ['oop', 'encapsulation'],
    },
    {
      id: 'lua-oop-10',
      title: 'Write a LinkedList Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple LinkedList class with prepend, head, and toArray methods.',
      skeleton: `-- Write a LinkedList class`,
      solution: `local LinkedList = {}
LinkedList.__index = LinkedList

function LinkedList.new()
  return setmetatable({first = nil, len = 0}, LinkedList)
end

function LinkedList:prepend(val)
  self.first = {val = val, next = self.first}
  self.len = self.len + 1
end

function LinkedList:head()
  return self.first and self.first.val
end

function LinkedList:toArray()
  local result = {}
  local node = self.first
  while node do
    result[#result + 1] = node.val
    node = node.next
  end
  return result
end

local ll = LinkedList.new()
ll:prepend(3); ll:prepend(2); ll:prepend(1)
print(ll:head()) -- 1
local arr = ll:toArray()
print(arr[1], arr[2], arr[3]) -- 1 2 3`,
      hints: ['Each node is a table with val and next.', 'prepend creates a new node pointing to the old first.', 'toArray walks the chain collecting values.'],
      concepts: ['oop', 'linked-list'],
    },
    {
      id: 'lua-oop-11',
      title: 'Write a Timer Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a Timer class with start, stop, and elapsed methods using os.clock.',
      skeleton: `-- Write a Timer class`,
      solution: `local Timer = {}
Timer.__index = Timer

function Timer.new()
  return setmetatable({startTime = nil, stopTime = nil}, Timer)
end

function Timer:start()
  self.startTime = os.clock()
  self.stopTime = nil
end

function Timer:stop()
  self.stopTime = os.clock()
end

function Timer:elapsed()
  local endTime = self.stopTime or os.clock()
  return endTime - (self.startTime or endTime)
end

function Timer:__tostring()
  return string.format("%.4fs", self:elapsed())
end

local t = Timer.new()
t:start()
for i = 1, 1000000 do end
t:stop()
print(t)`,
      hints: ['os.clock returns CPU time.', 'Store start and stop times.', 'elapsed computes the difference.'],
      concepts: ['oop', 'timing'],
    },
    {
      id: 'lua-oop-12',
      title: 'Write a Set Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a Set class with add, remove, contains, and size methods.',
      skeleton: `-- Write a Set class`,
      solution: `local Set = {}
Set.__index = Set

function Set.new(items)
  local self = setmetatable({data = {}, count = 0}, Set)
  for _, v in ipairs(items or {}) do
    self:add(v)
  end
  return self
end

function Set:add(val)
  if not self.data[val] then
    self.data[val] = true
    self.count = self.count + 1
  end
end

function Set:remove(val)
  if self.data[val] then
    self.data[val] = nil
    self.count = self.count - 1
  end
end

function Set:contains(val)
  return self.data[val] == true
end

function Set:size()
  return self.count
end

local s = Set.new({1, 2, 3, 2})
print(s:size())       -- 3
print(s:contains(2))  -- true
s:remove(2)
print(s:contains(2))  -- false`,
      hints: ['Use a table with values as keys (set to true).', 'Track count manually.', 'Duplicate adds are no-ops.'],
      concepts: ['oop', 'set'],
    },
    {
      id: 'lua-oop-13',
      title: 'Fix Colon vs Dot Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the method call that does not pass self.',
      skeleton: `local Player = {}
Player.__index = Player
function Player.new(name) return setmetatable({name=name, hp=100}, Player) end
function Player:takeDamage(dmg) self.hp = self.hp - dmg end

local p = Player.new("Hero")
p.takeDamage(10) -- error!
print(p.hp)`,
      solution: `local Player = {}
Player.__index = Player
function Player.new(name) return setmetatable({name=name, hp=100}, Player) end
function Player:takeDamage(dmg) self.hp = self.hp - dmg end

local p = Player.new("Hero")
p:takeDamage(10)
print(p.hp) -- 90`,
      hints: ['p.takeDamage(10) does not pass self.', 'Use colon syntax: p:takeDamage(10).', 'Colon auto-passes the table as self.'],
      concepts: ['colon-syntax'],
    },
    {
      id: 'lua-oop-14',
      title: 'Fix Missing __index Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the class where methods are not found on instances.',
      skeleton: `local Cat = {}

function Cat.new(name)
  return setmetatable({name = name}, Cat)
end

function Cat:meow()
  return self.name .. " says meow"
end

local c = Cat.new("Whiskers")
print(c:meow()) -- error: attempt to call nil`,
      solution: `local Cat = {}
Cat.__index = Cat

function Cat.new(name)
  return setmetatable({name = name}, Cat)
end

function Cat:meow()
  return self.name .. " says meow"
end

local c = Cat.new("Whiskers")
print(c:meow()) -- Whiskers says meow`,
      hints: ['Without __index, instances cannot find class methods.', 'Add Cat.__index = Cat.', 'This tells Lua to look in Cat for missing keys.'],
      concepts: ['__index', 'oop-pattern'],
    },
    {
      id: 'lua-oop-15',
      title: 'Fix Constructor Return Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the constructor that does not return the new instance.',
      skeleton: `local Box = {}
Box.__index = Box

function Box.new(w, h)
  local self = setmetatable({}, Box)
  self.width = w
  self.height = h
end

function Box:area() return self.width * self.height end

local b = Box.new(3, 4)
print(b:area()) -- error!`,
      solution: `local Box = {}
Box.__index = Box

function Box.new(w, h)
  local self = setmetatable({}, Box)
  self.width = w
  self.height = h
  return self
end

function Box:area() return self.width * self.height end

local b = Box.new(3, 4)
print(b:area()) -- 12`,
      hints: ['The constructor must return the new instance.', 'Without return, new() returns nil.', 'Add "return self" at the end.'],
      concepts: ['constructor', 'return-values'],
    },
    {
      id: 'lua-oop-16',
      title: 'Predict Method Call Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local T = {}
T.__index = T
function T.new(v) return setmetatable({val=v}, T) end
function T:get() return self.val end

local a = T.new(10)
local b = T.new(20)
a.val = 30
print(a:get(), b:get())`,
      solution: `30\t20`,
      hints: ['a.val was changed to 30.', 'b.val remains 20.', 'Each instance has its own val.'],
      concepts: ['oop', 'instance-state'],
    },
    {
      id: 'lua-oop-17',
      title: 'Predict Shared vs Instance',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local C = {count = 0}
C.__index = C
function C.new()
  local self = setmetatable({}, C)
  C.count = C.count + 1
  return self
end
C.new(); C.new(); C.new()
local obj = C.new()
print(obj.count)`,
      solution: `4`,
      hints: ['count is on the class table C, shared by all.', 'Each new() increments C.count.', 'obj.count finds it via __index -> C.count = 4.'],
      concepts: ['class-variables', '__index'],
    },
    {
      id: 'lua-oop-18',
      title: 'Predict Colon vs Dot',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local T = {}
T.__index = T
T.name = "class"
function T.new(name) return setmetatable({name=name}, T) end
function T:getName() return self.name end

local obj = T.new("instance")
print(obj.getName(obj))
print(obj:getName())`,
      solution: `instance
instance`,
      hints: ['obj.getName(obj) explicitly passes obj as self.', 'obj:getName() implicitly passes obj as self.', 'Both produce the same result.'],
      concepts: ['colon-syntax', 'dot-syntax'],
    },
    {
      id: 'lua-oop-19',
      title: 'Refactor to OOP Pattern',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the procedural code into a class-based OOP pattern.',
      skeleton: `local function newRect(w, h)
  return {width = w, height = h}
end
local function rectArea(r)
  return r.width * r.height
end
local function rectPerimeter(r)
  return 2 * (r.width + r.height)
end
local r = newRect(5, 3)
print(rectArea(r), rectPerimeter(r))`,
      solution: `local Rect = {}
Rect.__index = Rect

function Rect.new(w, h)
  return setmetatable({width = w, height = h}, Rect)
end

function Rect:area()
  return self.width * self.height
end

function Rect:perimeter()
  return 2 * (self.width + self.height)
end

local r = Rect.new(5, 3)
print(r:area(), r:perimeter())`,
      hints: ['Create a class table with __index.', 'Convert standalone functions to methods.', 'Use colon syntax for method calls.'],
      concepts: ['refactoring', 'oop'],
    },
    {
      id: 'lua-oop-20',
      title: 'Refactor to Use Constructor Defaults',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the class to accept an options table with defaults.',
      skeleton: `local Button = {}
Button.__index = Button

function Button.new(text, width, height, color)
  local self = setmetatable({}, Button)
  self.text = text or "Click"
  self.width = width or 100
  self.height = height or 40
  self.color = color or "gray"
  return self
end

local b = Button.new(nil, nil, nil, "blue")
print(b.text, b.color)`,
      solution: `local Button = {}
Button.__index = Button

local defaults = {text = "Click", width = 100, height = 40, color = "gray"}

function Button.new(opts)
  opts = opts or {}
  local self = setmetatable({}, Button)
  for k, v in pairs(defaults) do
    self[k] = opts[k] or v
  end
  return self
end

local b = Button.new({color = "blue"})
print(b.text, b.color)`,
      hints: ['Accept a single options table parameter.', 'Merge with defaults using a loop.', 'Callers only specify what they need.'],
      concepts: ['refactoring', 'constructor', 'options-table'],
    },
  ],
};
