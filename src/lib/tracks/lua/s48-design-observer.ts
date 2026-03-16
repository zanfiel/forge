import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-observer',
  title: '48. Observer',
  explanation: `## Observer Pattern in Lua

The Observer pattern lets objects subscribe to events and get notified when they occur:

\`\`\`lua
-- Basic event emitter
local EventEmitter = {}
EventEmitter.__index = EventEmitter

function EventEmitter:new()
  return setmetatable({ listeners = {} }, EventEmitter)
end

function EventEmitter:on(event, callback)
  self.listeners[event] = self.listeners[event] or {}
  self.listeners[event][#self.listeners[event] + 1] = callback
end

function EventEmitter:emit(event, ...)
  for _, cb in ipairs(self.listeners[event] or {}) do
    cb(...)
  end
end

-- Once listener (fires once, then auto-removes)
function EventEmitter:once(event, callback)
  local function wrapper(...)
    self:off(event, wrapper)
    callback(...)
  end
  self:on(event, wrapper)
end

-- Remove a specific listener
function EventEmitter:off(event, callback)
  local list = self.listeners[event]
  if not list then return end
  for i = #list, 1, -1 do
    if list[i] == callback then
      table.remove(list, i)
    end
  end
end

-- Namespaced events: "player:damage", "player:heal"
-- Priority ordering: listeners with lower priority fire first
-- Weak reference observers: use weak tables so GC can collect
-- Event propagation: stop propagation by returning false
-- Async observers with coroutines for deferred handling
\`\`\``,
  exercises: [
    {
      id: 'lua-observer-1',
      title: 'Basic Event Registration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Register a callback for an event using the observer pattern.',
      skeleton: `local listeners = {}

function on(event, callback)
  listeners[event] = listeners[event] or {}
  listeners[event][#listeners[event] + 1] = ___
end

local result = nil
on("greet", function(name) result = "Hello, " .. name end)
for _, cb in ipairs(listeners["greet"]) do cb("Lua") end
print(result)  -- "Hello, Lua"`,
      solution: `local listeners = {}

function on(event, callback)
  listeners[event] = listeners[event] or {}
  listeners[event][#listeners[event] + 1] = callback
end

local result = nil
on("greet", function(name) result = "Hello, " .. name end)
for _, cb in ipairs(listeners["greet"]) do cb("Lua") end
print(result)  -- "Hello, Lua"`,
      hints: [
        'We need to store the callback in the listeners list.',
        'Append the callback to the array for that event.',
        'callback is the function passed to on().',
      ],
      concepts: ['observer', 'event-registration'],
    },
    {
      id: 'lua-observer-2',
      title: 'Predict Event Firing',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output when an event fires to multiple subscribers.',
      skeleton: `local subs = {}
function on(e, fn) subs[e] = subs[e] or {}; subs[e][#subs[e]+1] = fn end
function emit(e, ...) for _, fn in ipairs(subs[e] or {}) do fn(...) end end

on("tick", function(n) print("A:" .. n) end)
on("tick", function(n) print("B:" .. n) end)
emit("tick", 1)`,
      solution: `A:1
B:1`,
      hints: [
        'Both listeners are registered for "tick".',
        'emit calls them in registration order.',
        'Both receive the argument 1.',
      ],
      concepts: ['observer', 'multiple-subscribers'],
    },
    {
      id: 'lua-observer-3',
      title: 'Emit with Arguments',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the emit function to pass arguments to all listeners.',
      skeleton: `local listeners = {}

function on(event, fn)
  listeners[event] = listeners[event] or {}
  listeners[event][#listeners[event] + 1] = fn
end

function emit(event, ___)
  for _, fn in ipairs(listeners[event] or {}) do
    fn(___)
  end
end

local sum = 0
on("add", function(a, b) sum = a + b end)
emit("add", 10, 20)
print(sum)  -- 30`,
      solution: `local listeners = {}

function on(event, fn)
  listeners[event] = listeners[event] or {}
  listeners[event][#listeners[event] + 1] = fn
end

function emit(event, ...)
  for _, fn in ipairs(listeners[event] or {}) do
    fn(...)
  end
end

local sum = 0
on("add", function(a, b) sum = a + b end)
emit("add", 10, 20)
print(sum)  -- 30`,
      hints: [
        'Use varargs (...) to accept any number of arguments.',
        'Pass the varargs through to each listener function.',
        'This lets emit forward all arguments to callbacks.',
      ],
      concepts: ['observer', 'varargs', 'emit'],
    },
    {
      id: 'lua-observer-4',
      title: 'Write Event Emitter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a complete event emitter with on, off, and emit.',
      skeleton: `-- Write createEmitter() returning a table with:
-- :on(event, fn) - register listener
-- :off(event, fn) - remove specific listener
-- :emit(event, ...) - fire event with arguments

-- YOUR CODE HERE`,
      solution: `function createEmitter()
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
        if list[i] == fn then
          table.remove(list, i)
        end
      end
    end,
    emit = function(self, event, ...)
      for _, fn in ipairs(listeners[event] or {}) do
        fn(...)
      end
    end,
  }
end`,
      hints: [
        'Store listeners in a table keyed by event name.',
        'on() appends to the list, off() removes by reference.',
        'Iterate in reverse when removing to avoid index issues.',
      ],
      concepts: ['observer', 'event-emitter', 'off'],
    },
    {
      id: 'lua-observer-5',
      title: 'Fill in Listener Removal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the off function that removes a specific listener.',
      skeleton: `local listeners = {}
function on(e, fn) listeners[e] = listeners[e] or {}; listeners[e][#listeners[e]+1] = fn end

function off(e, fn)
  local list = listeners[e]
  if not list then return end
  for i = #list, 1, ___ do
    if list[i] == fn then
      table.remove(list, i)
    end
  end
end

local count = 0
local handler = function() count = count + 1 end
on("ping", handler)
on("ping", function() count = count + 10 end)
off("ping", handler)
for _, fn in ipairs(listeners["ping"]) do fn() end
print(count)  -- 10`,
      solution: `local listeners = {}
function on(e, fn) listeners[e] = listeners[e] or {}; listeners[e][#listeners[e]+1] = fn end

function off(e, fn)
  local list = listeners[e]
  if not list then return end
  for i = #list, 1, -1 do
    if list[i] == fn then
      table.remove(list, i)
    end
  end
end

local count = 0
local handler = function() count = count + 1 end
on("ping", handler)
on("ping", function() count = count + 10 end)
off("ping", handler)
for _, fn in ipairs(listeners["ping"]) do fn() end
print(count)  -- 10`,
      hints: [
        'Iterate in reverse to safely remove elements.',
        'The step value should be -1 to count downward.',
        'Reverse iteration prevents skipping items after removal.',
      ],
      concepts: ['observer', 'removal', 'reverse-iteration'],
    },
    {
      id: 'lua-observer-6',
      title: 'Predict After Off',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict output after removing a listener.',
      skeleton: `local subs = {}
function on(e, fn) subs[e] = subs[e] or {}; subs[e][#subs[e]+1] = fn end
function off(e, fn)
  local l = subs[e] or {}
  for i = #l, 1, -1 do if l[i] == fn then table.remove(l, i) end end
end
function emit(e, ...) for _, fn in ipairs(subs[e] or {}) do fn(...) end end

local log = {}
local fa = function(x) log[#log+1] = "A" .. x end
local fb = function(x) log[#log+1] = "B" .. x end
on("e", fa)
on("e", fb)
emit("e", 1)
off("e", fa)
emit("e", 2)
print(table.concat(log, ","))`,
      solution: `A1,B1,B2`,
      hints: [
        'First emit fires both fa and fb with 1.',
        'After off(fa), only fb remains.',
        'Second emit fires only fb with 2.',
      ],
      concepts: ['observer', 'off', 'ordering'],
    },
    {
      id: 'lua-observer-7',
      title: 'Write Once Listener',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement a once() method that fires a listener only one time.',
      skeleton: `-- Given an emitter with on/off/emit, write addOnce(emitter, event, fn)
-- that registers fn to fire exactly once, then auto-removes itself.

-- YOUR CODE HERE`,
      solution: `function addOnce(emitter, event, fn)
  local function wrapper(...)
    emitter:off(event, wrapper)
    fn(...)
  end
  emitter:on(event, wrapper)
end`,
      hints: [
        'Wrap the callback in another function.',
        'The wrapper calls off() to remove itself before calling fn.',
        'Register the wrapper, not the original fn.',
      ],
      concepts: ['observer', 'once', 'wrapper'],
    },
    {
      id: 'lua-observer-8',
      title: 'Fix Duplicate Registration',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the emitter that allows the same callback to register multiple times.',
      skeleton: `local listeners = {}

function on(event, fn)
  listeners[event] = listeners[event] or {}
  listeners[event][#listeners[event] + 1] = fn  -- BUG: allows duplicates
end

function emit(event, ...)
  for _, fn in ipairs(listeners[event] or {}) do fn(...) end
end

local count = 0
local handler = function() count = count + 1 end
on("tick", handler)
on("tick", handler)  -- accidentally registered twice
on("tick", handler)  -- and again!
emit("tick")
print(count)  -- should be 1, but prints 3`,
      solution: `local listeners = {}

function on(event, fn)
  listeners[event] = listeners[event] or {}
  for _, existing in ipairs(listeners[event]) do
    if existing == fn then return end  -- FIXED: prevent duplicates
  end
  listeners[event][#listeners[event] + 1] = fn
end

function emit(event, ...)
  for _, fn in ipairs(listeners[event] or {}) do fn(...) end
end

local count = 0
local handler = function() count = count + 1 end
on("tick", handler)
on("tick", handler)
on("tick", handler)
emit("tick")
print(count)  -- 1`,
      hints: [
        'Check if the function is already registered before adding.',
        'Loop through existing listeners to see if fn is present.',
        'Return early if the callback is already in the list.',
      ],
      concepts: ['observer', 'deduplication', 'debugging'],
    },
    {
      id: 'lua-observer-9',
      title: 'Event Namespace Splitting',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement namespaced events using "namespace:event" format.',
      skeleton: `local listeners = {}
function on(event, fn) listeners[event] = listeners[event] or {}; listeners[event][#listeners[event]+1] = fn end

function emitNamespaced(event, ...)
  -- Fire exact match
  for _, fn in ipairs(listeners[event] or {}) do fn(...) end
  -- Fire wildcard: "player:*" matches "player:damage"
  local ns = event:match("^(___):") or ""
  local wildcard = ns .. ":*"
  for _, fn in ipairs(listeners[wildcard] or {}) do fn(event, ...) end
end

local log = {}
on("player:*", function(e, v) log[#log+1] = e .. "=" .. v end)
on("player:damage", function(v) log[#log+1] = "dmg:" .. v end)
emitNamespaced("player:damage", "10")
print(table.concat(log, ","))  -- "dmg:10,player:damage=10"`,
      solution: `local listeners = {}
function on(event, fn) listeners[event] = listeners[event] or {}; listeners[event][#listeners[event]+1] = fn end

function emitNamespaced(event, ...)
  -- Fire exact match
  for _, fn in ipairs(listeners[event] or {}) do fn(...) end
  -- Fire wildcard: "player:*" matches "player:damage"
  local ns = event:match("^([^:]+):") or ""
  local wildcard = ns .. ":*"
  for _, fn in ipairs(listeners[wildcard] or {}) do fn(event, ...) end
end

local log = {}
on("player:*", function(e, v) log[#log+1] = e .. "=" .. v end)
on("player:damage", function(v) log[#log+1] = "dmg:" .. v end)
emitNamespaced("player:damage", "10")
print(table.concat(log, ","))  -- "dmg:10,player:damage=10"`,
      hints: [
        'Use a pattern to extract the namespace before the colon.',
        'The pattern should match one or more non-colon characters.',
        '[^:]+ matches any characters except a colon.',
      ],
      concepts: ['observer', 'namespaces', 'patterns'],
    },
    {
      id: 'lua-observer-10',
      title: 'Write Priority Observer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an observer where listeners have priority ordering.',
      skeleton: `-- Write createPriorityEmitter() with:
-- :on(event, fn, priority) - register with priority (lower = fires first, default 100)
-- :emit(event, ...) - fire listeners sorted by priority
-- :off(event, fn) - remove listener

-- YOUR CODE HERE`,
      solution: `function createPriorityEmitter()
  local listeners = {}
  return {
    on = function(self, event, fn, priority)
      listeners[event] = listeners[event] or {}
      local entry = { fn = fn, priority = priority or 100 }
      local list = listeners[event]
      local inserted = false
      for i, e in ipairs(list) do
        if entry.priority < e.priority then
          table.insert(list, i, entry)
          inserted = true
          break
        end
      end
      if not inserted then
        list[#list + 1] = entry
      end
    end,
    emit = function(self, event, ...)
      for _, entry in ipairs(listeners[event] or {}) do
        entry.fn(...)
      end
    end,
    off = function(self, event, fn)
      local list = listeners[event]
      if not list then return end
      for i = #list, 1, -1 do
        if list[i].fn == fn then
          table.remove(list, i)
        end
      end
    end,
  }
end`,
      hints: [
        'Store listeners as {fn, priority} entries.',
        'Insert in sorted position based on priority.',
        'Lower priority numbers fire first.',
      ],
      concepts: ['observer', 'priority', 'sorted-insert'],
    },
    {
      id: 'lua-observer-11',
      title: 'Predict Once Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output when a once listener is fired multiple times.',
      skeleton: `local subs = {}
function on(e, fn) subs[e] = subs[e] or {}; subs[e][#subs[e]+1] = fn end
function off(e, fn) local l = subs[e] or {}; for i=#l,1,-1 do if l[i]==fn then table.remove(l,i) end end end
function emit(e, ...) for _, fn in ipairs(subs[e] or {}) do fn(...) end end

local count = 0
local function wrapper(...)
  off("ping", wrapper)
  count = count + 1
end
on("ping", wrapper)
emit("ping")
emit("ping")
emit("ping")
print(count)`,
      solution: `1`,
      hints: [
        'The wrapper removes itself on first call.',
        'After the first emit, wrapper is no longer registered.',
        'Subsequent emits find no listeners for "ping".',
      ],
      concepts: ['observer', 'once', 'self-removal'],
    },
    {
      id: 'lua-observer-12',
      title: 'Fix Event Propagation Stop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the emit function to support stopping propagation.',
      skeleton: `local subs = {}
function on(e, fn) subs[e] = subs[e] or {}; subs[e][#subs[e]+1] = fn end

function emit(e, ...)
  for _, fn in ipairs(subs[e] or {}) do
    fn(...)  -- BUG: ignores return value, can't stop propagation
  end
end

local log = {}
on("click", function() log[#log+1] = "A"; return false end)  -- wants to stop
on("click", function() log[#log+1] = "B" end)  -- should not fire
emit("click")
print(table.concat(log, ","))  -- should be "A" but is "A,B"`,
      solution: `local subs = {}
function on(e, fn) subs[e] = subs[e] or {}; subs[e][#subs[e]+1] = fn end

function emit(e, ...)
  for _, fn in ipairs(subs[e] or {}) do
    local result = fn(...)
    if result == false then break end  -- FIXED: stop propagation
  end
end

local log = {}
on("click", function() log[#log+1] = "A"; return false end)
on("click", function() log[#log+1] = "B" end)
emit("click")
print(table.concat(log, ","))  -- "A"`,
      hints: [
        'Capture the return value of each listener.',
        'If a listener returns false, stop calling further listeners.',
        'Use break to exit the loop on false.',
      ],
      concepts: ['observer', 'propagation', 'debugging'],
    },
    {
      id: 'lua-observer-13',
      title: 'Write Weak Reference Observer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an observer using weak tables so listeners can be garbage collected.',
      skeleton: `-- Write createWeakEmitter() with:
-- :on(event, fn) - register listener using weak references
-- :emit(event, ...) - fire event, skip collected listeners
-- :count(event) - return number of live listeners
-- Use weak table mode "v" so functions can be GC'd.

-- YOUR CODE HERE`,
      solution: `function createWeakEmitter()
  local listeners = {}
  return {
    on = function(self, event, fn)
      if not listeners[event] then
        listeners[event] = setmetatable({}, { __mode = "v" })
      end
      local list = listeners[event]
      list[#list + 1] = fn
    end,
    emit = function(self, event, ...)
      local list = listeners[event]
      if not list then return end
      for i = #list, 1, -1 do
        if list[i] then
          list[i](...)
        else
          table.remove(list, i)
        end
      end
    end,
    count = function(self, event)
      local list = listeners[event]
      if not list then return 0 end
      local n = 0
      for i = 1, #list do
        if list[i] then n = n + 1 end
      end
      return n
    end,
  }
end`,
      hints: [
        'Use setmetatable({}, {__mode = "v"}) for weak values.',
        'Weak values allow the GC to collect unreferenced functions.',
        'Check for nil entries during emit since GC may have cleared them.',
      ],
      concepts: ['observer', 'weak-tables', 'garbage-collection'],
    },
    {
      id: 'lua-observer-14',
      title: 'Write Event Bubbling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an event system with parent-child bubbling.',
      skeleton: `-- Write createNode(name, parent) returning a node with:
-- :on(event, fn) - listen on this node
-- :emit(event, ...) - fire on this node, then bubble to parent
-- :stopBubble() - call during handler to stop bubbling
-- Events bubble from child to parent unless stopped.

-- YOUR CODE HERE`,
      solution: `function createNode(name, parent)
  local listeners = {}
  local stopped = false
  local node = { name = name, parent = parent }
  function node:on(event, fn)
    listeners[event] = listeners[event] or {}
    listeners[event][#listeners[event] + 1] = fn
  end
  function node:stopBubble()
    stopped = true
  end
  function node:emit(event, ...)
    stopped = false
    for _, fn in ipairs(listeners[event] or {}) do
      fn(self, ...)
      if stopped then return end
    end
    if self.parent and not stopped then
      self.parent:emit(event, ...)
    end
  end
  return node
end`,
      hints: [
        'Each node has its own listeners and a parent reference.',
        'emit fires local handlers, then calls parent:emit if not stopped.',
        'stopBubble sets a flag checked between handlers and before bubbling.',
      ],
      concepts: ['observer', 'event-bubbling', 'propagation'],
    },
    {
      id: 'lua-observer-15',
      title: 'Fix Missing Event Init',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the emitter that crashes when emitting an event with no listeners.',
      skeleton: `local listeners = {}

function on(event, fn)
  listeners[event][#listeners[event] + 1] = fn  -- BUG: crashes if event not initialized
end

function emit(event, ...)
  for _, fn in ipairs(listeners[event]) do  -- BUG: crashes if no listeners
    fn(...)
  end
end

emit("test", 42)  -- ERROR: attempt to index nil
on("test", function(x) print(x) end)
emit("test", 42)`,
      solution: `local listeners = {}

function on(event, fn)
  listeners[event] = listeners[event] or {}  -- FIXED: initialize if needed
  listeners[event][#listeners[event] + 1] = fn
end

function emit(event, ...)
  for _, fn in ipairs(listeners[event] or {}) do  -- FIXED: default to empty
    fn(...)
  end
end

emit("test", 42)  -- no error, no listeners
on("test", function(x) print(x) end)
emit("test", 42)  -- prints 42`,
      hints: [
        'Initialize the event table before adding to it.',
        'Use "or {}" to default to an empty table in emit.',
        'Both on() and emit() need nil protection.',
      ],
      concepts: ['observer', 'nil-safety', 'debugging'],
    },
    {
      id: 'lua-observer-16',
      title: 'Write Async Observer with Coroutines',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an observer that uses coroutines for deferred event handling.',
      skeleton: `-- Write createAsyncEmitter() with:
-- :on(event, fn) - register handler
-- :emit(event, ...) - queue the event
-- :process() - resume one queued event per call (uses coroutines)
-- :pending() - return number of queued events

-- YOUR CODE HERE`,
      solution: `function createAsyncEmitter()
  local listeners = {}
  local queue = {}
  return {
    on = function(self, event, fn)
      listeners[event] = listeners[event] or {}
      listeners[event][#listeners[event] + 1] = fn
    end,
    emit = function(self, event, ...)
      local args = table.pack(...)
      queue[#queue + 1] = { event = event, args = args }
    end,
    process = function(self)
      if #queue == 0 then return false end
      local item = table.remove(queue, 1)
      local co = coroutine.create(function()
        for _, fn in ipairs(listeners[item.event] or {}) do
          fn(table.unpack(item.args, 1, item.args.n))
        end
      end)
      coroutine.resume(co)
      return true
    end,
    pending = function(self)
      return #queue
    end,
  }
end`,
      hints: [
        'Queue events instead of firing immediately.',
        'process() pops one event and runs its handlers in a coroutine.',
        'Use table.pack/unpack to preserve varargs in the queue.',
      ],
      concepts: ['observer', 'coroutines', 'async', 'queue'],
    },
    {
      id: 'lua-observer-17',
      title: 'Refactor Callbacks to Observer',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor direct callback wiring into an observer pattern.',
      skeleton: `local player = {
  hp = 100,
  onDamage = nil,   -- only one callback allowed!
  onHeal = nil,
}

function player:takeDamage(amount)
  self.hp = self.hp - amount
  if self.onDamage then self.onDamage(amount, self.hp) end
end

function player:heal(amount)
  self.hp = self.hp + amount
  if self.onHeal then self.onHeal(amount, self.hp) end
end

player.onDamage = function(a, hp) print("Ouch! -" .. a .. " HP:" .. hp) end
player:takeDamage(20)`,
      solution: `local player = {
  hp = 100,
  listeners = {},
}

function player:on(event, fn)
  self.listeners[event] = self.listeners[event] or {}
  self.listeners[event][#self.listeners[event] + 1] = fn
end

function player:emit(event, ...)
  for _, fn in ipairs(self.listeners[event] or {}) do fn(...) end
end

function player:takeDamage(amount)
  self.hp = self.hp - amount
  self:emit("damage", amount, self.hp)
end

function player:heal(amount)
  self.hp = self.hp + amount
  self:emit("heal", amount, self.hp)
end

player:on("damage", function(a, hp) print("Ouch! -" .. a .. " HP:" .. hp) end)
player:takeDamage(20)`,
      hints: [
        'Replace single callback fields with a listeners table.',
        'Add on() and emit() methods to the player.',
        'This allows multiple subscribers per event.',
      ],
      concepts: ['observer', 'refactoring', 'multiple-listeners'],
    },
    {
      id: 'lua-observer-18',
      title: 'Refactor Global Signals to Emitter',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor scattered global signal variables into a centralized emitter.',
      skeleton: `-- Scattered global flags for signaling
_G.gameOver = false
_G.scoreChanged = false
_G.newScore = 0

function checkSignals()
  if _G.scoreChanged then
    print("Score: " .. _G.newScore)
    _G.scoreChanged = false
  end
  if _G.gameOver then
    print("Game Over")
  end
end

_G.newScore = 100
_G.scoreChanged = true
checkSignals()`,
      solution: `local emitter = { listeners = {} }

function emitter:on(event, fn)
  self.listeners[event] = self.listeners[event] or {}
  self.listeners[event][#self.listeners[event] + 1] = fn
end

function emitter:emit(event, ...)
  for _, fn in ipairs(self.listeners[event] or {}) do fn(...) end
end

emitter:on("scoreChanged", function(score)
  print("Score: " .. score)
end)

emitter:on("gameOver", function()
  print("Game Over")
end)

emitter:emit("scoreChanged", 100)`,
      hints: [
        'Replace global flags with event emissions.',
        'Listeners react immediately instead of polling.',
        'No need for a checkSignals polling loop.',
      ],
      concepts: ['observer', 'refactoring', 'globals-removal'],
    },
    {
      id: 'lua-observer-19',
      title: 'Write Filtered Observer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an observer where listeners can include a filter predicate.',
      skeleton: `-- Write createFilteredEmitter() with:
-- :on(event, fn, filter) - register fn; filter(args) must return true to fire
-- :emit(event, ...) - fire only listeners whose filter passes (or no filter)
-- :off(event, fn) - remove listener

-- YOUR CODE HERE`,
      solution: `function createFilteredEmitter()
  local listeners = {}
  return {
    on = function(self, event, fn, filter)
      listeners[event] = listeners[event] or {}
      listeners[event][#listeners[event] + 1] = { fn = fn, filter = filter }
    end,
    emit = function(self, event, ...)
      for _, entry in ipairs(listeners[event] or {}) do
        if not entry.filter or entry.filter(...) then
          entry.fn(...)
        end
      end
    end,
    off = function(self, event, fn)
      local list = listeners[event]
      if not list then return end
      for i = #list, 1, -1 do
        if list[i].fn == fn then
          table.remove(list, i)
        end
      end
    end,
  }
end`,
      hints: [
        'Store each listener as {fn, filter} entry.',
        'Before calling fn, check if filter exists and passes.',
        'If no filter is provided, always fire the listener.',
      ],
      concepts: ['observer', 'filter', 'conditional-dispatch'],
    },
    {
      id: 'lua-observer-20',
      title: 'Write Full Observable Subject',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a full observable subject with subscribe, once, emit, pipe, and history.',
      skeleton: `-- Write createSubject() with:
-- :subscribe(fn) - returns unsubscribe function
-- :once(fn) - fire fn once then auto-unsubscribe
-- :emit(...) - fire all subscribers with args
-- :pipe(otherSubject) - forward all events to another subject
-- :history() - return array of all past emitted arg-lists

-- YOUR CODE HERE`,
      solution: `function createSubject()
  local subs = {}
  local log = {}
  local nextId = 1
  local subject = {}

  function subject:subscribe(fn)
    local id = nextId
    nextId = nextId + 1
    subs[id] = fn
    return function()
      subs[id] = nil
    end
  end

  function subject:once(fn)
    local unsub
    unsub = self:subscribe(function(...)
      unsub()
      fn(...)
    end)
  end

  function subject:emit(...)
    local args = table.pack(...)
    log[#log + 1] = args
    for _, fn in pairs(subs) do
      fn(...)
    end
  end

  function subject:pipe(other)
    self:subscribe(function(...)
      other:emit(...)
    end)
  end

  function subject:history()
    local result = {}
    for i, entry in ipairs(log) do
      result[i] = { table.unpack(entry, 1, entry.n) }
    end
    return result
  end

  return subject
end`,
      hints: [
        'Use numeric IDs for subscribers so unsubscribe is a closure over the ID.',
        'once() subscribes and unsubscribes inside the wrapper.',
        'pipe() subscribes to self and forwards by calling other:emit.',
      ],
      concepts: ['observer', 'subject', 'pipe', 'history', 'unsubscribe'],
    },
  ],
};
