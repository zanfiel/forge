import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-iter',
  title: '11. Iterators',
  explanation: `## Iterators in Lua

The generic \`for\` loop works with iterator functions. An iterator is a function that returns the next value each time it is called, and \`nil\` to signal completion.

### Generic For Protocol
\`\`\`lua
for var1, var2, ... in iterator_func, state, initial do
  -- body
end
\`\`\`

### ipairs - Array Iterator
\`\`\`lua
local t = {"a", "b", "c"}
for i, v in ipairs(t) do
  print(i, v) -- 1 a, 2 b, 3 c
end
\`\`\`

### pairs - Table Iterator
\`\`\`lua
local t = {x = 1, y = 2}
for k, v in pairs(t) do
  print(k, v) -- unordered
end
\`\`\`

### Stateless Iterators
\`\`\`lua
local function iter(t, i)
  i = i + 1
  if t[i] then return i, t[i] end
end

for i, v in iter, {"a","b","c"}, 0 do
  print(i, v)
end
\`\`\`

### Stateful Iterators (Closures)
\`\`\`lua
local function values(t)
  local i = 0
  return function()
    i = i + 1
    return t[i]
  end
end
for v in values({"x","y","z"}) do print(v) end
\`\`\``,
  exercises: [
    {
      id: 'lua-iter-1',
      title: 'Use ipairs',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Iterate over an array with ipairs.',
      skeleton: `local fruits = {"apple", "banana", "cherry"}
for i, v in ___(fruits) do
  print(i, v)
end`,
      solution: `local fruits = {"apple", "banana", "cherry"}
for i, v in ipairs(fruits) do
  print(i, v)
end`,
      hints: ['ipairs iterates over array part with index and value.', 'It stops at the first nil.', 'Fill in "ipairs".'],
      concepts: ['ipairs'],
    },
    {
      id: 'lua-iter-2',
      title: 'Use pairs',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Iterate over a dictionary with pairs.',
      skeleton: `local person = {name = "Alice", age = 30}
for k, v in ___(person) do
  print(k .. " = " .. tostring(v))
end`,
      solution: `local person = {name = "Alice", age = 30}
for k, v in pairs(person) do
  print(k .. " = " .. tostring(v))
end`,
      hints: ['pairs iterates over all key-value pairs.', 'Order is not guaranteed.', 'Fill in "pairs".'],
      concepts: ['pairs'],
    },
    {
      id: 'lua-iter-3',
      title: 'Iterator Return Nil',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the iterator to stop after 3 values.',
      skeleton: `local function countTo3()
  local i = 0
  return function()
    i = i + 1
    if i <= 3 then return i end
    return ___
  end
end
for v in countTo3() do print(v) end`,
      solution: `local function countTo3()
  local i = 0
  return function()
    i = i + 1
    if i <= 3 then return i end
    return nil
  end
end
for v in countTo3() do print(v) end`,
      hints: ['Iterators return nil to signal completion.', 'The generic for stops on nil.', 'Fill in "nil".'],
      concepts: ['iterators'],
    },
    {
      id: 'lua-iter-4',
      title: 'Stateless Iterator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Complete the stateless iterator call.',
      skeleton: `local function iter(t, i)
  i = i + 1
  if t[i] then return i, t[i] end
end
for i, v in iter, {"x", "y", "z"}, ___ do
  print(i, v)
end`,
      solution: `local function iter(t, i)
  i = i + 1
  if t[i] then return i, t[i] end
end
for i, v in iter, {"x", "y", "z"}, 0 do
  print(i, v)
end`,
      hints: ['The third value is the initial control variable.', 'Since iter increments i first, start at 0.', 'Fill in "0".'],
      concepts: ['stateless-iterators'],
    },
    {
      id: 'lua-iter-5',
      title: 'Ignore Index with _',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Iterate using ipairs but ignore the index.',
      skeleton: `local nums = {10, 20, 30}
for ___, v in ipairs(nums) do
  print(v)
end`,
      solution: `local nums = {10, 20, 30}
for _, v in ipairs(nums) do
  print(v)
end`,
      hints: ['Use _ as a throwaway variable name.', 'Convention for unused variables.', 'Fill in "_".'],
      concepts: ['underscore-convention'],
    },
    {
      id: 'lua-iter-6',
      title: 'Pairs Key Only',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Iterate over pairs collecting only keys.',
      skeleton: `local t = {a = 1, b = 2, c = 3}
local keys = {}
for k in ___(t) do
  keys[#keys + 1] = k
end`,
      solution: `local t = {a = 1, b = 2, c = 3}
local keys = {}
for k in pairs(t) do
  keys[#keys + 1] = k
end`,
      hints: ['You can use a single variable with pairs.', 'Only the key is captured when using one variable.', 'Fill in "pairs".'],
      concepts: ['pairs'],
    },
    {
      id: 'lua-iter-7',
      title: 'Write a Values Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function values(t) that returns an iterator over the array values only (no index).',
      skeleton: `-- Write function values(t)`,
      solution: `local function values(t)
  local i = 0
  return function()
    i = i + 1
    return t[i]
  end
end

for v in values({"a", "b", "c"}) do
  print(v)
end`,
      hints: ['Return a closure that increments an index.', 'Return t[i] each call.', 'Returns nil automatically when past the end.'],
      concepts: ['iterators', 'closures'],
    },
    {
      id: 'lua-iter-8',
      title: 'Write a Range Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function range(start, stop, step) that returns an iterator producing numbers from start to stop with given step.',
      skeleton: `-- Write function range(start, stop, step)`,
      solution: `local function range(start, stop, step)
  step = step or 1
  local current = start - step
  return function()
    current = current + step
    if current <= stop then return current end
  end
end

for v in range(2, 10, 3) do
  print(v) -- 2, 5, 8
end`,
      hints: ['Initialize current before the first value.', 'Increment by step each call.', 'Return nil when past stop.'],
      concepts: ['iterators', 'range'],
    },
    {
      id: 'lua-iter-9',
      title: 'Write a Filter Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function ifilter(t, predicate) that returns an iterator yielding only elements where predicate returns true.',
      skeleton: `-- Write function ifilter(t, predicate)`,
      solution: `local function ifilter(t, predicate)
  local i = 0
  return function()
    while true do
      i = i + 1
      if i > #t then return nil end
      if predicate(t[i]) then return t[i] end
    end
  end
end

for v in ifilter({1,2,3,4,5,6}, function(x) return x % 2 == 0 end) do
  print(v) -- 2, 4, 6
end`,
      hints: ['Skip elements that fail the predicate.', 'Use a while loop inside the iterator.', 'Return nil when past the end.'],
      concepts: ['iterators', 'filtering'],
    },
    {
      id: 'lua-iter-10',
      title: 'Write a Map Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function imap(t, fn) that returns an iterator yielding fn(element) for each element.',
      skeleton: `-- Write function imap(t, fn)`,
      solution: `local function imap(t, fn)
  local i = 0
  return function()
    i = i + 1
    if t[i] ~= nil then return fn(t[i]) end
  end
end

for v in imap({1, 2, 3}, function(x) return x * 10 end) do
  print(v) -- 10, 20, 30
end`,
      hints: ['Wrap each element with fn before returning.', 'Return nil when past the end.', 'Check if t[i] exists.'],
      concepts: ['iterators', 'mapping'],
    },
    {
      id: 'lua-iter-11',
      title: 'Write a Zip Iterator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function zip(t1, t2) that returns an iterator yielding pairs from both arrays.',
      skeleton: `-- Write function zip(t1, t2)`,
      solution: `local function zip(t1, t2)
  local i = 0
  local n = math.min(#t1, #t2)
  return function()
    i = i + 1
    if i <= n then return t1[i], t2[i] end
  end
end

for a, b in zip({"a","b","c"}, {1,2,3}) do
  print(a, b) -- a 1, b 2, c 3
end`,
      hints: ['Iterate up to the shorter array length.', 'Return elements from both arrays.', 'Use math.min for the limit.'],
      concepts: ['iterators', 'zip'],
    },
    {
      id: 'lua-iter-12',
      title: 'Write a Lines Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function lines(s) that returns an iterator yielding each line of a string.',
      skeleton: `-- Write function lines(s)`,
      solution: `local function lines(s)
  local pos = 1
  return function()
    if pos > #s then return nil end
    local start = pos
    local nl = string.find(s, "\n", pos, true)
    if nl then
      pos = nl + 1
      return string.sub(s, start, nl - 1)
    else
      pos = #s + 1
      return string.sub(s, start)
    end
  end
end

for line in lines("hello\nworld\nfoo") do
  print(line)
end`,
      hints: ['Track the current position in the string.', 'Find the next newline with string.find.', 'Return the substring between positions.'],
      concepts: ['iterators', 'string-processing'],
    },
    {
      id: 'lua-iter-13',
      title: 'Fix Iterator Off-by-One',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the iterator that skips the first element.',
      skeleton: `local function each(t)
  local i = 1
  return function()
    i = i + 1
    return t[i]
  end
end
for v in each({"a","b","c"}) do print(v) end
-- should print a, b, c`,
      solution: `local function each(t)
  local i = 0
  return function()
    i = i + 1
    return t[i]
  end
end
for v in each({"a","b","c"}) do print(v) end`,
      hints: ['The first call increments i to 2, skipping index 1.', 'Start i at 0 so the first increment goes to 1.', 'Change local i = 1 to local i = 0.'],
      concepts: ['iterators', 'off-by-one'],
    },
    {
      id: 'lua-iter-14',
      title: 'Fix Infinite Iterator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the iterator that never terminates.',
      skeleton: `local function countdown(n)
  return function()
    n = n - 1
    return n
  end
end
for v in countdown(3) do print(v) end
-- should print 2, 1, 0`,
      solution: `local function countdown(n)
  return function()
    if n < 0 then return nil end
    n = n - 1
    return n
  end
end
for v in countdown(3) do print(v) end`,
      hints: ['The iterator keeps returning negative numbers forever.', 'Check for the stop condition before decrementing.', 'Return nil when n would go below 0.'],
      concepts: ['iterators', 'termination'],
    },
    {
      id: 'lua-iter-15',
      title: 'Fix Shared State Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the iterator factory that shares state between calls.',
      skeleton: `local i = 0
local function counter(n)
  return function()
    i = i + 1
    if i <= n then return i end
  end
end
-- Two independent counters should work
for v in counter(2) do print("a", v) end
for v in counter(2) do print("b", v) end`,
      solution: `local function counter(n)
  local i = 0
  return function()
    i = i + 1
    if i <= n then return i end
  end
end
for v in counter(2) do print("a", v) end
for v in counter(2) do print("b", v) end`,
      hints: ['The variable i is shared between all iterators.', 'Move local i inside the factory function.', 'Each call creates its own i.'],
      concepts: ['closures', 'shared-state'],
    },
    {
      id: 'lua-iter-16',
      title: 'Predict ipairs with Nil',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local t = {1, 2, nil, 4, 5}
local count = 0
for _ in ipairs(t) do
  count = count + 1
end
print(count)`,
      solution: `2`,
      hints: ['ipairs stops at the first nil.', 'Element at index 3 is nil.', 'Only indices 1 and 2 are iterated.'],
      concepts: ['ipairs', 'nil'],
    },
    {
      id: 'lua-iter-17',
      title: 'Predict Iterator State',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local function twice(t)
  local i = 0
  return function()
    i = i + 1
    if t[i] then return t[i], t[i] end
  end
end
for a, b in twice({"x", "y"}) do
  print(a .. b)
end`,
      solution: `xx
yy`,
      hints: ['The iterator returns each element twice.', 'a and b both get the same value.', '"x".."x" = "xx", "y".."y" = "yy".'],
      concepts: ['iterators', 'multiple-returns'],
    },
    {
      id: 'lua-iter-18',
      title: 'Predict Stateless Iterator',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local function squares(max, x)
  x = x + 1
  if x * x <= max then return x, x * x end
end
for i, sq in squares, 20, 0 do
  print(i, sq)
end`,
      solution: `1\t1
2\t4
3\t9
4\t16`,
      hints: ['squares is called with state=20, control=0,1,2,...', 'It returns x and x*x while x*x <= 20.', '5*5=25 > 20, so it stops at 4.'],
      concepts: ['stateless-iterators'],
    },
    {
      id: 'lua-iter-19',
      title: 'Refactor Manual Loop to Iterator',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the manual while loop into a closure-based iterator.',
      skeleton: `local data = {3, 1, 4, 1, 5}
local i = 0
while true do
  i = i + 1
  if i > #data then break end
  if data[i] > 2 then
    print(data[i])
  end
end`,
      solution: `local function filtered(t, pred)
  local i = 0
  return function()
    while true do
      i = i + 1
      if i > #t then return nil end
      if pred(t[i]) then return t[i] end
    end
  end
end

for v in filtered({3, 1, 4, 1, 5}, function(x) return x > 2 end) do
  print(v)
end`,
      hints: ['Extract the loop logic into an iterator factory.', 'Pass the predicate as a parameter.', 'Use for..in to consume the iterator.'],
      concepts: ['refactoring', 'iterators'],
    },
    {
      id: 'lua-iter-20',
      title: 'Refactor ipairs to Stateless',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Rewrite the ipairs-style iteration as a stateless iterator (no closure).',
      skeleton: `local function myIpairs(t)
  local i = 0
  return function()
    i = i + 1
    if t[i] then return i, t[i] end
  end
end
for i, v in myIpairs({"a", "b", "c"}) do
  print(i, v)
end`,
      solution: `local function iter(t, i)
  i = i + 1
  local v = t[i]
  if v then return i, v end
end

local function myIpairs(t)
  return iter, t, 0
end

for i, v in myIpairs({"a", "b", "c"}) do
  print(i, v)
end`,
      hints: ['A stateless iterator returns: function, state, initial_control.', 'The function receives state and control as arguments.', 'No closure is needed.'],
      concepts: ['stateless-iterators', 'refactoring'],
    },
  ],
};
