import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-perf',
  title: '49. Performance',
  explanation: `## Lua Performance

Writing efficient Lua means understanding how the VM works under the hood:

\`\`\`lua
-- Local variables are faster than globals
local sin = math.sin  -- cache in local
for i = 1, 1000000 do sin(i) end  -- fast

-- Table pre-allocation avoids rehashing
local t = table.create and table.create(1000, 0) or {}
-- In standard Lua, pre-fill to hint size:
for i = 1, 1000 do t[i] = 0 end

-- String concatenation: use table.concat
local parts = {}
for i = 1, 100 do parts[i] = "line" .. i end
local result = table.concat(parts, "\\n")  -- fast
-- Avoid: result = result .. "line" .. i  (creates garbage)

-- Upvalues are faster than table lookups
local function makeCounter()
  local n = 0  -- upvalue, faster than self.n
  return function() n = n + 1; return n end
end

-- Tail call optimization: Lua optimizes tail calls
function factorial(n, acc)
  acc = acc or 1
  if n <= 1 then return acc end
  return factorial(n - 1, n * acc)  -- tail call, no stack growth
end

-- Avoid table rehashing by knowing hash vs array part
local t = { 1, 2, 3 }        -- array part: indices 1-3
t.name = "test"               -- hash part: string keys
-- Mixing causes overhead; prefer consistent key types

-- Memory pools: reuse tables instead of creating new ones
local pool = {}
function getTable()
  return table.remove(pool) or {}
end
function recycleTable(t)
  for k in pairs(t) do t[k] = nil end
  pool[#pool + 1] = t
end
\`\`\``,
  exercises: [
    {
      id: 'lua-perf-1',
      title: 'Cache Global in Local',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Cache a global function in a local variable for faster access.',
      skeleton: `local ___ = math.sqrt
local sum = 0
for i = 1, 100 do
  sum = sum + sqrt(i)
end
print(sum > 0)  -- true`,
      solution: `local sqrt = math.sqrt
local sum = 0
for i = 1, 100 do
  sum = sum + sqrt(i)
end
print(sum > 0)  -- true`,
      hints: [
        'Assign math.sqrt to a local variable.',
        'Local lookups are faster than global table lookups.',
        'The variable name should match the function name used below.',
      ],
      concepts: ['performance', 'local-caching'],
    },
    {
      id: 'lua-perf-2',
      title: 'Predict Concatenation Cost',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the result of string building strategies.',
      skeleton: `local parts = {}
for i = 1, 5 do
  parts[i] = tostring(i)
end
print(table.concat(parts, "-"))`,
      solution: `1-2-3-4-5`,
      hints: [
        'Each number 1-5 is converted to a string.',
        'table.concat joins them with "-" separator.',
        'This is the efficient way to build strings in Lua.',
      ],
      concepts: ['performance', 'string-concat'],
    },
    {
      id: 'lua-perf-3',
      title: 'Use table.concat',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Replace string concatenation in a loop with table.concat.',
      skeleton: `local parts = {}
for i = 1, 4 do
  parts[___] = "item" .. i
end
local result = table.concat(parts, ", ")
print(result)  -- "item1, item2, item3, item4"`,
      solution: `local parts = {}
for i = 1, 4 do
  parts[i] = "item" .. i
end
local result = table.concat(parts, ", ")
print(result)  -- "item1, item2, item3, item4"`,
      hints: [
        'Use the loop variable as the array index.',
        'table.concat needs a sequential array.',
        'This avoids creating intermediate strings.',
      ],
      concepts: ['performance', 'table-concat'],
    },
    {
      id: 'lua-perf-4',
      title: 'Write Table Pool',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a simple table pool to reuse tables instead of creating new ones.',
      skeleton: `-- Write createPool() returning:
-- :get() - return a clean table (from pool or new)
-- :recycle(t) - clear t and return to pool
-- :size() - return number of tables in pool

-- YOUR CODE HERE`,
      solution: `function createPool()
  local pool = {}
  return {
    get = function(self)
      if #pool > 0 then
        return table.remove(pool)
      end
      return {}
    end,
    recycle = function(self, t)
      for k in pairs(t) do t[k] = nil end
      pool[#pool + 1] = t
    end,
    size = function(self)
      return #pool
    end,
  }
end`,
      hints: [
        'Pool stores reusable tables in an array.',
        'get() pops from pool or creates a new table.',
        'recycle() clears all keys and pushes back to pool.',
      ],
      concepts: ['performance', 'object-pool', 'memory'],
    },
    {
      id: 'lua-perf-5',
      title: 'Fill in Upvalue Optimization',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use upvalues to avoid repeated table lookups.',
      skeleton: `local function createTicker()
  local ___ = 0
  return {
    tick = function() count = count + 1 end,
    get = function() return count end,
  }
end
local t = createTicker()
t.tick(); t.tick(); t.tick()
print(t.get())  -- 3`,
      solution: `local function createTicker()
  local count = 0
  return {
    tick = function() count = count + 1 end,
    get = function() return count end,
  }
end
local t = createTicker()
t.tick(); t.tick(); t.tick()
print(t.get())  -- 3`,
      hints: [
        'Declare count as a local variable in the enclosing function.',
        'Inner functions access it as an upvalue, which is fast.',
        'This avoids needing self.count table lookups.',
      ],
      concepts: ['performance', 'upvalues', 'closures'],
    },
    {
      id: 'lua-perf-6',
      title: 'Predict Local vs Global Speed',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output showing local variable access is faster.',
      skeleton: `local t1 = os.clock()
local x = 0
for i = 1, 1000000 do x = x + 1 end
local t2 = os.clock()

_G.y = 0
local t3 = os.clock()
for i = 1, 1000000 do _G.y = _G.y + 1 end
local t4 = os.clock()

local localTime = t2 - t1
local globalTime = t4 - t3
print(localTime <= globalTime)`,
      solution: `true`,
      hints: [
        'Local variable access is a direct register operation.',
        'Global access requires a table lookup on _G each time.',
        'The local loop will always be faster or equal.',
      ],
      concepts: ['performance', 'locals-vs-globals'],
    },
    {
      id: 'lua-perf-7',
      title: 'Write Memoize Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a memoize wrapper that caches function results.',
      skeleton: `-- Write memoize(fn) that returns a wrapper:
-- First call with args computes and caches the result.
-- Subsequent calls with the same single arg return cached result.
-- Only needs to handle single-argument functions.

-- YOUR CODE HERE`,
      solution: `function memoize(fn)
  local cache = {}
  return function(arg)
    if cache[arg] == nil then
      cache[arg] = fn(arg)
    end
    return cache[arg]
  end
end`,
      hints: [
        'Store results in a table keyed by the argument.',
        'Check if the cache has an entry before computing.',
        'Return the cached value on subsequent calls.',
      ],
      concepts: ['performance', 'memoization', 'caching'],
    },
    {
      id: 'lua-perf-8',
      title: 'Fix String Concat in Loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the O(n^2) string concatenation in a loop.',
      skeleton: `function buildCSV(data)
  local result = ""
  for i, row in ipairs(data) do
    result = result .. table.concat(row, ",")  -- BUG: O(n^2) concat
    if i < #data then
      result = result .. "\\n"
    end
  end
  return result
end

local data = {{"a","b"},{"c","d"},{"e","f"}}
print(buildCSV(data))  -- works but slow for large data`,
      solution: `function buildCSV(data)
  local lines = {}
  for i, row in ipairs(data) do
    lines[i] = table.concat(row, ",")  -- FIXED: collect lines
  end
  return table.concat(lines, "\\n")  -- FIXED: single join
end

local data = {{"a","b"},{"c","d"},{"e","f"}}
print(buildCSV(data))`,
      hints: [
        'Collect each line into an array instead of concatenating.',
        'Use table.concat at the end to join all lines.',
        'This is O(n) instead of O(n^2) for string building.',
      ],
      concepts: ['performance', 'string-concat', 'debugging'],
    },
    {
      id: 'lua-perf-9',
      title: 'Write Tail-Recursive Sum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a tail-recursive sum function that does not grow the stack.',
      skeleton: `-- Write sumTo(n) that sums integers from 1 to n using tail recursion.
-- Use an accumulator parameter so the recursive call is a proper tail call.
-- Must not overflow the stack for large n.

-- YOUR CODE HERE`,
      solution: `function sumTo(n, acc)
  acc = acc or 0
  if n <= 0 then return acc end
  return sumTo(n - 1, acc + n)
end`,
      hints: [
        'Add an accumulator parameter with a default of 0.',
        'The base case returns the accumulator.',
        'The recursive call must be a return statement with no further operations.',
      ],
      concepts: ['performance', 'tail-call', 'recursion'],
    },
    {
      id: 'lua-perf-10',
      title: 'Predict table.concat vs ..',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict that both methods produce the same result.',
      skeleton: `local parts = {"Hello", " ", "World", "!"}

local a = ""
for _, p in ipairs(parts) do a = a .. p end

local b = table.concat(parts)

print(a == b)`,
      solution: `true`,
      hints: [
        'Both produce "Hello World!" but via different methods.',
        'String concatenation with .. creates intermediate strings.',
        'table.concat is optimized but produces the same result.',
      ],
      concepts: ['performance', 'string-building'],
    },
    {
      id: 'lua-perf-11',
      title: 'Fix Table Rehashing',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix code that causes excessive table rehashing by pre-sizing.',
      skeleton: `function createMatrix(rows, cols)
  local m = {}
  for r = 1, rows do
    m[r] = {}  -- BUG: inner tables rehash as they grow
    for c = 1, cols do
      m[r][c] = 0
    end
  end
  return m
end

local matrix = createMatrix(3, 3)
print(#matrix, #matrix[1])  -- 3, 3 (but was slow to build)`,
      solution: `function createMatrix(rows, cols)
  local m = {}
  for r = 1, rows do
    local row = {}
    for c = 1, cols do
      row[c] = 0
    end
    m[r] = row  -- FIXED: build row fully before assigning
  end
  return m
end

local matrix = createMatrix(3, 3)
print(#matrix, #matrix[1])  -- 3, 3`,
      hints: [
        'Build each row into a local variable before assigning.',
        'This is a minor optimization; the real fix for large arrays is pre-allocation.',
        'In LuaJIT, table.new(cols, 0) can pre-allocate the array part.',
      ],
      concepts: ['performance', 'table-rehash', 'debugging'],
    },
    {
      id: 'lua-perf-12',
      title: 'Write Batch Processor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a batch processor that processes items in chunks to avoid long pauses.',
      skeleton: `-- Write createBatchProcessor(items, batchSize, processFn) returning:
-- :step() - process the next batch, return true if more remain
-- :progress() - return {done, total}
-- :reset() - start over from the beginning

-- YOUR CODE HERE`,
      solution: `function createBatchProcessor(items, batchSize, processFn)
  local index = 1
  local total = #items
  return {
    step = function(self)
      local endIdx = math.min(index + batchSize - 1, total)
      for i = index, endIdx do
        processFn(items[i], i)
      end
      index = endIdx + 1
      return index <= total
    end,
    progress = function(self)
      return { done = math.min(index - 1, total), total = total }
    end,
    reset = function(self)
      index = 1
    end,
  }
end`,
      hints: [
        'Track the current index as an upvalue.',
        'step() processes batchSize items starting from index.',
        'Return true from step() if there are more items.',
      ],
      concepts: ['performance', 'batching', 'incremental'],
    },
    {
      id: 'lua-perf-13',
      title: 'Cache Method Lookups',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Cache a method lookup to avoid repeated __index traversal.',
      skeleton: `local insert = table.___
local parts = {}
for i = 1, 5 do
  insert(parts, "x" .. i)
end
print(table.concat(parts, ","))  -- "x1,x2,x3,x4,x5"`,
      solution: `local insert = table.insert
local parts = {}
for i = 1, 5 do
  insert(parts, "x" .. i)
end
print(table.concat(parts, ","))  -- "x1,x2,x3,x4,x5"`,
      hints: [
        'Cache the table.insert function in a local.',
        'This avoids looking up "insert" in the table library each iteration.',
        'The function name matches the table library method.',
      ],
      concepts: ['performance', 'method-caching'],
    },
    {
      id: 'lua-perf-14',
      title: 'Write String Buffer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an efficient string buffer that avoids O(n^2) concatenation.',
      skeleton: `-- Write createBuffer() with:
-- :add(str) - append a string
-- :toString() - return the final concatenated string
-- :length() - return number of parts added
-- :clear() - reset the buffer

-- YOUR CODE HERE`,
      solution: `function createBuffer()
  local parts = {}
  return {
    add = function(self, str)
      parts[#parts + 1] = str
    end,
    toString = function(self)
      return table.concat(parts)
    end,
    length = function(self)
      return #parts
    end,
    clear = function(self)
      parts = {}
    end,
  }
end`,
      hints: [
        'Store strings in an array and join at the end.',
        'Use table.concat for the final join.',
        'This is O(n) versus O(n^2) for repeated .. concatenation.',
      ],
      concepts: ['performance', 'string-buffer', 'table-concat'],
    },
    {
      id: 'lua-perf-15',
      title: 'Predict Tail Call',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the result of a tail-recursive function.',
      skeleton: `function countdown(n, acc)
  acc = acc or {}
  if n <= 0 then return table.concat(acc, ",") end
  acc[#acc + 1] = tostring(n)
  return countdown(n - 1, acc)
end

print(countdown(5))`,
      solution: `5,4,3,2,1`,
      hints: [
        'Each call appends n to the accumulator.',
        'Counts down from 5 to 1.',
        'The final concat joins them with commas.',
      ],
      concepts: ['performance', 'tail-call', 'accumulator'],
    },
    {
      id: 'lua-perf-16',
      title: 'Refactor Nested Lookups',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor deep table lookups in a loop into cached local variables.',
      skeleton: `local config = {
  graphics = {
    renderer = {
      quality = "high",
      scale = 2,
    },
  },
}

local total = 0
for i = 1, 100 do
  if config.graphics.renderer.quality == "high" then
    total = total + config.graphics.renderer.scale
  end
end
print(total)  -- 200`,
      solution: `local config = {
  graphics = {
    renderer = {
      quality = "high",
      scale = 2,
    },
  },
}

local renderer = config.graphics.renderer
local quality = renderer.quality
local scale = renderer.scale

local total = 0
for i = 1, 100 do
  if quality == "high" then
    total = total + scale
  end
end
print(total)  -- 200`,
      hints: [
        'Cache deep table paths in local variables before the loop.',
        'Each dot access is a table lookup at runtime.',
        'Locals are stored in registers and accessed directly.',
      ],
      concepts: ['performance', 'refactoring', 'local-caching'],
    },
    {
      id: 'lua-perf-17',
      title: 'Refactor Repeated Alloc to Pool',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor code that creates temporary tables every frame into a pool pattern.',
      skeleton: `function processEntities(entities)
  local results = {}
  for i, e in ipairs(entities) do
    local temp = { x = e.x * 2, y = e.y * 2 }  -- new table every iteration
    results[i] = temp.x + temp.y
  end
  return results
end

local entities = {{x=1,y=2},{x=3,y=4},{x=5,y=6}}
local r = processEntities(entities)
print(r[1], r[2], r[3])  -- 6, 14, 22`,
      solution: `local tempPool = {}
local function getTemp()
  if #tempPool > 0 then return table.remove(tempPool) end
  return { x = 0, y = 0 }
end
local function recycleTemp(t)
  tempPool[#tempPool + 1] = t
end

function processEntities(entities)
  local results = {}
  for i, e in ipairs(entities) do
    local temp = getTemp()
    temp.x = e.x * 2
    temp.y = e.y * 2
    results[i] = temp.x + temp.y
    recycleTemp(temp)
  end
  return results
end

local entities = {{x=1,y=2},{x=3,y=4},{x=5,y=6}}
local r = processEntities(entities)
print(r[1], r[2], r[3])  -- 6, 14, 22`,
      hints: [
        'Create a pool of reusable temp tables.',
        'Get a table from the pool instead of creating new ones.',
        'Recycle the table back to the pool when done.',
      ],
      concepts: ['performance', 'refactoring', 'object-pool'],
    },
    {
      id: 'lua-perf-18',
      title: 'Write Simple Profiler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple profiler that measures function execution time.',
      skeleton: `-- Write createProfiler() with:
-- :wrap(name, fn) - return a wrapped version of fn that tracks calls
-- :report() - return table of {name, calls, totalTime} sorted by totalTime desc
-- :reset() - clear all profiling data

-- YOUR CODE HERE`,
      solution: `function createProfiler()
  local stats = {}
  return {
    wrap = function(self, name, fn)
      stats[name] = stats[name] or { name = name, calls = 0, totalTime = 0 }
      return function(...)
        local start = os.clock()
        local results = table.pack(fn(...))
        local elapsed = os.clock() - start
        stats[name].calls = stats[name].calls + 1
        stats[name].totalTime = stats[name].totalTime + elapsed
        return table.unpack(results, 1, results.n)
      end
    end,
    report = function(self)
      local list = {}
      for _, s in pairs(stats) do
        list[#list + 1] = { name = s.name, calls = s.calls, totalTime = s.totalTime }
      end
      table.sort(list, function(a, b) return a.totalTime > b.totalTime end)
      return list
    end,
    reset = function(self)
      stats = {}
    end,
  }
end`,
      hints: [
        'wrap() returns a new function that times the original.',
        'Use os.clock() for CPU time measurement.',
        'Accumulate call count and total time per named function.',
      ],
      concepts: ['performance', 'profiling', 'instrumentation'],
    },
    {
      id: 'lua-perf-19',
      title: 'Write Lazy Sequence',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a lazy sequence that computes values on demand to save memory.',
      skeleton: `-- Write createLazyRange(start, stop, transformFn) returning:
-- :get(i) - return transformFn(start + i - 1) computed on demand
-- :toArray() - materialize the full sequence
-- :length() - return number of elements
-- Values are cached after first computation.

-- YOUR CODE HERE`,
      solution: `function createLazyRange(start, stop, transformFn)
  local cache = {}
  local len = stop - start + 1
  return {
    get = function(self, i)
      if i < 1 or i > len then return nil end
      if cache[i] == nil then
        cache[i] = transformFn(start + i - 1)
      end
      return cache[i]
    end,
    toArray = function(self)
      local arr = {}
      for i = 1, len do
        arr[i] = self:get(i)
      end
      return arr
    end,
    length = function(self)
      return len
    end,
  }
end`,
      hints: [
        'Only call transformFn when a value is first requested.',
        'Cache computed values so they are not recomputed.',
        'toArray() calls get() for each index to materialize.',
      ],
      concepts: ['performance', 'lazy-evaluation', 'caching'],
    },
    {
      id: 'lua-perf-20',
      title: 'Write Interned String Registry',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a string interning registry so identical strings share the same reference.',
      skeleton: `-- Write createInternPool() with:
-- :intern(str) - return the canonical copy of str (same reference for equal strings)
-- :count() - return number of unique strings interned
-- :has(str) - return true if str is already interned
-- :clear() - empty the pool
-- Lua already interns short strings, but this demonstrates the concept.

-- YOUR CODE HERE`,
      solution: `function createInternPool()
  local pool = {}
  return {
    intern = function(self, str)
      if not pool[str] then
        pool[str] = str
      end
      return pool[str]
    end,
    count = function(self)
      local n = 0
      for _ in pairs(pool) do n = n + 1 end
      return n
    end,
    has = function(self, str)
      return pool[str] ~= nil
    end,
    clear = function(self)
      pool = {}
    end,
  }
end`,
      hints: [
        'Use the string itself as the key in the pool table.',
        'If already present, return the existing reference.',
        'Lua uses string hashing, so table lookup by string is O(1).',
      ],
      concepts: ['performance', 'string-interning', 'deduplication'],
    },
  ],
};
