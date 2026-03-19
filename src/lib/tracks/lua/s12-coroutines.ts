import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-coroutines',
  title: '12. Coroutines',
  explanation: `## Coroutines in Lua

Coroutines are collaborative multitasking primitives. Unlike threads, they yield control explicitly.

### Creating Coroutines
\`\`\`lua
local co = coroutine.create(function()
  print("hello")
  coroutine.yield()
  print("world")
end)
\`\`\`

### Resume and Yield
\`\`\`lua
coroutine.resume(co)  -- prints "hello", suspends
coroutine.resume(co)  -- prints "world", finishes
\`\`\`

### Passing Values
\`\`\`lua
local co = coroutine.create(function(x)
  local y = coroutine.yield(x + 1)
  return y * 2
end)
local ok, val = coroutine.resume(co, 10)  -- val = 11
local ok2, val2 = coroutine.resume(co, 20) -- val2 = 40
\`\`\`

### coroutine.wrap
\`\`\`lua
local gen = coroutine.wrap(function()
  coroutine.yield(1)
  coroutine.yield(2)
  return 3
end)
print(gen()) -- 1
print(gen()) -- 2
print(gen()) -- 3
\`\`\`

### Status
\`\`\`lua
coroutine.status(co) -- "suspended", "running", "dead", "normal"
\`\`\``,
  exercises: [
    {
      id: 'lua-coroutines-1',
      title: 'Create a Coroutine',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a coroutine from a function.',
      skeleton: `local co = coroutine.___(function()
  print("hello from coroutine")
end)
coroutine.resume(co)`,
      solution: `local co = coroutine.create(function()
  print("hello from coroutine")
end)
coroutine.resume(co)`,
      hints: ['coroutine.create wraps a function in a coroutine.', 'It returns a coroutine object.', 'Fill in "create".'],
      concepts: ['coroutine-create'],
    },
    {
      id: 'lua-coroutines-2',
      title: 'Yield a Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Yield a value from the coroutine.',
      skeleton: `local co = coroutine.create(function()
  coroutine.___(42)
end)
local ok, val = coroutine.resume(co)
print(val) -- should print 42`,
      solution: `local co = coroutine.create(function()
  coroutine.yield(42)
end)
local ok, val = coroutine.resume(co)
print(val) -- should print 42`,
      hints: ['coroutine.yield suspends and sends a value back.', 'resume returns ok status and the yielded value.', 'Fill in "yield".'],
      concepts: ['coroutine-yield'],
    },
    {
      id: 'lua-coroutines-3',
      title: 'Check Coroutine Status',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Check the status of a coroutine.',
      skeleton: `local co = coroutine.create(function()
  coroutine.yield()
end)
print(coroutine.___(co)) -- "suspended"
coroutine.resume(co)
print(coroutine.___(co)) -- "suspended"
coroutine.resume(co)
print(coroutine.___(co)) -- "dead"`,
      solution: `local co = coroutine.create(function()
  coroutine.yield()
end)
print(coroutine.status(co)) -- "suspended"
coroutine.resume(co)
print(coroutine.status(co)) -- "suspended"
coroutine.resume(co)
print(coroutine.status(co)) -- "dead"`,
      hints: ['coroutine.status returns the current state.', 'States: suspended, running, dead, normal.', 'Fill in "status".'],
      concepts: ['coroutine-status'],
    },
    {
      id: 'lua-coroutines-4',
      title: 'Use coroutine.wrap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a wrapped coroutine that acts like a regular function.',
      skeleton: `local gen = coroutine.___(function()
  coroutine.yield(1)
  coroutine.yield(2)
  return 3
end)
print(gen(), gen(), gen())`,
      solution: `local gen = coroutine.wrap(function()
  coroutine.yield(1)
  coroutine.yield(2)
  return 3
end)
print(gen(), gen(), gen())`,
      hints: ['coroutine.wrap returns a callable function.', 'No need to use resume explicitly.', 'Fill in "wrap".'],
      concepts: ['coroutine-wrap'],
    },
    {
      id: 'lua-coroutines-5',
      title: 'Pass Value to Resume',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Send a value into the coroutine via resume.',
      skeleton: `local co = coroutine.create(function()
  local x = coroutine.yield()
  print(x)
end)
coroutine.resume(co)
coroutine.resume(co, ___) -- send 99 into the coroutine`,
      solution: `local co = coroutine.create(function()
  local x = coroutine.yield()
  print(x)
end)
coroutine.resume(co)
coroutine.resume(co, 99) -- send 99 into the coroutine`,
      hints: ['Values passed to resume become the return value of yield.', 'The second resume sends 99 to the waiting yield.', 'Fill in "99".'],
      concepts: ['coroutine-communication'],
    },
    {
      id: 'lua-coroutines-6',
      title: 'Resume Return Values',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Capture the boolean status and yielded value from resume.',
      skeleton: `local co = coroutine.create(function()
  coroutine.yield("hello")
end)
local ___, ___ = coroutine.resume(co)
print(ok, val) -- true  hello`,
      solution: `local co = coroutine.create(function()
  coroutine.yield("hello")
end)
local ok, val = coroutine.resume(co)
print(ok, val) -- true  hello`,
      hints: ['resume returns a boolean status first.', 'Then any yielded or returned values.', 'Fill in "ok" and "val".'],
      concepts: ['coroutine-resume'],
    },
    {
      id: 'lua-coroutines-7',
      title: 'Write a Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a generator function using coroutine.wrap that yields squares from 1 to n.',
      skeleton: `-- Write function squares(n) using coroutine.wrap`,
      solution: `local function squares(n)
  return coroutine.wrap(function()
    for i = 1, n do
      coroutine.yield(i * i)
    end
  end)
end

for v in squares(5) do
  print(v) -- 1, 4, 9, 16, 25
end`,
      hints: ['coroutine.wrap returns an iterator function.', 'Yield each square inside the coroutine.', 'The for loop consumes the iterator.'],
      concepts: ['coroutines', 'generators'],
    },
    {
      id: 'lua-coroutines-8',
      title: 'Write a Producer-Consumer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a producer coroutine that yields items and a consumer that processes them.',
      skeleton: `-- Write producer and consumer using coroutines`,
      solution: `local function producer(items)
  return coroutine.create(function()
    for _, item in ipairs(items) do
      coroutine.yield(item)
    end
  end)
end

local function consumer(prod)
  while coroutine.status(prod) ~= "dead" do
    local ok, item = coroutine.resume(prod)
    if ok and item then
      print("consumed: " .. item)
    end
  end
end

local prod = producer({"apple", "banana", "cherry"})
consumer(prod)`,
      hints: ['Producer yields items one at a time.', 'Consumer resumes until the coroutine is dead.', 'Check both ok and item for validity.'],
      concepts: ['coroutines', 'producer-consumer'],
    },
    {
      id: 'lua-coroutines-9',
      title: 'Write a Flatten Generator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function flatten(t) that uses coroutines to yield all values from nested arrays.',
      skeleton: `-- Write function flatten(t) using coroutines`,
      solution: `local function flatten(t)
  return coroutine.wrap(function()
    local function visit(tbl)
      for _, v in ipairs(tbl) do
        if type(v) == "table" then
          visit(v)
        else
          coroutine.yield(v)
        end
      end
    end
    visit(t)
  end)
end

for v in flatten({1, {2, 3}, {4, {5, 6}}}) do
  print(v) -- 1, 2, 3, 4, 5, 6
end`,
      hints: ['Use recursion to handle nested tables.', 'Yield non-table values.', 'Recurse into table values.'],
      concepts: ['coroutines', 'recursion', 'flatten'],
    },
    {
      id: 'lua-coroutines-10',
      title: 'Write a Coroutine Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a pipeline where one coroutine generates numbers, another doubles them, and the results are printed.',
      skeleton: `-- Write a two-stage coroutine pipeline`,
      solution: `local function generate(n)
  return coroutine.wrap(function()
    for i = 1, n do
      coroutine.yield(i)
    end
  end)
end

local function transform(source, fn)
  return coroutine.wrap(function()
    for val in source do
      coroutine.yield(fn(val))
    end
  end)
end

local nums = generate(5)
local doubled = transform(nums, function(x) return x * 2 end)
for v in doubled do
  print(v) -- 2, 4, 6, 8, 10
end`,
      hints: ['First coroutine generates values.', 'Second coroutine consumes and transforms.', 'Chain them as iterators.'],
      concepts: ['coroutines', 'pipeline'],
    },
    {
      id: 'lua-coroutines-11',
      title: 'Write a Permutation Generator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function permutations(t) that yields all permutations of an array using coroutines.',
      skeleton: `-- Write function permutations(t) using coroutines`,
      solution: `local function permutations(t)
  return coroutine.wrap(function()
    local function permute(arr, n)
      if n <= 1 then
        coroutine.yield(arr)
      else
        for i = 1, n do
          arr[i], arr[n] = arr[n], arr[i]
          permute(arr, n - 1)
          arr[i], arr[n] = arr[n], arr[i]
        end
      end
    end
    local copy = {}
    for i, v in ipairs(t) do copy[i] = v end
    permute(copy, #copy)
  end)
end

for p in permutations({1, 2, 3}) do
  print(table.concat(p, ","))
end`,
      hints: ['Use Heap algorithm for permutations.', 'Yield a copy of the current arrangement.', 'Swap elements and recurse.'],
      concepts: ['coroutines', 'permutations'],
    },
    {
      id: 'lua-coroutines-12',
      title: 'Write a Scheduler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple round-robin scheduler for multiple coroutines.',
      skeleton: `-- Write a simple scheduler that runs coroutines in round-robin`,
      solution: `local function scheduler(tasks)
  local coroutines = {}
  for i, task in ipairs(tasks) do
    coroutines[i] = coroutine.create(task)
  end
  while #coroutines > 0 do
    for i = #coroutines, 1, -1 do
      local ok = coroutine.resume(coroutines[i])
      if coroutine.status(coroutines[i]) == "dead" then
        table.remove(coroutines, i)
      end
    end
  end
end

scheduler({
  function() for i=1,2 do print("A"..i); coroutine.yield() end end,
  function() for i=1,3 do print("B"..i); coroutine.yield() end end,
})`,
      hints: ['Store tasks as coroutines in an array.', 'Resume each one in turn.', 'Remove dead coroutines.'],
      concepts: ['coroutines', 'scheduling'],
    },
    {
      id: 'lua-coroutines-13',
      title: 'Fix Dead Coroutine Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code that tries to resume a dead coroutine.',
      skeleton: `local co = coroutine.create(function()
  return 42
end)
coroutine.resume(co)
local ok, val = coroutine.resume(co) -- error!
print(val)`,
      solution: `local co = coroutine.create(function()
  return 42
end)
local ok, val = coroutine.resume(co)
print(val) -- 42`,
      hints: ['The coroutine completes on the first resume.', 'Resuming a dead coroutine returns false + error.', 'Capture the return value on the first resume.'],
      concepts: ['coroutine-status'],
    },
    {
      id: 'lua-coroutines-14',
      title: 'Fix Wrap Error Handling',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the wrapped coroutine that crashes instead of handling errors.',
      skeleton: `local gen = coroutine.wrap(function()
  error("oops!")
end)
local val = gen() -- crashes!
print("done")`,
      solution: `local co = coroutine.create(function()
  error("oops!")
end)
local ok, err = coroutine.resume(co)
if not ok then
  print("error: " .. err)
end
print("done")`,
      hints: ['coroutine.wrap propagates errors directly.', 'Use coroutine.create + resume for error handling.', 'resume returns false and the error message.'],
      concepts: ['coroutine-errors'],
    },
    {
      id: 'lua-coroutines-15',
      title: 'Fix Yield Outside Coroutine',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code that calls yield outside a coroutine context.',
      skeleton: `local function generate()
  for i = 1, 3 do
    coroutine.yield(i)
  end
end
generate() -- error: cannot yield from main thread`,
      solution: `local function generate()
  return coroutine.wrap(function()
    for i = 1, 3 do
      coroutine.yield(i)
    end
  end)
end

for v in generate() do
  print(v)
end`,
      hints: ['coroutine.yield only works inside a coroutine.', 'Wrap the function with coroutine.wrap.', 'Return the wrapped iterator.'],
      concepts: ['coroutine-yield'],
    },
    {
      id: 'lua-coroutines-16',
      title: 'Predict Resume Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local co = coroutine.create(function(x)
  local y = coroutine.yield(x * 2)
  return y + 1
end)
local _, a = coroutine.resume(co, 5)
local _, b = coroutine.resume(co, 10)
print(a, b)`,
      solution: `10\t11`,
      hints: ['First resume passes 5, yield returns 5*2=10.', 'Second resume sends 10, y=10, returns 10+1=11.', 'a=10, b=11.'],
      concepts: ['coroutine-communication'],
    },
    {
      id: 'lua-coroutines-17',
      title: 'Predict Wrap Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local f = coroutine.wrap(function()
  coroutine.yield("a")
  coroutine.yield("b")
  return "c"
end)
print(f())
print(f())
print(f())`,
      solution: `a
b
c`,
      hints: ['Each call to f resumes the coroutine.', 'First two yield "a" and "b".', 'Third returns "c" (the return value).'],
      concepts: ['coroutine-wrap'],
    },
    {
      id: 'lua-coroutines-18',
      title: 'Predict Status Sequence',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local co = coroutine.create(function()
  coroutine.yield()
end)
print(coroutine.status(co))
coroutine.resume(co)
print(coroutine.status(co))
coroutine.resume(co)
print(coroutine.status(co))`,
      solution: `suspended
suspended
dead`,
      hints: ['Before first resume: suspended.', 'After yield: suspended again.', 'After function returns: dead.'],
      concepts: ['coroutine-status'],
    },
    {
      id: 'lua-coroutines-19',
      title: 'Refactor Callback to Coroutine',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the callback-based iteration to use a coroutine generator.',
      skeleton: `local function forEach(t, callback)
  for i, v in ipairs(t) do
    callback(v)
  end
end
forEach({1, 2, 3}, function(v)
  print(v * 2)
end)`,
      solution: `local function iter(t)
  return coroutine.wrap(function()
    for _, v in ipairs(t) do
      coroutine.yield(v)
    end
  end)
end

for v in iter({1, 2, 3}) do
  print(v * 2)
end`,
      hints: ['Replace the callback with yields.', 'Use coroutine.wrap to create an iterator.', 'Consume with for..in.'],
      concepts: ['coroutines', 'refactoring'],
    },
    {
      id: 'lua-coroutines-20',
      title: 'Refactor State Machine to Coroutine',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor the explicit state machine into a coroutine.',
      skeleton: `local state = "start"
local function step()
  if state == "start" then
    print("starting")
    state = "middle"
  elseif state == "middle" then
    print("processing")
    state = "done"
  elseif state == "done" then
    print("finished")
    state = nil
  end
end
step(); step(); step()`,
      solution: `local machine = coroutine.wrap(function()
  print("starting")
  coroutine.yield()
  print("processing")
  coroutine.yield()
  print("finished")
end)
machine(); machine(); machine()`,
      hints: ['Each step becomes a section between yields.', 'The coroutine naturally progresses through states.', 'No explicit state variable needed.'],
      concepts: ['coroutines', 'state-machine', 'refactoring'],
    },
  ],
};
