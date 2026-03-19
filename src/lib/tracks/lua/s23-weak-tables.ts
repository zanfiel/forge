import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-weak',
  title: '23. Weak Tables',
  explanation: `## Weak Tables in Lua

Weak tables allow the garbage collector to collect their keys and/or values even if they are referenced in the table.

### The __mode Metamethod
\`\`\`lua
setmetatable(t, {__mode = "k"})  -- weak keys
setmetatable(t, {__mode = "v"})  -- weak values
setmetatable(t, {__mode = "kv"}) -- both weak
\`\`\`

### Weak Values (Caching)
\`\`\`lua
local cache = setmetatable({}, {__mode = "v"})
cache["key"] = createExpensiveObject()
-- If nothing else references the object, it can be collected
\`\`\`

### Weak Keys (Metadata)
\`\`\`lua
local metadata = setmetatable({}, {__mode = "k"})
local obj = {}
metadata[obj] = "some info about obj"
-- When obj is collected, the entry is removed
\`\`\`

### Memoization with Weak Tables
\`\`\`lua
local memo = setmetatable({}, {__mode = "kv"})
local function compute(key)
  if memo[key] then return memo[key] end
  local result = expensiveComputation(key)
  memo[key] = result
  return result
end
\`\`\`

Weak tables prevent memory leaks when associating data with objects.`,
  exercises: [
    {
      id: 'lua-weak-1',
      title: 'Create Weak Value Table',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a table with weak values.',
      skeleton: `local cache = setmetatable({}, {__mode = "___"})`,
      solution: `local cache = setmetatable({}, {__mode = "v"})`,
      hints: ['__mode = "v" makes values weak.', 'Values can be garbage collected.', 'Fill in "v".'],
      concepts: ['weak-values'],
    },
    {
      id: 'lua-weak-2',
      title: 'Create Weak Key Table',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a table with weak keys.',
      skeleton: `local meta = setmetatable({}, {___ = "k"})`,
      solution: `local meta = setmetatable({}, {__mode = "k"})`,
      hints: ['__mode controls weak reference behavior.', '"k" means weak keys.', 'Fill in "__mode".'],
      concepts: ['weak-keys'],
    },
    {
      id: 'lua-weak-3',
      title: 'Both Weak',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a table with both weak keys and values.',
      skeleton: `local t = setmetatable({}, {__mode = "___"})`,
      solution: `local t = setmetatable({}, {__mode = "kv"})`,
      hints: ['"kv" makes both keys and values weak.', 'Either can be collected independently.', 'Fill in "kv".'],
      concepts: ['weak-both'],
    },
    {
      id: 'lua-weak-4',
      title: 'Check Weak Collection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Demonstrate that weak values get collected.',
      skeleton: `local cache = setmetatable({}, {__mode = "v"})
do
  local obj = {data = "temp"}
  cache.temp = obj
end
___(  ) -- force garbage collection
print(cache.temp) -- should be nil`,
      solution: `local cache = setmetatable({}, {__mode = "v"})
do
  local obj = {data = "temp"}
  cache.temp = obj
end
collectgarbage() -- force garbage collection
print(cache.temp) -- should be nil`,
      hints: ['After the block, obj has no strong references.', 'collectgarbage forces collection.', 'Fill in "collectgarbage".'],
      concepts: ['weak-values', 'garbage-collection'],
    },
    {
      id: 'lua-weak-5',
      title: 'Strong vs Weak',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Show that strong references prevent collection.',
      skeleton: `local cache = setmetatable({}, {__mode = "v"})
local obj = {data = "permanent"}
cache.perm = obj
collectgarbage()
print(cache.perm ___ nil) -- should print false (not collected)`,
      solution: `local cache = setmetatable({}, {__mode = "v"})
local obj = {data = "permanent"}
cache.perm = obj
collectgarbage()
print(cache.perm == nil) -- should print false (not collected)`,
      hints: ['obj still holds a strong reference.', 'The weak table entry survives.', 'Fill in "==".'],
      concepts: ['strong-references'],
    },
    {
      id: 'lua-weak-6',
      title: 'Weak Key Metadata',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Associate metadata with objects using weak keys.',
      skeleton: `local info = setmetatable({}, {__mode = "___"})
local function setInfo(obj, data)
  info[obj] = data
end
local function getInfo(obj)
  return info[obj]
end`,
      solution: `local info = setmetatable({}, {__mode = "k"})
local function setInfo(obj, data)
  info[obj] = data
end
local function getInfo(obj)
  return info[obj]
end`,
      hints: ['Weak keys allow objects to be collected.', 'When the object is collected, the entry disappears.', 'Fill in "k".'],
      concepts: ['weak-keys', 'metadata'],
    },
    {
      id: 'lua-weak-7',
      title: 'Write a Weak Cache',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a memoization cache using weak values that allows cached results to be garbage collected.',
      skeleton: `-- Write a weak-value memoization cache`,
      solution: `local function weakMemo(fn)
  local cache = setmetatable({}, {__mode = "v"})
  return function(key)
    local result = cache[key]
    if result == nil then
      result = fn(key)
      cache[key] = result
    end
    return result
  end
end

local compute = weakMemo(function(n)
  print("computing " .. n)
  return {value = n * n}
end)

print(compute(5).value) -- "computing 5", 25
print(compute(5).value) -- 25 (cached, maybe)`,
      hints: ['Use a weak-value table for the cache.', 'Check cache before computing.', 'Results may be collected if not referenced.'],
      concepts: ['memoization', 'weak-values'],
    },
    {
      id: 'lua-weak-8',
      title: 'Write Object Tracking',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a tracker that monitors how many objects of a type exist without preventing GC.',
      skeleton: `-- Write an object tracker using weak tables`,
      solution: `local function createTracker()
  local objects = setmetatable({}, {__mode = "k"})
  return {
    register = function(obj)
      objects[obj] = true
    end,
    count = function()
      local n = 0
      for _ in pairs(objects) do n = n + 1 end
      return n
    end,
  }
end

local tracker = createTracker()
local a = {}; tracker.register(a)
local b = {}; tracker.register(b)
print(tracker.count()) -- 2
b = nil
collectgarbage()
print(tracker.count()) -- 1`,
      hints: ['Use weak keys so objects can be collected.', 'Count remaining entries with pairs.', 'Objects disappear when no longer referenced.'],
      concepts: ['weak-keys', 'object-tracking'],
    },
    {
      id: 'lua-weak-9',
      title: 'Write a String Interning Pool',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a string intern pool that reuses identical strings using weak values.',
      skeleton: `-- Write a string intern pool`,
      solution: `local function createInternPool()
  local pool = setmetatable({}, {__mode = "v"})
  return function(s)
    local interned = pool[s]
    if not interned then
      pool[s] = s
      interned = s
    end
    return interned
  end
end

local intern = createInternPool()
local a = intern("hello")
local b = intern("hello")
print(a == b) -- true (same string)`,
      hints: ['Use weak values so unused strings can be collected.', 'Look up existing string before creating new.', 'Lua strings are already interned, but this shows the pattern.'],
      concepts: ['interning', 'weak-values'],
    },
    {
      id: 'lua-weak-10',
      title: 'Write a Proxy with Weak Ref',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a weak reference wrapper with ref() and deref() methods.',
      skeleton: `-- Write weak reference wrapper`,
      solution: `local function weakRef(obj)
  local ref = setmetatable({[1] = obj}, {__mode = "v"})
  return {
    deref = function()
      return ref[1]
    end,
    isAlive = function()
      return ref[1] ~= nil
    end,
  }
end

local target = {name = "data"}
local wr = weakRef(target)
print(wr.isAlive()) -- true
print(wr.deref().name) -- "data"
target = nil
collectgarbage()
print(wr.isAlive()) -- false`,
      hints: ['Store the object in a weak-value table.', 'deref returns the object if still alive.', 'The object can be collected if no strong refs exist.'],
      concepts: ['weak-references'],
    },
    {
      id: 'lua-weak-11',
      title: 'Write an Event with Weak Listeners',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an event system where listeners are weakly held.',
      skeleton: `-- Write event system with weak listeners`,
      solution: `local function createEvent()
  local listeners = setmetatable({}, {__mode = "k"})
  return {
    subscribe = function(listener)
      listeners[listener] = true
    end,
    emit = function(...)
      for listener in pairs(listeners) do
        listener(...)
      end
    end,
  }
end

local event = createEvent()
local handler = function(msg) print("got: " .. msg) end
event.subscribe(handler)
event.emit("hello") -- "got: hello"
handler = nil
collectgarbage()
event.emit("world") -- nothing (handler was collected)`,
      hints: ['Use weak keys to hold listener references.', 'When a listener is no longer referenced, it disappears.', 'No explicit unsubscribe needed.'],
      concepts: ['weak-keys', 'events'],
    },
    {
      id: 'lua-weak-12',
      title: 'Write a Cache with Stats',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a weak cache that tracks hits and misses.',
      skeleton: `-- Write a stats-tracking weak cache`,
      solution: `local function createCache(computeFn)
  local cache = setmetatable({}, {__mode = "v"})
  local stats = {hits = 0, misses = 0}

  return {
    get = function(key)
      local val = cache[key]
      if val ~= nil then
        stats.hits = stats.hits + 1
        return val
      end
      stats.misses = stats.misses + 1
      val = computeFn(key)
      cache[key] = val
      return val
    end,
    stats = function()
      return stats.hits, stats.misses
    end,
  }
end

local c = createCache(function(k) return {val = k * 2} end)
c.get(1); c.get(1); c.get(2)
print(c.stats()) -- 1  2`,
      hints: ['Track hit/miss counts separately from the cache.', 'The stats table uses strong references.', 'Only cached values are weak.'],
      concepts: ['weak-values', 'caching'],
    },
    {
      id: 'lua-weak-13',
      title: 'Fix Missing __mode Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the cache that never releases memory.',
      skeleton: `local cache = {}
local function compute(key)
  if cache[key] then return cache[key] end
  cache[key] = {result = key * key}
  return cache[key]
end
-- cache grows forever, never releases!`,
      solution: `local cache = setmetatable({}, {__mode = "v"})
local function compute(key)
  if cache[key] then return cache[key] end
  cache[key] = {result = key * key}
  return cache[key]
end
-- unreferenced results can now be collected`,
      hints: ['Without __mode, the cache holds strong references.', 'Add weak values so unused entries can be collected.', 'setmetatable with __mode = "v".'],
      concepts: ['weak-values', 'memory-leak'],
    },
    {
      id: 'lua-weak-14',
      title: 'Fix Wrong __mode Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the metadata table that uses wrong weak mode.',
      skeleton: `local metadata = setmetatable({}, {__mode = "v"}) -- wrong!
local function tag(obj, label)
  metadata[obj] = label -- label (string) is the value
end
-- When obj is collected, entry should be removed
-- But "v" makes the value (label) weak, not the key (obj)`,
      solution: `local metadata = setmetatable({}, {__mode = "k"})
local function tag(obj, label)
  metadata[obj] = label
end
-- Now when obj is collected, the entry is removed`,
      hints: ['We want entries removed when the KEY (obj) is collected.', 'Use "k" for weak keys, not "v".', 'The value (label string) should be strong.'],
      concepts: ['weak-keys', '__mode'],
    },
    {
      id: 'lua-weak-15',
      title: 'Fix Weak String Key Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the weak table where string keys never get collected.',
      skeleton: `local cache = setmetatable({}, {__mode = "k"})
cache["hello"] = {data = 1}
cache["world"] = {data = 2}
collectgarbage()
-- Entries are never collected because strings are not collected!`,
      solution: `local cache = setmetatable({}, {__mode = "v"})
cache["hello"] = {data = 1}
cache["world"] = {data = 2}
-- Now values (tables) can be collected when unreferenced`,
      hints: ['Strings and numbers are not garbage collected in Lua.', 'Weak keys only work with collectible types (tables, functions).', 'Switch to weak values or use table keys.'],
      concepts: ['weak-keys', 'non-collectible'],
    },
    {
      id: 'lua-weak-16',
      title: 'Predict Weak Collection',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local t = setmetatable({}, {__mode = "v"})
local a = {1}
t.x = a
a = nil
collectgarbage()
print(t.x == nil)`,
      solution: `true`,
      hints: ['a was the only strong reference to {1}.', 'After a=nil, no strong refs remain.', 'The weak value is collected.'],
      concepts: ['weak-values'],
    },
    {
      id: 'lua-weak-17',
      title: 'Predict Strong Key Survival',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local t = setmetatable({}, {__mode = "v"})
t[1] = {data = "test"}
collectgarbage()
print(t[1] == nil)`,
      solution: `true`,
      hints: ['The value {data="test"} has no strong reference.', 'It was created inline with no variable holding it.', 'It gets collected.'],
      concepts: ['weak-values'],
    },
    {
      id: 'lua-weak-18',
      title: 'Predict Weak Key Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local t = setmetatable({}, {__mode = "k"})
local key = {}
t[key] = "hello"
print(t[key])
key = nil
collectgarbage()
local count = 0
for _ in pairs(t) do count = count + 1 end
print(count)`,
      solution: `hello
0`,
      hints: ['First print: key exists, outputs "hello".', 'After key=nil and GC, the entry is removed.', 'Count is 0.'],
      concepts: ['weak-keys'],
    },
    {
      id: 'lua-weak-19',
      title: 'Refactor to Weak Cache',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the strong cache to use weak values.',
      skeleton: `local imageCache = {}

local function loadImage(path)
  if imageCache[path] then
    return imageCache[path]
  end
  local img = {path = path, pixels = {}} -- expensive
  imageCache[path] = img
  return img
end
-- Problem: images stay in cache forever, even if unused`,
      solution: `local imageCache = setmetatable({}, {__mode = "v"})

local function loadImage(path)
  local img = imageCache[path]
  if img then
    return img
  end
  img = {path = path, pixels = {}}
  imageCache[path] = img
  return img
end
-- Images can be collected when no longer used
-- Will be reloaded on next request if needed`,
      hints: ['Add __mode = "v" to allow value collection.', 'Unreferenced images will be garbage collected.', 'They will be reloaded on next access if needed.'],
      concepts: ['weak-values', 'caching', 'refactoring'],
    },
    {
      id: 'lua-weak-20',
      title: 'Refactor to Weak Observer',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the observer pattern to use weak references so unsubscribe is automatic.',
      skeleton: `local observers = {}
local function subscribe(fn)
  observers[#observers + 1] = fn
end
local function unsubscribe(fn)
  for i, f in ipairs(observers) do
    if f == fn then table.remove(observers, i); break end
  end
end
local function notify(...)
  for _, fn in ipairs(observers) do fn(...) end
end`,
      solution: `local observers = setmetatable({}, {__mode = "k"})

local function subscribe(fn)
  observers[fn] = true
end

local function notify(...)
  for fn in pairs(observers) do
    fn(...)
  end
end

-- No unsubscribe needed!
-- When fn is no longer referenced elsewhere, it auto-removes
local handler = function(msg) print(msg) end
subscribe(handler)
notify("test") -- prints "test"
handler = nil
collectgarbage()
notify("gone") -- nothing printed`,
      hints: ['Use functions as weak keys.', 'When the function is no longer referenced, it is collected.', 'No explicit unsubscribe needed.'],
      concepts: ['weak-keys', 'observer-pattern', 'refactoring'],
    },
  ],
};
