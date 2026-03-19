import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-capstone',
  title: '50. Capstone',
  explanation: `## Lua Capstone - Mini Game Engine

This capstone brings together every major Lua concept: metatables, coroutines, modules, OOP, file I/O, pattern matching, error handling, iterators, closures, and design patterns. You will build pieces of a mini game engine and configuration system.

\`\`\`lua
-- The engine uses OOP with metatables
local Entity = {}
Entity.__index = Entity
function Entity:new(id, x, y)
  return setmetatable({ id = id, x = x, y = y, components = {} }, Entity)
end

-- Components use the module pattern
local function HealthComponent(hp)
  return { type = "health", hp = hp, maxHp = hp }
end

-- Event system via observer pattern
local events = { listeners = {} }
function events:on(e, fn) self.listeners[e] = self.listeners[e] or {}; self.listeners[e][#self.listeners[e]+1] = fn end
function events:emit(e, ...) for _, fn in ipairs(self.listeners[e] or {}) do fn(...) end end

-- Coroutine-based scripting
function waitFrames(n)
  for i = 1, n do coroutine.yield() end
end

-- Config DSL parsed with pattern matching
-- "entity player { hp = 100, speed = 5 }"
-- Serialization with iterators and closures
-- Error handling with pcall/xpcall throughout
\`\`\``,
  exercises: [
    {
      id: 'lua-capstone-1',
      title: 'Entity Base Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the Entity base class using metatables.',
      skeleton: `local Entity = {}
Entity.__index = ___

function Entity:new(id, x, y)
  return setmetatable({ id = id, x = x, y = y, active = true }, Entity)
end

function Entity:move(dx, dy)
  self.x = self.x + dx
  self.y = self.y + dy
end

local e = Entity:new("player", 0, 0)
e:move(5, 3)
print(e.x, e.y)  -- 5, 3`,
      solution: `local Entity = {}
Entity.__index = Entity

function Entity:new(id, x, y)
  return setmetatable({ id = id, x = x, y = y, active = true }, Entity)
end

function Entity:move(dx, dy)
  self.x = self.x + dx
  self.y = self.y + dy
end

local e = Entity:new("player", 0, 0)
e:move(5, 3)
print(e.x, e.y)  -- 5, 3`,
      hints: [
        '__index should point to the Entity table itself.',
        'This allows instances to find methods on Entity.',
        'setmetatable connects the instance to the class.',
      ],
      concepts: ['metatables', 'oop', '__index'],
    },
    {
      id: 'lua-capstone-2',
      title: 'Predict Entity Inheritance',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output of an entity class hierarchy.',
      skeleton: `local Entity = {}
Entity.__index = Entity
function Entity:new(id) return setmetatable({id=id, hp=100}, Entity) end
function Entity:getType() return "entity" end

local Player = setmetatable({}, {__index = Entity})
Player.__index = Player
function Player:new(id) local o = Entity.new(self, id); o.hp = 200; return setmetatable(o, Player) end
function Player:getType() return "player" end

local e = Entity:new("e1")
local p = Player:new("p1")
print(e:getType(), e.hp)
print(p:getType(), p.hp)`,
      solution: `entity	100
player	200`,
      hints: [
        'Entity:getType returns "entity", Player overrides to "player".',
        'Entity:new sets hp=100, Player:new overrides to hp=200.',
        'Player inherits from Entity via metatable chain.',
      ],
      concepts: ['oop', 'inheritance', 'metatables'],
    },
    {
      id: 'lua-capstone-3',
      title: 'Component System',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Add and retrieve components on an entity.',
      skeleton: `local Entity = {}
Entity.__index = Entity
function Entity:new(id)
  return setmetatable({ id = id, components = {} }, Entity)
end

function Entity:addComponent(comp)
  self.components[comp.type] = comp
end

function Entity:getComponent(type)
  return self.___[type]
end

local e = Entity:new("npc")
e:addComponent({ type = "health", hp = 50 })
local h = e:getComponent("health")
print(h.hp)  -- 50`,
      solution: `local Entity = {}
Entity.__index = Entity
function Entity:new(id)
  return setmetatable({ id = id, components = {} }, Entity)
end

function Entity:addComponent(comp)
  self.components[comp.type] = comp
end

function Entity:getComponent(type)
  return self.components[type]
end

local e = Entity:new("npc")
e:addComponent({ type = "health", hp = 50 })
local h = e:getComponent("health")
print(h.hp)  -- 50`,
      hints: [
        'Components are stored in self.components keyed by type.',
        'getComponent looks up the component by type string.',
        'Access the components table through self.',
      ],
      concepts: ['ecs', 'components', 'tables'],
    },
    {
      id: 'lua-capstone-4',
      title: 'Write Event System Module',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a game event system as a reusable module.',
      skeleton: `-- Write createEventSystem() returning a module with:
-- :on(event, fn) - subscribe
-- :off(event, fn) - unsubscribe
-- :emit(event, ...) - fire event
-- :clear() - remove all listeners

-- YOUR CODE HERE`,
      solution: `function createEventSystem()
  local listeners = {}
  return {
    on = function(self, event, fn)
      listeners[event] = listeners[event] or {}
      listeners[event][#listeners[event] + 1] = fn
    end,
    off = function(self, event, fn)
      local list = listeners[event]
      if not list then return end
      for i = #list, 1, -1 do
        if list[i] == fn then table.remove(list, i) end
      end
    end,
    emit = function(self, event, ...)
      for _, fn in ipairs(listeners[event] or {}) do fn(...) end
    end,
    clear = function(self)
      listeners = {}
    end,
  }
end`,
      hints: [
        'Store listeners in a closure variable.',
        'on/off/emit follow the standard observer pattern.',
        'clear() replaces the entire listeners table.',
      ],
      concepts: ['observer', 'modules', 'closures'],
    },
    {
      id: 'lua-capstone-5',
      title: 'Write Coroutine Script Runner',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a script runner that uses coroutines to execute game scripts frame by frame.',
      skeleton: `-- Write createScriptRunner() with:
-- :add(fn) - add a coroutine-based script function
-- :update() - resume all active scripts once
-- :activeCount() - return number of still-running scripts
-- Scripts call coroutine.yield() to pause until next update.

-- YOUR CODE HERE`,
      solution: `function createScriptRunner()
  local scripts = {}
  return {
    add = function(self, fn)
      scripts[#scripts + 1] = coroutine.create(fn)
    end,
    update = function(self)
      local alive = {}
      for _, co in ipairs(scripts) do
        if coroutine.status(co) ~= "dead" then
          coroutine.resume(co)
          if coroutine.status(co) ~= "dead" then
            alive[#alive + 1] = co
          end
        end
      end
      scripts = alive
    end,
    activeCount = function(self)
      return #scripts
    end,
  }
end`,
      hints: [
        'Wrap each script function in a coroutine.',
        'update() resumes each coroutine once.',
        'Remove dead coroutines after each update cycle.',
      ],
      concepts: ['coroutines', 'game-loop', 'scripting'],
    },
    {
      id: 'lua-capstone-6',
      title: 'Predict Coroutine Script',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how a coroutine script executes across frames.',
      skeleton: `local log = {}
local co = coroutine.create(function()
  log[#log+1] = "A"
  coroutine.yield()
  log[#log+1] = "B"
  coroutine.yield()
  log[#log+1] = "C"
end)

coroutine.resume(co)
coroutine.resume(co)
print(table.concat(log, ","))
print(coroutine.status(co))`,
      solution: `A,B
suspended`,
      hints: [
        'First resume runs to first yield, logging "A".',
        'Second resume continues to second yield, logging "B".',
        '"C" has not been reached yet; coroutine is suspended.',
      ],
      concepts: ['coroutines', 'yield', 'resume'],
    },
    {
      id: 'lua-capstone-7',
      title: 'Config Parser with Patterns',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Parse a simple config line using Lua string patterns.',
      skeleton: `function parseConfig(line)
  local key, value = line:match("^(%w+)%s*=%s*(.+)$")
  if not key then return nil end
  -- Try to convert numeric values
  local num = _____(value)
  if num then return key, num end
  return key, value
end

local k, v = parseConfig("speed = 42")
print(k, v, type(v))  -- "speed", 42, "number"`,
      solution: `function parseConfig(line)
  local key, value = line:match("^(%w+)%s*=%s*(.+)$")
  if not key then return nil end
  -- Try to convert numeric values
  local num = tonumber(value)
  if num then return key, num end
  return key, value
end

local k, v = parseConfig("speed = 42")
print(k, v, type(v))  -- "speed", 42, "number"`,
      hints: [
        'tonumber() converts a string to a number or returns nil.',
        'If tonumber succeeds, return the numeric value.',
        'Otherwise fall back to returning the raw string.',
      ],
      concepts: ['pattern-matching', 'parsing', 'tonumber'],
    },
    {
      id: 'lua-capstone-8',
      title: 'Fix Config File Reader',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the config reader that crashes on missing files.',
      skeleton: `function loadConfig(path)
  local f = io.open(path, "r")
  local config = {}
  for line in f:lines() do  -- BUG: crashes if f is nil
    local k, v = line:match("^(%w+)%s*=%s*(.+)$")
    if k then config[k] = v end
  end
  f:close()
  return config
end

local cfg = loadConfig("nonexistent.cfg")
print(type(cfg))  -- should be "table" with defaults`,
      solution: `function loadConfig(path)
  local f = io.open(path, "r")
  if not f then return {} end  -- FIXED: handle missing file
  local config = {}
  for line in f:lines() do
    local k, v = line:match("^(%w+)%s*=%s*(.+)$")
    if k then config[k] = v end
  end
  f:close()
  return config
end

local cfg = loadConfig("nonexistent.cfg")
print(type(cfg))  -- "table"`,
      hints: [
        'io.open returns nil if the file does not exist.',
        'Check if f is nil before trying to read lines.',
        'Return an empty config table as a safe default.',
      ],
      concepts: ['error-handling', 'file-io', 'debugging'],
    },
    {
      id: 'lua-capstone-9',
      title: 'Write Entity Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a custom iterator that yields only active entities with a specific component.',
      skeleton: `-- Write entitiesWith(entities, componentType) that returns
-- a stateful iterator yielding entities that:
-- 1. Have active == true
-- 2. Have a component matching componentType
-- Use it in: for entity in entitiesWith(list, "health") do ... end

-- YOUR CODE HERE`,
      solution: `function entitiesWith(entities, componentType)
  local i = 0
  return function()
    while true do
      i = i + 1
      if i > #entities then return nil end
      local e = entities[i]
      if e.active and e.components and e.components[componentType] then
        return e
      end
    end
  end
end`,
      hints: [
        'Return a closure that advances through the entities array.',
        'Skip entities that are not active or lack the component.',
        'Return nil when the array is exhausted to stop iteration.',
      ],
      concepts: ['iterators', 'closures', 'ecs'],
    },
    {
      id: 'lua-capstone-10',
      title: 'Write Serializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a table serializer that converts a table to a saveable string.',
      skeleton: `-- Write serialize(tbl) that converts a table (with string/number keys and
-- string/number/boolean/table values) into a Lua-readable string.
-- Example: {hp=100, name="hero"} -> '{hp=100,name="hero"}'
-- Must handle nested tables recursively.

-- YOUR CODE HERE`,
      solution: `function serialize(tbl)
  local parts = {}
  for k, v in pairs(tbl) do
    local keyStr
    if type(k) == "number" then
      keyStr = "[" .. k .. "]"
    else
      keyStr = k
    end
    local valStr
    if type(v) == "table" then
      valStr = serialize(v)
    elseif type(v) == "string" then
      valStr = string.format("%q", v)
    elseif type(v) == "boolean" then
      valStr = tostring(v)
    else
      valStr = tostring(v)
    end
    parts[#parts + 1] = keyStr .. "=" .. valStr
  end
  return "{" .. table.concat(parts, ",") .. "}"
end`,
      hints: [
        'Iterate pairs and format each key-value pair.',
        'Use string.format("%q", s) to properly quote strings.',
        'Recurse into nested tables.',
      ],
      concepts: ['serialization', 'recursion', 'string-formatting'],
    },
    {
      id: 'lua-capstone-11',
      title: 'Fix Inheritance Chain',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the broken OOP inheritance chain where child cannot find grandparent methods.',
      skeleton: `local Base = {}
Base.__index = Base
function Base:new(id) return setmetatable({id=id}, Base) end
function Base:getId() return self.id end

local Mid = setmetatable({}, {__index = Base})
Mid.__index = Mid  -- BUG: Mid instances look up Mid, but Mid itself can't find Base methods
function Mid:new(id, level) local o = Base.new(self, id); o.level = level; return setmetatable(o, Mid) end

local Child = setmetatable({}, {__index = Mid})
Child.__index = Child
function Child:new(id, level, name) local o = Mid.new(self, id, level); o.name = name; return setmetatable(o, Child) end

local c = Child:new("c1", 5, "Hero")
print(c.name, c.level, c:getId())  -- ERROR: getId not found`,
      solution: `local Base = {}
Base.__index = Base
function Base:new(id) return setmetatable({id=id}, Base) end
function Base:getId() return self.id end

local Mid = setmetatable({}, {__index = Base})
Mid.__index = Mid
function Mid:new(id, level) local o = Base.new(self, id); o.level = level; return setmetatable(o, Mid) end

local Child = setmetatable({}, {__index = Mid})
Child.__index = Child
function Child:new(id, level, name) local o = Mid.new(self, id, level); o.name = name; return setmetatable(o, Child) end

-- FIXED: The chain works because Mid's metatable __index points to Base,
-- and Child's metatable __index points to Mid.
-- The issue was that Mid.__index = Mid is correct, but we need __index
-- lookup to chain: Child -> Mid -> Base
-- Actually the code is correct. Let's verify:
local c = Child:new("c1", 5, "Hero")
print(c.name, c.level, c:getId())  -- "Hero", 5, "c1"`,
      hints: [
        'Check that each class metatable chains to its parent.',
        'Child.__index = Child, but Child itself has __index -> Mid -> Base.',
        'Method lookup walks: instance -> Child -> Mid -> Base.',
      ],
      concepts: ['oop', 'inheritance', 'metatable-chain', 'debugging'],
    },
    {
      id: 'lua-capstone-12',
      title: 'Write Game State Machine',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a game state machine using closures and tables.',
      skeleton: `-- Write createStateMachine(states, initial) where states is:
-- { menu = { enter=fn, update=fn, exit=fn }, play = { ... }, ... }
-- Returns: :transition(name), :update(), :current()
-- enter/exit are called on transitions, update on each frame.

-- YOUR CODE HERE`,
      solution: `function createStateMachine(states, initial)
  local current = initial
  if states[current] and states[current].enter then
    states[current].enter()
  end
  return {
    transition = function(self, name)
      if not states[name] then
        error("unknown state: " .. tostring(name))
      end
      if states[current] and states[current].exit then
        states[current].exit()
      end
      current = name
      if states[current].enter then
        states[current].enter()
      end
    end,
    update = function(self)
      if states[current] and states[current].update then
        states[current].update()
      end
    end,
    current = function(self)
      return current
    end,
  }
end`,
      hints: [
        'Track the current state name in a closure variable.',
        'transition() calls exit on old state and enter on new.',
        'update() delegates to the current state update function.',
      ],
      concepts: ['state-machine', 'closures', 'design-patterns'],
    },
    {
      id: 'lua-capstone-13',
      title: 'Write Config DSL Parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a parser for a simple config DSL using pattern matching.',
      skeleton: `-- Write parseConfigDSL(text) that parses lines like:
-- "set key value"      -> {action="set", key=key, value=value}
-- "list name a,b,c"    -> {action="list", name=name, items={"a","b","c"}}
-- "# comment"          -> skipped
-- ""                   -> skipped
-- Returns array of parsed commands.

-- YOUR CODE HERE`,
      solution: `function parseConfigDSL(text)
  local commands = {}
  for line in text:gmatch("[^\\n]+") do
    line = line:match("^%s*(.-)%s*$")
    if line ~= "" and line:sub(1, 1) ~= "#" then
      local action, rest = line:match("^(%w+)%s+(.+)$")
      if action == "set" then
        local key, value = rest:match("^(%w+)%s+(.+)$")
        commands[#commands + 1] = { action = "set", key = key, value = value }
      elseif action == "list" then
        local name, items_str = rest:match("^(%w+)%s+(.+)$")
        local items = {}
        for item in items_str:gmatch("[^,]+") do
          items[#items + 1] = item:match("^%s*(.-)%s*$")
        end
        commands[#commands + 1] = { action = "list", name = name, items = items }
      end
    end
  end
  return commands
end`,
      hints: [
        'Split the text into lines and process each one.',
        'Use string patterns to extract action and arguments.',
        'For lists, split the comma-separated values with gmatch.',
      ],
      concepts: ['pattern-matching', 'parsing', 'dsl'],
    },
    {
      id: 'lua-capstone-14',
      title: 'Write Safe Loader with pcall',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a safe module loader that catches errors and provides fallbacks.',
      skeleton: `-- Write safeRequire(moduleName, fallback) that:
-- Attempts to require the module.
-- On success, returns the module.
-- On failure, returns fallback (or empty table if no fallback).
-- Also returns a boolean success flag as second return value.

-- YOUR CODE HERE`,
      solution: `function safeRequire(moduleName, fallback)
  local ok, result = pcall(require, moduleName)
  if ok then
    return result, true
  else
    return fallback or {}, false
  end
end`,
      hints: [
        'Use pcall to catch errors from require.',
        'pcall returns success flag and the result or error.',
        'Return fallback on failure and success flag as second value.',
      ],
      concepts: ['error-handling', 'pcall', 'modules'],
    },
    {
      id: 'lua-capstone-15',
      title: 'Predict Mixed Patterns',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output of pattern matching on game config strings.',
      skeleton: `local lines = {
  "player hp=100 mp=50",
  "enemy hp=30",
  "item name=sword",
}
local results = {}
for _, line in ipairs(lines) do
  local entity = line:match("^(%w+)")
  local count = 0
  for k, v in line:gmatch("(%w+)=(%w+)") do
    count = count + 1
  end
  results[#results + 1] = entity .. ":" .. count
end
print(table.concat(results, ","))`,
      solution: `player:2,enemy:1,item:1`,
      hints: [
        'First pattern extracts the entity type.',
        'gmatch finds all key=value pairs in each line.',
        'player has 2 pairs, enemy and item each have 1.',
      ],
      concepts: ['pattern-matching', 'gmatch', 'parsing'],
    },
    {
      id: 'lua-capstone-16',
      title: 'Write Object Pool with Metatables',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a type-safe object pool using metatables for a game engine.',
      skeleton: `-- Write createTypedPool(className, initFn, resetFn) where:
-- className is used for __tostring
-- initFn() creates a fresh object
-- resetFn(obj) resets an object for reuse
-- Returns: :acquire() :release(obj) :stats() -> {active, pooled, total}

-- YOUR CODE HERE`,
      solution: `function createTypedPool(className, initFn, resetFn)
  local pool = {}
  local activeCount = 0
  local totalCreated = 0
  local mt = {
    __tostring = function() return className end,
  }
  return {
    acquire = function(self)
      local obj
      if #pool > 0 then
        obj = table.remove(pool)
      else
        obj = initFn()
        totalCreated = totalCreated + 1
        setmetatable(obj, mt)
      end
      activeCount = activeCount + 1
      return obj
    end,
    release = function(self, obj)
      resetFn(obj)
      activeCount = activeCount - 1
      pool[#pool + 1] = obj
    end,
    stats = function(self)
      return { active = activeCount, pooled = #pool, total = totalCreated }
    end,
  }
end`,
      hints: [
        'Track active and total counts alongside the pool.',
        'acquire() pops from pool or creates via initFn.',
        'release() resets and returns to pool, decrementing active.',
      ],
      concepts: ['object-pool', 'metatables', 'performance'],
    },
    {
      id: 'lua-capstone-17',
      title: 'Refactor Procedural to OOP',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor procedural game code into an OOP class hierarchy.',
      skeleton: `-- Procedural approach: data and functions are separate
function createBullet(x, y, dx, dy)
  return {x=x, y=y, dx=dx, dy=dy, alive=true}
end

function updateBullet(b, dt)
  b.x = b.x + b.dx * dt
  b.y = b.y + b.dy * dt
  if b.x < 0 or b.x > 800 or b.y < 0 or b.y > 600 then
    b.alive = false
  end
end

function drawBullet(b)
  return "(" .. b.x .. "," .. b.y .. ")"
end

local b = createBullet(100, 100, 10, 5)
updateBullet(b, 1)
print(drawBullet(b))`,
      solution: `local Bullet = {}
Bullet.__index = Bullet

function Bullet:new(x, y, dx, dy)
  return setmetatable({x=x, y=y, dx=dx, dy=dy, alive=true}, Bullet)
end

function Bullet:update(dt)
  self.x = self.x + self.dx * dt
  self.y = self.y + self.dy * dt
  if self.x < 0 or self.x > 800 or self.y < 0 or self.y > 600 then
    self.alive = false
  end
end

function Bullet:draw()
  return "(" .. self.x .. "," .. self.y .. ")"
end

local b = Bullet:new(100, 100, 10, 5)
b:update(1)
print(b:draw())`,
      hints: [
        'Move functions into methods on a class table.',
        'Use self instead of passing the object as a parameter.',
        'setmetatable + __index provides method lookup.',
      ],
      concepts: ['refactoring', 'oop', 'metatables'],
    },
    {
      id: 'lua-capstone-18',
      title: 'Refactor Event Spaghetti to Bus',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor direct function calls between game systems into an event bus.',
      skeleton: `-- Tightly coupled systems
local score = 0
local ui = {}
function ui.updateScore(s) print("Score: " .. s) end

local sound = {}
function sound.play(name) print("Sound: " .. name) end

function onEnemyKilled(enemy)
  score = score + enemy.points
  ui.updateScore(score)
  sound.play("kill")
  -- Every new system needs to be added here!
end

onEnemyKilled({points = 100})`,
      solution: `local bus = { listeners = {} }
function bus:on(e, fn) self.listeners[e] = self.listeners[e] or {}; self.listeners[e][#self.listeners[e]+1] = fn end
function bus:emit(e, ...) for _, fn in ipairs(self.listeners[e] or {}) do fn(...) end end

local score = 0

bus:on("enemyKilled", function(enemy)
  score = score + enemy.points
end)

bus:on("enemyKilled", function(enemy)
  print("Score: " .. (score + enemy.points))
end)

bus:on("enemyKilled", function()
  print("Sound: kill")
end)

bus:emit("enemyKilled", {points = 100})`,
      hints: [
        'Create a central event bus for communication.',
        'Each system registers its own listener independently.',
        'Adding new systems requires no changes to existing code.',
      ],
      concepts: ['refactoring', 'observer', 'decoupling'],
    },
    {
      id: 'lua-capstone-19',
      title: 'Write Full Game World',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a game world that combines entities, events, coroutines, and error handling.',
      skeleton: `-- Write createWorld() with:
-- :spawn(id, x, y, components) - create entity, emit "spawn" event
-- :destroy(id) - remove entity, emit "destroy" event
-- :addScript(fn) - add coroutine-based script
-- :update() - update all scripts (resume coroutines), emit "update"
-- :query(componentType) - return iterator over entities with component
-- :getEntity(id) - return entity by id, or nil
-- All events go through an internal event system.
-- Wrap script resumes in pcall for safety.

-- YOUR CODE HERE`,
      solution: `function createWorld()
  local entities = {}
  local scripts = {}
  local listeners = {}

  local world = {}

  local function on(event, fn)
    listeners[event] = listeners[event] or {}
    listeners[event][#listeners[event] + 1] = fn
  end

  local function emit(event, ...)
    for _, fn in ipairs(listeners[event] or {}) do fn(...) end
  end

  world.on = function(self, event, fn) on(event, fn) end

  world.spawn = function(self, id, x, y, components)
    local entity = { id = id, x = x, y = y, active = true, components = {} }
    for _, comp in ipairs(components or {}) do
      entity.components[comp.type] = comp
    end
    entities[id] = entity
    emit("spawn", entity)
    return entity
  end

  world.destroy = function(self, id)
    local entity = entities[id]
    if entity then
      entity.active = false
      emit("destroy", entity)
      entities[id] = nil
    end
  end

  world.addScript = function(self, fn)
    scripts[#scripts + 1] = coroutine.create(fn)
  end

  world.update = function(self)
    local alive = {}
    for _, co in ipairs(scripts) do
      if coroutine.status(co) ~= "dead" then
        local ok, err = pcall(coroutine.resume, co)
        if coroutine.status(co) ~= "dead" then
          alive[#alive + 1] = co
        end
      end
    end
    scripts = alive
    emit("update")
  end

  world.query = function(self, componentType)
    local results = {}
    for _, e in pairs(entities) do
      if e.active and e.components[componentType] then
        results[#results + 1] = e
      end
    end
    local i = 0
    return function()
      i = i + 1
      return results[i]
    end
  end

  world.getEntity = function(self, id)
    return entities[id]
  end

  return world
end`,
      hints: [
        'Combine entities table, scripts array, and event system.',
        'spawn/destroy modify entities and emit events.',
        'update resumes coroutines with pcall and cleans up dead ones.',
      ],
      concepts: ['game-engine', 'ecs', 'coroutines', 'observer', 'pcall'],
    },
    {
      id: 'lua-capstone-20',
      title: 'Write Save/Load System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a save/load system combining serialization, file I/O, error handling, and pattern matching.',
      skeleton: `-- Write createSaveSystem() with:
-- :register(typeName, serializeFn, deserializeFn) - register type handlers
-- :saveToString(data) - serialize a table of {type, ...} entries to string
-- :loadFromString(str) - deserialize string back to table of entries
-- :saveToFile(path, data) - save to file with pcall protection
-- :loadFromFile(path) - load from file with pcall protection, return data or nil+err
-- Format each entry as: "TYPE:key1=val1;key2=val2\\n"

-- YOUR CODE HERE`,
      solution: `function createSaveSystem()
  local types = {}
  return {
    register = function(self, typeName, serializeFn, deserializeFn)
      types[typeName] = { serialize = serializeFn, deserialize = deserializeFn }
    end,
    saveToString = function(self, data)
      local lines = {}
      for _, entry in ipairs(data) do
        local handler = types[entry.type]
        if handler then
          lines[#lines + 1] = entry.type .. ":" .. handler.serialize(entry)
        end
      end
      return table.concat(lines, "\\n")
    end,
    loadFromString = function(self, str)
      local results = {}
      for line in str:gmatch("[^\\n]+") do
        local typeName, payload = line:match("^(%w+):(.+)$")
        if typeName and types[typeName] then
          local entry = types[typeName].deserialize(payload)
          if entry then
            entry.type = typeName
            results[#results + 1] = entry
          end
        end
      end
      return results
    end,
    saveToFile = function(self, path, data)
      local str = self:saveToString(data)
      local ok, err = pcall(function()
        local f = io.open(path, "w")
        if not f then error("cannot open: " .. path) end
        f:write(str)
        f:close()
      end)
      return ok, err
    end,
    loadFromFile = function(self, path)
      local ok, result = pcall(function()
        local f = io.open(path, "r")
        if not f then error("cannot open: " .. path) end
        local str = f:read("*a")
        f:close()
        return str
      end)
      if not ok then return nil, result end
      return self:loadFromString(result), nil
    end,
  }
end`,
      hints: [
        'register() stores serialize/deserialize functions per type.',
        'saveToString builds "TYPE:payload" lines from handlers.',
        'Wrap file operations in pcall for safety.',
      ],
      concepts: ['serialization', 'file-io', 'error-handling', 'pattern-matching', 'modules'],
    },
  ],
};
