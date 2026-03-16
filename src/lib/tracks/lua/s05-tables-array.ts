import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-arr',
  title: '05. Array Tables',
  explanation: `## Array Tables in Lua

Lua uses tables for everything, including arrays. Array-like tables use consecutive integer keys starting at 1.

### Creating Arrays
\`\`\`lua
local fruits = {"apple", "banana", "cherry"}
print(fruits[1])  -- "apple" (1-indexed!)
\`\`\`

### Length Operator
\`\`\`lua
print(#fruits)  -- 3
\`\`\`

### Modifying Arrays
\`\`\`lua
table.insert(t, val)      -- append to end
table.insert(t, pos, val) -- insert at position
table.remove(t, pos)      -- remove at position
table.remove(t)           -- remove last element
\`\`\`

### Iterating Arrays
\`\`\`lua
-- Numeric for
for i = 1, #fruits do
  print(fruits[i])
end

-- ipairs (array iterator)
for i, v in ipairs(fruits) do
  print(i, v)
end
\`\`\`

### Unpacking
\`\`\`lua
local a, b, c = table.unpack(fruits)
\`\`\`

**Important:** Lua arrays are 1-indexed, not 0-indexed.`,
  exercises: [
    {
      id: 'lua-arr-1',
      title: 'Create an Array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create an array with elements 10, 20, 30.',
      skeleton: `local nums = {___, ___, ___}
print(nums[1]) -- should print 10`,
      solution: `local nums = {10, 20, 30}
print(nums[1]) -- should print 10`,
      hints: ['Array elements are comma-separated.', 'Enclose them in curly braces.', '{10, 20, 30} creates an array.'],
      concepts: ['array-creation'],
    },
    {
      id: 'lua-arr-2',
      title: 'Array Length',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Get the length of the array.',
      skeleton: `local arr = {1, 2, 3, 4, 5}
print(___) -- should print 5`,
      solution: `local arr = {1, 2, 3, 4, 5}
print(#arr) -- should print 5`,
      hints: ['Use the # operator for array length.', '#arr returns the number of elements.', 'Place # before the table name.'],
      concepts: ['array-length'],
    },
    {
      id: 'lua-arr-3',
      title: 'Insert at End',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Append the value 4 to the array.',
      skeleton: `local arr = {1, 2, 3}
table.___(arr, 4)
print(arr[4]) -- should print 4`,
      solution: `local arr = {1, 2, 3}
table.insert(arr, 4)
print(arr[4]) -- should print 4`,
      hints: ['table.insert appends to the end.', 'table.insert(t, val) adds val at the end.', 'Fill in "insert".'],
      concepts: ['table-insert'],
    },
    {
      id: 'lua-arr-4',
      title: 'Remove Last Element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Remove the last element from the array.',
      skeleton: `local arr = {1, 2, 3}
local removed = table.___(arr)
print(removed, #arr) -- should print 3  2`,
      solution: `local arr = {1, 2, 3}
local removed = table.remove(arr)
print(removed, #arr) -- should print 3  2`,
      hints: ['table.remove without a position removes the last.', 'It returns the removed value.', 'Fill in "remove".'],
      concepts: ['table-remove'],
    },
    {
      id: 'lua-arr-5',
      title: 'Access by Index',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Access the second element of the array.',
      skeleton: `local colors = {"red", "green", "blue"}
print(colors[___]) -- should print "green"`,
      solution: `local colors = {"red", "green", "blue"}
print(colors[2]) -- should print "green"`,
      hints: ['Lua arrays are 1-indexed.', 'The second element is at index 2.', 'Replace the blank with 2.'],
      concepts: ['array-indexing'],
    },
    {
      id: 'lua-arr-6',
      title: 'Unpack Array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Unpack the array into three variables.',
      skeleton: `local arr = {10, 20, 30}
local a, b, c = table.___(arr)
print(a, b, c)`,
      solution: `local arr = {10, 20, 30}
local a, b, c = table.unpack(arr)
print(a, b, c)`,
      hints: ['table.unpack extracts all array elements.', 'It returns multiple values.', 'Fill in "unpack".'],
      concepts: ['table-unpack'],
    },
    {
      id: 'lua-arr-7',
      title: 'Write a Sum Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function sum(arr) that returns the sum of all elements in the array.',
      skeleton: `-- Write function sum(arr)`,
      solution: `local function sum(arr)
  local total = 0
  for i = 1, #arr do
    total = total + arr[i]
  end
  return total
end

print(sum({1, 2, 3, 4, 5})) -- 15`,
      hints: ['Loop from 1 to #arr.', 'Add each element to a running total.', 'Return the total.'],
      concepts: ['arrays', 'loops', 'functions'],
    },
    {
      id: 'lua-arr-8',
      title: 'Write a Reverse Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function reverse(arr) that returns a new array with elements in reverse order.',
      skeleton: `-- Write function reverse(arr)`,
      solution: `local function reverse(arr)
  local result = {}
  for i = #arr, 1, -1 do
    result[#result + 1] = arr[i]
  end
  return result
end

local r = reverse({1, 2, 3})
print(r[1], r[2], r[3]) -- 3 2 1`,
      hints: ['Loop from #arr down to 1 with step -1.', 'Append each element to a new table.', 'result[#result + 1] appends to the end.'],
      concepts: ['arrays', 'loops'],
    },
    {
      id: 'lua-arr-9',
      title: 'Write a Filter Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function filter(arr, fn) that returns a new array with elements where fn returns true.',
      skeleton: `-- Write function filter(arr, fn)`,
      solution: `local function filter(arr, fn)
  local result = {}
  for i = 1, #arr do
    if fn(arr[i]) then
      result[#result + 1] = arr[i]
    end
  end
  return result
end

local evens = filter({1, 2, 3, 4, 5, 6}, function(x) return x % 2 == 0 end)
print(evens[1], evens[2], evens[3]) -- 2 4 6`,
      hints: ['Iterate through the array.', 'Call fn(element) for each element.', 'Add to result if fn returns true.'],
      concepts: ['arrays', 'higher-order-functions'],
    },
    {
      id: 'lua-arr-10',
      title: 'Write a Map Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function map(arr, fn) that returns a new array with fn applied to each element.',
      skeleton: `-- Write function map(arr, fn)`,
      solution: `local function map(arr, fn)
  local result = {}
  for i = 1, #arr do
    result[i] = fn(arr[i])
  end
  return result
end

local doubled = map({1, 2, 3}, function(x) return x * 2 end)
print(doubled[1], doubled[2], doubled[3]) -- 2 4 6`,
      hints: ['Create a new result table.', 'Set result[i] = fn(arr[i]) for each index.', 'Return the result table.'],
      concepts: ['arrays', 'higher-order-functions'],
    },
    {
      id: 'lua-arr-11',
      title: 'Write a Contains Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function contains(arr, val) that returns true if val is in the array.',
      skeleton: `-- Write function contains(arr, val)`,
      solution: `local function contains(arr, val)
  for i = 1, #arr do
    if arr[i] == val then
      return true
    end
  end
  return false
end

print(contains({1, 2, 3}, 2))  -- true
print(contains({1, 2, 3}, 5))  -- false`,
      hints: ['Loop through the array.', 'Compare each element with val.', 'Return true immediately on match, false after the loop.'],
      concepts: ['arrays', 'linear-search'],
    },
    {
      id: 'lua-arr-12',
      title: 'Write a Concat Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write code that joins array elements into a string using table.concat with ", " separator.',
      skeleton: `-- Join {"a", "b", "c"} into "a, b, c"`,
      solution: `local arr = {"a", "b", "c"}
local result = table.concat(arr, ", ")
print(result) -- "a, b, c"`,
      hints: ['table.concat joins array elements.', 'Pass the separator as the second argument.', 'table.concat(arr, ", ") joins with commas.'],
      concepts: ['table-concat'],
    },
    {
      id: 'lua-arr-13',
      title: 'Fix Zero-Index Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code that tries to access index 0.',
      skeleton: `local arr = {"a", "b", "c"}
for i = 0, #arr - 1 do
  print(arr[i])
end`,
      solution: `local arr = {"a", "b", "c"}
for i = 1, #arr do
  print(arr[i])
end`,
      hints: ['Lua arrays start at index 1, not 0.', 'arr[0] is nil in a standard array.', 'Loop from 1 to #arr.'],
      concepts: ['array-indexing'],
    },
    {
      id: 'lua-arr-14',
      title: 'Fix Insert Position Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code to insert "b" between "a" and "c".',
      skeleton: `local arr = {"a", "c"}
table.insert(arr, "b")
print(arr[1], arr[2], arr[3]) -- should print a b c`,
      solution: `local arr = {"a", "c"}
table.insert(arr, 2, "b")
print(arr[1], arr[2], arr[3]) -- should print a b c`,
      hints: ['table.insert(t, val) appends to the end.', 'Use table.insert(t, pos, val) to insert at a position.', 'Insert at position 2 to place "b" between "a" and "c".'],
      concepts: ['table-insert'],
    },
    {
      id: 'lua-arr-15',
      title: 'Fix ipairs vs Loop Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the loop that skips elements due to removing during ipairs.',
      skeleton: `local arr = {1, 2, 3, 4, 5}
for i, v in ipairs(arr) do
  if v % 2 == 0 then
    table.remove(arr, i)
  end
end
-- arr should only contain odd numbers`,
      solution: `local arr = {1, 2, 3, 4, 5}
for i = #arr, 1, -1 do
  if arr[i] % 2 == 0 then
    table.remove(arr, i)
  end
end
-- arr now contains {1, 3, 5}`,
      hints: ['Never modify an array while iterating with ipairs.', 'Loop backwards to safely remove elements.', 'Use a numeric for loop from #arr down to 1.'],
      concepts: ['array-modification', 'ipairs'],
    },
    {
      id: 'lua-arr-16',
      title: 'Predict ipairs Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local arr = {10, 20, nil, 40}
for i, v in ipairs(arr) do
  print(i, v)
end`,
      solution: `1\t10
2\t20`,
      hints: ['ipairs stops at the first nil.', 'Element at index 3 is nil.', 'Only indices 1 and 2 are printed.'],
      concepts: ['ipairs', 'nil'],
    },
    {
      id: 'lua-arr-17',
      title: 'Predict Array Length',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local arr = {}
arr[1] = "a"
arr[2] = "b"
arr[5] = "e"
print(#arr)`,
      solution: `2`,
      hints: ['# returns the length of the sequence part.', 'A sequence must have no gaps.', 'Indices 1-2 are set; 3-4 are nil, so length is 2.'],
      concepts: ['array-length', 'sequences'],
    },
    {
      id: 'lua-arr-18',
      title: 'Predict table.remove Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local arr = {"a", "b", "c", "d"}
local val = table.remove(arr, 2)
print(val, arr[2], #arr)`,
      solution: `b\tc\t3`,
      hints: ['table.remove(arr, 2) removes and returns element at index 2.', 'Remaining elements shift down.', '"c" moves to index 2.'],
      concepts: ['table-remove'],
    },
    {
      id: 'lua-arr-19',
      title: 'Refactor Manual Append',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Refactor manual index tracking to use table.insert.',
      skeleton: `local arr = {}
local n = 0
n = n + 1; arr[n] = "a"
n = n + 1; arr[n] = "b"
n = n + 1; arr[n] = "c"
print(arr[1], arr[2], arr[3])`,
      solution: `local arr = {}
table.insert(arr, "a")
table.insert(arr, "b")
table.insert(arr, "c")
print(arr[1], arr[2], arr[3])`,
      hints: ['table.insert handles index tracking automatically.', 'table.insert(arr, val) appends to the end.', 'Remove the manual counter n.'],
      concepts: ['table-insert', 'refactoring'],
    },
    {
      id: 'lua-arr-20',
      title: 'Refactor Index Loop to ipairs',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Refactor the numeric for loop to use ipairs.',
      skeleton: `local fruits = {"apple", "banana", "cherry"}
for i = 1, #fruits do
  print(i, fruits[i])
end`,
      solution: `local fruits = {"apple", "banana", "cherry"}
for i, v in ipairs(fruits) do
  print(i, v)
end`,
      hints: ['ipairs provides both index and value.', 'for i, v in ipairs(t) is idiomatic.', 'Replace the numeric loop with ipairs.'],
      concepts: ['ipairs', 'refactoring'],
    },
  ],
};
