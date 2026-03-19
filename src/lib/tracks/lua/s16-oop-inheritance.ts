import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-oop-inherit',
  title: '16. OOP Inheritance',
  explanation: `## OOP Inheritance in Lua

Lua implements inheritance through __index chaining. A child class can inherit from a parent by setting the parent as its __index fallback.

### Single Inheritance
\`\`\`lua
local Animal = {}
Animal.__index = Animal
function Animal.new(name)
  return setmetatable({name = name}, Animal)
end
function Animal:speak() return self.name .. " makes a sound" end

local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog
function Dog.new(name, breed)
  local self = Animal.new(name)
  return setmetatable(self, Dog)
end
function Dog:speak() return self.name .. " barks!" end

local d = Dog.new("Rex", "Lab")
print(d:speak()) -- "Rex barks!" (overridden)
\`\`\`

### Calling Super Methods
\`\`\`lua
function Dog:speak()
  local base = Animal.speak(self) -- call parent method
  return base .. " (woof!)"
end
\`\`\`

### Multiple Inheritance
Use a custom __index function that searches multiple parents:
\`\`\`lua
local function multiInherit(...)
  local parents = {...}
  return function(_, key)
    for _, p in ipairs(parents) do
      if p[key] then return p[key] end
    end
  end
end
\`\`\``,
  exercises: [
    {
      id: 'lua-oop-inherit-1',
      title: 'Basic Inheritance Setup',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Set up Dog to inherit from Animal.',
      skeleton: `local Animal = {}
Animal.__index = Animal
function Animal.new(name) return setmetatable({name=name}, Animal) end
function Animal:speak() return "..." end

local Dog = setmetatable({}, {__index = ___})
Dog.__index = Dog`,
      solution: `local Animal = {}
Animal.__index = Animal
function Animal.new(name) return setmetatable({name=name}, Animal) end
function Animal:speak() return "..." end

local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog`,
      hints: ['Dog should fall back to Animal for missing methods.', 'Set __index of Dog metatable to Animal.', 'Fill in "Animal".'],
      concepts: ['inheritance', '__index-chaining'],
    },
    {
      id: 'lua-oop-inherit-2',
      title: 'Child Constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Complete the child constructor that calls the parent constructor.',
      skeleton: `local Shape = {}
Shape.__index = Shape
function Shape.new(color) return setmetatable({color=color}, Shape) end

local Circle = setmetatable({}, {__index = Shape})
Circle.__index = Circle
function Circle.new(color, radius)
  local self = Shape.___(color)
  self.radius = radius
  return setmetatable(self, ___)
end`,
      solution: `local Shape = {}
Shape.__index = Shape
function Shape.new(color) return setmetatable({color=color}, Shape) end

local Circle = setmetatable({}, {__index = Shape})
Circle.__index = Circle
function Circle.new(color, radius)
  local self = Shape.new(color)
  self.radius = radius
  return setmetatable(self, Circle)
end`,
      hints: ['Call Shape.new to create the base object.', 'Then re-set the metatable to Circle.', 'Fill in "new" and "Circle".'],
      concepts: ['inheritance', 'constructor'],
    },
    {
      id: 'lua-oop-inherit-3',
      title: 'Method Override',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Override the parent speak method in the child.',
      skeleton: `local Animal = {}
Animal.__index = Animal
function Animal.new(name) return setmetatable({name=name}, Animal) end
function Animal:speak() return "..." end

local Cat = setmetatable({}, {__index = Animal})
Cat.__index = Cat
function Cat.new(name)
  return setmetatable(Animal.new(name), Cat)
end
function Cat:___()
  return self.name .. " says meow"
end`,
      solution: `local Animal = {}
Animal.__index = Animal
function Animal.new(name) return setmetatable({name=name}, Animal) end
function Animal:speak() return "..." end

local Cat = setmetatable({}, {__index = Animal})
Cat.__index = Cat
function Cat.new(name)
  return setmetatable(Animal.new(name), Cat)
end
function Cat:speak()
  return self.name .. " says meow"
end`,
      hints: ['Define a method with the same name to override.', 'Cat:speak overrides Animal:speak.', 'Fill in "speak".'],
      concepts: ['method-override'],
    },
    {
      id: 'lua-oop-inherit-4',
      title: 'Call Super Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Call the parent method from the child method.',
      skeleton: `local Base = {}
Base.__index = Base
function Base.new(x) return setmetatable({x=x}, Base) end
function Base:info() return "x=" .. self.x end

local Child = setmetatable({}, {__index = Base})
Child.__index = Child
function Child.new(x, y) local s = Base.new(x); s.y=y; return setmetatable(s, Child) end
function Child:info()
  return ___.___(self) .. ", y=" .. self.y
end`,
      solution: `local Base = {}
Base.__index = Base
function Base.new(x) return setmetatable({x=x}, Base) end
function Base:info() return "x=" .. self.x end

local Child = setmetatable({}, {__index = Base})
Child.__index = Child
function Child.new(x, y) local s = Base.new(x); s.y=y; return setmetatable(s, Child) end
function Child:info()
  return Base.info(self) .. ", y=" .. self.y
end`,
      hints: ['Call the parent method explicitly with dot syntax.', 'Pass self as the first argument.', 'Base.info(self) calls the parent version.'],
      concepts: ['super-call'],
    },
    {
      id: 'lua-oop-inherit-5',
      title: 'Instance Check with Inheritance',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an isInstanceOf check that works with inheritance.',
      skeleton: `local function isInstanceOf(obj, class)
  local mt = getmetatable(obj)
  while mt do
    if mt == class then return true end
    mt = getmetatable(___) -- walk up the chain
  end
  return false
end`,
      solution: `local function isInstanceOf(obj, class)
  local mt = getmetatable(obj)
  while mt do
    if mt == class then return true end
    mt = getmetatable(mt) -- walk up the chain
  end
  return false
end`,
      hints: ['Walk up the metatable chain.', 'Each class metatable may have its own metatable.', 'Fill in "mt" to get the parent.'],
      concepts: ['instanceof', 'inheritance-chain'],
    },
    {
      id: 'lua-oop-inherit-6',
      title: 'Inherit and Extend',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Add a new method to the child that is not in the parent.',
      skeleton: `local Vehicle = {}
Vehicle.__index = Vehicle
function Vehicle.new(speed) return setmetatable({speed=speed}, Vehicle) end
function Vehicle:getSpeed() return self.speed end

local Car = setmetatable({}, {__index = Vehicle})
Car.__index = Car
function Car.new(speed, doors) local s=Vehicle.new(speed); s.doors=doors; return setmetatable(s, Car) end
function Car:___()
  return self.doors
end

local c = Car.new(100, 4)
print(c:getSpeed(), c:getDoors())`,
      solution: `local Vehicle = {}
Vehicle.__index = Vehicle
function Vehicle.new(speed) return setmetatable({speed=speed}, Vehicle) end
function Vehicle:getSpeed() return self.speed end

local Car = setmetatable({}, {__index = Vehicle})
Car.__index = Car
function Car.new(speed, doors) local s=Vehicle.new(speed); s.doors=doors; return setmetatable(s, Car) end
function Car:getDoors()
  return self.doors
end

local c = Car.new(100, 4)
print(c:getSpeed(), c:getDoors())`,
      hints: ['Add a new method to Car that does not exist in Vehicle.', 'getDoors is specific to Car.', 'Fill in "getDoors".'],
      concepts: ['inheritance', 'method-extension'],
    },
    {
      id: 'lua-oop-inherit-7',
      title: 'Write a Shape Hierarchy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write Shape (base) with a color property, and Rectangle (child) with width, height, and an area() method.',
      skeleton: `-- Write Shape -> Rectangle hierarchy`,
      solution: `local Shape = {}
Shape.__index = Shape

function Shape.new(color)
  return setmetatable({color = color or "black"}, Shape)
end

function Shape:getColor()
  return self.color
end

local Rectangle = setmetatable({}, {__index = Shape})
Rectangle.__index = Rectangle

function Rectangle.new(color, w, h)
  local self = Shape.new(color)
  self.width = w
  self.height = h
  return setmetatable(self, Rectangle)
end

function Rectangle:area()
  return self.width * self.height
end

local r = Rectangle.new("red", 5, 3)
print(r:getColor()) -- "red" (inherited)
print(r:area())     -- 15 (own method)`,
      hints: ['Shape provides base properties and methods.', 'Rectangle inherits from Shape and adds its own.', 'Call Shape.new in Rectangle.new.'],
      concepts: ['inheritance', 'constructor-chaining'],
    },
    {
      id: 'lua-oop-inherit-8',
      title: 'Write a Class Helper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a helper function Class(parent) that sets up the inheritance boilerplate.',
      skeleton: `-- Write function Class(parent) that returns a new class table`,
      solution: `local function Class(parent)
  local cls = {}
  cls.__index = cls
  if parent then
    setmetatable(cls, {__index = parent})
  end
  function cls:new(...)
    local instance = setmetatable({}, cls)
    if instance.init then
      instance:init(...)
    end
    return instance
  end
  return cls
end

local Animal = Class()
function Animal:init(name) self.name = name end
function Animal:speak() return self.name end

local Dog = Class(Animal)
function Dog:init(name, breed)
  Animal.init(self, name)
  self.breed = breed
end
function Dog:speak() return self.name .. " barks!" end

local d = Dog:new("Rex", "Lab")
print(d:speak()) -- "Rex barks!"`,
      hints: ['Class returns a new table with __index set.', 'If parent exists, set parent as fallback.', 'Provide a new() method that calls init.'],
      concepts: ['class-helper', 'inheritance'],
    },
    {
      id: 'lua-oop-inherit-9',
      title: 'Write Multiple Inheritance',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write code that creates a class inheriting from two parents (Flyable and Swimmable).',
      skeleton: `-- Write multiple inheritance: FlyingFish inherits Flyable + Swimmable`,
      solution: `local function searchParents(parents, key)
  for _, parent in ipairs(parents) do
    if parent[key] then return parent[key] end
  end
end

local Flyable = {}
Flyable.__index = Flyable
function Flyable:fly() return self.name .. " flies" end

local Swimmable = {}
Swimmable.__index = Swimmable
function Swimmable:swim() return self.name .. " swims" end

local FlyingFish = {}
FlyingFish.__index = FlyingFish
setmetatable(FlyingFish, {
  __index = function(_, key)
    return searchParents({Flyable, Swimmable}, key)
  end,
})

function FlyingFish.new(name)
  return setmetatable({name = name}, FlyingFish)
end

local ff = FlyingFish.new("Nemo")
print(ff:fly())  -- "Nemo flies"
print(ff:swim()) -- "Nemo swims"`,
      hints: ['Use __index as a function to search multiple parents.', 'Iterate through parent tables looking for the key.', 'Return the first match found.'],
      concepts: ['multiple-inheritance'],
    },
    {
      id: 'lua-oop-inherit-10',
      title: 'Write Mixin Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a mixin function that copies methods from a mixin table into a class.',
      skeleton: `-- Write function mixin(class, ...)`,
      solution: `local function mixin(class, ...)
  for _, mix in ipairs({...}) do
    for k, v in pairs(mix) do
      if type(v) == "function" then
        class[k] = v
      end
    end
  end
  return class
end

local Serializable = {}
function Serializable:serialize()
  local parts = {}
  for k, v in pairs(self) do
    parts[#parts + 1] = k .. "=" .. tostring(v)
  end
  return "{" .. table.concat(parts, ", ") .. "}"
end

local MyClass = {}
MyClass.__index = MyClass
function MyClass.new(x) return setmetatable({x = x}, MyClass) end

mixin(MyClass, Serializable)
local obj = MyClass.new(42)
print(obj:serialize())`,
      hints: ['Copy function values from mixins into the class.', 'Iterate with pairs over each mixin.', 'Only copy functions, not data.'],
      concepts: ['mixin-pattern'],
    },
    {
      id: 'lua-oop-inherit-11',
      title: 'Write Abstract Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a base class with an "abstract" method that errors if not overridden.',
      skeleton: `-- Write an abstract base with required area() method`,
      solution: `local Shape = {}
Shape.__index = Shape

function Shape.new(name)
  return setmetatable({name = name}, Shape)
end

function Shape:area()
  error(self.name .. " must implement area()")
end

function Shape:describe()
  return self.name .. " with area " .. self:area()
end

local Square = setmetatable({}, {__index = Shape})
Square.__index = Square

function Square.new(side)
  local self = Shape.new("Square")
  self.side = side
  return setmetatable(self, Square)
end

function Square:area()
  return self.side * self.side
end

print(Square.new(5):describe()) -- "Square with area 25"`,
      hints: ['Define the abstract method to throw an error.', 'Child classes override it with real implementations.', 'The base class describe() calls area() polymorphically.'],
      concepts: ['abstract-methods', 'polymorphism'],
    },
    {
      id: 'lua-oop-inherit-12',
      title: 'Write Protected Fields',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a class pattern where internal fields (prefixed with _) cannot be accessed externally.',
      skeleton: `-- Write a class with protected _ fields`,
      solution: `local function ProtectedClass()
  local cls = {}
  cls.__index = function(self, key)
    if key:sub(1,1) == "_" then
      error("cannot access protected field: " .. key)
    end
    return cls[key]
  end
  cls.__newindex = function(self, key, val)
    if key:sub(1,1) == "_" then
      rawset(self, key, val) -- internal use only via methods
    else
      rawset(self, key, val)
    end
  end
  return cls
end

local Account = ProtectedClass()
function Account.new(balance)
  local self = setmetatable({}, Account)
  rawset(self, "_balance", balance)
  return self
end
function Account:getBalance()
  return rawget(self, "_balance")
end

local a = Account.new(100)
print(a:getBalance()) -- 100
-- print(a._balance) -- would error`,
      hints: ['Check if the key starts with _ in __index.', 'Use rawget/rawset inside methods to bypass.', 'External access through _ fields is blocked.'],
      concepts: ['protected-fields', 'encapsulation'],
    },
    {
      id: 'lua-oop-inherit-13',
      title: 'Fix Metatable Override Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the child class that loses its own methods.',
      skeleton: `local Base = {}
Base.__index = Base
function Base.new() return setmetatable({}, Base) end
function Base:hello() return "base" end

local Child = {}
Child.__index = Child
function Child.new()
  return setmetatable({}, Base) -- bug!
end
function Child:hello() return "child" end

print(Child.new():hello()) -- should print "child"`,
      solution: `local Base = {}
Base.__index = Base
function Base.new() return setmetatable({}, Base) end
function Base:hello() return "base" end

local Child = setmetatable({}, {__index = Base})
Child.__index = Child
function Child.new()
  return setmetatable({}, Child)
end
function Child:hello() return "child" end

print(Child.new():hello()) -- "child"`,
      hints: ['The instance metatable should be Child, not Base.', 'Set up Child to inherit from Base via metatable.', 'setmetatable({}, Child) for instances.'],
      concepts: ['inheritance', 'metatable'],
    },
    {
      id: 'lua-oop-inherit-14',
      title: 'Fix Super Call Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the super call that uses the wrong self.',
      skeleton: `local Base = {}
Base.__index = Base
function Base.new(name) return setmetatable({name=name}, Base) end
function Base:greet() return "Hi, I am " .. self.name end

local Child = setmetatable({}, {__index = Base})
Child.__index = Child
function Child.new(name) return setmetatable(Base.new(name), Child) end
function Child:greet()
  return Base:greet() .. " (child)" -- bug: uses Base as self
end

local c = Child.new("Alice")
print(c:greet())`,
      solution: `local Base = {}
Base.__index = Base
function Base.new(name) return setmetatable({name=name}, Base) end
function Base:greet() return "Hi, I am " .. self.name end

local Child = setmetatable({}, {__index = Base})
Child.__index = Child
function Child.new(name) return setmetatable(Base.new(name), Child) end
function Child:greet()
  return Base.greet(self) .. " (child)"
end

local c = Child.new("Alice")
print(c:greet())`,
      hints: ['Base:greet() passes Base as self.', 'Use dot syntax: Base.greet(self).', 'This passes the child instance as self.'],
      concepts: ['super-call', 'colon-vs-dot'],
    },
    {
      id: 'lua-oop-inherit-15',
      title: 'Fix Missing Chain Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the three-level inheritance where grandchild cannot access grandparent methods.',
      skeleton: `local A = {}
A.__index = A
function A:hello() return "A" end

local B = {}
B.__index = B
function B.new() return setmetatable({}, B) end

local C = setmetatable({}, {__index = B})
C.__index = C
function C.new() return setmetatable({}, C) end

print(C.new():hello()) -- error: nil`,
      solution: `local A = {}
A.__index = A
function A:hello() return "A" end

local B = setmetatable({}, {__index = A})
B.__index = B
function B.new() return setmetatable({}, B) end

local C = setmetatable({}, {__index = B})
C.__index = C
function C.new() return setmetatable({}, C) end

print(C.new():hello()) -- "A"`,
      hints: ['B needs to inherit from A too.', 'The chain must be complete: C -> B -> A.', 'Add {__index = A} as B metatable.'],
      concepts: ['inheritance-chain'],
    },
    {
      id: 'lua-oop-inherit-16',
      title: 'Predict Inheritance Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local A = {}; A.__index = A
function A:who() return "A" end

local B = setmetatable({}, {__index = A}); B.__index = B
function B:who() return "B" end

local C = setmetatable({}, {__index = B}); C.__index = C

local obj = setmetatable({}, C)
print(obj:who())`,
      solution: `B`,
      hints: ['obj has no who, looks in C.', 'C has no who, looks in B.', 'B has who, returns "B".'],
      concepts: ['__index-chaining'],
    },
    {
      id: 'lua-oop-inherit-17',
      title: 'Predict Super Call Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local P = {}; P.__index = P
function P.new(v) return setmetatable({val=v}, P) end
function P:get() return self.val end

local C = setmetatable({}, {__index = P}); C.__index = C
function C.new(v) return setmetatable(P.new(v), C) end
function C:get() return P.get(self) * 2 end

print(C.new(5):get())`,
      solution: `10`,
      hints: ['C:get calls P.get(self) which returns 5.', 'Then multiplies by 2.', '5 * 2 = 10.'],
      concepts: ['super-call'],
    },
    {
      id: 'lua-oop-inherit-18',
      title: 'Predict Method Resolution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local A = {}; A.__index = A; A.x = 1
local B = setmetatable({x = 2}, {__index = A}); B.__index = B
local C = setmetatable({}, {__index = B}); C.__index = C
local obj = setmetatable({}, C)
print(obj.x)
obj.x = 3
print(obj.x)`,
      solution: `2
3`,
      hints: ['First access: obj->C->B finds x=2.', 'Setting obj.x creates it on obj directly.', 'Second access: obj has own x=3.'],
      concepts: ['__index-chaining', 'own-properties'],
    },
    {
      id: 'lua-oop-inherit-19',
      title: 'Refactor to Inheritance',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor two classes with duplicated code to use inheritance.',
      skeleton: `local Dog = {}
Dog.__index = Dog
function Dog.new(name, breed)
  return setmetatable({name=name, breed=breed}, Dog)
end
function Dog:getName() return self.name end
function Dog:speak() return self.name .. " barks" end

local Cat = {}
Cat.__index = Cat
function Cat.new(name, color)
  return setmetatable({name=name, color=color}, Cat)
end
function Cat:getName() return self.name end
function Cat:speak() return self.name .. " meows" end`,
      solution: `local Animal = {}
Animal.__index = Animal
function Animal.new(name)
  return setmetatable({name = name}, Animal)
end
function Animal:getName() return self.name end

local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog
function Dog.new(name, breed)
  local self = Animal.new(name)
  self.breed = breed
  return setmetatable(self, Dog)
end
function Dog:speak() return self.name .. " barks" end

local Cat = setmetatable({}, {__index = Animal})
Cat.__index = Cat
function Cat.new(name, color)
  local self = Animal.new(name)
  self.color = color
  return setmetatable(self, Cat)
end
function Cat:speak() return self.name .. " meows" end`,
      hints: ['Extract shared code (getName) into a base class.', 'Both Dog and Cat inherit from Animal.', 'Each overrides speak with its own version.'],
      concepts: ['inheritance', 'refactoring'],
    },
    {
      id: 'lua-oop-inherit-20',
      title: 'Refactor Duplicated Constructors',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor duplicated constructor logic into the parent init method.',
      skeleton: `local Widget = {}
Widget.__index = Widget
function Widget.new(x, y, w, h)
  return setmetatable({x=x, y=y, width=w, height=h, visible=true}, Widget)
end

local Button = setmetatable({}, {__index = Widget})
Button.__index = Button
function Button.new(x, y, w, h, label)
  local self = setmetatable({x=x, y=y, width=w, height=h, visible=true}, Button)
  self.label = label
  return self
end

local TextBox = setmetatable({}, {__index = Widget})
TextBox.__index = TextBox
function TextBox.new(x, y, w, h, text)
  local self = setmetatable({x=x, y=y, width=w, height=h, visible=true}, TextBox)
  self.text = text
  return self
end`,
      solution: `local Widget = {}
Widget.__index = Widget
function Widget.new(x, y, w, h)
  return setmetatable({x=x, y=y, width=w, height=h, visible=true}, Widget)
end

local Button = setmetatable({}, {__index = Widget})
Button.__index = Button
function Button.new(x, y, w, h, label)
  local self = Widget.new(x, y, w, h)
  self.label = label
  return setmetatable(self, Button)
end

local TextBox = setmetatable({}, {__index = Widget})
TextBox.__index = TextBox
function TextBox.new(x, y, w, h, text)
  local self = Widget.new(x, y, w, h)
  self.text = text
  return setmetatable(self, TextBox)
end`,
      hints: ['Call Widget.new to handle shared initialization.', 'Re-set the metatable to the child class.', 'Add child-specific fields after.'],
      concepts: ['constructor-chaining', 'refactoring'],
    },
  ],
};
