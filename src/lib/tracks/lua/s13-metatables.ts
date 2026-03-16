import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-meta',
  title: '13. Metatables',
  explanation: `## Metatables in Lua

Every table can have a **metatable** that defines how it behaves with certain operations. Metatables are Lua's mechanism for operator overloading and prototype-based inheritance.

### Setting/Getting Metatables
\`\`\`lua
local t = {}
local mt = {}
setmetatable(t, mt)
print(getmetatable(t) == mt) -- true
\`\`\`

### __index - Fallback for Missing Keys
\`\`\`lua
local defaults = {color = "red", size = 10}
local obj = setmetatable({}, {__index = defaults})
print(obj.color) -- "red" (from defaults)
print(obj.size)  -- 10
obj.color = "blue"
print(obj.color) -- "blue" (own field now)
\`\`\`

### __index as a Function
\`\`\`lua
local mt = {
  __index = function(t, key)
    return key .. " not found"
  end
}
\`\`\`

### __newindex - Intercept New Assignments
\`\`\`lua
local mt = {
  __newindex = function(t, key, value)
    print("setting " .. key)
    rawset(t, key, value)
  end
}
\`\`\`

### rawget / rawset
These bypass metatables entirely:
\`\`\`lua
rawget(t, key)        -- read without __index
rawset(t, key, value) -- write without __newindex
\`\`\``,
  exercises: [
    {
      id: 'lua-meta-1',
      title: 'Set a Metatable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Set a metatable on a table.',
      skeleton: `local t = {}
local mt = {}
___(t, mt)
print(getmetatable(t) == mt) -- true`,
      solution: `local t = {}
local mt = {}
setmetatable(t, mt)
print(getmetatable(t) == mt) -- true`,
      hints: ['setmetatable assigns a metatable to a table.', 'It takes the table and metatable as arguments.', 'Fill in "setmetatable".'],
      concepts: ['setmetatable'],
    },
    {
      id: 'lua-meta-2',
      title: 'Get a Metatable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Retrieve the metatable of a table.',
      skeleton: `local t = setmetatable({}, {})
local mt = ___(t)
print(type(mt)) -- "table"`,
      solution: `local t = setmetatable({}, {})
local mt = getmetatable(t)
print(type(mt)) -- "table"`,
      hints: ['getmetatable returns the metatable of a table.', 'Returns nil if no metatable is set.', 'Fill in "getmetatable".'],
      concepts: ['getmetatable'],
    },
    {
      id: 'lua-meta-3',
      title: '__index Table Fallback',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use __index to provide default values.',
      skeleton: `local defaults = {x = 0, y = 0}
local point = setmetatable({x = 5}, {___ = defaults})
print(point.x, point.y) -- 5  0`,
      solution: `local defaults = {x = 0, y = 0}
local point = setmetatable({x = 5}, {__index = defaults})
print(point.x, point.y) -- 5  0`,
      hints: ['__index is called for missing keys.', 'It can be a table to look up values in.', 'Fill in "__index".'],
      concepts: ['__index'],
    },
    {
      id: 'lua-meta-4',
      title: '__index Function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use __index as a function for computed fallbacks.',
      skeleton: `local t = setmetatable({}, {
  __index = function(self, key)
    return ___ .. " is undefined"
  end
})
print(t.foo) -- "foo is undefined"`,
      solution: `local t = setmetatable({}, {
  __index = function(self, key)
    return key .. " is undefined"
  end
})
print(t.foo) -- "foo is undefined"`,
      hints: ['The function receives the table and the missing key.', 'key contains the name of the missing field.', 'Fill in "key".'],
      concepts: ['__index-function'],
    },
    {
      id: 'lua-meta-5',
      title: 'rawset Usage',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use rawset to bypass __newindex.',
      skeleton: `local t = setmetatable({}, {
  __newindex = function(self, key, val)
    ___(self, key, val * 2)
  end
})
t.x = 5
print(t.x) -- should print 10`,
      solution: `local t = setmetatable({}, {
  __newindex = function(self, key, val)
    rawset(self, key, val * 2)
  end
})
t.x = 5
print(t.x) -- should print 10`,
      hints: ['rawset writes directly without triggering __newindex.', 'Without it, setting self[key] would recurse infinitely.', 'Fill in "rawset".'],
      concepts: ['rawset', '__newindex'],
    },
    {
      id: 'lua-meta-6',
      title: 'Chained Metatable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Chain __index through multiple tables.',
      skeleton: `local base = {greet = function() return "hello" end}
local mid = setmetatable({}, {__index = ___})
local obj = setmetatable({}, {__index = mid})
print(obj.greet()) -- "hello"`,
      solution: `local base = {greet = function() return "hello" end}
local mid = setmetatable({}, {__index = base})
local obj = setmetatable({}, {__index = mid})
print(obj.greet()) -- "hello"`,
      hints: ['__index chains: obj -> mid -> base.', 'mid looks up missing keys in base.', 'Fill in "base".'],
      concepts: ['__index-chaining'],
    },
    {
      id: 'lua-meta-7',
      title: 'Write a Read-Only Table',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function readOnly(t) that returns a table that errors on write attempts.',
      skeleton: `-- Write function readOnly(t)`,
      solution: `local function readOnly(t)
  return setmetatable({}, {
    __index = t,
    __newindex = function()
      error("attempt to modify read-only table")
    end,
  })
end

local config = readOnly({host = "localhost", port = 8080})
print(config.host) -- "localhost"
-- config.host = "x" would error`,
      hints: ['Use __index to delegate reads to t.', 'Use __newindex to block writes.', 'Wrap in a proxy table.'],
      concepts: ['__newindex', '__index', 'read-only'],
    },
    {
      id: 'lua-meta-8',
      title: 'Write a Default Table',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function defaultTable(default) that creates a table returning default for any missing key.',
      skeleton: `-- Write function defaultTable(default)`,
      solution: `local function defaultTable(default)
  return setmetatable({}, {
    __index = function()
      return default
    end,
  })
end

local t = defaultTable(0)
print(t.anything) -- 0
t.x = 5
print(t.x) -- 5
print(t.y) -- 0`,
      hints: ['Use __index as a function that returns the default.', 'The function ignores the key and always returns default.', 'Existing keys bypass __index.'],
      concepts: ['__index-function', 'default-values'],
    },
    {
      id: 'lua-meta-9',
      title: 'Write a Proxy Logger',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function logProxy(t) that logs all reads and writes to the table.',
      skeleton: `-- Write function logProxy(t)`,
      solution: `local function logProxy(t)
  return setmetatable({}, {
    __index = function(_, key)
      print("READ: " .. tostring(key))
      return t[key]
    end,
    __newindex = function(_, key, val)
      print("WRITE: " .. tostring(key) .. " = " .. tostring(val))
      t[key] = val
    end,
  })
end

local data = {x = 1}
local p = logProxy(data)
print(p.x)  -- logs READ, returns 1
p.y = 2     -- logs WRITE`,
      hints: ['Use both __index and __newindex.', 'Read from/write to the original table t.', 'Print log messages for each operation.'],
      concepts: ['proxy-pattern', '__index', '__newindex'],
    },
    {
      id: 'lua-meta-10',
      title: 'Write an Auto-Vivification Table',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function autoTable() that automatically creates nested tables on access.',
      skeleton: `-- Write function autoTable()`,
      solution: `local function autoTable()
  return setmetatable({}, {
    __index = function(self, key)
      local child = autoTable()
      rawset(self, key, child)
      return child
    end,
  })
end

local t = autoTable()
t.a.b.c = 42
print(t.a.b.c) -- 42`,
      hints: ['__index creates a new autoTable for missing keys.', 'Use rawset to store it without triggering __newindex.', 'Each child is also an autoTable.'],
      concepts: ['auto-vivification', '__index'],
    },
    {
      id: 'lua-meta-11',
      title: 'Write a Type-Checked Table',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function typedTable(schema) where schema maps keys to type names, and the table rejects values of wrong types.',
      skeleton: `-- Write function typedTable(schema)`,
      solution: `local function typedTable(schema)
  local data = {}
  return setmetatable({}, {
    __newindex = function(_, key, val)
      local expected = schema[key]
      if expected and type(val) ~= expected then
        error(key .. " must be " .. expected .. ", got " .. type(val))
      end
      data[key] = val
    end,
    __index = data,
  })
end

local t = typedTable({name = "string", age = "number"})
t.name = "Alice"  -- ok
t.age = 30        -- ok
-- t.age = "old"  -- would error`,
      hints: ['Use __newindex to validate types before storing.', 'Check the schema for the expected type.', 'Use a separate data table for storage.'],
      concepts: ['__newindex', 'validation'],
    },
    {
      id: 'lua-meta-12',
      title: 'Write __index Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write code demonstrating a three-level __index chain: child -> parent -> grandparent.',
      skeleton: `-- Create three-level __index chain`,
      solution: `local grandparent = {species = "human"}
local parent = setmetatable({name = "Bob"}, {__index = grandparent})
local child = setmetatable({age = 5}, {__index = parent})

print(child.age)     -- 5 (own)
print(child.name)    -- "Bob" (from parent)
print(child.species) -- "human" (from grandparent)`,
      hints: ['Each level uses __index to point to the level above.', 'Lookups chain until found or nil.', 'Own properties take priority.'],
      concepts: ['__index-chaining', 'inheritance'],
    },
    {
      id: 'lua-meta-13',
      title: 'Fix Infinite Recursion Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the __newindex that causes infinite recursion.',
      skeleton: `local t = setmetatable({}, {
  __newindex = function(self, key, val)
    print("setting " .. key)
    self[key] = val  -- infinite recursion!
  end
})
t.x = 10`,
      solution: `local t = setmetatable({}, {
  __newindex = function(self, key, val)
    print("setting " .. key)
    rawset(self, key, val)
  end
})
t.x = 10`,
      hints: ['self[key] = val triggers __newindex again.', 'Use rawset to bypass the metatable.', 'rawset(self, key, val) writes directly.'],
      concepts: ['rawset', '__newindex', 'recursion'],
    },
    {
      id: 'lua-meta-14',
      title: 'Fix Missing rawget Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code that cannot distinguish own keys from inherited ones.',
      skeleton: `local base = {x = 10}
local obj = setmetatable({}, {__index = base})
-- Check if obj has its OWN x field
if obj.x then
  print("obj has x") -- prints, but x is inherited!
end`,
      solution: `local base = {x = 10}
local obj = setmetatable({}, {__index = base})
if rawget(obj, "x") then
  print("obj has own x")
else
  print("x is inherited") -- correct
end`,
      hints: ['obj.x triggers __index and finds base.x.', 'Use rawget to check only the table itself.', 'rawget bypasses __index.'],
      concepts: ['rawget', '__index'],
    },
    {
      id: 'lua-meta-15',
      title: 'Fix Protected Metatable',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code so the metatable cannot be replaced by users.',
      skeleton: `local function makeSafe(t)
  return setmetatable(t, {
    __index = function(_, k) return "safe:" .. k end,
  })
end
local s = makeSafe({})
-- Problem: user can replace metatable
setmetatable(s, {})
print(s.test) -- nil instead of "safe:test"`,
      solution: `local function makeSafe(t)
  return setmetatable(t, {
    __index = function(_, k) return "safe:" .. k end,
    __metatable = "protected",
  })
end
local s = makeSafe({})
-- setmetatable(s, {}) -- would error now
print(s.test) -- "safe:test"`,
      hints: ['__metatable protects against getmetatable/setmetatable.', 'When set, getmetatable returns the __metatable value.', 'setmetatable will error on a protected table.'],
      concepts: ['__metatable'],
    },
    {
      id: 'lua-meta-16',
      title: 'Predict __index Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local t = setmetatable({a = 1}, {
  __index = {a = 99, b = 2}
})
print(t.a, t.b)`,
      solution: `1\t2`,
      hints: ['t.a exists in t itself, so __index is not called.', 't.b is missing, so __index finds b=2.', 'Own keys take priority.'],
      concepts: ['__index'],
    },
    {
      id: 'lua-meta-17',
      title: 'Predict __newindex Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local log = {}
local t = setmetatable({x = 1}, {
  __newindex = function(self, k, v)
    log[#log + 1] = k
    rawset(self, k, v)
  end
})
t.x = 10
t.y = 20
print(#log, t.x, t.y)`,
      solution: `1\t10\t20`,
      hints: ['t.x = 10 updates an existing key, no __newindex.', 't.y = 20 is a new key, triggers __newindex.', '__newindex only fires for new keys.'],
      concepts: ['__newindex'],
    },
    {
      id: 'lua-meta-18',
      title: 'Predict rawget Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local base = {x = 42}
local t = setmetatable({}, {__index = base})
print(t.x, rawget(t, "x"))`,
      solution: `42\tnil`,
      hints: ['t.x uses __index, finding 42 in base.', 'rawget(t, "x") bypasses __index.', 'x is not in t itself, so rawget returns nil.'],
      concepts: ['rawget', '__index'],
    },
    {
      id: 'lua-meta-19',
      title: 'Refactor Defaults to Metatable',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the manual default-value pattern to use a metatable.',
      skeleton: `local function getConfig(overrides)
  local config = {
    host = overrides.host or "localhost",
    port = overrides.port or 8080,
    debug = overrides.debug or false,
  }
  return config
end
local c = getConfig({port = 3000})
print(c.host, c.port, c.debug)`,
      solution: `local defaults = {host = "localhost", port = 8080, debug = false}

local function getConfig(overrides)
  return setmetatable(overrides or {}, {__index = defaults})
end

local c = getConfig({port = 3000})
print(c.host, c.port, c.debug)`,
      hints: ['Use __index to fall back to defaults.', 'overrides become the actual table.', 'Missing keys automatically resolve from defaults.'],
      concepts: ['__index', 'refactoring'],
    },
    {
      id: 'lua-meta-20',
      title: 'Refactor to Proxy Pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor direct table access into a proxy that validates field names.',
      skeleton: `local validFields = {name = true, age = true, email = true}
local person = {}

-- Manual validation everywhere
local function setPerson(key, val)
  if not validFields[key] then
    error("invalid field: " .. key)
  end
  person[key] = val
end
setPerson("name", "Alice")
print(person.name)`,
      solution: `local validFields = {name = true, age = true, email = true}

local function makeValidated()
  local data = {}
  return setmetatable({}, {
    __newindex = function(_, key, val)
      if not validFields[key] then
        error("invalid field: " .. key)
      end
      data[key] = val
    end,
    __index = data,
  })
end

local person = makeValidated()
person.name = "Alice"
print(person.name) -- "Alice"
-- person.foo = "x" -- would error`,
      hints: ['Use __newindex to validate on assignment.', 'Store actual data in a separate table.', 'Use __index to read from that table.'],
      concepts: ['proxy-pattern', 'refactoring'],
    },
  ],
};
