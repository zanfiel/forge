import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-tblmanip',
  title: '37. Table Manipulation',
  explanation: `## Table Manipulation in Lua

Beyond the \`table\` library, Lua tables support powerful manipulation patterns:

\`\`\`lua
-- Deep copy
function deepCopy(t)
  if type(t) ~= "table" then return t end
  local copy = {}
  for k, v in pairs(t) do
    copy[deepCopy(k)] = deepCopy(v)
  end
  return setmetatable(copy, getmetatable(t))
end

-- Merge tables
function merge(a, b)
  local result = {}
  for k, v in pairs(a) do result[k] = v end
  for k, v in pairs(b) do result[k] = v end
  return result
end

-- Filter
function filter(t, predicate)
  local result = {}
  for _, v in ipairs(t) do
    if predicate(v) then result[#result + 1] = v end
  end
  return result
end

-- Map
function map(t, fn)
  local result = {}
  for i, v in ipairs(t) do result[i] = fn(v, i) end
  return result
end

-- Reduce
function reduce(t, fn, init)
  local acc = init
  for _, v in ipairs(t) do acc = fn(acc, v) end
  return acc
end
\`\`\`

These patterns form the building blocks of functional data transformation in Lua.`,
  exercises: [
    {
      id: 'lua-tblmanip-1',
      title: 'Shallow Copy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a shallow copy of a table.',
      skeleton: `function shallowCopy(t)
  local copy = {}
  for k, v in ___(t) do
    copy[k] = v
  end
  return copy
end
local a = {1, 2, 3}
local b = shallowCopy(a)
print(a == b)    -- false (different tables)
print(b[2])      -- 2`,
      solution: `function shallowCopy(t)
  local copy = {}
  for k, v in pairs(t) do
    copy[k] = v
  end
  return copy
end
local a = {1, 2, 3}
local b = shallowCopy(a)
print(a == b)    -- false (different tables)
print(b[2])      -- 2`,
      hints: [
        'Use pairs() to iterate all keys including non-integer ones.',
        'Copy each key-value pair to the new table.',
        'Shallow copy does not recurse into nested tables.',
      ],
      concepts: ['table-manipulation', 'shallow-copy'],
    },
    {
      id: 'lua-tblmanip-2',
      title: 'Filter Evens',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Filter a table to keep only even numbers.',
      skeleton: `function filterEvens(t)
  local result = {}
  for _, v in ipairs(t) do
    if v % 2 ___ 0 then
      result[#result + 1] = v
    end
  end
  return result
end
local evens = filterEvens({1,2,3,4,5,6})
print(#evens)  -- 3`,
      solution: `function filterEvens(t)
  local result = {}
  for _, v in ipairs(t) do
    if v % 2 == 0 then
      result[#result + 1] = v
    end
  end
  return result
end
local evens = filterEvens({1,2,3,4,5,6})
print(#evens)  -- 3`,
      hints: [
        'v % 2 == 0 checks if v is even.',
        'Append matching elements to the result table.',
        'The result contains {2, 4, 6}.',
      ],
      concepts: ['table-manipulation', 'filter'],
    },
    {
      id: 'lua-tblmanip-3',
      title: 'Map Double',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Map a function over each element of a table.',
      skeleton: `function map(t, fn)
  local result = {}
  for i, v in ___(t) do
    result[i] = fn(v)
  end
  return result
end
local doubled = map({1,2,3}, function(x) return x * 2 end)
print(doubled[1], doubled[2], doubled[3])  -- 2, 4, 6`,
      solution: `function map(t, fn)
  local result = {}
  for i, v in ipairs(t) do
    result[i] = fn(v)
  end
  return result
end
local doubled = map({1,2,3}, function(x) return x * 2 end)
print(doubled[1], doubled[2], doubled[3])  -- 2, 4, 6`,
      hints: [
        'Use ipairs for sequence tables.',
        'Apply fn to each value and store at the same index.',
        'This preserves the table structure.',
      ],
      concepts: ['table-manipulation', 'map'],
    },
    {
      id: 'lua-tblmanip-4',
      title: 'Write Reduce',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement the reduce function for tables.',
      skeleton: `-- Write reduce(t, fn, init) that folds a table using fn.
-- fn(accumulator, value) returns the new accumulator.
-- Start with init as the accumulator.
-- Example: reduce({1,2,3}, function(a,b) return a+b end, 0) -> 6

-- YOUR CODE HERE`,
      solution: `function reduce(t, fn, init)
  local acc = init
  for _, v in ipairs(t) do
    acc = fn(acc, v)
  end
  return acc
end`,
      hints: [
        'Start with acc = init.',
        'For each element, update acc = fn(acc, v).',
        'Return the final accumulator.',
      ],
      concepts: ['table-manipulation', 'reduce'],
    },
    {
      id: 'lua-tblmanip-5',
      title: 'Predict Deep vs Shallow Copy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the difference between deep and shallow copy.',
      skeleton: `local inner = {1, 2, 3}
local original = {data = inner}

local shallow = {}
for k, v in pairs(original) do shallow[k] = v end

shallow.data[1] = 99
print(original.data[1])`,
      solution: `99`,
      hints: [
        'Shallow copy copies references, not the nested tables.',
        'shallow.data and original.data point to the same inner table.',
        'Modifying one affects the other.',
      ],
      concepts: ['table-manipulation', 'shallow-copy', 'references'],
    },
    {
      id: 'lua-tblmanip-6',
      title: 'Write Deep Copy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement a deep copy function that handles nested tables.',
      skeleton: `-- Write deepCopy(t) that recursively copies tables.
-- Non-table values are returned as-is.
-- Do not worry about metatables or circular references.

-- YOUR CODE HERE`,
      solution: `function deepCopy(t)
  if type(t) ~= "table" then return t end
  local copy = {}
  for k, v in pairs(t) do
    copy[deepCopy(k)] = deepCopy(v)
  end
  return copy
end`,
      hints: [
        'Check if the value is a table before recursing.',
        'Recursively copy both keys and values.',
        'Non-table values are returned directly.',
      ],
      concepts: ['table-manipulation', 'deep-copy', 'recursion'],
    },
    {
      id: 'lua-tblmanip-7',
      title: 'Write Merge Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that merges two tables, with the second overriding.',
      skeleton: `-- Write merge(a, b) that returns a new table containing
-- all key-value pairs from a, then all from b.
-- b's values override a's for duplicate keys.

-- YOUR CODE HERE`,
      solution: `function merge(a, b)
  local result = {}
  for k, v in pairs(a) do
    result[k] = v
  end
  for k, v in pairs(b) do
    result[k] = v
  end
  return result
end`,
      hints: [
        'Copy all of a first, then copy all of b.',
        'Since b is copied second, its values override a.',
        'Return a new table (do not modify a or b).',
      ],
      concepts: ['table-manipulation', 'merge'],
    },
    {
      id: 'lua-tblmanip-8',
      title: 'Fix Filter Modifying Original',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the filter that accidentally modifies the original table.',
      skeleton: `function removeOdds(t)
  for i = #t, 1, -1 do
    if t[i] % 2 ~= 0 then
      table.remove(t, i)  -- BUG: modifies original
    end
  end
  return t
end

local nums = {1, 2, 3, 4, 5}
local evens = removeOdds(nums)
print(#nums)   -- should still be 5, but it's 2!
print(#evens)  -- 2`,
      solution: `function removeOdds(t)
  local result = {}
  for _, v in ipairs(t) do
    if v % 2 == 0 then
      result[#result + 1] = v
    end
  end
  return result
end

local nums = {1, 2, 3, 4, 5}
local evens = removeOdds(nums)
print(#nums)   -- 5 (unchanged)
print(#evens)  -- 2`,
      hints: [
        'table.remove modifies the table in place.',
        'Create a new result table instead of modifying the input.',
        'This follows the non-destructive pattern.',
      ],
      concepts: ['table-manipulation', 'filter', 'debugging'],
    },
    {
      id: 'lua-tblmanip-9',
      title: 'Write Deep Merge',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a deep merge that recursively merges nested tables.',
      skeleton: `-- Write deepMerge(a, b) that:
-- For matching keys where both values are tables, merge recursively.
-- Otherwise b's value overrides a's.
-- Return a new table.

-- YOUR CODE HERE`,
      solution: `function deepMerge(a, b)
  local result = {}
  for k, v in pairs(a) do
    if type(v) == "table" then
      result[k] = deepMerge(v, {})
    else
      result[k] = v
    end
  end
  for k, v in pairs(b) do
    if type(v) == "table" and type(result[k]) == "table" then
      result[k] = deepMerge(result[k], v)
    else
      result[k] = v
    end
  end
  return result
end`,
      hints: [
        'First deep copy all of a into result.',
        'Then for each key in b, check if both are tables.',
        'If both are tables, recurse. Otherwise overwrite.',
      ],
      concepts: ['table-manipulation', 'deep-merge', 'recursion'],
    },
    {
      id: 'lua-tblmanip-10',
      title: 'Predict Map Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the result of mapping a string function over a table.',
      skeleton: `local names = {"alice", "bob", "charlie"}
local upper = {}
for i, v in ipairs(names) do
  upper[i] = string.upper(v)
end
print(upper[1])
print(upper[3])`,
      solution: `ALICE
CHARLIE`,
      hints: [
        'string.upper converts each string to uppercase.',
        'The map operation creates a new table with transformed values.',
        '"alice" becomes "ALICE", "charlie" becomes "CHARLIE".',
      ],
      concepts: ['table-manipulation', 'map'],
    },
    {
      id: 'lua-tblmanip-11',
      title: 'Write Flatten Deep',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a recursive flatten that handles arbitrary nesting.',
      skeleton: `-- Write flattenDeep(t) that recursively flattens nested tables.
-- Example: flattenDeep({1, {2, {3, 4}}, 5}) -> {1, 2, 3, 4, 5}

-- YOUR CODE HERE`,
      solution: `function flattenDeep(t)
  local result = {}
  local function flatten(tbl)
    for _, v in ipairs(tbl) do
      if type(v) == "table" then
        flatten(v)
      else
        result[#result + 1] = v
      end
    end
  end
  flatten(t)
  return result
end`,
      hints: [
        'Use a recursive helper function.',
        'If an element is a table, recurse into it.',
        'If it is not a table, append it to the result.',
      ],
      concepts: ['table-manipulation', 'flatten', 'recursion'],
    },
    {
      id: 'lua-tblmanip-12',
      title: 'Write GroupBy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a groupBy function that groups elements by a key function.',
      skeleton: `-- Write groupBy(t, fn) where fn(element) returns a group key.
-- Returns a table mapping keys to arrays of elements.
-- Example: groupBy({1,2,3,4,5}, function(x) return x%2 end)
--   -> {[0]={2,4}, [1]={1,3,5}}

-- YOUR CODE HERE`,
      solution: `function groupBy(t, fn)
  local groups = {}
  for _, v in ipairs(t) do
    local key = fn(v)
    if not groups[key] then
      groups[key] = {}
    end
    groups[key][#groups[key] + 1] = v
  end
  return groups
end`,
      hints: [
        'Call fn(v) to get the group key for each element.',
        'Create the group table if it does not exist yet.',
        'Append the element to its group.',
      ],
      concepts: ['table-manipulation', 'groupBy'],
    },
    {
      id: 'lua-tblmanip-13',
      title: 'Fix Reduce Initial Value',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the reduce that fails when the table is empty.',
      skeleton: `function reduce(t, fn, init)
  local acc = t[1]  -- BUG: ignores init, fails on empty table
  for i = 2, #t do
    acc = fn(acc, t[i])
  end
  return acc
end

local result = reduce({}, function(a, b) return a + b end, 0)
print(result)  -- should print 0, not nil`,
      solution: `function reduce(t, fn, init)
  local acc = init
  for _, v in ipairs(t) do
    acc = fn(acc, v)
  end
  return acc
end

local result = reduce({}, function(a, b) return a + b end, 0)
print(result)  -- 0`,
      hints: [
        'Always start with the provided init value.',
        'Loop from index 1 (not 2) when using init.',
        'An empty table should return init.',
      ],
      concepts: ['table-manipulation', 'reduce', 'debugging'],
    },
    {
      id: 'lua-tblmanip-14',
      title: 'Write Zip Tables',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that zips two arrays into a table of pairs.',
      skeleton: `-- Write zip(a, b) that returns a table of {a[i], b[i]} pairs.
-- Length is the minimum of #a and #b.
-- Example: zip({1,2,3}, {"a","b"}) -> {{1,"a"},{2,"b"}}

-- YOUR CODE HERE`,
      solution: `function zip(a, b)
  local result = {}
  local n = math.min(#a, #b)
  for i = 1, n do
    result[i] = {a[i], b[i]}
  end
  return result
end`,
      hints: [
        'Use math.min to find the shorter length.',
        'Create a pair table {a[i], b[i]} for each index.',
        'Store pairs in the result table.',
      ],
      concepts: ['table-manipulation', 'zip'],
    },
    {
      id: 'lua-tblmanip-15',
      title: 'Predict Reduce',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the result of a reduce operation.',
      skeleton: `local t = {"a", "b", "c"}
local acc = ""
for _, v in ipairs(t) do
  acc = acc .. v
end
print(acc)`,
      solution: `abc`,
      hints: [
        'The reduce concatenates all strings together.',
        'Starting with "", it becomes "a", then "ab", then "abc".',
        'String concatenation with .. joins them.',
      ],
      concepts: ['table-manipulation', 'reduce'],
    },
    {
      id: 'lua-tblmanip-16',
      title: 'Write Unique Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that removes duplicates from a table.',
      skeleton: `-- Write unique(t) that returns a new table with
-- duplicate values removed (keeping first occurrence).
-- Order should be preserved.

-- YOUR CODE HERE`,
      solution: `function unique(t)
  local seen = {}
  local result = {}
  for _, v in ipairs(t) do
    if not seen[v] then
      seen[v] = true
      result[#result + 1] = v
    end
  end
  return result
end`,
      hints: [
        'Use a "seen" table to track which values appeared.',
        'Only add to result if not already seen.',
        'This preserves the original order.',
      ],
      concepts: ['table-manipulation', 'unique', 'sets'],
    },
    {
      id: 'lua-tblmanip-17',
      title: 'Write MapKeys',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that transforms table keys while keeping values.',
      skeleton: `-- Write mapKeys(t, fn) that returns a new table where
-- each key is transformed by fn(key).
-- Example: mapKeys({a=1,b=2}, string.upper) -> {A=1,B=2}

-- YOUR CODE HERE`,
      solution: `function mapKeys(t, fn)
  local result = {}
  for k, v in pairs(t) do
    result[fn(k)] = v
  end
  return result
end`,
      hints: [
        'Use pairs to iterate all keys.',
        'Apply fn to each key, keep the value.',
        'Store with the transformed key in the result.',
      ],
      concepts: ['table-manipulation', 'mapKeys'],
    },
    {
      id: 'lua-tblmanip-18',
      title: 'Refactor Imperative to Functional',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor imperative table processing to use map/filter/reduce.',
      skeleton: `local data = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

-- Get sum of squares of even numbers
local sum = 0
for _, v in ipairs(data) do
  if v % 2 == 0 then
    sum = sum + v * v
  end
end
print(sum)  -- 220`,
      solution: `local function filter(t, pred)
  local r = {}
  for _, v in ipairs(t) do if pred(v) then r[#r+1] = v end end
  return r
end
local function map(t, fn)
  local r = {}
  for i, v in ipairs(t) do r[i] = fn(v) end
  return r
end
local function reduce(t, fn, init)
  local acc = init
  for _, v in ipairs(t) do acc = fn(acc, v) end
  return acc
end

local data = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
local evens = filter(data, function(x) return x % 2 == 0 end)
local squares = map(evens, function(x) return x * x end)
local sum = reduce(squares, function(a, b) return a + b end, 0)
print(sum)  -- 220`,
      hints: [
        'Break the operation into filter (evens), map (square), reduce (sum).',
        'Each step produces a new table.',
        'This is more readable and composable.',
      ],
      concepts: ['table-manipulation', 'functional', 'refactoring'],
    },
    {
      id: 'lua-tblmanip-19',
      title: 'Refactor Nested Loops to Flatten+Map',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor nested loop processing into flatten and map.',
      skeleton: `local matrix = {{1,2},{3,4},{5,6}}
local doubled = {}
for _, row in ipairs(matrix) do
  for _, val in ipairs(row) do
    doubled[#doubled + 1] = val * 2
  end
end
print(doubled[1], doubled[4], doubled[6])`,
      solution: `local function flatMap(t, fn)
  local result = {}
  for _, v in ipairs(t) do
    for _, mapped in ipairs(fn(v)) do
      result[#result + 1] = mapped
    end
  end
  return result
end

local matrix = {{1,2},{3,4},{5,6}}
local doubled = flatMap(matrix, function(row)
  local r = {}
  for i, v in ipairs(row) do r[i] = v * 2 end
  return r
end)
print(doubled[1], doubled[4], doubled[6])`,
      hints: [
        'flatMap combines map and flatten in one operation.',
        'The function returns a table for each element.',
        'All returned tables are concatenated into one.',
      ],
      concepts: ['table-manipulation', 'flatMap', 'refactoring'],
    },
    {
      id: 'lua-tblmanip-20',
      title: 'Write Table Diff',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that computes the difference between two tables.',
      skeleton: `-- Write diff(a, b) that returns a table describing differences:
-- { added = {keys in b not in a},
--   removed = {keys in a not in b},
--   changed = {keys where a[k] ~= b[k]} }

-- YOUR CODE HERE`,
      solution: `function diff(a, b)
  local result = { added = {}, removed = {}, changed = {} }
  for k, v in pairs(a) do
    if b[k] == nil then
      result.removed[#result.removed + 1] = k
    elseif b[k] ~= v then
      result.changed[#result.changed + 1] = k
    end
  end
  for k in pairs(b) do
    if a[k] == nil then
      result.added[#result.added + 1] = k
    end
  end
  return result
end`,
      hints: [
        'Iterate a to find removed and changed keys.',
        'Iterate b to find added keys.',
        'A key is changed if both tables have it but with different values.',
      ],
      concepts: ['table-manipulation', 'diff', 'algorithms'],
    },
  ],
};
