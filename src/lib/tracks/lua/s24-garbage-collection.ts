import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-gc',
  title: '24. Garbage Collection',
  explanation: `## Garbage Collection in Lua

Lua uses an incremental mark-and-sweep garbage collector. Understanding it helps write memory-efficient code.

### collectgarbage Function
\`\`\`lua
collectgarbage("collect")   -- full GC cycle
collectgarbage("count")     -- memory in KB
collectgarbage("stop")      -- stop GC
collectgarbage("restart")   -- restart GC
collectgarbage("step", n)   -- incremental step
\`\`\`

### Memory Monitoring
\`\`\`lua
local kb = collectgarbage("count")
print(string.format("%.1f KB used", kb))
\`\`\`

### The __gc Finalizer (Lua 5.2+)
\`\`\`lua
local mt = {
  __gc = function(self)
    print("object collected: " .. self.name)
  end
}
local obj = setmetatable({name = "test"}, mt)
obj = nil
collectgarbage() -- "object collected: test"
\`\`\`

### GC Tuning
\`\`\`lua
collectgarbage("setpause", 200)     -- pause between cycles
collectgarbage("setstepmul", 200)   -- speed of collection
\`\`\`

### Best Practices
- Reuse tables instead of creating new ones
- Set unused references to nil
- Use weak tables for caches
- Avoid creating closures in hot loops`,
  exercises: [
    {
      id: 'lua-gc-1',
      title: 'Run Garbage Collection',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Force a garbage collection cycle.',
      skeleton: `local t = {}
for i = 1, 10000 do t[i] = {} end
t = nil
___("collect")`,
      solution: `local t = {}
for i = 1, 10000 do t[i] = {} end
t = nil
collectgarbage("collect")`,
      hints: ['collectgarbage runs GC operations.', '"collect" forces a full cycle.', 'Fill in "collectgarbage".'],
      concepts: ['collectgarbage'],
    },
    {
      id: 'lua-gc-2',
      title: 'Check Memory Usage',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Get current memory usage in KB.',
      skeleton: `local kb = collectgarbage("___")
print(string.format("%.1f KB", kb))`,
      solution: `local kb = collectgarbage("count")
print(string.format("%.1f KB", kb))`,
      hints: ['"count" returns memory usage in KB.', 'It returns a float value.', 'Fill in "count".'],
      concepts: ['memory-monitoring'],
    },
    {
      id: 'lua-gc-3',
      title: 'Stop and Restart GC',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Stop the garbage collector then restart it.',
      skeleton: `collectgarbage("___") -- stop
-- do time-sensitive work
collectgarbage("___") -- restart`,
      solution: `collectgarbage("stop") -- stop
-- do time-sensitive work
collectgarbage("restart") -- restart`,
      hints: ['"stop" pauses the GC.', '"restart" resumes it.', 'Fill in "stop" and "restart".'],
      concepts: ['gc-control'],
    },
    {
      id: 'lua-gc-4',
      title: '__gc Finalizer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Add a finalizer to a table.',
      skeleton: `local mt = {
  ___ = function(self)
    print("finalized: " .. self.id)
  end
}
local obj = setmetatable({id = "obj1"}, mt)
obj = nil
collectgarbage()`,
      solution: `local mt = {
  __gc = function(self)
    print("finalized: " .. self.id)
  end
}
local obj = setmetatable({id = "obj1"}, mt)
obj = nil
collectgarbage()`,
      hints: ['__gc is called when an object is collected.', 'It is the finalizer metamethod.', 'Fill in "__gc".'],
      concepts: ['__gc'],
    },
    {
      id: 'lua-gc-5',
      title: 'Incremental GC Step',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Perform an incremental GC step.',
      skeleton: `collectgarbage("___", 100)`,
      solution: `collectgarbage("step", 100)`,
      hints: ['"step" performs an incremental collection step.', 'The second argument controls the step size.', 'Fill in "step".'],
      concepts: ['incremental-gc'],
    },
    {
      id: 'lua-gc-6',
      title: 'Set GC Pause',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Set the GC pause percentage.',
      skeleton: `collectgarbage("___", 200) -- 200% means wait until memory doubles`,
      solution: `collectgarbage("setpause", 200) -- 200% means wait until memory doubles`,
      hints: ['setpause controls how long GC waits between cycles.', '200 means memory must double before next cycle.', 'Fill in "setpause".'],
      concepts: ['gc-tuning'],
    },
    {
      id: 'lua-gc-7',
      title: 'Write a Memory Profiler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function memProfile(fn) that measures memory used by fn.',
      skeleton: `-- Write function memProfile(fn)`,
      solution: `local function memProfile(fn)
  collectgarbage("collect")
  local before = collectgarbage("count")
  local result = fn()
  collectgarbage("collect")
  local after = collectgarbage("count")
  return result, after - before
end

local result, used = memProfile(function()
  local t = {}
  for i = 1, 10000 do t[i] = i end
  return t
end)
print(string.format("Used: %.1f KB", used))`,
      hints: ['Measure memory before and after fn.', 'Force GC before each measurement.', 'Return both the result and the difference.'],
      concepts: ['memory-profiling'],
    },
    {
      id: 'lua-gc-8',
      title: 'Write an Object Pool',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an object pool that reuses tables to reduce GC pressure.',
      skeleton: `-- Write an object pool`,
      solution: `local function createPool(factory, reset)
  local pool = {}
  return {
    acquire = function()
      local obj = table.remove(pool)
      if not obj then
        obj = factory()
      end
      return obj
    end,
    release = function(obj)
      if reset then reset(obj) end
      pool[#pool + 1] = obj
    end,
    size = function()
      return #pool
    end,
  }
end

local vecPool = createPool(
  function() return {x = 0, y = 0} end,
  function(v) v.x = 0; v.y = 0 end
)

local v = vecPool.acquire()
v.x = 10; v.y = 20
vecPool.release(v)
print(vecPool.size()) -- 1`,
      hints: ['Store released objects in an array.', 'Return pooled objects instead of creating new ones.', 'Reset objects when released.'],
      concepts: ['object-pool', 'gc-optimization'],
    },
    {
      id: 'lua-gc-9',
      title: 'Write a Resource Manager',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a resource manager that uses __gc to auto-close resources.',
      skeleton: `-- Write a resource manager with __gc cleanup`,
      solution: `local function createResource(name)
  local res = {
    name = name,
    closed = false,
  }
  function res:close()
    if not self.closed then
      print("closing: " .. self.name)
      self.closed = true
    end
  end
  return setmetatable(res, {
    __gc = function(self)
      self:close()
    end,
  })
end

do
  local r = createResource("db-conn")
  -- use resource
end
collectgarbage() -- "closing: db-conn"`,
      hints: ['Set __gc to call close on collection.', 'Track closed state to avoid double-close.', 'Resources auto-clean when collected.'],
      concepts: ['__gc', 'resource-management'],
    },
    {
      id: 'lua-gc-10',
      title: 'Write a Leak Detector',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that detects if memory grows after repeated calls, indicating a leak.',
      skeleton: `-- Write function detectLeak(fn, iterations)`,
      solution: `local function detectLeak(fn, iterations)
  iterations = iterations or 100
  collectgarbage("collect")
  local baseline = collectgarbage("count")
  for i = 1, iterations do
    fn()
    if i % 10 == 0 then
      collectgarbage("collect")
    end
  end
  collectgarbage("collect")
  local final = collectgarbage("count")
  local growth = final - baseline
  return growth > 1, growth
end

local leaking, growth = detectLeak(function()
  _G.leak = _G.leak or {}
  _G.leak[#_G.leak + 1] = {}
end, 100)
print("Leaking:", leaking, string.format("%.1f KB", growth))`,
      hints: ['Compare memory before and after many iterations.', 'Force GC periodically and at the end.', 'Significant growth suggests a leak.'],
      concepts: ['memory-leaks', 'gc-profiling'],
    },
    {
      id: 'lua-gc-11',
      title: 'Write a Buffer Reuse Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write code that reuses a string buffer table instead of creating new tables.',
      skeleton: `-- Write a reusable string buffer`,
      solution: `local function createBuffer()
  local buf = {}
  local n = 0
  return {
    append = function(s)
      n = n + 1
      buf[n] = s
    end,
    flush = function()
      local result = table.concat(buf, "", 1, n)
      n = 0
      return result
    end,
    clear = function()
      n = 0
    end,
  }
end

local buf = createBuffer()
for i = 1, 5 do
  buf.append("line " .. i .. "\\n")
end
print(buf.flush())`,
      hints: ['Reuse the same table across flush calls.', 'Track length with a counter instead of clearing.', 'table.concat with explicit length avoids leftover data.'],
      concepts: ['buffer-reuse', 'gc-optimization'],
    },
    {
      id: 'lua-gc-12',
      title: 'Write GC Benchmark',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that benchmarks GC overhead by measuring time with and without GC.',
      skeleton: `-- Write a GC overhead benchmark`,
      solution: `local function benchGC(fn, iterations)
  iterations = iterations or 10000
  -- With GC
  collectgarbage("restart")
  local t1 = os.clock()
  for i = 1, iterations do fn() end
  local withGC = os.clock() - t1

  -- Without GC
  collectgarbage("stop")
  local t2 = os.clock()
  for i = 1, iterations do fn() end
  local withoutGC = os.clock() - t2
  collectgarbage("restart")
  collectgarbage("collect")

  return withGC, withoutGC, withGC - withoutGC
end

local w, wo, overhead = benchGC(function()
  local t = {1, 2, 3, 4, 5}
end)
print(string.format("GC overhead: %.4fs", overhead))`,
      hints: ['Run the function with GC on, then with GC off.', 'Compare the times.', 'Always restart GC after benchmarking.'],
      concepts: ['gc-benchmarking'],
    },
    {
      id: 'lua-gc-13',
      title: 'Fix Memory Leak Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the accumulating table that never gets cleaned.',
      skeleton: `local log = {}
local function addLog(msg)
  log[#log + 1] = {time = os.time(), msg = msg}
end
-- Called thousands of times, log grows forever`,
      solution: `local log = {}
local maxSize = 1000
local function addLog(msg)
  log[#log + 1] = {time = os.time(), msg = msg}
  if #log > maxSize then
    local newLog = {}
    for i = maxSize - 100, #log do
      newLog[#newLog + 1] = log[i]
    end
    log = newLog
  end
end`,
      hints: ['The log table grows without bound.', 'Trim old entries when it gets too large.', 'Keep only the most recent entries.'],
      concepts: ['memory-leak', 'table-management'],
    },
    {
      id: 'lua-gc-14',
      title: 'Fix Closure Leak Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the closure that keeps a reference to a large table unnecessarily.',
      skeleton: `local function process(data)
  local largeTemp = {}
  for i = 1, #data do
    largeTemp[i] = data[i] * 2
  end
  local sum = 0
  for i = 1, #largeTemp do sum = sum + largeTemp[i] end
  return function() return sum end
  -- largeTemp is captured even though sum is all we need
end`,
      solution: `local function process(data)
  local sum = 0
  do
    local largeTemp = {}
    for i = 1, #data do
      largeTemp[i] = data[i] * 2
    end
    for i = 1, #largeTemp do sum = sum + largeTemp[i] end
  end
  return function() return sum end
  -- largeTemp is out of scope, not captured
end`,
      hints: ['The closure captures all upvalues it can see.', 'Scope largeTemp inside a do..end block.', 'Only sum is visible to the returned closure.'],
      concepts: ['closure-leak', 'scope'],
    },
    {
      id: 'lua-gc-15',
      title: 'Fix __gc Not Called Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the finalizer that is never called.',
      skeleton: `local obj = {}
obj.name = "resource"
-- Add finalizer after creation
local mt = {
  __gc = function(self) print("collected: " .. self.name) end
}
setmetatable(obj, mt) -- __gc might not be registered!`,
      solution: `local mt = {
  __gc = function(self) print("collected: " .. self.name) end
}
local obj = setmetatable({}, mt) -- set metatable at creation
obj.name = "resource"`,
      hints: ['In Lua 5.2+, __gc must be present when metatable is first set.', 'Set the metatable with __gc at table creation time.', 'Adding __gc to an existing metatable may not register it.'],
      concepts: ['__gc', 'finalizer-registration'],
    },
    {
      id: 'lua-gc-16',
      title: 'Predict GC Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local t = setmetatable({}, {__mode = "v"})
t[1] = {}
t[2] = "hello"
t[3] = {}
collectgarbage()
local count = 0
for _ in pairs(t) do count = count + 1 end
print(count)`,
      solution: `1`,
      hints: ['Weak values: t[1] and t[3] are tables with no strong refs.', 'They get collected.', 't[2] is a string (never collected). Count = 1.'],
      concepts: ['weak-values', 'gc'],
    },
    {
      id: 'lua-gc-17',
      title: 'Predict Finalizer Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local mt = {__gc = function(self) print(self.id) end}
local a = setmetatable({id = "A"}, mt)
local b = setmetatable({id = "B"}, mt)
a = nil; b = nil
collectgarbage()`,
      solution: `B
A`,
      hints: ['Finalizers run in reverse order of creation.', 'b was created after a.', 'b is finalized first, then a.'],
      concepts: ['__gc', 'finalizer-order'],
    },
    {
      id: 'lua-gc-18',
      title: 'Predict Memory After nil',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict whether memory decreases after setting a large table to nil.',
      skeleton: `collectgarbage("collect")
local before = collectgarbage("count")
local big = {}
for i = 1, 100000 do big[i] = i end
big = nil
collectgarbage("collect")
local after = collectgarbage("count")
print(after < before + 10)`,
      solution: `true`,
      hints: ['The large table is created and then released.', 'After GC, memory should return to near baseline.', 'after should be close to before.'],
      concepts: ['garbage-collection'],
    },
    {
      id: 'lua-gc-19',
      title: 'Refactor to Reduce GC',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the code to reduce garbage creation in a hot loop.',
      skeleton: `local results = {}
for i = 1, 10000 do
  local point = {x = i, y = i * 2} -- creates 10000 tables!
  results[i] = point.x + point.y
end`,
      solution: `local results = {}
for i = 1, 10000 do
  results[i] = i + i * 2 -- no temporary table needed
end`,
      hints: ['The temporary table is created and immediately discarded.', 'Compute the result directly without a table.', 'Avoid creating objects in hot loops.'],
      concepts: ['gc-optimization', 'refactoring'],
    },
    {
      id: 'lua-gc-20',
      title: 'Refactor to Table Reuse',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the code to reuse a single table instead of creating new ones.',
      skeleton: `local function processItems(items)
  local results = {}
  for i, item in ipairs(items) do
    local temp = {} -- created each iteration
    temp.name = item:upper()
    temp.len = #item
    results[i] = temp.name .. "(" .. temp.len .. ")"
  end
  return results
end`,
      solution: `local function processItems(items)
  local results = {}
  local temp = {} -- reuse single table
  for i, item in ipairs(items) do
    temp.name = item:upper()
    temp.len = #item
    results[i] = temp.name .. "(" .. temp.len .. ")"
  end
  return results
end`,
      hints: ['Move the temp table outside the loop.', 'Overwrite fields each iteration instead of creating new.', 'One table instead of N tables.'],
      concepts: ['table-reuse', 'gc-optimization', 'refactoring'],
    },
  ],
};
