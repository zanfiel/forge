import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-modules',
  title: '17. Modules',
  explanation: `## Modules in Lua

Lua's module system is based on \`require\` and tables.

### Creating a Module
\`\`\`lua
-- mymodule.lua
local M = {}

function M.greet(name)
  return "Hello, " .. name
end

local function privateHelper()
  -- not in M, so not exported
end

return M
\`\`\`

### Using a Module
\`\`\`lua
local mymod = require("mymodule")
print(mymod.greet("World"))
\`\`\`

### How require Works
1. Checks \`package.loaded[name]\` for cached module
2. Searches \`package.path\` for the file
3. Loads and executes the file
4. Caches the return value in \`package.loaded\`

### package.path
\`\`\`lua
print(package.path)
-- "./?.lua;/usr/share/lua/5.4/?.lua;..."
\`\`\`

### Module Caching
\`\`\`lua
local a = require("mymod") -- loads and caches
local b = require("mymod") -- returns cached version
print(a == b) -- true (same table)
\`\`\``,
  exercises: [
    {
      id: 'lua-modules-1',
      title: 'Basic Module Return',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the module that returns a table of functions.',
      skeleton: `-- mymath.lua
local M = {}
function M.add(a, b) return a + b end
function M.sub(a, b) return a - b end
___ M`,
      solution: `-- mymath.lua
local M = {}
function M.add(a, b) return a + b end
function M.sub(a, b) return a - b end
return M`,
      hints: ['Modules must return their public interface.', 'The last statement returns the module table.', 'Fill in "return".'],
      concepts: ['module-pattern'],
    },
    {
      id: 'lua-modules-2',
      title: 'Require a Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Load a module using require.',
      skeleton: `local json = ___("json")
local data = json.encode({name = "Alice"})`,
      solution: `local json = require("json")
local data = json.encode({name = "Alice"})`,
      hints: ['require loads and returns a module.', 'Pass the module name as a string.', 'Fill in "require".'],
      concepts: ['require'],
    },
    {
      id: 'lua-modules-3',
      title: 'Module Caching',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Show that require returns the cached module.',
      skeleton: `local a = require("mymod")
local b = require("mymod")
print(a ___ b) -- should print true`,
      solution: `local a = require("mymod")
local b = require("mymod")
print(a == b) -- should print true`,
      hints: ['require caches the return value.', 'The same table is returned each time.', 'Fill in "==".'],
      concepts: ['module-caching'],
    },
    {
      id: 'lua-modules-4',
      title: 'Package Path',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Add a custom path to package.path.',
      skeleton: `package.___ = package.path .. ";./libs/?.lua"`,
      solution: `package.path = package.path .. ";./libs/?.lua"`,
      hints: ['package.path contains the search paths.', 'Append new paths with ; separator.', 'Fill in "path".'],
      concepts: ['package-path'],
    },
    {
      id: 'lua-modules-5',
      title: 'Private Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Make a function private to the module.',
      skeleton: `local M = {}

___ function helper(x)
  return x * 2
end

function M.process(x)
  return helper(x) + 1
end

return M`,
      solution: `local M = {}

local function helper(x)
  return x * 2
end

function M.process(x)
  return helper(x) + 1
end

return M`,
      hints: ['local functions are not accessible outside the file.', 'Only functions attached to M are exported.', 'Fill in "local".'],
      concepts: ['private-functions', 'module-pattern'],
    },
    {
      id: 'lua-modules-6',
      title: 'Force Module Reload',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Force require to reload a module by clearing the cache.',
      skeleton: `package.___["mymod"] = nil
local fresh = require("mymod")`,
      solution: `package.loaded["mymod"] = nil
local fresh = require("mymod")`,
      hints: ['package.loaded stores cached modules.', 'Setting it to nil forces a reload.', 'Fill in "loaded".'],
      concepts: ['module-caching', 'reload'],
    },
    {
      id: 'lua-modules-7',
      title: 'Write a Config Module',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a module that exports configuration values and a getter function.',
      skeleton: `-- Write a config module`,
      solution: `local M = {}

M.defaults = {
  host = "localhost",
  port = 8080,
  debug = false,
}

local config = {}
for k, v in pairs(M.defaults) do
  config[k] = v
end

function M.get(key)
  return config[key]
end

function M.set(key, val)
  config[key] = val
end

return M`,
      hints: ['Export a table with functions.', 'Keep config data local for encapsulation.', 'Provide get/set functions.'],
      concepts: ['module-pattern', 'encapsulation'],
    },
    {
      id: 'lua-modules-8',
      title: 'Write a Logger Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a logger module with info, warn, error functions and a setLevel function.',
      skeleton: `-- Write a logger module`,
      solution: `local M = {}

local levels = {error = 1, warn = 2, info = 3}
local currentLevel = 3

function M.setLevel(level)
  currentLevel = levels[level] or 3
end

function M.error(msg)
  if currentLevel >= 1 then
    print("[ERROR] " .. msg)
  end
end

function M.warn(msg)
  if currentLevel >= 2 then
    print("[WARN] " .. msg)
  end
end

function M.info(msg)
  if currentLevel >= 3 then
    print("[INFO] " .. msg)
  end
end

return M`,
      hints: ['Use numeric levels for comparison.', 'Only print if current level allows it.', 'Keep level state local to the module.'],
      concepts: ['module-pattern', 'logging'],
    },
    {
      id: 'lua-modules-9',
      title: 'Write a Singleton Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a module that acts as a singleton instance (database connection pool simulator).',
      skeleton: `-- Write a singleton connection pool module`,
      solution: `local M = {}

local pool = {}
local maxSize = 5

function M.getConnection()
  if #pool > 0 then
    return table.remove(pool)
  end
  return {id = math.random(1000, 9999), active = true}
end

function M.releaseConnection(conn)
  conn.active = false
  if #pool < maxSize then
    pool[#pool + 1] = conn
  end
end

function M.poolSize()
  return #pool
end

return M`,
      hints: ['Module-level local state persists across requires.', 'require caching makes it a natural singleton.', 'Pool connections in a local table.'],
      concepts: ['singleton', 'module-pattern'],
    },
    {
      id: 'lua-modules-10',
      title: 'Write a Plugin Loader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a module that loads and registers plugin modules from a list of names.',
      skeleton: `-- Write a plugin loader module`,
      solution: `local M = {}

local plugins = {}

function M.register(name, plugin)
  plugins[name] = plugin
  if plugin.init then
    plugin.init()
  end
end

function M.get(name)
  return plugins[name]
end

function M.list()
  local names = {}
  for name in pairs(plugins) do
    names[#names + 1] = name
  end
  return names
end

function M.loadPlugins(names)
  for _, name in ipairs(names) do
    local ok, plugin = pcall(require, name)
    if ok then
      M.register(name, plugin)
    else
      print("Failed to load plugin: " .. name)
    end
  end
end

return M`,
      hints: ['Use pcall with require for safe loading.', 'Store plugins in a local table.', 'Call init if the plugin provides one.'],
      concepts: ['module-loading', 'pcall'],
    },
    {
      id: 'lua-modules-11',
      title: 'Write a Namespace Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a module that creates a namespace with sub-modules.',
      skeleton: `-- Write a namespace module with math and string sub-modules`,
      solution: `local M = {}

M.math = {}
function M.math.add(a, b) return a + b end
function M.math.mul(a, b) return a * b end

M.str = {}
function M.str.upper(s) return string.upper(s) end
function M.str.trim(s) return s:match("^%s*(.-)%s*$") end

M.version = "1.0.0"

return M`,
      hints: ['Create sub-tables within the module table.', 'Each sub-table acts as a namespace.', 'M.math.add is a nested function.'],
      concepts: ['namespaces', 'module-pattern'],
    },
    {
      id: 'lua-modules-12',
      title: 'Write a Lazy Module',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a lazy-loading module wrapper that defers require until first access.',
      skeleton: `-- Write function lazy(name) that returns a proxy table`,
      solution: `local function lazy(name)
  local mod = nil
  return setmetatable({}, {
    __index = function(_, key)
      if not mod then
        mod = require(name)
      end
      return mod[key]
    end,
  })
end

-- Usage: local json = lazy("json")
-- json.encode(...) triggers require on first use
return lazy`,
      hints: ['Use a metatable proxy with __index.', 'Load the module on first access.', 'Cache the loaded module.'],
      concepts: ['lazy-loading', 'proxy-pattern'],
    },
    {
      id: 'lua-modules-13',
      title: 'Fix Missing Return Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the module that returns nil.',
      skeleton: `-- mymod.lua
local M = {}
function M.hello() return "hi" end
-- forgot something!`,
      solution: `-- mymod.lua
local M = {}
function M.hello() return "hi" end
return M`,
      hints: ['Modules must return their table.', 'Without return, require gets nil.', 'Add "return M" at the end.'],
      concepts: ['module-pattern'],
    },
    {
      id: 'lua-modules-14',
      title: 'Fix Global Pollution Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the module that pollutes the global namespace.',
      skeleton: `-- utils.lua
M = {}
function M.helper() return 42 end
function internal() return "secret" end
return M`,
      solution: `-- utils.lua
local M = {}
function M.helper() return 42 end
local function internal() return "secret" end
return M`,
      hints: ['M without local is global.', 'internal without local is also global.', 'Add local to both.'],
      concepts: ['global-pollution', 'local-variables'],
    },
    {
      id: 'lua-modules-15',
      title: 'Fix Circular Dependency Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Fix the circular dependency between two modules.',
      skeleton: `-- a.lua
local b = require("b")
local M = {}
function M.hello() return "A:" .. b.world() end
return M

-- b.lua
local a = require("a") -- circular! a is still loading
local M = {}
function M.world() return "B" end
return M`,
      solution: `-- a.lua
local M = {}
function M.hello()
  local b = require("b") -- lazy require inside function
  return "A:" .. b.world()
end
return M

-- b.lua
local M = {}
function M.world() return "B" end
return M`,
      hints: ['Move require inside the function that needs it.', 'This defers loading until the function is called.', 'By then, both modules are fully loaded.'],
      concepts: ['circular-dependencies', 'lazy-require'],
    },
    {
      id: 'lua-modules-16',
      title: 'Predict Module Caching',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `-- Assume mymod.lua contains:
-- local M = {count = 0}
-- function M.inc() M.count = M.count + 1 end
-- return M

local a = require("mymod")
a.inc()
local b = require("mymod")
b.inc()
print(a.count, b.count)`,
      solution: `2\t2`,
      hints: ['a and b are the same cached table.', 'Both increments affect the same count.', 'a.count and b.count are the same field.'],
      concepts: ['module-caching'],
    },
    {
      id: 'lua-modules-17',
      title: 'Predict Package Loaded',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `-- Assume mymod returns {val = 42}
local a = require("mymod")
print(package.loaded["mymod"] == a)`,
      solution: `true`,
      hints: ['require stores the result in package.loaded.', 'The cached value is the same table.', 'a == package.loaded["mymod"] is true.'],
      concepts: ['package-loaded'],
    },
    {
      id: 'lua-modules-18',
      title: 'Predict Return Value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict what require returns if the module returns a string.',
      skeleton: `-- Assume strmod.lua contains:
-- return "hello from module"

local result = require("strmod")
print(type(result))`,
      solution: `string`,
      hints: ['Modules can return any value, not just tables.', 'require returns whatever the module returns.', '"hello from module" is a string.'],
      concepts: ['module-return'],
    },
    {
      id: 'lua-modules-19',
      title: 'Refactor Globals to Module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor global utility functions into a proper module.',
      skeleton: `-- utils.lua (bad: global functions)
function trim(s) return s:match("^%s*(.-)%s*$") end
function split(s, sep)
  local parts = {}
  for part in s:gmatch("[^" .. sep .. "]+") do
    parts[#parts + 1] = part
  end
  return parts
end`,
      solution: `-- utils.lua (good: module pattern)
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

return M`,
      hints: ['Create a local module table M.', 'Attach all functions to M.', 'Return M at the end.'],
      concepts: ['module-pattern', 'refactoring'],
    },
    {
      id: 'lua-modules-20',
      title: 'Refactor to OOP Module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the flat module into a class-based module.',
      skeleton: `-- cache.lua
local data = {}
local function set(key, val) data[key] = val end
local function get(key) return data[key] end
local function clear() data = {} end
return {set = set, get = get, clear = clear}`,
      solution: `-- cache.lua
local Cache = {}
Cache.__index = Cache

function Cache.new()
  return setmetatable({data = {}}, Cache)
end

function Cache:set(key, val)
  self.data[key] = val
end

function Cache:get(key)
  return self.data[key]
end

function Cache:clear()
  self.data = {}
end

return Cache`,
      hints: ['Convert to a class so users can create multiple caches.', 'Each instance gets its own data table.', 'Return the class, not an instance.'],
      concepts: ['oop', 'module-pattern', 'refactoring'],
    },
  ],
};
