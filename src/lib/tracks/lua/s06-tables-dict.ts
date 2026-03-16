import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-dict',
  title: '06. Dictionary Tables',
  explanation: `## Dictionary Tables in Lua

Tables in Lua serve as dictionaries (hash maps) with arbitrary keys.

### Creating Dictionaries
\`\`\`lua
local person = {
  name = "Alice",
  age = 30,
  ["favorite color"] = "blue",  -- keys with spaces
}
\`\`\`

### Accessing Values
\`\`\`lua
print(person.name)              -- dot syntax
print(person["age"])            -- bracket syntax
print(person["favorite color"]) -- brackets required for spaces
\`\`\`

### Modifying
\`\`\`lua
person.email = "alice@example.com"  -- add field
person.age = 31                     -- update field
person.name = nil                   -- delete field
\`\`\`

### Iterating with pairs
\`\`\`lua
for key, value in pairs(person) do
  print(key, value)
end
\`\`\`

### Nested Tables
\`\`\`lua
local config = {
  db = { host = "localhost", port = 5432 },
  app = { name = "MyApp" },
}
print(config.db.host) -- "localhost"
\`\`\`

**Note:** \`pairs\` does not guarantee iteration order.`,
  exercises: [
    {
      id: 'lua-dict-1',
      title: 'Create a Dictionary',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a table with key "name" set to "Alice".',
      skeleton: `local person = {___ = "Alice"}
print(person.name)`,
      solution: `local person = {name = "Alice"}
print(person.name)`,
      hints: ['Use key = value syntax inside {}.', 'No quotes needed for simple keys.', 'name = "Alice" sets the name field.'],
      concepts: ['dictionary-creation'],
    },
    {
      id: 'lua-dict-2',
      title: 'Bracket Access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Access the "age" field using bracket syntax.',
      skeleton: `local person = {name = "Alice", age = 30}
print(person[___])`,
      solution: `local person = {name = "Alice", age = 30}
print(person["age"])`,
      hints: ['Bracket syntax uses a string key.', 'person["age"] is the same as person.age.', 'Put "age" (with quotes) in the brackets.'],
      concepts: ['bracket-access'],
    },
    {
      id: 'lua-dict-3',
      title: 'Add a Field',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Add an "email" field to the person table.',
      skeleton: `local person = {name = "Alice"}
person.___ = "alice@example.com"
print(person.email)`,
      solution: `local person = {name = "Alice"}
person.email = "alice@example.com"
print(person.email)`,
      hints: ['Assign to a new field using dot syntax.', 'person.email = value adds the field.', 'Fill in "email".'],
      concepts: ['dictionary-modification'],
    },
    {
      id: 'lua-dict-4',
      title: 'Delete a Field',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Remove the "age" field from the table.',
      skeleton: `local person = {name = "Alice", age = 30}
person.age = ___
print(person.age) -- should print nil`,
      solution: `local person = {name = "Alice", age = 30}
person.age = nil
print(person.age) -- should print nil`,
      hints: ['Setting a field to nil removes it.', 'person.age = nil deletes the field.', 'Replace the blank with nil.'],
      concepts: ['dictionary-deletion'],
    },
    {
      id: 'lua-dict-5',
      title: 'Iterate with pairs',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Iterate over all key-value pairs in the table.',
      skeleton: `local data = {x = 1, y = 2, z = 3}
for k, v in ___(data) do
  print(k, v)
end`,
      solution: `local data = {x = 1, y = 2, z = 3}
for k, v in pairs(data) do
  print(k, v)
end`,
      hints: ['pairs() iterates over all table entries.', 'It provides key and value.', 'Fill in "pairs".'],
      concepts: ['pairs'],
    },
    {
      id: 'lua-dict-6',
      title: 'Nested Table Access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Access the nested "host" value.',
      skeleton: `local config = {db = {host = "localhost", port = 5432}}
print(config.___.___)`,
      solution: `local config = {db = {host = "localhost", port = 5432}}
print(config.db.host)`,
      hints: ['Chain dot access for nested tables.', 'First access db, then host.', 'config.db.host navigates the nesting.'],
      concepts: ['nested-tables'],
    },
    {
      id: 'lua-dict-7',
      title: 'Write a Key Counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function countKeys(t) that returns the number of keys in a dictionary.',
      skeleton: `-- Write function countKeys(t)`,
      solution: `local function countKeys(t)
  local count = 0
  for _ in pairs(t) do
    count = count + 1
  end
  return count
end

print(countKeys({a = 1, b = 2, c = 3})) -- 3`,
      hints: ['Use pairs to iterate over all keys.', 'Increment a counter for each key.', 'Use _ for the unused variable.'],
      concepts: ['pairs', 'functions'],
    },
    {
      id: 'lua-dict-8',
      title: 'Write a Keys Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function keys(t) that returns an array of all keys in the table.',
      skeleton: `-- Write function keys(t)`,
      solution: `local function keys(t)
  local result = {}
  for k in pairs(t) do
    result[#result + 1] = k
  end
  return result
end

local k = keys({a = 1, b = 2, c = 3})
print(#k) -- 3`,
      hints: ['Iterate with pairs and collect keys.', 'Append each key to a result array.', 'result[#result + 1] = k appends.'],
      concepts: ['pairs', 'arrays'],
    },
    {
      id: 'lua-dict-9',
      title: 'Write a Merge Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function merge(t1, t2) that returns a new table with all keys from both (t2 overrides t1).',
      skeleton: `-- Write function merge(t1, t2)`,
      solution: `local function merge(t1, t2)
  local result = {}
  for k, v in pairs(t1) do
    result[k] = v
  end
  for k, v in pairs(t2) do
    result[k] = v
  end
  return result
end

local m = merge({a = 1, b = 2}, {b = 3, c = 4})
print(m.a, m.b, m.c) -- 1 3 4`,
      hints: ['Copy all keys from t1 first.', 'Then copy from t2 (overrides duplicates).', 'Create and return a new table.'],
      concepts: ['pairs', 'dictionary-merge'],
    },
    {
      id: 'lua-dict-10',
      title: 'Write a Deep Copy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function deepCopy(t) that recursively copies a table.',
      skeleton: `-- Write function deepCopy(t)`,
      solution: `local function deepCopy(t)
  if type(t) ~= "table" then
    return t
  end
  local copy = {}
  for k, v in pairs(t) do
    copy[k] = deepCopy(v)
  end
  return copy
end

local orig = {a = {x = 1}}
local copy = deepCopy(orig)
copy.a.x = 99
print(orig.a.x) -- 1 (unchanged)`,
      hints: ['Check if the value is a table.', 'If it is, recursively copy it.', 'Otherwise, return the value directly.'],
      concepts: ['recursion', 'deep-copy'],
    },
    {
      id: 'lua-dict-11',
      title: 'Write a hasKey Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function hasKey(t, key) that returns true if key exists in the table.',
      skeleton: `-- Write function hasKey(t, key)`,
      solution: `local function hasKey(t, key)
  return t[key] ~= nil
end

print(hasKey({a = 1, b = 2}, "a")) -- true
print(hasKey({a = 1, b = 2}, "c")) -- false`,
      hints: ['A key exists if its value is not nil.', 't[key] ~= nil checks for existence.', 'This also works for false values.'],
      concepts: ['dictionary-access', 'nil-check'],
    },
    {
      id: 'lua-dict-12',
      title: 'Write an Invert Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function invert(t) that swaps keys and values.',
      skeleton: `-- Write function invert(t)`,
      solution: `local function invert(t)
  local result = {}
  for k, v in pairs(t) do
    result[v] = k
  end
  return result
end

local inv = invert({a = 1, b = 2, c = 3})
print(inv[1], inv[2], inv[3]) -- a b c`,
      hints: ['Create a new table.', 'For each key-value pair, make result[value] = key.', 'The values become keys and vice versa.'],
      concepts: ['pairs', 'dictionary-manipulation'],
    },
    {
      id: 'lua-dict-13',
      title: 'Fix Dot vs Bracket Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code to access a key with a space.',
      skeleton: `local t = {["first name"] = "Alice"}
print(t.first name) -- should print "Alice"`,
      solution: `local t = {["first name"] = "Alice"}
print(t["first name"]) -- should print "Alice"`,
      hints: ['Dot syntax cannot handle keys with spaces.', 'Use bracket syntax for special keys.', 't["first name"] works correctly.'],
      concepts: ['bracket-access', 'dot-access'],
    },
    {
      id: 'lua-dict-14',
      title: 'Fix Variable Key Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code that uses a variable as a key.',
      skeleton: `local key = "name"
local person = {name = "Alice"}
print(person.key) -- should print "Alice"`,
      solution: `local key = "name"
local person = {name = "Alice"}
print(person[key]) -- should print "Alice"`,
      hints: ['person.key looks for a literal "key" field.', 'Use bracket syntax to use a variable as key.', 'person[key] evaluates the variable.'],
      concepts: ['bracket-access', 'dynamic-keys'],
    },
    {
      id: 'lua-dict-15',
      title: 'Fix Shallow Copy Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code so modifying the copy does not affect the original.',
      skeleton: `local orig = {data = {1, 2, 3}}
local copy = {}
for k, v in pairs(orig) do
  copy[k] = v
end
copy.data[1] = 99
print(orig.data[1]) -- should still be 1`,
      solution: `local orig = {data = {1, 2, 3}}
local copy = {}
for k, v in pairs(orig) do
  if type(v) == "table" then
    copy[k] = {}
    for i, val in ipairs(v) do
      copy[k][i] = val
    end
  else
    copy[k] = v
  end
end
copy.data[1] = 99
print(orig.data[1]) -- still 1`,
      hints: ['The shallow copy shares nested table references.', 'Copy nested tables separately.', 'Check if the value is a table and copy it.'],
      concepts: ['shallow-copy', 'deep-copy'],
    },
    {
      id: 'lua-dict-16',
      title: 'Predict pairs Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict what type of value pairs returns for an array-like table.',
      skeleton: `local t = {10, 20, 30}
for k, v in pairs(t) do
  print(type(k))
  break
end`,
      solution: `number`,
      hints: ['Array tables have integer keys.', 'The keys are numbers: 1, 2, 3.', 'type(1) returns "number".'],
      concepts: ['pairs', 'array-keys'],
    },
    {
      id: 'lua-dict-17',
      title: 'Predict Missing Key',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output when accessing a missing key.',
      skeleton: `local t = {a = 1, b = 2}
print(t.c)`,
      solution: `nil`,
      hints: ['Accessing a missing key returns nil.', 'No error is thrown.', 't.c does not exist, so it is nil.'],
      concepts: ['nil', 'dictionary-access'],
    },
    {
      id: 'lua-dict-18',
      title: 'Predict Overwrite Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local t = {a = 1, a = 2}
print(t.a)`,
      solution: `2`,
      hints: ['Duplicate keys in a constructor take the last value.', 'The second a = 2 overwrites a = 1.', 't.a is 2.'],
      concepts: ['dictionary-creation'],
    },
    {
      id: 'lua-dict-19',
      title: 'Refactor If Chain to Table Lookup',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the if/elseif chain into a table lookup.',
      skeleton: `local function getDayName(n)
  if n == 1 then return "Monday"
  elseif n == 2 then return "Tuesday"
  elseif n == 3 then return "Wednesday"
  elseif n == 4 then return "Thursday"
  elseif n == 5 then return "Friday"
  else return "Unknown"
  end
end
print(getDayName(3))`,
      solution: `local dayNames = {
  [1] = "Monday",
  [2] = "Tuesday",
  [3] = "Wednesday",
  [4] = "Thursday",
  [5] = "Friday",
}

local function getDayName(n)
  return dayNames[n] or "Unknown"
end
print(getDayName(3))`,
      hints: ['Create a table mapping numbers to names.', 'Use table lookup instead of if chain.', 'Use "or" for the default value.'],
      concepts: ['table-lookup', 'refactoring'],
    },
    {
      id: 'lua-dict-20',
      title: 'Refactor Repeated Field Access',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor repeated deep access into a local reference.',
      skeleton: `local config = {db = {settings = {timeout = 30, retries = 3}}}
print(config.db.settings.timeout)
print(config.db.settings.retries)
print(config.db.settings.timeout + config.db.settings.retries)`,
      solution: `local config = {db = {settings = {timeout = 30, retries = 3}}}
local settings = config.db.settings
print(settings.timeout)
print(settings.retries)
print(settings.timeout + settings.retries)`,
      hints: ['Store the nested table in a local variable.', 'local settings = config.db.settings.', 'Use settings.timeout instead of the full path.'],
      concepts: ['refactoring', 'local-caching'],
    },
  ],
};
