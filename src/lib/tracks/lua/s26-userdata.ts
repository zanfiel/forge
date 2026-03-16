import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-udata',
  title: '26. Userdata',
  explanation: `## Userdata in Lua

Userdata is a special Lua type that allows C data to be stored in Lua variables. There are two kinds:

**Full userdata** is a block of memory managed by Lua's garbage collector. It is created from C code using \`lua_newuserdata\` and can have metatables attached.

**Light userdata** is simply a C pointer (\`void*\`) stored as a Lua value. It has no metatable and is not managed by the garbage collector.

\`\`\`lua
-- In pure Lua, we cannot create true userdata,
-- but we can check the type and work with values
-- returned from C libraries:
local f = io.open("test.txt", "w")
print(type(f))          -- "userdata"
print(io.type(f))       -- "file"

-- Userdata can have metatables set from C
-- that define behavior like __index, __gc, etc.
f:write("hello")        -- calls __index on the metatable
f:close()               -- calls close via metatable lookup
\`\`\`

Key points:
- \`type(ud)\` returns \`"userdata"\` for both full and light userdata
- Full userdata can have individual metatables
- Light userdata is compared by pointer value
- The \`__gc\` metamethod lets userdata clean up resources
- File handles (\`io.open\`) are the most common userdata in pure Lua`,
  exercises: [
    {
      id: 'lua-udata-1',
      title: 'Check Userdata Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use type() to check that a file handle is userdata.',
      skeleton: `local f = io.open("test.txt", "w")
local t = ___(f)
print(t)  -- "userdata"
f:close()
os.remove("test.txt")`,
      solution: `local f = io.open("test.txt", "w")
local t = type(f)
print(t)  -- "userdata"
f:close()
os.remove("test.txt")`,
      hints: [
        'The built-in function type() returns the type name as a string.',
        'File handles are full userdata in Lua.',
        'type(f) returns "userdata" for file handles.',
      ],
      concepts: ['userdata', 'type-checking'],
    },
    {
      id: 'lua-udata-2',
      title: 'Check File Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use io.type() to check whether a value is an open file.',
      skeleton: `local f = io.open("test.txt", "w")
local result = io.___(f)
print(result)  -- "file"
f:close()
print(io.type(f))  -- "closed file"
os.remove("test.txt")`,
      solution: `local f = io.open("test.txt", "w")
local result = io.type(f)
print(result)  -- "file"
f:close()
print(io.type(f))  -- "closed file"
os.remove("test.txt")`,
      hints: [
        'io.type() checks whether a value is a file handle.',
        'It returns "file" for open files, "closed file" for closed ones.',
        'For non-file values it returns nil.',
      ],
      concepts: ['userdata', 'io-type'],
    },
    {
      id: 'lua-udata-3',
      title: 'Userdata vs Table',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output of type checks on userdata and tables.',
      skeleton: `local f = io.open("test.txt", "w")
local t = {}
print(type(f) == type(t))
print(type(f))
f:close()
os.remove("test.txt")`,
      solution: `false
userdata`,
      hints: [
        'type(f) returns "userdata" for file handles.',
        'type({}) returns "table".',
        '"userdata" ~= "table" so the comparison is false.',
      ],
      concepts: ['userdata', 'type-checking'],
    },
    {
      id: 'lua-udata-4',
      title: 'Simulate Userdata with Metatables',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Create a function that simulates userdata-like behavior using a table with a restricted metatable.',
      skeleton: `-- Write a function createHandle(name) that returns a table
-- with a __index metatable providing :getName() and :close()
-- After close(), getName() should return "closed"

-- YOUR CODE HERE`,
      solution: `function createHandle(name)
  local closed = false
  local obj = {}
  local mt = {
    __index = {
      getName = function(self)
        if closed then return "closed" end
        return name
      end,
      close = function(self)
        closed = true
      end,
    },
    __metatable = "handle",
  }
  setmetatable(obj, mt)
  return obj
end`,
      hints: [
        'Use a closure variable to track the closed state.',
        'Set __metatable to protect the metatable from getmetatable.',
        'Methods go inside the __index table.',
      ],
      concepts: ['userdata', 'metatables', 'closures'],
    },
    {
      id: 'lua-udata-5',
      title: 'Protected Metatable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use __metatable to protect a userdata-like object from metatable access.',
      skeleton: `local obj = {}
local mt = {
  __index = { value = 42 },
  ___ = "protected",
}
setmetatable(obj, mt)
print(getmetatable(obj))  -- "protected"`,
      solution: `local obj = {}
local mt = {
  __index = { value = 42 },
  __metatable = "protected",
}
setmetatable(obj, mt)
print(getmetatable(obj))  -- "protected"`,
      hints: [
        'The __metatable field controls what getmetatable returns.',
        'When __metatable is set, setmetatable will also raise an error.',
        'This mimics how C userdata metatables are protected.',
      ],
      concepts: ['userdata', 'metatables', 'encapsulation'],
    },
    {
      id: 'lua-udata-6',
      title: 'Userdata Equality',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how userdata identity comparison works.',
      skeleton: `local f1 = io.open("test.txt", "w")
local f2 = f1
local f3 = io.open("test.txt", "r")
print(f1 == f2)
print(f1 == f3)
f1:close()
if f3 then f3:close() end
os.remove("test.txt")`,
      solution: `true
false`,
      hints: [
        'Userdata uses identity comparison by default.',
        'f2 is the same object as f1, so they are equal.',
        'f3 is a different file handle even though it opens the same file.',
      ],
      concepts: ['userdata', 'equality', 'identity'],
    },
    {
      id: 'lua-udata-7',
      title: 'Simulate __gc Finalizer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Create a resource wrapper that tracks cleanup using a __gc-like pattern with explicit close.',
      skeleton: `-- Write createResource(name, log) where log is a table.
-- The returned object has :use() which appends name.." used" to log,
-- and :close() which appends name.." closed" to log.
-- Calling :use() after close appends name.." error" to log.

-- YOUR CODE HERE`,
      solution: `function createResource(name, log)
  local closed = false
  local obj = {}
  local mt = {
    __index = {
      use = function(self)
        if closed then
          log[#log + 1] = name .. " error"
        else
          log[#log + 1] = name .. " used"
        end
      end,
      close = function(self)
        if not closed then
          closed = true
          log[#log + 1] = name .. " closed"
        end
      end,
    },
  }
  setmetatable(obj, mt)
  return obj
end`,
      hints: [
        'Use a closed boolean in a closure to track state.',
        'Append to the log table using log[#log + 1].',
        'Check the closed flag in both use and close methods.',
      ],
      concepts: ['userdata', 'finalization', 'resource-management'],
    },
    {
      id: 'lua-udata-8',
      title: 'Fix Metatable on Userdata Proxy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the bug in this userdata proxy that fails to call methods.',
      skeleton: `function createProxy(data)
  local obj = {}
  local mt = {
    index = {
      getData = function(self)
        return data
      end,
    },
  }
  setmetatable(obj, mt)
  return obj
end

local p = createProxy(42)
print(p:getData())  -- should print 42`,
      solution: `function createProxy(data)
  local obj = {}
  local mt = {
    __index = {
      getData = function(self)
        return data
      end,
    },
  }
  setmetatable(obj, mt)
  return obj
end

local p = createProxy(42)
print(p:getData())  -- should print 42`,
      hints: [
        'Metamethod names must start with double underscores.',
        'index should be __index.',
        'Without __index, method lookup will fail.',
      ],
      concepts: ['userdata', 'metatables', 'debugging'],
    },
    {
      id: 'lua-udata-9',
      title: 'Userdata tostring',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Add a __tostring metamethod to a userdata-like object.',
      skeleton: `local obj = { name = "MyHandle", id = 7 }
local mt = {
  ___ = function(self)
    return self.name .. "#" .. self.id
  end,
}
setmetatable(obj, mt)
print(tostring(obj))  -- "MyHandle#7"`,
      solution: `local obj = { name = "MyHandle", id = 7 }
local mt = {
  __tostring = function(self)
    return self.name .. "#" .. self.id
  end,
}
setmetatable(obj, mt)
print(tostring(obj))  -- "MyHandle#7"`,
      hints: [
        'The __tostring metamethod is called by tostring().',
        'It should return a string representation of the object.',
        'The metamethod name is __tostring.',
      ],
      concepts: ['userdata', 'metatables', 'tostring'],
    },
    {
      id: 'lua-udata-10',
      title: 'Type Registry Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement a type registry that associates metatables with type names, similar to luaL_newmetatable.',
      skeleton: `-- Write two functions:
-- registerType(name) - creates and stores a metatable for the given type name, returns it
-- checkType(obj, name) - returns true if obj's metatable matches the registered type

-- Store registry in a local table

-- YOUR CODE HERE`,
      solution: `local registry = {}

function registerType(name)
  local mt = { __type = name }
  registry[name] = mt
  return mt
end

function checkType(obj, name)
  local mt = getmetatable(obj)
  return mt ~= nil and mt == registry[name]
end`,
      hints: [
        'Use a local table as the registry to map names to metatables.',
        'registerType creates a metatable and stores it by name.',
        'checkType compares the object metatable with the registered one by identity.',
      ],
      concepts: ['userdata', 'type-registry', 'metatables'],
    },
    {
      id: 'lua-udata-11',
      title: 'Fix Missing Self Parameter',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the method call that fails because of incorrect function definition.',
      skeleton: `function createBuffer()
  local data = {}
  local obj = {}
  local mt = {
    __index = {
      add = function(value)
        data[#data + 1] = value
      end,
      getAll = function()
        return data
      end,
    },
  }
  setmetatable(obj, mt)
  return obj
end

local buf = createBuffer()
buf:add("hello")
buf:add("world")
local result = buf:getAll()
print(#result)  -- should print 2`,
      solution: `function createBuffer()
  local data = {}
  local obj = {}
  local mt = {
    __index = {
      add = function(self, value)
        data[#data + 1] = value
      end,
      getAll = function(self)
        return data
      end,
    },
  }
  setmetatable(obj, mt)
  return obj
end

local buf = createBuffer()
buf:add("hello")
buf:add("world")
local result = buf:getAll()
print(#result)  -- should print 2`,
      hints: [
        'The colon syntax buf:add("hello") passes buf as the first argument.',
        'Methods need self as the first parameter.',
        'Without self, "hello" becomes the self parameter and value is nil.',
      ],
      concepts: ['userdata', 'methods', 'self-parameter'],
    },
    {
      id: 'lua-udata-12',
      title: 'Immutable Userdata Proxy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Create an immutable proxy that prevents modification, like read-only userdata.',
      skeleton: `-- Write freeze(tbl) that returns a proxy table where:
-- Reading keys returns values from the original table
-- Writing any key raises an error via error()
-- The original table is not exposed

-- YOUR CODE HERE`,
      solution: `function freeze(tbl)
  local proxy = {}
  local mt = {
    __index = tbl,
    __newindex = function(self, key, value)
      error("attempt to modify read-only object")
    end,
    __metatable = "frozen",
  }
  setmetatable(proxy, mt)
  return proxy
end`,
      hints: [
        'Use __newindex to intercept writes and raise an error.',
        'Use __index pointing to the original table for reads.',
        'Set __metatable to prevent metatable tampering.',
      ],
      concepts: ['userdata', 'proxy', 'immutability'],
    },
    {
      id: 'lua-udata-13',
      title: 'Light Userdata Simulation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Simulate light userdata behavior using numeric IDs as handles.',
      skeleton: `-- Write a module with:
-- newHandle(name) - returns a numeric ID, stores name internally
-- getName(id) - returns the name for the given handle ID
-- release(id) - removes the handle

-- YOUR CODE HERE`,
      solution: `local handles = {}
local nextId = 1

function newHandle(name)
  local id = nextId
  nextId = nextId + 1
  handles[id] = name
  return id
end

function getName(id)
  return handles[id]
end

function release(id)
  handles[id] = nil
end`,
      hints: [
        'Light userdata is just a pointer - simulate with an integer ID.',
        'Store the data in a separate table keyed by ID.',
        'Increment a counter for each new handle.',
      ],
      concepts: ['userdata', 'light-userdata', 'handles'],
    },
    {
      id: 'lua-udata-14',
      title: 'Predict io.type Results',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output of io.type for various values.',
      skeleton: `print(io.type("hello"))
print(io.type(42))
print(io.type({}))`,
      solution: `nil
nil
nil`,
      hints: [
        'io.type returns nil for values that are not file handles.',
        'Only userdata file handles return "file" or "closed file".',
        'Strings, numbers, and tables are not file handles.',
      ],
      concepts: ['userdata', 'io-type'],
    },
    {
      id: 'lua-udata-15',
      title: 'Refactor to Method Syntax',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the dot-call style to proper colon method syntax.',
      skeleton: `local Counter = {}
Counter.__index = Counter

function Counter.new()
  local self = setmetatable({}, Counter)
  self.count = 0
  return self
end

function Counter.increment(self)
  self.count = self.count + 1
end

function Counter.getCount(self)
  return self.count
end

local c = Counter.new()
Counter.increment(c)
Counter.increment(c)
print(Counter.getCount(c))`,
      solution: `local Counter = {}
Counter.__index = Counter

function Counter:new()
  local self = setmetatable({}, Counter)
  self.count = 0
  return self
end

function Counter:increment()
  self.count = self.count + 1
end

function Counter:getCount()
  return self.count
end

local c = Counter:new()
c:increment()
c:increment()
print(c:getCount())`,
      hints: [
        'Replace function Counter.method(self) with function Counter:method().',
        'Replace Counter.method(obj) calls with obj:method().',
        'The colon syntax automatically handles the self parameter.',
      ],
      concepts: ['userdata', 'methods', 'colon-syntax'],
    },
    {
      id: 'lua-udata-16',
      title: 'Refactor Flat Functions to Object',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor procedural code into an object-oriented userdata-like pattern.',
      skeleton: `local data = {}
local size = 0

function stack_push(value)
  size = size + 1
  data[size] = value
end

function stack_pop()
  if size == 0 then return nil end
  local val = data[size]
  data[size] = nil
  size = size - 1
  return val
end

function stack_peek()
  return data[size]
end

function stack_size()
  return size
end

stack_push(10)
stack_push(20)
print(stack_peek())
print(stack_pop())
print(stack_size())`,
      solution: `local Stack = {}
Stack.__index = Stack

function Stack:new()
  return setmetatable({ data = {}, size = 0 }, Stack)
end

function Stack:push(value)
  self.size = self.size + 1
  self.data[self.size] = value
end

function Stack:pop()
  if self.size == 0 then return nil end
  local val = self.data[self.size]
  self.data[self.size] = nil
  self.size = self.size - 1
  return val
end

function Stack:peek()
  return self.data[self.size]
end

function Stack:getSize()
  return self.size
end

local s = Stack:new()
s:push(10)
s:push(20)
print(s:peek())
print(s:pop())
print(s:getSize())`,
      hints: [
        'Create a Stack table with __index pointing to itself.',
        'Move data and size into instance fields via self.',
        'Replace function stack_x(...) with Stack:x(...) methods.',
      ],
      concepts: ['userdata', 'refactoring', 'oop'],
    },
    {
      id: 'lua-udata-17',
      title: 'Typed Object with __type Field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Create an object with a custom __type field in its metatable for type identification.',
      skeleton: `local mt = {
  __type = "Vector",
  __index = {
    length = function(self)
      return math.sqrt(self.x^2 + self.y^2)
    end,
  },
}

local function isVector(obj)
  local m = ___(obj)
  return m ~= nil and m.___ == "Vector"
end

local v = setmetatable({x = 3, y = 4}, mt)
print(isVector(v))   -- true
print(isVector({}))  -- false`,
      solution: `local mt = {
  __type = "Vector",
  __index = {
    length = function(self)
      return math.sqrt(self.x^2 + self.y^2)
    end,
  },
}

local function isVector(obj)
  local m = getmetatable(obj)
  return m ~= nil and m.__type == "Vector"
end

local v = setmetatable({x = 3, y = 4}, mt)
print(isVector(v))   -- true
print(isVector({}))  -- false`,
      hints: [
        'Use getmetatable to retrieve an object metatable.',
        'Access the __type field on the metatable.',
        'Check that the metatable is not nil before accessing fields.',
      ],
      concepts: ['userdata', 'type-checking', 'metatables'],
    },
    {
      id: 'lua-udata-18',
      title: 'Write Userdata-like Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a complete userdata-like wrapper with __index, __tostring, __len, and __metatable.',
      skeleton: `-- Write createArray(...) that takes varargs and returns a
-- userdata-like object with:
-- __index: :get(i) returns element, :set(i,v) sets element
-- __len: returns count of elements
-- __tostring: returns "Array(n)" where n is the count
-- __metatable: "Array"

-- YOUR CODE HERE`,
      solution: `function createArray(...)
  local data = table.pack(...)
  local obj = {}
  local methods = {
    get = function(self, i)
      return data[i]
    end,
    set = function(self, i, v)
      data[i] = v
    end,
  }
  local mt = {
    __index = methods,
    __len = function()
      return data.n
    end,
    __tostring = function()
      return "Array(" .. data.n .. ")"
    end,
    __metatable = "Array",
  }
  setmetatable(obj, mt)
  return obj
end`,
      hints: [
        'Use table.pack to capture varargs with a .n field.',
        '__len should return data.n for the count.',
        'Put methods in a separate table referenced by __index.',
      ],
      concepts: ['userdata', 'metatables', 'encapsulation'],
    },
    {
      id: 'lua-udata-19',
      title: 'Fix __gc-like Cleanup',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Fix the resource cleanup pattern that does not properly track state.',
      skeleton: `function createFile(name, log)
  local obj = {}
  local mt = {
    __index = {
      write = function(self, text)
        log[#log + 1] = "write:" .. text
      end,
      close = function(self)
        log[#log + 1] = "close:" .. name
        closed = true
      end,
      isClosed = function(self)
        return closed
      end,
    },
  }
  setmetatable(obj, mt)
  return obj
end

local log = {}
local f = createFile("data.txt", log)
f:write("hello")
f:close()
print(f:isClosed())  -- should print true`,
      solution: `function createFile(name, log)
  local closed = false
  local obj = {}
  local mt = {
    __index = {
      write = function(self, text)
        log[#log + 1] = "write:" .. text
      end,
      close = function(self)
        log[#log + 1] = "close:" .. name
        closed = true
      end,
      isClosed = function(self)
        return closed
      end,
    },
  }
  setmetatable(obj, mt)
  return obj
end

local log = {}
local f = createFile("data.txt", log)
f:write("hello")
f:close()
print(f:isClosed())  -- should print true`,
      hints: [
        'The variable closed is used but never declared as local.',
        'Without local, closed becomes a global variable.',
        'Add local closed = false at the start of the function.',
      ],
      concepts: ['userdata', 'closures', 'debugging'],
    },
    {
      id: 'lua-udata-20',
      title: 'Fill in Metatable for Comparison',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Add __eq and __lt metamethods to enable comparison on userdata-like objects.',
      skeleton: `local function createScore(value)
  return setmetatable({ value = value }, {
    ___ = function(a, b)
      return a.value == b.value
    end,
    ___ = function(a, b)
      return a.value < b.value
    end,
  })
end

local s1 = createScore(10)
local s2 = createScore(20)
local s3 = createScore(10)
print(s1 == s3)  -- true
print(s1 < s2)   -- true`,
      solution: `local function createScore(value)
  return setmetatable({ value = value }, {
    __eq = function(a, b)
      return a.value == b.value
    end,
    __lt = function(a, b)
      return a.value < b.value
    end,
  })
end

local s1 = createScore(10)
local s2 = createScore(20)
local s3 = createScore(10)
print(s1 == s3)  -- true
print(s1 < s2)   -- true`,
      hints: [
        '__eq is called for the == operator.',
        '__lt is called for the < operator.',
        'Both metamethods receive two operands as arguments.',
      ],
      concepts: ['userdata', 'metatables', 'comparison'],
    },
  ],
};
