import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-events',
  title: '39. Event System',
  explanation: `## Event System in Lua

Event-driven patterns are common in Lua applications, especially games:

\`\`\`lua
-- Simple callback table
local events = {}

function on(event, callback)
  if not events[event] then events[event] = {} end
  events[event][#events[event] + 1] = callback
end

function emit(event, ...)
  if events[event] then
    for _, cb in ipairs(events[event]) do
      cb(...)
    end
  end
end

-- Usage
on("damage", function(amount)
  print("Took " .. amount .. " damage!")
end)
emit("damage", 50)

-- Publish/Subscribe pattern
local PubSub = {}
PubSub.__index = PubSub

function PubSub:new()
  return setmetatable({ subscribers = {} }, PubSub)
end

function PubSub:subscribe(topic, fn)
  if not self.subscribers[topic] then
    self.subscribers[topic] = {}
  end
  self.subscribers[topic][#self.subscribers[topic] + 1] = fn
end

function PubSub:publish(topic, ...)
  for _, fn in ipairs(self.subscribers[topic] or {}) do
    fn(...)
  end
end
\`\`\``,
  exercises: [
    {
      id: 'lua-events-1',
      title: 'Basic Event Registration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Register a callback function for an event.',
      skeleton: `local handlers = {}

function on(event, callback)
  if not handlers[event] then
    handlers[event] = {}
  end
  handlers[event][#handlers[event] + 1] = ___
end

on("click", function() print("clicked!") end)
print(#handlers["click"])  -- 1`,
      solution: `local handlers = {}

function on(event, callback)
  if not handlers[event] then
    handlers[event] = {}
  end
  handlers[event][#handlers[event] + 1] = callback
end

on("click", function() print("clicked!") end)
print(#handlers["click"])  -- 1`,
      hints: [
        'Store the callback in the handlers table for that event.',
        'Append callback to the array for the event name.',
        'The handlers table maps event names to arrays of callbacks.',
      ],
      concepts: ['events', 'callbacks'],
    },
    {
      id: 'lua-events-2',
      title: 'Emit Event',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Emit an event to trigger all registered callbacks.',
      skeleton: `local handlers = {}
function on(event, cb)
  handlers[event] = handlers[event] or {}
  handlers[event][#handlers[event] + 1] = cb
end

function emit(event, ...)
  for _, cb in ___(handlers[event] or {}) do
    cb(...)
  end
end

local log = {}
on("test", function(x) log[#log+1] = x end)
emit("test", "hello")
print(log[1])  -- "hello"`,
      solution: `local handlers = {}
function on(event, cb)
  handlers[event] = handlers[event] or {}
  handlers[event][#handlers[event] + 1] = cb
end

function emit(event, ...)
  for _, cb in ipairs(handlers[event] or {}) do
    cb(...)
  end
end

local log = {}
on("test", function(x) log[#log+1] = x end)
emit("test", "hello")
print(log[1])  -- "hello"`,
      hints: [
        'Use ipairs to iterate the array of callbacks.',
        'handlers[event] or {} handles the case with no handlers.',
        'Pass ... to each callback.',
      ],
      concepts: ['events', 'emit', 'callbacks'],
    },
    {
      id: 'lua-events-3',
      title: 'Predict Event Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the order callbacks are called.',
      skeleton: `local handlers = {}
function on(e, cb) handlers[e] = handlers[e] or {}; handlers[e][#handlers[e]+1] = cb end
function emit(e, ...) for _, cb in ipairs(handlers[e] or {}) do cb(...) end end

local log = {}
on("go", function() log[#log+1] = "A" end)
on("go", function() log[#log+1] = "B" end)
on("go", function() log[#log+1] = "C" end)
emit("go")
print(table.concat(log))`,
      solution: `ABC`,
      hints: [
        'Callbacks are stored in order and called in order.',
        'A is registered first, then B, then C.',
        'ipairs iterates them in insertion order.',
      ],
      concepts: ['events', 'order'],
    },
    {
      id: 'lua-events-4',
      title: 'Write Event Emitter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a complete event emitter object.',
      skeleton: `-- Write createEmitter() that returns an object with:
-- :on(event, callback) - register a callback
-- :off(event, callback) - remove a specific callback
-- :emit(event, ...) - call all callbacks for the event

-- YOUR CODE HERE`,
      solution: `function createEmitter()
  local handlers = {}
  local emitter = {}
  local mt = {
    __index = {
      on = function(self, event, callback)
        handlers[event] = handlers[event] or {}
        handlers[event][#handlers[event] + 1] = callback
      end,
      off = function(self, event, callback)
        if not handlers[event] then return end
        for i = #handlers[event], 1, -1 do
          if handlers[event][i] == callback then
            table.remove(handlers[event], i)
            break
          end
        end
      end,
      emit = function(self, event, ...)
        for _, cb in ipairs(handlers[event] or {}) do
          cb(...)
        end
      end,
    },
  }
  return setmetatable(emitter, mt)
end`,
      hints: [
        'Store handlers in a closure variable.',
        'off() searches for and removes the specific callback.',
        'Iterate backwards when removing to avoid skipping elements.',
      ],
      concepts: ['events', 'emitter', 'oop'],
    },
    {
      id: 'lua-events-5',
      title: 'Write Once Listener',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that registers a one-time event listener.',
      skeleton: `-- Given an emitter with :on(event, cb) and :off(event, cb),
-- write once(emitter, event, callback) that registers a callback
-- that is automatically removed after the first call.

-- YOUR CODE HERE`,
      solution: `function once(emitter, event, callback)
  local wrapper
  wrapper = function(...)
    emitter:off(event, wrapper)
    callback(...)
  end
  emitter:on(event, wrapper)
end`,
      hints: [
        'Create a wrapper function that calls off then the callback.',
        'Register the wrapper, not the original callback.',
        'The wrapper removes itself before calling the real callback.',
      ],
      concepts: ['events', 'once', 'wrapper'],
    },
    {
      id: 'lua-events-6',
      title: 'Fix Off Not Working',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the off function that fails to remove callbacks.',
      skeleton: `local handlers = {}
function on(e, cb) handlers[e] = handlers[e] or {}; handlers[e][#handlers[e]+1] = cb end
function off(e, cb)
  if not handlers[e] then return end
  for i, v in ipairs(handlers[e]) do
    if v == cb then
      handlers[e][i] = nil  -- BUG: leaves hole in array
      break
    end
  end
end
function emit(e, ...) for _, cb in ipairs(handlers[e] or {}) do cb(...) end end

local log = {}
local function handler(x) log[#log+1] = x end
on("test", handler)
on("test", function(x) log[#log+1] = x .. "!" end)
off("test", handler)
emit("test", "hi")
print(#log)  -- should be 1`,
      solution: `local handlers = {}
function on(e, cb) handlers[e] = handlers[e] or {}; handlers[e][#handlers[e]+1] = cb end
function off(e, cb)
  if not handlers[e] then return end
  for i, v in ipairs(handlers[e]) do
    if v == cb then
      table.remove(handlers[e], i)  -- FIXED: use table.remove
      break
    end
  end
end
function emit(e, ...) for _, cb in ipairs(handlers[e] or {}) do cb(...) end end

local log = {}
local function handler(x) log[#log+1] = x end
on("test", handler)
on("test", function(x) log[#log+1] = x .. "!" end)
off("test", handler)
emit("test", "hi")
print(#log)  -- 1`,
      hints: [
        'Setting t[i] = nil leaves a hole and breaks ipairs.',
        'Use table.remove(t, i) to shift elements down.',
        'This maintains a proper sequence without holes.',
      ],
      concepts: ['events', 'off', 'debugging'],
    },
    {
      id: 'lua-events-7',
      title: 'Write Pub/Sub System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement a publish/subscribe messaging system.',
      skeleton: `-- Write createPubSub() returning an object with:
-- :subscribe(topic, fn) - returns an unsubscribe function
-- :publish(topic, ...) - notify all subscribers
-- :subscriberCount(topic) - return count of subscribers

-- YOUR CODE HERE`,
      solution: `function createPubSub()
  local subs = {}
  local ps = {}
  local mt = {
    __index = {
      subscribe = function(self, topic, fn)
        subs[topic] = subs[topic] or {}
        subs[topic][#subs[topic] + 1] = fn
        return function()
          for i, f in ipairs(subs[topic]) do
            if f == fn then
              table.remove(subs[topic], i)
              break
            end
          end
        end
      end,
      publish = function(self, topic, ...)
        for _, fn in ipairs(subs[topic] or {}) do
          fn(...)
        end
      end,
      subscriberCount = function(self, topic)
        return #(subs[topic] or {})
      end,
    },
  }
  return setmetatable(ps, mt)
end`,
      hints: [
        'subscribe returns a function that removes the subscriber.',
        'Store subscribers in an array per topic.',
        'The unsubscribe function captures the topic and fn in a closure.',
      ],
      concepts: ['events', 'pub-sub', 'closures'],
    },
    {
      id: 'lua-events-8',
      title: 'Event with Data',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Pass event data through to callbacks.',
      skeleton: `local handlers = {}
function on(e, cb) handlers[e] = handlers[e] or {}; handlers[e][#handlers[e]+1] = cb end
function emit(e, ...) for _, cb in ipairs(handlers[e] or {}) do cb(___) end end

local result = 0
on("add", function(a, b) result = a + b end)
emit("add", 10, 20)
print(result)  -- 30`,
      solution: `local handlers = {}
function on(e, cb) handlers[e] = handlers[e] or {}; handlers[e][#handlers[e]+1] = cb end
function emit(e, ...) for _, cb in ipairs(handlers[e] or {}) do cb(...) end end

local result = 0
on("add", function(a, b) result = a + b end)
emit("add", 10, 20)
print(result)  -- 30`,
      hints: [
        'Use ... to forward all event data to callbacks.',
        'The varargs from emit are passed through to each cb.',
        'Callbacks receive the same arguments that emit receives.',
      ],
      concepts: ['events', 'data-passing'],
    },
    {
      id: 'lua-events-9',
      title: 'Write Event Queue',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an event queue that defers event processing.',
      skeleton: `-- Write createEventQueue() with:
-- :push(event, ...) - queue an event for later processing
-- :process() - process all queued events (FIFO order)
-- :on(event, cb) - register handlers (same as before)
-- Events are not immediately fired; they wait until process().

-- YOUR CODE HERE`,
      solution: `function createEventQueue()
  local handlers = {}
  local queue = {}
  local eq = {}
  local mt = {
    __index = {
      on = function(self, event, cb)
        handlers[event] = handlers[event] or {}
        handlers[event][#handlers[event] + 1] = cb
      end,
      push = function(self, event, ...)
        queue[#queue + 1] = { event = event, args = table.pack(...) }
      end,
      process = function(self)
        local current = queue
        queue = {}
        for _, entry in ipairs(current) do
          for _, cb in ipairs(handlers[entry.event] or {}) do
            cb(table.unpack(entry.args, 1, entry.args.n))
          end
        end
      end,
    },
  }
  return setmetatable(eq, mt)
end`,
      hints: [
        'Store events in a queue table with event name and packed args.',
        'process() iterates the queue and fires handlers.',
        'Replace the queue with a new empty table during processing.',
      ],
      concepts: ['events', 'queue', 'deferred-processing'],
    },
    {
      id: 'lua-events-10',
      title: 'Predict Multiple Handlers',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output when multiple handlers modify shared state.',
      skeleton: `local handlers = {}
function on(e, cb) handlers[e] = handlers[e] or {}; handlers[e][#handlers[e]+1] = cb end
function emit(e, ...) for _, cb in ipairs(handlers[e] or {}) do cb(...) end end

local value = 0
on("update", function(x) value = value + x end)
on("update", function(x) value = value * 2 end)
emit("update", 5)
print(value)`,
      solution: `10`,
      hints: [
        'First handler: value = 0 + 5 = 5.',
        'Second handler: value = 5 * 2 = 10.',
        'Handlers execute in registration order.',
      ],
      concepts: ['events', 'order', 'shared-state'],
    },
    {
      id: 'lua-events-11',
      title: 'Write Wildcard Events',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an event system that supports wildcard subscriptions.',
      skeleton: `-- Write an event system where subscribing to "*" receives ALL events.
-- createWildcardEmitter() returning:
-- :on(event, cb) - register; "*" matches all events
-- :emit(event, ...) - fire event handlers AND wildcard handlers

-- YOUR CODE HERE`,
      solution: `function createWildcardEmitter()
  local handlers = {}
  local em = {}
  local mt = {
    __index = {
      on = function(self, event, cb)
        handlers[event] = handlers[event] or {}
        handlers[event][#handlers[event] + 1] = cb
      end,
      emit = function(self, event, ...)
        for _, cb in ipairs(handlers[event] or {}) do
          cb(...)
        end
        if event ~= "*" then
          for _, cb in ipairs(handlers["*"] or {}) do
            cb(event, ...)
          end
        end
      end,
    },
  }
  return setmetatable(em, mt)
end`,
      hints: [
        'Fire specific event handlers first.',
        'Then fire wildcard ("*") handlers with the event name prepended.',
        'Skip wildcard handlers when emitting "*" to avoid recursion.',
      ],
      concepts: ['events', 'wildcard', 'patterns'],
    },
    {
      id: 'lua-events-12',
      title: 'Fix Handler During Emit',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Fix the problem where adding handlers during emit causes issues.',
      skeleton: `local handlers = {}
function on(e, cb) handlers[e] = handlers[e] or {}; handlers[e][#handlers[e]+1] = cb end
function emit(e, ...)
  for _, cb in ipairs(handlers[e] or {}) do
    cb(...)  -- BUG: if cb adds more handlers, ipairs may pick them up
  end
end

local count = 0
on("test", function()
  count = count + 1
  if count < 5 then
    on("test", function() count = count + 1 end)
  end
end)
emit("test")
print(count)  -- unpredictable behavior`,
      solution: `local handlers = {}
function on(e, cb) handlers[e] = handlers[e] or {}; handlers[e][#handlers[e]+1] = cb end
function emit(e, ...)
  local snapshot = {table.unpack(handlers[e] or {})}  -- FIXED: snapshot
  for _, cb in ipairs(snapshot) do
    cb(...)
  end
end

local count = 0
on("test", function()
  count = count + 1
  if count < 5 then
    on("test", function() count = count + 1 end)
  end
end)
emit("test")
print(count)  -- 1 (only original handler runs)`,
      hints: [
        'Copy the handler list before iterating.',
        'New handlers added during emit will not be called this round.',
        'This prevents infinite loops and unpredictable behavior.',
      ],
      concepts: ['events', 'snapshot', 'debugging'],
    },
    {
      id: 'lua-events-13',
      title: 'Write Typed Event Emitter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an event emitter that validates event names against a list.',
      skeleton: `-- Write createTypedEmitter(eventNames) where eventNames is a table
-- of allowed event name strings. Attempting to on() or emit() an
-- unknown event should call error().
-- Returns: :on(event, cb), :emit(event, ...)

-- YOUR CODE HERE`,
      solution: `function createTypedEmitter(eventNames)
  local valid = {}
  for _, name in ipairs(eventNames) do
    valid[name] = true
  end
  local handlers = {}
  local em = {}
  local mt = {
    __index = {
      on = function(self, event, cb)
        if not valid[event] then
          error("unknown event: " .. event)
        end
        handlers[event] = handlers[event] or {}
        handlers[event][#handlers[event] + 1] = cb
      end,
      emit = function(self, event, ...)
        if not valid[event] then
          error("unknown event: " .. event)
        end
        for _, cb in ipairs(handlers[event] or {}) do
          cb(...)
        end
      end,
    },
  }
  return setmetatable(em, mt)
end`,
      hints: [
        'Build a lookup set from the eventNames table.',
        'Check validity before registering or emitting.',
        'Use error() for invalid event names.',
      ],
      concepts: ['events', 'validation', 'types'],
    },
    {
      id: 'lua-events-14',
      title: 'Write Event Middleware',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an event system with middleware that can modify or cancel events.',
      skeleton: `-- Write createMiddlewareEmitter() with:
-- :use(fn) - add middleware fn(event, args, next)
--   fn calls next() to continue, or skips to cancel
-- :on(event, cb) - register handlers
-- :emit(event, ...) - runs middleware chain then handlers

-- YOUR CODE HERE`,
      solution: `function createMiddlewareEmitter()
  local middleware = {}
  local handlers = {}
  local em = {}
  local mt = {
    __index = {
      use = function(self, fn)
        middleware[#middleware + 1] = fn
      end,
      on = function(self, event, cb)
        handlers[event] = handlers[event] or {}
        handlers[event][#handlers[event] + 1] = cb
      end,
      emit = function(self, event, ...)
        local args = table.pack(...)
        local idx = 0
        local function next()
          idx = idx + 1
          if idx <= #middleware then
            middleware[idx](event, args, next)
          else
            for _, cb in ipairs(handlers[event] or {}) do
              cb(table.unpack(args, 1, args.n))
            end
          end
        end
        next()
      end,
    },
  }
  return setmetatable(em, mt)
end`,
      hints: [
        'Build a chain where each middleware calls next() to continue.',
        'If middleware does not call next(), the event is cancelled.',
        'After all middleware, fire the actual handlers.',
      ],
      concepts: ['events', 'middleware', 'chain-of-responsibility'],
    },
    {
      id: 'lua-events-15',
      title: 'Predict Unsubscribe',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output after unsubscribing.',
      skeleton: `local subs = {}
function on(e, cb) subs[e] = subs[e] or {}; subs[e][#subs[e]+1] = cb end
function off(e, cb) for i,v in ipairs(subs[e] or {}) do if v==cb then table.remove(subs[e],i); break end end end
function emit(e, ...) for _,cb in ipairs(subs[e] or {}) do cb(...) end end

local log = {}
local function a(x) log[#log+1] = "a"..x end
local function b(x) log[#log+1] = "b"..x end
on("e", a)
on("e", b)
emit("e", "1")
off("e", a)
emit("e", "2")
print(table.concat(log, ","))`,
      solution: `a1,b1,b2`,
      hints: [
        'First emit: both a and b run with "1".',
        'Then a is removed with off.',
        'Second emit: only b runs with "2".',
      ],
      concepts: ['events', 'unsubscribe'],
    },
    {
      id: 'lua-events-16',
      title: 'Write Event Replay',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an event system that can replay past events to new subscribers.',
      skeleton: `-- Write createReplayEmitter() with:
-- :on(event, cb) - register and replay all past events of this type
-- :emit(event, ...) - fire and record the event
-- Past events are stored for replay.

-- YOUR CODE HERE`,
      solution: `function createReplayEmitter()
  local handlers = {}
  local history = {}
  local em = {}
  local mt = {
    __index = {
      on = function(self, event, cb)
        handlers[event] = handlers[event] or {}
        handlers[event][#handlers[event] + 1] = cb
        for _, entry in ipairs(history[event] or {}) do
          cb(table.unpack(entry, 1, entry.n))
        end
      end,
      emit = function(self, event, ...)
        history[event] = history[event] or {}
        history[event][#history[event] + 1] = table.pack(...)
        for _, cb in ipairs(handlers[event] or {}) do
          cb(...)
        end
      end,
    },
  }
  return setmetatable(em, mt)
end`,
      hints: [
        'Store each emission in a history table per event.',
        'When a new subscriber registers, replay all history.',
        'Use table.pack to capture event arguments.',
      ],
      concepts: ['events', 'replay', 'patterns'],
    },
    {
      id: 'lua-events-17',
      title: 'Refactor Nested Ifs to Events',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor conditional processing into an event-driven pattern.',
      skeleton: `function processAction(action, data)
  if action == "save" then
    print("saving: " .. data)
  elseif action == "load" then
    print("loading: " .. data)
  elseif action == "delete" then
    print("deleting: " .. data)
  end
end

processAction("save", "file.txt")
processAction("load", "data.db")
processAction("delete", "temp.tmp")`,
      solution: `local handlers = {}
function on(action, cb)
  handlers[action] = handlers[action] or {}
  handlers[action][#handlers[action] + 1] = cb
end
function processAction(action, data)
  for _, cb in ipairs(handlers[action] or {}) do
    cb(data)
  end
end

on("save", function(data) print("saving: " .. data) end)
on("load", function(data) print("loading: " .. data) end)
on("delete", function(data) print("deleting: " .. data) end)

processAction("save", "file.txt")
processAction("load", "data.db")
processAction("delete", "temp.tmp")`,
      hints: [
        'Replace if/elseif chains with event handler registration.',
        'Each action type gets its own handler.',
        'New actions can be added without modifying processAction.',
      ],
      concepts: ['events', 'refactoring', 'open-closed'],
    },
    {
      id: 'lua-events-18',
      title: 'Refactor Global Events to Scoped',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor global event functions into a scoped emitter.',
      skeleton: `-- Global event system (pollutes global namespace)
_G.eventHandlers = {}
function _G.globalOn(e, cb)
  _G.eventHandlers[e] = _G.eventHandlers[e] or {}
  _G.eventHandlers[e][#_G.eventHandlers[e]+1] = cb
end
function _G.globalEmit(e, ...)
  for _, cb in ipairs(_G.eventHandlers[e] or {}) do cb(...) end
end

globalOn("ping", function() print("pong") end)
globalEmit("ping")`,
      solution: `local function createEmitter()
  local handlers = {}
  return {
    on = function(e, cb)
      handlers[e] = handlers[e] or {}
      handlers[e][#handlers[e] + 1] = cb
    end,
    emit = function(e, ...)
      for _, cb in ipairs(handlers[e] or {}) do cb(...) end
    end,
  }
end

local emitter = createEmitter()
emitter.on("ping", function() print("pong") end)
emitter.emit("ping")`,
      hints: [
        'Encapsulate handlers in a closure instead of globals.',
        'Return a table with on/emit functions.',
        'Multiple independent emitters can coexist.',
      ],
      concepts: ['events', 'encapsulation', 'refactoring'],
    },
    {
      id: 'lua-events-19',
      title: 'Write Priority Event Handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write an event system where handlers have priority ordering.',
      skeleton: `-- Write createPriorityEmitter() with:
-- :on(event, cb, priority) - priority is a number (higher = runs first)
-- :emit(event, ...) - run handlers in priority order (descending)
-- Default priority is 0.

-- YOUR CODE HERE`,
      solution: `function createPriorityEmitter()
  local handlers = {}
  local em = {}
  local mt = {
    __index = {
      on = function(self, event, cb, priority)
        handlers[event] = handlers[event] or {}
        handlers[event][#handlers[event] + 1] = {
          fn = cb,
          priority = priority or 0,
        }
        table.sort(handlers[event], function(a, b)
          return a.priority > b.priority
        end)
      end,
      emit = function(self, event, ...)
        for _, entry in ipairs(handlers[event] or {}) do
          entry.fn(...)
        end
      end,
    },
  }
  return setmetatable(em, mt)
end`,
      hints: [
        'Store handlers as {fn, priority} entries.',
        'Sort by priority descending after each insertion.',
        'emit iterates in the pre-sorted order.',
      ],
      concepts: ['events', 'priority', 'sorting'],
    },
    {
      id: 'lua-events-20',
      title: 'Write Event Bus Bridge',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a bridge that forwards events between two emitters.',
      skeleton: `-- Write bridge(src, dst, events) where:
-- src and dst have :on(e, cb) and :emit(e, ...)
-- events is a list of event names to forward
-- Any event emitted on src should also be emitted on dst.
-- Return an unbind function that stops forwarding.

-- YOUR CODE HERE`,
      solution: `function bridge(src, dst, events)
  local forwaders = {}
  for _, event in ipairs(events) do
    local fn = function(...)
      dst:emit(event, ...)
    end
    src:on(event, fn)
    forwaders[#forwaders + 1] = { event = event, fn = fn }
  end
  return function()
    for _, entry in ipairs(forwaders) do
      src:off(entry.event, entry.fn)
    end
  end
end`,
      hints: [
        'For each event, register a handler on src that emits on dst.',
        'Store references to the forwarding functions.',
        'The unbind function removes all forwarding handlers.',
      ],
      concepts: ['events', 'bridge', 'patterns'],
    },
  ],
};
