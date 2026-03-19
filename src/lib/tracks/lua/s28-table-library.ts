import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-tablelib',
  title: '28. Table Library',
  explanation: `## Table Library in Lua

The \`table\` library provides functions for manipulating sequence tables (arrays):

\`\`\`lua
-- table.insert: add elements
local t = {1, 2, 3}
table.insert(t, 4)       -- append: {1, 2, 3, 4}
table.insert(t, 2, 10)   -- insert at pos 2: {1, 10, 2, 3, 4}

-- table.remove: remove elements
table.remove(t, 2)       -- remove at pos 2, returns 10
table.remove(t)           -- remove last element

-- table.sort: sort in place
local nums = {3, 1, 4, 1, 5}
table.sort(nums)                    -- {1, 1, 3, 4, 5}
table.sort(nums, function(a, b)     -- descending
  return a > b
end)

-- table.concat: join elements
local words = {"hello", "world"}
print(table.concat(words, " "))     -- "hello world"

-- table.move (Lua 5.3+): copy elements between positions
local src = {1, 2, 3, 4, 5}
local dst = {}
table.move(src, 2, 4, 1, dst)  -- dst = {2, 3, 4}

-- table.pack/unpack
local packed = table.pack(10, 20, 30)  -- {10, 20, 30, n=3}
print(table.unpack(packed))            -- 10, 20, 30
\`\`\``,
  exercises: [
    {
      id: 'lua-tablelib-1',
      title: 'Append with table.insert',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use table.insert to append an element to a table.',
      skeleton: `local fruits = {"apple", "banana"}
table.___(fruits, "cherry")
print(fruits[3])  -- "cherry"`,
      solution: `local fruits = {"apple", "banana"}
table.insert(fruits, "cherry")
print(fruits[3])  -- "cherry"`,
      hints: [
        'table.insert with two arguments appends to the end.',
        'table.insert(t, value) adds value at position #t + 1.',
        'The table is modified in place.',
      ],
      concepts: ['table-library', 'insert'],
    },
    {
      id: 'lua-tablelib-2',
      title: 'Insert at Position',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use table.insert to add an element at a specific position.',
      skeleton: `local t = {"a", "c", "d"}
table.insert(t, ___, "b")
print(t[1], t[2], t[3], t[4])  -- a b c d`,
      solution: `local t = {"a", "c", "d"}
table.insert(t, 2, "b")
print(t[1], t[2], t[3], t[4])  -- a b c d`,
      hints: [
        'table.insert(t, pos, value) inserts at the given position.',
        'Existing elements shift right to make room.',
        '"b" should go at position 2.',
      ],
      concepts: ['table-library', 'insert'],
    },
    {
      id: 'lua-tablelib-3',
      title: 'Remove and Return',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use table.remove to remove and return an element.',
      skeleton: `local stack = {10, 20, 30}
local top = table.___(stack)
print(top)     -- 30
print(#stack)  -- 2`,
      solution: `local stack = {10, 20, 30}
local top = table.remove(stack)
print(top)     -- 30
print(#stack)  -- 2`,
      hints: [
        'table.remove without a position removes the last element.',
        'It returns the removed element.',
        'The table length decreases by 1.',
      ],
      concepts: ['table-library', 'remove'],
    },
    {
      id: 'lua-tablelib-4',
      title: 'Sort Numbers',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the result of table.sort.',
      skeleton: `local nums = {5, 3, 8, 1, 9, 2}
table.sort(nums)
print(nums[1], nums[2], nums[3])`,
      solution: `1	2	3`,
      hints: [
        'table.sort sorts in ascending order by default.',
        'The sort is done in place.',
        'The first three elements after sorting are 1, 2, 3.',
      ],
      concepts: ['table-library', 'sort'],
    },
    {
      id: 'lua-tablelib-5',
      title: 'Concat with Separator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Join table elements into a string with a separator.',
      skeleton: `local parts = {"2024", "01", "15"}
local date = table.___(parts, "-")
print(date)  -- "2024-01-15"`,
      solution: `local parts = {"2024", "01", "15"}
local date = table.concat(parts, "-")
print(date)  -- "2024-01-15"`,
      hints: [
        'table.concat joins sequence elements into a string.',
        'The second argument is the separator between elements.',
        'All elements must be strings or numbers.',
      ],
      concepts: ['table-library', 'concat'],
    },
    {
      id: 'lua-tablelib-6',
      title: 'Pack Varargs',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use table.pack to capture variable arguments.',
      skeleton: `function countArgs(...)
  local args = table.___(...)
  return args.n
end
print(countArgs(1, nil, 3))  -- 3`,
      solution: `function countArgs(...)
  local args = table.pack(...)
  return args.n
end
print(countArgs(1, nil, 3))  -- 3`,
      hints: [
        'table.pack creates a table from the arguments with an n field.',
        'The n field stores the total count including nils.',
        'This is more reliable than #t for tables with holes.',
      ],
      concepts: ['table-library', 'pack', 'varargs'],
    },
    {
      id: 'lua-tablelib-7',
      title: 'Custom Sort Comparator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that sorts a table of strings by their length.',
      skeleton: `-- Write sortByLength(t) that sorts the table in place
-- by string length (shortest first). For equal lengths,
-- sort alphabetically.

-- YOUR CODE HERE`,
      solution: `function sortByLength(t)
  table.sort(t, function(a, b)
    if #a == #b then
      return a < b
    end
    return #a < #b
  end)
end`,
      hints: [
        'Use table.sort with a custom comparator function.',
        'Compare #a and #b for lengths.',
        'When lengths are equal, fall back to alphabetical comparison.',
      ],
      concepts: ['table-library', 'sort', 'comparators'],
    },
    {
      id: 'lua-tablelib-8',
      title: 'Write Stack Using Table Library',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement a stack module using table.insert and table.remove.',
      skeleton: `-- Write three functions:
-- push(stack, value) - push value onto stack
-- pop(stack) - remove and return top value (nil if empty)
-- peek(stack) - return top value without removing (nil if empty)

-- YOUR CODE HERE`,
      solution: `function push(stack, value)
  table.insert(stack, value)
end

function pop(stack)
  if #stack == 0 then return nil end
  return table.remove(stack)
end

function peek(stack)
  if #stack == 0 then return nil end
  return stack[#stack]
end`,
      hints: [
        'table.insert(t, v) pushes to the end.',
        'table.remove(t) pops from the end.',
        'Check #stack == 0 before popping or peeking.',
      ],
      concepts: ['table-library', 'insert', 'remove', 'stack'],
    },
    {
      id: 'lua-tablelib-9',
      title: 'Predict table.move Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output after using table.move.',
      skeleton: `local src = {10, 20, 30, 40, 50}
local dst = {0, 0, 0}
table.move(src, 2, 4, 1, dst)
print(dst[1], dst[2], dst[3])`,
      solution: `20	30	40`,
      hints: [
        'table.move(src, f, e, t, dst) copies src[f..e] to dst starting at t.',
        'src[2]=20, src[3]=30, src[4]=40 are copied.',
        'They go to dst[1], dst[2], dst[3].',
      ],
      concepts: ['table-library', 'move'],
    },
    {
      id: 'lua-tablelib-10',
      title: 'Fix Sort Comparator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the sort comparator that causes an error.',
      skeleton: `local items = {
  {name = "banana", price = 2},
  {name = "apple", price = 1},
  {name = "cherry", price = 3},
}
table.sort(items, function(a, b)
  return a.price <= b.price  -- BUG
end)
print(items[1].name)  -- should print "apple"`,
      solution: `local items = {
  {name = "banana", price = 2},
  {name = "apple", price = 1},
  {name = "cherry", price = 3},
}
table.sort(items, function(a, b)
  return a.price < b.price  -- FIXED: strict less-than
end)
print(items[1].name)  -- should print "apple"`,
      hints: [
        'Lua sort comparators must use strict less-than (<), not <=.',
        'Using <= can cause an "invalid order function" error.',
        'The comparator must return false when elements are equal.',
      ],
      concepts: ['table-library', 'sort', 'debugging'],
    },
    {
      id: 'lua-tablelib-11',
      title: 'Write Flatten Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that flattens a nested table of sequences into a single sequence.',
      skeleton: `-- Write flatten(t) that takes a table of tables
-- (one level deep) and returns a single flat table.
-- Example: flatten({{1,2},{3},{4,5}}) -> {1,2,3,4,5}

-- YOUR CODE HERE`,
      solution: `function flatten(t)
  local result = {}
  for _, inner in ipairs(t) do
    if type(inner) == "table" then
      for _, v in ipairs(inner) do
        result[#result + 1] = v
      end
    else
      result[#result + 1] = inner
    end
  end
  return result
end`,
      hints: [
        'Iterate over the outer table with ipairs.',
        'For each inner table, iterate and append elements to result.',
        'Handle the case where an element is not a table.',
      ],
      concepts: ['table-library', 'sequences', 'iteration'],
    },
    {
      id: 'lua-tablelib-12',
      title: 'Fix table.concat Type Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the table.concat call that fails because of non-string elements.',
      skeleton: `local mixed = {1, "hello", true, 42}
local result = table.concat(mixed, ", ")
print(result)  -- should print "1, hello, true, 42"`,
      solution: `local mixed = {1, "hello", true, 42}
local strs = {}
for i, v in ipairs(mixed) do
  strs[i] = tostring(v)
end
local result = table.concat(strs, ", ")
print(result)  -- should print "1, hello, true, 42"`,
      hints: [
        'table.concat only works with strings and numbers.',
        'Boolean true will cause an error.',
        'Convert all elements to strings with tostring() first.',
      ],
      concepts: ['table-library', 'concat', 'debugging'],
    },
    {
      id: 'lua-tablelib-13',
      title: 'Write Queue Using Table Library',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement a queue with enqueue and dequeue using table functions.',
      skeleton: `-- Write two functions:
-- enqueue(q, value) - add to back of queue
-- dequeue(q) - remove and return front of queue (nil if empty)

-- YOUR CODE HERE`,
      solution: `function enqueue(q, value)
  table.insert(q, value)
end

function dequeue(q)
  if #q == 0 then return nil end
  return table.remove(q, 1)
end`,
      hints: [
        'table.insert(q, v) adds to the back.',
        'table.remove(q, 1) removes from the front.',
        'Check if the queue is empty before dequeuing.',
      ],
      concepts: ['table-library', 'insert', 'remove', 'queue'],
    },
    {
      id: 'lua-tablelib-14',
      title: 'Unpack with Range',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use table.unpack with start and end indices.',
      skeleton: `local t = {10, 20, 30, 40, 50}
local a, b, c = table.unpack(t, ___, ___)
print(a, b, c)  -- 20, 30, 40`,
      solution: `local t = {10, 20, 30, 40, 50}
local a, b, c = table.unpack(t, 2, 4)
print(a, b, c)  -- 20, 30, 40`,
      hints: [
        'table.unpack(t, i, j) returns t[i] through t[j].',
        'We want elements at positions 2, 3, and 4.',
        'Pass 2 as start and 4 as end.',
      ],
      concepts: ['table-library', 'unpack'],
    },
    {
      id: 'lua-tablelib-15',
      title: 'Predict Pack Fields',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict what table.pack stores.',
      skeleton: `local t = table.pack("a", nil, "c")
print(t.n)
print(t[1])
print(t[3])`,
      solution: `3
a
c`,
      hints: [
        'table.pack stores all arguments including nil.',
        'The .n field records the total argument count.',
        't[2] would be nil but t[1] and t[3] are set.',
      ],
      concepts: ['table-library', 'pack'],
    },
    {
      id: 'lua-tablelib-16',
      title: 'Write Chunk Splitter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that splits a table into chunks of a given size.',
      skeleton: `-- Write chunk(t, size) that returns a table of sub-tables,
-- each with at most 'size' elements.
-- Example: chunk({1,2,3,4,5}, 2) -> {{1,2},{3,4},{5}}

-- YOUR CODE HERE`,
      solution: `function chunk(t, size)
  local result = {}
  for i = 1, #t, size do
    local c = {}
    for j = i, math.min(i + size - 1, #t) do
      c[#c + 1] = t[j]
    end
    result[#result + 1] = c
  end
  return result
end`,
      hints: [
        'Use a step loop: for i = 1, #t, size.',
        'For each chunk, copy elements from i to i+size-1.',
        'Use math.min to handle the last chunk being smaller.',
      ],
      concepts: ['table-library', 'sequences', 'algorithms'],
    },
    {
      id: 'lua-tablelib-17',
      title: 'Refactor Manual Shifts to table.move',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor manual element shifting to use table.move.',
      skeleton: `-- Manual copy of elements from one table range to another
local src = {10, 20, 30, 40, 50}
local dst = {}
for i = 2, 4 do
  dst[i - 1] = src[i]
end
print(dst[1], dst[2], dst[3])`,
      solution: `local src = {10, 20, 30, 40, 50}
local dst = {}
table.move(src, 2, 4, 1, dst)
print(dst[1], dst[2], dst[3])`,
      hints: [
        'table.move(a1, f, e, t, a2) replaces manual copy loops.',
        'It copies a1[f..e] to a2 starting at position t.',
        'This is cleaner and more efficient than a manual loop.',
      ],
      concepts: ['table-library', 'move', 'refactoring'],
    },
    {
      id: 'lua-tablelib-18',
      title: 'Write Stable Sort Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a sort wrapper that preserves original order for equal elements.',
      skeleton: `-- Write stableSort(t, comp) that sorts t in place
-- using the comparator comp, but preserves original order
-- for elements where comp returns false in both directions.
-- Hint: decorate elements with their original index.

-- YOUR CODE HERE`,
      solution: `function stableSort(t, comp)
  local decorated = {}
  for i = 1, #t do
    decorated[i] = { value = t[i], index = i }
  end
  table.sort(decorated, function(a, b)
    if comp(a.value, b.value) then return true end
    if comp(b.value, a.value) then return false end
    return a.index < b.index
  end)
  for i = 1, #decorated do
    t[i] = decorated[i].value
  end
end`,
      hints: [
        'Decorate each element with its original index.',
        'In the comparator, break ties using the original index.',
        'After sorting, extract the values back into the original table.',
      ],
      concepts: ['table-library', 'sort', 'algorithms'],
    },
    {
      id: 'lua-tablelib-19',
      title: 'Refactor Repeated Inserts',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor repeated table.insert calls to a more efficient pattern.',
      skeleton: `local result = {}
table.insert(result, "header")
table.insert(result, "item1")
table.insert(result, "item2")
table.insert(result, "item3")
table.insert(result, "item4")
table.insert(result, "item5")
table.insert(result, "footer")
print(table.concat(result, ", "))`,
      solution: `local result = {}
local items = {"header", "item1", "item2", "item3", "item4", "item5", "footer"}
for _, v in ipairs(items) do
  result[#result + 1] = v
end
print(table.concat(result, ", "))`,
      hints: [
        'Replace repeated table.insert calls with a data-driven approach.',
        'Use t[#t + 1] = v instead of table.insert(t, v) for speed.',
        'Define the items as a list and iterate over them.',
      ],
      concepts: ['table-library', 'refactoring', 'performance'],
    },
    {
      id: 'lua-tablelib-20',
      title: 'Write Rotate Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that rotates table elements left by n positions.',
      skeleton: `-- Write rotate(t, n) that rotates elements left by n positions in place.
-- Example: rotate({1,2,3,4,5}, 2) -> {3,4,5,1,2}
-- Handle n > #t by using modulo.

-- YOUR CODE HERE`,
      solution: `function rotate(t, n)
  local len = #t
  if len == 0 then return end
  n = n % len
  if n == 0 then return end
  local temp = {}
  table.move(t, 1, n, 1, temp)
  table.move(t, n + 1, len, 1, t)
  table.move(temp, 1, n, len - n + 1, t)
end`,
      hints: [
        'Use modulo to handle n larger than the table length.',
        'Copy the first n elements to a temp table.',
        'Shift the remaining elements left, then append the saved ones.',
      ],
      concepts: ['table-library', 'move', 'algorithms'],
    },
  ],
};
