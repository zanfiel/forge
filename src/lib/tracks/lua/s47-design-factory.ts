import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-factory',
  title: '47. Factory',
  explanation: `## Factory Pattern in Lua

The Factory pattern creates objects without specifying the exact class:

\`\`\`lua
-- Simple factory function
function createEnemy(type, x, y)
  if type == "goblin" then
    return { name="Goblin", hp=30, x=x, y=y, attack=5 }
  elseif type == "dragon" then
    return { name="Dragon", hp=200, x=x, y=y, attack=50 }
  end
end

-- Registry-based factory
local factories = {}
function registerType(name, factory)
  factories[name] = factory
end
function create(name, ...)
  local factory = factories[name]
  if factory then return factory(...) end
  error("Unknown type: " .. name)
end

-- Class factory
function classFactory(className, methods)
  local cls = {}
  cls.__index = cls
  for k, v in pairs(methods) do cls[k] = v end
  function cls:new(...)
    local obj = setmetatable({}, cls)
    if obj.init then obj:init(...) end
    return obj
  end
  return cls
end

-- Abstract factory
function createUIFactory(theme)
  if theme == "dark" then
    return { button = function() return {bg="#333"} end }
  else
    return { button = function() return {bg="#fff"} end }
  end
end
\`\`\``,
  exercises: [
    {
      id: 'lua-factory-1',
      title: 'Simple Factory',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create objects using a simple factory function.',
      skeleton: `function createShape(type)
  if type == "circle" then
    return { shape = "circle", area = function(self) return math.pi * self.r^2 end, r = 1 }
  elseif type == "square" then
    return { shape = "___", area = function(self) return self.s^2 end, s = 1 }
  end
end
local s = createShape("square")
print(s.shape)  -- "square"`,
      solution: `function createShape(type)
  if type == "circle" then
    return { shape = "circle", area = function(self) return math.pi * self.r^2 end, r = 1 }
  elseif type == "square" then
    return { shape = "square", area = function(self) return self.s^2 end, s = 1 }
  end
end
local s = createShape("square")
print(s.shape)  -- "square"`,
      hints: [
        'Each shape type has its own table with appropriate fields.',
        'The shape field identifies the type.',
        'Factory functions hide the creation details.',
      ],
      concepts: ['factory', 'creation'],
    },
    {
      id: 'lua-factory-2',
      title: 'Predict Factory Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict what the factory creates.',
      skeleton: `function createAnimal(species)
  local sounds = { dog = "woof", cat = "meow", cow = "moo" }
  return { species = species, sound = sounds[species] or "..." }
end
local a = createAnimal("cat")
local b = createAnimal("fish")
print(a.sound)
print(b.sound)`,
      solution: `meow
...`,
      hints: [
        '"cat" maps to "meow" in the sounds table.',
        '"fish" is not in the table, so it defaults to "...".',
        'The or operator provides the fallback.',
      ],
      concepts: ['factory', 'defaults'],
    },
    {
      id: 'lua-factory-3',
      title: 'Registry Factory',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement a registry-based factory.',
      skeleton: `local registry = {}

function register(name, factoryFn)
  ___[name] = factoryFn
end

function create(name, ...)
  local fn = registry[name]
  if fn then return fn(...) end
  return nil
end

register("point", function(x, y) return {x=x, y=y} end)
local p = create("point", 10, 20)
print(p.x, p.y)  -- 10, 20`,
      solution: `local registry = {}

function register(name, factoryFn)
  registry[name] = factoryFn
end

function create(name, ...)
  local fn = registry[name]
  if fn then return fn(...) end
  return nil
end

register("point", function(x, y) return {x=x, y=y} end)
local p = create("point", 10, 20)
print(p.x, p.y)  -- 10, 20`,
      hints: [
        'Store factory functions by name in the registry.',
        'create() looks up and calls the factory.',
        'This allows dynamic registration of new types.',
      ],
      concepts: ['factory', 'registry'],
    },
    {
      id: 'lua-factory-4',
      title: 'Write Class Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a factory that generates class-like constructors.',
      skeleton: `-- Write defineClass(methods) that returns a class table with:
-- :new(...) - creates a new instance with metatable
-- If methods has an init field, it's called with (self, ...)
-- Methods are available via __index.

-- YOUR CODE HERE`,
      solution: `function defineClass(methods)
  local cls = {}
  cls.__index = cls
  for k, v in pairs(methods) do
    cls[k] = v
  end
  function cls:new(...)
    local obj = setmetatable({}, cls)
    if obj.init then obj:init(...) end
    return obj
  end
  return cls
end`,
      hints: [
        'Copy all methods onto the class table.',
        'Set __index to the class for method lookup.',
        'Call init if it exists after creating the instance.',
      ],
      concepts: ['factory', 'class-factory', 'metatables'],
    },
    {
      id: 'lua-factory-5',
      title: 'Write Object Pool Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a factory with object pooling for reuse.',
      skeleton: `-- Write createPool(factoryFn, resetFn) returning:
-- :acquire() - get an object (from pool or create new)
-- :release(obj) - return object to pool (resetFn is called)
-- :size() - return number of available objects in pool

-- YOUR CODE HERE`,
      solution: `function createPool(factoryFn, resetFn)
  local pool = {}
  local obj = {}
  local mt = {
    __index = {
      acquire = function(self)
        if #pool > 0 then
          return table.remove(pool)
        end
        return factoryFn()
      end,
      release = function(self, item)
        if resetFn then resetFn(item) end
        pool[#pool + 1] = item
      end,
      size = function(self)
        return #pool
      end,
    },
  }
  return setmetatable(obj, mt)
end`,
      hints: [
        'Pool reuses objects instead of creating new ones.',
        'acquire() takes from pool or creates new.',
        'release() resets and returns to pool.',
      ],
      concepts: ['factory', 'object-pool', 'performance'],
    },
    {
      id: 'lua-factory-6',
      title: 'Fix Factory Missing Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the factory that crashes on unknown types.',
      skeleton: `function createWeapon(type)
  local weapons = {
    sword = {name="Sword", damage=10},
    bow = {name="Bow", damage=7},
  }
  return weapons[type]  -- BUG: returns nil for unknown types
end

local w = createWeapon("axe")
print(w.name)  -- ERROR: attempt to index nil`,
      solution: `function createWeapon(type)
  local weapons = {
    sword = {name="Sword", damage=10},
    bow = {name="Bow", damage=7},
  }
  local w = weapons[type]
  if not w then
    error("unknown weapon type: " .. tostring(type))
  end
  return w
end

local ok, err = pcall(createWeapon, "axe")
print(not ok)  -- true (error was caught)`,
      hints: [
        'Check if the weapon type exists before returning.',
        'Use error() with a descriptive message for unknown types.',
        'Or return a default weapon instead of crashing.',
      ],
      concepts: ['factory', 'error-handling', 'debugging'],
    },
    {
      id: 'lua-factory-7',
      title: 'Write Abstract Factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an abstract factory for creating families of related objects.',
      skeleton: `-- Write createUIFactory(theme) where theme is "dark" or "light".
-- Returns a factory with:
-- :createButton(text) -> {text, bg, fg}
-- :createInput(placeholder) -> {placeholder, bg, fg, border}
-- Dark: bg="#333", fg="#fff", border="#555"
-- Light: bg="#fff", fg="#000", border="#ccc"

-- YOUR CODE HERE`,
      solution: `function createUIFactory(theme)
  local colors
  if theme == "dark" then
    colors = { bg = "#333", fg = "#fff", border = "#555" }
  else
    colors = { bg = "#fff", fg = "#000", border = "#ccc" }
  end
  return {
    createButton = function(text)
      return { text = text, bg = colors.bg, fg = colors.fg }
    end,
    createInput = function(placeholder)
      return {
        placeholder = placeholder,
        bg = colors.bg,
        fg = colors.fg,
        border = colors.border,
      }
    end,
  }
end`,
      hints: [
        'Theme determines the color palette.',
        'Each factory method uses the same color set.',
        'This ensures visual consistency across UI elements.',
      ],
      concepts: ['factory', 'abstract-factory', 'themes'],
    },
    {
      id: 'lua-factory-8',
      title: 'Write Builder Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a builder-style factory with method chaining.',
      skeleton: `-- Write createCharacterBuilder() with chainable:
-- :name(n) :class(c) :level(l) :hp(h) :build()
-- build() returns the final character table.

-- YOUR CODE HERE`,
      solution: `function createCharacterBuilder()
  local data = { name = "Unknown", class = "Fighter", level = 1, hp = 100 }
  local builder = {}
  local mt = {
    __index = {
      name = function(self, n) data.name = n; return self end,
      class = function(self, c) data.class = c; return self end,
      level = function(self, l) data.level = l; return self end,
      hp = function(self, h) data.hp = h; return self end,
      build = function(self)
        local result = {}
        for k, v in pairs(data) do result[k] = v end
        return result
      end,
    },
  }
  return setmetatable(builder, mt)
end`,
      hints: [
        'Each setter returns self for chaining.',
        'build() copies the data to a new table.',
        'Default values are set at creation time.',
      ],
      concepts: ['factory', 'builder', 'method-chaining'],
    },
    {
      id: 'lua-factory-9',
      title: 'Predict Registry Factory',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output of a registry factory.',
      skeleton: `local reg = {}
function reg.register(name, fn) reg[name] = fn end
function reg.create(name, ...) return reg[name](...) end

reg.register("add", function(a, b) return a + b end)
reg.register("mul", function(a, b) return a * b end)

print(reg.create("add", 3, 4))
print(reg.create("mul", 3, 4))`,
      solution: `7
12`,
      hints: [
        '"add" factory returns 3 + 4 = 7.',
        '"mul" factory returns 3 * 4 = 12.',
        'The registry looks up and calls the right factory.',
      ],
      concepts: ['factory', 'registry'],
    },
    {
      id: 'lua-factory-10',
      title: 'Write Prototype Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a factory that creates objects by cloning prototypes.',
      skeleton: `-- Write createPrototypeFactory() with:
-- :registerPrototype(name, proto) - register a prototype table
-- :create(name, overrides) - clone prototype, apply overrides
-- Deep copy the prototype so clones are independent.

-- YOUR CODE HERE`,
      solution: `function createPrototypeFactory()
  local prototypes = {}
  local function deepCopy(t)
    if type(t) ~= "table" then return t end
    local copy = {}
    for k, v in pairs(t) do copy[k] = deepCopy(v) end
    return copy
  end
  local factory = {}
  local mt = {
    __index = {
      registerPrototype = function(self, name, proto)
        prototypes[name] = proto
      end,
      create = function(self, name, overrides)
        local proto = prototypes[name]
        if not proto then return nil end
        local obj = deepCopy(proto)
        if overrides then
          for k, v in pairs(overrides) do obj[k] = v end
        end
        return obj
      end,
    },
  }
  return setmetatable(factory, mt)
end`,
      hints: [
        'Deep copy the prototype to create independent clones.',
        'Apply overrides after cloning.',
        'This avoids shared references between instances.',
      ],
      concepts: ['factory', 'prototype', 'deep-copy'],
    },
    {
      id: 'lua-factory-11',
      title: 'Write Parameterized Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a factory that creates objects based on a config table.',
      skeleton: `-- Write createFromConfig(config) where config is:
-- { type = "enemy", props = { name = "Goblin", hp = 30 } }
-- Register handlers for each type.
-- Return the created object.

-- YOUR CODE HERE`,
      solution: `local typeHandlers = {}

function registerHandler(typeName, handler)
  typeHandlers[typeName] = handler
end

function createFromConfig(config)
  local handler = typeHandlers[config.type]
  if not handler then
    error("unknown type: " .. tostring(config.type))
  end
  return handler(config.props or {})
end

registerHandler("enemy", function(props)
  return { type = "enemy", name = props.name or "Unknown", hp = props.hp or 10 }
end)`,
      hints: [
        'Map type names to handler functions.',
        'createFromConfig looks up and calls the handler.',
        'Pass props to the handler for configuration.',
      ],
      concepts: ['factory', 'config-driven', 'handlers'],
    },
    {
      id: 'lua-factory-12',
      title: 'Fix Factory Shared Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the factory that accidentally shares mutable state between instances.',
      skeleton: `local defaults = { stats = {hp = 100, mp = 50} }

function createPlayer(name)
  return {
    name = name,
    stats = defaults.stats,  -- BUG: shared reference!
  }
end

local p1 = createPlayer("Alice")
local p2 = createPlayer("Bob")
p1.stats.hp = 0
print(p2.stats.hp)  -- should be 100, but is 0!`,
      solution: `local defaults = { stats = {hp = 100, mp = 50} }

function createPlayer(name)
  return {
    name = name,
    stats = { hp = defaults.stats.hp, mp = defaults.stats.mp },  -- FIXED: copy
  }
end

local p1 = createPlayer("Alice")
local p2 = createPlayer("Bob")
p1.stats.hp = 0
print(p2.stats.hp)  -- 100`,
      hints: [
        'Tables are assigned by reference in Lua.',
        'Copy the nested table to give each instance its own.',
        'Modifying p1.stats should not affect p2.stats.',
      ],
      concepts: ['factory', 'shared-reference', 'debugging'],
    },
    {
      id: 'lua-factory-13',
      title: 'Write Lazy Factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a factory that defers object creation until first use.',
      skeleton: `-- Write createLazyFactory(factoryFn) that returns a proxy.
-- The actual object is only created when any field is accessed.
-- factoryFn() is called at most once.

-- YOUR CODE HERE`,
      solution: `function createLazyFactory(factoryFn)
  local obj = nil
  local proxy = {}
  setmetatable(proxy, {
    __index = function(self, key)
      if not obj then obj = factoryFn() end
      return obj[key]
    end,
    __newindex = function(self, key, value)
      if not obj then obj = factoryFn() end
      obj[key] = value
    end,
  })
  return proxy
end`,
      hints: [
        'Use a proxy with __index to intercept access.',
        'Create the real object on first access.',
        'Cache it for subsequent accesses.',
      ],
      concepts: ['factory', 'lazy', 'proxy'],
    },
    {
      id: 'lua-factory-14',
      title: 'Predict Builder Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the result of a builder chain.',
      skeleton: `local data = {}
local b = {}
function b:set(k, v) data[k] = v; return self end
function b:build() return data end

local result = b:set("a", 1):set("b", 2):set("c", 3):build()
print(result.a, result.b, result.c)`,
      solution: `1	2	3`,
      hints: [
        'Each :set() call stores a value and returns self.',
        'Chaining calls set a=1, b=2, c=3.',
        'build() returns the accumulated data.',
      ],
      concepts: ['factory', 'builder', 'chaining'],
    },
    {
      id: 'lua-factory-15',
      title: 'Write Typed Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a factory that validates created objects against a schema.',
      skeleton: `-- Write createTypedFactory(schema, factoryFn) where schema maps
-- field names to type strings. Returns a wrapper that calls factoryFn
-- then validates the result against the schema.
-- Returns object on success, nil + error on failure.

-- YOUR CODE HERE`,
      solution: `function createTypedFactory(schema, factoryFn)
  return function(...)
    local obj = factoryFn(...)
    for field, expectedType in pairs(schema) do
      if type(obj[field]) ~= expectedType then
        return nil, field .. ": expected " .. expectedType .. ", got " .. type(obj[field])
      end
    end
    return obj
  end
end`,
      hints: [
        'Call the factory function first to get the object.',
        'Then validate each field against the schema.',
        'Return the object only if all fields pass.',
      ],
      concepts: ['factory', 'validation', 'typed'],
    },
    {
      id: 'lua-factory-16',
      title: 'Refactor Switch to Factory',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor a switch/if-chain into a factory pattern.',
      skeleton: `function processCommand(cmd, args)
  if cmd == "greet" then
    return "Hello, " .. (args.name or "World")
  elseif cmd == "add" then
    return (args.a or 0) + (args.b or 0)
  elseif cmd == "upper" then
    return string.upper(args.text or "")
  else
    return "unknown command"
  end
end

print(processCommand("greet", {name = "Lua"}))
print(processCommand("add", {a = 3, b = 4}))`,
      solution: `local commands = {
  greet = function(args)
    return "Hello, " .. (args.name or "World")
  end,
  add = function(args)
    return (args.a or 0) + (args.b or 0)
  end,
  upper = function(args)
    return string.upper(args.text or "")
  end,
}

function processCommand(cmd, args)
  local handler = commands[cmd]
  if handler then return handler(args) end
  return "unknown command"
end

print(processCommand("greet", {name = "Lua"}))
print(processCommand("add", {a = 3, b = 4}))`,
      hints: [
        'Replace if/elseif with a table of handler functions.',
        'Look up the handler by command name.',
        'New commands only require adding to the table.',
      ],
      concepts: ['factory', 'refactoring', 'table-dispatch'],
    },
    {
      id: 'lua-factory-17',
      title: 'Refactor Constructor to Factory',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor direct table construction into a factory function.',
      skeleton: `-- Direct construction repeated in multiple places
local enemy1 = {name="Goblin", hp=30, x=10, y=20, alive=true}
local enemy2 = {name="Goblin", hp=30, x=50, y=60, alive=true}
local enemy3 = {name="Dragon", hp=200, x=100, y=100, alive=true}

print(enemy1.name, enemy2.name, enemy3.name)`,
      solution: `local templates = {
  Goblin = {name = "Goblin", hp = 30},
  Dragon = {name = "Dragon", hp = 200},
}

function createEnemy(type, x, y)
  local t = templates[type]
  if not t then error("unknown enemy: " .. type) end
  return {name = t.name, hp = t.hp, x = x, y = y, alive = true}
end

local enemy1 = createEnemy("Goblin", 10, 20)
local enemy2 = createEnemy("Goblin", 50, 60)
local enemy3 = createEnemy("Dragon", 100, 100)

print(enemy1.name, enemy2.name, enemy3.name)`,
      hints: [
        'Extract common properties into templates.',
        'The factory function looks up the template and adds position.',
        'This eliminates duplication and ensures consistency.',
      ],
      concepts: ['factory', 'refactoring', 'templates'],
    },
    {
      id: 'lua-factory-18',
      title: 'Write Middleware Factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a factory that wraps objects with middleware.',
      skeleton: `-- Write createWithMiddleware(factoryFn, middlewares) where:
-- factoryFn() creates the base object
-- middlewares is a list of fn(obj) that modify or wrap the object
-- Each middleware receives and returns the object.
-- Return the final wrapped object.

-- YOUR CODE HERE`,
      solution: `function createWithMiddleware(factoryFn, middlewares)
  local obj = factoryFn()
  for _, mw in ipairs(middlewares or {}) do
    obj = mw(obj) or obj
  end
  return obj
end`,
      hints: [
        'Create the base object with factoryFn.',
        'Apply each middleware in order.',
        'Each middleware can transform or wrap the object.',
      ],
      concepts: ['factory', 'middleware', 'decoration'],
    },
    {
      id: 'lua-factory-19',
      title: 'Write Conditional Factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a factory that selects implementation based on conditions.',
      skeleton: `-- Write createAdaptiveFactory(conditions) where conditions is:
-- { { test = fn, factory = fn }, ... }
-- createAdaptiveFactory returns a create(...) function that:
-- Tests each condition in order, calls the first matching factory.
-- If none match, returns nil.

-- YOUR CODE HERE`,
      solution: `function createAdaptiveFactory(conditions)
  return function(...)
    for _, cond in ipairs(conditions) do
      if cond.test(...) then
        return cond.factory(...)
      end
    end
    return nil
  end
end`,
      hints: [
        'Iterate conditions in order.',
        'Call test() to check if the condition matches.',
        'Call factory() for the first match.',
      ],
      concepts: ['factory', 'conditional', 'strategy'],
    },
    {
      id: 'lua-factory-20',
      title: 'Write Self-Registering Factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a factory where types register themselves.',
      skeleton: `-- Write createAutoFactory() returning:
-- :register(name, factoryFn) - types self-register
-- :create(name, ...) - create by name
-- :extend(name, baseName, overrides) - create a new type extending another
-- extend creates a factory that merges base output with overrides.

-- YOUR CODE HERE`,
      solution: `function createAutoFactory()
  local factories = {}
  local af = {}
  local mt = {
    __index = {
      register = function(self, name, factoryFn)
        factories[name] = factoryFn
      end,
      create = function(self, name, ...)
        local fn = factories[name]
        if not fn then return nil, "unknown: " .. name end
        return fn(...)
      end,
      extend = function(self, name, baseName, overrides)
        local baseFn = factories[baseName]
        if not baseFn then return nil, "unknown base: " .. baseName end
        factories[name] = function(...)
          local obj = baseFn(...)
          for k, v in pairs(overrides) do
            obj[k] = v
          end
          return obj
        end
      end,
    },
  }
  return setmetatable(af, mt)
end`,
      hints: [
        'extend() creates a new factory that builds on an existing one.',
        'The extended factory calls the base and applies overrides.',
        'This enables inheritance-like behavior through composition.',
      ],
      concepts: ['factory', 'self-registration', 'extension'],
    },
  ],
};
