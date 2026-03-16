import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-pkg',
  title: '33. Package System',
  explanation: `## Package System in Lua

Lua's module system revolves around \`require\` and the \`package\` table:

\`\`\`lua
-- Loading modules
local json = require("json")       -- searches package.path
local lfs = require("lfs")         -- searches package.cpath for C modules

-- package.path: semicolon-separated patterns for Lua modules
print(package.path)
-- "./?.lua;./?/init.lua;/usr/local/share/lua/5.4/?.lua"

-- package.cpath: patterns for C/shared library modules
print(package.cpath)

-- package.loaded: cache of already loaded modules
print(package.loaded["string"])  -- the string library table

-- package.preload: table of loader functions
package.preload["mymod"] = function()
  return { greet = function() return "hello" end }
end
local m = require("mymod")  -- calls the preload function

-- package.searchers: list of search functions
-- Default: preload, Lua file, C loader, all-in-one loader

-- Creating a module
-- mymodule.lua:
local M = {}
function M.add(a, b) return a + b end
return M
\`\`\`

Key rules:
- \`require\` caches in \`package.loaded\` -- subsequent calls return cached value
- The \`?\` in path patterns is replaced with the module name
- Dots in module names become path separators: \`"a.b"\` searches for \`a/b.lua\``,
  exercises: [
    {
      id: 'lua-pkg-1',
      title: 'Basic Require',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use require to load the string library and verify it.',
      skeleton: `local str = ___("string")
print(type(str))          -- "table"
print(str.upper("hello")) -- "HELLO"`,
      solution: `local str = require("string")
print(type(str))          -- "table"
print(str.upper("hello")) -- "HELLO"`,
      hints: [
        'require loads a module by name and returns it.',
        'Built-in libraries like "string" are already in package.loaded.',
        'require always returns the cached module if already loaded.',
      ],
      concepts: ['package-system', 'require'],
    },
    {
      id: 'lua-pkg-2',
      title: 'Check package.loaded',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Access a module from the package.loaded cache.',
      skeleton: `local tbl = package.___["table"]
print(type(tbl))             -- "table"
print(type(tbl.insert))      -- "function"`,
      solution: `local tbl = package.loaded["table"]
print(type(tbl))             -- "table"
print(type(tbl.insert))      -- "function"`,
      hints: [
        'package.loaded is a table mapping module names to loaded modules.',
        'Standard libraries are pre-loaded.',
        'Access with package.loaded["modulename"].',
      ],
      concepts: ['package-system', 'loaded'],
    },
    {
      id: 'lua-pkg-3',
      title: 'Predict Require Caching',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict that require returns the same table object.',
      skeleton: `local a = require("table")
local b = require("table")
print(a == b)
print(rawequal(a, b))`,
      solution: `true
true`,
      hints: [
        'require caches modules in package.loaded.',
        'Subsequent require calls return the exact same table.',
        'rawequal confirms they are the same object.',
      ],
      concepts: ['package-system', 'caching'],
    },
    {
      id: 'lua-pkg-4',
      title: 'Write Module Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a Lua module that exports functions using the standard pattern.',
      skeleton: `-- Write a module (as if it were in a file) that creates
-- a local table M with functions:
-- M.add(a, b) - returns a + b
-- M.sub(a, b) - returns a - b
-- M.mul(a, b) - returns a * b
-- Store it in package.preload["calc"] then require it.

-- YOUR CODE HERE`,
      solution: `package.preload["calc"] = function()
  local M = {}
  function M.add(a, b) return a + b end
  function M.sub(a, b) return a - b end
  function M.mul(a, b) return a * b end
  return M
end

local calc = require("calc")
print(calc.add(2, 3))  -- 5`,
      hints: [
        'Lua modules return a table of exported functions.',
        'Use package.preload to register an in-memory module.',
        'The function should return the module table M.',
      ],
      concepts: ['package-system', 'module-pattern'],
    },
    {
      id: 'lua-pkg-5',
      title: 'Preload Module',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Register a module in package.preload.',
      skeleton: `package.___["greeter"] = function()
  return {
    hello = function(name) return "Hello, " .. name end
  }
end
local g = require("greeter")
print(g.hello("Lua"))  -- "Hello, Lua"`,
      solution: `package.preload["greeter"] = function()
  return {
    hello = function(name) return "Hello, " .. name end
  }
end
local g = require("greeter")
print(g.hello("Lua"))  -- "Hello, Lua"`,
      hints: [
        'package.preload holds loader functions indexed by module name.',
        'When require is called, it checks preload first.',
        'The loader function should return the module table.',
      ],
      concepts: ['package-system', 'preload'],
    },
    {
      id: 'lua-pkg-6',
      title: 'Module with Private State',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a module with private state using closures.',
      skeleton: `-- Register a "counter" module in package.preload that has:
-- .increment() - adds 1 to internal count
-- .decrement() - subtracts 1 from internal count
-- .getCount() - returns current count
-- The count variable should be private (local).

-- YOUR CODE HERE`,
      solution: `package.preload["counter"] = function()
  local count = 0
  local M = {}
  function M.increment()
    count = count + 1
  end
  function M.decrement()
    count = count - 1
  end
  function M.getCount()
    return count
  end
  return M
end`,
      hints: [
        'Local variables in the loader function are private.',
        'Only functions in M can access the local count.',
        'This is the standard Lua encapsulation pattern.',
      ],
      concepts: ['package-system', 'encapsulation', 'closures'],
    },
    {
      id: 'lua-pkg-7',
      title: 'Fix Module Return',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the module that returns nil instead of its table.',
      skeleton: `package.preload["mymath"] = function()
  local M = {}
  function M.square(x) return x * x end
  function M.cube(x) return x * x * x end
  -- BUG: forgot to return M
end

local mm = require("mymath")
print(mm.square(3))  -- should print 9`,
      solution: `package.preload["mymath"] = function()
  local M = {}
  function M.square(x) return x * x end
  function M.cube(x) return x * x * x end
  return M  -- FIXED: return the module table
end

package.loaded["mymath"] = nil  -- clear cache to re-require
local mm = require("mymath")
print(mm.square(3))  -- should print 9`,
      hints: [
        'A module loader must return its module table.',
        'Without return M, require gets nil.',
        'This is one of the most common module mistakes.',
      ],
      concepts: ['package-system', 'debugging'],
    },
    {
      id: 'lua-pkg-8',
      title: 'Predict Module Path Search',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how dots are transformed in module names.',
      skeleton: `local name = "foo.bar.baz"
local path = name:gsub("%.", "/")
print(path)`,
      solution: `foo/bar/baz`,
      hints: [
        'Lua replaces dots with path separators in module names.',
        'require("foo.bar.baz") searches for foo/bar/baz.lua.',
        'The gsub replaces each dot with a forward slash.',
      ],
      concepts: ['package-system', 'path'],
    },
    {
      id: 'lua-pkg-9',
      title: 'Force Module Reload',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Force a module to reload by clearing its cache entry.',
      skeleton: `package.preload["mymod"] = function()
  return { time = os.clock() }
end
local m1 = require("mymod")
package.___["mymod"] = nil
local m2 = require("mymod")
print(m1 == m2)  -- false (different tables)`,
      solution: `package.preload["mymod"] = function()
  return { time = os.clock() }
end
local m1 = require("mymod")
package.loaded["mymod"] = nil
local m2 = require("mymod")
print(m1 == m2)  -- false (different tables)`,
      hints: [
        'Setting package.loaded[name] to nil clears the cache.',
        'The next require call will reload the module.',
        'This is useful for testing and development.',
      ],
      concepts: ['package-system', 'loaded', 'reloading'],
    },
    {
      id: 'lua-pkg-10',
      title: 'Write Module Loader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a custom searcher function for the package system.',
      skeleton: `-- Write a custom searcher that checks a local registry table.
-- Add it to package.searchers.
-- The searcher should check a 'modules' table and return
-- the loader function if found.

local modules = {
  ["custom.hello"] = function()
    return { greet = function() return "hi" end }
  end,
}

-- YOUR CODE HERE`,
      solution: `local modules = {
  ["custom.hello"] = function()
    return { greet = function() return "hi" end }
  end,
}

local function customSearcher(name)
  local loader = modules[name]
  if loader then
    return loader
  end
  return nil, "not found in custom registry"
end

table.insert(package.searchers, 2, customSearcher)`,
      hints: [
        'A searcher function takes a module name and returns a loader or nil.',
        'If found, return the loader function.',
        'If not found, return nil and an error message string.',
      ],
      concepts: ['package-system', 'searchers', 'custom-loader'],
    },
    {
      id: 'lua-pkg-11',
      title: 'Fix Global Pollution in Module',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the module that accidentally creates global functions.',
      skeleton: `package.preload["badmod"] = function()
  local M = {}
  function helper(x)   -- BUG: global function
    return x * 2
  end
  function M.process(x)
    return helper(x) + 1
  end
  return M
end

require("badmod")
print(type(helper))  -- should be "nil", not "function"`,
      solution: `package.preload["badmod"] = function()
  local M = {}
  local function helper(x)  -- FIXED: local function
    return x * 2
  end
  function M.process(x)
    return helper(x) + 1
  end
  return M
end

package.loaded["badmod"] = nil
require("badmod")
print(type(helper))  -- "nil" - not polluting globals`,
      hints: [
        'Functions without local keyword become globals.',
        'Add local before helper function definitions in modules.',
        'Only functions in the M table should be accessible.',
      ],
      concepts: ['package-system', 'encapsulation', 'debugging'],
    },
    {
      id: 'lua-pkg-12',
      title: 'Write Lazy Module Loader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a lazy loader that defers module loading until first access.',
      skeleton: `-- Write lazyRequire(name) that returns a proxy table.
-- The actual module is only loaded (via require) when
-- any field of the proxy is first accessed.

-- YOUR CODE HERE`,
      solution: `function lazyRequire(name)
  local mod = nil
  local proxy = {}
  setmetatable(proxy, {
    __index = function(self, key)
      if not mod then
        mod = require(name)
      end
      return mod[key]
    end,
  })
  return proxy
end`,
      hints: [
        'Use a proxy table with __index metamethod.',
        'On first access, call require and cache the result.',
        'Subsequent accesses use the cached module.',
      ],
      concepts: ['package-system', 'lazy-loading', 'metatables'],
    },
    {
      id: 'lua-pkg-13',
      title: 'Predict package.loaded Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict what happens when you manually set package.loaded.',
      skeleton: `package.loaded["fake"] = { value = 42 }
local m = require("fake")
print(m.value)
print(type(m))`,
      solution: `42
table`,
      hints: [
        'require first checks package.loaded.',
        'If the entry exists, it returns it directly.',
        'You can inject any value into package.loaded.',
      ],
      concepts: ['package-system', 'loaded'],
    },
    {
      id: 'lua-pkg-14',
      title: 'Write Module with Init',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a module that requires initialization before use.',
      skeleton: `-- Register a "db" module in package.preload with:
-- .init(config) - stores config internally, sets initialized flag
-- .query(sql) - returns config.prefix .. ": " .. sql
--   (errors if not initialized)

-- YOUR CODE HERE`,
      solution: `package.preload["db"] = function()
  local M = {}
  local config = nil
  local initialized = false

  function M.init(cfg)
    config = cfg
    initialized = true
  end

  function M.query(sql)
    if not initialized then
      error("db not initialized")
    end
    return config.prefix .. ": " .. sql
  end

  return M
end`,
      hints: [
        'Use local variables for private module state.',
        'Check the initialized flag in query.',
        'Call error() if the module is used before init.',
      ],
      concepts: ['package-system', 'initialization', 'encapsulation'],
    },
    {
      id: 'lua-pkg-15',
      title: 'Check Package Path Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Add a custom directory to package.path.',
      skeleton: `-- Add "./mylibs/?.lua" to the beginning of package.path
package.path = "./mylibs/?.lua;" .. package.___
print(package.path:find("mylibs") ~= nil)  -- true`,
      solution: `package.path = "./mylibs/?.lua;" .. package.path
print(package.path:find("mylibs") ~= nil)  -- true`,
      hints: [
        'package.path is a semicolon-separated string of patterns.',
        'The ? is replaced with the module name during search.',
        'Prepend to search your directory first.',
      ],
      concepts: ['package-system', 'path'],
    },
    {
      id: 'lua-pkg-16',
      title: 'Refactor Globals to Module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor global functions into a proper module.',
      skeleton: `function utils_trim(s)
  return s:match("^%s*(.-)%s*$")
end

function utils_split(s, sep)
  local parts = {}
  for part in s:gmatch("[^" .. sep .. "]+") do
    parts[#parts + 1] = part
  end
  return parts
end

function utils_join(t, sep)
  return table.concat(t, sep)
end

print(utils_trim("  hello  "))
print(utils_join(utils_split("a,b,c", ","), "-"))`,
      solution: `package.preload["utils"] = function()
  local M = {}
  function M.trim(s)
    return s:match("^%s*(.-)%s*$")
  end
  function M.split(s, sep)
    local parts = {}
    for part in s:gmatch("[^" .. sep .. "]+") do
      parts[#parts + 1] = part
    end
    return parts
  end
  function M.join(t, sep)
    return table.concat(t, sep)
  end
  return M
end

local utils = require("utils")
print(utils.trim("  hello  "))
print(utils.join(utils.split("a,b,c", ","), "-"))`,
      hints: [
        'Replace global functions with methods on a module table.',
        'Remove the utils_ prefix since the module name provides namespace.',
        'Register via package.preload for in-memory modules.',
      ],
      concepts: ['package-system', 'refactoring', 'modules'],
    },
    {
      id: 'lua-pkg-17',
      title: 'Refactor Multiple Requires',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor repetitive require calls into a batch loader.',
      skeleton: `local math = require("math")
local string = require("string")
local table = require("table")
local io = require("io")
local os = require("os")

print(type(math))
print(type(string))
print(type(table))
print(type(io))
print(type(os))`,
      solution: `local function requireAll(...)
  local modules = {}
  for i = 1, select("#", ...) do
    local name = select(i, ...)
    modules[name] = require(name)
  end
  return modules
end

local libs = requireAll("math", "string", "table", "io", "os")

print(type(libs.math))
print(type(libs.string))
print(type(libs.table))
print(type(libs.io))
print(type(libs.os))`,
      hints: [
        'Create a helper that takes module names as varargs.',
        'Store each loaded module in a result table keyed by name.',
        'Return the table of loaded modules.',
      ],
      concepts: ['package-system', 'refactoring', 'varargs'],
    },
    {
      id: 'lua-pkg-18',
      title: 'Fix Circular Dependency',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Fix a circular dependency between two modules.',
      skeleton: `-- Module A requires B, Module B requires A = infinite loop
package.preload["modA"] = function()
  local B = require("modB")  -- BUG: triggers circular load
  local M = {}
  function M.hello() return "A:" .. B.world() end
  return M
end

package.preload["modB"] = function()
  local A = require("modA")
  local M = {}
  function M.world() return "B" end
  return M
end

local a = require("modA")
print(a.hello())`,
      solution: `package.preload["modA"] = function()
  local M = {}
  package.loaded["modA"] = M  -- FIXED: register early
  local B = require("modB")
  function M.hello() return "A:" .. B.world() end
  return M
end

package.preload["modB"] = function()
  local M = {}
  package.loaded["modB"] = M
  function M.world() return "B" end
  return M
end

local a = require("modA")
print(a.hello())`,
      hints: [
        'Register the module table in package.loaded before requiring dependencies.',
        'This breaks the circular dependency chain.',
        'The other module gets the partially-initialized table.',
      ],
      concepts: ['package-system', 'circular-dependency', 'debugging'],
    },
    {
      id: 'lua-pkg-19',
      title: 'Write Module Unloader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that properly unloads a module from the package system.',
      skeleton: `-- Write unload(name) that removes a module from
-- package.loaded and package.preload.
-- Return true if it was loaded, false otherwise.

-- YOUR CODE HERE`,
      solution: `function unload(name)
  local wasLoaded = package.loaded[name] ~= nil
  package.loaded[name] = nil
  package.preload[name] = nil
  return wasLoaded
end`,
      hints: [
        'Clear both package.loaded and package.preload.',
        'Check if it was in package.loaded first.',
        'After unloading, require will search again.',
      ],
      concepts: ['package-system', 'loaded', 'preload'],
    },
    {
      id: 'lua-pkg-20',
      title: 'Write Package Inspector',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that lists all loaded modules and their types.',
      skeleton: `-- Write listModules() that returns a sorted table of
-- { name = string, type = string } for every entry
-- in package.loaded. Sort alphabetically by name.

-- YOUR CODE HERE`,
      solution: `function listModules()
  local modules = {}
  for name, mod in pairs(package.loaded) do
    modules[#modules + 1] = {
      name = name,
      type = type(mod),
    }
  end
  table.sort(modules, function(a, b)
    return a.name < b.name
  end)
  return modules
end`,
      hints: [
        'Iterate package.loaded with pairs().',
        'Record each module name and the type of its value.',
        'Sort the result table by name.',
      ],
      concepts: ['package-system', 'loaded', 'introspection'],
    },
  ],
};
