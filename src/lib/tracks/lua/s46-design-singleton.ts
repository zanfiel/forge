import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-singleton',
  title: '46. Singleton',
  explanation: `## Singleton Pattern in Lua

The Singleton pattern ensures only one instance of a module or object exists:

\`\`\`lua
-- Module singleton (most common in Lua)
-- A module loaded with require is naturally a singleton:
-- mymodule.lua
local M = {}
local state = 0  -- private state
function M.increment() state = state + 1 end
function M.getState() return state end
return M

-- Metatable singleton with lazy init
local instance = nil
local Singleton = {}
Singleton.__index = Singleton

function Singleton.getInstance()
  if not instance then
    instance = setmetatable({ data = {} }, Singleton)
  end
  return instance
end

-- Table-as-singleton (simplest)
local Config = {
  debug = false,
  logLevel = "info",
}
function Config.setDebug(val) Config.debug = val end
\`\`\`

In Lua, modules are the natural singleton pattern since \`require\` caches the module table in \`package.loaded\`.`,
  exercises: [
    {
      id: 'lua-singleton-1',
      title: 'Module Singleton',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a module singleton using require caching.',
      skeleton: `package.preload["logger"] = function()
  local M = {}
  local logs = {}
  function M.log(msg) logs[#logs+1] = msg end
  function M.getAll() return logs end
  return ___
end
local l1 = require("logger")
local l2 = require("logger")
print(l1 == l2)  -- true (same instance)`,
      solution: `package.preload["logger"] = function()
  local M = {}
  local logs = {}
  function M.log(msg) logs[#logs+1] = msg end
  function M.getAll() return logs end
  return M
end
local l1 = require("logger")
local l2 = require("logger")
print(l1 == l2)  -- true (same instance)`,
      hints: [
        'Return M to export the module table.',
        'require caches the result, so both calls return the same table.',
        'This is the simplest singleton pattern in Lua.',
      ],
      concepts: ['singleton', 'module-pattern'],
    },
    {
      id: 'lua-singleton-2',
      title: 'Predict Singleton Sharing',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict that singleton state is shared.',
      skeleton: `package.preload["counter"] = function()
  local M = { count = 0 }
  function M.inc() M.count = M.count + 1 end
  return M
end
local a = require("counter")
local b = require("counter")
a.inc()
a.inc()
b.inc()
print(b.count)`,
      solution: `3`,
      hints: [
        'a and b are the same table (singleton).',
        'a.inc() twice makes count = 2.',
        'b.inc() once makes count = 3.',
      ],
      concepts: ['singleton', 'shared-state'],
    },
    {
      id: 'lua-singleton-3',
      title: 'Lazy Init Singleton',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement lazy initialization for a singleton.',
      skeleton: `local instance = nil

function getInstance()
  if ___ instance then
    instance = { created = os.clock(), data = {} }
  end
  return instance
end

local a = getInstance()
local b = getInstance()
print(a == b)  -- true`,
      solution: `local instance = nil

function getInstance()
  if not instance then
    instance = { created = os.clock(), data = {} }
  end
  return instance
end

local a = getInstance()
local b = getInstance()
print(a == b)  -- true`,
      hints: [
        'Check if instance is nil before creating.',
        'not nil is true, so the first call creates it.',
        'Subsequent calls return the existing instance.',
      ],
      concepts: ['singleton', 'lazy-initialization'],
    },
    {
      id: 'lua-singleton-4',
      title: 'Write Singleton Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a singleton class with getInstance pattern.',
      skeleton: `-- Write a Database singleton with:
-- Database.getInstance() - returns the single instance
-- :connect(host) - stores host
-- :getHost() - returns host
-- Multiple getInstance calls return the same object.

-- YOUR CODE HERE`,
      solution: `local Database = {}
Database.__index = Database
local instance = nil

function Database.getInstance()
  if not instance then
    instance = setmetatable({ host = nil }, Database)
  end
  return instance
end

function Database:connect(host)
  self.host = host
end

function Database:getHost()
  return self.host
end`,
      hints: [
        'Use a module-level local variable for the instance.',
        'getInstance creates or returns the instance.',
        'Methods use the colon syntax with self.',
      ],
      concepts: ['singleton', 'class-pattern', 'lazy-initialization'],
    },
    {
      id: 'lua-singleton-5',
      title: 'Write Registry Singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a registry singleton for storing global services.',
      skeleton: `-- Write a Registry singleton with:
-- Registry.getInstance() - get/create instance
-- :register(name, service) - register a service by name
-- :get(name) - retrieve a service by name
-- :has(name) - check if service exists

-- YOUR CODE HERE`,
      solution: `local Registry = {}
Registry.__index = Registry
local regInstance = nil

function Registry.getInstance()
  if not regInstance then
    regInstance = setmetatable({ services = {} }, Registry)
  end
  return regInstance
end

function Registry:register(name, service)
  self.services[name] = service
end

function Registry:get(name)
  return self.services[name]
end

function Registry:has(name)
  return self.services[name] ~= nil
end`,
      hints: [
        'The registry stores services in a table by name.',
        'getInstance ensures only one registry exists.',
        'Services can be any Lua value.',
      ],
      concepts: ['singleton', 'registry', 'services'],
    },
    {
      id: 'lua-singleton-6',
      title: 'Fix Singleton Bypass',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the singleton that can be bypassed with direct construction.',
      skeleton: `local Singleton = {}
Singleton.__index = Singleton
local instance = nil

function Singleton.getInstance()
  if not instance then
    instance = setmetatable({}, Singleton)
  end
  return instance
end

function Singleton:new()  -- BUG: allows creating new instances
  return setmetatable({}, Singleton)
end

local a = Singleton.getInstance()
local b = Singleton:new()  -- bypasses singleton!
print(a == b)  -- false!`,
      solution: `local Singleton = {}
Singleton.__index = Singleton
local instance = nil

function Singleton.getInstance()
  if not instance then
    instance = setmetatable({}, Singleton)
  end
  return instance
end

-- FIXED: new() also returns the singleton instance
function Singleton:new()
  return Singleton.getInstance()
end

local a = Singleton.getInstance()
local b = Singleton:new()
print(a == b)  -- true`,
      hints: [
        'If you provide new(), it should also return the singleton.',
        'Or remove new() entirely to prevent bypassing.',
        'Make new() call getInstance() internally.',
      ],
      concepts: ['singleton', 'encapsulation', 'debugging'],
    },
    {
      id: 'lua-singleton-7',
      title: 'Write Thread-Safe-ish Singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a singleton that protects against re-initialization.',
      skeleton: `-- Write createSingleton(initFn) that:
-- Returns a getInstance() function.
-- initFn() is called exactly once to create the instance.
-- Calling getInstance() after creation returns cached instance.
-- Also return a reset() function for testing.

-- YOUR CODE HERE`,
      solution: `function createSingleton(initFn)
  local instance = nil
  local function getInstance()
    if not instance then
      instance = initFn()
    end
    return instance
  end
  local function reset()
    instance = nil
  end
  return getInstance, reset
end`,
      hints: [
        'Wrap the instance in a closure.',
        'initFn is called only on first access.',
        'reset() clears the instance for testing.',
      ],
      concepts: ['singleton', 'factory', 'closures'],
    },
    {
      id: 'lua-singleton-8',
      title: 'Predict Module Caching',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict behavior of module caching as singleton.',
      skeleton: `local loadCount = 0
package.preload["mymod"] = function()
  loadCount = loadCount + 1
  return { id = loadCount }
end

require("mymod")
require("mymod")
require("mymod")
print(loadCount)`,
      solution: `1`,
      hints: [
        'require caches the module after the first load.',
        'Subsequent requires return the cached version.',
        'The loader function runs exactly once.',
      ],
      concepts: ['singleton', 'require-caching'],
    },
    {
      id: 'lua-singleton-9',
      title: 'Write Singleton Event Bus',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a singleton event bus.',
      skeleton: `-- Write getEventBus() that returns a singleton event bus with:
-- :on(event, cb) - register handler
-- :emit(event, ...) - fire event
-- Multiple calls to getEventBus() return the same bus.

-- YOUR CODE HERE`,
      solution: `local busInstance = nil

function getEventBus()
  if busInstance then return busInstance end
  local handlers = {}
  busInstance = {
    on = function(self, event, cb)
      handlers[event] = handlers[event] or {}
      handlers[event][#handlers[event] + 1] = cb
    end,
    emit = function(self, event, ...)
      for _, cb in ipairs(handlers[event] or {}) do
        cb(...)
      end
    end,
  }
  return busInstance
end`,
      hints: [
        'Use a module-level variable for the instance.',
        'Create it on first call, return cached on subsequent calls.',
        'The event bus state is shared across all users.',
      ],
      concepts: ['singleton', 'event-bus'],
    },
    {
      id: 'lua-singleton-10',
      title: 'Fill in Singleton Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the singleton instance check.',
      skeleton: `local Config = {}
Config.__index = Config
local _instance = nil

function Config.getInstance()
  if _instance ___ nil then
    _instance = setmetatable({settings = {}}, Config)
  end
  return _instance
end

local c = Config.getInstance()
c.settings.debug = true
print(Config.getInstance().settings.debug)  -- true`,
      solution: `local Config = {}
Config.__index = Config
local _instance = nil

function Config.getInstance()
  if _instance == nil then
    _instance = setmetatable({settings = {}}, Config)
  end
  return _instance
end

local c = Config.getInstance()
c.settings.debug = true
print(Config.getInstance().settings.debug)  -- true`,
      hints: [
        'Check if _instance is nil with == comparison.',
        'Only create when nil; otherwise return existing.',
        'Settings persist because it is the same object.',
      ],
      concepts: ['singleton', 'nil-check'],
    },
    {
      id: 'lua-singleton-11',
      title: 'Write Singleton with Destroy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a singleton with cleanup/destroy functionality.',
      skeleton: `-- Write createManagedSingleton(initFn, cleanupFn) returning:
-- getInstance() - get or create instance via initFn()
-- destroy() - call cleanupFn(instance) and clear instance
-- isAlive() - return true if instance exists

-- YOUR CODE HERE`,
      solution: `function createManagedSingleton(initFn, cleanupFn)
  local instance = nil
  return {
    getInstance = function()
      if not instance then
        instance = initFn()
      end
      return instance
    end,
    destroy = function()
      if instance and cleanupFn then
        cleanupFn(instance)
      end
      instance = nil
    end,
    isAlive = function()
      return instance ~= nil
    end,
  }
end`,
      hints: [
        'initFn creates the instance, cleanupFn destroys it.',
        'destroy() calls cleanup and sets instance to nil.',
        'isAlive() checks if instance is not nil.',
      ],
      concepts: ['singleton', 'lifecycle', 'cleanup'],
    },
    {
      id: 'lua-singleton-12',
      title: 'Fix Multiple Instances',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the singleton that accidentally creates multiple instances.',
      skeleton: `local AppState = {}
AppState.__index = AppState

function AppState:getInstance()
  if not self._instance then  -- BUG: self is wrong reference
    self._instance = setmetatable({data = {}}, AppState)
  end
  return self._instance
end

local a = AppState:getInstance()
local b = AppState:getInstance()
print(a == b)  -- might be false!`,
      solution: `local AppState = {}
AppState.__index = AppState
local _instance = nil  -- FIXED: module-level variable

function AppState.getInstance()  -- FIXED: dot syntax, not colon
  if not _instance then
    _instance = setmetatable({data = {}}, AppState)
  end
  return _instance
end

local a = AppState.getInstance()
local b = AppState.getInstance()
print(a == b)  -- true`,
      hints: [
        'Using colon syntax makes self different each call.',
        'Use a module-level local variable for the instance.',
        'Use dot syntax for getInstance (no self needed).',
      ],
      concepts: ['singleton', 'self-reference', 'debugging'],
    },
    {
      id: 'lua-singleton-13',
      title: 'Write Enum Singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a frozen enum-like singleton.',
      skeleton: `-- Write createEnum(values) that returns a frozen singleton table.
-- values is a list of strings; each becomes a key with a unique numeric value.
-- The table should be read-only (error on modification).
-- Example: createEnum({"RED","GREEN","BLUE"}) -> {RED=1,GREEN=2,BLUE=3}

-- YOUR CODE HERE`,
      solution: `function createEnum(values)
  local enum = {}
  for i, name in ipairs(values) do
    enum[name] = i
  end
  local proxy = {}
  setmetatable(proxy, {
    __index = enum,
    __newindex = function()
      error("cannot modify enum")
    end,
    __metatable = "enum",
  })
  return proxy
end`,
      hints: [
        'Assign sequential numbers to each name.',
        'Use a proxy with __newindex to prevent modification.',
        '__index on the proxy reads from the real enum table.',
      ],
      concepts: ['singleton', 'enum', 'immutability'],
    },
    {
      id: 'lua-singleton-14',
      title: 'Predict Singleton Reset',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict behavior after resetting a singleton.',
      skeleton: `local inst = nil
function get()
  if not inst then inst = {count = 0} end
  return inst
end
function reset() inst = nil end

get().count = 5
local ref = get()
reset()
print(ref.count)
print(get().count)`,
      solution: `5
0`,
      hints: [
        'ref still points to the old instance (count = 5).',
        'reset() clears inst, so get() creates a new one.',
        'The new instance has count = 0.',
      ],
      concepts: ['singleton', 'reset', 'references'],
    },
    {
      id: 'lua-singleton-15',
      title: 'Write Singleton Pool',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a named singleton pool that manages multiple named singletons.',
      skeleton: `-- Write createSingletonPool() with:
-- :get(name, initFn) - get or create named singleton
-- :has(name) - check if singleton exists
-- :remove(name) - destroy named singleton
-- :list() - return array of active singleton names

-- YOUR CODE HERE`,
      solution: `function createSingletonPool()
  local instances = {}
  local pool = {}
  local mt = {
    __index = {
      get = function(self, name, initFn)
        if not instances[name] and initFn then
          instances[name] = initFn()
        end
        return instances[name]
      end,
      has = function(self, name)
        return instances[name] ~= nil
      end,
      remove = function(self, name)
        instances[name] = nil
      end,
      list = function(self)
        local names = {}
        for name in pairs(instances) do
          names[#names + 1] = name
        end
        return names
      end,
    },
  }
  return setmetatable(pool, mt)
end`,
      hints: [
        'Store instances in a table keyed by name.',
        'get() creates via initFn only if not already present.',
        'remove() sets the instance to nil.',
      ],
      concepts: ['singleton', 'pool', 'management'],
    },
    {
      id: 'lua-singleton-16',
      title: 'Refactor Global to Singleton Module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor global state variables into a singleton module.',
      skeleton: `-- Global state scattered everywhere
_G.appName = "MyApp"
_G.appVersion = "2.0"
_G.debugMode = true
_G.logLevel = 3

print(_G.appName)
print(_G.debugMode)`,
      solution: `package.preload["app_config"] = function()
  local M = {
    appName = "MyApp",
    appVersion = "2.0",
    debugMode = true,
    logLevel = 3,
  }
  return M
end

local config = require("app_config")
print(config.appName)
print(config.debugMode)`,
      hints: [
        'Move globals into a module table.',
        'require() ensures singleton behavior.',
        'All code requiring this module shares the same config.',
      ],
      concepts: ['singleton', 'refactoring', 'globals'],
    },
    {
      id: 'lua-singleton-17',
      title: 'Refactor Class to Singleton',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor a regular class to enforce singleton behavior.',
      skeleton: `local Logger = {}
Logger.__index = Logger

function Logger:new(level)
  return setmetatable({ level = level, logs = {} }, Logger)
end

function Logger:log(msg)
  self.logs[#self.logs + 1] = "[" .. self.level .. "] " .. msg
end

-- Problem: anyone can create multiple loggers
local l1 = Logger:new("INFO")
local l2 = Logger:new("DEBUG")
l1:log("hello")
l2:log("world")
print(#l1.logs, #l2.logs)  -- separate state!`,
      solution: `local Logger = {}
Logger.__index = Logger
local instance = nil

function Logger.getInstance(level)
  if not instance then
    instance = setmetatable({ level = level or "INFO", logs = {} }, Logger)
  end
  return instance
end

function Logger:log(msg)
  self.logs[#self.logs + 1] = "[" .. self.level .. "] " .. msg
end

local l1 = Logger.getInstance("INFO")
local l2 = Logger.getInstance("DEBUG")
l1:log("hello")
l2:log("world")
print(#l1.logs, #l2.logs)  -- 2, 2 (same instance!)`,
      hints: [
        'Replace new() with getInstance().',
        'Use a module-level variable for the single instance.',
        'The level parameter is only used on first creation.',
      ],
      concepts: ['singleton', 'refactoring', 'class'],
    },
    {
      id: 'lua-singleton-18',
      title: 'Write Singleton Config Store',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a singleton configuration store with get/set and change notifications.',
      skeleton: `-- Write getConfigStore() returning a singleton with:
-- :set(key, value) - set config value, notify listeners
-- :get(key) - get config value
-- :onChange(key, fn) - register listener for key changes
-- fn receives (key, newValue, oldValue)

-- YOUR CODE HERE`,
      solution: `local storeInstance = nil

function getConfigStore()
  if storeInstance then return storeInstance end
  local data = {}
  local listeners = {}
  storeInstance = {
    set = function(self, key, value)
      local old = data[key]
      data[key] = value
      for _, fn in ipairs(listeners[key] or {}) do
        fn(key, value, old)
      end
    end,
    get = function(self, key)
      return data[key]
    end,
    onChange = function(self, key, fn)
      listeners[key] = listeners[key] or {}
      listeners[key][#listeners[key] + 1] = fn
    end,
  }
  return storeInstance
end`,
      hints: [
        'Store data and listeners in closure variables.',
        'set() notifies all listeners for that key.',
        'onChange() registers a callback for a specific key.',
      ],
      concepts: ['singleton', 'observer', 'config-store'],
    },
    {
      id: 'lua-singleton-19',
      title: 'Predict Singleton Mutation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how singleton mutation affects all references.',
      skeleton: `local inst = nil
function get()
  if not inst then inst = {items = {}} end
  return inst
end

local a = get()
a.items[1] = "hello"
local b = get()
b.items[2] = "world"
print(#get().items)`,
      solution: `2`,
      hints: [
        'a and b and get() all return the same table.',
        'a adds "hello" at index 1.',
        'b adds "world" at index 2.',
      ],
      concepts: ['singleton', 'shared-mutation'],
    },
    {
      id: 'lua-singleton-20',
      title: 'Write Singleton with Dependency Injection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a singleton that supports dependency injection for testing.',
      skeleton: `-- Write createService(deps) where deps is a table of dependencies.
-- The singleton wraps deps and provides:
-- :getDep(name) - return dependency by name
-- :replaceDep(name, mock) - replace for testing
-- Use singleton pattern with getInstance.

-- YOUR CODE HERE`,
      solution: `local serviceInstance = nil

function createService(deps)
  serviceInstance = {
    deps = deps or {},
    getDep = function(self, name)
      return self.deps[name]
    end,
    replaceDep = function(self, name, mock)
      self.deps[name] = mock
    end,
  }
  return serviceInstance
end

function getService()
  return serviceInstance
end`,
      hints: [
        'Store dependencies in the singleton instance.',
        'replaceDep allows swapping real deps for mocks.',
        'createService initializes, getService retrieves.',
      ],
      concepts: ['singleton', 'dependency-injection', 'testing'],
    },
  ],
};
